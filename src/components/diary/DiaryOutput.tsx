'use client';

import { useState } from 'react';
import type { ToriDay } from '@/types/tori-diary';
import { ChevronRight, Check, X } from 'lucide-react';

interface Props {
  day: ToriDay;
  onComplete: (results: Array<{ taskId: string; correct: boolean; userText?: string }>) => void;
}

/**
 * Day Output — 输出练习
 * 当前只实现 'fill' 填空（Day 1 用得到的最简形式）
 * choice / dictation / record 等留待后续 Day 用到时再扩展
 */
export function DiaryOutput({ day, onComplete }: Props) {
  const [taskIdx, setTaskIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [checked, setChecked] = useState<boolean | null>(null);
  const [results, setResults] = useState<Array<{ taskId: string; correct: boolean; userText?: string }>>([]);

  const task = day.output[taskIdx];

  const handleCheck = () => {
    const trimmed = userInput.trim();
    const correct = task.kind === 'fill' && trimmed === (task.answer ?? '').trim();
    setChecked(correct);
    const newResults = [...results, { taskId: task.id, correct, userText: trimmed }];
    setResults(newResults);
  };

  const handleNext = () => {
    if (taskIdx < day.output.length - 1) {
      setTaskIdx(taskIdx + 1);
      setUserInput('');
      setChecked(null);
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
        你来填一下
      </h2>
      <p className="diary-handwriting-zh diary-text-soft" style={{ marginBottom: 20 }}>
        把今天学的句子完整说出来。{taskIdx + 1}/{day.output.length}
      </p>

      <div
        className="diary-card-paper"
        style={{
          padding: '20px 22px',
          marginBottom: 24,
          background: 'var(--diary-paper)',
        }}
      >
        {/* 中文提示 */}
        {task.zhHint && (
          <p className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink-soft)', marginBottom: 14 }}>
            {task.zhHint}
          </p>
        )}

        {/* 填空 prompt 用韩文字号 */}
        <div className="diary-ko" style={{ fontSize: 'var(--diary-text-xl)', marginBottom: 14, lineHeight: 1.5 }}>
          {task.prompt.includes('___') ? (
            task.prompt.split('___').reduce<React.ReactNode[]>((acc, part, idx, arr) => {
              acc.push(part);
              if (idx < arr.length - 1) {
                acc.push(
                  <input
                    key={idx}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={checked !== null}
                    placeholder="?"
                    autoFocus
                    style={{
                      display: 'inline-block',
                      width: '120px',
                      padding: '4px 10px',
                      margin: '0 6px',
                      fontFamily: 'var(--diary-font-ko)',
                      fontSize: 'var(--diary-text-xl)',
                      color: checked === true ? '#5ea886' : checked === false ? 'var(--diary-stamp-red)' : 'var(--diary-ink)',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '2px solid var(--diary-gold)',
                      outline: 'none',
                      textAlign: 'center',
                    }}
                  />
                );
              }
              return acc;
            }, [])
          ) : (
            <span>{task.prompt}</span>
          )}
        </div>

        {/* 反馈 */}
        {checked === true && (
          <div
            className="diary-anim-fade-up"
            style={{
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
              {task.successMsg ?? '答对了！'}
            </span>
          </div>
        )}

        {checked === false && (
          <div
            className="diary-anim-fade-up"
            style={{
              padding: '10px 14px',
              background: 'rgba(193, 78, 58, 0.10)',
              borderRadius: 'var(--diary-r-sm)',
              borderLeft: '3px solid var(--diary-stamp-red)',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <X size={16} color="var(--diary-stamp-red)" />
            <span className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink)' }}>
              再想想。正确答案：<strong className="diary-handwriting-ko">{task.answer}</strong>
            </span>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        {checked === null ? (
          <button onClick={handleCheck} className="diary-btn diary-btn-primary" disabled={!userInput.trim()} style={{ opacity: userInput.trim() ? 1 : 0.4 }}>
            检查
          </button>
        ) : (
          <button onClick={handleNext} className="diary-btn diary-btn-primary">
            {taskIdx < day.output.length - 1 ? '下一题' : '继续 · 收尾'} <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
