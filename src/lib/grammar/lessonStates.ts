import { db } from '@/lib/db';
import type { UserGrammarState } from '@/types';
import { awardXp, XP_REWARDS } from '@/lib/gamification';

export type LessonMap = Record<string, UserGrammarState>;

export function isLessonDone(s: UserGrammarState | undefined): boolean {
  return s?.status === 'mastered';
}

export async function loadLessonMap(): Promise<LessonMap> {
  const rows = await db.userGrammarStates.toArray();
  const map: LessonMap = {};
  for (const r of rows) map[r.id] = r;
  return map;
}

export async function markLessonDone(cardId: string): Promise<void> {
  const now = Date.now();
  const existing = await db.userGrammarStates.get(cardId);
  if (existing?.status === 'mastered') return;
  if (existing) {
    await db.userGrammarStates.update(cardId, {
      status: 'mastered',
      lastSeenAt: now,
      updatedAt: now,
      source: existing.source || 'grammar-lesson',
    });
  } else {
    await db.userGrammarStates.put({
      id: cardId,
      status: 'mastered',
      seenCount: 1,
      correctCount: 0,
      wrongCount: 0,
      lastSeenAt: now,
      nextReviewAt: now + 86400000,
      source: 'grammar-lesson',
      createdAt: now,
      updatedAt: now,
    });
  }
  awardXp(XP_REWARDS.wordReviewed).catch(e => console.warn('Failed to award XP for grammar lesson:', e));
}
