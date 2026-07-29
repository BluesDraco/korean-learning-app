import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

// 含鉴权/用户数据：强制 dynamic
export const dynamic = 'force-dynamic';

/** GET /api/practice/session?slug=haru-cafe → 恢复该场景最新会话 */
export async function GET(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const slug = new URL(req.url).searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  const db = await getDb();
  const res = await db.exec(
    `SELECT messages, chat_task_idx, has_sent, completed, updated_at
     FROM practice_chat_sessions
     WHERE user_id = ? AND scene_slug = ?`,
    [auth.userId, slug]
  );
  const row = res[0]?.values[0];
  if (!row) return NextResponse.json({ session: null });
  let messages: unknown[] = [];
  try {
    const raw = row[0] as string;
    messages = raw ? JSON.parse(raw) : [];
  } catch { messages = []; }
  return NextResponse.json({
    session: {
      messages,
      chatTaskIdx: Number(row[1] ?? 0),
      hasSent: Number(row[2] ?? 0) === 1,
      completed: Number(row[3] ?? 0) === 1,
      updatedAt: Number(row[4] ?? 0),
    },
  });
}

/** POST /api/practice/session { slug, messages, chatTaskIdx, hasSent, completed } */
export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { slug, messages, chatTaskIdx = 0, hasSent = false, completed = false } = body ?? {};
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages must be array' }, { status: 400 });
    }
    const messagesJson = JSON.stringify(messages);
    if (messagesJson.length > 100_000) {
      return NextResponse.json({ error: 'Session too large' }, { status: 413 });
    }

    const db = await getDb();
    const now = Date.now();
    await db.run(
      `INSERT INTO practice_chat_sessions
       (id, user_id, scene_slug, messages, chat_task_idx, has_sent, completed, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(user_id, scene_slug) DO UPDATE SET
         messages = excluded.messages,
         chat_task_idx = excluded.chat_task_idx,
         has_sent = excluded.has_sent,
         completed = excluded.completed,
         updated_at = excluded.updated_at`,
      [
        crypto.randomUUID(),
        auth.userId,
        slug,
        messagesJson,
        chatTaskIdx,
        hasSent ? 1 : 0,
        completed ? 1 : 0,
        now,
      ]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[practice/session POST]', err);
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}

/** DELETE /api/practice/session?slug=xxx → 清除会话（重开） */
export async function DELETE(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const slug = new URL(req.url).searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  const db = await getDb();
  await db.run(
    `DELETE FROM practice_chat_sessions WHERE user_id = ? AND scene_slug = ?`,
    [auth.userId, slug]
  );
  return NextResponse.json({ ok: true });
}
