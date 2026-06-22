import type { ToriSticker } from '@/types/tori-diary';

/**
 * 30 天贴纸合集
 * Day 1 完成后获得 sticker-d01，依此类推
 * 完整 30 张待补，Day 2-30 随后补齐
 */
export const stickers: ToriSticker[] = [
  {
    id: 'sticker-d01',
    day: 1,
    title: '出发前夜',
    meaning: '镜子前练了 100 遍 "안녕하세요"',
    paletteHint: 'pink',
  },
  // Day 2-30 待补
];

export function getStickerByDay(day: number): ToriSticker | undefined {
  return stickers.find((s) => s.day === day);
}

export function getStickerById(id: string): ToriSticker | undefined {
  return stickers.find((s) => s.id === id);
}
