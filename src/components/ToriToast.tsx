'use client';

import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

const ICON_MAP = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const COLOR_MAP = {
  success: 'bg-[var(--mint-soft)]/20 border-[var(--mint-soft)] text-[var(--text-primary)]',
  error: 'bg-[var(--pink-pale)]/40 border-[var(--pink-primary)] text-[var(--text-primary)]',
  info: 'bg-[var(--blue-soft)]/20 border-[var(--blue-soft)] text-[var(--text-primary)]',
  warning: 'bg-[var(--yellow-soft)]/30 border-[var(--peach-soft)] text-[var(--text-primary)]',
};

export function ToriToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none">
      {toasts.map((t) => {
        const Icon = ICON_MAP[t.type];
        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-[13px] font-medium shadow-lg animate-slide-up max-w-[90vw] ${COLOR_MAP[t.type]}`}
          >
            <Icon size={16} className="shrink-0" />
            <span className="truncate">{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
