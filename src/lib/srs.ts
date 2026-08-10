// SM-2 Spaced Repetition Algorithm (Anki-compatible)
// Reference: https://super-memory.com/english/ol/sm2.htm

export interface SRSResult {
  srsLevel: number;
  easeFactor: number;
  interval: number;
  nextReview: number;
}

/**
 * Process a review answer and return new SRS state.
 *
 * @param quality - 0 (complete blackout) to 5 (perfect recall)
 * @param currentLevel - current repetition count (0-7+)
 * @param currentEase - current ease factor (default 2.5, min 1.3)
 * @param currentInterval - current interval in days
 */
export function calculateSRS(
  quality: number,
  currentLevel: number,
  currentEase: number,
  currentInterval: number,
): SRSResult {
  let nextLevel: number;
  let nextEase = currentEase;
  let nextInterval: number;

  if (quality < 3) {
    // Failed - reset
    nextLevel = 0;
    nextInterval = 1 / 1440; // 1 minute in days - review again soon
  } else {
    // Passed
    nextLevel = currentLevel + 1;

    // Calculate next interval
    switch (nextLevel) {
      case 1:
        nextInterval = 1 / 1440; // 1 minute
        break;
      case 2:
        nextInterval = 10 / 1440; // 10 minutes
        break;
      case 3:
        nextInterval = 1; // 1 day
        break;
      case 4:
        nextInterval = 3; // 3 days
        break;
      case 5:
        nextInterval = 7; // 7 days
        break;
      case 6:
        nextInterval = 14; // 14 days
        break;
      default:
        nextInterval = currentInterval * nextEase;
        break;
    }

    // Update ease factor
    nextEase = currentEase + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (nextEase < 1.3) nextEase = 1.3;
  }

  const nextReview = Date.now() + nextInterval * 24 * 60 * 60 * 1000;

  return {
    srsLevel: nextLevel,
    easeFactor: nextEase,
    interval: nextInterval,
    nextReview,
  };
}

/**
 * Get words due for review, sorted by urgency.
 */
export async function getDueWords(db: any, limit: number = 20) {
  const now = Date.now();
  return db.words
    .where('nextReview')
    .belowOrEqual(now)
    .sortBy('nextReview')
    .then((words: any[]) => words.slice(0, limit));
}

import { t } from './i18n';
import type { Lang } from './i18n';

/**
 * Quality descriptions for the review UI.
 */
export function getQualityLabel(quality: number, lang: Lang): string {
  const key = `srs.level_${quality}` as `srs.level_${0|1|2|3|4|5}`;
  return t(key, lang);
}
