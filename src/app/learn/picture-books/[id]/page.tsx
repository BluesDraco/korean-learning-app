'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { pictureBooks } from '@/data/pictureBooks';
import type { PictureBookPage } from '@/data/pictureBooks';
import { speak } from '@/lib/tts';

const FLIP_DURATION = 600;

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
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Vocab Summary Panel — last page
   ═══════════════════════════════════════════════════════ */
function VocabSummaryPanel({ page }: { page: PictureBookPage }) {
  return (
    <div className="flex flex-col justify-center h-full py-2">
      <div className="space-y-5 max-w-sm mx-auto w-full">
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            学到的词汇
          </h2>
          <p className="text-xs text-[var(--text-muted)]">共 {page.vocab.length} 个单词</p>
        </div>

        {/* Word list */}
        <div className="space-y-0.5">
          {page.vocab.map((v, i) => (
            <div
              key={v.word}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/40 transition-colors group"
            >
              {/* Number */}
              <span
                className="text-xs font-medium text-[var(--text-muted)]/40 tabular-nums w-5 shrink-0 text-right"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Korean */}
              <span className="text-lg sm:text-xl font-bold text-[var(--text-primary)] shrink-0 group-hover:text-[var(--pink-primary)] transition-colors">
                {v.word}
              </span>

              {/* Dotted connector */}
              <span className="flex-1 border-b border-dotted border-[var(--text-muted)]/20 min-w-[20px]" />

              {/* Chinese */}
              <span className="text-sm sm:text-base text-[var(--text-secondary)] shrink-0">
                {v.meaning}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-2">
          <button
            onClick={() => {
              const words = page.vocab.map((v) => v.word).join(', ');
              speak(words, 0.7);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/70 border border-[var(--border-color)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--pink-primary)] hover:border-[var(--pink-primary)]/30 transition-all"
          >
            <Volume2 size={14} />
            朗读全部词汇
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Text Panel — learning-first journal design
   ═══════════════════════════════════════════════════════ */
function TextPanel({ page, showChinese, onToggleChinese }: { page: PictureBookPage; showChinese: boolean; onToggleChinese: () => void }) {
  if (page.isSummary) {
    return <VocabSummaryPanel page={page} />;
  }

  const koLines = page.korean.split('\n');
  const proLines = page.pronunciation.split('\n');
  const zhLines = page.chinese.split('\n');
  const n = koLines.length;

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="space-y-3 sm:space-y-3.5">

        {/* ── Sentence groups ── */}
        {koLines.map((ko, i) => (
          <div key={i} className="flex gap-3 sm:gap-4">
            {/* Line number */}
            <span
              className="text-xs sm:text-sm text-[var(--text-muted)]/30 font-medium tabular-nums shrink-0 w-5 text-right select-none pt-1"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="flex-1 min-w-0 space-y-0.5">
              {/* Pronunciation above */}
              <p className="text-xs sm:text-sm text-[var(--text-muted)]/55 leading-relaxed">
                {proLines[i] ?? '…'}
              </p>

              {/* Korean + per-sentence朗读 */}
              <div className="flex items-center gap-1.5">
                <p className="text-xl sm:text-2xl md:text-[26px] font-bold text-[var(--text-primary)] leading-snug tracking-tight">
                  {ko}
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); speak(ko, 0.75); }}
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--pink-primary)]/10 text-[var(--text-muted)] hover:text-[var(--pink-primary)] active:scale-90 transition-all"
                  title="朗读本句"
                >
                  <Volume2 size={15} />
                </button>
              </div>

              {/* Chinese below */}
              {showChinese && (
                <p className="text-sm sm:text-[15px] text-[var(--text-secondary)]/70 leading-relaxed animate-slide-up">
                  {zhLines[i] ?? '…'}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* ── Action bar ── */}
        <div className="flex items-center gap-3 flex-wrap pl-8 pt-1">
          <button
            onClick={onToggleChinese}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
              showChinese
                ? 'bg-[var(--pink-primary)]/10 border-[var(--pink-primary)]/30 text-[var(--pink-primary)]'
                : 'bg-white/60 border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--pink-primary)]/30 hover:text-[var(--pink-primary)]'
            }`}
          >
            {showChinese ? '隐藏译文' : '显示译文'}
          </button>

          {/* Vocab chips */}
          <div className="flex flex-wrap gap-1.5">
            {page.vocab.map((v) => (
              <span key={v.word}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <span className="font-semibold text-[var(--text-primary)]">{v.word}</span>
                <span className="text-[var(--text-muted)]/60">·</span>
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

  const [showChinese, setShowChinese] = useState(false);
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
    <div className="flex flex-col overflow-hidden" style={{ background: 'linear-gradient(180deg, #f9f5ef 0%, #f2ece3 100%)', height: 'calc(100dvh - 96px)' }}>
      {/* Top bar */}
      <header className="flex items-center gap-3 px-4 sm:px-6 py-1.5 shrink-0 relative">
        <Link
          href="/learn/picture-books"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 hover:bg-white text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-color)] hover:shadow-sm transition-all text-base font-medium"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">绘本列表</span>
        </Link>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-base sm:text-lg font-bold text-[var(--text-primary)] truncate max-w-[40%]">{book.title}</h1>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center min-h-0 px-3 sm:px-4 relative">
        {/* ── Left side nav ── */}
        <button
          onClick={goPrev}
          disabled={!canGoPrev || !!flip}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full flex items-center justify-center bg-white/50 hover:bg-[var(--pink-primary)] text-[var(--text-muted)] hover:text-white backdrop-blur-sm shadow-sm hover:shadow-md transition-all opacity-0 md:opacity-100 disabled:opacity-0 disabled:pointer-events-none"
          aria-label="上一页"
        >
          <ChevronLeft size={18} />
        </button>

        {/* ── Right side nav ── */}
        <button
          onClick={goNext}
          disabled={!canGoNext || !!flip}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full flex items-center justify-center bg-white/50 hover:bg-[var(--pink-primary)] text-[var(--text-muted)] hover:text-white backdrop-blur-sm shadow-sm hover:shadow-md transition-all opacity-0 md:opacity-100 disabled:opacity-0 disabled:pointer-events-none"
          aria-label="下一页"
        >
          <ChevronRight size={18} />
        </button>

        <div
          className="flex flex-col md:flex-row items-center md:items-center gap-3 sm:gap-4 md:gap-6 w-full max-w-5xl h-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* ── Image ── */}
          <div
            className="relative shrink-0 transition-transform duration-150 ease-out md:w-[43%] w-full"
            style={{
              aspectRatio: '3/4',
              maxHeight: 'min(64vh, calc(100dvh - 180px))',
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
          <div className="flex-1 md:min-w-0 w-full overflow-hidden">
            <TextPanel page={displayPage} showChinese={showChinese} onToggleChinese={() => setShowChinese((v) => !v)} />
          </div>
        </div>
      </div>

      {/* Bottom page numbers */}
      <nav className="flex items-center justify-center gap-1 pb-1.5 px-4 shrink-0 -mt-3">
        <div className="flex items-center gap-0.5 bg-white/40 backdrop-blur-sm rounded-xl px-2 py-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => jumpToPage(i)}
              disabled={!!flip}
              className={`shrink-0 min-w-[30px] h-7 rounded-lg text-[13px] font-medium tabular-nums transition-all ${
                i === currentPage
                  ? 'bg-[var(--pink-primary)] text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/70'
              }`}
              aria-label={`第 ${i + 1} 页`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
