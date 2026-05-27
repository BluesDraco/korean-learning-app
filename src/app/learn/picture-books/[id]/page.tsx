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

function PageCard({ page, side, pageIdx }: { page: PictureBookPage; side: 'left' | 'right' | 'single'; pageIdx: number }) {
  const [showTranslation, setShowTranslation] = useState(false);

  const radiusClass =
    side === 'left' ? 'md:rounded-l-2xl md:rounded-r-none md:border-r-0 rounded-2xl' :
    side === 'right' ? 'md:rounded-r-2xl md:rounded-l-none md:border-l-0 rounded-2xl' :
    'rounded-2xl';

  return (
    <div className={`flex flex-col h-full ${radiusClass} border-2 border-[var(--border-color)] overflow-hidden bg-white shadow-lg relative`}>
      {/* Illustration — 50% */}
      <div
        className="flex-[5] flex items-center justify-center p-3 sm:p-4 relative overflow-hidden min-h-0"
        style={{ backgroundColor: page.bgColor }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
        <span className="relative z-10 text-4xl sm:text-5xl md:text-6xl leading-relaxed whitespace-pre-line text-center">
          {page.illustration}
        </span>
      </div>

      {/* Text area — 50% */}
      <div className="flex-[5] flex flex-col justify-center p-3 sm:p-4 md:p-5 bg-[var(--bg-card)] space-y-2 sm:space-y-3 min-h-0 overflow-y-auto">
        <div className="text-center space-y-1">
          <h2 className="text-lg sm:text-xl md:text-[28px] font-bold text-[var(--text-primary)] leading-relaxed whitespace-pre-line">
            {page.korean}
          </h2>
          <p className="text-[11px] sm:text-[13px] text-[var(--text-muted)] italic">{page.pronunciation}</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => speakKorean(page.korean)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors text-xs font-medium"
          >
            <Volume2 size={14} />
            听发音
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={`text-[11px] sm:text-xs transition-colors ${showTranslation ? 'text-[var(--pink-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
          >
            {showTranslation ? '▲ 隐藏翻译' : '▼ 显示翻译'}
          </button>
          {showTranslation && (
            <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] mt-1 sm:mt-1.5 bg-[var(--bg-input)] rounded-lg p-2 whitespace-pre-line">
              {page.chinese}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-1 justify-center pt-0.5">
          {page.vocab.map((v) => (
            <span
              key={v.word}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[10px] sm:text-[11px]"
            >
              <span className="font-medium text-[var(--text-primary)]">{v.word}</span>
              <span className="text-[var(--text-muted)]">{v.meaning}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Page number in corner */}
      <span className="absolute bottom-2 right-3 text-[10px] text-[var(--text-muted)]/60 tabular-nums">
        {pageIdx + 1}
      </span>
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

  // Align currentPage to left-of-spread on desktop
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

  // On desktop, currentPage is the left page; right page may be null on last spread
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

  // Touch
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

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  // Page number label
  const pageLabel = isDesktop
    ? `${leftIdx + 1}${rightIdx !== null ? `–${rightIdx + 1}` : ''} / ${totalPages}`
    : `${currentPage + 1} / ${totalPages}`;

  // Dot indicators
  const numDots = isDesktop ? Math.ceil(totalPages / 2) : totalPages;
  const activeDot = isDesktop ? Math.floor(leftIdx / 2) : currentPage;

  const leftPage = book.pages[leftIdx];
  const rightPage = rightIdx !== null ? book.pages[rightIdx] : null;

  return (
    <div className="h-[100dvh] flex flex-col bg-[#f5f0eb] overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-4 py-2.5 shrink-0">
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

      {/* Book area */}
      <div
        className="flex-1 flex items-center justify-center min-h-0 px-2 sm:px-4 md:px-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isDesktop ? (
          /* ===== Desktop: dual-page spread ===== */
          <div className="flex items-stretch max-w-full" style={{ height: 'min(82vh, 720px)' }}>
            {/* Left page */}
            <div className="h-full" style={{ aspectRatio: '3/4' }}>
              <PageCard key={leftIdx} page={leftPage} side={rightIdx !== null ? 'left' : 'single'} pageIdx={leftIdx} />
            </div>

            {/* Spine / crease */}
            <div className="h-full w-3 flex-shrink-0 relative">
              <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-[2px] bg-gray-300/50 rounded-full" />
              <div className="absolute inset-y-2 left-0 w-[1px] bg-gradient-to-r from-transparent via-gray-200/30 to-gray-300/20" />
              <div className="absolute inset-y-2 right-0 w-[1px] bg-gradient-to-l from-transparent via-gray-200/30 to-gray-300/20" />
            </div>

            {/* Right page */}
            {rightPage ? (
              <div className="h-full" style={{ aspectRatio: '3/4' }}>
                <PageCard key={rightIdx!} page={rightPage} side="right" pageIdx={rightIdx!} />
              </div>
            ) : (
              <div className="h-full" style={{ aspectRatio: '3/4' }} aria-hidden />
            )}
          </div>
        ) : (
          /* ===== Tablet / Mobile: single page ===== */
          <div className="w-full flex items-center justify-center relative h-[calc(100dvh-100px)] md:h-[82vh]">
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,160,160,0.12) 0%, transparent 60%)',
              }}
            />

            <div
              className="relative h-full max-w-[calc(100vw-16px)] transition-transform duration-150 ease-out"
              style={{
                aspectRatio: '3/4',
                transform: isSwiping ? `translateX(${swipeOffset}px)` : 'translateX(0)',
              }}
            >
              <PageCard key={currentPage} page={leftPage} side="single" pageIdx={leftIdx} />

              {/* Swipe arrow hints */}
              {canGoPrev && !isSwiping && (
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400/25 pointer-events-none">
                  <ChevronLeft size={24} />
                </div>
              )}
              {canGoNext && !isSwiping && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400/25 pointer-events-none">
                  <ChevronRight size={24} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <nav className="flex items-center justify-center gap-4 py-3 shrink-0">
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          className="p-2.5 rounded-full bg-white/80 border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          aria-label="上一页"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-1.5 min-w-[60px] justify-center">
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
          className="p-2.5 rounded-full bg-white/80 border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          aria-label="下一页"
        >
          <ChevronRight size={20} />
        </button>
      </nav>
    </div>
  );
}
