'use client'

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader } from '@/components/ui';
import { DictEncyclopediaSection } from '@/components/vocabulary/DictEncyclopediaSection';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';

function DictionaryContent() {
  const { lang } = useLang();
  const isDesktop = useIsDesktop();
  const initialQ = useSearchParams().get('q') ?? '';

  return (
    <div className={isDesktop ? 'py-4 w-full px-8 space-y-4' : 'py-4 max-w-2xl mx-auto space-y-4'}>
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
        eyebrow="DICTIONARY"
        title={t('vocab.dict_page_title', lang)}
        subtitle={t('vocab.dict_page_subtitle', lang)}
        tone="purple"
        flat
      />

      <DictEncyclopediaSection initialQuery={initialQ} />
    </div>
  );
}

export default function DictionaryPage() {
  return (
    <Suspense fallback={
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--color-pink-base)', borderTopColor: 'transparent', animation: 'tori-spin 0.7s linear infinite' }} />
      </div>
    }>
      <DictionaryContent />
    </Suspense>
  );
}
