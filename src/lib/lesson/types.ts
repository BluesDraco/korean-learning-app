import type { DailyWord, DailySentence, DailyGrammar, DailyDictation, OutputTask } from '@/data/thirtyDayCourse';

export type CardType = 'goal' | 'word-intro' | 'sentence-intro' | 'grammar-intro' | 'listen-choice' | 'speak-repeat' | 'match-pairs' | 'output' | 'summary';

export type MasteryStatus = 'new' | 'learning' | 'reviewing' | 'mastered';

export interface LessonCard {
  type: CardType;
  data: DailyWord | DailySentence | DailyGrammar | DailyDictation | OutputTask | GoalData | AbilitySummary;
  speakText?: string;
  options?: string[];
  correctOption?: number;
  masteryKey?: string;
  /** For match-pairs: Korean chunks and Chinese chunks to pair */
  koreanChunks?: string[];
  chineseChunks?: string[];
  /** Max retry attempts for this specific card instance (0 = no retry, default 2) */
  maxRetries?: number;
  /** How many times this card has been retried already */
  retryCount?: number;
  /** Original card index this was cloned from (for retry tracking) */
  originalIndex?: number;
}

export interface GoalData {
  day: number;
  title: string;
  emoji: string;
  goals: string[];
}

export interface AbilitySummary {
  day: number;
  title: string;
  emoji: string;
  abilities: string[];
  wordCount: number;
  sentenceCount: number;
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

export type EventAction = 'view' | 'reveal' | 'answer_correct' | 'answer_wrong' | 'output_submit' | 'complete' | 'speak' | 'build' | 'match';

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
  overallMastery: number;
  outputDifficulty: number;
}

export interface MicroFeedback {
  icon: string;
  text: string;
  color: string;
}
