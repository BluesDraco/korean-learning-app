'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  /** Show drag handle bar at top */
  handle?: boolean;
  /** Allow click outside to close (default true) */
  closeOnBackdrop?: boolean;
  /** Show top-right close button (default true) */
  closeButton?: boolean;
}

export function Sheet({
  open,
  onClose,
  title,
  children,
  handle = true,
  closeOnBackdrop = true,
  closeButton = true,
}: SheetProps) {
  const { lang } = useLang();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    // Lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;
  if (typeof window === 'undefined') return null;

  return createPortal(
    <>
      <div
        onClick={closeOnBackdrop ? onClose : undefined}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--backdrop-color)',
          zIndex: 200,
          animation: 'tori-fade-in var(--dur-base) var(--ease-soft)',
        }}
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 201,
          background: 'var(--color-surface-2)',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
          padding: '16px 20px calc(env(safe-area-inset-bottom, 0px) + 20px)',
          boxShadow: 'var(--shadow-lg)',
          maxHeight: 'var(--vh-90)',
          overflowY: 'auto',
          animation: 'tori-slide-up var(--dur-slow) var(--ease-soft)',
        }}
      >
        {handle && (
          <div
            aria-hidden
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: 'var(--color-border-2)',
              margin: '0 auto 12px',
            }}
          />
        )}
        {(title || closeButton) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            {title ? (
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                {title}
              </h2>
            ) : (
              <span />
            )}
            {closeButton && (
              <button
                onClick={onClose}
                aria-label={t('ui.sheet_close', lang)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-pill)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-ink-3)',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </>,
    document.body
  );
}
