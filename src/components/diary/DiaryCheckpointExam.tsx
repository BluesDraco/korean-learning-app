'use client';

import { useState, useEffect } from 'react';
import type { ToriDay, ToriOutputTask } from '@/types/tori-diary';
import { ComposeBlock, ChoiceBlock } from './DiaryOutput';
import type { Checked } from './DiaryOutput';

interface Props {
  day: ToriDay;
  onComplete: (results: Array<{ taskId: string; correct: boolean; userText?: string }>) => void;
}

export function DiaryCheckpointExam({ day, onComplete }: Props) {
  const tasks = day.output;
  const [qIdx, setQIdx] = useState(0);
  const [results, setResults] = useState<Array<{ taskId: string; correct: boolean; userText?: string }>>([]);
  const [userText, setUserText] = useState('');
  const [storyKey, setStoryKey] = useState(0);

  const [checked, setChecked] = useState<Checked>('idle');
  const [shaking, setShaking] = useState(false);
  const [picked, setPicked] = useState<number[]>([]);
  const [pickedIdx, setPickedIdx] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongZh, setWrongZh] = useState<string | null>(null);

  const task: ToriOutputTask = tasks[qIdx];
  const isCompose = task.kind === 'fill' || task.kind === 'compose';
  const progress = qIdx / tasks.length;

  useEffect(() => {
    setChecked('idle'); setShaking(false); setPicked([]); setPickedIdx(null);
    setMatched(new Set()); setWrongZh(null); setUserText('');
    setStoryKey(k => k + 1);
  }, [qIdx]);

  const next = (correct: boolean) => {
    const newResults = [...results, { taskId: task.id, correct, userText }];
    setResults(newResults);
    setTimeout(() => {
      if (qIdx < tasks.length - 1) setQIdx(q => q + 1);
      else onComplete(newResults);
    }, correct ? 900 : 1200);
  };

  const handleCorrect = () => { setChecked('correct'); next(true); };
  const handleWrong = () => {
    setChecked('wrong'); setShaking(true);
    setTimeout(() => setShaking(false), 500);
    next(false);
  };

  const contextLines = (task.sceneContext ?? '').split('\n').filter(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 20, overflow: 'hidden' }}>

      {/* ── STORY PANEL ── */}
      <div style={{
        background: 'linear-gradient(170deg, #180b2c 0%, #0d0820 100%)',
        padding: '28px 24px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* bottom glow */}
        <div style={{
          position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
          width: 240, height: 100,
          background: 'radial-gradient(ellipse, rgba(109,40,217,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* moment tag */}
        {task.examMoment && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#a855f7', flexShrink: 0 }} />
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
              color: 'rgba(168,85,247,0.85)', textTransform: 'uppercase',
              fontFamily: 'system-ui',
            }}>
              {task.examMoment}
            </span>
          </div>
        )}

        {/* story lines with stagger */}
        <div key={storyKey} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {contextLines.map((line, i) => (
            <p key={i} style={{
              margin: 0,
              fontFamily: 'var(--diary-font-zh)',
              fontSize: i === contextLines.length - 1 ? 18 : 15,
              fontWeight: i === contextLines.length - 1 ? 600 : 400,
              color: i === contextLines.length - 1 ? 'rgba(255,255,255,0.93)' : 'rgba(255,255,255,0.48)',
              lineHeight: 1.9,
              animation: `cp-line-in 0.45s ease ${i * 0.12}s both`,
            }}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* ── ANSWER PANEL ── */}
      <div style={{
        background: '#ffffff',
        boxShadow: '0 -1px 0 rgba(168,85,247,0.28), 0 20px 60px rgba(0,0,0,0.5), 0 4px 20px rgba(109,40,217,0.1)',
        padding: '22px 22px 24px',
        borderRadius: '0 0 20px 20px',
      }}>
        {/* progress bar */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{
              fontFamily: 'system-ui', fontSize: 11, fontWeight: 600,
              color: '#9ca3af', letterSpacing: '0.1em',
            }}>
              {String(qIdx + 1).padStart(2, '0')} / {String(tasks.length).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: 'system-ui', fontSize: 10, color: '#c084fc', letterSpacing: '0.08em' }}>
              ★ CHECKPOINT
            </span>
          </div>
          <div style={{ height: 2, background: '#f3f4f6', borderRadius: 99, position: 'relative', overflow: 'hidden' }}>
            <div style={{
              height: '100%', background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
              borderRadius: 99, width: '100%',
              transform: `scaleX(${progress})`,
              transformOrigin: 'left',
              transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
            }} />
            {/* dot at current position */}
            <div style={{
              position: 'absolute', top: '50%', transform: 'translateY(-50%)',
              left: `${progress * 100}%`,
              width: 8, height: 8, borderRadius: '50%',
              background: '#a855f7',
              boxShadow: '0 0 0 0 rgba(168,85,247,0.7)',
              animation: 'cp-dot-pulse 2s infinite',
              marginLeft: -4,
            }} />
          </div>
        </div>

        {isCompose ? (
          <ComposeBlock
            key={task.id} task={task} picked={picked} setPicked={setPicked}
            checked={checked} setChecked={setChecked} shaking={shaking} setShaking={setShaking}
            onCorrect={handleCorrect} onWrong={handleWrong} onUserAnswer={setUserText}
          />
        ) : (
          <ChoiceBlock
            key={task.id} task={task} checked={checked} setChecked={setChecked}
            pickedIdx={pickedIdx} setPickedIdx={setPickedIdx} shaking={shaking} setShaking={setShaking}
            matched={matched} setMatched={setMatched} wrongZh={wrongZh} setWrongZh={setWrongZh}
            onCorrect={handleCorrect} onWrong={handleWrong} onUserAnswer={setUserText}
          />
        )}
      </div>
    </div>
  );
}
