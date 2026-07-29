'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { ArrowLeft, Headphones, BookOpen, Clock, AlertCircle, Check } from 'lucide-react';
import type { TopikExamSet, TopikQuestion } from '@/data/topik-questions';
import { loadTopikExamSets, loadTopikExamQuestions } from '@/lib/dataLoader';
import { useTheme } from '@/components/ThemeProvider';
import { LIGHT_C as _LIGHT_C, DARK_C as _DARK_C } from '@/lib/theme';
import { getTiming, getListeningPlayCount, type ExamMode, type TopikLevel, getMockExamOrdinal } from '@/lib/topik/examRules';
import { saveProgress, TTL_EXAM } from '@/lib/progress-storage';
import { useMembership } from '@/lib/useMembership';
import { canAccessTopikIndex, isPaidTier } from '@/lib/membership-benefits';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '../../tk-side-rail.css';

const LIGHT_C = { ..._LIGHT_C, modeBgIdle: '#f9f5f2', modeBgActive: '#fff0f5' };
const DARK_C  = { ..._DARK_C, modeBgIdle: '#252040', modeBgActive: '#3A2A50' };

export default function TopikStartPage() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const { examId } = useParams<{ examId: string }>();
  const router = useRouter();
  const smartBack = useSmartBack('/topik');

  const [examSet, setExamSet] = useState<TopikExamSet | null>(null);
  const [allQs, setAllQs] = useState<TopikQuestion[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState<ExamMode>('real');
  // 该套在「模拟卷」有序列表里的下标（用于免费档前 N 套判断），-1 表示未定位
  const [examOrdinal, setExamOrdinal] = useState(-1);
  const { tier, matrix, loading: memLoading } = useMembership();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const sets = await loadTopikExamSets();
        const found = sets.find(s => s.id === examId) || null;
        const valid = found && found.mock === true ? found : null;
        if (!alive) return;
        setExamSet(valid);
        setExamOrdinal(valid ? getMockExamOrdinal(sets, valid.id) : -1);
        if (valid) {
          // examId 形如 topik-e01-II，取出 e01-II 转成 E01-II
          const m = /^topik-(e\d+)-(I{1,2})$/i.exec(valid.id);
          const setFile = m ? `${m[1].toUpperCase()}-${m[2].toUpperCase()}` : null;
          if (setFile) {
            try {
              const qs = await loadTopikExamQuestions(setFile);
              if (alive) setAllQs(qs);
            } catch (e) { console.error('[topik] start failed to load questions:', e); }
          }
        }
      } catch (e) { console.error('[topik] start failed to load exam sets:', e); }
      if (alive) setLoaded(true);
    })();
    return () => { alive = false; };
  }, [examId]);

  if (!loaded || memLoading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: C.bg, color: C.muted, fontSize: 14 }}>{t('topik.loading', lang)}</div>;
  }

  if (!examSet) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 }}>
        <p style={{ color: C.ink, fontSize: 14, fontWeight: 700 }}>{t('topik.st_not_found', lang)}</p>
        <button onClick={() => router.replace('/topik')} style={{ padding: '10px 20px', borderRadius: 10, background: C.ink, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{t('topik.back', lang)}</button>
      </div>
    );
  }

  // 会员内容墙：免费档仅前 N 套模拟卷（默认 2）
  if (!memLoading && !isPaidTier(tier) && examOrdinal >= 0 && !canAccessTopikIndex(matrix, tier, examOrdinal)) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>👑</div>
        <p style={{ color: C.ink, fontSize: 16, fontWeight: 800 }}>{t('topik.st_member_title', lang)}</p>
        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6, maxWidth: 280 }}>
          {t('topik.st_member_body', lang)}
        </p>
        <button onClick={() => router.push('/membership')} style={{ padding: '11px 26px', borderRadius: 999, background: 'linear-gradient(150deg, #ff9dbb, #ff7fa8)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 5px 15px rgba(255,127,168,0.32)' }}>{t('topik.st_unlock', lang)}</button>
        <button onClick={() => router.replace('/topik')} style={{ padding: '8px 20px', borderRadius: 10, background: 'transparent', color: C.muted, border: `1px solid ${C.line}`, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{t('topik.back', lang)}</button>
      </div>
    );
  }

  const level = examSet.level as TopikLevel;
  const timing = getTiming(level);
  const playCount = getListeningPlayCount(examSet.round);
  const listenSec = examSet.sections.find(s => s.type === 'listening');
  const readSec   = examSet.sections.find(s => s.type === 'reading');
  const listenIds = listenSec?.questionIds ?? [];
  const readIds   = readSec?.questionIds ?? [];

  // 实际可用题数 = JSON 里能找到的题
  const listenCount = listenIds.filter(id => allQs.some(q => q.id === id)).length;
  const readCount   = readIds.filter(id => allQs.some(q => q.id === id)).length;
  const totalCount  = listenCount + readCount;
  const noData = totalCount === 0;

  function startExam() {
    if (!examSet || noData) return;
    // 过滤掉数据库里找不到的题 id，避免答题页题数对不上
    const qIdSet = new Set(allQs.map(q => q.id));
    const effectiveListen = listenIds.filter(id => qIdSet.has(id));
    const effectiveRead   = readIds.filter(id => qIdSet.has(id));
    if (effectiveListen.length + effectiveRead.length === 0) return;

    const sessionId = crypto.randomUUID();
    // 真实满分（按 examSet 申报的总题数 ×2，包含数据缺失的图片题）
    const officialTotalQuestions = listenIds.length + readIds.length;
    const payload = {
      examSetId: examSet.id,
      examRound: examSet.round,
      level: examSet.level,
      mode,
      listenIds: effectiveListen,
      listenTimeLeft: timing.listeningMinutes * 60,
      readIds: effectiveRead,
      readTimeLeft: timing.readingMinutes * 60,
      stage: effectiveListen.length > 0 ? 'listening' as const : 'reading' as const,
      idx: 0,
      answers: [] as [string, number][],
      marks: [] as string[],
      officialTotalQuestions,  // 用于结果页计算真实满分基准
      startedAt: Date.now(),
    };
    saveProgress(`topik-exam-${sessionId}`, payload, TTL_EXAM);
    router.push(`/topik/exam/${sessionId}`);
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 40 }}>
      <div className="tsr-layout" style={{ padding: '0 16px' }}>
      <div className="tsr-col">
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, marginBottom: 16 }}>
          <button onClick={smartBack} aria-label={t('topik.back', lang)} style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${C.line}`, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={16} color={C.muted} />
          </button>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 900, color: C.ink, margin: 0 }}>{examSet.displayName || t('topik.exam_set_default', lang, { round: examSet.round, level: examSet.level })}</h1>
            <p style={{ fontSize: 12, color: C.muted, margin: '2px 0 0' }}>{examSet.mock ? t('topik.st_mock_note', lang) : t('topik.st_year_note', lang, { year: examSet.year })}</p>
          </div>
        </div>

        {/* 数据缺失提示 */}
        {noData && (
          <div style={{ background: C.pinkSoft, border: `1px solid ${C.pink}`, borderRadius: 12, padding: 14, marginBottom: 16, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <AlertCircle size={18} color={C.pink} style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 800, color: C.ink, margin: 0 }}>{t('topik.st_preparing', lang)}</p>
              <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0', lineHeight: 1.5 }}>{t('topik.st_preparing_body', lang)}</p>
            </div>
          </div>
        )}

        {/* 考试结构卡 */}
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.line}`, padding: 16, marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: C.muted, margin: '0 0 12px' }}>{t('topik.st_structure', lang)}</p>

          {listenIds.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${C.line}` }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: C.mintBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Headphones size={18} color="var(--color-mint-strong)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 800, color: C.ink, margin: 0 }}>{t('topik.st_listening', lang)}</p>
                <p style={{ fontSize: 11, color: C.muted, margin: '2px 0 0' }}>{t('topik.st_listen_meta', lang, { count: listenCount, min: timing.listeningMinutes, play: playCount })}</p>
              </div>
            </div>
          )}

          {readIds.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: C.pinkSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BookOpen size={18} color={C.pink} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 800, color: C.ink, margin: 0 }}>{t('topik.st_reading', lang)}</p>
                <p style={{ fontSize: 11, color: C.muted, margin: '2px 0 0' }}>{t('topik.st_read_meta', lang, { count: readCount, min: timing.readingMinutes })}</p>
              </div>
            </div>
          )}

          <div style={{ marginTop: 8, paddingTop: 12, borderTop: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.muted }}>
            <Clock size={14} />
            <span>{t('topik.st_total', lang, { count: totalCount, min: timing.totalMinutes })}</span>
          </div>
        </div>

        {/* 模式选择 */}
        <p style={{ fontSize: 12, fontWeight: 800, color: C.muted, margin: '0 0 8px' }}>{t('topik.st_choose_mode', lang)}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          <button onClick={() => setMode('real')} style={{ background: mode === 'real' ? C.modeBgActive : C.modeBgIdle, border: `2px solid ${mode === 'real' ? C.pink : 'transparent'}`, borderRadius: 14, padding: 14, textAlign: 'left', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${mode === 'real' ? C.pink : C.line}`, background: mode === 'real' ? C.pink : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              {mode === 'real' && <Check size={12} color="#fff" strokeWidth={3} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: C.ink, margin: 0 }}>{t('topik.st_mode_real', lang)}</p>
              <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0', lineHeight: 1.5 }}>{t('topik.st_mode_real_desc', lang)}</p>
            </div>
          </button>

          <button onClick={() => setMode('practice')} style={{ background: mode === 'practice' ? C.modeBgActive : C.modeBgIdle, border: `2px solid ${mode === 'practice' ? C.pink : 'transparent'}`, borderRadius: 14, padding: 14, textAlign: 'left', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${mode === 'practice' ? C.pink : C.line}`, background: mode === 'practice' ? C.pink : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              {mode === 'practice' && <Check size={12} color="#fff" strokeWidth={3} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: C.ink, margin: 0 }}>{t('topik.st_mode_practice', lang)}</p>
              <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0', lineHeight: 1.5 }}>{t('topik.st_mode_practice_desc', lang)}</p>
            </div>
          </button>
        </div>

        {/* 注意事项 */}
        <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.line}`, padding: 14, marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: C.muted, margin: '0 0 8px' }}>{t('topik.st_before_start', lang)}</p>
          <ul style={{ fontSize: 12, color: C.muted, lineHeight: 1.7, paddingLeft: 18, margin: 0 }}>
            <li>{t('topik.st_note_1', lang)}</li>
            <li>{t('topik.st_note_2', lang)}</li>
            <li>{t('topik.st_note_3', lang)}</li>
            {examSet.level === 'II' && <li>{t('topik.st_note_4', lang)}</li>}
          </ul>
        </div>

        {/* 开始按钮 */}
        <button onClick={startExam} disabled={noData} style={{ width: '100%', padding: '16px 0', borderRadius: 14, background: noData ? C.line : C.ink, color: noData ? C.muted : '#fff', fontSize: 15, fontWeight: 800, border: 'none', cursor: noData ? 'not-allowed' : 'pointer' }}>
          {noData ? t('topik.st_no_data', lang) : t('topik.st_start_exam', lang)}
        </button>
      </div>
      </div>{/* /tsr-col */}

      {/* ── 桌面专属右栏（本卷速览） ── */}
      <aside className="tsr-rail" aria-label={t('topik.st_rail_overview', lang)}>
        <div className="tsr-card">
          <div className="tsr-card-title"><Clock size={13} className="tsr-ico" /> {t('topik.st_rail_overview', lang)}</div>
          <div className="tsr-stat"><span>{t('topik.st_rail_level', lang)}</span><b>TOPIK {examSet.level}</b></div>
          {listenCount > 0 && <div className="tsr-stat"><span>{t('topik.st_rail_listen', lang)}</span><b>{listenCount}<span className="tsr-stat-sub">{t('topik.st_rail_listen_meta', lang, { min: timing.listeningMinutes })}</span></b></div>}
          {readCount > 0 && <div className="tsr-stat"><span>{t('topik.st_rail_read', lang)}</span><b>{readCount}<span className="tsr-stat-sub">{t('topik.st_rail_listen_meta', lang, { min: timing.readingMinutes })}</span></b></div>}
          <div className="tsr-stat"><span>{t('topik.st_rail_play', lang)}</span><b>{playCount}<span className="tsr-stat-sub">{t('topik.st_rail_play_meta', lang)}</span></b></div>
        </div>

        <div className="tsr-card" style={{ padding: 0, border: 'none', background: 'transparent' }}>
          <div className="tsr-tip">
            <span className="tsr-tip-label">{mode === 'real' ? t('topik.st_mode_real', lang) : t('topik.st_mode_practice', lang)}</span>
            {mode === 'real'
              ? t('topik.st_mode_real_tip', lang)
              : t('topik.st_mode_practice_tip', lang)}
          </div>
        </div>
      </aside>
      </div>{/* /tsr-layout */}
    </div>
  );
}
