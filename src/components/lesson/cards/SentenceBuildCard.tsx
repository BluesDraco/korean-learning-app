import { useState, useCallback } from 'react';
import { RefreshCw, CheckCircle } from 'lucide-react';

interface Props {
  pieces: string[];
  correctSentence: string;
  chinese: string;
  onCorrect: () => void;
}

function shuffleUntilDifferent(pieces: string[]): string[] {
  if (pieces.length <= 1) return [...pieces];
  const original = pieces.join('|');
  let result: string[];
  let attempts = 0;
  do {
    result = [...pieces].sort(() => Math.random() - 0.5);
    attempts++;
  } while (result.join('|') === original && attempts < 10);
  return result;
}

export function SentenceBuildCard({ pieces, correctSentence, chinese, onCorrect }: Props) {
  const [available, setAvailable] = useState<string[]>(() => shuffleUntilDifferent(pieces));
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  const tapPiece = useCallback((piece: string, idx: number) => {
    if (result) return;
    setAvailable((p) => p.filter((_, i) => i !== idx));
    setSelected((p) => [...p, piece]);
  }, [result]);

  const untapPiece = useCallback((idx: number) => {
    if (result) return;
    const piece = selected[idx];
    setSelected((p) => p.filter((_, i) => i !== idx));
    setAvailable((p) => [...p, piece]);
  }, [result, selected]);

  const resetBuild = useCallback(() => {
    setAvailable(shuffleUntilDifferent(pieces));
    setSelected([]);
    setResult(null);
  }, [pieces]);

  const checkAnswer = useCallback(() => {
    const built = selected.join('');
    const correct = correctSentence.replace(/\s+/g, '');
    if (built === correct) {
      setResult('correct');
      onCorrect();
    } else {
      setResult('wrong');
    }
  }, [selected, correctSentence, onCorrect]);

  return (
    <div className="w-full space-y-4">
      <p className="text-sm text-[var(--text-muted)]">把词语按正确顺序排列</p>
      <p className="text-xs text-[var(--pink-primary)]">{chinese}</p>

      {/* User's constructed sentence */}
      <div className="bg-[var(--bg-input)] rounded-2xl p-4 min-h-[60px] flex flex-wrap items-center gap-1.5">
        {selected.length === 0 && !result && (
          <span className="text-xs text-[var(--text-placeholder)] w-full text-center">点击下方词语拼成句子</span>
        )}
        {selected.map((piece, i) => (
          <button
            key={`sel-${i}`}
            onClick={() => untapPiece(i)}
            disabled={result !== null}
            className="px-3 py-1.5 rounded-lg bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] text-sm font-medium hover:bg-[var(--pink-primary)]/20 transition-colors disabled:cursor-default"
          >
            {piece}
          </button>
        ))}
        {result === 'correct' && (
          <div className="flex items-center gap-1 text-[var(--mint-soft)] text-xs ml-2">
            <CheckCircle size={14} />
            正确!
          </div>
        )}
        {result === 'wrong' && (
          <div className="w-full text-center text-xs text-[var(--color-danger)] mt-1">
            不对哦，答案应该是：{correctSentence}
          </div>
        )}
      </div>

      {/* Available pieces */}
      <div className="flex flex-wrap justify-center gap-1.5">
        {available.map((piece, i) => (
          <button
            key={`av-${i}`}
            onClick={() => tapPiece(piece, i)}
            disabled={result !== null}
            className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] text-sm hover:border-[var(--pink-pale)] hover:text-[var(--pink-primary)] transition-colors disabled:opacity-30"
          >
            {piece}
          </button>
        ))}
      </div>

      {/* Actions */}
      {selected.length > 0 && result === null && (
        <button
          onClick={(e) => { e.stopPropagation(); checkAnswer(); }}
          className="px-5 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white text-sm font-medium hover:opacity-90"
        >
          检查
        </button>
      )}
      {result === 'wrong' && (
        <button
          onClick={(e) => { e.stopPropagation(); resetBuild(); }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)]"
        >
          <RefreshCw size={14} />
          重新排列
        </button>
      )}
      {result === 'correct' && (
        <p className="text-xs text-[var(--text-muted)]">✓ 你已经掌握了这个句子</p>
      )}
    </div>
  );
}
