import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ count: 0 });
  }

  const db = await getDb();

  // Count announcements for user that haven't been read
  const result = await db.exec(
    `SELECT COUNT(*) FROM announcements a
     WHERE (a.target_user_id IS NULL OR a.target_user_id = ?)
     AND a.id NOT IN (
       SELECT announcement_id FROM announcement_reads WHERE user_id = ?
     )`,
    [auth.userId, auth.userId]
  );

  return NextResponse.json({ count: result[0]?.values[0]?.[0] ?? 0 });
}
