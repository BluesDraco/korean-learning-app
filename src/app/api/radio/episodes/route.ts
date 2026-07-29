import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getUserCurrentDay } from '@/lib/server/blog';
import { clampRadioDay, getEpisodesByDay } from '@/lib/server/radioData';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

// 当天 4 档节目的轻量元数据（不含 subtitles/vocab，约 2KB）。
// 发布节奏跟用户日记 Day 走；未登录 / 没开始 → 第 1 期。
export async function GET() {
  const auth = await getAuthFromCookie();
  const raw = auth ? await getUserCurrentDay(auth.userId) : 1;
  const day = clampRadioDay(raw);
  return NextResponse.json({ day, episodes: getEpisodesByDay(day) }, { headers: NO_STORE });
}
