import Dexie, { type Table } from 'dexie';
import type { Video, Subtitle, Word, ReviewSession, DictationRecord, AppSettings } from '@/types';

export class KoreanAppDB extends Dexie {
  videos!: Table<Video, string>;
  subtitles!: Table<Subtitle, string>;
  words!: Table<Word, string>;
  reviewSessions!: Table<ReviewSession, string>;
  dictationRecords!: Table<DictationRecord, string>;
  settings!: Table<AppSettings, string>;

  constructor() {
    super('koreanLearningApp');
    this.version(1).stores({
      videos: 'id, youtubeId, addedAt',
      subtitles: 'id, videoId, start',
      words: 'id, word, srsLevel, nextReview, mastery, createdAt',
      reviewSessions: 'id, date',
      dictationRecords: 'id, wordId, date',
      settings: 'id',
    });
  }
}

export const db = new KoreanAppDB();

// Initialize default settings
export async function initSettings(): Promise<AppSettings> {
  const existing = await db.settings.get('main');
  if (existing) return existing;

  const defaults: AppSettings = {
    id: 'main',
    dailyWordGoal: 20,
    reviewBatchSize: 10,
    defaultPlaybackRate: 1,
    theme: 'dark',
  };
  await db.settings.put(defaults);
  return defaults;
}
