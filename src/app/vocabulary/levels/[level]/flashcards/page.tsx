'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight, Loader2, CheckCircle, RotateCcw, Star, SlidersHorizontal, Repeat } from 'lucide-react';

const DIRECTION_KEY = 'flashcards-direction';
type FlashDirection = 'ko-zh' | 'zh-ko';
import { db } from '@/lib/db';
import { ensureFavoritesBook, FAVORITES_BOOK_ID } from '@/lib/db';
import { speakWord, speakWordRepeated, cancelSpeech } from '@/lib/tts';
import { displayRoman } from '@/lib/dictionary';
import { getLevelWords } from '@/data/vocabulary';
import { ChoiceQuiz, type QuizItem } from '@/components/vocabulary/ChoiceQuiz';
import { FlashcardStartScreen } from '@/components/vocabulary/FlashcardStartScreen';
import { TappableText } from '@/components/TappableText';
import { WordTapSheet } from '@/components/WordTapSheet';
import type { WordEntry } from '@/types';
import { saveProgress, loadProgress, TTL_FLASHCARD } from '@/lib/progress-storage';
import { useToast } from '@/hooks/useToast';
import { TracePad } from '@/components/vocabulary/TracePad';
import { RepeatToggleButton } from '@/components/vocabulary/RepeatToggleButton';
import { useAutoAudio, AutoAudioToggle } from '@/components/vocabulary/AutoAudioToggle';
import { SentenceBookmarkButton } from '@/components/vocabulary/SentenceBookmarkButton';
import GrammarExplainBubble from '@/components/GrammarExplainBubble';
import { getFlashcardTheme, applyFlashcardTheme } from '@/lib/flashcardTheme';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const levelNames: Record<number, string> = {
  1: '1级 · 入门', 2: '2级 · 基础', 3: '3级 · 进阶',
  4: '4级 · 中级', 5: '5级 · 高级', 6: '6级 · 精通',
};

type CardWord = WordEntry & { mastery: 'new' | 'learning' | 'reviewing' | 'mastered'; srsLevel?: number; interval?: number; id?: string };

export default function TopikFlashcardsPage() {
  const { lang } = useLang();
  const { level: levelStr } = useParams<{ level: string }>();
  const router = useRouter();
  const level = parseInt(levelStr);

  const [words, setWords] = useState<CardWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const [displayWords, setDisplayWords] = useState<typeof words>([]);
  const [revealed, setRevealed] = useState(false);
  const [direction, setDirection] = useState<FlashDirection>('ko-zh');
  const [swipeOffset, setSwipeOffset] = useState(0);

  const [studyMode, setStudyMode] = useState<'flip' | 'quiz'>('flip');
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [quizRound, setQuizRound] = useState(0);
  const [started, setStarted] = useState(false);
  const MIN_QUIZ_WORDS = 4;
  const [autoAudio, toggleAutoAudio] = useAutoAudio();

  useEffect(() => {
    try {
      applyFlashcardTheme(getFlashcardTheme()); // 兜底重贴闪卡配色，防 FOUC 脚本竞态/SPA 导航丢失导致回退默认蓝色
      const v = localStorage.getItem(DIRECTION_KEY);
      if (v === 'zh-ko') setDirection('zh-ko');
      if (localStorage.getItem('flashcards-study-mode') === 'quiz') setStudyMode('quiz');
      if (localStorage.getItem('flashcards-quiz-pace') === 'manual') setAutoAdvance(false);
    } catch { /* ignore */ }
  }, []);

  // WordEntry（korean/romanization/meanings[].chinese/examples{korean,chinese}）→ 中立 QuizItem
  const toQuizItem = (e: CardWord): QuizItem => ({
    id: e.korean, word: e.korean, pronunciation: e.romanization,
    meaning: e.meanings[0]?.chinese || '',
    meanings: e.meanings.map(m => ({ chinese: m.chinese, partOfSpeech: e.partOfSpeech })),
    partOfSpeech: e.partOfSpeech,
    examples: (e.examples ?? []).map(x => ({ text: x.korean, translation: x.chinese })),
  });

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
    if (isNaN(level) || level < 1 || level > 6) { router.replace('/vocabulary/levels'); return; }

    (async () => {
      try {
        const entries = await getLevelWords(level);
        const koreanWords = new Set(entries.map(e => e.korean));
        const allUserWords = await db.words.toArray();
        const userWords = allUserWords.filter(w => koreanWords.has(w.word));
        const masteryMap = new Map(userWords.map(w => [w.word, w.mastery]));
        const mSet = new Set(userWords.filter(w => w.mastery === 'mastered').map(w => w.word));
        setMasteredSet(mSet);

        // Sort: untouched & learning first, mastered last
        const sorted = [...entries].sort((a, b) => {
          const ma = masteryMap.get(a.korean) ?? 'new';
          const mb = masteryMap.get(b.korean) ?? 'new';
          if (ma === 'mastered' && mb !== 'mastered') return 1;
          if (ma !== 'mastered' && mb === 'mastered') return -1;
          return 0;
        });

        setWords(sorted.map(e => ({ ...e, mastery: (masteryMap.get(e.korean) ?? 'new') as CardWord['mastery'] })));
      } finally {
        setLoading(false);
      }
    })();
  }, [level, router]);

  const SESSION_KEY = `fc-progress-level-${level}`;

  // sync displayWords with words, restoring session progress if available
  // progressInitialized guard ensures we only restore once per mount
  useEffect(() => {
    if (words.length === 0) return;
    if (progressInitialized.current) {
      // words changed after init (mastery update) — only sync mastery state, keep position
      setDisplayWords(prev => prev.map(w => {
        const updated = words.find(x => x.korean === w.korean);
        return updated ?? w;
      }));
      return;
    }
    progressInitialized.current = true;
    const saved = loadProgress<{ idx: number; order?: string[] }>(SESSION_KEY, TTL_FLASHCARD);
    if (saved) {
      const { idx, order } = saved;
      if (order && order.length === words.length) {
        const map = new Map(words.map(w => [w.korean, w]));
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
    const order = shuffled ? displayWords.map(w => w.korean) : undefined;
    saveProgress(SESSION_KEY, { idx: currentIdx, order }, TTL_FLASHCARD);
  }, [currentIdx, displayWords, shuffled, SESSION_KEY]);

  // auto-play audio when card changes (also fires on shuffle-from-index-0)
  const currentWordText = displayWords[currentIdx]?.korean ?? '';
  useEffect(() => {
    if (!autoAudio || loading || !currentWordText || !started || (studyMode === 'quiz' && displayWords.length >= MIN_QUIZ_WORDS)) return;
    const raf = requestAnimationFrame(() => playAudioRef.current?.());
    // 翻卡瞬间同步打断上一张的连读(含 gap 等待中的),不等下一帧 rAF——否则第二张会听到第一张的读音
    return () => { cancelAnimationFrame(raf); cancelSpeech(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoAudio, currentIdx, loading, currentWordText, started, studyMode]);

  playAudioRef.current = () => {
    if (!autoAudio) return;
    const w = displayWords[currentIdx];
    if (!w) return;
    cancelSpeech();
    speakWordRepeated(w.korean, 0.85).catch(() => {});
  };

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

  // 翻卡模式自动翻页：翻到背面后停留 2.5s 自动进入下一张（切卡/翻回/卸载即清除）
  const isFlipMode = !(studyMode === 'quiz' && displayWords.length >= MIN_QUIZ_WORDS);
  useEffect(() => {
    if (!started || !isFlipMode || !autoAdvance || !revealed || completed) return;
    const timer = setTimeout(() => goTo(currentIdx + 1), 2500);
    return () => clearTimeout(timer);
  }, [started, isFlipMode, autoAdvance, revealed, completed, currentIdx, goTo]);

  // 词典条目在 IndexedDB 无行时先建一条 new 行，返回其 id（收藏本按 id 存取）
  const ensureFavRow = async (entry: CardWord): Promise<string> => {
    const existing = await db.words.where('word').equals(entry.korean).first();
    if (existing) return existing.id;
    const id = crypto.randomUUID();
    const now = Date.now();
    await db.words.put({
      id,
      word: entry.korean,
      pronunciation: entry.romanization,
      meaning: entry.meanings[0]?.chinese || '',
      partOfSpeech: entry.partOfSpeech,
      examples: entry.examples.map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })),
      sourceEntryId: entry.id,
      mastery: 'new',
      srsLevel: 0,
      easeFactor: 2.5,
      interval: 0,
      nextReview: now,
      createdAt: now,
      lastReviewed: null,
      source: 'library',
    });
    return id;
  };

  // 串行化 + 基于 DB 最新数据判断 isFav，避免快速点两次互相覆盖
  const favQueueRef = useRef<Promise<unknown>>(Promise.resolve());
  const toggleFavorite = (entry: CardWord) => {
    const next = favQueueRef.current.then(async () => {
      try {
        const bookId = await ensureFavoritesBook();
        const favBook = await db.wordBooks.get(bookId);
        if (!favBook) return;
        const now = Date.now();
        const existing = await db.words.where('word').equals(entry.korean).first();
        const rowId = existing?.id;
        if (rowId && favBook.wordIds.includes(rowId)) {
          await db.wordBooks.update(bookId, { wordIds: favBook.wordIds.filter(id => id !== rowId), updatedAt: now });
          setFavoritedIds(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
        } else {
          const id = rowId ?? await ensureFavRow(entry);
          await db.wordBooks.update(bookId, { wordIds: [...new Set([...favBook.wordIds, id])], updatedAt: now });
          setFavoritedIds(prev => new Set(prev).add(entry.korean));
        }
      } catch {
        showToast(t('vocab.fc_fav_failed', lang), 'error');
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
          // 词库词首次翻卡即入库为 learning（无行则建行），否则学习进度读不回
          (async () => {
            try {
              const id = await ensureFavRow(cur);
              await db.words.update(id, { mastery: 'learning', srsLevel: 1, interval: 1, nextReview: Date.now() });
            } catch {
              showToast(t('vocab.fc_progress_save_failed', lang), 'error');
            }
          })();
          setWords(prev => prev.map(w => w.korean === cur.korean ? { ...w, mastery: 'learning' } : w));
        }
      }
      return next;
    });
  };

  // Keyboard
  useEffect(() => {
    if (!started || (studyMode === 'quiz' && displayWords.length >= MIN_QUIZ_WORDS)) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(currentIdx - 1);
      else if (e.key === 'ArrowRight') goTo(currentIdx + 1);
      else if (e.key === ' ') { e.preventDefault(); flipCard(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, goTo, started, studyMode, displayWords.length]);

  const toggleMastered = async (entry: CardWord) => {
    const now = Date.now();
    const isMastered = masteredSet.has(entry.korean);
    try {
      const rows = await db.words.where('word').equals(entry.korean).toArray();

      if (isMastered) {
        if (rows.length) {
          await db.words.bulkUpdate(
            rows.map(r => ({ id: r.id, mastery: 'learning', srsLevel: 1, interval: 1, nextReview: now }))
          );
        }
        setMasteredSet(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
        setWords(prev => prev.map(w => w.korean === entry.korean ? { ...w, mastery: 'learning' } : w));
      } else {
        if (rows.length) {
          await db.words.bulkUpdate(
            rows.map(r => ({ id: r.id, mastery: 'mastered', srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now }))
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
        setMasteredSet(prev => new Set(prev).add(entry.korean));
        setWords(prev => prev.map(w => w.korean === entry.korean ? { ...w, mastery: 'mastered' } : w));
      }
    } catch {
      showToast(t('vocab.fc_save_failed', lang), 'error');
    }
  };

  // 重新学：标记 learning 并把当前词移到本轮牌堆末尾稍后再练
  const relearnWord = (w: CardWord) => {
    if (w.mastery === 'new') {
      (async () => {
        try {
          const id = await ensureFavRow(w);
          await db.words.update(id, { mastery: 'learning', srsLevel: 1, interval: 1, nextReview: Date.now() });
          setWords(prev => prev.map(c => c.korean === w.korean ? { ...c, mastery: 'learning' } : c));
        } catch { /* ignore */ }
      })();
    }
    setRevealed(false);
    setDisplayWords(prev => {
      if (prev.length <= 1) return prev;
      const idx = prev.findIndex(c => c.korean === w.korean);
      if (idx === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(idx, 1);
      next.push(moved);
      return next;
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // 起点在按钮上：交给按钮，不做 swipe 判定
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
    if (dirLockRef.current !== 'h') return;
    isSwipingRef.current = true;
    swipeOffsetRef.current = dx;
    if (!swipeRafRef.current) {
      swipeRafRef.current = requestAnimationFrame(() => {
        swipeRafRef.current = null;
        setIsSwiping(true);
        setSwipeOffset(swipeOffsetRef.current);
      });
    }
  };

  const handleTouchEnd = () => {
    if (!isSwipingRef.current) return;
    setIsSwiping(false);
    isSwipingRef.current = false;
    const offset = swipeOffsetRef.current;
    swipeOffsetRef.current = 0;
    // iPad 大屏 threshold 从 80 降到 60
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <Loader2 size={32} className="animate-spin" style={{ color: 'var(--text-muted)' }} />
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{t('vocab.loading_word', lang)}</span>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="py-4 space-y-4 px-4">
        <Link href={`/vocabulary/levels/${level}`} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
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
  const isMastered = masteredSet.has(word.korean);
  const progress = ((currentIdx + 1) / displayWords.length) * 100;
  const masteredCount = masteredSet.size;
  const effectiveMode = studyMode === 'quiz' && displayWords.length >= MIN_QUIZ_WORDS ? 'quiz' : 'flip';

  return (
    <div
      className="flex flex-col px-4 md:px-8 pt-4 max-w-2xl md:max-w-none mx-auto w-full"
      style={{ minHeight: 'calc(100dvh - 56px - env(safe-area-inset-bottom, 0px))', paddingBottom: 'calc(56px + 80px + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Header ── 顶部工具栏紧凑排布，no-touch-zone 让 44 兜底不撑破布局 */}
      <div className="no-touch-zone flex items-center gap-2 mb-4 shrink-0">
        <Link href={`/vocabulary/levels/${level}`} className="shrink-0" style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center' }}>
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-[15px] font-bold truncate" style={{ color: 'var(--fc-meaning-color)' }}>
            TOPIK {t('vocab.level_name_' + level, lang)}
          </h1>
          <p className="text-[12px] truncate" style={{ color: 'var(--text-muted)' }}>
            {t('vocab.fc_mastered_of', lang, { mastered: masteredCount, total: words.length })}
          </p>
        </div>
        {started && (<>
        <button
          onClick={() => setStarted(false)}
          className="shrink-0 h-8 px-2.5 rounded-full flex items-center gap-1 text-[11px] font-bold transition-colors"
          style={{ border: '1px solid var(--fc-nav-border)', background: 'var(--fc-nav-bg)', color: 'var(--fc-nav-color)' }}
        >
          <SlidersHorizontal size={12} />
          {t('vocab.fc_reselect', lang)}
        </button>
        <button
          onClick={e => { e.stopPropagation(); toggleFavorite(word); }}
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ border: '1px solid var(--fc-card-border)', color: favoritedIds.has(word.korean) ? 'var(--color-gold-base)' : 'var(--text-muted)', background: favoritedIds.has(word.korean) ? 'var(--color-gold-soft)' : 'transparent' }}
          aria-label={t('vocab.fc_fav', lang)}
        >
          <Star size={14} fill={favoritedIds.has(word.korean) ? 'var(--color-gold-base)' : 'none'} />
        </button>
        <span className="text-[12px] font-black tabular-nums shrink-0" style={{ color: 'var(--color-ink-3)' }}>
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

      {/* Progress bar */}
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
          key={`${direction}-${quizRound}-${displayWords.map(w => w.korean).join(',')}`}
          words={displayWords.map(toQuizItem)}
          bookWords={words.map(toQuizItem)}
          direction={direction}
          autoAdvance={autoAdvance}
          bookName={`TOPIK ${t('vocab.level_name_' + level, lang)}`}
          sourceId={`level-${level}`}
          onProgress={setCurrentIdx}
          onWrong={(qi) => { const real = words.find(x => x.korean === qi.id); if (real && real.mastery === 'new') { (async () => { try { const rid = await ensureFavRow(real); await db.words.update(rid, { mastery: 'learning', srsLevel: 1, interval: 1, nextReview: Date.now() }); setWords(prev => prev.map(w => w.korean === real.korean ? { ...w, mastery: 'learning' } : w)); } catch { /* ignore */ } })(); } }}
          onComplete={(correct, total) => {
            const now = Date.now();
            for (const dw of displayWords) {
              const real = words.find(x => x.korean === dw.korean);
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

      {/* Card（翻卡） */}
      {started && effectiveMode === 'flip' && (<>
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
              <div className="flex items-center gap-2">
                <AutoAudioToggle autoAudio={autoAudio} onToggle={toggleAutoAudio} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ border: '1px solid var(--fc-audio-border)', color: 'var(--fc-audio-color)' }} />
                <button
                  onClick={e => { e.stopPropagation(); speakWord(word.korean); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ border: '1px solid var(--fc-audio-border)', color: 'var(--fc-audio-color)' }}
                  aria-label={t('vocab.play', lang)}
                >
                  <Volume2 size={14} />
                </button>
              </div>
            </div>

            {/* Front */}
            <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
              {direction === 'ko-zh' ? (
                <div className="ko-text text-[44px] font-black leading-tight tracking-tight mb-3" style={{ color: 'var(--fc-word-color)', wordBreak: 'keep-all' }}>
                  {word.korean}
                </div>
              ) : (
                <div className="text-[32px] font-black leading-tight mb-3" style={{ color: 'var(--fc-word-color)' }}>
                  {word.meanings.map(m => m.chinese).join('；')}
                </div>
              )}
              {!revealed && !hasSeenHint && (
                <div className="text-[13px] font-semibold mt-1" style={{ color: 'var(--fc-hint-color)' }}>
                  {direction === 'ko-zh' ? t('vocab.fc_tap_meaning', lang) : t('vocab.fc_tap_kr', lang)}
                </div>
              )}
            </div>

            {/* Back: revealed content */}
            {revealed && (
              <div className="border-t pt-4 space-y-3" style={{ borderColor: 'var(--fc-divider)' }}>
                {direction === 'zh-ko' && (
                  <div className="ko-text text-[32px] font-black text-center leading-tight" style={{ color: 'var(--fc-meaning-color)', wordBreak: 'keep-all' }}>
                    {word.korean}
                  </div>
                )}
                {/* Romanization */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: 'var(--fc-roman-bg)', color: 'var(--fc-roman-color)' }}>
                    [{displayRoman(word.romanization, word.korean)}]
                  </span>
                  {word.partOfSpeech && (
                    <span className="text-[11px] font-medium px-1.5 py-0.5 rounded" style={{ background: 'var(--fc-pos-bg)', color: 'var(--fc-pos-color)' }}>
                      {word.partOfSpeech}
                    </span>
                  )}
                </div>

                {/* Meanings（zh-ko 模式下已在正面显示，此处收窄） */}
                {direction === 'ko-zh' && (
                  <div className="rounded-[16px] p-3.5" style={{ background: 'var(--fc-meaning-bg)', border: '1px solid var(--fc-meaning-border)' }}>
                    <strong className="text-[17px] font-black" style={{ color: 'var(--fc-meaning-color)' }}>
                      {word.meanings.map(m => m.chinese).join('；')}
                    </strong>
                  </div>
                )}

                {/* Examples */}
                {(word.examples ?? []).slice(0, 2).map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-[14px] px-3.5 py-2"
                    style={{ background: 'var(--fc-example-bg)' }}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-[16px] leading-relaxed" style={{ color: 'var(--fc-example-ko)' }}>
                          <TappableText text={ex.korean} highlightWord={word.korean} source={t('vocab.src_flashcard', lang)} highlightColor="var(--fc-example-hi-color)" underlineColor="var(--fc-example-hi-color)" />
                        </p>
                        <p className="text-[12px] mt-0.5" style={{ color: 'var(--fc-example-zh)' }}>{ex.chinese}</p>
                      </div>
                      <SentenceBookmarkButton korean={ex.korean} chinese={ex.chinese} sourceId={`level-${level}`} sourceTitle={`TOPIK ${t('vocab.level_name_' + level, lang)}`} />
                      <button
                        onClick={e => { e.stopPropagation(); speakWord(ex.korean); }}
                        className="shrink-0 p-1.5 -m-0.5 rounded-lg"
                        style={{ color: 'var(--fc-example-zh)' }}
                        aria-label={t('vocab.play', lang)}
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <GrammarExplainBubble sentence={ex.korean} translation={ex.chinese} variant="compact" />
                    </div>
                  </div>
                ))}

                {/* Trace pad */}
                <TracePad word={word.korean} />

                {/* Mastery button */}
                <div className="flex gap-2 mt-1">
                  {isMastered ? (
                    <button onClick={e => { e.stopPropagation(); toggleMastered(word); }} className="flex items-center justify-center gap-2 py-2.5 rounded-[14px] font-semibold text-[14px] transition-colors w-full" style={{ background: 'var(--fc-badge-bg)', color: 'var(--fc-badge-color)', border: '1.5px solid var(--fc-btn-mastered-border)' }}>
                      <RotateCcw size={15} /> {t('vocab.unmaster', lang)}
                    </button>
                  ) : (<>
                    <button onClick={e => { e.stopPropagation(); relearnWord(word); }} className="flex items-center justify-center gap-2 py-2.5 rounded-[14px] font-semibold text-[14px] transition-colors flex-1" style={{ background: 'var(--fc-nav-bg)', color: 'var(--fc-nav-color)', border: '1.5px solid var(--fc-nav-border)' }}>
                      <Repeat size={15} /> {t('vocab.fc_relearn', lang)}
                    </button>
                    <button onClick={e => { e.stopPropagation(); toggleMastered(word); }} className="flex items-center justify-center gap-2 py-2.5 rounded-[14px] font-semibold text-[14px] transition-colors flex-1" style={{ background: 'var(--fc-roman-bg)', color: 'var(--fc-roman-color)', border: '1.5px solid var(--fc-btn-unmastered-border)' }}>
                      <CheckCircle size={15} /> {t('vocab.mark_mastered', lang)}
                    </button>
                  </>)}
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
      </>)}

      {completed && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'rgba(0,0,0,.4)' }}>
          <div style={{ background: 'var(--color-surface-2)', borderRadius: 24, padding: '32px 28px 0', maxWidth: 340, width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,.15)' }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-ink-1)', marginBottom: 8 }}>{t('vocab.fc_finished', lang)}</h2>
            <p style={{ fontSize: 14, color: 'var(--color-ink-3)', marginBottom: 20, lineHeight: 1.6 }}>
              {t('vocab.fc_total_n', lang, { n: displayWords.length })}<br />
              {t('vocab.fc_topik_level_mastered', lang, { name: t('vocab.level_name_' + level, lang), n: masteredCount })}
            </p>
            <div style={{ display: 'flex', gap: 10, paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
              <button onClick={() => { setCompleted(false); setCurrentIdx(0); setRevealed(false); setHasSeenHint(false); setQuizRound(r => r + 1); setStarted(false); }} style={{ flex: 1, padding: '12px 0', borderRadius: 999, border: '1px solid var(--color-border-2)', background: 'transparent', color: 'var(--color-ink-2)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                <RotateCcw size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />{t('vocab.fc_again', lang)}
              </button>
              <button onClick={() => router.push(`/vocabulary/levels/${level}`)} style={{ flex: 1, padding: '12px 0', borderRadius: 999, border: 'none', background: 'var(--color-pink-base)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                {t('vocab.fc_back_to_levels', lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
