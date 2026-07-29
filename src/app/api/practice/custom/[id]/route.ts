import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';
import { generateCustomSceneDeepSeek, type CustomSceneResult, type CustomSceneDifficulty } from '@/lib/deepseek';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';
import { filterContent } from '@/lib/contentFilter';
import { SCENE_CAST, SCENE_CAST_BY_ID } from '@/data/sceneCast';
import { deleteCompanionAvatarFile } from '@/lib/server/companionAvatar';

// 含鉴权/用户数据：强制 dynamic
export const dynamic = 'force-dynamic';

const DIFFICULTIES: CustomSceneDifficulty[] = ['beginner', 'intermediate', 'advanced'];

// mini_preview JSON 解析（含 dialogue + 词例句），缺字段兜底
function parseMiniPreview(raw: unknown) {
  try {
    const p = JSON.parse((raw as string) || '{}');
    return {
      words: Array.isArray(p.words) ? p.words : [],
      phrases: Array.isArray(p.phrases) ? p.phrases : [],
      dialogue: Array.isArray(p.dialogue) ? p.dialogue : [],
    };
  } catch {
    return { words: [], phrases: [], dialogue: [] };
  }
}

/** GET /api/practice/custom/[id] → 取单个自定义场景（仅本人），顺带刷新 last_played_at */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const db = await getDb();
  const res = await db.exec(
    `SELECT id, title, title_ko, icon, place, situation, goal, opening_ko, opening_zh, mini_preview,
            character_id, role_ko, role_zh, difficulty, tip_zh, mode, companion_name, companion_name_zh, verbal_tic, avatar_url
     FROM custom_scenes
     WHERE id = ? AND user_id = ?`,
    [id, auth.userId]
  );
  const row = res[0]?.values[0];
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // 刷新最近游玩时间（不阻塞返回）
  db.run(`UPDATE custom_scenes SET last_played_at = ? WHERE id = ? AND user_id = ?`, [Date.now(), id, auth.userId]).catch(() => {});

  return NextResponse.json({
    id: row[0] as string,
    title: row[1] as string,
    title_ko: row[2] as string,
    icon: (row[3] as string) || '✨',
    place: row[4] as string,
    situation: row[5] as string,
    goal: row[6] as string,
    opening_ko: row[7] as string,
    opening_zh: row[8] as string,
    mini_preview: parseMiniPreview(row[9]),
    character_id: (row[10] as string) || 'tori',
    role_ko: (row[11] as string) || '',
    role_zh: (row[12] as string) || '',
    difficulty: (row[13] as string) || 'intermediate',
    tip_zh: (row[14] as string) || '',
    mode: (row[15] as string) || 'scene',
    companion_name: (row[16] as string) || '',
    companion_name_zh: (row[17] as string) || '',
    verbal_tic: (row[18] as string) || '',
    avatar_url: (row[19] as string) || '',
  });
}

/** PUT /api/practice/custom/[id] → 改三字段/难度/角色后整体重生成（原地更新，slug 不变，清对话会话） */
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // 编辑只作用于用户已拥有的场景（不新增数量），各档均可；仅受下方每日防刷上限。

  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const apiKey = process.env.DEEPSEEK_CHAT_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 503 });

  const db = await getDb();
  const own = await db.exec(`SELECT avatar_url FROM custom_scenes WHERE id = ? AND user_id = ?`, [id, auth.userId]);
  if (!own[0]?.values[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const oldAvatarUrl = (own[0].values[0][0] as string) || '';

  try {
    const body = await req.json();
    const mode: 'scene' | 'free' = body?.mode === 'free' ? 'free' : 'scene';
    const place = typeof body?.place === 'string' ? body.place.trim() : '';
    const situation = typeof body?.situation === 'string' ? body.situation.trim() : '';
    const goal = typeof body?.goal === 'string' ? body.goal.trim() : '';
    const difficulty: CustomSceneDifficulty = DIFFICULTIES.includes(body?.difficulty) ? body.difficulty : 'intermediate';
    const characterId = typeof body?.characterId === 'string' && SCENE_CAST_BY_ID[body.characterId] ? body.characterId : undefined;

    const companionName = typeof body?.companionName === 'string' ? body.companionName.trim() : '';
    const companionNameZh = typeof body?.companionNameZh === 'string' ? body.companionNameZh.trim() : '';
    const verbalTic = typeof body?.verbalTic === 'string' ? body.verbalTic.trim() : '';
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
      if (!place || !situation || !goal) return NextResponse.json({ error: '请填写地点、情境和目标' }, { status: 400 });
      if (place.length > 200 || situation.length > 200 || goal.length > 200) {
        return NextResponse.json({ error: '每个字段不能超过200个字符' }, { status: 400 });
      }
      const check = filterContent(`${place}\n${situation}\n${goal}`, 'ai_input');
      if (!check.ok) return NextResponse.json({ error: check.reason }, { status: 400 });
    }

    const limit = await checkAiRateLimit(auth.userId, 'custom_scene_create', 30);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: '今天生成次数已达上限（30次），请明天再试' },
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
      console.error('[practice/custom PUT generate]', err);
      return NextResponse.json({ error: '生成失败，请换个描述再试' }, { status: 502 });
    }

    await db.run(
      `UPDATE custom_scenes SET
        title = ?, title_ko = ?, icon = ?, place = ?, situation = ?, goal = ?,
        opening_ko = ?, opening_zh = ?, mini_preview = ?, character_id = ?,
        role_ko = ?, role_zh = ?, difficulty = ?, tip_zh = ?,
        mode = ?, companion_name = ?, companion_name_zh = ?, verbal_tic = ?, avatar_url = ?, last_played_at = ?
       WHERE id = ? AND user_id = ?`,
      [
        scene.title, scene.title_ko, scene.icon, place, situation, goal,
        scene.opening_ko, scene.opening_zh, JSON.stringify(scene.mini_preview), scene.character_id,
        scene.role_ko, scene.role_zh, difficulty, scene.tip_zh,
        mode, companionName, companionNameZh, verbalTic, avatarUrl, Date.now(),
        id, auth.userId,
      ]
    );
    // 换了头像则清理旧头像文件（避免孤儿）
    if (oldAvatarUrl && oldAvatarUrl !== avatarUrl) await deleteCompanionAvatarFile(oldAvatarUrl);
    // 清旧对话会话，避免旧开场白/history 与新场景错配
    await db.run(`DELETE FROM practice_chat_sessions WHERE user_id = ? AND scene_slug = ?`, [auth.userId, id]);
    await recordAiUsage(auth.userId, 'custom_scene_create');
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[practice/custom PUT]', err);
    return NextResponse.json({ error: 'AI服务异常，请稍后重试' }, { status: 500 });
  }
}

/** DELETE /api/practice/custom/[id] → 删除场景（仅本人）+ 连带清对话会话 */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const db = await getDb();
  // 先取头像 URL，删记录后清理头像文件（避免孤儿）
  const av = await db.exec(`SELECT avatar_url FROM custom_scenes WHERE id = ? AND user_id = ?`, [id, auth.userId]);
  const avatarUrl = (av[0]?.values[0]?.[0] as string) || '';
  await db.run(`DELETE FROM custom_scenes WHERE id = ? AND user_id = ?`, [id, auth.userId]);
  await db.run(`DELETE FROM practice_chat_sessions WHERE user_id = ? AND scene_slug = ?`, [auth.userId, id]);
  if (avatarUrl) await deleteCompanionAvatarFile(avatarUrl);
  return NextResponse.json({ ok: true });
}
