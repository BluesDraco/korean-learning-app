import type { ToriDay } from '@/types/tori-diary';
import { day1 } from './days/day-1';
import { day2 } from './days/day-2';
import { day3 } from './days/day-3';
import { day4 } from './days/day-4';
import { day5 } from './days/day-5';
import { day6 } from './days/day-6';
import { day7 } from './days/day-7';
import { day8 } from './days/day-8';
import { day9 } from './days/day-9';
import { day10 } from './days/day-10';
import { day11 } from './days/day-11';
import { day12 } from './days/day-12';
import { day13 } from './days/day-13';
import { day14 } from './days/day-14';

/**
 * 30 天日记总入口
 * 当前已写：Day 1 ~ Day 14 (Week 1 + Week 2 完整)
 * 待写：Day 15 ~ Day 30
 */
export const days: ToriDay[] = [
  day1, day2, day3, day4, day5, day6, day7,
  day8, day9, day10, day11, day12, day13, day14,
];

export const TOTAL_DAYS = 30;

export function getDay(day: number): ToriDay | undefined {
  return days.find((d) => d.day === day);
}

/** 是否是关卡日 */
export function isCheckpoint(day: number): boolean {
  return [7, 14, 21, 26, 29, 30].includes(day);
}

/** Day 在第几周 */
export function weekOf(day: number): 1 | 2 | 3 | 4 {
  if (day <= 7) return 1;
  if (day <= 14) return 2;
  if (day <= 21) return 3;
  return 4;
}

export { stickers, getStickerByDay, getStickerById } from './stickers';
