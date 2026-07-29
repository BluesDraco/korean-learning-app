// 分步学习进度记录工具
// 复用 lesson_mastery 表（item_type='phonetic_step'），item_idx 编码：
//   letter=0, quiz=1, write=2, blend=3, stage_complete=99
// 幂等：先 where(...).first() 再 put，避免重做污染计数

import { db } from '@/lib/db';
import { awardXp, updateStreak, addStudyMinutes } from '@/lib/gamification';
import type { LessonMastery, LearningEvent } from '@/lib/lesson/types';

export type PhoneticLessonKey = 'letter' | 'quiz' | 'write' | 'blend' | 'stage_complete';

const LESSON_IDX: Record<PhoneticLessonKey, number> = {
  letter: 0,
  quiz: 1,
  write: 2,
  blend: 3,
  stage_complete: 99,
};

const XP_PER_LESSON: Record<PhoneticLessonKey, number> = {
  letter: 10,
  quiz: 15,
  write: 15,
  blend: 15,
  stage_complete: 50,
};

export interface RecordOptions {
  correctCount?: number;
  wrongCount?: number;
  studyMinutes?: number;
}

export async function recordPhoneticStep(
  stage: number,
  lessonKey: PhoneticLessonKey,
  opts: RecordOptions = {},
): Promise<{ leveledUp: boolean; newLevel: number; xpAwarded: number; streak: number }> {
  const itemIdx = LESSON_IDX[lessonKey];
  const now = Date.now();
  const { correctCount = 0, wrongCount = 0, studyMinutes = 1 } = opts;

  // 幂等：先查
  const existing = await db.lessonMastery
    .where('itemType').equals('phonetic_step')
    .toArray();
  const matched = existing.find((m) => m.dayNum === stage && m.itemIdx === itemIdx);

  const payload: LessonMastery = matched
    ? {
        ...matched,
        status: 'mastered',
        seenCount: matched.seenCount + 1,
        correctCount: matched.correctCount + correctCount,
        wrongCount: matched.wrongCount + wrongCount,
        lastSeenAt: now,
        nextReviewAt: now + 7 * 24 * 60 * 60 * 1000,
      }
    : {
        id: crypto.randomUUID(),
        dayNum: stage,
        itemType: 'phonetic_step',
        itemIdx,
        status: 'mastered',
        seenCount: 1,
        correctCount,
        wrongCount,
        lastSeenAt: now,
        nextReviewAt: now + 7 * 24 * 60 * 60 * 1000,
        interval: 1,
        ease: 2.5,
        source: 'phonetics-step',
      };
  await db.lessonMastery.put(payload);

  const event: LearningEvent = {
    id: crypto.randomUUID(),
    dayNum: stage,
    cardType: 'output',
    action: 'complete',
    detail: `phonetic-step:${lessonKey} stage=${stage}`,
    timestamp: now,
  };
  await db.learningEvents.put(event);

  // 首次完成才奖励完整 XP / 计入学习时长，复刷只更新 streak
  const isFirstTime = !matched;
  const xpAwarded = isFirstTime ? XP_PER_LESSON[lessonKey] : 0;
  const { leveledUp, newLevel } = isFirstTime
    ? await awardXp(xpAwarded)
    : { leveledUp: false, newLevel: 0 };
  const { streak } = await updateStreak();
  if (isFirstTime) await addStudyMinutes(studyMinutes);

  return { leveledUp, newLevel, xpAwarded, streak };
}
