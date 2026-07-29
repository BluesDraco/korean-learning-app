import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

// GET — admin lists all announcements (including inactive/withdrawn) for history + withdraw
export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = await getDb();
  const userResult = await db.exec('SELECT role FROM users WHERE id = ?', [auth.userId]);
  const role = userResult[0]?.values[0]?.[0] as string;
  if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const result = await db.exec(
    `SELECT a.id, a.title, a.content, a.type, a.target_user_id, a.created_at, a.is_active,
            u.username AS target_username
     FROM announcements a
     LEFT JOIN users u ON u.id = a.target_user_id
     ORDER BY a.created_at DESC
     LIMIT 50`
  );

  const rows = result[0]?.values.map((r: unknown[]) => ({
    id: r[0] as string,
    title: r[1] as string,
    content: r[2] as string,
    type: r[3] as string,
    targetUserId: (r[4] as string) ?? null,
    createdAt: r[5] as number,
    isActive: (r[6] as number ?? 1) === 1,
    targetUsername: (r[7] as string) ?? null,
  })) ?? [];

  return NextResponse.json(rows);
}
