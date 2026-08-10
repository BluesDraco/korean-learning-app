'use client';

import { useMemo, useRef, useState } from 'react';
import { Delete, ArrowUpFromLine } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { CHO, JUNG, JONG, COMPOUND_JONG, COMPOUND_JUNG } from '@/lib/hangulCompose';

// 두벌식布局 · 每键带 QWERTY 标注 + shift 激音/复元音
interface KeyDef { jamo: string; qwerty: string; shift?: string; }
const ROWS: KeyDef[][] = [
  [
    { jamo: 'ㅂ', qwerty: 'Q', shift: 'ㅃ' }, { jamo: 'ㅈ', qwerty: 'W', shift: 'ㅉ' },
    { jamo: 'ㄷ', qwerty: 'E', shift: 'ㄸ' }, { jamo: 'ㄱ', qwerty: 'R', shift: 'ㄲ' },
    { jamo: 'ㅅ', qwerty: 'T', shift: 'ㅆ' }, { jamo: 'ㅛ', qwerty: 'Y' }, { jamo: 'ㅕ', qwerty: 'U' },
    { jamo: 'ㅑ', qwerty: 'I' }, { jamo: 'ㅐ', qwerty: 'O', shift: 'ㅒ' }, { jamo: 'ㅔ', qwerty: 'P', shift: 'ㅖ' },
  ],
  [
    { jamo: 'ㅁ', qwerty: 'A' }, { jamo: 'ㄴ', qwerty: 'S' }, { jamo: 'ㅇ', qwerty: 'D' },
    { jamo: 'ㄹ', qwerty: 'F' }, { jamo: 'ㅎ', qwerty: 'G' }, { jamo: 'ㅗ', qwerty: 'H' },
    { jamo: 'ㅓ', qwerty: 'J' }, { jamo: 'ㅏ', qwerty: 'K' }, { jamo: 'ㅣ', qwerty: 'L' },
  ],
  [
    { jamo: 'ㅋ', qwerty: 'Z' }, { jamo: 'ㅌ', qwerty: 'X' }, { jamo: 'ㅊ', qwerty: 'C' },
    { jamo: 'ㅍ', qwerty: 'V' }, { jamo: 'ㅠ', qwerty: 'B' }, { jamo: 'ㅜ', qwerty: 'N' }, { jamo: 'ㅡ', qwerty: 'M' },
  ],
];

function decomposeSyllable(ch: string): string[] {
  const code = ch.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return [ch];
  const offset = code - 0xAC00;
  const fi = offset % 28;
  const vi = Math.floor((offset % (21 * 28)) / 28);
  const ci = Math.floor(offset / (21 * 28));
  const result: string[] = [CHO[ci]];
  const v = JUNG[vi];
  result.push(...(COMPOUND_JUNG[v] ?? [v]));
  if (fi > 0) {
    const f = JONG[fi];
    result.push(...(COMPOUND_JONG[f] ?? [f]));
  }
  return result;
}

function getHighlightedJamo(text: string): Set<string> {
  if (!text) return new Set();
  const lastChar = text[text.length - 1];
  const jamos = decomposeSyllable(lastChar);
  return new Set(jamos);
}

interface KoreanKeyboardDisplayProps {
  /** 当前组合中的文本 · 用于高亮"正在组合音节"的构成字母 */
  composingText: string;
  /** 传入则键盘可点击输入;不传=纯只读高亮显示 */
  onJamo?: (jamo: string) => void;
  onBackspace?: () => void;
  onSpace?: () => void;
  /** 物理键盘刚按下的键(小写 qwerty 或 ' ') · 用于同步闪光 */
  pressedKey?: string | null;
}

export function KoreanKeyboardDisplay({ composingText, onJamo, onBackspace, onSpace, pressedKey }: KoreanKeyboardDisplayProps) {
  const { lang } = useLang();
  const highlighted = useMemo(() => getHighlightedJamo(composingText), [composingText]);
  const [shift, setShift] = useState(false);
  // 虚拟键点击的本地闪光(物理键走 pressedKey prop)
  const [clickedKey, setClickedKey] = useState<string | null>(null);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickable = !!onJamo;

  // 点虚拟键时阻止按钮抢焦点,让物理键盘持续可用(焦点留在输入显示区)
  const keepFocus = (e: React.MouseEvent) => e.preventDefault();

  const flashLocal = (qwerty: string) => {
    setClickedKey(qwerty);
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => setClickedKey(null), 130);
  };

  const handleJamoClick = (jamo: string, qwerty: string) => {
    onJamo?.(jamo);
    flashLocal(qwerty.toLowerCase());
    setShift(false);
  };

  const flashedKey = clickedKey ?? pressedKey ?? null;

  const keyBase: React.CSSProperties = {
    minWidth: 0, height: clickable ? 54 : 40, borderRadius: 10,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    boxShadow: 'var(--hr-shadow-sm)', flex: 1,
    border: 'none', transition: 'background .1s var(--hr-ease), color .1s var(--hr-ease), transform .08s var(--hr-ease)',
    cursor: clickable ? 'pointer' : 'default', padding: 0, fontFamily: 'var(--hr-hangul)',
  };

  return (
    <div style={{
      background: 'var(--hr-surface-3)',
      borderRadius: 18,
      padding: clickable ? '18px 14px 16px' : '12px 8px 10px',
      userSelect: 'none',
      pointerEvents: clickable ? 'auto' : 'none',
    }}>
      {ROWS.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', justifyContent: 'center', gap: clickable ? 7 : 5, marginBottom: clickable ? 8 : 6 }}>
          {/* 最后一行左侧 Shift */}
          {clickable && ri === 2 && (
            <button
              type="button"
              onMouseDown={keepFocus}
              onClick={() => setShift(s => !s)}
              aria-pressed={shift}
              aria-label="Shift"
              style={{ ...keyBase, flex: 1.5, background: shift ? 'var(--hr-ink-1)' : 'var(--hr-surface-2)', color: shift ? 'var(--hr-surface-1)' : 'var(--hr-ink-2)' }}
            >
              <ArrowUpFromLine size={17} strokeWidth={2} />
            </button>
          )}
          {row.map((k) => {
            const label = shift && k.shift ? k.shift : k.jamo;
            const syllableActive = highlighted.has(k.jamo) || (!!k.shift && highlighted.has(k.shift));
            const pressActive = flashedKey === k.qwerty.toLowerCase();
            const content = (
              <>
                <span style={{ fontSize: clickable ? 19 : 15, fontWeight: (syllableActive || pressActive) ? 800 : 500, lineHeight: 1 }}>{label}</span>
                {clickable && <span style={{ fontSize: 9.5, color: 'var(--hr-ink-4)', fontWeight: 400, marginTop: 3 }}>{k.qwerty}</span>}
              </>
            );
            // 按键闪光(物理/点击)优先级最高,其次组合音节高亮
            const bg = pressActive ? 'var(--hr-pink-strong)' : syllableActive ? 'var(--hr-pink-base)' : 'var(--hr-surface-2)';
            const fg = (pressActive || syllableActive) ? 'var(--hr-surface-1)' : 'var(--hr-ink-1)';
            const style: React.CSSProperties = {
              ...keyBase,
              background: bg,
              color: fg,
              transform: pressActive ? 'translateY(1px) scale(0.96)' : 'none',
            };
            return clickable ? (
              <button key={k.qwerty} type="button" onMouseDown={keepFocus} onClick={() => handleJamoClick(label, k.qwerty)} style={style}>{content}</button>
            ) : (
              <div key={k.qwerty} style={style}>{content}</div>
            );
          })}
          {/* 最后一行右侧 删除 */}
          {clickable && ri === 2 && (
            <button
              type="button"
              onMouseDown={keepFocus}
              onClick={onBackspace}
              aria-label={t('kkbd.delete', lang)}
              style={{ ...keyBase, flex: 1.5, background: 'var(--hr-surface-2)', color: 'var(--hr-ink-2)' }}
            >
              <Delete size={17} strokeWidth={1.75} />
            </button>
          )}
        </div>
      ))}
      {/* 空格行(仅可点击时) */}
      {clickable && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <button
            type="button"
            onMouseDown={keepFocus}
            onClick={onSpace}
            style={{
              ...keyBase, flex: 6, maxWidth: 360, height: 44, fontSize: 13,
              background: flashedKey === ' ' ? 'var(--hr-pink-strong)' : 'var(--hr-surface-2)',
              color: flashedKey === ' ' ? 'var(--hr-surface-1)' : 'var(--hr-ink-3)',
            }}
          >
            {t('kkbd.space', lang)}
          </button>
        </div>
      )}
    </div>
  );
}
