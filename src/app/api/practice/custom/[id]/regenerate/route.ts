import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';
import { generateCustomSceneDeepSeek, type CustomSceneDifficulty } from '@/lib/deepseek';
import { checkAiRateLimit, recordAiUsage } from '@/lib/server/rate-limit';
import { SCENE_CAST } from '@/data/sceneCast';

// 含鉴权/用户数据：强制 dynamic
export const dynamic = 'force-dynamic';

/** POST /api/practice/custom/[id]/regenerate → 只重生词/句/示范对话（换一批词句），不动标题/开场白/角色 */
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // 重生成只作用于用户已拥有的场景（不新增数量），各档均可；仅受下方每日防刷上限。

  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const apiKey = process.env.DEEPSEEK_CHAT_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 503 });

  const db = await getDb();
  const res = await db.exec(
    `SELECT place, situation, goal, difficulty, character_id FROM custom_scenes WHERE id = ? AND user_id = ?`,
    [id, auth.userId]
  );
  const row = res[0]?.values[0];
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const limit = await checkAiRateLimit(auth.userId, 'custom_scene_create', 30);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: '今天生成场景次数已达上限（30次），请明天再试' },
      { status: 429, headers: { 'X-RateLimit-Limit': '30', 'Retry-After': '86400' } },
    );
  }

  const difficulty = ((row[3] as string) || 'intermediate') as CustomSceneDifficulty;
  const characterId = (row[4] as string) || undefined;

  let result;
  try {
    result = await generateCustomSceneDeepSeek(
      {
        place: row[0] as string, situation: row[1] as string, goal: row[2] as string,
        difficulty, characterId, roster: SCENE_CAST,
      },
      apiKey,
      'words'
    ) as { mini_preview: unknown };
  } catch (err) {
    console.error('[practice/custom regenerate]', err);
    return NextResponse.json({ error: '生成失败，请稍后再试' }, { status: 502 });
  }

  await db.run(`UPDATE custom_scenes SET mini_preview = ? WHERE id = ? AND user_id = ?`,
    [JSON.stringify(result.mini_preview), id, auth.userId]);
  await recordAiUsage(auth.userId, 'custom_scene_create');
  return NextResponse.json({ mini_preview: result.mini_preview });
}
