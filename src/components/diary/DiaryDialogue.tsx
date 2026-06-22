'use client';

import { useState } from 'react';
import type { ToriDay, ToriDialogueLine } from '@/types/tori-diary';
import { Volume2, ChevronRight, MessageCircle } from 'lucide-react';
import { speak } from '@/lib/tts';

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

  const handleSpeak = async (ko: string) => {
    try {
      await speak(ko, 0.85);
    } catch {
      /* ignore */
    }
  };

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
            isCurrent={idx === currentIdx}
            pickedChoice={picked[idx]}
            isShadowed={shadowedIdx.has(idx)}
            onSpeak={() => handleSpeak(line.ko)}
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
  isCurrent: boolean;
  pickedChoice?: number;
  isShadowed: boolean;
  onSpeak: () => void;
  onPick: (idx: number) => void;
  onShadow: () => void;
  onListenAdvance: () => void;
}

function DialogueLine({ line, isCurrent, pickedChoice, isShadowed, onSpeak, onPick, onShadow, onListenAdvance }: LineProps) {
  const isTori = line.speaker === 'tori';
  const isNpc = line.speaker === 'npc';

  const labelColor = isTori ? 'var(--diary-gold-deep)' : 'var(--diary-stamp-red)';
  const speakerName = isTori ? '兔莉（你）' : isNpc ? line.npcName ?? '对方' : '你';

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
          maxWidth: '85%',
          padding: '14px 16px',
          background: isTori ? 'var(--diary-paper)' : '#fffaf0',
          borderLeft: isTori ? '3px solid var(--diary-gold)' : '3px solid var(--diary-stamp-red)',
        }}
      >
        {/* 韩文 + 翻译（pick 行不显示韩文，需要思考） */}
        {line.practice !== 'pick' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div className="diary-ko" style={{ fontSize: 'var(--diary-text-xl)', flex: 1 }}>
                {line.ko}
              </div>
              <button
                onClick={onSpeak}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: '1.5px solid var(--diary-line-strong)',
                  background: 'transparent', color: 'var(--diary-gold-deep)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                aria-label="听"
              >
                <Volume2 size={14} />
              </button>
            </div>
            <div className="diary-romaji" style={{ marginBottom: 4 }}>{line.hangul}</div>
            <div className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-soft)' }}>
              {line.zh}
            </div>
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
                const showResult = pickedChoice !== undefined;
                const bg = !showResult
                  ? 'var(--diary-paper-deep)'
                  : c.correct
                    ? 'rgba(94, 168, 134, 0.18)'
                    : isPicked
                      ? 'rgba(193, 78, 58, 0.14)'
                      : 'var(--diary-paper-deep)';
                const border = !showResult
                  ? '1.5px solid var(--diary-line)'
                  : c.correct
                    ? '1.5px solid #5ea886'
                    : isPicked
                      ? '1.5px solid var(--diary-stamp-red)'
                      : '1.5px solid var(--diary-line)';
                return (
                  <button
                    key={ci}
                    onClick={() => !showResult && onPick(ci)}
                    disabled={showResult}
                    style={{
                      padding: '10px 14px',
                      background: bg,
                      border: border,
                      borderRadius: 'var(--diary-r-sm)',
                      cursor: showResult ? 'default' : 'pointer',
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
            <button onClick={onShadow} className="diary-btn diary-btn-ghost" style={{ padding: '6px 16px', fontSize: 'var(--diary-text-sm)' }}>
              我跟读了 →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
