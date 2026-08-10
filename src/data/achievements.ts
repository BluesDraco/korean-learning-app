// ==========================================================================
// 动物城成就系统 · 统一定义源
// --------------------------------------------------------------------------
// 全站唯一的成就清单。成就墙 UI、检测函数、分享卡都从这里读。
// 30 个成就，5 大分类，绑定动物城角色/场所/剧情。
// 检测逻辑见 src/lib/achievements/check.ts（从现成数据表反推 + 少量埋点）。
// ==========================================================================

import type { AchievementDef, AchievementCategory } from '@/types';

export const CATEGORY_META: Record<AchievementCategory, { emoji: string; title: string; titleKo: string }> = {
  start:   { emoji: '🌱', title: '启程', titleKo: '첫걸음' },
  streak:  { emoji: '🔥', title: '坚持', titleKo: '꾸준함' },
  collect: { emoji: '📚', title: '积累', titleKo: '쌓기' },
  explore: { emoji: '🧭', title: '探索', titleKo: '탐험' },
  master:  { emoji: '👑', title: '精通', titleKo: '마스터' },
};

export const CATEGORY_ORDER: AchievementCategory[] = ['start', 'streak', 'collect', 'explore', 'master'];

export const ACHIEVEMENTS: AchievementDef[] = [
  // ─── 🌱 启程 첫걸음 ───
  { id: 'first_word',       category: 'start', rarity: 'common', icon: '📝', title: '落地动物城',        titleKo: '첫 단어',     subtitle: '和兔莉学会的第一个词', goal: 1 },
  { id: 'phonetics_done',   category: 'start', rarity: 'rare',   icon: '🎓', title: '火鹤老师的毕业证',  titleKo: '한글 졸업',   subtitle: '火鹤老师为你骄傲', goal: 1, hint: '去教室学完 40 音 →' },
  { id: 'first_diary',      category: 'start', rarity: 'common', icon: '📔', title: '兔莉日记第一页',    titleKo: '첫 일기',     subtitle: '写下和兔莉的第一天', goal: 1, hint: '读完日记第一天 →' },
  { id: 'first_chat',       category: 'start', rarity: 'rare',   icon: '💬', title: '鼓起勇气开口',      titleKo: '첫 대화',     subtitle: '勇敢和兔莉说了韩语', goal: 1, hint: '去自习室开口说一句 →' },
  { id: 'first_dictation',  category: 'start', rarity: 'common', icon: '✏️', title: '猫头鹰的第一课',    titleKo: '첫 받아쓰기', subtitle: '听着写下第一个词', goal: 1, hint: '去自习室试试听写 →' },
  { id: 'first_saved_word', category: 'start', rarity: 'common', icon: '🌰', title: '松鼠铺的第一颗松果', titleKo: '첫 단어장',   subtitle: '收藏了第一个生词', goal: 1, hint: '收藏一个想背的词 →' },

  // ─── 🔥 坚持 꾸준함 ───
  { id: 'streak_3',    category: 'streak', rarity: 'common', icon: '🌤️', title: '三日之约',     titleKo: '3일 연속',      subtitle: '好的开始', goal: 3 },
  { id: 'streak_7',    category: 'streak', rarity: 'rare',   icon: '🔥', title: '一周同行',     titleKo: '7일 연속',      subtitle: '一周的陪伴刚开始', goal: 7 },
  { id: 'streak_30',   category: 'streak', rarity: 'epic',   icon: '⭐', title: '满月之友',     titleKo: '30일 연속',     subtitle: '一个月的成长看得见', goal: 30 },
  { id: 'streak_100',  category: 'streak', rarity: 'legend', icon: '👑', title: '百日勋章',     titleKo: '100일 연속',    subtitle: '百天的坚持是奇迹', goal: 100 },
  { id: 'perfect_week',category: 'streak', rarity: 'epic',   icon: '💎', title: '完美的一周',   titleKo: '완벽한 일주일', subtitle: '连续七天都完成了目标', goal: 7 },

  // ─── 📚 积累 쌓기 ───
  { id: 'words_10',    category: 'collect', rarity: 'common', icon: '📗', title: '囤了 10 颗松果',  titleKo: '단어 10',   subtitle: '词汇一点点攒起来', goal: 10 },
  { id: 'words_50',    category: 'collect', rarity: 'rare',   icon: '📘', title: '囤了 50 颗松果',  titleKo: '단어 50',   subtitle: '单词铺越来越满', goal: 50 },
  { id: 'words_100',   category: 'collect', rarity: 'rare',   icon: '📚', title: '囤了 100 颗松果', titleKo: '단어 100',  subtitle: '百词傍身', goal: 100 },
  { id: 'words_500',   category: 'collect', rarity: 'epic',   icon: '🏆', title: '囤了 500 颗松果', titleKo: '단어 500',  subtitle: '脑海里都是韩语了', goal: 500 },
  { id: 'reviews_100', category: 'collect', rarity: 'common', icon: '🔄', title: '复习百词',        titleKo: '복습 100',  subtitle: '每次复习都在变强', goal: 100 },
  { id: 'reviews_1000',category: 'collect', rarity: 'epic',   icon: '💪', title: '复习千词',        titleKo: '복습 1000', subtitle: '千锤百炼', goal: 1000 },
  { id: 'dictation_50',category: 'collect', rarity: 'rare',   icon: '🎧', title: '默写达人',        titleKo: '받아쓰기 50', subtitle: '猫头鹰都佩服你', goal: 50 },

  // ─── 🧭 探索 탐험 ───
  { id: 'first_article',   category: 'explore', rarity: 'common', icon: '📖', title: '图书馆读书证',       titleKo: '첫 글 읽기',    subtitle: '读完第一篇真正的韩语文章', goal: 1, hint: '去图书馆读一篇 →' },
  { id: 'first_picbook',   category: 'explore', rarity: 'rare',   icon: '🐻', title: '绘本馆第一个故事',   titleKo: '첫 그림책',     subtitle: '和兔莉读完第一个绘本', goal: 1, hint: '去绘本馆读一本 →' },
  { id: 'first_radio',     category: 'explore', rarity: 'rare',   icon: '📻', title: '拧开电台旋钮',       titleKo: '라디오 첫 청취', subtitle: '听了动物城的第一档节目', goal: 1, hint: '去电台听一期 →' },
  { id: 'first_post',      category: 'explore', rarity: 'rare',   icon: '🐾', title: '广场初发声',         titleKo: '첫 게시물',     subtitle: '在动物城广场发了第一条', goal: 1, hint: '去广场发条帖子 →' },
  { id: 'first_topik',     category: 'explore', rarity: 'common', icon: '📝', title: '考试教室初战',       titleKo: '첫 토픽',       subtitle: '第一次挑战 TOPIK', goal: 1, hint: '去考试教室练一次 →' },
  { id: 'topik_perfect',   category: 'explore', rarity: 'epic',   icon: '💯', title: '满分传说',           titleKo: '토픽 만점',     subtitle: '满分是对努力最好的回报', goal: 1, hint: '在 TOPIK 里拿一次满分 →' },
  { id: 'city_explorer',   category: 'explore', rarity: 'epic',   icon: '🏙️', title: '逛遍动物城',         titleKo: '동물 도시 탐방', subtitle: '走遍了动物城的每个角落', goal: 10, hint: '去逛逛还没到过的地方 →' },
  { id: 'grammar_master',  category: 'explore', rarity: 'rare',   icon: '📐', title: '语法教室毕业',       titleKo: '문법 마스터',   subtitle: '掌握了 30 个语法点', goal: 30 },

  // ─── 👑 精通 마스터 ───
  { id: 'level_5',   category: 'master', rarity: 'rare',   icon: '🎖️', title: '见习留学生',   titleKo: '레벨 5',   subtitle: '在动物城站稳了脚跟', goal: 5 },
  { id: 'level_10',  category: 'master', rarity: 'epic',   icon: '🏅', title: '动物城常驻',   titleKo: '레벨 10',  subtitle: '大家都认识你了', goal: 10 },
  { id: 'level_20',  category: 'master', rarity: 'legend', icon: '🧙', title: '兽尔名誉市民', titleKo: '레벨 20',  subtitle: '动物城因你而骄傲', goal: 20 },
  { id: 'super_grad', category: 'master', rarity: 'legend', icon: '🎊', title: '语言学校优等生', titleKo: '만렙 달성', subtitle: '满级又坚持满月，兔莉的骄傲', goal: 1, hint: '满级 + 连续 30 天 →' },
];

export const ACHIEVEMENT_BY_ID: Record<string, AchievementDef> =
  Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]));

export const RARITY_META: Record<string, { label: string }> = {
  common: { label: '普通' },
  rare:   { label: '稀有' },
  epic:   { label: '史诗' },
  legend: { label: '传说' },
};
