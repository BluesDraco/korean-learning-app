'use client'

import { useState, useEffect } from 'react';
import {
  Music2, GraduationCap, BookOpen,
  FileText, Compass, Sparkles,
} from 'lucide-react';
import { Section, EntryCard } from '@/components/ui';
import { DesktopLearningPage } from '@/components/desktop/DesktopLearningPage';
import { getPhoneticProgress, getGrammarProgress } from '@/lib/progress/dailyHero';
import { getProfile } from '@/lib/gamification';
import { useIsDesktop } from '@/lib/useIsMobile';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import './learning-visual.css';

interface LearningEntry {
  labelKey: string;
  descKey: string;
  href: string;
  progress?: number;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  tone: 'pink' | 'mint' | 'peach' | 'purple';
}

// 上半 · 系统课程（3 张大 hero 卡）
const SYSTEM_COURSES: LearningEntry[] = [
  { labelKey: 'learning.course_phonetics', descKey: 'learning.course_phonetics_desc', href: '/phonetics', Icon: Music2,        tone: 'purple' },
  { labelKey: 'learning.course_grammar',   descKey: 'learning.course_grammar_desc',   href: '/grammar',   Icon: BookOpen,      tone: 'pink' },
  { labelKey: 'learning.course_topik',     descKey: 'learning.course_topik_desc',     href: '/topik',     Icon: GraduationCap, tone: 'mint' },
];

// 下半 · 工具箱 · 4 张大 row 卡,视觉与入门顺序一致
const TOOLBOX: LearningEntry[] = [
  { labelKey: 'learning.tool_reading',  descKey: 'learning.tool_reading_desc',  href: '/reading',          Icon: FileText,      tone: 'peach' },
  { labelKey: 'learning.tool_scene',    descKey: 'learning.tool_scene_desc',    href: '/animal-city.html', Icon: Compass,       tone: 'mint' },
  { labelKey: 'learning.tool_analyze',  descKey: 'learning.tool_analyze_desc',  href: '/ai/analyze',       Icon: Sparkles,      tone: 'purple' },
  { labelKey: 'learning.tool_practice', descKey: 'learning.tool_practice_desc', href: '/practice',         Icon: GraduationCap, tone: 'pink' },
];

export default function LearningPage() {
  const isDesktop = useIsDesktop();
  const { lang } = useLang();
  const { user } = useAuth();
  const [phoneticPct, setPhoneticPct] = useState<number | undefined>(undefined);
  const [grammarPct, setGrammarPct] = useState<number | undefined>(undefined);
  const [streak, setStreak] = useState<number | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    getPhoneticProgress(user?.id).then((p) => {
      if (!cancelled && p.total > 0) setPhoneticPct(Math.round((p.completed / p.total) * 100));
    });
    getGrammarProgress(user?.id).then((p) => {
      if (!cancelled && p.total > 0) setGrammarPct(Math.round((p.completed / p.total) * 100));
    });
    getProfile().then((p) => {
      if (!cancelled) setStreak(p.streak);
    });
    return () => { cancelled = true; };
  }, [user?.id]);

  if (isDesktop) return <DesktopLearningPage />;

  const systemWithProgress = SYSTEM_COURSES.map((c) => {
    if (c.href === '/phonetics' && phoneticPct !== undefined) return { ...c, progress: phoneticPct };
    if (c.href === '/grammar' && grammarPct !== undefined) return { ...c, progress: grammarPct };
    return c;
  });

  return (
    <div className="learn-visual-root py-4 max-w-2xl md:max-w-none mx-auto pb-24">
      {/* 头部对齐桌面端:Tori 학습 学习入口 横向品牌栏 + 分割线 */}
      <header className="learn-head learn-enter" style={{ '--i': 0 } as React.CSSProperties}>
        <div className="learn-brand">
          <span className="learn-brand-mark">Tori</span>
          <span className="learn-brand-kr">학습</span>
          <span className="learn-brand-sub">{t('learning.brand_sub', lang)}</span>
        </div>
        {streak !== undefined && streak > 0 && (
          <span className="learn-head-status">
            <span className="learn-status-dot" aria-hidden />
            {t('learning.streak', lang, { n: streak })}
          </span>
        )}
      </header>

      {/* 上半 · 入门顺序 */}
      <Section title={t('learning.section_courses', lang)} subtitle={t('learning.section_courses_note', lang)} spacing="normal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {systemWithProgress.map((entry, i) => (
            <div key={entry.labelKey} className="learn-enter" style={{ '--i': i + 1 } as React.CSSProperties}>
              <EntryCard
                icon={<entry.Icon size={20} strokeWidth={1.75} />}
                label={t(entry.labelKey, lang)}
                detail={t(entry.descKey, lang)}
                tone={entry.tone}
                layout="row"
                href={entry.href}
                cta={entry.progress !== undefined ? `${entry.progress}%` : t('common.start', lang)}
                progress={entry.progress}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* 下半 · 工具箱 · 与入门顺序同款 row 卡 */}
      <Section title={t('learning.section_toolbox', lang)} subtitle={t('learning.section_toolbox_note', lang)} spacing="normal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {TOOLBOX.map((entry, i) => (
            <div key={entry.labelKey} className="learn-enter" style={{ '--i': i + 4 } as React.CSSProperties}>
              <EntryCard
                icon={<entry.Icon size={20} strokeWidth={1.75} />}
                label={t(entry.labelKey, lang)}
                detail={t(entry.descKey, lang)}
                tone={entry.tone}
                layout="row"
                href={entry.href}
                cta={t('learning.enter', lang)}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
