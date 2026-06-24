import type { ToriDay, ToriLevel } from '@/types/tori-diary';
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
import { day15 } from './days/day-15';
import { day16 } from './days/day-16';
import { day17 } from './days/day-17';
import { day18 } from './days/day-18';
import { day19 } from './days/day-19';
import { day20 } from './days/day-20';
import { day21 } from './days/day-21';
import { day22 } from './days/day-22';
import { day23 } from './days/day-23';
import { day24 } from './days/day-24';
import { day25 } from './days/day-25';
import { day26 } from './days/day-26';
import { day27 } from './days/day-27';
import { day28 } from './days/day-28';
import { day29 } from './days/day-29';
import { day30 } from './days/day-30';

/**
 * 90 天日记总入口 (3 级 × 30 天)
 * 目前 beginner 级 Day 1-30 已完成，intermediate/advanced 待填充
 */
export const days: ToriDay[] = [
  day1, day2, day3, day4, day5, day6, day7,
  day8, day9, day10, day11, day12, day13, day14,
  day15, day16, day17, day18, day19, day20, day21,
  day22, day23, day24, day25, day26, day27, day28, day29, day30,
];

/** 按级别获取该级别的所有天 */
export function getLevel(level: ToriLevel): ToriDay[] {
  return days.filter((d) => d.level === level);
}

export const TOTAL_DAYS_PER_LEVEL = 30;
export const TOTAL_LEVELS = 3;
export const TOTAL_DAYS = TOTAL_DAYS_PER_LEVEL * TOTAL_LEVELS;

export function getDay(level: ToriLevel, day: number): ToriDay | undefined {
  return days.find((d) => d.level === level && d.day === day);
}

/** 是否是关卡日（每级内部） */
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
