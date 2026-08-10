'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface DropdownMenuProps {
  [k: string]: unknown;
  /** 触发按钮内容 */
  trigger: ReactNode;
  /** 触发按钮的 className */
  triggerClassName?: string;
  triggerAriaLabel?: string;
  /** 菜单项：接收 close 回调，点完自行关闭 */
  children: (close: () => void) => ReactNode;
}

/**
 * 右对齐下拉菜单。菜单面板 Portal 到 body + position:fixed，避开父容器 overflow 裁剪与
 * CSS 特异性击穿；相对触发按钮右缘对齐，滚动/缩放时重新定位，点外部或 Esc 关闭。
 */
export function DropdownMenu({ trigger, triggerClassName, triggerAriaLabel, children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const place = () => {
    const b = btnRef.current?.getBoundingClientRect();
    if (!b) return;
    setPos({ top: b.bottom + 6, right: window.innerWidth - b.right });
  };

  const openMenu = () => { place(); setOpen(true); };
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    const onDown = (e: Event) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || btnRef.current?.contains(target)) return;
      close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    // 滚动/缩放直接关闭：列表很长，跟随重定位会让菜单脱离已滚出视口的按钮
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => (open ? close() : openMenu())}
        className={triggerClassName}
        aria-label={triggerAriaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </button>
      {open && pos && typeof window !== 'undefined' && createPortal(
        <div
          ref={panelRef}
          role="menu"
          style={{
            position: 'fixed',
            top: pos.top,
            right: pos.right,
            zIndex: 400,
            minWidth: 180,
            maxWidth: 'calc(100vw - 24px)',
            background: 'var(--color-surface-2, var(--bg-card))',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg, 14px)',
            boxShadow: 'var(--shadow-lg, 0 12px 32px -8px rgba(120,70,40,.22))',
            padding: 6,
            animation: 'tori-fade-in var(--dur-base, .16s) var(--ease-soft, ease-out)',
          }}
        >
          {children(close)}
        </div>,
        document.body
      )}
    </>
  );
}
