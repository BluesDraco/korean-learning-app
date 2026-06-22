'use client';

import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useIsMobile } from '@/lib/useIsMobile';
import { Sheet } from '@/components/ui/Sheet';

type Size = 'sm' | 'md' | 'lg';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: Size;
  children: ReactNode;
  closeOnBackdrop?: boolean;
  closeButton?: boolean;
}

const MAX_W: Record<Size, number> = {
  sm: 380,
  md: 540,
  lg: 720,
};

export function Modal({
  open,
  onClose,
  title,
  size = 'md',
  children,
  closeOnBackdrop = true,
  closeButton = true,
}: ModalProps) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!open || isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, isMobile]);

  if (!open) return null;
  if (isMobile) {
    return (
      <Sheet open={open} onClose={onClose} title={title} closeOnBackdrop={closeOnBackdrop} closeButton={closeButton}>
        {children}
      </Sheet>
    );
  }
  if (typeof window === 'undefined') return null;

  return createPortal(
    <>
      <div
        onClick={closeOnBackdrop ? onClose : undefined}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--backdrop-color-strong)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          animation: 'tori-fade-in var(--dur-base) var(--ease-soft)',
        }}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 201,
          background: 'var(--color-surface-2)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 28px',
          width: 'min(92vw, ' + MAX_W[size] + 'px)',
          maxHeight: '88vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--color-border-1)',
          animation: 'tori-scale-in var(--dur-base) var(--ease-soft)',
        }}
      >
        {(title || closeButton) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            {title ? (
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                {title}
              </h2>
            ) : (
              <span />
            )}
            {closeButton && (
              <button
                onClick={onClose}
                aria-label="关闭"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
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
