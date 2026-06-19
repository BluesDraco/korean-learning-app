import { db } from '@/lib/db';

// 5-tier level system
export type KoreanLevel = '萌新' | '入门' | '初级' | '中级' | '进阶';

export interface LevelThreshold {
  level: KoreanLevel;
  minWords: number;
  minGrammar: number;
  unlocks: string[];
}

export const LEVELS: LevelThreshold[] = [
  { level: '萌新', minWords: 0, minGrammar: 0, unlocks: ['基础功能全开'] },
  { level: '入门', minWords: 50, minGrammar: 5, unlocks: ['解锁绘本高级篇'] },
  { level: '初级', minWords: 300, minGrammar: 40, unlocks: ['解锁TOPIK练习（年度会员）'] },
  { level: '中级', minWords: 800, minGrammar: 100, unlocks: ['解锁AI学习报告（年度会员）'] },
  { level: '进阶', minWords: 2000, minGrammar: 200, unlocks: ['解锁AI批改写作（年度会员）'] },
];

export async function getProgress() {
  const [totalWords, masteredWords] = await Promise.all([
    db.words.count(),
    db.words.where('mastery').equals('mastered').count(),
  ]);
  const grammarCount = await db.studyLogs
    .where('action')
    .equals('grammar_view')
    .count();

  const currentLevelIdx = LEVELS.findLastIndex(
    (l) => totalWords >= l.minWords && grammarCount >= l.minGrammar,
  );
  const currentLevel = LEVELS[Math.max(0, currentLevelIdx)];
  const nextLevel = LEVELS[Math.min(LEVELS.length - 1, Math.max(0, currentLevelIdx) + 1)];

  const wordsNeeded = Math.max(0, nextLevel.minWords - totalWords);
  const grammarNeeded = Math.max(0, nextLevel.minGrammar - grammarCount);
  const wordsPercent = nextLevel.minWords > 0 ? Math.min(100, Math.round((totalWords / nextLevel.minWords) * 100)) : 100;
  const grammarPercent = nextLevel.minGrammar > 0 ? Math.min(100, Math.round((grammarCount / nextLevel.minGrammar) * 100)) : 100;

  const profile = await db.userProfiles.get('main');
  const allLogs = await db.dailyLogs.toArray();
  const totalDays = allLogs.filter((l) => l.wordsLearned > 0 || l.wordsReviewed > 0).length;

  return {
    currentLevel: currentLevel.level,
    currentLevelIdx: Math.max(0, currentLevelIdx),
    totalWords,
    masteredWords,
    grammarCount,
    totalDays,
    wordsPercent,
    grammarPercent,
    wordsNeeded,
    grammarNeeded,
    nextLevel: nextLevel.level,
    unlocks: nextLevel.unlocks,
    hasLeveledUp: currentLevelIdx > (profile?.level ?? 0),
    streak: profile?.streak ?? 0,
  };
}

export function getKoreanLevel(
  totalWords: number,
  grammarCount: number,
): { level: KoreanLevel; idx: number } {
  const idx = LEVELS.findLastIndex(
    (l) => totalWords >= l.minWords && grammarCount >= l.minGrammar,
  );
  return { level: LEVELS[Math.max(0, idx)].level, idx: Math.max(0, idx) };
}

export interface TodayTasks {
  srsReview: { done: boolean; dueCount: number };
  newGrammar: { done: boolean };
  reading: { done: boolean };
  allDone: boolean;
}

export async function getTodayTasks(): Promise<TodayTasks> {
  const now = Date.now();
  const dueWords = await db.words.where('nextReview').belowOrEqual(now).toArray();
  const dueCount = dueWords.filter((w) => w.mastery !== 'mastered').length;

  const todayStart = new Date().setHours(0, 0, 0, 0);
  const todayLog = await db.dailyLogs.get(`log-${todayStart}`);

  return {
    srsReview: { done: (todayLog?.wordsReviewed ?? 0) > 0, dueCount },
    newGrammar: { done: (todayLog?.wordsLearned ?? 0) >= 1 },
    reading: { done: (todayLog?.minutesStudied ?? 0) >= 5 },
    allDone: dueCount === 0 && (todayLog?.wordsReviewed ?? 0) > 0 && (todayLog?.wordsLearned ?? 0) >= 1,
  };
}
