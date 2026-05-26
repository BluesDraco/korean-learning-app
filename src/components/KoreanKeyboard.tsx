'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { X, Delete } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// Hangul Composition Engine
// Unicode: 0xAC00 + choseong*588 + jungseong*28 + jongseong
// ═══════════════════════════════════════════════════════════════

const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const CHO_SET = new Set(CHO);
const JUNG_SET = new Set(JUNG);

// Compound finals: prevFinal + newConsonant → compound
const FC: Record<string, Record<string, string>> = {
  'ㄱ': { 'ㅅ': 'ㄳ' },
  'ㄴ': { 'ㅈ': 'ㄵ', 'ㅎ': 'ㄶ' },
  'ㄹ': { 'ㄱ': 'ㄺ', 'ㅁ': 'ㄻ', 'ㅂ': 'ㄼ', 'ㅅ': 'ㄽ', 'ㅌ': 'ㄾ', 'ㅍ': 'ㄿ', 'ㅎ': 'ㅀ' },
  'ㅂ': { 'ㅅ': 'ㅄ' },
};

// Compound vowels: prevVowel + newVowel → compound
const VC: Record<string, Record<string, string>> = {
  'ㅗ': { 'ㅏ': 'ㅘ', 'ㅐ': 'ㅙ', 'ㅣ': 'ㅚ' },
  'ㅜ': { 'ㅓ': 'ㅝ', 'ㅔ': 'ㅞ', 'ㅣ': 'ㅟ' },
  'ㅡ': { 'ㅣ': 'ㅢ' },
};

function isC(j: string) { return CHO_SET.has(j); }
function isV(j: string) { return JUNG_SET.has(j); }

function buildSyl(cho: string, jung: string, jong: string): string {
  const ci = CHO.indexOf(cho);
  const vi = JUNG.indexOf(jung);
  const fi = JONG.indexOf(jong);
  if (ci < 0 || vi < 0 || fi < 0) return cho + jung + jong;
  return String.fromCharCode(0xAC00 + ci * 588 + vi * 28 + fi);
}

// Compose jamo buffer → display string (Hangul + pending jamo)
function composeBuffer(buf: string[]): string {
  const out: string[] = [];
  let i = 0;

  while (i < buf.length) {
    // ── Vowel-first: keep as raw jamo UNLESS a consonant follows ──
    if (isV(buf[i])) {
      let vowel = buf[i];
      i++;
      // Try compound vowel
      if (i < buf.length && isV(buf[i])) {
        const c = VC[vowel]?.[buf[i]];
        if (c) { vowel = c; i++; }
      }
      // Only compose into full syllable if a consonant follows
      if (i < buf.length && isC(buf[i])) {
        let final = '';
        final = buf[i]; i++;
        if (i < buf.length && isC(buf[i])) {
          const fc = FC[final]?.[buf[i]];
          if (fc) { final = fc; i++; }
        }
        out.push(buildSyl('ㅇ', vowel, final));
      } else {
        // No consonant after vowel → keep as raw jamo
        out.push(vowel);
      }
      continue;
    }

    // ── Consonant-first (normal syllable) ──
    const cho = buf[i];
    i++;

    // Lone consonant at end → keep as raw jamo
    if (i >= buf.length || !isV(buf[i])) {
      out.push(cho);
      continue;
    }

    let jung = buf[i];
    i++;

    // Try compound vowel
    if (i < buf.length && isV(buf[i])) {
      const c = VC[jung]?.[buf[i]];
      if (c) { jung = c; i++; }
    }

    // Try final consonant(s)
    let jong = '';
    if (i < buf.length && isC(buf[i])) {
      jong = buf[i];
      i++;
      if (i < buf.length && isC(buf[i])) {
        const fc = FC[jong]?.[buf[i]];
        if (fc) { jong = fc; i++; }
      }
    }

    out.push(buildSyl(cho, jung, jong));
  }

  return out.join('');
}

// Decompose a Hangul syllable → jamo array
function decomposeSyl(syl: string): string[] {
  const code = syl.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7AF) return [syl];

  const offset = code - 0xAC00;
  const fi = offset % 28;
  const vi = ((offset - fi) / 28) % 21;
  const ci = ((offset - fi) / 28 - vi) / 21;

  const parts: string[] = [CHO[ci]];

  const j = JUNG[vi];
  const vp: Record<string, string[]> = {
    'ㅘ': ['ㅗ','ㅏ'], 'ㅙ': ['ㅗ','ㅐ'], 'ㅚ': ['ㅗ','ㅣ'],
    'ㅝ': ['ㅜ','ㅓ'], 'ㅞ': ['ㅜ','ㅔ'], 'ㅟ': ['ㅜ','ㅣ'],
    'ㅢ': ['ㅡ','ㅣ'],
  };
  parts.push(...(vp[j] || [j]));

  if (fi > 0) {
    const f = JONG[fi];
    const fp: Record<string, string[]> = {
      'ㄳ': ['ㄱ','ㅅ'], 'ㄵ': ['ㄴ','ㅈ'], 'ㄶ': ['ㄴ','ㅎ'],
      'ㄺ': ['ㄹ','ㄱ'], 'ㄻ': ['ㄹ','ㅁ'], 'ㄼ': ['ㄹ','ㅂ'],
      'ㄽ': ['ㄹ','ㅅ'], 'ㄾ': ['ㄹ','ㅌ'], 'ㄿ': ['ㄹ','ㅍ'],
      'ㅀ': ['ㄹ','ㅎ'], 'ㅄ': ['ㅂ','ㅅ'],
    };
    parts.push(...(fp[f] || [f]));
  }
  return parts;
}

function decomposeFull(text: string): string[] {
  const out: string[] = [];
  for (const ch of text) out.push(...decomposeSyl(ch));
  return out;
}

// ═══════════════════════════════════════════════════════════════
// Keyboard Layout (standard 2-beolsik)
// ═══════════════════════════════════════════════════════════════

interface KeyDef {
  label: string;
  shiftLabel?: string;
  type?: 'shift' | 'backspace' | 'space' | 'done';
  flex?: number;
}

const ROWS: KeyDef[][] = [
  [
    { label: 'ㅂ', shiftLabel: 'ㅃ' },
    { label: 'ㅈ', shiftLabel: 'ㅉ' },
    { label: 'ㄷ', shiftLabel: 'ㄸ' },
    { label: 'ㄱ', shiftLabel: 'ㄲ' },
    { label: 'ㅅ', shiftLabel: 'ㅆ' },
    { label: 'ㅛ' },
    { label: 'ㅕ' },
    { label: 'ㅑ' },
    { label: 'ㅐ', shiftLabel: 'ㅒ' },
    { label: 'ㅔ', shiftLabel: 'ㅖ' },
  ],
  [
    { label: 'ㅁ' },
    { label: 'ㄴ' },
    { label: 'ㅇ' },
    { label: 'ㄹ' },
    { label: 'ㅎ' },
    { label: 'ㅗ' },
    { label: 'ㅓ' },
    { label: 'ㅏ' },
    { label: 'ㅣ' },
  ],
  [
    { label: '⇧', type: 'shift', flex: 1.4 },
    { label: 'ㅋ' },
    { label: 'ㅌ' },
    { label: 'ㅊ' },
    { label: 'ㅍ' },
    { label: 'ㅠ' },
    { label: 'ㅜ' },
    { label: 'ㅡ' },
    { label: '⌫', type: 'backspace', flex: 1.4 },
  ],
];

interface KoreanKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onClose: () => void;
}

export function KoreanKeyboard({ value, onChange, visible, onClose }: KoreanKeyboardProps) {
  const [shift, setShift] = useState(false);
  const [buffer, setBuffer] = useState<string[]>([]);
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backspaceRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync buffer when value changes externally (paste, keyboard close/reopen)
  useEffect(() => {
    if (visible) setBuffer(decomposeFull(value));
  }, [visible, value]);

  // Sync buffer changes → parent onChange
  useEffect(() => {
    if (visible) onChange(composeBuffer(buffer));
  }, [buffer, visible, onChange]);

  const handleKey = useCallback((key: KeyDef) => {
    if (key.type === 'shift') {
      setShift(s => !s);
      return;
    }

    setShift(false);

    if (key.type === 'backspace') {
      setBuffer(prev => prev.length === 0 ? prev : prev.slice(0, -1));
      return;
    }

    if (key.type === 'space') {
      setBuffer(prev => [...prev, ' ']);
      return;
    }

    if (key.type === 'done') {
      onClose();
      return;
    }

    const jamo = (shift && key.shiftLabel) ? key.shiftLabel : key.label;
    setBuffer(prev => [...prev, jamo]);
  }, [shift, onClose]);

  // Long-press backspace for continuous deletion
  const startRepeat = useCallback(() => {
    longPressRef.current = setTimeout(() => {
      backspaceRef.current = setInterval(() => {
        setBuffer(prev => {
          if (prev.length === 0) {
            if (backspaceRef.current) { clearInterval(backspaceRef.current); backspaceRef.current = null; }
            return prev;
          }
          return prev.slice(0, -1);
        });
      }, 60);
    }, 400);
  }, []);

  const stopRepeat = useCallback(() => {
    if (longPressRef.current) { clearTimeout(longPressRef.current); longPressRef.current = null; }
    if (backspaceRef.current) { clearInterval(backspaceRef.current); backspaceRef.current = null; }
  }, []);

  useEffect(() => {
    return () => { stopRepeat(); };
  }, [stopRepeat]);

  if (!visible) return null;

  const composed = composeBuffer(buffer);
  const showRawJamo = buffer.length > 0 && composed !== buffer.join('');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] animate-slide-up-drawer">
      <div className="pl-0 md:pl-48 px-3 md:px-5 lg:px-8 w-full max-w-[1280px] mx-auto">
        {/* Preview bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-card)] border-t border-x border-[var(--border-color)] rounded-t-2xl">
          <div className="flex-1 min-h-[26px] flex items-center gap-2">
            <span className="text-base font-bold text-[var(--text-primary)]">
              {composed || <span className="text-[var(--text-muted)] font-normal text-xs">输入韩文...</span>}
            </span>
            {showRawJamo && (
              <span className="text-[11px] text-[var(--text-muted)] font-mono">{buffer.join(' ')}</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Key area */}
        <div className="bg-[var(--bg-soft)] border border-[var(--border-color)] rounded-b-2xl px-2 pt-2 pb-1">
          {ROWS.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-1 mb-1.5">
              {row.map((key, ki) => {
                const resolvedLabel = key.type
                  ? key.label
                  : (shift && key.shiftLabel) ? key.shiftLabel : key.label;
                const flex = key.flex || 1;

                let bg = 'bg-white dark:bg-[var(--bg-card)]';
                if (key.type === 'shift') bg = shift
                  ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]'
                  : 'bg-[var(--bg-muted)]/60';
                if (key.type === 'backspace') bg = 'bg-[var(--bg-muted)]/60';

                return (
                  <button
                    key={`${ri}-${ki}`}
                    onClick={() => handleKey(key)}
                    onMouseDown={key.type === 'backspace' ? startRepeat : undefined}
                    onMouseUp={key.type === 'backspace' ? stopRepeat : undefined}
                    onMouseLeave={key.type === 'backspace' ? stopRepeat : undefined}
                    onTouchStart={key.type === 'backspace' ? startRepeat : undefined}
                    onTouchEnd={key.type === 'backspace' ? stopRepeat : undefined}
                    className={`${bg} flex items-center justify-center h-10 rounded-lg text-sm font-medium
                      text-[var(--text-primary)] shadow-sm
                      active:scale-[0.94] active:bg-[var(--pink-pale)]/40
                      transition-all duration-75 select-none
                      hover:brightness-95`}
                    style={{ flex }}
                  >
                    {key.type === 'backspace' ? (
                      <Delete size={16} />
                    ) : (
                      <span>{resolvedLabel}</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Bottom row: space + done */}
          <div className="flex gap-1.5">
            <button
              onClick={() => handleKey({ label: '', type: 'space', flex: 1 })}
              className="bg-white dark:bg-[var(--bg-card)] flex items-center justify-center h-10 rounded-lg text-xs font-medium text-[var(--text-muted)] shadow-sm active:scale-[0.94] transition-all select-none hover:brightness-95"
              style={{ flex: 5 }}
            >
              空格
            </button>
            <button
              onClick={() => handleKey({ label: '', type: 'done', flex: 1 })}
              className="bg-[var(--pink-primary)] flex items-center justify-center h-10 rounded-lg text-sm font-bold text-white shadow-sm active:scale-[0.94] transition-all select-none hover:opacity-90"
              style={{ flex: 2 }}
            >
              完成
            </button>
          </div>

          <div className="pb-safe" />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// KoreanInput: convenience wrapper (input + keyboard toggle)
// ═══════════════════════════════════════════════════════════════

interface KoreanInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  autoFocus?: boolean;
}

export function KoreanInput({ value, onChange, placeholder, className = '', id, autoFocus }: KoreanInputProps) {
  const [showKeyboard, setShowKeyboard] = useState(false);

  return (
    <>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          inputMode="text"
          className={`input-standard w-full pr-10 ${className}`}
        />
        <button
          type="button"
          onClick={() => setShowKeyboard(!showKeyboard)}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors text-xs font-medium ${
            showKeyboard
              ? 'bg-[var(--pink-primary)]/20 text-[var(--pink-primary)]'
              : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--pink-pale)]/30'
          }`}
          title="韩文键盘"
        >
          한
        </button>
      </div>
      <KoreanKeyboard
        value={value}
        onChange={onChange}
        visible={showKeyboard}
        onClose={() => setShowKeyboard(false)}
      />
    </>
  );
}
