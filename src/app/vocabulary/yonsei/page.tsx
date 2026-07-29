'use client'

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { YonseiSection } from '@/components/vocabulary/YonseiSection';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader } from '@/components/ui';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export default function YonseiBooksPage() {
  const { lang } = useLang();
  const isDesktop = useIsDesktop();
  const containerCls = isDesktop ? 'py-6 w-full px-8 space-y-5' : 'py-4 max-w-2xl mx-auto px-4 space-y-4';

  return (
    <div className={containerCls}>
      <Link
        href="/vocabulary/library"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--color-ink-2)', textDecoration: 'none',
          marginBottom: 14,
        }}
      >
        <ArrowLeft size={14} />
        {t('vocab.back_to_library', lang)}
      </Link>

      <PageHeader
        eyebrow="TEXTBOOKS"
        title={t('vocab.yonsei_page_title', lang)}
        subtitle={t('vocab.yonsei_page_subtitle', lang)}
        tone="peach"
        flat
      />

      <YonseiSection />
    </div>
  );
}
