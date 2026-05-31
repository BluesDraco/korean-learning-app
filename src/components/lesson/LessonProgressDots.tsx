import type { LessonCard } from '@/lib/lesson/types';

interface Props {
  cards: LessonCard[];
  currentCard: number;
}

/** Stage labels for the progress indicator */
function getStage(card: LessonCard): string {
  switch (card.type) {
    case 'goal': return '目标';
    case 'word-intro':
    case 'sentence-intro':
    case 'grammar-intro': return '认识';
    case 'listen-choice':
    case 'speak-repeat':
    case 'match-pairs': return '练习';
    case 'output': return '输出';
    case 'summary': return '总结';
  }
}

export function LessonProgressDots({ cards, currentCard }: Props) {
  // Group cards by stage and compute stage-level progress
  const stages: { label: string; start: number; end: number; current: number }[] = [];
  let currentStage = '';
  let stageStart = 0;

  cards.forEach((c, i) => {
    const s = getStage(c);
    if (s !== currentStage) {
      if (currentStage) {
        stages.push({ label: currentStage, start: stageStart, end: i - 1, current: i - 1 - stageStart + 1 });
      }
      currentStage = s;
      stageStart = i;
    }
  });
  // Push last stage
  if (currentStage) {
    stages.push({ label: currentStage, start: stageStart, end: cards.length - 1, current: cards.length - stageStart });
  }

  // Compute how many cards completed in current stage
  const currentStageLabel = cards[currentCard] ? getStage(cards[currentCard]) : '';

  return (
    <div className="space-y-1.5">
      {/* Dots */}
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

      {/* Stage labels */}
      <div className="flex justify-center gap-4 text-[10px] text-[var(--text-muted)]">
        {stages.map((s, i) => {
          const doneInStage = currentCard > s.end
            ? s.end - s.start + 1
            : currentCard >= s.start
              ? currentCard - s.start
              : 0;
          const totalInStage = s.end - s.start + 1;
          const isCurrentStage = currentCard >= s.start && currentCard <= s.end;
          return (
            <span key={i} className={isCurrentStage ? 'font-bold text-[var(--pink-primary)]' : ''}>
              {s.label} {doneInStage}/{totalInStage}
            </span>
          );
        })}
      </div>
    </div>
  );
}
