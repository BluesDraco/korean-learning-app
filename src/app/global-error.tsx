'use client';

import { useEffect } from 'react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { lang } = useLang();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, background: '#fffbf7', fontFamily: 'sans-serif' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: '0 24px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 48 }}>🐰</div>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: '#241917', margin: '0 0 6px' }}>{t('gerr.title', lang)}</h1>
            <p style={{ fontSize: 14, color: '#89756e', margin: 0 }}>{t('gerr.desc', lang)}</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={reset}
              style={{
                padding: '10px 20px', borderRadius: 12, background: '#ff7fa8',
                color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer',
              }}
            >
              {t('gerr.retry', lang)}
            </button>
            <a
              href="/daily"
              style={{
                padding: '10px 20px', borderRadius: 12, border: '1px solid #eee0d8',
                background: '#fff', color: '#241917', fontSize: 14, fontWeight: 600,
                textDecoration: 'none', display: 'inline-block',
              }}
            >
              {t('gerr.home', lang)}
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
