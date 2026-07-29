'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { ArrowLeft, Trophy, AlertCircle } from 'lucide-react';
import { db } from '@/lib/db';
import type { TopikSection } from '@/data/topik-questions';
import { loadTopikSections } from '@/lib/dataLoader';
import type { TopikSession } from '@/types';
import { isSessionPassed } from '@/lib/topik/examRules';
import { questionTypeMap } from '@/data/topikQuestionTypes';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '../topik-redesign.css';

export default function TopikHistoryPage() {
  const { lang } = useLang();
  const router = useRouter();
  const smartBack = useSmartBack('/topik');
  const [sessions, setSessions] = useState<TopikSession[]>([]);
  const [topikSections, setTopikSections] = useState<TopikSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopikSections().then(setTopikSections).catch(e => console.error('[topik] history failed to load sections:', e));
    db.topikSessions.toArray()
      .then(all => {
        const sorted = [...all].sort((a, b) => b.completedAt - a.completedAt);
        setSessions(sorted);
      })
      .catch(e => { console.error('[topik] history failed to load sessions:', e); setSessions([]); })
      .finally(() => setLoading(false));
  }, []);

  function sectionLabel(sectionId: string) {
    if (sectionId === 'mistakes-review') return t('topik.label_mistakes_review', lang);
    if (sectionId === 'sim-free') return t('topik.label_sim_free', lang);
    if (sectionId === 'daily-training') return t('topik.label_daily_training', lang);
    if (sectionId.startsWith('type-')) {
      const key = sectionId.slice(5);
      const meta = questionTypeMap[key];
      return meta ? t('topik.section_type_prefix', lang, { label: lang === 'en' ? meta.labelZhEn ?? meta.labelZh : meta.labelZh }) : sectionId;
    }
    return topikSections.find(s => s.id === sectionId)?.title || sectionId;
  }

  function modeLabel(mode: string) {
    switch (mode) {
      case 'exam': return t('topik.mode_exam', lang);
      case 'simulate': return t('topik.mode_simulate', lang);
      case 'mistakes': return t('topik.mode_mistakes', lang);
      case 'practice': return t('topik.mode_practice', lang);
      default: return t('topik.mode_practice', lang);
    }
  }

  function formatDate(ts: number) {
    const d = new Date(ts);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  }

  function formatDuration(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return t('topik.hi_duration', lang, { m, s: s.toString().padStart(2, '0') });
  }

  // Group by section for mini trend
  const bySection: Record<string, TopikSession[]> = {};
  for (const s of sessions) {
    if (!bySection[s.section]) bySection[s.section] = [];
    bySection[s.section].push(s);
  }
  const trendSection = Object.entries(bySection).sort((a, b) => b[1].length - a[1].length)[0];
  const trendData = trendSection ? trendSection[1].slice(0, 6).reverse() : [];

  return (
    <div className="tk-scope">
      <div className="hr-stage" style={{ maxWidth: 960, margin: '0 auto' }}>

        <div className="hr-mobile-back">
          <button className="hr-mobile-back-btn" onClick={smartBack} aria-label={t('topik.back', lang)}>
            <ArrowLeft size={14} /> {t('topik.back', lang)}
          </button>
        </div>

        <header className="hr-page-head">
          <div className="hr-brand">
            <div className="hr-brand-mark">Tori</div>
            <div className="hr-brand-kr">기록</div>
            <div className="hr-brand-sub">{t('topik.hi_brand_sub', lang)}</div>
          </div>
          <div className="hr-brand-sub" data-md-show>{t('topik.hi_record_count', lang, { n: sessions.length })}</div>
        </header>

        {/* Trend */}
        {trendData.length >= 2 && (() => {
          const maxScore = Math.max(...trendData.map(s => s.score), 1);
          return (
            <div className="tk-card">
              <div className="tk-card-head">
                <p className="tk-card-title">{t('topik.hi_trend', lang, { n: trendData.length })}</p>
                <span className="tk-card-hint">{sectionLabel(trendSection![0])}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 60 }}>
                {trendData.map((s, i) => {
                  const passed = isSessionPassed(s);
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: '100%', borderRadius: '4px 4px 0 0', background: passed ? 'var(--hr-mint-base)' : 'var(--hr-pink-base)', height: `${Math.max((s.score / maxScore) * 48, 4)}px`, transition: 'height 0.4s' }} />
                      <span style={{ fontSize: 10, color: 'var(--hr-ink-3)', fontFamily: 'var(--hr-mono)' }}>{s.score}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {loading ? (
          <div className="tk-fullpage-msg">
            <div className="hint">{t('topik.loading', lang)}</div>
          </div>
        ) : sessions.length === 0 ? (
          <div className="tk-empty">
            <p className="tk-empty-title">{t('topik.hi_empty', lang)}</p>
            <p className="tk-empty-hint">{t('topik.hi_empty_hint', lang)}</p>
            <button className="tk-goto-btn" onClick={smartBack}>{t('topik.go_practice', lang)}</button>
          </div>
        ) : (
          <div className="tk-recent-list">
            {sessions.map(s => {
              const passed = isSessionPassed(s);
              return (
                <button key={s.id} className="tk-recent-item" onClick={() => router.push(`/topik/result/${s.id}`)} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', border: 'none', background: 'transparent', padding: 0 }}>
                  <div className={`tk-recent-score ${passed ? 'pass' : 'fail'}`}>{s.score}</div>
                  <div className="tk-recent-info">
                    <p className="tk-recent-name">
                      {sectionLabel(s.section)}
                      <span style={{ marginLeft: 8, fontFamily: 'var(--hr-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--hr-ink-3)', fontWeight: 700 }}>{modeLabel(s.mode)}</span>
                    </p>
                    <div className="tk-recent-meta">
                      {formatDate(s.completedAt)} · {s.correctCount}/{s.totalCount} · {formatDuration(s.durationSec)}
                    </div>
                  </div>
                  {passed ? <Trophy size={16} color="var(--hr-mint-strong)" /> : <AlertCircle size={16} color="var(--hr-pink-strong)" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
