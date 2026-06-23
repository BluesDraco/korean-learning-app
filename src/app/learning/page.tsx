'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Music2, Calendar, GraduationCap, Mic, Headphones, PenLine, Edit3 } from 'lucide-react';
import { PageHeader, Section, Button, Sheet, EntryCard } from '@/components/ui';
import { DesktopLearningPage } from '@/components/desktop/DesktopLearningPage';

interface LearningEntry {
  label: string;
  desc: string;
  href?: string;
  available: boolean;
  progress?: number;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  tone: 'pink' | 'mint' | 'peach' | 'purple';
}

const ENTRIES: LearningEntry[] = [
  { label: '韩文字母入门', desc: '从 40 音开始，听标准发音，再学习音节拼装。',                href: '/phonetics',     available: true,  progress: 58, Icon: Music2,        tone: 'purple' },
  { label: '30 天入门模板', desc: '适合第一次开始自学韩语的人，每天一个小任务。',                                       available: false,             Icon: Calendar,      tone: 'pink' },
  { label: 'TOPIK 备考模板', desc: '按题型整理词汇、阅读和写作练习路线。',              href: '/topik',         available: true,              Icon: GraduationCap, tone: 'purple' },
  { label: '发音跟读',      desc: '录音对比标准发音，练习韩语语调和单音。',              href: '/pronunciation', available: true,              Icon: Mic,           tone: 'pink' },
  { label: '听说练习',      desc: '看中文意思，用韩语说出来。语音识别自动判断准确度。',  href: '/listening',     available: true,              Icon: Headphones,    tone: 'peach' },
  { label: '默写练习',      desc: '看中文意思，用韩文默写出来，精准训练拼写能力。',      href: '/dictation',     available: true,              Icon: Edit3,         tone: 'mint' },
  { label: '写作练习',      desc: '用韩语写句子，AI 给出参考例句对照。',                href: '/writing',       available: true,              Icon: PenLine,       tone: 'mint' },
];

const TONE_BG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-soft)', mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)', purple: 'var(--color-purple-soft)',
};
const TONE_FG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-strong)', mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)', purple: 'var(--color-purple-strong)',
};

export default function LearningPage() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [modalEntry, setModalEntry] = useState<LearningEntry | null>(null);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isDesktop) return <DesktopLearningPage />;

  return (
    <div className="py-4 max-w-2xl mx-auto">
      <PageHeader
        eyebrow="학습"
        title="学习路线"
        subtitle="入口保留，完整模板将在正式版上线后陆续推出。"
        tone="pink"
      />

      <Section spacing="normal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ENTRIES.map((entry) => (
            <EntryCard
              key={entry.label}
              icon={<entry.Icon size={20} strokeWidth={1.75} />}
              label={entry.label}
              detail={entry.desc}
              tone={entry.tone}
              layout="row"
              href={entry.available && entry.href ? entry.href : undefined}
              onClick={entry.available && entry.href ? undefined : () => setModalEntry(entry)}
              cta={entry.available ? '可体验' : '即将推出'}
              progress={entry.available ? entry.progress : undefined}
            />
          ))}
        </div>
      </Section>

      <Sheet open={!!modalEntry} onClose={() => setModalEntry(null)}>
        {modalEntry && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div
                style={{
                  width: 56, height: 56, borderRadius: 'var(--radius-lg)',
                  background: TONE_BG[modalEntry.tone], color: TONE_FG[modalEntry.tone],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px',
                }}
                aria-hidden
              >
                <modalEntry.Icon size={26} strokeWidth={1.75} />
              </div>
              <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>
                {modalEntry.label}
              </p>
              <p style={{ fontSize: 13, color: 'var(--color-pink-strong)', fontWeight: 600, margin: '4px 0 0' }}>
                正式版上线后推出
              </p>
            </div>

            <div
              style={{
                background: 'var(--color-surface-3)', borderRadius: 'var(--radius-md)',
                padding: 16, marginBottom: 16, textAlign: 'center',
              }}
            >
              <p style={{ fontSize: 13, color: 'var(--color-ink-1)', margin: '0 0 6px', lineHeight: 1.6 }}>
                这个学习路线会在正式版上线后开放。
              </p>
              <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '0 0 4px', lineHeight: 1.6 }}>
                内测阶段你可以先去词汇模块，按级别和场景学习常用韩语单词。
              </p>
              <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: 0, lineHeight: 1.6 }}>
                正式版中，这里会提供更完整的自学路径和每日学习任务。
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button variant="primary" tone="pink" fullWidth onClick={() => setModalEntry(null)}>
                我知道了
              </Button>
              <Link href="/vocabulary" onClick={() => setModalEntry(null)} style={{ textDecoration: 'none' }}>
                <Button variant="secondary" fullWidth icon={<ArrowRight size={14} />}>
                  先去词汇模块
                </Button>
              </Link>
            </div>
          </>
        )}
      </Sheet>
    </div>
  );
}
