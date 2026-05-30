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
  };
  await db.userProfiles.put(defaults);
  return (await db.userProfiles.get('main')) || defaults;
}

export async function updateProfile(updates: Partial<UserProfile>): Promise<void> {
  await db.userProfiles.update('main', updates);
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
  };
  await db.dailyLogs.put(log);
  return log;
}

export async function updateTodayLog(updates: Partial<DailyLog>): Promise<void> {
  const todayStart = new Date().setHours(0, 0, 0, 0);
  await db.dailyLogs.update(`log-${todayStart}`, updates);
}

// Award XP and update profile
export async function awardXp(amount: number): Promise<{ leveledUp: boolean; newLevel: number }> {
  const profile = await getProfile();
  // Calculate XP and level
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

  await db.userProfiles.update('main', {
    xp,
    level: lvl,
    xpToNextLevel: xpToNxt,
  });

  // Update daily log
  await updateTodayLog({ xpEarned: (await getTodayLog()).xpEarned + amount });

  // Check achievements
  await checkAchievements(lvl);

  return { leveledUp, newLevel: lvl };
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
  const shadowings = await db.shadowingRecords.toArray().catch(() => []);
  const totalShadowings = shadowings.length;

  const checks: [AchievementType, boolean][] = [
    ['first_word', totalWords >= 1],
    ['words_10', totalWords >= 10],
    ['words_50', totalWords >= 50],
    ['words_100', totalWords >= 100],
    ['words_500', totalWords >= 500],
    ['reviews_100', totalReviews >= 100],
    ['reviews_1000', totalReviews >= 1000],
    ['dictation_50', totalDictations >= 50],
    ['shadowing_10', totalShadowings >= 10],
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
  const days: { date: string; dayLabel: string; studied: boolean; isToday: boolean }[] = [];
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

  for (let i = 6; i >= 0; i--) {
    const dayStart = todayStart - i * 86400000;
    const d = new Date(dayStart);
    const logId = `log-${dayStart}`;
    const log = await db.dailyLogs.get(logId);
    days.push({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      dayLabel: dayNames[d.getDay()],
      studied: log ? log.wordsLearned > 0 || log.wordsReviewed > 0 : false,
      isToday: i === 0,
    });
  }

  return days;
}

// Check if all goals met for the perfect week achievement
export async function checkPerfectWeek(): Promise<void> {
  const profile = await getProfile();
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const existing = await db.achievements.toArray();
  const existingTypes = new Set(existing.map((a) => a.type));

  if (existingTypes.has('perfect_week')) return;

  let perfectDays = 0;
  for (let i = 1; i <= 7; i++) {
    const dayStart = todayStart - i * 86400000;
    const log = await db.dailyLogs.get(`log-${dayStart}`);
    if (log && log.wordsLearned >= profile.dailyGoalWords) {
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
