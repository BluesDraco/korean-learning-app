'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { pictureBooks } from '@/data/pictureBooks';
import type { PictureBookPage } from '@/data/pictureBooks';

const FLIP_DURATION = 600;

function speakKorean(text: string) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR';
  u.rate = 0.75;
  window.speechSynthesis.speak(u);
}

/* ═══════════════════════════════════════════════════════
   Seeded random decorations
   ═══════════════════════════════════════════════════════ */
function mulberry32(a: number) {
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const DECO_STICKERS = ['⭐', '🌸', '💜', '✨', '🍀', '💖', '🌷', '🩷'];
const TAPE_COLORS = ['rgba(255,143,171,0.55)', 'rgba(255,228,160,0.55)', 'rgba(201,184,232,0.55)', 'rgba(168,216,208,0.55)'];

function PageDecorations({ pageIdx, seed }: { pageIdx: number; seed: number }) {
  const decos = useMemo(() => {
    const rng = mulberry32(seed + pageIdx * 137);
    const count = rng() > 0.5 ? 2 : 1;
    const items: { type: 'tape' | 'sticker'; x: number; y: number; rotate: number; color?: string; emoji?: string }[] = [];
    for (let i = 0; i < count; i++) {
      if (rng() > 0.5) {
        items.push({
          type: 'tape', x: 5 + rng() * 80, y: 2 + rng() * 15,
          rotate: (rng() - 0.5) * 20,
          color: TAPE_COLORS[Math.floor(rng() * TAPE_COLORS.length)],
        });
      } else {
        items.push({
          type: 'sticker', x: 5 + rng() * 85, y: 5 + rng() * 85,
          rotate: (rng() - 0.5) * 30,
          emoji: DECO_STICKERS[Math.floor(rng() * DECO_STICKERS.length)],
        });
      }
    }
    return items;
  }, [pageIdx, seed]);

  return (
    <>
      {decos.map((d, i) =>
        d.type === 'tape' ? (
          <div key={i} className="absolute z-20 pointer-events-none" style={{
            left: `${d.x}%`, top: `${d.y}%`, width: '50px', height: '14px',
            borderRadius: '2px', background: d.color,
            transform: `rotate(${d.rotate}deg)`, opacity: 0.6,
          }} />
        ) : (
          <span key={i} className="absolute z-20 pointer-events-none select-none" style={{
            left: `${d.x}%`, top: `${d.y}%`, fontSize: '14px',
            transform: `rotate(${d.rotate}deg)`, opacity: 0.7,
          }}>{d.emoji}</span>
        )
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   Illustration
   ═══════════════════════════════════════════════════════ */
function IllustrationImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [error, setError] = useState(false);
  if (error || !src) {
    return <span className="text-4xl sm:text-5xl leading-relaxed whitespace-pre-line text-center p-4">{fallback}</span>;
  }
  return <img src={src} alt={alt} onError={() => setError(true)} className="w-full h-full object-contain" loading="lazy" />;
}

/* ═══════════════════════════════════════════════════════
   Image card
   ═══════════════════════════════════════════════════════ */
function ImageCard({ page, pageIdx, total, seed }: { page: PictureBookPage; pageIdx: number; total: number; seed: number }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg relative" style={{ backgroundColor: '#FDF8F0' }}>
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }} />
      <div className="absolute inset-0 pointer-events-none z-10 rounded-2xl" style={{
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.04), inset 0 0 3px rgba(0,0,0,0.03)',
      }} />
      <div className="absolute inset-0 flex items-center justify-center">
        {page.imageUrl ? (
          <IllustrationImage src={page.imageUrl} fallback={page.illustration} alt={page.chinese} />
        ) : (
          <span className="text-4xl whitespace-pre-line text-center p-4">{page.illustration}</span>
        )}
      </div>
      <PageDecorations pageIdx={pageIdx} seed={seed} />
      <span className="absolute bottom-3 left-0 right-0 text-center text-[11px] text-[#ccc] z-30 pointer-events-none select-none"
        style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
        {pageIdx + 1} / {total}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Vocab Summary Panel — last page
   ═══════════════════════════════════════════════════════ */
function VocabSummaryPanel({ page }: { page: PictureBookPage }) {
  return (
    <div className="flex flex-col justify-center h-full">
      <div className="text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">📝 学到的词汇</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 max-w-md mx-auto">
          {page.vocab.map((v) => (
            <div key={v.word} className="flex items-center gap-3 bg-white/70 rounded-xl px-4 py-3">
              <span className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">{v.word}</span>
              <span className="w-px h-4 bg-[var(--border-color)]" />
              <span className="text-base sm:text-lg text-[var(--text-secondary)]">{v.meaning}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Text Panel — learning-first journal design
   ═══════════════════════════════════════════════════════ */
function TextPanel({ page }: { page: PictureBookPage }) {
  if (page.isSummary) {
    return <VocabSummaryPanel page={page} />;
  }

  const koLines = page.korean.split('\n');
  const proLines = page.pronunciation.split('\n');
  const zhLines = page.chinese.split('\n');
  const n = koLines.length;

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="space-y-5 sm:space-y-6">

        {/* ── Sentence groups ── */}
        {koLines.map((ko, i) => (
          <div key={i} className="flex gap-3 sm:gap-4">
            {/* Line number */}
            <span
              className="text-sm sm:text-base text-[var(--text-muted)]/35 font-medium tabular-nums shrink-0 w-6 text-right select-none pt-1"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="flex-1 min-w-0 space-y-1">
              {/* Pronunciation above */}
              <p className="text-sm sm:text-base text-[var(--text-muted)]/60 italic leading-relaxed">
                {proLines[i] ?? '…'}
              </p>

              {/* Korean */}
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-snug">
                {ko}
              </p>

              {/* Chinese below */}
              <p className="text-base sm:text-lg text-[var(--text-secondary)]/75 leading-relaxed">
                {zhLines[i] ?? '…'}
              </p>
            </div>
          </div>
        ))}

        {/* ── Action bar ── */}
        <div className="flex items-center gap-3 flex-wrap pl-9">
          <button
            onClick={() => speakKorean(page.korean)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--pink-primary)] text-white hover:opacity-90 active:scale-95 transition-all text-base font-semibold shadow-md shadow-[var(--pink-primary)]/20"
          >
            <Volume2 size={17} />
            听朗读
          </button>

          {/* Vocab chips */}
          <div className="flex flex-wrap gap-2">
            {page.vocab.map((v) => (
              <span key={v.word}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
                style={{
                  background: 'white',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                }}
              >
                <span className="font-bold text-[var(--text-primary)]">{v.word}</span>
                <span className="w-px h-3 bg-[var(--border-color)]" />
                <span className="text-[var(--text-muted)]">{v.meaning}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Reader
   ═══════════════════════════════════════════════════════ */
export default function PictureBookReaderPage() {
  const { id } = useParams<{ id: string }>();
  const book = pictureBooks.find((b) => b.id === id);

  const [currentPage, setCurrentPage] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const [flip, setFlip] = useState<{ to: number; dir: 'forward' | 'backward'; active: boolean } | null>(null);
  const flipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const decoSeed = useMemo(() => book ? book.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) : 0, [book]);

  useEffect(() => {
    return () => { if (flipTimerRef.current) clearTimeout(flipTimerRef.current); };
  }, []);

  const totalPages = book?.pages.length ?? 0;
  const canGoNext = currentPage < totalPages - 1;
  const canGoPrev = currentPage > 0;

  const executeFlip = useCallback((dir: 'forward' | 'backward') => {
    const target = dir === 'forward'
      ? Math.min(currentPage + 1, totalPages - 1)
      : Math.max(currentPage - 1, 0);

    setFlip({ to: target, dir, active: false });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlip((prev) => prev ? { ...prev, active: true } : null);
      });
    });

    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    flipTimerRef.current = setTimeout(() => {
      setCurrentPage(target);
      setFlip(null);
    }, FLIP_DURATION + 20);
  }, [currentPage, totalPages]);

  const goNext = useCallback(() => {
    if (!canGoNext || flip) return;
    executeFlip('forward');
  }, [canGoNext, flip, executeFlip]);

  const goPrev = useCallback(() => {
    if (!canGoPrev || flip) return;
    executeFlip('backward');
  }, [canGoPrev, flip, executeFlip]);

  const jumpToPage = useCallback((target: number) => {
    if (flip || target === currentPage || target < 0 || target >= totalPages) return;
    if (target === currentPage + 1) { executeFlip('forward'); return; }
    if (target === currentPage - 1) { executeFlip('backward'); return; }
    setCurrentPage(target);
  }, [flip, currentPage, totalPages, executeFlip]);

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

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="text-6xl block mb-4">📖</span>
          <p className="text-[var(--text-secondary)] text-sm">找不到这本绘本</p>
          <Link href="/learn/picture-books" className="text-[var(--pink-primary)] text-sm mt-2 inline-block">返回列表</Link>
        </div>
      </div>
    );
  }

  const page = book.pages[currentPage];
  const flipActive = flip?.active ?? false;
  const flipPage = flip ? book.pages[flip.to] : null;
  const displayPage = flipPage ?? page;

  const leavingTransform = flipActive ? 'rotateY(-180deg)' : 'rotateY(0deg)';
  const enteringTransform = flipActive ? 'rotateY(0deg)' : 'rotateY(180deg)';

  return (
    <div className="h-[100dvh] flex flex-col bg-[#f5f0eb] overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-3 sm:px-5 py-3 shrink-0">
        <Link
          href="/learn/picture-books"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/80 border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-primary)] hover:bg-white transition-all shadow-sm text-sm font-medium"
        >
          <ArrowLeft size={17} />
          <span className="hidden sm:inline">返回</span>
        </Link>
        <div className="flex-1 min-w-0 text-center">
          <h1 className="text-base font-bold text-[var(--text-primary)] truncate">{book.title}</h1>
        </div>
        <span className="text-sm text-[var(--text-muted)] tabular-nums shrink-0 font-medium">{currentPage + 1} / {totalPages}</span>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center min-h-0 px-3 sm:px-5 py-2 relative">
        {/* ── Left side nav button ── */}
        {canGoPrev && !flip && (
          <button
            onClick={goPrev}
            className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/60 hover:bg-white/90 text-[var(--text-primary)] hover:text-[var(--pink-primary)] backdrop-blur-sm border border-white/40 hover:border-[var(--pink-primary)]/30 shadow-md hover:shadow-lg transition-all opacity-50 hover:opacity-100"
            aria-label="上一页"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* ── Right side nav button ── */}
        {canGoNext && !flip && (
          <button
            onClick={goNext}
            className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/60 hover:bg-white/90 text-[var(--text-primary)] hover:text-[var(--pink-primary)] backdrop-blur-sm border border-white/40 hover:border-[var(--pink-primary)]/30 shadow-md hover:shadow-lg transition-all opacity-50 hover:opacity-100"
            aria-label="下一页"
          >
            <ChevronRight size={20} />
          </button>
        )}

        <div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-4 sm:gap-5 md:gap-8 w-full max-w-5xl h-full md:max-h-[80vh]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* ── Image ── */}
          <div
            className="relative shrink-0 transition-transform duration-150 ease-out md:w-[43%] w-full"
            style={{
              aspectRatio: '3/4',
              maxHeight: 'min(70vh, calc(100dvh - 200px))',
              perspective: '1200px',
              transform: isSwiping && !flip ? `translateX(${swipeOffset}px)` : 'translateX(0)',
            }}
          >
            {flip ? (
              <>
                <div className="absolute inset-0 z-20 rounded-2xl overflow-hidden shadow-lg" style={{
                  transformOrigin: 'left center', transform: leavingTransform,
                  transition: flipActive ? `transform ${FLIP_DURATION}ms ease-in-out` : 'none',
                  backfaceVisibility: 'hidden', backgroundColor: '#FDF8F0',
                }}>
                  <ImageCard page={book.pages[flip.dir === 'forward' ? currentPage : flip.to]} pageIdx={flip.dir === 'forward' ? currentPage : flip.to} total={totalPages} seed={decoSeed} />
                </div>
                <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden shadow-lg" style={{
                  transformOrigin: 'left center', transform: enteringTransform,
                  transition: flipActive ? `transform ${FLIP_DURATION}ms ease-in-out` : 'none',
                  backfaceVisibility: 'hidden', backgroundColor: '#FDF8F0',
                }}>
                  <ImageCard page={book.pages[flip.to]} pageIdx={flip.to} total={totalPages} seed={decoSeed} />
                </div>
              </>
            ) : (
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg">
                <ImageCard page={page} pageIdx={currentPage} total={totalPages} seed={decoSeed} />
              </div>
            )}

          </div>

          {/* ── Text ── */}
          <div className="flex-1 md:min-w-0 md:overflow-y-auto md:py-1 w-full">
            <TextPanel page={displayPage} />
          </div>
        </div>
      </div>

      {/* Bottom page numbers */}
      <nav className="flex items-center justify-center gap-1.5 py-2.5 px-4 shrink-0 overflow-x-auto">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => jumpToPage(i)}
            disabled={!!flip}
            className={`shrink-0 min-w-[28px] h-7 rounded-md text-sm font-medium tabular-nums transition-all ${
              i === currentPage
                ? 'bg-[var(--pink-primary)] text-white shadow-sm scale-110'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/60'
            }`}
            aria-label={`第 ${i + 1} 页`}
          >
            {i + 1}
          </button>
        ))}
      </nav>
    </div>
  );
}
