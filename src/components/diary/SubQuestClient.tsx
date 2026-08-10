'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Volume2, RotateCcw, ArrowRight, Star, ChevronLeft, BookOpen, X, Check, RefreshCcw, Eye, EyeOff, PencilLine, Keyboard } from 'lucide-react';
import type { ToriLevel } from '@/types/tori-diary';
import type {
  VocabSubQuestData,
  VocabEncounterCard,
  VocabRecognizeTask,
  VocabSpellTask,
  VocabWriteTask,
  VocabDictationTask,
  ToriSubQuestProgress,
  ToriSubQuestStars,
} from '@/types/tori-subquest';
import StrokeCanvas from '@/components/phonetics/step/StrokeCanvas';
import { KeyboardHint } from '@/components/practice/KeyboardHint';
import { normalizeKorean } from '@/lib/koreanDiff';
import { buildSyllableIdealStrokes, countSyllableStrokes } from '@/lib/phonetics/syllableStrokes';
import { speak, prefetchAudio, unlockAudioContext } from '@/lib/tts';
import { sfxCorrect, sfxWrong, sfxPop, sfxChime, sfxCelebration } from '@/lib/sfx';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/useToast';
import { hasSubQuest } from '@/data/diary/subquests';
import { getDay } from '@/data/diary';
import { CarrotHelper } from '@/components/diary/CarrotHelper';
import { CarrotHUD, PhaseDot, Confetti, starsFromScore, type AnswerLog } from '@/components/diary/SubQuestShared';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

type PhaseKind = 'encounter' | 'write' | 'recognize' | 'spell' | 'dictation' | 'phaseRecap' | 'result' | 'freePractice';
type CorePhase = Exclude<PhaseKind, 'phaseRecap' | 'result' | 'freePractice'>;

const PHASE_ORDER: CorePhase[] = ['encounter', 'write', 'recognize', 'spell', 'dictation'];

const PHASE_LABEL_KEYS: Record<CorePhase, string> = {
  encounter: 'diary.sqc.phase_encounter',
  write: 'diary.sqc.phase_write',
  recognize: 'diary.sqc.phase_recognize',
  spell: 'diary.sqc.phase_spell',
  dictation: 'diary.sqc.phase_dictation',
};

const PHASE_ENGLISH: Record<CorePhase, string> = {
  encounter: 'ENCOUNTER',
  write: 'WRITE',
  recognize: 'RECOGNIZE',
  spell: 'SPELL',
  dictation: 'DICTATION',
};

const PHASE_HINT_KEYS: Record<CorePhase, string> = {
  encounter: 'diary.sqc.hint_encounter',
  write: 'diary.sqc.hint_write',
  recognize: 'diary.sqc.hint_recognize',
  spell: 'diary.sqc.hint_spell',
  dictation: 'diary.sqc.hint_dictation',
};

const PHASE_ICONS: Record<CorePhase, string> = {
  encounter: '📖',
  write: '✍️',
  recognize: '🎯',
  spell: '🧩',
  dictation: '👂',
};

const XP_PER_TASK = 5;

interface Props {
  [k: string]: unknown;
  data: VocabSubQuestData;
  level: ToriLevel;
  day: number;
}

export function SubQuestClient({ data, level, day }: Props) {
  const router = useRouter();
  const { lang } = useLang();
  const { user } = useAuth();
  const { showToast } = useToast();
  const isAdmin = user?.role === 'admin';

  const [phase, setPhase] = useState<PhaseKind>('encounter');
  const [justFinishedPhase, setJustFinishedPhase] = useState<CorePhase | null>(null);
  const [phaseWrongMap, setPhaseWrongMap] = useState<Record<CorePhase, number>>({
    encounter: 0, write: 0, recognize: 0, spell: 0, dictation: 0,
  });
  const [phaseAnswerLog, setPhaseAnswerLog] = useState<Record<CorePhase, AnswerLog[]>>({
    encounter: [], write: [], recognize: [], spell: [], dictation: [],
  });
  const [wrongCount, setWrongCount] = useState(0);
  const [xp, setXp] = useState(0);
  const [carrots, setCarrots] = useState(3);
  const [startTs] = useState(() => Date.now());
  const [isDark, setIsDark] = useState(false);
  const [showWordbook, setShowWordbook] = useState(false);
  const [phaseKey, setPhaseKey] = useState(0); // 用于"从头来"强制重挂载 Phase 组件
  const [enteredFromFree, setEnteredFromFree] = useState(false); // 当前 phase 是否从自由练习进入

  // 主 Day 数据（喂给 CarrotHelper）
  const dayData = useMemo(() => getDay(level, day), [level, day]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const check = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    data.encounter.forEach((c) => {
      if (cancelled) return;
      prefetchAudio(c.korean).catch(() => {});
    });
    return () => { cancelled = true; };
  }, [data.encounter]);

  const currentCoreIdx = useMemo(() => {
    if (phase === 'result' || phase === 'freePractice') return PHASE_ORDER.length;
    if (phase === 'phaseRecap' && justFinishedPhase) return PHASE_ORDER.indexOf(justFinishedPhase) + 1;
    return PHASE_ORDER.indexOf(phase as CorePhase);
  }, [phase, justFinishedPhase]);

  // Phase 完成 → 内嵌小结
  const handlePhaseComplete = useCallback((phaseWrong: number, answerLog: AnswerLog[]) => {
    const cur = phase as CorePhase;
    setWrongCount((w) => w + phaseWrong);
    const total = getPhaseTaskCount(data, cur);
    const earned = Math.max(0, (total - phaseWrong) * XP_PER_TASK);
    setXp((x) => x + earned);
    if (phaseWrong > 0) {
      setCarrots((c) => Math.max(0, c - Math.min(phaseWrong, 1)));
    }
    setPhaseWrongMap((prev) => ({ ...prev, [cur]: phaseWrong }));
    setPhaseAnswerLog((prev) => ({ ...prev, [cur]: answerLog }));
    setJustFinishedPhase(cur);
    setPhase('phaseRecap');
  }, [phase, data]);

  // 用户点"下一段"
  const handleContinueFromRecap = useCallback(() => {
    if (!justFinishedPhase) return;
    const idx = PHASE_ORDER.indexOf(justFinishedPhase);
    sfxPop();
    if (idx < 0 || idx >= PHASE_ORDER.length - 1) {
      setPhase('result');
    } else {
      setPhase(PHASE_ORDER[idx + 1]);
    }
    setJustFinishedPhase(null);
  }, [justFinishedPhase]);

  // 用户点"从头来" → 只重刷本段
  const handleRedoPhase = useCallback(() => {
    if (!justFinishedPhase) return;
    const target = justFinishedPhase;
    // 归零本段的错题和答题记录
    const priorWrong = phaseWrongMap[target] ?? 0;
    setWrongCount((w) => Math.max(0, w - priorWrong));
    setPhaseWrongMap((prev) => ({ ...prev, [target]: 0 }));
    setPhaseAnswerLog((prev) => ({ ...prev, [target]: [] }));
    // 归还这一段的 XP（先扣掉之前给的）
    const total = getPhaseTaskCount(data, target);
    const prevEarned = Math.max(0, (total - priorWrong) * XP_PER_TASK);
    setXp((x) => Math.max(0, x - prevEarned));
    // 归还胡萝卜（如果之前扣过）
    if (priorWrong > 0) {
      setCarrots((c) => Math.min(3, c + 1));
    }
    setJustFinishedPhase(null);
    setPhase(target);
    setPhaseKey((k) => k + 1); // 强制重挂载 Phase 组件
    sfxPop();
  }, [justFinishedPhase, phaseWrongMap, data]);

  // 自由练习：跳到指定 phase
  const handleFreePracticeGo = useCallback((target: CorePhase) => {
    setPhaseWrongMap((prev) => ({ ...prev, [target]: 0 }));
    setPhaseAnswerLog((prev) => ({ ...prev, [target]: [] }));
    setJustFinishedPhase(null);
    setEnteredFromFree(true);
    setPhase(target);
    setPhaseKey((k) => k + 1);
    sfxPop();
  }, []);

  // Admin 跳段：直接跳到任意 phase（不进入自由模式，保留主流程进度）
  const handleAdminJump = useCallback((target: PhaseKind) => {
    if (!isAdmin) return;
    setJustFinishedPhase(null);
    setEnteredFromFree(false);
    setPhase(target);
    setPhaseKey((k) => k + 1);
    sfxPop();
  }, [isAdmin]);

  // 跳过当前 phase：本段全部题目计为未通过（否则跳过全部即可零学习拿满星）
  const handleSkipPhase = useCallback(() => {
    if (phase === 'result' || phase === 'phaseRecap' || phase === 'freePractice') return;
    const cur = phase as CorePhase;
    const skippedTasks = getPhaseTaskCount(data, cur);
    setWrongCount((w) => w + skippedTasks);
    setPhaseWrongMap((prev) => ({ ...prev, [cur]: skippedTasks }));
    setPhaseAnswerLog((prev) => ({ ...prev, [cur]: [] }));
    setJustFinishedPhase(cur);
    setPhase('phaseRecap');
    sfxPop();
  }, [phase, data]);

  // 自由练习完成一段 → 回自由练习入口
  const handleFreePracticeReturnHome = useCallback(() => {
    setJustFinishedPhase(null);
    setEnteredFromFree(false);
    setPhase('freePractice');
    sfxPop();
  }, []);

  const persistResult = useCallback(async (finalWrong: number, stars: ToriSubQuestStars): Promise<boolean> => {
    if (!user) {
      showToast(t('diary.sqc.toast_not_logged_in', lang), 'info');
      return false;
    }
    const id = `${user.id}-${level}-${day}-${data.idx}`;
    try {
      const existing = await db.toriSubQuestProgress.get(id) as ToriSubQuestProgress | undefined;
      const now = Date.now();
      const bestStars: ToriSubQuestStars = existing ? (Math.max(existing.stars, stars) as ToriSubQuestStars) : stars;
      const record: ToriSubQuestProgress = {
        id, userId: user.id, level, day,
        idx: data.idx, kind: data.kind,
        stars: bestStars,
        wrongCount: finalWrong,
        attempts: (existing?.attempts ?? 0) + 1,
        firstClearedAt: existing?.firstClearedAt ?? (stars >= 1 ? now : undefined),
        updatedAt: now,
      };
      await db.toriSubQuestProgress.put(record);
      return true;
    } catch (err) {
      console.error('[subquest] persist failed', err);
      showToast(t('diary.sqc.toast_save_failed', lang), 'error');
      return false;
    }
  }, [user, level, day, data.idx, data.kind, showToast, lang]);

  const currentTitle =
    phase === 'result' ? t('diary.sqc.title_result', lang)
    : phase === 'freePractice' ? t('diary.sqc.title_free_practice', lang)
    : phase === 'phaseRecap' && justFinishedPhase ? `${t(PHASE_LABEL_KEYS[justFinishedPhase], lang)} · ${t('diary.sqc.recap_suffix', lang)}`
    : t(PHASE_LABEL_KEYS[phase as CorePhase], lang);

  const isFreeMode = phase === 'freePractice' || enteredFromFree;

  return (
    <div
      className={`diary-compare subquest-root ${isDark ? 'D' : 'L'}`}
      style={{ position: 'fixed', inset: 0, zIndex: 100 }}
    >
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden>
        <defs>
          <linearGradient id="subquestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB3C6" />
            <stop offset="50%" stopColor="#C8995B" />
            <stop offset="100%" stopColor="#C14E3A" />
          </linearGradient>
        </defs>
      </svg>

      {/* ═══════════════════ 手机端 ═══════════════════ */}
      <div className="phone">
        <div className="topbar">
          <button className="topbar-back" onClick={() => { sfxPop(); router.push('/diary'); }} aria-label={t('diary.sqc.aria_back', lang)}>
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button className="topbar-home" onClick={() => { sfxPop(); router.push(`/diary/${level}/${day}`); }}>{t('diary.sqc.main_day', lang)}</button>
          <button className="topbar-home" onClick={() => { sfxPop(); router.push('/daily'); }} aria-label={t('diary.sqc.aria_back_home', lang)} style={{ background: 'linear-gradient(135deg,#ff8fab,#ff6b8f)', color: '#fff', borderColor: '#ff6b8f', fontWeight: 700 }}>🏠 {t('diary.sqc.home', lang)}</button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="topbar-day">Day {day} · 1-1 · {data.koTitle}</div>
            <div className="topbar-step">
              {phase === 'result' ? `★ ${t('diary.sqc.title_result', lang)}` :
               phase === 'freePractice' ? t('diary.sqc.title_free_practice', lang) :
               phase === 'phaseRecap' && justFinishedPhase ? `${t(PHASE_LABEL_KEYS[justFinishedPhase], lang)} · ${t('diary.sqc.recap_suffix', lang)}` :
               t('diary.sqc.step_progress', lang, { cur: currentCoreIdx + 1, total: PHASE_ORDER.length, label: t(PHASE_LABEL_KEYS[phase as CorePhase], lang) })}
            </div>
          </div>
          <button
            className="subquest-wordbook-btn"
            onClick={() => { sfxPop(); setShowWordbook(true); }}
            aria-label={t('diary.sqc.wordbook_review', lang)}
            title={t('diary.sqc.wordbook_review', lang)}
          >
            <BookOpen size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="subquest-hud">
          <CarrotHUD carrots={carrots} xp={xp} />
        </div>

        <div className="scroll" style={{ padding: '0 0 calc(72px + env(safe-area-inset-bottom, 0px))' }}>
          <div className="subquest-phase-dots">
            {PHASE_ORDER.map((p, i) => (
              <div
                key={p}
                onClick={isAdmin ? () => handleAdminJump(p) : undefined}
                style={isAdmin ? { cursor: 'pointer' } : undefined}
                title={isAdmin ? t('diary.sqc.jump_to', lang, { label: t(PHASE_LABEL_KEYS[p], lang) }) : undefined}
              >
                <PhaseDot
                  index={i + 1}
                  label={t(PHASE_LABEL_KEYS[p], lang)}
                  done={i < currentCoreIdx && phase !== 'freePractice'}
                  current={phase !== 'result' && phase !== 'phaseRecap' && phase !== 'freePractice' && p === phase}
                />
              </div>
            ))}
          </div>

          <div className="card">
            <span className="tape tape-tl" />
            <span className="tape tape-tr" />
            <span className="tag">{currentTitle}</span>
            {phase !== 'result' && phase !== 'phaseRecap' && phase !== 'freePractice' && (
              <button
                onClick={handleSkipPhase}
                title={t('diary.sqc.skip_phase', lang)}
                style={{
                  position: 'absolute', top: 12, right: 12, zIndex: 2,
                  padding: '4px 10px', fontSize: 11,
                  border: '1px solid var(--line)', borderRadius: 999,
                  background: 'var(--paper)', color: 'var(--ink-3)',
                  cursor: 'pointer',
                }}
              >
                {t('diary.sqc.skip', lang)} →
              </button>
            )}
            <div key={`phone-${phase}-${phaseKey}`} className="diary-anim-fade-up">
              <PhaseContent
                phase={phase}
                justFinishedPhase={justFinishedPhase}
                phaseWrongMap={phaseWrongMap}
                phaseAnswerLog={phaseAnswerLog}
                data={data}
                onPhaseComplete={handlePhaseComplete}
                onContinueFromRecap={handleContinueFromRecap}
                onRedoPhase={handleRedoPhase}
                onFreePracticeGo={handleFreePracticeGo}
                onFreePracticeReturnHome={handleFreePracticeReturnHome}
                isFreePractice={isFreeMode}
                wrongCount={wrongCount}
                elapsedMs={Date.now() - startTs}
                level={level}
                day={day}
                onPersist={persistResult}
                onRetry={() => window.location.reload()}
                onBack={() => router.push('/diary')}
                onNextSub={() => {
                  if (hasSubQuest(level, day, 2)) {
                    router.push(`/diary/${level}/${day}/2`);
                  } else {
                    showToast(t('diary.sqc.toast_listening_wip', lang), 'info');
                    router.push('/diary');
                  }
                }}
                onEnterFreePractice={() => { setEnteredFromFree(true); setPhase('freePractice'); sfxPop(); }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════ 桌面端 ═══════════════════ */}
      <div className="desktop">
        <div className="desk-side">
          <div className="desk-side-nav">
            <button className="desk-side-back" onClick={() => { sfxPop(); router.push('/diary'); }}>← {t('diary.sqc.back_to_diary', lang)}</button>
            <button className="desk-side-home" onClick={() => { sfxPop(); router.push(`/diary/${level}/${day}`); }} style={{ background: 'var(--paper-deep)', color: 'var(--ink-3)', border: '1px solid var(--line)', padding: '4px 12px', fontSize: 13, fontWeight: 400, boxShadow: 'none' }}>{t('diary.sqc.main_day', lang)}</button>
            <button className="desk-side-home" onClick={() => { sfxPop(); router.push('/daily'); }} aria-label={t('diary.sqc.aria_back_home', lang)}>🏠 {t('diary.sqc.back_home', lang)}</button>
          </div>

          <div className="subquest-desk-side">
            <div>
              <div className="desk-side-day" style={{ fontSize: 22 }}>Day {day} · 1-1</div>
              <div className="subquest-desk-side-title">{data.koTitle}</div>
              <div className="subquest-desk-side-sub">{data.subtitle}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CarrotHUD carrots={carrots} xp={xp} />
            </div>

            <div className="subquest-desk-phase-list">
              {PHASE_ORDER.map((p, i) => {
                const done = i < currentCoreIdx && phase !== 'freePractice';
                const cur = phase !== 'result' && phase !== 'phaseRecap' && phase !== 'freePractice' && p === phase;
                return (
                  <div
                    key={p}
                    className={`subquest-desk-phase-row${done ? ' is-done' : ''}${cur ? ' is-current' : ''}`}
                    onClick={isAdmin ? () => handleAdminJump(p) : undefined}
                    style={isAdmin ? { cursor: 'pointer' } : undefined}
                    title={isAdmin ? t('diary.sqc.jump_to', lang, { label: t(PHASE_LABEL_KEYS[p], lang) }) : undefined}
                  >
                    <span className="subquest-desk-phase-num">{done ? '✓' : i + 1}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div>{t(PHASE_LABEL_KEYS[p], lang)}</div>
                      <div style={{ fontSize: 10, letterSpacing: '.1em', color: 'var(--ink-3)', textTransform: 'uppercase', marginTop: 2 }}>
                        {PHASE_ENGLISH[p]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="subquest-wordbook-btn"
              style={{ width: '100%', height: 40 }}
              onClick={() => { sfxPop(); setShowWordbook(true); }}
              aria-label={t('diary.sqc.wordbook_review', lang)}
            >
              <BookOpen size={16} strokeWidth={2} />
              <span style={{ marginLeft: 8, fontSize: 13 }}>{t('diary.sqc.wordbook_review_n', lang, { n: data.encounter.length })}</span>
            </button>
          </div>
        </div>

        <div className="desk-main">
          <div className="desk-eyebrow">Day {day} · {t('diary.sqc.vocab_challenge', lang)} · {data.koTitle}</div>
          <div className="desk-main-h">
            {phase === 'result' ? `★ ${t('diary.sqc.title_result', lang)}` :
             phase === 'freePractice' ? t('diary.sqc.free_practice_pick', lang) :
             phase === 'phaseRecap' && justFinishedPhase ? `${t(PHASE_LABEL_KEYS[justFinishedPhase], lang)} · ${t('diary.sqc.recap_suffix', lang)}` :
             `${t(PHASE_LABEL_KEYS[phase as CorePhase], lang)} · Phase ${currentCoreIdx + 1}`}
          </div>
          <div className="desk-meta">
            <span>🎯 {phase === 'phaseRecap' ? t('diary.sqc.meta_just_finished', lang) :
                        phase === 'freePractice' ? t('diary.sqc.meta_pick_any', lang) :
                        phase === 'result' ? t('diary.sqc.meta_quest_end', lang) :
                        t(PHASE_HINT_KEYS[phase as CorePhase], lang)}</span>
            <span>🥕 {t('diary.sqc.carrots_left', lang, { n: carrots })}</span>
          </div>

          <div className="desk-content-grid">
            <div className="desk-col-left">
              <div className="card" style={{ margin: 0, position: 'relative' }}>
                <span className="tape tape-tl" />
                <span className="tape tape-tr" />
                <span className="tag">{currentTitle}</span>
                {phase !== 'result' && phase !== 'phaseRecap' && phase !== 'freePractice' && (
                  <button
                    onClick={handleSkipPhase}
                    title={t('diary.sqc.skip_phase', lang)}
                    style={{
                      position: 'absolute', top: 14, right: 14, zIndex: 2,
                      padding: '5px 12px', fontSize: 12,
                      border: '1px solid var(--line)', borderRadius: 999,
                      background: 'var(--paper)', color: 'var(--ink-3)',
                      cursor: 'pointer',
                    }}
                  >
                    {t('diary.sqc.skip', lang)} →
                  </button>
                )}
                <div key={`desk-${phase}-${phaseKey}`} className="diary-anim-fade-up">
                  <PhaseContent
                    phase={phase}
                    justFinishedPhase={justFinishedPhase}
                    phaseWrongMap={phaseWrongMap}
                    phaseAnswerLog={phaseAnswerLog}
                    data={data}
                    onPhaseComplete={handlePhaseComplete}
                    onContinueFromRecap={handleContinueFromRecap}
                    onRedoPhase={handleRedoPhase}
                    onFreePracticeGo={handleFreePracticeGo}
                    onFreePracticeReturnHome={handleFreePracticeReturnHome}
                    isFreePractice={isFreeMode}
                    wrongCount={wrongCount}
                    elapsedMs={Date.now() - startTs}
                    level={level}
                    day={day}
                    onPersist={persistResult}
                    onRetry={() => window.location.reload()}
                    onBack={() => router.push('/diary')}
                    onNextSub={() => {
                      if (hasSubQuest(level, day, 2)) {
                        router.push(`/diary/${level}/${day}/2`);
                      } else {
                        showToast(t('diary.sqc.toast_listening_wip', lang), 'info');
                        router.push('/diary');
                      }
                    }}
                    onEnterFreePractice={() => { setEnteredFromFree(true); setPhase('freePractice'); sfxPop(); }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 勇气胡萝卜 AI · 浮动按钮（手机+桌面通用），桌面右栏按钮 dispatch openCarrot 打开它 */}
      {dayData && <CarrotHelper day={dayData} currentModule="output" />}

      {showWordbook && (
        <WordbookDrawer
          words={data.encounter}
          onClose={() => { sfxPop(); setShowWordbook(false); }}
        />
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// PhaseContent 分派
// ═════════════════════════════════════════════════════════

interface PhaseContentProps {
  [k: string]: unknown;
  phase: PhaseKind;
  justFinishedPhase: CorePhase | null;
  phaseWrongMap: Record<CorePhase, number>;
  phaseAnswerLog: Record<CorePhase, AnswerLog[]>;
  data: VocabSubQuestData;
  onPhaseComplete: (wrong: number, answerLog: AnswerLog[]) => void;
  onContinueFromRecap: () => void;
  onRedoPhase: () => void;
  onFreePracticeGo: (target: CorePhase) => void;
  onFreePracticeReturnHome: () => void;
  isFreePractice: boolean;
  wrongCount: number;
  elapsedMs: number;
  level: ToriLevel;
  day: number;
  onPersist: (wrong: number, stars: ToriSubQuestStars) => Promise<boolean>;
  onRetry: () => void;
  onBack: () => void;
  onNextSub: () => void;
  onEnterFreePractice: () => void;
}

function PhaseContent(p: PhaseContentProps) {
  // 5.1 数据缺失兜底：任何一段 tasks 为空数组或 undefined，直接跳过（避免下游崩溃）
  const skipIfEmpty = (arr: unknown[] | undefined, onSkip: () => void) => {
    if (!arr || arr.length === 0) {
      queueMicrotask(onSkip);
      return true;
    }
    return false;
  };

  switch (p.phase) {
    case 'encounter':
      if (skipIfEmpty(p.data.encounter, () => p.onPhaseComplete(0, []))) return <PhaseSkipping />;
      return <EncounterPhase cards={p.data.encounter} onDone={(log) => p.onPhaseComplete(0, log)} />;
    case 'write':
      if (skipIfEmpty(p.data.write, () => p.onPhaseComplete(0, []))) return <PhaseSkipping />;
      return <WritePhase tasks={p.data.write} onDone={(log) => p.onPhaseComplete(0, log)} />;
    case 'recognize':
      if (skipIfEmpty(p.data.recognize, () => p.onPhaseComplete(0, []))) return <PhaseSkipping />;
      return <RecognizePhase tasks={p.data.recognize} onDone={(w, log) => p.onPhaseComplete(w, log)} />;
    case 'spell':
      if (skipIfEmpty(p.data.spell, () => p.onPhaseComplete(0, []))) return <PhaseSkipping />;
      return <SpellPhase tasks={p.data.spell} onDone={(w, log) => p.onPhaseComplete(w, log)} />;
    case 'dictation':
      if (skipIfEmpty(p.data.dictation, () => p.onPhaseComplete(0, []))) return <PhaseSkipping />;
      return <DictationPhase tasks={p.data.dictation} onDone={(log) => p.onPhaseComplete(0, log)} />;
    case 'phaseRecap':
      if (!p.justFinishedPhase) return null;
      return <PhaseRecap
        finishedPhase={p.justFinishedPhase}
        wrong={p.phaseWrongMap[p.justFinishedPhase]}
        totalTasks={getPhaseTaskCount(p.data, p.justFinishedPhase)}
        isLast={PHASE_ORDER.indexOf(p.justFinishedPhase) === PHASE_ORDER.length - 1}
        encounterCards={p.data.encounter}
        answerLog={p.phaseAnswerLog[p.justFinishedPhase]}
        isFreePractice={p.isFreePractice}
        onContinue={p.onContinueFromRecap}
        onRedoPhase={p.onRedoPhase}
        onReturnToFreeHome={p.onFreePracticeReturnHome}
      />;
    case 'result':
      return <ResultPhase
        wrongCount={p.wrongCount} elapsedMs={p.elapsedMs}
        total={PHASE_ORDER.reduce((sum, ph) => sum + getPhaseTaskCount(p.data, ph), 0)}
        level={p.level} day={p.day}
        onPersist={p.onPersist}
        onRetry={p.onRetry} onBack={p.onBack} onNextSub={p.onNextSub}
        onEnterFreePractice={p.onEnterFreePractice}
      />;
    case 'freePractice':
      return <FreePracticeHome
        data={p.data}
        onGo={p.onFreePracticeGo}
        onBack={p.onBack}
      />;
    default:
      return null;
  }
}

function getPhaseTaskCount(data: VocabSubQuestData, phase: CorePhase): number {
  switch (phase) {
    case 'encounter': return data.encounter?.length ?? 0;
    case 'write': return data.write?.length ?? 0;
    case 'recognize': return data.recognize?.length ?? 0;
    case 'spell': return data.spell?.length ?? 0;
    case 'dictation': return data.dictation?.length ?? 0;
  }
}

// 数据缺失时的一帧空占位（`queueMicrotask` 会立即调 onPhaseComplete 推走）
function PhaseSkipping() {
  const { lang } = useLang();
  return (
    <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-3)', fontSize: 13 }}>
      {t('diary.sqc.phase_not_ready', lang)}
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// PhaseRecap · 分类型小结
// ═════════════════════════════════════════════════════════

function PhaseRecap({
  finishedPhase, wrong, totalTasks, isLast, encounterCards, answerLog,
  isFreePractice, onContinue, onRedoPhase, onReturnToFreeHome,
}: {
  finishedPhase: CorePhase;
  wrong: number;
  totalTasks: number;
  isLast: boolean;
  encounterCards: VocabEncounterCard[];
  answerLog: AnswerLog[];
  isFreePractice: boolean;
  onContinue: () => void;
  onRedoPhase: () => void;
  onReturnToFreeHome: () => void;
}) {
  const { lang } = useLang();
  const correct = totalTasks - wrong;
  const perfect = wrong === 0;

  useEffect(() => {
    if (perfect) sfxChime('mid');
  }, [perfect]);

  const currentPhaseIdx = PHASE_ORDER.indexOf(finishedPhase);
  const remainingPhases = PHASE_ORDER.length - currentPhaseIdx - 1;

  return (
    <div style={{ padding: '10px 4px', textAlign: 'left' }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        {/* 页码印章 · 让用户知道还没到结算 */}
        {!isLast && (
          <div className="subquest-page-mark" aria-label={t('diary.sqc.page_mark_aria', lang, { cur: currentPhaseIdx + 1, total: PHASE_ORDER.length, rest: remainingPhases })}>
            <span className="subquest-page-mark-num">
              <span className="subquest-page-mark-cur">{String(currentPhaseIdx + 1).padStart(2, '0')}</span>
              <span className="subquest-page-mark-slash">/</span>
              <span className="subquest-page-mark-total">{PHASE_ORDER.length}</span>
            </span>
            <span className="subquest-page-mark-rest">{t('diary.sqc.phases_left', lang, { n: remainingPhases })}</span>
          </div>
        )}
        <div style={{ fontSize: 40, marginBottom: 6 }}>
          {finishedPhase === 'encounter' ? '📖' :
           finishedPhase === 'write' ? '✍️' :
           finishedPhase === 'dictation' ? '👂' :
           perfect ? '🌟' : wrong <= 1 ? '👍' : '💪'}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-zh)' }}>
          {finishedPhase === 'encounter' ? t('diary.sqc.recap_head_encounter', lang) :
           finishedPhase === 'write' ? t('diary.sqc.recap_head_write', lang) :
           finishedPhase === 'dictation' ? t('diary.sqc.recap_head_dictation', lang) :
           finishedPhase === 'recognize' ? t('diary.sqc.recap_head_recognize', lang) :
           t('diary.sqc.recap_head_spell', lang)}
        </div>
        {finishedPhase !== 'encounter' && finishedPhase !== 'write' && finishedPhase !== 'dictation' && (
          <div style={{
            display: 'inline-flex', gap: 20, marginTop: 14,
            padding: '10px 20px', background: 'var(--paper-deep)',
            borderRadius: 12, borderLeft: '3px solid var(--gold)',
            fontSize: 13,
          }}>
            <span>{t('diary.sqc.stat_correct', lang)} <b style={{ color: 'var(--color-mint-strong)', fontSize: 16 }}>{correct}</b></span>
            <span>{t('diary.sqc.stat_missed', lang)} <b style={{ color: wrong > 0 ? 'var(--stamp)' : 'var(--ink-2)', fontSize: 16 }}>{wrong}</b></span>
            <span>XP <b style={{ color: 'var(--gold-deep)', fontSize: 16 }}>+{correct * 5}</b></span>
          </div>
        )}
        {(finishedPhase === 'write' || finishedPhase === 'dictation') && (
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 12, fontStyle: 'italic', lineHeight: 1.7 }}>
            {t('diary.sqc.recap_note_practice_1', lang)}
            <br />
            {t('diary.sqc.recap_note_practice_2', lang)}
          </div>
        )}
      </div>

      {/* 语遇小结：8 词总览 */}
      {finishedPhase === 'encounter' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {encounterCards.map((w) => (
            <RecapWordRow key={w.id} word={w} />
          ))}
        </div>
      )}

      {/* 手写/听写小结：字词列表 · 无错题概念 */}
      {(finishedPhase === 'write' || finishedPhase === 'dictation') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {encounterCards.map((w) => (
            <RecapWordRow key={w.id} word={w} />
          ))}
        </div>
      )}

      {/* 答题类小结：逐题回顾（只对 recognize/spell） */}
      {(finishedPhase === 'recognize' || finishedPhase === 'spell') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {answerLog.map((entry, i) => (
            <AnswerLogRow key={entry.taskId} idx={i + 1} entry={entry} />
          ))}
        </div>
      )}

      {/* CTA */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
        {isFreePractice ? (
          <>
            <button className="subquest-cta-primary" onClick={onReturnToFreeHome}>
              {t('diary.sqc.cta_return_free', lang)} <ArrowRight size={16} />
            </button>
            <button className="subquest-cta-ghost" onClick={onRedoPhase}>
              <RefreshCcw size={14} style={{ marginRight: 6 }} />
              {t('diary.sqc.cta_redo_again', lang)}
            </button>
          </>
        ) : (
          <>
            <button className="subquest-cta-primary" onClick={onContinue}>
              {isLast ? t('diary.sqc.cta_go_result', lang) : t('diary.sqc.cta_next_phase', lang)} <ArrowRight size={16} />
            </button>
            {wrong > 0 && (
              <button className="subquest-cta-ghost" onClick={onRedoPhase}>
                <RefreshCcw size={14} style={{ marginRight: 6 }} />
                {t('diary.sqc.cta_redo_phase', lang)}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// 语遇小结 · 单词行（复用主流程 DiaryWords 的视觉）
function RecapWordRow({ word }: { word: VocabEncounterCard }) {
  const { lang } = useLang();
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onClick={() => setExpanded((v) => !v)}
      style={{
        padding: '12px 14px',
        background: 'var(--paper)',
        border: '1px solid var(--line)',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all .2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-ko)', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>
            {word.korean}
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.06em', marginTop: 2 }}>
            [{word.hangul}] · {word.pos}
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-zh)', fontSize: 14, color: 'var(--ink-2)', flexShrink: 0 }}>
          {word.zh}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); sfxPop(); speak(word.korean).catch(() => {}); }}
          className="subquest-word-play"
          style={{ width: 32, height: 32 }}
          aria-label={t('diary.sqc.aria_play', lang)}
        >
          <Volume2 size={14} />
        </button>
      </div>
      {expanded && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--stitch)' }}>
          <div style={{
            padding: '8px 12px', background: 'var(--paper-deep)',
            borderLeft: '2px solid var(--gold)', borderRadius: '0 8px 8px 0',
            marginBottom: 8,
          }}>
            <div style={{ fontFamily: 'var(--font-ko)', fontSize: 14, color: 'var(--ink)' }}>
              {word.example.ko}
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>
              {word.example.zh}
            </div>
          </div>
          {word.tip && (
            <div style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.7, fontStyle: 'italic' }}>
              💡 {word.tip}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 答题回顾行
function AnswerLogRow({ idx, entry }: { idx: number; entry: AnswerLog }) {
  const { lang } = useLang();
  return (
    <div
      style={{
        padding: '10px 14px',
        background: entry.isCorrect ? 'rgba(94,168,134,.06)' : 'rgba(193,78,58,.06)',
        border: `1px solid ${entry.isCorrect ? 'rgba(94,168,134,.2)' : 'rgba(193,78,58,.2)'}`,
        borderRadius: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: entry.isCorrect ? 0 : 6 }}>
        <span style={{
          width: 24, height: 24, borderRadius: '50%',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: entry.isCorrect ? 'var(--color-mint-strong)' : 'var(--stamp)',
          color: '#fff', fontSize: 11, fontWeight: 700,
          flexShrink: 0,
        }}>
          {entry.isCorrect ? <Check size={12} /> : <X size={12} />}
        </span>
        <span style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.06em' }}>
          Q{idx}
        </span>
        <span style={{ flex: 1, minWidth: 0, overflowWrap: 'break-word', fontFamily: 'var(--font-ko)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>
          {entry.prompt}
        </span>
        {entry.hangul && (
          <span style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '.06em' }}>
            [{entry.hangul}]
          </span>
        )}
      </div>
      {!entry.isCorrect && (
        <div style={{ marginLeft: 34, fontSize: 12, lineHeight: 1.7 }}>
          <div style={{ color: 'var(--ink-3)' }}>
            {t('diary.sqc.you_chose', lang)} · <span style={{ color: 'var(--stamp)', textDecoration: 'line-through' }}>{entry.userAnswer}</span>
          </div>
          <div style={{ color: 'var(--ink-3)', marginTop: 2 }}>
            {t('diary.sqc.correct_is', lang)} · <b style={{ color: 'var(--ink)' }}>{entry.correctAnswer}</b>
          </div>
          {entry.explanation && (
            <div style={{ marginTop: 4, color: 'var(--ink-2)', fontStyle: 'italic' }}>
              💡 {entry.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// FreePracticeHome · 自由练习入口 · 4 卡网格
// ═════════════════════════════════════════════════════════

function FreePracticeHome({ data, onGo, onBack }: {
  data: VocabSubQuestData;
  onGo: (target: CorePhase) => void;
  onBack: () => void;
}) {
  const { lang } = useLang();
  const counts: Record<CorePhase, number> = {
    encounter: data.encounter.length,
    write: data.write.length,
    recognize: data.recognize.length,
    spell: data.spell.length,
    dictation: data.dictation.length,
  };
  return (
    <div style={{ padding: '10px 4px', textAlign: 'center' }}>
      <div style={{ fontSize: 11, color: 'var(--gold-deep)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 8 }}>
        FREE PRACTICE MODE
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-zh)', marginBottom: 6 }}>
        {t('diary.sqc.title_free_practice', lang)}
      </div>
      <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 22 }}>
        {t('diary.sqc.free_practice_desc', lang)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
        {PHASE_ORDER.map((p) => (
          <button
            key={p}
            onClick={() => onGo(p)}
            style={{
              padding: '18px 12px',
              background: 'var(--paper)',
              border: '1.5px solid var(--line)',
              borderRadius: 16,
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              transition: 'all .2s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--gold)';
              e.currentTarget.style.background = 'var(--gold-soft)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--line)';
              e.currentTarget.style.background = 'var(--paper)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: 32 }}>{PHASE_ICONS[p]}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-zh)' }}>
              {t(PHASE_LABEL_KEYS[p], lang)}
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.08em' }}>
              {t('diary.sqc.n_questions', lang, { n: counts[p] })}
            </div>
          </button>
        ))}
      </div>

      <button className="subquest-cta-ghost" onClick={onBack}>
        {t('diary.sqc.back_to_diary', lang)}
      </button>
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// WordbookDrawer
// ═════════════════════════════════════════════════════════

function WordbookDrawer({ words, onClose }: {
  words: VocabEncounterCard[]; onClose: () => void;
}) {
  const { lang } = useLang();
  return (
    <>
      <div className="subquest-drawer-mask" onClick={onClose} />
      <div className="subquest-drawer-panel diary-anim-fade-up">
        <div className="subquest-drawer-header">
          <div>
            <div className="subquest-drawer-eyebrow">{t('diary.sqc.wordbook_review', lang)} · WORDBOOK</div>
            <div className="subquest-drawer-title">{t('diary.sqc.wordbook_count', lang, { n: words.length })}</div>
          </div>
          <button className="subquest-drawer-close" onClick={onClose} aria-label={t('diary.sqc.aria_close', lang)}>
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <div className="subquest-drawer-list">
          {words.map((w) => (
            <div
              key={w.id}
              className="subquest-drawer-item"
              onClick={() => { sfxPop(); speak(w.korean).catch(() => {}); }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-ko)', fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>
                  {w.korean}
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.06em', marginTop: 2 }}>
                  [{w.hangul}]
                </div>
                <div style={{ fontFamily: 'var(--font-zh)', fontSize: 13, color: 'var(--ink-2)', marginTop: 4 }}>
                  {w.zh}
                </div>
              </div>
              <button className="subquest-word-play" aria-label={t('diary.sqc.aria_play', lang)}>
                <Volume2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ═════════════════════════════════════════════════════════
// Phase 1 · 语遇
// ═════════════════════════════════════════════════════════

function EncounterPhase({ cards, onDone }: {
  cards: VocabEncounterCard[]; onDone: (log: AnswerLog[]) => void;
}) {
  const { lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [played, setPlayed] = useState<Set<number>>(new Set());
  const playingRef = useRef(false);
  // 首次进入：让用户主动确认再开始自动播（避免办公室/公交尴尬）
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('tori-subquest-intro-seen-v1') !== '1';
  });

  const dismissIntro = () => {
    localStorage.setItem('tori-subquest-intro-seen-v1', '1');
    setShowIntro(false);
  };

  useEffect(() => {
    // 有引导卡时暂停自动播
    if (showIntro) return;
    const card = cards[idx];
    if (!card) return;
    if (played.has(idx)) return;
    playingRef.current = true;
    let done = false;
    const markPlayed = () => {
      if (done) return;
      done = true;
      playingRef.current = false;
      setPlayed((prev) => {
        if (prev.has(idx)) return prev;
        const next = new Set(prev);
        next.add(idx);
        return next;
      });
    };
    // 首题挂载时可能没有用户手势 → 先解锁 AudioContext
    unlockAudioContext();
    speak(card.korean).catch(() => {}).finally(markPlayed);
    // 2 秒兜底：TTS 静音/卡住时也要放行"下一张"
    const fallback = setTimeout(markPlayed, 2000);
    return () => clearTimeout(fallback);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, showIntro]);

  const card = cards[idx];
  if (!card) return null;
  const canNext = played.has(idx);
  const isLast = idx === cards.length - 1;

  const replay = () => {
    if (playingRef.current) return;
    speak(card.korean).catch(() => {});
  };

  // 首次便签（手账贴纸样式，不居中不 emoji，不用 primary CTA）
  if (showIntro) {
    return (
      <div className="subquest-intro-sticky">
        <span className="subquest-intro-eyebrow">{t('diary.sqc.intro_eyebrow', lang)}</span>
        <p className="subquest-intro-line">
          {t('diary.sqc.intro_line1a', lang)} <em>{t('diary.sqc.intro_line1em', lang)}</em>{t('diary.sqc.intro_line1b', lang)}
        </p>
        <p className="subquest-intro-line">
          {t('diary.sqc.intro_line2a', lang)}
          <br />
          {t('diary.sqc.intro_line2b', lang)} <em>{t('diary.sqc.intro_line2em', lang)}</em>{t('diary.sqc.intro_line2c', lang)}
        </p>
        <p className="subquest-intro-line">
          {t('diary.sqc.intro_line3', lang)}
        </p>

        <button
          onClick={() => { sfxPop(); dismissIntro(); }}
          className="subquest-intro-ok"
        >
          {t('diary.sqc.intro_ok', lang)}
        </button>

        <span className="subquest-intro-postscript">
          {t('diary.sqc.intro_postscript', lang)}
        </span>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.12em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 6 }}>
        WORD · {idx + 1} / {cards.length}
      </div>
      <div key={idx} className="subquest-encounter-card">
        <div className="subquest-encounter-ko">{card.korean}</div>
        <div className="subquest-encounter-hangul">[{card.hangul}]</div>
        <button onClick={replay} aria-label={t('diary.sqc.aria_replay', lang)} style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'var(--grad-accent)', color: '#fff',
          border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(255,127,168,.35)',
        }}>
          <Volume2 size={20} strokeWidth={2} />
        </button>
        <div className="subquest-encounter-zh">{card.zh}</div>
        <div className="subquest-encounter-pos">{card.pos}</div>

        <div className="subquest-example">
          <div className="subquest-example-ko">{card.example.ko}</div>
          <div className="subquest-example-zh">{card.example.zh}</div>
        </div>

        {card.tip && <div className="subquest-tip">💡 {card.tip}</div>}
      </div>

      <div style={{ display: 'flex', gap: 7, justifyContent: 'center', alignItems: 'center', marginTop: 22 }}>
        {cards.map((_, i) => (
          <span key={i} style={{
            width: i === idx ? 20 : 6, height: i === idx ? 4 : 6,
            borderRadius: 999,
            background: i === idx ? 'var(--gold-deep)' : played.has(i) ? 'var(--gold)' : 'var(--line)',
            opacity: !played.has(i) && i !== idx ? 0.5 : 1,
            transition: 'all .35s cubic-bezier(0.25, 1, 0.5, 1)',
          }} />
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <button
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
          className="subquest-cta-ghost"
          style={{ flex: 1, opacity: idx === 0 ? 0.3 : 1 }}
        >{t('diary.sqc.prev_card', lang)}</button>
        <button
          onClick={() => {
            if (!canNext) return;
            if (isLast) onDone([]); // 语遇不产生答题记录
            else setIdx((i) => i + 1);
          }}
          disabled={!canNext}
          className="subquest-cta-primary"
          style={{ flex: 2, opacity: canNext ? 1 : 0.4, height: 48, borderRadius: 14 }}
        >
          {isLast ? t('diary.sqc.finish_encounter', lang) : t('diary.sqc.next_card', lang)} <ArrowRight size={16} />
        </button>
      </div>
      {!canNext && (
        <div style={{ fontSize: 11, color: 'var(--ink-3)', textAlign: 'center', marginTop: 12 }}>
          {t('diary.sqc.encounter_wait_hint', lang)}
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// Phase 2 · 认词
// ═════════════════════════════════════════════════════════

function RecognizePhase({ tasks, onDone }: {
  tasks: VocabRecognizeTask[]; onDone: (wrong: number, log: AnswerLog[]) => void;
}) {
  const { lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [locked, setLocked] = useState<number | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [shaking, setShaking] = useState(false);
  const firstAttemptWrongRef = useRef<Set<string>>(new Set());
  const answerLogRef = useRef<AnswerLog[]>([]);

  const task = tasks[idx];

  // shuffle choices per task
  const shuffled = useMemo(() => {
    if (!task) return [];
    const arr = task.choices.map((c, j) => ({ ...c, origIdx: j }));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [task]);

  if (!task) return null;

  const correctChoice = shuffled.find(c => c.correct);

  const handlePick = (i: number) => {
    if (locked !== null) return;
    const choice = shuffled[i];
    if (choice.correct) {
      sfxCorrect();
      setLocked(i);
      if (!answerLogRef.current.find(l => l.taskId === task.id)) {
        const isFirstAttempt = !firstAttemptWrongRef.current.has(task.id);
        answerLogRef.current.push({
          taskId: task.id,
          prompt: task.korean,
          hangul: task.hangul,
          userAnswer: choice.zh,
          correctAnswer: choice.zh,
          isCorrect: isFirstAttempt,
        });
      }
      setTimeout(() => {
        if (idx < tasks.length - 1) { setIdx(idx + 1); setLocked(null); setWrongAttempts(0); }
        else onDone(firstAttemptWrongRef.current.size, answerLogRef.current);
      }, 700);
    } else {
      sfxWrong();
      setShaking(true);
      setTimeout(() => setShaking(false), 480);
      if (!firstAttemptWrongRef.current.has(task.id)) {
        firstAttemptWrongRef.current.add(task.id);
        const rightChoice = task.choices.find(c => c.correct);
        answerLogRef.current = answerLogRef.current.filter(l => l.taskId !== task.id);
        answerLogRef.current.push({
          taskId: task.id,
          prompt: task.korean,
          hangul: task.hangul,
          userAnswer: choice.zh,
          correctAnswer: rightChoice?.zh ?? '',
          isCorrect: false,
          explanation: `「${task.korean}」意为「${rightChoice?.zh}」，容易和「${choice.zh}」混淆`,
        });
      }
      const newWrong = wrongAttempts + 1;
      setWrongAttempts(newWrong);
      if (newWrong >= 3) setLocked(i);
    }
  };

  const continueWrong = () => {
    if (idx < tasks.length - 1) { setIdx(idx + 1); setLocked(null); setWrongAttempts(0); }
    else onDone(firstAttemptWrongRef.current.size, answerLogRef.current);
  };

  const isLockedWrong = locked !== null && !shuffled[locked]?.correct;

  return (
    <div className={shaking ? 'diary-anim-shake' : ''}>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.12em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 8 }}>
        Q · {idx + 1} / {tasks.length}
      </div>
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-ko)', marginBottom: 4 }}>
          {task.korean}
        </div>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.08em', marginBottom: 14 }}>
          [{task.hangul}]
        </div>
        <button
          onClick={() => speak(task.korean).catch(() => {})}
          aria-label={t('diary.sqc.aria_play', lang)}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'var(--grad-accent)', color: '#fff',
            border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(255,127,168,.35)',
          }}
        >
          <Volume2 size={18} />
        </button>
      </div>

      {/* 机会指示 */}
      {wrongAttempts > 0 && wrongAttempts < 3 && locked === null && (
        <div style={{ textAlign: 'center', marginTop: 8, display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'center' }}>
          {[0, 1, 2].map(k => (
            <span key={k} style={{
              width: 8, height: 8, borderRadius: '50%', display: 'inline-block',
              background: k < wrongAttempts ? 'var(--stamp)' : 'var(--line)',
            }} />
          ))}
          <span style={{ fontSize: 11, color: 'var(--stamp)', marginLeft: 6 }}>{t('diary.sqc.tries_left', lang, { n: 3 - wrongAttempts })}</span>
        </div>
      )}

      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {shuffled.map((c, i) => {
          const isPicked = locked === i;
          const showCorrect = isPicked && c.correct;
          const showWrong = isLockedWrong && isPicked;
          const showRevealCorrect = isLockedWrong && c.correct;
          return (
            <button
              key={i}
              onClick={() => handlePick(i)}
              disabled={locked !== null}
              className={`subquest-choice${showCorrect || showRevealCorrect ? ' is-correct' : ''}${showWrong ? ' is-wrong' : ''}`}
            >
              <span className="subquest-choice-badge">
                {showCorrect || showRevealCorrect ? '✓' : showWrong ? '✕' : String.fromCharCode(65 + i)}
              </span>
              {c.zh}
            </button>
          );
        })}
      </div>

      {isLockedWrong && (
        <div className="subquest-feedback" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RotateCcw size={14} />
            <span>{t('diary.sqc.tries_used_recognize', lang, { answer: correctChoice?.zh ?? '' })}</span>
          </div>
          <button className="subquest-retry-btn" style={{ alignSelf: 'flex-end' }} onClick={continueWrong}>{t('diary.sqc.got_it_continue', lang)}</button>
        </div>
      )}
      {locked !== null && shuffled[locked]?.correct && firstAttemptWrongRef.current.has(task.id) && (
        <div style={{
          marginTop: 12, padding: '8px 12px',
          background: 'color-mix(in srgb, var(--stamp) 8%, var(--paper))',
          border: '1px dashed color-mix(in srgb, var(--stamp) 30%, transparent)',
          borderRadius: 8, fontSize: 12, color: 'var(--ink-2)', textAlign: 'center',
        }}>
          {t('diary.sqc.first_wrong_recognize', lang)}
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// Phase 3 · 拼写
// ═════════════════════════════════════════════════════════

function SpellPhase({ tasks, onDone }: {
  tasks: VocabSpellTask[]; onDone: (wrong: number, log: AnswerLog[]) => void;
}) {
  const { lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [used, setUsed] = useState<Set<number>>(new Set());
  const [state, setState] = useState<'idle' | 'right' | 'wrong' | 'reveal'>('idle');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const firstAttemptWrongRef = useRef<Set<string>>(new Set());
  const answerLogRef = useRef<AnswerLog[]>([]);

  const task = tasks[idx];
  const shuffled = useMemo(() => {
    if (!task) return [];
    return [...task.syllables].sort(() => Math.random() - 0.5);
  }, [task]);

  if (!task) return null;
  const answer = task.answer;

  const pickSyllable = (syl: string, i: number) => {
    if (state === 'right' || state === 'reveal') return;
    if (used.has(i)) return;
    const next = [...picked, syl];
    setPicked(next);
    const nextUsed = new Set(used); nextUsed.add(i);
    setUsed(nextUsed);

    if (next.length === answer.length) {
      const correct = next.every((s, k) => s === answer[k]);
      if (correct) {
        sfxCorrect();
        setState('right');
        if (!answerLogRef.current.find(l => l.taskId === task.id)) {
          const isFirstAttempt = !firstAttemptWrongRef.current.has(task.id);
          answerLogRef.current.push({
            taskId: task.id,
            prompt: task.zhHint,
            userAnswer: next.join(''),
            correctAnswer: answer.join(''),
            isCorrect: isFirstAttempt,
          });
        }
        setTimeout(() => {
          if (idx < tasks.length - 1) {
            setIdx(idx + 1);
            setPicked([]); setUsed(new Set()); setState('idle'); setWrongAttempts(0);
          } else {
            onDone(firstAttemptWrongRef.current.size, answerLogRef.current);
          }
        }, 800);
      } else {
        sfxWrong();
        if (!firstAttemptWrongRef.current.has(task.id)) {
          firstAttemptWrongRef.current.add(task.id);
          answerLogRef.current = answerLogRef.current.filter(l => l.taskId !== task.id);
          answerLogRef.current.push({
            taskId: task.id,
            prompt: task.zhHint,
            userAnswer: next.join(''),
            correctAnswer: answer.join(''),
            isCorrect: false,
            explanation: `顺序错了：正确应是「${answer.join('')}」，你拼成了「${next.join('')}」`,
          });
        }
        const newWrong = wrongAttempts + 1;
        setWrongAttempts(newWrong);
        setState('wrong');
        if (newWrong >= 3) {
          setTimeout(() => setState('reveal'), 600);
        } else {
          setTimeout(() => { setPicked([]); setUsed(new Set()); setState('idle'); }, 900);
        }
      }
    }
  };

  const unpick = (k: number) => {
    if (state === 'right' || state === 'reveal') return;
    const removed = picked[k];
    setPicked(prev => prev.filter((_, i) => i !== k));
    // find the index of removed in shuffled and remove from used
    const si = shuffled.findIndex(s => s === removed && used.has(shuffled.indexOf(s)));
    // 简化：重建 used（只保留当前 picked 中的）
    const newUsed = new Set<number>();
    const keep = picked.filter((_, i) => i !== k);
    shuffled.forEach((s, si) => {
      const matchIdx = keep.findIndex((tk, tki) => tk === s && !keep.slice(0, tki).includes(s));
      if (matchIdx !== -1) newUsed.add(si);
    });
    setUsed(newUsed);
  };

  const continueReveal = () => {
    if (idx < tasks.length - 1) {
      setIdx(idx + 1);
      setPicked([]); setUsed(new Set()); setState('idle'); setWrongAttempts(0);
    } else {
      onDone(firstAttemptWrongRef.current.size, answerLogRef.current);
    }
  };

  return (
    <div className={state === 'wrong' ? 'diary-anim-shake' : ''}>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.12em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 8 }}>
        SPELL · {idx + 1} / {tasks.length}
      </div>
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.08em', marginBottom: 6 }}>{t('diary.sqc.spell_with_hangul', lang)}</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-zh)' }}>
          {task.zhHint}
        </div>
      </div>

      {/* 机会指示 */}
      {wrongAttempts > 0 && wrongAttempts < 3 && state === 'idle' && (
        <div style={{ textAlign: 'center', marginTop: 12, display: 'flex', justifyContent: 'center', gap:6, alignItems: 'center' }}>
          {[0, 1, 2].map(k => (
            <span key={k} style={{
              width: 8, height: 8, borderRadius: '50%', display: 'inline-block',
              background: k < wrongAttempts ? 'var(--stamp)' : 'var(--line)',
            }} />
          ))}
          <span style={{ fontSize: 11, color: 'var(--stamp)', marginLeft: 6 }}>{t('diary.sqc.tries_left', lang, { n: 3 - wrongAttempts })}</span>
        </div>
      )}

      <div style={{ marginTop: 26, minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        {answer.map((_, i) => (
          <span
            key={i}
            onClick={() => picked[i] ? unpick(i) : undefined}
            className={`subquest-syllable-slot${picked[i] ? ' is-filled' : ''}`}
            style={picked[i] ? { cursor: 'pointer' } : undefined}
          >
            {picked[i] || ''}
          </span>
        ))}
      </div>

      <div style={{ marginTop: 22, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        {shuffled.map((s, i) => (
          <button
            key={i}
            onClick={() => pickSyllable(s, i)}
            disabled={used.has(i) || state === 'right' || state === 'reveal'}
            className="subquest-syllable"
          >{s}</button>
        ))}
      </div>

      {/* 1-2次错误提示（短暂出现后自动重置） */}
      {state === 'wrong' && wrongAttempts < 3 && (
        <div className="subquest-feedback">
          <RotateCcw size={14} />
          <span>{t('diary.sqc.spell_wrong_order', lang, { n: 3 - wrongAttempts })}</span>
        </div>
      )}

      {/* 3次错误揭示答案 */}
      {state === 'reveal' && (
        <div className="subquest-feedback" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RotateCcw size={14} />
            <span>{t('diary.sqc.spell_correct_order', lang, { answer: answer.join('') })}</span>
          </div>
          <button className="subquest-retry-btn" style={{ alignSelf: 'flex-end' }} onClick={continueReveal}>{t('diary.sqc.got_it_continue', lang)}</button>
        </div>
      )}
      {state === 'right' && firstAttemptWrongRef.current.has(task.id) && (
        <div style={{
          marginTop: 12, padding: '8px 12px',
          background: 'color-mix(in srgb, var(--stamp) 8%, var(--paper))',
          border: '1px dashed color-mix(in srgb, var(--stamp) 30%, transparent)',
          borderRadius: 8, fontSize: 12, color: 'var(--ink-2)', textAlign: 'center',
        }}>
          {t('diary.sqc.first_wrong_spell', lang)}
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// Phase 2 · 手写 · 覆盖率 20% 及格，不产生错题
// ═════════════════════════════════════════════════════════

// 按笔数自适应通关阈值：简单字（少笔）要求高覆盖率，复杂字（多笔）门槛降低
// 原因：简单字 ideal.size 小，几乎乱涂就能到 20%；复杂字细笔画覆盖 24px 网格数少，认真写完也只 25%
function coverageGoalFor(strokes: number): number {
  if (strokes <= 3) return 30;
  if (strokes <= 5) return 22;
  if (strokes <= 8) return 17;
  return 13;
}

function WritePhase({ tasks, onDone }: {
  tasks: VocabWriteTask[]; onDone: (log: AnswerLog[]) => void;
}) {
  const { lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [syllableIdx, setSyllableIdx] = useState(0);
  const [ghostOn, setGhostOn] = useState(true);
  const [coverage, setCoverage] = useState(0);
  const [passed, setPassed] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const passedRef = useRef(false);
  // 不便手写的用户可切换成打字：draw=逐字描红（默认），type=整词打字输入
  const [writeMode, setWriteMode] = useState<'draw' | 'type'>('draw');
  const [typed, setTyped] = useState('');

  const task = tasks[idx];
  // 遍历整个词的每一个字，依次描红
  const wordSyllables = useMemo(() => task ? [...task.wordKorean] : [], [task]);
  const currentSyllable = wordSyllables[syllableIdx] ?? '';
  const ideal = useMemo(() => currentSyllable ? buildSyllableIdealStrokes(currentSyllable) : [], [currentSyllable]);
  const targetCount = useMemo(() => currentSyllable ? countSyllableStrokes(currentSyllable) : 0, [currentSyllable]);
  const isMultiSyllable = wordSyllables.length > 1;

  useEffect(() => {
    if (!task) return;
    setCoverage(0);
    setTyped('');
    passedRef.current = false;
    // 打字模式：由整词输入判定是否通过，进入新字不预先放行
    // 描红模式：缺笔画数据的字（Day 2+ 可能遇到）直接放行，避免"下一字"按钮永久禁用
    if (writeMode === 'draw' && ideal.length === 0) {
      passedRef.current = true;
      setPassed(true);
    } else {
      setPassed(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, syllableIdx, ideal, writeMode]);

  // 进入新题时自动播词（换字/切手写打字模式都不重播）
  useEffect(() => {
    if (!task) return;
    unlockAudioContext();
    speak(task.wordKorean).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // 打字模式：整词输入与目标一致即判过
  const typeHit = writeMode === 'type' && !!typed && normalizeKorean(typed) === normalizeKorean(task?.wordKorean ?? '');
  useEffect(() => {
    if (typeHit && !passedRef.current) {
      passedRef.current = true;
      setPassed(true);
      sfxCorrect();
    }
  }, [typeHit]);

  if (!task) return null;

  const coverageGoal = coverageGoalFor(targetCount);

  const handleCoverage = (pct: number) => {
    setCoverage(pct);
    if (pct >= coverageGoal && !passedRef.current) {
      passedRef.current = true;
      setPassed(true);
      sfxCorrect();
    }
  };

  const next = () => {
    // 描红模式逐字推进；打字模式整词一次过，跳过逐字循环
    if (writeMode === 'draw' && syllableIdx < wordSyllables.length - 1) {
      setSyllableIdx((i) => i + 1);
      setCanvasKey((k) => k + 1);
      return;
    }
    // 换下一题（syllableIdx 重置为 0）
    if (idx < tasks.length - 1) {
      setIdx(idx + 1);
      setSyllableIdx(0);
      setCanvasKey((k) => k + 1);
    } else {
      onDone(tasks.map((task) => ({
        taskId: task.id, prompt: task.wordKorean, userAnswer: '(书写)', correctAnswer: task.wordKorean, isCorrect: true,
      })));
    }
  };

  const isLastTask = idx === tasks.length - 1;
  // 打字模式整词一次过，视作已到词末字
  const isLastSyllable = writeMode === 'type' || syllableIdx === wordSyllables.length - 1;
  const isLast = isLastTask && isLastSyllable;

  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.12em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 6 }}>
        WRITE · {idx + 1} / {tasks.length}
      </div>

      <div className="subquest-write-caption">
        <span className="subquest-write-caption-ko">{task.wordKorean}</span>
        <span className="subquest-write-caption-zh">{task.wordZh}</span>
        <span className="subquest-write-caption-roman">/{task.hangul}/</span>
        <button
          onClick={() => { sfxPop(); speak(task.wordKorean).catch(() => {}); }}
          className="subquest-write-caption-play"
          aria-label={t('diary.sqc.aria_play', lang)}
        >
          <Volume2 size={12} />
        </button>
      </div>

      {/* 手写 / 打字 切换：不便手写的用户可改用键盘输入 */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', margin: '10px auto 0', maxWidth: 260 }}>
        <button
          onClick={() => { sfxPop(); setWriteMode('draw'); }}
          className={writeMode === 'draw' ? 'subquest-cta-primary' : 'subquest-cta-ghost'}
          style={{ flex: 1, height: 34, borderRadius: 10, fontSize: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
        >
          <PencilLine size={14} /> {t('diary.sqc.write_mode_draw', lang)}
        </button>
        <button
          onClick={() => { sfxPop(); setWriteMode('type'); }}
          className={writeMode === 'type' ? 'subquest-cta-primary' : 'subquest-cta-ghost'}
          style={{ flex: 1, height: 34, borderRadius: 10, fontSize: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
        >
          <Keyboard size={14} /> {t('diary.sqc.write_mode_type', lang)}
        </button>
      </div>

      {isMultiSyllable && writeMode === 'draw' && (
        <div style={{ fontSize: 12, color: 'var(--ink-2)', textAlign: 'center', marginTop: 4, marginBottom: 4 }}>
          {t('diary.sqc.write_syllable_progress', lang, { cur: syllableIdx + 1, total: wordSyllables.length })}
          <b style={{ color: 'var(--ink)', fontFamily: 'var(--font-ko)', marginLeft: 4, fontSize: 16 }}>{currentSyllable}</b>
        </div>
      )}

      {writeMode === 'draw' ? (
        <div style={{ maxWidth: 560, margin: '10px auto 0' }}>
          <StrokeCanvas
            key={canvasKey}
            targetStrokeCount={targetCount || 1}
            ghostChar={ghostOn ? currentSyllable : undefined}
            idealStrokes={ideal.length > 0 ? ideal : undefined}
            onCoverageChange={handleCoverage}
            hideStrokeCounter
            hideToolbar
          />
        </div>
      ) : (
        <div
          style={{
            maxWidth: 560, margin: '14px auto 0', display: 'flex', flexDirection: 'column', gap: 8,
            '--hr-ink-2': 'var(--ink-1, #241917)', '--hr-ink-3': 'var(--ink-3, #89756e)',
            '--hr-surface-2': 'var(--surface-2, #fff)', '--hr-surface-3': 'var(--surface-1, #fffbf7)',
            '--hr-border-2': 'var(--line, #eee0d8)', '--hr-pink-strong': 'var(--color-pink-strong, #e55a87)',
            '--hr-sans': 'var(--font-zh, sans-serif)', '--hr-mono': 'var(--font-zh, monospace)',
            '--hr-ease': 'cubic-bezier(.4,0,.2,1)',
          } as React.CSSProperties}
        >
          <input
            value={typed}
            onChange={e => setTyped(e.target.value)}
            placeholder={t('diary.sqc.write_type_placeholder', lang)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            style={{
              width: '100%', padding: '14px 16px', borderRadius: 14,
              border: `2px solid ${passed ? 'var(--color-mint-strong, #5ea886)' : 'var(--line, #eee0d8)'}`,
              fontSize: 22, color: 'var(--ink-1, #241917)',
              outline: 'none', fontFamily: 'var(--font-ko, sans-serif)', boxSizing: 'border-box',
              background: 'var(--surface-2, #fff)', textAlign: 'center',
              transition: 'border-color .15s',
            }}
          />
          <KeyboardHint />
          {passed && (
            <div style={{
              fontSize: 13, textAlign: 'center', padding: '8px 12px', borderRadius: 10,
              background: 'rgba(94,168,134,.1)', color: 'var(--color-mint-strong)', fontWeight: 700,
            }}>
              {t('diary.sqc.write_type_correct', lang, { word: task.wordKorean })}
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
        {writeMode === 'draw' && (
          <>
            <button
              onClick={() => {
                sfxPop();
                setCoverage(0);
                setPassed(false);
                passedRef.current = false;
                setCanvasKey((k) => k + 1);
              }}
              className="subquest-cta-ghost"
              style={{ flex: 1, minWidth: 110, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              <RotateCcw size={14} /> {t('diary.sqc.clear_rewrite', lang)}
            </button>
            <button
              onClick={() => { sfxPop(); setGhostOn((v) => !v); }}
              className="subquest-cta-ghost"
              style={{ flex: 1, minWidth: 110, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              {ghostOn ? <><EyeOff size={14} /> {t('diary.sqc.ghost_off', lang)}</> : <><Eye size={14} /> {t('diary.sqc.ghost_on', lang)}</>}
            </button>
          </>
        )}
        <button
          onClick={next}
          className="subquest-cta-primary"
          style={{ flex: '1 1 100%', height: 48, borderRadius: 14 }}
        >
          {isLast ? t('diary.sqc.finish_write', lang) : isLastSyllable ? t('diary.sqc.next_question', lang) : t('diary.sqc.next_char', lang)} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// Phase 5 · 听写 · 听音频→无描红手写，多音节词逐字写
// ═════════════════════════════════════════════════════════

function DictationPhase({ tasks, onDone }: {
  tasks: VocabDictationTask[]; onDone: (log: AnswerLog[]) => void;
}) {
  const { lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [passed, setPassed] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [autoPlayed, setAutoPlayed] = useState<Set<number>>(new Set());
  const [written, setWritten] = useState('');

  const task = tasks[idx];
  const targetWord = task?.korean ?? '';

  useEffect(() => {
    if (!task) return;
    if (autoPlayed.has(idx)) return;
    unlockAudioContext();
    speak(task.korean).catch(() => {});
    setAutoPlayed((prev) => new Set(prev).add(idx));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, task]);

  useEffect(() => {
    setWritten('');
    setPassed(false);
  }, [idx, targetWord]);

  // 逐字覆盖式手写：拼出的整词与目标一致即判过
  const hit = !!written && normalizeKorean(written) === normalizeKorean(targetWord);
  useEffect(() => {
    if (hit && !passed) { setPassed(true); sfxCorrect(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hit]);

  if (!task) return null;

  const handleSubmit = () => {
    sfxPop();
    setShowAnswer(true);
  };

  const handleProceedToNextTask = () => {
    sfxPop();
    if (idx < tasks.length - 1) {
      setIdx((i) => i + 1);
      setShowAnswer(false);
    } else {
      onDone(tasks.map((task) => ({
        taskId: task.id, prompt: task.korean, userAnswer: '(听写)', correctAnswer: task.korean, isCorrect: true,
      })));
    }
  };

  const replay = () => { sfxPop(); speak(task.korean).catch(() => {}); };
  const isLastTask = idx === tasks.length - 1;

  if (showAnswer) {
    return (
      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <div style={{ fontSize: 11, color: 'var(--gold-deep)', letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 12 }}>
          Answer · {idx + 1} / {tasks.length}
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-ko)', marginBottom: 8 }}>
          {task.korean}
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: '.08em', marginBottom: 6 }}>
          [{task.hangul}]
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink-2)', fontFamily: 'var(--font-zh)', marginBottom: 8 }}>
          {task.zh}
        </div>
        <button
          onClick={replay}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--grad-accent)', color: '#fff', border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 20,
          }}
          aria-label={t('diary.sqc.aria_play', lang)}
        >
          <Volume2 size={16} />
        </button>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 24 }}>
          {t('diary.sqc.dictation_compare_hint', lang)}
        </div>
        <button className="subquest-cta-primary" onClick={handleProceedToNextTask}>
          {isLastTask ? t('diary.sqc.finish_dictation', lang) : t('diary.sqc.next_question', lang)} <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.12em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 6 }}>
        DICTATION · {idx + 1} / {tasks.length}
      </div>

      <div style={{ textAlign: 'center', marginTop: 6, marginBottom: 14 }}>
        <button
          className="subquest-big-play"
          onClick={replay}
          aria-label={t('diary.sqc.aria_replay_audio', lang)}
          style={{ width: 68, height: 68 }}
        >
          <Volume2 size={26} strokeWidth={2} />
        </button>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 10, letterSpacing: '.06em' }}>
          {t('diary.sqc.dictation_replay_hint', lang)}
        </div>
        {task.syllables.length > 1 && (
          <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 8 }}>
            {t('diary.sqc.dictation_full_word', lang, { n: task.syllables.length })}
          </div>
        )}
      </div>

      {/* KeyboardHint 内部用 --hr-* token（practice scope），diary 页不加载，补映射到 diary token 兜底 */}
      <div
        style={{
          maxWidth: 560, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 8,
          '--hr-ink-2': 'var(--ink-1, #241917)', '--hr-ink-3': 'var(--ink-3, #89756e)',
          '--hr-surface-2': 'var(--surface-2, #fff)', '--hr-surface-3': 'var(--surface-1, #fffbf7)',
          '--hr-border-2': 'var(--line, #eee0d8)', '--hr-pink-strong': 'var(--color-pink-strong, #e55a87)',
          '--hr-sans': 'var(--font-zh, sans-serif)', '--hr-mono': 'var(--font-zh, monospace)',
          '--hr-ease': 'cubic-bezier(.4,0,.2,1)',
        } as React.CSSProperties}
      >
        <input
          value={written}
          onChange={e => setWritten(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
          placeholder={t('diary.sqc.dictation_input_placeholder', lang)}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onFocus={e => { e.target.style.borderColor = 'var(--color-pink-base, #ff7fa8)'; e.target.style.boxShadow = '0 0 0 4px rgba(255,127,168,.15)'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--line, #eee0d8)'; e.target.style.boxShadow = 'none'; }}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: 14,
            border: '2px solid var(--line, #eee0d8)', fontSize: 20, color: 'var(--ink-1, #241917)',
            outline: 'none', fontFamily: 'var(--font-ko, sans-serif)', boxSizing: 'border-box',
            background: 'var(--surface-2, #fff)', textAlign: 'center',
            transition: 'border-color .15s, box-shadow .15s',
          }}
        />
        <KeyboardHint />
      </div>

      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {passed && (
          <div style={{
            fontSize: 13, textAlign: 'center', padding: '8px 12px', borderRadius: 10,
            background: 'rgba(94,168,134,.1)', color: 'var(--color-mint-strong)', fontWeight: 700,
          }}>
            {t('diary.sqc.dictation_correct', lang, { word: targetWord })}
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="subquest-cta-primary"
          style={{ width: '100%', height: 48, borderRadius: 14 }}
        >
          {isLastTask ? t('diary.sqc.see_answer_finish', lang) : t('diary.sqc.see_answer_next', lang)} <ArrowRight size={16} />
        </button>
        {!passed && (
          <div style={{ fontSize: 12, color: 'var(--ink-3)', textAlign: 'center', marginTop: 4, fontFamily: 'var(--font-zh)', fontStyle: 'italic' }}>
            {t('diary.sqc.dictation_write_hint', lang)}
          </div>
        )}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════
// Result
// ═════════════════════════════════════════════════════════

function ResultPhase({
  wrongCount, total, elapsedMs, level, day,
  onPersist, onRetry, onBack, onNextSub, onEnterFreePractice,
}: {
  wrongCount: number; total: number; elapsedMs: number; level: ToriLevel; day: number;
  onPersist: (wrong: number, stars: ToriSubQuestStars) => Promise<boolean>;
  onRetry: () => void; onBack: () => void; onNextSub: () => void; onEnterFreePractice: () => void;
}) {
  const { lang } = useLang();
  const stars = starsFromScore(wrongCount, total);
  const [litCount, setLitCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [saveState, setSaveState] = useState<'saving' | 'saved' | 'failed'>('saving');
  const persistingRef = useRef(false);

  const runPersist = useCallback(() => {
    if (persistingRef.current) return;
    persistingRef.current = true;
    setSaveState('saving');
    onPersist(wrongCount, stars).then((ok) => {
      setSaveState(ok ? 'saved' : 'failed');
    }).finally(() => {
      persistingRef.current = false;
    });
  }, [onPersist, wrongCount, stars]);

  useEffect(() => { runPersist(); }, [runPersist]);

  useEffect(() => {
    setLitCount(0);
    if (stars === 0) return;
    for (let i = 0; i < stars; i++) {
      setTimeout(() => {
        setLitCount(i + 1);
        sfxChime(i === 0 ? 'low' : i === 1 ? 'mid' : 'high');
      }, 400 + i * 260);
    }
    if (stars === 3) {
      setTimeout(() => {
        sfxCelebration();
        setShowConfetti(true);
      }, 400 + 3 * 260 + 200);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [stars]);

  const seconds = Math.round(elapsedMs / 1000);
  const message = stars === 3 ? t('diary.sqc.result_msg_3', lang)
    : stars === 2 ? t('diary.sqc.result_msg_2', lang)
    : stars === 1 ? t('diary.sqc.result_msg_1', lang)
    : t('diary.sqc.result_msg_0', lang);

  return (
    <div style={{ padding: '10px 4px 6px', textAlign: 'center', position: 'relative' }}>
      {showConfetti && <Confetti count={20} />}

      <div style={{ fontSize: 11, color: 'var(--gold-deep)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 8 }}>
        Day {day} · 1-1 {t('diary.sqc.title_result', lang)}
      </div>

      <div style={{ margin: '22px 0 10px', display: 'flex', justifyContent: 'center', gap: 12 }}>
        {[0, 1, 2].map((i) => {
          const lit = i < litCount;
          return (
            <div key={i} className={`subquest-star-slot${lit ? ' is-lit' : ''}`}>
              <Star
                size={48} strokeWidth={1.4}
                fill={lit ? 'var(--gold)' : 'transparent'}
                color={lit ? 'var(--gold-deep)' : 'var(--line)'}
                className="subquest-star-icon"
              />
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-zh)', marginTop: 6 }}>
        {message}
      </div>

      <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 26, fontSize: 12, color: 'var(--ink-3)' }}>
        <span>{t('diary.sqc.stat_wrong', lang)} · <b style={{ color: 'var(--ink)' }}>{wrongCount}</b></span>
        <span>{t('diary.sqc.stat_time', lang)} · <b style={{ color: 'var(--ink)' }}>{seconds}s</b></span>
        <span>{t('diary.sqc.stat_stars', lang)} · <b style={{ color: 'var(--gold-deep)' }}>{stars}/3</b></span>
      </div>

      {stars >= 1 && saveState === 'failed' && (
        <div style={{
          margin: '20px auto 0', maxWidth: 440, padding: '14px 16px',
          background: 'color-mix(in srgb, var(--stamp) 8%, var(--paper))',
          border: '1px solid color-mix(in srgb, var(--stamp) 30%, transparent)',
          borderRadius: 12, textAlign: 'left',
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{t('diary.sqc.save_failed_title', lang)}</div>
          <div style={{ fontSize: 12, lineHeight: 1.7, color: 'var(--ink-2)' }}>{t('diary.sqc.save_failed_desc', lang)}</div>
        </div>
      )}

      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {stars >= 1 && saveState === 'failed' ? (
          <button className="subquest-cta-primary" onClick={runPersist}>
            <RefreshCcw size={16} style={{ marginRight: 6 }} />{t('diary.sqc.save_retry', lang)}
          </button>
        ) : stars >= 1 ? (
          <button className="subquest-cta-primary" disabled={saveState === 'saving'} onClick={onNextSub}>
            {saveState === 'saving' ? t('diary.sqc.saving', lang) : <>{t('diary.sqc.challenge_listening', lang)} <ArrowRight size={16} /></>}
          </button>
        ) : (
          <button className="subquest-cta-primary" onClick={onRetry}>
            {t('diary.sqc.retry_again', lang)}
          </button>
        )}
        <button className="subquest-cta-ghost" onClick={onEnterFreePractice}>
          <RefreshCcw size={14} style={{ marginRight: 6 }} />
          {t('diary.sqc.free_practice_pick_any', lang)}
        </button>
        <button className="subquest-cta-ghost" onClick={onBack}>{t('diary.sqc.back_to_diary', lang)}</button>
      </div>

      <div style={{ marginTop: 14, fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.06em' }}>
        {level === 'beginner' ? '이야기 하나' : level === 'intermediate' ? '이야기 둘' : '이야기 셋'} · Day {day}
      </div>
    </div>
  );
}

