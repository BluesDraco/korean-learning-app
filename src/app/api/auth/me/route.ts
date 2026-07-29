import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb, rowsToObjects } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ user: null }, { status: 401, headers: NO_STORE });
  }

  const db = await getDb();
  const result = await db.exec(
    'SELECT id, username, nickname, email, phone, role, onboarding_completed, avatar_url, created_at FROM users WHERE id = ?',
    [auth.userId]
  );

  const row = rowsToObjects(result)[0];
  if (!row) {
    return NextResponse.json({ user: null }, { status: 401, headers: NO_STORE });
  }

  return NextResponse.json({
    user: {
      id: row.id as string,
      username: row.username as string,
      nickname: row.nickname as string,
      email: row.email as string,
      phone: row.phone as string,
      role: row.role as string,
      onboardingCompleted: !!(row.onboarding_completed as number),
      avatarUrl: (row.avatar_url as string) || '',
      createdAt: row.created_at as number,
    },
  }, { headers: NO_STORE });
}
