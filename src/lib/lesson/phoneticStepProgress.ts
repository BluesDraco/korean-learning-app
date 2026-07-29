// 分步学习进度读取
import { db } from '@/lib/db';
import { PROGRESSIVE_STAGES } from '@/data/phonetics-progressive';

export interface StageProgress {
  stageId: number;
  locked: boolean;
  lessons: { letter: boolean; quiz: boolean; write: boolean; blend: boolean };
  completed: boolean;     // stage_complete=99 是否写入
  doneCount: number;      // 0~4
}

export type AllStageProgress = Record<number, StageProgress>;

const LESSON_IDX = { letter: 0, quiz: 1, write: 2, blend: 3, stage_complete: 99 } as const;

export async function getAllStageProgress(): Promise<AllStageProgress> {
  let all: { dayNum: number; itemIdx: number }[] = [];
  try {
    const rows = await db.lessonMastery.where('itemType').equals('phonetic_step').toArray();
    all = rows.map((r) => ({ dayNum: r.dayNum, itemIdx: r.itemIdx }));
  } catch {
    // 未登录或离线，全部当作未完成
    all = [];
  }

  const result: AllStageProgress = {};
  for (const stage of PROGRESSIVE_STAGES) {
    const rows = all.filter((r) => r.dayNum === stage.id);
    const has = (idx: number) => rows.some((r) => r.itemIdx === idx);
    const lessons = {
      letter: has(LESSON_IDX.letter),
      quiz: has(LESSON_IDX.quiz),
      write: has(LESSON_IDX.write),
      blend: has(LESSON_IDX.blend),
    };
    const doneCount = Object.values(lessons).filter(Boolean).length;
    result[stage.id] = {
      stageId: stage.id,
      locked: stage.locked,
      lessons,
      completed: has(LESSON_IDX.stage_complete),
      doneCount,
    };
  }
  return result;
}

// 当前活跃的 stage（最低没全通的非锁阶段）。返回 -1 表示所有阶段已完成
export function getCurrentStage(progress: AllStageProgress): number {
  for (const stage of PROGRESSIVE_STAGES) {
    if (stage.locked) continue;
    const p = progress[stage.id];
    if (!p || !p.completed) return stage.id;
  }
  return -1;
}
