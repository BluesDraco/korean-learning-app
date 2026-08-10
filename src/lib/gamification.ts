import { db } from '@/lib/db';
import type { UserProfile, DailyLog, Achievement, AchievementType } from '@/types';

// XP rewards for each action
export const XP_REWARDS = {
  wordLearned: 10,
  wordReviewed: 5,
  perfectReview: 15,
  dictationCorrect: 8,
  shadowingGood: 10,
  dailyLessonComplete: 25,
};

// Level formula: level * 50 + 100 XP needed (20 levels system)
export const MAX_LEVEL = 20;
export function xpForLevel(level: number): number {
  return level * 50 + 100;
}

export function totalXpForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += xpForLevel(i);
  }
  return total;
}

export function levelFromXp(totalXp: number): { level: number; currentXp: number; xpToNext: number } {
  let xpRemaining = totalXp;
  let level = 1;
  while (xpRemaining >= xpForLevel(level)) {
    xpRemaining -= xpForLevel(level);
    level++;
  }
  return { level, currentXp: xpRemaining, xpToNext: xpForLevel(level) };
}

// Initialize or get user profile
export async function getProfile(): Promise<UserProfile> {
  const existing = await db.userProfiles.get('main');
  if (existing) return existing;

  const defaults: UserProfile = {
    id: 'main',
    nickname: '学习者',
    level: 1,
    xp: 0,
    xpToNextLevel: xpForLevel(1),
    streak: 0,
    longestStreak: 0,
    lastStudyDate: 0,
    targetLevel: 'beginner',
    dailyGoalMinutes: 15,
    dailyGoalWords: 10,
    currentUnit: 1,
    onboardingComplete: false,
    createdAt: Date.now(),
    checkInStreak: 0,
    checkInLongest: 0,
    lastCheckInDate: 0,
  };
  // 创建默认档案，失败也不抛错——让 UI 仍可用默认值渲染
  try { await db.userProfiles.put(defaults); } catch { /* ignore */ }
  return defaults;
}

export async function updateProfile(updates: Partial<UserProfile>): Promise<void> {
  const existing = await db.userProfiles.get('main');
  if (existing) {
    await db.userProfiles.update('main', updates);
  } else {
    // 行不存在时 update 影响 0 行会静默丢失设置。回退到 put 重建整行。
    const defaults: UserProfile = {
      id: 'main',
      nickname: '学习者',
      level: 1,
      xp: 0,
      xpToNextLevel: xpForLevel(1),
      streak: 0,
      longestStreak: 0,
      lastStudyDate: 0,
      targetLevel: 'beginner',
      dailyGoalMinutes: 15,
      dailyGoalWords: 10,
      currentUnit: 1,
      onboardingComplete: false,
      createdAt: Date.now(),
      checkInStreak: 0,
      checkInLongest: 0,
      lastCheckInDate: 0,
      ...updates,
    };
    await db.userProfiles.put(defaults);
  }
}

// Get or create today's daily log
export async function getTodayLog(): Promise<DailyLog> {
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const existing = await db.dailyLogs.get(`log-${todayStart}`);
  if (existing) return existing;

  const log: DailyLog = {
    id: `log-${todayStart}`,
    date: todayStart,
    wordsLearned: 0,
    wordsReviewed: 0,
    dictationsDone: 0,
    shadowingDone: 0,
    minutesStudied: 0,
    xpEarned: 0,
    grammarCompleted: 0,
    articlesRead: 0,
    diaryCompleted: 0,
  };
  await db.dailyLogs.put(log);
  return log;
}

export async function updateTodayLog(updates: Partial<DailyLog>): Promise<void> {
  // 跨天场景：若用户 0 点前进入 review，0 点后完成一张卡，updates 会打向"新一天"
  // 的 log 行，但该行还未创建 —— dexie 的 update 影响 0 行，静默丢数据。
  // 先走 getTodayLog 保底创建当天 log。
  const today = await getTodayLog();
  const merged = { ...today, ...updates };
  await db.dailyLogs.put(merged);
}

export async function incrementTodayLog(field: 'grammarCompleted' | 'articlesRead' | 'diaryCompleted' | 'wordsReviewed'): Promise<void> {
  const today = await getTodayLog();
  const n = (today[field] as number) || 0;
  await updateTodayLog({ [field]: n + 1 } as Partial<DailyLog>);
  // 这些日常活动（语法/阅读/日记）也算"今天学过"，必须推进连击。
  // 放在 incrementTodayLog（不在 awardXp→updateTodayLog 链上，无递归）而非各调用点，一处覆盖。
  updateStreak().catch(() => {});
}

// Award XP and update profile
// 后端 API 不支持原子累加；用模块级 promise 队列串行化调用，避免快速连点导致的读-改-写竞态。
// 局限：只保护同一浏览器窗口/tab 内的并发，跨 tab 依然可能丢；但这是最常见的场景。
let xpQueue: Promise<unknown> = Promise.resolve();

export async function awardXp(amount: number): Promise<{ leveledUp: boolean; newLevel: number }> {
  const next = xpQueue.then(async () => {
    const profile = await getProfile();
    let xp = profile.xp + amount;
    let lvl = profile.level;
    let xpToNxt = profile.xpToNextLevel;
    let leveledUp = false;

    while (xp >= xpToNxt) {
      xp -= xpToNxt;
      lvl++;
      xpToNxt = xpForLevel(lvl);
      leveledUp = true;
    }

    await db.userProfiles.update('main', { xp, level: lvl, xpToNextLevel: xpToNxt });
    await updateTodayLog({ xpEarned: (await getTodayLog()).xpEarned + amount });
    await checkAchievements(lvl);

    return { leveledUp, newLevel: lvl };
  });
  xpQueue = next.catch(() => undefined);
  return next;
}

// Update streak — returns info for UI feedback
export async function updateStreak(): Promise<{
  streak: number;
  wasReset: boolean;
  prevStreak: number;
  isMilestone: boolean;
  milestone: number;
}> {
  const profile = await getProfile();
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const yesterdayStart = todayStart - 86400000;

  if (profile.lastStudyDate >= todayStart) {
    return { streak: profile.streak, wasReset: false, prevStreak: 0, isMilestone: false, milestone: 0 };
  }

  const prevStreak = profile.streak;
  let newStreak = profile.streak;
  let wasReset = false;
  if (profile.lastStudyDate >= yesterdayStart) {
    newStreak = profile.streak + 1;
  } else {
    wasReset = prevStreak > 1;
    newStreak = 1;
  }

  const longestStreak = Math.max(newStreak, profile.longestStreak);
  await db.userProfiles.update('main', {
    streak: newStreak,
    longestStreak,
    lastStudyDate: todayStart,
  });

  // Milestones
  const milestones = [3, 7, 30, 100];
  const isMilestone = milestones.includes(newStreak);

  // Streak-based bonus XP
  let bonusXp = 0;
  if (newStreak >= 3 && newStreak < 7) {
    bonusXp = 5;
  } else if (newStreak >= 7 && newStreak < 30) {
    bonusXp = 10;
  } else if (newStreak >= 30) {
    bonusXp = 25;
  }

  if (bonusXp > 0) {
    await awardXp(bonusXp);
  }

  // Check streak achievements
  await checkStreakAchievements(newStreak);

  return {
    streak: newStreak,
    wasReset,
    prevStreak,
    isMilestone,
    milestone: newStreak,
  };
}

// Update study minutes
export async function addStudyMinutes(minutes: number): Promise<void> {
  const log = await getTodayLog();
  await updateTodayLog({ minutesStudied: log.minutesStudied + minutes });
}

// 从 session 开始时间戳算实际分钟并记入今日时长。
// 下限 1 分钟（避免几十秒的 session 记成 0），上限 capMin（防挂机虚高）。
// startMs 为 0/无效时不记录。返回记入的分钟数。
export async function recordElapsedMinutes(startMs: number, capMin: number): Promise<number> {
  if (!startMs || startMs <= 0) return 0;
  const raw = Math.round((Date.now() - startMs) / 60000);
  const minutes = Math.max(1, Math.min(raw, capMin));
  await addStudyMinutes(minutes);
  return minutes;
}

// Achievement checking
export async function checkAchievements(level: number): Promise<Achievement[]> {
  const newAchievements: Achievement[] = [];
  const existing = await db.achievements.toArray();
  const existingTypes = new Set(existing.map((a) => a.type));

  const words = await db.words.toArray();
  const totalWords = words.length;
  const reviews = await db.reviewSessions.toArray();
  const totalReviews = reviews.reduce((s, r) => s + r.wordsReviewed, 0);
  const dictations = await db.dictationRecords.toArray();
  const totalDictations = dictations.filter((d) => d.correct).length;
  const grammarStates = await db.userGrammarStates.toArray().catch(() => []);
  const totalGrammar = (grammarStates as any[]).filter((g: any) => g.status === 'mastered').length;
  const toriProgress = await db.toriProgress.toArray().catch(() => []);
  const totalDiary = (toriProgress as any[]).filter((tp: any) => tp.completedAt != null).length;
  const articleProgress = await db.userArticleProgress.toArray().catch(() => []);
  const totalRead = (articleProgress as any[]).filter((ap: any) => ap.status === 'completed').length;

  const checks: [AchievementType, boolean][] = [
    ['first_word', totalWords >= 1],
    ['words_10', totalWords >= 10],
    ['words_50', totalWords >= 50],
    ['words_100', totalWords >= 100],
    ['words_500', totalWords >= 500],
    ['reviews_100', totalReviews >= 100],
    ['reviews_1000', totalReviews >= 1000],
    ['dictation_50', totalDictations >= 50],
    ['grammar_10', totalGrammar >= 10],
    ['grammar_50', totalGrammar >= 50],
    ['diary_7', totalDiary >= 7],
    ['diary_30', totalDiary >= 30],
    ['reading_10', totalRead >= 10],
    ['level_5', level >= 5],
    ['level_10', level >= 10],
    ['level_20', level >= 20],
  ];

  for (const [type, earned] of checks) {
    if (earned && !existingTypes.has(type)) {
      const achievement: Achievement = {
        id: crypto.randomUUID(),
        type,
        earnedAt: Date.now(),
      };
      await db.achievements.put(achievement);
      newAchievements.push(achievement);
    }
  }

  return newAchievements;
}

async function checkStreakAchievements(streak: number): Promise<void> {
  const existing = await db.achievements.toArray();
  const existingTypes = new Set(existing.map((a) => a.type));

  const checks: [AchievementType, number][] = [
    ['streak_3', 3],
    ['streak_7', 7],
    ['streak_30', 30],
    ['streak_100', 100],
  ];

  for (const [type, required] of checks) {
    if (streak >= required && !existingTypes.has(type)) {
      await db.achievements.put({
        id: crypto.randomUUID(),
        type,
        earnedAt: Date.now(),
      });
    }
  }
}

// Get streak data for the last 7 days
export async function getWeekStreak(): Promise<{ date: string; dayLabel: string; studied: boolean; isToday: boolean }[]> {
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
  const ids: string[] = [];
  const dayStarts: number[] = [];
  for (let i = 6; i >= 0; i--) {
    dayStarts.push(todayStart - i * 86400000);
    ids.push(`log-${dayStarts[dayStarts.length - 1]}`);
  }

  // Batch-fetch all 7 logs in one request
  const logs = await db.dailyLogs.where('id').anyOf(ids).toArray();
  const logMap = new Map(logs.map((l: any) => [l.id, l]));

  return dayStarts.map((dayStart, i) => {
    const d = new Date(dayStart);
    const log = logMap.get(`log-${dayStart}`);
    return {
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      dayLabel: dayNames[d.getDay()],
      studied: log ? log.wordsReviewed > 0 || log.grammarCompleted > 0 || log.articlesRead > 0 || log.diaryCompleted > 0 : false,
      isToday: i === 6,
    };
  });
}

// 每日签到（登录即签到，独立于 study streak）
// 基础 +10 XP，连续 ≥7 天翻倍 +20。当天已签到直接返回，天然防重复领取。
export const CHECKIN_XP_BASE = 10;
export const CHECKIN_XP_BONUS = 20;

export async function checkInToday(): Promise<{
  alreadyChecked: boolean;
  streak: number;
  xpGained: number;
}> {
  const profile = await getProfile();
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const yesterdayStart = todayStart - 86400000;
  const last = profile.lastCheckInDate ?? 0;

  if (last >= todayStart) {
    return { alreadyChecked: true, streak: profile.checkInStreak ?? 0, xpGained: 0 };
  }

  const newStreak = last >= yesterdayStart ? (profile.checkInStreak ?? 0) + 1 : 1;
  const longest = Math.max(newStreak, profile.checkInLongest ?? 0);
  await db.userProfiles.update('main', {
    checkInStreak: newStreak,
    checkInLongest: longest,
    lastCheckInDate: todayStart,
  });

  const xpGained = newStreak >= 7 ? CHECKIN_XP_BONUS : CHECKIN_XP_BASE;
  await awardXp(xpGained);

  return { alreadyChecked: false, streak: newStreak, xpGained };
}

// 近 7 天签到状态（点亮 = 当天已签到），用于日历带
export async function getWeekCheckIn(): Promise<{ dayLabel: string; checked: boolean; isToday: boolean }[]> {
  const profile = await getProfile();
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const last = profile.lastCheckInDate ?? 0;
  const streak = profile.checkInStreak ?? 0;
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

  // 已签到的最早一天 = last - (streak-1) 天；范围内的天都点亮
  const earliestChecked = streak > 0 ? last - (streak - 1) * 86400000 : Infinity;

  const out: { dayLabel: string; checked: boolean; isToday: boolean }[] = [];
  for (let i = 6; i >= 0; i--) {
    const dayStart = todayStart - i * 86400000;
    const d = new Date(dayStart);
    out.push({
      dayLabel: dayNames[d.getDay()],
      checked: streak > 0 && dayStart >= earliestChecked && dayStart <= last,
      isToday: i === 0,
    });
  }
  return out;
}

// Check if all goals met for the perfect week achievement
export async function checkPerfectWeek(): Promise<void> {
  const profile = await getProfile();
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const existing = await db.achievements.toArray();
  const existingTypes = new Set(existing.map((a) => a.type));

  if (existingTypes.has('perfect_week')) return;

  let perfectDays = 0;
  const ids: string[] = [];
  for (let i = 1; i <= 7; i++) {
    ids.push(`log-${todayStart - i * 86400000}`);
  }
  const logs = await db.dailyLogs.where('id').anyOf(ids).toArray();
  const logByDay = new Map(logs.map((l) => [l.id, l]));
  for (let i = 1; i <= 7; i++) {
    const dayStart = todayStart - i * 86400000;
    const log = logByDay.get(`log-${dayStart}`);
    if (log && (log.wordsReviewed >= profile.dailyGoalWords || log.grammarCompleted > 0 || log.articlesRead > 0 || log.diaryCompleted > 0)) {
      perfectDays++;
    }
  }

  if (perfectDays >= 7) {
    await db.achievements.put({
      id: crypto.randomUUID(),
      type: 'perfect_week',
      earnedAt: Date.now(),
    });
  }
}
