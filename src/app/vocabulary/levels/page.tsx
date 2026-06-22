'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { LevelsSection } from '@/components/vocabulary/LevelsSection';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader } from '@/components/ui';

export default function LevelsPage() {
  const isDesktop = useIsDesktop();
  const containerCls = isDesktop ? 'py-4 max-w-5xl mx-auto' : 'py-4 max-w-2xl mx-auto';

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
        eyebrow="TOPIK LEVELS"
        title="分级词表"
        subtitle="系统打通词汇盲区，逐级攻克 TOPIK 考试词汇"
        tone="purple"
        flat
      />

      <LevelsSection />
    </div>
  );
}
