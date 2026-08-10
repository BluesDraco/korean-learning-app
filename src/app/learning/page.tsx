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

const entries: LearningEntry[] = [
  {
    label: '韩文字母入门',
    desc: '从 40 音开始，听标准发音，再学习音节拼装。',
    href: '/phonetics',
    available: true,
    progress: 58,
    icon: '音',
    color: '#b49ccf',
  },
  {
    label: '30 天入门模板',
    desc: '适合第一次开始自学韩语的人，每天一个小任务。',
    available: false,
    icon: '课',
    color: '#e47a94',
  },
  {
    label: 'TOPIK 备考模板',
    desc: '按题型整理词汇、阅读和写作练习路线。',
    href: '/topik',
    available: true,
    icon: '考',
    color: '#b49ccf',
  },
  {
    label: '发音跟读',
    desc: '录音对比标准发音，练习韩语语调和单音。',
    href: '/pronunciation',
    available: true,
    icon: '音',
    color: '#e47a94',
  },
  {
    label: '听写练习',
    desc: '听韩语单词和句子，用打字或手写完成听写。',
    href: '/dictation',
    available: true,
    icon: '听',
    color: '#e8a87c',
  },
  {
    label: '写作练习',
    desc: '用韩语写句子，AI 给出参考例句对照。',
    href: '/writing',
    available: true,
    icon: '写',
    color: '#81b5a1',
  },
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
            <p className="mt-1.5 text-[13px] text-[#8b766e] leading-snug">{entry.desc}</p>
            {entry.available && entry.progress !== undefined && (
              <div className="mt-3.5 h-[9px] rounded-full bg-[#f6ece7] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#aee3d8] to-[#ff7fa8]" style={{ width: `${entry.progress}%` }} />
              </div>
            )}
          </div>
        );

        if (entry.available && entry.href) {
          return (
            <Link key={entry.label} href={entry.href} className="block active:scale-[0.98] transition-transform">
              {inner}
            </Link>
          );
        }

        return (
          <button
            key={entry.label}
            onClick={() => openModal(entry)}
            className="block w-full text-left active:scale-[0.98] transition-transform"
          >
            {inner}
          </button>
        );
      })}

      {/* Coming Soon Modal */}
      {modalOpen && modalEntry && (
        <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }} onClick={() => setModalOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative bg-white rounded-t-[28px] sm:rounded-[28px] w-full sm:max-w-sm p-6 pb-[calc(24px+env(safe-area-inset-bottom,0px))] sm:pb-6 space-y-5 animate-slide-up shadow-[0_-8px_40px_rgba(0,0,0,0.12)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="w-10 h-1 rounded-full bg-[#e0d8cf] mx-auto sm:hidden" />

            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto" style={{ backgroundColor: `${modalEntry.color}18` }}>
                <span className="text-[22px] font-extrabold" style={{ color: modalEntry.color }}>{modalEntry.icon}</span>
              </div>
              <div>
                <p className="text-[17px] font-bold text-[#2f2a26]">{modalEntry.label}</p>
                <p className="text-[13px] text-[#e47a94] font-medium mt-1">正式版上线后推出</p>
              </div>
            </div>

            <div className="bg-[#fdfaf5] rounded-2xl p-4 text-center space-y-2">
              <p className="text-[13px] text-[#2f2a26] leading-relaxed">
                这个学习路线会在正式版上线后开放。
              </p>
              <p className="text-[12px] text-[#8c8177] leading-relaxed">
                内测阶段你可以先去词汇模块，按级别和场景学习常用韩语单词。
              </p>
              <p className="text-[12px] text-[#8c8177] leading-relaxed">
                正式版中，这里会提供更完整的自学路径和每日学习任务。
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setModalOpen(false)}
                className="w-full py-3 bg-[#e47a94] text-white rounded-2xl text-[14px] font-bold active:scale-95 transition-transform"
              >
                我知道了
              </button>
              <div className="flex gap-2">
                <Link
                  href="/vocabulary"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1 py-2.5 border border-[#efe4d8] text-[#2f2a26] rounded-2xl text-[13px] font-medium active:scale-95 transition-transform"
                >
                  先去词汇模块
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f5f0ea] flex items-center justify-center text-[#8c8177] hover:bg-[#e8e0d5] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
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
