import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { requireAdmin } from '@/lib/server/admin-guard';

export async function GET() {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) return adminCheck.response;

  const db = await getDb();

  const result = await db.exec(`
    SELECT f.id, f.path, f.type, f.message, f.status, f.created_at,
           u.id as user_id, u.username, u.nickname
    FROM feedbacks f
    LEFT JOIN users u ON f.user_id = u.id
    ORDER BY f.created_at DESC
    LIMIT 200
  `);

  const feedbacks = result.length > 0
    ? result[0].values.map((row) => ({
        id: row[0] as string,
        path: row[1] as string,
        type: row[2] as string,
        message: row[3] as string,
        status: row[4] as string,
        created_at: row[5] as number,
        user_id: row[6] as string | null,
        username: row[7] as string | null,
        nickname: row[8] as string | null,
      }))
    : [];

  return NextResponse.json({ feedbacks });
}
