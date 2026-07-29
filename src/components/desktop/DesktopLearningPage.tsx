'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Music2, GraduationCap, BookOpen,
  FileText, Compass, Sparkles,
} from 'lucide-react';
import { getPhoneticProgress, getGrammarProgress } from '@/lib/progress/dailyHero';
import { getProfile } from '@/lib/gamification';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { FloatingDecorations } from '@/components/FloatingDecorations';
import './desktop-learning-redesign.css';

interface LearningEntry {
  labelKey: string;
  descKey: string;
  href: string;
  progress?: number;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  tone: 'pink' | 'mint' | 'peach' | 'purple';
}

const SYSTEM_COURSES: LearningEntry[] = [
  { labelKey: 'learning.course_phonetics', descKey: 'learning.course_phonetics_desc', href: '/phonetics', Icon: Music2,        tone: 'purple' },
  { labelKey: 'learning.course_grammar',   descKey: 'learning.course_grammar_desc',   href: '/grammar',   Icon: BookOpen,      tone: 'pink' },
  { labelKey: 'learning.course_topik',     descKey: 'learning.course_topik_desc',     href: '/topik',     Icon: GraduationCap, tone: 'mint' },
];

// 工具箱 · 4 张大行卡,视觉与上方入门顺序一致
const TOOLBOX: LearningEntry[] = [
  { labelKey: 'learning.tool_reading',  descKey: 'learning.tool_reading_desc',  href: '/reading',          Icon: FileText,      tone: 'peach' },
  { labelKey: 'learning.tool_scene',    descKey: 'learning.tool_scene_desc',    href: '/animal-city.html', Icon: Compass,       tone: 'mint' },
  { labelKey: 'learning.tool_analyze',  descKey: 'learning.tool_analyze_desc',  href: '/ai/analyze',       Icon: Sparkles,      tone: 'purple' },
  { labelKey: 'learning.tool_practice', descKey: 'learning.tool_practice_desc', href: '/practice',         Icon: GraduationCap, tone: 'pink' },
];

export function DesktopLearningPage() {
  const router = useRouter();
  const { lang } = useLang();
  const { user } = useAuth();
  const [phoneticPct, setPhoneticPct] = useState<number | undefined>(undefined);
  const [grammarPct, setGrammarPct] = useState<number | undefined>(undefined);
  const [streak, setStreak] = useState<number | undefined>(undefined);

  useEffect(() => {
    getPhoneticProgress(user?.id).then((p) => {
      if (p.total > 0) setPhoneticPct(Math.round((p.completed / p.total) * 100));
    });
    getGrammarProgress(user?.id).then((p) => {
      if (p.total > 0) setGrammarPct(Math.round((p.completed / p.total) * 100));
    });
    getProfile().then((p) => setStreak(p.streak));
  }, [user?.id]);

  const systemWithProgress = SYSTEM_COURSES.map((c) => {
    if (c.href === '/phonetics' && phoneticPct !== undefined) return { ...c, progress: phoneticPct };
    if (c.href === '/grammar' && grammarPct !== undefined) return { ...c, progress: grammarPct };
    return c;
  });

  return (
    <div className="dl-scope">
      <FloatingDecorations />
      <div className="dl-stage">
        <header className="dl-head">
          <div className="dl-brand">
            <div className="dl-brand-mark">Tori</div>
            <div className="dl-brand-kr">학습</div>
            <div className="dl-brand-sub">{t('learning.brand_sub', lang)}</div>
          </div>
          {streak !== undefined && streak > 0 ? (
            <span className="dl-status">
              <span className="dl-status-dot" aria-hidden />
              {t('learning.streak_desktop', lang, { n: streak })}
            </span>
          ) : (
            <div className="dl-brand-sub md-only">{t('learning.brand_hint', lang)}</div>
          )}
        </header>

        {/* 上半 · 入门顺序 */}
        <section className="dl-section" style={{ '--i': 0 } as React.CSSProperties}>
          <div className="dl-section-head">
            <div className="dl-section-title">
              <h2><em>{t('learning.section_courses', lang)}</em></h2>
              <span className="dl-section-note">{t('learning.section_courses_note', lang)}</span>
            </div>
            <span className="dl-kr">입문 순서</span>
          </div>
          <div className="dl-sys-list">
            {systemWithProgress.map((entry) => (
              <button key={entry.labelKey} className="dl-sys-card" onClick={() => router.push(entry.href)}>
                <span className={`dl-sys-icon ${entry.tone}`} aria-hidden>
                  <entry.Icon size={26} strokeWidth={1.75} />
                </span>
                <div className="dl-sys-info">
                  <p className="dl-sys-title">{t(entry.labelKey, lang)}</p>
                  <p className="dl-sys-desc">{t(entry.descKey, lang)}</p>
                  {entry.progress !== undefined && (
                    <div className="dl-sys-progress-bar">
                      <div className="dl-sys-progress-fill" style={{ width: `${entry.progress}%` }} />
                    </div>
                  )}
                </div>
                <span className={`dl-sys-cta ${entry.tone}`}>
                  {entry.progress !== undefined ? `${entry.progress}%` : t('common.start', lang)}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 下半 · 工具箱 · 与入门顺序同款 row 卡 */}
        <section className="dl-section" style={{ '--i': 1 } as React.CSSProperties}>
          <div className="dl-section-head">
            <div className="dl-section-title">
              <h2><em>{t('learning.section_toolbox', lang)}</em></h2>
              <span className="dl-section-note">{t('learning.section_toolbox_note', lang)}</span>
            </div>
            <span className="dl-kr">도구 상자</span>
          </div>
          <div className="dl-sys-list">
            {TOOLBOX.map((entry) => (
              <button key={entry.labelKey} className="dl-sys-card" onClick={() => router.push(entry.href)}>
                <span className={`dl-sys-icon ${entry.tone}`} aria-hidden>
                  <entry.Icon size={26} strokeWidth={1.75} />
                </span>
                <div className="dl-sys-info">
                  <p className="dl-sys-title">{t(entry.labelKey, lang)}</p>
                  <p className="dl-sys-desc">{t(entry.descKey, lang)}</p>
                </div>
                <span className={`dl-sys-cta ${entry.tone}`}>{t('learning.enter', lang)}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
