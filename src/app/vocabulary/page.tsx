'use client';

import React, { useEffect, useState, useCallback, useMemo, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  BookOpen, ArrowRight, ArrowLeft, Library,
  Target, MessageSquare, Trash2, Volume2, CheckSquare, Square, FolderInput, X, Plus, Settings2, Check, Bookmark, BookmarkCheck, Copy, ChevronRight, ChevronDown, Loader2,
} from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { BooksSection } from '@/components/vocabulary/BooksSection';
import { speakWord, speak } from '@/lib/tts';
import { TappableText } from '@/components/TappableText';
import { getEntry, getEntryByKorean } from '@/data/vocabulary/index';
import { updateProfile } from '@/lib/gamification';
import { PageHeader, Section, Card, Button, EntryCard } from '@/components/ui';
import type { Word, WordBook, MasteryLevel, WordEntry } from '@/types';

const DesktopVocabularyPage = dynamic(
  () => import('@/components/desktop/DesktopVocabularyPage')
    .then((m) => m.DesktopVocabularyPage)
    .catch(() => () => <div style={{ padding: '80px 40px', textAlign: 'center', color: 'var(--color-ink-3)' }}>加载失败，请刷新页面</div>),
  { ssr: false }
);

interface SavedSentence {
  id: string;
  userId?: string;
  korean: string;
  chinese: string;
  source?: string;
  sourceType?: string;
  source_type?: string;
  clipId?: string;
  createdAt?: number;
  created_at?: string;
}

const SOURCE_LABELS: Record<string, string> = {
  analysis: '内容拆解',
  shadowing: '影子跟读',
  reading: '阅读',
  review: '闪卡复习',
  kpop: 'KPOP',
  news_reading: '韩娱热帖',
  writing: '写作练习',
  vocabulary: '词汇例句',
};

const masteryColor: Record<MasteryLevel, string> = {
  new: 'bg-slate-500',
  learning: 'bg-yellow-400',
  reviewing: 'bg-blue-400',
  mastered: 'bg-emerald-400',
};

const GOAL_OPTIONS = [5, 10, 15, 20, 25, 30, 40, 50];
const ITEM_H = 52;

function GoalWheelPicker({ current, unmastered, onClose, onConfirm }: {
  current: number;
  unmastered: number;
  onClose: () => void;
  onConfirm: (n: number) => Promise<void>;
}) {
  const initIdx = Math.max(0, GOAL_OPTIONS.indexOf(current));
  const [selectedIdx, setSelectedIdx] = useState(initIdx);
  const wheelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const currentOffset = useRef(-initIdx * ITEM_H);
  const isDragging = useRef(false);
  const mouseStartY = useRef(0);

  function snapToIndex(raw: number) {
    const min = -(GOAL_OPTIONS.length - 1) * ITEM_H;
    const clamped = Math.max(min, Math.min(0, raw));
    const idx = Math.max(0, Math.min(GOAL_OPTIONS.length - 1, Math.round(-clamped / ITEM_H)));
    const snapped = -idx * ITEM_H;
    currentOffset.current = snapped;
    if (itemsRef.current) {
      itemsRef.current.style.transition = 'transform 0.2s ease-out';
      itemsRef.current.style.transform = `translateY(${ITEM_H * 2 + snapped}px)`;
      setTimeout(() => { if (itemsRef.current) itemsRef.current.style.transition = 'none'; }, 200);
    }
    setSelectedIdx(idx);
  }

  useEffect(() => {
    const wheelEl = wheelRef.current;
    if (!wheelEl) return;

    const preventOutside = (e: TouchEvent) => {
      if (!wheelEl.contains(e.target as Node)) e.preventDefault();
    };
    document.addEventListener('touchmove', preventOutside, { passive: false });

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const dy = e.touches[0].clientY - touchStartY.current;
      const raw = currentOffset.current + dy;
      const min = -(GOAL_OPTIONS.length - 1) * ITEM_H;
      const clamped = Math.max(min, Math.min(0, raw));
      if (itemsRef.current) {
        itemsRef.current.style.transform = `translateY(${ITEM_H * 2 + clamped}px)`;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      snapToIndex(currentOffset.current + dy);
    };

    // Mouse drag
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dy = e.clientY - mouseStartY.current;
      const raw = currentOffset.current + dy;
      const min = -(GOAL_OPTIONS.length - 1) * ITEM_H;
      const clamped = Math.max(min, Math.min(0, raw));
      if (itemsRef.current) {
        itemsRef.current.style.transform = `translateY(${ITEM_H * 2 + clamped}px)`;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const dy = e.clientY - mouseStartY.current;
      snapToIndex(currentOffset.current + dy);
    };

    // Wheel scroll
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -ITEM_H : ITEM_H;
      snapToIndex(currentOffset.current + delta);
    };

    wheelEl.addEventListener('touchmove', handleTouchMove, { passive: false });
    wheelEl.addEventListener('touchend', handleTouchEnd);
    wheelEl.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('touchmove', preventOutside);
      wheelEl.removeEventListener('touchmove', handleTouchMove);
      wheelEl.removeEventListener('touchend', handleTouchEnd);
      wheelEl.removeEventListener('wheel', handleWheel);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    mouseStartY.current = e.clientY;
  };

  const days = unmastered > 0 ? Math.ceil(unmastered / GOAL_OPTIONS[selectedIdx]) : 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center"
      style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div
        className="relative w-full max-w-md rounded-t-3xl"
        style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-border-1)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-base font-black" style={{ color: 'var(--color-ink-1)' }}>设置复习计划</h3>
          <button onClick={onClose} style={{ color: 'var(--color-ink-3)' }}><X size={20} /></button>
        </div>
        <p className="text-xs px-5 pb-4" style={{ color: 'var(--color-ink-3)' }}>
          共 {unmastered} 个未掌握单词 · 每天复习 {GOAL_OPTIONS[selectedIdx]} 个 · 约需 {days > 0 ? `${days} 天` : '—'}
        </p>

        <div
          ref={wheelRef}
          className="relative mx-auto overflow-hidden"
          style={{ height: ITEM_H * 5, width: '100%', userSelect: 'none' }}
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute left-0 right-0 pointer-events-none z-10" style={{
            top: ITEM_H * 2, height: ITEM_H,
            background: 'var(--color-pink-soft)',
            borderTop: '1.5px solid var(--color-pink-base)',
            borderBottom: '1.5px solid var(--color-pink-base)',
          }} />
          <div className="absolute inset-x-0 top-0 pointer-events-none z-10" style={{ height: ITEM_H * 2, background: 'linear-gradient(to bottom, var(--color-surface-2), transparent)' }} />
          <div className="absolute inset-x-0 bottom-0 pointer-events-none z-10" style={{ height: ITEM_H * 2, background: 'linear-gradient(to top, var(--color-surface-2), transparent)' }} />
          <div ref={itemsRef} style={{ transform: `translateY(${ITEM_H * 2 + (-initIdx * ITEM_H)}px)`, transition: 'none' }}>
            {GOAL_OPTIONS.map((n, i) => (
              <div key={n} style={{
                height: ITEM_H, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: i === selectedIdx ? 28 : 20, fontWeight: 900,
                color: i === selectedIdx ? 'var(--color-pink-strong)' : 'var(--color-ink-4)',
                transition: 'font-size 0.15s, color 0.15s',
              }}>
                {n} 个/天
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 pt-3 pb-[calc(20px+env(safe-area-inset-bottom,0px))]">
          <button
            onClick={() => onConfirm(GOAL_OPTIONS[selectedIdx])}
            className="w-full py-3.5 rounded-2xl text-white font-black text-sm"
            style={{ background: 'var(--color-pink-base)', boxShadow: 'var(--shadow-md)' }}
          >
            确认
          </button>
        </div>
      </div>
    </div>
  );
}

function DueWordRoman({ word, entry }: { word: Word; entry?: WordEntry }) {
  const roman = word.pronunciation && word.pronunciation !== word.word
    ? word.pronunciation
    : entry?.romanization;
  if (!roman) return null;
  return <span className="text-xs text-[var(--text-muted)]">{roman}</span>;
}

function DueWordExpanded({ word, entry, savedExamples, setSavedExamples }: {
  word: Word; entry?: WordEntry;
  savedExamples: Set<string>;
  setSavedExamples: (fn: (prev: Set<string>) => Set<string>) => void;
}) {
  const validExamples = (word.examples ?? []).filter(ex => ex.text && ex.text !== '[object Object]');
  const examples = validExamples.length > 0
    ? validExamples.map(ex => ({ korean: ex.text, chinese: ex.translation }))
    : (entry?.examples ?? []).slice(0, 3).map(ex => ({ korean: ex.korean, chinese: ex.chinese })) ?? [];
  return (
    <div className="px-4 pb-3 space-y-2 border-t border-[var(--border-color)]">
      {examples.length > 0 ? examples.map((ex, i) => (
        <div key={i} className="flex items-start gap-2 pt-2">
          <div className="flex-1 min-w-0">
            <TappableText text={ex.korean} className="text-sm text-[var(--text-primary)]" source="我的词库" highlightWord={word.word} />
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.chinese}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => speak(ex.korean, 0.85)} className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--pink-primary)] shrink-0">
              <Volume2 size={13} />
            </button>
            <button
              onClick={async e => {
                e.stopPropagation();
                if (savedExamples.has(ex.korean)) return;
                try {
                  const existing = await db.sentences.where('korean').equals(ex.korean).first();
                  if (!existing) {
                    await db.sentences.add({ id: crypto.randomUUID(), korean: ex.korean, chinese: ex.chinese, source_type: 'vocabulary', source_id: 'word-' + word.word, source_title: word.word, created_at: new Date().toISOString() });
                  }
                  setSavedExamples(prev => new Set([...prev, ex.korean]));
                } catch { /* ignore */ }
              }}
              className="p-1 rounded-lg shrink-0"
              style={{ color: savedExamples.has(ex.korean) ? 'var(--pink-primary)' : 'var(--text-muted)', cursor: savedExamples.has(ex.korean) ? 'default' : 'pointer' }}
            >
              {savedExamples.has(ex.korean) ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
            </button>
          </div>
        </div>
      )) : (
        <p className="text-xs text-[var(--text-muted)] pt-2">暂无例句</p>
      )}
    </div>
  );
}

function VocabularyContent() {
  const { user, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlTab = searchParams.get('tab');
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [allWordsLoaded, setAllWordsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'home' | 'library' | 'books' | 'sentences' | 'mastered'>(() => {
    if (urlTab === 'sentences') return 'sentences';
    if (urlTab === 'library') return 'library';
    if (urlTab === 'books') return 'books';
    if (urlTab === 'mastered') return 'mastered';
    return 'home';
  });
  const [sentences, setSentences] = useState<SavedSentence[]>([]);
  const [sentencesLoading, setSentencesLoading] = useState(false);
  const [managing, setManaging] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [wordBooks, setWordBooks] = useState<WordBook[]>([]);
  const [showMoveSheet, setShowMoveSheet] = useState(false);
  const [wordListLimit, setWordListLimit] = useState(50);
  const [showDueSheet, setShowDueSheet] = useState(false);
  const [dueExpandedId, setDueExpandedId] = useState<string | null>(null);
  const [dailyGoal, setDailyGoal] = useState(20);
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [savedExamples, setSavedExamples] = useState<Set<string>>(new Set());
  const [copiedSentenceId, setCopiedSentenceId] = useState<string | null>(null);
  const analysisCache = useRef<Map<string, any>>(new Map());
  const [expandedSentenceId, setExpandedSentenceId] = useState<string | null>(null);
  const [expandedAnalysis, setExpandedAnalysis] = useState<Map<string, any>>(new Map());
  const [expandedLoading, setExpandedLoading] = useState<string | null>(null);
  const [entriesCache, setEntriesCache] = useState<Map<string, WordEntry>>(new Map());

  // Load dictionary entries for due words (romanization + examples fallback)
  useEffect(() => {
    if (!allWordsLoaded) return;
    const now = Date.now();
    const dueWords = allWords.filter(w => w.nextReview <= now && w.mastery !== 'mastered');
    (async () => {
      const results = await Promise.all(
        dueWords.map(w => w.sourceEntryId ? getEntry(w.sourceEntryId) : getEntryByKorean(w.word))
      );
      const map = new Map<string, WordEntry>();
      dueWords.forEach((w, i) => {
        if (results[i]) map.set(w.word, results[i]!);
      });
      setEntriesCache(map);
    })();
  }, [allWords, allWordsLoaded]);

  // Fast stats for home tab (counts only)
  const [quickStats, setQuickStats] = useState<{ total: number; mastered: number; learning: number; newWords: number; dueReview: number }>({ total: 0, mastered: 0, learning: 0, newWords: 0, dueReview: 0 });

  const switchTab = useCallback((t: 'home' | 'library' | 'books' | 'sentences' | 'mastered') => {
    setTab(t);
    setManaging(false);
    setSelected(new Set());
  }, []);

  // Fast initial load: counts + wordBooks + profile in parallel, no full word array
  useEffect(() => {
    (async () => {
      try {
        const now = Date.now();
        const [total, mastered, learning, dueReview, books, profile] = await Promise.all([
          db.words.count(),
          db.words.where('mastery').equals('mastered').count(),
          db.words.where('mastery').anyOf('learning', 'reviewing').count(),
          db.words.where('nextReview').belowOrEqual(now).countWhere([{ field: 'mastery', op: 'neq', value: 'mastered' }]),
          db.wordBooks.toArray(),
          db.userProfiles.get('main'),
        ]);
        setQuickStats({ total, mastered, learning, newWords: Math.max(0, total - mastered - learning), dueReview });
        setWordBooks(books);
        if (profile?.dailyGoalWords) setDailyGoal(profile.dailyGoalWords);
      } catch {
        // ignore — keep empty state instead of crashing
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Lazy-load full word list only when library tab or due-words sheet needs it
  const loadAllWords = useCallback(async () => {
    if (allWordsLoaded) return;
    const list = await db.words.orderBy('createdAt').reverse().toArray();
    setAllWords(list);
    setAllWordsLoaded(true);
  }, [allWordsLoaded]);

  useEffect(() => {
    if (tab === 'library' || tab === 'mastered') loadAllWords();
  }, [tab, loadAllWords]);

  const handleOpenDueSheet = useCallback(async () => {
    if (quickStats.dueReview === 0) return;
    await loadAllWords();
    setShowDueSheet(true);
  }, [quickStats.dueReview, loadAllWords]);

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === allWords.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(allWords.map(w => w.id)));
    }
  };

  const handleBatchDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`确定删除这 ${selected.size} 个单词？此操作不可撤销。`)) return;
    await Promise.all([...selected].map(id => db.words.delete(id).catch(() => {})));
    setAllWords(prev => prev.filter(w => !selected.has(w.id)));
    setSelected(new Set());
    setManaging(false);
  };

  const handleBatchUnmaster = async () => {
    if (selected.size === 0) return;
    await Promise.all([...selected].map(id =>
      db.words.update(id, { mastery: 'learning' as MasteryLevel, srsLevel: 1, interval: 1 }).catch(() => {})
    ));
    setAllWords(prev => prev.map(w => selected.has(w.id) ? { ...w, mastery: 'learning' as MasteryLevel } : w));
    setSelected(new Set());
    setManaging(false);
  };

  const handleMoveToBook = async (bookId: string) => {
    if (selected.size === 0) return;
    try {
      const book = await db.wordBooks.get(bookId);
      if (!book) return;
      const newIds = [...new Set([...book.wordIds, ...[...selected]])];
      await db.wordBooks.update(bookId, { wordIds: newIds, updatedAt: Date.now() });
      setShowMoveSheet(false);
      setSelected(new Set());
      setManaging(false);
    } catch {
      setShowMoveSheet(false);
    }
  };

  useEffect(() => {
    if (tab !== 'sentences') return;
    setSentencesLoading(true);
    db.sentences.toArray()
      .then((list) => {
        list.sort((a: any, b: any) => {
          const ta = a.createdAt ?? (a.created_at ? new Date(a.created_at).getTime() : 0);
          const tb = b.createdAt ?? (b.created_at ? new Date(b.created_at).getTime() : 0);
          return tb - ta;
        });
        setSentences(list as SavedSentence[]);
        setSentencesLoading(false);
      })
      .catch(() => setSentencesLoading(false));
  }, [tab]);

  // allWords-based stats (for library tab)
  const stats = useMemo(() => {
    const now = Date.now();
    const dueReview = allWords.filter((w) => w.nextReview <= now && w.mastery !== 'mastered').length;
    const mastered = allWords.filter((w) => w.mastery === 'mastered').length;
    const learning = allWords.filter((w) => w.mastery === 'learning' || w.mastery === 'reviewing').length;
    const newWords = allWords.filter((w) => w.mastery === 'new').length;
    return { dueReview, mastered, learning, newWords, total: allWords.length };
  }, [allWords]);

  // ── Mastered tab ──
  if (tab === 'mastered') {
    const masteredWords = allWords.filter(w => w.mastery === 'mastered');
    return (
      <div className="py-4 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => switchTab('home')} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">← 返回</button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">已掌握单词</h1>
        </div>
        {!allWordsLoaded ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-6 h-6 rounded-full border-2 border-[var(--pink-primary)] border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            <p className="text-sm text-[var(--text-muted)]">共 {masteredWords.length} 个已掌握单词，不再出现在闪卡复习中</p>
            <div className="flex items-center justify-between">
              {managing ? (
                <>
                  <button onClick={() => { setManaging(false); setSelected(new Set()); }} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">取消</button>
                  <button onClick={() => setSelected(new Set(masteredWords.map(w => w.id)))} className="text-sm text-[var(--pink-primary)] font-medium">全选</button>
                </>
              ) : (
                <button onClick={() => setManaging(true)} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] ml-auto">批量管理</button>
              )}
            </div>
            <div className="space-y-2">
              {masteredWords.slice(0, wordListLimit).map((w) => (
                <div key={w.id} className={`relative flex items-center bg-[var(--bg-card)] border rounded-xl px-4 py-3 group transition-colors ${selected.has(w.id) ? 'border-[var(--mint-soft)] bg-[var(--mint-soft)]/5' : 'border-[var(--border-color)]'}`}
                  onClick={managing ? () => toggleSelect(w.id) : undefined}
                >
                  {managing && (
                    <div className="mr-3 shrink-0 text-[var(--mint-soft)]">
                      {selected.has(w.id) ? <CheckSquare size={18} /> : <Square size={18} className="text-[var(--text-muted)]" />}
                    </div>
                  )}
                  <div className="flex-1 min-w-0 pointer-events-none">
                    <span className="font-medium text-[var(--text-primary)]">{w.word}</span>
                    <span className="text-xs text-[var(--text-muted)] ml-2">
                      {w.partOfSpeech && <span className="text-[10px] px-1 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-muted)] mr-1 align-middle">{w.partOfSpeech}</span>}
                      {w.meaning}
                    </span>
                  </div>
                  {!managing && (
                    <div className="relative z-10 flex items-center gap-1 shrink-0">
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); speakWord(w.word, 0.8); }} className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors">
                        <Volume2 size={14} />
                      </button>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] font-medium">已掌握</span>
                    </div>
                  )}
                </div>
              ))}
              {masteredWords.length > wordListLimit && (
                <button onClick={() => setWordListLimit(l => l + 50)} className="w-full py-3 text-xs text-[var(--pink-primary)] font-medium text-center">
                  加载更多（还有 {masteredWords.length - wordListLimit} 个）
                </button>
              )}
              {masteredWords.length === 0 && (
                <div className="text-center py-12 text-[var(--text-muted)] text-sm">还没有已掌握的单词</div>
              )}
            </div>
            {managing && selected.size > 0 && (
              <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-50 px-4 pb-3 md:left-[108px] md:bottom-0 md:pb-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3 shadow-lg flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--text-primary)] flex-1">已选 {selected.size} 个</span>
                  <button onClick={handleBatchUnmaster} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] text-sm font-medium">
                    <Check size={14} />取消掌握
                  </button>
                  <button onClick={handleBatchDelete} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--color-danger-bg)] text-[var(--color-danger)] text-sm font-medium">
                    <Trash2 size={14} />删除
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // ── Library tab ──
  if (tab === 'library') {
    return (
      <div className="py-4 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => switchTab('home')} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">← 返回</button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">全部词库</h1>
        </div>
        <Link href="/vocabulary/library" className="block bg-gradient-to-r from-[var(--pink-primary)]/10 to-[var(--purple-soft)]/10 border border-[var(--pink-pale)] rounded-2xl p-4 hover:border-[var(--pink-primary)]/30 transition-all group">
          <div className="flex items-center gap-3">
            <Library size={28} className="text-[var(--pink-primary)]" />
            <div className="flex-1">
              <p className="text-sm font-bold text-[var(--text-primary)]">词库</p>
              <p className="text-xs text-[var(--text-secondary)]">主题词包 · 分级词表 · 教材词汇 · 情景词典</p>
            </div>
            <ArrowRight size={18} className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        {!allWordsLoaded ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-6 h-6 rounded-full border-2 border-[var(--pink-primary)] border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            <p className="text-sm text-[var(--text-muted)] mt-4">
              共 {allWords.length} 个单词 · 已掌握 {stats.mastered} · 学习中 {stats.learning} · 新词 {stats.newWords}
            </p>
            <div className="flex items-center justify-between mt-3 mb-2">
              {managing ? (
                <>
                  <button onClick={toggleSelectAll} className="text-xs text-[var(--pink-primary)] font-medium">
                    {selected.size === allWords.length ? '取消全选' : `全选 (${allWords.length})`}
                  </button>
                  <button onClick={() => { setManaging(false); setSelected(new Set()); }} className="text-xs text-[var(--text-muted)]">
                    <X size={14} className="inline mr-1" />取消
                  </button>
                </>
              ) : (
                <button onClick={() => setManaging(true)} className="text-xs text-[var(--pink-primary)] font-medium ml-auto">批量管理</button>
              )}
            </div>
            <div className="space-y-2">
              {allWords.slice(0, wordListLimit).map((w) => (
                <div key={w.id} className={`relative flex items-center bg-[var(--bg-card)] border rounded-xl px-4 py-3 group transition-colors ${selected.has(w.id) ? 'border-[var(--pink-primary)] bg-[var(--pink-primary)]/5' : 'border-[var(--border-color)]'}`}
                  onClick={managing ? () => toggleSelect(w.id) : undefined}
                >
                  {managing && (
                    <div className="mr-3 shrink-0 text-[var(--pink-primary)]">
                      {selected.has(w.id) ? <CheckSquare size={18} /> : <Square size={18} className="text-[var(--text-muted)]" />}
                    </div>
                  )}
                  {!managing ? (
                    <Link href={`/dictionary?q=${encodeURIComponent(w.word)}`} className="absolute inset-0 rounded-xl" aria-label={w.word} />
                  ) : null}
                  <div className="flex-1 min-w-0 relative pointer-events-none">
                    <span className="font-medium text-[var(--text-primary)]">{w.word}</span>
                    <span className="text-xs text-[var(--text-muted)] ml-2 truncate">
                      {w.partOfSpeech && <span className="text-[10px] px-1 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-muted)] mr-1 align-middle">{w.partOfSpeech}</span>}
                      {w.meaning}
                    </span>
                  </div>
                  {!managing && (
                    <div className="relative z-10 flex items-center gap-1 shrink-0">
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); speakWord(w.word, 0.8); }} className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors">
                        <Volume2 size={14} />
                      </button>
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!confirm(`删除「${w.word}」？`)) return;
                          await db.words.delete(w.id).catch(() => {});
                          setAllWords(prev => prev.filter(x => x.id !== w.id));
                        }}
                        className="p-1.5 rounded-lg hover:bg-[var(--color-danger-bg)] text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-all"
                        title="删除"
                      >
                        <Trash2 size={14} />
                      </button>
                      <span className={`w-2 h-2 rounded-full ml-1 ${masteryColor[w.mastery]}`} />
                    </div>
                  )}
                </div>
              ))}
              {allWords.length > wordListLimit && (
                <button
                  onClick={() => setWordListLimit(l => l + 50)}
                  className="w-full py-3 text-xs text-[var(--pink-primary)] font-medium text-center hover:text-[var(--text-primary)] transition-colors"
                >
                  加载更多（还有 {allWords.length - wordListLimit} 个）
                </button>
              )}
            </div>

            {managing && selected.size > 0 && (
              <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-50 px-4 pb-3 md:left-[108px] md:bottom-0 md:pb-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3 shadow-lg flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--text-primary)] flex-1">已选 {selected.size} 个</span>
                  <button onClick={() => setShowMoveSheet(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--bg-soft)] text-[var(--text-primary)] text-sm font-medium">
                    <FolderInput size={14} />移到单词本
                  </button>
                  <button onClick={handleBatchDelete} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--color-danger-bg)] text-[var(--color-danger)] text-sm font-medium">
                    <Trash2 size={14} />删除
                  </button>
                </div>
              </div>
            )}

            {showMoveSheet && (
              <div className="fixed inset-0 z-[60] flex items-end lg:items-center justify-center" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
                <div className="absolute inset-0 bg-black/40" onClick={() => setShowMoveSheet(false)} />
                <div className="relative bg-[var(--bg-card)] rounded-t-3xl lg:rounded-3xl w-full lg:max-w-sm px-5 pt-5 pb-[calc(20px+env(safe-area-inset-bottom,0px))] z-10 flex flex-col max-h-[70dvh]">
                  <div className="flex items-center justify-between mb-4 shrink-0">
                    <h3 className="font-bold text-[var(--text-primary)]">移到单词本</h3>
                    <button onClick={() => setShowMoveSheet(false)} className="text-[var(--text-muted)]"><X size={18} /></button>
                  </div>
                  {wordBooks.length === 0 ? (
                    <p className="text-sm text-[var(--text-muted)] text-center py-6">还没有单词本，先去创建一个</p>
                  ) : (
                    <div className="space-y-2 overflow-y-auto flex-1 min-h-0" style={{ WebkitOverflowScrolling: 'touch' }}>
                      {wordBooks.map(book => (
                        <button key={book.id} onClick={() => handleMoveToBook(book.id)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--bg-soft)] hover:bg-[var(--bg-card-hover)] text-left transition-colors">
                          <BookOpen size={16} className="text-[var(--pink-primary)] shrink-0" />
                          <span className="text-sm font-medium text-[var(--text-primary)]">{book.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // ── Books tab ──
  if (tab === 'books') {
    return (
      <div className="py-4 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => switchTab('home')} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">← 返回</button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">我的单词本</h1>
        </div>
        <BooksSection />
      </div>
    );
  }

  // ── Sentences tab ──
  if (tab === 'sentences') {
    const handleDeleteSentence = async (id: string, korean: string) => {
      if (!confirm(`删除这条句子？\n${korean}`)) return;
      await db.sentences.delete(id).catch(() => {});
      setSentences((prev) => prev.filter((s) => s.id !== id));
    };

    const handleCopy = (id: string, korean: string) => {
      navigator.clipboard.writeText(korean).then(() => {
        setCopiedSentenceId(id);
        setTimeout(() => setCopiedSentenceId(null), 2000);
      }).catch(() => {});
    };

    const handleToggleExpand = async (s: SavedSentence) => {
      // collapse if already open and not failed (failed = allow retry)
      if (expandedSentenceId === s.id && expandedAnalysis.get(s.id) !== 'error') {
        setExpandedSentenceId(null);
        return;
      }
      // prevent concurrent requests
      if (expandedLoading) return;
      setExpandedSentenceId(s.id);
      // already cached (skip failed cache)
      if (analysisCache.current.has(s.korean)) {
        setExpandedAnalysis(prev => new Map(prev).set(s.id, analysisCache.current.get(s.korean)));
        return;
      }
      setExpandedLoading(s.id);
      try {
        const res = await fetch('/api/ai/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sentence: s.korean, mode: 'learn' }),
        });
        if (res.ok) {
          const data = await res.json();
          analysisCache.current.set(s.korean, data);
          setExpandedAnalysis(prev => new Map(prev).set(s.id, data));
        } else {
          setExpandedAnalysis(prev => new Map(prev).set(s.id, 'error'));
        }
      } catch {
        setExpandedAnalysis(prev => new Map(prev).set(s.id, 'error'));
      } finally {
        setExpandedLoading(null);
      }
    };

    return (
      <div className="py-4 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => switchTab('home')} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">← 返回</button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">我的句子</h1>
        </div>

        {sentencesLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
          </div>
        ) : sentences.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-20 h-20 rounded-2xl bg-[var(--bg-input)]/60 flex items-center justify-center mb-5">
              <MessageSquare size={36} className="text-[var(--text-placeholder)]" />
            </div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">还没有保存句子</h2>
            <p className="text-sm text-[var(--text-muted)] max-w-xs mb-6">
              在内容拆解、影子跟读或阅读中保存句子，会出现在这里
            </p>
            <Link href="/ai/analyze" className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white font-medium">
              去拆解韩语句子 <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {/* 打字练习快捷入口 */}
            <button
              onClick={() => router.push('/typing')}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 16, background: 'var(--color-mint-soft)', border: '1.5px solid var(--color-mint-base)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>用这些句子练打字</p>
                <p style={{ fontSize: 12, color: 'var(--color-mint-strong)', margin: '2px 0 0' }}>{sentences.length} 条句子已可用</p>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--color-mint-strong)', flexShrink: 0 }} />
            </button>

            <p className="text-xs text-[var(--text-muted)]">共 {sentences.length} 条句子</p>
            {sentences.map((s) => {
              const srcType = s.sourceType ?? s.source_type;
              const srcLabel = srcType ? (SOURCE_LABELS[srcType] ?? srcType) : null;
              const ts = s.createdAt ?? (s.created_at ? new Date(s.created_at).getTime() : null);
              const isExpanded = expandedSentenceId === s.id;
              const isLoadingThis = expandedLoading === s.id;
              const analysis = expandedAnalysis.get(s.id);
              return (
                <div key={s.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden">
                  <div className="p-4 space-y-2">
                    <button
                      onClick={() => handleToggleExpand(s)}
                      className="text-[17px] font-bold text-[var(--text-primary)] leading-relaxed w-full text-left flex items-center gap-2 hover:text-[var(--pink-primary)] transition-colors"
                      style={{ fontFamily: 'system-ui, sans-serif', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <span className="flex-1">{s.korean}</span>
                      <ChevronDown size={14} className={`shrink-0 transition-transform duration-200 text-[var(--text-muted)] ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    <p className="text-[15px] text-[var(--text-secondary)]">{s.chinese}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
                        {srcLabel && (
                          <span className="px-1.5 py-0.5 rounded bg-[var(--bg-input)]">{srcLabel}</span>
                        )}
                        {ts ? <span>{new Date(ts).toLocaleDateString('zh-CN')}</span> : null}
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => speakWord(s.korean, 0.75)} className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors" title="听发音">
                          <Volume2 size={14} />
                        </button>
                        <button onClick={() => handleCopy(s.id, s.korean)} className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] transition-colors" style={{ color: copiedSentenceId === s.id ? 'var(--color-mint-strong)' : 'var(--text-muted)' }} title="复制">
                          {copiedSentenceId === s.id ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                        <button onClick={() => handleDeleteSentence(s.id, s.korean)} className="p-1.5 rounded-lg hover:bg-red-50 text-[var(--text-muted)] hover:text-red-500 transition-colors" title="删除">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Inline grammar expand */}
                  {isExpanded && (
                    <div className="border-t border-[var(--border-color)] px-4 pt-3 pb-4">
                      {isLoadingThis ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2 size={18} className="animate-spin" style={{ color: 'var(--color-pink-strong)' }} />
                        </div>
                      ) : analysis && analysis !== 'error' ? (
                        <div className="space-y-3">
                          {/* 点击查词 */}
                          <div>
                            <p className="text-[10px] font-bold text-[var(--text-muted)] mb-1.5 tracking-wider">点击词语查释义</p>
                            <TappableText
                              text={s.korean}
                              source="我的句子"
                              style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-primary)' }}
                            />
                          </div>
                          {/* 语法 — 左竖线，无背景 */}
                          {(analysis.grammar ?? []).length > 0 && (
                            <div>
                              <p className="text-[10px] font-bold text-[var(--text-muted)] mb-1.5 tracking-wider">语法</p>
                              <div className="space-y-2">
                                {(analysis.grammar as any[]).map((g: any, i: number) => (
                                  <div key={i} className="pl-2 border-l-2 border-[#aee3d8]">
                                    <p className="text-[15px] font-bold text-[var(--text-primary)]">{g.pattern}</p>
                                    <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">{g.usage}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {/* 助词 — inline，无方框 */}
                          {(analysis.particles ?? []).length > 0 && (
                            <div>
                              <p className="text-[10px] font-bold text-[var(--text-muted)] mb-1.5 tracking-wider">助词</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1">
                                {(analysis.particles as any[]).map((p: any, i: number) => (
                                  <span key={i} className="text-[14px]">
                                    <span className="font-bold text-[var(--text-primary)]">{p.text}</span>
                                    <span className="text-[var(--text-muted)] ml-1">{p.explanation}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-[var(--text-muted)] text-center py-2">拆解失败，点击句子重试</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    );
  }

  // ── Home tab ──
  const s = quickStats;
  return (
    <>
    <div className="py-4 max-w-2xl mx-auto">
      <PageHeader
        eyebrow="단어"
        title="词汇"
        subtitle="我的单词与词库"
        tone="pink"
        flat
      />

      {/* Today task card */}
      {!authLoading && !user && (
        <div style={{ textAlign: 'center', padding: '32px 20px', marginBottom: 16 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-ink-1)', marginBottom: 8 }}>登录后查看你的词汇</p>
          <p style={{ fontSize: 12, color: 'var(--color-ink-3)', marginBottom: 16 }}>保存单词、闪卡复习、整理单词本</p>
          <a href="/auth/login" style={{ display: 'inline-block', padding: '8px 28px', borderRadius: 999, background: 'var(--color-pink-base)', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>登录 / 注册</a>
        </div>
      )}
      {!(authLoading || !user) && (<>
      <Section spacing="normal">
        <Card variant="hero" tone="pink" padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-pink-base)', display: 'inline-block' }} />
              <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--color-pink-strong)' }}>今日闪卡复习</span>
            </div>
            <Button
              variant="primary"
              tone="pink"
              size="sm"
              icon={<Target size={11} />}
              onClick={() => setShowGoalPicker(true)}
            >
              设置复习计划
            </Button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
            <button
              onClick={handleOpenDueSheet}
              style={{
                borderRadius: 'var(--radius-md)', padding: 12, textAlign: 'center',
                background: 'var(--color-surface-2)', border: '1px solid var(--color-border-1)',
                cursor: 'pointer', transition: 'transform var(--dur-fast) var(--ease-soft)',
              }}
            >
              {loading ? (
                <div style={{ height: 32, width: 32, margin: '0 auto', borderRadius: 6, background: 'var(--color-surface-4)' }} />
              ) : (
                <p style={{ fontSize: 26, fontWeight: 900, color: 'var(--color-pink-strong)', lineHeight: 1, margin: 0 }}>{s.dueReview}</p>
              )}
              <p style={{ fontSize: 10, color: 'var(--color-ink-3)', margin: '4px 0 0' }}>
                待复习{s.dueReview > 0 ? ' →' : ''}
              </p>
            </button>
            <div
              style={{
                borderRadius: 'var(--radius-md)', padding: 12, textAlign: 'center',
                background: 'var(--color-surface-2)', border: '1px solid var(--color-border-1)',
              }}
            >
              {loading ? (
                <div style={{ height: 32, width: 32, margin: '0 auto', borderRadius: 6, background: 'var(--color-surface-4)' }} />
              ) : (
                <p style={{ fontSize: 26, fontWeight: 900, color: 'var(--color-purple-strong)', lineHeight: 1, margin: 0 }}>{Math.min(s.newWords, 5)}</p>
              )}
              <p style={{ fontSize: 10, color: 'var(--color-ink-3)', margin: '4px 0 0' }}>推荐新词</p>
            </div>
            <div
              style={{
                borderRadius: 'var(--radius-md)', padding: 12, textAlign: 'center',
                background: 'var(--color-surface-2)', border: '1px solid var(--color-border-1)',
              }}
            >
              {loading ? (
                <div style={{ height: 32, width: 32, margin: '0 auto', borderRadius: 6, background: 'var(--color-surface-4)' }} />
              ) : (
                <p style={{ fontSize: 26, fontWeight: 900, color: 'var(--color-ink-3)', lineHeight: 1, margin: 0 }}>
                  {dailyGoal > 0 && s.total > 0 ? Math.ceil((s.total - s.mastered) / dailyGoal) : '—'}
                </p>
              )}
              <p style={{ fontSize: 10, color: 'var(--color-ink-3)', margin: '4px 0 0' }}>预计天数</p>
            </div>
          </div>
          <Link href="/review" style={{ textDecoration: 'none' }}>
            <Button variant="primary" tone="pink" fullWidth size="lg">
              {s.total === 0 ? '先去词库导入单词' : s.dueReview === 0 && s.newWords === 0 ? '今日已全部完成 ✓' : '开始闪卡复习'}
            </Button>
          </Link>
        </Card>
      </Section>

      {showGoalPicker && (
        <GoalWheelPicker
          current={dailyGoal}
          unmastered={s.total - s.mastered}
          onClose={() => setShowGoalPicker(false)}
          onConfirm={async (n) => {
            setDailyGoal(n);
            setShowGoalPicker(false);
            await updateProfile({ dailyGoalWords: n });
          }}
        />
      )}

      {/* Library entry */}
      <Section spacing="normal">
        <EntryCard
          href="/vocabulary/library"
          icon={<Library size={20} strokeWidth={1.75} />}
          label="韩语词库"
          detail="主题词包 · 分级词表 · 延世教材 · 情景词典"
          tone="purple"
          layout="row"
          cta="进入"
        />
      </Section>

      {/* Word books */}
      <Section
        title="我的单词本"
        action={wordBooks.length > 0 ? { label: '新建', href: '/vocabulary/books' } : undefined}
        spacing="normal"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {loading ? (
            <div style={{ height: 64, borderRadius: 'var(--radius-md)', background: 'var(--color-surface-3)' }} />
          ) : wordBooks.length === 0 ? (
            <Link href="/vocabulary/books" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px dashed var(--color-border-2)',
                  padding: 20,
                  color: 'var(--color-ink-3)',
                  fontSize: 14, fontWeight: 600,
                  transition: 'all var(--dur-fast) var(--ease-soft)',
                }}
              >
                <Plus size={16} />
                新建第一个单词本
              </div>
            </Link>
          ) : (
            <>
              {wordBooks.slice(0, 4).map((book) => (
                <Card key={book.id} as="a" href={`/vocabulary/books/${book.id}`} variant="row" interactive>
                  <div
                    style={{
                      width: 4, height: 44, borderRadius: 'var(--radius-pill)',
                      background: book.color || 'var(--color-pink-base)',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {book.name}
                    </p>
                    <span style={{ fontSize: 11, color: 'var(--color-ink-3)' }}>
                      {book.wordIds.length} 个单词
                    </span>
                  </div>
                  <ChevronRight size={16} color="var(--color-ink-4)" />
                </Card>
              ))}
              {wordBooks.length > 4 && (
                <Link
                  href="/vocabulary/books"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                    padding: '10px 0', fontSize: 12, fontWeight: 700, color: 'var(--color-pink-strong)',
                    textDecoration: 'none',
                  }}
                >
                  查看全部 {wordBooks.length} 个单词本 <ArrowRight size={12} />
                </Link>
              )}
            </>
          )}
        </div>
      </Section>

      {/* My sentences entry */}
      <Section spacing="normal">
        <Card as="button" onClick={() => switchTab('sentences')} variant="row" interactive>
          <div
            style={{
              width: 44, height: 44, borderRadius: 'var(--radius-md)',
              background: 'var(--color-mint-soft)', color: 'var(--color-mint-strong)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
            aria-hidden
          >
            <Bookmark size={20} strokeWidth={1.75} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>我的句子</p>
            <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
              保存的句子 · 语法拆解 · 打字练习
            </p>
          </div>
          <ChevronRight size={18} color="var(--color-ink-4)" />
        </Card>
      </Section>
      </>)}
    </div>

      {showDueSheet && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowDueSheet(false)} />
          <div className="relative w-full max-w-lg bg-[var(--bg-card)] rounded-t-3xl flex flex-col" style={{ maxHeight: 'calc(80dvh - 56px)' }}>
            <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
              <div>
                <h2 className="text-base font-bold text-[var(--text-primary)]">待复习单词</h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{s.dueReview} 个单词到期，点击展开例句</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/vocabulary/review-pool" onClick={() => setShowDueSheet(false)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[var(--bg-input)] text-xs text-[var(--text-secondary)] hover:text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/8 transition-colors">
                  <Settings2 size={13} />管理词库
                </Link>
                <button onClick={() => setShowDueSheet(false)} className="p-1 text-[var(--text-muted)]"><X size={20} /></button>
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4 space-y-2">
              {allWords.filter(w => w.nextReview <= Date.now() && w.mastery !== 'mastered').map(word => {
                const isExpanded = dueExpandedId === word.id;
                return (
                  <div key={word.id} className="bg-[var(--bg-input)] rounded-2xl overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3 cursor-pointer" onClick={() => setDueExpandedId(isExpanded ? null : word.id)}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[var(--text-primary)]">{word.word}</span>
                          <DueWordRoman word={word} entry={entriesCache.get(word.word)} />
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] truncate mt-0.5">{word.meaning}</p>
                      </div>
                      <button onClick={e => { e.stopPropagation(); speakWord(word.word, 0.85); }} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--pink-primary)] shrink-0">
                        <Volume2 size={15} />
                      </button>
                      <span className="text-xs text-[var(--text-muted)]">{isExpanded ? '▲' : '▼'}</span>
                    </div>
                    {isExpanded && <DueWordExpanded word={word} entry={entriesCache.get(word.word)} savedExamples={savedExamples} setSavedExamples={setSavedExamples} />}
                  </div>
                );
              })}
            </div>
            <div className="px-4 pt-3 pb-3 border-t border-[var(--border-color)] shrink-0">
              <Link href="/review" onClick={() => setShowDueSheet(false)} className="block w-full py-3 text-center text-white text-sm font-bold rounded-2xl" style={{ background: 'var(--pink-primary)' }}>
                开始复习这 {s.dueReview} 个单词
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function VocabularyPageInner() {
  const [isDesktop, setIsDesktop] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isDesktop) return <DesktopVocabularyPage />;

  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center py-20"><div className="w-6 h-6 rounded-full border-2 border-[var(--pink-primary)] border-t-transparent animate-spin" /></div>}>
      <VocabularyContent />
    </Suspense>
  );
}

export default function VocabularyPage() {
  return <VocabularyPageInner />;
}
