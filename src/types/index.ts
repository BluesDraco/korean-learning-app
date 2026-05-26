// ===== User Profile & Gamification =====
export interface UserProfile {
  id: string;
  nickname: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  longestStreak: number;
  lastStudyDate: number;
  targetLevel: 'beginner' | 'intermediate' | 'advanced';
  dailyGoalMinutes: number;
  dailyGoalWords: number;
  currentUnit: number;
  onboardingComplete: boolean;
  createdAt: number;
}

export interface DailyLog {
  id: string;
  date: number;
  wordsLearned: number;
  wordsReviewed: number;
  dictationsDone: number;
  shadowingDone: number;
  minutesStudied: number;
  xpEarned: number;
}

export interface Achievement {
  id: string;
  type: AchievementType;
  earnedAt: number;
}

export type AchievementType =
  | 'first_word'
  | 'words_10'
  | 'words_50'
  | 'words_100'
  | 'words_500'
  | 'streak_3'
  | 'streak_7'
  | 'streak_30'
  | 'streak_100'
  | 'reviews_100'
  | 'reviews_1000'
  | 'dictation_50'
  | 'shadowing_10'
  | 'perfect_week'
  | 'level_5'
  | 'level_10'
  | 'level_20';

export const ACHIEVEMENT_DEFS: Record<AchievementType, { title: string; description: string; icon: string }> = {
  first_word: { title: '初识韩语', description: '学习第一个韩语单词', icon: '🌱' },
  words_10: { title: '韩语入门', description: '学习 10 个单词', icon: '📚' },
  words_50: { title: '词汇积累', description: '学习 50 个单词', icon: '📖' },
  words_100: { title: '百词斩', description: '学习 100 个单词', icon: '⚔️' },
  words_500: { title: '词汇达人', description: '学习 500 个单词', icon: '🏆' },
  streak_3: { title: '三天打鱼', description: '连续学习 3 天', icon: '🔥' },
  streak_7: { title: '一周坚持', description: '连续学习 7 天', icon: '🌟' },
  streak_30: { title: '月度之星', description: '连续学习 30 天', icon: '⭐' },
  streak_100: { title: '百天王者', description: '连续学习 100 天', icon: '👑' },
  reviews_100: { title: '百次复习', description: '完成 100 次复习', icon: '🔄' },
  reviews_1000: { title: '千锤百炼', description: '完成 1000 次复习', icon: '💪' },
  dictation_50: { title: '听力达人', description: '完成 50 次听写', icon: '🎧' },
  shadowing_10: { title: '口语新星', description: '完成 10 次跟读', icon: '🎤' },
  perfect_week: { title: '完美一周', description: '连续 7 天完成所有每日目标', icon: '💎' },
  level_5: { title: '学有所成', description: '达到等级 5', icon: '🎖️' },
  level_10: { title: '韩语高手', description: '达到等级 10', icon: '🏅' },
  level_20: { title: '韩语大师', description: '达到等级 20（满级）', icon: '🧙' },
};

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
  start: number;
  dur: number;
  text: string;
  textZh: string;
}

// ===== Vocabulary Word =====
export interface Word {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  examples: Example[];
  sourceVideoId?: string;
  sourceSubtitleId?: string;
  mastery: MasteryLevel;
  srsLevel: number;
  nextReview: number;
  easeFactor: number;
  interval: number;
  createdAt: number;
  lastReviewed: number | null;
}

export interface Example {
  text: string;
  translation: string;
  source: 'dictionary' | 'video' | 'manual';
}

export type MasteryLevel = 'new' | 'learning' | 'reviewing' | 'mastered';

// ===== Custom Word Book =====
export interface WordBook {
  id: string;
  name: string;
  description: string;
  wordIds: string[];
  color: string;
  createdAt: number;
  updatedAt: number;
}

// ===== SRS Review =====
export interface ReviewSession {
  id: string;
  date: number;
  wordsReviewed: number;
  wordsPassed: number;
  duration: number;
  xpEarned: number;
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

// ===== Shadowing / Video Study =====
export type VideoPlatform = 'bilibili' | 'youtube';

export interface StudyVideo {
  id: string;
  url: string;
  platform: VideoPlatform;
  platformId: string;
  title: string;
  thumbnail?: string;
  subtitleSource: 'manual' | 'whisper';
  addedAt: number;
  lastStudiedAt: number;
}

export interface StudySubtitle {
  id: string;
  videoId: string;
  index: number;
  start: number;
  end: number;
  text: string;
  textZh: string;
  tokens: string;
}

export interface StudyLog {
  id: string;
  videoId: string;
  date: number;
  durationSec: number;
  wordsAdded: string[];
  sentencesLooped: number;
}
