'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { TappableText } from '@/components/TappableText';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight, Loader2, Star, Shuffle } from 'lucide-react';
import { db, ensureFavoritesBook, FAVORITES_BOOK_ID } from '@/lib/db';
import { speakWord, speak } from '@/lib/tts';
import { getEntryByKorean } from '@/data/vocabulary/index';
import type { WordBook, Word } from '@/types';

export default function FlashcardStudyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { lang } = useLang();
  const [book, setBook] = useState<WordBook | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const [displayWords, setDisplayWords] = useState<typeof words>([]);
  const [revealed, setRevealed] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null);
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());
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
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // sync displayWords with words, restoring session progress if available
  useEffect(() => {
    if (words.length === 0) return;
    const SESSION_KEY = `fc-progress-book-${id}`;
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const { idx, order } = JSON.parse(saved) as { idx: number; order?: string[] };
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
    } catch { /* ignore */ }
    setDisplayWords(words);
    setCurrentIdx(0);
  }, [words]);

  // persist progress on every card change
  useEffect(() => {
    if (displayWords.length === 0) return;
    const SESSION_KEY = `fc-progress-book-${id}`;
    try {
      const order = shuffled ? displayWords.map(w => w.id) : undefined;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ idx: currentIdx, order }));
    } catch { /* ignore */ }
  }, [currentIdx, displayWords, shuffled]);

  const toggleShuffle = () => {
    if (shuffled) {
      setDisplayWords([...words]);
    } else {
      const arr = [...words];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setDisplayWords(arr);
    }
    setShuffled(v => !v);
    setCurrentIdx(0);
    setRevealed(false);
  };

  const goTo = useCallback((idx: number, list: Word[]) => {
    if (idx < 0 || idx >= list.length) return;
    setRevealed(false);
    setSwipeOffset(0);
    setExiting(null);
    setCurrentIdx(idx);
  }, []);

  const toggleFavorite = useCallback(async (w: Word) => {
    const isFav = favoritedIds.has(w.id);
    const bookId = await ensureFavoritesBook();
    const favBook = await db.wordBooks.get(bookId);
    if (!favBook) return;
    const now = Date.now();
    if (isFav) {
      await db.wordBooks.update(bookId, { wordIds: favBook.wordIds.filter(id => id !== w.id), updatedAt: now });
      setFavoritedIds(prev => { const s = new Set(prev); s.delete(w.id); return s; });
    } else {
      if (!favBook.wordIds.includes(w.id)) {
        await db.wordBooks.update(bookId, { wordIds: [...favBook.wordIds, w.id], updatedAt: now });
      }
      setFavoritedIds(prev => new Set(prev).add(w.id));
    }
  }, [favoritedIds]);

  // Auto-play on card change
  useEffect(() => {
    if (!loading && displayWords[currentIdx]) {
      const t = setTimeout(() => speakWord(displayWords[currentIdx].word, 0.85), 300);
      return () => clearTimeout(t);
    }
  }, [currentIdx, loading, displayWords]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(currentIdx - 1, displayWords);
      else if (e.key === 'ArrowRight') goTo(currentIdx + 1, displayWords);
      else if (e.key === ' ') { e.preventDefault(); setRevealed(r => !r); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIdx, goTo, displayWords]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setSwipeOffset(0);
    setIsSwiping(false);
    setExiting(null);
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5) {
        e.preventDefault();
      }
    };
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', onTouchMove);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5) {
      setIsSwiping(true);
      setSwipeOffset(dx);
    }
  };

  const handleTouchEnd = () => {
    if (!isSwipingRef.current) return;
    setIsSwiping(false);
    if (swipeOffset > 80 && currentIdx > 0) setExiting('right');
    else if (swipeOffset < -80 && currentIdx < displayWords.length - 1) setExiting('left');
    else setSwipeOffset(0);
  };

  const handleTransitionEnd = () => {
    if (exiting === 'left') goTo(currentIdx + 1, displayWords);
    else if (exiting === 'right') goTo(currentIdx - 1, displayWords);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (!isSwiping && Math.abs(swipeOffset) < 10) setRevealed(r => !r);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin" style={{ color: '#89756e' }} />
      </div>
    );
  }

  if (!book || words.length === 0) {
    return (
      <div className="py-4 space-y-4">
        <Link href={`/vocabulary/books/${id}`} className="flex items-center gap-2 text-sm" style={{ color: '#89756e' }}>
          <ArrowLeft size={18} /> 返回
        </Link>
        <div className="text-center py-20">
          <span className="text-5xl block mb-4">📝</span>
          <p className="text-sm mb-4" style={{ color: '#89756e' }}>这个单词本还是空的</p>
          <Link href={`/vocabulary/books/${id}`} className="inline-flex items-center px-5 py-2.5 rounded-full text-white text-sm font-bold" style={{ background: '#ff7fa8' }}>
            去添加单词
          </Link>
        </div>
      </div>
    );
  }

  const word = displayWords[currentIdx];
  if (!word) return null;
  const progress = ((currentIdx + 1) / displayWords.length) * 100;

  const getTransform = () => {
    if (exiting === 'left') return 'translateX(-120%) rotate(-8deg)';
    if (exiting === 'right') return 'translateX(120%) rotate(8deg)';
    if (isSwiping) return `translateX(${swipeOffset}px) rotate(${swipeOffset * 0.04}deg)`;
    return 'translateX(0) rotate(0deg)';
  };

  return (
    <div
      className="flex flex-col px-4 pt-4"
      style={{ minHeight: 'calc(100dvh - 56px - env(safe-area-inset-bottom, 0px))', paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <Link href={`/vocabulary/books/${id}`} style={{ color: '#89756e' }}>
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-[15px] font-bold truncate" style={{ color: 'var(--fc-meaning-color)' }}>{book.name}</h1>
        </div>
        <button
          onClick={toggleShuffle}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ border: '1px solid var(--fc-nav-border)', background: shuffled ? 'var(--fc-dot-active)' : 'var(--fc-nav-bg)', color: shuffled ? '#fff' : 'var(--fc-nav-color)' }}
          title={shuffled ? '取消乱序' : '随机乱序'}
        >
          <Shuffle size={14} />
        </button>
        <button
          onClick={e => { e.stopPropagation(); toggleFavorite(word); }}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ border: '1px solid var(--fc-card-border)', color: favoritedIds.has(word.id) ? '#f5a623' : '#89756e', background: favoritedIds.has(word.id) ? 'rgba(245,166,35,0.08)' : 'transparent' }}
          title={favoritedIds.has(word.id) ? '取消收藏' : '收藏'}
        >
          <Star size={14} fill={favoritedIds.has(word.id) ? '#f5a623' : 'none'} />
        </button>
        <span className="text-[12px] font-black tabular-nums" style={{ color: '#a08f87' }}>
          {currentIdx + 1} / {displayWords.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-[5px] rounded-full mb-5 shrink-0 overflow-hidden" style={{ background: 'var(--fc-progress-bg)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #aee3d8, #ff7fa8)' }}
        />
      </div>

      {/* Card */}
      <div className="flex justify-center">
        <div
          className="w-full max-w-sm"
          style={{ cursor: 'pointer', userSelect: 'none' }}
          ref={cardRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleCardClick}
          onTransitionEnd={handleTransitionEnd}
        >
          <div
            className="rounded-[28px] flex flex-col"
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
            {/* Audio button */}
            <div className="flex justify-end mb-2">
              <button
                onClick={e => { e.stopPropagation(); speakWord(word.word, 0.85); }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ border: '1px solid var(--fc-audio-border)', color: 'var(--fc-audio-color)' }}
              >
                <Volume2 size={14} />
              </button>
            </div>

            {/* Front: Korean word */}
            <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
              <div className="text-[44px] font-black leading-tight tracking-tight mb-3" style={{ color: 'var(--fc-word-color)', wordBreak: 'keep-all' }}>
                {word.word}
              </div>
              {!revealed && (
                <div className="text-[13px] font-semibold mt-1" style={{ color: 'var(--fc-hint-color)' }}>
                  点击查看答案
                </div>
              )}
            </div>

            {/* Back: revealed content */}
            {revealed && (
              <div className="border-t pt-4 space-y-3" style={{ borderColor: 'var(--fc-divider)' }}>
                {/* Romanization */}
                {word.pronunciation && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: 'var(--fc-roman-bg)', color: 'var(--fc-roman-color)' }}>
                      [{word.pronunciation}]
                    </span>
                  </div>
                  );
                })()}

                {/* Meaning */}
                <div className="rounded-[16px] p-3.5" style={{ background: 'var(--fc-meaning-bg)', border: '1px solid var(--fc-meaning-border)' }}>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    {word.partOfSpeech && (
                      <span className="text-[11px] font-medium px-1.5 py-0.5 rounded shrink-0" style={{ background: 'var(--fc-pos-bg)', color: 'var(--fc-pos-color)' }}>{word.partOfSpeech}</span>
                    )}
                    <strong className="text-[17px] font-black" style={{ color: 'var(--fc-meaning-color)' }}>{word.meaning}</strong>
                  </div>
                </div>

                {/* Examples */}
                {(() => {
                  const validExamples = word.examples.filter(ex => ex.text && ex.text !== '[object Object]');
                  const entry = validExamples.length === 0 ? getEntryByKorean(word.word) : null;
                  const examples = validExamples.length > 0
                    ? validExamples
                    : entry?.examples.slice(0, 2).map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })) ?? [];
                  if (examples.length === 0) return null;
                  return (
                  <div className="space-y-2">
                    {examples.slice(0, 2).map((ex, i) => (
                      <div
                        key={i}
                        className="rounded-[14px] px-3.5 py-2.5 flex items-start gap-2"
                        style={{ background: 'var(--fc-example-bg)' }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--fc-example-ko)' }}><TappableText text={ex.text} highlightWord={word.word} source="闪卡" highlightColor="var(--fc-example-hi-color)" underlineColor="var(--fc-example-hi-color)" /></p>
                          <p className="text-[12px] mt-0.5" style={{ color: 'var(--fc-example-zh)' }}>{ex.translation}</p>
                        </div>
                        <button
                          onClick={e => { e.stopPropagation(); speak(ex.text, 0.85); }}
                          className="shrink-0 mt-0.5"
                          style={{ color: 'var(--fc-example-zh)' }}
                        >
                          <Volume2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          onClick={() => goTo(currentIdx - 1, displayWords)}
          disabled={currentIdx === 0}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all disabled:opacity-25"
          style={{ background: 'var(--fc-nav-bg)', border: '1px solid var(--fc-nav-border)', color: 'var(--fc-nav-color)', boxShadow: '0 4px 12px rgba(78,52,46,.08)' }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dot indicators (max 7) */}
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
          disabled={currentIdx === displayWords.length - 1}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all disabled:opacity-25"
          style={{ background: 'var(--fc-nav-bg)', border: '1px solid var(--fc-nav-border)', color: 'var(--fc-nav-color)', boxShadow: '0 4px 12px rgba(78,52,46,.08)' }}
        >
          {currentIdx === displayWords.length - 1 ? <Check size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

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
              <button onClick={() => { setCompleted(false); setCurrentIdx(0); setRevealed(false); setHasSeenHint(false); }} style={{ flex: 1, padding: '12px 0', borderRadius: 999, border: '1px solid var(--color-border-2)', background: 'transparent', color: 'var(--color-ink-2)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
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
