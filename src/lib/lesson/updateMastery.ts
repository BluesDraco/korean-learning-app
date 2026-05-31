import { calculateSRS } from '@/lib/srs';
import { db } from '@/lib/db';
import type { LessonMastery, MasteryStatus } from './types';

const INITIAL_EASE = 2.5;
const INITIAL_INTERVAL = 0; // days

function makeId(dayNum: number, itemType: string, itemIdx: number): string {
  return `d${dayNum}-${itemType}-${itemIdx}`;
}

/** Update or create a mastery record for a lesson item after scoring. */
export async function updateMastery(params: {
  dayNum: number;
  itemType: string;
  itemIdx: number;
  source: string;
  quality: number;
}): Promise<LessonMastery> {
  const { dayNum, itemType, itemIdx, source, quality } = params;
  const id = makeId(dayNum, itemType, itemIdx);
  const existing = await db.lessonMastery.get(id);

  const now = Date.now();
  let record: LessonMastery;

  if (existing) {
    const srs = calculateSRS(quality, existing.seenCount, existing.ease, existing.interval);
    const status: MasteryStatus =
      srs.srsLevel >= 5 ? 'mastered' :
      srs.srsLevel >= 2 ? 'reviewing' :
      'learning';

    record = {
      ...existing,
      seenCount: existing.seenCount + 1,
      correctCount: existing.correctCount + (quality >= 3 ? 1 : 0),
      wrongCount: existing.wrongCount + (quality < 3 ? 1 : 0),
      lastSeenAt: now,
      nextReviewAt: srs.nextReview,
      interval: srs.interval,
      ease: srs.easeFactor,
      status,
    };
  } else {
    const srs = calculateSRS(quality, 0, INITIAL_EASE, INITIAL_INTERVAL);
    record = {
      id,
      dayNum,
      itemType,
      itemIdx,
      status: quality >= 4 ? 'learning' : 'new',
      seenCount: 1,
      correctCount: quality >= 3 ? 1 : 0,
      wrongCount: quality < 3 ? 1 : 0,
      lastSeenAt: now,
      nextReviewAt: srs.nextReview,
      interval: srs.interval,
      ease: srs.easeFactor,
      source,
    };
  }

  await db.lessonMastery.put(record);
  return record;
}

/** Get overall mastery percentage across all items in the 30-day course. */
export async function getOverallMastery(): Promise<number> {
  const all = await db.lessonMastery.toArray();
  if (all.length === 0) return 0;

  let score = 0;
  for (const m of all) {
    switch (m.status) {
      case 'mastered': score += 100; break;
      case 'reviewing': score += 65; break;
      case 'learning': score += 30; break;
      default: score += 5; break;
    }
  }
  return Math.round(score / all.length);
}

/** Determine output difficulty (1-5) based on overall mastery. */
export async function getOutputDifficulty(): Promise<number> {
  const mastery = await getOverallMastery();
  if (mastery >= 80) return 5;
  if (mastery >= 60) return 4;
  if (mastery >= 40) return 3;
  if (mastery >= 20) return 2;
  return 1;
}
