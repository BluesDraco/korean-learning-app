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

  // Week 3 · 独立生活技能
  { id: 'sticker-d15', day: 15, title: '老犬中介的册子', meaning: '第一次说出"찾고 있어요"', paletteHint: 'cream' },
  { id: 'sticker-d16', day: 16, title: '海狸大叔的柴犬', meaning: '迷路 30 分钟后终于开口问路', paletteHint: 'mint' },
  { id: 'sticker-d17', day: 17, title: '猫头鹰的티머니카드', meaning: '拿到首尔的钥匙——一卡通在手', paletteHint: 'yellow' },
  { id: 'sticker-d18', day: 18, title: '乌龟柜员的통장', meaning: '深蓝烫金 KB 通帐 + 第一本韩国账户', paletteHint: 'purple' },
  { id: 'sticker-d19', day: 19, title: '兔护士的처방전', meaning: '第一次自己挂号看내과', paletteHint: 'peach' },
  { id: 'sticker-d20', day: 20, title: '海豹房东的500/50/5', meaning: '问出"관리비에 뭐가 들어 있어요"', paletteHint: 'pink' },
  { id: 'sticker-d21', day: 21, title: '🎉 关卡 3 通关', meaning: '银钥匙圈上挂着 Daiso 胡萝卜', paletteHint: 'gold' },

  // Week 4 · 社交融入 + 毕业
  { id: 'sticker-d22', day: 22, title: '火鹤老师的해요体', meaning: '韩语动词的心脏 — 三规则', paletteHint: 'pink' },
  { id: 'sticker-d23', day: 23, title: '弘대 생카', meaning: '老虎追星的样子终于看见了', paletteHint: 'purple' },
  { id: 'sticker-d24', day: 24, title: '第一次群聊@', meaning: '같이 가요! 어디서 만나요?', paletteHint: 'mint' },
  { id: 'sticker-d25', day: 25, title: '한강 3000 人浪潮', meaning: '사랑해! 응원해! 따라해!', paletteHint: 'peach' },
  { id: 'sticker-d26', day: 26, title: '🎉 关卡 4 通关', meaning: '鹿店员的하루 시그니처 + 小卡', paletteHint: 'gold' },
  { id: 'sticker-d27', day: 27, title: 'Minji 的 60,000 원', meaning: '请客不是交易，是友情的轮流', paletteHint: 'cream' },
  { id: 'sticker-d28', day: 28, title: '牛皮日记本的第一页', meaning: '过去时 — 把日子留下来的钥匙', paletteHint: 'yellow' },
  { id: 'sticker-d29', day: 29, title: '🎉 关卡 5 通关', meaning: '7/10 通过 — 给 Minji 写完整封信', paletteHint: 'gold' },
  { id: 'sticker-d30', day: 30, title: '🎓 졸업이에요', meaning: '5 根胡萝卜 + 烫金毕业证书 + 红丝带花束', paletteHint: 'gold' },
];

export function getStickerByDay(day: number): ToriSticker | undefined {
  return stickers.find((s) => s.day === day);
}

export function getStickerById(id: string): ToriSticker | undefined {
  return stickers.find((s) => s.id === id);
}
