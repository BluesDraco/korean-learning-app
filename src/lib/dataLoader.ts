// 词库 / TOPIK 数据加载器
// 数据已迁移到 public/data/*.json，运行时按需 fetch。
// 单页生命周期内 in-memory 缓存，重复调用不会重复 fetch。

'use client';

import type { YonseiUnit } from '@/data/yonsei-books';
import type { TopikSection, TopikExamSet, TopikQuestion } from '@/data/topik-questions';

export interface UnitMeta {
  [k: string]: unknown;
  id: string;
  bookId: number;
  bookTitle: string;
  unitNumber: number;
  title: string;
  titleKo: string;
  description: string;
  wordCount: number;
  previewWords: string[];
}

const cache = new Map<string, unknown>();

async function loadJson<T>(path: string): Promise<T> {
  if (cache.has(path)) return cache.get(path) as T;
  const res = await fetch(path);
  if (!res.ok) throw new Error(`load ${path} failed (${res.status})`);
  const data = (await res.json()) as T;
  cache.set(path, data);
  return data;
}

// ─── Yonsei / Seoul / Vitamin ───
export const loadYonseiIndex = () => loadJson<UnitMeta[]>('/data/yonsei/index.json');
export const loadSeoulIndex = () => loadJson<UnitMeta[]>('/data/seoul/index.json');
export const loadVitaminIndex = () => loadJson<UnitMeta[]>('/data/vitamin/index.json');

async function loadUnit(prefix: 'yonsei' | 'seoul' | 'vitamin', unitId: string): Promise<YonseiUnit | null> {
  const index = await loadJson<UnitMeta[]>(`/data/${prefix}/index.json`);
  const meta = index.find((u) => u.id === unitId);
  if (!meta) return null;
  const book = await loadJson<YonseiUnit[]>(`/data/${prefix}/book-${meta.bookId}.json`);
  return book.find((u) => u.id === unitId) ?? null;
}

export const loadYonseiUnit = (unitId: string) => loadUnit('yonsei', unitId);
export const loadSeoulUnit = (unitId: string) => loadUnit('seoul', unitId);
export const loadVitaminUnit = (unitId: string) => loadUnit('vitamin', unitId);

// ─── TOPIK ───
export const loadTopikSections = () => loadJson<TopikSection[]>('/data/topik/sections.json');
export const loadTopikExamSets = () => loadJson<TopikExamSet[]>('/data/topik/exam-sets.json');

export interface TopikQuestionIndexItem {
  [k: string]: unknown;
  id: string;
  section: 'listening' | 'reading';
  level: 'beginner' | 'intermediate' | 'advanced';
  difficulty: 'easy' | 'medium' | 'hard';
  questionType: string;
}
export const loadTopikQuestionIndex = () =>
  loadJson<TopikQuestionIndexItem[]>('/data/topik/questions-index.json');

// 从 id（如 E01II-L01）解析出 exam-set 文件名（E01-II）
function idToSetFile(id: string): string | null {
  const m = /^([ET])(\d+)(I{1,2})-/.exec(id);
  if (!m) return null;
  return `${m[1]}${m[2]}-${m[3]}`;
}

export function loadTopikExamQuestions(setFile: string): Promise<TopikQuestion[]> {
  return loadJson<TopikQuestion[]>(`/data/topik/questions/${setFile}.json`);
}

// 按题目 id 数组加载：自动分组到对应 exam 包并合并结果
export async function loadTopikQuestionsByIds(ids: string[]): Promise<TopikQuestion[]> {
  const buckets = new Map<string, string[]>();
  for (const id of ids) {
    const f = idToSetFile(id);
    if (!f) continue;
    if (!buckets.has(f)) buckets.set(f, []);
    buckets.get(f)!.push(id);
  }
  const packs = await Promise.all(
    [...buckets.keys()].map(f => loadTopikExamQuestions(f).catch((e: unknown) => { console.error(`[topik] failed to load questions from ${f}:`, e); return [] as TopikQuestion[]; }))
  );
  const map = new Map<string, TopikQuestion>();
  for (const pack of packs) for (const q of pack) map.set(q.id, q);
  return ids.map(id => map.get(id)).filter(Boolean) as TopikQuestion[];
}
