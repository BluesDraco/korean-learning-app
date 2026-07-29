'use client';

import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export default function StageErrorFallback({ msg }: { msg: string }) {
  const { lang } = useLang();
  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <p style={{ color: 'var(--color-ink-3)', fontSize: 14 }}>{msg}</p>
      <Link href="/phonetics" style={{ color: 'var(--color-pink-strong)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
        ← {t('stagefb.back', lang)}
      </Link>
    </div>
  );
}
