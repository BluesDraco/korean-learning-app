'use client';

import { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getStage, PROGRESSIVE_STAGES } from '@/data/phonetics-progressive';
import Confetti from '@/components/phonetics/step/Confetti';
import { StepRail } from '@/components/phonetics/step/StepRail';
import { unlockAudioContext } from '@/lib/tts';
import { playPhoneticAudio } from '@/lib/audio/phoneticsPlayer';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const TOTAL_Q = 10;

export default function ResultPage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageStr } = use(params);
  const { lang } = useLang();
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>{t('phonetics.result_loading', lang)}</div>}>
      <ResultContent stageStr={stageStr} />
    </Suspense>
  );
}

const RESULT_CSS = `
  .ph-ds-result { max-width: 560px; }
  .ph-result-card { padding: 0; }
  .ph-result-hero { padding: 32px 24px 28px; background: linear-gradient(160deg, var(--color-gold-soft, var(--color-surface-2)) 0%, var(--color-pink-soft) 60%, var(--color-surface-1) 100%); text-align: center; }
  .ph-result-hero.failed { background: linear-gradient(160deg, var(--color-pink-soft) 0%, var(--color-surface-1) 100%); }
  .ph-result-content { padding: 24px 22px 28px; }
  @media (min-width: 1024px) and (max-width: 1399px) { .ph-ds-result { max-width: 900px; } }
  /* 双栏仅在 ≥1400px 桌面启用；iPad 横屏(1024~1366)保持单栏 */
  @media (min-width: 1400px) {
    .ph-ds-result { max-width: 1080px; }
    .ph-result-card { display: grid; grid-template-columns: 1fr 1fr; gap: 0; min-height: 600px; overflow: hidden; }
    .ph-result-hero { padding: 56px 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; }
    .ph-result-content { padding: 40px 36px; display: flex; flex-direction: column; overflow-y: auto; -webkit-overflow-scrolling: touch; }
  }
  @keyframes medalDrop {
    0% { transform: translateY(-100px) rotate(-20deg); opacity: 0; }
    60% { transform: translateY(8px) rotate(5deg); }
    100% { transform: translateY(0) rotate(0); opacity: 1; }
  }
`;

function ResultContent({ stageStr }: { stageStr: string }) {
  const { lang } = useLang();
  const stageId = parseInt(stageStr, 10) || 1;
  const stage = getStage(stageId);
  const router = useRouter();
  const sp = useSearchParams();

  const finalStars = Math.min(3, Math.max(0, parseInt(sp.get('stars') || '0', 10)));
  const right = Math.max(0, parseInt(sp.get('right') || '0', 10));
  const wrong = Math.max(0, parseInt(sp.get('wrong') || '0', 10));
  const elapsedSec = Math.max(0, parseInt(sp.get('elapsed') || '0', 10));
  const passed = finalStars > 0;
  const accuracy = right + wrong > 0 ? Math.round((right / (right + wrong)) * 100) : 0;

  const [showConfetti, setShowConfetti] = useState(false);
  const [shownStars, setShownStars] = useState(0);

  useEffect(() => {
    if (!passed) return;
    setShowConfetti(true);
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= finalStars; i++) {
      timers.push(setTimeout(() => setShownStars(i), 300 + (i - 1) * 200));
    }
    return () => { timers.forEach(clearTimeout); };
  }, [passed, finalStars]);

  if (!stage) return <div style={{ padding: 24 }}>{t('phonetics.result_stage_not_found', lang)}</div>;

  const nextStage = PROGRESSIVE_STAGES.find((s) => s.id === stageId + 1);
  const nextHref = nextStage ? `/phonetics/step/${nextStage.id}/letter` : '/phonetics';
  const elapsedMin = Math.max(1, Math.round(elapsedSec / 60));

  return (
    <div className="sr-shell">
    <div className="sr-main">
    <div className="ph-ds-result" style={{ margin: '0 auto', padding: '0 16px 96px', position: 'relative' }}>
      <style>{RESULT_CSS}</style>
      {showConfetti && <Confetti />}

      <div style={{ padding: '16px 0' }}>
        <Link href="/phonetics" style={{ fontSize: 13, color: 'var(--color-ink-3)', textDecoration: 'none' }}>← {t('phonetics.result_back_to_overview', lang)}</Link>
      </div>

      <div className="ph-result-card" style={{
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border-2)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 4px 20px rgba(58,46,41,.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--color-pink-base), var(--color-peach-base), var(--color-purple-base))', zIndex: 1 }} />

        <div className={`ph-result-hero${passed ? '' : ' failed'}`}>
          <div style={{
            fontSize: 88, marginBottom: 4,
            animation: 'medalDrop .8s cubic-bezier(.16,1,.3,1) forwards',
            filter: passed ? 'none' : 'grayscale(.4)',
          }}>{passed ? '🏆' : '💪'}</div>

          <h2 style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 36, color: 'var(--color-ink-1)', lineHeight: 1.1, margin: 0 }}>
            Stage {stageId} <em style={{ fontStyle: 'italic', color: 'var(--color-pink-strong)' }}>{passed ? t('phonetics.result_passed_title', lang) : t('phonetics.result_failed_title', lang)}</em>
          </h2>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--color-ink-3)' }}>
            {t('phonetics.result_stage_label', lang)} · {lang === 'en' ? stage.nameEn ?? stage.name : stage.name}
          </div>

          {passed ? (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 18 }}>
              {[1, 2, 3].map((i) => {
                const lit = i <= shownStars;
                return (
                  <span key={i} style={{
                    fontSize: 48,
                    color: lit ? 'var(--color-gold-base)' : 'var(--color-border-2)',
                    textShadow: lit ? '0 0 20px rgba(201,168,124,.4)' : 'none',
                    transform: lit ? 'scale(1)' : 'scale(.7)',
                    opacity: lit ? 1 : 0.3,
                    transition: 'all .4s cubic-bezier(.16,1,.3,1)',
                  }}>★</span>
                );
              })}
            </div>
          ) : (
            <div style={{ fontSize: 14, color: 'var(--color-ink-2)', maxWidth: 320 }}>
              {t('phonetics.result_fail_detail', lang, { right, total: TOTAL_Q })}
            </div>
          )}
        </div>{/* /ph-result-hero */}

        <div className="ph-result-content">
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: 14 }}>
            {t('phonetics.result_stats_title', lang)}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
            {[
              { icon: '🎯', val: `${accuracy}%`, label: t('phonetics.result_stat_accuracy', lang), color: 'var(--color-mint-base)' },
              { icon: '✓', val: `${right}/${TOTAL_Q}`, label: t('phonetics.result_stat_correct', lang), color: 'var(--color-pink-base)' },
              { icon: '⏱', val: `${elapsedMin}min`, label: t('phonetics.result_stat_time', lang), color: 'var(--color-peach-base)' },
            ].map((d, i) => (
              <div key={i} style={{
                background: 'var(--color-surface-1)',
                border: '1px solid var(--color-border-1)',
                borderRadius: 14, padding: '16px 12px',
                position: 'relative', overflow: 'hidden', textAlign: 'center',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: d.color }} />
                <div style={{ fontSize: 20, marginBottom: 4, marginTop: 4 }}>{d.icon}</div>
                <div style={{ fontFamily: 'serif', fontWeight: 800, fontSize: 22, color: 'var(--color-ink-1)', lineHeight: 1 }}>{d.val}</div>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginTop: 4 }}>{d.label}</div>
              </div>
            ))}
          </div>

          {passed && (
            <div style={{
              background: 'var(--color-surface-1)',
              border: '1px solid var(--color-border-1)',
              borderRadius: 14, padding: 18, marginBottom: 20,
            }}>
              <div style={{ fontFamily: 'serif', fontWeight: 600, fontSize: 14, color: 'var(--color-ink-1)', marginBottom: 14, paddingLeft: 12, borderLeft: '4px solid var(--color-pink-base)' }}>
                {t('phonetics.result_recap_title', lang)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                {[
                  { e: '📝', l: t('phonetics.result_step_letter', lang) },
                  { e: '✏️', l: t('phonetics.result_step_write', lang) },
                  { e: '🎧', l: t('phonetics.result_step_recognize', lang) },
                  { e: '🧩', l: t('phonetics.result_step_blend', lang) },
                  { e: '🎯', l: t('phonetics.result_step_challenge', lang) },
                ].map((s, i, arr) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'var(--color-mint-soft)',
                      border: '1.5px solid var(--color-mint-base)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16,
                    }}>{s.e}</div>
                    {i < arr.length - 1 && <div style={{ width: 16, height: 2, background: 'var(--color-mint-base)', borderRadius: 1 }} />}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', marginTop: 8, gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                {[t('phonetics.result_step_letter', lang), t('phonetics.result_step_write', lang), t('phonetics.result_step_recognize', lang), t('phonetics.result_step_blend', lang), t('phonetics.result_step_challenge', lang)].map((l, i, arr) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 32, textAlign: 'center', fontFamily: 'ui-monospace, monospace', fontSize: 9, color: 'var(--color-ink-3)' }}>{l}</div>
                    {i < arr.length - 1 && <div style={{ width: 16 }} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {passed && stage.letters.length > 0 && (
            <div style={{
              background: 'var(--color-surface-1)',
              border: '1px solid var(--color-border-1)',
              borderRadius: 14, padding: 18, marginBottom: 20,
            }}>
              <div style={{ fontFamily: 'serif', fontWeight: 600, fontSize: 14, color: 'var(--color-ink-1)', marginBottom: 12, paddingLeft: 12, borderLeft: '4px solid var(--color-mint-base)' }}>
                {t('phonetics.result_relisten_title', lang)}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {stage.letters.map((l) => (
                  <button
                    key={l.jamo}
                    onClick={() => { unlockAudioContext(); playPhoneticAudio(l.syllable); }}
                    style={{
                      minWidth: 46, height: 46,
                      padding: '0 10px',
                      background: 'var(--color-surface-2)',
                      border: '1px solid var(--color-border-2)',
                      borderRadius: 12, cursor: 'pointer',
                      fontFamily: 'serif', fontWeight: 700, fontSize: 20,
                      color: 'var(--color-ink-1)',
                    }}
                    title={t('phonetics.result_play_letter_title', lang, { syl: l.syllable })}
                  >{l.jamo}</button>
                ))}
              </div>
            </div>
          )}

          {passed && nextStage && (
            <div style={{
              background: 'linear-gradient(135deg, var(--color-mint-soft), var(--color-surface-1))',
              border: '1px solid var(--color-mint-base)',
              borderRadius: 14, padding: '16px 20px', marginBottom: 20,
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{nextStage.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 15, color: 'var(--color-ink-1)' }}>
                  {nextStage.locked ? t('phonetics.result_next_stage_locked', lang) : t('phonetics.result_next_stage', lang, { name: lang === 'en' ? nextStage.nameEn ?? nextStage.name : nextStage.name })}
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-ink-3)', marginTop: 2 }}>{lang === 'en' ? nextStage.descEn ?? nextStage.desc : nextStage.desc}</div>
              </div>
              <div style={{ fontSize: 20, color: 'var(--color-mint-strong)' }}>→</div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 'auto', flexWrap: 'wrap' }}>
            <Link href="/phonetics" style={{
              padding: '12px 24px', fontSize: 15, fontWeight: 500,
              borderRadius: 12, textDecoration: 'none',
              background: 'var(--color-surface-2)', color: 'var(--color-ink-2)',
              border: '1px solid var(--color-border-2)',
            }}>{t('phonetics.result_back_to_overview', lang)}</Link>
            <button
              onClick={() => {
                setShowConfetti(false);
                router.push(passed ? nextHref : `/phonetics/step/${stageId}/challenge`);
              }}
              style={{
                padding: '12px 24px', fontSize: 15, fontWeight: 500,
                borderRadius: 12, border: 'none', cursor: 'pointer',
                background: 'var(--color-pink-base)', color: '#fff',
                boxShadow: '0 4px 14px rgba(255,127,168,.3)',
              }}
            >{passed ? t('phonetics.result_continue', lang) : t('phonetics.result_retry', lang)}</button>
          </div>
        </div>{/* /ph-result-content */}
      </div>
    </div>
    </div>
    <StepRail stageId={stageId} current="challenge" completeShowcase={passed} />
    </div>
  );
}
