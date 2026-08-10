// 类型定义保留供 type-only import 使用。
// 实际数据已迁移到 public/data/topik/*.json，运行时走 @/lib/dataLoader 加载。

export interface TopikExamSet {
  id: string;
  year: number;
  round: number;
  level: 'I' | 'II';
  sections: {
    type: 'listening' | 'reading' | 'writing';
    questionIds: string[];
    timeMinutes: number;
  }[];
  available: boolean;
  displayName?: string;
  mock?: boolean;
}

export interface TopikQuestion {
  id: string;
  section: 'listening' | 'reading';
  level: 'beginner' | 'intermediate' | 'advanced';
  topic: string;
  number: number;
  type: 'multiple-choice';
  audioText?: string;
  contextImage?: string;
  prompt: string;
  promptZh: string;
  options: string[];
  correctIdx: number;
  explanation: string;
  vocabulary: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  testPoint?: string;
  errorCategory?: string;
  reviewGrammarId?: string;
  questionType?: string;
  groupId?: string | null;
}

export interface TopikSection {
  id: string;
  title: string;
  titleKo: string;
  description: string;
  section: 'listening' | 'reading';
  level: 'beginner' | 'intermediate' | 'advanced';
  timeMinutes: number;
  questionCount: number;
}
