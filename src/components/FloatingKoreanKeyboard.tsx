'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Move } from 'lucide-react';
import { KoreanKeyboardDisplay } from '@/components/dictation/KoreanKeyboardDisplay';
import { useHangulIme } from '@/lib/useHangulIme';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

// 桌面端可拖拽悬浮韩文键盘（参考 macOS 辅助键盘）。
// 接口对齐旧 KoreanKeyboard（value/onChange/visible/onClose/onSend），便于调用方无缝替换。
// 内部走 useHangulIme：物理键盘 + 虚拟点击统一喂 jamo buffer；外部改 value（点词填入/语音转写/
// 提示填入）时用 syncExternal 回灌 buffer，保证不脱节。手机端不用本组件（调用方按 isDesktop 门控）。

interface Props {
  [k: string]: unknown;
  value: string;
  onChange: (v: string) => void;
  visible: boolean;
  onClose: () => void;
  onSend?: () => void;
}

const POS_KEY = 'tori_floating_kbd_pos';
const KBD_W = 380;

function loadPos(): { x: number; y: number } | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = localStorage.getItem(POS_KEY);
    if (!v) return null;
    const p = JSON.parse(v);
    if (typeof p?.x === 'number' && typeof p?.y === 'number') return p;
  } catch { /* ignore */ }
  return null;
}

export function FloatingKoreanKeyboard({ value, onChange, visible, onClose, onSend }: Props) {
  const { lang } = useLang();
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef<{ dx: number; dy: number } | null>(null);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const onSendRef = useRef(onSend);
  onSendRef.current = onSend;

  const ime = useHangulIme({
    onChange: (txt) => onChangeRef.current(txt),
    onEnter: () => onSendRef.current?.(),
  });

  useEffect(() => { setMounted(true); }, []);

  // 首次显示：读记忆位置，无则默认右下角
  useEffect(() => {
    if (!visible || pos) return;
    const saved = loadPos();
    if (saved) { setPos(saved); return; }
    const x = Math.max(16, window.innerWidth - KBD_W - 32);
    const y = Math.max(16, window.innerHeight - 320);
    setPos({ x, y });
  }, [visible, pos]);

  // 外部 value 变化（点词填入/语音转写/提示）→ 回灌 buffer，键盘在正确基础上续打。
  // 依赖用 ime.syncExternal（useCallback 稳定引用），不用整个 ime 对象（每 render 新建会让 effect 空跑）。
  useEffect(() => {
    if (!visible) return;
    ime.syncExternal(value);
  }, [visible, value, ime.syncExternal]);

  const onPointerDownDrag = useCallback((e: React.PointerEvent) => {
    if (!pos) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
  }, [pos]);

  const onPointerMoveDrag = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const x = Math.min(Math.max(0, e.clientX - dragRef.current.dx), window.innerWidth - KBD_W);
    const y = Math.min(Math.max(0, e.clientY - dragRef.current.dy), window.innerHeight - 80);
    setPos({ x, y });
  }, []);

  const onPointerUpDrag = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setPos((p) => {
      if (p) { try { localStorage.setItem(POS_KEY, JSON.stringify(p)); } catch { /* ignore */ } }
      return p;
    });
  }, []);

  if (!mounted || !visible || !pos) return null;

  return createPortal(
    <div
      role="dialog"
      aria-label={t('keyboard.toggle', lang)}
      style={{
        position: 'fixed', left: pos.x, top: pos.y, width: KBD_W, zIndex: 500,
        background: 'var(--hr-surface-1)', borderRadius: 18,
        border: '1px solid var(--hr-border-2)', boxShadow: 'var(--hr-shadow-lg, 0 20px 48px -12px rgba(0,0,0,.28))',
        overflow: 'hidden',
      }}
    >
      {/* 标题栏（拖拽把手 + 关闭）*/}
      <div
        onPointerDown={onPointerDownDrag}
        onPointerMove={onPointerMoveDrag}
        onPointerUp={onPointerUpDrag}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 10px 8px 12px', cursor: 'grab', touchAction: 'none',
          background: 'var(--hr-surface-3)', borderBottom: '1px solid var(--hr-border-2)',
          userSelect: 'none',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: 'var(--hr-ink-3)' }}>
          <Move size={13} strokeWidth={2} /> 한국어
        </span>
        <button
          type="button"
          onClick={onClose}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={t('common.close', lang)}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 26, height: 26, borderRadius: 8, border: 'none', cursor: 'pointer',
            background: 'transparent', color: 'var(--hr-ink-3)',
          }}
        >
          <X size={16} strokeWidth={2} />
        </button>
      </div>
      <div style={{ padding: '10px 10px 12px' }}>
        <KoreanKeyboardDisplay
          composingText={value}
          pressedKey={ime.pressedKey}
          onJamo={ime.inputJamo}
          onBackspace={ime.backspace}
          onSpace={ime.space}
        />
      </div>
    </div>,
    document.body,
  );
}
