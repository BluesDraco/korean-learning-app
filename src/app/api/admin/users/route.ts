import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json({ error: '无权限访问' }, { status: 403 });
  }

  const db = await getDb();
  const result = await db.exec(
    'SELECT id, username, nickname, email, role, created_at, updated_at FROM users ORDER BY created_at DESC'
  );

  const users = result.length > 0
    ? result[0].values.map((row) => ({
        id: row[0] as string,
        username: row[1] as string,
        nickname: row[2] as string,
        email: row[3] as string,
        role: row[4] as string,
        createdAt: row[5] as number,
        updatedAt: row[6] as number,
      }))
    : [];

  const totalResult = await db.exec('SELECT COUNT(*) FROM users');
  const total = totalResult.length > 0 ? (totalResult[0].values[0][0] as number) : 0;

  return NextResponse.json({ users, total });
}
