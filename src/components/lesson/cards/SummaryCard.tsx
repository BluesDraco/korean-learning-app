import { CheckCircle, Award } from 'lucide-react';
import type { AbilitySummary } from '@/lib/lesson/types';

export function SummaryCard({ summary }: { summary: AbilitySummary }) {
  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-center gap-2">
        <Award size={18} className="text-[var(--pink-primary)]" />
        <span className="text-sm font-bold text-[var(--text-primary)]">学习总结</span>
      </div>

      <div className="text-6xl mb-1">{summary.emoji}</div>
      <h2 className="text-lg font-bold text-[var(--text-primary)]">Day {summary.day} 完成!</h2>
      <p className="text-xs text-[var(--text-muted)]">{summary.title}</p>

      {/* Abilities gained */}
      <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-5 w-full max-w-xs mx-auto space-y-3">
        <p className="text-xs text-[var(--text-muted)] flex items-center justify-center gap-1">
          <CheckCircle size={12} className="text-[var(--mint-soft)]" />
          你今天可以做到
        </p>
        <ul className="space-y-2">
          {summary.abilities.map((a, i) => (
            <li key={i} className="text-sm text-[var(--text-primary)] flex items-start gap-2">
              <span className="text-[var(--mint-soft)] shrink-0 mt-0.5">✅</span>
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-3 text-xs text-[var(--text-muted)]">
        <span>📚 {summary.wordCount} 个词</span>
        <span>💬 {summary.sentenceCount} 个句子</span>
      </div>
    </div>
  );
}
