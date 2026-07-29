'use client'

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { BooksSection } from '@/components/vocabulary/BooksSection';
import { PageHeader } from '@/components/ui';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export default function WordBooksPage() {
  const { lang } = useLang();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.replace('/auth/login?redirect=/vocabulary/books');
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-ink-3)', fontSize: 14 }}>{t('common.loading', lang)}</div>
    );
  }

  return (
    <div className="py-4 md:py-6 w-full max-w-2xl md:max-w-none mx-auto md:mx-0 px-4 md:px-8 space-y-4 md:space-y-5">
      <Link
        href="/vocabulary"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--color-ink-2)', textDecoration: 'none',
          marginBottom: 14,
        }}
      >
        <ArrowLeft size={14} />
        {t('vocab.back_to_vocab', lang)}
      </Link>

      <PageHeader
        eyebrow="MY BOOKS"
        title={t('vocab.books_page_title', lang)}
        subtitle={t('vocab.books_page_subtitle', lang)}
        tone="pink"
        flat
      />

      <BooksSection />
    </div>
  );
}
