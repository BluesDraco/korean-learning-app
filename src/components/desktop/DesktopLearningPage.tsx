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

const ENTRIES: LearningEntry[] = [
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
            <div style={{ background: '#fdfaf5', borderRadius: 16, padding: '14px 16px', marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: '#2f2a26', lineHeight: 1.6, textAlign: 'center' }}>
                这个学习路线会在正式版上线后开放。内测阶段你可以先去词汇模块，按级别和场景学习常用韩语单词。
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => { setModalEntry(null); router.push('/vocabulary'); }}
                style={{ flex: 1, padding: '10px 0', borderRadius: 14, border: '1px solid #efe4d8', background: '#fff', color: '#2f2a26', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                先去词汇模块
              </button>
            </div>
            <button
              onClick={() => setModalEntry(null)}
              style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: 999, background: '#f5f0ea', border: 'none', cursor: 'pointer', fontSize: 16, color: '#8c8177', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ×
            </button>
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
