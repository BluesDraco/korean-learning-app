import { NextResponse } from 'next/server';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getUserCurrentDay } from '@/lib/server/blog';
import { clampRadioDay } from '@/lib/server/radioData';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

// 电台内容独立于日记剧情，但发布节奏跟用户进度走：
// 按用户当前日记 Day 解锁对应期数的听力库，夹到已囤范围（超出回落到最新已囤期）。
// 未登录 / 没开始日记 → 第 1 期。
export async function GET() {
  const auth = await getAuthFromCookie();
  const raw = auth ? await getUserCurrentDay(auth.userId) : 1;
  return NextResponse.json({ day: clampRadioDay(raw) }, { headers: NO_STORE });
}
