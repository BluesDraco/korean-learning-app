// TOPIK 我的 tab 的纯计算工具函数
// 只从已有数据（TopikSession / TopikTypeMastery）派生，不做副作用

import type { TopikSession, TopikTypeMastery } from '@/types';
import { topikQuestionTypes, type TopikQuestionTypeMeta } from '@/data/topikQuestionTypes';
import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/i18n';

const DAY_MS = 86400000;

function ymd(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

// 连续打卡天数 + 最长连续打卡
export function computeStreak(sessions: TopikSession[]): { current: number; longest: number } {
  if (sessions.length === 0) return { current: 0, longest: 0 };
  const days = new Set(sessions.map(s => ymd(s.completedAt)));
  const todayStr = ymd(Date.now());
  const yesterdayStr = ymd(Date.now() - DAY_MS);

  // current: 从今天/昨天开始往回连续
  let current = 0;
  let cursor = days.has(todayStr) ? Date.now() : (days.has(yesterdayStr) ? Date.now() - DAY_MS : 0);
  while (cursor > 0 && days.has(ymd(cursor))) {
    current++;
    cursor -= DAY_MS;
  }

  // longest: 遍历所有天，算最长连续
  const sortedDays = Array.from(days).map(s => {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d).getTime();
  }).sort((a, b) => a - b);
  let longest = 0;
  let run = 0;
  let prev = 0;
  for (const t of sortedDays) {
    if (prev && t - prev === DAY_MS) run++;
    else run = 1;
    if (run > longest) longest = run;
    prev = t;
  }
  return { current, longest };
}

// 最近 7 天每日答题数（今天在最右）
export function last7DaysActivity(sessions: TopikSession[]): { date: string; count: number; correct: number }[] {
  const buckets: { date: string; count: number; correct: number }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today.getTime() - i * DAY_MS);
    const key = ymd(d.getTime());
    buckets.push({ date: key, count: 0, correct: 0 });
  }
  const bucketMap = new Map(buckets.map(b => [b.date, b]));
  for (const s of sessions) {
    const key = ymd(s.completedAt);
    const b = bucketMap.get(key);
    if (b) {
      b.count += s.totalCount;
      b.correct += s.correctCount;
    }
  }
  return buckets;
}

// 最近 12 次 exam 模式的分数走势（真题+仿真）
export function scoreTrend(sessions: TopikSession[]): { at: number; score: number; total: number; label: string }[] {
  const exams = sessions
    .filter(s => s.mode === 'exam')
    .sort((a, b) => a.completedAt - b.completedAt)
    .slice(-12);
  return exams.map((s, i) => ({
    at: s.completedAt,
    score: s.score,
    total: s.totalCount,
    label: `#${i + 1}`,
  }));
}

// 平均正确率 (全部 session，correctCount / totalCount)
export function averageAccuracy(sessions: TopikSession[]): number {
  const totals = sessions.reduce((acc, s) => {
    acc.c += s.correctCount;
    acc.t += s.totalCount;
    return acc;
  }, { c: 0, t: 0 });
  return totals.t > 0 ? totals.c / totals.t : 0;
}

// 累计答题量
export function totalQuestionsAnswered(sessions: TopikSession[]): number {
  return sessions.reduce((acc, s) => acc + s.totalCount, 0);
}

// 累计学习时长（分钟）
export function totalMinutes(sessions: TopikSession[]): number {
  return Math.round(sessions.reduce((acc, s) => acc + s.durationSec, 0) / 60);
}

// 弱项题型（按 mastery 排序，取最需要练的 N 个）
export interface WeakType {
  meta: TopikQuestionTypeMeta;
  attempts: number;
  correct: number;
  rate: number;
}
export function weakestTypes(mastery: TopikTypeMastery[], n = 6): WeakType[] {
  const arr = mastery
    .filter(m => m.attempts >= 3)  // 至少练过 3 题才算样本足够
    .map(m => {
      const meta = topikQuestionTypes.find(t => t.key === m.questionType);
      if (!meta) return null;
      return { meta, attempts: m.attempts, correct: m.correct, rate: m.correct / m.attempts };
    })
    .filter((x): x is WeakType => x !== null)
    .sort((a, b) => a.rate - b.rate);
  return arr.slice(0, n);
}

// 今日推荐训练题量（按目标日期紧迫度调整）
export function recommendedDailyCount(dailyGoal: number, targetDate?: number, lang: Lang = 'zh'): { count: number; reason: string } {
  if (!targetDate) return { count: dailyGoal, reason: t('topik.mine_daily_quota', lang) };
  const daysLeft = Math.ceil((targetDate - Date.now()) / DAY_MS);
  if (daysLeft <= 0) return { count: dailyGoal, reason: t('topik.mine_exam_today', lang, { n: dailyGoal }) };
  if (daysLeft <= 7) return { count: dailyGoal * 2, reason: t('topik.mine_sprint', lang, { days: daysLeft }) };
  if (daysLeft <= 30) return { count: Math.round(dailyGoal * 1.5), reason: t('topik.mine_speedup', lang, { days: daysLeft }) };
  return { count: dailyGoal, reason: t('topik.mine_steady', lang, { days: daysLeft }) };
}

// 徽章清单（成就系统）
export interface Badge {
  key: string;
  name: string;
  desc: string;
  nameEn: string;
  descEn: string;
  emoji: string;
  earned: boolean;
  progress?: string;
}
export function computeBadges(sessions: TopikSession[], mastery: TopikTypeMastery[]): Badge[] {
  const totalQs = totalQuestionsAnswered(sessions);
  const streak = computeStreak(sessions);
  const masteredTypes = mastery.filter(m => m.attempts >= 5 && m.correct / m.attempts >= 0.9).length;
  const examCount = sessions.filter(s => s.mode === 'exam').length;
  const avg = averageAccuracy(sessions);

  return [
    { key: 'first-step',   name: '初出茅庐',   desc: '完成 1 次练习',   nameEn: 'First Step',      descEn: 'Complete 1 practice',        emoji: '🌱', earned: sessions.length >= 1 },
    { key: 'streak-3',     name: '三日打卡',   desc: '连续 3 天练习',   nameEn: '3-Day Streak',    descEn: 'Practice 3 days in a row',   emoji: '🔥', earned: streak.longest >= 3,   progress: `${streak.longest}/3` },
    { key: 'streak-7',     name: '一周不断',   desc: '连续 7 天练习',   nameEn: '7-Day Streak',    descEn: 'Practice 7 days in a row',   emoji: '⚡', earned: streak.longest >= 7,   progress: `${streak.longest}/7` },
    { key: 'streak-30',    name: '月度铁人',   desc: '连续 30 天练习',  nameEn: 'Monthly Ironman', descEn: 'Practice 30 days in a row',  emoji: '👑', earned: streak.longest >= 30,  progress: `${streak.longest}/30` },
    { key: 'qs-100',       name: '百题斩',     desc: '累计答题 100',    nameEn: 'Century',         descEn: 'Answer 100 questions total', emoji: '💯', earned: totalQs >= 100,        progress: `${totalQs}/100` },
    { key: 'qs-500',       name: '五百题斩',   desc: '累计答题 500',    nameEn: 'Five Hundred',    descEn: 'Answer 500 questions total', emoji: '📚', earned: totalQs >= 500,        progress: `${totalQs}/500` },
    { key: 'qs-1000',      name: '千题斩',     desc: '累计答题 1000',   nameEn: 'One Thousand',    descEn: 'Answer 1000 questions total',emoji: '🏆', earned: totalQs >= 1000,       progress: `${totalQs}/1000` },
    { key: 'exam-1',       name: '首考出征',   desc: '完成 1 套试卷',   nameEn: 'First Exam',      descEn: 'Complete 1 full exam',       emoji: '📝', earned: examCount >= 1 },
    { key: 'exam-5',       name: '五套模拟',   desc: '完成 5 套试卷',   nameEn: 'Five Exams',      descEn: 'Complete 5 full exams',      emoji: '🎯', earned: examCount >= 5,        progress: `${examCount}/5` },
    { key: 'exam-10',      name: '十套精通',   desc: '完成 10 套试卷',  nameEn: 'Ten Exams',       descEn: 'Complete 10 full exams',     emoji: '🥇', earned: examCount >= 10,       progress: `${examCount}/10` },
    { key: 'accuracy-70',  name: '稳定发挥',   desc: '平均正确率 ≥70%', nameEn: 'Steady Hand',     descEn: 'Average accuracy ≥70%',      emoji: '🎖', earned: avg >= 0.7 },
    { key: 'accuracy-85',  name: '高分达人',   desc: '平均正确率 ≥85%', nameEn: 'High Scorer',     descEn: 'Average accuracy ≥85%',      emoji: '🌟', earned: avg >= 0.85 },
    { key: 'type-5',       name: '五型掌握',   desc: '掌握 5 种题型',   nameEn: 'Five Types',      descEn: 'Master 5 question types',    emoji: '🧩', earned: masteredTypes >= 5,    progress: `${masteredTypes}/5` },
    { key: 'type-15',      name: '十五型精通', desc: '掌握 15 种题型',  nameEn: 'Fifteen Types',   descEn: 'Master 15 question types',   emoji: '💎', earned: masteredTypes >= 15,   progress: `${masteredTypes}/15` },
  ];
}
