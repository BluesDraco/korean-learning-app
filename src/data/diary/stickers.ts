import type { ToriSticker } from '@/types/tori-diary';

/**
 * 30 天贴纸合集
 * 完成 Day N 即获得 sticker-d{NN}
 */
export const stickers: ToriSticker[] = [
  // Week 1 · 准备出发到落地报到
  { id: 'sticker-d01', day: 1, title: '出发前夜', meaning: '镜子前练了 100 遍 안녕하세요', paletteHint: 'pink' },
  { id: 'sticker-d02', day: 2, title: '空中第一杯可乐', meaning: '对仙鹤空乘说出了第一句韩语', paletteHint: 'peach' },
  { id: 'sticker-d03', day: 3, title: 'Minji & 짐 vs 집', meaning: '在机场翻车却交到了第一个朋友', paletteHint: 'mint' },
  { id: 'sticker-d04', day: 4, title: '301 号钥匙', meaning: '宿舍报到完成，钥匙上有一个小胡萝卜', paletteHint: 'yellow' },
  { id: 'sticker-d05', day: 5, title: '隔壁的 Haru', meaning: '邻居仓鼠也是 KPOP 迷', paletteHint: 'pink' },
  { id: 'sticker-d06', day: 6, title: 'Junho 班长', meaning: '虎牙的老虎其实在追中国偶像', paletteHint: 'purple' },
  { id: 'sticker-d07', day: 7, title: '🎉 关卡 1 通关', meaning: '完整撑过一周入住检查', paletteHint: 'gold' },

  // Week 2 · 日常生活技能
  { id: 'sticker-d08', day: 8, title: '第一个紫菜包饭', meaning: '一个人在 CU 买了金枪鱼饭团', paletteHint: 'cream' },
  { id: 'sticker-d09', day: 9, title: '万元的故事', meaning: 'Minji 教我读 만 원', paletteHint: 'yellow' },
  { id: 'sticker-d10', day: 10, title: '人生第一碗大酱汤', meaning: '袋鼠阿姨说没有泡菜汤，但有대장汤', paletteHint: 'peach' },
  { id: 'sticker-d11', day: 11, title: 'Daiso 千元世界', meaning: '一次买齐生活套装 + 胡萝卜钥匙扣', paletteHint: 'mint' },
  { id: 'sticker-d12', day: 12, title: '第一杯热拿铁', meaning: '猫店员对我眨眼，咖啡香到想哭', paletteHint: 'pink' },
  { id: 'sticker-d13', day: 13, title: '약국 Haru', meaning: '在韩国第一次生病，第一次自己买药', paletteHint: 'purple' },
  { id: 'sticker-d14', day: 14, title: '🎉 关卡 2 通关', meaning: '一个人完整点完一杯咖啡', paletteHint: 'gold' },

  // Day 15-30 待补
];

export function getStickerByDay(day: number): ToriSticker | undefined {
  return stickers.find((s) => s.day === day);
}

export function getStickerById(id: string): ToriSticker | undefined {
  return stickers.find((s) => s.id === id);
}
