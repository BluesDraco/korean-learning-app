'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { YonseiSection } from '@/components/vocabulary/YonseiSection';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader } from '@/components/ui';

export default function YonseiBooksPage() {
  const isDesktop = useIsDesktop();
  const containerCls = isDesktop ? 'py-6 max-w-5xl mx-auto px-4 space-y-5' : 'py-4 max-w-2xl mx-auto px-4 space-y-4';

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
        返回词库
      </Link>

      <PageHeader
        eyebrow="TEXTBOOKS"
        title="教材词汇"
        subtitle="延世・首尔韩国语官方教材同步词汇，按单元学习"
        tone="peach"
        flat
      />

      <YonseiSection />
    </div>
  );
}
