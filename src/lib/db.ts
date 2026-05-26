import Dexie, { type Table } from 'dexie';
import type { Word, ReviewSession, DictationRecord, ShadowingRecord, UserProfile, DailyLog, Achievement, AppSettings, WordBook, StudyVideo, StudySubtitle, StudyLog } from '@/types';

export class KoreanAppDB extends Dexie {
  words!: Table<Word, string>;
  reviewSessions!: Table<ReviewSession, string>;
  dictationRecords!: Table<DictationRecord, string>;
  shadowingRecords!: Table<ShadowingRecord, string>;
  userProfiles!: Table<UserProfile, string>;
  dailyLogs!: Table<DailyLog, string>;
  achievements!: Table<Achievement, string>;
  settings!: Table<AppSettings, string>;
  wordBooks!: Table<WordBook, string>;
  studyVideos!: Table<StudyVideo, string>;
  studySubtitles!: Table<StudySubtitle, string>;
  studyLogs!: Table<StudyLog, string>;

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

    this.version(2).stores({
      videos: 'id, youtubeId, addedAt',
      subtitles: 'id, videoId, start',
      words: 'id, word, srsLevel, nextReview, mastery, createdAt',
      reviewSessions: 'id, date',
      dictationRecords: 'id, wordId, date',
      shadowingRecords: 'id, subtitleId, date',
      userProfiles: 'id',
      dailyLogs: 'id, date',
      achievements: 'id, type',
      settings: 'id',
    });

    this.version(3).stores({
      videos: 'id, youtubeId, addedAt',
      subtitles: 'id, videoId, start',
      words: 'id, word, srsLevel, nextReview, mastery, createdAt',
      reviewSessions: 'id, date',
      dictationRecords: 'id, wordId, date',
      shadowingRecords: 'id, subtitleId, date',
      userProfiles: 'id',
      dailyLogs: 'id, date',
      achievements: 'id, type',
      settings: 'id',
      wordBooks: 'id, createdAt',
    });

    this.version(4).stores({
      videos: 'id, youtubeId, addedAt',
      subtitles: 'id, videoId, start',
      words: 'id, word, srsLevel, nextReview, mastery, createdAt',
      reviewSessions: 'id, date',
      dictationRecords: 'id, wordId, date',
      shadowingRecords: 'id, subtitleId, date',
      userProfiles: 'id',
      dailyLogs: 'id, date',
      achievements: 'id, type',
      settings: 'id',
      wordBooks: 'id, createdAt',
      studyVideos: 'id, platformId, addedAt',
      studySubtitles: 'id, videoId, index',
      studyLogs: 'id, videoId, date',
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
