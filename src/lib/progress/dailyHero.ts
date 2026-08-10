'use client';

import { db } from '@/lib/db';
import { TOTAL_DAYS_PER_LEVEL } from '@/data/diary';

// 4 张大卡的进度计算工具
// 全部从 localStorage / IndexedDB 读，不打 API
// SSR 安全：window 不存在直接返回兜底

export interface VocabProgress {
  [k: string]: unknown;
  /** 上次访问的词库分类 */
  source?: 'yonsei' | 'seoul' | 'vitamin' | 'levels' | 'themes' | 'books';
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
  [k: string]: unknown;
  /** 当前应学的 day（1-30） */
  currentDay: number;
  /** 已完成 day 数 */
  completedCount: number;
  total: number;
  /** 当前天的 16:9 场景图（路径） */
  sceneImageUrl?: string;
}

export interface PhoneticProgress {
  [k: string]: unknown;
  completed: number;
  total: number;
}

export interface GrammarProgress {
  [k: string]: unknown;
  completed: number;
  total: number;
}


// ─── Vocab ───
export function recordVocabVisit(p: { source: VocabProgress['source']; unitId: string; unitTitle: string }) {
  db.vocabLastVisit.put({
    id: 'main',
    source: p.source,
    unitId: p.unitId,
    unitTitle: p.unitTitle,
    updatedAt: Date.now(),
  }).catch(() => {});
}

export async function getVocabProgress(): Promise<VocabProgress> {
  let last: { source?: VocabProgress['source']; unitId?: string; unitTitle?: string } = {};
  try {
    const row = await db.vocabLastVisit.get('main');
    if (row) last = { source: row.source, unitId: row.unitId, unitTitle: row.unitTitle };
  } catch { /* ignore */ }
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
    userRows.filter(r => (r.level ?? 'beginner') === 'beginner').forEach((r) => { if (r.completedAt) completedDays.add(r.day); });
    const next = Math.min(Math.max(0, ...Array.from(completedDays)) + 1, TOTAL_DAYS_PER_LEVEL);
    return { currentDay: next || 1, completedCount: completedDays.size, total: TOTAL_DAYS_PER_LEVEL, sceneImageUrl: sceneImageForDay(next || 1) };
  } catch {
    return { currentDay: 1, completedCount: 0, total: TOTAL_DAYS_PER_LEVEL, sceneImageUrl: sceneImageForDay(1) };
  }
}

// ─── Phonetics ───
export async function getPhoneticProgress(userId: string | undefined): Promise<PhoneticProgress> {
  let total = 0;
  try {
    const { PROGRESSIVE_STAGES } = await import('@/data/phonetics-progressive');
    total = PROGRESSIVE_STAGES.length;
  } catch { /* ignore */ }
  if (total === 0) return { completed: 0, total: 0 };

  // 新模块：lessonMastery 中 itemType='phonetic_step' AND itemIdx=99 表示 stage_complete
  let masteryCompleted = 0;
  try {
    const rows = await db.lessonMastery.where('itemType').equals('phonetic_step').toArray();
    masteryCompleted = rows.filter((r) => r.itemIdx === 99).length;
  } catch { /* ignore */ }

  // 旧模块：云端 phoneticSteps 27 步按比例映射到 5 个 stage
  let legacyCompleted = 0;
  if (userId) {
    try {
      const rows = await db.phoneticSteps.toArray();
      const oldCompleted = rows.length;
      if (oldCompleted > 0) {
        const { progressiveSteps } = await import('@/data/phonetics-steps');
        const oldTotal = progressiveSteps.length || 27;
        legacyCompleted = Math.min(total, Math.round((oldCompleted / oldTotal) * total));
      }
    } catch { /* ignore */ }
  }

  return { completed: Math.max(masteryCompleted, legacyCompleted), total };
}

// ─── Grammar ───
export async function getGrammarProgress(userId: string | undefined): Promise<GrammarProgress> {
  let completed = 0;
  let total = 0;
  if (userId) {
    try {
      completed = await db.userGrammarStates.where('status').equals('mastered').count();
    } catch { /* ignore */ }
  }
  try {
    const { grammarParts } = await import('@/data/grammar-parts');
    total = grammarParts.reduce((s, p) => s + p.lessons.length, 0);
  } catch { /* ignore */ }
  return { completed, total };
}

export function sceneImageForDay(day: number): string {
  return `/images/diary/day-${String(day).padStart(2, '0')}-hero.jpg`;
}
