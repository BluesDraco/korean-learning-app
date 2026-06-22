'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Dumbbell, Edit3, Mic, PenLine } from 'lucide-react';
import { db } from '@/lib/db';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader, Section, Card } from '@/components/ui';

export default function MinePracticesPage() {
  const isDesktop = useIsDesktop();
  const [dictationCount, setDictationCount] = useState<number | null>(null);
  const [pronunciationCount, setPronunciationCount] = useState<number | null>(null);
  const [shadowingCount, setShadowingCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      db.dictationRecords.count().catch(() => 0),
      db.pronunciationAttempts.count().catch(() => 0),
      db.shadowingRecords.count().catch(() => 0),
    ]).then(([d, p, s]) => {
      setDictationCount(d);
      setPronunciationCount(p);
      setShadowingCount(s);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const total = (dictationCount ?? 0) + (pronunciationCount ?? 0) + (shadowingCount ?? 0);

  const items = [
    { Icon: Edit3,   label: '默写练习', count: dictationCount,     href: '/dictation',     tone: 'mint'   as const },
    { Icon: Mic,     label: '发音练习', count: pronunciationCount, href: '/pronunciation', tone: 'pink'   as const },
    { Icon: PenLine, label: '影子跟读', count: shadowingCount,     href: '/shadowing',     tone: 'purple' as const },
  ];

  const TONE_BG: Record<'pink' | 'mint' | 'purple', string> = {
    pink: 'var(--color-pink-soft)', mint: 'var(--color-mint-soft)', purple: 'var(--color-purple-soft)',
  };
  const TONE_FG: Record<'pink' | 'mint' | 'purple', string> = {
    pink: 'var(--color-pink-strong)', mint: 'var(--color-mint-strong)', purple: 'var(--color-purple-strong)',
  };

  const containerCls = isDesktop ? 'py-4 max-w-4xl mx-auto' : 'py-4 max-w-2xl mx-auto';

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
        eyebrow="MY PRACTICES"
        title="我的练习"
        subtitle={!loading && total > 0 ? `共 ${total} 次` : '默写、发音、跟读的练习汇总'}
        tone="purple"
        flat
      />

      {loading ? (
        <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 24, height: 24, borderRadius: '50%',
              border: '2px solid var(--color-pink-base)', borderTopColor: 'transparent',
              animation: 'tori-spin 0.7s linear infinite',
              margin: '0 auto',
            }}
          />
        </Card>
      ) : total === 0 ? (
        <Card variant="hero" tone="purple" padding="lg">
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 64, height: 64, borderRadius: 'var(--radius-lg)',
                background: 'var(--color-surface-2)', color: 'var(--color-purple-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px',
              }}
              aria-hidden
            >
              <Dumbbell size={28} strokeWidth={1.75} />
            </div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: '0 0 6px' }}>
              还没有练习记录
            </h2>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: 0, lineHeight: 1.6 }}>
              完成默写、发音或跟读练习后，记录会显示在这里
            </p>
          </div>
        </Card>
      ) : (
        <Section spacing="normal">
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr', gap: 12 }}>
            {items.map(({ Icon, label, count, href, tone }) => (
              <Card key={label} as="a" href={href} variant="default" padding="md" interactive>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 'var(--radius-md)',
                      background: TONE_BG[tone], color: TONE_FG[tone],
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}
                    aria-hidden
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                      {label}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
                      {count !== null && count > 0 ? `已完成 ${count} 次` : '点击开始练习'}
                    </p>
                  </div>
                  <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-ink-1)' }}>
                    {count ?? '—'}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
