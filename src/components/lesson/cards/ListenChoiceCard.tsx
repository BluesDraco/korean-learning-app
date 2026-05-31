import { CheckCircle, XCircle } from 'lucide-react';
import type { DailyDictation } from '@/data/thirtyDayCourse';

interface Props {
  dictation: DailyDictation;
  options: string[];
  correctOption: number;
  selectedOption: number | null;
  onSelect: (idx: number) => void;
  onSpeak: () => void;
  playing: boolean;
}

export function ListenChoiceCard({ dictation, options, correctOption, selectedOption, onSelect, onSpeak, playing }: Props) {
  const isCorrect = selectedOption === correctOption;

  return (
    <div className="w-full space-y-5">
      <div className="text-5xl mb-2">🎧</div>
      <p className="text-sm text-[var(--text-muted)]">听发音，选择正确的中文意思</p>

      <button
        onClick={(e) => { e.stopPropagation(); onSpeak(); }}
        className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all ${
          playing
            ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]'
            : 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20'
        }`}
      >
        {playing ? '🔊 播放中...' : '🔊 点击播放'}
      </button>

      <div className="grid grid-cols-1 gap-2 w-full max-w-xs mx-auto">
        {options.map((opt, i) => {
          let btnStyle = 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-pale)] hover:text-[var(--pink-primary)]';
          if (selectedOption !== null) {
            if (i === correctOption) {
              btnStyle = 'border-2 border-[var(--mint-soft)] bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]';
            } else if (i === selectedOption) {
              btnStyle = 'border-2 border-[var(--color-danger-light)] bg-[var(--color-danger-bg)] text-[var(--color-danger)]';
            } else {
              btnStyle = 'border border-[var(--border-color)] text-[var(--text-muted)] opacity-50';
            }
          }
          return (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); onSelect(i); }}
              disabled={selectedOption !== null}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${btnStyle}`}
            >
              {opt}
              {selectedOption !== null && i === correctOption && <CheckCircle size={16} className="inline ml-2" />}
              {selectedOption === i && i !== correctOption && <XCircle size={16} className="inline ml-2" />}
            </button>
          );
        })}
      </div>

      {selectedOption !== null && (
        <div className={`p-3 rounded-xl text-sm ${isCorrect ? 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]' : 'bg-[var(--color-danger-bg)] text-[var(--color-danger)]'}`}>
          <p className="font-bold text-lg mb-0.5">{dictation.korean}</p>
          <p className="text-xs opacity-80">{dictation.pronunciation}</p>
        </div>
      )}
    </div>
  );
}
