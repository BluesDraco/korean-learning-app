'use client';

import { db } from '@/lib/db';
import { TOTAL_DAYS } from '@/data/diary';

// 4 张大卡的进度计算工具
// 全部从 localStorage / IndexedDB 读，不打 API
// SSR 安全：window 不存在直接返回兜底

export interface VocabProgress {
  /** 上次访问的词库分类 */
  source?: 'yonsei' | 'seoul' | 'levels' | 'themes' | 'books';
  /** 上次访问的 unit id */
  unitId?: string;
  /** 上次访问的 unit 标题（展示用） */
  unitTitle?: string;
  /** 已掌握词数 */
  mastered: number;
  /** 总词数 */
  total: number;
}

export interface DiaryProgress {
  /** 当前应学的 day（1-30） */
  currentDay: number;
  /** 已完成 day 数 */
  completedCount: number;
  total: number;
  /** 当前天的 16:9 场景图（路径） */
  sceneImageUrl?: string;
}

export interface PhoneticProgress {
  completed: number;
  total: number;
}

export interface GrammarProgress {
  completed: number;
  total: number;
}

const VOCAB_KEY = 'vocab_last_unit';
const PHONETICS_KEY = 'phonetics-completed-steps';
const GRAMMAR_KEY = 'grammar_lesson_states';

// ─── Vocab ───
export function recordVocabVisit(p: { source: VocabProgress['source']; unitId: string; unitTitle: string }) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(VOCAB_KEY, JSON.stringify({ ...p, ts: Date.now() }));
  } catch { /* ignore */ }
}

export async function getVocabProgress(): Promise<VocabProgress> {
  let last: { source?: VocabProgress['source']; unitId?: string; unitTitle?: string } = {};
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(VOCAB_KEY);
      if (raw) last = JSON.parse(raw);
    } catch { /* ignore */ }
  }
  let mastered = 0;
  let total = 0;
  try {
    const all = await db.words.toArray();
    total = all.length;
    mastered = all.filter((w) => w.mastery === 'mastered').length;
  } catch { /* ignore */ }
  return { ...last, mastered, total };
}

// ─── Diary ───
export async function getDiaryProgress(userId: string): Promise<DiaryProgress> {
  try {
    const rows = await db.toriProgress.toArray();
    const userRows = rows.filter((r) => r.userId === userId);
    const completedDays = new Set<number>();
    userRows.forEach((r) => { if (r.completedAt) completedDays.add(r.day); });
    const next = Math.min(Math.max(0, ...Array.from(completedDays)) + 1, TOTAL_DAYS);
    return { currentDay: next || 1, completedCount: completedDays.size, total: TOTAL_DAYS, sceneImageUrl: sceneImageForDay(next || 1) };
  } catch {
    return { currentDay: 1, completedCount: 0, total: TOTAL_DAYS, sceneImageUrl: sceneImageForDay(1) };
  }
}

// ─── Phonetics ───
export async function getPhoneticProgress(): Promise<PhoneticProgress> {
  let completed = 0;
  let total = 0;
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(PHONETICS_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        completed = Array.isArray(arr) ? arr.length : 0;
      }
    } catch { /* ignore */ }
  }
  try {
    const { progressiveSteps } = await import('@/data/phonetics-steps');
    total = progressiveSteps.length;
  } catch { /* ignore */ }
  return { completed, total };
}

// ─── Grammar ───
export async function getGrammarProgress(): Promise<GrammarProgress> {
  let completed = 0;
  let total = 0;
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(GRAMMAR_KEY);
      if (raw) {
        const states = JSON.parse(raw) as Record<string, string>;
        completed = Object.values(states).filter((s) => s === 'done').length;
      }
    } catch { /* ignore */ }
  }
  try {
    const { grammarParts } = await import('@/data/grammar-parts');
    total = grammarParts.reduce((s, p) => s + p.lessons.length, 0);
  } catch { /* ignore */ }
  return { completed, total };
}

export function sceneImageForDay(day: number): string {
  return `/images/diary/day-${String(day).padStart(2, '0')}-scene.png`;
}
