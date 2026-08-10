'use client';

import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, BookOpen, Target, Volume2, ChevronDown,
  Loader2, BarChart3, BookmarkPlus, Layers, Check, Trash2, CheckSquare, Square, ListChecks, CheckCircle,
  Eye, EyeOff, MoreHorizontal, Languages,
} from 'lucide-react';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { db, deleteWordsByText } from '@/lib/db';
import { getLevel, getLevelWords } from '@/data/vocabulary';
import type { WordEntry, LevelWordList } from '@/types';
import { speakWord } from '@/lib/tts';
import { displayRomanHyphen } from '@/lib/dictionary';
import { useAuth } from '@/components/AuthProvider';
import { TappableText } from '@/components/TappableText';

const PAGE_SIZE = 50;
import { AddToBookSheet } from '@/components/vocabulary/AddToBookSheet';
import { useIsDesktop } from '@/lib/useIsMobile';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const levelNames: Record<number, string> = {
  1: '1级 · 入门', 2: '2级 · 基础', 3: '3级 · 进阶',
  4: '4级 · 中级', 5: '5级 · 高级', 6: '6级 · 精通',
};

export default function LevelDetailPage() {
  const { lang } = useLang();
  const isWideViewport = useIsDesktop();
  const { level: levelStr } = useParams<{ level: string }>();
  const router = useRouter();
  const level = parseInt(levelStr);
  // Use the hook result consistently — avoid reading window directly
  const isDesktop = isWideViewport;

  const [lvl, setLvl] = useState<LevelWordList | null>(null);
  const [words, setWords] = useState<WordEntry[]>([]);
  const [masteredSet, setMasteredSet] = useState<Set<string>>(new Set());
  const [learningSet, setLearningSet] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
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

  const swipeOffsets = useRef<Map<string, number>>(new Map());
  const swipeStart = useRef<{ id: string; x: number; y: number } | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

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
    (async () => {
      try {
        const l = await getLevel(level);
        if (!l) { router.replace('/vocabulary/levels'); return; }
        setLvl(l);
        const { recordVocabVisit } = await import('@/lib/progress/dailyHero');
        recordVocabVisit({ source: 'levels', unitId: String(level), unitTitle: levelNames[level] ?? `${level}级` });
        const w = await getLevelWords(level);
        setWords(w);
        try {
          const koreanWords = new Set(w.map((e) => e.korean));
          const allUserWords = await db.words.where('word').anyOf([...koreanWords]).toArray();
          const userWords = allUserWords.filter((uw) => koreanWords.has(uw.word));
          const mSet = new Set(userWords.filter((uw) => uw.mastery === 'mastered').map((uw) => uw.word));
          const lSet = new Set(userWords.filter((uw) => uw.mastery !== 'mastered' && uw.mastery !== 'new').map((uw) => uw.word));
          setMasteredSet(mSet);
          setLearningSet(lSet);
        } catch {
          // db error — show words without mastery state
        }
      } catch { setLoadError(true); } finally {
        setLoading(false);
      }
    })();
  }, [level, router]);

  // Part of speech filter options
  const saveSentence = async (korean: string, chinese: string, sourceTitle: string) => {
    if (savedSentenceIds.has(korean)) return;
    const existing = await db.sentences.where('korean').equals(korean).first().catch(() => null);
    if (!existing) {
      await db.sentences.add({ id: crypto.randomUUID(), korean, chinese, source_type: 'vocabulary', source_id: 'level-' + level, source_title: sourceTitle, created_at: Date.now() }).catch((e) => { console.error('saveSentence: failed to add sentence', korean, e); });
    }
    setSavedSentenceIds((prev) => new Set(prev).add(korean));
  };

  const partOptions = useMemo(() => {
    const parts = new Set(words.map((w) => w.partOfSpeech));
    return ['全部', ...Array.from(parts)];
  }, [words]);

  const [showMastered, setShowMastered] = useState(false);
  const [showCn, setShowCn] = useState(true);

  useEffect(() => {
    try { if (localStorage.getItem('vocab_show_cn') === '0') setShowCn(false); } catch { /* ignore */ }
  }, []);

  const toggleCn = () => {
    setShowCn(prev => {
      const next = !prev;
      try { localStorage.setItem('vocab_show_cn', next ? '1' : '0'); } catch { /* ignore */ }
      return next;
    });
  };

  const [showRn, setShowRn] = useState(true);

  useEffect(() => {
    try { if (localStorage.getItem('vocab_show_rn') === '0') setShowRn(false); } catch { /* ignore */ }
  }, []);

  const toggleRn = () => {
    setShowRn(prev => {
      const next = !prev;
      try { localStorage.setItem('vocab_show_rn', next ? '1' : '0'); } catch { /* ignore */ }
      return next;
    });
  };

  const filteredWords = useMemo(() => {
    let list = partFilter === '全部' ? words : words.filter((w) => w.partOfSpeech === partFilter);
    if (!showMastered) list = list.filter((w) => !masteredSet.has(w.korean));
    return list;
  }, [words, partFilter, masteredSet, showMastered]);

  useEffect(() => {
    setAddedAll(false);
    setDisplayCount(PAGE_SIZE);
    setSelectedWords(new Set());
  }, [words, partFilter, showMastered]);

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
    const targets = filteredWords.filter(e => !masteredSet.has(e.korean));
    const koreans = targets.map(e => e.korean);
    try {
      // 一次批量查已有词，再拆成 bulkUpdate + bulkPut 两批 IO
      const existingRows = koreans.length
        ? await db.words.where('word').anyOf(koreans).toArray()
        : [];
      // 收集同韩文的所有行 id，避免 Map 只保留最后一条导致重复行遗漏
      const existingByKorean = new Map<string, string[]>();
      for (const r of existingRows) {
        const ids = existingByKorean.get(r.word);
        if (ids) ids.push(r.id); else existingByKorean.set(r.word, [r.id]);
      }

      const updates = [];
      const puts = [];
      for (const entry of targets) {
        const existingIds = existingByKorean.get(entry.korean);
        if (existingIds?.length) {
          for (const id of existingIds) {
            updates.push({ id, mastery: 'mastered' as const, srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now });
          }
        } else {
          puts.push({
            id: crypto.randomUUID(),
            word: entry.korean,
            pronunciation: entry.romanization,
            meaning: entry.meanings[0]?.chinese || '',
            partOfSpeech: entry.partOfSpeech,
            examples: entry.examples.map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })),
            sourceEntryId: entry.id,
            mastery: 'mastered' as const,
            srsLevel: 5,
            easeFactor: 2.5,
            interval: 21,
            nextReview: now + 21 * 86400000,
            createdAt: now,
            lastReviewed: now,
            source: 'library',
          });
        }
      }
      await Promise.all([
        updates.length ? db.words.bulkUpdate(updates) : Promise.resolve(),
        puts.length ? db.words.bulkPut(puts) : Promise.resolve(),
      ]);
      const newSet = new Set(masteredSet);
      for (const e of targets) newSet.add(e.korean);
      setMasteredSet(newSet);
      setLearningSet(prev => { const s = new Set(prev); newSet.forEach(k => s.delete(k)); return s; });
      setMasteredAll(true);
      setTimeout(() => setMasteredAll(false), 3000);
    } catch {
      alert(t('vocab.err_check_login', lang));
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
        db.words.where('word').anyOf(filteredWords.map(e => e.korean)).toArray(),
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
    } catch { /* ignore */ } finally {
      setAddingAll(false);
      setAddAllBook(false);
    }
  };

  const toggleMastered = async (entry: WordEntry) => {
    const now = Date.now();
    const wasMastered = masteredSet.has(entry.korean);
    // 乐观更新：先立即变色，DB 失败再回滚
    if (wasMastered) {
      setMasteredSet(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
      setLearningSet(prev => new Set(prev).add(entry.korean));
    } else {
      setMasteredSet(prev => new Set(prev).add(entry.korean));
      setLearningSet(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
    }
    try {
      const rows = await db.words.where('word').equals(entry.korean).toArray();
      if (wasMastered) {
        if (rows.length) {
          await db.words.bulkUpdate(
            rows.map(w => ({ id: w.id, mastery: 'learning', srsLevel: 1, interval: 1, nextReview: now }))
          );
        }
      } else {
        if (rows.length) {
          await db.words.bulkUpdate(
            rows.map(w => ({ id: w.id, mastery: 'mastered', srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now }))
          );
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
      }
    } catch {
      // 回滚
      if (wasMastered) {
        setMasteredSet(prev => new Set(prev).add(entry.korean));
        setLearningSet(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
      } else {
        setMasteredSet(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
        setLearningSet(prev => new Set(prev).add(entry.korean));
      }
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
    const allUserWords = await db.words.where('word').anyOf(selected.map(e => e.korean)).toArray();
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
    try {
      await Promise.all([
        toUpdate.length > 0 ? db.words.bulkUpdate(toUpdate) : Promise.resolve(),
        toInsert.length > 0 ? db.words.bulkPut(toInsert) : Promise.resolve(),
      ]);
    } catch {
      alert(t('vocab.err_partial_mark', lang));
    }
    setMasteredSet(prev => { const s = new Set(prev); selectedWords.forEach(w => s.add(w)); return s; });
    setLearningSet(prev => { const s = new Set(prev); selectedWords.forEach(w => s.delete(w)); return s; });
    exitManage();
  };

  const batchDelete = async () => {
    try {
      await deleteWordsByText(selectedWords); // 删词 + 从收藏本剔除孤儿 id
    } catch {
      alert(t('vocab.err_check_login', lang));
      exitManage();
      return;
    }
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

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-sm text-[var(--text-muted)]">{t('common.error', lang)}</p>
        <button onClick={() => window.location.reload()} className="text-sm text-[var(--pink-primary)] underline underline-offset-2">
          {t('common.retry', lang)}
        </button>
      </div>
    );
  }

  if (!lvl) return null;

  const total = words.length;
  const mastered = Array.from(masteredSet).filter((w) => words.some((e) => e.korean === w)).length;
  const learning = Array.from(learningSet).filter((w) => words.some((e) => e.korean === w)).length;
  const untouched = total - mastered - learning;

  return (
    <div className={isWideViewport ? 'py-6 w-full pb-8 px-8 space-y-5' : 'py-4 max-w-2xl mx-auto pb-8 px-4 space-y-4'}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/vocabulary/library?tab=levels"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: 'var(--color-ink-2)', textDecoration: 'none',
            marginBottom: 14,
          }}
        >
          <ArrowLeft size={14} />
          {t('vocab.ld_back_to_levels', lang)}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-pink-strong)' }}>{t('vocab.level_n_ji', lang, { n: level })}</span>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>{t('vocab.level_name_' + level, lang)}</h1>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
              {t('vocab.ld_topik_core', lang, { name: level <= 2 ? 'I' : 'II', n: lvl.totalCount.toLocaleString() })}
            </p>
          </div>
        </div>
      </div>

      {/* Flashcard entry */}
      <Link
        href={`/vocabulary/levels/${level}/flashcards`}
        className="flex items-center gap-3 p-4 rounded-xl border transition-colors"
        style={{ background: 'var(--color-pink-soft)', borderColor: 'var(--color-pink-soft)' }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--bg-card)' }}>
          <Layers size={18} style={{ color: 'var(--color-pink-base)' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{t('vocab.bd_flashcard', lang)}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{t('vocab.ld_flashcard_sub', lang)}</p>
        </div>
        <ChevronDown size={16} style={{ color: 'var(--text-muted)', transform: 'rotate(-90deg)' }} />
      </Link>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center">
          <BookOpen size={16} className="text-[var(--pink-primary)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--text-primary)]">{total}</p>
          <p className="text-xs text-[var(--text-muted)]">{t('vocab.ld_level_words', lang)}</p>
        </div>
        <Link href={`/vocabulary/levels/${level}/mastered`} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center hover:border-[var(--mint-soft)] transition-colors">
          <Target size={16} className="text-[var(--mint-soft)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--mint-soft)]">{mastered}</p>
          <p className="text-xs text-[var(--text-muted)]">{t('vocab.mastered', lang)}</p>
        </Link>
        <button onClick={scrollToFirstUntouched} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center hover:border-[var(--peach-soft)] transition-colors w-full">
          <BarChart3 size={16} className="text-[var(--peach-soft)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--peach-soft)]">{untouched}</p>
          <p className="text-xs text-[var(--text-muted)]">{t('vocab.untouched', lang)}</p>
        </button>
      </div>

      {/* Three-color progress bar */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-xs text-[var(--text-muted)]">
          <span>{t('vocab.ld_level_progress', lang)}</span>
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
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--mint-soft)' }} /> {t('vocab.legend_mastered', lang)} {mastered}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--peach-soft)' }} /> {t('vocab.legend_learning', lang)} {learning}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--border-color)' }} /> {t('vocab.legend_untouched', lang)} {untouched}
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
            {part === '全部' ? t('vocab.ex_all', lang) : part}
          </button>
        ))}
      </div>

      {/* Word list */}
      <div className="mb-3">
        <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 mb-2">
          <BookOpen size={15} className="text-[var(--pink-primary)]" />
          {t('vocab.ld_word_list_n', lang, { n: filteredWords.length })} {!showMastered && <span className="text-[10px] font-normal text-[var(--text-muted)]">{t('vocab.ld_mastered_hidden', lang)}</span>}
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          {managing ? (
            <button
              onClick={exitManage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[var(--pink-primary)] text-white transition-colors"
            >
              <ListChecks size={12} />
              {t('vocab.cancel_manage', lang)}
            </button>
          ) : (
            <>
              <button
                onClick={toggleCn}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${showCn ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30'}`}
              >
                {showCn ? <Eye size={12} /> : <EyeOff size={12} />}
                {showCn ? t('vocab.hide_cn', lang) : t('vocab.show_cn', lang)}
              </button>
              <button
                onClick={toggleRn}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${showRn ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30'}`}
              >
                <Languages size={12} />
                {showRn ? t('vocab.hide_rn', lang) : t('vocab.show_rn', lang)}
              </button>
              <button
                onClick={() => { if (authLoading) return; if (!user) { router.push('/auth/login?redirect=' + window.location.pathname); return; } setAddAllBook(true); }}
                disabled={addingAll || addedAll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] text-xs font-medium hover:bg-[var(--pink-primary)]/20 disabled:opacity-50 transition-colors"
              >
                {addingAll ? <Loader2 size={12} className="animate-spin" /> : <BookmarkPlus size={12} />}
                {addedAll ? t('vocab.added', lang) : t('vocab.add_all_to_book', lang)}
              </button>
              <DropdownMenu
                triggerAriaLabel={t('vocab.more', lang)}
                triggerClassName="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30 transition-colors"
                trigger={<><MoreHorizontal size={14} />{t('vocab.more', lang)}</>}
              >
                {(close) => (
                  <>
                    <Link
                      href={`/vocabulary/levels/${level}/mastered`}
                      onClick={close}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors"
                    >
                      <Check size={16} className="text-[var(--mint-soft)]" />
                      {t('vocab.ld_mastered_n', lang, { n: Array.from(masteredSet).filter(w => words.some(e => e.korean === w)).length })}
                    </Link>
                    <button
                      onClick={() => { setShowMastered(v => !v); close(); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors text-left"
                    >
                      {showMastered ? <EyeOff size={16} className="text-[var(--text-muted)]" /> : <Eye size={16} className="text-[var(--text-muted)]" />}
                      {showMastered ? t('vocab.ld_hide_mastered', lang) : t('vocab.ld_show_mastered', lang)}
                    </button>
                    <button
                      onClick={() => { closeAllSwipes(); setManaging(true); close(); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors text-left"
                    >
                      <ListChecks size={16} className="text-[var(--text-muted)]" />
                      {t('vocab.manage', lang)}
                    </button>
                  </>
                )}
              </DropdownMenu>
            </>
          )}
        </div>
      </div>

      {/* Select-all bar */}
      {managing && (
        <div className="flex items-center justify-between px-1 mb-2">
          <button onClick={toggleSelectAll} className="flex items-center gap-1.5 text-xs text-[var(--pink-primary)] font-medium">
            {allSelected ? <CheckSquare size={14} /> : <Square size={14} />}
            {allSelected ? t('vocab.cancel_select_all', lang) : t('vocab.select_all_unmastered', lang)}
          </button>
          <span className="text-xs text-[var(--text-muted)]">{t('vocab.selected_n', lang, { n: selectedWords.size })}</span>
        </div>
      )}

      {(() => {
        const renderCard = (entry: typeof visibleWords[number]) => {
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
                  style={{ background: isMastered ? 'var(--text-muted)' : 'var(--color-mint-strong)', minWidth: 70 }}
                >
                  <Check size={16} />
                  {isMastered ? t('common.cancel', lang) : t('vocab.mastered', lang)}
                </button>
                {isSaved && (
                  <button
                    onClick={async () => {
                      try {
                        await deleteWordsByText([entry.korean]); // 删词 + 从收藏本剔除孤儿 id
                      } catch (err) {
                        alert(t('vocab.err_delete_prefix', lang) + (err instanceof Error ? err.message : t('vocab.err_retry', lang)));
                        return;
                      }
                      setMasteredSet(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
                      setLearningSet(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
                      setSwipeOffset(entry.id, 0);
                    }}
                    className="flex flex-col items-center justify-center gap-0.5 px-4 text-white text-xs font-medium"
                    style={{ background: 'var(--color-pink-base)', minWidth: 70 }}
                  >
                    <Trash2 size={16} />
                    {t('vocab.delete', lang)}
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
                <div className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--bg-card-hover)] transition-colors">
                  {managing && (
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${isSelected ? 'bg-[var(--mint-soft)] border-[var(--mint-soft)]' : 'border-[var(--border-color)] bg-white'}`}
                      onClick={() => toggleSelect(entry.korean)}
                    >
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                  )}
                  <button
                    onClick={() => { if (managing) { toggleSelect(entry.korean); return; } closeAllSwipes(); setExpandedId(isExpanded ? null : entry.id); }}
                    className="flex-1 flex items-center gap-3 min-w-0 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2.5 min-w-0">
                        <span className="ko-text font-bold text-[var(--text-primary)] text-[19px] leading-tight whitespace-nowrap">{entry.korean}</span>
                        {showRn && <span className="min-w-0 truncate text-[12.5px] font-semibold tracking-wide text-[var(--pink-primary)]">
                          [{displayRomanHyphen(entry.romanization, entry.korean)}]
                        </span>}
                      </div>
                      <div className="flex items-center gap-2 mt-2 min-w-0">
                        {entry.partOfSpeech && (
                          <span className="shrink-0 text-[10.5px] font-semibold px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-muted)]">{entry.partOfSpeech}</span>
                        )}
                        {showCn ? (
                          <span className="text-sm text-[var(--text-primary)] leading-snug truncate">{entry.meanings.map((m) => m.chinese).join('；')}</span>
                        ) : (
                          <span className="text-xs text-[var(--text-muted)] leading-snug truncate">{t('vocab.tap_reveal_cn', lang)}</span>
                        )}
                        {isMastered && (
                          <span className="shrink-0 text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[var(--mint-soft)]/12 text-[var(--mint-soft)]">{t('vocab.mastered', lang)}</span>
                        )}
                        {isLearning && (
                          <span className="shrink-0 text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[var(--peach-soft)]/12 text-[var(--peach-soft)]">{t('vocab.learning', lang)}</span>
                        )}
                      </div>
                    </div>
                  </button>
                  <div className="flex items-center gap-0.5 shrink-0">
                    {!managing && (
                      <>
                        <button
                          onClick={() => speakWord(entry.korean)}
                          className="no-touch-min w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                          aria-label={t('vocab.play', lang)}
                        >
                          <Volume2 size={17} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleMastered(entry); }}
                          className={`no-touch-min w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isMastered ? 'text-[var(--mint-soft)] bg-[var(--mint-soft)]/12' : 'text-[var(--text-muted)] hover:bg-[var(--mint-soft)]/12 hover:text-[var(--mint-soft)]'}`}
                          title={isMastered ? t('vocab.unmaster', lang) : t('vocab.mark_mastered', lang)}
                          aria-label={isMastered ? t('vocab.unmaster', lang) : t('vocab.mark_mastered', lang)}
                        >
                          <Check size={17} />
                        </button>
                        <button
                          onClick={() => { if (authLoading) return; if (!user) { router.push('/auth/login?redirect=' + window.location.pathname); return; } setSheetWord(entry); }}
                          className="no-touch-min w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                          aria-label={t('vocab.add_to_book', lang)}
                        >
                          <BookmarkPlus size={17} />
                        </button>
                      </>
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
                        {!showCn && <p className="text-sm text-[var(--text-primary)]">{m.chinese}</p>}
                      </div>
                    ))}

                    {entry.examples.map((ex, i) => (
                      <div key={i} className="bg-[var(--bg-input)] rounded-lg p-3 flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <TappableText text={ex.korean} className="text-[15px] leading-relaxed text-[var(--text-primary)]" source={t('vocab.src_level', lang)} highlightWord={entry.korean} />
                          <p className="text-[13px] text-[var(--text-secondary)] mt-1 leading-snug">{ex.chinese}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); speakWord(ex.korean); }}
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
        };

        // 桌面：拆成左右两条独立纵列，展开一列不影响另一列高度
        if (isWideViewport) {
          const left = visibleWords.filter((_, i) => i % 2 === 0);
          const right = visibleWords.filter((_, i) => i % 2 === 1);
          return (
            <div className="grid grid-cols-2 gap-3 items-start">
              <div className="space-y-3">{left.map(renderCard)}</div>
              <div className="space-y-3">{right.map(renderCard)}</div>
            </div>
          );
        }
        return <div className="space-y-2">{visibleWords.map(renderCard)}</div>;
      })()}

      {/* Infinite scroll sentinel — always in DOM so observer stays bound */}
      <div ref={sentinelRef} className="flex justify-center py-4">
        {displayCount < filteredWords.length && (
          <Loader2 size={20} className="animate-spin text-[var(--text-muted)]" />
        )}
      </div>

      {filteredWords.length === 0 && words.length > 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-[var(--text-secondary)]">
            {!showMastered && masteredSet.size > 0 ? t('vocab.ld_all_mastered_hint', lang) : t('vocab.ld_empty_category', lang)}
          </p>
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
          title={t('vocab.add_to_book_n', lang, { n: filteredWords.length })}
          onClose={() => setAddAllBook(false)}
          onSelectBook={handleAddAllToBook}
        />
      )}

      {/* Batch action bar */}
      {managing && selectedWords.size > 0 && (
        <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[60] flex justify-center pointer-events-none">
          <div className="pointer-events-auto w-full max-w-lg mx-4 mb-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3 shadow-xl flex gap-2">
            {masterPending ? (
              <>
                <button onClick={() => setMasterPending(false)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] text-sm font-semibold">
                  {t('common.cancel', lang)}
                </button>
                <button onClick={batchMaster} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--mint-soft)] text-white text-sm font-semibold">
                  <CheckCircle size={14} /> {t('vocab.mark_mastered_n', lang, { n: selectedWords.size })}
                </button>
              </>
            ) : deletePending ? (
              <>
                <button onClick={() => setDeletePending(false)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] text-sm font-semibold">
                  {t('common.cancel', lang)}
                </button>
                <button onClick={batchDelete} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--color-danger)] text-white text-sm font-semibold">
                  <Trash2 size={14} /> {t('vocab.confirm_delete_n', lang, { n: selectedWords.size })}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setMasterPending(true)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--mint-soft)]/15 text-[var(--mint-soft)] text-sm font-semibold hover:bg-[var(--mint-soft)]/25 transition-colors">
                  <CheckCircle size={14} /> {t('vocab.mark_mastered_n', lang, { n: selectedWords.size })}
                </button>
                <button onClick={() => setDeletePending(true)} className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--color-danger-bg)] text-[var(--color-danger)] text-sm font-semibold hover:brightness-95 transition-colors">
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
