// 阅读模块的纯元数据 — 抽离巨型 articles 数据，让 client 组件只引这里就够
import type { Article } from '@/types';

/** 等级标签 */
export const levelLabel: Record<Article['level'], string> = {
  A0: '零基础', A0En: 'Beginner',
  A1: '入门', A1En: 'Beginner',
  A2: '初级', A2En: 'Beginner',
  B1: '进阶', B1En: 'Intermediate',
  B2: '中高级', B2En: 'Upper-intermediate',
  C1: '高级', C1En: 'Advanced',
  C2: '精通', C2En: 'Advanced',
  TOPIK: 'TOPIK',
};

/** 等级颜色 */
export const levelColor: Record<Article['level'], string> = {
  A0: 'bg-emerald-100 text-emerald-700',
  A1: 'bg-teal-100 text-teal-700',
  A2: 'bg-sky-100 text-sky-700',
  B1: 'bg-purple-100 text-purple-700',
  B2: 'bg-orange-100 text-orange-700',
  C1: 'bg-red-100 text-red-700',
  C2: 'bg-rose-100 text-rose-700',
  TOPIK: 'bg-rose-100 text-rose-700',
};
