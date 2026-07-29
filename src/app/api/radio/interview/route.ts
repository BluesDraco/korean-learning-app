import { NextResponse } from 'next/server';
import { getInterviewEpisodes } from '@/lib/server/radioData';

// 访谈专区 10 期轻量元数据（不含 subtitles/vocab）。
// 与日播不同：内容独立、不受日记 Day 门控，全部可见可听，故可静态缓存。
export async function GET() {
  return NextResponse.json({ episodes: getInterviewEpisodes() });
}
