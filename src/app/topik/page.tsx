'use client'

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { ArrowLeft, ChevronRight, Trophy, AlertCircle, PlayCircle, X, FileText, TrendingUp, Award, CalendarDays as CalendarIcon } from 'lucide-react';
import type { TopikSection, TopikExamSet } from '@/data/topik-questions';
import { loadTopikSections, loadTopikExamSets, loadTopikQuestionIndex, type TopikQuestionIndexItem } from '@/lib/dataLoader';
import { db } from '@/lib/db';
import type { TopikSession, TopikMistake, TopikTypeMastery, TopikUserGoal } from '@/types';
import { topikQuestionTypes } from '@/data/topikQuestionTypes';
import * as LucideIcons from 'lucide-react';
import GoalSettingModal, { type GoalDraft } from '@/components/topik/GoalSettingModal';
import SimulateTab from '@/components/topik/SimulateTab';
import { last7DaysActivity, scoreTrend, averageAccuracy, totalQuestionsAnswered, totalMinutes, weakestTypes, computeBadges } from '@/lib/topik/mineStats';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';
import { isSessionPassed, getSortedMockSets } from '@/lib/topik/examRules';
import { saveProgress, TTL_EXAM, listProgressByPrefix, clearProgress } from '@/lib/progress-storage';
import { useToast } from '@/hooks/useToast';
import { Modal, Button } from '@/components/ui';
import { useTheme } from '@/components/ThemeProvider';
import PlaceIntro from '@/components/PlaceIntro';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import './topik-redesign.css';

type Tab = 'exam' | 'simulate' | 'practice' | 'mine';

export default function TopikPage() {
  const { lang } = useLang();
  const router = useRouter();
  const smartBack = useSmartBack('/learning');
  const { showToast } = useToast();
  const { theme } = useTheme();
  const [discardTarget, setDiscardTarget] = useState<string | null>(null);
  const [tab, setTabState] = useState<Tab>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('tab');
      if (p === 'exam' || p === 'simulate' || p === 'practice' || p === 'mine') return p;
    }
    return 'simulate';
  });
  const setTab = (t: Tab) => {
    setTabState(t);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', t);
    window.history.replaceState(null, '', url.toString());
  };
  const [mistakeCount, setMistakeCount] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [recentSessions, setRecentSessions] = useState<TopikSession[]>([]);
  const [allSessions, setAllSessions] = useState<TopikSession[]>([]);
  const [sessionsLoaded, setSessionsLoaded] = useState(false);
  const [userGoal, setUserGoal] = useState<TopikUserGoal | null>(null);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const { user } = useAuth();
  const [practiceLevel, setPracticeLevel] = useState<'all' | 'beginner' | 'intermediate'>('all');
  const [practiceSection, setPracticeSection] = useState<'all' | 'listening' | 'reading'>('all');
  const [topikSections, setTopikSections] = useState<TopikSection[]>([]);
  const [topikExamSets, setTopikExamSets] = useState<TopikExamSet[]>([]);
  const [questionIndex, setQuestionIndex] = useState<TopikQuestionIndexItem[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [typeMastery, setTypeMastery] = useState<Map<string, TopikTypeMastery>>(new Map());
  const [practiceSort, setPracticeSort] = useState<'weakest' | 'recent' | 'default'>('weakest');
  const [resumables, setResumables] = useState<Array<{
    sessionId: string;
    label: string;
    progress: string;  // 例如 "45/70"
    updatedAt: number;
  }>>([]);

  useEffect(() => {
    Promise.all([loadTopikSections(), loadTopikExamSets(), loadTopikQuestionIndex()]).then(([secs, sets, idx]) => {
      setTopikSections(secs);
      setTopikExamSets(sets);
      setQuestionIndex(idx);
    }).catch(e => console.error('[topik] failed to load sections/sets/index:', e))
      .finally(() => setDataLoaded(true));
    db.topikMistakes.filter((m: TopikMistake) => m.mastered === 0).then(items => setMistakeCount(items.length)).catch(e => console.error('[topik] failed to load mistakes:', e));
    db.topikTypeMastery.toArray().then((items: TopikTypeMastery[]) => {
      const m = new Map<string, TopikTypeMastery>();
      for (const it of items) m.set(it.questionType, it);
      setTypeMastery(m);
    }).catch(e => console.error('[topik] failed to load type mastery:', e));
    db.topikSessions.toArray().then(sessions => {
      setAllSessions(sessions);
      setTotalSessions(sessions.length);
      const sorted = [...sessions].sort((a, b) => b.completedAt - a.completedAt).slice(0, 3);
      setRecentSessions(sorted);
      setSessionsLoaded(true);
    }).catch(e => { console.error('[topik] failed to load sessions:', e); setSessionsLoaded(true); });
    db.topikUserGoals.toArray().then((items: TopikUserGoal[]) => {
      setUserGoal(items[0] || null);
    }).catch(e => console.error('[topik] failed to load user goals:', e));

    // 扫描未完成的真题/模拟/专项会话
    type ExamProgress = {
      examSetId?: string; level?: 'I'|'II'; examRound?: number;
      listenIds?: string[]; readIds?: string[]; answers?: [string, number][];
      sectionId?: string; questionIds?: string[]; mode?: string;
      startedAt?: number;
    };
    const items = listProgressByPrefix<ExamProgress>('topik-exam-');
    const parsed = items.map(({ key, value, expiresAt }) => {
      const sessionId = key.replace('topik-exam-', '');
      const isReal = Array.isArray(value.listenIds) && Array.isArray(value.readIds);
      const total = isReal
        ? (value.listenIds!.length + value.readIds!.length)
        : (value.questionIds?.length || 0);
      const answered = (value.answers || []).length;
      // 已交卷或未开始都不展示
      if (total === 0 || answered === 0) return null;
      // 找不到对应题目已完全过期时也跳过
      const label = isReal
        ? (value.mode === 'real'
            ? t('topik.exam_round_real', lang, { round: value.examRound ?? '', level: value.level ?? '' })
            : t('topik.exam_round_practice', lang, { round: value.examRound ?? '', level: value.level ?? '' }))
        : value.mode === 'mistakes' ? t('topik.label_mistakes_review', lang)
        : value.sectionId === 'sim-free' ? t('topik.label_sim_free', lang)
        : value.sectionId?.startsWith('type-') ? t('topik.label_type_practice', lang)
        : value.mode === 'simulate' ? t('topik.label_simulate', lang)
        : t('topik.label_type_practice', lang);
      return { sessionId, label, progress: `${answered}/${total}`, updatedAt: expiresAt - TTL_EXAM };
    }).filter(Boolean) as Array<{sessionId:string;label:string;progress:string;updatedAt:number}>;
    parsed.sort((a, b) => b.updatedAt - a.updatedAt);
    setResumables(parsed);
  }, [lang]);

  function discardResumable(sessionId: string) {
    setDiscardTarget(sessionId);
  }
  function confirmDiscard() {
    if (!discardTarget) return;
    clearProgress(`topik-exam-${discardTarget}`);
    setResumables(prev => prev.filter(r => r.sessionId !== discardTarget));
    setDiscardTarget(null);
  }

  // 题型卡片聚合：题型元数据 + 题库题数 + 用户掌握率
  const typeCards = useMemo(() => {
    // 用 questionIndex 数一下每种 questionType 有几题
    const countMap = new Map<string, number>();
    for (const q of questionIndex) {
      countMap.set(q.questionType, (countMap.get(q.questionType) || 0) + 1);
    }
    return topikQuestionTypes
      .filter(meta => {
        if (practiceLevel !== 'all' && meta.level !== practiceLevel) return false;
        if (practiceSection !== 'all' && meta.section !== practiceSection) return false;
        return (countMap.get(meta.key) || 0) > 0;
      })
      .map(meta => {
        const m = typeMastery.get(meta.key);
        const questionCount = countMap.get(meta.key) || 0;
        const attempts = m?.attempts || 0;
        const correct = m?.correct || 0;
        const rate = attempts > 0 ? correct / attempts : -1;   // -1 表示未练习
        const mastered = attempts >= 5 && rate >= 0.9;
        return { meta, questionCount, attempts, correct, rate, mastered, lastPracticedAt: m?.lastPracticedAt || 0 };
      });
  }, [questionIndex, typeMastery, practiceLevel, practiceSection]);

  const sortedTypeCards = useMemo(() => {
    const arr = [...typeCards];
    if (practiceSort === 'weakest') {
      // 弱项优先：未练放中间（rate=-1 排到已练之后但已掌握之前），已掌握放最后
      arr.sort((a, b) => {
        const aScore = a.mastered ? 2 : (a.rate < 0 ? 1 : 0);
        const bScore = b.mastered ? 2 : (b.rate < 0 ? 1 : 0);
        if (aScore !== bScore) return aScore - bScore;
        if (aScore === 0) return a.rate - b.rate;  // 都练过：低正确率优先
        return 0;
      });
    } else if (practiceSort === 'recent') {
      arr.sort((a, b) => b.lastPracticedAt - a.lastPracticedAt);
    }
    return arr;
  }, [typeCards, practiceSort]);

  // 桌面右栏专用：全量题型（不受 practice tab 筛选影响），弱项优先排序
  const railTypeCards = useMemo(() => {
    const countMap = new Map<string, number>();
    for (const q of questionIndex) countMap.set(q.questionType, (countMap.get(q.questionType) || 0) + 1);
    return topikQuestionTypes
      .filter(meta => (countMap.get(meta.key) || 0) > 0)
      .map(meta => {
        const m = typeMastery.get(meta.key);
        const attempts = m?.attempts || 0;
        const correct = m?.correct || 0;
        const rate = attempts > 0 ? correct / attempts : -1;
        return { meta, questionCount: countMap.get(meta.key) || 0, rate, mastered: attempts >= 5 && rate >= 0.9 };
      })
      .sort((a, b) => {
        const as = a.mastered ? 2 : (a.rate < 0 ? 1 : 0);
        const bs = b.mastered ? 2 : (b.rate < 0 ? 1 : 0);
        if (as !== bs) return as - bs;
        if (as === 0) return a.rate - b.rate;
        return 0;
      });
  }, [questionIndex, typeMastery]);

  // 过滤掉所有题目未录入的 exam-set（questionIds 全空）
  const visibleExamSets = useMemo(() => getSortedMockSets(topikExamSets), [topikExamSets]);
  const examYears = useMemo(() => Array.from(new Set(visibleExamSets.map(s => s.year))).sort((a, b) => b - a), [visibleExamSets]);
  const sortedExamSets = visibleExamSets; // 已在 getSortedMockSets 中排序

  function startExamSet(set: TopikExamSet) {
    // 真题入口先进考前说明页，让用户选模式（仿真/练习）
    router.push(`/topik/start/${set.id}`);
  }

  // 我的 tab 的派生统计（不含 streak/goal/today，那些在 simulate tab）
  const mineStats = useMemo(() => {
    const activity = last7DaysActivity(allSessions);
    const trend = scoreTrend(allSessions);
    const avg = averageAccuracy(allSessions);
    const totalQs = totalQuestionsAnswered(allSessions);
    const totalMin = totalMinutes(allSessions);
    const weak = weakestTypes(Array.from(typeMastery.values()), 6);
    const badges = computeBadges(allSessions, Array.from(typeMastery.values()));
    return { activity, trend, avg, totalQs, totalMin, weak, badges };
  }, [allSessions, typeMastery]);

  async function saveGoal(draft: GoalDraft) {
    if (!user?.id) { setGoalModalOpen(false); return; }
    const now = Date.now();
    const existing = userGoal;
    const record: TopikUserGoal = {
      id: existing?.id || `tug-${user.id}`,
      userId: user.id,
      targetDate: draft.targetDate,
      targetLevel: draft.targetLevel,
      dailyQuestionCount: draft.dailyQuestionCount,
      updatedAt: now,
      createdAt: existing?.createdAt || now,
    };
    try {
      await db.topikUserGoals.put(record);
      setUserGoal(record);
    } catch (e) { console.error('[topik] failed to save goal:', e); }
    setGoalModalOpen(false);
  }

  function timeSince(ts: number): string {
    if (!ts) return '';
    const diff = Date.now() - ts;
    const day = 86400000;
    if (diff < day) return t('topik.time_today', lang);
    if (diff < day * 2) return t('topik.time_yesterday', lang);
    if (diff < day * 30) return t('topik.time_days_ago', lang, { n: Math.floor(diff / day) });
    if (diff < day * 365) return t('topik.time_months_ago', lang, { n: Math.floor(diff / (day * 30)) });
    return t('topik.time_years_ago', lang, { n: Math.floor(diff / (day * 365)) });
  }

  function formatDate(ts: number) {
    const d = new Date(ts);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }

  function sectionLabel(section: string) {
    if (section === 'mistakes-review') return t('topik.label_mistakes_review', lang);
    if (section === 'sim-free') return t('topik.label_sim_free', lang);
    if (section === 'daily-training') return t('topik.label_daily_training', lang);
    if (section.startsWith('type-')) {
      const key = section.slice(5);
      const meta = topikQuestionTypes.find(qt => qt.key === key);
      const labelZh = meta ? (lang === 'en' ? meta.labelZhEn ?? meta.labelZh : meta.labelZh) : '';
      return meta ? t('topik.section_type_prefix', lang, { label: labelZh }) : section;
    }
    const s = topikSections.find(x => x.id === section);
    return s ? `${s.title}` : section;
  }

  return (
    <div className="tk-scope">
      <PlaceIntro place="topik" dark={theme === 'dark'} />
      <Modal open={discardTarget !== null} onClose={() => setDiscardTarget(null)} title={t('topik.discard_title', lang)} size="sm">
        <p style={{ fontSize: 14, color: 'var(--color-ink-2)', lineHeight: 1.6, marginBottom: 20 }}>
          {t('topik.discard_body', lang)}
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" fullWidth onClick={() => setDiscardTarget(null)}>{t('topik.cancel', lang)}</Button>
          <Button variant="danger" fullWidth onClick={confirmDiscard}>{t('topik.confirm_discard', lang)}</Button>
        </div>
      </Modal>
      <div className="hr-stage">

        {!dataLoaded ? (
          <div className="tk-fullpage-msg">
            <div className="hint">{t('topik.loading', lang)}</div>
          </div>
        ) : (<>
        <div className="hr-mobile-back">
          <button className="hr-mobile-back-btn" onClick={smartBack} aria-label={t('topik.back', lang)}>
            <ArrowLeft size={14} /> {t('topik.back', lang)}
          </button>
        </div>

        <header className="hr-page-head">
          <div className="hr-brand">
            <div className="hr-brand-mark">Tori</div>
            <div className="hr-brand-kr">시험</div>
            <div className="hr-brand-sub">{t('topik.brand_sub', lang)}</div>
          </div>
          <div className="hr-brand-sub" data-md-show>{t('topik.brand_tagline', lang)}</div>
        </header>

      {/* 未完成会话恢复入口 */}
      {resumables.length > 0 && (
        <div className="tk-resume-list">
          {resumables.map(r => (
            <div key={r.sessionId} className="tk-resume-item">
              <PlayCircle size={20} className="tk-resume-icon" />
              <div className="tk-resume-body">
                <p className="tk-resume-title">{t('topik.resume_prefix', lang)} · {r.label}</p>
                <div className="tk-resume-meta">{t('topik.resume_answered', lang, { progress: r.progress })}</div>
              </div>
              <button className="tk-resume-btn" onClick={() => router.push(`/topik/exam/${r.sessionId}`)}>{t('topik.resume_continue', lang)}</button>
              <button className="tk-resume-close" onClick={() => discardResumable(r.sessionId)} aria-label={t('topik.resume_discard', lang)}>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <nav className="hr-main-tabs">
        {([
          ['simulate', t('topik.tab_simulate', lang), '모의 연습'],
          ['exam', t('topik.tab_exam', lang), '기출 시험'],
          ['practice', t('topik.tab_practice', lang), '유형 훈련'],
          ['mine', t('topik.tab_mine', lang), '나의 학습'],
        ] as [Tab, string, string][]).map(([key, label, kr]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`hr-main-tab${tab === key ? ' active' : ''}`}
          >
            {label}
            <span className="hr-kr">{kr}</span>
          </button>
        ))}
      </nav>

      <div className="tk-hub-layout">
      <div className="tk-hub-col">
      <div key={tab} className="tk-screen">

        {/* ── 自出试卷 ── */}
        {tab === 'exam' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {examYears.map(year => {
              const yearSets = sortedExamSets.filter(s => s.year === year);
              const levelI = yearSets.filter(s => s.level === 'I');
              const levelII = yearSets.filter(s => s.level === 'II');
              return (
              <div key={year}>
                <p style={{ fontSize: 13, fontWeight: 900, color: 'var(--color-ink-1)', marginBottom: 8 }}>{t('topik.year_suffix', lang, { year })}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {levelI.length > 0 && (
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-ink-3)', marginBottom: 6, paddingLeft: 2 }}>{t('topik.level_I_band', lang)}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {levelI.map(set => (
                          <div key={set.id} style={{ background: 'var(--color-surface-2)', borderRadius: 14, border: '1px solid var(--color-border-1)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, opacity: set.available ? 1 : 0.55 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--color-mint-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <FileText size={20} strokeWidth={2.2} color="var(--color-mint-strong)" />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>{set.displayName || t('topik.exam_set_default', lang, { round: set.round ?? '', level: set.level ?? '' })}</p>
                              <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
                                {t('topik.exam_I_composition', lang)}
                              </p>
                            </div>
                            {set.available ? (
                              <button onClick={() => startExamSet(set)} style={{ padding: '6px 14px', borderRadius: 10, background: 'var(--color-ink-1)', color: '#fff', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                                {t('topik.start', lang)}
                              </button>
                            ) : (
                              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: 'var(--color-surface-4)', color: 'var(--color-ink-3)' }}>{t('topik.coming_soon', lang)}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {levelII.length > 0 && (
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-ink-3)', marginBottom: 6, paddingLeft: 2 }}>{t('topik.level_II_band', lang)}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {levelII.map(set => (
                          <div key={set.id} style={{ background: 'var(--color-surface-2)', borderRadius: 14, border: '1px solid var(--color-border-1)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, opacity: set.available ? 1 : 0.55 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--color-pink-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <FileText size={20} strokeWidth={2.2} color="var(--color-pink-strong)" />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>{set.displayName || t('topik.exam_set_default', lang, { round: set.round ?? '', level: set.level ?? '' })}</p>
                              <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
                                {t('topik.exam_II_composition', lang)}
                              </p>
                            </div>
                            {set.available ? (
                              <button onClick={() => startExamSet(set)} style={{ padding: '6px 14px', borderRadius: 10, background: 'var(--color-ink-1)', color: '#fff', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                                {t('topik.start', lang)}
                              </button>
                            ) : (
                              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: 'var(--color-surface-4)', color: 'var(--color-ink-3)' }}>{t('topik.coming_soon', lang)}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        )}

        {/* ── 模拟练习 ── */}
        {tab === 'simulate' && (
          <SimulateTab
            allSessions={allSessions}
            sessionsLoaded={sessionsLoaded}
            questionIndex={questionIndex}
            userGoal={userGoal}
            setUserGoal={setUserGoal}
          />
        )}

        {/* ── 专项练习：题型驱动 ── */}
        {tab === 'practice' && (
          <div>
            <div className="tk-filter-block">
              <div className="tk-filter-label">{t('topik.filter_level', lang)}</div>
              <div className="tk-filter-chips">
                {([['all', t('topik.filter_all', lang)], ['beginner', t('topik.filter_topik_I', lang)], ['intermediate', t('topik.filter_topik_II', lang)]] as const).map(([key, label]) => (
                  <button key={key} onClick={() => setPracticeLevel(key)} className={`tk-chip${practiceLevel === key ? ' active' : ''}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="tk-filter-block">
              <div className="tk-filter-label">{t('topik.filter_section', lang)}</div>
              <div className="tk-filter-chips">
                {([['all', t('topik.filter_all', lang)], ['listening', t('topik.filter_listening', lang)], ['reading', t('topik.filter_reading', lang)]] as const).map(([key, label]) => (
                  <button key={key} onClick={() => setPracticeSection(key)} className={`tk-chip${practiceSection === key ? ' active' : ''}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="tk-filter-block">
              <div className="tk-filter-label">{t('topik.filter_sort', lang)}</div>
              <div className="tk-filter-chips">
                {([['weakest', t('topik.sort_weakest', lang)], ['recent', t('topik.sort_recent', lang)], ['default', t('topik.sort_default', lang)]] as const).map(([key, label]) => (
                  <button key={key} onClick={() => setPracticeSort(key)} className={`tk-chip${practiceSort === key ? ' active' : ''}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="tk-stats3">
              <div className="tk-stat3">
                <div className="tk-stat3-num">{sortedTypeCards.length}</div>
                <div className="tk-stat3-label">{t('topik.stat_total_types', lang)}</div>
              </div>
              <div className="tk-stat3 mint">
                <div className="tk-stat3-num">{sortedTypeCards.filter(c => c.mastered).length}</div>
                <div className="tk-stat3-label">{t('topik.stat_mastered', lang)}</div>
              </div>
              <div className="tk-stat3 pink">
                <div className="tk-stat3-num">{sortedTypeCards.filter(c => c.rate >= 0 && !c.mastered).length}</div>
                <div className="tk-stat3-label">{t('topik.stat_practicing', lang)}</div>
              </div>
            </div>

            <div className="tk-type-grid">
              {sortedTypeCards.map(card => {
                const Icon = ((LucideIcons as unknown) as Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>>)[card.meta.iconName] || LucideIcons.Circle;
                const rate = card.rate;
                const fillCls = card.mastered ? 'mint' : rate < 0 ? '' : rate >= 0.7 ? 'mint' : rate >= 0.5 ? 'gold' : 'pink';
                const iconCls = card.meta.section === 'listening' ? 'listening' : 'reading';
                return (
                  <button key={card.meta.key} onClick={() => router.push(`/topik/practice/${card.meta.key}`)} className="tk-type-card">
                    <div className="tk-type-top">
                      <div className={`tk-type-icon ${iconCls}`}>
                        <Icon size={18} strokeWidth={2.2} />
                      </div>
                      <div className="tk-type-info">
                        <p className="tk-type-name">{lang === 'en' ? card.meta.labelZhEn ?? card.meta.labelZh : card.meta.labelZh}</p>
                        <div className="tk-type-meta">{lang === 'en' ? card.meta.officialNoEn ?? card.meta.officialNo : card.meta.officialNo} · {t('topik.type_questions', lang, { count: card.questionCount })}</div>
                      </div>
                    </div>

                    <div className="tk-type-mastery">
                      <div className="tk-mastery-row">
                        <span className="tk-mastery-label">
                          {rate < 0 ? t('topik.mastery_unpracticed', lang) : card.mastered ? t('topik.mastery_mastered', lang) : t('topik.mastery_rate', lang, { pct: Math.round(rate * 100) })}
                        </span>
                        {card.lastPracticedAt > 0 && (
                          <span className="tk-mastery-age">{timeSince(card.lastPracticedAt)}</span>
                        )}
                      </div>
                      <div className="tk-mastery-bar">
                        <div className={`tk-mastery-fill ${fillCls}`} style={{ width: rate < 0 ? '0%' : `${Math.round(rate * 100)}%` }} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {sortedTypeCards.length === 0 && (
              <div className="tk-empty">
                <p className="tk-empty-title">{t('topik.empty_no_types', lang)}</p>
                <p className="tk-empty-hint">{t('topik.empty_no_types_hint', lang)}</p>
              </div>
            )}
          </div>
        )}

        {/* ── 我的 ── */}
        {tab === 'mine' && (
          <div>
            {/* 快捷入口 */}
            <div className="tk-quick-grid">
              <Link href="/topik/mistakes" className="tk-quick-link">
                <div className="tk-quick-icon pink">❌</div>
                <div className="tk-quick-info">
                  <p className="tk-quick-title">{t('topik.quick_mistakes', lang)}</p>
                  <div className="tk-quick-meta">{t('topik.quick_mistakes_meta', lang, { n: mistakeCount })}</div>
                </div>
              </Link>
              <Link href="/topik/history" className="tk-quick-link">
                <div className="tk-quick-icon mint">📊</div>
                <div className="tk-quick-info">
                  <p className="tk-quick-title">{t('topik.quick_history', lang)}</p>
                  <div className="tk-quick-meta">{t('topik.quick_history_meta', lang, { n: totalSessions })}</div>
                </div>
              </Link>
            </div>

            {/* 7 天活跃度 */}
            <div className="tk-card">
              <div className="tk-card-head">
                <CalendarIcon size={14} color="currentColor" style={{ opacity: 0.6 }} />
                <p className="tk-card-title">{t('topik.card_week_active', lang)}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                {mineStats.activity.map((day, i) => {
                  const max = Math.max(1, ...mineStats.activity.map(d => d.count));
                  const h = day.count === 0 ? 8 : 8 + (day.count / max) * 40;
                  const bg = day.count === 0 ? 'var(--hr-border-1)' : day.count < 10 ? 'var(--hr-pink-soft)' : day.count < 30 ? 'var(--hr-pink-base)' : 'var(--hr-pink-strong)';
                  const dayLabel = ['topik.wd_sun','topik.wd_mon','topik.wd_tue','topik.wd_wed','topik.wd_thu','topik.wd_fri','topik.wd_sat'].map(k => t(k, lang))[new Date(day.date.replace(/-/g, '/')).getDay()];
                  const isToday = i === 6;
                  return (
                    <div key={day.date} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: '100%', height: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <div style={{ width: '80%', height: h, borderRadius: 4, background: bg, transition: 'height 0.4s' }} />
                      </div>
                      <span style={{ fontSize: 10, color: isToday ? 'var(--hr-pink-strong)' : 'var(--hr-ink-3)', fontWeight: isToday ? 700 : 600, fontFamily: 'var(--hr-mono)' }}>{dayLabel}</span>
                      <span style={{ fontSize: 9, color: 'var(--hr-ink-3)' }}>{day.count || ''}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 累计数据 */}
            <div className="tk-card">
              <div className="tk-card-head">
                <p className="tk-card-title">{t('topik.card_cumulative', lang)}</p>
              </div>
              <div className="tk-stats4">
                <div>
                  <div className="tk-stat4-num">{mineStats.totalQs}</div>
                  <div className="tk-stat4-label">{t('topik.stat_answered', lang)}</div>
                </div>
                <div>
                  <div className="tk-stat4-num mint">{mineStats.totalQs > 0 ? Math.round(mineStats.avg * 100) : 0}%</div>
                  <div className="tk-stat4-label">{t('topik.stat_avg_accuracy', lang)}</div>
                </div>
                <div>
                  <div className="tk-stat4-num">{totalSessions}</div>
                  <div className="tk-stat4-label">{t('topik.stat_practice_count', lang)}</div>
                </div>
                <div>
                  <div className="tk-stat4-num">{mineStats.totalMin}</div>
                  <div className="tk-stat4-label">{t('topik.stat_study_min', lang)}</div>
                </div>
              </div>
            </div>

            {/* 分数走势 */}
            {mineStats.trend.length >= 2 && (
              <div className="tk-card">
                <div className="tk-card-head">
                  <TrendingUp size={14} color="currentColor" style={{ opacity: 0.6 }} />
                  <p className="tk-card-title">{t('topik.card_score_trend', lang)}</p>
                  <span className="tk-card-hint">{t('topik.recent_n', lang, { n: mineStats.trend.length })}</span>
                </div>
                {(() => {
                  const maxScore = Math.max(200, ...mineStats.trend.map(t => t.score));
                  const w = 100 / mineStats.trend.length;
                  return (
                    <div style={{ position: 'relative', height: 90, display: 'flex', alignItems: 'flex-end' }}>
                      <svg viewBox={`0 0 100 100`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                        <polyline
                          fill="none"
                          stroke="var(--hr-mint-strong)"
                          strokeWidth="1"
                          points={mineStats.trend.map((t, i) => `${i * w + w / 2},${100 - (t.score / maxScore) * 90}`).join(' ')}
                        />
                      </svg>
                      {mineStats.trend.map((t, i) => {
                        const barH = (t.score / maxScore) * 90;
                        return (
                          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <div style={{ width: 6, height: `${barH}%`, background: 'var(--hr-pink-base)', borderRadius: 3, opacity: 0.8 }} />
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: 'var(--hr-ink-3)', fontFamily: 'var(--hr-mono)', letterSpacing: '.14em' }}>
                  <span>{t('topik.trend_first', lang, { score: mineStats.trend[0].score })}</span>
                  <span style={{ fontWeight: 800, color: 'var(--hr-ink-1)' }}>{t('topik.trend_latest', lang, { score: mineStats.trend[mineStats.trend.length - 1].score })}</span>
                </div>
              </div>
            )}

            {/* 弱项攻坚 */}
            {mineStats.weak.length > 0 && (
              <div className="tk-card">
                <div className="tk-card-head">
                  <p className="tk-card-title">{t('topik.card_weak', lang)}</p>
                  <span className="tk-card-hint">{t('topik.card_weak_hint', lang)}</span>
                </div>
                <div className="tk-weak-list">
                  {mineStats.weak.map(w => (
                    <button key={w.meta.key} onClick={() => router.push(`/topik/practice/${w.meta.key}`)} className="tk-weak-item">
                      <div className="tk-weak-info">
                        <p className="tk-weak-name">{lang === 'en' ? w.meta.labelZhEn ?? w.meta.labelZh : w.meta.labelZh}</p>
                        <div className="tk-weak-meta">{t('topik.weak_practiced', lang, { officialNo: lang === 'en' ? w.meta.officialNoEn ?? w.meta.officialNo : w.meta.officialNo, n: w.attempts })}</div>
                      </div>
                      <span className={`tk-weak-rate ${w.rate < 0.5 ? 'warn' : 'mid'}`}>{Math.round(w.rate * 100)}%</span>
                      <ChevronRight size={14} color="currentColor" style={{ opacity: 0.4 }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 徽章 */}
            <div className="tk-card">
              <div className="tk-card-head">
                <Award size={14} color="currentColor" style={{ opacity: 0.6 }} />
                <p className="tk-card-title">{t('topik.card_badges', lang)}</p>
                <span className="tk-card-hint">
                  {t('topik.badges_earned', lang, { earned: mineStats.badges.filter(b => b.earned).length, total: mineStats.badges.length })}
                </span>
              </div>
              <div className="tk-badges">
                {mineStats.badges.map(b => (
                  <div key={b.key} className={`tk-badge${b.earned ? ' earned' : ''}`}>
                    <div className="tk-badge-emoji">{b.emoji}</div>
                    <p className="tk-badge-name">{lang === 'en' ? b.nameEn : b.name}</p>
                    <p className="tk-badge-hint">{b.earned ? t('topik.badge_earned', lang) : (b.progress || (lang === 'en' ? b.descEn : b.desc))}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 最近练习 */}
            {recentSessions.length > 0 && (
              <div className="tk-card">
                <div className="tk-card-head">
                  <p className="tk-card-title">{t('topik.card_recent', lang)}</p>
                </div>
                <div className="tk-recent-list">
                  {recentSessions.map(s => {
                    const passed = isSessionPassed(s);
                    return (
                      <button key={s.id} className="tk-recent-item" onClick={() => router.push(`/topik/result/${s.id}`)} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', border: 'none', background: 'transparent', padding: 0 }}>
                        <div className={`tk-recent-score ${passed ? 'pass' : 'fail'}`}>{s.score}</div>
                        <div className="tk-recent-info">
                          <p className="tk-recent-name">{sectionLabel(s.section)}</p>
                          <div className="tk-recent-meta">{formatDate(s.completedAt)} · {s.correctCount}/{s.totalCount} · {
                            s.section === 'sim-free' ? t('topik.recent_mode_sim_free', lang) :
                            s.section?.startsWith('type-') ? t('topik.recent_mode_type', lang) :
                            s.mode === 'mistakes' ? t('topik.recent_mode_mistakes', lang) :
                            s.mode === 'exam' ? t('topik.recent_mode_exam', lang) :
                            s.mode === 'simulate' ? t('topik.recent_mode_simulate', lang) :
                            t('topik.recent_mode_special', lang)
                          }</div>
                        </div>
                        {passed ? <Trophy size={14} color="var(--hr-mint-strong)" /> : <AlertCircle size={14} color="var(--hr-pink-strong)" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {allSessions.length === 0 && (
              <div className="tk-empty">
                <p className="tk-empty-title">{t('topik.empty_no_records', lang)}</p>
                <p className="tk-empty-hint">{t('topik.empty_no_records_hint', lang)}</p>
                <button className="tk-goto-btn" onClick={() => setTab('practice')}>{t('topik.go_practice', lang)}</button>
              </div>
            )}
          </div>
        )}

        <GoalSettingModal
          open={goalModalOpen}
          initial={{
            targetDate: userGoal?.targetDate,
            targetLevel: userGoal?.targetLevel,
            dailyQuestionCount: userGoal?.dailyQuestionCount || 10,
          }}
          onClose={() => setGoalModalOpen(false)}
          onSave={saveGoal}
        />

      </div>{/* /tk-screen */}
      </div>{/* /tk-hub-col */}

      {/* ── 桌面专属右栏（备考进度 + 快捷 + 全部题型，纯功能） ── */}
      {(() => {
        const masteredN = railTypeCards.filter(c => c.mastered).length;
        const totalN = railTypeCards.length;
        const pct = totalN > 0 ? Math.round((masteredN / totalN) * 100) : 0;
        const R = 33, CIRC = 2 * Math.PI * R;
        return (
          <aside className="tk-hub-rail" aria-label={t('topik.rail_progress', lang)}>
            <div className="tk-hub-card">
              <div className="tk-hub-card-title"><Trophy size={13} /> {t('topik.rail_progress', lang)}</div>
              <div className="tk-hub-ring-wrap">
                <div className="tk-hub-ring">
                  <svg width="78" height="78" viewBox="0 0 78 78">
                    <circle className="tk-hub-ring-track" cx="39" cy="39" r={R} fill="none" strokeWidth="6" />
                    <circle className="tk-hub-ring-fill" cx="39" cy="39" r={R} fill="none" strokeWidth="6"
                      strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - pct / 100)} />
                  </svg>
                  <div className="tk-hub-ring-num"><b>{pct}%</b><span>MASTER</span></div>
                </div>
                <div className="tk-hub-ring-meta">
                  {t('topik.mastery_mastered', lang)} <b>{masteredN}</b> / {totalN}<br />{t('topik.types_unit', lang)}
                </div>
              </div>
            </div>

            <div className="tk-hub-card">
              <div className="tk-hub-card-title">{t('topik.rail_quick', lang)}</div>
              <div className="tk-hub-tasks">
                <button type="button" className="tk-hub-task" onClick={() => router.push('/topik/mistakes')}>
                  <span className="tk-hub-task-icon"><AlertCircle size={18} /></span>
                  <span className="tk-hub-task-body">
                    <span className="tk-hub-task-name">{t('topik.quick_mistakes', lang)}</span>
                    <span className="tk-hub-task-kr">{t('topik.quick_mistakes_meta', lang, { n: mistakeCount })}</span>
                  </span>
                  <span className="tk-hub-task-state"><ChevronRight size={12} style={{ verticalAlign: '-2px' }} /></span>
                </button>
                <button type="button" className="tk-hub-task" onClick={() => router.push('/topik/history')}>
                  <span className="tk-hub-task-icon"><TrendingUp size={18} /></span>
                  <span className="tk-hub-task-body">
                    <span className="tk-hub-task-name">{t('topik.quick_history', lang)}</span>
                    <span className="tk-hub-task-kr">{t('topik.quick_history_meta', lang, { n: totalSessions })}</span>
                  </span>
                  <span className="tk-hub-task-state"><ChevronRight size={12} style={{ verticalAlign: '-2px' }} /></span>
                </button>
              </div>
            </div>

            <div className="tk-hub-card tk-hub-types-card">
              <div className="tk-hub-card-title">{t('topik.rail_all_types', lang)}</div>
              <div className="tk-hub-types-list">
                {railTypeCards.map(card => {
                  const cls = ['tk-hub-type', card.mastered ? 'done' : '', card.rate < 0 ? 'fresh' : ''].filter(Boolean).join(' ');
                  return (
                    <button key={card.meta.key} type="button" className={cls}
                      onClick={() => router.push(`/topik/practice/${card.meta.key}`)} title={lang === 'en' ? card.meta.labelZhEn ?? card.meta.labelZh : card.meta.labelZh}>
                      <span className="tk-hub-type-num">
                        {card.mastered ? <Award size={15} /> : card.meta.section === 'listening' ? t('topik.rail_listen_short', lang) : t('topik.rail_read_short', lang)}
                      </span>
                      <span className="tk-hub-type-body">
                        <span className="tk-hub-type-name">{lang === 'en' ? card.meta.labelZhEn ?? card.meta.labelZh : card.meta.labelZh}</span>
                        <span className="tk-hub-type-sub">
                          {card.rate < 0 ? t('topik.rail_type_unpracticed', lang, { count: card.questionCount }) : card.mastered ? t('topik.mastery_mastered', lang) : t('topik.mastery_rate', lang, { pct: Math.round(card.rate * 100) })}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        );
      })()}
      </div>{/* /tk-hub-layout */}
      </>)}
      </div>
    </div>
  );
}
