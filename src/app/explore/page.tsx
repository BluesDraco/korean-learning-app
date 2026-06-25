'use client';

import { BookImage, Lightbulb, Tv, Newspaper, Music, Mic2 } from 'lucide-react';
import Link from 'next/link';
import { PageHeader, Section, Card, Button, EntryCard } from '@/components/ui';
import { DesktopExplorePage } from '@/components/desktop/DesktopExplorePage';
import { useIsDesktop } from '@/lib/useIsMobile';

const FEED = [
  { label: '今日绘本', desc: '토리와 첫 만남', href: '/learn/picture-books', tone: 'mint' as const, Icon: BookImage },
  { label: '今日韩剧表达', desc: '《眼泪女王》经典台词', href: '/korea/drama', tone: 'purple' as const, Icon: Tv },
];

const INTERESTS = [
  { Icon: Music, label: 'KPOP 跟唱', desc: '逐句歌词 + 跟唱录音', href: '/korea/kpop', tone: 'pink' as const },
  { Icon: Mic2, label: '影子跟读', desc: '听音模仿，纠正节奏', href: '/shadowing', tone: 'pink' as const },
  { Icon: BookImage, label: 'Tori 绘本馆', desc: '韩语绘本故事', href: '/learn/picture-books', tone: 'mint' as const },
  { Icon: Lightbulb, label: '韩国小知识', desc: '文化·美食·旅行', href: '/knowledge', tone: 'peach' as const },
  { Icon: Tv, label: '韩剧表达', desc: '经典台词学韩语', href: '/korea/drama', tone: 'purple' as const },
];

export default function ExplorePage() {
  const isDesktop = useIsDesktop();

  if (isDesktop) return <DesktopExplorePage />;

  return (
    <div className="py-4 max-w-2xl mx-auto">
      <PageHeader
        eyebrow="탐색"
        title="探索"
        subtitle="用喜欢的内容学韩语。"
        tone="pink"
      />

      {/* Hot posts — featured hero */}
      <Section spacing="normal">
        <Card variant="hero" tone="purple" padding="lg">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div
              style={{
                width: 44, height: 44, borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface-2)', color: 'var(--color-purple-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}
              aria-hidden
            >
              <Newspaper size={22} strokeWidth={1.75} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>
                韩娱热帖
              </p>
              <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '4px 0 14px', lineHeight: 1.5 }}>
                刷热点，顺便看懂韩语。每帖逐句拆解。
              </p>
              <Link href="/korea/kpop/news" style={{ textDecoration: 'none' }}>
                <Button variant="primary" tone="black" size="md">看今日热帖</Button>
              </Link>
            </div>
          </div>
        </Card>
      </Section>

      {/* Recommended */}
      <Section title="今日推荐" spacing="normal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FEED.map(({ label, desc, href, tone, Icon }) => (
            <EntryCard
              key={href}
              href={href}
              icon={<Icon size={20} strokeWidth={1.75} />}
              label={label}
              detail={desc}
              tone={tone}
              layout="row"
            />
          ))}
        </div>
      </Section>

      {/* Interest grid */}
      <Section title="按兴趣探索" spacing="normal">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {INTERESTS.map(({ Icon, label, desc, href, tone }) => (
            <EntryCard
              key={href}
              href={href}
              icon={<Icon size={20} strokeWidth={1.75} />}
              label={label}
              detail={desc}
              tone={tone}
              layout="block"
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
