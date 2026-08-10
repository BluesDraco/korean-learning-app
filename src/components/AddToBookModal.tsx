'use client';

<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HighlightedExample } from '@/components/vocabulary/HighlightedExample';
import { X, Search, Check, Plus, Loader2, Volume2, AlertCircle, Trash2, Sparkles } from 'lucide-react';
import { db } from '@/lib/db';
import { searchEntries } from '@/data/vocabulary/index';
import { speakWord } from '@/lib/tts';
import { displayRoman } from '@/lib/dictionary';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import type { WordBook, Word, WordEntry, Example } from '@/types';
=======
import React, { useState, useEffect, useMemo } from 'react';
import { HighlightedExample } from '@/components/vocabulary/HighlightedExample';
import { X, Search, Check, Plus, Loader2, Volume2, AlertCircle } from 'lucide-react';
import { db } from '@/lib/db';
import { searchEntries } from '@/data/vocabulary/index';
import { speakWord } from '@/lib/tts';
import type { WordBook, Word, WordEntry } from '@/types';
>>>>>>> recovery-branch

interface Props {
  mode: 'select-books' | 'select-words';
  preSelectedWordIds?: string[];
  bookId?: string;
  onClose: () => void;
  onDone: () => void;
}

type ResultItem =
  | { kind: 'saved'; word: Word }
  | { kind: 'entry'; entry: WordEntry };

<<<<<<< HEAD
type MeaningRow = {
  chinese: string;
  partOfSpeech?: string;
  examples?: Example[];
  exState?: 'idle' | 'loading' | 'done' | 'empty' | 'error';
  exReason?: string;
};

interface LookupResult {
  korean: string;
  romanization: string;
  meaning?: string;                   // 兜底（旧接口）
  meanings?: MeaningRow[];            // 多义
  partOfSpeech?: string;
  examples: { korean: string; chinese: string }[];
}

function normalizeMeanings(r: LookupResult): MeaningRow[] {
  if (Array.isArray(r.meanings) && r.meanings.length > 0) {
    return r.meanings.map((m) => ({ chinese: m.chinese ?? '', partOfSpeech: m.partOfSpeech ?? '' }));
  }
  if (r.meaning) return [{ chinese: r.meaning, partOfSpeech: r.partOfSpeech ?? '' }];
  return [];
}

function mergeMeanings(existing: Word, incoming: MeaningRow[]): MeaningRow[] {
  const current: MeaningRow[] = existing.meanings?.length
    ? existing.meanings
    : (existing.meaning ? [{ chinese: existing.meaning, partOfSpeech: existing.partOfSpeech }] : []);
  const merged = [...current];
  for (const m of incoming) {
    const t = m.chinese.trim();
    if (!t) continue;
    if (merged.some((x) => x.chinese.trim() === t)) continue;
    merged.push({ chinese: t, partOfSpeech: m.partOfSpeech?.trim() || '' });
  }
  return merged;
}

function entryToWord(entry: WordEntry): Word {
  const meanings: MeaningRow[] = entry.meanings.map((m) => ({
    chinese: m.chinese,
    partOfSpeech: entry.partOfSpeech,
  }));
  return {
    id: crypto.randomUUID(),
    word: entry.korean,
    pronunciation: displayRoman(entry.romanization, entry.korean),
    meaning: meanings.map((m) => m.chinese).join('；'),
    meanings,
=======
interface LookupResult {
  korean: string;
  romanization: string;
  meaning: string;
  partOfSpeech: string;
  examples: { korean: string; chinese: string }[];
}

function entryToWord(entry: WordEntry): Word {
  return {
    id: crypto.randomUUID(),
    word: entry.korean,
    pronunciation: entry.romanization,
    meaning: entry.meanings[0]?.chinese ?? '',
>>>>>>> recovery-branch
    partOfSpeech: entry.partOfSpeech,
    examples: entry.examples.slice(0, 3).map((ex) => ({
      text: ex.korean,
      translation: ex.chinese,
      source: 'manual' as const,
    })),
    sourceEntryId: entry.id,
    source: 'library',
    mastery: 'new',
    srsLevel: 0,
    nextReview: Date.now(),
    easeFactor: 2.5,
    interval: 0,
    createdAt: Date.now(),
    lastReviewed: null,
  };
}

<<<<<<< HEAD
function lookupToWord(result: LookupResult, meanings: MeaningRow[]): Word {
  const cleaned = meanings
    .filter((m) => m.chinese.trim().length > 0)
    .map((m) => {
      // 只保留持久化字段，剥掉 UI-only 的 exState/exReason
      const out: { chinese: string; partOfSpeech?: string; examples?: Example[] } = {
        chinese: m.chinese.trim(),
        partOfSpeech: m.partOfSpeech?.trim() || '',
      };
      if (m.examples && m.examples.length > 0) out.examples = m.examples;
      return out;
    });
  return {
    id: crypto.randomUUID(),
    word: result.korean,
    pronunciation: displayRoman(result.romanization, result.korean),
    meaning: cleaned.map((m) => m.chinese).join('；'),
    meanings: cleaned,
    partOfSpeech: cleaned[0]?.partOfSpeech || result.partOfSpeech || '',
=======
function lookupToWord(result: LookupResult): Word {
  return {
    id: crypto.randomUUID(),
    word: result.korean,
    pronunciation: result.romanization,
    meaning: result.meaning,
    partOfSpeech: result.partOfSpeech,
>>>>>>> recovery-branch
    examples: result.examples.map((ex) => ({
      text: ex.korean,
      translation: ex.chinese,
      source: 'manual' as const,
    })),
    source: 'manual',
    mastery: 'new',
    srsLevel: 0,
    nextReview: Date.now(),
    easeFactor: 2.5,
    interval: 0,
    createdAt: Date.now(),
    lastReviewed: null,
  };
}

export function AddToBookModal({ mode, preSelectedWordIds, bookId, onClose, onDone }: Props) {
  const { lang } = useLang();
  const [books, setBooks] = useState<WordBook[]>([]);
  const [savedWords, setSavedWords] = useState<Word[]>([]);
  const [search, setSearch] = useState('');
  const [selectedBookIds, setSelectedBookIds] = useState<Set<string>>(new Set());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const selectedEntriesRef = React.useRef<Map<string, WordEntry>>(new Map());
  const [loading, setLoading] = useState(true);

  // Manual input tab state
  const [inputTab, setInputTab] = useState<'search' | 'manual'>('search');
  const [manualInput, setManualInput] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);
<<<<<<< HEAD
  const [editedMeanings, setEditedMeanings] = useState<MeaningRow[]>([]);
  const [lookupError, setLookupError] = useState('');
  const [manualSaving, setManualSaving] = useState(false);
  // 查询结果对应的韩文词是否已经在当前词书里
  const [alreadyInBook, setAlreadyInBook] = useState(false);

  // 当前 book 里已有的韩文词面集合，用于挡词库 entry 的重复
  const [existingKoreans, setExistingKoreans] = useState<Set<string>>(new Set());

  useEffect(() => {
    const load = async () => {
      try {
        if (mode === 'select-books') {
          setBooks(await db.wordBooks.orderBy('createdAt').reverse().toArray());
        } else if (bookId) {
          const book = await db.wordBooks.get(bookId);
          const all = await db.words.orderBy('createdAt').reverse().toArray();
          const inBook = new Set(book?.wordIds || []);
          setExistingKoreans(new Set(all.filter((w) => inBook.has(w.id)).map((w) => w.word)));
          setSavedWords(all.filter((w) => !inBook.has(w.id)));
        }
      } catch { /* ignore */ } finally {
        setLoading(false);
=======
  const [lookupError, setLookupError] = useState('');
  const [manualSaving, setManualSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (mode === 'select-books') {
        setBooks(await db.wordBooks.orderBy('createdAt').reverse().toArray());
      } else if (bookId) {
        const book = await db.wordBooks.get(bookId);
        const all = await db.words.orderBy('createdAt').reverse().toArray();
        const existingIds = new Set(book?.wordIds || []);
        setSavedWords(all.filter((w) => !existingIds.has(w.id)));
>>>>>>> recovery-branch
      }
    };
    load();
  }, [mode, bookId]);

<<<<<<< HEAD
  const [results, setResults] = useState<ResultItem[]>([]);

  useEffect(() => {
    if (mode !== 'select-words') { setResults([]); return; }
    if (!search.trim()) {
      setResults(savedWords.map((w) => ({ kind: 'saved', word: w })));
      return;
    }
    (async () => {
      const q = search.trim();
      const savedMatches = savedWords.filter(
        (w) => w.word.includes(q) || w.meaning.includes(q) || w.pronunciation.includes(q)
      );
      const savedKorean = new Set(savedMatches.map((w) => w.word));
      // 词库 entry 若韩文已在当前 book 里，也过滤掉（防止再加）
      const entryMatches = (await searchEntries(q))
        .filter((e) => !savedKorean.has(e.korean) && !existingKoreans.has(e.korean))
        .slice(0, 50);
      setResults([
        ...savedMatches.map((w): ResultItem => ({ kind: 'saved', word: w })),
        ...entryMatches.map((e): ResultItem => ({ kind: 'entry', entry: e })),
      ]);
    })();
  }, [search, savedWords, mode, existingKoreans]);
=======
  const results = useMemo((): ResultItem[] => {
    if (mode !== 'select-words') return [];
    if (!search.trim()) {
      return savedWords.map((w) => ({ kind: 'saved', word: w }));
    }
    const q = search.trim();
    const savedMatches = savedWords.filter(
      (w) => w.word.includes(q) || w.meaning.includes(q) || w.pronunciation.includes(q)
    );
    const savedKorean = new Set(savedMatches.map((w) => w.word));
    const entryMatches = searchEntries(q)
      .filter((e) => !savedKorean.has(e.korean))
      .slice(0, 50);
    return [
      ...savedMatches.map((w): ResultItem => ({ kind: 'saved', word: w })),
      ...entryMatches.map((e): ResultItem => ({ kind: 'entry', entry: e })),
    ];
  }, [search, savedWords, mode]);
>>>>>>> recovery-branch

  const handleLookup = async () => {
    if (!manualInput.trim()) return;
    setLookupLoading(true);
    setLookupResult(null);
<<<<<<< HEAD
    setEditedMeanings([]);
    setLookupError('');
    setAlreadyInBook(false);
=======
    setLookupError('');
>>>>>>> recovery-branch
    try {
      const res = await fetch('/api/ai/word-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: manualInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
<<<<<<< HEAD
        if (res.status === 401) {
          setLookupError(t('addbook.errLogin', lang));
        } else {
          setLookupError(data.error || t('addbook.errLookup', lang));
        }
      } else {
        setLookupResult(data);
        setEditedMeanings(normalizeMeanings(data));
        // 检查这个韩文词是否已经在当前词书里
        if (bookId && data.korean) {
          try {
            const existingWord = await db.words.where('word').equals(data.korean).first();
            const book = await db.wordBooks.get(bookId);
            setAlreadyInBook(!!(existingWord && book?.wordIds.includes(existingWord.id)));
          } catch { setAlreadyInBook(false); }
        }
      }
    } catch {
      setLookupError(t('addbook.errNetwork', lang));
=======
        setLookupError(data.error || '查询失败，请重试');
      } else {
        setLookupResult(data);
      }
    } catch {
      setLookupError('网络异常，请重试');
>>>>>>> recovery-branch
    } finally {
      setLookupLoading(false);
    }
  };

  const handleManualSave = async () => {
    if (!lookupResult || !bookId) return;
<<<<<<< HEAD
    const cleaned = editedMeanings.filter((m) => m.chinese.trim().length > 0);
    if (cleaned.length === 0) {
      setLookupError(t('addbook.errKeepOne', lang));
      return;
    }
=======
>>>>>>> recovery-branch
    setManualSaving(true);
    try {
      const book = await db.wordBooks.get(bookId);
      if (!book) return;
      // Check if korean word already exists
      const existingWord = await db.words.where('word').equals(lookupResult.korean).first();
      let wordId: string;
      if (existingWord) {
        wordId = existingWord.id;
<<<<<<< HEAD
        // 合并新义项到旧词条（去重、保留旧顺序）
        const merged = mergeMeanings(existingWord, cleaned);
        const mergedDiffers = merged.length !== (existingWord.meanings?.length ?? 0)
          || merged.some((m, i) => existingWord.meanings?.[i]?.chinese !== m.chinese);
        if (mergedDiffers) {
          await db.words.update(existingWord.id, {
            meanings: merged,
            meaning: merged.map((m) => m.chinese).join('；'),
          }).catch(() => {});
        }
      } else {
        const newWord = lookupToWord(lookupResult, cleaned);
        // 不吞错：词写库失败必须 throw 到外层 catch 提示，否则下面会把不存在的 wordId 塞进单词本 → 悬空引用
=======
      } else {
        const newWord = lookupToWord(lookupResult);
>>>>>>> recovery-branch
        await db.words.add(newWord);
        wordId = newWord.id;
      }
      if (!book.wordIds.includes(wordId)) {
        await db.wordBooks.update(bookId, {
          wordIds: [...book.wordIds, wordId],
          updatedAt: Date.now(),
        });
      }
      onDone();
      onClose();
    } catch {
<<<<<<< HEAD
      setLookupError(t('addbook.errSave', lang));
=======
      setLookupError('保存失败，请重试');
>>>>>>> recovery-branch
    } finally {
      setManualSaving(false);
    }
  };

<<<<<<< HEAD
  const updateMeaning = (i: number, patch: Partial<MeaningRow>) => {
    setEditedMeanings((prev) => prev.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));
  };
  const removeMeaning = (i: number) => {
    setEditedMeanings((prev) => prev.filter((_, idx) => idx !== i));
  };
  const addMeaning = () => {
    setEditedMeanings((prev) => [...prev, { chinese: '', partOfSpeech: lookupResult?.partOfSpeech || '' }]);
  };

  const generateMeaningExamples = async (i: number) => {
    if (!lookupResult) return;
    const m = editedMeanings[i];
    if (!m || !m.chinese.trim()) return;
    setEditedMeanings((prev) => prev.map((row, idx) => (idx === i ? { ...row, exState: 'loading' } : row)));
    try {
      const res = await fetch('/api/ai/meaning-examples', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: lookupResult.korean,
          baseForm: (lookupResult as { baseForm?: string }).baseForm || lookupResult.korean,
          meaningChinese: m.chinese.trim(),
          meaningPartOfSpeech: m.partOfSpeech || '',
          allMeanings: editedMeanings.map((r) => r.chinese.trim()).filter((s) => s.length > 0),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEditedMeanings((prev) => prev.map((row, idx) => (idx === i ? { ...row, exState: 'error' } : row)));
        return;
      }
      const list = Array.isArray(data.examples) ? data.examples : [];
      if (list.length === 0) {
        setEditedMeanings((prev) => prev.map((row, idx) => (idx === i ? { ...row, exState: 'empty', examples: [], exReason: data.reason } : row)));
        return;
      }
      const examples = list.map((ex: { korean: string; chinese: string }) => ({
        text: ex.korean,
        translation: ex.chinese,
        source: 'manual' as const,
      }));
      setEditedMeanings((prev) => prev.map((row, idx) => (idx === i ? { ...row, exState: 'done', examples } : row)));
    } catch {
      setEditedMeanings((prev) => prev.map((row, idx) => (idx === i ? { ...row, exState: 'error' } : row)));
    }
  };

=======
>>>>>>> recovery-branch
  const handleSave = async () => {
    try {
    if (mode === 'select-books' && preSelectedWordIds) {
      for (const bid of selectedBookIds) {
        const book = await db.wordBooks.get(bid);
        if (book) {
          const existing = new Set(book.wordIds);
          for (const wid of preSelectedWordIds) {
            if (!existing.has(wid)) book.wordIds.push(wid);
          }
          await db.wordBooks.update(bid, { wordIds: book.wordIds, updatedAt: Date.now() });
        }
      }
    } else if (mode === 'select-words' && bookId) {
      const book = await db.wordBooks.get(bookId);
      if (!book) return;
      const existing = new Set(book.wordIds);
      const newWordIds: string[] = [];
      for (const id of selectedIds) {
        const saved = savedWords.find((w) => w.id === id);
        if (saved) {
          if (!existing.has(saved.id)) newWordIds.push(saved.id);
          continue;
        }
        const entry = selectedEntriesRef.current.get(id);
        if (entry) {
          const existingWord = await db.words.where('word').equals(entry.korean).first();
          if (existingWord) {
<<<<<<< HEAD
            // 合并词库 entry 的多义到已存词条
            const incoming: MeaningRow[] = entry.meanings.map((m) => ({ chinese: m.chinese, partOfSpeech: entry.partOfSpeech }));
            const merged = mergeMeanings(existingWord, incoming);
            const mergedDiffers = merged.length !== (existingWord.meanings?.length ?? 0)
              || merged.some((m, i) => existingWord.meanings?.[i]?.chinese !== m.chinese);
            if (mergedDiffers) {
              await db.words.update(existingWord.id, {
                meanings: merged,
                meaning: merged.map((m) => m.chinese).join('；'),
              }).catch(() => {});
            }
=======
>>>>>>> recovery-branch
            if (!existing.has(existingWord.id)) newWordIds.push(existingWord.id);
          } else {
            const newWord = entryToWord(entry);
            await db.words.add(newWord);
            newWordIds.push(newWord.id);
          }
        }
      }
      for (const wid of newWordIds) {
        if (!existing.has(wid)) book.wordIds.push(wid);
      }
      await db.wordBooks.update(bookId, { wordIds: book.wordIds, updatedAt: Date.now() });
    }
    onDone();
    onClose();
    } catch { /* ignore */ }
  };

  const toggleBook = (id: string) => {
    setSelectedBookIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleItem = (id: string, entry?: WordEntry) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        selectedEntriesRef.current.delete(id);
      } else {
        next.add(id);
        if (entry) selectedEntriesRef.current.set(id, entry);
      }
      return next;
    });
  };

  const filteredBooks = search ? books.filter((b) => b.name.includes(search)) : books;
<<<<<<< HEAD

  // Portal 到 body：否则挂在带 `容器 > * {position:relative}` 规则的页面里 fixed 会被击穿成 relative
  // → 弹窗内联文档流、滚不动、按钮点不到（同 GoalWheelPicker 事故）
  if (typeof window === 'undefined') return null;

  return createPortal(
=======

  return (
>>>>>>> recovery-branch
    <div className="fixed inset-x-0 bottom-0 top-0 z-[100] flex items-end sm:items-center justify-center"
      style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div
        className="relative bg-[var(--bg-card)] rounded-t-3xl sm:rounded-2xl border border-[var(--border-color)] shadow-xl w-full sm:max-w-md flex flex-col animate-slide-up-drawer"
<<<<<<< HEAD
        style={{ maxHeight: 'calc(var(--vh-100) - 56px - env(safe-area-inset-bottom, 0px))', pointerEvents: 'auto', touchAction: 'pan-y' }}
=======
        style={{ maxHeight: 'calc(100dvh - 56px - env(safe-area-inset-bottom, 0px))', pointerEvents: 'auto', touchAction: 'pan-y' }}
>>>>>>> recovery-branch
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            {mode === 'select-books' ? t('addbook.titleBooks', lang) : t('addbook.titleWords', lang)}
          </h2>
          <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={20} />
          </button>
        </div>

        {/* Tab switcher (only for select-words mode) */}
        {mode === 'select-words' && (
          <div className="px-5 pb-3 shrink-0">
            <div className="flex gap-1 bg-[var(--bg-input)] rounded-xl p-1">
              <button
                onClick={() => setInputTab('search')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  inputTab === 'search'
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-muted)]'
                }`}
              >
<<<<<<< HEAD
                {t('addbook.tabSearch', lang)}
=======
                搜索词库
>>>>>>> recovery-branch
              </button>
              <button
                onClick={() => setInputTab('manual')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  inputTab === 'manual'
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-muted)]'
                }`}
              >
<<<<<<< HEAD
                {t('addbook.tabManual', lang)}
=======
                手动输入
>>>>>>> recovery-branch
              </button>
            </div>
          </div>
        )}

        {/* Manual input tab */}
        {mode === 'select-words' && inputTab === 'manual' ? (
          <div
            className="flex-1 min-h-0 overflow-y-auto px-5 pb-4 space-y-4"
            style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
          >
            <div>
<<<<<<< HEAD
              <p className="text-xs text-[var(--text-muted)] mb-2">{t('addbook.manualHint', lang)}</p>
=======
              <p className="text-xs text-[var(--text-muted)] mb-2">输入韩文或中文，AI 自动补全翻译和发音</p>
>>>>>>> recovery-branch
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualInput}
<<<<<<< HEAD
                  onChange={(e) => { setManualInput(e.target.value); setLookupResult(null); setEditedMeanings([]); setLookupError(''); setAlreadyInBook(false); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                  placeholder={t('addbook.inputPlaceholder', lang)}
=======
                  onChange={(e) => { setManualInput(e.target.value); setLookupResult(null); setLookupError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                  placeholder="如：안녕하세요 或 你好"
>>>>>>> recovery-branch
                  className="flex-1 bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-2.5 px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
                />
                <button
                  onClick={handleLookup}
                  disabled={!manualInput.trim() || lookupLoading}
                  className="px-4 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white text-sm font-medium disabled:opacity-40 transition-opacity shrink-0"
                >
<<<<<<< HEAD
                  {lookupLoading ? <Loader2 size={16} className="animate-spin" /> : t('addbook.lookup', lang)}
=======
                  {lookupLoading ? <Loader2 size={16} className="animate-spin" /> : '查询'}
>>>>>>> recovery-branch
                </button>
              </div>
            </div>

            {/* Error */}
            {lookupError && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100">
                <AlertCircle size={15} className="text-red-400 shrink-0" />
                <p className="text-xs text-red-500">{lookupError}</p>
              </div>
            )}

            {/* Loading skeleton */}
            {lookupLoading && (
              <div className="bg-[var(--bg-input)] rounded-2xl p-4 space-y-2 animate-pulse">
                <div className="h-6 w-24 bg-[var(--border-color)] rounded" />
                <div className="h-4 w-32 bg-[var(--border-color)] rounded" />
                <div className="h-4 w-full bg-[var(--border-color)] rounded" />
                <div className="h-4 w-3/4 bg-[var(--border-color)] rounded" />
              </div>
            )}

            {/* Result preview */}
            {lookupResult && !lookupLoading && (
              <div className="bg-[var(--bg-input)] rounded-2xl p-4 space-y-3">
<<<<<<< HEAD
                {/* 已在此词书里提示 */}
                {alreadyInBook && (
                  <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
                    <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-600 leading-relaxed">
                      {t('addbook.alreadyInBook', lang, { word: lookupResult.korean })}
                    </p>
                  </div>
                )}
=======
>>>>>>> recovery-branch
                {/* Word header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[var(--text-primary)]">{lookupResult.korean}</span>
                      <button
<<<<<<< HEAD
                        onClick={() => speakWord(lookupResult.korean)}
=======
                        onClick={() => speakWord(lookupResult.korean, 0.85)}
>>>>>>> recovery-branch
                        className="p-1.5 rounded-lg bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors"
                      >
                        <Volume2 size={15} />
                      </button>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{lookupResult.romanization}</p>
                  </div>
<<<<<<< HEAD
                </div>

                {/* Meanings (editable list) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[var(--text-muted)]">{t('addbook.meaningsLabel', lang)}</p>
                    <span className="text-[10px] text-[var(--text-muted)]">{t('addbook.meaningsCount', lang, { n: editedMeanings.length })}</span>
                  </div>
                  {editedMeanings.map((m, i) => (
                    <div key={i} className="bg-[var(--bg-card)] rounded-xl px-2 py-1.5 border border-[var(--border-color)]">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)] w-4 shrink-0 text-center">{i + 1}.</span>
                        <input
                          type="text"
                          value={m.chinese}
                          onChange={(e) => updateMeaning(i, { chinese: e.target.value, examples: undefined, exState: 'idle' })}
                          placeholder={t('addbook.meaningPlaceholder', lang)}
                          className="flex-1 min-w-0 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
                        />
                        <input
                          type="text"
                          value={m.partOfSpeech ?? ''}
                          onChange={(e) => updateMeaning(i, { partOfSpeech: e.target.value })}
                          placeholder={t('addbook.posPlaceholder', lang)}
                          className="w-14 bg-transparent text-xs text-[var(--text-secondary)] placeholder:text-[var(--text-muted)] focus:outline-none text-right shrink-0"
                        />
                        <button
                          onClick={() => generateMeaningExamples(i)}
                          disabled={!m.chinese.trim() || m.exState === 'loading'}
                          className="p-1 text-[var(--text-muted)] hover:text-[var(--pink-primary)] shrink-0 disabled:opacity-30"
                          aria-label={t('addbook.genExample', lang)}
                          title={t('addbook.genExampleForMeaning', lang)}
                        >
                          {m.exState === 'loading' ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                        </button>
                        <button
                          onClick={() => removeMeaning(i)}
                          className="p-1 text-[var(--text-muted)] hover:text-red-500 shrink-0"
                          aria-label={t('addbook.removeMeaning', lang)}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      {m.exState === 'done' && m.examples && m.examples.length > 0 && (
                        <div className="mt-2 ml-6 space-y-1.5">
                          {m.examples.map((ex, j) => (
                            <div key={j} className="text-xs">
                              <HighlightedExample text={ex.text} word={lookupResult.korean} className="text-[var(--text-primary)]" />
                              <p className="text-[var(--text-muted)] mt-0.5">{ex.translation}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {m.exState === 'empty' && (
                        <p className="mt-1 ml-6 text-[11px] text-[var(--text-muted)] italic">{t('addbook.exEmpty', lang)}</p>
                      )}
                      {m.exState === 'error' && (
                        <p className="mt-1 ml-6 text-[11px] text-red-400">{t('addbook.exError', lang)}</p>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addMeaning}
                    className="w-full flex items-center justify-center gap-1 py-1.5 rounded-xl border border-dashed border-[var(--border-color)] text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:border-[var(--pink-primary)]/50 transition-colors"
                  >
                    <Plus size={12} /> {t('addbook.addMeaning', lang)}
                  </button>
                </div>
=======
                  <span className="text-xs px-2 py-1 rounded-full bg-[var(--bg-card)] text-[var(--text-secondary)] shrink-0 border border-[var(--border-color)]">
                    {lookupResult.partOfSpeech}
                  </span>
                </div>

                {/* Meaning */}
                <p className="text-sm font-medium text-[var(--text-primary)]">{lookupResult.meaning}</p>
>>>>>>> recovery-branch

                {/* Examples */}
                {lookupResult.examples.length > 0 && (
                  <div className="space-y-2">
<<<<<<< HEAD
                    <p className="text-xs text-[var(--text-muted)]">{t('addbook.examples', lang)}</p>
=======
                    <p className="text-xs text-[var(--text-muted)]">例句</p>
>>>>>>> recovery-branch
                    {lookupResult.examples.map((ex, i) => (
                      <div key={i} className="bg-[var(--bg-card)] rounded-xl px-3 py-2 flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <HighlightedExample text={ex.korean} word={lookupResult.korean} className="text-sm text-[var(--text-primary)]" />
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.chinese}</p>
                        </div>
                        <button
<<<<<<< HEAD
                          onClick={() => speakWord(ex.korean)}
=======
                          onClick={() => speakWord(ex.korean, 0.85)}
>>>>>>> recovery-branch
                          className="p-1 text-[var(--text-muted)] hover:text-[var(--pink-primary)] shrink-0"
                        >
                          <Volume2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Confirm button */}
                <button
                  onClick={handleManualSave}
<<<<<<< HEAD
                  disabled={manualSaving || alreadyInBook || editedMeanings.filter((m) => m.chinese.trim()).length === 0}
                  className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-[var(--pink-primary)] hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center justify-center gap-1.5"
                >
                  {manualSaving ? <Loader2 size={15} className="animate-spin" /> : alreadyInBook ? <Check size={15} /> : <Plus size={15} />}
                  {manualSaving ? t('addbook.adding', lang) : alreadyInBook ? t('addbook.alreadyInThisBook', lang) : t('addbook.addThisWord', lang)}
=======
                  disabled={manualSaving}
                  className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-[var(--pink-primary)] hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center justify-center gap-1.5"
                >
                  {manualSaving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
                  {manualSaving ? '添加中...' : '添加这个单词'}
>>>>>>> recovery-branch
                </button>
              </div>
            )}

            {/* Empty hint */}
            {!lookupResult && !lookupLoading && !lookupError && (
              <div className="text-center py-8 space-y-1">
<<<<<<< HEAD
                <p className="text-sm text-[var(--text-muted)]">{t('addbook.supportBoth', lang)}</p>
                <p className="text-xs text-[var(--text-muted)]">{t('addbook.example', lang)}</p>
=======
                <p className="text-sm text-[var(--text-muted)]">支持韩文和中文输入</p>
                <p className="text-xs text-[var(--text-muted)]">例：학교 / 학교 / 学校</p>
>>>>>>> recovery-branch
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Search bar */}
            <div className="px-5 pb-3 shrink-0">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
<<<<<<< HEAD
                  placeholder={mode === 'select-books' ? t('addbook.searchBooks', lang) : t('addbook.searchWords', lang)}
=======
                  placeholder={mode === 'select-books' ? '搜索单词本...' : '搜索单词（支持韩文/中文）...'}
>>>>>>> recovery-branch
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
                />
              </div>
              {mode === 'select-words' && !search && (
<<<<<<< HEAD
                <p className="text-xs text-[var(--text-muted)] mt-1.5 px-1">{t('addbook.searchHint', lang)}</p>
=======
                <p className="text-xs text-[var(--text-muted)] mt-1.5 px-1">搜索可从全部词库中选词</p>
>>>>>>> recovery-branch
              )}
            </div>

            {/* List */}
            <div
              className="flex-1 min-h-0 overflow-y-auto px-5 pb-4"
              style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
            >
              {loading ? (
<<<<<<< HEAD
                <div className="text-center py-8 text-[var(--text-muted)] text-sm">{t('addbook.loading', lang)}</div>
              ) : mode === 'select-books' ? (
                filteredBooks.length === 0 ? (
                  <div className="text-center py-8 text-[var(--text-muted)] text-sm">
                    {books.length === 0 ? t('addbook.noBooks', lang) : t('addbook.noMatchBooks', lang)}
=======
                <div className="text-center py-8 text-[var(--text-muted)] text-sm">加载中...</div>
              ) : mode === 'select-books' ? (
                filteredBooks.length === 0 ? (
                  <div className="text-center py-8 text-[var(--text-muted)] text-sm">
                    {books.length === 0 ? '还没有创建单词本，请先创建' : '没有匹配的单词本'}
>>>>>>> recovery-branch
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredBooks.map((book) => (
                      <button
                        key={book.id}
                        onClick={() => toggleBook(book.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                          selectedBookIds.has(book.id)
                            ? 'bg-[var(--pink-primary)]/10 border border-[var(--pink-primary)]/30'
                            : 'hover:bg-[var(--bg-card-hover)] border border-transparent'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                          selectedBookIds.has(book.id) ? 'bg-[var(--pink-primary)] text-white' : 'border-2 border-[var(--border-color)]'
                        }`}>
                          {selectedBookIds.has(book.id) && <Check size={12} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[var(--text-primary)] truncate">{book.name}</div>
<<<<<<< HEAD
                          <div className="text-xs text-[var(--text-muted)]">{t('addbook.wordCount', lang, { n: book.wordIds.length })}</div>
=======
                          <div className="text-xs text-[var(--text-muted)]">{book.wordIds.length} 个单词</div>
>>>>>>> recovery-branch
                        </div>
                      </button>
                    ))}
                  </div>
                )
              ) : results.length === 0 ? (
                <div className="text-center py-8 text-[var(--text-muted)] text-sm">
<<<<<<< HEAD
                  {search ? t('addbook.noMatchWords', lang) : t('addbook.noWordsToAdd', lang)}
=======
                  {search ? '没有找到匹配的单词' : '没有可添加的单词，试试搜索'}
>>>>>>> recovery-branch
                </div>
              ) : (
                <div className="space-y-1">
                  {results.map((item) => {
                    const id = item.kind === 'saved' ? item.word.id : item.entry.id;
                    const korean = item.kind === 'saved' ? item.word.word : item.entry.korean;
                    const pronunciation = item.kind === 'saved' ? item.word.pronunciation : item.entry.romanization;
                    const meaning = item.kind === 'saved'
<<<<<<< HEAD
                      ? (item.word.meanings?.length ? item.word.meanings.map((m) => m.chinese).join('；') : item.word.meaning)
                      : item.entry.meanings.map((m) => m.chinese).join('；');
=======
                      ? item.word.meaning
                      : item.entry.meanings[0]?.chinese ?? '';
>>>>>>> recovery-branch
                    const isSelected = selectedIds.has(id);
                    return (
                      <button
                        key={id}
                        onClick={() => toggleItem(id, item.kind === 'entry' ? item.entry : undefined)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                          isSelected
                            ? 'bg-[var(--pink-primary)]/10 border border-[var(--pink-primary)]/30'
                            : 'hover:bg-[var(--bg-card-hover)] border border-transparent'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                          isSelected ? 'bg-[var(--pink-primary)] text-white' : 'border-2 border-[var(--border-color)]'
                        }`}>
                          {isSelected && <Check size={12} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[var(--text-primary)]">{korean}</span>
                            <span className="text-xs text-[var(--text-muted)]">{pronunciation}</span>
                            {item.kind === 'entry' && (
<<<<<<< HEAD
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--mint-soft)]/20 text-[var(--mint-soft)] shrink-0">{t('addbook.libraryBadge', lang)}</span>
=======
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--mint-soft)]/20 text-[var(--mint-soft)] shrink-0">词库</span>
>>>>>>> recovery-branch
                            )}
                          </div>
                          <div className="text-xs text-[var(--text-secondary)] truncate">{meaning}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-[var(--border-color)] shrink-0">
              <button
                onClick={handleSave}
                disabled={
                  (mode === 'select-books' && selectedBookIds.size === 0) ||
                  (mode === 'select-words' && selectedIds.size === 0)
                }
                className="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-[var(--pink-primary)] hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center justify-center gap-1.5"
              >
                <Plus size={16} />
                {mode === 'select-books'
<<<<<<< HEAD
                  ? t('addbook.addToBooks', lang, { n: selectedBookIds.size })
                  : t('addbook.addWords', lang, { n: selectedIds.size })}
=======
                  ? `添加到 ${selectedBookIds.size} 个单词本`
                  : `添加 ${selectedIds.size} 个单词`}
>>>>>>> recovery-branch
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
