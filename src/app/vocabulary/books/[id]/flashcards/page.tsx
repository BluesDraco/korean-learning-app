'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { TappableText } from '@/components/TappableText';
import GrammarExplainBubble from '@/components/GrammarExplainBubble';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight, Loader2, Star, Check, RotateCcw, BookmarkPlus, SlidersHorizontal } from 'lucide-react';
import { AddToBookSheet } from '@/components/vocabulary/AddToBookSheet';
import { ChoiceQuiz } from '@/components/vocabulary/ChoiceQuiz';
import { FlashcardStartScreen } from '@/components/vocabulary/FlashcardStartScreen';
import { TracePad } from '@/components/vocabulary/TracePad';
import { RepeatToggleButton } from '@/components/vocabulary/RepeatToggleButton';
import { useAutoAudio, AutoAudioToggle } from '@/components/vocabulary/AutoAudioToggle';
import { SentenceBookmarkButton } from '@/components/vocabulary/SentenceBookmarkButton';

const DIRECTION_KEY = 'flashcards-direction';
type FlashDirection = 'ko-zh' | 'zh-ko';
import { db, ensureFavoritesBook, FAVORITES_BOOK_ID } from '@/lib/db';
import { speakWord, speakWordRepeated, cancelSpeech } from '@/lib/tts';
import { getEntryByKorean } from '@/data/vocabulary/index';
import { displayRoman } from '@/lib/dictionary';
import type { WordBook, Word, WordEntry } from '@/types';
import { saveProgress, loadProgress, TTL_FLASHCARD } from '@/lib/progress-storage';
import { WordTapSheet } from '@/components/WordTapSheet';
import { useToast } from '@/hooks/useToast';
import { t } from '@/lib/i18n';
import { getFlashcardTheme, applyFlashcardTheme } from '@/lib/flashcardTheme';
import { useLang } from '@/components/LangProvider';

export default function FlashcardStudyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { lang } = useLang();
  const [book, setBook] = useState<WordBook | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const [displayWords, setDisplayWords] = useState<typeof words>([]);
  const [revealed, setRevealed] = useState(false);
  const [direction, setDirection] = useState<FlashDirection>('ko-zh');
  const [studyMode, setStudyMode] = useState<'flip' | 'quiz'>('flip');
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [quizRound, setQuizRound] = useState(0);
  const [started, setStarted] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  useEffect(() => {
    try {
      applyFlashcardTheme(getFlashcardTheme());
      const v = localStorage.getItem(DIRECTION_KEY);
      if (v === 'zh-ko') setDirection('zh-ko');
      if (localStorage.getItem('flashcards-study-mode') === 'quiz') setStudyMode('quiz');
      if (localStorage.getItem('flashcards-quiz-pace') === 'manual') setAutoAdvance(false);
    } catch { /* ignore */ }
  }, []);

  const MIN_QUIZ_WORDS = 4;
  const [autoAudio, toggleAutoAudio] = useAutoAudio();

  const swipeOffsetRef = useRef(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const isSwipingRef = useRef(false);
  const swipeRafRef = useRef<number | null>(null);
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null);
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());
  const [entryCache, setEntryCache] = useState<WordEntry | null>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const playAudioRef = useRef<(() => void) | null>(null);
  const [completed, setCompleted] = useState(false);
  const [hasSeenHint, setHasSeenHint] = useState(false);
  const [tapWord, setTapWord] = useState<string | null>(null);
  const [addToBookWord, setAddToBookWord] = useState<Word | null>(null);
  const { showToast } = useToast();
  const progressInitialized = useRef(false);

  useEffect(() => {
    const load = async () => {
      try {
        const b = await db.wordBooks.get(id);
        if (!b) { setLoading(false); return; }
        setBook(b);
        const loaded = await db.words.where('id').anyOf(b.wordIds).toArray();
        const wordList = loaded.filter((w): w is Word => w != null);
        setWords(wordList);
        // Load favorites state
        const favBook = await db.wordBooks.get(FAVORITES_BOOK_ID);
        if (favBook) {
          const favWordIds = new Set(favBook.wordIds);
          const favSet = new Set(wordList.filter(w => favWordIds.has(w.id)).map(w => w.id));
          setFavoritedIds(favSet);
        }
      } catch {
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // sync displayWords with words, restoring session progress if available
  // progressInitialized guard ensures we only restore once per mount
  useEffect(() => {
    if (words.length === 0) return;
    if (progressInitialized.current) {
      // words changed after init (mastery update) — only sync content, keep position
      setDisplayWords(prev => prev.map(w => {
        const updated = words.find(x => x.id === w.id);
        return updated ?? w;
      }));
      return;
    }
    progressInitialized.current = true;
    const KEY = `fc-progress-book-${id}`;
    const saved = loadProgress<{ idx: number; order?: string[] }>(KEY, TTL_FLASHCARD);
    if (saved) {
      const { idx, order } = saved;
      if (order && order.length === words.length) {
        const map = new Map(words.map(w => [w.id, w]));
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
  }, [words, id]);

  // persist progress on every card change (skip until init done)
  useEffect(() => {
    if (!progressInitialized.current) return;
    if (displayWords.length === 0) return;
    const order = shuffled ? displayWords.map(w => w.id) : undefined;
    saveProgress(`fc-progress-book-${id}`, { idx: currentIdx, order }, TTL_FLASHCARD);
  }, [currentIdx, displayWords, shuffled, id]);

  // auto-play audio when card changes (also fires on shuffle-from-index-0)
  const currentWordText = displayWords[currentIdx]?.word ?? '';
  useEffect(() => {
    const isQuiz = studyMode === 'quiz' && words.length >= MIN_QUIZ_WORDS;
    if (!autoAudio || loading || !currentWordText || isQuiz || !started) return;
    const raf = requestAnimationFrame(() => playAudioRef.current?.());
    // 翻卡瞬间同步打断上一张的连读(含 gap 等待中的),不等下一帧 rAF——否则第二张会听到第一张的读音
    return () => { cancelAnimationFrame(raf); cancelSpeech(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoAudio, currentIdx, loading, currentWordText, studyMode]);

  playAudioRef.current = () => {
    if (!autoAudio) return;
    const w = displayWords[currentIdx];
    if (!w) return;
    cancelSpeech();
    speakWordRepeated(w.word, 0.85).catch(() => {});
  };

  const handleStart = (cfg: { mode: 'flip' | 'quiz'; direction: FlashDirection; autoAdvance: boolean; shuffle: boolean }) => {
    setDirection(cfg.direction);
    setStudyMode(cfg.mode);
    setAutoAdvance(cfg.autoAdvance);
    try {
      localStorage.setItem(DIRECTION_KEY, cfg.direction);
      localStorage.setItem('flashcards-study-mode', cfg.mode);
      localStorage.setItem('flashcards-quiz-pace', cfg.autoAdvance ? 'auto' : 'manual');
    } catch { /* ignore */ }
    if (cfg.shuffle) {
      const arr = [...words];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setDisplayWords(arr);
      setShuffled(true);
    } else {
      setDisplayWords([...words]);
      setShuffled(false);
    }
    setCurrentIdx(0);
    setRevealed(false);
    setCompleted(false);
    setQuizRound(r => r + 1);
    setStarted(true);
  };

  const goTo = useCallback((idx: number, list: Word[]) => {
    if (idx < 0 || idx >= list.length) {
      if (idx >= list.length) setCompleted(true);
      return;
    }
    setRevealed(false);
    setSwipeOffset(0);
    setExiting(null);
    setCurrentIdx(idx);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 翻卡模式自动翻页：翻到背面后停留 2.5s 自动进入下一张（切卡/翻回/卸载即清除）
  const isFlipMode = !(studyMode === 'quiz' && words.length >= MIN_QUIZ_WORDS);
  useEffect(() => {
    if (!started || !isFlipMode || !autoAdvance || !revealed || completed) return;
    const timer = setTimeout(() => goTo(currentIdx + 1, displayWords), 2500);
    return () => clearTimeout(timer);
  }, [started, isFlipMode, autoAdvance, revealed, completed, currentIdx, goTo, displayWords]);

  // 收藏操作用 promise 队列串行化 + 基于 DB 最新数据判断 isFav，避免 read-modify-write 快点两次互相覆盖
  const favQueueRef = useRef<Promise<unknown>>(Promise.resolve());
  const toggleFavorite = useCallback(async (w: Word) => {
    const next = favQueueRef.current.then(async () => {
      try {
        const bookId = await ensureFavoritesBook();
        const favBook = await db.wordBooks.get(bookId);
        if (!favBook) return;
        const isFavInDb = favBook.wordIds.includes(w.id);
        const now = Date.now();
        if (isFavInDb) {
          await db.wordBooks.update(bookId, { wordIds: favBook.wordIds.filter(id => id !== w.id), updatedAt: now });
          setFavoritedIds(prev => { const s = new Set(prev); s.delete(w.id); return s; });
        } else {
          await db.wordBooks.update(bookId, { wordIds: [...favBook.wordIds, w.id], updatedAt: now });
          setFavoritedIds(prev => new Set(prev).add(w.id));
        }
      } catch {
        showToast(t('vocab.fc_fav_failed', lang), 'error');
      }
    });
    favQueueRef.current = next.catch(() => {});
    return next;
  }, [showToast]);

  // silent: quiz 答错标 learning 时不弹 toast（ChoiceQuiz 已有红色反馈，避免答错却弹绿色成功提示）
  const setMastery = useCallback(async (w: Word, mastery: 'mastered' | 'learning', silent = false) => {
    // mastered: SRS 拉到 21 天后再来；learning: 立即 due
    // 若只写 mastery 字段，/review 依然按 nextReview <= now 拉出这个词，导致"已掌握"无效
    const now = Date.now();
    const patch = mastery === 'mastered'
      ? { mastery, srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now }
      : { mastery, srsLevel: 1, interval: 1, nextReview: now };
    try {
      await db.words.update(w.id, patch);
      setWords(prev => prev.map(x => x.id === w.id ? { ...x, ...patch } : x));
      setDisplayWords(prev => prev.map(x => x.id === w.id ? { ...x, ...patch } : x));
      if (!silent) showToast(mastery === 'mastered' ? `${t('vocab.mastered', lang)} ✓` : t('vocab.learning', lang), 'success');
    } catch {
      if (!silent) showToast(t('vocab.fc_op_failed', lang), 'error');
    }
  }, [showToast]);

  // 重新学：标 learning 并把当前词移到本轮牌堆末尾稍后再练（currentIdx 不变，抽走当前词后自然落到下一张）
  const relearnWord = (w: Word) => {
    setMastery(w, 'learning', true);
    setRevealed(false);
    setDisplayWords(prev => {
      if (prev.length <= 1) return prev;
      const idx = prev.findIndex(c => c.id === w.id);
      if (idx === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(idx, 1);
      next.push(moved);
      return next;
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load dictionary entry for current word (fallback for examples)
  useEffect(() => {
    const curWord = displayWords[currentIdx];
    if (!curWord) { setEntryCache(null); return; }
    const valid = (curWord.examples ?? []).filter(ex => ex.text && ex.text !== '[object Object]');
    if (valid.length > 0) { setEntryCache(null); return; }
    let cancelled = false;
    // 带助词的短语命中不到 → 剥掉尾部助词再查一次
    const stripParticle = (s: string) => s.replace(/(이랑|에서|부터|까지|보다|처럼|을|를|이|가|은|는|에|의|도|만|과|와|랑)$/, '');
    getEntryByKorean(curWord.word).then(async e => {
      if (cancelled) return;
      if (!e) {
        const stripped = stripParticle(curWord.word);
        if (stripped && stripped !== curWord.word) {
          e = await getEntryByKorean(stripped) ?? undefined;
        }
      }
      if (!cancelled) setEntryCache(e ?? null);
    });
    return () => { cancelled = true; };
  }, [currentIdx, displayWords]);

  // Keyboard
  useEffect(() => {
    if (studyMode === 'quiz' && words.length >= MIN_QUIZ_WORDS) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(currentIdx - 1, displayWords);
      else if (e.key === 'ArrowRight') goTo(currentIdx + 1, displayWords);
      else if (e.key === ' ') { e.preventDefault(); setRevealed(r => !r); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIdx, goTo, displayWords, studyMode, words.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    // 如果起点在按钮上，直接放弃 swipe 判定，把事件让给按钮
    if ((e.target as HTMLElement).closest('button, canvas')) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    swipeOffsetRef.current = 0;
    isSwipingRef.current = false;
    setExiting(null);
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => {
      // 起点在按钮上时不拦默认行为，让点击生效
      if ((e.target as HTMLElement).closest('button, canvas')) return;
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        e.preventDefault();
      }
    };
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', onTouchMove);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    // 起点在按钮上时 handleTouchStart 已 return，touchStartX 还是上次的值——用 isSwipingRef 短路
    if ((e.target as HTMLElement).closest('button, canvas')) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
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
    // threshold 从 80 降到 60，iPad 屏幕大更好划动
    if (offset > 60 && currentIdx > 0) setExiting('right');
    else if (offset < -60 && currentIdx < displayWords.length - 1) setExiting('left');
    else if (offset < -60 && currentIdx === displayWords.length - 1) setExiting('left');
    else setSwipeOffset(0);
  };

  const handleTransitionEnd = () => {
    if (exiting === 'left') {
      if (currentIdx === displayWords.length - 1) setCompleted(true);
      else goTo(currentIdx + 1, displayWords);
    } else if (exiting === 'right') goTo(currentIdx - 1, displayWords);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, canvas')) return;
    if (!isSwiping && Math.abs(swipeOffset) < 15) {
      if (!revealed) setHasSeenHint(true);
      setRevealed(r => !r);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <Loader2 size={32} className="animate-spin" style={{ color: 'var(--text-muted)' }} />
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{t('vocab.loading_word', lang)}</span>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 px-4">
        <p style={{ fontSize: 14, color: 'var(--color-ink-3)' }}>{t('vocab.hub_data_load_failed', lang)}</p>
        <button onClick={() => { setLoadError(false); setLoading(true); window.location.reload(); }} style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-pink-strong)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>{t('vocab.hub_reload', lang)}</button>
      </div>
    );
  }

  if (!book || words.length === 0) {
    return (
      <div className="py-4 space-y-4">
        <Link href={`/vocabulary/books/${id}`} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={18} /> {t('common.back', lang)}
        </Link>
        <div className="text-center py-20">
          <span className="text-5xl block mb-4">📝</span>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{t('vocab.fc_empty_book', lang)}</p>
          <Link href={`/vocabulary/books/${id}`} className="inline-flex items-center px-5 py-2.5 rounded-full text-white text-sm font-bold" style={{ background: 'var(--color-pink-base)' }}>
            {t('vocab.fc_go_add', lang)}
          </Link>
        </div>
      </div>
    );
  }

  const word = displayWords[currentIdx];
  if (!word) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin" style={{ color: 'var(--text-muted)' }} />
      </div>
    );
  }
  const progress = ((currentIdx + 1) / displayWords.length) * 100;
  // <4 词无法凑齐四选一，强制回退翻卡（覆盖 localStorage 恢复的 quiz 模式）
  const effectiveMode = studyMode === 'quiz' && words.length >= MIN_QUIZ_WORDS ? 'quiz' : 'flip';

  const getTransform = () => {
    if (exiting === 'left') return 'translateX(-120%) rotate(-8deg)';
    if (exiting === 'right') return 'translateX(120%) rotate(8deg)';
    if (isSwiping) return `translateX(${swipeOffset}px) rotate(${swipeOffset * 0.04}deg)`;
    return 'translateX(0) rotate(0deg)';
  };

  return (
    <div
      className="flex flex-col px-4 md:px-8 pt-4 max-w-2xl md:max-w-none mx-auto w-full"
      style={{ minHeight: 'calc(100dvh - 56px - env(safe-area-inset-bottom, 0px))', paddingBottom: 'var(--fc-page-pb, calc(56px + 80px + env(safe-area-inset-bottom, 0px)))' }}
    >
      {/* Header */}
      <div className="no-touch-zone flex items-center gap-1.5 mb-4 shrink-0 flex-wrap">
        <Link href={`/vocabulary/books/${id}`} style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-[15px] font-bold truncate" style={{ color: 'var(--fc-meaning-color)' }}>{book.name}</h1>
        </div>
        {/* 学习中操作（仅开始后显示）：重选 / 收藏 / 加生词本 / 计数 */}
        {started && (<>
        <button
          onClick={() => setStarted(false)}
          className="h-8 px-2.5 rounded-full flex items-center gap-1 text-[11px] font-bold transition-colors"
          style={{ border: '1px solid var(--fc-nav-border)', background: 'var(--fc-nav-bg)', color: 'var(--fc-nav-color)' }}
        >
          <SlidersHorizontal size={12} />
          {t('vocab.fc_reselect', lang)}
        </button>
        <button
          onClick={e => { e.stopPropagation(); toggleFavorite(word); }}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ border: '1px solid var(--fc-card-border)', color: favoritedIds.has(word.id) ? 'var(--color-gold-base)' : 'var(--text-muted)', background: favoritedIds.has(word.id) ? 'var(--color-gold-soft)' : 'transparent' }}
        >
          <Star size={14} fill={favoritedIds.has(word.id) ? 'var(--color-gold-base)' : 'none'} />
        </button>
        <button
          onClick={e => { e.stopPropagation(); setAddToBookWord(word); }}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ border: '1px solid var(--fc-card-border)', color: 'var(--text-muted)', background: 'transparent' }}
        >
          <BookmarkPlus size={14} />
        </button>
        <span className="text-[12px] font-black tabular-nums" style={{ color: 'var(--color-ink-3)' }}>
          {currentIdx + 1} / {displayWords.length}
        </span>
        </>)}
      </div>

      {/* 开始配置屏 */}
      {!started && (
        <FlashcardStartScreen
          wordCount={words.length}
          initial={{ mode: studyMode, direction, autoAdvance, shuffle: shuffled }}
          onStart={handleStart}
        />
      )}

      {/* Progress bar（两模式共用，保证顶部横线一致） */}
      {started && (
      <div className="h-[5px] rounded-full mb-5 shrink-0 overflow-hidden" style={{ background: 'var(--fc-progress-bg)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--color-mint-base), var(--color-pink-base))' }}
        />
      </div>
      )}

      {/* 选词义测验模式 */}
      {started && effectiveMode === 'quiz' && (
        <ChoiceQuiz
          key={`${direction}-${quizRound}-${displayWords.map(w => w.id).join(',')}`}
          words={displayWords}
          bookWords={words}
          direction={direction}
          autoAdvance={autoAdvance}
          bookName={book.name}
          sourceId={`book-${id}`}
          onProgress={setCurrentIdx}
          onWrong={(w) => { const real = words.find(x => x.id === w.id); if (real) setMastery(real, 'learning', true); }}
          onComplete={(correct, total) => {
            const now = Date.now();
            for (const dw of displayWords) {
              const real = words.find(x => x.id === dw.id);
              if (!real) continue;
              try {
                const newSrs = Math.min(5, (real.srsLevel ?? 0) + 1);
                const newInt = Math.max(1, (real.interval ?? 1) * 2);
                db.words.update(real.id, {
                  srsLevel: newSrs, interval: newInt, easeFactor: 2.5,
                  nextReview: now + newInt * 86400000, lastReviewed: now,
                  mastery: newSrs >= 5 ? 'mastered' as const : 'reviewing' as const,
                }).catch(() => {});
              } catch { /* ignore */ }
            }
            setCompleted(true);
          }}
        />
      )}

      {/* 翻卡模式（card + nav） */}
      {started && effectiveMode === 'flip' && (<>
      {/* Card */}
      <div className="flex justify-center">
        <div
          className="w-full max-w-sm md:max-w-2xl"
          style={{ cursor: 'pointer', userSelect: 'none' }}
          ref={cardRef}
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
              border: '1px solid var(--fc-card-border)',
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
                {word.mastery === 'mastered' && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--fc-badge-bg)', color: 'var(--fc-badge-color)' }}>{t('vocab.mastered', lang)}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <AutoAudioToggle autoAudio={autoAudio} onToggle={toggleAutoAudio} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ border: '1px solid var(--fc-audio-border)', color: 'var(--fc-audio-color)' }} />
                <button
                  onClick={e => { e.stopPropagation(); speakWord(word.word); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ border: '1px solid var(--fc-audio-border)', color: 'var(--fc-audio-color)' }}
                >
                  <Volume2 size={14} />
                </button>
              </div>
            </div>

            {/* Front */}
            <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
              {direction === 'ko-zh' ? (
                <div className="ko-text text-[44px] font-black leading-tight tracking-tight mb-3" style={{ color: 'var(--fc-word-color)', wordBreak: 'keep-all' }}>
                  {word.word}
                </div>
              ) : (
                <div className="text-[32px] font-black leading-tight mb-3" style={{ color: 'var(--fc-word-color)' }}>
                  {word.meanings?.length ? word.meanings.map(m => m.chinese).join('；') : word.meaning}
                </div>
              )}
              {!revealed && !hasSeenHint && (
                <div className="text-[13px] font-semibold mt-1" style={{ color: 'var(--fc-hint-color)' }}>
                  {direction === 'ko-zh' ? t('vocab.fc_tap_answer', lang) : t('vocab.fc_tap_kr', lang)}
                </div>
              )}
            </div>

            {/* Back: revealed content */}
            {revealed && (
              <div className="border-t pt-4 space-y-3" style={{ borderColor: 'var(--fc-divider)' }}>
                {direction === 'zh-ko' && (
                  <div className="ko-text text-[32px] font-black text-center leading-tight" style={{ color: 'var(--fc-meaning-color)', wordBreak: 'keep-all' }}>
                    {word.word}
                  </div>
                )}
                {/* Romanization */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: 'var(--fc-roman-bg)', color: 'var(--fc-roman-color)' }}>
                    [{displayRoman(word.pronunciation, word.word)}]
                  </span>
                </div>

                {/* Meaning（zh-ko 模式下正面已显示，此处隐藏） */}
                {direction === 'ko-zh' && (
                <div className="rounded-[16px] p-3.5" style={{ background: 'var(--fc-meaning-bg)', border: '1px solid var(--fc-meaning-border)' }}>
                  {word.meanings?.length ? (
                    <div className="space-y-1">
                      {word.meanings.map((m, i) => (
                        <div key={i} className="flex items-baseline gap-2 flex-wrap">
                          {word.meanings && word.meanings.length > 1 && (
                            <span className="text-[11px] shrink-0" style={{ color: 'var(--fc-pos-color)', opacity: 0.7 }}>{i + 1}.</span>
                          )}
                          {m.partOfSpeech && (
                            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded shrink-0" style={{ background: 'var(--fc-pos-bg)', color: 'var(--fc-pos-color)' }}>{m.partOfSpeech}</span>
                          )}
                          <strong className="text-[17px] font-black" style={{ color: 'var(--fc-meaning-color)' }}>{m.chinese}</strong>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-2 flex-wrap">
                      {word.partOfSpeech && (
                        <span className="text-[11px] font-medium px-1.5 py-0.5 rounded shrink-0" style={{ background: 'var(--fc-pos-bg)', color: 'var(--fc-pos-color)' }}>{word.partOfSpeech}</span>
                      )}
                      <strong className="text-[17px] font-black" style={{ color: 'var(--fc-meaning-color)' }}>{word.meaning}</strong>
                    </div>
                  )}
                </div>
                )}

                {/* Examples */}
                {(() => {
                  const validExamples = (word.examples ?? []).filter(ex => ex.text && ex.text !== '[object Object]');
                  const entry = validExamples.length === 0 ? entryCache : null;
                  const examples = validExamples.length > 0
                    ? validExamples
                    : (entry?.examples ?? []).slice(0, 2).map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const }));
                  if (examples.length === 0) return null;
                  return (
                  <div className="space-y-2">
                    {examples.slice(0, 2).map((ex, i) => (
                      <div
                        key={i}
                        className="rounded-[14px] px-3.5 py-2"
                        style={{ background: 'var(--fc-example-bg)' }}
                      >
                        <div className="flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-[16px] leading-relaxed" style={{ color: 'var(--fc-example-ko)' }}><TappableText text={ex.text} highlightWord={word.word} source="闪卡" highlightColor="var(--fc-example-hi-color)" underlineColor="var(--fc-example-hi-color)" /></p>
                            <p className="text-[12px] mt-0.5" style={{ color: 'var(--fc-example-zh)' }}>{ex.translation}</p>
                          </div>
                          <SentenceBookmarkButton korean={ex.text} chinese={ex.translation} sourceId={`book-${id}`} sourceTitle={book?.name} />
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
                  </div>
                  );
                })()}

                <TracePad word={word.word} />

                {/* Mastery 按钮 */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={e => { e.stopPropagation(); setMastery(word, 'mastered'); }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-colors"
                    style={{ background: 'var(--color-mint-soft)', color: 'var(--color-mint-strong)', border: '1px solid var(--color-mint-base)' }}
                  >
                    <Check size={13} /> {t('vocab.mastered', lang)}
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); relearnWord(word); }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-colors"
                    style={{ background: 'var(--color-surface-3)', color: 'var(--color-ink-3)', border: '1px solid var(--color-border-2)' }}
                  >
                    <RotateCcw size={13} /> {t('vocab.fc_relearn', lang)}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation — fixed 悬浮胶囊 */}
      <div
        className="flex items-center justify-center gap-4 desktop-fixed-rail-wide"
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
          onClick={() => goTo(currentIdx - 1, displayWords)}
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
          onClick={() => goTo(currentIdx + 1, displayWords)}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all shrink-0"
          style={{ background: currentIdx === displayWords.length - 1 ? 'var(--color-pink-soft)' : 'var(--fc-nav-bg)', border: currentIdx === displayWords.length - 1 ? '1.5px solid var(--color-pink-base)' : '1px solid var(--fc-nav-border)', color: currentIdx === displayWords.length - 1 ? 'var(--color-pink-strong)' : 'var(--fc-nav-color)' }}
          aria-label={currentIdx === displayWords.length - 1 ? t('vocab.fc_finish', lang) : t('vocab.fc_next', lang)}
        >
          {currentIdx === displayWords.length - 1 ? <Check size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      </>)}

      {/* 完成态卡片 */}
      {completed && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'rgba(0,0,0,.4)' }}>
          <div style={{ background: 'var(--color-surface-2)', borderRadius: 24, padding: '32px 28px 24px', maxWidth: 340, width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,.15)' }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-ink-1)', marginBottom: 8 }}>{t('vocab.fc_finished', lang)}</h2>
            <p style={{ fontSize: 14, color: 'var(--color-ink-3)', marginBottom: 20, lineHeight: 1.6 }}>
              {t('vocab.fc_total_n', lang, { n: displayWords.length })}<br />
              {book?.name}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => { setCompleted(false); setCurrentIdx(0); setRevealed(false); setHasSeenHint(false); setQuizRound(r => r + 1); }} style={{ flex: 1, padding: '12px 0', borderRadius: 999, border: '1px solid var(--color-border-2)', background: 'transparent', color: 'var(--color-ink-2)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                <RotateCcw size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />{t('vocab.fc_again', lang)}
              </button>
              <button onClick={() => router.push(`/vocabulary/books/${id}`)} style={{ flex: 1, padding: '12px 0', borderRadius: 999, border: 'none', background: 'var(--color-pink-base)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                {t('vocab.fc_back_to_book', lang)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WordTapSheet */}
      {tapWord && (
        <WordTapSheet surface={tapWord} source={`book-flashcard-${id}`} onClose={() => setTapWord(null)} />
      )}

      {addToBookWord && (
        <AddToBookSheet
          word={{
            korean: addToBookWord.word,
            pronunciation: addToBookWord.pronunciation,
            meaning: addToBookWord.meaning,
            partOfSpeech: addToBookWord.partOfSpeech,
            examples: (addToBookWord.examples || []).map(ex => ({ text: ex.text, translation: ex.translation })),
            sourceEntryId: addToBookWord.sourceEntryId,
          }}
          onClose={() => setAddToBookWord(null)}
        />
      )}
    </div>
  );
}
