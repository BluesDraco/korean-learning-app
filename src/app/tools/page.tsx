'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BookOpen, FileText, MessageSquare, Keyboard, Sparkles } from 'lucide-react';
import { PageHeader, Section, Card, Button, EntryCard } from '@/components/ui';
import { DesktopToolsPage } from '@/components/desktop/DesktopToolsPage';

const TOOLS = [
  { label: '语法解释', desc: '句型例句', href: '/grammar', Icon: BookOpen, tone: 'pink' as const },
  { label: '文章拆解', desc: '文章分析', href: '/reading', Icon: FileText, tone: 'purple' as const },
  { label: 'AI 场景陪练', desc: '情景对话', href: '/ai/chat', Icon: MessageSquare, tone: 'mint' as const },
  { label: '韩文打字', desc: '键盘练习', href: '/typing', Icon: Keyboard, tone: 'peach' as const },
];

export default function ToolsPage() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isDesktop) return <DesktopToolsPage />;

  return (
    <div className="py-4 max-w-2xl mx-auto">
      <PageHeader
        eyebrow="도구"
        title="工具"
        subtitle="把你看到的韩文，变成可以学的内容。"
        tone="mint"
      />

      {/* Featured: Content breakdown */}
      <Section spacing="normal">
        <Card variant="hero" tone="pink" padding="lg">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div
              style={{
                width: 44, height: 44, borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface-2)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                color: 'var(--color-pink-strong)',
              }}
              aria-hidden
            >
              <Sparkles size={22} strokeWidth={1.75} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>
                内容拆解
              </p>
              <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '4px 0 14px', lineHeight: 1.5 }}>
                粘贴一句韩语，Tori 帮你翻译、拆词、解释句子。
              </p>
              <Link href="/ai/analyze" style={{ textDecoration: 'none' }}>
                <Button variant="primary" tone="black" size="md">开始拆解</Button>
              </Link>
            </div>
          </div>
        </Card>
      </Section>

      {/* Tool grid */}
      <Section title="全部工具" spacing="normal">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {TOOLS.map(({ label, desc, href, Icon, tone }) => (
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
