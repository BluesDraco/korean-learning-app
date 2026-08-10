import { db } from '@/lib/db';
import { getTodayLog } from '@/lib/gamification';
import { thirtyDayCourse } from '@/data/thirtyDayCourse';
import type { DailyCourse } from '@/data/thirtyDayCourse';

export interface DailyPlan {
  date: number;
  courseDay: number;
  course: DailyCourse | null;
  srsReview: { dueCount: number; done: boolean };
  pronunciation: { done: boolean };
  reading: { done: boolean };
  output: { done: boolean; grammarId?: string };
  tasks: DailyTask[];
  allDone: boolean;
  completedCount: number;
  totalCount: number;
}

export interface DailyTask {
  key: string;
  label: string;
  detail: string;
  href: string;
  done: boolean;
  priority: number;
  optional?: boolean;
}

function deriveCourseDay(
  completeEvents: { dayNum?: number }[],
  words: { source?: string; sourceDetail?: string }[],
): number {
  let maxDay = 0;
  for (const e of completeEvents) {
    if (e.dayNum && e.dayNum > maxDay) maxDay = e.dayNum;
  }
  if (maxDay > 0) return Math.min(maxDay + 1, 30);

  for (const w of words) {
    if (w.source === 'course' && w.sourceDetail) {
      const m = w.sourceDetail.match(/Day (\d+)/);
      if (m) {
        const d = parseInt(m[1], 10);
        if (d > maxDay) maxDay = d;
      }
    }
  }
  return maxDay === 0 ? 1 : Math.min(maxDay + 1, 30);
}

// Exported for external callers that only need the course day
export async function getUserCourseDay(): Promise<number> {
  const [events, words] = await Promise.all([
    db.learningEvents.where('action').equals('complete').toArray().catch(() => []),
    db.words.toArray().catch(() => []),
  ]);
  return deriveCourseDay(events, words);
}

export async function buildDailyPlan(): Promise<DailyPlan> {
  const now = Date.now();
  const todayStart = new Date().setHours(0, 0, 0, 0);

  // Single parallel round-trip for all data
  const [
    todayLog,
    allWords,
    completeEvents,
    outputEvents,
    pronunciationAttempts,
    readingEvents,
  ] = await Promise.all([
    getTodayLog().catch(() => null),
    db.words.toArray().catch(() => []),
    db.learningEvents.where('action').equals('complete').toArray().catch(() => []),
    db.learningEvents.where('action').equals('output').toArray().catch(() => []),
    db.pronunciationAttempts.where('createdAt').above(todayStart).toArray().catch(() => []),
    db.articleLearningEvents.where('createdAt').above(todayStart).toArray().catch(() => []),
  ]);

  const courseDay = deriveCourseDay(completeEvents, allWords);
  const course = thirtyDayCourse[courseDay - 1] || null;
  const dueCount = allWords.filter((w) => w.nextReview <= now).length;
  const srsDone = (todayLog?.wordsReviewed ?? 0) > 0 || dueCount === 0;
  const pronunciationDone = pronunciationAttempts.length > 0;
  const readingDone = readingEvents.length >= 3;
  const outputDone = outputEvents.some((e) => e.timestamp >= todayStart);

  const stage: 'beginner' | 'active' | 'completed' =
    courseDay <= 7 ? 'beginner' : courseDay <= 30 ? 'active' : 'completed';

  const hasStartedCourse = completeEvents.length > 0;
  const grammarId = hasStartedCourse ? course?.grammar?.grammarId : undefined;
  // Course is done today if there's a complete event for the current courseDay
  const courseDone = course ? completeEvents.some(
    (e) => e.dayNum === course.day && e.timestamp >= todayStart
  ) : false;
  const tasks: DailyTask[] = [];

  if (course && stage !== 'completed') {
    tasks.push({
      key: 'course',
      label: '继续学习',
      detail: courseDone
        ? `已完成 Day ${course.day} · ${course.title}`
        : `Day ${course.day} · ${course.title} — ${course.words.length} 单词 · 1 语法 · ${course.sentences.length} 句子`,
      href: `/course/${course.day}?source=daily`,
      done: courseDone,
      priority: 1,
    });
  }

  tasks.push({
    key: 'srsReview',
    label: '词汇复习',
    detail: dueCount > 0 ? `${dueCount} 个单词待复习` : srsDone ? '已全部复习' : '暂无待复习单词',
    href: '/review',
    done: srsDone,
    priority: 2,
  });

  tasks.push({
    key: 'pronunciation',
    label: '发音练习',
    detail: pronunciationDone ? '已完成今日发音练习' : '巩固韩语发音',
    href: '/pronunciation',
    done: pronunciationDone,
    priority: 3,
  });

  tasks.push({
    key: 'reading',
    label: '阅读',
    detail: readingDone ? '已完成今日阅读' : '读一篇韩语文章或绘本',
    href: '/reading',
    done: readingDone,
    priority: 4,
    optional: stage === 'beginner',
  });

  tasks.push({
    key: 'output',
    label: '输出练习',
    detail: outputDone
      ? '已完成输出练习'
      : grammarId
        ? `用 "${course?.grammar?.pattern}" 写一句话`
        : '用今天学到的内容造个句',
    href: grammarId ? `/grammar?pattern=${grammarId}` : '/writing',
    done: outputDone,
    priority: 5,
    optional: stage === 'beginner',
  });

  const completedCount = tasks.filter((t) => t.done).length;
  const totalCount = tasks.length;

  return {
    date: todayStart,
    courseDay,
    course,
    srsReview: { dueCount, done: srsDone },
    pronunciation: { done: pronunciationDone },
    reading: { done: readingDone },
    output: { done: outputDone, grammarId },
    tasks,
    allDone: tasks.every((t) => t.done),
    completedCount,
    totalCount,
  };
}
