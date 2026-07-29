import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getBlogNotifications } from '@/lib/server/blog';

export const dynamic = 'force-dynamic';

// 每用户私有的通知，绝不能被 CDN/代理跨用户缓存（同 6-26 串号事故门类）
const NO_STORE = { 'Cache-Control': 'private, no-store' };

// GET — 当前用户的博客通知列表 + 未读数（未登录返回空）
export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ items: [], unread: 0 }, { headers: NO_STORE });
  }
  const result = await getBlogNotifications(auth.userId);
  return NextResponse.json(result, { headers: NO_STORE });
}
