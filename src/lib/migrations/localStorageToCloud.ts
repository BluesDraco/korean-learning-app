'use client';
import { db } from '@/lib/db';
import type { UserGrammarState } from '@/types';

const GRAMMAR_MARKER = (uid: string) => `migration:grammar-lesson-states-v1:${uid}`;
const PHONETIC_MARKER = (uid: string) => `migration:phonetic-steps-v1:${uid}`;

export async function migrateGrammarLessonStates(userId: string): Promise<void> {
  if (typeof window === 'undefined' || !userId) return;
  if (localStorage.getItem(GRAMMAR_MARKER(userId)) === '1') return;
  try {
    const raw = localStorage.getItem(`grammar_lesson_states:${userId}`);
    if (!raw) { localStorage.setItem(GRAMMAR_MARKER(userId), '1'); return; }
    const states = JSON.parse(raw) as Record<string, 'done' | 'started' | 'todo'>;
    const now = Date.now();
    const toUpload: UserGrammarState[] = Object.entries(states)
      .filter(([, s]) => s === 'done' || s === 'started')
      .map(([id, s]) => ({
        id,
        status: s === 'done' ? 'mastered' : 'learning',
        seenCount: 1,
        correctCount: 0,
        wrongCount: 0,
        lastSeenAt: now,
        source: 'legacy-migration',
        createdAt: now,
        updatedAt: now,
      }));
    if (toUpload.length === 0) { localStorage.setItem(GRAMMAR_MARKER(userId), '1'); return; }

    const existing = await db.userGrammarStates.toArray();
    const existingIds = new Set(existing.map(r => r.id));
    const filtered = toUpload.filter(r => !existingIds.has(r.id));
    if (filtered.length > 0) await db.userGrammarStates.bulkPut(filtered);

    localStorage.setItem(GRAMMAR_MARKER(userId), '1');
  } catch (e) {
    console.warn('grammar migration failed:', e);
  }
}

export async function migratePhoneticSteps(userId: string): Promise<void> {
  if (typeof window === 'undefined' || !userId) return;
  if (localStorage.getItem(PHONETIC_MARKER(userId)) === '1') return;
  try {
    const raw = localStorage.getItem(`phonetics-completed-steps:${userId}`);
    if (!raw) { localStorage.setItem(PHONETIC_MARKER(userId), '1'); return; }
    const arr = JSON.parse(raw) as string[];
    if (!Array.isArray(arr) || arr.length === 0) {
      localStorage.setItem(PHONETIC_MARKER(userId), '1');
      return;
    }
    const now = Date.now();
    const existing = await db.phoneticSteps.toArray();
    const existingIds = new Set(existing.map(r => r.id));
    const toUpload = arr
      .filter(id => !existingIds.has(id))
      .map(id => ({ id, completedAt: now }));
    if (toUpload.length > 0) await db.phoneticSteps.bulkPut(toUpload);
    localStorage.setItem(PHONETIC_MARKER(userId), '1');
  } catch (e) {
    console.warn('phonetic migration failed:', e);
  }
}

const GRAMMAR_FAV_MARKER = (uid: string) => `migration:grammar-favorites-v1:${uid}`;
const TYPING_PACK_MARKER = (uid: string) => `migration:typing-pack-v1:${uid}`;
const TYPING_MASTERY_MARKER = (uid: string) => `migration:typing-mastery-v1:${uid}`;
const WRITING_MARKER = (uid: string) => `migration:writing-history-v1:${uid}`;
const AI_ANALYZE_MARKER = (uid: string) => `migration:ai-analyze-history-v1:${uid}`;

export async function migrateGrammarFavorites(userId: string): Promise<void> {
  if (typeof window === 'undefined' || !userId) return;
  if (localStorage.getItem(GRAMMAR_FAV_MARKER(userId)) === '1') return;
  try {
    const raw = localStorage.getItem(`grammar-favorites:${userId}`);
    if (!raw) { localStorage.setItem(GRAMMAR_FAV_MARKER(userId), '1'); return; }
    const arr = JSON.parse(raw) as string[];
    if (!Array.isArray(arr) || arr.length === 0) {
      localStorage.setItem(GRAMMAR_FAV_MARKER(userId), '1');
      return;
    }
    const now = Date.now();
    const existing = await db.grammarFavorites.toArray();
    const existingIds = new Set(existing.map(r => r.id));
    const toUpload = arr
      .filter(id => !existingIds.has(id))
      .map(id => ({ id, createdAt: now }));
    if (toUpload.length > 0) await db.grammarFavorites.bulkPut(toUpload);
    localStorage.setItem(GRAMMAR_FAV_MARKER(userId), '1');
  } catch (e) {
    console.warn('grammar favorites migration failed:', e);
  }
}

export async function migrateTypingPackProgress(userId: string): Promise<void> {
  if (typeof window === 'undefined' || !userId) return;
  if (localStorage.getItem(TYPING_PACK_MARKER(userId)) === '1') return;
  try {
    const prefix = `typing-pack:${userId}:`;
    const found: { themeId: string; progress: { completedAt: number; bestWpm: number; bestAccuracy: number; practiceCount: number } }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(prefix)) continue;
      const themeId = key.slice(prefix.length);
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const p = JSON.parse(raw);
        if (p && typeof p === 'object') found.push({ themeId, progress: p });
      } catch { /* skip corrupt entry */ }
    }
    if (found.length === 0) { localStorage.setItem(TYPING_PACK_MARKER(userId), '1'); return; }

    const existing = await db.typingPackProgress.toArray();
    const existingIds = new Set(existing.map(r => r.id));
    const now = Date.now();
    const toUpload = found
      .filter(f => !existingIds.has(f.themeId))
      .map(f => ({
        id: f.themeId,
        completedAt: f.progress.completedAt ?? now,
        bestWpm: f.progress.bestWpm ?? 0,
        bestAccuracy: f.progress.bestAccuracy ?? 0,
        practiceCount: f.progress.practiceCount ?? 0,
        updatedAt: now,
      }));
    if (toUpload.length > 0) await db.typingPackProgress.bulkPut(toUpload);
    localStorage.setItem(TYPING_PACK_MARKER(userId), '1');
  } catch (e) {
    console.warn('typing pack migration failed:', e);
  }
}

export async function migrateTypingMastery(userId: string): Promise<void> {
  if (typeof window === 'undefined' || !userId) return;
  if (localStorage.getItem(TYPING_MASTERY_MARKER(userId)) === '1') return;
  try {
    const prefix = `typing-mastery:${userId}:`;
    const rows: { id: string; themeId: string; itemKey: string; streak: number; updatedAt: number }[] = [];
    const now = Date.now();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(prefix)) continue;
      const themeId = key.slice(prefix.length);
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const m = JSON.parse(raw) as Record<string, number>;
        for (const [itemKey, streak] of Object.entries(m)) {
          if (typeof streak !== 'number' || streak <= 0) continue;
          rows.push({
            id: `${themeId}:${itemKey}`,
            themeId,
            itemKey,
            streak,
            updatedAt: now,
          });
        }
      } catch { /* skip */ }
    }
    if (rows.length === 0) { localStorage.setItem(TYPING_MASTERY_MARKER(userId), '1'); return; }

    const existing = await db.typingMastery.toArray();
    const existingIds = new Set(existing.map(r => r.id));
    const filtered = rows.filter(r => !existingIds.has(r.id));
    if (filtered.length > 0) await db.typingMastery.bulkPut(filtered);
    localStorage.setItem(TYPING_MASTERY_MARKER(userId), '1');
  } catch (e) {
    console.warn('typing mastery migration failed:', e);
  }
}

export async function migrateWritingHistory(userId: string): Promise<void> {
  if (typeof window === 'undefined' || !userId) return;
  if (localStorage.getItem(WRITING_MARKER(userId)) === '1') return;
  try {
    const raw = localStorage.getItem(`tori_writing_history_${userId}`);
    if (!raw) { localStorage.setItem(WRITING_MARKER(userId), '1'); return; }
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || arr.length === 0) {
      localStorage.setItem(WRITING_MARKER(userId), '1');
      return;
    }
    const existing = await db.writingHistory.toArray();
    const existingIds = new Set(existing.map(r => r.id));
    const now = Date.now();
    const toUpload = arr
      .filter((r: any) => r && r.id && !existingIds.has(r.id))
      .map((r: any) => ({
        id: r.id,
        date: r.date ?? '',
        mode: r.mode ?? '',
        modeLabel: r.modeLabel ?? '',
        score: r.score ?? '',
        snippet: r.snippet ?? '',
        detailsJson: r.details !== undefined ? JSON.stringify(r.details) : '',
        createdAt: now,
      }));
    if (toUpload.length > 0) await db.writingHistory.bulkPut(toUpload);
    localStorage.setItem(WRITING_MARKER(userId), '1');
  } catch (e) {
    console.warn('writing history migration failed:', e);
  }
}

export async function migrateAiAnalyzeHistory(userId: string): Promise<void> {
  if (typeof window === 'undefined' || !userId) return;
  if (localStorage.getItem(AI_ANALYZE_MARKER(userId)) === '1') return;
  try {
    const raw = localStorage.getItem(`analyze-history:${userId}`);
    if (!raw) { localStorage.setItem(AI_ANALYZE_MARKER(userId), '1'); return; }
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || arr.length === 0) {
      localStorage.setItem(AI_ANALYZE_MARKER(userId), '1');
      return;
    }
    const existing = await db.aiAnalyzeHistory.toArray();
    const existingIds = new Set(existing.map(r => r.id));
    const toUpload = arr
      .filter((r: any) => r && r.id && !existingIds.has(r.id))
      .map((r: any) => ({
        id: r.id,
        timestamp: r.timestamp ?? Date.now(),
        original: r.original ?? '',
        fullTranslation: r.fullTranslation ?? '',
        resultJson: r.result ? JSON.stringify(r.result) : undefined,
      }));
    if (toUpload.length > 0) await db.aiAnalyzeHistory.bulkPut(toUpload);
    localStorage.setItem(AI_ANALYZE_MARKER(userId), '1');
  } catch (e) {
    console.warn('ai analyze history migration failed:', e);
  }
}
