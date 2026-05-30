import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

export async function POST() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }

  const db = await getDb();
  await db.run(
    'UPDATE users SET onboarding_completed = 1, updated_at = ? WHERE id = ?',
    [Date.now(), auth.userId]
  );

  return NextResponse.json({ success: true });
}
