import { memo } from 'react';
import type { LessonCard } from '@/lib/lesson/types';

interface Props {
  cards: LessonCard[];
  currentCard: number;
}

export const LessonProgressDots = memo(function LessonProgressDots({ cards, currentCard }: Props) {
  return (
    <div className="flex justify-center gap-1">
      {cards.map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all ${
            i < currentCard ? 'w-4 bg-[var(--mint-soft)]' :
            i === currentCard ? 'w-4 bg-[var(--pink-primary)]' :
            'w-1.5 bg-[var(--border-color)]'
          }`}
        />
      ))}
    </div>
  );
});
