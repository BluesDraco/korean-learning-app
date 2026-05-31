import { useState, useCallback } from 'react';
import { CheckCircle, RefreshCw } from 'lucide-react';

interface Props {
  koreanChunks: string[];
  chineseChunks: string[];
  onCorrect: () => void;
  onWrong: () => void;
}

export function MatchPairsCard({ koreanChunks, chineseChunks, onCorrect, onWrong }: Props) {
  const [selectedKo, setSelectedKo] = useState<number | null>(null);
  const [selectedZh, setSelectedZh] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set()); // indices of matched Korean chunks
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [attempts, setAttempts] = useState(0);

  const handleSelectKo = useCallback((idx: number) => {
    if (matched.has(idx) || result === 'correct') return;
    setSelectedKo(idx);
    if (selectedZh !== null) {
      // Check if this pair is correct (same index = correct pair)
      checkPair(idx, selectedZh);
    }
  }, [selectedZh, matched, result]);

  const handleSelectZh = useCallback((idx: number) => {
    if (result === 'correct') return;
    // Check if this Chinese chunk is already matched
    const alreadyMatched = matched.has(idx);
    if (alreadyMatched) return;
    setSelectedZh(idx);
    if (selectedKo !== null) {
      checkPair(selectedKo, idx);
    }
  }, [selectedKo, matched, result]);

  const checkPair = useCallback((koIdx: number, zhIdx: number) => {
    setAttempts((p) => p + 1);
    if (koIdx === zhIdx) {
      // Correct pair!
      const next = new Set(matched);
      next.add(koIdx);
      setMatched(next);
      setSelectedKo(null);
      setSelectedZh(null);
      // Check if all matched
      if (next.size >= koreanChunks.length) {
        setResult('correct');
        onCorrect();
      }
    } else {
      // Wrong pair
      setResult('wrong');
      onWrong();
      setTimeout(() => {
        setResult(null);
        setSelectedKo(null);
        setSelectedZh(null);
      }, 800);
    }
  }, [matched, koreanChunks.length, onCorrect, onWrong]);

  const resetAll = useCallback(() => {
    setSelectedKo(null);
    setSelectedZh(null);
    setMatched(new Set());
    setResult(null);
    setAttempts(0);
  }, []);

  return (
    <div className="w-full space-y-5">
      <p className="text-sm text-[var(--text-muted)]">把韩文词组和对应的中文意思配对</p>
      <p className="text-xs text-[var(--text-muted)]">点击韩文 → 点击中文</p>

      {result === 'correct' && (
        <div className="flex items-center justify-center gap-2 text-sm text-[var(--mint-soft)]">
          <CheckCircle size={16} />
          全部正确! (尝试 {attempts} 次)
        </div>
      )}

      {result === 'wrong' && (
        <div className="text-xs text-red-400 animate-pulse">不对，再试一次</div>
      )}

      {/* Korean chunks — top row */}
      <div className="flex flex-wrap justify-center gap-2">
        {koreanChunks.map((chunk, i) => {
          const isMatched = matched.has(i);
          const isSelected = selectedKo === i;
          return (
            <button
              key={`ko-${i}`}
              onClick={() => handleSelectKo(i)}
              disabled={isMatched || result === 'correct'}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                isMatched
                  ? 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)] border-2 border-[var(--mint-soft)]/30 cursor-default'
                  : isSelected
                    ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)] border-2 border-[var(--pink-primary)]/40 scale-105'
                    : 'bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-pale)]'
              }`}
            >
              {isMatched && <CheckCircle size={12} className="inline mr-1" />}
              {chunk}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-[var(--border-color)]" />

      {/* Chinese chunks — bottom row */}
      <div className="flex flex-wrap justify-center gap-2">
        {chineseChunks.map((chunk, i) => {
          const isMatched = matched.has(i);
          const isSelected = selectedZh === i;
          return (
            <button
              key={`zh-${i}`}
              onClick={() => handleSelectZh(i)}
              disabled={isMatched || result === 'correct'}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                isMatched
                  ? 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] border-2 border-[var(--mint-soft)]/20 cursor-default'
                  : isSelected
                    ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] border-2 border-[var(--pink-primary)]/30 scale-105'
                    : 'bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-pale)]'
              }`}
            >
              {chunk}
            </button>
          );
        })}
      </div>

      {/* Reset button */}
      {matched.size > 0 && result !== 'correct' && (
        <button
          onClick={(e) => { e.stopPropagation(); resetAll(); }}
          className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)]"
        >
          <RefreshCw size={12} />
          重新配对
        </button>
      )}
    </div>
  );
}
