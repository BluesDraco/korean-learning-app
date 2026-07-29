import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { markBlogNotificationsRead } from '@/lib/server/blog';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };

// POST — 把当前用户已揭晓的通知全部标记为已读
export async function POST() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: '未登录' }, { status: 401, headers: NO_STORE });
  }
  await markBlogNotificationsRead(auth.userId);
  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}
