'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'visitor-count-seed';

function hashCode(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + c;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let seed = localStorage.getItem(STORAGE_KEY);
    if (!seed) {
      seed = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      localStorage.setItem(STORAGE_KEY, seed);
    }
    const today = new Date().toISOString().slice(0, 10);
    const baseCount = 1000 + (hashCode(seed + today) % 9000);
    setCount(baseCount);
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
      <span>🐰</span>
      <span>今日学习氛围值</span>
      <span className="font-bold text-[var(--pink-primary)]">{count.toLocaleString()}</span>
    </div>
  );
}
