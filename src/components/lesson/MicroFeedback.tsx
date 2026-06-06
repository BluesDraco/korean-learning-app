import { useEffect, useState } from 'react';
import type { MicroFeedback as MicroFeedbackType } from '@/lib/lesson/types';

interface Props {
  feedback: MicroFeedbackType | null;
  onDone: () => void;
}

const FEEDBACK_PHRASES: Record<string, string[]> = {
  correct: [
    '答对了!',
    '很好!',
    '你已经认识这个词了!',
    '这句可以直接拿去用!',
    '读得不错!',
    '做得好!',
  ],
  wrong: [
    '再想想',
    '没关系，记住正确答案',
    '下次一定对',
    '学习中，很正常',
  ],
  reveal: [
    '看看答案吧',
    '记住这个',
  ],
};

export function getMicroFeedback(result: 'correct' | 'wrong' | 'reveal'): MicroFeedbackType {
  const pool = FEEDBACK_PHRASES[result] || FEEDBACK_PHRASES.reveal;
  const text = pool[Math.floor(Math.random() * pool.length)];
  return {
    icon: result === 'correct' ? '✨' : result === 'wrong' ? '💡' : '👀',
    text,
    color: result === 'correct' ? 'var(--mint-soft)' : result === 'wrong' ? '#f87171' : 'var(--text-muted)',
  };
}

export function MicroFeedbackToast({ feedback, onDone }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!feedback) return;
    setVisible(true);
    let inner: ReturnType<typeof setTimeout>;
    const t = setTimeout(() => {
      setVisible(false);
      inner = setTimeout(onDone, 150);
    }, 1200);
    return () => {
      clearTimeout(t);
      clearTimeout(inner);
    };
  }, [feedback, onDone]);

  if (!feedback || !visible) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-slide-up pointer-events-none">
      <div
        className="px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg backdrop-blur-sm"
        style={{
          backgroundColor: feedback.color + '18',
          color: feedback.color,
          border: `1px solid ${feedback.color}30`,
        }}
      >
        {feedback.icon} {feedback.text}
      </div>
    </div>
  );
}
