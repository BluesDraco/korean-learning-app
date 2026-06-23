'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ToriDay, ToriOutputTask } from '@/types/tori-diary';
import { ChevronRight, Check, X, RotateCcw } from 'lucide-react';

interface Props {
  day: ToriDay;
  onComplete: (results: Array<{ taskId: string; correct: boolean; userText?: string }>) => void;
}

interface ComposeQuestion {
  taskId: string;
  zhHint: string;
  fullSentence: string;
  composeAnswer: string[];   // 正确顺序的词
  tokens: string[];          // 已打乱的备选词（含干扰）
  successMsg?: string;
}

/**
 * Day Output — 邮票式组词题
 * 把答案句子拆成词卡，用户点击词卡飞入答题区，按正确顺序拼成完整韩文句
 */
export function DiaryOutput({ day, onComplete }: Props) {
  const questions = useMemo(() => buildComposeQuestions(day.output), [day.output]);
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number[]>([]); // 已选词在 tokens 中的索引顺序
  const [checked, setChecked] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [shaking, setShaking] = useState(false);
  const [results, setResults] = useState<Array<{ taskId: string; correct: boolean; userText?: string }>>([]);

  const q = questions[qIdx];

  const userTokens = picked.map((i) => q.tokens[i]);
  const isFull = userTokens.length === q.composeAnswer.length;

  const handlePickToken = (idx: number) => {
    if (checked === 'correct') return;
    if (picked.includes(idx)) return;
    setPicked((p) => [...p, idx]);
    setChecked('idle'); // 重新选时清错误状态
  };

  const handleRemoveToken = (orderIdx: number) => {
    if (checked === 'correct') return;
    setPicked((p) => p.filter((_, i) => i !== orderIdx));
    setChecked('idle');
  };

  const handleClear = () => {
    if (checked === 'correct') return;
    setPicked([]);
    setChecked('idle');
  };

  // 自动检查（凑齐时）
  useEffect(() => {
    if (!isFull || checked !== 'idle') return;
    const userText = userTokens.join(' ');
    const expected = q.composeAnswer.join(' ');
    const correct = userText === expected;
    if (correct) {
      setChecked('correct');
      setResults((rs) => [...rs, { taskId: q.taskId, correct: true, userText }]);
    } else {
      setChecked('wrong');
      setShaking(true);
      const t = setTimeout(() => setShaking(false), 500);
      return () => clearTimeout(t);
    }
  }, [isFull, checked, userTokens, q]);

  const handleNext = () => {
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
      setPicked([]);
      setChecked('idle');
    } else {
      onComplete(results);
    }
  };

  return (
    <div className="diary-anim-fade-up">
      <div style={{ marginBottom: 18 }}>
        <span className="diary-tag" style={{ background: '#5ea886', color: '#fff' }}>OUTPUT · 输出</span>
      </div>

      <h2 className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 6 }}>
        组词成句
      </h2>
      <p className="diary-handwriting-zh diary-text-soft" style={{ marginBottom: 20 }}>
        把词卡按正确顺序排列。{qIdx + 1}/{questions.length}
      </p>

      <div
        className="diary-card-paper"
        style={{
          padding: '20px 22px',
          marginBottom: 20,
          background: 'var(--diary-paper)',
        }}
      >
        {/* 中文提示 */}
        <p
          className="diary-handwriting-zh"
          style={{
            fontSize: 'var(--diary-text-md)',
            color: 'var(--diary-ink-soft)',
            marginBottom: 18,
            textAlign: 'center',
          }}
        >
          🎯 {q.zhHint}
        </p>

        {/* 答题区（用户已选的词） */}
        <div
          className={shaking ? 'diary-anim-shake' : ''}
          style={{
            minHeight: 64,
            padding: '12px 14px',
            background: checked === 'correct' ? 'rgba(94, 168, 134, 0.10)' : checked === 'wrong' ? 'rgba(193, 78, 58, 0.08)' : 'var(--diary-paper-deep)',
            border: checked === 'correct'
              ? '1.5px solid #5ea886'
              : checked === 'wrong'
                ? '1.5px solid var(--diary-stamp-red)'
                : '1.5px dashed var(--diary-line-strong)',
            borderRadius: 'var(--diary-r-sm)',
            marginBottom: 16,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            alignItems: 'center',
            transition: 'all 0.2s',
          }}
        >
          {userTokens.length === 0 ? (
            <span
              className="diary-handwriting-zh"
              style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-faint)', fontStyle: 'italic' }}
            >
              点下方词卡组成句子…
            </span>
          ) : (
            userTokens.map((t, i) => (
              <button
                key={`${t}-${i}`}
                onClick={() => handleRemoveToken(i)}
                disabled={checked === 'correct'}
                className="diary-stamp-card diary-anim-fade-up"
                style={{
                  cursor: checked === 'correct' ? 'default' : 'pointer',
                }}
              >
                <span className="diary-handwriting-ko" style={{ fontSize: 'var(--diary-text-md)' }}>
                  {t}
                </span>
              </button>
            ))
          )}
          {checked === 'correct' && (
            <span
              className="diary-anim-stamp"
              style={{
                marginLeft: 'auto',
                fontSize: 28,
                color: '#5ea886',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Check size={28} strokeWidth={3} />
            </span>
          )}
          {checked === 'wrong' && (
            <span
              style={{
                marginLeft: 'auto',
                color: 'var(--diary-stamp-red)',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <X size={20} strokeWidth={3} />
            </span>
          )}
        </div>

        {/* 备选词卡区 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {q.tokens.map((t, i) => {
            const used = picked.includes(i);
            return (
              <button
                key={i}
                onClick={() => handlePickToken(i)}
                disabled={used || checked === 'correct'}
                className="diary-stamp-card"
                style={{
                  opacity: used ? 0.25 : 1,
                  cursor: used || checked === 'correct' ? 'default' : 'pointer',
                  pointerEvents: used ? 'none' : 'auto',
                  transition: 'all 0.2s',
                }}
              >
                <span className="diary-handwriting-ko" style={{ fontSize: 'var(--diary-text-md)' }}>
                  {t}
                </span>
              </button>
            );
          })}
        </div>

        {/* 反馈 */}
        {checked === 'correct' && (
          <div
            className="diary-anim-fade-up"
            style={{
              marginTop: 14,
              padding: '10px 14px',
              background: 'rgba(94, 168, 134, 0.14)',
              borderRadius: 'var(--diary-r-sm)',
              borderLeft: '3px solid #5ea886',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <Check size={16} color="#5ea886" />
            <span className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink)' }}>
              {q.successMsg ?? '组对了！'}
            </span>
          </div>
        )}

        {checked === 'wrong' && (
          <div
            style={{
              marginTop: 14,
              padding: '10px 14px',
              background: 'rgba(193, 78, 58, 0.10)',
              borderRadius: 'var(--diary-r-sm)',
              borderLeft: '3px solid var(--diary-stamp-red)',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <X size={16} color="var(--diary-stamp-red)" />
            <span className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink)' }}>
              顺序不对，点已选的词卡可以拿回来。
            </span>
            <button
              onClick={handleClear}
              className="diary-btn diary-btn-ghost"
              style={{ padding: '4px 10px', fontSize: 11, marginLeft: 'auto' }}
            >
              <RotateCcw size={12} /> 重置
            </button>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleNext}
          className="diary-btn diary-btn-primary"
          disabled={checked !== 'correct'}
          style={{ opacity: checked === 'correct' ? 1 : 0.4, cursor: checked === 'correct' ? 'pointer' : 'not-allowed' }}
        >
          {qIdx < questions.length - 1 ? '下一题' : '继续 · 收尾'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/**
 * 把 ToriOutputTask[] 转成组词题列表
 * - 如果 task 提供了 tokens + composeAnswer，直接用
 * - 否则从 prompt + answer 推断
 * - 普通日的 task 数 < 3，自动通过同 task 多变体补到 3 题
 */
function buildComposeQuestions(tasks: ToriOutputTask[]): ComposeQuestion[] {
  const out: ComposeQuestion[] = [];
  for (const task of tasks) {
    const q = synthesizeFromTask(task);
    if (q) out.push(q);
  }
  // 普通日只有 1 题，扩成 3 题（变体：相同答案，干扰词重排）
  while (out.length < 3 && out.length > 0) {
    const base = out[out.length % tasks.length];
    if (!base) break;
    out.push({
      ...base,
      taskId: `${base.taskId}-v${out.length}`,
      tokens: shuffle(base.tokens),
    });
  }
  return out;
}

function synthesizeFromTask(task: ToriOutputTask): ComposeQuestion | null {
  // 如果 task 显式给了 tokens + composeAnswer
  if (task.tokens && task.composeAnswer && task.tokens.length > 0) {
    return {
      taskId: task.id,
      zhHint: task.zhHint ?? '',
      fullSentence: task.composeAnswer.join(' '),
      composeAnswer: task.composeAnswer,
      tokens: shuffle(task.tokens),
      successMsg: task.successMsg,
    };
  }

  // 否则从 prompt + answer 推断
  if (task.kind !== 'fill' || !task.answer) return null;
  // 把 ___ 替换成 answer，得到完整句
  const filled = task.prompt.replace(/_+/g, task.answer);
  // 韩语按空格分词
  const composeAnswer = filled.trim().split(/\s+/).filter(Boolean);
  if (composeAnswer.length === 0) return null;
  // 加 1-2 个干扰词
  const distractors = pickDistractors(composeAnswer);
  const tokens = shuffle([...composeAnswer, ...distractors]);
  return {
    taskId: task.id,
    zhHint: task.zhHint ?? '',
    fullSentence: filled,
    composeAnswer,
    tokens,
    successMsg: task.successMsg,
  };
}

/**
 * 从答案词序列推断干扰词
 * 简单策略：抓常见易混词（助词 / 형 변형）
 */
function pickDistractors(answer: string[]): string[] {
  const COMMON_DISTRACTORS = [
    '은', '는', '이', '가', '을', '를', '에', '에서', '도', '만',
    '예요', '이에요', '입니다', '아요', '어요', '해요', '요', '하세요',
    '있어요', '없어요', '주세요', '드릴게요', '돼요', '안',
  ];
  const used = new Set(answer);
  const candidates = COMMON_DISTRACTORS.filter((c) => !used.has(c));
  // 取 1-2 个，根据答案长度动态决定
  const n = answer.length <= 2 ? 1 : 2;
  return shuffle(candidates).slice(0, n);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
