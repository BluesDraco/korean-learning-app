'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Grid3X3 } from 'lucide-react';
import { progressiveSteps } from '@/data/phonetics-steps';

const COMPLETED_KEY = 'phonetics-completed-steps';

export default function HangulProgressBadge() {
  const [doneCount, setDoneCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(COMPLETED_KEY);
      if (raw) {
        const set = new Set(JSON.parse(raw)) as Set<string>;
        setDoneCount(progressiveSteps.filter((s) => set.has(s.id)).length);
      } else {
        setDoneCount(0);
      }
    } catch {
      setDoneCount(0);
    }
  }, []);

  if (doneCount === null) return null;

  const total = progressiveSteps.length;
  const allDone = doneCount === total;

  return (
    <Link
      href="/phonetics"
      className={`flex items-center gap-3 rounded-2xl p-3.5 border transition-all group ${
        allDone
          ? 'bg-[var(--mint-soft)]/5 border-[var(--mint-soft)]/20'
          : doneCount > 0
            ? 'bg-[var(--bg-card)] border-[var(--purple-soft)]/20 hover:border-[var(--purple-soft)]/40'
            : 'bg-gradient-to-r from-[var(--pink-primary)]/5 to-[var(--purple-soft)]/5 border-[var(--pink-primary)]/20 hover:border-[var(--pink-primary)]/40'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
        allDone ? 'bg-[var(--mint-soft)]/15' : 'bg-[var(--purple-soft)]/10'
      }`}>
        {allDone ? (
          <Check size={20} className="text-[var(--mint-soft)]" />
        ) : (
          <Grid3X3 size={20} className="text-[var(--purple-soft)]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-[var(--text-primary)]">
          {allDone ? '韩语40音已掌握' : doneCount === 0 ? '开始学韩语40音' : '韩语40音'}
        </div>
        {!allDone && (
          <>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">
              {doneCount === 0
                ? '15分钟看懂所有韩文'
                : `${doneCount}/${total} 步已完成`}
            </div>
            <div className="w-full bg-[var(--border-color)]/40 rounded-full h-1 mt-1.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] transition-all"
                style={{ width: `${(doneCount / total) * 100}%` }}
              />
            </div>
          </>
        )}
      </div>
      <ArrowRight size={16} className={`shrink-0 transition-all ${
        allDone ? 'text-[var(--mint-soft)]' : 'text-[var(--text-muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
      }`} />
    </Link>
  );
}
