'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Music2, GraduationCap, BookOpen,
  Mic, Headphones, PenLine, Edit3,
  FileText, MessageCircle, Keyboard, Sparkles,
} from 'lucide-react';
import { PageHeader, Section, Card } from '@/components/ui';
import { getPhoneticProgress, getGrammarProgress } from '@/lib/progress/dailyHero';

interface LearningEntry {
  label: string;
  desc: string;
  href: string;
  progress?: number;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  tone: 'pink' | 'mint' | 'peach' | 'purple';
}

const SYSTEM_COURSES: LearningEntry[] = [
  { label: '韩文字母入门', desc: '从 40 音开始，听标准发音，再学习音节拼装。', href: '/phonetics', Icon: Music2,        tone: 'purple' },
  { label: '语法入门',     desc: '14 个语法点，跟着兔莉一步步把句子的骨架理清。', href: '/grammar',   Icon: BookOpen,      tone: 'pink' },
  { label: 'TOPIK 备考',   desc: '按题型整理词汇、阅读和写作练习路线。',           href: '/topik',     Icon: GraduationCap, tone: 'mint' },
];

const TOOLBOX: LearningEntry[] = [
  { label: '发音跟读', desc: '录音对比，纠正语调。',           href: '/pronunciation', Icon: Mic,           tone: 'pink' },
  { label: '听说练习', desc: '看中文用韩语说出来。',           href: '/listening',     Icon: Headphones,    tone: 'peach' },
  { label: '默写练习', desc: '看中文用韩文写出来。',           href: '/dictation',     Icon: Edit3,         tone: 'mint' },
  { label: '写作练习', desc: '用韩语写句子，AI 给参考。',      href: '/writing',       Icon: PenLine,       tone: 'mint' },
  { label: '文章阅读', desc: '分级阅读，沉淀长句和词。',       href: '/reading',       Icon: FileText,      tone: 'purple' },
  { label: 'AI 场景陪练', desc: '10 个情景对话，反复练习。',   href: '/ai/chat',       Icon: MessageCircle, tone: 'pink' },
  { label: '韩文打字', desc: '键盘从零开始练熟。',             href: '/typing',        Icon: Keyboard,      tone: 'peach' },
  { label: '内容拆解', desc: '粘贴一句韩语，AI 帮你拆词解句。', href: '/ai/analyze',    Icon: Sparkles,      tone: 'purple' },
];

const TONE_BG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-soft)', mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)', purple: 'var(--color-purple-soft)',
};
const TONE_FG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-strong)', mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)', purple: 'var(--color-purple-strong)',
};

export function DesktopLearningPage() {
  const router = useRouter();
  const [phoneticPct, setPhoneticPct] = useState<number | undefined>(undefined);
  const [grammarPct, setGrammarPct] = useState<number | undefined>(undefined);

  useEffect(() => {
    getPhoneticProgress().then((p) => {
      if (p.total > 0) setPhoneticPct(Math.round((p.completed / p.total) * 100));
    });
    getGrammarProgress().then((p) => {
      if (p.total > 0) setGrammarPct(Math.round((p.completed / p.total) * 100));
    });
  }, []);

  const systemWithProgress = SYSTEM_COURSES.map((c) => {
    if (c.href === '/phonetics' && phoneticPct !== undefined) return { ...c, progress: phoneticPct };
    if (c.href === '/grammar' && grammarPct !== undefined) return { ...c, progress: grammarPct };
    return c;
  });

  return (
    <div>
      <PageHeader
        eyebrow="학습 · LEARN"
        title="学习"
        subtitle="3 大系统课程 + 8 个练习工具，按你的节奏来。"
        tone="pink"
      />

      {/* 上半 · 系统课程 */}
      <Section title="系统课程" spacing="normal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {systemWithProgress.map((entry) => (
            <Card
              key={entry.label}
              as="button"
              onClick={() => router.push(entry.href)}
              variant="default"
              padding="md"
              interactive
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 56, height: 56, borderRadius: 'var(--radius-md)',
                    background: TONE_BG[entry.tone], color: TONE_FG[entry.tone],
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                  aria-hidden
                >
                  <entry.Icon size={24} strokeWidth={1.75} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>
                    {entry.label}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '4px 0 0', lineHeight: 1.6 }}>
                    {entry.desc}
                  </p>
                  {entry.progress !== undefined && (
                    <div style={{ marginTop: 10, height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--color-surface-4)', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%', borderRadius: 'var(--radius-pill)',
                          background: `linear-gradient(90deg, ${TONE_FG[entry.tone]}, var(--color-pink-base))`,
                          width: `${entry.progress}%`,
                          transition: 'width var(--dur-slow) var(--ease-soft)',
                        }}
                      />
                    </div>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 12, fontWeight: 800,
                    color: TONE_FG[entry.tone],
                    background: TONE_BG[entry.tone],
                    padding: '6px 14px', borderRadius: 'var(--radius-pill)',
                    flexShrink: 0, whiteSpace: 'nowrap',
                  }}
                >
                  {entry.progress !== undefined ? `${entry.progress}%` : '开始'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 下半 · 工具箱 4×2 */}
      <Section title="工具箱" spacing="normal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {TOOLBOX.map((entry) => (
            <Card
              key={entry.label}
              as="button"
              onClick={() => router.push(entry.href)}
              variant="default"
              padding="md"
              interactive
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
                <div
                  style={{
                    width: 44, height: 44, borderRadius: 'var(--radius-md)',
                    background: TONE_BG[entry.tone], color: TONE_FG[entry.tone],
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  aria-hidden
                >
                  <entry.Icon size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                    {entry.label}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '4px 0 0', lineHeight: 1.5 }}>
                    {entry.desc}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
