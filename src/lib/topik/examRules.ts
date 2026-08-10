// TOPIK 真考规则常量。所有页面共用，禁止在页面里硬编码这些数字。

import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/i18n';

export type TopikLevel = 'I' | 'II';
export type ExamMode = 'real' | 'practice';

export interface SectionTiming {
  [k: string]: unknown;
  listeningMinutes: number;
  readingMinutes: number;
  totalMinutes: number;
}

// 单段时限（按 TOPIK 官方）
export function getTiming(level: TopikLevel): SectionTiming {
  if (level === 'I') return { listeningMinutes: 40, readingMinutes: 60, totalMinutes: 100 };
  return { listeningMinutes: 60, readingMinutes: 70, totalMinutes: 130 };
}

// 单段题数（按 TOPIK 官方）
export function getQuestionCount(level: TopikLevel) {
  if (level === 'I') return { listening: 30, reading: 40, total: 70 };
  return { listening: 50, reading: 50, total: 100 };
}

// 总分 + 每题分值（TOPIK 每题 2 分）
export function getScoring(level: TopikLevel) {
  if (level === 'I') return { perQuestion: 2, maxScore: 200 };
  return { perQuestion: 2, maxScore: 300 };
}

// 等级估测分数线（按官方阈值）
// I 级：80=2级 / 140=2级以上需配合 II 级才有意义。实际上 I 级 80-139 为 1 级，140-200 为 2 级
// II 级：120=3级 / 150=4级 / 190=5级 / 230=6级
export function estimateGrade(level: TopikLevel, totalScore: number, lang: Lang = 'zh'): { grade: number | null; label: string } {
  if (level === 'I') {
    if (totalScore >= 140) return { grade: 2, label: 'TOPIK 2급' };
    if (totalScore >= 80)  return { grade: 1, label: 'TOPIK 1급' };
    return { grade: null, label: t('topik.below_level', lang, { level: 1 }) };
  }
  if (totalScore >= 230) return { grade: 6, label: 'TOPIK 6급' };
  if (totalScore >= 190) return { grade: 5, label: 'TOPIK 5급' };
  if (totalScore >= 150) return { grade: 4, label: 'TOPIK 4급' };
  if (totalScore >= 120) return { grade: 3, label: 'TOPIK 3급' };
  return { grade: null, label: t('topik.below_level', lang, { level: 3 }) };
}

// 听力重听次数：35届及之前每题 2 次，36届起每题 1 次
export function getListeningPlayCount(examRound: number): 1 | 2 {
  return examRound <= 35 ? 2 : 1;
}

// 会话是否合格：真题模式用 TOPIK 官方等级阈值（I ≥80 = 1级；II ≥120 = 3级），其它模式沿用 60 分百分制
export function isSessionPassed(session: { mode: string; examSetId?: string; score: number }): boolean {
  if (session.mode === 'exam' && session.examSetId) {
    const level: TopikLevel = session.examSetId.endsWith('-II') ? 'II' : 'I';
    return level === 'I' ? session.score >= 80 : session.score >= 120;
  }
  return session.score >= 60;
}

// 排序好的模拟卷列表（过滤零题 + level→round 升序），hub 和 start 页共用保证门控序号一致
export function getSortedMockSets<T extends { mock?: boolean; sections?: Array<{ questionIds?: string[] }>; level?: string; round?: number }>(sets: T[]): T[] {
  const filtered = sets.filter(s => s.mock === true && s.sections?.some(sec => (sec.questionIds?.length ?? 0) > 0));
  filtered.sort((a, b) => {
    if ((a.level || '') !== (b.level || '')) return (a.level || '') < (b.level || '') ? -1 : 1;
    return (a.round || 0) - (b.round || 0);
  });
  return filtered;
}

// 获取模拟卷在有序列表里的下标（用于免费档前 N 套判断），-1 表示不在列表内
export function getMockExamOrdinal<T extends { id: string; mock?: boolean; sections?: Array<{ questionIds?: string[] }>; level?: string; round?: number }>(sets: T[], examId: string): number {
  return getSortedMockSets(sets).findIndex(s => s.id === examId);
}
