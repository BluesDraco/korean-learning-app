'use client';

import { useState, useEffect } from 'react';
import {
  Music2, GraduationCap, BookOpen,
  Mic, Headphones, PenLine, Edit3,
  FileText, MessageCircle, Keyboard, Sparkles,
} from 'lucide-react';
import { PageHeader, Section, EntryCard } from '@/components/ui';
import { DesktopLearningPage } from '@/components/desktop/DesktopLearningPage';
import { getPhoneticProgress, getGrammarProgress } from '@/lib/progress/dailyHero';

interface LearningEntry {
  label: string;
  desc: string;
  href: string;
  progress?: number;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  tone: 'pink' | 'mint' | 'peach' | 'purple';
}

// 上半 · 系统课程（3 张大 hero 卡）
const SYSTEM_COURSES: LearningEntry[] = [
  { label: '韩文字母入门', desc: '从 40 音开始，听标准发音，再学习音节拼装。', href: '/phonetics', Icon: Music2,        tone: 'purple' },
  { label: '语法入门',     desc: '14 个语法点，跟着兔莉一步步把句子的骨架理清。', href: '/grammar',   Icon: BookOpen,      tone: 'pink' },
  { label: 'TOPIK 备考',   desc: '按题型整理词汇、阅读和写作练习路线。',           href: '/topik',     Icon: GraduationCap, tone: 'mint' },
];

// 下半 · 工具箱（4×2 = 8 个）
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

export default function LearningPage() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [phoneticPct, setPhoneticPct] = useState<number | undefined>(undefined);
  const [grammarPct, setGrammarPct] = useState<number | undefined>(undefined);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    getPhoneticProgress().then((p) => {
      if (p.total > 0) setPhoneticPct(Math.round((p.completed / p.total) * 100));
    });
    getGrammarProgress().then((p) => {
      if (p.total > 0) setGrammarPct(Math.round((p.completed / p.total) * 100));
    });
  }, []);

  if (isDesktop) return <DesktopLearningPage />;

  const systemWithProgress = SYSTEM_COURSES.map((c) => {
    if (c.href === '/phonetics' && phoneticPct !== undefined) return { ...c, progress: phoneticPct };
    if (c.href === '/grammar' && grammarPct !== undefined) return { ...c, progress: grammarPct };
    return c;
  });

  return (
    <div className="py-4 max-w-2xl mx-auto pb-24">
      <PageHeader
        eyebrow="학습"
        title="学习"
        subtitle="字母、语法、TOPIK — 按入门顺序一步步来。"
        tone="pink"
      />

      {/* 上半 · 入门顺序 */}
      <Section title="入门顺序" spacing="normal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {systemWithProgress.map((entry) => (
            <EntryCard
              key={entry.label}
              icon={<entry.Icon size={20} strokeWidth={1.75} />}
              label={entry.label}
              detail={entry.desc}
              tone={entry.tone}
              layout="row"
              href={entry.href}
              cta={entry.progress !== undefined ? `${entry.progress}%` : '开始'}
              progress={entry.progress}
            />
          ))}
        </div>
      </Section>

      {/* 下半 · 工具箱 4×2 */}
      <Section title="工具箱" spacing="normal">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {TOOLBOX.map((entry) => (
            <EntryCard
              key={entry.label}
              icon={<entry.Icon size={18} strokeWidth={1.75} />}
              label={entry.label}
              detail={entry.desc}
              tone={entry.tone}
              layout="block"
              href={entry.href}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
