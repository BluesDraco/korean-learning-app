'use client';

import { useEffect, useRef, useState } from 'react';
import type { ToriDay, ToriDialogueLine } from '@/types/tori-diary';
import { ChevronRight, ChevronDown, MessageCircle, Volume2, Mic, Square, Play, RotateCcw } from 'lucide-react';
import { speak } from '@/lib/tts';
import { AudioRecorder, isRecordingSupported, revokeRecording } from '@/lib/audio/recorder';
import { TappableText } from '@/components/TappableText';
import { DiaryLineActions } from './DiaryLineActions';

interface Props {
  day: ToriDay;
  onComplete: () => void;
}

/**
 * Day Dialogue — 场景对话
 * 逐行展开。listen 行只播音，shadow 行要求点"跟读"，pick 行要求选答
 */
export function DiaryDialogue({ day, onComplete }: Props) {
  const lines = day.dialogue.lines;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [shadowedIdx, setShadowedIdx] = useState<Set<number>>(new Set());

  const currentLine = lines[currentIdx];
  const isLast = currentIdx === lines.length - 1;
  const lastLinePassed =
    isLast &&
    (currentLine.practice !== 'pick' ||
      (picked[currentIdx] !== undefined && currentLine.choices?.[picked[currentIdx]]?.correct));

  const handlePick = (lineIdx: number, choiceIdx: number) => {
    setPicked((p) => ({ ...p, [lineIdx]: choiceIdx }));
    const correct = currentLine.choices?.[choiceIdx]?.correct;
    if (correct && !isLast) {
      setTimeout(() => setCurrentIdx((i) => i + 1), 800);
    }
  };

  const handleShadow = (lineIdx: number) => {
    setShadowedIdx((s) => new Set(s).add(lineIdx));
    if (!isLast) {
      setTimeout(() => setCurrentIdx((i) => i + 1), 600);
    }
  };

  const handleListenAdvance = () => {
    if (!isLast) {
      setCurrentIdx((i) => i + 1);
    }
  };

  return (
    <div className="diary-anim-fade-up">
      <div style={{ marginBottom: 18 }}>
        <span className="diary-tag diary-tag-mint">DIALOGUE · 对话</span>
      </div>
      <h2 className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 6 }}>
        {day.dialogue.scene}
      </h2>
      <p className="diary-handwriting-zh diary-text-soft" style={{ marginBottom: 20 }}>
        📍 {day.dialogue.setting.place} · {day.dialogue.setting.time}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {lines.slice(0, currentIdx + 1).map((line, idx) => (
          <DialogueLine
            key={idx}
            line={line}
            idx={idx}
            day={day.day}
            isCurrent={idx === currentIdx}
            pickedChoice={picked[idx]}
            isShadowed={shadowedIdx.has(idx)}
            onPick={(ci) => handlePick(idx, ci)}
            onShadow={() => handleShadow(idx)}
            onListenAdvance={handleListenAdvance}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onComplete}
          disabled={!lastLinePassed}
          className="diary-btn diary-btn-primary"
          style={{ opacity: lastLinePassed ? 1 : 0.4, cursor: lastLinePassed ? 'pointer' : 'not-allowed' }}
        >
          下一步 · 语法 <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

interface LineProps {
  line: ToriDialogueLine;
  idx: number;
  day: number;
  isCurrent: boolean;
  pickedChoice?: number;
  isShadowed: boolean;
  onPick: (idx: number) => void;
  onShadow: () => void;
  onListenAdvance: () => void;
}

function DialogueLine({ line, day, isCurrent, pickedChoice, isShadowed, onPick, onShadow, onListenAdvance }: LineProps) {
  const isTori = line.speaker === 'tori';
  const isNpc = line.speaker === 'npc';
  const [expanded, setExpanded] = useState(false);

  const labelColor = isTori ? 'var(--diary-gold-deep)' : 'var(--diary-stamp-red)';
  const speakerName = isTori ? '兔莉（你）' : isNpc ? line.npcName ?? '对方' : '你';
  const source = `tori-diary-day-${day}`;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isTori ? 'flex-start' : 'flex-end',
      }}
      className="diary-anim-fade-up"
    >
      <span style={{ fontSize: 'var(--diary-text-xs)', color: labelColor, fontWeight: 700, marginBottom: 4, letterSpacing: '0.05em' }}>
        {speakerName}
      </span>

      <div
        className="diary-card-paper"
        style={{
          minWidth: 'min(280px, 85%)',
          maxWidth: '85%',
          padding: '14px 16px',
          background: isTori ? 'var(--diary-paper)' : '#fffaf0',
          borderLeft: isTori ? '3px solid var(--diary-gold)' : '3px solid var(--diary-stamp-red)',
        }}
      >
        {/* 韩文 + 翻译（pick 行不显示韩文，需要思考） */}
        {line.practice !== 'pick' && (
          <>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <div className="diary-ko" style={{ fontSize: 'var(--diary-text-xl)', flex: 1, lineHeight: 1.5 }}>
                <TappableText text={line.ko} source={source} />
              </div>
              <button
                onClick={() => setExpanded((v) => !v)}
                aria-label={expanded ? '收起' : '展开'}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: 4,
                  color: 'var(--diary-gold-deep)',
                  display: 'inline-flex',
                  transition: 'transform 0.2s',
                  transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                  marginTop: 4,
                }}
              >
                <ChevronDown size={16} />
              </button>
            </div>
            {expanded && (
              <div
                className="diary-anim-fade-up"
                style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed var(--diary-line)' }}
              >
                <div className="diary-romaji" style={{ marginBottom: 4 }}>{line.hangul}</div>
                <div className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-soft)', marginBottom: 8 }}>
                  {line.zh}
                </div>
                <DiaryLineActions
                  ko={line.ko}
                  zh={line.zh}
                  source={source}
                  showRecord={true}
                />
              </div>
            )}
          </>
        )}

        {/* pick 行 */}
        {line.practice === 'pick' && (
          <>
            <div className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink)', marginBottom: 12 }}>
              <MessageCircle size={14} style={{ display: 'inline', marginRight: 6 }} />
              {line.zh}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {line.choices?.map((c, ci) => {
                const isPicked = pickedChoice === ci;
                const correctPicked =
                  pickedChoice !== undefined && line.choices?.[pickedChoice]?.correct === true;
                const showCorrect = correctPicked && c.correct;
                const showThisWrong = isPicked && !c.correct;
                const bg = showCorrect
                  ? 'rgba(94, 168, 134, 0.18)'
                  : showThisWrong
                    ? 'rgba(193, 78, 58, 0.14)'
                    : 'var(--diary-paper-deep)';
                const border = showCorrect
                  ? '1.5px solid #5ea886'
                  : showThisWrong
                    ? '1.5px solid var(--diary-stamp-red)'
                    : '1.5px solid var(--diary-line)';
                return (
                  <button
                    key={ci}
                    onClick={() => !correctPicked && onPick(ci)}
                    disabled={correctPicked}
                    style={{
                      padding: '10px 14px',
                      background: bg,
                      border: border,
                      borderRadius: 'var(--diary-r-sm)',
                      cursor: correctPicked ? 'default' : 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div className="diary-ko" style={{ fontSize: 'var(--diary-text-md)', marginBottom: 2 }}>
                      {c.ko}
                    </div>
                    <div className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-soft)' }}>
                      {c.zh}
                    </div>
                  </button>
                );
              })}
            </div>
            {pickedChoice !== undefined && line.choices?.[pickedChoice]?.correct === false && (
              <p className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-stamp-red)', marginTop: 10 }}>
                再想想？(可以点右下角胡萝卜求助 🥕)
              </p>
            )}
          </>
        )}
      </div>

      {/* 行操作按钮 */}
      {isCurrent && (
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          {line.practice === 'listen' && (
            <button onClick={onListenAdvance} className="diary-btn diary-btn-ghost" style={{ padding: '6px 16px', fontSize: 'var(--diary-text-sm)' }}>
              听过了 →
            </button>
          )}
          {line.practice === 'shadow' && !isShadowed && (
            <ShadowRecordBlock ko={line.ko} onDone={onShadow} />
          )}
        </div>
      )}
    </div>
  );
}

function ShadowRecordBlock({ ko, onDone }: { ko: string; onDone: () => void }) {
  const [state, setState] = useState<'idle' | 'rec' | 'preview'>('idle');
  const [url, setUrl] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const recRef = useRef<AudioRecorder | null>(null);
  const supported = isRecordingSupported();

  useEffect(() => () => { if (url) revokeRecording(url); }, [url]);
  useEffect(() => () => { recRef.current?.cancel(); }, []);

  const playOrig = () => speak(ko, 0.85).catch(() => {});
  const playMine = () => url && new Audio(url).play().catch(() => {});

  const start = async () => {
    setErr(null);
    const r = new AudioRecorder(15000);
    recRef.current = r;
    const res = await r.start();
    if (res.error) { setErr(res.error); recRef.current = null; return; }
    setState('rec');
  };

  const stop = async () => {
    const res = await recRef.current?.stop();
    recRef.current = null;
    if (res) { setUrl(res.url); setState('preview'); } else setState('idle');
  };

  const retry = () => {
    if (url) revokeRecording(url);
    setUrl(null);
    setErr(null);
    setState('idle');
  };

  return (
    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <button onClick={playOrig} className="diary-btn diary-btn-ghost" style={{ padding: '5px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Volume2 size={12} /> 听原句
        </button>
        {supported && state === 'idle' && (
          <button onClick={start} className="diary-btn diary-btn-ghost" style={{ padding: '5px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Mic size={12} /> 开始跟读
          </button>
        )}
        {state === 'rec' && (
          <button onClick={stop} style={{ padding: '5px 12px', fontSize: 12, background: 'var(--diary-stamp-red)', color: '#fff', border: 'none', borderRadius: 'var(--diary-r-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Square size={10} fill="currentColor" /> 停止
          </button>
        )}
      </div>
      {err && (
        <span className="diary-handwriting-zh" style={{ fontSize: 11, color: 'var(--diary-stamp-red)' }}>{err}</span>
      )}
      {state === 'preview' && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={playMine} className="diary-btn diary-btn-ghost" style={{ padding: '5px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Play size={12} /> 听我的
          </button>
          <button onClick={playOrig} className="diary-btn diary-btn-ghost" style={{ padding: '5px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Volume2 size={12} /> 听原句
          </button>
          <button onClick={retry} className="diary-btn diary-btn-ghost" style={{ padding: '5px 10px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <RotateCcw size={11} /> 再来
          </button>
          <button onClick={onDone} className="diary-btn diary-btn-primary" style={{ padding: '5px 14px', fontSize: 12 }}>
            完成 →
          </button>
        </div>
      )}
      {state !== 'preview' && (
        <button onClick={onDone} style={{ fontSize: 11, color: 'var(--diary-ink-faint)', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
          跳过跟读 →
        </button>
      )}
    </div>
  );
}
