import type { RadioCard } from '@/types';
import { getEpisodesByDay } from '@/lib/server/radioData';
import { getUserCurrentDay } from '@/lib/server/blog';

// 电台卡混入博客 feed：与博客同一条时间轴（日记 Day）。
// 只在服务端 import radioCast（301KB），映射成轻量 DTO 后返回，字幕/生词不进客户端包。
// 单一数据源 = radioCast，radio 侧内容一改这里自动跟上，时间/人物不会与电台页脱节。
export async function getRadioCardsForDay(userId?: string): Promise<{ day: number; cards: RadioCard[] }> {
  const day = await getUserCurrentDay(userId);
  const cards = getEpisodesByDay(day);
  return { day, cards };
}
