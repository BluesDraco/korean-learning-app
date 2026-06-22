'use client';

import Link from 'next/link';
import { ArrowLeft, PenLine } from 'lucide-react';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader, Card } from '@/components/ui';

export default function MineDiaryPage() {
  const isDesktop = useIsDesktop();
  const containerCls = isDesktop ? 'py-4 max-w-3xl mx-auto' : 'py-4 max-w-2xl mx-auto';

  return (
    <div className={containerCls}>
      <Link
        href="/mine"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--color-ink-2)', textDecoration: 'none',
          marginBottom: 14,
        }}
      >
        <ArrowLeft size={14} />
        返回我的
      </Link>

      <PageHeader
        eyebrow="MY DIARY"
        title="我的日记"
        subtitle="记录学习路上的心得与回顾"
        tone="pink"
        flat
      />

      <Card variant="hero" tone="pink" padding="lg">
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 64, height: 64, borderRadius: 'var(--radius-lg)',
              background: 'var(--color-surface-2)', color: 'var(--color-pink-strong)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
            }}
            aria-hidden
          >
            <PenLine size={28} strokeWidth={1.75} />
          </div>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: '0 0 6px' }}>
            这里会展示你的学习日记
          </h2>
          <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: 0, lineHeight: 1.6 }}>
            你的学习日记和心得，会在正式版中展示
          </p>
        </div>
      </Card>
    </div>
  );
}
