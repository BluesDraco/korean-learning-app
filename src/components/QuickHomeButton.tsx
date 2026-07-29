'use client';

import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export function QuickHomeButton() {
  const router = useRouter();
  const { lang } = useLang();
  return (
    <button
      onClick={() => router.push('/daily')}
      aria-label={t('qhome.home', lang)}
      className="no-touch-min"
      style={{
        position: 'fixed',
        top: 'calc(env(safe-area-inset-top, 0px) + 12px)',
        right: 'calc(env(safe-area-inset-right, 0px) + 12px)',
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 100,
        color: 'var(--color-ink-1)',
      }}
    >
      <Home size={20} strokeWidth={2} />
    </button>
  );
}
