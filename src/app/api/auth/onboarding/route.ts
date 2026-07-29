import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getDb } from '@/lib/server/db';

// 6-26 事故兜底
export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };

export async function POST() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: '请先登录' }, { status: 401, headers: NO_STORE });
  }

  const db = await getDb();
  await db.run(
    'UPDATE users SET onboarding_completed = 1, updated_at = ? WHERE id = ?',
    [Date.now(), auth.userId]
  );

  return NextResponse.json({ success: true }, { headers: NO_STORE });
}
