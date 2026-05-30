import type { Word, ReviewSession, DictationRecord, ShadowingRecord, UserProfile, DailyLog, Achievement, AppSettings, WordBook, StudyVideo, StudySubtitle, StudyLog, UserAchievement, UserShareLink, StickerPack, Sticker, StickerDownload, BuddyRelation, BuddyInvite } from '@/types';

const API = '/api/user-data';

async function call(action: string, table: string, id?: string, data?: unknown): Promise<any> {
  const body: Record<string, unknown> = { action, table };
  if (id !== undefined) body.id = id;
  if (data !== undefined) body.data = data;
  const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Network error' }));
    throw new Error(err.error || `API error ${res.status}`);
  }
  return res.json();
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
    this.value = values;
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
    const rows = await call('query', this.parent.name, undefined, {
      field: this.field,
      op: this.op,
      value: this.value,
    });
    return (rows as T[]).length;
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
    for (const row of rows) {
      await call('delete', this.parent.name, (row as any).id);
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
    for (const item of items) {
      await this.put(item);
    }
  }

  async bulkGet(ids: string[]): Promise<(T | undefined)[]> {
    const results: (T | undefined)[] = [];
    for (const id of ids) {
      results.push(await this.get(id));
    }
    return results;
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
    for (const item of all) {
      await this.delete((item as any).id);
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
};

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
