'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { pictureBooks } from '@/data/pictureBooks';
import type { PictureBookPage } from '@/data/pictureBooks';

const DESKTOP_MIN = 1100;

function speakKorean(text: string) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR';
  u.rate = 0.75;
  window.speechSynthesis.speak(u);
}

function IllustrationImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <span className="text-4xl sm:text-5xl md:text-6xl leading-relaxed whitespace-pre-line text-center p-4">
        {fallback}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className="w-full h-full object-contain"
      loading="lazy"
    />
  );
}

function PageInfo({ page, compact }: { page: PictureBookPage; compact?: boolean }) {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className={`space-y-1.5 ${compact ? 'text-center' : 'text-center'}`}>
      <p className="text-sm sm:text-base md:text-lg font-bold text-[var(--text-primary)] leading-snug whitespace-pre-line">
        {page.korean}
      </p>
      <p className="text-[11px] sm:text-xs text-[var(--text-muted)] italic">{page.pronunciation}</p>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => speakKorean(page.korean)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors text-[11px] sm:text-xs font-medium"
        >
          <Volume2 size={13} />
          发音
        </button>

        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className={`text-[11px] sm:text-xs transition-colors ${showTranslation ? 'text-[var(--pink-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
        >
          {showTranslation ? '▲ 隐藏译文' : '▼ 显示译文'}
        </button>
      </div>

      {showTranslation && (
        <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] bg-[var(--bg-input)] rounded-lg px-3 py-1.5 whitespace-pre-line">
          {page.chinese}
        </p>
      )}

      <div className="flex flex-wrap gap-1 justify-center">
        {page.vocab.map((v) => (
          <span
            key={v.word}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[var(--bg-input)] text-[10px] sm:text-[11px]"
          >
            <span className="font-medium text-[var(--text-primary)]">{v.word}</span>
            <span className="text-[var(--text-muted)]">{v.meaning}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PictureBookReaderPage() {
  const { id } = useParams<{ id: string }>();
  const book = pictureBooks.find((b) => b.id === id);

  const [currentPage, setCurrentPage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= DESKTOP_MIN);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isDesktop && currentPage % 2 === 1) {
      setCurrentPage((p) => p - 1);
    }
  }, [isDesktop, currentPage]);

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="text-6xl block mb-4">📖</span>
          <p className="text-[var(--text-secondary)] text-sm">找不到这本绘本</p>
          <Link href="/learn/picture-books" className="text-[var(--pink-primary)] text-sm mt-2 inline-block">
            返回列表
          </Link>
        </div>
      </div>
    );
  }

  const totalPages = book.pages.length;
  const pageStep = isDesktop ? 2 : 1;

  const leftIdx = isDesktop ? (currentPage % 2 === 0 ? currentPage : currentPage - 1) : currentPage;
  const rightIdx = isDesktop && leftIdx + 1 < totalPages ? leftIdx + 1 : null;

  const canGoNext = isDesktop ? leftIdx + 2 < totalPages : currentPage < totalPages - 1;
  const canGoPrev = isDesktop ? leftIdx > 0 : currentPage > 0;

  const goNext = useCallback(() => {
    if (!canGoNext) return;
    setCurrentPage((p) => Math.min(p + pageStep, totalPages - 1));
  }, [canGoNext, pageStep, totalPages]);

  const goPrev = useCallback(() => {
    if (!canGoPrev) return;
    setCurrentPage((p) => Math.max(p - pageStep, 0));
  }, [canGoPrev, pageStep]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setSwipeOffset(0);
    setIsSwiping(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5) {
      setIsSwiping(true);
      setSwipeOffset(Math.max(-60, Math.min(60, dx)));
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    if (swipeOffset > 60) goPrev();
    else if (swipeOffset < -60) goNext();
    setSwipeOffset(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const pageLabel = isDesktop
    ? `${leftIdx + 1}${rightIdx !== null ? `–${rightIdx + 1}` : ''} / ${totalPages}`
    : `${currentPage + 1} / ${totalPages}`;

  const numDots = isDesktop ? Math.ceil(totalPages / 2) : totalPages;
  const activeDot = isDesktop ? Math.floor(leftIdx / 2) : currentPage;

  const leftPage = book.pages[leftIdx];
  const rightPage = rightIdx !== null ? book.pages[rightIdx] : null;

  return (
    <div className="h-[100dvh] flex flex-col bg-[#f5f0eb] overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-4 py-2 shrink-0">
        <Link
          href="/learn/picture-books"
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-bold text-[var(--text-primary)] truncate">{book.title}</h1>
        </div>
        <span className="text-xs text-[var(--text-muted)] tabular-nums shrink-0">{pageLabel}</span>
      </header>

      {/* Main content: images + text, scrollable if needed */}
      <div
        className="flex-1 flex flex-col items-center overflow-y-auto min-h-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isDesktop ? (
          /* ===== Desktop: dual-page spread ===== */
          <div className="flex flex-col items-center justify-center gap-3 py-3 px-4 min-h-full">
            {/* Two images side by side */}
            <div className="flex items-stretch max-w-full shrink-0" style={{ height: 'min(65vh, 600px)' }}>
              <div className="h-full rounded-l-2xl overflow-hidden shadow-lg bg-white" style={{ aspectRatio: '3/4' }}>
                {leftPage.imageUrl ? (
                  <IllustrationImage src={leftPage.imageUrl} fallback={leftPage.illustration} alt={leftPage.chinese} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: leftPage.bgColor }}>
                    <span className="text-5xl whitespace-pre-line text-center">{leftPage.illustration}</span>
                  </div>
                )}
              </div>

              {/* Spine */}
              <div className="h-full w-3 flex-shrink-0 relative">
                <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-[2px] bg-gray-300/50 rounded-full" />
                <div className="absolute inset-y-2 left-0 w-[1px] bg-gradient-to-r from-transparent via-gray-200/30 to-gray-300/20" />
                <div className="absolute inset-y-2 right-0 w-[1px] bg-gradient-to-l from-transparent via-gray-200/30 to-gray-300/20" />
              </div>

              {rightPage ? (
                <div className="h-full rounded-r-2xl overflow-hidden shadow-lg bg-white" style={{ aspectRatio: '3/4' }}>
                  {rightPage.imageUrl ? (
                    <IllustrationImage src={rightPage.imageUrl} fallback={rightPage.illustration} alt={rightPage.chinese} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: rightPage.bgColor }}>
                      <span className="text-5xl whitespace-pre-line text-center">{rightPage.illustration}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full rounded-r-2xl overflow-hidden" style={{ aspectRatio: '3/4' }} aria-hidden />
              )}
            </div>

            {/* Text info for both pages */}
            <div className="flex gap-3 w-full max-w-[calc(2*min(65vh,600px)*3/4+12px)]">
              <div className="flex-1 bg-white/70 backdrop-blur rounded-xl px-3 py-2 shadow-sm">
                <PageInfo page={leftPage} compact />
              </div>
              {rightPage ? (
                <div className="flex-1 bg-white/70 backdrop-blur rounded-xl px-3 py-2 shadow-sm">
                  <PageInfo page={rightPage} compact />
                </div>
              ) : (
                <div className="flex-1" aria-hidden />
              )}
            </div>
          </div>
        ) : (
          /* ===== Tablet / Mobile: single page ===== */
          <div className="flex flex-col items-center justify-center gap-2 py-2 px-2 min-h-full w-full">
            {/* Image card */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-lg bg-white shrink-0 transition-transform duration-150 ease-out"
              style={{
                aspectRatio: '3/4',
                maxHeight: 'min(68vh, calc(100dvh - 200px))',
                maxWidth: 'calc(100vw - 16px)',
                transform: isSwiping ? `translateX(${swipeOffset}px)` : 'translateX(0)',
              }}
            >
              {leftPage.imageUrl ? (
                <IllustrationImage src={leftPage.imageUrl} fallback={leftPage.illustration} alt={leftPage.chinese} />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: leftPage.bgColor }}>
                  <span className="text-4xl whitespace-pre-line text-center p-4">{leftPage.illustration}</span>
                </div>
              )}

              {/* Swipe hints */}
              {canGoPrev && !isSwiping && (
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none drop-shadow-md">
                  <ChevronLeft size={22} />
                </div>
              )}
              {canGoNext && !isSwiping && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none drop-shadow-md">
                  <ChevronRight size={22} />
                </div>
              )}
            </div>

            {/* Text info below image */}
            <div className="w-full max-w-[calc(100vw-16px)] bg-white/70 backdrop-blur rounded-xl px-3 py-2 shadow-sm">
              <PageInfo page={leftPage} compact />
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <nav className="flex items-center justify-center gap-3 py-2 shrink-0">
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          className="p-2 rounded-full bg-white/80 border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          aria-label="上一页"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-1.5 min-w-[50px] justify-center">
          {Array.from({ length: numDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(isDesktop ? i * 2 : i)}
              className={`rounded-full transition-all ${
                i === activeDot
                  ? 'w-2.5 h-2.5 bg-[var(--pink-primary)] shadow-sm'
                  : 'w-1.5 h-1.5 bg-[var(--border-color)] hover:bg-[var(--text-muted)]'
              }`}
              aria-label={`第 ${i + 1} 页`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={!canGoNext}
          className="p-2 rounded-full bg-white/80 border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          aria-label="下一页"
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    </div>
  );
}
