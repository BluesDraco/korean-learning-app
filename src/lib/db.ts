import type { Word, ReviewSession, DictationRecord, ShadowingRecord, UserProfile, DailyLog, Achievement, AppSettings, WordBook, StudyVideo, StudySubtitle, StudyLog, UserAchievement, UserShareLink, StickerPack, Sticker, StickerDownload, BuddyRelation, BuddyInvite, PronunciationAttempt, UserGrammarState, UserArticleProgress, ArticleLearningEvent, TopikSession, TopikMistake, SpellingMistake, AiChatMistake, AiChatNewWord, SavedSentence, SavedArticle, SavedNote, UserRecording, KpopSongProgress, DiaryEntry, NewsReadingProgress } from '@/types';
import type { LessonMastery, LearningEvent } from '@/lib/lesson/types';
import type { ToriProgress, ToriStickerOwned } from '@/types/tori-diary';

const API = '/api/user-data';

async function call(action: string, table: string, id?: string, data?: unknown): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  const body: Record<string, unknown> = { action, table };
  if (id !== undefined) body.id = id;
  if (data !== undefined) body.data = data;
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Network error' }));
      throw new Error(err.error || `API error ${res.status}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

class WhereClause<T> {
  private op?: string;
  private value?: unknown;

  constructor(
    private parent: CloudTable<T>,
    private field: string,
  ) {}

  equals(value: unknown) {
    this.op = 'eq';
    this.value = value;
    return this;
  }

  belowOrEqual(value: unknown) {
    this.op = 'lte';
    this.value = value;
    return this;
  }

  above(value: unknown) {
    this.op = 'gt';
    this.value = value;
    return this;
  }

  anyOf(...values: unknown[]) {
    this.op = 'in';
    this.value = values.length === 1 && Array.isArray(values[0]) ? values[0] : values;
    return this;
  }

  async sortBy(field: string): Promise<T[]> {
    return call('query', this.parent.name, undefined, {
      field: this.field,
      op: this.op,
      value: this.value,
      orderBy: field,
    });
  }

  limit(n: number): WhereClause<T> {
    (this as any)._limit = n;
    return this;
  }

  async count(): Promise<number> {
    const res = await call('count', this.parent.name, undefined, {
      field: this.field,
      op: this.op,
      value: this.value,
    });
    return res.count as number;
  }

  async countWhere(extraFilters: { field: string; op: string; value: unknown }[]): Promise<number> {
    const res = await call('count', this.parent.name, undefined, {
      field: this.field,
      op: this.op,
      value: this.value,
      andFilters: extraFilters,
    });
    return res.count as number;
  }

  async toArray(): Promise<T[]> {
    return call('query', this.parent.name, undefined, {
      field: this.field,
      op: this.op,
      value: this.value,
      limit: (this as any)._limit,
    });
  }

  async first(): Promise<T | undefined> {
    const rows = await call('query', this.parent.name, undefined, {
      field: this.field,
      op: this.op,
      value: this.value,
      limit: 1,
    });
    return (rows as T[])[0];
  }

  async delete(): Promise<void> {
    const rows = await this.toArray();
    const ids = rows.map((r) => (r as any).id).filter(Boolean);
    const limit = 8;
    for (let i = 0; i < ids.length; i += limit) {
      const batch = ids.slice(i, i + limit);
      await Promise.allSettled(batch.map((id) => call('delete', this.parent.name, id)));
    }
  }
}

class OrderClause<T> {
  private desc = false;
  private lim: number | null = null;

  constructor(
    private parent: CloudTable<T>,
    private field: string,
  ) {}

  reverse() { this.desc = true; return this; }

  limit(n: number) { this.lim = n; return this; }

  async toArray(): Promise<T[]> {
    return call('list', this.parent.name, undefined, {
      orderBy: this.field,
      reverse: this.desc,
      limit: this.lim,
    });
  }
}

class CloudTable<T> {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  async toArray(): Promise<T[]> {
    const rows = await call('getAll', this.name);
    return rows as T[];
  }

  async get(id: string): Promise<T | undefined> {
    return call('get', this.name, id);
  }

  async add(item: T): Promise<void> {
    await call('add', this.name, undefined, item);
  }

  async put(item: T): Promise<void> {
    await call('put', this.name, undefined, item);
  }

  async bulkPut(items: T[]): Promise<void> {
    if (items.length === 0) return;
    const CHUNK = 20;
    for (let i = 0; i < items.length; i += CHUNK) {
      await call('bulkPut', this.name, undefined, items.slice(i, i + CHUNK));
    }
  }

  async bulkGet(ids: string[]): Promise<(T | undefined)[]> {
    // Parallel with concurrency limit of 8
    const limit = 8;
    const results: (T | undefined)[] = [];
    for (let i = 0; i < ids.length; i += limit) {
      const batch = ids.slice(i, i + limit);
      const batchResults = await Promise.allSettled(batch.map((id) => this.get(id)));
      results.push(...batchResults.map((r) => (r.status === 'fulfilled' ? r.value : undefined)));
    }
    return results;
  }

  async bulkUpdate(items: { id: string; [key: string]: unknown }[]): Promise<void> {
    if (items.length === 0) return;
    const CHUNK = 20;
    for (let i = 0; i < items.length; i += CHUNK) {
      await call('bulkUpdate', this.name, undefined, items.slice(i, i + CHUNK));
    }
  }

  async bulkDelete(ids: string[]): Promise<void> {
    if (ids.length === 0) return;
    const CHUNK = 20;
    for (let i = 0; i < ids.length; i += CHUNK) {
      await call('bulkDelete', this.name, undefined, ids.slice(i, i + CHUNK));
    }
  }

  async update(id: string, changes: Partial<T>): Promise<void> {
    await call('update', this.name, id, changes);
  }

  async delete(id: string): Promise<void> {
    await call('delete', this.name, id);
  }

  async count(): Promise<number> {
    const res = await call('count', this.name);
    return res.count as number;
  }

  async clear(): Promise<void> {
    const all = await this.toArray();
    const ids = all.map((item) => (item as any).id).filter(Boolean);
    const limit = 8;
    for (let i = 0; i < ids.length; i += limit) {
      const batch = ids.slice(i, i + limit);
      await Promise.allSettled(batch.map((id) => this.delete(id)));
    }
  }

  where(field: string): WhereClause<T> {
    return new WhereClause<T>(this, field);
  }

  orderBy(field: string): OrderClause<T> {
    return new OrderClause<T>(this, field);
  }

  async filter(fn: (item: T) => boolean): Promise<T[]> {
    const all = await this.toArray();
    return all.filter(fn);
  }
}

export const db = {
  words: new CloudTable<Word>('words'),
  reviewSessions: new CloudTable<ReviewSession>('reviewSessions'),
  dictationRecords: new CloudTable<DictationRecord>('dictationRecords'),
  shadowingRecords: new CloudTable<ShadowingRecord>('shadowingRecords'),
  userProfiles: new CloudTable<UserProfile>('userProfiles'),
  dailyLogs: new CloudTable<DailyLog>('dailyLogs'),
  achievements: new CloudTable<Achievement>('achievements'),
  settings: new CloudTable<AppSettings>('settings'),
  wordBooks: new CloudTable<WordBook>('wordBooks'),
  studyVideos: new CloudTable<StudyVideo>('studyVideos'),
  studySubtitles: new CloudTable<StudySubtitle>('studySubtitles'),
  studyLogs: new CloudTable<StudyLog>('studyLogs'),
  videoStudyLogs: new CloudTable<StudyLog>('videoStudyLogs'),
  userAchievements: new CloudTable<UserAchievement>('userAchievements'),
  userShareLinks: new CloudTable<UserShareLink>('userShareLinks'),
  stickerPacks: new CloudTable<StickerPack>('stickerPacks'),
  stickers: new CloudTable<Sticker>('stickers'),
  stickerDownloads: new CloudTable<StickerDownload>('stickerDownloads'),
  buddyRelations: new CloudTable<BuddyRelation>('buddyRelations'),
  buddyInvites: new CloudTable<BuddyInvite>('buddyInvites'),
  lessonMastery: new CloudTable<LessonMastery>('lessonMastery'),
  learningEvents: new CloudTable<LearningEvent>('learningEvents'),
  pronunciationAttempts: new CloudTable<PronunciationAttempt>('pronunciationAttempts'),
  userGrammarStates: new CloudTable<UserGrammarState>('userGrammarStates'),
  userArticleProgress: new CloudTable<UserArticleProgress>('userArticleProgress'),
  articleLearningEvents: new CloudTable<ArticleLearningEvent>('articleLearningEvents'),
  sentences: new CloudTable<SavedSentence>('sentences'),
  articles: new CloudTable<SavedArticle>('articles'),
  notes: new CloudTable<SavedNote>('notes'),
  recordings: new CloudTable<UserRecording>('recordings'),
  kpopProgress: new CloudTable<KpopSongProgress>('kpopProgress'),
  diary: new CloudTable<DiaryEntry>('diary'),
  readingProgress: new CloudTable<NewsReadingProgress>('readingProgress'),
  topikSessions: new CloudTable<TopikSession>('topikSessions'),
  topikMistakes: new CloudTable<TopikMistake>('topikMistakes'),
  spellingMistakes: new CloudTable<SpellingMistake>('spelling_mistakes'),
  aiChatMistakes: new CloudTable<AiChatMistake>('aiChatMistakes'),
  aiChatNewWords: new CloudTable<AiChatNewWord>('aiChatNewWords'),
  toriProgress: new CloudTable<ToriProgress>('toriProgress'),
  toriStickersOwned: new CloudTable<ToriStickerOwned>('toriStickersOwned'),
};

export const FAVORITES_BOOK_ID = 'default-favorites';

export async function ensureFavoritesBook(): Promise<string> {
  const existing = await db.wordBooks.get(FAVORITES_BOOK_ID);
  if (existing) return FAVORITES_BOOK_ID;
  const now = Date.now();
  await db.wordBooks.put({
    id: FAVORITES_BOOK_ID,
    name: '我的收藏',
    description: '收藏的单词',
    wordIds: [],
    color: 'var(--color-vocab)',
    createdAt: now,
    updatedAt: now,
  });
  return FAVORITES_BOOK_ID;
}

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
  return (await db.settings.get('main')) || defaults;
}
