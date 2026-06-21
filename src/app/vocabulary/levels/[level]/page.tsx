'use client';

import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, BookOpen, Target, Volume2, ChevronDown, ChevronUp,
  Loader2, BarChart3, BookmarkPlus, Layers, Check, Trash2, CheckSquare, Square, ListChecks, CheckCircle,
} from 'lucide-react';
import { db } from '@/lib/db';
import { getLevel, getLevelWords } from '@/data/vocabulary';
import type { WordEntry, LevelWordList } from '@/types';
import { speak } from '@/lib/tts';
import { useAuth } from '@/components/AuthProvider';
import { TappableText } from '@/components/TappableText';

const PAGE_SIZE = 50;
import { AddToBookSheet } from '@/components/vocabulary/AddToBookSheet';

const levelNames: Record<number, string> = {
  1: '1级 · 入门', 2: '2级 · 基础', 3: '3级 · 进阶',
  4: '4级 · 中级', 5: '5级 · 高级', 6: '6级 · 精通',
};

export default function LevelDetailPage() {
  const { level: levelStr } = useParams<{ level: string }>();
  const router = useRouter();
  const level = parseInt(levelStr);

  const [lvl, setLvl] = useState<LevelWordList | null>(null);
  const [words, setWords] = useState<WordEntry[]>([]);
  const [masteredSet, setMasteredSet] = useState<Set<string>>(new Set());
  const [learningSet, setLearningSet] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [partFilter, setPartFilter] = useState<string>('全部');
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const firstUntouchedRef = useRef<HTMLDivElement>(null);
  const { user, loading: authLoading } = useAuth();
  const [sheetWord, setSheetWord] = useState<WordEntry | null>(null);
  const [addingAll, setAddingAll] = useState(false);
  const [addedAll, setAddedAll] = useState(false);
  const [addAllBook, setAddAllBook] = useState(false);
  const [masteringAll, setMasteringAll] = useState(false);
  const [masteredAll, setMasteredAll] = useState(false);
  const [managing, setManaging] = useState(false);
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [deletePending, setDeletePending] = useState(false);
  const [masterPending, setMasterPending] = useState(false);
  const [savedSentenceIds, setSavedSentenceIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (managing) document.body.setAttribute('data-batch-managing', '1');
    else document.body.removeAttribute('data-batch-managing');
    return () => document.body.removeAttribute('data-batch-managing');
  }, [managing]);

  // Swipe state: entryId → current translateX offset
  const swipeOffsets = useRef<Map<string, number>>(new Map());
  const swipeStart = useRef<{ id: string; x: number; y: number } | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const setSwipeOffset = useCallback((id: string, offset: number) => {
    swipeOffsets.current.set(id, offset);
    const el = cardRefs.current.get(id);
    if (el) el.style.transform = `translateX(${offset}px)`;
  }, []);

  const closeAllSwipes = useCallback((exceptId?: string) => {
    for (const [id] of swipeOffsets.current) {
      if (id !== exceptId) setSwipeOffset(id, 0);
    }
  }, [setSwipeOffset]);

  const handleTouchStart = useCallback((e: React.TouchEvent, id: string) => {
    swipeStart.current = { id, x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent, id: string) => {
    if (!swipeStart.current || swipeStart.current.id !== id) return;
    const dx = e.touches[0].clientX - swipeStart.current.x;
    const dy = e.touches[0].clientY - swipeStart.current.y;
    if (Math.abs(dy) > Math.abs(dx)) return; // vertical scroll, ignore
    const base = swipeOffsets.current.get(id) ?? 0;
    const raw = Math.min(0, Math.max(-140, base + dx));
    const el = cardRefs.current.get(id);
    if (el) el.style.transform = `translateX(${raw}px)`;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent, id: string) => {
    if (!swipeStart.current || swipeStart.current.id !== id) return;
    const dx = e.changedTouches[0].clientX - swipeStart.current.x;
    swipeStart.current = null;
    if (dx < -60) {
      closeAllSwipes(id);
      setSwipeOffset(id, -140);
    } else {
      setSwipeOffset(id, 0);
    }
  }, [closeAllSwipes, setSwipeOffset]);

  useEffect(() => {
    if (isNaN(level) || level < 1 || level > 6) { router.replace('/vocabulary/levels'); return; }
    const l = getLevel(level);
    if (!l) { router.replace('/vocabulary/levels'); return; }
    setLvl(l);
    const w = getLevelWords(level);
    setWords(w);

    (async () => {
      try {
        const koreanWords = new Set(w.map((e) => e.korean));
        const allUserWords = await db.words.toArray();
        const userWords = allUserWords.filter((uw) => koreanWords.has(uw.word));
        const mSet = new Set(userWords.filter((uw) => uw.mastery === 'mastered').map((uw) => uw.word));
        const lSet = new Set(userWords.filter((uw) => uw.mastery !== 'mastered' && uw.mastery !== 'new').map((uw) => uw.word));
        setMasteredSet(mSet);
        setLearningSet(lSet);
      } catch {
        // db error — show words without mastery state
      } finally {
        setLoading(false);
      }
    })();
  }, [level, router]);

  // Part of speech filter options
  const saveSentence = async (korean: string, chinese: string, sourceTitle: string) => {
    if (savedSentenceIds.has(korean)) return;
    const existing = await db.sentences.where('korean').equals(korean).first().catch(() => null);
    if (!existing) {
      await db.sentences.add({ id: crypto.randomUUID(), korean, chinese, source_type: 'vocabulary', source_id: 'level-' + level, source_title: sourceTitle, created_at: new Date().toISOString() }).catch(() => {});
    }
    setSavedSentenceIds((prev) => new Set(prev).add(korean));
  };

  const partOptions = useMemo(() => {
    const parts = new Set(words.map((w) => w.partOfSpeech));
    return ['全部', ...Array.from(parts)];
  }, [words]);

  const filteredWords = useMemo(() => {
    if (partFilter === '全部') return words;
    return words.filter((w) => w.partOfSpeech === partFilter);
  }, [words, partFilter]);

  useEffect(() => {
    setAddedAll(false);
    setDisplayCount(PAGE_SIZE);
    setSelectedWords(new Set());
  }, [words, partFilter]);

  const visibleWords = filteredWords.slice(0, displayCount);

  const firstUntouchedIdx = filteredWords.findIndex(e => !masteredSet.has(e.korean) && !learningSet.has(e.korean));

  const scrollPendingRef = useRef(false);

  const scrollToFirstUntouched = useCallback(() => {
    if (firstUntouchedIdx === -1) return;
    if (firstUntouchedIdx >= displayCount) {
      scrollPendingRef.current = true;
      setDisplayCount(firstUntouchedIdx + 1);
    } else {
      firstUntouchedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [firstUntouchedIdx, displayCount]);

  useEffect(() => {
    if (scrollPendingRef.current && firstUntouchedRef.current) {
      scrollPendingRef.current = false;
      firstUntouchedRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  const filteredLengthRef = useRef(filteredWords.length);
  filteredLengthRef.current = filteredWords.length;

  const loadMore = useCallback(() => {
    if (filteredLengthRef.current <= 0) return;
    setDisplayCount(c => {
      if (c >= filteredLengthRef.current) return c;
      return Math.min(c + PAGE_SIZE, filteredLengthRef.current);
    });
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMore();
    }, { threshold: 0.1 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, loading]);

  const handleMasterAll = async () => {
    if (masteringAll) return;
    setMasteringAll(true);
    const now = Date.now();
    try {
      const newSet = new Set(masteredSet);
      for (const entry of filteredWords) {
        if (masteredSet.has(entry.korean)) continue;
        const existing = await db.words.where('word').equals(entry.korean).first();
        if (existing) {
          await db.words.update(existing.id, { mastery: 'mastered', srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now });
        } else {
          await db.words.put({
            id: crypto.randomUUID(),
            word: entry.korean,
            pronunciation: entry.romanization,
            meaning: entry.meanings[0]?.chinese || '',
            partOfSpeech: entry.partOfSpeech,
            examples: entry.examples.map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })),
            sourceEntryId: entry.id,
            mastery: 'mastered',
            srsLevel: 5,
            easeFactor: 2.5,
            interval: 21,
            nextReview: now + 21 * 86400000,
            createdAt: now,
            lastReviewed: now,
            source: 'library',
          });
        }
        newSet.add(entry.korean);
      }
      setMasteredSet(newSet);
      setLearningSet(prev => { const s = new Set(prev); filteredWords.forEach(e => s.delete(e.korean)); return s; });
      setMasteredAll(true);
      setTimeout(() => setMasteredAll(false), 3000);
    } finally {
      setMasteringAll(false);
    }
  };

  const handleAddAllToBook = async (bookId: string) => {
    if (addingAll) return;
    setAddingAll(true);
    try {
      const [book, allUserWords] = await Promise.all([
        db.wordBooks.get(bookId),
        db.words.toArray(),
      ]);
      if (!book) return;
      const now = Date.now();
      const userWordMap = new Map(allUserWords.map(w => [w.word, w]));
      const existingBookIdSet = new Set(book.wordIds);
      const toInsert: any[] = [];
      const newWordIds: string[] = [];
      for (const entry of filteredWords) {
        const existing = userWordMap.get(entry.korean);
        if (!existing) {
          const wordId = crypto.randomUUID();
          toInsert.push({
            id: wordId, word: entry.korean, pronunciation: entry.romanization,
            meaning: entry.meanings[0]?.chinese || '', partOfSpeech: entry.partOfSpeech,
            examples: entry.examples.map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })),
            sourceEntryId: entry.id, mastery: 'new', srsLevel: 0, easeFactor: 2.5, interval: 0,
            nextReview: now, createdAt: now, lastReviewed: null, source: 'library',
          });
          newWordIds.push(wordId);
        } else if (!existingBookIdSet.has(existing.id)) {
          newWordIds.push(existing.id);
        }
      }
      await Promise.all([
        toInsert.length > 0 ? db.words.bulkPut(toInsert) : Promise.resolve(),
        newWordIds.length > 0 ? db.wordBooks.update(bookId, { wordIds: [...book.wordIds, ...newWordIds], updatedAt: now }) : Promise.resolve(),
      ]);
      setAddedAll(true);
      setTimeout(() => setAddedAll(false), 3000);
    } finally {
      setAddingAll(false);
      setAddAllBook(false);
    }
  };

  const toggleMastered = async (entry: WordEntry) => {
    const now = Date.now();
    if (masteredSet.has(entry.korean)) {
      const existing = await db.words.where('word').equals(entry.korean).first();
      if (existing) {
        await db.words.update(existing.id, { mastery: 'learning', srsLevel: 1, interval: 1, nextReview: now });
      }
      setMasteredSet(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
      setLearningSet(prev => new Set(prev).add(entry.korean));
    } else {
      const existing = await db.words.where('word').equals(entry.korean).first();
      if (existing) {
        await db.words.update(existing.id, { mastery: 'mastered', srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now });
      } else {
        await db.words.put({
          id: crypto.randomUUID(),
          word: entry.korean,
          pronunciation: entry.romanization,
          meaning: entry.meanings[0]?.chinese || '',
          partOfSpeech: entry.partOfSpeech,
          examples: entry.examples.map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })),
          sourceEntryId: entry.id,
          mastery: 'mastered',
          srsLevel: 5,
          easeFactor: 2.5,
          interval: 21,
          nextReview: now + 21 * 86400000,
          createdAt: now,
          lastReviewed: now,
          source: 'library',
        });
      }
      setMasteredSet(prev => new Set(prev).add(entry.korean));
      setLearningSet(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
    }
  };

  const unmasteredFiltered = filteredWords.filter(e => !masteredSet.has(e.korean));
  const allSelected = unmasteredFiltered.length > 0 && unmasteredFiltered.every(e => selectedWords.has(e.korean));

  const toggleSelect = (korean: string) => {
    setSelectedWords(prev => { const s = new Set(prev); s.has(korean) ? s.delete(korean) : s.add(korean); return s; });
  };

  const toggleSelectAll = () => {
    if (allSelected) setSelectedWords(new Set());
    else setSelectedWords(new Set(unmasteredFiltered.map(e => e.korean)));
  };

  const exitManage = () => { setManaging(false); setSelectedWords(new Set()); setDeletePending(false); setMasterPending(false); };

  const batchMaster = async () => {
    const now = Date.now();
    const selected = words.filter(e => selectedWords.has(e.korean));
    // One fetch for all user words, then one bulk write — 2 HTTP requests total
    const allUserWords = await db.words.toArray();
    const userWordMap = new Map(allUserWords.map(w => [w.word, w]));
    const toUpdate: { id: string; mastery: string; srsLevel: number; interval: number; nextReview: number; lastReviewed: number }[] = [];
    const toInsert: any[] = [];
    for (const entry of selected) {
      const existing = userWordMap.get(entry.korean);
      if (existing) {
        toUpdate.push({ id: existing.id, mastery: 'mastered', srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now });
      } else {
        toInsert.push({
          id: crypto.randomUUID(), word: entry.korean, pronunciation: entry.romanization,
          meaning: entry.meanings[0]?.chinese || '', partOfSpeech: entry.partOfSpeech,
          examples: entry.examples.map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })),
          sourceEntryId: entry.id, mastery: 'mastered', srsLevel: 5, easeFactor: 2.5, interval: 21,
          nextReview: now + 21 * 86400000, createdAt: now, lastReviewed: now, source: 'library',
        });
      }
    }
    await Promise.all([
      toUpdate.length > 0 ? db.words.bulkUpdate(toUpdate) : Promise.resolve(),
      toInsert.length > 0 ? db.words.bulkPut(toInsert) : Promise.resolve(),
    ]);
    setMasteredSet(prev => { const s = new Set(prev); selectedWords.forEach(w => s.add(w)); return s; });
    setLearningSet(prev => { const s = new Set(prev); selectedWords.forEach(w => s.delete(w)); return s; });
    exitManage();
  };

  const batchDelete = async () => {
    const allUserWords = await db.words.toArray();
    const ids = allUserWords.filter(w => selectedWords.has(w.word)).map(w => w.id);
    await db.words.bulkDelete(ids);
    setMasteredSet(prev => { const s = new Set(prev); selectedWords.forEach(w => s.delete(w)); return s; });
    setLearningSet(prev => { const s = new Set(prev); selectedWords.forEach(w => s.delete(w)); return s; });
    exitManage();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!lvl) return null;

  const total = words.length;
  const mastered = Array.from(masteredSet).filter((w) => words.some((e) => e.korean === w)).length;
  const learning = Array.from(learningSet).filter((w) => words.some((e) => e.korean === w)).length;
  const untouched = total - mastered - learning;

  return (
    <div className="py-4 space-y-5 pb-8">
      {/* Header */}
      <div>
        <Link href="/vocabulary/library?tab=levels" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} />
          返回分级词表
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-[var(--pink-primary)]">{level}级</span>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">{levelNames[level]}</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              TOPIK {level <= 2 ? 'I' : 'II'} · 核心词汇 {lvl.totalCount.toLocaleString()} 词
            </p>
          </div>
        </div>
      </div>

      {/* Flashcard entry */}
      <Link
        href={`/vocabulary/levels/${level}/flashcards`}
        className="flex items-center gap-3 p-4 rounded-xl border transition-colors"
        style={{ background: 'rgba(255,127,168,0.05)', borderColor: 'rgba(255,127,168,0.25)' }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,127,168,0.12)' }}>
          <Layers size={18} style={{ color: '#ff7fa8' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold" style={{ color: '#241917' }}>闪卡学习</p>
          <p className="text-xs mt-0.5" style={{ color: '#89756e' }}>翻卡记词，未接触优先 · 可标记已掌握</p>
        </div>
        <ChevronDown size={16} style={{ color: '#89756e', transform: 'rotate(-90deg)' }} />
      </Link>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center">
          <BookOpen size={16} className="text-[var(--pink-primary)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--text-primary)]">{total}</p>
          <p className="text-xs text-[var(--text-muted)]">本级别词</p>
        </div>
        <Link href={`/vocabulary/levels/${level}/mastered`} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center hover:border-[var(--mint-soft)] transition-colors">
          <Target size={16} className="text-[var(--mint-soft)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--mint-soft)]">{mastered}</p>
          <p className="text-xs text-[var(--text-muted)]">已掌握</p>
        </Link>
        <button onClick={scrollToFirstUntouched} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center hover:border-[var(--peach-soft)] transition-colors w-full">
          <BarChart3 size={16} className="text-[var(--peach-soft)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--peach-soft)]">{untouched}</p>
          <p className="text-xs text-[var(--text-muted)]">未接触</p>
        </button>
      </div>

      {/* Three-color progress bar */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-xs text-[var(--text-muted)]">
          <span>级别进度</span>
          <span>{total > 0 ? Math.round(((mastered + learning) / total) * 100) : 0}%</span>
        </div>
        <div className="w-full bg-[var(--bg-input)] rounded-full h-2.5 flex overflow-hidden">
          <div
            className="h-full rounded-l-full transition-all"
            style={{ width: `${total > 0 ? (mastered / total) * 100 : 0}%`, backgroundColor: 'var(--mint-soft)' }}
          />
          <div
            className="h-full transition-all"
            style={{ width: `${total > 0 ? (learning / total) * 100 : 0}%`, backgroundColor: 'var(--peach-soft)' }}
          />
          <div className="h-full rounded-r-full flex-1" style={{ backgroundColor: 'var(--border-color)' }} />
        </div>
        <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--mint-soft)' }} /> 掌握 {mastered}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--peach-soft)' }} /> 学习 {learning}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--border-color)' }} /> 未接触 {untouched}
          </span>
        </div>
      </div>

      {/* Part of speech filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {partOptions.map((part) => (
          <button
            key={part}
            onClick={() => setPartFilter(part)}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full transition-colors ${
              partFilter === part
                ? 'bg-[var(--pink-primary)] text-white'
                : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30'
            }`}
          >
            {part}
          </button>
        ))}
      </div>

      {/* Word list */}
      <div className="mb-3">
        <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 mb-2">
          <BookOpen size={15} className="text-[var(--pink-primary)]" />
          词条列表 ({filteredWords.length})
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/vocabulary/levels/${level}/mastered`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] text-xs font-medium hover:bg-[var(--mint-soft)]/20 transition-colors"
          >
            <Check size={12} />
            已掌握 ({Array.from(masteredSet).filter(w => words.some(e => e.korean === w)).length})
          </Link>
          <button
            onClick={() => managing ? exitManage() : (closeAllSwipes(), setManaging(true))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${managing ? 'bg-[var(--pink-primary)] text-white' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30'}`}
          >
            <ListChecks size={12} />
            {managing ? '取消批量管理' : '批量管理'}
          </button>
          {!managing && (
            <button
              onClick={() => { if (authLoading) return; if (!user) { window.location.href = '/auth/login?redirect=' + window.location.pathname; return; } setAddAllBook(true); }}
              disabled={addingAll || addedAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] text-xs font-medium hover:bg-[var(--pink-primary)]/20 disabled:opacity-50 transition-colors"
            >
              {addingAll ? <Loader2 size={12} className="animate-spin" /> : <BookmarkPlus size={12} />}
              {addedAll ? '已加入' : '全部加入单词本'}
            </button>
          )}
        </div>
      </div>

      {/* Select-all bar */}
      {managing && (
        <div className="flex items-center justify-between px-1 mb-2">
          <button onClick={toggleSelectAll} className="flex items-center gap-1.5 text-xs text-[var(--pink-primary)] font-medium">
            {allSelected ? <CheckSquare size={14} /> : <Square size={14} />}
            {allSelected ? '取消全选' : '全选未掌握'}
          </button>
          <span className="text-xs text-[var(--text-muted)]">已选 {selectedWords.size} 个</span>
        </div>
      )}

      <div className="space-y-2">
        {visibleWords.map((entry, idx) => {
          const isExpanded = expandedId === entry.id;
          const isMastered = masteredSet.has(entry.korean);
          const isLearning = learningSet.has(entry.korean);
          const isSaved = isMastered || isLearning;
          const isSelected = selectedWords.has(entry.korean);
          const isFirstUntouched = firstUntouchedIdx === filteredWords.indexOf(entry);

          return (
            <div
              key={entry.id}
              ref={isFirstUntouched ? firstUntouchedRef : undefined}
              className={`relative overflow-hidden rounded-xl ${isSelected ? 'ring-2 ring-[var(--mint-soft)]' : ''}`}
            >
              {/* Swipe action backdrop — hidden in manage mode */}
              {!managing && <div className="absolute inset-y-0 right-0 flex items-stretch">
                <button
                  onClick={() => { toggleMastered(entry); setSwipeOffset(entry.id, 0); }}
                  className="flex flex-col items-center justify-center gap-0.5 px-4 text-white text-xs font-medium"
                  style={{ background: isMastered ? '#89756e' : '#3aafa9', minWidth: 70 }}
                >
                  <Check size={16} />
                  {isMastered ? '取消' : '已掌握'}
                </button>
                {isSaved && (
                  <button
                    onClick={async () => {
                      const existing = await db.words.where('word').equals(entry.korean).first();
                      if (existing) await db.words.delete(existing.id);
                      setMasteredSet(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
                      setLearningSet(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
                      setSwipeOffset(entry.id, 0);
                    }}
                    className="flex flex-col items-center justify-center gap-0.5 px-4 text-white text-xs font-medium"
                    style={{ background: '#ff7fa8', minWidth: 70 }}
                  >
                    <Trash2 size={16} />
                    删除
                  </button>
                )}
              </div>}

              {/* Card content */}
              <div
                ref={(el) => { if (el) cardRefs.current.set(entry.id, el); else cardRefs.current.delete(entry.id); }}
                className={`bg-[var(--bg-card)] border rounded-xl overflow-hidden relative transition-colors ${isSelected ? 'border-[var(--mint-soft)] bg-[var(--mint-soft)]/5' : 'border-[var(--border-color)]'}`}
                style={{ transition: 'transform 0.2s ease', willChange: 'transform' }}
                onTouchStart={isDesktop || managing ? undefined : (e) => handleTouchStart(e, entry.id)}
                onTouchMove={isDesktop || managing ? undefined : (e) => handleTouchMove(e, entry.id)}
                onTouchEnd={isDesktop || managing ? undefined : (e) => handleTouchEnd(e, entry.id)}
              >
                <div className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--bg-card-hover)] transition-colors">
                  {managing && !isMastered && (
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${isSelected ? 'bg-[var(--mint-soft)] border-[var(--mint-soft)]' : 'border-[var(--border-color)] bg-white'}`}
                      onClick={() => toggleSelect(entry.korean)}
                    >
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                  )}
                  <button
                    onClick={() => { if (managing && !isMastered) { toggleSelect(entry.korean); return; } closeAllSwipes(); setExpandedId(isExpanded ? null : entry.id); }}
                    className="flex-1 flex items-center gap-3 min-w-0 text-left"
                  >
                    <span className="text-lg shrink-0">{entry.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[var(--text-primary)] text-sm">{entry.korean}</span>
                        <span className="text-xs text-[var(--pink-primary)] bg-[var(--pink-primary)]/5 px-1.5 py-0.5 rounded">
                          [{entry.romanization}]
                        </span>
                        {entry.partOfSpeech && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-muted)]">{entry.partOfSpeech}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-0.5">
                          {Array.from({ length: entry.frequency }).map((_, i) => (
                            <span key={i} className="text-[14px] text-[var(--peach-soft)]">★</span>
                          ))}
                        </div>
                        {isMastered && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]">已掌握</span>
                        )}
                        {isLearning && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--peach-soft)]/10 text-[var(--peach-soft)]">学习中</span>
                        )}
                      </div>
                    </div>
                  </button>
                  <div className="flex items-center gap-2 shrink-0">
                    {!managing && (
                      <>
                        {/* Desktop: show mastered button inline */}
                        {isDesktop && (
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleMastered(entry); }}
                            className={`p-1.5 rounded-lg transition-colors ${isMastered ? 'text-[var(--mint-soft)] bg-[var(--mint-soft)]/10' : 'text-[var(--text-muted)] hover:text-[var(--mint-soft)]'}`}
                            title={isMastered ? '取消已掌握' : '标记为已掌握'}
                          >
                            <Check size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => speak(entry.korean, 0.75)}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                        >
                          <Volume2 size={14} />
                        </button>
                        <button
                          onClick={() => { if (authLoading) return; if (!user) { window.location.href = '/auth/login?redirect=' + window.location.pathname; return; } setSheetWord(entry); }}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                        >
                          <BookmarkPlus size={14} />
                        </button>
                        <button onClick={() => { closeAllSwipes(); setExpandedId(isExpanded ? null : entry.id); }}>
                          {isExpanded ? <ChevronUp size={16} className="text-[var(--text-muted)]" /> : <ChevronDown size={16} className="text-[var(--text-muted)]" />}
                        </button>
                      </>
                    )}
                    {managing && isMastered && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]">已掌握</span>
                    )}
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-3 animate-slide-up">
                    {entry.meanings.map((m, i) => (
                      <div key={i} className="bg-[var(--bg-input)] rounded-lg p-3">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-medium bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] px-1.5 py-0.5 rounded">
                            {m.nuance}
                          </span>
                          <span className="text-xs bg-[var(--bg-accent)] text-[var(--text-secondary)] px-1.5 py-0.5 rounded">
                            {m.register}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--text-primary)]">{m.chinese}</p>
                      </div>
                    ))}

                    {entry.examples.map((ex, i) => (
                      <div key={i} className="bg-[var(--bg-input)] rounded-lg p-3 flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <TappableText text={ex.korean} className="text-sm text-[var(--text-primary)]" source="级别词库" highlightWord={entry.korean} />
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.chinese}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); speak(ex.korean, 0.75); }}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                        >
                          <Volume2 size={14} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); saveSentence(ex.korean, ex.chinese, entry.korean); }}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] transition-colors shrink-0"
                          style={{ color: savedSentenceIds.has(ex.korean) ? 'var(--pink-primary)' : 'var(--text-muted)' }}
                        >
                          <BookmarkPlus size={14} fill={savedSentenceIds.has(ex.korean) ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Infinite scroll sentinel — always in DOM so observer stays bound */}
      <div ref={sentinelRef} className="flex justify-center py-4">
        {displayCount < filteredWords.length && (
          <Loader2 size={20} className="animate-spin text-[var(--text-muted)]" />
        )}
      </div>

      {filteredWords.length === 0 && words.length > 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-[var(--text-secondary)]">该分类下暂无词条</p>
        </div>
      )}

      {/* Single word sheet */}
      {sheetWord && (
        <AddToBookSheet
          word={{
            korean: sheetWord.korean,
            pronunciation: sheetWord.romanization,
            meaning: sheetWord.meanings[0]?.chinese || '',
            partOfSpeech: sheetWord.partOfSpeech,
            examples: sheetWord.examples.map(ex => ({ text: ex.korean, translation: ex.chinese })),
            sourceEntryId: sheetWord.id,
          }}
          onClose={() => setSheetWord(null)}
        />
      )}

      {/* Add all sheet */}
      {addAllBook && (
        <AddToBookSheet
          word={{ korean: '', pronunciation: '', meaning: '', partOfSpeech: '' }}
          title={`全部加入单词本（${filteredWords.length} 词）`}
          onClose={() => setAddAllBook(false)}
          onSelectBook={handleAddAllToBook}
        />
      )}

      {/* Batch action bar */}
      {managing && selectedWords.size > 0 && (
        <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-30 flex justify-center px-4 pb-3 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3 shadow-xl flex gap-2">
            {masterPending ? (
              <>
                <button onClick={() => setMasterPending(false)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] text-sm font-semibold">
                  取消
                </button>
                <button onClick={batchMaster} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--mint-soft)] text-white text-sm font-semibold">
                  <CheckCircle size={14} /> 确认标记 {selectedWords.size} 个已掌握
                </button>
              </>
            ) : deletePending ? (
              <>
                <button onClick={() => setDeletePending(false)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] text-sm font-semibold">
                  取消
                </button>
                <button onClick={batchDelete} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold">
                  <Trash2 size={14} /> 确认删除 {selectedWords.size} 个
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setMasterPending(true)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--mint-soft)]/15 text-[var(--mint-soft)] text-sm font-semibold hover:bg-[var(--mint-soft)]/25 transition-colors">
                  <CheckCircle size={14} /> 标记已掌握 ({selectedWords.size})
                </button>
                <button onClick={() => setDeletePending(true)} className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-50 text-red-500 text-sm font-semibold hover:bg-red-100 transition-colors">
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
