// ==========================================================================
// 成就检测 · 全部从现成数据反推（零埋点）
// --------------------------------------------------------------------------
// checkAchievements() 读现有云表 + localStorage，算出 30 个成就各自的进度，
// 把新解锁的写进 userAchievements 表（幂等：已存在的不重复写）。
// 返回每个成就的 { unlocked, current, goal } 供成就墙渲染进度条。
// ==========================================================================

import { db } from '@/lib/db';
import { ACHIEVEMENTS } from '@/data/achievements';
import { getAllProgress as getPicbookProgress } from '@/lib/pictureBookProgress';
import { getListenedSet } from '@/lib/radioLocal';
import type { AchievementProgress, AchievementResult, UserAchievement } from '@/types';

const PLACE_IDS = ['library', 'phonetics', 'grammar', 'topik', 'practice', 'blog', 'vocabulary', 'diary', 'radio', 'picbooks'];

// localStorage 安全读取（SSR/隐私模式兜底）
function lsGet(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try { return window.localStorage.getItem(key); } catch { return null; }
}

function visitedPlaceCount(): number {
  return PLACE_IDS.filter((id) => {
    const v = lsGet(`place_intro_${id}_seen`);
    return v === '1' || v === 'true';
  }).length;
}

function completedPicbookCount(): number {
  try {
    return Object.values(getPicbookProgress()).filter((v) => v?.completed).length;
  } catch { return 0; }
}

function listenedRadioCount(): number {
  try { return getListenedSet().size; } catch { return 0; }
}

interface Metrics {
  words: number;
  reviews: number;
  dictations: number;
  savedWords: number;
  level: number;
  longestStreak: number;
  perfectWeek: boolean;
  firstChat: boolean;
  diaryDay1: boolean;
  articles: number;
  topikTaken: boolean;
  topikPerfect: boolean;
  grammarMastered: number;
  posts: number;
  phoneticsDone: boolean;
  picbooks: number;
  radio: number;
  places: number;
}

async function gatherMetrics(userPostCount: number): Promise<Metrics> {
  const [words, sessions, dicts, profile, dailyLogs, books, articleProg, topik, grammarStates, phonetics] = await Promise.all([
    db.words.toArray().catch(() => []),
    db.reviewSessions.toArray().catch(() => []),
    db.dictationRecords.toArray().catch(() => []),
    db.userProfiles.get('main').catch(() => undefined),
    db.dailyLogs.toArray().catch(() => []),
    db.wordBooks.toArray().catch(() => []),
    db.userArticleProgress.toArray().catch(() => []),
    db.topikSessions.toArray().catch(() => []),
    db.userGrammarStates.toArray().catch(() => []),
    db.phoneticSteps.toArray().catch(() => []),
  ]);

  const totalReviews = sessions.reduce((s, r) => s + (r.wordsReviewed || 0), 0);
  const savedWords = new Set(books.flatMap((b) => b.wordIds || [])).size;

  // 完美一周：最近 7 天每天都达到 dailyGoalWords
  const goalWords = profile?.dailyGoalWords || 10;
  const todayStart = new Date().setHours(0, 0, 0, 0);
  let perfectDays = 0;
  const logById = new Map(dailyLogs.map((l) => [l.id, l]));
  for (let i = 0; i < 7; i++) {
    const day = todayStart - i * 86400000;
    const log = logById.get(`log-${day}`);
    if (log && (log.wordsLearned || 0) >= goalWords) perfectDays++;
  }

  // AI 对话 / 40音完成走 studyLogs（ai_chat 已埋点；phonetics_complete 有则用，无则回退 phoneticSteps 有完成记录）
  let firstChat = false;
  let phoneticsDone = phonetics.length > 0 && phonetics.some((p) => p.completedAt);
  try {
    // studyLogs 只拉一次全表，两个动作在内存里判断（原来 filter 两次 = 拉两遍全表）。
    const logs = await db.studyLogs.toArray();
    firstChat = logs.some((l) => l.action === 'ai_chat');
    if (!phoneticsDone) {
      phoneticsDone = logs.some((l) => l.action === 'phonetics_complete');
    }
  } catch { /* studyLogs 不可用则保持默认 */ }

  return {
    words: words.length,
    reviews: totalReviews,
    dictations: dicts.filter((d) => d.correct).length,
    savedWords,
    level: profile?.level || 1,
    longestStreak: profile?.longestStreak || 0,
    perfectWeek: perfectDays >= 7,
    firstChat,
    diaryDay1: false, // 占位，由 checkAchievements 用 hasDiaryDay1() 覆盖
    articles: articleProg.length,
    topikTaken: topik.length > 0,
    topikPerfect: topik.some((s) => s.totalCount > 0 && s.correctCount === s.totalCount),
    grammarMastered: grammarStates.filter((g) => g.status === 'mastered').length,
    posts: userPostCount,
    phoneticsDone,
    picbooks: completedPicbookCount(),
    radio: listenedRadioCount(),
    places: visitedPlaceCount(),
  };
}

// 日记 Day1：toriProgress 有 beginner day1 completedAt
async function hasDiaryDay1(userId: string): Promise<boolean> {
  try {
    const rows = await db.toriProgress.toArray();
    return rows.some((r) => r.userId === userId && (r.level ?? 'beginner') === 'beginner' && r.day === 1 && r.completedAt);
  } catch { return false; }
}

// 每个成就的当前进度值
function currentValue(id: string, m: Metrics): number {
  switch (id) {
    case 'first_word': return m.words >= 1 ? 1 : 0;
    case 'phonetics_done': return m.phoneticsDone ? 1 : 0;
    case 'first_diary': return m.diaryDay1 ? 1 : 0;
    case 'first_chat': return m.firstChat ? 1 : 0;
    case 'first_dictation': return m.dictations >= 1 ? 1 : 0;
    case 'first_saved_word': return m.savedWords >= 1 ? 1 : 0;
    case 'streak_3': return Math.min(m.longestStreak, 3);
    case 'streak_7': return Math.min(m.longestStreak, 7);
    case 'streak_30': return Math.min(m.longestStreak, 30);
    case 'streak_100': return Math.min(m.longestStreak, 100);
    case 'perfect_week': return m.perfectWeek ? 7 : 0;
    case 'words_10': return Math.min(m.words, 10);
    case 'words_50': return Math.min(m.words, 50);
    case 'words_100': return Math.min(m.words, 100);
    case 'words_500': return Math.min(m.words, 500);
    case 'reviews_100': return Math.min(m.reviews, 100);
    case 'reviews_1000': return Math.min(m.reviews, 1000);
    case 'dictation_50': return Math.min(m.dictations, 50);
    case 'first_article': return m.articles >= 1 ? 1 : 0;
    case 'first_picbook': return m.picbooks >= 1 ? 1 : 0;
    case 'first_radio': return m.radio >= 1 ? 1 : 0;
    case 'first_post': return m.posts >= 1 ? 1 : 0;
    case 'first_topik': return m.topikTaken ? 1 : 0;
    case 'topik_perfect': return m.topikPerfect ? 1 : 0;
    case 'city_explorer': return Math.min(m.places, 10);
    case 'grammar_master': return Math.min(m.grammarMastered, 30);
    case 'level_5': return Math.min(m.level, 5);
    case 'level_10': return Math.min(m.level, 10);
    case 'level_20': return Math.min(m.level, 20);
    case 'super_grad': return (m.level >= 20 && m.longestStreak >= 30) ? 1 : 0;
    default: return 0;
  }
}

/**
 * 检测所有成就。返回各成就进度 + 概览原始指标；把新解锁的写入 userAchievements。
 * @param userId 当前用户 id（日记/发帖判据需要）
 * @param userPostCount 用户在广场的发帖数（由调用方从 blog API 传入，0 表示未知/无帖）
 */
export async function checkAchievements(userId: string, userPostCount = 0): Promise<AchievementResult> {
  const m = await gatherMetrics(userPostCount);
  m.diaryDay1 = await hasDiaryDay1(userId);

  // 已解锁记录（type → achievedAt）
  let existing: UserAchievement[] = [];
  try { existing = await db.userAchievements.toArray(); } catch { /* ignore */ }
  const existingMap = new Map(existing.map((a) => [a.achievementType as string, a.achievedAt]));

  const list: AchievementProgress[] = [];
  const toInsert: UserAchievement[] = [];
  let unlockedCount = 0;

  for (const def of ACHIEVEMENTS) {
    const current = currentValue(def.id, m);
    const meetsNow = current >= def.goal;
    const already = existingMap.has(def.id);
    const unlocked = meetsNow || already;
    if (unlocked) unlockedCount++;
    let achievedAt = existingMap.get(def.id);

    if (meetsNow && !already) {
      achievedAt = Date.now();
      toInsert.push({
        id: crypto.randomUUID(),
        achievementType: def.id,
        achievedAt,
        isCardGenerated: false,
      });
    }

    list.push({ id: def.id, unlocked, current, goal: def.goal, achievedAt });
  }

  // 新解锁批量落库（失败静默，不阻塞 UI）
  for (const rec of toInsert) {
    await db.userAchievements.add(rec).catch(() => {});
  }

  return { list, unlockedCount, level: m.level, longestStreak: m.longestStreak };
}
