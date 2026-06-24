'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ThemesSection } from '@/components/vocabulary/ThemesSection';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader } from '@/components/ui';

export default function ThemesPage() {
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
        eyebrow="THEMES"
        title="主题词包"
        subtitle="学一个场景，拿走一套够用的词。토리陪你开口说韩语！"
        tone="mint"
        flat
      />

      <ThemesSection />
    </div>
  );
}
