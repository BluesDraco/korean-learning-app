import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ user: null });
  }

  const db = await getDb();
  const result = await db.exec(
    'SELECT id, username, nickname, email, role, onboarding_completed, created_at FROM users WHERE id = ?',
    [auth.userId]
  );

  if (result.length === 0 || result[0].values.length === 0) {
    return NextResponse.json({ user: null });
  }

  const row = result[0].values[0];
  return NextResponse.json({
    user: {
      id: row[0] as string,
      username: row[1] as string,
      nickname: row[2] as string,
      email: row[3] as string,
      role: row[4] as string,
      onboardingCompleted: !!(row[5] as number),
      createdAt: row[6] as number,
    },
  });
}
