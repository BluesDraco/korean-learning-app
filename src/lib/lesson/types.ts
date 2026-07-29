export type MasteryStatus = 'new' | 'learning' | 'reviewing' | 'mastered';

/** phonetics/40音 · 步骤掌握度写入 lessonMastery 表 */
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

export type CardType = 'goal' | 'word-intro' | 'sentence-intro' | 'grammar-intro' | 'listen-choice' | 'speak-repeat' | 'match-pairs' | 'output' | 'summary';

export type EventAction = 'view' | 'reveal' | 'answer_correct' | 'answer_wrong' | 'output_submit' | 'complete' | 'speak' | 'build' | 'match';

/** phonetics/40音 · 完成事件写入 learningEvents 表 */
export interface LearningEvent {
  id: string;
  dayNum: number;
  cardType: CardType;
  action: EventAction;
  detail: string;
  timestamp: number;
}
