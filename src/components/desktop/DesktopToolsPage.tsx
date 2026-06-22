'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, FileText, MessageSquare, Keyboard, Sparkles, Library } from 'lucide-react';
import { PageHeader, Section, Card, Button } from '@/components/ui';

const FEATURED = [
  {
    label: '内容拆解',
    desc: '粘贴韩文文章或句子，生成全文翻译、重点词汇、语法解析。',
    href: '/ai/analyze',
    tone: 'pink' as const,
    Icon: Sparkles,
  },
  {
    label: '韩语词库',
    desc: '按主题、等级整理的韩语词汇，随时查阅、加入单词本、开始复习。',
    href: '/vocabulary?tab=library',
    tone: 'purple' as const,
    Icon: Library,
  },
];

const TOOL_GRID = [
  { Icon: BookOpen, label: '语法解释', desc: '句型例句', href: '/grammar', tone: 'pink' as const },
  { Icon: FileText, label: '文章拆解', desc: '文章分析', href: '/reading', tone: 'purple' as const },
  { Icon: MessageSquare, label: 'AI 场景陪练', desc: '情景对话', href: '/ai/chat', tone: 'mint' as const },
  { Icon: Keyboard, label: '韩文打字', desc: '键盘练习', href: '/typing', tone: 'peach' as const },
];

const TONE_BG: Record<'pink' | 'purple' | 'mint' | 'peach', string> = {
  pink: 'var(--color-pink-soft)',
  purple: 'var(--color-purple-soft)',
  mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)',
};
const TONE_FG: Record<'pink' | 'purple' | 'mint' | 'peach', string> = {
  pink: 'var(--color-pink-strong)',
  purple: 'var(--color-purple-strong)',
  mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)',
};

export function DesktopToolsPage() {
  const router = useRouter();

  return (
    <div>
      <PageHeader
        eyebrow="도구 · TOOLS"
        title="把你看到的韩文，变成可以学的内容"
        subtitle="语法解释、文章拆解、AI 陪练、韩文打字 ── 全部工具都在这里。"
        tone="mint"
        mascot="sit"
      />

      {/* Featured cards */}
      <Section spacing="normal">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {FEATURED.map(({ label, desc, href, tone, Icon }) => (
            <Card key={href} variant="hero" tone={tone} padding="lg">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div
                  style={{
                    width: 48, height: 48, borderRadius: 'var(--radius-md)',
                    background: 'var(--color-surface-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: TONE_FG[tone], flexShrink: 0,
                  }}
                  aria-hidden
                >
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>
                    {label}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '6px 0 14px', lineHeight: 1.6 }}>
                    {desc}
                  </p>
                  <Button variant="primary" tone="black" size="md" onClick={() => router.push(href)}>
                    打开
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* All tools */}
      <Section title="全部工具" spacing="normal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {TOOL_GRID.map(({ Icon, label, desc, href, tone }) => (
            <Card
              key={href}
              as="button"
              onClick={() => router.push(href)}
              variant="default"
              padding="md"
              interactive
            >
              <div
                style={{
                  width: 48, height: 48, borderRadius: 'var(--radius-md)',
                  background: TONE_BG[tone], color: TONE_FG[tone],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 10,
                }}
                aria-hidden
              >
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                {label}
              </p>
              <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '3px 0 0' }}>
                {desc}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
