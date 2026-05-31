import { useState, useCallback, useEffect } from 'react';
import { ArrowLeftRight, CheckCircle } from 'lucide-react';

interface Props {
  direction: 'zh-to-ko' | 'ko-to-zh';
  promptText: string;
  chunks: string[];
  correctOrder: string[];
  onCorrect: () => void;
  onWrong: () => void;
}

export function MatchPairsCard({ direction, promptText, chunks: initialChunks, correctOrder, onCorrect, onWrong }: Props) {
  const [items, setItems] = useState<string[]>(initialChunks);
  const [selected, setSelected] = useState<number | null>(null);
  const [passed, setPassed] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Reset when chunks change (new card instance)
  useEffect(() => {
    setItems(initialChunks);
    setSelected(null);
    setPassed(false);
    setAttempts(0);
  }, [initialChunks]);

  const checkCorrect = useCallback((ordered: string[]) => {
    const isCorrect = ordered.length === correctOrder.length &&
      ordered.every((chunk, i) => chunk === correctOrder[i]);
    if (isCorrect) {
      setPassed(true);
      onCorrect();
    }
    return isCorrect;
  }, [correctOrder, onCorrect]);

  const handleClick = useCallback((idx: number) => {
    if (passed) return;
    if (selected === null) {
      setSelected(idx);
    } else if (selected === idx) {
      setSelected(null);
    } else {
      // Swap the two positions
      setAttempts((p) => p + 1);
      const next = [...items];
      [next[selected], next[idx]] = [next[idx], next[selected]];
      setItems(next);
      setSelected(null);
      const isCorrect = checkCorrect(next);
      if (!isCorrect) {
        onWrong();
      }
    }
  }, [selected, items, passed, checkCorrect, onWrong]);

  const label = direction === 'zh-to-ko' ? '中翻韩' : '韩翻中';
  const sourceLabel = direction === 'zh-to-ko' ? '中文' : '韩文';

  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-center gap-2">
        <ArrowLeftRight size={16} className="text-[var(--pink-primary)]" />
        <span className="text-sm font-bold text-[var(--pink-primary)]">{label}</span>
      </div>

      {/* Source sentence */}
      <div className="bg-[var(--bg-input)] rounded-2xl p-4 w-full max-w-xs mx-auto">
        <p className="text-[10px] text-[var(--text-muted)] mb-1">{sourceLabel}</p>
        <p className="text-lg font-bold text-[var(--text-primary)]">{promptText}</p>
      </div>

      {passed ? (
        <div className="flex items-center justify-center gap-2 text-sm text-[var(--mint-soft)]">
          <CheckCircle size={16} />
          排列正确! (尝试 {attempts} 次)
        </div>
      ) : (
        <p className="text-xs text-[var(--text-muted)]">点击两个词组交换位置，排列成正确的句子</p>
      )}

      {/* Reorderable chunks */}
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((chunk, i) => {
          const isSelected = selected === i;
          const isCorrectPos = passed || (correctOrder[i] === chunk);
          return (
            <button
              key={`${i}-${chunk}`}
              onClick={() => handleClick(i)}
              disabled={passed}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                passed
                  ? 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)] border-2 border-[var(--mint-soft)]/30 cursor-default'
                  : isSelected
                    ? 'bg-[var(--pink-primary)]/20 text-[var(--pink-primary)] border-2 border-[var(--pink-primary)]/50 scale-105 ring-2 ring-[var(--pink-primary)]/20'
                    : isCorrectPos
                      ? 'bg-[var(--mint-soft)]/10 text-[var(--text-primary)] border border-[var(--mint-soft)]/30'
                      : 'bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-pale)] active:scale-95'
              }`}
            >
              {chunk}
            </button>
          );
        })}
      </div>

      {/* Hint: show correct positions count */}
      {!passed && (
        <p className="text-[10px] text-[var(--text-muted)]">
          {items.filter((c, i) => c === correctOrder[i]).length} / {items.length} 个位置正确
        </p>
      )}
    </div>
  );
}
