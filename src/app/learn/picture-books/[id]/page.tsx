'use client';

import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, Sparkles } from 'lucide-react';
import { pictureBooks } from '@/data/pictureBooks';
import type { PictureBook } from '@/data/pictureBooks';

function PictureBookImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <span className="text-5xl sm:text-6xl block leading-relaxed whitespace-pre-line">
        {fallback}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className="max-w-full max-h-[45vh] object-contain rounded-2xl"
      loading="lazy"
    />
  );
}

function speakKorean(text: string) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR';
  u.rate = 0.75;
  window.speechSynthesis.speak(u);
}

export default function PictureBookReaderPage() {
  const { id } = useParams<{ id: string }>();
  const book = pictureBooks.find((b) => b.id === id);

  const [currentPage, setCurrentPage] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [animDirection, setAnimDirection] = useState<'forward' | 'backward'>('forward');

  const cardRef = useRef<HTMLDivElement>(null);

  if (!book) {
    return (
      <div className="py-4 space-y-4">
        <Link href="/learn/picture-books" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
          <span className="text-sm">返回</span>
        </Link>
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">📖</span>
          <p className="text-[var(--text-secondary)] text-sm">找不到这本绘本</p>
        </div>
      </div>
    );
  }

  const totalPages = book.pages.length;
  const page = book.pages[currentPage];

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= totalPages) return;
    setShowTranslation(false);
    setSwipeOffset(0);
    setExiting(null);
    setAnimDirection(idx > currentPage ? 'forward' : 'backward');
    setCurrentPage(idx);
  }, [currentPage, totalPages]);

  const goNext = useCallback(() => goTo(currentPage + 1), [currentPage, goTo]);
  const goPrev = useCallback(() => goTo(currentPage - 1), [currentPage, goTo]);

  // Touch handlers
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
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5) {
      setIsSwiping(true);
      setSwipeOffset(dx);
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    setIsSwiping(false);
    const SWIPE_THRESHOLD = 80;
    if (swipeOffset > SWIPE_THRESHOLD && currentPage > 0) {
      setExiting('right');
    } else if (swipeOffset < -SWIPE_THRESHOLD && currentPage < totalPages - 1) {
      setExiting('left');
    } else {
      setSwipeOffset(0);
    }
  };

  const handleTransitionEnd = () => {
    if (exiting === 'left') goNext();
    else if (exiting === 'right') goPrev();
  };

  // Keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goPrev();
    else if (e.key === 'ArrowRight') goNext();
  };

  const getCardTransform = () => {
    if (exiting === 'left') return 'translateX(-120%) rotate(-8deg)';
    if (exiting === 'right') return 'translateX(120%) rotate(8deg)';
    if (isSwiping) return `translateX(${swipeOffset}px) rotate(${swipeOffset * 0.03}deg)`;
    return 'translateX(0) rotate(0deg)';
  };

  return (
    <div
      className="py-4 space-y-3 flex flex-col min-h-[calc(100vh-8rem)] outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div className="flex items-center gap-3 shrink-0">
        <Link href="/learn/picture-books" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-[var(--text-primary)] truncate">{book.title}</h1>
          <p className="text-xs text-[var(--text-muted)]">{book.titleKo}</p>
        </div>
        <span className="text-xs text-[var(--text-muted)]">{currentPage + 1} / {totalPages}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5 shrink-0">
        <div
          className="h-1.5 rounded-full bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] transition-all duration-300"
          style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
        />
      </div>

      {/* Page card */}
      <div className="flex-1 flex flex-col" ref={cardRef}>
        <div
          className="flex-1 flex flex-col rounded-3xl overflow-hidden border-2 border-[var(--border-color)] relative"
          style={{
            transform: getCardTransform(),
            transition: isSwiping ? 'none' : 'transform 0.35s ease-out',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTransitionEnd={handleTransitionEnd}
        >
          {/* Illustration area */}
          <div
            className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-center min-h-[200px] relative overflow-hidden"
            style={{ backgroundColor: page.bgColor }}
          >
            {/* Decorative dots */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {page.imageUrl ? (
                <PictureBookImage
                  src={page.imageUrl}
                  fallback={page.illustration}
                  alt={page.chinese}
                />
              ) : (
                <span className="text-5xl sm:text-6xl block leading-relaxed whitespace-pre-line">
                  {page.illustration}
                </span>
              )}
              {currentPage === 0 && (
                <span className="absolute -top-1 right-0 text-lg animate-float">✨</span>
              )}
            </div>
          </div>

          {/* Korean text area */}
          <div className="p-5 bg-[var(--bg-card)] space-y-3">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-relaxed">
                {page.korean}
              </h2>
              <p className="text-sm text-[var(--text-muted)]">{page.pronunciation}</p>
            </div>

            {/* Audio button */}
            <div className="flex justify-center">
              <button
                onClick={() => speakKorean(page.korean)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors font-medium text-sm"
              >
                <Volume2 size={18} />
                听朗读
              </button>
            </div>

            {/* Translation toggle */}
            <div className="text-center">
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className={`text-xs transition-all ${
                  showTranslation
                    ? 'text-[var(--pink-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {showTranslation ? '▲ 隐藏翻译' : '▼ 显示翻译'}
              </button>
              {showTranslation && (
                <p className="text-sm text-[var(--text-secondary)] mt-2 bg-[var(--bg-input)] rounded-xl p-3 animate-fade-in">
                  {page.chinese}
                </p>
              )}
            </div>

            {/* Vocab tags */}
            <div className="flex flex-wrap gap-2 justify-center pt-1">
              {page.vocab.map((v) => (
                <span
                  key={v.word}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-input)] text-xs"
                >
                  <span className="font-medium text-[var(--text-primary)]">{v.word}</span>
                  <span className="text-[var(--text-muted)]">{v.meaning}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Page edge decorative line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ backgroundColor: book.color, opacity: 0.3 }}
          />
        </div>

        {/* Swipe hints */}
        {currentPage > 0 && !isSwiping && !exiting && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]/25 pointer-events-none">
            <ChevronLeft size={28} />
          </div>
        )}
        {currentPage < totalPages - 1 && !isSwiping && !exiting && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]/25 pointer-events-none">
            <ChevronRight size={28} />
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-center gap-4 shrink-0 pb-2">
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          className="p-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-1.5 min-w-[80px] justify-center">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all ${
                i === currentPage
                  ? 'w-2 h-2 bg-[var(--pink-primary)]'
                  : 'w-1.5 h-1.5 bg-[var(--border-default)] hover:bg-[var(--text-muted)]'
              }`}
            />
          ))}
        </div>
        <button
          onClick={goNext}
          disabled={currentPage === totalPages - 1}
          className="p-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Autoplay hint */}
      <div className="text-center shrink-0">
        <p className="text-xs text-[var(--text-muted)] flex items-center justify-center gap-1">
          <Sparkles size={10} />
          左右滑动翻页，或使用键盘箭头键
        </p>
      </div>
    </div>
  );
}
