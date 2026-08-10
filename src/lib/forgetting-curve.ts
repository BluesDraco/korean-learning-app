import type { Word } from '@/types';

/**
 * Estimated memory retention (0-1) at a given time after review.
 * Uses a simplified Ebbinghaus exponential decay model tuned to SM-2 intervals.
 *
 * When daysElapsed = stability, retention ≈ 0.37 (the "forgotten" threshold).
 */
export function estimatedRetention(daysElapsed: number, stability: number): number {
  if (daysElapsed <= 0) return 1;
  return Math.exp(-daysElapsed / Math.max(stability, 1 / 1440));
}

/** Stability is a function of interval and ease factor. */
export function wordStability(word: Word): number {
  return Math.max(word.interval, 1 / 1440) * Math.max(word.easeFactor, 1.3);
}

export function wordRetention(word: Word, now: number = Date.now()): number {
  if (!word.lastReviewed) return 0.5; // never reviewed
  const daysElapsed = (now - word.lastReviewed) / (24 * 60 * 60 * 1000);
  const stability = wordStability(word);
  return estimatedRetention(daysElapsed, stability);
}

/** Generate curve points: estimated retention at each day after review, from day 0 to day N. */
export function generateCurvePoints(stability: number, maxDays: number = 30): { day: number; retention: number }[] {
  const points: { day: number; retention: number }[] = [];
  for (let d = 0; d <= maxDays; d++) {
    points.push({ day: d, retention: Math.round(estimatedRetention(d, stability) * 100) });
  }
  return points;
}

/** Retention buckets for aggregate chart. */
export interface RetentionBucket {
  [k: string]: unknown;
  label: string;
  count: number;
  color: string;
}

export function retentionDistribution(words: Word[]): RetentionBucket[] {
  const reviewed = words.filter((w) => w.lastReviewed != null);
  const now = Date.now();

  const buckets: RetentionBucket[] = [
    { label: '90-100%', count: 0, color: 'var(--mint-soft)' },
    { label: '70-90%', count: 0, color: 'var(--blue-soft)' },
    { label: '40-70%', count: 0, color: 'var(--peach-soft)' },
    { label: '0-40%', count: 0, color: 'var(--color-danger)' },
  ];

  reviewed.forEach((w) => {
    const r = wordRetention(w, now);
    if (r >= 0.9) buckets[0].count++;
    else if (r >= 0.7) buckets[1].count++;
    else if (r >= 0.4) buckets[2].count++;
    else buckets[3].count++;
  });

  return buckets;
}

/** Words where estimated retention is below 0.5 — these are "at risk". */
export function atRiskWords(words: Word[], limit: number = 5): Word[] {
  const now = Date.now();
  return words
    .filter((w) => w.lastReviewed != null && wordRetention(w, now) < 0.5)
    .sort((a, b) => wordRetention(a, now) - wordRetention(b, now))
    .slice(0, limit);
}

/** Compute a weighted memory health score 0-100. */
export function memoryHealthScore(words: Word[]): number {
  const reviewed = words.filter((w) => w.lastReviewed != null);
  if (reviewed.length === 0) return 0;
  const avgRetention = reviewed.reduce((sum, w) => sum + wordRetention(w), 0) / reviewed.length;
  return Math.round(avgRetention * 100);
}
