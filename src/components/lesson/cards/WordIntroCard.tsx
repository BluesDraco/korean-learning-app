import type { DailyWord } from '@/data/thirtyDayCourse';

export function WordIntroCard({ word, revealed }: { word: DailyWord; revealed: boolean }) {
  return (
    <>
      <div className="text-5xl mb-4">{word.emoji}</div>
      <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">{word.korean}</h2>
      {!revealed ? (
        <p className="text-sm text-[var(--text-muted)]">点击显示含义</p>
      ) : (
        <div className="space-y-2 animate-fade-in">
          <p className="text-lg font-medium text-[var(--pink-primary)]">{word.chinese}</p>
          <p className="text-sm text-[var(--text-muted)] font-mono">{word.pronunciation}</p>
          <span className="inline-block text-[11px] px-2 py-0.5 rounded-md bg-[var(--bg-input)] text-[var(--text-muted)]">{word.partOfSpeech}</span>
        </div>
      )}
    </>
  );
}
