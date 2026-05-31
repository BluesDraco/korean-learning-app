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
  isAmbassador?: boolean;
  ambassadorSince?: number | null;
  ambassadorReason?: string | null;
  shareEnabled?: boolean;
  shareToken?: string | null;
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

// ===== Vocabulary Word (User's learning state, IndexedDB) =====
export interface Word {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  examples: Example[];
  sourceEntryId?: string;        // Link to WordEntry for rich data
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

// ===== Unified Vocabulary Entry (static rich data) =====
export interface WordEntry {
  id: string;
  korean: string;
  romanization: string;
  baseForm: string;
  partOfSpeech: string;
  level: string;                 // TOPIK level: "1"-"6"
  frequency: number;             // Exam frequency: 1-3 (★)
  meanings: WordMeaning[];
  examples: WordEntryExample[];
  tags: string[];                // Theme tags: "咖啡厅", "追星", "韩剧"...
  emotionTags: string[];         // Emotion tags: "开心", "生气", "道歉"...
  relatedWords: string[];        // IDs of related words
  emoji: string;
  conjugations?: string[];       // Verb/adjective conjugations
  commonMistake?: string;        // Common learner mistakes
}

export interface WordMeaning {
  chinese: string;
  nuance: string;                // "正式", "口语", "书面", "网络"...
  register: string;              // Use context: "通用", "职场", "日常生活"...
}

export interface WordEntryExample {
  korean: string;
  chinese: string;
  scene: string;                 // Scene tag matching ThemePack
}

// ===== Theme Pack =====
export interface ThemePack {
  id: string;
  name: string;
  emoji: string;
  toriQuote: string;
  description: string;
  category: string;              // "生活场景" | "社交表达" | "韩流场景" | "旅行韩国" | "职场学习"
  wordIds: string[];
  sentences: ThemePackSentence[];
  estimatedMinutes: number;
}

export interface ThemePackSentence {
  korean: string;
  chinese: string;
}

// ===== Level Word List =====
export interface LevelWordList {
  level: number;                 // 1-6
  wordIds: string[];
  totalCount: number;
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
  action?: string;
}

// ===== KPOP Song Learning =====
export interface KpopLyricLine {
  section?: string;
  start: number;
  end: number;
  korean: string;
  pronunciation: string;
  chinese: string;
}

export interface KpopSong {
  id: string;
  title: string;
  artist: string;
  artistEmoji: string;
  album: string;
  year: number;
  videoId: string;
  thumbnail: string;
  level: 'beginner' | 'intermediate';
  color: string;
  tags: string[];
  lyrics: KpopLyricLine[];
  lyricsKind: 'full' | 'highlight';
}
export type AnnouncementType = 'announcement' | 'update_log' | 'private_message';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  targetUserId: string | null;
  createdAt: number;
}

// ===== Achievement Card & Milestones =====
export type MilestoneType =
  | 'phonetics_complete'    // 完成四十音学习
  | 'streak_7'              // 连续打卡7天
  | 'streak_30'             // 连续打卡30天
  | 'streak_100'            // 连续打卡100天
  | 'reviews_100'           // SRS复习累计100个词
  | 'reviews_500'           // SRS复习累计500个词
  | 'first_picture_book'    // 完成第一本绘本阅读
  | 'ai_chat_10'            // AI对话首次达到10轮
  | 'topik_perfect'         // TOPIK练习首次满分
  | 'days_100';             // 学习满100天

export interface UserAchievement {
  id: string;
  achievementType: MilestoneType;
  achievedAt: number;
  isCardGenerated: boolean;
}

// ===== Share Links & Public Diary =====
export interface UserShareLink {
  id: string;
  token: string;
  expiresAt: number | null;  // null = permanent
  isActive: boolean;
  createdAt: number;
}

// ===== Sticker Packs =====
export interface StickerPack {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  publishedAt: number;
  isActive: boolean;
}

export interface Sticker {
  id: string;
  packId: string;
  imageUrl: string;
  captionZh: string;
  captionKo: string;
  sortOrder: number;
}

export interface StickerDownload {
  id: string;
  packId: string;
  userId: string | null;
  downloadedAt: number;
}

// ===== Study Buddy =====
export interface BuddyRelation {
  id: string;
  userAId: string;
  userBId: string;
  status: 'active' | 'broken';
  createdAt: number;
}

export interface BuddyInvite {
  id: string;
  userId: string;
  inviteToken: string;
  learningGoal: string;
  level: string;
  dailyMinutes: string;
  intro: string;
  expiresAt: number;
}

// ===== Ambassador =====
export interface AmbassadorInfo {
  isAmbassador: boolean;
  ambassadorSince: number | null;
  ambassadorReason: string | null;
}
