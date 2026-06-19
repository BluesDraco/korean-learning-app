'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight, Loader2, CheckCircle, RotateCcw, Shuffle } from 'lucide-react';
import { db } from '@/lib/db';
import { speakWord, speak } from '@/lib/tts';
import { getLevelWords } from '@/data/vocabulary';
import { TappableText } from '@/components/TappableText';
import { WordTapSheet } from '@/components/WordTapSheet';
import type { WordEntry } from '@/types';

const levelNames: Record<number, string> = {
  1: '1级 · 入门', 2: '2级 · 基础', 3: '3级 · 进阶',
  4: '4级 · 中级', 5: '5级 · 高级', 6: '6级 · 精通',
};

type CardWord = WordEntry & { mastery: 'new' | 'learning' | 'reviewing' | 'mastered' };

export default function TopikFlashcardsPage() {
  const { level: levelStr } = useParams<{ level: string }>();
  const router = useRouter();
  const level = parseInt(levelStr);

  const [words, setWords] = useState<CardWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const [displayWords, setDisplayWords] = useState<typeof words>([]);
  const [revealed, setRevealed] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null);
  const [masteredSet, setMasteredSet] = useState<Set<string>>(new Set());
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNaN(level) || level < 1 || level > 6) { router.replace('/vocabulary/levels'); return; }

    (async () => {
      try {
        const entries = getLevelWords(level);
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
  useEffect(() => {
    if (words.length === 0) return;
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const { idx, order } = JSON.parse(saved) as { idx: number; order?: string[] };
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
    } catch { /* ignore */ }
    setDisplayWords(words);
    setCurrentIdx(0);
  }, [words]);

  // persist progress on every card change
  useEffect(() => {
    if (displayWords.length === 0) return;
    try {
      const order = shuffled ? displayWords.map(w => w.korean) : undefined;
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

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= displayWords.length) return;
    setRevealed(false);
    setSwipeOffset(0);
    setExiting(null);
    setCurrentIdx(idx);
  }, [displayWords.length]);

  // Auto-play on card change
  useEffect(() => {
    if (!loading && displayWords[currentIdx]) {
      const t = setTimeout(() => speakWord(displayWords[currentIdx].korean, 0.85), 300);
      return () => clearTimeout(t);
    }
  }, [currentIdx, loading, displayWords]);

  const flipCard = () => {
    setRevealed(r => {
      const next = !r;
      if (next) {
        const cur = displayWords[currentIdx];
        if (cur && cur.mastery === 'new') {
          db.words.where('word').equals(cur.korean).first().then(existing => {
            if (existing) db.words.update(existing.id, { mastery: 'learning', srsLevel: 1, interval: 1, nextReview: Date.now() });
          });
          setWords(prev => prev.map(w => w.korean === cur.korean ? { ...w, mastery: 'learning' } : w));
        }
      }
      return next;
    });
  };

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(currentIdx - 1);
      else if (e.key === 'ArrowRight') goTo(currentIdx + 1);
      else if (e.key === ' ') { e.preventDefault(); flipCard(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIdx, goTo]);

  const toggleMastered = async (entry: CardWord) => {
    const now = Date.now();
    const isMastered = masteredSet.has(entry.korean);
    const existing = await db.words.where('word').equals(entry.korean).first();

    if (isMastered) {
      if (existing) {
        await db.words.update(existing.id, { mastery: 'learning', srsLevel: 1, interval: 1, nextReview: now });
      }
      setMasteredSet(prev => { const s = new Set(prev); s.delete(entry.korean); return s; });
      setWords(prev => prev.map(w => w.korean === entry.korean ? { ...w, mastery: 'learning' } : w));
    } else {
      if (existing) {
        await db.words.update(existing.id, { mastery: 'mastered', srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now });
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
  };

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
    if (!isSwiping) return;
    setIsSwiping(false);
    if (swipeOffset > 80 && currentIdx > 0) setExiting('right');
    else if (swipeOffset < -80 && currentIdx < displayWords.length - 1) setExiting('left');
    else setSwipeOffset(0);
  };

  const handleTransitionEnd = () => {
    if (exiting === 'left') goTo(currentIdx + 1);
    else if (exiting === 'right') goTo(currentIdx - 1);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (!isSwiping && Math.abs(swipeOffset) < 10) flipCard();
  };

  const getTransform = () => {
    if (exiting === 'left') return 'translateX(-120%) rotate(-8deg)';
    if (exiting === 'right') return 'translateX(120%) rotate(8deg)';
    if (isSwiping) return `translateX(${swipeOffset}px) rotate(${swipeOffset * 0.04}deg)`;
    return 'translateX(0) rotate(0deg)';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin" style={{ color: '#89756e' }} />
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="py-4 space-y-4 px-4">
        <Link href={`/vocabulary/levels/${level}`} className="flex items-center gap-2 text-sm" style={{ color: '#89756e' }}>
          <ArrowLeft size={18} /> 返回
        </Link>
        <div className="text-center py-20">
          <p className="text-sm" style={{ color: '#89756e' }}>暂无词条</p>
        </div>
      </div>
    );
  }

  const word = displayWords[currentIdx];
  if (!word) return null;
  const isMastered = masteredSet.has(word.korean);
  const progress = ((currentIdx + 1) / displayWords.length) * 100;
  const masteredCount = masteredSet.size;

  return (
    <div
      className="flex flex-col px-4 pt-4"
      style={{ minHeight: 'calc(100dvh - 56px - env(safe-area-inset-bottom, 0px))', paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <Link href={`/vocabulary/levels/${level}`} style={{ color: '#89756e' }}>
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-[15px] font-bold truncate" style={{ color: 'var(--fc-meaning-color)' }}>
            TOPIK {levelNames[level]}
          </h1>
          <p className="text-[12px]" style={{ color: '#89756e' }}>
            已掌握 {masteredCount} / {words.length}
          </p>
        </div>
        <button
          onClick={toggleShuffle}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ border: '1px solid var(--fc-nav-border)', background: shuffled ? 'var(--fc-dot-active)' : 'var(--fc-nav-bg)', color: shuffled ? '#fff' : 'var(--fc-nav-color)' }}
          title={shuffled ? '取消乱序' : '随机乱序'}
        >
          <Shuffle size={14} />
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
          ref={cardRef}
          style={{ cursor: 'pointer', userSelect: 'none' }}
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
              border: isMastered ? '1.5px solid var(--fc-btn-mastered-border)' : '1px solid var(--fc-card-border)',
              boxShadow: '0 20px 60px var(--fc-card-shadow)',
              transform: getTransform(),
              transition: isSwiping ? 'none' : 'transform 0.32s ease-out',
              minHeight: '360px',
              padding: '24px',
            }}
          >
            {/* Audio + mastery badge */}
            <div className="flex justify-between items-center mb-2">
              {isMastered ? (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--fc-badge-bg)', color: 'var(--fc-badge-color)' }}>已掌握</span>
              ) : (
                <span />
              )}
              <button
                onClick={e => { e.stopPropagation(); speakWord(word.korean, 0.85); }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ border: '1px solid var(--fc-audio-border)', color: 'var(--fc-audio-color)' }}
              >
                <Volume2 size={14} />
              </button>
            </div>

            {/* Front: Korean word */}
            <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
              <div className="text-[44px] font-black leading-tight tracking-tight mb-3" style={{ color: 'var(--fc-word-color)', wordBreak: 'keep-all' }}>
                {word.korean}
              </div>
              {!revealed && (
                <div className="text-[13px] font-semibold mt-1" style={{ color: 'var(--fc-hint-color)' }}>
                  点击查看释义
                </div>
              )}
            </div>

            {/* Back: revealed content */}
            {revealed && (
              <div className="border-t pt-4 space-y-3" style={{ borderColor: 'var(--fc-divider)' }}>
                {/* Romanization */}
                <div className="flex items-center gap-2 flex-wrap">
                  {word.romanization && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: 'var(--fc-roman-bg)', color: 'var(--fc-roman-color)' }}>
                      [{word.romanization}]
                    </span>
                  )}
                  {word.partOfSpeech && (
                    <span className="text-[11px] font-medium px-1.5 py-0.5 rounded" style={{ background: 'var(--fc-pos-bg)', color: 'var(--fc-pos-color)' }}>
                      {word.partOfSpeech}
                    </span>
                  )}
                </div>

                {/* Meanings */}
                <div className="rounded-[16px] p-3.5" style={{ background: 'var(--fc-meaning-bg)', border: '1px solid var(--fc-meaning-border)' }}>
                  <strong className="text-[17px] font-black" style={{ color: 'var(--fc-meaning-color)' }}>
                    {word.meanings.map(m => m.chinese).join('；')}
                  </strong>
                </div>

                {/* Examples */}
                {word.examples.slice(0, 2).map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-[14px] px-3.5 py-2.5 flex items-start gap-2"
                    style={{ background: 'var(--fc-example-bg)' }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--fc-example-ko)' }}>
                        <TappableText text={ex.korean} highlightWord={word.korean} source="闪卡" highlightColor="var(--fc-example-hi-color)" underlineColor="var(--fc-example-hi-color)" />
                      </p>
                      <p className="text-[12px] mt-0.5" style={{ color: 'var(--fc-example-zh)' }}>{ex.chinese}</p>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); speak(ex.korean, 0.85); }}
                      className="shrink-0 mt-0.5"
                      style={{ color: 'var(--fc-example-zh)' }}
                    >
                      <Volume2 size={13} />
                    </button>
                  </div>
                ))}

                {/* Mastery button */}
                <button
                  onClick={e => { e.stopPropagation(); toggleMastered(word); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[14px] font-semibold text-[14px] transition-colors mt-1"
                  style={isMastered
                    ? { background: 'var(--fc-badge-bg)', color: 'var(--fc-badge-color)', border: '1.5px solid var(--fc-btn-mastered-border)' }
                    : { background: 'var(--fc-roman-bg)', color: 'var(--fc-roman-color)', border: '1.5px solid var(--fc-btn-unmastered-border)' }
                  }
                >
                  {isMastered
                    ? <><RotateCcw size={15} /> 取消掌握</>
                    : <><CheckCircle size={15} /> 标记已掌握</>
                  }
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          onClick={() => goTo(currentIdx - 1)}
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
          onClick={() => goTo(currentIdx + 1)}
          disabled={currentIdx === displayWords.length - 1}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all disabled:opacity-25"
          style={{ background: 'var(--fc-nav-bg)', border: '1px solid var(--fc-nav-border)', color: 'var(--fc-nav-color)', boxShadow: '0 4px 12px rgba(78,52,46,.08)' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
