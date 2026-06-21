'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Headphones, ChevronRight, Trophy, AlertCircle } from 'lucide-react';
import type { TopikSection, TopikExamSet, TopikQuestion } from '@/data/topik-questions';
import { db } from '@/lib/db';
import type { TopikSession, TopikMistake } from '@/types';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import { LIGHT_C as _LIGHT_C, DARK_C as _DARK_C } from '@/lib/theme';

const LIGHT_C = { ..._LIGHT_C, tagBg: '#f0ece8', disabledBtn: '#c4a89e' };
const DARK_C  = { ..._DARK_C, tagBg: '#252040', disabledBtn: '#4A3A5A' };

type Tab = 'exam' | 'simulate' | 'practice' | 'mine';

const levelGroups = [
  { key: 'beginner' as const, label: 'TOPIK I · 初级', topikLevel: 'I' },
  { key: 'intermediate' as const, label: 'TOPIK II · 中级', topikLevel: 'II' },
  { key: 'advanced' as const, label: 'TOPIK II · 高级', topikLevel: 'II' },
];

export default function TopikPage() {
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('exam');
  const [mistakeCount, setMistakeCount] = useState(0);
  const [recentSessions, setRecentSessions] = useState<TopikSession[]>([]);
  const [practiceLevel, setPracticeLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [practiceSection, setPracticeSection] = useState<'all' | 'listening' | 'reading'>('all');
  const [topikSections, setTopikSections] = useState<TopikSection[]>([]);
  const [topikExamSets, setTopikExamSets] = useState<TopikExamSet[]>([]);
  const [topikQuestions, setTopikQuestions] = useState<TopikQuestion[]>([]);

  useEffect(() => {
    import('@/data/topik-questions').then(({ topikSections: secs, topikExamSets: sets, topikQuestions: qs }) => {
      setTopikSections(secs);
      setTopikExamSets(sets);
      setTopikQuestions(qs);
    });
    db.topikMistakes.filter((m: TopikMistake) => m.mastered === 0).then(items => setMistakeCount(items.length)).catch(() => {});
    db.topikSessions.toArray().then(sessions => {
      const sorted = [...sessions].sort((a, b) => b.completedAt - a.completedAt).slice(0, 3);
      setRecentSessions(sorted);
    }).catch(() => {});
  }, []);

  // Filtered questions for practice
  const practiceQuestions = useMemo(() => topikQuestions.filter(q => {
    if (practiceLevel !== 'all' && q.level !== practiceLevel) return false;
    if (practiceSection !== 'all' && q.section !== practiceSection) return false;
    return true;
  }), [topikQuestions, practiceLevel, practiceSection]);

  // Exam year groups
  const examYears = useMemo(() => Array.from(new Set(topikExamSets.map(s => s.year))).sort((a, b) => b - a), [topikExamSets]);

  function startSimulate(sectionId: string) {
    const sessionId = crypto.randomUUID();
    try { sessionStorage.setItem(`topik-exam-${sessionId}`, JSON.stringify({ sectionId, mode: 'practice', timeLeft: -1, idx: 0, answers: [], startedAt: Date.now() })); } catch { /* ignore */ }
    router.push(`/topik/exam/${sessionId}`);
  }

  function startPractice() {
    if (practiceQuestions.length === 0) return;
    const sessionId = crypto.randomUUID();
    const ids = practiceQuestions.map(q => q.id);
    try { sessionStorage.setItem(`topik-exam-${sessionId}`, JSON.stringify({ questionIds: ids, mode: 'practice', timeLeft: -1, idx: 0, answers: [], startedAt: Date.now() })); } catch { /* ignore */ }
    router.push(`/topik/exam/${sessionId}`);
  }

  function formatDate(ts: number) {
    const d = new Date(ts);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }

  function sectionLabel(section: string) {
    const s = topikSections.find(x => x.id === section);
    return s ? `${s.title}` : section;
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 40 }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 16px 0' }}>
        <button onClick={() => router.back()} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${C.line}`, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={16} style={{ color: C.muted }} />
        </button>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 900, color: C.ink, margin: 0 }}>TOPIK 备考</h1>
          <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>한국어능력시험 · 历年真题 + 专项练习</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, padding: '14px 16px 0' }}>
        {([['exam', '历年真题'], ['simulate', '模拟练习'], ['practice', '专项练习'], ['mine', '我的']] as [Tab, string][]).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{ flex: 1, padding: '8px 4px', borderRadius: 10, border: 'none', background: tab === key ? C.ink : 'transparent', color: tab === key ? '#fff' : C.muted, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding: '16px 16px 0' }}>

        {/* ── 历年真题 ── */}
        {tab === 'exam' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {examYears.map(year => (
              <div key={year}>
                <p style={{ fontSize: 13, fontWeight: 900, color: C.ink, marginBottom: 8 }}>{year}年</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {topikExamSets.filter(s => s.year === year).map(set => (
                    <div key={set.id} style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.line}`, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, opacity: set.available ? 1 : 0.55 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: set.level === 'I' ? C.mintBg : C.pinkSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>
                        {set.level === 'I' ? '📄' : '📋'}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 800, color: C.ink, margin: 0 }}>第{set.round}回 TOPIK {set.level}</p>
                        <p style={{ fontSize: 11, color: C.muted, margin: '2px 0 0' }}>
                          {set.level === 'I' ? '初级 · 听力 + 阅读 · 100题' : '中高级 · 听力 + 阅读 + 写作 · 104题'}
                        </p>
                      </div>
                      {set.available ? (
                        <button onClick={() => router.push(`/topik/exam/${crypto.randomUUID()}?examSetId=${set.id}`)} style={{ padding: '6px 14px', borderRadius: 10, background: C.ink, color: '#fff', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                          开始
                        </button>
                      ) : (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: C.tagBg, color: C.muted }}>即将上线</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 模拟练习 ── */}
        {tab === 'simulate' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {levelGroups.map(group => (
              <div key={group.key} style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 12, fontWeight: 800, color: C.muted, marginBottom: 8 }}>{group.label}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {topikSections.filter(s => s.level === group.key).map(sec => (
                    <button key={sec.id} onClick={() => startSimulate(sec.id)} style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.line}`, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: sec.section === 'listening' ? C.mintBg : C.pinkSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {sec.section === 'listening' ? <Headphones size={18} color={C.mint} /> : <BookOpen size={18} color={C.pink} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 800, color: C.ink, margin: 0 }}>{sec.title}</p>
                        <p style={{ fontSize: 11, color: C.muted, margin: '2px 0 0' }}>{sec.timeMinutes}分钟 · {sec.questionCount}题</p>
                      </div>
                      <ChevronRight size={16} color={C.muted} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 专项练习 ── */}
        {tab === 'practice' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* 级别筛选 */}
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 8 }}>级别</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {([['all', '全部'], ['beginner', 'TOPIK I'], ['intermediate', '中级'], ['advanced', '高级']] as const).map(([key, label]) => (
                  <button key={key} onClick={() => setPracticeLevel(key)} style={{ padding: '6px 14px', borderRadius: 20, border: `1px solid ${practiceLevel === key ? C.ink : C.line}`, background: practiceLevel === key ? C.ink : C.card, color: practiceLevel === key ? '#fff' : C.muted, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 科目筛选 */}
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 8 }}>科目</p>
              <div style={{ display: 'flex', gap: 6 }}>
                {([['all', '全部'], ['listening', '🎧 听力'], ['reading', '📖 阅读']] as const).map(([key, label]) => (
                  <button key={key} onClick={() => setPracticeSection(key)} style={{ padding: '6px 14px', borderRadius: 20, border: `1px solid ${practiceSection === key ? C.ink : C.line}`, background: practiceSection === key ? C.ink : C.card, color: practiceSection === key ? '#fff' : C.muted, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={startPractice} disabled={practiceQuestions.length === 0} style={{ width: '100%', padding: '14px 0', borderRadius: 14, background: practiceQuestions.length === 0 ? C.disabledBtn : C.ink, color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: practiceQuestions.length === 0 ? 'not-allowed' : 'pointer' }}>
              开始练习 · 共 {practiceQuestions.length} 题
            </button>
          </div>
        )}

        {/* ── 我的 ── */}
        {tab === 'mine' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* 统计卡 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 4 }}>
              <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.line}`, padding: 14 }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, lineHeight: 1 }}>{recentSessions.length}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>累计练习次数</div>
              </div>
              <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.line}`, padding: 14 }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: C.ink, lineHeight: 1 }}>{recentSessions[0]?.score ?? '—'}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>最近得分</div>
              </div>
            </div>

            {/* 导航卡 */}
            <Link href="/topik/mistakes" style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.line}`, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: C.pinkSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>❌</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 800, color: C.ink, margin: 0 }}>错题本</p>
                <p style={{ fontSize: 11, color: C.muted, margin: '2px 0 0' }}>记录答错的题，专项攻克</p>
              </div>
              {mistakeCount > 0 && <span style={{ fontSize: 11, fontWeight: 700, background: C.pink, color: '#fff', borderRadius: 10, padding: '2px 8px' }}>{mistakeCount}</span>}
            </Link>

            <Link href="/topik/history" style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.line}`, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: C.mintBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>📊</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 800, color: C.ink, margin: 0 }}>成绩历史</p>
                <p style={{ fontSize: 11, color: C.muted, margin: '2px 0 0' }}>查看历次练习记录</p>
              </div>
              <ChevronRight size={16} color={C.muted} />
            </Link>

            {/* 最近练习 */}
            {recentSessions.length > 0 && (
              <>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginTop: 6 }}>最近练习</p>
                {recentSessions.map(s => (
                  <div key={s.id} style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.line}`, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: s.score >= 60 ? C.mintBg : C.pinkSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 900, color: s.score >= 60 ? '#2db89b' : C.pink, flexShrink: 0 }}>
                      {s.score}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, margin: 0 }}>{sectionLabel(s.section)} · {s.mode === 'practice' ? '模拟' : s.mode === 'mistakes' ? '错题' : '专项'}</p>
                      <p style={{ fontSize: 11, color: C.muted, margin: '2px 0 0' }}>{formatDate(s.completedAt)} · {s.correctCount}/{s.totalCount}</p>
                    </div>
                    {s.score >= 60 ? <Trophy size={16} color={C.mint} /> : <AlertCircle size={16} color={C.pink} />}
                  </div>
                ))}
              </>
            )}

            {recentSessions.length === 0 && (
              <div style={{ textAlign: 'center', paddingTop: 32, color: C.muted }}>
                <p style={{ fontSize: 14, fontWeight: 700 }}>还没有练习记录</p>
                <p style={{ fontSize: 12, marginTop: 4 }}>完成一次练习后，成绩将显示在这里</p>
                <button onClick={() => setTab('simulate')} style={{ marginTop: 16, padding: '10px 24px', borderRadius: 12, background: C.ink, color: '#fff', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                  去练习
                </button>
              </div>
            )}
          </div>
        )}

      </div>
      </div>
    </div>
  );
}
