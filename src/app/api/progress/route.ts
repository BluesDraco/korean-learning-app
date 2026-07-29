import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

const NO_CACHE_HEADERS = { 'Cache-Control': 'private, no-store, max-age=0' };

export async function GET() {
  const user = await getAuthFromCookie();
  if (!user) return NextResponse.json({ collectedDays: [], newDays: [] }, { headers: NO_CACHE_HEADERS });

  const db = await getDb();
  const [result] = await db.exec(
    'SELECT sticker_id, acquired_at FROM user_tori_stickers WHERE user_id = ? ORDER BY acquired_at ASC',
    [user.userId],
  );
  if (!result) return NextResponse.json({ collectedDays: [], newDays: [] }, { headers: NO_CACHE_HEADERS });

  const { columns, values } = result;
  const stickerIdIdx = columns.indexOf('sticker_id');
  const acquiredAtIdx = columns.indexOf('acquired_at');

  const ids: number[] = [];
  const newDays: number[] = [];
  const now = Date.now();

  for (const row of values) {
    const sid = String(row[stickerIdIdx] ?? '');
    const acquiredAt = Number(row[acquiredAtIdx] ?? 0);
    const m = sid.match(/^sticker-d(\d+)$/);
    if (m) {
      const day = parseInt(m[1]);
      ids.push(day);
      if (now - acquiredAt < 10 * 60 * 1000) newDays.push(day);
    }
  }
  ids.sort((a, b) => a - b);
  newDays.sort((a, b) => a - b);

  return NextResponse.json({ collectedDays: ids, newDays }, { headers: NO_CACHE_HEADERS });
}

export async function POST(req: Request) {
  const user = await getAuthFromCookie();
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let body: { stickerId?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad request' }, { status: 400 }); }
  if (!body.stickerId) return NextResponse.json({ error: 'missing stickerId' }, { status: 400 });

  const db = await getDb();
  await db.run(
    'INSERT OR IGNORE INTO user_tori_stickers (id, user_id, sticker_id, acquired_at) VALUES (?, ?, ?, ?)',
    [`${user.userId}-${body.stickerId}`, user.userId, body.stickerId, Date.now()],
  );

  return NextResponse.json({ ok: true });
}
