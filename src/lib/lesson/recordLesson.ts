import { awardXp, updateStreak, addStudyMinutes, updateTodayLog, getTodayLog } from '@/lib/gamification';
import { db } from '@/lib/db';
import type { DailyCourse } from '@/data/thirtyDayCourse';
import type { LearningEvent, LessonCard } from './types';

// Map course day → grammar-new sentence pattern ID
export const COURSE_GRAMMAR_MAP: Record<number, string> = {
  1: 'gp-02',   // 입니다
  2: 'gp-19',   // 은/는
  3: 'gp-04',   // 주세요
  4: 'gp-20',   // 이/가
  5: 'gp-08',   // 에 있어요
  7: 'gp-13',   // 아/어요
  8: 'gp-14',   // 高频动词
  9: 'gp-08',   // 에 (时间) — same particle as day 5
  11: 'gp-10',  // 좋아해요
  12: 'gp-04',  // 주다/드리다 — same root as day 3
  15: 'gp-26',  // -지만
  16: 'gp-27',  // -아/어서 (原因)
  19: 'gp-09',  // 에서
  20: 'gp-27',  // -아/어서 (症状说明)
  21: 'gp-29',  // -(으)ㄹ 수 있어요
  22: 'gp-24',  // -(으)ㄹ 거예요
  24: 'gp-23',  // 았/었/였-
  25: 'gp-30',  // -아/어 보다
  26: 'gp-19',  // 은/는 + 이/가 (主主题结构)
  27: 'gp-28',  // -(으)면
};

export async function recordLessonComplete(
  course: DailyCourse,
  events: { card: LessonCard; action: string; detail: string }[],
): Promise<{
  leveledUp: boolean;
  newLevel: number;
  streak: number;
  xpAwarded: number;
}> {
  const xpAwarded = 25;

  // Add course words to vocabulary system
  const now = Date.now();
  for (const w of course.words) {
    const exists = await db.words.where('word').equals(w.korean).first();
    if (!exists) {
      await db.words.put({
        id: crypto.randomUUID(),
        word: w.korean,
        pronunciation: w.pronunciation,
        meaning: w.chinese,
        partOfSpeech: w.partOfSpeech,
        examples: [],
        source: 'course',
        sourceDetail: `Day ${course.day}`,
        mastery: 'new',
        srsLevel: 0,
        easeFactor: 2.5,
        interval: 0,
        nextReview: now,
        correctCount: 0,
        wrongCount: 0,
        createdAt: now,
        lastReviewed: null,
      });
    }
  }

  // Add sentences as vocabulary items too (useful phrases)
  for (const s of course.sentences) {
    const exists = await db.words.where('word').equals(s.korean).first();
    if (!exists) {
      await db.words.put({
        id: crypto.randomUUID(),
        word: s.korean,
        pronunciation: s.pronunciation,
        meaning: s.chinese,
        partOfSpeech: '实用句',
        examples: [],
        source: 'course',
        sourceDetail: `Day ${course.day}`,
        mastery: 'new',
        srsLevel: 0,
        easeFactor: 2.5,
        interval: 0,
        nextReview: now,
        correctCount: 0,
        wrongCount: 0,
        createdAt: now,
        lastReviewed: null,
      });
    }
  }

  // Auto-mark grammar as learning if this day maps to a sentence pattern
  const grammarId = course.grammar.grammarId || COURSE_GRAMMAR_MAP[course.day];
  if (grammarId) {
    try {
      const existing = await db.userGrammarStates.get(grammarId);
      if (existing) {
        await db.userGrammarStates.update(grammarId, {
          status: existing.status === 'new' ? 'learning' : existing.status,
          seenCount: existing.seenCount + 1,
          lastSeenAt: now,
          source: existing.source || `course-day-${course.day}`,
          updatedAt: now,
        });
      } else {
        await db.userGrammarStates.put({
          id: grammarId,
          status: 'learning',
          seenCount: 1,
          correctCount: 0,
          wrongCount: 0,
          lastSeenAt: now,
          nextReviewAt: now + 24 * 60 * 60 * 1000,
          source: `course-day-${course.day}`,
          createdAt: now,
          updatedAt: now,
        });
      }
    } catch (_e) {}
  }

  // Update daily log counts
  const log = await getTodayLog();
  await updateTodayLog({
    wordsLearned: log.wordsLearned + course.words.length,
    dictationsDone: log.dictationsDone + course.dictations.length,
  });

  // Award XP
  const { leveledUp, newLevel } = await awardXp(xpAwarded);

  // Update streak
  const { streak } = await updateStreak();

  // Estimate study minutes (~0.5 min per card)
  const cardCount = course.words.length + 1 + course.sentences.length + course.dictations.length + 1;
  await addStudyMinutes(Math.round(cardCount * 0.5));

  // Write learning events
  const learningEvents: LearningEvent[] = events.map((e) => ({
    id: crypto.randomUUID(),
    dayNum: course.day,
    cardType: e.card.type,
    action: e.action as LearningEvent['action'],
    detail: e.detail,
    timestamp: now,
  }));

  // Add completion event
  learningEvents.push({
    id: crypto.randomUUID(),
    dayNum: course.day,
    cardType: 'output',
    action: 'complete',
    detail: `完成 Day ${course.day}: ${course.title}`,
    timestamp: now,
  });

  await db.learningEvents.bulkPut(learningEvents);

  return { leveledUp, newLevel, streak, xpAwarded };
}
