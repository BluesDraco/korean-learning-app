'use client';

import { t, getLang } from '@/lib/i18n';

export default function ScenePracticeError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <p>{t('errpage.title', getLang())}</p>
      <button onClick={reset}>{t('errpage.retry', getLang())}</button>
    </div>
  );
}
