import { awardXp, updateStreak, addStudyMinutes, updateTodayLog, getTodayLog } from '@/lib/gamification';
import { db } from '@/lib/db';
import type { DailyCourse } from '@/data/thirtyDayCourse';
import type { LearningEvent, LessonCard } from './types';

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
  const now = Date.now();
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
