'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import '../../app/practice/practice-redesign.css';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface ComingSoonDialogProps {
  [k: string]: unknown;
  open: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
}

export function ComingSoonDialog({
  open,
  title,
  message,
  onClose,
}: ComingSoonDialogProps) {
  const { lang } = useLang();
  const resolvedTitle = title ?? t('coming.default_title', lang);
  const resolvedMessage = message ?? t('coming.default_message', lang);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={resolvedTitle}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(24,19,16,.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
        animation: 'coming-soon-in .2s ease-out',
      }}
    >
      <div
        className="pr-scope"
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: 360, width: '100%',
          background: 'var(--hr-surface-2)',
          border: '1.5px solid var(--hr-border-2)',
          borderRadius: 20,
          padding: '36px 28px 28px',
          boxShadow: '0 24px 48px -8px rgba(0,0,0,.25)',
          transform: 'rotate(-.4deg)',
          textAlign: 'center',
        }}
      >
        {/* 手账胶带 */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: -14, left: '50%',
            transform: 'translateX(-50%) rotate(-1.5deg)',
            width: 96, height: 20,
            background: 'rgba(255,127,168,.32)',
            borderLeft: '1px dashed rgba(214,85,131,.5)',
            borderRight: '1px dashed rgba(214,85,131,.5)',
            borderRadius: 2,
          }}
        />

        <button
          onClick={onClose}
          aria-label={t('coming.close', lang)}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 32, height: 32, borderRadius: 10,
            border: 'none', background: 'transparent',
            cursor: 'pointer', color: 'var(--hr-ink-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <X size={16} />
        </button>

        <div style={{ fontSize: 40, marginBottom: 12, lineHeight: 1 }}>🚧</div>

        <p style={{
          fontFamily: 'var(--hr-mono)',
          fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase',
          color: 'var(--hr-pink-strong)', margin: '0 0 10px', fontWeight: 700,
        }}>
          Coming Soon
        </p>

        <h2 style={{
          fontFamily: 'var(--hr-serif)', fontStyle: 'italic',
          fontSize: 22, fontWeight: 700, color: 'var(--hr-ink-1)',
          margin: '0 0 12px', letterSpacing: '-.01em',
        }}>
          {resolvedTitle}
        </h2>

        <p style={{ fontSize: 13.5, color: 'var(--hr-ink-2)', lineHeight: 1.7, margin: '0 0 24px' }}>
          {resolvedMessage}
        </p>

        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '13px 0', borderRadius: 12,
            background: 'var(--hr-ink-1)', color: 'var(--hr-surface-1)',
            border: 'none', cursor: 'pointer',
            fontFamily: 'var(--hr-sans)', fontSize: 14, fontWeight: 700,
          }}
        >
          {t('coming.got_it', lang)}
        </button>
      </div>

      <style>{`
        @keyframes coming-soon-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
