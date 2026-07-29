import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

// 6-26 事故兜底：含鉴权/用户数据的 API 必须 force-dynamic，禁止 Next.js 自动缓存
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { announcementId } = await req.json();
  if (!announcementId) {
    return NextResponse.json({ error: 'announcementId required' }, { status: 400 });
  }

  const db = await getDb();

  // Check if already marked read
  const existing = await db.exec(
    'SELECT id FROM announcement_reads WHERE announcement_id = ? AND user_id = ?',
    [announcementId, auth.userId]
  );
  if (existing[0]?.values.length === 0) {
    await db.run(
      'INSERT INTO announcement_reads (id, announcement_id, user_id, read_at) VALUES (?, ?, ?, ?)',
      [crypto.randomUUID(), announcementId, auth.userId, Date.now()]
    );
  }

  return NextResponse.json({ ok: true });
}
