'use client';

import { useState, useEffect, useCallback, useRef, use } from 'react';
import { useSmartBack } from '@/lib/useSmartBack';
import { useRouter } from 'next/navigation';
import { ArrowLeft, X, Volume2 } from 'lucide-react';
import { getStage } from '@/data/phonetics-progressive';
import { recordPhoneticStep } from '@/lib/lesson/recordPhoneticStep';
import StrokeAnimSvg from '@/components/phonetics/step/StrokeAnimSvg';
import StrokeCanvas, { type StrokeFeedback } from '@/components/phonetics/step/StrokeCanvas';
import StageErrorFallback from '@/components/phonetics/step/StageErrorFallback';
import { StepRail } from '@/components/phonetics/step/StepRail';
import { playPhoneticAudio } from '@/lib/audio/phoneticsPlayer';
import { iconBtn, btnPrimary } from '@/components/phonetics/step/shared';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

type Step = 'demo' | 'trace' | 'free';

const STEP_INFO: Record<Step, { num: number; labelKey: string }> = {
  demo: { num: 1, labelKey: 'phonetics.write_step_demo' },
  trace: { num: 2, labelKey: 'phonetics.write_step_trace' },
  free: { num: 3, labelKey: 'phonetics.write_step_free' },
};

// 现代韩语中同音的字母组：ㅚ/ㅙ/ㅞ 三个字面拼法不同、口语均读 [we]。仅用作判断是否显示提示。
const HOMOPHONE_JAMOS = new Set(['ㅚ', 'ㅙ', 'ㅞ']);

const WRITE_CSS = `
  .ph-ds-write { max-width: 640px; }
  .ph-write-card { padding: 0; }
  .ph-write-hero { padding: 20px 20px 18px; background: linear-gradient(160deg, var(--color-pink-soft) 0%, var(--color-surface-1) 60%); }
  .ph-write-content { padding: 20px 20px 24px; }
  /* 手机端：字母略缩、hero 各块压紧，避免画布掉出首屏 */
  @media (max-width: 640px) {
    .ph-write-hero { padding: 16px 16px 14px; }
    .ph-write-jamo { font-size: clamp(64px, 20vw, 96px) !important; }
    .ph-write-content { padding: 16px 16px 20px; }
    .ph-stroke-guide summary { cursor: pointer; padding: 10px 14px; font-family: ui-monospace, monospace; font-size: 10px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--color-ink-3); list-style: none; display: flex; align-items: center; justify-content: space-between; }
    .ph-stroke-guide summary::-webkit-details-marker { display: none; }
    .ph-stroke-guide summary::after { content: '▾'; transition: transform .2s; }
    .ph-stroke-guide[open] summary::after { transform: rotate(180deg); }
  }
  @media (min-width: 1024px) and (max-width: 1399px) { .ph-ds-write { max-width: 960px; } }
  /* 双栏仅在 ≥1400px 桌面启用；iPad 横屏保持单栏 */
  @media (min-width: 1400px) {
    .ph-ds-write { max-width: 1080px; }
    /* 网格行高固定：避免右侧描写 feedback 增高导致左侧字母下移 */
    .ph-write-card { display: grid; grid-template-columns: 1fr 1fr; gap: 0; height: 640px; overflow: hidden; }
    /* 左侧顶部对齐 + 独立滚动：内容不参与行高计算，字母位置稳定 */
    .ph-write-hero { padding: 48px 36px; display: flex; flex-direction: column; align-items: stretch; justify-content: flex-start; gap: 18px; overflow-y: auto; -webkit-overflow-scrolling: touch; }
    .ph-write-content { padding: 36px 32px; display: flex; flex-direction: column; overflow-y: auto; -webkit-overflow-scrolling: touch; }
  }
`;

export default function WritePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageStr } = use(params);
  const stageId = parseInt(stageStr, 10) || 1;
  const stage = getStage(stageId);
  const router = useRouter();
  const smartBack = useSmartBack('/phonetics');
  const { lang } = useLang();

  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState<Step>('demo');
  const [strokeOk, setStrokeOk] = useState(false);
  const recordedRef = useRef(false);

  const letter = stage?.letters[idx];

  useEffect(() => {
    if (step === 'free') setStrokeOk(false);
  }, [step]);

  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, [idx]);

  // 吞掉系统边缘横滑返回：写韩语横笔从屏幕左缘起笔时，iOS Safari 边缘返回 / Android 手势返回
  // 是系统级手势，touch-action / preventDefault 都拦不住，会导致「写一半退出页面」。唯一可靠手段：
  // 压一个哨兵 history 入口，书写活跃期把返回吞掉。仅在正在书写或刚写完 1.2s 内拦截；静止横滑照常返回。
  // 依赖仅为「是否在描写模式」，避免 trace↔free 切换时反复重建哨兵引发 back/push 竞态。
  const inWriteMode = step !== 'demo';
  useEffect(() => {
    if (typeof window === 'undefined' || !inWriteMode) return;
    let lastDrawEnd = 0;
    const isDrawing = () => document.body.classList.contains('stroke-drawing');
    const mo = new MutationObserver(() => {
      if (!isDrawing()) lastDrawEnd = Date.now();
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    // 压 1 个哨兵，维持「描写模式下栈顶恒为哨兵」不变式
    window.history.pushState({ phWriteGuard: true }, '');
    const onPop = () => {
      if (isDrawing() || Date.now() - lastDrawEnd < 1200) {
        window.history.pushState({ phWriteGuard: true }, '');  // 哨兵被弹→立即补回，返回被吞
      }
      // 否则：静止状态放行，哨兵已被消费，系统继续后退到真实上一页
    };
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      mo.disconnect();
      // 离开描写模式时若哨兵仍在栈顶（走 router.push 时 Next 已压新入口→state 非哨兵，不会误触发），消费掉它
      if (window.history.state?.phWriteGuard) window.history.back();
    };
  }, [inWriteMode]);

  const [feedbacks, setFeedbacks] = useState<(StrokeFeedback | undefined)[]>([]);
  const rafRef = useRef<number | null>(null);
  const pendingStrokeRef = useRef<{ count: number; feedback?: StrokeFeedback } | null>(null);

  const onStrokeChange = useCallback((count: number, feedback?: StrokeFeedback) => {
    if (!letter) return;
    pendingStrokeRef.current = { count, feedback };
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const pending = pendingStrokeRef.current;
      if (!pending) return;
      pendingStrokeRef.current = null;
      setStrokeOk(pending.count >= letter.strokes.length);
      if (pending.count === 0) {
        setFeedbacks([]);
      } else if (pending.feedback) {
        setFeedbacks((prev) => {
          const next = [...prev];
          next[pending.count - 1] = pending.feedback;
          return next;
        });
      }
    });
  }, [letter]);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  if (!stage) return <StageErrorFallback msg={t('phonetics.stage_not_found', lang)} />;
  if (!letter) return <StageErrorFallback msg={t('phonetics.stage_not_open', lang)} />;

  const total = stage.letters.length;
  const isLastLetter = idx === total - 1;

  const handleNext = async () => {
    if (step === 'demo') { setStep('trace'); return; }
    if (step === 'trace') {
      if (!strokeOk) return;
      setStep('free');
      setStrokeOk(false);
      return;
    }
    if (!strokeOk) return;
    if (!isLastLetter) {
      setIdx(idx + 1);
      setStep('demo');
      setStrokeOk(false);
      return;
    }
    if (!recordedRef.current) {
      recordedRef.current = true;
      try { await recordPhoneticStep(stageId, 'write', { studyMinutes: 3 }); } catch { /* ignore */ }
    }
    router.push(`/phonetics/step/${stageId}/quiz`);
  };

  const nextLabel =
    step === 'demo' ? t('phonetics.write_next_to_trace', lang) :
    step === 'trace' ? (strokeOk ? t('phonetics.write_next_to_free', lang) : t('phonetics.write_strokes_remaining', lang, { n: letter.strokes.length })) :
    !strokeOk ? t('phonetics.write_strokes_remaining', lang, { n: letter.strokes.length }) :
    isLastLetter ? t('phonetics.write_finish_to_quiz', lang) :
    t('phonetics.write_next_letter', lang);

  const nextDisabled = (step === 'trace' || step === 'free') && !strokeOk;

  return (
    <div className="sr-shell">
    <div className="sr-main">
    <div className="ph-ds-write" style={{ margin: '0 auto', padding: '0 16px 96px', width: '100%', boxSizing: 'border-box' }}>
      <style>{WRITE_CSS}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', gap: 12 }}>
        <button onClick={smartBack} aria-label={t('phonetics.write_back_overview', lang)} style={iconBtn}><ArrowLeft size={18} /></button>
        <div style={{ display: 'flex', gap: 6, flex: 1, justifyContent: 'center' }}>
          {Array.from({ length: total }).map((_, i) => {
            const cls = i < idx ? 'done' : i === idx ? 'current' : 'locked';
            const bg = cls === 'done' ? 'var(--color-mint-base)' : cls === 'current' ? 'var(--color-pink-base)' : 'transparent';
            const border = cls === 'locked' ? '1.5px solid var(--color-border-3)' : 'none';
            const scale = cls === 'current' ? 'scale(1.4)' : 'scale(1)';
            const shadow = cls === 'current' ? '0 0 0 4px rgba(255,127,168,.15)' : 'none';
            const label = cls === 'done' ? t('phonetics.write_dot_done', lang) : cls === 'current' ? t('phonetics.write_dot_current', lang) : t('phonetics.write_dot_locked', lang);
            return <span key={i} role="img" aria-label={t('phonetics.write_dot_aria', lang, { n: i + 1, label })} style={{ width: 10, height: 10, borderRadius: '50%', background: bg, border, transform: scale, boxShadow: shadow, transition: 'all .3s' }} />;
          })}
        </div>
        <button onClick={smartBack} aria-label={t('phonetics.write_exit', lang)} style={iconBtn}><X size={18} /></button>
      </div>

      <div className="ph-write-card" style={{
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border-2)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 4px 20px rgba(58,46,41,.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--color-pink-base), var(--color-peach-base), var(--color-purple-base))', zIndex: 1 }} />

        <div className="ph-write-hero">
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--color-pink-strong)', textAlign: 'center' }}>
            ◆ Stage {stageId} · {t('phonetics.write_counter', lang, { n: idx + 1, total, strokes: letter.strokes.length })}
          </div>

          <div style={{ textAlign: 'center' }}>
            <div className="ph-write-jamo" style={{
              fontSize: 'clamp(96px, 14vw, 140px)', fontWeight: 900, lineHeight: 1,
              color: 'var(--color-ink-1)', letterSpacing: '-.04em',
            }}>{letter.jamo}</div>
            <div style={{ marginTop: 6 }}>
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 600, fontSize: 24, color: 'var(--color-pink-strong)', lineHeight: 1 }}>{letter.romanization}</span>
            </div>
            {stageId >= 3 && stageId <= 4 && letter.syllable !== letter.jamo && (
              <div style={{ fontSize: 12, color: 'var(--color-ink-3)', marginTop: 4 }}>
                {t('phonetics.write_letter_name', lang)} <b style={{ color: 'var(--color-ink-2)', fontFamily: "'Noto Sans KR', sans-serif" }}>{letter.syllable}</b>
              </div>
            )}
            {HOMOPHONE_JAMOS.has(letter.jamo) && (
              <div style={{
                marginTop: 10, padding: '6px 12px',
                display: 'inline-block',
                background: 'color-mix(in srgb, var(--color-status-warning) 10%, var(--color-surface-2))',
                border: '1px solid color-mix(in srgb, var(--color-status-warning) 40%, transparent)',
                borderRadius: 999,
                fontSize: 11.5, lineHeight: 1.4,
                color: 'var(--color-ink-2)',
              }}>
                {t('phonetics.write_homophone_hint', lang)}
              </div>
            )}
            <button
              onClick={() => playPhoneticAudio(letter.syllable)}
              style={{
                marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 999,
                background: 'var(--color-pink-soft)',
                border: '1px solid var(--color-pink-base)',
                color: 'var(--color-pink-strong)',
                fontSize: 13, fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Volume2 size={14} /> {stageId >= 3 && stageId <= 4 ? t('phonetics.write_listen_letter_name', lang) : t('phonetics.write_listen_pronunciation', lang)}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '4px 0', flexWrap: 'wrap' }}>
            {(['demo', 'trace', 'free'] as Step[]).map((s, i, arr) => {
              const info = STEP_INFO[s];
              const order: Record<Step, number> = { demo: 0, trace: 1, free: 2 };
              const state = order[s] < order[step] ? 'done' : s === step ? 'active' : 'pending';
              const markerBg = state === 'done' ? 'var(--color-mint-base)' : state === 'active' ? 'var(--color-pink-base)' : 'var(--color-surface-2)';
              const markerColor = state === 'pending' ? 'var(--color-ink-4)' : '#fff';
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'serif', fontWeight: 600, fontSize: 12,
                      background: markerBg, color: markerColor,
                      border: state === 'pending' ? '1.5px solid var(--color-border-2)' : 'none',
                      boxShadow: state === 'active' ? '0 0 0 4px rgba(255,127,168,.15)' : 'none',
                      transition: 'all .3s',
                    }}>
                      {state === 'done' ? '✓' : info.num}
                    </div>
                    <span style={{
                      color: state === 'done' ? 'var(--color-mint-strong)' : state === 'active' ? 'var(--color-pink-strong)' : 'var(--color-ink-3)',
                      fontWeight: state === 'active' ? 700 : 400,
                    }}>{t(info.labelKey, lang)}</span>
                  </div>
                  {i < arr.length - 1 && <div style={{ width: 18, height: 1, background: 'var(--color-border-2)' }} />}
                </div>
              );
            })}
          </div>

          <details className="ph-stroke-guide" open style={{
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border-1)',
            borderRadius: 12,
          }}>
            <summary style={{ padding: '14px 16px 10px', fontFamily: 'ui-monospace, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-ink-3)' }}>
              {t('phonetics.write_stroke_guide', lang)}
            </summary>
            <div style={{ padding: '0 16px 14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(108px, 1fr))', gap: 8 }}>
                {letter.strokes.map((s, i) => {
                  const active = step !== 'demo';
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '7px 10px', borderRadius: 10,
                      background: 'var(--color-surface-1)',
                      border: `1px solid ${active ? 'var(--color-pink-base)' : 'var(--color-border-1)'}`,
                    }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'serif', fontSize: 12, fontWeight: 700,
                        background: active ? 'var(--color-pink-base)' : 'var(--color-border-1)',
                        color: active ? '#fff' : 'var(--color-ink-3)', flexShrink: 0,
                      }}>{i + 1}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--color-ink-1)', lineHeight: 1.4, minWidth: 0 }}>{lang === 'en' ? s.hintEn ?? s.hint : s.hint}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </details>
        </div>{/* /ph-write-hero */}

        <div className="ph-write-content">
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: 12 }}>
            {t('phonetics.write_practice_label', lang)}
          </div>

          {step === 'demo' ? (
            <div style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border-2)',
              borderRadius: 'var(--radius-md)',
              padding: 24, textAlign: 'center',
            }}>
              <StrokeAnimSvg key={`${idx}-demo`} strokes={letter.strokes} ghostChar={letter.jamo} />
            </div>
          ) : (
            <>
              <StrokeCanvas
                key={`${idx}-${step}`}
                targetStrokeCount={letter.strokes.length}
                ghostChar={step === 'trace' ? letter.jamo : undefined}
                idealStrokes={letter.strokes}
                onStrokeChange={onStrokeChange}
              />
              {feedbacks.length > 0 && (
                <div style={{
                  margin: '10px auto 0',
                  display: 'flex', flexDirection: 'column', gap: 6,
                }}>
                  {feedbacks.map((f, i) => {
                    if (!f) return null;
                    const color = f.kind === 'ok' ? 'var(--color-mint-strong)' :
                      f.kind === 'shape' ? 'var(--color-status-warning)' : 'var(--color-pink-strong)';
                    const icon = f.kind === 'ok' ? '✓' : '⚠';
                    const text = f.kind === 'ok' ? t('phonetics.write_fb_ok', lang, { n: i + 1 }) :
                      f.kind === 'shape' ? t('phonetics.write_fb_shape', lang, { n: i + 1 }) :
                      t('phonetics.write_fb_order', lang, { n: i + 1, actual: f.actual + 1 });
                    return (
                      <div key={i} style={{
                        fontFamily: 'ui-monospace, monospace', fontSize: 11,
                        color, padding: '4px 12px',
                        background: 'var(--color-surface-2)',
                        border: `1px solid ${color}`,
                        borderRadius: 8,
                      }}>{icon} {text}</div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          <div style={{
            marginTop: 18, padding: 14,
            background: 'var(--color-surface-1)',
            border: '1px solid var(--color-border-1)',
            borderRadius: 12,
            display: 'grid', gap: 8,
          }}>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-ink-3)' }}>
              {t('phonetics.write_tips_label', lang)}
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--color-ink-1)', lineHeight: 1.55 }}>
              <b style={{ color: 'var(--color-pink-strong)' }}>{t('phonetics.write_tip_order_label', lang)}</b>{t('phonetics.write_colon', lang)}{t('phonetics.write_tip_order_body', lang)}
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--color-ink-1)', lineHeight: 1.55 }}>
              <b style={{ color: 'var(--color-pink-strong)' }}>{t('phonetics.write_tip_ratio_label', lang)}</b>{t('phonetics.write_colon', lang)}{t('phonetics.write_tip_ratio_body', lang)}
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--color-ink-1)', lineHeight: 1.55 }}>
              <b style={{ color: 'var(--color-pink-strong)' }}>{t('phonetics.write_tip_memory_label', lang)}</b>{t('phonetics.write_colon', lang)}{lang === 'en' ? letter.mnemonicEn ?? letter.mnemonic : letter.mnemonic}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20, flexDirection: 'column', alignItems: 'center' }}>
            <button onClick={handleNext} disabled={nextDisabled} style={{
              ...btnPrimary,
              cursor: nextDisabled ? 'not-allowed' : 'pointer',
              background: nextDisabled ? 'var(--color-border-2)' : 'var(--color-pink-base)',
              opacity: nextDisabled ? 0.7 : 1,
              boxShadow: nextDisabled ? 'none' : '0 4px 14px rgba(255,127,168,.3)',
              width: '100%',
            }}>{nextLabel}</button>
            {nextDisabled && (
              <button onClick={() => {
                // 跳过当前字母的书写 → 进入下一个或完成
                if (!isLastLetter) { setIdx(idx + 1); setStep('demo'); setStrokeOk(false); }
                else {
                  if (!recordedRef.current) {
                    recordedRef.current = true;
                    recordPhoneticStep(stageId, 'write', { studyMinutes: 1 }).catch(() => {});
                  }
                  router.push(`/phonetics/step/${stageId}/quiz`);
                }
              }} style={{
                padding: '10px 24px', fontSize: 13, fontWeight: 500, borderRadius: 12,
                border: '1px solid var(--color-border-2)',
                background: 'var(--color-surface-2)',
                color: 'var(--color-ink-3)', cursor: 'pointer',
              }}>
                {isLastLetter ? t('phonetics.write_skip_to_quiz', lang) : t('phonetics.write_skip_to_next', lang)}
              </button>
            )}
          </div>
        </div>{/* /ph-write-content */}
      </div>
    </div>
    </div>
    <StepRail stageId={stageId} current="write" />
    </div>
  );
}
