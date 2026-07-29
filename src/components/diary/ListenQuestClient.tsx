'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ListenSubQuestData } from '@/types/tori-subquest';
import {
  SubQuestFrame, ChoiceBlock, ResultShell,
  usePersistResult, useSubQuestState, AnswerLog, shuffleArray as shuffle,
} from '@/components/diary/SubQuestShared';
import { hasSubQuest } from '@/data/diary/subquests';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

type Phase = 'meaning' | 'cloze' | 'reply' | 'result';

const STEPS = [
  { key: 'meaning', labelKey: 'diary.lq.step_meaning', en: 'Meaning' },
  { key: 'cloze',   labelKey: 'diary.lq.step_cloze',   en: 'Cloze' },
  { key: 'reply',   labelKey: 'diary.lq.step_reply',   en: 'Reply' },
];

const PHASE_ORDER: Phase[] = ['meaning', 'cloze', 'reply', 'result'];

export default function ListenQuestClient({ data }: { data: ListenSubQuestData }) {
  const router = useRouter();
  const { lang } = useLang();
  const steps = STEPS.map((s) => ({ key: s.key, label: t(s.labelKey, lang), en: s.en }));
  const [phase, setPhase] = useState<Phase>('meaning');
  const [taskIdx, setTaskIdx] = useState(0);
  const { wrongCount, epoch, startRef, carrots, xp, recordLog, reset } = useSubQuestState();
  const persist = usePersistResult(data.level, data.day, data.idx, data.kind);

  /* eslint-disable react-hooks/exhaustive-deps */
  // epoch 是 handleRetry 触发新 shuffle 的信号，故意作为依赖
  const shuffledMeaning = useMemo(() => shuffle(data.meaning), [data.meaning, epoch]);
  const shuffledCloze   = useMemo(() => shuffle(data.cloze),   [data.cloze, epoch]);
  const shuffledReply   = useMemo(() => shuffle(data.reply),   [data.reply, epoch]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const taskMap: Record<Exclude<Phase, 'result'>, typeof data.meaning> = {
    meaning: shuffledMeaning,
    cloze:   shuffledCloze,
    reply:   shuffledReply,
  };

  const currentTasks = phase !== 'result' ? taskMap[phase] : [];

  // 某阶段无题（数据为空）时自动跳到下一阶段，避免卡死在空白页
  useEffect(() => {
    if (phase === 'result') return;
    if (currentTasks.length === 0) {
      const cur = PHASE_ORDER.indexOf(phase);
      setPhase(PHASE_ORDER[cur + 1]);
      setTaskIdx(0);
    }
  }, [phase, currentTasks.length]);

  const handleResolve = useCallback((log: AnswerLog) => {
    recordLog(log);
    const tasks = phase !== 'result' ? taskMap[phase] : [];
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
    const p = key as Phase;
    setPhase(p); setTaskIdx(0);
    reset();
  }, [reset]);

  const stepIdx = PHASE_ORDER.indexOf(phase);
  const isResult = phase === 'result';
  const totalTasks = shuffledMeaning.length + shuffledCloze.length + shuffledReply.length;

  const handleRetry = () => {
    setPhase('meaning'); setTaskIdx(0);
    reset();
  };

  // 链式进下一关，无数据则回日记列表
  const nextSub = hasSubQuest(data.level, data.day, 3)
    ? `/diary/${data.level}/${data.day}/3`
    : '/diary';
  const currentTask = currentTasks[taskIdx];

  return (
    <SubQuestFrame
      level={data.level} day={data.day} idx={data.idx}
      koTitle={data.koTitle} subtitle={data.subtitle} kindLabel={t('diary.lq.kind_label', lang)}
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
          eyebrow={`귀 트이기 · ${t('diary.lq.done', lang)}`}
          nextLabel={t('diary.lq.next_grammar', lang)}
          onPersist={persist}
          onRetry={handleRetry}
          onBack={() => router.push('/diary')}
          onNext={() => router.push(nextSub)}
        />
      ) : currentTask ? (
        <ChoiceBlock
          key={`${phase}-${taskIdx}`}
          task={currentTask}
          index={taskIdx}
          total={currentTasks.length}
          tagLabel={steps[stepIdx]?.label ?? ''}
          onResolve={handleResolve}
        />
      ) : null}
    </SubQuestFrame>
  );
}
