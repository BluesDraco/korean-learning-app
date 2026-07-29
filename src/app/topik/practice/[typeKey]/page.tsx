'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { ArrowLeft, Sparkles, Target, BookOpen, Trophy, Calendar } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { loadTopikQuestionIndex, type TopikQuestionIndexItem } from '@/lib/dataLoader';
import { questionTypeMap } from '@/data/topikQuestionTypes';
import { db } from '@/lib/db';
import type { TopikTypeMastery } from '@/types';
import { saveProgress, TTL_EXAM } from '@/lib/progress-storage';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '../../topik-redesign.css';
import '../../tk-side-rail.css';

type Count = 10 | 20 | 'all';

export default function TopikPracticeTypePage() {
  const { typeKey } = useParams<{ typeKey: string }>();
  const router = useRouter();
  const smartBack = useSmartBack('/topik');
  const { lang } = useLang();

  const { user } = useAuth();
  const meta = typeKey ? questionTypeMap[typeKey] : undefined;
  const [index, setIndex] = useState<TopikQuestionIndexItem[]>([]);
  const [mastery, setMastery] = useState<TopikTypeMastery | null>(null);
  const [count, setCount] = useState<Count>(10);

  useEffect(() => {
    loadTopikQuestionIndex().then(setIndex).catch(e => console.error('[topik] practice failed to load question index:', e));
    if (!typeKey || !user?.id) return;
    db.topikTypeMastery.filter((m: TopikTypeMastery) => m.userId === user.id && m.questionType === typeKey)
      .then((items: TopikTypeMastery[]) => setMastery(items[0] || null))
      .catch(e => console.error('[topik] practice failed to load mastery:', e));
  }, [typeKey, user?.id]);

  const pool = useMemo(() => index.filter(q => q.questionType === typeKey), [index, typeKey]);
  const totalInPool = pool.length;
  const rate = mastery && mastery.attempts > 0 ? mastery.correct / mastery.attempts : -1;
  const mastered = mastery && mastery.attempts >= 5 && rate >= 0.9;

  if (!meta) {
    return (
      <div className="tk-scope">
        <div className="tk-fullpage-msg">
          <p className="title">{t('topik.pt_not_found', lang)}</p>
          <button className="tk-start-exam-btn" style={{ maxWidth: 220 }} onClick={() => router.replace('/topik')}>{t('topik.back_topik', lang)}</button>
        </div>
      </div>
    );
  }

  const Icon = ((LucideIcons as unknown) as Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>>)[meta.iconName] || LucideIcons.Circle;
  const iconCls = meta.section === 'listening' ? 'listening' : 'reading';

  function start() {
    if (pool.length === 0) return;
    const want = count === 'all' ? pool.length : Math.min(count, pool.length);
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const ids = shuffled.slice(0, want).map(q => q.id);
    const sessionId = crypto.randomUUID();
    saveProgress(`topik-exam-${sessionId}`, {
      sectionId: `type-${typeKey}`,
      questionIds: ids,
      mode: 'practice',
      timeLeft: -1,
      idx: 0,
      answers: [],
      startedAt: Date.now(),
    }, TTL_EXAM);
    router.push(`/topik/exam/${sessionId}`);
  }

  function timeSince(ts: number): string {
    if (!ts) return t('topik.time_never', lang);
    const diff = Date.now() - ts;
    const day = 86400000;
    if (diff < day) return t('topik.time_today', lang);
    if (diff < day * 2) return t('topik.time_yesterday', lang);
    if (diff < day * 30) return t('topik.time_days_ago', lang, { n: Math.floor(diff / day) });
    return t('topik.time_months_ago', lang, { n: Math.floor(diff / (day * 30)) });
  }

  return (
    <div className="tk-scope">
      <div className="tsr-layout">
      <div className="tsr-col">
      <div className="hr-stage" style={{ maxWidth: 720, margin: '0 auto' }}>

        <div className="hr-mobile-back">
          <button className="hr-mobile-back-btn" onClick={smartBack} aria-label={t('topik.back', lang)}>
            <ArrowLeft size={14} /> {t('topik.back', lang)}
          </button>
        </div>

        <header className="hr-page-head">
          <div className="hr-brand">
            <div className="hr-brand-mark">Tori</div>
            <div className="hr-brand-kr">유형</div>
            <div className="hr-brand-sub">{lang === 'en' ? meta.labelZhEn ?? meta.labelZh : meta.labelZh}</div>
          </div>
          {mastered ? (
            <span className="tk-mastered-badge"><Trophy size={11} /> {t('topik.mastery_mastered', lang)}</span>
          ) : (
            <div className="hr-brand-sub" data-md-show>{meta.labelKo} · {lang === 'en' ? meta.officialNoEn ?? meta.officialNo : meta.officialNo}</div>
          )}
        </header>

        <div className="tk-card">
          <div className="tk-type-hero">
            <span className={`tk-type-hero-icon ${iconCls}`}>
              <Icon size={22} strokeWidth={2.2} />
            </span>
            <div className="tk-type-hero-info">
              <div className="tk-type-hero-eyebrow"><BookOpen size={11} /> {t('topik.pt_type_desc', lang)}</div>
              <p className="tk-type-hero-desc">{lang === 'en' ? meta.descEn ?? meta.desc : meta.desc}</p>
            </div>
          </div>
          <div className="tk-type-tip">
            <Sparkles size={14} className="icon" />
            <div className="body">
              <div className="label">{t('topik.pt_strategy', lang)}</div>
              <div className="text">{lang === 'en' ? meta.tipEn ?? meta.tip : meta.tip}</div>
            </div>
          </div>
        </div>

        <div className="tk-card">
          <div className="tk-card-head">
            <p className="tk-card-title">{t('topik.pt_study_data', lang)}</p>
          </div>
          <div className="tk-stats4">
            <div>
              <div className="tk-stat4-num">{totalInPool}</div>
              <div className="tk-stat4-label">{t('topik.pt_pool_size', lang)}</div>
            </div>
            <div>
              <div className="tk-stat4-num">{mastery?.attempts || 0}</div>
              <div className="tk-stat4-label">{t('topik.pt_practiced', lang)}</div>
            </div>
            <div>
              <div className={`tk-stat4-num${rate >= 0 && rate >= 0.7 ? ' mint' : ''}`}>
                {rate < 0 ? '—' : `${Math.round(rate * 100)}%`}
              </div>
              <div className="tk-stat4-label">{t('topik.pt_mastery_rate', lang)}</div>
            </div>
            <div>
              <div className="tk-stat4-num" style={{ fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={13} /> {timeSince(mastery?.lastPracticedAt || 0)}
              </div>
              <div className="tk-stat4-label">{t('topik.pt_last', lang)}</div>
            </div>
          </div>
        </div>

        <div className="tk-card">
          <div className="tk-card-head">
            <p className="tk-card-title">{t('topik.pt_choose_count', lang)}</p>
          </div>
          <div className="tk-count-grid">
            {([10, 20, 'all'] as const).map(v => {
              const label = v === 'all' ? t('topik.pt_count_all', lang, { total: totalInPool }) : t('topik.pt_count_n', lang, { n: v });
              const active = count === v;
              const disabled = v !== 'all' && totalInPool < v;
              return (
                <button
                  key={String(v)}
                  onClick={() => !disabled && setCount(v)}
                  disabled={disabled}
                  className={`tk-count-btn${active ? ' active' : ''}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="tk-callout warn" style={{ background: 'var(--hr-pink-soft)', borderColor: '#ffd0e0' }}>
          <Target size={16} className="tk-callout-icon" style={{ color: 'var(--hr-pink-strong)' }} />
          <div className="tk-callout-body">
            <p className="tk-callout-desc">{t('topik.pt_practice_note', lang)}</p>
          </div>
        </div>

        <button className="tk-start-exam-btn" onClick={start} disabled={totalInPool === 0}>
          {totalInPool === 0 ? t('topik.pt_no_pool', lang) : t('topik.pt_start_n', lang, { n: count === 'all' ? totalInPool : Math.min(count as number, totalInPool) })}
        </button>

      </div>
      </div>{/* /tsr-col */}

      {/* ── 桌面专属右栏（题型速览 + 解题策略） ── */}
      <aside className="tsr-rail" aria-label={t('topik.pt_rail_overview', lang)}>
        <div className="tsr-card">
          <div className="tsr-card-title"><Target size={13} className="tsr-ico" /> {t('topik.pt_rail_overview', lang)}</div>
          <div className="tsr-stat"><span>{t('topik.pt_rail_section', lang)}</span><b>{meta.section === 'listening' ? t('topik.st_rail_listen', lang) : t('topik.st_rail_read', lang)}</b></div>
          <div className="tsr-stat"><span>{t('topik.pt_rail_official_no', lang)}</span><b style={{ fontSize: 13 }}>{lang === 'en' ? meta.officialNoEn ?? meta.officialNo : meta.officialNo}</b></div>
          <div className="tsr-stat"><span>{t('topik.pt_rail_pool', lang)}</span><b>{totalInPool}<span className="tsr-stat-sub">{t('topik.pt_rail_pool_unit', lang)}</span></b></div>
          {mastery && mastery.attempts > 0 && (
            <div className="tsr-stat"><span>{t('topik.pt_mastery_rate', lang)}</span><b>{rate < 0 ? '—' : `${Math.round(rate * 100)}%`}</b></div>
          )}
        </div>

        <div className="tsr-card" style={{ padding: 0, border: 'none', background: 'transparent' }}>
          <div className="tsr-tip">
            <span className="tsr-tip-label">{t('topik.pt_strategy', lang)}</span>
            {lang === 'en' ? meta.tipEn ?? meta.tip : meta.tip}
          </div>
        </div>
      </aside>
      </div>{/* /tsr-layout */}
    </div>
  );
}
