import type { ToriSticker } from '@/types/tori-diary';

/**
 * 30 天贴纸合集
 * 完成 Day N 即获得 sticker-d{NN}
 * 完整 30 张待补，每个 Day 添加新内容时补对应贴纸
 */
export const stickers: ToriSticker[] = [
  {
    id: 'sticker-d01',
    day: 1,
    title: '出发前夜',
    meaning: '镜子前练了 100 遍 안녕하세요',
    paletteHint: 'pink',
  },
  {
    id: 'sticker-d02',
    day: 2,
    title: '空中第一杯可乐',
    meaning: '对仙鹤空乘说出了第一句韩语',
    paletteHint: 'peach',
  },
  {
    id: 'sticker-d03',
    day: 3,
    title: 'Minji & 짐 vs 집',
    meaning: '在机场翻车却交到了第一个朋友',
    paletteHint: 'mint',
  },
  {
    id: 'sticker-d04',
    day: 4,
    title: '301 号钥匙',
    meaning: '宿舍报到完成，钥匙上有一个小胡萝卜',
    paletteHint: 'yellow',
  },
  {
    id: 'sticker-d05',
    day: 5,
    title: '隔壁的 Haru',
    meaning: '邻居仓鼠也是 KPOP 迷',
    paletteHint: 'pink',
  },
  {
    id: 'sticker-d06',
    day: 6,
    title: 'Junho 班长',
    meaning: '虎牙的老虎其实在追中国偶像',
    paletteHint: 'purple',
  },
  {
    id: 'sticker-d07',
    day: 7,
    title: '🎉 关卡 1 通关',
    meaning: '完整撑过一周入住检查',
    paletteHint: 'gold',
  },
  // Day 8-30 待补
];

export function getStickerByDay(day: number): ToriSticker | undefined {
  return stickers.find((s) => s.day === day);
}

export function getStickerById(id: string): ToriSticker | undefined {
  return stickers.find((s) => s.id === id);
}
