'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Music, ChevronRight } from 'lucide-react';
import { db } from '@/lib/db';
import { getTrackById } from '@/data/kpopTracks';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader, Section, Card } from '@/components/ui';

interface KpopProgress {
  id: string;
  songId: string;
  userId?: string;
  practicedLines?: number[];
  completedLines?: number[];
  updatedAt?: number;
}

export default function MineKpopPage() {
  const isDesktop = useIsDesktop();
  const [progress, setProgress] = useState<KpopProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.kpopProgress.toArray()
      .then((rows) => setProgress(rows as KpopProgress[]))
      .catch(() => setProgress([]))
      .finally(() => setLoading(false));
  }, []);

  const entries = progress
    .filter((p) => {
      const practiced = p.practicedLines?.length || 0;
      const completed = p.completedLines?.length || 0;
      return practiced > 0 || completed > 0;
    })
    .map((p) => {
      const track = getTrackById(p.songId);
      return {
        ...p,
        title: track?.title ?? p.songId,
        artist: track?.artist ?? '',
        practicedCount: p.practicedLines?.length || 0,
        completedCount: p.completedLines?.length || 0,
        totalLines: track?.lyrics?.length || 0,
      };
    });

  const containerCls = isDesktop ? 'py-4 max-w-5xl mx-auto' : 'py-4 max-w-2xl mx-auto';

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
        eyebrow="MY KPOP"
        title="我的跟唱"
        subtitle={!loading && entries.length > 0 ? `${entries.length} 首歌曲有练习记录` : '在 KPOP 跟唱中练习过的歌曲'}
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
      ) : entries.length === 0 ? (
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
              <Music size={28} strokeWidth={1.75} />
            </div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: '0 0 6px' }}>
              这里会展示你的跟唱进度
            </h2>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '0 0 16px', lineHeight: 1.6 }}>
              在 KPOP 跟唱中练习的歌曲和进度，会出现在这里
            </p>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 600,
                padding: '8px 16px', borderRadius: 'var(--radius-pill)',
                background: 'var(--color-surface-4)', color: 'var(--color-ink-3)',
                cursor: 'not-allowed',
              }}
            >
              跟唱优化中
            </span>
          </div>
        </Card>
      ) : (
        <Section spacing="normal">
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 10 }}>
            {entries.map((entry) => (
              <Card key={entry.id} variant="row" padding="md" style={{ opacity: 0.7 }}>
                <div
                  style={{
                    width: 44, height: 44, borderRadius: 'var(--radius-md)',
                    background: 'var(--color-purple-soft)', color: 'var(--color-purple-strong)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                  aria-hidden
                >
                  <Music size={20} strokeWidth={1.75} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}
                  >
                    {entry.artist} — {entry.title}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
                    已练习 {entry.practicedCount} 行
                    {entry.totalLines > 0 ? ` / 共 ${entry.totalLines} 行` : ''}
                  </p>
                </div>
                <ChevronRight size={16} color="var(--color-ink-4)" />
              </Card>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
