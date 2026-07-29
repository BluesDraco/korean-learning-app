'use client';

import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight, Loader2, CheckCircle, RotateCcw, Shuffle, Star, ArrowLeftRight } from 'lucide-react';

const DIRECTION_KEY = 'flashcards-direction';
type FlashDirection = 'ko-zh' | 'zh-ko';
import { db, ensureFavoritesBook, FAVORITES_BOOK_ID } from '@/lib/db';
import { speakWord, speakWordRepeated, speak, cancelSpeech } from '@/lib/tts';
import type { YonseiUnit, YonseiWord } from '@/data/yonsei-books';
import { loadVitaminUnit } from '@/lib/dataLoader';
import { TappableText } from '@/components/TappableText';
import { saveProgress, loadProgress, TTL_FLASHCARD } from '@/lib/progress-storage';
import { useToast } from '@/hooks/useToast';
import GrammarExplainBubble from '@/components/GrammarExplainBubble';
import { TracePad } from '@/components/vocabulary/TracePad';
import { RepeatToggleButton } from '@/components/vocabulary/RepeatToggleButton';
import { SentenceBookmarkButton } from '@/components/vocabulary/SentenceBookmarkButton';
import { t } from '@/lib/i18n';
import { getFlashcardTheme, applyFlashcardTheme } from '@/lib/flashcardTheme';
import { useLang } from '@/components/LangProvider';

type CardWord = YonseiWord & { mastery: 'new' | 'learning' | 'reviewing' | 'mastered' };

function VitaminFlashcardsContent() {
  const { lang } = useLang();
  const { unitId } = useParams<{ unitId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterNew = searchParams.get('filter') === 'new';

  const [unit, setUnit] = useState<YonseiUnit | null | undefined>(undefined);

  const [words, setWords] = useState<CardWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const [displayWords, setDisplayWords] = useState<typeof words>([]);
  const [revealed, setRevealed] = useState(false);
  const [direction, setDirection] = useState<FlashDirection>('ko-zh');

  useEffect(() => {
    try {
      applyFlashcardTheme(getFlashcardTheme()); // 兜底重贴闪卡配色，防 FOUC 脚本竞态/SPA 导航丢失导致回退默认蓝色
      const v = localStorage.getItem(DIRECTION_KEY);
      if (v === 'zh-ko') setDirection('zh-ko');
    } catch { /* ignore */ }
  }, []);

  const toggleDirection = () => {
    setDirection(prev => {
      const next: FlashDirection = prev === 'ko-zh' ? 'zh-ko' : 'ko-zh';
      try { localStorage.setItem(DIRECTION_KEY, next); } catch { /* ignore */ }
      setRevealed(false);
      return next;
    });
  };
  const [swipeOffset, setSwipeOffset] = useState(0);
  const dirLockRef = useRef<'h' | 'v' | null>(null);
  const swipeOffsetRef = useRef(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const isSwipingRef = useRef(false);
  const swipeRafRef = useRef<number | null>(null);
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null);
  const [masteredSet, setMasteredSet] = useState<Set<string>>(new Set());
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const playAudioRef = useRef<(() => void) | null>(null);
  const [completed, setCompleted] = useState(false);
  const [hasSeenHint, setHasSeenHint] = useState(false);
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());
  const { showToast } = useToast();
  const progressInitialized = useRef(false);

  useEffect(() => {
    let cancelled = false;
    loadVitaminUnit(unitId).then((found) => {
      if (cancelled) return;
      setUnit(found ?? null);
    }).catch(() => { if (!cancelled) setUnit(null); });
    return () => { cancelled = true; };
  }, [unitId]);

  useEffect(() => {
    if (unit === undefined) return;
    if (unit === null) { router.replace('/vocabulary/library?tab=yonsei'); return; }

    (async () => {
      try {
        const koreanWords = new Set(unit.words.map(w => w.word));
        const allUserWords = await db.words.toArray();
        const userWords = allUserWords.filter(w => koreanWords.has(w.word));
        const masteryMap = new Map(userWords.map(w => [w.word, w.mastery]));
        const mSet = new Set(userWords.filter(w => w.mastery === 'mastered').map(w => w.word));
        setMasteredSet(mSet);

        const sorted = [...unit.words].sort((a, b) => {
          const ma = masteryMap.get(a.word) ?? 'new';
          const mb = masteryMap.get(b.word) ?? 'new';
          if (ma === 'mastered' && mb !== 'mastered') return 1;
          if (ma !== 'mastered' && mb === 'mastered') return -1;
          return 0;
        });

        let filtered = sorted;
        if (filterNew) filtered = sorted.filter(w => (masteryMap.get(w.word) ?? 'new') !== 'mastered');
        setWords(filtered.map(w => ({ ...w, mastery: (masteryMap.get(w.word) ?? 'new') as CardWord['mastery'] })));
      } finally {
        setLoading(false);
      }
    })();
  }, [unit, router, filterNew]);

  const SESSION_KEY = `fc-progress-vitamin-${unitId}`;

  // sync displayWords with words, restoring session progress if available
  // progressInitialized guard ensures we only restore once, mastery updates won't reset position
  useEffect(() => {
    if (words.length === 0) return;
    if (progressInitialized.current) {
      setDisplayWords(prev => prev.map(w => {
        const updated = words.find(x => x.word === w.word);
        return updated ?? w;
      }));
      return;
    }
    progressInitialized.current = true;
    const saved = loadProgress<{ idx: number; order?: string[] }>(SESSION_KEY, TTL_FLASHCARD);
    if (saved) {
      const { idx, order } = saved;
      if (order && order.length === words.length) {
        const map = new Map(words.map(w => [w.word, w]));
        const restored = order.map(k => map.get(k)).filter(Boolean) as typeof words;
        if (restored.length === words.length) {
          setDisplayWords(restored);
          setShuffled(true);
          setCurrentIdx(Math.min(idx, restored.length - 1));
          return;
        }
      }
      setDisplayWords([...words]);
      setCurrentIdx(Math.min(idx, words.length - 1));
      return;
    }
    setDisplayWords(words);
    setCurrentIdx(0);
  }, [words, SESSION_KEY]);

  // persist progress on every card change
  useEffect(() => {
    if (displayWords.length === 0) return;
    const order = shuffled ? displayWords.map(w => w.word) : undefined;
    saveProgress(SESSION_KEY, { idx: currentIdx, order }, TTL_FLASHCARD);
  }, [currentIdx, displayWords, shuffled, SESSION_KEY]);

  // auto-play audio when card changes (also fires on shuffle-from-index-0)
  const currentWordText = displayWords[currentIdx]?.word ?? '';
  useEffect(() => {
    if (loading || !currentWordText) return;
    const raf = requestAnimationFrame(() => playAudioRef.current?.());
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, loading, currentWordText]);

  playAudioRef.current = () => {
    const w = displayWords[currentIdx];
    if (!w) return;
    cancelSpeech();
    speakWordRepeated(w.word, 0.85).catch(() => {});
  };

  const toggleShuffle = () => {
    if (shuffled) {
      setDisplayWords([...words]);
      showToast(t('vocab.fc_restore_order', lang), 'info');
    } else {
      const arr = [...words];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setDisplayWords(arr);
      showToast(t('vocab.fc_shuffled', lang), 'info');
    }
    setShuffled(v => !v);
    setCurrentIdx(0);
    setRevealed(false);
  };

  const goTo = useCallback((idx: number) => {
    if (completed) return;
    if (idx < 0) return;
    if (idx >= displayWords.length) { setCompleted(true); return; }
    setRevealed(false);
    setSwipeOffset(0);
    setExiting(null);
    setCurrentIdx(idx);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [displayWords.length, completed]);

  // Load favorites —— 收藏本存的是 word.id，回读时映射回韩文用于星标显示
  useEffect(() => {
    (async () => {
      const favBook = await db.wordBooks.get(FAVORITES_BOOK_ID);
      if (favBook && favBook.wordIds.length) {
        const rows = await db.words.where('id').anyOf(favBook.wordIds).toArray();
        setFavoritedIds(new Set(rows.map(r => r.word)));
      }
    })().catch(() => {});
  }, []);

  // 教材词在 IndexedDB 无行时先建一条 new 行，返回其 id（收藏本按 id 存取）
  const ensureFavRow = async (w: CardWord): Promise<string> => {
    const existing = await db.words.where('word').equals(w.word).first();
    if (existing) return existing.id;
    const id = crypto.randomUUID();
    const now = Date.now();
    await db.words.put({
      id,
      word: w.word,
      pronunciation: w.pronunciation,
      meaning: w.meaning,
      partOfSpeech: w.partOfSpeech,
      examples: w.examples.map(ex => ({ text: ex.text, translation: ex.translation, source: 'manual' as const })),
      mastery: 'new',
      srsLevel: 0,
      easeFactor: 2.5,
      interval: 0,
      nextReview: now,
      createdAt: now,
      lastReviewed: null,
      source: 'vitamin',
    });
    return id;
  };

  // 串行化 + 基于 DB 最新数据判断 isFav，避免快速点两次互相覆盖
  const favQueueRef = useRef<Promise<unknown>>(Promise.resolve());
  const toggleFavorite = (w: CardWord) => {
    const next = favQueueRef.current.then(async () => {
      const bookId = await ensureFavoritesBook();
      const favBook = await db.wordBooks.get(bookId);
      if (!favBook) return;
      const now = Date.now();
      const existing = await db.words.where('word').equals(w.word).first();
      const rowId = existing?.id;
      if (rowId && favBook.wordIds.includes(rowId)) {
        await db.wordBooks.update(bookId, { wordIds: favBook.wordIds.filter(id => id !== rowId), updatedAt: now });
        setFavoritedIds(prev => { const s = new Set(prev); s.delete(w.word); return s; });
      } else {
        const id = rowId ?? await ensureFavRow(w);
        await db.wordBooks.update(bookId, { wordIds: [...new Set([...favBook.wordIds, id])], updatedAt: now });
        setFavoritedIds(prev => new Set(prev).add(w.word));
      }
    });
    favQueueRef.current = next.catch(() => {});
    return next;
  };

  const flipCard = () => {
    setRevealed(r => {
      const next = !r;
      if (next) {
        const cur = displayWords[currentIdx];
        if (cur && cur.mastery === 'new') {
          (async () => {
            try {
              // 教材词首次翻卡即入库为 learning（无行则建行），否则学习进度读不回
              const id = await ensureFavRow(cur);
              await db.words.update(id, { mastery: 'learning', srsLevel: 1, interval: 1, nextReview: Date.now() });
              setWords(prev => prev.map(w => w.word === cur.word ? { ...w, mastery: 'learning' } : w));
            } catch {
              alert(t('vocab.fc_progress_save_failed', lang));
            }
          })();
        }
      }
      return next;
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(currentIdx - 1);
      else if (e.key === 'ArrowRight') goTo(currentIdx + 1);
      else if (e.key === ' ') { e.preventDefault(); flipCard(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIdx, goTo]);

  const toggleMastered = async (w: CardWord) => {
    const now = Date.now();
    const isMastered = masteredSet.has(w.word);
    const rows = await db.words.where('word').equals(w.word).toArray();

    try {
      if (isMastered) {
        if (rows.length) {
          await db.words.bulkUpdate(
            rows.map(r => ({ id: r.id, mastery: 'learning', srsLevel: 1, interval: 1, nextReview: now }))
          );
        }
        setMasteredSet(prev => { const s = new Set(prev); s.delete(w.word); return s; });
        setWords(prev => prev.map(c => c.word === w.word ? { ...c, mastery: 'learning' } : c));
      } else {
        if (rows.length) {
          await db.words.bulkUpdate(
            rows.map(r => ({ id: r.id, mastery: 'mastered', srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now }))
          );
        } else {
          await db.words.put({
            id: crypto.randomUUID(),
            word: w.word,
            pronunciation: w.pronunciation,
            meaning: w.meaning,
            partOfSpeech: w.partOfSpeech,
            examples: w.examples.map(ex => ({ text: ex.text, translation: ex.translation, source: 'manual' as const })),
            mastery: 'mastered',
            srsLevel: 5,
            easeFactor: 2.5,
            interval: 21,
            nextReview: now + 21 * 86400000,
            createdAt: now,
            lastReviewed: now,
            source: 'vitamin',
          });
        }
        setMasteredSet(prev => new Set(prev).add(w.word));
        setWords(prev => prev.map(c => c.word === w.word ? { ...c, mastery: 'mastered' } : c));
      }
    } catch {
      alert(t('vocab.fc_save_failed', lang));
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button, canvas')) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    dirLockRef.current = null;
    setExiting(null);
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('button, canvas')) return;
      if (dirLockRef.current === 'h') e.preventDefault();
    };
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', onTouchMove);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button, canvas')) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (dirLockRef.current === null) {
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);
      if (adx < 8 && ady < 8) return;
      dirLockRef.current = adx > ady * 1.2 ? 'h' : 'v';
    }
    if (dirLockRef.current === 'h') {
      isSwipingRef.current = true;
      swipeOffsetRef.current = dx;
      if (!swipeRafRef.current) {
        swipeRafRef.current = requestAnimationFrame(() => {
          swipeRafRef.current = null;
          setIsSwiping(true);
          setSwipeOffset(swipeOffsetRef.current);
        });
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isSwipingRef.current) return;
    setIsSwiping(false);
    isSwipingRef.current = false;
    const offset = swipeOffsetRef.current;
    swipeOffsetRef.current = 0;
    // iPad 大屏 threshold 80→60
    if (offset > 60 && currentIdx > 0) setExiting('right');
    else if (offset < -60 && currentIdx < displayWords.length - 1) setExiting('left');
    else if (offset < -60 && currentIdx === displayWords.length - 1) { setSwipeOffset(0); setCompleted(true); }
    else setSwipeOffset(0);
  };

  const handleTransitionEnd = () => {
    if (exiting === 'left') goTo(currentIdx + 1);
    else if (exiting === 'right') goTo(currentIdx - 1);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, canvas')) return;
    if (!isSwiping && Math.abs(swipeOffset) < 15) {
      if (!revealed) setHasSeenHint(true);
      flipCard();
    }
  };

  const getTransform = () => {
    if (exiting === 'left') return 'translateX(-120%) rotate(-8deg)';
    if (exiting === 'right') return 'translateX(120%) rotate(8deg)';
    if (isSwiping) return `translateX(${swipeOffset}px) rotate(${swipeOffset * 0.04}deg)`;
    return 'translateX(0) rotate(0deg)';
  };

  if (loading || unit === undefined) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <Loader2 size={32} className="animate-spin" style={{ color: 'var(--text-muted)' }} />
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{t('vocab.loading_word', lang)}</span>
      </div>
    );
  }

  if (!unit || words.length === 0) {
    return (
      <div className="py-4 space-y-4 px-4">
        <Link href={`/vocabulary/vitamin/${unitId}`} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={18} /> {t('common.back', lang)}
        </Link>
        <div className="text-center py-20">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{t('vocab.fc_no_words', lang)}</p>
        </div>
      </div>
    );
  }

  const word = displayWords[currentIdx];
  if (!word) return null;
  const isMastered = masteredSet.has(word.word);
  const progress = ((currentIdx + 1) / displayWords.length) * 100;
  const masteredCount = masteredSet.size;

  return (
    <div
      className="flex flex-col px-4 md:px-8 pt-4 max-w-2xl md:max-w-none mx-auto w-full"
      style={{ minHeight: 'calc(100dvh - 56px - env(safe-area-inset-bottom, 0px))', paddingBottom: 'calc(56px + 80px + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Header */}
      <div className="no-touch-zone flex items-center gap-2 mb-4 shrink-0">
        <Link href={`/vocabulary/vitamin/${unitId}`} style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-[15px] font-bold truncate" style={{ color: 'var(--fc-meaning-color)' }}>
            {unit.bookTitle} · {unit.title}
          </h1>
          <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
            {t('vocab.fc_mastered_of', lang, { mastered: masteredCount, total: words.length })}
          </p>
        </div>
        <button
          onClick={toggleDirection}
          className="h-8 px-2.5 rounded-full flex items-center gap-1 text-[11px] font-bold transition-colors"
          style={{ border: '1px solid var(--fc-nav-border)', background: direction === 'zh-ko' ? 'var(--fc-dot-active)' : 'var(--fc-nav-bg)', color: direction === 'zh-ko' ? '#fff' : 'var(--fc-nav-color)' }}
          title={direction === 'ko-zh' ? t('vocab.fc_to_zh_kr', lang) : t('vocab.fc_to_kr_zh', lang)}
        >
          <ArrowLeftRight size={12} />
          {direction === 'ko-zh' ? t('vocab.fc_kr_zh', lang) : t('vocab.fc_zh_kr', lang)}
        </button>
        <button
          onClick={toggleShuffle}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ border: '1px solid var(--fc-nav-border)', background: shuffled ? 'var(--fc-dot-active)' : 'var(--fc-nav-bg)', color: shuffled ? '#fff' : 'var(--fc-nav-color)' }}
          title={shuffled ? t('vocab.fc_cancel_shuffle', lang) : t('vocab.fc_shuffle', lang)}
        >
          <Shuffle size={14} />
        </button>
        <button
          onClick={e => { e.stopPropagation(); toggleFavorite(word); }}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ border: '1px solid var(--fc-card-border)', color: favoritedIds.has(word.word) ? 'var(--color-gold-base)' : 'var(--text-muted)', background: favoritedIds.has(word.word) ? 'var(--color-gold-soft)' : 'transparent' }}
          title={favoritedIds.has(word.word) ? t('vocab.fc_cancel_fav', lang) : t('vocab.fc_fav', lang)}
        >
          <Star size={14} fill={favoritedIds.has(word.word) ? 'var(--color-gold-base)' : 'none'} />
        </button>
        <span className="text-[12px] font-black tabular-nums" style={{ color: 'var(--color-ink-3)' }}>
          {currentIdx + 1} / {displayWords.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-[5px] rounded-full mb-5 shrink-0 overflow-hidden" style={{ background: 'var(--fc-progress-bg)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--color-mint-base), var(--color-pink-base))' }}
        />
      </div>

      {/* Card */}
      <div className="flex justify-center">
        <div
          className="w-full max-w-sm md:max-w-2xl"
          ref={cardRef}
          style={{ cursor: 'pointer', userSelect: 'none' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleCardClick}
          onTransitionEnd={handleTransitionEnd}
        >
          <div
            className="flashcard-scale rounded-[28px] flex flex-col"
            style={{
              background: 'var(--fc-card-bg)',
              border: isMastered ? '1.5px solid var(--fc-btn-mastered-border)' : '1px solid var(--fc-card-border)',
              boxShadow: '0 20px 60px var(--fc-card-shadow)',
              transform: getTransform(),
              transition: isSwiping ? 'none' : 'transform 0.32s ease-out',
              minHeight: '360px',
              padding: '24px',
            }}
          >
            {/* Repeat toggle + mastery badge + audio */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <RepeatToggleButton />
                {isMastered && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--fc-badge-bg)', color: 'var(--fc-badge-color)' }}>{t('vocab.mastered', lang)}</span>
                )}
              </div>
              <button
                onClick={e => { e.stopPropagation(); speakWord(word.word); }}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ border: '1px solid var(--fc-audio-border)', color: 'var(--fc-audio-color)' }}
              >
                <Volume2 size={14} />
              </button>
            </div>

            {/* Front */}
            <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
              {direction === 'ko-zh' ? (
                <div className="ko-text text-[44px] font-black leading-tight tracking-tight mb-3" style={{ color: 'var(--fc-word-color)', wordBreak: 'keep-all' }}>
                  {word.word}
                </div>
              ) : (
                <div className="text-[32px] font-black leading-tight mb-3" style={{ color: 'var(--fc-word-color)' }}>
                  {word.meaning}
                </div>
              )}
              {!revealed && !hasSeenHint && (
                <div className="text-[13px] font-semibold mt-3" style={{ color: 'var(--fc-hint-color)' }}>
                  {direction === 'ko-zh' ? t('vocab.fc_tap_meaning', lang) : t('vocab.fc_tap_kr', lang)}
                </div>
              )}
            </div>

            {/* Back */}
            {revealed && (
              <div className="border-t pt-4 space-y-3" style={{ borderColor: 'var(--fc-divider)' }}>
                {direction === 'zh-ko' && (
                  <div className="ko-text text-[32px] font-black text-center leading-tight" style={{ color: 'var(--fc-meaning-color)', wordBreak: 'keep-all' }}>
                    {word.word}
                  </div>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  {word.pronunciation && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded" style={{ background: 'var(--fc-roman-bg)', color: 'var(--fc-roman-color)' }}>
                      [{word.pronunciation}]
                    </span>
                  )}
                  {word.partOfSpeech && (
                    <span className="text-[11px] font-medium px-1.5 py-0.5 rounded" style={{ background: 'var(--fc-pos-bg)', color: 'var(--fc-pos-color)' }}>
                      {word.partOfSpeech}
                    </span>
                  )}
                </div>

                {direction === 'ko-zh' && (
                  <div className="rounded-[16px] p-3.5" style={{ background: 'var(--fc-meaning-bg)', border: '1px solid var(--fc-meaning-border)' }}>
                    <strong className="text-[17px] font-black" style={{ color: 'var(--fc-meaning-color)' }}>{word.meaning}</strong>
                  </div>
                )}

                {word.examples && word.examples.slice(0, 2).map((ex, i) => (
                  <div key={i} className="rounded-[14px] px-3.5 py-2" style={{ background: 'var(--fc-example-bg)' }}>
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-[16px] leading-relaxed" style={{ color: 'var(--fc-example-ko)' }}>
                          <TappableText text={ex.text} highlightWord={word.word} source="闪卡" highlightColor="var(--fc-example-hi-color)" underlineColor="var(--fc-example-hi-color)" />
                        </p>
                        <p className="text-[12px] mt-0.5" style={{ color: 'var(--fc-example-zh)' }}>{ex.translation}</p>
                      </div>
                      <SentenceBookmarkButton korean={ex.text} chinese={ex.translation} sourceId={`vitamin-${unitId}`} sourceTitle={unit.title} />
                      <button
                        onClick={e => { e.stopPropagation(); speakWord(ex.text); }}
                        className="shrink-0 p-1.5 -m-0.5 rounded-lg"
                        style={{ color: 'var(--fc-example-zh)' }}
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <GrammarExplainBubble sentence={ex.text} translation={ex.translation} variant="compact" />
                    </div>
                  </div>
                ))}

                <TracePad word={word.word} />

                <div className="flex gap-2 mt-1">
                  <button
                    onClick={e => { e.stopPropagation(); toggleMastered(word); }}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-[14px] font-semibold text-[14px] transition-colors w-full"
                    style={isMastered
                      ? { background: 'var(--fc-badge-bg)', color: 'var(--fc-badge-color)', border: '1.5px solid var(--fc-btn-mastered-border)' }
                      : { background: 'var(--fc-roman-bg)', color: 'var(--fc-roman-color)', border: '1.5px solid var(--fc-btn-unmastered-border)' }
                    }
                  >
                    {isMastered ? <><RotateCcw size={15} /> {t('vocab.unmaster', lang)}</> : <><CheckCircle size={15} /> {t('vocab.mark_mastered', lang)}</>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation — fixed 悬浮胶囊 */}
      <div
        className="flex items-center justify-center gap-4"
        style={{
          position: 'fixed',
          left: 12, right: 12,
          bottom: 'calc(56px + env(safe-area-inset-bottom, 0px) + 8px)',
          zIndex: 40,
          maxWidth: 640,
          marginLeft: 'auto', marginRight: 'auto',
          padding: '10px 14px',
          borderRadius: 999,
          background: 'var(--bg-card, #fff)',
          border: '1px solid var(--fc-nav-border)',
          boxShadow: '0 8px 32px rgba(78,52,46,.16)',
        }}
      >
        <button
          onClick={() => goTo(currentIdx - 1)}
          disabled={currentIdx === 0}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all disabled:opacity-25 shrink-0"
          style={{ background: 'var(--fc-nav-bg)', border: '1px solid var(--fc-nav-border)', color: 'var(--fc-nav-color)' }}
          aria-label={t('vocab.fc_prev', lang)}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-1.5">
          {displayWords.slice(Math.max(0, currentIdx - 3), Math.min(displayWords.length, currentIdx + 4)).map((_, i) => {
            const realIdx = Math.max(0, currentIdx - 3) + i;
            return (
              <div
                key={realIdx}
                className="rounded-full transition-all"
                style={{
                  width: realIdx === currentIdx ? 20 : 6,
                  height: 6,
                  background: realIdx === currentIdx ? 'var(--fc-dot-active)' : 'var(--fc-dot-inactive)',
                }}
              />
            );
          })}
        </div>

        <button
          onClick={() => goTo(currentIdx + 1)}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all shrink-0"
          style={{ background: currentIdx === displayWords.length - 1 ? 'var(--color-pink-soft)' : 'var(--fc-nav-bg)', border: currentIdx === displayWords.length - 1 ? '1.5px solid var(--color-pink-base)' : '1px solid var(--fc-nav-border)', color: currentIdx === displayWords.length - 1 ? 'var(--color-pink-strong)' : 'var(--fc-nav-color)' }}
          aria-label={currentIdx === displayWords.length - 1 ? t('vocab.fc_finish', lang) : t('vocab.fc_next', lang)}
        >
          {currentIdx === displayWords.length - 1 ? <CheckCircle size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {completed && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'rgba(0,0,0,.4)' }}>
          <div style={{ background: 'var(--color-surface-2)', borderRadius: 24, padding: '32px 28px 24px', maxWidth: 340, width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,.15)' }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-ink-1)', marginBottom: 8 }}>{t('vocab.fc_finished', lang)}</h2>
            <p style={{ fontSize: 14, color: 'var(--color-ink-3)', marginBottom: 20, lineHeight: 1.6 }}>
              {t('vocab.fc_total_n', lang, { n: displayWords.length })}<br />
              {unit?.title || t('vocab.fc_textbook_default', lang)} · {t('vocab.mastered', lang)} {masteredSet.size}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => { setCompleted(false); setCurrentIdx(0); setRevealed(false); }} style={{ flex: 1, padding: '12px 0', borderRadius: 999, border: '1px solid var(--color-border-2)', background: 'transparent', color: 'var(--color-ink-2)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                <RotateCcw size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />{t('vocab.fc_again', lang)}
              </button>
              <button onClick={() => router.push(`/vocabulary/vitamin/${unitId}`)} style={{ flex: 1, padding: '12px 0', borderRadius: 999, border: 'none', background: 'var(--color-pink-base)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                {t('vocab.fc_back_to_list', lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VitaminFlashcardsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-32"><Loader2 className="animate-spin" size={24} /></div>}>
      <VitaminFlashcardsContent />
    </Suspense>
  );
}
