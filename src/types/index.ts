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
  spellingStrictness?: 'loose' | 'standard' | 'strict';
  shareToken?: string | null;
  ttsSpeed?: number;
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

export const ACHIEVEMENT_DEFS: Record<AchievementType, { title: string; description: string; icon: string; titleEn: string; descriptionEn: string }> = {
  first_word: { title: '初识韩语', description: '学习第一个韩语单词', icon: '🌱', titleEn: 'First Word', descriptionEn: 'Learn your first Korean word' },
  words_10: { title: '韩语入门', description: '学习 10 个单词', icon: '📚', titleEn: 'Getting Started', descriptionEn: 'Learn 10 words' },
  words_50: { title: '词汇积累', description: '学习 50 个单词', icon: '📖', titleEn: 'Building Vocabulary', descriptionEn: 'Learn 50 words' },
  words_100: { title: '百词斩', description: '学习 100 个单词', icon: '⚔️', titleEn: 'Century', descriptionEn: 'Learn 100 words' },
  words_500: { title: '词汇达人', description: '学习 500 个单词', icon: '🏆', titleEn: 'Vocabulary Master', descriptionEn: 'Learn 500 words' },
  streak_3: { title: '三天打鱼', description: '连续学习 3 天', icon: '🔥', titleEn: 'Three-Day Streak', descriptionEn: 'Study 3 days in a row' },
  streak_7: { title: '一周坚持', description: '连续学习 7 天', icon: '🌟', titleEn: 'One Week Strong', descriptionEn: 'Study 7 days in a row' },
  streak_30: { title: '月度之星', description: '连续学习 30 天', icon: '⭐', titleEn: 'Star of the Month', descriptionEn: 'Study 30 days in a row' },
  streak_100: { title: '百天王者', description: '连续学习 100 天', icon: '👑', titleEn: 'Hundred-Day King', descriptionEn: 'Study 100 days in a row' },
  reviews_100: { title: '百次复习', description: '完成 100 次复习', icon: '🔄', titleEn: '100 Reviews', descriptionEn: 'Complete 100 reviews' },
  reviews_1000: { title: '千锤百炼', description: '完成 1000 次复习', icon: '💪', titleEn: 'Battle-Hardened', descriptionEn: 'Complete 1000 reviews' },
  dictation_50: { title: '听力达人', description: '完成 50 次默写', icon: '🎧', titleEn: 'Listening Pro', descriptionEn: 'Complete 50 dictations' },
  shadowing_10: { title: '口语新星', description: '完成 10 次影子跟读', icon: '🎤', titleEn: 'Rising Speaker', descriptionEn: 'Complete 10 shadowing sessions' },
  perfect_week: { title: '完美一周', description: '连续 7 天完成所有每日目标', icon: '💎', titleEn: 'Perfect Week', descriptionEn: 'Hit all daily goals for 7 days straight' },
  level_5: { title: '学有所成', description: '达到等级 5', icon: '🎖️', titleEn: 'Making Progress', descriptionEn: 'Reach level 5' },
  level_10: { title: '韩语高手', description: '达到等级 10', icon: '🏅', titleEn: 'Korean Expert', descriptionEn: 'Reach level 10' },
  level_20: { title: '韩语大师', description: '达到等级 20（满级）', icon: '🧙', titleEn: 'Korean Master', descriptionEn: 'Reach level 20 (max)' },
};

// ===== Vocabulary Word (User's learning state, IndexedDB) =====
export interface Word {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;               // 兜底单行（多义时为 meanings.map(m=>m.chinese).join('；')）
  meanings?: { chinese: string; partOfSpeech?: string; examples?: Example[] }[];  // 多义列表（含按义项的懒加载例句）
  partOfSpeech: string;
  examples: Example[];
  sourceEntryId?: string;        // Link to WordEntry for rich data
  sourceVideoId?: string;
  sourceSubtitleId?: string;
  source?: string;               // Where this word came from: 'course', 'library', 'manual'
  sourceDetail?: string;         // e.g. 'Day 3', '咖啡厅主题包'
  mastery: MasteryLevel;
  srsLevel: number;
  nextReview: number;
  easeFactor: number;
  interval: number;
  consecutiveCorrect?: number;
  correctCount?: number;
  wrongCount?: number;
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
  level: string;                 // TOPIK level: "1"-"6"（早期手写，可能不准）
  authoritativeLevel?: string;   // 命中 TOPIK 官方/教材权威表时的 level，未命中为 undefined
  frequency: number;             // Exam frequency: 1-3 (★)
  meanings: WordMeaning[];
  examples: WordEntryExample[];
  tags: string[];                // Theme tags: "咖啡厅", "追星", "韩剧"...
  emotionTags: string[];         // Emotion tags: "开心", "生气", "道歉"...
  relatedWords: string[];        // IDs of related words
  emoji?: string;
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
  description?: string;          // 一句功能描述（可选）
  category: string;              // "生活场景" | "社交表达" | "韩流场景" | "旅行韩国" | "职场学习"
  wordIds: string[];              // 完整词包 wordIds（分组后仍需列全，用于 API 查询）
  wordGroups?: ThemePackWordGroup[];  // 可选：按功能分组，UI 优先渲染 groups
  sentences: ThemePackSentence[];
  dialogues?: ThemePackDialogue[];  // 完整对话往返
  pitfalls?: ThemePackPitfall[];    // 场景雷区/文化差异
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  previewWords?: string[];
  /** @deprecated 保留以兼容旧数据，UI 不再消费 */
  toriQuote?: string;
  /** @deprecated 保留以兼容旧数据，UI 不再消费 */
  estimatedMinutes?: number;
}

export interface ThemePackSentence {
  korean: string;
  chinese: string;
  situation?: string;
  situationNote?: string;
  breakdown?: { text: string; meaning: string; partOfSpeech: string }[];
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
  userId?: string;
  wordId: string;
  meaning?: string;
  date: number;
  correct: boolean;
  userInput: string;
  type?: string;
}

// ===== App Settings =====
export interface AppSettings {
  id: string;
  dailyWordGoal: number;
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

export type AnnouncementType = 'announcement' | 'update_log' | 'private_message' | 'popup';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  targetUserId: string | null;
  createdAt: number;
  read?: boolean;
  isActive?: boolean;
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
  // 旧值为 MilestoneType；新成就系统用 src/data/achievements.ts 的成就 id（string）
  achievementType: MilestoneType | string;
  achievedAt: number;
  isCardGenerated: boolean;
}

// ===== 动物城成就系统（统一定义源，见 src/data/achievements.ts） =====
export type AchievementCategory = 'start' | 'streak' | 'collect' | 'explore' | 'master';
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legend';

export interface AchievementDef {
  id: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  icon: string;                 // emoji
  title: string;                // 中文名
  titleKo: string;              // 韩文名
  subtitle: string;             // 兔莉口吻副标题（纯中文）
  /** 目标值（进度类成就用；一次性成就为 1） */
  goal: number;
  /** 未解锁时的引导文案（无进度可显示时用，如「去绘本馆读一本 →」） */
  hint?: string;
}

/** 一次成就检测的结果：解锁状态 + 进度 */
export interface AchievementProgress {
  id: string;
  unlocked: boolean;
  current: number;              // 当前进度值
  goal: number;
  achievedAt?: number;          // 已解锁时的达成时间
}

/** 成就检测的整体结果：各成就进度 + 概览用的原始指标（未封顶） */
export interface AchievementResult {
  list: AchievementProgress[];
  unlockedCount: number;
  level: number;                // 原始等级（不封顶）
  longestStreak: number;        // 原始连续天数（不封顶）
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

// ===== Pronunciation Practice =====
export type PronunciationItemType = 'sound' | 'syllable' | 'word' | 'phrase' | 'sentence';

export interface PronunciationItem {
  id: string;
  textKo: string;
  textZh?: string;
  romanization?: string;
  type: PronunciationItemType;
  level: 'beginner' | 'elementary' | 'intermediate';
  focus: string[];
  source?: string;
  sourceId?: string;
  tips?: string[];
  segments?: { text: string; hint?: string }[];
}

export interface PronunciationAttempt {
  id: string;
  itemId: string;
  durationMs: number;
  score?: number;
  feedback?: string;
  createdAt: number;
}

// ===== Grammar (Sentence Pattern) Practice =====
export interface GrammarPracticeTemplate {
  id: string;
  type: 'substitution' | 'choice' | 'fill_blank' | 'output';
  prompt: string;
  template?: string;
  slots?: string[];
  options?: string[];
  answer?: string;
  explanation?: string;
}

export interface CommonMistake {
  wrong: string;
  correct: string;
  reason: string;
}

export interface GrammarExample {
  ko: string;
  zh: string;
  romanization?: string;
  highlight?: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  displayTitle: string;
  functionZh: string;
  shortExplanation: string;
  structure: string[];
  pattern: string;
  level: 'absolute_beginner' | 'beginner' | 'elementary' | 'intermediate';
  topikLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  category: string;
  tags: string[];
  useCases: string[];
  examples: GrammarExample[];
  practiceTemplates: GrammarPracticeTemplate[];
  commonMistakes: CommonMistake[];
  compareWith?: string[];
  difference?: string;
  toriTip?: string;
  sourceCourseDay?: number;
}

// ═══════════════════════════════════════════
// Grammar Card types (教材课次卡片)
// ═══════════════════════════════════════════

export interface GrammarWordBlock {
  text: string;
  role: 'subject' | 'object' | 'verb' | 'place' | 'plain' | 'time';
}

export interface ConnectionRule {
  type: 'rule' | 'note' | 'compare' | 'example' | 'vocab' | 'usage';
  text: string;
  examples?: string;
}

export interface GrammarCardExample {
  wordBlocks: GrammarWordBlock[];
  zh: string;
  swapWords?: string[];
  swapRole?: 'subject' | 'verb' | 'object' | 'place' | 'time' | 'plain';
}

export interface GrammarScenario {
  icon: string;
  context: string;
  ko: string;
  zh: string;
  tip?: string;
  highlights?: string[];
}

export interface SpecialQuizQuestion {
  prompt?: string;
  pre?: string;
  post?: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface GrammarCard {
  id: string;
  partNumber: number;
  lessonNumber: number;
  title: string;
  whatItDoes: string;
  whatItDoesBody: string;
  isPractice?: boolean;
  structureNote?: string;
  rulesNote?: string;
  scenarioNote?: string;
  conceptCompare?: {
    zh: string;
    ko: string;
    note: string;
  };
  readingGuide?: {
    title: string;
    body: string;
    steps: { num: number; text: string }[];
    demo: { ko: string; rows: { label: string; text: string }[]; result: string };
  };
  quickTable?: {
    title: string;
    body?: string;
    headers: string[];
    rows: (string | { ko: string; zh: string })[][];
  };
  structures: {
    ko: string;
    zh?: string;
    tokens: { text: string; role: 'subject' | 'object' | 'verb' | 'place' | 'time' | 'plain' }[];
  }[];
  connectionRules: (ConnectionRule | string)[];
  cardExamples: GrammarCardExample[];
  scenarios: GrammarScenario[];
  mistakes: { wrong: string; correct: string; note: string }[];
  specialQuiz?: {
    type: 'morph' | 'judge' | 'fill';
    title: string;
    body: string;
    questions: SpecialQuizQuestion[];
  };
  linkedGrammarIds: string[];
  step0Html?: string;
  compareHtml?: string;
  compareLabel?: string;
  overviewHtml?: string;
}

export interface UserGrammarState {
  id: string;
  status: 'new' | 'learning' | 'familiar' | 'mastered' | 'difficult';
  seenCount: number;
  correctCount: number;
  wrongCount: number;
  lastSeenAt?: number;
  nextReviewAt?: number;
  source?: string;
  createdAt: number;
  updatedAt: number;
}

// ── 语法练习离线题库（脚本批量生成 + AI 韩语审查，运行时 fetch）─────────────
// 每 part 一个 public/data/grammar-bank/p{N}.json，按 card id 索引。
// 生成脚本产出全新韩语句（非卡片自带例句），QA 脚本过滤，UI 命中优先、未命中回落卡片派生。

/** 听力题：听 ko 选中文意思。字段与 PracticeGroups['listening'] 对齐，可直接喂 ListeningMCStep。 */
export interface GrammarBankListening {
  ko: string;          // 全新原创韩语句（非卡片例句）
  ans: string;         // 正确中文意思
  options: string[];   // 恰 4 个中文选项（含 ans），答案位置已均匀化
}

/** 听写题：听 ko 写出来，本地 normalizeKorean 比对。对齐 PracticeGroups['dictation']。 */
export interface GrammarBankDictation {
  ko: string;
  zh: string;          // 句义提示
}

/** 仿写题（重设计）：给模板句 + 换词槽提示，用户保结构换内容。 */
export interface GrammarBankImitate {
  ko: string;                          // 模板句（新造）
  zh: string;
  swapSlot: string;                    // 中文方向提示，如「把宾语换成别的东西」
  swapRole?: GrammarWordBlock['role']; // 机器可读槽位（object/verb/...）
}

/** 续写题（重设计）：opener 是问句/悬念句，用户用目标语法作答。 */
export interface GrammarBankContinue {
  ko: string;          // opener（问句或悬念句，新造）
  zh: string;
  expectHint: string;  // 中文作答提示，如「用『-고 싶다』说出你想做的事」
}

/** 单卡题库条目。grammarPoint/whatItDoes 冗余存储，供判分与 UI 直接用。 */
export interface GrammarBankEntry {
  cardId: string;                      // 'card-p3-l07'
  grammarPoint: string;                // = card.title
  whatItDoes: string;                  // = card.whatItDoes
  listening: GrammarBankListening[];
  dictation: GrammarBankDictation[];
  imitate: GrammarBankImitate[];
  continue: GrammarBankContinue[];
}

/** 一个 part 的题库文件。entries 按 cardId 索引；文件内所有 item 均已过 QA。 */
export interface GrammarBankFile {
  part: number;
  specVersion: string;                 // 生成规范版本，便于将来重生
  generatedAt: string;                 // ISO
  qa: { aiJudged: number; dropped: number; judgedAt: string };
  entries: Record<string, GrammarBankEntry>;
}

// ═══════════════════════════════════════════
// Reading module types
// ═══════════════════════════════════════════

export interface ArticleSentence {
  id: string;
  ko: string;
  zh: string;
  pronunciation?: string;
  audioUrl?: string;
  words: ArticleWord[];
  grammarIds: string[];
  note?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  paragraphBreak?: boolean;
}

export interface ArticleWord {
  word: string;
  meaning: string;
  pronunciation?: string;
  examples?: { ko: string; zh: string }[];
}

export interface ArticleQuestion {
  id: string;
  type: 'main_idea' | 'detail' | 'vocab' | 'grammar' | 'true_false';
  prompt: string;      // 韩语题干（对标 TOPIK 阅读题）
  promptZh?: string;   // 中文翻译（辅助理解，可省）
  options?: string[];  // 韩语选项
  answer: number;
  explanation?: string;
}

export interface ArticleOutputTask {
  type: 'fill_blank' | 'complete_sentence' | 'choose_and_say';
  template: string;
  hint?: string;
  slots?: string[];
  example?: string;
}

export interface Article {
  id: string;
  title: string;
  titleKo: string;
  emoji: string;
  level: 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'TOPIK';
  topic: string;
  estimatedMinutes: number;
  learningGoals: string[];
  coreWords: ArticleWord[];
  grammarIds: string[];
  sentences: ArticleSentence[];
  keySentence?: {
    ko: string;
    zh: string;
    grammarNote: string;
  };
  questions: ArticleQuestion[];
  outputTask?: ArticleOutputTask;
  tags?: string[];
  featured?: boolean;
  audioUrl?: string; // 整篇全文听力 mp3(狐狸女声预录)，有则替代逐句 TTS
  audioTimings?: { start: number; end: number }[]; // 每句 start/end 秒，按 sentences 顺序对齐
  grammarCardIds?: string[]; // 关联的语法课 cardId(card-pXX-lXX)，重点句型页从273节语法课摘取展示
  hidden?: boolean; // true=从列表/侧边栏/sitemap/今日推荐隐藏(重写中的旧内容)，详情页仍可直达审阅
  createdAt: number;
}

export interface UserArticleProgress {
  id: string;
  articleId: string;
  userId?: string;
  status: 'not_started' | 'reading' | 'completed';
  readSentenceIds: string[];
  savedSentenceIds: string[];
  savedWordIds: string[];
  quizScore?: number;
  quizAnswers?: Record<string, string>;
  outputAnswer?: string;
  outputScore?: number;
  completedAt?: number;
  lastReadAt: number;
  createdAt: number;
  updatedAt: number;
}

export interface ArticleLearningEvent {
  id: string;
  articleId: string;
  sentenceId?: string;
  action: 'view_article' | 'play_sentence' | 'reveal_translation' | 'save_word' | 'save_sentence' | 'answer_question' | 'complete_article' | 'complete_output';
  payload?: unknown;
  createdAt: number;
}

// ===== TOPIK =====

export interface TopikSession {
  id: string;
  userId: string;
  mode: 'exam' | 'practice' | 'mistakes';
  examSetId?: string;
  section: string;
  score: number;
  correctCount: number;
  totalCount: number;
  durationSec: number;
  completedAt: number;
  createdAt: number;
}

export interface TopikMistake {
  id: string;
  userId: string;
  questionId: string;
  sessionId?: string;
  wrongCount: number;
  lastWrongAt: number;
  mastered: number;
  createdAt: number;
}

// ===== 韩娱热点阅读 (Korean Entertainment Hot Topic Reading) =====

export interface KoreanReadingToken {
  surface: string;       // surface form as it appears in the sentence
  baseForm: string;      // dictionary/base form
  meaning: string;       // Chinese meaning
  partOfSpeech?: string; // e.g. '명사', '동사', '형용사', '부사', '조사', '어미'
  note?: string;         // usage note (optional)
}

export interface KoreanGrammarNote {
  pattern: string;           // grammar pattern, e.g. '-고 있다', '-면'
  meaning: string;           // short meaning, e.g. '正在做...'
  explanation: string;       // detailed explanation
  exampleInSentence: string; // the phrase from THIS sentence that exemplifies the pattern
}

export interface KoreanReadingSentence {
  id: string;
  korean: string;
  chinese: string;
  tokens: KoreanReadingToken[];
  grammarNotes: KoreanGrammarNote[];
}

export interface KoreanReadingParagraph {
  id: string;
  korean: string;
  chinese: string;
  sentences: KoreanReadingSentence[];
}

export interface KoreanReadingStatus {
  sourceReady: boolean;      // body parsed from source
  translationReady: boolean; // full Chinese translation done
  tokenReady: boolean;       // per-word token breakdown done
  grammarReady: boolean;     // grammar notes done
  imageReady: boolean;       // image resolved
  readingReady: boolean;     // all above + quality check passed
}

export interface KoreanHotReading {
  id: string;

  // Source
  sourceName: string;
  sourceUrl: string;
  originalPublishedAt: number;
  fetchedAt: number;

  // Image
  imageUrl?: string;

  // Title
  originalTitleKo: string;
  titleZh: string;

  // Keywords
  keywords: string[];

  // Body
  originalBodyKo: string;
  bodyZh: string;

  // Paragraphs with sentences
  paragraphs: KoreanReadingParagraph[];

  // Computed stats
  totalSentences: number;
  totalTokens: number;
  totalGrammar: number;

  // Status gates
  readingStatus: KoreanReadingStatus;
  publishStatus: 'draft' | 'review' | 'published';
}

// ===== Spelling / Sentence Mistakes =====
export interface SpellingMistake {
  id: string;
  wordId?: string;
  word: string;
  meaning: string;
  userInput: string;
  correctAnswer: string;
  mistakeType: 'spelling' | 'sentence';
  createdAt: number;
}
