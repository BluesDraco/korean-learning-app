import type { KoZh, BreakdownItem, SegmentHint, LabelText, ZhKoNote, NumText, KoZhGrammarNote, GrammarStructureEntry } from '@/types/inline';
// ===== User Profile & Gamification =====
export interface UserProfile {
  [k: string]: unknown;
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
  [k: string]: unknown;
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
  [k: string]: unknown;
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
  [k: string]: unknown;
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
  [k: string]: unknown;
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
  [k: string]: unknown;
  chinese: string;
  nuance: string;                // "正式", "口语", "书面", "网络"...
  register: string;              // Use context: "通用", "职场", "日常生活"...
}

export interface WordEntryExample {
  [k: string]: unknown;
  korean: string;
  chinese: string;
  scene: string;                 // Scene tag matching ThemePack
}

// ===== Theme Pack =====
export interface ThemePack {
  [k: string]: unknown;
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
  [k: string]: unknown;
  korean: string;
  chinese: string;
  situation?: string;
  situationNote?: string;
  /**
   * 语法拆解。role 是语法角色（主语/宾语/敬语终结/请求...），note 是可选的中文含义。
   * 旧数据用 partOfSpeech 存词性，UI 会 fallback 显示。
   */
  breakdown?: BreakdownItem[];
}

export interface ThemePackDialogueTurn {
  [k: string]: unknown;
  speaker: 'me' | 'them';        // me=学习者，them=店员/对方
  korean: string;
  chinese: string;
  note?: string;                 // 单轮小提示
}

export interface ThemePackDialogue {
  [k: string]: unknown;
  title: string;                 // 对话主题，如 "点一杯冰美式带走"
  scene?: string;                // 场景补充，如 "工作日午后，星巴克"
  turns: ThemePackDialogueTurn[];
}

export interface ThemePackWordGroup {
  [k: string]: unknown;
  label: string;                 // 分组名，如 "饮品"
  emoji?: string;                // 分组图标，如 "☕"
  wordIds: string[];             // 归属该组的 wordIds
}

export interface ThemePackPitfall {
  [k: string]: unknown;
  title: string;                 // 短标题，如 "砍价只用于传统市场"
  detail: string;                // 详细说明：为什么错、后果、正确做法
  wrong?: string;                // 反例（可选）
  right?: string;                // 正例（可选）
}

// ===== Level Word List =====
export interface LevelWordList {
  [k: string]: unknown;
  level: number;                 // 1-6
  wordIds: string[];
  totalCount: number;
}

export interface Example {
  [k: string]: unknown;
  text: string;
  translation: string;
  source: 'dictionary' | 'video' | 'manual';
}

export type MasteryLevel = 'new' | 'learning' | 'reviewing' | 'mastered';

// ===== Custom Word Book =====
export interface WordBook {
  [k: string]: unknown;
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
  [k: string]: unknown;
  id: string;
  date: number;
  wordsReviewed: number;
  wordsPassed: number;
  duration: number;
  xpEarned: number;
}

// ===== Dictation =====
export interface DictationRecord {
  [k: string]: unknown;
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
  [k: string]: unknown;
  id: string;
  dailyWordGoal: number;
  defaultPlaybackRate: number;
  theme: 'light' | 'dark';
}

// ===== Shadowing / Video Study =====
export type VideoPlatform = 'bilibili' | 'youtube';

export interface StudyVideo {
  [k: string]: unknown;
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
  [k: string]: unknown;
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
  [k: string]: unknown;
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
  [k: string]: unknown;
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
  [k: string]: unknown;
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
  [k: string]: unknown;
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
  [k: string]: unknown;
  id: string;
  unlocked: boolean;
  current: number;              // 当前进度值
  goal: number;
  achievedAt?: number;          // 已解锁时的达成时间
}

/** 成就检测的整体结果：各成就进度 + 概览用的原始指标（未封顶） */
export interface AchievementResult {
  [k: string]: unknown;
  list: AchievementProgress[];
  unlockedCount: number;
  level: number;                // 原始等级（不封顶）
  longestStreak: number;        // 原始连续天数（不封顶）
}

// ===== Share Links & Public Diary =====
export interface UserShareLink {
  [k: string]: unknown;
  id: string;
  token: string;
  expiresAt: number | null;  // null = permanent
  isActive: boolean;
  createdAt: number;
}

// ===== Sticker Packs =====
export interface StickerPack {
  [k: string]: unknown;
  id: string;
  name: string;
  description: string;
  coverImage: string;
  publishedAt: number;
  isActive: boolean;
}

export interface Sticker {
  [k: string]: unknown;
  id: string;
  packId: string;
  imageUrl: string;
  captionZh: string;
  captionKo: string;
  sortOrder: number;
}

export interface StickerDownload {
  [k: string]: unknown;
  id: string;
  packId: string;
  userId: string | null;
  downloadedAt: number;
}

// ===== Study Buddy =====
export interface BuddyRelation {
  [k: string]: unknown;
  id: string;
  userAId: string;
  userBId: string;
  status: 'active' | 'broken';
  createdAt: number;
}

export interface BuddyInvite {
  [k: string]: unknown;
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
  [k: string]: unknown;
  isAmbassador: boolean;
  ambassadorSince: number | null;
  ambassadorReason: string | null;
}

// ===== Pronunciation Practice =====
export type PronunciationItemType = 'sound' | 'syllable' | 'word' | 'phrase' | 'sentence';

export interface PronunciationItem {
  [k: string]: unknown;
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
  segments?: SegmentHint[];
}

export interface PronunciationAttempt {
  [k: string]: unknown;
  id: string;
  itemId: string;
  durationMs: number;
  score?: number;
  feedback?: string;
  createdAt: number;
}

// ===== Grammar (Sentence Pattern) Practice =====
export interface GrammarPracticeTemplate {
  [k: string]: unknown;
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
  [k: string]: unknown;
  wrong: string;
  correct: string;
  reason: string;
}

export interface GrammarExample {
  [k: string]: unknown;
  ko: string;
  zh: string;
  romanization?: string;
  highlight?: string;
}

export interface GrammarPoint {
  [k: string]: unknown;
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
  [k: string]: unknown;
  text: string;
  role: 'subject' | 'object' | 'verb' | 'place' | 'plain' | 'time';
}

export interface ConnectionRule {
  [k: string]: unknown;
  type: 'rule' | 'note' | 'compare' | 'example' | 'vocab' | 'usage';
  text: string;
  examples?: string;
}

export interface GrammarCardExample {
  [k: string]: unknown;
  wordBlocks: GrammarWordBlock[];
  zh: string;
  swapWords?: string[];
  swapRole?: 'subject' | 'verb' | 'object' | 'place' | 'time' | 'plain';
}

export interface GrammarScenario {
  [k: string]: unknown;
  icon: string;
  context: string;
  ko: string;
  zh: string;
  tip?: string;
}

export interface SpecialQuizQuestion {
  [k: string]: unknown;
  prompt?: string;
  pre?: string;
  post?: string;
  /** 建议恰好 4 个选项，不能有占位符 '—'（由 lint-grammar-cards 脚本强制检查） */
  options: string[];
  /** 0-3，对应 options 索引 */
  answer: 0 | 1 | 2 | 3;
  explanation: string;
}

// 综合练习卡（isPractice）的分组数据：五种题型
export interface PracticeGroups {
  [k: string]: unknown;
  /** 排序题：把打乱的词块按正确顺序拼回原句 */
  sort?: { words: string[]; answer: string[]; hint: string }[];
  /** 填空题①（一般是 이에요/예요 / 은는 类）*/
  fill1?: { pre: string; post: string; opts: string[]; ans: string; why: string }[];
  /** 填空题②（一般是 을를 / 에에서 类）*/
  fill2?: { pre: string; post: string; opts: string[]; ans: string; why: string }[];
  /** 变形题：动词变形（합니다体、疑问句等）*/
  morph?: { label: string; opts: string[]; ans: string; why: string }[];
  /** 判断题：A/B 二选一 */
  judge?: { A: string; B: string; ans: 'A' | 'B'; why: string }[];
  /** 改错题：先看错句，点击揭晓正确写法 */
  err?: { wrong: string; right: string; why: string }[];
  /** 情景应用题：给情景选正确韩语句（正确项与诱答项都来自已审 scenarios，不生成新韩语） */
  scenario?: { icon: string; context: string; zh: string; ans: string; options: string[] }[];
  /** 词块填空题：从已审例句挖掉一个词块，诱答项取同池同 role 的已审词块（不生成新韩语）。hint 是句义，答题前显示。 */
  cloze?: { pre: string; post: string; opts: string[]; ans: string; why: string; hint: string }[];
  /** 听力题：听韩语句选中文意思。ko=题干韩语（已审例句），ans=正确中文，options=含正确项的中文选项。 */
  listening?: { ko: string; ans: string; options: string[] }[];
  /** 听写题（综合测验）：听韩语句写出来，本地 normalizeKorean 比对。ko=源句，zh=句义提示。 */
  dictation?: KoZh[];
}

export interface GrammarCard {
  [k: string]: unknown;
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
  conceptCompare?: ZhKoNote;
  readingGuide?: {
    title: string;
    body: string;
    steps: NumText[];
    demo: { ko: string; rows: LabelText[]; result: string; [k: string]: unknown };
  };
  quickTable?: {
    title: string;
    body?: string;
    headers: string[];
    rows: (string | KoZh)[][];
  };
  structures: GrammarStructureEntry[];
  /** 接续规则 / 用法提示（不允许裸字符串，由 lint-grammar-cards 脚本强制检查） */
  connectionRules: ConnectionRule[];
  cardExamples: GrammarCardExample[];
  scenarios: GrammarScenario[];
  /** wrong 和 correct 不得填写相同内容 */
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
  /** 综合练习专属：5 种题型分组数据（isPractice=true 时使用） */
  practiceGroups?: PracticeGroups;
}

export interface UserGrammarState {
  [k: string]: unknown;
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
  [k: string]: unknown;
  ko: string;          // 全新原创韩语句（非卡片例句）
  ans: string;         // 正确中文意思
  options: string[];   // 恰 4 个中文选项（含 ans），答案位置已均匀化
}

/** 听写题：听 ko 写出来，本地 normalizeKorean 比对。对齐 PracticeGroups['dictation']。 */
export interface GrammarBankDictation {
  [k: string]: unknown;
  ko: string;
  zh: string;          // 句义提示
}

/** 仿写题（重设计）：给模板句 + 换词槽提示，用户保结构换内容。 */
export interface GrammarBankImitate {
  [k: string]: unknown;
  ko: string;                          // 模板句（新造）
  zh: string;
  swapSlot: string;                    // 中文方向提示，如「把宾语换成别的东西」
  swapRole?: GrammarWordBlock['role']; // 机器可读槽位（object/verb/...）
}

/** 续写题（重设计）：opener 是问句/悬念句，用户用目标语法作答。 */
export interface GrammarBankContinue {
  [k: string]: unknown;
  ko: string;          // opener（问句或悬念句，新造）
  zh: string;
  expectHint: string;  // 中文作答提示，如「用『-고 싶다』说出你想做的事」
}

/** 单卡题库条目。grammarPoint/whatItDoes 冗余存储，供判分与 UI 直接用。 */
export interface GrammarBankEntry {
  [k: string]: unknown;
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
  [k: string]: unknown;
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
  [k: string]: unknown;
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
  [k: string]: unknown;
  word: string;
  meaning: string;
  pronunciation?: string;
  examples?: KoZh[];
}

export interface ArticleQuestion {
  [k: string]: unknown;
  id: string;
  type: 'main_idea' | 'detail' | 'vocab' | 'grammar' | 'true_false';
  prompt: string;      // 韩语题干（对标 TOPIK 阅读题）
  promptZh?: string;   // 中文翻译（辅助理解，可省）
  options?: string[];  // 韩语选项
  answer: number;
  explanation?: string;
}

export interface ArticleOutputTask {
  [k: string]: unknown;
  type: 'fill_blank' | 'complete_sentence' | 'choose_and_say';
  template: string;
  hint?: string;
  slots?: string[];
  example?: string;
}

export interface Article {
  [k: string]: unknown;
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
  keySentence?: KoZhGrammarNote;
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
  [k: string]: unknown;
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
  [k: string]: unknown;
  id: string;
  articleId: string;
  sentenceId?: string;
  action: 'view_article' | 'play_sentence' | 'reveal_translation' | 'save_word' | 'save_sentence' | 'answer_question' | 'complete_article' | 'complete_output';
  payload?: unknown;
  createdAt: number;
}

// ===== TOPIK =====

export interface TopikSession {
  [k: string]: unknown;
  id: string;
  userId: string;
  mode: 'exam' | 'practice' | 'mistakes' | 'simulate';
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
  [k: string]: unknown;
  id: string;
  userId: string;
  questionId: string;
  sessionId?: string;
  wrongCount: number;
  lastWrongAt: number;
  mastered: number;
  createdAt: number;
}

export interface TopikTypeMastery {
  [k: string]: unknown;
  id: string;
  userId: string;
  questionType: string;
  attempts: number;
  correct: number;
  lastPracticedAt: number;
  createdAt: number;
}

export interface TopikUserGoal {
  [k: string]: unknown;
  id: string;              // 与 userId 同值，一人一行
  userId: string;
  targetDate?: number;     // 目标 TOPIK 考试日期 (ms 时间戳，未设置=undefined)
  targetLevel?: 'I' | 'II';
  dailyQuestionCount: number;  // 每日训练题量 10 / 20 / 30，默认 10
  updatedAt: number;
  createdAt: number;
}

export interface TopikDailyReason {
  [k: string]: unknown;
  type: 'weak' | 'mistake' | 'new' | 'baseline';
  text: string;
}

export interface TopikDailyPlan {
  [k: string]: unknown;
  id: string;              // dp-{userId}-{YYYY-MM-DD}
  userId: string;
  date: string;            // 本地时区 YYYY-MM-DD
  questionIds: string[];
  reasonMap: Record<string, TopikDailyReason>;  // qid -> reason
  targetLevel: 'beginner' | 'intermediate' | 'advanced';
  createdAt: number;
  completedAt: number | null;
  sessionId: string | null;
}

// ===== 韩娱热点阅读 (Korean Entertainment Hot Topic Reading) =====

export interface KoreanReadingToken {
  [k: string]: unknown;
  surface: string;       // surface form as it appears in the sentence
  baseForm: string;      // dictionary/base form
  meaning: string;       // Chinese meaning
  partOfSpeech?: string; // e.g. '명사', '동사', '형용사', '부사', '조사', '어미'
  note?: string;         // usage note (optional)
}

export interface KoreanGrammarNote {
  [k: string]: unknown;
  pattern: string;           // grammar pattern, e.g. '-고 있다', '-면'
  meaning: string;           // short meaning, e.g. '正在做...'
  explanation: string;       // detailed explanation
  exampleInSentence: string; // the phrase from THIS sentence that exemplifies the pattern
}

export interface KoreanReadingSentence {
  [k: string]: unknown;
  id: string;
  korean: string;
  chinese: string;
  tokens: KoreanReadingToken[];
  grammarNotes: KoreanGrammarNote[];
}

export interface KoreanReadingParagraph {
  [k: string]: unknown;
  id: string;
  korean: string;
  chinese: string;
  sentences: KoreanReadingSentence[];
}

export interface KoreanReadingStatus {
  [k: string]: unknown;
  sourceReady: boolean;      // body parsed from source
  translationReady: boolean; // full Chinese translation done
  tokenReady: boolean;       // per-word token breakdown done
  grammarReady: boolean;     // grammar notes done
  imageReady: boolean;       // image resolved
  readingReady: boolean;     // all above + quality check passed
}

export interface KoreanHotReading {
  [k: string]: unknown;
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

export interface SpellingMistake {
  [k: string]: unknown;
  id: string;
  wordId?: string;
  word: string;
  meaning: string;
  userInput: string;
  correctAnswer: string;
  mistakeType: 'spelling' | 'sentence' | 'spelling-ai-unavailable';
  createdAt: number;
}

// ===== AI Chat =====
export interface AiChatMistake {
  [k: string]: unknown;
  id: string;
  userId?: string;
  scenarioId: string;
  scenarioName: string;
  userInput: string;
  wrongPart: string;
  correctPart: string;
  grammarError: string;
  createdAt: number;
  reviewed: number; // 0=未复习, 1=已复习
}

export interface AiChatNewWord {
  [k: string]: unknown;
  id: string;
  userId?: string;
  ko: string;
  zh: string;
  partOfSpeech: string;
  scenarioId: string;
  createdAt: number;
}

// ===== CloudTable typed tables (replacing CloudTable<any>) =====

export interface SavedSentence {
  [k: string]: unknown;
  id?: string;  // optional — CloudTable auto-generates if missing
  userId?: string;
  korean: string;
  chinese?: string;
  sourceType?: string;
  sourceId?: string;
  sourceTitle?: string;
  source?: string;           // kpop pages use `source: "${title} - ${artist}"`
  source_type?: string;      // snake_case aliases for sync compatibility
  source_id?: string;
  source_title?: string;
  startTime?: number;
  start_time?: number | string;
  endTime?: number;
  end_time?: number | string;
  note?: string;
  createdAt?: number;
  created_at?: number | string;
  updatedAt?: number;
}

export interface SavedArticle {
  [k: string]: unknown;
  id: string;
  userId?: string;
  title: string;
  originalText?: string;
  translatedText?: string;
  sourceType?: string;
  sourceUrl?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface SavedNote {
  [k: string]: unknown;
  id: string;
  userId?: string;
  title: string;
  content?: string;
  sourceType?: string;
  sourceId?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface UserRecording {
  [k: string]: unknown;
  id?: string;  // optional — CloudTable auto-generates if missing
  userId?: string;
  type?: string;              // 'shadowing' | 'pronunciation' | 'retell'
  sourceId?: string;
  sourceType?: string;
  source_id?: string;          // snake_case alias
  source_type?: string;
  lineId?: string;
  line_id?: string;
  korean?: string;
  audioUrl?: string;
  audio_url?: string;          // snake_case alias
  audioData?: string;
  audio_data?: string;
  durationMs?: number;
  duration_ms?: number;
  createdAt?: number;
  created_at?: number | string;
  updatedAt?: number;
}

export interface DiaryEntry {
  [k: string]: unknown;
  id: string;
  userId?: string;
  title: string;
  content: string;
  mood?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface NewsReadingProgress {
  [k: string]: unknown;
  id: string;
  userId?: string;
  postId: string;
  readAt: number;
  completedAt?: number;
}

export interface PhoneticMistake {
  [k: string]: unknown;
  id: string;
  userId?: string;
  targetJamo: string;
  wrongJamo: string;
  stage: number;
  wrongCount: number;
  lastWrongAt: number;
  resolved: number;       // 0 / 1
  createdAt: number;
}

export interface PhoneticSrsItem {
  [k: string]: unknown;
  id: string;
  userId?: string;
  jamo: string;
  stage: number;
  srsLevel: number;
  easeFactor: number;
  interval: number;       // days, can be fractional for sub-day intervals
  nextReviewAt: number;
  seenCount: number;
  correctCount: number;
  wrongCount: number;
  createdAt: number;
}

export interface UserPhoneticStep {
  [k: string]: unknown;
  id: string;
  completedAt: number;
}

export interface GrammarFavorite {
  [k: string]: unknown;
  id: string;              // grammarId
  createdAt: number;
}

export interface TypingPackProgress {
  [k: string]: unknown;
  id: string;              // themeId
  completedAt: number;
  bestWpm: number;
  bestAccuracy: number;
  practiceCount: number;
  updatedAt: number;
}

export interface TypingMastery {
  [k: string]: unknown;
  id: string;              // `${themeId}:${type}:${korean}`
  themeId: string;
  itemKey: string;         // `${type}:${korean}`
  streak: number;
  updatedAt: number;
}

export interface WritingHistoryRecord {
  [k: string]: unknown;
  id: string;
  date: string;
  mode: string;
  modeLabel: string;
  score: string;
  snippet: string;
  detailsJson: string;     // JSON 序列化的原 details
  createdAt: number;
}

export interface AiAnalyzeHistoryItem {
  [k: string]: unknown;
  id: string;
  timestamp: number;
  original: string;
  fullTranslation: string;
  resultJson?: string;     // JSON 序列化的 AnalysisResult
}

export interface UserVocabLastVisit {
  [k: string]: unknown;
  id: string;              // 固定 'main'（单例）
  source?: 'yonsei' | 'seoul' | 'vitamin' | 'levels' | 'themes' | 'books';
  unitId?: string;
  unitTitle?: string;
  updatedAt: number;
}

export interface UserExpressionAdded {
  [k: string]: unknown;
  id: string;              // expressionId
  createdAt: number;
}

export interface PracticeScore {
  [k: string]: unknown;
  id: string;              // ${userId}:${slug}:${completedAt}
  userId: string;
  sceneSlug: string;
  sceneCn: string;
  natural: number;         // 0-100
  grammar: number;
  politeness: number;
  task: number;
  overall: number;
  tips: string[];          // 最多 3 条，每条 ≤ 30 字
  highlight: string | null;
  msgCount: number;
  mistakeCount: number;
  createdAt: number;
}

// ===== 兔莉的博客 (Tori's Blog) =====
export type BlogLevel = '초급' | '중급' | '고급';
// 일상 = 动物们的日常短分享；소식 = 动物城新闻/公告
export type BlogCategory = '일상' | '소식' | '서울 일기' | '문화 노트' | '속담';

// 正文里的一个词汇（inline 展开卡用）：韩语词 + 读法 + 中文释义
export interface BlogVocab {
  [k: string]: unknown;
  word: string;      // 韩语词，用于匹配正文中的 .word span
  reading: string;   // 罗马音/读法，可空
  meaning: string;   // 中文释义
}

// 正文的一句：韩语 + 中文翻译（桌面阅读栏可不显示中文）
export interface BlogSentence {
  [k: string]: unknown;
  ko: string;
  zh: string;
  t?: [number, number];   // [startSec, endSec] 在整段 audioUrl 里的位置;点单句跳播整段这一段。无则回落 edge-tts
}

// 一道测验题
export interface BlogQuizItem {
  [k: string]: unknown;
  question: string;      // 题干（中文或韩语）
  options: string[];     // 选项
  answerIndex: number;   // 正确选项下标
  explanation?: string;  // 解析，可空
}

// 动物伙伴的一条评论（评论区=偷偷的口语课）
export interface BlogComment {
  [k: string]: unknown;
  animalId: string;   // 对应 BLOG_CAST 里的 id
  ko: string;         // 韩语留言
  zh: string;         // 中文小字注释
  audioUrl?: string;  // 预录评论语音(角色音色);无则实时合成(动态回复恒无)
}

// 帖子里的一张图（NPC 提前做 / 用户上传通用）。存真实宽高，前端按比例自适应（ins 式）。
export interface BlogImage {
  [k: string]: unknown;
  url: string;
  w: number;   // 原始像素宽
  h: number;   // 原始像素高
}

// content_json 反序列化后的结构
export interface BlogContent {
  [k: string]: unknown;
  sentences: BlogSentence[];
  vocab: BlogVocab[];
  quiz: BlogQuizItem[];
  comments: BlogComment[];   // 动物伙伴评论流
  likedBy: string[];         // 点赞的动物 id（社交证明用，如 "곰돌이님 외 24명"）
  images?: BlogImage[];      // 帖子配图（1-10 张，横竖方自适应+可轮播）。空/无=纯文字帖
}

// 封面主题色（渐变），预留真实封面图前的占位配色
export type BlogCoverTheme = 'pink' | 'gold' | 'purple' | 'mint';

// 动物作者/伙伴
export interface BlogAuthor {
  [k: string]: unknown;
  id: string;
  emoji: string;
  name: string;       // 韩文名，如 토리
  handle: string;     // @tori.seoul
  badge?: string;     // 名字旁小图标 emoji
  theme: BlogCoverTheme;
  bio?: string;       // 作者主页一句人设简介（韩文）
  bioZh?: string;     // 简介中文
  imageUrl?: string;  // 头像图（有则渲染图，无则回落 emoji）
}

export interface BlogPost {
  [k: string]: unknown;
  id: string;
  slug: string;
  titleKo: string;
  titleZh: string;
  excerptKo: string;
  level: BlogLevel;
  category: BlogCategory;
  content: BlogContent;      // 由 content_json 解析而来
  audioUrl: string;
  audioDuration: number;     // 秒
  coverEmoji: string;
  coverImageUrl: string;     // 单图兜底 URL（旧数据/榜单用）；多图/带宽高走 content.images
  coverTheme: BlogCoverTheme;
  authorId: string;          // 哪只动物发的（NPC 帖用；user 帖此处存 user_id）
  likeCount: number;         // 基础点赞数（动物/虚拟社交证明）
  publishedAt: number;
  isFeatured: boolean;
  unlockDay: number;         // Day 门控：0=始终显示，>0 需用户日记进度达到该 Day
  authorKind: 'npc' | 'user' | 'passerby'; // passerby=首尔市民路人，不门控、不进主角侧栏
  score?: BlogPostScore;     // 用户帖的多维评分结果（NPC 帖无）
  aiStatus: 'pending' | 'passed' | 'blocked'; // 一审：AI 自动审核结果（NPC 默认 passed）
  aiReason: string;          // 一审拦截原因（blocked 时给作者看）
  moderatedText: string;     // 二审：管理员改写后的公开正文（入选榜单用）
  featureDate: string;       // 二审：入选公开榜单的日期 'YYYY-MM-DD'，空=未入选
  featureRank: number;       // 二审：当日榜单名次（1-3），0=未入选
  liked?: boolean;           // 当前用户是否点赞（真实持久化）
  saved?: boolean;           // 当前用户是否收藏
}

// 用户帖的 DeepSeek 多维评分（中文），韩语回应从安全池选
export interface BlogPostScore {
  [k: string]: unknown;
  overall: number;           // 总分 0-100
  dimensions: {              // 各维度得分 0-100
    grammar: number;         // 语法/句型正确
    vocabulary: number;      // 词汇运用
    expression: number;      // 表达达意
  };
  usedTargetGrammar: boolean; // 是否用上了当天学的句型
  comment: string;           // 一句中文点评/鼓励
  xpEarned: number;          // 本次获得经验
}

// 博客专属用户档案（选的动物形象 + 经验/等级）
export interface BlogUserStats {
  [k: string]: unknown;
  userId: string;
  animalId: string;          // 选的预制动物形象 id（见 blogAvatars）
  nickname: string;
  xp: number;
  level: number;
  postCount: number;
}

// 博客通知（动物点赞/评论了你的帖子）。发帖时预写、读时按 createdAt 揭晓
export interface BlogNotification {
  [k: string]: unknown;
  id: string;
  type: 'like' | 'comment' | 'radio' | 'follow_post';
  postSlug: string;
  fromAnimalId: string;      // 触发通知的动物 id（对应 BLOG_CAST）
  messageKo: string;
  messageZh: string;
  createdAt: number;
  isRead: boolean;
}

// 用户在 NPC 帖下的私密评论 + 动物回应（只对本人可见，按 user_id 隔离）。
// 发评论时立刻可见；动物回复在未来 reveal 时间揭晓（同 growth/通知的"冻结+揭晓、无 cron"哲学）。
export interface BlogUserComment {
  [k: string]: unknown;
  id: string;
  author: 'me' | 'animal';   // me = 用户本人；animal = NPC 作者回应
  animalId: string;          // author='animal' 时为回应的动物 id；'me' 时空
  ko: string;                // 正文（用户写的原文 / 动物回应韩语）
  zh: string;                // 动物回应的中文小字（用户评论为空）
  createdAt: number;         // 揭晓时间（用户评论=此刻；动物回复=未来 reveal ts）
}

// 预制动物形象（用户从画廊选一只作为自己的社媒身份）
export interface BlogAvatar {
  [k: string]: unknown;
  id: string;
  name: string;              // 韩文名
  imageUrl: string;          // 提前生成的形象图
  emoji: string;             // 列表/评论区省流占位
}

// 混入博客 feed 的电台卡（轻量 DTO，服务端从 radioCast 取，不含字幕/生词，避免 300KB 进客户端包）
export interface RadioCard {
  [k: string]: unknown;
  id: string;                // 电台 episode id，点击跳 /radio/{id}
  program: string;           // 节目基 id：squirrel-morning / animal-news / bear-night / fox-cafe
  title: string;             // 韩语标题
  titleZh: string;           // 中文标题
  host: string;              // 主持动物
  hostEmoji: string;
  level: string;             // 초급 / 중급 / 고급
  duration: string;          // "3:30"
  scheduleTime: string;      // "07:00"
  coverColor: string;        // 节目色 token 名
  category: string;          // 아침 인사 / 뉴스 / 이야기 / 토크
  day: number;               // 对应日记 Day（与 blog unlock_day 同一时间轴）
}

// ===== 词典百科 (KRDict 국립국어원 한국어기초사전, CC BY-SA 2.0) =====
// 服务端数据，短字段名压缩体积；不进前端 bundle，走 /api/dict/*
export interface DictSenseExample {
  [k: string]: unknown;
  t: string;                 // 类型：구(词组) / 문장(句子) / 대화(对话)
  ex: string;                // 例句韩语原文
}
export interface DictSense {
  [k: string]: unknown;
  defKo: string;             // 韩语释义（官方）
  zh?: string;               // 中文对译词（없으면 생략；占位符已剔除）
  defZh?: string;            // 中文释义（官方）
  ex?: DictSenseExample[];   // 例句（最多 6 条）
}
export interface DictEntry {
  [k: string]: unknown;
  id: string;                // KRDict 词条 id
  k: string;                 // 表题词（한글）
  h?: string;                // 同形异义号（homonym）
  pos?: string;              // 词性（명사/동사/…）
  pron?: string;             // 发音
  snd?: string;              // 官方发音音频 URL
  lv?: string;               // 难度：초급 / 중급 / 고급
  cat?: string;              // 语义分类
  s: DictSense[];            // 义项列表
}
// 浏览/搜索列表项（不含义项详情，减小传输）
export interface DictListItem {
  [k: string]: unknown;
  id: string;
  k: string;
  h?: string;
  pos?: string;
  pron?: string;
  lv?: string;
  zh?: string;               // 首义项中文对译（列表速览）
  defZh?: string;            // 首义项中文释义（zh 缺失时兜底）
  defKo?: string;            // 韩语释义（zh/defZh 都缺时兜底）
}

// ===== 邀请裂变 =====
export interface Invitation {
  [k: string]: unknown;
  id: string;
  inviterId: string;
  inviteeId: string;
  code: string;
  status: 'pending' | 'qualified';
  deviceHash: string;
  ip: string;
  createdAt: number;
  qualifiedAt?: number;
}
export interface InviteReward {
  [k: string]: unknown;
  id: string;
  userId: string;
  threshold: number;
  daysGranted: number;
  rewardType: string;
  status: 'pending' | 'granted' | 'won' | 'lost';
  createdAt: number;
  grantedAt?: number;
}
export interface InviteShipment {
  [k: string]: unknown;
  id: string;
  userId: string;
  threshold: number;
  boxType: string;
  status: 'pending' | 'approved' | 'shipped' | 'done' | 'rejected';
  recipient: string;
  phone: string;
  address: string;
  trackingNo: string;
  detail: string;
  createdAt: number;
  updatedAt: number;
}
