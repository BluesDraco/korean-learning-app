'use client';

import { useRef, useState } from 'react';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';

export type QuizType = 'meaning' | 'cloze' | 'translate' | 'grammar';

export interface QuizQuestion {
  [k: string]: unknown;
  type: QuizType;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  wordHint?: string;
}

interface Props {
  [k: string]: unknown;
  questions: QuizQuestion[];
  onWrongAnswer?: (q: QuizQuestion, picked: number) => void;
  onComplete?: (score: number, total: number) => void;
}

const TYPE_LABEL_KEY: Record<QuizType, string> = {
  meaning: 'analyze.quiz.type_meaning',
  cloze: 'analyze.quiz.type_cloze',
  translate: 'analyze.quiz.type_translate',
  grammar: 'analyze.quiz.type_grammar',
};

const TYPE_COLOR: Record<QuizType, string> = {
  meaning: 'var(--color-pink-strong)',
  cloze: 'var(--color-mint-strong)',
  translate: 'var(--color-pink-strong)',
  grammar: 'var(--color-mint-strong)',
};

export function AnalyzeQuiz({ questions, onWrongAnswer, onComplete }: Props) {
  const { lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const pendingScoreRef = useRef(0);

  if (!questions || questions.length === 0) return null;
  const total = questions.length;
  const q = questions[idx];

  const handlePick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === q.correctIndex;
    const nextScore = correct ? score + 1 : score;
    if (correct) {
      setScore(nextScore);
    } else if (onWrongAnswer) {
      onWrongAnswer(q, i);
    }
    // 若这是最后一题答完，下一次点 "完成" 时 onComplete 用的是当前 score，
    // 但 setScore 异步导致 score 闭包是旧值。把最终 score 存到 ref 里给 handleNext 用。
    pendingScoreRef.current = nextScore;
  };

  const handleNext = () => {
    if (idx + 1 >= total) {
      setFinished(true);
      onComplete?.(pendingScoreRef.current, total);
    } else {
      setIdx(i => i + 1);
      setPicked(null);
    }
  };

  const handleRestart = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
    pendingScoreRef.current = 0;
  };

  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div style={{ padding: 20, borderRadius: 20, background: 'var(--color-surface-2)', border: '1px solid var(--color-border-1)', textAlign: 'center' }}>
        <div style={{ fontSize: 36, fontWeight: 800, color: pct >= 80 ? 'var(--color-mint-strong)' : 'var(--color-pink-strong)' }}>
          {score} / {total}
        </div>
        <div style={{ fontSize: 13, color: 'var(--color-ink-3)', marginTop: 6 }}>
          {pct >= 80 ? t('analyze.quiz.result_great', lang) : pct >= 50 ? t('analyze.quiz.result_ok', lang) : t('analyze.quiz.result_review', lang)}
        </div>
        <button
          onClick={handleRestart}
          style={{
            marginTop: 14, height: 36, padding: '0 22px', borderRadius: 999,
            border: '1px solid rgba(255,127,168,.28)', background: 'var(--color-pink-soft)',
            color: 'var(--color-pink-strong)', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}
        >
          {t('analyze.quiz.restart', lang)}
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, borderRadius: 20, background: 'var(--color-surface-2)', border: '1px solid var(--color-border-1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: TYPE_COLOR[q.type], letterSpacing: '.06em' }}>
          {t(TYPE_LABEL_KEY[q.type], lang)}
        </span>
        <span style={{ fontSize: 11, color: 'var(--color-ink-3)', fontWeight: 700 }}>
          {idx + 1} / {total}
        </span>
      </div>
      <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--color-ink-1)', lineHeight: 1.55 }}>
        {q.question}
      </p>
      <div style={{ display: 'grid', gap: 6 }}>
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === q.correctIndex;
          let bg = 'var(--color-surface-2)';
          let border = 'var(--color-border-1)';
          let color = 'var(--color-ink-1)';
          if (picked !== null) {
            if (isCorrect) {
              bg = 'var(--color-mint-soft)'; border = 'var(--color-mint-strong)'; color = 'var(--color-mint-strong)';
            } else if (isPicked) {
              bg = 'var(--color-status-danger-bg)'; border = 'var(--color-status-danger)'; color = 'var(--color-status-danger)';
            }
          }
          return (
            <button
              key={i}
              onClick={() => handlePick(i)}
              disabled={picked !== null}
              style={{
                textAlign: 'left', padding: '10px 12px', borderRadius: 12,
                background: bg, border: '1px solid ' + border, color,
                fontSize: 13, fontWeight: 600, cursor: picked !== null ? 'default' : 'pointer',
                lineHeight: 1.5,
              }}
            >
              <span style={{ marginRight: 8, fontSize: 11, color: 'var(--color-ink-3)', fontWeight: 700 }}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
              {picked !== null && isCorrect && <span style={{ marginLeft: 6, fontSize: 13 }}>✓</span>}
              {picked !== null && isPicked && !isCorrect && <span style={{ marginLeft: 6, fontSize: 13 }}>✗</span>}
            </button>
          );
        })}
      </div>
      {picked !== null && q.explanation && (
        <div style={{ marginTop: 10, padding: 10, borderRadius: 10, background: 'rgba(255,255,255,.5)', fontSize: 12, color: 'var(--color-ink-2)', lineHeight: 1.6 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-ink-3)', marginRight: 4 }}>
            💡 {t('analyze.quiz.explanation', lang)}
          </span>
          {q.explanation}
        </div>
      )}
      {picked !== null && (
        <button
          onClick={handleNext}
          style={{
            marginTop: 12, width: '100%', height: 38, borderRadius: 999,
            border: 'none', background: 'var(--color-ink-1)', color: '#fff',
            fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}
        >
          {idx + 1 >= total ? t('analyze.quiz.finish', lang) : t('analyze.quiz.next', lang)}
        </button>
      )}
    </div>
  );
}
