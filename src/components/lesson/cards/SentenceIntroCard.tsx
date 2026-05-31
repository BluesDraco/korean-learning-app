import type { DailySentence } from '@/data/thirtyDayCourse';

export function SentenceIntroCard({ sentence, revealed }: { sentence: DailySentence; revealed: boolean }) {
  return (
    <>
      <span className="text-[11px] text-[var(--text-muted)] bg-[var(--bg-input)] px-2 py-0.5 rounded-full mb-4">{sentence.scene}</span>
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3 leading-relaxed">{sentence.korean}</h2>
      {!revealed ? (
        <p className="text-sm text-[var(--text-muted)]">点击显示翻译</p>
      ) : (
        <div className="space-y-2 animate-fade-in">
          <p className="text-lg font-medium text-[var(--pink-primary)]">{sentence.chinese}</p>
          <p className="text-sm text-[var(--text-muted)] font-mono">{sentence.pronunciation}</p>
        </div>
      )}
    </>
  );
}
