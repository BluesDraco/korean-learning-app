'use client';

import { useRouter } from 'next/navigation';
import { BookImage, Lightbulb, Tv, Newspaper, ChevronRight } from 'lucide-react';
import { PageHeader, Section, Card, Button } from '@/components/ui';

const INTEREST_GRID = [
  { Icon: BookImage, label: 'Tori 绘本馆', desc: '韩语绘本故事',     href: '/learn/picture-books', tone: 'mint'   as const },
  { Icon: Lightbulb, label: '韩国小知识', desc: '文化·美食·旅行',   href: '/knowledge',          tone: 'peach'  as const },
  { Icon: Tv,        label: '韩剧表达',   desc: '经典台词学韩语',   href: '/korea/drama',        tone: 'purple' as const },
];

const FEED = [
  { label: '今日绘本',     desc: '토리와 첫 만남',            href: '/learn/picture-books', tone: 'mint'   as const, Icon: BookImage },
  { label: '今日韩剧表达', desc: '《眼泪女王》经典台词',     href: '/korea/drama',         tone: 'purple' as const, Icon: Tv },
];

const TONE_BG: Record<'mint' | 'peach' | 'purple', string> = {
  mint: 'var(--color-mint-soft)', peach: 'var(--color-peach-soft)', purple: 'var(--color-purple-soft)',
};
const TONE_FG: Record<'mint' | 'peach' | 'purple', string> = {
  mint: 'var(--color-mint-strong)', peach: 'var(--color-peach-strong)', purple: 'var(--color-purple-strong)',
};

export function DesktopExplorePage() {
  const router = useRouter();

  return (
    <div>
      <PageHeader
        eyebrow="탐색 · EXPLORE"
        title="用喜欢的内容学韩语"
        subtitle="绘本、韩剧表达、韩国小知识 ── 都可以变成你的学习材料。"
        tone="pink"
        mascot="kpop"
      />

      {/* Hot posts featured */}
      <Section spacing="normal">
        <Card variant="hero" tone="purple" padding="lg">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div
              style={{
                width: 48, height: 48, borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface-2)', color: 'var(--color-purple-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}
              aria-hidden
            >
              <Newspaper size={22} strokeWidth={1.75} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>
                韩娱热帖
              </p>
              <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '6px 0 14px', lineHeight: 1.6 }}>
                刷热点，顺便看懂韩语。每帖逐句拆解。
              </p>
              <Button variant="primary" tone="black" size="md" onClick={() => router.push('/korea/kpop/news')}>
                看今日热帖
              </Button>
            </div>
          </div>
        </Card>
      </Section>

      {/* Two columns: interests + feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Section title="按兴趣探索" spacing="normal">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {INTEREST_GRID.map(({ Icon, label, desc, href, tone }) => (
              <Card key={href} as="button" onClick={() => router.push(href)} variant="row" interactive>
                <div
                  style={{
                    width: 44, height: 44, borderRadius: 'var(--radius-md)',
                    background: TONE_BG[tone], color: TONE_FG[tone],
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                  aria-hidden
                >
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                    {label}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
                    {desc}
                  </p>
                </div>
                <ChevronRight size={16} color="var(--color-ink-4)" aria-hidden />
              </Card>
            ))}
          </div>
        </Section>

        <Section title="今日推荐" spacing="normal">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FEED.map(({ label, desc, href, tone, Icon }) => (
              <Card key={href + label} as="button" onClick={() => router.push(href)} variant="default" padding="md" interactive>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: 'var(--radius-sm)',
                      background: TONE_BG[tone], color: TONE_FG[tone],
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}
                    aria-hidden
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                      {label}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
                      {desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
