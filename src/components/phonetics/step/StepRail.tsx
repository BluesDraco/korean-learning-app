'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock3, Grid2x2, Zap } from 'lucide-react';
import { getStage, type ProgressiveLetter } from '@/data/phonetics-progressive';
import { getAllStageProgress } from '@/lib/lesson/phoneticStepProgress';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import './step-rail.css';

export type StepKey = 'letter' | 'write' | 'quiz' | 'blend' | 'challenge';

const FLOW: { key: StepKey; labelKey: string; en: string }[] = [
  { key: 'letter',    labelKey: 'phonetics.steprail_step_letter', en: 'Letter' },
  { key: 'write',     labelKey: 'phonetics.steprail_step_write', en: 'Write' },
  { key: 'quiz',      labelKey: 'phonetics.steprail_step_quiz', en: 'Quiz' },
  { key: 'blend',     labelKey: 'phonetics.steprail_step_blend', en: 'Blend' },
  { key: 'challenge', labelKey: 'phonetics.steprail_step_challenge', en: 'Challenge' },
];

// lessons 里没有 challenge 键，闯关完成用 stage_complete 兜
const LESSON_KEY: Record<StepKey, 'letter' | 'write' | 'quiz' | 'blend' | null> = {
  letter: 'letter', write: 'write', quiz: 'quiz', blend: 'blend', challenge: null,
};

interface StepRailProps {
  [k: string]: unknown;
  stageId: number;
  current: StepKey;
  /** letter 页传入：当前字母下标 + 切换回调，令 chips 可交互 */
  letterIdx?: number;
  onPickLetter?: (idx: number) => void;
  /** 结算页：整个流程已完成，全部步骤显示为已完成、无高亮当前项 */
  completeShowcase?: boolean;
}

export function StepRail({ stageId, current, letterIdx, onPickLetter, completeShowcase }: StepRailProps) {
  const { lang } = useLang();
  const router = useRouter();
  const stage = getStage(stageId);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [stageComplete, setStageComplete] = useState(false);

  useEffect(() => {
    let alive = true;
    getAllStageProgress()
      .then((all) => {
        if (!alive) return;
        const p = all[stageId];
        if (p) { setDone(p.lessons); setStageComplete(p.completed); }
      })
      .catch(() => { /* 离线：全未完成 */ });
    return () => { alive = false; };
  }, [stageId]);

  if (!stage) return null;

  const activeLetter: ProgressiveLetter | undefined =
    letterIdx !== undefined ? stage.letters[letterIdx] : undefined;

  const isStepDone = (key: StepKey) => {
    const lk = LESSON_KEY[key];
    return lk ? Boolean(done[lk]) : stageComplete;
  };

  return (
    <aside className="sr-rail" aria-label={t('phonetics.steprail_nav_aria', lang)}>
      {/* 本阶段流程 */}
      <div className="sr-card">
        <div className="sr-card-title"><Clock3 size={13} className="sr-ico" /> {t('phonetics.steprail_flow_title', lang)}</div>
        <div className="sr-card-sub">{stage.emoji} Stage {stage.id} · {lang === 'en' ? stage.nameEn ?? stage.name : stage.name}</div>
        <nav className="sr-steps">
          {FLOW.map((s) => {
            const isCurrent = !completeShowcase && s.key === current;
            const state = completeShowcase ? 'done' : isCurrent ? 'active' : isStepDone(s.key) ? 'done' : 'todo';
            return (
              <button
                key={s.key}
                className={`sr-step ${state}`}
                aria-current={isCurrent ? 'step' : undefined}
                onClick={() => { if (!isCurrent) router.push(`/phonetics/step/${stageId}/${s.key}`); }}
              >
                <span className="sr-step-num">{state === 'done' ? '✓' : String(FLOW.indexOf(s) + 1).padStart(2, '0')}</span>
                <span className="sr-step-text">
                  <span className="sr-step-label">{t(s.labelKey, lang)}</span>
                  <span className="sr-step-en">{s.en}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* 本阶段字母 */}
      <div className="sr-card">
        <div className="sr-card-title"><Grid2x2 size={13} className="sr-ico" /> {t('phonetics.steprail_letters_title', lang)}</div>
        <div className="sr-chips">
          {stage.letters.map((l, i) => {
            const isActive = letterIdx !== undefined && i === letterIdx;
            const clickable = current === 'letter' && onPickLetter;
            const cls = `sr-chip${isActive ? ' active' : ''}${clickable ? ' tappable' : ''}`;
            return clickable ? (
              <button
                key={l.jamo}
                className={cls}
                onClick={() => onPickLetter!(i)}
                aria-label={t('phonetics.steprail_letter_aria', lang, { jamo: l.jamo }) + (isActive ? t('phonetics.steprail_letter_current', lang) : '')}
              >
                {l.jamo}
              </button>
            ) : (
              <div key={l.jamo} className={cls}>{l.jamo}</div>
            );
          })}
        </div>
      </div>

      {/* 本音速查（仅 letter 页有当前字母时显示） */}
      {activeLetter && (
        <div className="sr-card">
          <div className="sr-card-title"><Zap size={13} className="sr-ico" /> {t('phonetics.steprail_cheat_title', lang)}</div>
          <div className="sr-cheat-block">
            <div className="sr-cheat-head">{t('phonetics.steprail_cheat_pron', lang)}</div>
            <div className="sr-cheat-row"><span>{t('phonetics.steprail_cheat_roman', lang)}</span><b>{activeLetter.romanization}</b></div>
            <div className="sr-cheat-row"><span>{t('phonetics.steprail_cheat_approx', lang)}</span><span className="sr-cheat-val">{lang === 'en' ? activeLetter.cnApproxEn ?? activeLetter.cnApprox : activeLetter.cnApprox}</span></div>
            <div className="sr-cheat-row"><span>{t('phonetics.steprail_cheat_strokes', lang)}</span><b>{activeLetter.strokes.length}</b></div>
          </div>
          <div className="sr-cheat-block">
            <div className="sr-cheat-head">{t('phonetics.steprail_cheat_confuse', lang)}</div>
            <div className="sr-cheat-vs">
              <div className="sr-vs-col">
                <div className="sr-vs-k">{activeLetter.jamo}</div>
                <div className="sr-vs-r">{activeLetter.romanization}</div>
              </div>
              <span className="sr-vs-sep">vs</span>
              <div className="sr-vs-col">
                <div className="sr-vs-k">{activeLetter.confused.jamo}</div>
                <div className="sr-vs-r">{activeLetter.confused.syllable}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
