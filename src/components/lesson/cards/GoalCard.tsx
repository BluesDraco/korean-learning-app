import { Target, Sparkles } from 'lucide-react';
import type { GoalData } from '@/lib/lesson/types';

export function GoalCard({ goal }: { goal: GoalData }) {
  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-center gap-2">
        <Target size={18} className="text-[var(--pink-primary)]" />
        <span className="text-sm font-bold text-[var(--text-primary)]">今日目标</span>
      </div>

      <div className="text-6xl mb-1">{goal.emoji}</div>
      <h2 className="text-xl font-bold text-[var(--text-primary)]">Day {goal.day} · {goal.title}</h2>

      <div className="bg-[var(--bg-input)] rounded-2xl p-5 w-full max-w-xs mx-auto space-y-3">
        <p className="text-xs text-[var(--text-muted)] flex items-center justify-center gap-1">
          <Sparkles size={12} className="text-[var(--pink-primary)]" />
          今天你会学会
        </p>
        <ul className="space-y-2">
          {goal.goals.map((g, i) => (
            <li key={i} className="text-sm text-[var(--text-primary)] flex items-start gap-2">
              <span className="text-[var(--pink-primary)] shrink-0 mt-0.5">▸</span>
              {g}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-[var(--text-muted)]">准备好了吗？点击下一张开始</p>
    </div>
  );
}
