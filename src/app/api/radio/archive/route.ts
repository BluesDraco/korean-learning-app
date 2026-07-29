import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getUserCurrentDay } from '@/lib/server/blog';
import { clampRadioDay, getEpisodesUpToDay } from '@/lib/server/radioData';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

// 往期库：已解锁的全部期（Day 1..用户当前Day）轻量元数据，按 day 降序。
// 发布节奏跟用户日记 Day 走；未登录 / 没开始 → 只第 1 期。
export async function GET() {
  const auth = await getAuthFromCookie();
  const raw = auth ? await getUserCurrentDay(auth.userId) : 1;
  const day = clampRadioDay(raw);
  return NextResponse.json({ day, episodes: getEpisodesUpToDay(day) }, { headers: NO_STORE });
}
