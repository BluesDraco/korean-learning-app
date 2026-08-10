'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

  // shuffle tasks order within each label group — preserves capability progression。
  // 用 ref 渲染期缓存，仅在 data.tasks 或 epoch(重试信号) 变化时重洗一次。
  // 不用 useMemo：缓存会被 React 丢弃重算，导致做题中途题目顺序突变（当前题变成另一道）。
  const shuffledRef = useRef<{ epoch: number; src: typeof data.tasks; arr: typeof data.tasks } | null>(null);
  if (!shuffledRef.current || shuffledRef.current.epoch !== epoch || shuffledRef.current.src !== data.tasks) {
    shuffledRef.current = { epoch, src: data.tasks, arr: shuffleWithinGroups(data.tasks) };
  }
  const shuffledTasks = shuffledRef.current.arr;

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
  }, [shuffledTasks]);

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
