'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PROGRESSIVE_STAGES } from '@/data/phonetics-progressive';
import { getAllStageProgress, getCurrentStage, type AllStageProgress } from '@/lib/lesson/phoneticStepProgress';
import { getProfile, getTodayLog } from '@/lib/gamification';
import { db } from '@/lib/db';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const TOTAL_LESSONS_PER_STAGE = 4;

interface DailyStat {
  [k: string]: unknown;
  streak: number;
  minutesToday: number;
  totalAttempts: number;
  accuracy: number;
}

interface GoalState {
  [k: string]: unknown;
  letterToday: boolean;
  writeToday: boolean;
  quizToday: boolean;
}

const STEP_OVERVIEW_CSS = `
  /* 与字母表/连读规则一致：桌面端左对齐，非居中 */
  /* 父 .hr-stage 已有 padding，此层不再叠加，保持与字母表/连读规则同宽 */
  .ph-step-root { width: 100%; margin: 0; padding: 0; }
  .ph-hero { display: grid; grid-template-columns: minmax(0, 1fr) minmax(220px, 280px); gap: 24px; }
  @media (max-width: 720px) {
    .ph-hero { grid-template-columns: 1fr; gap: 16px; padding: 18px 18px !important; }
  }
  /* 5 步学习卡：默认宽屏 auto-fit，窄屏改成 2 列 + 挑战卡跨两列（避免 2-2-1 布局尾卡孤立） */
  .ph-lessons { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }
  @media (max-width: 640px) {
    .ph-lessons { grid-template-columns: 1fr 1fr; }
    .ph-lessons > *:last-child { grid-column: 1 / -1; }
  }
  @keyframes phStepPulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }
`;

export default function PhoneticsStepOverview() {
  const { lang } = useLang();
  const [progress, setProgress] = useState<AllStageProgress | null>(null);
  const [stat, setStat] = useState<DailyStat | null>(null);
  const [goals, setGoals] = useState<GoalState | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [focusStage, setFocusStage] = useState<number>(1);
  const pathname = usePathname();

  // 用 useCallback 避免 useEffect 因函数引用变化重跑
  const load = useCallback(async (aliveRef: { v: boolean }) => {
    try {
      const [p, prof, log, ms] = await Promise.all([
        getAllStageProgress(),
        getProfile(),
        getTodayLog(),
        db.lessonMastery.where('itemType').equals('phonetic_step').toArray().catch(() => []),
      ]);
      if (!aliveRef.v) return;
      setProgress(p);
      const correct = ms.reduce((s, r) => s + (r.correctCount || 0), 0);
      const wrong = ms.reduce((s, r) => s + (r.wrongCount || 0), 0);
      const total = correct + wrong;
      setStat({
        streak: prof.streak ?? 0,
        minutesToday: log.minutesStudied ?? 0,
        totalAttempts: total,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
      });
      const todayStart = new Date().setHours(0, 0, 0, 0);
      const todayMs = ms.filter((r) => r.lastSeenAt >= todayStart);
      setGoals({
        letterToday: todayMs.some((r) => r.itemIdx === 0),
        quizToday: todayMs.some((r) => r.itemIdx === 1),
        writeToday: todayMs.some((r) => r.itemIdx === 2),
      });
    } catch { /* ignore offline */ }
  }, []);

  // pathname 变化时重拉一次：用户做完子关回到 /phonetics 时进度刷新
  useEffect(() => {
    const aliveRef = { v: true };
    load(aliveRef);
    return () => { aliveRef.v = false; };
  }, [pathname, load]);

  const totalDone = progress
    ? Object.values(progress).reduce((sum, p) => sum + (p.locked ? 0 : p.doneCount), 0)
    : 0;
  const totalLessons = PROGRESSIVE_STAGES.filter((s) => !s.locked).length * TOTAL_LESSONS_PER_STAGE;
  const percent = totalLessons > 0 ? Math.round((totalDone / totalLessons) * 100) : 0;
  const currentStage = progress ? getCurrentStage(progress) : 1;
  const allStagesDone = currentStage === -1;

  // 进度加载完后，若用户还没动过 stage 选择，则把焦点对到当前推进 stage
  useEffect(() => {
    if (progress) setFocusStage((s) => (s === 1 && currentStage !== 1 ? currentStage : s));
    // 仅在 progress 首次加载时跳一次，不依赖 focusStage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const focusStageData = PROGRESSIVE_STAGES.find((s) => s.id === focusStage) ?? PROGRESSIVE_STAGES[0];
  const focusProg = progress?.[focusStage];

  // 计算"下一步该做什么" —— 用于 Hero CTA
  const nextStep = allStagesDone ? null : (() => {
    const stage = PROGRESSIVE_STAGES.find((s) => s.id === currentStage) ?? PROGRESSIVE_STAGES[0];
    const cp = progress?.[currentStage];
    const steps: { key: string; labelKey: string; idx: number; href: string }[] = [
      { key: 'letter', labelKey: 'phonetics.result_step_letter', idx: 1, href: `/phonetics/step/${currentStage}/letter` },
      { key: 'write', labelKey: 'phonetics.result_step_write', idx: 2, href: `/phonetics/step/${currentStage}/write` },
      { key: 'quiz', labelKey: 'phonetics.result_step_recognize', idx: 3, href: `/phonetics/step/${currentStage}/quiz` },
      { key: 'blend', labelKey: 'phonetics.result_step_blend', idx: 4, href: `/phonetics/step/${currentStage}/blend` },
    ];
    const lessons = cp?.lessons ?? { letter: false, quiz: false, write: false, blend: false };
    const firstUndone = steps.find((s) => !(lessons as Record<string, boolean>)[s.key]);
    if (firstUndone) {
      return { stage, step: firstUndone, labelKey: firstUndone.labelKey, href: firstUndone.href, isResult: false };
    }
    return { stage, step: null, labelKey: 'phonetics.result_step_challenge', href: `/phonetics/step/${currentStage}/challenge`, isResult: true };
  })();

  const showLockedToast = () => {
    setToast(t('phonetics.overview_toast_coming_soon', lang));
    setTimeout(() => setToast(null), 1800);
  };

  return (
    <div className="ph-step-root">
    <div className="ph-step-main">
      <header style={{ padding: '24px 0 18px' }}>
        <h1 style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 'clamp(32px,5vw,48px)', lineHeight: 1, color: 'var(--color-pink-strong)', letterSpacing: '-.02em' }}>
          {t('phonetics.overview_title', lang)}
        </h1>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginTop: 8 }}>
          <span style={{ color: 'var(--color-pink-strong)' }}>§ </span>Step-by-Step Learning · {t('phonetics.overview_kicker_path', lang)}
        </div>
      </header>

      <div style={{
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border-2)',
        borderRadius: 'var(--radius-md)',
        padding: '24px 28px', marginBottom: 28,
        position: 'relative', overflow: 'hidden',
      }} className="ph-hero">
        <div aria-hidden style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: 'radial-gradient(circle, var(--color-pink-soft), transparent 70%)', borderRadius: '50%', opacity: 0.5, pointerEvents: 'none' }} />

        {/* 左侧 · 5 站路径地图 */}
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
            <span style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 18, color: 'var(--color-ink-1)' }}>{t('phonetics.overview_your_progress', lang)}</span>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, letterSpacing: '.18em', color: 'var(--color-ink-3)', textTransform: 'uppercase' }}>
              {totalDone}/{totalLessons} · {percent}%
            </span>
          </div>

          <div style={{ position: 'relative', padding: '8px 0 6px' }}>
            {/* 底层灰线 */}
            <div style={{
              position: 'absolute', left: 16, right: 16, top: 22,
              height: 3, background: 'var(--color-surface-4)', borderRadius: 2,
            }} />
            {/* 已通关粉线 —— 算到第一个未通关的 stage 之前 */}
            <div style={{
              position: 'absolute', left: 16, top: 22, height: 3,
              width: `calc((100% - 32px) * ${
                Math.max(0, PROGRESSIVE_STAGES.findIndex((s) => !progress?.[s.id]?.completed)) /
                Math.max(1, PROGRESSIVE_STAGES.length - 1)
              })`,
              background: 'linear-gradient(90deg, var(--color-mint-base), var(--color-pink-base))',
              borderRadius: 2, transition: 'width .8s ease',
            }} />

            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
              {PROGRESSIVE_STAGES.map((stage) => {
                const p = progress?.[stage.id];
                const state: 'done' | 'current' | 'ready' | 'locked' =
                  stage.letters.length === 0 ? 'locked' :
                  p?.completed ? 'done' :
                  stage.id === currentStage ? 'current' :
                  'ready';
                return (
                  <div key={stage.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 15, fontWeight: 700,
                      background:
                        state === 'done' ? 'var(--color-mint-base)' :
                        state === 'current' ? 'var(--color-pink-base)' :
                        state === 'ready' ? 'var(--color-surface-2)' :
                        'var(--color-surface-4)',
                      color:
                        state === 'done' ? '#fff' :
                        state === 'current' ? '#fff' :
                        state === 'ready' ? 'var(--color-ink-3)' :
                        'var(--color-ink-4)',
                      border:
                        state === 'ready' ? '2px solid var(--color-border-3)' :
                        state === 'current' ? '3px solid var(--color-pink-soft)' :
                        '2px solid transparent',
                      boxShadow: state === 'current' ? '0 0 0 4px rgba(255,127,168,.18)' : undefined,
                      position: 'relative', zIndex: 1,
                      transition: 'all .3s ease',
                    }}>
                      {state === 'done' ? '✓' : state === 'locked' ? '🔒' : stage.id}
                    </div>
                    <div style={{
                      fontFamily: 'ui-monospace, monospace', fontSize: 9, letterSpacing: '.12em',
                      color: state === 'current' ? 'var(--color-pink-strong)' : 'var(--color-ink-3)',
                      textTransform: 'uppercase',
                    }}>S{stage.id}</div>
                    <div style={{
                      fontSize: 11.5,
                      fontWeight: state === 'current' ? 700 : 500,
                      color: state === 'current' ? 'var(--color-ink-1)' : 'var(--color-ink-3)',
                      textAlign: 'center', lineHeight: 1.25,
                    }}>{lang === 'en' ? stage.nameEn ?? stage.name : stage.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 右侧 · 下一步 CTA */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '14px 16px',
          background: 'linear-gradient(135deg, var(--color-pink-soft) 0%, var(--color-surface-2) 100%)',
          border: '1px solid var(--color-pink-base)',
          borderRadius: 'var(--radius-md)',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{
            fontFamily: 'ui-monospace, monospace', fontSize: 10, letterSpacing: '.22em',
            color: 'var(--color-pink-strong)', textTransform: 'uppercase', marginBottom: 6,
          }}>{allStagesDone ? t('phonetics.overview_all_clear', lang) : t('phonetics.overview_next_kicker', lang)}</div>
          {allStagesDone ? (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 24 }}>🎉</span>
                <span style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 16, color: 'var(--color-ink-1)' }}>{t('phonetics.overview_all_clear_title', lang)}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-ink-2)', marginBottom: 14 }}>
                {t('phonetics.overview_all_clear_body', lang)}
              </div>
              <Link
                href="/phonetics/step/practice"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '10px 16px',
                  background: 'var(--color-mint-base)',
                  color: '#fff', fontWeight: 600, fontSize: 13,
                  borderRadius: 999, textDecoration: 'none',
                  transition: 'transform .2s ease, box-shadow .2s ease',
                  boxShadow: '0 2px 8px rgba(174,227,216,.35)',
                }}
              >{t('phonetics.overview_go_review', lang)}</Link>
            </>
          ) : (
          <>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 18 }}>{nextStep!.stage.emoji}</span>
            <span style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 16, color: 'var(--color-ink-1)' }}>{lang === 'en' ? nextStep!.stage.nameEn ?? nextStep!.stage.name : nextStep!.stage.name}</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-ink-2)', marginBottom: 14 }}>
            {nextStep!.isResult ? (
              <>{t('phonetics.overview_stage_all_done', lang)}<br /><span style={{ color: 'var(--color-pink-strong)', fontWeight: 600 }}>{t('phonetics.overview_go_challenge', lang)}</span></>
            ) : nextStep!.step ? (
              <>{t('phonetics.overview_next_step', lang, { idx: nextStep!.step.idx, label: t(nextStep!.step.labelKey, lang) })}</>
            ) : null}
          </div>
          <Link
            href={nextStep!.href}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '10px 16px',
              background: 'var(--color-pink-base)',
              color: '#fff', fontWeight: 600, fontSize: 13,
              borderRadius: 999, textDecoration: 'none',
              transition: 'transform .2s ease, box-shadow .2s ease',
              boxShadow: '0 2px 8px rgba(255,127,168,.35)',
            }}
          >{t('phonetics.overview_continue_learning', lang)}</Link>
          </>
          )}
        </div>
      </div>

      <style>{STEP_OVERVIEW_CSS}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={sectionNum}>1</div>
        <div style={sectionLabel}><b style={{ color: 'var(--color-ink-2)', fontWeight: 700 }}>{t('phonetics.overview_section_choose_stage', lang)}</b> · 5 Stages</div>
      </div>

      <div className="scroll-hint-x" style={{
        background: 'var(--color-surface-3)',
        border: '1px solid var(--color-border-2)',
        borderRadius: 'var(--radius-md)',
      }}>
      <div style={{
        display: 'flex', gap: 2,
        padding: 4,
        overflowX: 'auto',
      }}>
        {PROGRESSIVE_STAGES.map((stage) => {
          const p = progress?.[stage.id];
          const state: 'done' | 'current' | 'ready' | 'locked' =
            stage.letters.length === 0 ? 'locked' :
            p?.completed ? 'done' :
            stage.id === currentStage ? 'current' :
            'ready';
          const isActive = stage.id === focusStage;
          const isLocked = state === 'locked';
          const dotColor =
            state === 'done' ? 'var(--color-mint-base)' :
            state === 'current' ? 'var(--color-pink-base)' :
            'transparent';

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => isLocked ? showLockedToast() : setFocusStage(stage.id)}
              aria-pressed={isActive}
              style={{
                all: 'unset', flex: 1, minWidth: 96,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                padding: '12px 10px',
                borderRadius: 'calc(var(--radius-md) - 4px)',
                background: isActive ? 'var(--color-surface-2)' : 'transparent',
                boxShadow: isActive ? '0 1px 3px rgba(36,25,23,.06)' : undefined,
                opacity: isLocked ? 0.45 : 1,
                cursor: isLocked ? 'not-allowed' : 'pointer',
                transition: 'all .2s ease',
                position: 'relative',
                textAlign: 'center',
              }}
            >
              <div style={{
                position: 'relative',
                fontSize: 20, lineHeight: 1,
              }}>
                {stage.emoji}
                {dotColor !== 'transparent' && (
                  <span style={{
                    position: 'absolute', top: -2, right: -8,
                    width: 7, height: 7, borderRadius: '50%',
                    background: dotColor,
                    border: '1.5px solid var(--color-surface-2)',
                  }} />
                )}
                {isLocked && (
                  <span style={{ position: 'absolute', top: -2, right: -8, fontSize: 10 }}>🔒</span>
                )}
              </div>
              <div style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: 9, letterSpacing: '.16em',
                color: isActive ? 'var(--color-pink-strong)' : 'var(--color-ink-3)',
                textTransform: 'uppercase',
              }}>Stage {stage.id}</div>
              <div style={{
                fontWeight: isActive ? 700 : 500,
                fontSize: 13,
                color: isActive ? 'var(--color-ink-1)' : 'var(--color-ink-2)',
                whiteSpace: 'nowrap',
              }}>{lang === 'en' ? stage.nameEn ?? stage.name : stage.name}</div>
            </button>
          );
        })}
      </div>
      </div>

      {(() => {
        const p = focusProg;
        const state: 'done' | 'current' | 'ready' | 'locked' =
          focusStageData.letters.length === 0 ? 'locked' :
          p?.completed ? 'done' :
          focusStageData.id === currentStage ? 'current' :
          'ready';
        const doneCount = p?.doneCount ?? 0;
        const pct = state === 'done' ? 100 : Math.round((doneCount / TOTAL_LESSONS_PER_STAGE) * 100);
        const fillColor =
          state === 'done' ? 'var(--color-mint-base)' :
          state === 'current' ? 'var(--color-pink-base)' :
          'var(--color-border-3)';
        const statusLabel =
          state === 'done' ? t('phonetics.overview_status_cleared', lang) :
          state === 'current' ? t('phonetics.overview_status_in_progress', lang) :
          state === 'ready' ? t('phonetics.overview_status_ready', lang) : t('phonetics.overview_status_locked', lang);
        const statusColor =
          state === 'done' ? 'var(--color-mint-strong)' :
          state === 'current' ? 'var(--color-pink-strong)' :
          'var(--color-ink-3)';
        return (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '14px 18px', marginTop: 12,
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border-2)',
            borderRadius: 'var(--radius-md)',
            flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                <span style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 17, color: 'var(--color-ink-1)' }}>{lang === 'en' ? focusStageData.nameEn ?? focusStageData.name : focusStageData.name}</span>
                <span style={{ fontSize: 11, color: 'var(--color-ink-3)' }}>{lang === 'en' ? focusStageData.descEn ?? focusStageData.desc : focusStageData.desc}</span>
              </div>
              <div style={{ height: 6, background: 'var(--color-surface-4)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: fillColor, borderRadius: 3, transition: 'width .6s ease' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--color-ink-3)' }}>{doneCount}/{TOTAL_LESSONS_PER_STAGE}</span>
              <span style={{
                fontFamily: 'ui-monospace, monospace', fontSize: 11, fontWeight: 600,
                color: statusColor,
                background: state === 'done' ? 'var(--color-mint-soft)' : state === 'current' ? 'var(--color-pink-soft)' : 'var(--color-surface-3)',
                padding: '4px 10px', borderRadius: 999,
              }}>{statusLabel}</span>
            </div>
          </div>
        );
      })()}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '28px 0 14px' }}>
        <div style={sectionNum}>2</div>
        <div style={sectionLabel}><b style={{ color: 'var(--color-ink-2)', fontWeight: 700 }}>{lang === 'en' ? focusStageData.nameEn ?? focusStageData.name : focusStageData.name}</b> · {t('phonetics.overview_section_path', lang)}</div>
      </div>

      <div className="ph-lessons" style={{ display: 'grid', gap: 12 }}>
        {([
          { key: 'letter', emoji: '📝', title: t('phonetics.result_step_letter', lang), desc: t('phonetics.overview_card_letter_desc', lang), href: `/phonetics/step/${focusStage}/letter`, done: !!focusProg?.lessons.letter },
          { key: 'write', emoji: '✏️', title: t('phonetics.result_step_write', lang), desc: t('phonetics.overview_card_write_desc', lang), href: `/phonetics/step/${focusStage}/write`, done: !!focusProg?.lessons.write },
          { key: 'quiz', emoji: '🎧', title: t('phonetics.result_step_recognize', lang), desc: t('phonetics.overview_card_quiz_desc', lang), href: `/phonetics/step/${focusStage}/quiz`, done: !!focusProg?.lessons.quiz },
          { key: 'blend', emoji: '🧩', title: t('phonetics.result_step_blend', lang), desc: t('phonetics.overview_card_blend_desc', lang), href: `/phonetics/step/${focusStage}/blend`, done: !!focusProg?.lessons.blend },
          { key: 'challenge', emoji: '🎯', title: t('phonetics.result_step_challenge', lang), desc: t('phonetics.overview_card_challenge_desc', lang), href: `/phonetics/step/${focusStage}/challenge`, done: !!focusProg?.completed, isResult: true },
        ]).map((lesson, i) => {
          const prevDone = i === 0 || ([focusProg?.lessons.letter, focusProg?.lessons.write, focusProg?.lessons.quiz, focusProg?.lessons.blend][i - 1] ?? false);
          // 挑战卡：需要前 4 步全做完才可点
          const isResultLocked = lesson.isResult && !(focusProg?.lessons.letter && focusProg.lessons.write && focusProg.lessons.quiz && focusProg.lessons.blend);
          const state: 'done' | 'current' | 'ready' | 'locked' =
            lesson.done ? 'done' :
            isResultLocked ? 'locked' :
            prevDone ? 'current' :
            'ready';

          const card = (
            <div style={{
              background: 'var(--color-surface-2)',
              border: `1.5px solid ${state === 'done' ? 'var(--color-mint-base)' : state === 'current' ? 'var(--color-pink-base)' : 'var(--color-border-2)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '18px 14px',
              opacity: state === 'locked' ? 0.55 : 1,
              cursor: state === 'locked' ? 'not-allowed' : 'pointer',
              boxShadow: state === 'current' ? '0 0 0 4px rgba(255,127,168,.12)' : undefined,
              transition: 'all .25s ease',
              position: 'relative',
              minHeight: 150,
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'serif', fontWeight: 700, fontSize: 13, marginBottom: 8,
                background:
                  state === 'done' ? 'var(--color-mint-soft)' :
                  state === 'current' ? 'var(--color-pink-soft)' :
                  state === 'ready' ? 'var(--color-surface-3)' :
                  'var(--color-surface-4)',
                color:
                  state === 'done' ? 'var(--color-mint-strong)' :
                  state === 'current' ? 'var(--color-pink-strong)' :
                  state === 'ready' ? 'var(--color-ink-2)' :
                  'var(--color-ink-4)',
              }}>{i + 1}</div>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{lesson.emoji}</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-ink-1)' }}>{lesson.title}</div>
              <div style={{ fontSize: 11, color: 'var(--color-ink-3)', marginTop: 2, flex: 1 }}>{lesson.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, color: 'var(--color-ink-3)', fontFamily: 'ui-monospace, monospace', marginTop: 8 }}>
                {state === 'done' ? (
                  <span style={{ color: 'var(--color-mint-strong)', fontWeight: 700 }}>{t('phonetics.overview_card_cleared', lang)}</span>
                ) : state === 'current' ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--color-pink-base)', animation: 'phStepPulse 1.5s infinite' }} />
                    {t('phonetics.overview_card_ready', lang)}
                  </span>
                ) : state === 'locked' ? <span>🔒</span> : <span style={{ color: 'var(--color-ink-3)' }}>{t('phonetics.overview_card_not_started', lang)}</span>}
                <span>{state === 'done' ? '✓' : lesson.isResult ? '—' : '0/1'}</span>
              </div>
            </div>
          );

          if (state === 'locked') {
            return <button key={lesson.key} type="button" onClick={() => { setToast(t('phonetics.overview_toast_finish_4_steps', lang)); setTimeout(() => setToast(null), 1800); }} style={{ all: 'unset', display: 'block' }}>{card}</button>;
          }
          return <Link key={lesson.key} href={lesson.href} style={{ display: 'block', textDecoration: 'none' }}>{card}</Link>;
        })}
      </div>

    </div>{/* /ph-step-main */}

    {/* ── 桌面专属右栏（今日目标 + 学习统计，纯功能） ── */}
    <aside className="ph-step-rail" aria-label={t('phonetics.overview_rail_aria', lang)}>
        <div className="ph-rail-fixed" style={infoCard}>
          <div style={infoTitle}>{t('phonetics.overview_today_goals', lang)}</div>
          {([
            { label: t('phonetics.overview_goal_new_letters', lang), done: !!goals?.letterToday },
            { label: t('phonetics.overview_goal_quiz', lang), done: !!goals?.quizToday },
            { label: t('phonetics.overview_goal_write', lang), done: !!goals?.writeToday },
          ]).map((goal, i, arr) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
              borderBottom: i < arr.length - 1 ? '1px solid var(--color-border-1)' : 'none',
              fontSize: 14,
              color: goal.done ? 'var(--color-ink-4)' : 'var(--color-ink-2)',
              textDecoration: goal.done ? 'line-through' : 'none',
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                background: goal.done ? 'var(--color-mint-base)' : 'transparent',
                border: `1.5px solid ${goal.done ? 'var(--color-mint-base)' : 'var(--color-border-3)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 11,
              }}>{goal.done ? '✓' : ''}</div>
              {goal.label}
            </div>
          ))}
        </div>
        <div className="ph-rail-fixed" style={infoCard}>
          <div style={infoTitle}>{t('phonetics.overview_stats_title', lang)}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Stat v={`${stat?.streak ?? 0}`} l={t('phonetics.overview_stat_streak', lang)} />
            <Stat v={`${stat?.minutesToday ?? 0}`} suffix="min" l={t('phonetics.overview_stat_minutes', lang)} />
            <Stat v={`${stat?.totalAttempts ?? 0}`} l={t('phonetics.overview_stat_attempts', lang)} />
            <Stat v={`${stat?.accuracy ?? 0}`} suffix="%" l={t('phonetics.overview_stat_accuracy', lang)} />
          </div>
        </div>
        <div className="ph-rail-grow" style={infoCard}>
          <div style={infoTitle}>{t('phonetics.overview_stage_progress_title', lang)}</div>
          <div className="ph-rail-scroll" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {PROGRESSIVE_STAGES.map((stage) => {
              const p = progress?.[stage.id];
              const state: 'done' | 'current' | 'ready' | 'locked' =
                stage.letters.length === 0 ? 'locked' :
                p?.completed ? 'done' :
                stage.id === currentStage ? 'current' : 'ready';
              const locked = state === 'locked';
              const jump = () => { if (locked) { showLockedToast(); return; } setFocusStage(stage.id); };
              return (
                <button key={stage.id} type="button" onClick={jump}
                  title={lang === 'en' ? stage.nameEn ?? stage.name : stage.name}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                    textAlign: 'left', background: 'transparent', border: 0,
                    borderRadius: 10, padding: 8, cursor: 'pointer',
                    opacity: locked ? 0.5 : 1,
                  }}>
                  <span style={{
                    flexShrink: 0, width: 30, height: 30, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
                    color: state === 'done' ? '#fff' : state === 'current' ? 'var(--color-pink-strong, #d6336c)' : 'var(--color-ink-3)',
                    background: state === 'done' ? 'var(--color-mint-base)' : state === 'current' ? 'var(--color-pink-soft)' : 'transparent',
                    border: state === 'ready' ? '1.5px dashed var(--color-border-3)' : `1.5px solid ${state === 'done' ? 'var(--color-mint-base)' : state === 'current' ? 'var(--color-pink-base)' : 'var(--color-border-3)'}`,
                  }}>{state === 'done' ? '✓' : locked ? '🔒' : stage.id}</span>
                  <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <span style={{
                      fontSize: 13.5, fontWeight: 600, color: 'var(--color-ink-1)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{lang === 'en' ? stage.nameEn ?? stage.name : stage.name}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '.04em',
                      fontFamily: 'JetBrains Mono, monospace',
                      color: state === 'done' ? 'var(--color-mint-base)' : 'var(--color-ink-3)',
                    }}>{locked ? t('phonetics.overview_rail_coming_soon', lang) : state === 'done' ? t('phonetics.overview_rail_done', lang) : t('phonetics.overview_rail_letter_count', lang, { n: stage.letters.length })}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
    </aside>{/* /ph-step-rail */}

      {toast && (
        <div style={{
          position: 'fixed', left: '50%', bottom: 'calc(100px + env(safe-area-inset-bottom, 0px))', transform: 'translateX(-50%)',
          background: 'var(--color-ink-1)', color: 'var(--color-surface-1)',
          padding: '10px 18px', borderRadius: 999, fontSize: 13, zIndex: 100,
          boxShadow: '0 4px 20px rgba(0,0,0,.2)',
        }}>{toast}</div>
      )}
    </div>
  );
}

function Stat({ v, suffix, l }: { v: string; suffix?: string; l: string }) {
  return (
    <div style={{
      textAlign: 'center', padding: '10px 6px',
      background: 'var(--color-surface-1)',
      borderRadius: 10, border: '1px solid var(--color-border-1)',
    }}>
      <div style={{ fontFamily: 'serif', fontWeight: 800, fontSize: 22, color: 'var(--color-ink-1)', lineHeight: 1 }}>
        {v}{suffix && <small style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-ink-3)' }}>{suffix}</small>}
      </div>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginTop: 4 }}>{l}</div>
    </div>
  );
}

const sectionNum: React.CSSProperties = {
  width: 26, height: 26, borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontFamily: 'serif', fontStyle: 'italic', fontWeight: 600, fontSize: 13,
  color: 'var(--color-pink-strong)',
  border: '1px solid var(--color-pink-base)',
  background: 'var(--color-pink-soft)',
};
const sectionLabel: React.CSSProperties = {
  fontFamily: 'ui-monospace, monospace', fontSize: 10,
  letterSpacing: '.2em', textTransform: 'uppercase',
  color: 'var(--color-ink-3)',
};
const infoCard: React.CSSProperties = {
  background: 'var(--color-surface-2)',
  border: '1px solid var(--color-border-2)',
  borderRadius: 'var(--radius-md)',
  padding: 20,
};
const infoTitle: React.CSSProperties = {
  fontFamily: 'serif', fontWeight: 600, fontSize: 16,
  color: 'var(--color-ink-1)', marginBottom: 12,
  paddingLeft: 12,
  borderLeft: '4px solid var(--color-pink-base)',
};
