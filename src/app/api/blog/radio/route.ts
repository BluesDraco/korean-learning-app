import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getRadioCardsForDay } from '@/lib/server/blogRadio';

export const dynamic = 'force-dynamic';

// 电台卡按用户 Day 解锁，随用户不同 → 不可被 CDN/代理跨用户缓存
const NO_STORE = { 'Cache-Control': 'private, no-store' };

// GET — 混入博客 feed 的电台卡（按用户当前日记 Day 取当天节目）。公开；未登录默认 Day 1。
export async function GET() {
  const auth = await getAuthFromCookie();
  const data = await getRadioCardsForDay(auth?.userId);
  return NextResponse.json(data, { headers: NO_STORE });
}
