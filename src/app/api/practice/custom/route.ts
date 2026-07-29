import { NextResponse } from 'next/server';
import { generateCustomSceneDeepSeek, type CustomSceneResult, type CustomSceneDifficulty } from '@/lib/deepseek';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';
import { getUserTier, getBenefitMatrix } from '@/lib/server/membership';
import { customSceneLimit } from '@/lib/membership-benefits';
import { filterContent } from '@/lib/contentFilter';
import { SCENE_CAST, SCENE_CAST_BY_ID } from '@/data/sceneCast';

const DIFFICULTIES: CustomSceneDifficulty[] = ['beginner', 'intermediate', 'advanced'];

// 含鉴权/用户数据：强制 dynamic
export const dynamic = 'force-dynamic';

/** GET /api/practice/custom → 列出当前用户的自定义场景 */
export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = await getDb();
  const res = await db.exec(
    `SELECT cs.id, cs.title, cs.title_ko, cs.icon, cs.last_played_at, cs.mode, cs.companion_name, cs.avatar_url, s.messages
     FROM custom_scenes cs
     LEFT JOIN practice_chat_sessions s ON s.user_id = cs.user_id AND s.scene_slug = cs.id
     WHERE cs.user_id = ?
     ORDER BY cs.last_played_at DESC, cs.created_at DESC`,
    [auth.userId]
  );
  const rows = res[0]?.values ?? [];
  // 从会话 messages JSON 取最后一条的韩语作列表预览（失败静默为空）
  const lastPreview = (raw: unknown): string => {
    try {
      const arr = JSON.parse((raw as string) || '[]');
      if (!Array.isArray(arr) || arr.length === 0) return '';
      const last = arr[arr.length - 1];
      return typeof last?.ko === 'string' ? last.ko : '';
    } catch { return ''; }
  };
  const scenes = rows.map((r) => ({
    id: r[0] as string,
    title: r[1] as string,
    title_ko: r[2] as string,
    icon: (r[3] as string) || '✨',
    lastPlayedAt: Number(r[4] ?? 0),
    mode: (r[5] as string) || 'scene',
    companionName: (r[6] as string) || '',
    avatarUrl: (r[7] as string) || '',
    preview: lastPreview(r[8]),
  }));
  return NextResponse.json({ scenes });
}

/** POST /api/practice/custom { place, situation, goal } → 生成并保存场景，返回 { id } */
export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // 各档均可创建自定义场景，数量按权益矩阵限量（免费也能体验几个，见下方数量门）。

  const apiKey = process.env.DEEPSEEK_CHAT_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 503 });

  try {
    const body = await req.json();
    const mode: 'scene' | 'free' = body?.mode === 'free' ? 'free' : 'scene';
    const place = typeof body?.place === 'string' ? body.place.trim() : '';
    const situation = typeof body?.situation === 'string' ? body.situation.trim() : '';
    const goal = typeof body?.goal === 'string' ? body.goal.trim() : '';

    const difficulty: CustomSceneDifficulty = DIFFICULTIES.includes(body?.difficulty)
      ? body.difficulty : 'intermediate';
    const characterId = typeof body?.characterId === 'string' && SCENE_CAST_BY_ID[body.characterId]
      ? body.characterId : undefined;

    // 专属陪练字段
    const companionName = typeof body?.companionName === 'string' ? body.companionName.trim() : '';
    const companionNameZh = typeof body?.companionNameZh === 'string' ? body.companionNameZh.trim() : '';
    const verbalTic = typeof body?.verbalTic === 'string' ? body.verbalTic.trim() : '';
    // 头像 URL：只接受本站上传/读取路径，防注入外链
    const rawAvatar = typeof body?.avatarUrl === 'string' ? body.avatarUrl.trim() : '';
    const avatarUrl = /^\/api\/companion\/avatar\/[a-zA-Z0-9-]+\.jpg$/.test(rawAvatar) ? rawAvatar : '';

    if (mode === 'free') {
      if (!companionName) return NextResponse.json({ error: '请给你的陪练起个名字' }, { status: 400 });
      if (companionName.length > 40 || companionNameZh.length > 40) {
        return NextResponse.json({ error: '名字不能超过40个字符' }, { status: 400 });
      }
      if (verbalTic.length > 300) return NextResponse.json({ error: '人设描述不能超过300个字符' }, { status: 400 });
      const check = filterContent(`${companionName}\n${companionNameZh}\n${verbalTic}`, 'ai_input');
      if (!check.ok) return NextResponse.json({ error: check.reason }, { status: 400 });
    } else {
      if (!place || !situation || !goal) {
        return NextResponse.json({ error: '请填写地点、情境和目标' }, { status: 400 });
      }
      if (place.length > 200 || situation.length > 200 || goal.length > 200) {
        return NextResponse.json({ error: '每个字段不能超过200个字符' }, { status: 400 });
      }
      const check = filterContent(`${place}\n${situation}\n${goal}`, 'ai_input');
      if (!check.ok) return NextResponse.json({ error: check.reason }, { status: 400 });
    }

    // 会员门：各档累计可拥有的自定义场景数按权益矩阵限量（永久档无限）。满额需升级。
    // 与内容额度一样单一事实来源；免费体验期按月度档限量（见 customSceneLimit）。
    const [tier, matrix] = await Promise.all([getUserTier(auth.userId), getBenefitMatrix()]);
    const sceneLimit = customSceneLimit(matrix, tier);
    if (sceneLimit >= 0) {
      const owned = await (await getDb()).exec('SELECT COUNT(*) FROM custom_scenes WHERE user_id = ?', [auth.userId]);
      const count = Number(owned[0]?.values[0]?.[0] ?? 0);
      if (count >= sceneLimit) {
        return NextResponse.json(
          { error: `当前档位最多创建 ${sceneLimit} 个自定义场景，升级会员可创建更多`, needUpgrade: true },
          { status: 402 },
        );
      }
    }

    const limit = await checkAiRateLimit(auth.userId, 'custom_scene_create', 30);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: '今天创建次数已达上限（30个），请明天再试' },
        { status: 429, headers: { 'X-RateLimit-Limit': '30', 'Retry-After': '86400' } },
      );
    }

    let scene: CustomSceneResult;
    try {
      scene = await generateCustomSceneDeepSeek(
        { place, situation, goal, difficulty, characterId, roster: SCENE_CAST, companionName, verbalTic },
        apiKey, mode === 'free' ? 'companion' : 'full'
      ) as CustomSceneResult;
    } catch (err) {
      console.error('[practice/custom generate]', err);
      return NextResponse.json({ error: '生成失败，请换个描述再试' }, { status: 502 });
    }

    const id = `custom-${crypto.randomUUID()}`;
    const now = Date.now();
    const db = await getDb();
    await db.run(
      `INSERT INTO custom_scenes
       (id, user_id, title, title_ko, icon, place, situation, goal, opening_ko, opening_zh, mini_preview, character_id, role_ko, role_zh, difficulty, tip_zh, mode, companion_name, companion_name_zh, verbal_tic, avatar_url, created_at, last_played_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, auth.userId, scene.title, scene.title_ko, scene.icon,
        place, situation, goal, scene.opening_ko, scene.opening_zh,
        JSON.stringify(scene.mini_preview), scene.character_id, scene.role_ko, scene.role_zh,
        difficulty, scene.tip_zh, mode, companionName, companionNameZh, verbalTic, avatarUrl, now, now,
      ]
    );
    await recordAiUsage(auth.userId, 'custom_scene_create');
    return NextResponse.json({ id });
  } catch (err) {
    console.error('[practice/custom POST]', err);
    return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 500 });
  }
}
