// ===== YouTube Video =====
export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  thumbnail: string;
  channelName: string;
  addedAt: number;
  tags: string[];
}

// ===== Subtitle Entry =====
export interface Subtitle {
  id: string;
  videoId: string;
  start: number; // seconds
  dur: number;
  text: string;    // Korean original
  textZh: string;  // Chinese translation
}

// ===== Vocabulary Word =====
export interface Word {
  id: string;
  word: string;           // Korean word
  pronunciation: string;  // Romanized or hangul pronunciation
  meaning: string;        // Chinese meaning
  partOfSpeech: string;   // noun, verb, adjective, etc.
  examples: Example[];
  sourceVideoId?: string; // where the user found this word
  sourceSubtitleId?: string;
  mastery: MasteryLevel;
  // SRS fields
  srsLevel: number;       // 0-7 SM-2 repetition number
  nextReview: number;     // timestamp for next review
  easeFactor: number;     // SM-2 ease factor (default 2.5)
  interval: number;       // current interval in days
  createdAt: number;
  lastReviewed: number | null;
}

export interface Example {
  text: string;
  translation: string;
  source: 'dictionary' | 'video' | 'manual';
}

export type MasteryLevel = 'new' | 'learning' | 'reviewing' | 'mastered';

// ===== SRS Review =====
export interface ReviewSession {
  id: string;
  date: number;
  wordsReviewed: number;
  wordsPassed: number;
  duration: number; // seconds
}

// ===== Dictation =====
export interface DictationRecord {
  id: string;
  wordId: string;
  date: number;
  correct: boolean;
  userInput: string;
}

// ===== Shadowing =====
export interface ShadowingRecord {
  id: string;
  subtitleId: string;
  date: number;
  audioBlob?: Blob; // stored separately in IndexedDB
  score?: number;
}

// ===== App Settings =====
export interface AppSettings {
  id: string;
  dailyWordGoal: number;
  reviewBatchSize: number;
  defaultPlaybackRate: number;
  theme: 'light' | 'dark';
}
