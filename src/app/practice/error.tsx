'use client';

import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';
import './practice-redesign.css';

export default function PracticeError({ error, reset }: { error: Error; reset: () => void }) {
  const { lang } = useLang();
  return (
    <div className="pr-scope" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60dvh', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 360 }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--hr-ink-1)', margin: '0 0 8px' }}>{t('errpage.title', lang)}</p>
        <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', margin: '0 0 20px' }}>{error.message}</p>
        <button
          onClick={reset}
          className="pr-btn primary"
        >
          {t('errpage.retry', lang)}
        </button>
      </div>
    </div>
  );
}
