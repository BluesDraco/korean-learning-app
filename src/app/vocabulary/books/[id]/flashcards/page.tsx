'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { db } from '@/lib/db';
import { speak } from '@/lib/tts';
import type { WordBook, Word } from '@/types';

export default function FlashcardStudyPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<WordBook | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const b = await db.wordBooks.get(id);
        if (!b) { setLoading(false); return; }
        setBook(b);
        const loaded = await db.words.bulkGet(b.wordIds);
        setWords(loaded.filter((w): w is Word => w != null));
      } catch {
        // ignore auth/network errors, show empty state
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= words.length) return;
    setIsFlipped(false);
    setSwipeOffset(0);
    setExiting(null);
    setCurrentIdx(idx);
  }, [words.length]);

  const goNext = useCallback(() => goTo(currentIdx + 1), [currentIdx, goTo]);
  const goPrev = useCallback(() => goTo(currentIdx - 1), [currentIdx, goTo]);

  // Keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === ' ') { e.preventDefault(); setIsFlipped((f) => !f); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goPrev, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setSwipeOffset(0);
    setIsSwiping(false);
    setExiting(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    // Only horizontal swipe
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5) {
      setIsSwiping(true);
      setSwipeOffset(dx);
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    setIsSwiping(false);

    const SWIPE_THRESHOLD = 80;
    if (swipeOffset > SWIPE_THRESHOLD && currentIdx > 0) {
      setExiting('right');
    } else if (swipeOffset < -SWIPE_THRESHOLD && currentIdx < words.length - 1) {
      setExiting('left');
    } else {
      setSwipeOffset(0);
    }
  };

  const handleClick = () => {
    if (!isSwiping && Math.abs(swipeOffset) < 10) {
      setIsFlipped(!isFlipped);
    }
  };

  // On exiting animation end, advance card
  const handleTransitionEnd = () => {
    if (exiting === 'left') goNext();
    else if (exiting === 'right') goPrev();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!book || words.length === 0) {
    return (
      <div className="py-4 space-y-4">
        <Link href={`/vocabulary/books/${id}`} className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
          <span className="text-sm">返回</span>
        </Link>
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">📝</span>
          <p className="text-[var(--text-secondary)] text-sm mb-1">这个单词本还是空的</p>
          <p className="text-[var(--text-muted)] text-xs mb-4">先去添加一些单词吧</p>
          <Link
            href={`/vocabulary/books/${id}`}
            className="btn-primary inline-flex"
          >
            去添加单词
          </Link>
        </div>
      </div>
    );
  }

  const word = words[currentIdx];

  const getCardTransform = () => {
    if (exiting === 'left') return 'translateX(-120%) rotate(-10deg)';
    if (exiting === 'right') return 'translateX(120%) rotate(10deg)';
    if (isSwiping) return `translateX(${swipeOffset}px) rotate(${swipeOffset * 0.05}deg)`;
    return 'translateX(0) rotate(0deg)';
  };

  return (
    <div className="py-4 flex flex-col gap-4" style={{ minHeight: 'calc(100dvh - 160px)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 shrink-0">
        <Link href={`/vocabulary/books/${id}`} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-[var(--text-primary)] truncate">{book.name}</h1>
          <p className="text-xs text-[var(--text-muted)]">闪卡学习</p>
        </div>
        <span className="text-xs text-[var(--text-muted)]">{currentIdx + 1} / {words.length}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5 shrink-0">
        <div
          className="h-1.5 rounded-full bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex items-center justify-center px-2" style={{ minHeight: '360px' }}>
        <div
          ref={cardRef}
          className="w-full max-w-sm"
          style={{ perspective: '1000px', position: 'relative' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleClick}
          onTransitionEnd={handleTransitionEnd}
        >
          <div
            className="relative w-full"
            style={{
              aspectRatio: '4/5',
              transform: getCardTransform(),
              transition: isSwiping ? 'none' : 'transform 0.35s ease-out',
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.5s ease',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* ── FRONT ── */}
              <div
                className="absolute inset-0 bg-[var(--bg-card)] rounded-2xl border-2 border-[var(--border-color)] flex flex-col items-center justify-center p-6"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className="text-4xl font-bold text-[var(--text-primary)] mb-3 text-center leading-relaxed">
                  {word.word}
                </span>
                <span className="text-sm text-[var(--text-muted)] mb-4">{word.pronunciation}</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--bg-input)] text-[var(--text-secondary)] mb-6">
                  {word.partOfSpeech}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); speak(word.word, 0.8); }}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors font-medium text-sm"
                >
                  <Volume2 size={18} />
                  听发音
                </button>
                <p className="text-xs text-[var(--text-muted)] mt-8">点击翻转卡片</p>
              </div>

              {/* ── BACK ── */}
              <div
                className="absolute inset-0 bg-[var(--bg-card)] rounded-2xl border-2 border-[var(--pink-pale)] flex flex-col p-6 overflow-y-auto"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="text-center mb-4">
                  <span className="text-xl font-bold text-[var(--text-primary)]">{word.word}</span>
                  <span className="text-xs text-[var(--text-muted)] ml-2">{word.pronunciation}</span>
                </div>

                <div className="text-center mb-6">
                  <span className="text-2xl font-bold text-[var(--pink-primary)]">{word.meaning}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-input)] text-[var(--text-secondary)] ml-2">
                    {word.partOfSpeech}
                  </span>
                </div>

                {word.examples.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">例句</p>
                    {word.examples.slice(0, 3).map((ex, i) => (
                      <div key={i} className="bg-[var(--bg-input)] rounded-xl p-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-[var(--text-primary)] leading-relaxed flex-1">{ex.text}</p>
                          <button
                            onClick={(e) => { e.stopPropagation(); speak(ex.text, 0.8); }}
                            className="p-1.5 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] shrink-0"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">{ex.translation}</p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-[var(--text-muted)] text-center mt-auto pt-4">点击翻转回去</p>
              </div>
            </div>
          </div>

          {/* Swipe hints */}
          {currentIdx > 0 && !isSwiping && !exiting && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)]/40 pointer-events-none">
              <ChevronLeft size={24} />
            </div>
          )}
          {currentIdx < words.length - 1 && !isSwiping && !exiting && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)]/40 pointer-events-none">
              <ChevronRight size={24} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-center gap-4 shrink-0 pb-2">
        <button
          onClick={goPrev}
          disabled={currentIdx === 0}
          className="p-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-sm text-[var(--text-muted)] min-w-[60px] text-center">
          {currentIdx + 1} / {words.length}
        </span>
        <button
          onClick={goNext}
          disabled={currentIdx === words.length - 1}
          className="p-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
