import type { DailyWord, DailySentence, DailyGrammar, DailyDictation, OutputTask } from '@/data/thirtyDayCourse';

export type CardType = 'word-intro' | 'sentence-intro' | 'grammar-intro' | 'listen-choice' | 'output';

export type MasteryStatus = 'new' | 'learning' | 'reviewing' | 'mastered';

export interface LessonCard {
  type: CardType;
  data: DailyWord | DailySentence | DailyGrammar | DailyDictation | OutputTask;
  speakText?: string;
  options?: string[];
  correctOption?: number;
  /** Item key for mastery tracking: `${type}-${idx}` */
  masteryKey?: string;
}

export interface LessonMastery {
  id: string;
  dayNum: number;
  itemType: string;
  itemIdx: number;
  status: MasteryStatus;
  seenCount: number;
  correctCount: number;
  wrongCount: number;
  lastSeenAt: number;
  nextReviewAt: number;
  interval: number;
  ease: number;
  source: string;
}

export type EventAction = 'view' | 'reveal' | 'answer_correct' | 'answer_wrong' | 'output_submit' | 'complete';

export interface LearningEvent {
  id: string;
  dayNum: number;
  cardType: CardType;
  action: EventAction;
  detail: string;
  timestamp: number;
}

export interface AnswerResult {
  correct: boolean;
  quality: number; // 0-5 for SM-2
  detail: string;
}

export interface LessonProgress {
  /** Overall mastery across all items in the 30-day course (0-100) */
  overallMastery: number;
  /** Current progressive output difficulty level (1-5) */
  outputDifficulty: number;
}
