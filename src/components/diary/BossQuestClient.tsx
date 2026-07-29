'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { BossSubQuestData } from '@/types/tori-subquest';
import {
  SubQuestFrame, ChoiceBlock, ComposeBlock, ResultShell,
  usePersistResult, useSubQuestState, AnswerLog, shuffleArray as shuffle,
} from '@/components/diary/SubQuestShared';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

/**
 * 按 label 分组内乱序，保持组间原序（能力递进不打乱）。
 * 同 label 视为同一考察点。
 */
function shuffleWithinGroups<T extends { label: string }>(arr: T[]): T[] {
  const groups: T[][] = [];
  const seen = new Map<string, number>();
  arr.forEach((item) => {
    let g = seen.get(item.label);
    if (g === undefined) { g = groups.length; seen.set(item.label, g); groups.push([]); }
    groups[g].push(item);
  });
  return groups.flatMap((g) => shuffle(g));
}

export default function BossQuestClient({ data }: { data: BossSubQuestData }) {
  const router = useRouter();
  const { lang } = useLang();
  const [taskIdx, setTaskIdx] = useState(0);
  const [done, setDone] = useState(false);
  const { wrongCount, epoch, startRef, carrots, xp, recordLog, reset } = useSubQuestState();
  const persist = usePersistResult(data.level, data.day, data.idx, data.kind);

  // shuffle tasks order within each label group — preserves capability progression
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const shuffledTasks = useMemo(() => shuffleWithinGroups(data.tasks), [data.tasks, epoch]);

  const isResult = done;

  const handleResolve = useCallback((log: AnswerLog) => {
    recordLog(log);
    const next = taskIdx + 1;
    if (next >= shuffledTasks.length) {
      setDone(true);
    } else {
      setTaskIdx(next);
    }
  }, [taskIdx, shuffledTasks.length, recordLog]);

  const handleRetry = () => {
    setTaskIdx(0); setDone(false);
    reset();
  };

  const current = shuffledTasks[taskIdx];
  const tagLabel = current?.label ?? 'Boss';

  // 无题（数据为空）时不自动通关，避免空数据三星落库
  useEffect(() => {
    if (!done && shuffledTasks.length === 0) {
      // 直接跳回日记列表，不落库
      router.replace('/diary');
    }
  }, [done, shuffledTasks.length, router]);

  // 侧栏按 label 归组（同 label 视为一段）
  const steps = useMemo(() => {
    const seen: string[] = [];
    shuffledTasks.forEach((tk) => { if (!seen.includes(tk.label)) seen.push(tk.label); });
    return seen.map((label) => ({ key: label, label, en: label }));
  }, [shuffledTasks]);

  const currentSectionIdx = useMemo(() => {
    if (!current) return 0;
    return steps.findIndex((s) => s.key === current.label);
  }, [current, steps]);

  const handlePhaseJump = useCallback((key: string) => {
    const target = shuffledTasks.findIndex((tk) => tk.label === key);
    if (target < 0) return;
    setTaskIdx(target);
    setDone(false);
    reset();
  }, [shuffledTasks, reset]);

  return (
    <SubQuestFrame
      level={data.level} day={data.day} idx={data.idx}
      koTitle={data.koTitle} subtitle={data.subtitle} kindLabel={t('diary.boss.kind', lang)}
      steps={steps}
      currentStepIdx={currentSectionIdx}
      isResult={isResult}
      carrots={carrots} xp={xp}
      onPhaseJump={handlePhaseJump}
    >
      {isResult ? (
        <ResultShell
          wrongCount={wrongCount}
          total={shuffledTasks.length}
          elapsedMs={Date.now() - startRef.current}
          level={data.level} day={data.day}
          eyebrow={`최후의 관문 · ${t('diary.boss.done', lang)}`}
          nextLabel={null}
          outroHook={data.outroHook}
          onPersist={persist}
          onRetry={handleRetry}
          onBack={() => router.push('/diary')}
          onNext={() => router.push('/diary')}
        />
      ) : current ? (
        <div>
          {taskIdx === 0 && (
            <div style={{
              marginBottom: 18, padding: '14px 16px',
              background: 'color-mix(in srgb, var(--gold) 8%, var(--paper))',
              border: '1px solid color-mix(in srgb, var(--gold) 30%, transparent)',
              borderRadius: 12, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7,
              fontStyle: 'italic',
            }}>
              {data.intro}
            </div>
          )}
          {current.type === 'choice' ? (
            <ChoiceBlock
              key={`boss-${taskIdx}`}
              task={current.task}
              index={taskIdx}
              total={shuffledTasks.length}
              tagLabel={tagLabel}
              onResolve={handleResolve}
            />
          ) : (
            <ComposeBlock
              key={`boss-${taskIdx}`}
              task={current.task}
              index={taskIdx}
              total={shuffledTasks.length}
              tagLabel={tagLabel}
              onResolve={handleResolve}
            />
          )}
        </div>
      ) : null}
    </SubQuestFrame>
  );
}
