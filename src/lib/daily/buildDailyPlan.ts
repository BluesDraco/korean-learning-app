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

export async function getUserCourseDay(): Promise<number> {
  const words = await db.words.toArray();
  let maxDay = 0;
  for (const w of words) {
    if (w.source === 'course' && w.sourceDetail) {
      const m = w.sourceDetail.match(/Day (\d+)/);
      if (m) {
        const d = parseInt(m[1], 10);
        if (d > maxDay) maxDay = d;
      }
    }
  }
  if (maxDay === 0) return 1;
  return Math.min(maxDay + 1, 30);
}

export async function buildDailyPlan(): Promise<DailyPlan> {
  const now = Date.now();
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const todayLog = await getTodayLog();

  const courseDay = await getUserCourseDay();
  const course = thirtyDayCourse[courseDay - 1] || null;

  const allWords = await db.words.toArray();
  const dueCount = allWords.filter((w) => w.nextReview <= now).length;

  const srsDone = (todayLog?.wordsReviewed ?? 0) > 0 || dueCount === 0;
  const pronunciationDone = (todayLog?.dictationsDone ?? 0) >= 3;
  const readingDone = (todayLog?.minutesStudied ?? 0) >= 5;
  const outputDone = (todayLog?.wordsLearned ?? 0) >= 3;

  const stage: 'beginner' | 'active' | 'completed' =
    courseDay <= 7 ? 'beginner' : courseDay <= 30 ? 'active' : 'completed';

  const grammarId = course?.grammar?.grammarId;

  const tasks: DailyTask[] = [];

  // Course task (always first priority)
  if (course && stage !== 'completed') {
    tasks.push({
      key: 'course',
      label: '继续学习',
      detail: `Day ${course.day} · ${course.title} — ${course.words.length} 单词 · 1 语法 · ${course.sentences.length} 句子`,
      href: `/course/${course.day}?source=daily`,
      done: false,
      priority: 1,
    });
  }

  // SRS review
  tasks.push({
    key: 'srsReview',
    label: '词汇复习',
    detail: dueCount > 0 ? `${dueCount} 个单词待复习` : srsDone ? '已全部复习' : '暂无待复习单词',
    href: '/review',
    done: srsDone,
    priority: 2,
  });

  // Pronunciation
  tasks.push({
    key: 'pronunciation',
    label: '发音练习',
    detail: pronunciationDone ? '已完成今日发音练习' : '巩固韩语发音',
    href: '/pronunciation',
    done: pronunciationDone,
    priority: 3,
  });

  // Reading (optional for beginners)
  tasks.push({
    key: 'reading',
    label: '阅读',
    detail: readingDone ? '已完成今日阅读' : '读一篇韩语文章或绘本',
    href: '/reading',
    done: readingDone,
    priority: 4,
    optional: stage === 'beginner',
  });

  // Output task
  tasks.push({
    key: 'output',
    label: '输出练习',
    detail: outputDone
      ? '已完成输出练习'
      : grammarId
        ? `用 "${course?.grammar?.pattern}" 写一句话`
        : '用今天学的单词造个句',
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
