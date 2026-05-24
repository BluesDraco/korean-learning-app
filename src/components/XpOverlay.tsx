'use client';

import { useEffect, useState, useCallback } from 'react';
import { Star, Flame, Award } from 'lucide-react';

interface Flyout {
  id: number;
  amount: number;
  x: number;
  y: number;
  drift: number;
}

let nextId = 0;
const xpListeners = new Set<(e: CustomEvent) => void>();
const streakListeners = new Set<(e: CustomEvent) => void>();

export function emitXpFlyout(amount: number, x?: number, y?: number) {
  const event = new CustomEvent('xp-flyout', {
    detail: {
      amount,
      x: x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 200),
      y: y ?? (typeof window !== 'undefined' ? window.innerHeight * 0.4 : 300),
    },
  });
  xpListeners.forEach((fn) => fn(event));
}

export function emitStreakMilestone(streak: number) {
  const event = new CustomEvent('streak-milestone', { detail: { streak } });
  streakListeners.forEach((fn) => fn(event));
}

export function XpOverlay() {
  const [flyouts, setFlyouts] = useState<Flyout[]>([]);
  const [levelUp, setLevelUp] = useState<{ show: boolean; level: number }>({ show: false, level: 0 });
  const [streakCelebration, setStreakCelebration] = useState<{ show: boolean; streak: number }>({ show: false, streak: 0 });

  const addFlyout = useCallback((e: Event) => {
    const { amount, x, y } = (e as CustomEvent).detail;
    const id = nextId++;
    const drift = (Math.random() - 0.5) * 60;
    setFlyouts((prev) => [...prev.slice(-10), { id, amount, x, y, drift }]);
    setTimeout(() => {
      setFlyouts((prev) => prev.filter((f) => f.id !== id));
    }, 1300);
  }, []);

  const handleLevelUp = useCallback((e: Event) => {
    const { level } = (e as CustomEvent).detail;
    setLevelUp({ show: true, level });
    setTimeout(() => setLevelUp({ show: false, level: 0 }), 3000);
  }, []);

  const handleStreakMilestone = useCallback((e: Event) => {
    const { streak } = (e as CustomEvent).detail;
    setStreakCelebration({ show: true, streak });
    setTimeout(() => setStreakCelebration({ show: false, streak: 0 }), 3500);
  }, []);

  useEffect(() => {
    const onXp = (e: Event) => addFlyout(e);
    const onLevel = (e: Event) => handleLevelUp(e);
    const onStreak = (e: Event) => handleStreakMilestone(e);
    xpListeners.add(onXp as any);
    streakListeners.add(onStreak as any);
    window.addEventListener('level-up', onLevel);
    window.addEventListener('streak-milestone', onStreak);
    return () => {
      xpListeners.delete(onXp as any);
      streakListeners.delete(onStreak as any);
      window.removeEventListener('level-up', onLevel);
      window.removeEventListener('streak-milestone', onStreak as any);
    };
  }, [addFlyout, handleLevelUp, handleStreakMilestone]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      {/* XP flyout particles */}
      {flyouts.map((f) => (
        <div
          key={f.id}
          className="xp-float absolute flex items-center gap-1 select-none whitespace-nowrap"
          style={{
            left: f.x,
            top: f.y,
            '--drift': `${f.drift}px`,
          } as React.CSSProperties}
        >
          <Star size={14} className="fill-[var(--peach-soft)] text-[var(--peach-soft)]" />
          <span>+{f.amount} XP</span>
        </div>
      ))}

      {/* Level up celebration */}
      {levelUp.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-[10000] animate-fade-in">
          <div className="bg-[var(--bg-card)] rounded-3xl p-8 text-center border-2 border-[var(--peach-soft)] shadow-2xl animate-bounce-achievement">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-2xl font-extrabold text-[var(--peach-soft)] mb-2">레벨 업!</p>
            <p className="text-lg text-[var(--text-primary)]">
              升级到 <span className="font-bold text-[var(--pink-primary)]">{levelUp.level} 级</span>
            </p>
          </div>
        </div>
      )}

      {/* Streak milestone celebration */}
      {streakCelebration.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-[10000] animate-fade-in">
          <div className="bg-[var(--bg-card)] rounded-3xl p-8 text-center border-2 border-[var(--peach-soft)] shadow-2xl animate-bounce-achievement">
            <div className="text-6xl mb-3">
              {streakCelebration.streak >= 100 ? '👑' : streakCelebration.streak >= 30 ? '🔥' : streakCelebration.streak >= 7 ? '🌟' : '💪'}
            </div>
            <p className="text-xl font-extrabold text-[var(--peach-soft)] mb-1">
              {streakCelebration.streak}일 연속!
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              {streakCelebration.streak >= 100
                ? '100天连续学习！你是真正的王者！'
                : streakCelebration.streak >= 30
                  ? '30天坚持不懈！这个习惯已经养成了！'
                  : streakCelebration.streak >= 7
                    ? '连续一周学习！토리为你感到骄傲！'
                    : '连续3天！好的开始是成功的一半！'}
            </p>
            <div className="mt-4 text-4xl animate-bounce">🐰</div>
          </div>
        </div>
      )}
    </div>
  );
}
