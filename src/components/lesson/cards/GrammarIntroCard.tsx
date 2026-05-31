import type { DailyGrammar } from '@/data/thirtyDayCourse';

export function GrammarIntroCard({ grammar, revealed }: { grammar: DailyGrammar; revealed: boolean }) {
  return (
    <>
      <div className="text-5xl mb-4">📖</div>
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{grammar.name}</h2>
      <p className="text-sm text-[var(--text-muted)] font-mono mb-1">{grammar.pattern}</p>
      <p className="text-base font-medium text-[var(--text-primary)] mt-3 mb-3">{grammar.example}</p>
      {!revealed ? (
        <p className="text-sm text-[var(--text-muted)]">点击显示解释</p>
      ) : (
        <div className="space-y-3 animate-fade-in">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{grammar.explanation}</p>
          <p className="text-sm text-[var(--text-muted)]">{grammar.exampleZh}</p>
        </div>
      )}
    </>
  );
}
