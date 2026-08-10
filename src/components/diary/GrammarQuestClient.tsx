'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { GrammarSubQuestData } from '@/types/tori-subquest';
import {
  SubQuestFrame, ChoiceBlock, ComposeBlock, ResultShell,
  usePersistResult, useSubQuestState, AnswerLog, shuffleArray as shuffle,
} from '@/components/diary/SubQuestShared';
import { hasSubQuest } from '@/data/diary/subquests';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

type Phase = 'fix' | 'compose' | 'rule' | 'result';

const STEPS = [
  { key: 'fix',     labelKey: 'diary.gq.step_fix',     en: 'Particle Fix' },
  { key: 'compose', labelKey: 'diary.gq.step_compose', en: 'Compose' },
  { key: 'rule',    labelKey: 'diary.gq.step_rule',    en: 'Rule Choice' },
];

const PHASE_ORDER: Phase[] = ['fix', 'compose', 'rule', 'result'];

export default function GrammarQuestClient({ data }: { data: GrammarSubQuestData }) {
  const router = useRouter();
  const { lang } = useLang();
  const steps = STEPS.map((s) => ({ key: s.key, label: t(s.labelKey, lang), en: s.en }));
  const [phase, setPhase] = useState<Phase>('fix');
  const [taskIdx, setTaskIdx] = useState(0);
  const { wrongCount, epoch, startRef, carrots, xp, recordLog, reset } = useSubQuestState();
  const persist = usePersistResult(data.level, data.day, data.idx, data.kind);

  // 用 ref 渲染期缓存，仅在 epoch(重试信号) 变化时重洗一次。data 是静态常量引用恒稳。
  // 不用 useMemo：缓存会被 React 丢弃重算，做题中途题目顺序突变。
  const shufRef = useRef<{ sig: number; src: typeof data.fix; fix: typeof data.fix; compose: typeof data.compose; rule: typeof data.rule } | null>(null);
  if (!shufRef.current || shufRef.current.sig !== epoch || shufRef.current.src !== data.fix) {
    shufRef.current = { sig: epoch, src: data.fix, fix: shuffle(data.fix), compose: shuffle(data.compose), rule: shuffle(data.rule) };
  }
  const shuffledFix     = shufRef.current.fix;
  const shuffledCompose = shufRef.current.compose;
  const shuffledRule    = shufRef.current.rule;

  const getShuffled = (p: Phase) => {
    if (p === 'fix')     return shuffledFix;
    if (p === 'compose') return shuffledCompose;
    if (p === 'rule')    return shuffledRule;
    return [];
  };

  // 某阶段无题（数据为空）时自动跳到下一阶段，避免卡死在空白页
  useEffect(() => {
    if (phase === 'result') return;
    if (getShuffled(phase).length === 0) {
      const cur = PHASE_ORDER.indexOf(phase);
      setPhase(PHASE_ORDER[cur + 1]);
      setTaskIdx(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, shuffledFix.length, shuffledCompose.length, shuffledRule.length]);

  const handleResolve = useCallback((log: AnswerLog) => {
    recordLog(log);
    const tasks = getShuffled(phase);
    const nextIdx = taskIdx + 1;
    if (nextIdx < tasks.length) {
      setTaskIdx(nextIdx);
    } else {
      const cur = PHASE_ORDER.indexOf(phase);
      setPhase(PHASE_ORDER[cur + 1]);
      setTaskIdx(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, taskIdx, recordLog]);

  const handlePhaseJump = useCallback((key: string) => {
    setPhase(key as Phase); setTaskIdx(0);
  }, []);

  const stepIdx = PHASE_ORDER.indexOf(phase);
  const isResult = phase === 'result';
  const totalTasks = shuffledFix.length + shuffledCompose.length + shuffledRule.length;

  const handleRetry = () => {
    setPhase('fix'); setTaskIdx(0);
    reset();
  };

  // 链式进下一关，无数据则回日记列表
  const nextSub = hasSubQuest(data.level, data.day, 4)
    ? `/diary/${data.level}/${data.day}/4`
    : '/diary';

  const renderTask = () => {
    const stepLabel = steps[stepIdx]?.label ?? '';
    if (phase === 'fix') {
      const task = shuffledFix[taskIdx];
      return task ? <ChoiceBlock key={`fix-${taskIdx}`} task={task} index={taskIdx} total={shuffledFix.length} tagLabel={stepLabel} onResolve={handleResolve} /> : null;
    }
    if (phase === 'compose') {
      const task = shuffledCompose[taskIdx];
      return task ? <ComposeBlock key={`compose-${taskIdx}`} task={task} index={taskIdx} total={shuffledCompose.length} tagLabel={stepLabel} onResolve={handleResolve} /> : null;
    }
    if (phase === 'rule') {
      const task = shuffledRule[taskIdx];
      return task ? <ChoiceBlock key={`rule-${taskIdx}`} task={task} index={taskIdx} total={shuffledRule.length} tagLabel={stepLabel} onResolve={handleResolve} /> : null;
    }
    return null;
  };

  return (
    <SubQuestFrame
      level={data.level} day={data.day} idx={data.idx}
      koTitle={data.koTitle} subtitle={data.subtitle} kindLabel={t('diary.gq.kind_label', lang)}
      steps={steps} currentStepIdx={stepIdx} isResult={isResult}
      carrots={carrots} xp={xp}
      onPhaseJump={handlePhaseJump}
    >
      {isResult ? (
        <ResultShell
          wrongCount={wrongCount}
          total={totalTasks}
          elapsedMs={Date.now() - startRef.current}
          level={data.level} day={data.day}
          eyebrow={`문법 탐험 · ${t('diary.gq.done', lang)}`}
          nextLabel={t('diary.gq.next_scene', lang)}
          onPersist={persist}
          onRetry={handleRetry}
          onBack={() => router.push('/diary')}
          onNext={() => router.push(nextSub)}
        />
      ) : renderTask()}
    </SubQuestFrame>
  );
}
