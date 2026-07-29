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
import { day31 } from './days/day-31';
import { day32 } from './days/day-32';
import { day33 } from './days/day-33';
import { day34 } from './days/day-34';
import { day35 } from './days/day-35';
import { day36 } from './days/day-36';
import { day37 } from './days/day-37';
import { day38 } from './days/day-38';
import { day39 } from './days/day-39';
import { day40 } from './days/day-40';
import { day41 } from './days/day-41';
import { day42 } from './days/day-42';
import { day43 } from './days/day-43';
import { day44 } from './days/day-44';
import { day45 } from './days/day-45';
import { day46 } from './days/day-46';
import { day47 } from './days/day-47';
import { day48 } from './days/day-48';
import { day49 } from './days/day-49';
import { day50 } from './days/day-50';
import { day51 } from './days/day-51';
import { day52 } from './days/day-52';
import { day53 } from './days/day-53';
import { day54 } from './days/day-54';
import { day55 } from './days/day-55';
import { day56 } from './days/day-56';
import { day57 } from './days/day-57';
import { day58 } from './days/day-58';
import { day59 } from './days/day-59';
import { day60 } from './days/day-60';
import { day61 } from './days/day-61';
import { day62 } from './days/day-62';
import { day63 } from './days/day-63';
import { day64 } from './days/day-64';
import { day65 } from './days/day-65';
import { day66 } from './days/day-66';
import { day67 } from './days/day-67';
import { day68 } from './days/day-68';
import { day69 } from './days/day-69';
import { day70 } from './days/day-70';
import { day71 } from './days/day-71';
import { day72 } from './days/day-72';
import { day73 } from './days/day-73';
import { day74 } from './days/day-74';
import { day75 } from './days/day-75';
import { day76 } from './days/day-76';
import { day77 } from './days/day-77';
import { day78 } from './days/day-78';
import { day79 } from './days/day-79';
import { day80 } from './days/day-80';
import { day81 } from './days/day-81';
import { day82 } from './days/day-82';
import { day83 } from './days/day-83';
import { day84 } from './days/day-84';
import { day85 } from './days/day-85';
import { day86 } from './days/day-86';
import { day87 } from './days/day-87';
import { day88 } from './days/day-88';
import { day89 } from './days/day-89';
import { day90 } from './days/day-90';

/**
 * 90 天日记总入口 (3 级 × 30 天)
 * 目前 beginner 级 Day 1-30 已完成，intermediate/advanced 待填充
 */
export const days: ToriDay[] = [
  day1, day2, day3, day4, day5, day6, day7,
  day8, day9, day10, day11, day12, day13, day14,
  day15, day16, day17, day18, day19, day20, day21,
  day22, day23, day24, day25, day26, day27, day28, day29, day30,
  day31, day32, day33, day34, day35, day36, day37, day38, day39, day40,
  day41, day42, day43, day44, day45, day46, day47, day48, day49, day50,
  day51, day52, day53, day54, day55, day56, day57, day58, day59, day60,
  day61, day62, day63, day64, day65, day66, day67, day68, day69, day70,
  day71, day72, day73, day74, day75, day76, day77, day78, day79, day80,
  day81, day82, day83, day84, day85, day86, day87, day88, day89, day90,
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


/** Day 在第几周 */
export function weekOf(day: number): 1 | 2 | 3 | 4 {
  if (day <= 7) return 1;
  if (day <= 14) return 2;
  if (day <= 21) return 3;
  return 4;
}

