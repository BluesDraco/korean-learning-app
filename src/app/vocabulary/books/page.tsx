'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BooksSection } from '@/components/vocabulary/BooksSection';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader } from '@/components/ui';

export default function WordBooksPage() {
  const isDesktop = useIsDesktop();
  const containerCls = isDesktop ? 'py-6 max-w-5xl mx-auto px-4 space-y-5' : 'py-4 max-w-2xl mx-auto px-4 space-y-4';

  return (
    <div className={containerCls}>
      <Link
        href="/vocabulary"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--color-ink-2)', textDecoration: 'none',
          marginBottom: 14,
        }}
      >
        <ArrowLeft size={14} />
        返回词汇
      </Link>

      <PageHeader
        eyebrow="MY BOOKS"
        title="自定义单词本"
        subtitle="整理你的专属单词集，按主题自由归类"
        tone="pink"
        flat
      />

      <BooksSection />
    </div>
  );
}
