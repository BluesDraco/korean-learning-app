'use client';

import { Volume2 } from 'lucide-react';
import { speak } from '@/lib/tts';
import type { DailyGrammar } from '@/data/thirtyDayCourse';

export function GrammarIntroCard({ grammar, revealed }: { grammar: DailyGrammar; revealed: boolean }) {
  return (
    <>
      <div className="text-5xl mb-4">📖</div>
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{grammar.name}</h2>
      <p className="text-sm text-[var(--text-muted)] font-mono mb-1">{grammar.pattern}</p>
      <div className="flex items-center gap-2 mt-3 mb-3">
        <p className="text-base font-medium text-[var(--text-primary)] flex-1">{grammar.example}</p>
        <button
          onClick={(e) => { e.stopPropagation(); speak(grammar.example, 0.8); }}
          className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-card-hover)] transition-colors shrink-0"
        >
          <Volume2 size={16} />
        </button>
      </div>
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
