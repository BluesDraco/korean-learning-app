'use client'

import React, { useEffect, useState, useCallback, useMemo, useRef, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useIsDesktop } from '@/lib/useIsMobile';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  BookOpen, ArrowRight, Library,
  Target, MessageSquare, Trash2, Volume2, CheckSquare, Square, FolderInput, X, Plus, Check, Bookmark, Copy, ChevronRight, ChevronDown, Loader2, Sparkles,
} from 'lucide-react';
import { db, deleteWordIds } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { BooksSection } from '@/components/vocabulary/BooksSection';
import { speakWord } from '@/lib/tts';
import { TappableText } from '@/components/TappableText';
import { updateProfile } from '@/lib/gamification';
import { Section, Card, Button, EntryCard, Modal } from '@/components/ui';
import PlaceIntro from '@/components/PlaceIntro';
import { t, getLang } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';
import type { Word, WordBook, MasteryLevel } from '@/types';
import '../learning/learning-visual.css';

function DesktopVocabularyFallback() {
  return <div style={{ padding: '80px 40px', textAlign: 'center', color: 'var(--color-ink-3)' }}>{t('vocab.load_failed_refresh', getLang())}</div>;
}
const DesktopVocabularyPage = dynamic(
  () => import('@/components/desktop/DesktopVocabularyPage')
    .then((m) => m.DesktopVocabularyPage)
    .catch(() => DesktopVocabularyFallback),
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

const SOURCE_LABEL_KEYS: Record<string, string> = {
  analysis: 'vocab.src_analysis',
  shadowing: 'vocab.src_shadowing',
  reading: 'vocab.src_reading',
  review: 'vocab.src_review',
  news_reading: 'vocab.src_news_reading',
  writing: 'vocab.src_writing',
  vocabulary: 'vocab.src_vocabulary',
};

const masteryColor: Record<MasteryLevel, string> = {
  new: 'bg-[var(--text-muted)]',
  learning: 'bg-[var(--peach-soft)]',
  reviewing: 'bg-[var(--blue-soft)]',
  mastered: 'bg-[var(--mint-soft)]',
};

const GOAL_OPTIONS = [5, 10, 15, 20, 25, 30, 40, 50];
const ITEM_H = 52;

function GoalWheelPicker({ current, unmastered, onClose, onConfirm }: {
  current: number;
  unmastered: number;
  onClose: () => void;
  onConfirm: (n: number) => Promise<void>;
}) {
  const { lang } = useLang();
  const initIdx = Math.max(0, GOAL_OPTIONS.indexOf(current));
  const [selectedIdx, setSelectedIdx] = useState(initIdx);
  const [confirming, setConfirming] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const currentOffset = useRef(-initIdx * ITEM_H);
  const isDragging = useRef(false);
  const mouseStartY = useRef(0);
  // 拖动后浏览器会补发一次 click，落在某个选项上会覆盖吸附结果（拖到30却跳成手指落点项）。
  // 拖动位移超阈值就置真，onClick 里据此忽略这次误触。
  const movedRef = useRef(false);

  function setIndex(idx: number) {
    const clampedIdx = Math.max(0, Math.min(GOAL_OPTIONS.length - 1, idx));
    const snapped = -clampedIdx * ITEM_H;
    currentOffset.current = snapped;
    if (itemsRef.current) {
      itemsRef.current.style.transition = 'transform 0.2s ease-out';
      itemsRef.current.style.transform = `translateY(${ITEM_H * 2 + snapped}px)`;
      setTimeout(() => { if (itemsRef.current) itemsRef.current.style.transition = 'none'; }, 200);
    }
    setSelectedIdx(clampedIdx);
  }

  function snapToIndex(raw: number) {
    const min = -(GOAL_OPTIONS.length - 1) * ITEM_H;
    const clamped = Math.max(min, Math.min(0, raw));
    setIndex(Math.round(-clamped / ITEM_H));
  }

  // 拖动/点击开始前先掐掉上一次 snap 的 0.2s 过渡，否则连续快滑会带着过渡跑 → 黏滞、跟不上手
  function stopTransition() {
    if (itemsRef.current) itemsRef.current.style.transition = 'none';
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
      stopTransition();
      const dy = e.touches[0].clientY - touchStartY.current;
      if (Math.abs(dy) > 4) movedRef.current = true;
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
      stopTransition();
      const dy = e.clientY - mouseStartY.current;
      if (Math.abs(dy) > 4) movedRef.current = true;
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
    movedRef.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    mouseStartY.current = e.clientY;
    movedRef.current = false;
  };

  const days = unmastered > 0 ? Math.ceil(unmastered / GOAL_OPTIONS[selectedIdx]) : 0;

  // Portal 到 body：否则挂在 .learn-visual-root 内会被 `.learn-visual-root > * {position:relative}`
  // (特异性高于 Tailwind .fixed) 强改成 relative，导致弹窗内联文档流、滚不动、按钮被推出屏幕
  if (typeof window === 'undefined') return null;

  return createPortal(
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
          <h3 className="text-base font-black" style={{ color: 'var(--color-ink-1)' }}>{t('vocab.hub_review_plan_title', lang)}</h3>
          <button onClick={onClose} style={{ color: 'var(--color-ink-3)' }}><X size={20} /></button>
        </div>
        <p className="text-xs px-5 pb-4" style={{ color: 'var(--color-ink-3)' }}>
          {t('vocab.hub_plan_summary', lang, { total: unmastered, per: GOAL_OPTIONS[selectedIdx], days: days > 0 ? t('vocab.hub_plan_days', lang, { n: days }) : t('vocab.hub_plan_dash', lang) })}
        </p>

        <div
          ref={wheelRef}
          className="relative mx-auto overflow-hidden"
          style={{ height: ITEM_H * 5, width: '100%', userSelect: 'none', touchAction: 'none' }}
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute pointer-events-none" style={{
            top: ITEM_H * 2, left: 20, right: 20, height: ITEM_H, zIndex: 0,
            background: 'var(--color-pink-soft)',
            border: '1.5px solid var(--color-pink-base)',
            borderRadius: 12,
          }} />
          <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: ITEM_H * 2, background: 'linear-gradient(to bottom, var(--color-surface-2), transparent)', zIndex: 1 }} />
          <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: ITEM_H * 2, background: 'linear-gradient(to top, var(--color-surface-2), transparent)', zIndex: 1 }} />
          <div ref={itemsRef} style={{ transform: `translateY(${ITEM_H * 2 + (-initIdx * ITEM_H)}px)`, transition: 'none', position: 'relative', zIndex: 2 }}>
            {GOAL_OPTIONS.map((n, i) => (
              <div key={n}
                onClick={() => { if (movedRef.current) { movedRef.current = false; return; } setIndex(i); }}
                style={{
                  height: ITEM_H, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: i === selectedIdx ? 28 : 20, fontWeight: 900,
                  color: i === selectedIdx ? 'var(--color-pink-strong)' : 'var(--color-ink-4)',
                  transition: 'font-size 0.15s, color 0.15s',
                  cursor: 'pointer',
                }}>
                {t('vocab.hub_plan_per_day', lang, { n })}
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 pt-3 pb-[calc(20px+env(safe-area-inset-bottom,0px))]">
          <button
            disabled={confirming}
            onClick={async () => {
              if (confirming) return;
              setConfirming(true);
              await onConfirm(GOAL_OPTIONS[selectedIdx]);
              setConfirming(false);
            }}
            className="w-full py-3.5 rounded-2xl text-white font-black text-sm disabled:opacity-60"
            style={{ background: 'var(--color-pink-base)', boxShadow: 'var(--shadow-md)' }}
          >
            {confirming ? t('vocab.hub_saving', lang) : t('common.confirm', lang)}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function VocabularyContent() {
  const { user, loading: authLoading } = useAuth();
  const { lang } = useLang();
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
  const [dailyGoal, setDailyGoal] = useState(20);
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [copiedSentenceId, setCopiedSentenceId] = useState<string | null>(null);
  const [batchLoading, setBatchLoading] = useState(false);
  const [showBatchDeleteConfirm, setShowBatchDeleteConfirm] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ type: 'word' | 'sentence'; id: string; label: string } | null>(null);
  const analysisCache = useRef<Map<string, any>>(new Map());
  const [expandedSentenceId, setExpandedSentenceId] = useState<string | null>(null);
  const [expandedAnalysis, setExpandedAnalysis] = useState<Map<string, any>>(new Map());
  const [expandedLoading, setExpandedLoading] = useState<string | null>(null);
  // Fast stats for home tab (counts only)
  const [quickStats, setQuickStats] = useState<{ total: number; mastered: number; learning: number; newWords: number; dueReview: number }>({ total: 0, mastered: 0, learning: 0, newWords: 0, dueReview: 0 });
  const [homeLoadError, setHomeLoadError] = useState(false);

  const switchTab = useCallback((tabName: 'home' | 'library' | 'books' | 'sentences' | 'mastered') => {
    setTab(tabName);
    setManaging(false);
    setSelected(new Set());
  }, []);

  // 首屏聚合接口：一次 fetch 拿齐 stats + wordBooks + dailyGoal，
  // 替代原先并发 6 个 /api/user-data 请求（每个独立鉴权+DB），明显降低首屏卡顿
  // 依赖 user?.id：切换账号时重新加载，避免展示旧账号数据
  useEffect(() => {
    if (!user) {
      // 未登录时重置所有数据状态，防止账号切换残留
      setQuickStats({ total: 0, mastered: 0, learning: 0, newWords: 0, dueReview: 0 });
      setWordBooks([]);
      setDailyGoal(20);
      setAllWords([]);
      setAllWordsLoaded(false);
      setHomeLoadError(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    setHomeLoadError(false);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    (async () => {
      try {
        const res = await fetch('/api/vocabulary/home', { signal: controller.signal, cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setQuickStats(data.stats);
        setWordBooks(Array.isArray(data.books) ? data.books : []);
        if (data.dailyGoalWords) setDailyGoal(data.dailyGoalWords);
        setHomeLoadError(false);
      } catch {
        setHomeLoadError(true);
      } finally {
        clearTimeout(timer);
        setLoading(false);
      }
    })();
    return () => { clearTimeout(timer); controller.abort(); };
  }, [user?.id]);

  // user 切换时重置词库缓存，避免旧账号数据残留
  useEffect(() => {
    setAllWords([]);
    setAllWordsLoaded(false);
    setSentences([]);
  }, [user?.id]);

  // Lazy-load full word list only when library tab or due-words sheet needs it
  const loadAllWords = useCallback(async () => {
    if (allWordsLoaded) return;
    const list = await db.words.orderBy('createdAt').reverse().limit(2000).toArray();
    setAllWords(list);
    setAllWordsLoaded(true);
  }, [allWordsLoaded]);

  useEffect(() => {
    if (tab === 'library' || tab === 'mastered') loadAllWords();
  }, [tab, loadAllWords]);

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

  const handleBatchDelete = () => {
    if (selected.size === 0 || batchLoading) return;
    setShowBatchDeleteConfirm(true);
  };

  const doBatchDelete = async () => {
    setShowBatchDeleteConfirm(false);
    setBatchLoading(true);
    try {
      const deletedIds = await deleteWordIds(selected); // 删词 + 从收藏本剔除孤儿 id
      setAllWords(prev => prev.filter(w => !deletedIds.has(w.id)));
      setSelected(new Set());
      setManaging(false);
    } finally {
      setBatchLoading(false);
    }
  };

  const handleBatchUnmaster = async () => {
    if (selected.size === 0 || batchLoading) return;
    setBatchLoading(true);
    try {
      await Promise.all([...selected].map(id =>
        db.words.update(id, { mastery: 'learning' as MasteryLevel, srsLevel: 1, interval: 1 }).catch(() => {})
      ));
      setAllWords(prev => prev.map(w => selected.has(w.id) ? { ...w, mastery: 'learning' as MasteryLevel } : w));
      setSelected(new Set());
      setManaging(false);
    } finally {
      setBatchLoading(false);
    }
  };

  const confirmPendingDelete = async () => {
    if (!pendingDelete) return;
    const { type, id } = pendingDelete;
    setPendingDelete(null);
    try {
      if (type === 'word') {
        await deleteWordIds([id]); // 删词 + 从收藏本剔除孤儿 id
        setAllWords(prev => prev.filter(x => x.id !== id));
      } else {
        await db.sentences.delete(id);
        setSentences(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      alert(t('vocab.err_delete_prefix', lang) + (err instanceof Error ? err.message : t('vocab.err_retry', lang)));
    }
  };

  const deleteModals = (
    <>
      <Modal open={showBatchDeleteConfirm} onClose={() => setShowBatchDeleteConfirm(false)} title={t('vocab.batch_delete_q', lang)} size="sm">
        <p style={{ fontSize: 14, color: 'var(--color-ink-2)', lineHeight: 1.6, marginBottom: 20 }}>
          {t('vocab.batch_delete_confirm', lang, { n: selected.size })}
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" fullWidth onClick={() => setShowBatchDeleteConfirm(false)}>{t('common.cancel', lang)}</Button>
          <Button variant="danger" fullWidth onClick={doBatchDelete}>{t('vocab.delete', lang)}</Button>
        </div>
      </Modal>
      <Modal open={pendingDelete !== null} onClose={() => setPendingDelete(null)} title={t('vocab.delete_confirm_title', lang)} size="sm">
        <p style={{ fontSize: 14, color: 'var(--color-ink-2)', lineHeight: 1.6, marginBottom: 20 }}>
          {t('vocab.delete_confirm_label', lang, { label: pendingDelete?.label ?? '' })}
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" fullWidth onClick={() => setPendingDelete(null)}>{t('common.cancel', lang)}</Button>
          <Button variant="danger" fullWidth onClick={confirmPendingDelete}>{t('vocab.delete', lang)}</Button>
        </div>
      </Modal>
    </>
  );

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

  const masteredWords = useMemo(() => allWords.filter(w => w.mastery === 'mastered'), [allWords]);

  // ── Mastered tab ──
  if (tab === 'mastered') {
    return (
      <div className="py-4 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => switchTab('home')} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">← {t('common.back', lang)}</button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">{t('vocab.tab_mastered_title', lang)}</h1>
        </div>
        {!allWordsLoaded ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-6 h-6 rounded-full border-2 border-[var(--pink-primary)] border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            <p className="text-sm text-[var(--text-muted)]">{t('vocab.tab_mastered_sub', lang, { n: masteredWords.length })}</p>
            <div className="flex items-center justify-between">
              {managing ? (
                <>
                  <button onClick={() => { setManaging(false); setSelected(new Set()); }} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">{t('common.cancel', lang)}</button>
                  <button onClick={() => setSelected(new Set(masteredWords.map(w => w.id)))} className="text-sm text-[var(--pink-primary)] font-medium">{t('vocab.select_all', lang)}</button>
                </>
              ) : (
                <button onClick={() => setManaging(true)} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] ml-auto">{t('vocab.manage', lang)}</button>
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
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); speakWord(w.word); }} className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors">
                        <Volume2 size={14} />
                      </button>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] font-medium">{t('vocab.mastered', lang)}</span>
                    </div>
                  )}
                </div>
              ))}
              {masteredWords.length > wordListLimit && (
                <button onClick={() => setWordListLimit(l => l + 50)} className="w-full py-3 text-xs text-[var(--pink-primary)] font-medium text-center">
                  {t('vocab.tab_load_more', lang, { n: masteredWords.length - wordListLimit })}
                </button>
              )}
              {masteredWords.length === 0 && (
                <div className="text-center py-12 text-[var(--text-muted)] text-sm">{t('vocab.no_mastered_yet', lang)}</div>
              )}
            </div>
            {managing && selected.size > 0 && (
              <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[60] px-4 pb-3 md:left-[108px] md:bottom-0 md:pb-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3 shadow-lg flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--text-primary)] flex-1">{t('vocab.selected_n', lang, { n: selected.size })}</span>
                  <button onClick={handleBatchUnmaster} disabled={batchLoading} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] text-sm font-medium disabled:opacity-50">
                    <Check size={14} />{t('vocab.unmaster', lang)}
                  </button>
                  <button onClick={handleBatchDelete} disabled={batchLoading} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--color-danger-bg)] text-[var(--color-danger)] text-sm font-medium disabled:opacity-50">
                    <Trash2 size={14} />{t('vocab.delete', lang)}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        {deleteModals}
      </div>
    );
  }

  // ── Library tab ──
  if (tab === 'library') {
    return (
      <div className="py-4 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => switchTab('home')} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">← {t('common.back', lang)}</button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">{t('vocab.tab_library_title', lang)}</h1>
        </div>
        {!allWordsLoaded ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-6 h-6 rounded-full border-2 border-[var(--pink-primary)] border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            <p className="text-sm text-[var(--text-muted)] mt-4">
              {t('vocab.tab_library_sub', lang, { total: allWords.length, mastered: stats.mastered, learning: stats.learning, newWords: stats.newWords })}
            </p>
            <div className="flex items-center justify-between mt-3 mb-2">
              {managing ? (
                <>
                  <button onClick={toggleSelectAll} className="text-xs text-[var(--pink-primary)] font-medium">
                    {selected.size === allWords.length ? t('vocab.cancel_select_all', lang) : t('vocab.select_all_n', lang, { n: allWords.length })}
                  </button>
                  <button onClick={() => { setManaging(false); setSelected(new Set()); }} className="text-xs text-[var(--text-muted)]">
                    <X size={14} className="inline mr-1" />{t('common.cancel', lang)}
                  </button>
                </>
              ) : (
                <button onClick={() => setManaging(true)} className="text-xs text-[var(--pink-primary)] font-medium ml-auto">{t('vocab.manage', lang)}</button>
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
                    <Link href={`/vocabulary/dictionary?q=${encodeURIComponent(w.word)}`} className="absolute inset-0 rounded-xl" aria-label={w.word} />
                  ) : null}
                  <div className="flex-1 min-w-0 relative pointer-events-none">
                    <span className="font-medium text-[var(--text-primary)]">{w.word}</span>
                    <span className="text-xs text-[var(--text-muted)] ml-2 truncate">
                      {w.partOfSpeech && <span className="text-[10px] px-1 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-muted)] mr-1 align-middle">{w.partOfSpeech}</span>}
                      {w.meaning}
                    </span>
                  </div>
                  {!managing && (
                    <div className="relative z-10 flex items-center gap-3 shrink-0 ml-2">
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); speakWord(w.word); }}
                        className="no-touch-min w-8 h-8 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors flex items-center justify-center"
                        aria-label={t('vocab.play', lang)}
                      >
                        <Volume2 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setPendingDelete({ type: 'word', id: w.id, label: w.word });
                        }}
                        className="no-touch-min w-8 h-8 rounded-lg hover:bg-[var(--color-danger-bg)] text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-all flex items-center justify-center"
                        title={t('vocab.delete', lang)}
                        aria-label={t('vocab.delete', lang)}
                      >
                        <Trash2 size={13} />
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
                  {t('vocab.tab_load_more', lang, { n: allWords.length - wordListLimit })}
                </button>
              )}
            </div>

            {managing && selected.size > 0 && (
              <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[60] px-4 pb-3 md:left-[108px] md:bottom-0 md:pb-4">
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3 shadow-lg flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--text-primary)] flex-1">{t('vocab.selected_n', lang, { n: selected.size })}</span>
                  <button onClick={() => setShowMoveSheet(true)} disabled={batchLoading} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--bg-soft)] text-[var(--text-primary)] text-sm font-medium disabled:opacity-50">
                    <FolderInput size={14} />{t('vocab.move_to_book', lang)}
                  </button>
                  <button onClick={handleBatchDelete} disabled={batchLoading} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--color-danger-bg)] text-[var(--color-danger)] text-sm font-medium disabled:opacity-50">
                    <Trash2 size={14} />{t('vocab.delete', lang)}
                  </button>
                </div>
              </div>
            )}

            {showMoveSheet && (
              <div className="fixed inset-0 z-[60] flex items-end lg:items-center justify-center" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
                <div className="absolute inset-0 bg-black/40" onClick={() => setShowMoveSheet(false)} />
                <div className="relative bg-[var(--bg-card)] rounded-t-3xl lg:rounded-3xl w-full lg:max-w-sm px-5 pt-5 pb-[calc(20px+env(safe-area-inset-bottom,0px))] z-10 flex flex-col max-h-[70dvh]">
                  <div className="flex items-center justify-between mb-4 shrink-0">
                    <h3 className="font-bold text-[var(--text-primary)]">{t('vocab.move_to_book', lang)}</h3>
                    <button onClick={() => setShowMoveSheet(false)} className="text-[var(--text-muted)]"><X size={18} /></button>
                  </div>
                  {wordBooks.length === 0 ? (
                    <p className="text-sm text-[var(--text-muted)] text-center py-6">{t('vocab.no_books_create', lang)}</p>
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
        {deleteModals}
      </div>
    );
  }

  // ── Books tab ──
  if (tab === 'books') {
    return (
      <div className="py-4 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => switchTab('home')} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">← {t('common.back', lang)}</button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">{t('vocab.tab_books_title', lang)}</h1>
        </div>
        <BooksSection />
      </div>
    );
  }

  // ── Sentences tab ──
  if (tab === 'sentences') {
    const handleDeleteSentence = (id: string, korean: string) => {
      setPendingDelete({ type: 'sentence', id, label: korean });
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
          <button onClick={() => switchTab('home')} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">← {t('common.back', lang)}</button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">{t('vocab.tab_sentences_title', lang)}</h1>
        </div>

        {sentencesLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--border-default)', borderTopColor: 'var(--color-pink-base)' }} />
          </div>
        ) : sentences.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-20 h-20 rounded-2xl bg-[var(--bg-input)]/60 flex items-center justify-center mb-5">
              <MessageSquare size={36} className="text-[var(--text-placeholder)]" />
            </div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{t('vocab.sentences_none', lang)}</h2>
            <p className="text-sm text-[var(--text-muted)] max-w-xs mb-6">
              {t('vocab.sentences_none_hint', lang)}
            </p>
            <Link href={user ? '/ai/analyze' : '/auth/login?redirect=/ai/analyze'} className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white font-medium">
              {t('vocab.sentences_go_analyze', lang)} <ArrowRight size={14} />
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
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>{t('vocab.sentences_typing_cta', lang)}</p>
                <p style={{ fontSize: 12, color: 'var(--color-mint-strong)', margin: '2px 0 0' }}>{t('vocab.sentences_typing_count', lang, { n: sentences.length })}</p>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--color-mint-strong)', flexShrink: 0 }} />
            </button>

            <p className="text-xs text-[var(--text-muted)]">{t('vocab.sentences_count', lang, { n: sentences.length })}</p>
            {sentences.map((s) => {
              const srcType = s.sourceType ?? s.source_type;
              const srcLabel = srcType ? (SOURCE_LABEL_KEYS[srcType] ? t(SOURCE_LABEL_KEYS[srcType], lang) : srcType) : null;
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
                      <span className="flex-1 min-w-0 break-words">{s.korean}</span>
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
                      <div className="flex items-center gap-2">
                        <button onClick={() => speakWord(s.korean)} className="no-touch-min w-8 h-8 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors flex items-center justify-center" title={t('vocab.sentences_listen', lang)} aria-label={t('vocab.sentences_listen', lang)}>
                          <Volume2 size={14} />
                        </button>
                        <button onClick={() => handleCopy(s.id, s.korean)} className="no-touch-min w-8 h-8 rounded-lg hover:bg-[var(--bg-card-hover)] transition-colors flex items-center justify-center" style={{ color: copiedSentenceId === s.id ? 'var(--color-mint-strong)' : 'var(--text-muted)' }} title={t('vocab.sentences_copy', lang)} aria-label={t('vocab.sentences_copy', lang)}>
                          {copiedSentenceId === s.id ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                        <button onClick={() => handleDeleteSentence(s.id, s.korean)} className="no-touch-min w-8 h-8 rounded-lg hover:bg-[var(--color-danger-bg)] text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors flex items-center justify-center" title={t('vocab.delete', lang)} aria-label={t('vocab.delete', lang)}>
                          <Trash2 size={13} />
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
                            <p className="text-[10px] font-bold text-[var(--text-muted)] mb-1.5 tracking-wider">{t('vocab.sentences_tap_word', lang)}</p>
                            <TappableText
                              text={s.korean}
                              source="我的句子"
                              style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-primary)' }}
                            />
                          </div>
                          {/* 语法 — 左竖线，无背景 */}
                          {(analysis.grammar ?? []).length > 0 && (
                            <div>
                              <p className="text-[10px] font-bold text-[var(--text-muted)] mb-1.5 tracking-wider">{t('vocab.sentences_grammar', lang)}</p>
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
                              <p className="text-[10px] font-bold text-[var(--text-muted)] mb-1.5 tracking-wider">{t('vocab.sentences_particles', lang)}</p>
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
                        <p className="text-xs text-[var(--text-muted)] text-center py-2">{t('vocab.sentences_analyze_failed', lang)}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {deleteModals}
      </div>
    );
  }

  // ── Home tab ──
  const s = quickStats;
  return (
    <>
    <div className="learn-visual-root py-4 max-w-2xl md:max-w-none mx-auto">
      <PlaceIntro place="vocabulary" />
      {/* 头部对齐学习页:Tori 단어 我的词汇 横向品牌栏 + 分割线 */}
      <header className="learn-head learn-enter" style={{ '--i': 0 } as React.CSSProperties}>
        <div className="learn-brand">
          <span className="learn-brand-mark">Tori</span>
          <span className="learn-brand-kr">단어</span>
          <span className="learn-brand-sub">{t('vocab.hub_brand_sub', lang)}</span>
        </div>
      </header>

      {/* Auth loading 骨架 —— 让首屏不再是纯空白 */}
      {authLoading && (
        <div style={{ padding: '4px 0 20px' }}>
          <div style={{ height: 160, borderRadius: 20, background: 'var(--color-surface-3)', marginBottom: 16, opacity: 0.6 }} />
          <div style={{ height: 56, borderRadius: 12, background: 'var(--color-surface-3)', marginBottom: 12, opacity: 0.6 }} />
          <div style={{ height: 44, borderRadius: 10, background: 'var(--color-surface-3)', marginBottom: 8, opacity: 0.5 }} />
          <div style={{ height: 44, borderRadius: 10, background: 'var(--color-surface-3)', opacity: 0.5 }} />
        </div>
      )}

      {/* 未登录引导 · 保留登录 CTA + 词库预览入口，让访客也能进入公开词表 */}
      {!authLoading && !user && (
        <>
          <div style={{ textAlign: 'center', padding: '28px 20px 16px' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-ink-1)', marginBottom: 8 }}>{t('vocab.hub_login_to_view', lang)}</p>
            <p style={{ fontSize: 12, color: 'var(--color-ink-3)', marginBottom: 16 }}>{t('vocab.hub_login_sub', lang)}</p>
            <a href="/auth/login?redirect=/vocabulary" style={{ display: 'inline-block', padding: '8px 28px', borderRadius: 999, background: 'var(--color-pink-base)', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>{t('vocab.hub_login_register', lang)}</a>
          </div>
          <div style={{ padding: '0 16px 24px' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 10px' }}>{t('vocab.hub_browse_free', lang)}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <a href="/vocabulary/library?tab=themes" style={{
                display: 'block', padding: '14px 12px', borderRadius: 14,
                background: 'var(--color-surface-2)', border: '1px solid var(--color-border-1)',
                textDecoration: 'none', color: 'var(--color-ink-1)',
              }}>
                <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 4px' }}>{t('vocab.hub_free_themes', lang)}</p>
                <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: 0 }}>{t('vocab.hub_free_themes_sub', lang)}</p>
              </a>
              <a href="/vocabulary/library?tab=levels" style={{
                display: 'block', padding: '14px 12px', borderRadius: 14,
                background: 'var(--color-surface-2)', border: '1px solid var(--color-border-1)',
                textDecoration: 'none', color: 'var(--color-ink-1)',
              }}>
                <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 4px' }}>{t('vocab.hub_free_levels', lang)}</p>
                <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: 0 }}>{t('vocab.hub_free_levels_sub', lang)}</p>
              </a>
              <a href="/vocabulary/library?tab=expressions" style={{
                display: 'block', padding: '14px 12px', borderRadius: 14, gridColumn: '1 / -1',
                background: 'var(--color-pink-soft)', border: '1px solid var(--color-pink-base)',
                textDecoration: 'none', color: 'var(--color-ink-1)',
              }}>
                <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Sparkles size={13} style={{ color: 'var(--color-pink-strong)' }} />
                  {t('vocab.hub_free_expr', lang)}
                </p>
                <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: 0 }}>{t('vocab.hub_free_expr_sub', lang)}</p>
              </a>
            </div>
          </div>
        </>
      )}
      {!(authLoading || !user) && (<>
      {/* 首屏数据加载失败提示 */}
      {homeLoadError && !loading && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', marginBottom: 12, borderRadius: 'var(--radius-md)', background: 'var(--color-surface-3)', border: '1px solid var(--color-border-2)' }}>
          <span style={{ fontSize: 13, color: 'var(--color-ink-2)' }}>{t('vocab.hub_data_load_failed', lang)}</span>
          <button
            onClick={() => {
              setHomeLoadError(false);
              setLoading(true);
              fetch('/api/vocabulary/home', { cache: 'no-store' })
                .then(r => r.json())
                .then(data => {
                  setQuickStats(data?.stats ?? null);
                  setWordBooks(Array.isArray(data?.books) ? data.books : []);
                  if (data?.dailyGoalWords) setDailyGoal(data.dailyGoalWords);
                })
                .catch(() => setHomeLoadError(true))
                .finally(() => setLoading(false));
            }}
            style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-pink-strong)', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 18px', minHeight: 44 }}
          >
            {t('vocab.hub_reload', lang)}
          </button>
        </div>
      )}
      <div className="learn-enter" style={{ '--i': 1 } as React.CSSProperties}>
      <Section spacing="normal">
        <Card variant="hero" tone="pink" padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-pink-base)', display: 'inline-block' }} />
              <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--color-pink-strong)' }}>{t('vocab.hub_today_flashcard', lang)}</span>
            </div>
            <Button
              variant="primary"
              tone="pink"
              size="sm"
              icon={<Target size={11} />}
              onClick={() => setShowGoalPicker(true)}
            >
              {t('vocab.hub_review_plan', lang)}
            </Button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
            <button
              onClick={() => router.push('/vocabulary/review-pool')}
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
                {t('vocab.hub_due_review', lang)}{s.dueReview > 0 ? ' →' : ''}
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
              <p style={{ fontSize: 10, color: 'var(--color-ink-3)', margin: '4px 0 0' }}>{t('vocab.hub_recommend_new', lang)}</p>
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
                  {dailyGoal > 0 && s.total > 0 && s.total - s.mastered > 0 ? Math.ceil((s.total - s.mastered) / dailyGoal) : '—'}
                </p>
              )}
              <p style={{ fontSize: 10, color: 'var(--color-ink-3)', margin: '4px 0 0' }}>{t('vocab.hub_est_days', lang)}</p>
            </div>
          </div>
          {loading ? (
            <Button variant="primary" tone="pink" fullWidth size="lg" disabled>
              {t('common.loading', lang)}
            </Button>
          ) : (
            <Link href={s.total === 0 ? '/vocabulary/library' : '/review'} style={{ textDecoration: 'none' }}>
              <Button variant="primary" tone="pink" fullWidth size="lg">
                {s.total === 0 ? t('vocab.hub_import_first', lang) : s.dueReview === 0 && s.newWords === 0 ? t('vocab.hub_all_done', lang) : t('vocab.hub_start_flashcard', lang)}
              </Button>
            </Link>
          )}
        </Card>
      </Section>
      </div>

      {showGoalPicker && (
        <GoalWheelPicker
          current={dailyGoal}
          unmastered={s.total - s.mastered}
          onClose={() => setShowGoalPicker(false)}
          onConfirm={async (n) => {
            setDailyGoal(n);
            setShowGoalPicker(false);
            updateProfile({ dailyGoalWords: n }).catch(() => {});
          }}
        />
      )}

      {/* Library entry */}
      <div className="learn-enter" style={{ '--i': 2 } as React.CSSProperties}>
      <Section spacing="normal">
        <EntryCard
          href="/vocabulary/library"
          icon={<Library size={20} strokeWidth={1.75} />}
          label={t('vocab.hub_lib_label', lang)}
          detail={t('vocab.hub_lib_detail', lang)}
          tone="purple"
          layout="row"
          cta={t('vocab.hub_lib_enter', lang)}
        />
        <div style={{ display: 'flex', gap: 8, marginTop: 10, overflowX: 'auto', paddingBottom: 2 }} className="scrollbar-none">
          {[
            { tab: 'levels', label: t('vocab.hub_q_levels', lang) },
            { tab: 'yonsei', label: t('vocab.hub_q_yonsei', lang) },
            { tab: 'themes', label: t('vocab.hub_q_themes', lang) },
            { tab: 'expressions', label: t('vocab.hub_q_expressions', lang), hot: true },
            { tab: 'dictionary', label: t('vocab.hub_q_dictionary', lang) },
          ].map((q) => (
            <Link
              key={q.tab}
              href={`/vocabulary/library?tab=${q.tab}`}
              style={{
                flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '7px 14px', borderRadius: 999,
                background: q.hot ? 'var(--color-pink-soft)' : 'var(--color-surface-2)',
                border: `1px solid ${q.hot ? 'var(--color-pink-base)' : 'var(--color-border-1)'}`,
                color: q.hot ? 'var(--color-pink-strong)' : 'var(--color-ink-2)',
                fontSize: 12.5, fontWeight: 600, textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {q.hot && <Sparkles size={12} />}
              {q.label}
            </Link>
          ))}
        </div>
      </Section>

      {/* Word books */}
      <Section
        title={t('vocab.hub_my_books', lang)}
        action={wordBooks.length > 0 ? { label: t('vocab.hub_new', lang), href: '/vocabulary/books' } : undefined}
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
                {t('vocab.hub_new_first_book', lang)}
              </div>
            </Link>
          ) : (
            <>
              {(() => {
                // 一次算出每本已掌握数，避免每张卡内联 filter
                const masteredIdSet = new Set(allWords.filter(w => w.mastery === 'mastered').map(w => w.id));
                return wordBooks.slice(0, 4).map((book) => {
                  const total = book.wordIds.length;
                  const mastered = book.wordIds.filter(id => masteredIdSet.has(id)).length;
                  const progress = total > 0 ? Math.round((mastered / total) * 100) : 0;
                  return (
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
                          {total === 0
                            ? t('vocab.hub_book_empty', lang)
                            : t('vocab.hub_book_progress', lang, { mastered, total, pct: progress })}
                        </span>
                        {total > 0 && (
                          <div style={{ height: 3, borderRadius: 999, background: 'var(--border-default)', overflow: 'hidden', marginTop: 4 }}>
                            <div style={{
                              height: '100%',
                              width: `${progress}%`,
                              background: progress >= 100 ? 'var(--color-mint-strong)' : 'var(--color-pink-base)',
                              transition: 'width 0.5s',
                            }} />
                          </div>
                        )}
                      </div>
                      <ChevronRight size={16} color="var(--color-ink-4)" />
                    </Card>
                  );
                });
              })()}
              {wordBooks.length > 4 && (
                <Link
                  href="/vocabulary/books"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                    padding: '10px 0', fontSize: 12, fontWeight: 700, color: 'var(--color-pink-strong)',
                    textDecoration: 'none',
                  }}
                >
                  {t('vocab.hub_view_all_books', lang, { n: wordBooks.length })} <ArrowRight size={12} />
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
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>{t('vocab.hub_my_sentences', lang)}</p>
            <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
              {t('vocab.hub_sentences_detail', lang)}
            </p>
          </div>
          <ChevronRight size={18} color="var(--color-ink-4)" />
        </Card>
      </Section>
      </div>
      </>)}
    </div>
    {deleteModals}
    </>
  );
}

function VocabularyPageInner() {
  const isDesktop = useIsDesktop();
  const searchParams = useSearchParams();
  // 桌面 hub 没有「我的句子」面板，卡片跳 ?tab=sentences 时回落到通用视图渲染句子 tab
  const wantsSubTab = searchParams.get('tab') === 'sentences';

  if (isDesktop && !wantsSubTab) return <DesktopVocabularyPage />;

  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center py-20"><div className="w-6 h-6 rounded-full border-2 border-[var(--pink-primary)] border-t-transparent animate-spin" /></div>}>
      <VocabularyContent />
    </Suspense>
  );
}

export default function VocabularyPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center py-20"><div className="w-6 h-6 rounded-full border-2 border-[var(--pink-primary)] border-t-transparent animate-spin" /></div>}>
      <VocabularyPageInner />
    </Suspense>
  );
}
