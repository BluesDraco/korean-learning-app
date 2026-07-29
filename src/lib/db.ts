import type { Word, ReviewSession, DictationRecord, UserProfile, DailyLog, Achievement, AppSettings, WordBook, StudyVideo, StudySubtitle, StudyLog, UserAchievement, UserShareLink, StickerPack, Sticker, StickerDownload, BuddyRelation, BuddyInvite, PronunciationAttempt, UserGrammarState, UserArticleProgress, ArticleLearningEvent, TopikSession, TopikMistake, TopikTypeMastery, TopikUserGoal, TopikDailyPlan, SpellingMistake, AiChatMistake, AiChatNewWord, SavedSentence, SavedArticle, SavedNote, UserRecording, DiaryEntry, NewsReadingProgress, PhoneticMistake, PhoneticSrsItem, UserPhoneticStep, GrammarFavorite, TypingPackProgress, TypingMastery, WritingHistoryRecord, AiAnalyzeHistoryItem, UserVocabLastVisit, UserExpressionAdded, PracticeScore } from '@/types';
import type { LessonMastery, LearningEvent } from '@/lib/lesson/types';
import type { ToriProgress, ToriStickerOwned } from '@/types/tori-diary';
import type { ToriSubQuestProgress } from '@/types/tori-subquest';
import { t } from './i18n';
import type { Lang } from './i18n';

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
    if (this.op === 'in' && Array.isArray(this.value) && this.value.length > 200) {
      const chunks: unknown[][] = [];
      for (let i = 0; i < this.value.length; i += 200) {
        chunks.push(this.value.slice(i, i + 200));
      }
      const results = await Promise.all(chunks.map((c) =>
        call('query', this.parent.name, undefined, { field: this.field, op: 'in', value: c })
      ));
      const merged = results.flat() as T[];
      const lim = (this as any)._limit;
      return typeof lim === 'number' ? merged.slice(0, lim) : merged;
    }
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
    const chunks: T[][] = [];
    for (let i = 0; i < items.length; i += CHUNK) chunks.push(items.slice(i, i + CHUNK));
    // 各 chunk 是不同数据行、无依赖，按 8 并发跑（弱网下比串行快数倍）。
    const CONCURRENCY = 8;
    for (let i = 0; i < chunks.length; i += CONCURRENCY) {
      await Promise.all(chunks.slice(i, i + CONCURRENCY).map((c) => call('bulkPut', this.name, undefined, c)));
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
    const chunks: { id: string; [key: string]: unknown }[][] = [];
    for (let i = 0; i < items.length; i += CHUNK) chunks.push(items.slice(i, i + CHUNK));
    const CONCURRENCY = 8;
    for (let i = 0; i < chunks.length; i += CONCURRENCY) {
      await Promise.all(chunks.slice(i, i + CONCURRENCY).map((c) => call('bulkUpdate', this.name, undefined, c)));
    }
  }

  async bulkDelete(ids: string[]): Promise<void> {
    if (ids.length === 0) return;
    const CHUNK = 20;
    const chunks: string[][] = [];
    for (let i = 0; i < ids.length; i += CHUNK) chunks.push(ids.slice(i, i + CHUNK));
    const CONCURRENCY = 8;
    for (let i = 0; i < chunks.length; i += CONCURRENCY) {
      await Promise.all(chunks.slice(i, i + CONCURRENCY).map((c) => call('bulkDelete', this.name, undefined, c)));
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
  phoneticMistakes: new CloudTable<PhoneticMistake>('phoneticMistakes'),
  phoneticSrs: new CloudTable<PhoneticSrsItem>('phoneticSrs'),
  phoneticSteps: new CloudTable<UserPhoneticStep>('userPhoneticSteps'),
  grammarFavorites: new CloudTable<GrammarFavorite>('userGrammarFavorites'),
  typingPackProgress: new CloudTable<TypingPackProgress>('typingPackProgress'),
  typingMastery: new CloudTable<TypingMastery>('typingMastery'),
  writingHistory: new CloudTable<WritingHistoryRecord>('writingHistory'),
  aiAnalyzeHistory: new CloudTable<AiAnalyzeHistoryItem>('aiAnalyzeHistory'),
  vocabLastVisit: new CloudTable<UserVocabLastVisit>('userVocabLastVisit'),
  expressionAdded: new CloudTable<UserExpressionAdded>('userExpressionAdded'),
  pronunciationAttempts: new CloudTable<PronunciationAttempt>('pronunciationAttempts'),
  userGrammarStates: new CloudTable<UserGrammarState>('userGrammarStates'),
  practiceScores: new CloudTable<PracticeScore>('practiceScores'),
  userArticleProgress: new CloudTable<UserArticleProgress>('userArticleProgress'),
  articleLearningEvents: new CloudTable<ArticleLearningEvent>('articleLearningEvents'),
  sentences: new CloudTable<SavedSentence>('sentences'),
  articles: new CloudTable<SavedArticle>('articles'),
  notes: new CloudTable<SavedNote>('notes'),
  recordings: new CloudTable<UserRecording>('recordings'),
  diary: new CloudTable<DiaryEntry>('diary'),
  readingProgress: new CloudTable<NewsReadingProgress>('readingProgress'),
  topikSessions: new CloudTable<TopikSession>('topikSessions'),
  topikMistakes: new CloudTable<TopikMistake>('topikMistakes'),
  topikTypeMastery: new CloudTable<TopikTypeMastery>('topikTypeMastery'),
  topikUserGoals: new CloudTable<TopikUserGoal>('topikUserGoals'),
  topikDailyPlans: new CloudTable<TopikDailyPlan>('topikDailyPlans'),
  spellingMistakes: new CloudTable<SpellingMistake>('spelling_mistakes'),
  aiChatMistakes: new CloudTable<AiChatMistake>('aiChatMistakes'),
  aiChatNewWords: new CloudTable<AiChatNewWord>('aiChatNewWords'),
  toriProgress: new CloudTable<ToriProgress>('toriProgress'),
  toriStickersOwned: new CloudTable<ToriStickerOwned>('toriStickersOwned'),
  toriSubQuestProgress: new CloudTable<ToriSubQuestProgress>('toriSubQuestProgress'),
};

export const FAVORITES_BOOK_ID = 'default-favorites';

export async function ensureFavoritesBook(lang: Lang = 'zh'): Promise<string> {
  const existing = await db.wordBooks.get(FAVORITES_BOOK_ID);
  if (existing) return FAVORITES_BOOK_ID;
  const now = Date.now();
  await db.wordBooks.put({
    id: FAVORITES_BOOK_ID,
    name: t('db.favorites_name', lang),
    description: t('db.favorites_desc', lang),
    wordIds: [],
    color: 'var(--color-vocab)',
    createdAt: now,
    updatedAt: now,
  });
  return FAVORITES_BOOK_ID;
}

/** 从所有收藏本剔除已删除的 word id，避免残留孤儿 id / 收藏词凭空消失 */
async function stripDeletedIdsFromBooks(deletedIds: Set<string>): Promise<void> {
  if (deletedIds.size === 0) return;
  try {
    const books = await db.wordBooks.toArray();
    const now = Date.now();
    await Promise.all(
      books
        .filter((b) => b.wordIds.some((id) => deletedIds.has(id)))
        .map((b) => db.wordBooks.update(b.id, { wordIds: b.wordIds.filter((id) => !deletedIds.has(id)), updatedAt: now })),
    );
  } catch { /* 收藏本清理失败不阻塞删除主流程 */ }
}

/**
 * 按韩文删除 db.words 行（含重复行），并从收藏本剔除被删 id。
 * 避免删词后收藏本残留孤儿 id / 收藏词凭空消失。返回被删的 id 集合。
 */
export async function deleteWordsByText(words: Iterable<string>): Promise<Set<string>> {
  const deletedIds = new Set<string>();
  for (const word of words) {
    const rows = await db.words.where('word').equals(word).toArray();
    for (const r of rows) {
      await db.words.delete(r.id).catch(() => {});
      deletedIds.add(r.id);
    }
  }
  await stripDeletedIdsFromBooks(deletedIds);
  return deletedIds;
}

/** 按 id 删除 db.words 行，并从收藏本剔除被删 id。用于按 id 列出的词库页。 */
export async function deleteWordIds(ids: Iterable<string>): Promise<Set<string>> {
  const deletedIds = new Set<string>();
  for (const id of ids) {
    await db.words.delete(id).catch(() => {});
    deletedIds.add(id);
  }
  await stripDeletedIdsFromBooks(deletedIds);
  return deletedIds;
}

export async function initSettings(): Promise<AppSettings> {
  const existing = await db.settings.get('main');
  if (existing) return existing;

  const defaults: AppSettings = {
    id: 'main',
    dailyWordGoal: 20,
    defaultPlaybackRate: 1,
    theme: 'dark',
  };
  await db.settings.put(defaults);
  return (await db.settings.get('main')) || defaults;
}
