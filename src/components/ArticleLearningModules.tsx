'use client';

import { useState, useCallback } from 'react';
import { Volume2, Check, X, Lightbulb, BookOpen, Edit3, ChevronDown } from 'lucide-react';
import type { ArticleLearningData } from '@/data/articleLearning';
import { speak } from '@/lib/tts';

export default function ArticleLearningModules({ data }: { data: ArticleLearningData }) {
  return (
    <div className="mt-10 space-y-6 max-w-2xl">
      {/* Section divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--border-color)]" />
        <span className="text-xs font-medium text-[var(--text-muted)] tracking-wider">📚 深度学习模块</span>
        <div className="h-px flex-1 bg-[var(--border-color)]" />
      </div>

      <PreReadingKeywords keywords={data.keywords} />
      <PostReadingQuiz quiz={data.quiz} />
      <OutputTask prompt={data.outputPrompt} example={data.outputExample} />
    </div>
  );
}

// ── 读前：关键词 ──────────────────────────────────────────

function PreReadingKeywords({ keywords }: { keywords: ArticleLearningData['keywords'] }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-5 py-4 hover:bg-[var(--bg-card-hover)] transition-colors"
      >
        <BookOpen size={18} className="text-[var(--pink-primary)]" />
        <span className="font-semibold text-[var(--text-primary)]">读前 · 本篇关键词</span>
        <span className="text-xs text-[var(--text-muted)] ml-1">({keywords.length}个)</span>
        <ChevronDown
          size={16}
          className={`ml-auto text-[var(--text-muted)] transition-transform ${expanded ? '' : '-rotate-90'}`}
        />
      </button>

      {expanded && (
        <div className="px-5 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {keywords.map((kw) => (
            <div
              key={kw.korean}
              className="bg-[var(--bg-input)]/60 rounded-xl p-3 group cursor-pointer hover:bg-[var(--pink-primary)]/8 transition-colors"
              onClick={() => speak(kw.korean, 0.75)}
              title="点击听发音"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm font-bold text-[var(--text-primary)]">{kw.korean}</span>
                <Volume2 size={11} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-[10px] text-[var(--text-muted)] leading-tight mb-0.5">{kw.pronunciation}</div>
              <div className="text-[11px] text-[var(--text-secondary)]">{kw.chinese}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── 读后：理解题 ──────────────────────────────────────────

function PostReadingQuiz({ quiz }: { quiz: ArticleLearningData['quiz'] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const handleSelect = useCallback((qIdx: number, optIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
  }, []);

  const handleReset = useCallback(() => {
    setAnswers({});
    setSubmitted(false);
  }, []);

  const correctCount = quiz.filter((q, i) => answers[i] === q.correct).length;
  const allAnswered = quiz.every((_, i) => answers[i] !== undefined);

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-5 py-4 hover:bg-[var(--bg-card-hover)] transition-colors"
      >
        <Lightbulb size={18} className="text-[var(--amber-soft)]" />
        <span className="font-semibold text-[var(--text-primary)]">读后 · 理解测验</span>
        <span className="text-xs text-[var(--text-muted)] ml-1">({quiz.length}题)</span>
        {submitted && (
          <span className={`text-xs font-bold ml-2 ${correctCount === quiz.length ? 'text-[var(--mint-soft)]' : 'text-[var(--pink-primary)]'}`}>
            {correctCount}/{quiz.length}
          </span>
        )}
        <ChevronDown
          size={16}
          className={`ml-auto text-[var(--text-muted)] transition-transform ${expanded ? '' : '-rotate-90'}`}
        />
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4">
          {quiz.map((q, qIdx) => {
            const selected = answers[qIdx];
            const isCorrect = submitted && selected === q.correct;

            return (
              <div key={qIdx} className="space-y-2">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {qIdx + 1}. {q.question}
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selected === optIdx;
                    const isRightAnswer = submitted && optIdx === q.correct;
                    const isWrongSelected = submitted && isSelected && optIdx !== q.correct;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelect(qIdx, optIdx)}
                        disabled={submitted}
                        className={`text-left text-xs px-3 py-2.5 rounded-xl border transition-all ${
                          isRightAnswer
                            ? 'border-[var(--mint-soft)] bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]'
                            : isWrongSelected
                            ? 'border-[var(--color-danger-light)] bg-[var(--color-danger-bg)] text-[var(--color-danger)]'
                            : isSelected
                            ? 'border-[var(--pink-primary)] bg-[var(--pink-primary)]/8 text-[var(--pink-primary)]'
                            : 'border-[var(--border-color)] bg-[var(--bg-input)]/60 text-[var(--text-secondary)] hover:border-[var(--pink-pale)]'
                        } ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        <span className="flex items-center gap-1.5">
                          {isRightAnswer && <Check size={12} className="text-[var(--mint-soft)] shrink-0" />}
                          {isWrongSelected && <X size={12} className="text-[var(--color-danger)] shrink-0" />}
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="flex items-center gap-2 pt-1">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="text-xs px-4 py-2 rounded-xl bg-[var(--pink-primary)] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                提交答案
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="text-xs px-4 py-2 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] font-medium hover:text-[var(--text-primary)] transition-colors"
              >
                重新作答
              </button>
            )}
            {!allAnswered && !submitted && (
              <span className="text-[11px] text-[var(--text-muted)]">请回答全部题目</span>
            )}
            {submitted && (
              <span className="text-xs text-[var(--text-muted)]">
                {correctCount === quiz.length ? '🎉 全部正确！' : `答对 ${correctCount}/${quiz.length} 题`}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── 输出练习 ──────────────────────────────────────────────

function OutputTask({ prompt, example }: { prompt: string; example: string }) {
  const [showExample, setShowExample] = useState(false);
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-5 py-4 hover:bg-[var(--bg-card-hover)] transition-colors"
      >
        <Edit3 size={18} className="text-[var(--purple-soft)]" />
        <span className="font-semibold text-[var(--text-primary)]">输出 · 用今天学到的表达造句</span>
        <ChevronDown
          size={16}
          className={`ml-auto text-[var(--text-muted)] transition-transform ${expanded ? '' : '-rotate-90'}`}
        />
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-3">
          <div className="bg-[var(--bg-input)]/60 rounded-xl p-4">
            <p className="text-sm text-[var(--text-primary)] leading-relaxed">{prompt}</p>
          </div>

          <button
            onClick={() => setShowExample(!showExample)}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors flex items-center gap-1"
          >
            <Lightbulb size={12} />
            {showExample ? '隐藏参考例句' : '看参考例句'}
          </button>

          {showExample && (
            <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-xl p-4">
              <p className="text-xs text-[var(--text-muted)] mb-1">参考例句：</p>
              <p className="text-sm text-[var(--mint-soft)] leading-relaxed whitespace-pre-line">{example}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
