'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SceneSubQuestData, SceneTask } from '@/types/tori-subquest';
import {
  SubQuestFrame, ResultShell,
  usePersistResult, AnswerLog,
} from '@/components/diary/SubQuestShared';
import { sfxCorrect, sfxWrong, sfxPop } from '@/lib/sfx';
import { useAuth } from '@/components/AuthProvider';
import { RotateCcw } from 'lucide-react';
import { shuffleArray as shuffle } from '@/components/diary/SubQuestShared';
import { hasSubQuest } from '@/data/diary/subquests';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const TYPE_LABEL_KEYS: Record<SceneTask['type'], string> = {
  situation: 'diary.scene.typeSituation',
  dialogue:  'diary.scene.typeDialogue',
  context:   'diary.scene.typeContext',
};
const TYPE_COLORS: Record<SceneTask['type'], string> = {
  situation: '#6b9ac4',
  dialogue:  '#ff7fa8',
  context:   '#5ea886',
};

interface SceneChoice { text: string; sub: string; correct: boolean }

function getSceneChoices(task: SceneTask): SceneChoice[] {
  if (task.type === 'context') return task.choices.map(c => ({ text: c.zh, sub: '', correct: c.correct }));
  // situation & dialogue 结构一致：ko 主 + zh 副
  return task.choices.map(c => ({ text: c.ko, sub: c.zh, correct: c.correct }));
}

export default function SceneQuestClient({ data }: { data: SceneSubQuestData }) {
  const router = useRouter();
  const { user } = useAuth();
  const { lang } = useLang();
  const isAdmin = user?.role === 'admin';
  const [taskIdx, setTaskIdx] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [lockedChoice, setLockedChoice] = useState<number | null>(null);
  const [logs, setLogs] = useState<AnswerLog[]>([]);
  const [done, setDone] = useState(false);
  const firstWrongRef = useRef(false);
  const startRef = useRef(Date.now());
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current); }, []);
  const persist = usePersistResult(data.level, data.day, data.idx, data.kind);

  const [epoch, setEpoch] = useState(0);
  // 按题型分组内乱序，保持"情景应答 → 对话填空 → 语境判断"能力递进。
  // 用 ref 渲染期缓存，仅在 epoch(重试信号) 变化时重洗一次。
  // 不用 useMemo：缓存会被 React 丢弃重算，做题中途题目突变。
  const shufRef = useRef<{ sig: number; src: typeof data.tasks; arr: typeof data.tasks } | null>(null);
  if (!shufRef.current || shufRef.current.sig !== epoch || shufRef.current.src !== data.tasks) {
    const order: SceneTask['type'][] = ['situation', 'dialogue', 'context'];
    shufRef.current = { sig: epoch, src: data.tasks, arr: order.flatMap((tp) => shuffle(data.tasks.filter((tk) => tk.type === tp))) };
  }
  const shuffledTasks = shufRef.current.arr;

  const carrots = Math.max(0, 3 - wrongCount);
  const xp = logs.filter(l => l.isCorrect).length * 10;
  const isResult = done;
  const task = shuffledTasks[taskIdx];

  // 侧栏按题型分 3 段（不逐题），与 listen/grammar 的三段结构一致
  const SECTION_TYPES: SceneTask['type'][] = ['situation', 'dialogue', 'context'];
  const steps = useMemo(
    () => SECTION_TYPES
      .filter((tp) => shuffledTasks.some((tk) => tk.type === tp))
      .map((tp) => ({
        key: tp,
        label: t(TYPE_LABEL_KEYS[tp], lang),
        en: tp.toUpperCase(),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shuffledTasks, lang],
  );

  // 当前题所属段在 steps 中的索引
  const currentSectionIdx = useMemo(() => {
    if (!task) return 0;
    const sections = SECTION_TYPES.filter((tp) => shuffledTasks.some((tk) => tk.type === tp));
    return sections.indexOf(task.type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task, shuffledTasks]);

  const advanceTask = useCallback(() => {
    const next = taskIdx + 1;
    if (next >= shuffledTasks.length) {
      setDone(true);
    } else {
      setTaskIdx(next);
      setLockedChoice(null);
      setWrongAttempts(0);
      firstWrongRef.current = false;
    }
  }, [taskIdx, shuffledTasks.length]);

  const handlePick = (i: number) => {
    if (lockedChoice !== null) return;
    if (!task) return;
    const choices = getSceneChoices(task);
    const correct = choices[i]?.correct;
    if (correct) {
      sfxCorrect();
      setLockedChoice(i);
      const log: AnswerLog = {
        taskId: task.id,
        prompt: task.type === 'context' ? task.ko : task.type === 'situation' ? task.scenario : task.blankSpeaker,
        userAnswer: choices[i].text,
        correctAnswer: choices.find(c => c.correct)?.text ?? '',
        isCorrect: !firstWrongRef.current,
        explanation: firstWrongRef.current ? task.explain : undefined,
      };
      setLogs(prev => [...prev, log]);
      advanceTimerRef.current = setTimeout(advanceTask, 700);
    } else {
      sfxWrong();
      if (!firstWrongRef.current) {
        firstWrongRef.current = true;
        setWrongCount(w => w + 1);
      }
      const newWrong = wrongAttempts + 1;
      setWrongAttempts(newWrong);
      if (newWrong >= 3) setLockedChoice(i);
    }
  };

  const continueWrong = () => {
    if (!task) return;
    const choices = getSceneChoices(task);
    const log: AnswerLog = {
      taskId: task.id,
      prompt: task.type === 'context' ? task.ko : task.type === 'situation' ? task.scenario : task.blankSpeaker,
      userAnswer: lockedChoice !== null ? choices[lockedChoice].text : '',
      correctAnswer: choices.find(c => c.correct)?.text ?? '',
      isCorrect: false,
      explanation: task.explain,
    };
    setLogs(prev => [...prev, log]);
    advanceTask();
  };

  const handleSkip = () => {
    if (!task || lockedChoice !== null) return;
    sfxPop();
    const choices = getSceneChoices(task);
    setLogs(prev => [...prev, {
      taskId: task.id,
      prompt: task.type === 'context' ? task.ko : task.type === 'situation' ? task.scenario : task.blankSpeaker,
      userAnswer: t('diary.scene.skipped', lang),
      correctAnswer: choices.find(c => c.correct)?.text ?? '',
      isCorrect: true, // 跳过视为通过
      explanation: task.explain,
    }]);
    advanceTask();
  };

  const handleRetry = () => {
    setTaskIdx(0); setWrongCount(0); setWrongAttempts(0);
    setLockedChoice(null); setLogs([]); setDone(false);
    firstWrongRef.current = false;
    setEpoch((e) => e + 1);
    startRef.current = Date.now();
  };

  const handlePhaseJump = useCallback((key: string) => {
    const target = shuffledTasks.findIndex((tk) => tk.type === key);
    if (target < 0) return;
    setTaskIdx(target);
    setLockedChoice(null);
    setWrongAttempts(0);
    setDone(false);
    firstWrongRef.current = false;
    startRef.current = Date.now();
  }, [shuffledTasks]);

  // 链式进下一关，无数据则回日记列表
  const nextSub = hasSubQuest(data.level, data.day, 5)
    ? `/diary/${data.level}/${data.day}/5`
    : '/diary';

  return (
    <SubQuestFrame
      level={data.level} day={data.day} idx={data.idx}
      koTitle={data.koTitle} subtitle={data.subtitle} kindLabel={t('diary.scene.kindLabel', lang)}
      steps={steps} currentStepIdx={currentSectionIdx} isResult={isResult}
      carrots={carrots} xp={xp}
      onPhaseJump={handlePhaseJump}
    >
      {isResult ? (
        <ResultShell
          wrongCount={wrongCount}
          total={shuffledTasks.length}
          elapsedMs={Date.now() - startRef.current}
          level={data.level} day={data.day}
          eyebrow={t('diary.scene.eyebrowDone', lang)}
          nextLabel={t('diary.scene.nextBoss', lang)}
          onPersist={persist}
          onRetry={handleRetry}
          onBack={() => router.push('/diary')}
          onNext={() => router.push(nextSub)}
        />
      ) : task ? (
        <TaskView
          task={task}
          idx={taskIdx}
          total={shuffledTasks.length}
          lockedChoice={lockedChoice}
          wrongAttempts={wrongAttempts}
          onPick={handlePick}
          onContinueWrong={continueWrong}
          isAdmin={isAdmin}
          onSkip={handleSkip}
        />
      ) : null}
    </SubQuestFrame>
  );
}

// ───────────────────────────────────────────────────────────

function TaskView({
  task, idx, total, lockedChoice, wrongAttempts,
  onPick, onContinueWrong, isAdmin, onSkip,
}: {
  task: SceneTask;
  idx: number; total: number;
  lockedChoice: number | null;
  wrongAttempts: number;
  onPick: (i: number) => void;
  onContinueWrong: () => void;
  isAdmin: boolean;
  onSkip: () => void;
}) {
  const { lang } = useLang();
  const label = t(TYPE_LABEL_KEYS[task.type], lang);
  const choices = getSceneChoices(task);

  const correctText = choices.find(c => c.correct)?.text ?? '';
  const isLockedWrong = lockedChoice !== null && !choices[lockedChoice]?.correct;
  const isLockedCorrect = lockedChoice !== null && !!choices[lockedChoice]?.correct;

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.12em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>
        {label} · {idx + 1} / {total}
      </div>
      {isAdmin && lockedChoice === null && (
        <button
          onClick={onSkip}
          title={t('diary.scene.skipTitle', lang)}
          style={{
            position: 'absolute', top: -6, right: 0, zIndex: 2,
            padding: '3px 10px', fontSize: 11,
            border: '1px solid var(--line)', borderRadius: 999,
            background: 'var(--paper)', color: 'var(--ink-3)', cursor: 'pointer',
          }}
        >{t('diary.scene.skip', lang)}</button>
      )}

      {/* 题干 */}
      <div style={{ marginBottom: 18 }}>
        {task.type === 'situation' && (
          <div style={{
            background: 'var(--paper-deep)', borderRadius: 12, padding: '14px 16px',
            fontSize: 15, color: 'var(--ink)', lineHeight: 1.7, fontWeight: 600,
          }}>
            {task.scenario}
          </div>
        )}

        {task.type === 'dialogue' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {task.lines.map((l, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}>
                <span style={{
                  flexShrink: 0, fontSize: 11, fontWeight: 700, color: 'var(--ink-3)',
                  paddingTop: 3, minWidth: 36,
                }}>{l.speaker}</span>
                <div style={{
                  background: 'var(--paper-deep)', border: '1px solid var(--line)',
                  borderRadius: 10, padding: '8px 12px', flex: 1,
                }}>
                  <div style={{ fontFamily: 'var(--font-ko)', fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>
                    {l.ko}
                  </div>
                  {(isLockedCorrect || isLockedWrong) && (
                    <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{l.zh}</div>
                  )}
                </div>
              </div>
            ))}
            {/* 空白行 */}
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{
                flexShrink: 0, fontSize: 11, fontWeight: 700, color: TYPE_COLORS.dialogue,
                paddingTop: 3, minWidth: 36,
              }}>{task.blankSpeaker}</span>
              <div style={{
                border: `1.5px dashed ${TYPE_COLORS.dialogue}`, borderRadius: 10,
                padding: '8px 12px', flex: 1, minHeight: 48,
                display: 'flex', alignItems: 'center',
                color: isLockedCorrect ? TYPE_COLORS.dialogue : 'var(--ink-3)',
                fontFamily: 'var(--font-ko)', fontSize: 17, fontWeight: 700,
              }}>
                {isLockedCorrect ? correctText : '＿＿？'}
              </div>
            </div>
          </div>
        )}

        {task.type === 'context' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-block', fontFamily: 'var(--font-ko)',
              fontSize: 26, fontWeight: 800, color: 'var(--ink)',
              marginBottom: 8,
            }}>
              {task.ko}
            </div>
            <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>{task.promptZh}</div>
          </div>
        )}
      </div>

      {/* 机会提示 */}
      {wrongAttempts > 0 && wrongAttempts < 3 && lockedChoice === null && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'center', marginBottom: 10 }}>
          {[0,1,2].map(k => (
            <span key={k} style={{
              width: 8, height: 8, borderRadius: '50%',
              background: k < wrongAttempts ? 'var(--stamp)' : 'var(--line)',
            }} />
          ))}
          <span style={{ fontSize: 11, color: 'var(--stamp)', marginLeft: 4 }}>{t('diary.scene.chancesLeft', lang, { n: 3 - wrongAttempts })}</span>
        </div>
      )}

      {/* 选项 · 韩文选项在未锁定时不显示中文剧透 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {choices.map((c, i) => {
          const isPicked = lockedChoice === i;
          const showCorrect = isPicked && c.correct;
          const showWrong = isPicked && !c.correct;
          const revealCorrect = isLockedWrong && c.correct;
          const revealSub = c.sub && (isPicked || revealCorrect || isLockedWrong);
          return (
            <button
              key={i}
              onClick={() => onPick(i)}
              disabled={lockedChoice !== null}
              className={`subquest-choice${showCorrect || revealCorrect ? ' is-correct' : ''}${showWrong ? ' is-wrong' : ''}`}
            >
              <span className="subquest-choice-badge">
                {showCorrect || revealCorrect ? '✓' : showWrong ? '✕' : String.fromCharCode(65 + i)}
              </span>
              <span style={{ fontFamily: task.type !== 'context' ? 'var(--font-ko)' : 'inherit', fontSize: 15 }}>
                {c.text}
              </span>
              {revealSub && <span style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 6 }}>（{c.sub}）</span>}
            </button>
          );
        })}
      </div>

      {/* 答错反馈 */}
      {isLockedWrong && (
        <div className="subquest-feedback" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <RotateCcw size={14} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>{t('diary.scene.outOfChances', lang, { answer: correctText })}</span>
          </div>
          {task.explain && (
            <div style={{ width: '100%', paddingTop: 8, borderTop: '1px dashed color-mix(in srgb, var(--stamp) 25%, transparent)' }}>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.06em', marginBottom: 4 }}>💡 {t('diary.sqs.explainLabel', lang)}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7 }}>{task.explain}</div>
            </div>
          )}
          <button className="subquest-retry-btn" style={{ alignSelf: 'flex-end' }} onClick={onContinueWrong}>
            {t('diary.scene.gotItContinue', lang)}
          </button>
        </div>
      )}
    </div>
  );
}
