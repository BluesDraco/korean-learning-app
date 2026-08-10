// Tori 日记子关卡 · 星级进度类型
// 每个 Day 5 个子关卡：1词汇 / 2听力 / 3语法 / 4情景 / 5Boss

import type { ToriLevel } from './tori-diary';
import type { KoZh, ZhChoice, TextChoice, KoZhChoice, SpeakerKoZh } from '@/types/inline';

export type ToriSubQuestKind = 'vocab' | 'listen' | 'grammar' | 'scene' | 'boss';

export type ToriSubQuestIdx = 1 | 2 | 3 | 4 | 5;

export type ToriSubQuestStars = 0 | 1 | 2 | 3;

/** 一条子关卡进度（一行 = 一个用户在某 level/day/idx 的最好成绩） */
export interface ToriSubQuestProgress {
  [k: string]: unknown;
  /** 形如 {userId}-{level}-{day}-{idx} */
  id: string;
  userId: string;
  level: ToriLevel;
  day: number;
  idx: ToriSubQuestIdx;
  kind: ToriSubQuestKind;
  /** 历史最高星（后续挑战只提升，不下降） */
  stars: ToriSubQuestStars;
  /** 最近一次通关的错题数（用于结算展示；不参与 max 比较） */
  wrongCount: number;
  /** 累计挑战次数 */
  attempts: number;
  /** 首次拿到 ≥1 星的时间 */
  firstClearedAt?: number;
  updatedAt: number;
}

/** 一个词的故事卡（Phase 1 语遇） */
export interface VocabEncounterCard {
  [k: string]: unknown;
  id: string;
  korean: string;
  hangul: string;
  zh: string;
  pos: string;
  /** 剧中例句（Day 1 主流程之外的补充语料） */
  example: KoZh;
  /** 用法提示 / 文化补充 / 记忆口诀，可选 */
  tip?: string;
  /** 分层：core 进认词考察，ext 进拼写/听辨考察，emotion 只出现不考察 */
  tier: 'core' | 'ext' | 'emotion';
}

/** Phase 2 认词题：韩→中四选一 */
export interface VocabRecognizeTask {
  [k: string]: unknown;
  id: string;
  korean: string;
  hangul: string;
  /** 4 个中文选项，正好 1 个 correct: true */
  choices: Array<ZhChoice>;
}

/** Phase 3 拼写题：中文提示 + 音节块拼词（非字母级） */
export interface VocabSpellTask {
  [k: string]: unknown;
  id: string;
  zhHint: string;
  /** 正确的音节顺序，如 ['당', '근'] */
  answer: string[];
  /** 打乱后的候选音节池，含 2 个干扰项 */
  syllables: string[];
}

/** Phase 4 听辨题：听音 → 选中文（不选韩文）· 已废弃，改用 dictation */
export interface VocabListenTask {
  [k: string]: unknown;
  id: string;
  /** 要播放的韩文词 */
  korean: string;
  /** 4 个中文选项 */
  choices: Array<ZhChoice>;
}

/** 手写题：一个音节字，走描红+覆盖率判定 */
export interface VocabWriteTask {
  [k: string]: unknown;
  id: string;
  /** 单音节字，如 '네' '한' '학' */
  korean: string;
  hangul: string;
  /** 所属词，用于 UI 显示（如 '한국'） */
  wordKorean: string;
  wordZh: string;
}

/** 听写题：听音频 → 无描红手写 */
export interface VocabDictationTask {
  [k: string]: unknown;
  id: string;
  /** 完整词（1-3 音节），如 '네' '당근' '저기요' */
  korean: string;
  hangul: string;
  /** 拆分后的音节，用于逐字写 */
  syllables: string[];
  /** 写完展示的中文意思 */
  zh: string;
}

/** Day X 的 1-1 词汇子关卡完整数据 */
export interface VocabSubQuestData {
  [k: string]: unknown;
  day: number;
  level: ToriLevel;
  idx: 1;
  kind: 'vocab';
  /** 顶栏韩文标题（如 '단어 마스터'） */
  koTitle: string;
  /** 中文子标题 */
  subtitle: string;
  encounter: VocabEncounterCard[];
  /** 手写：8 个音节字 · v3 新增 */
  write: VocabWriteTask[];
  recognize: VocabRecognizeTask[];
  spell: VocabSpellTask[];
  /** 听写：3 个词 · v3 新增（原 listen 废弃） */
  dictation: VocabDictationTask[];
  /** v2 遗留字段，v3 起废弃，为兼容保留 */
  listen?: VocabListenTask[];
}

// ═══════════════════════════════════════════════════════════
// 通用题型单元（1-2 听力 / 1-3 语法 / 1-5 Boss 跨关卡复用）
// ═══════════════════════════════════════════════════════════

/** 选择题通用单元：听句选意 / 认词 / 规则选择 / 听对话选回应 */
export interface ChoiceQuizTask {
  [k: string]: unknown;
  id: string;
  /** 有则该题带播放按钮（听力 / 听对话题） */
  audioKo?: string;
  /** 韩文题干（认词 / 改错题显示） */
  promptKo?: string;
  promptHangul?: string;
  /** 中文题干（规则理解题 / 听句选意的引导语） */
  promptZh?: string;
  /** 听句填空：[挖空前, 挖空后]，中间是缺词 */
  clozeParts?: [string, string];
  /** 4 个选项，正好 1 个 correct，text 可中/韩 */
  choices: Array<TextChoice>;
  /** 错时解析（可选） */
  explain?: string;
}

/** 组句题通用单元（含语法） */
export interface ComposeQuizTask {
  [k: string]: unknown;
  id: string;
  zhHint: string;
  audioKo?: string;
  /** 正确词序 */
  answer: string[];
  /** 含干扰的词块池（打乱前） */
  tokens: string[];
  explain?: string;
}

/** 情景选择：给情景选正确韩文 */
export interface SceneSituationTask {
  [k: string]: unknown;
  type: 'situation';
  id: string;
  scenario: string;
  choices: Array<KoZhChoice>;
  explain?: string;
}

/** 对话填空：补全对话中缺失的一句 */
export interface SceneDialogueTask {
  [k: string]: unknown;
  type: 'dialogue';
  id: string;
  lines: Array<SpeakerKoZh>;
  blankSpeaker: string;
  choices: Array<KoZhChoice>;
  explain?: string;
}

/** 语境判断：句子适合哪个场景 */
export interface SceneContextTask {
  [k: string]: unknown;
  type: 'context';
  id: string;
  ko: string;
  promptZh: string;
  choices: Array<ZhChoice>;
  explain?: string;
}

export type SceneTask = SceneSituationTask | SceneDialogueTask | SceneContextTask;

// ═══════════════════════════════════════════════════════════
// 4 个关卡 data 类型
// ═══════════════════════════════════════════════════════════

/** 1-2 听力 */
export interface ListenSubQuestData {
  [k: string]: unknown;
  day: number;
  level: ToriLevel;
  idx: 2;
  kind: 'listen';
  koTitle: string;
  subtitle: string;
  /** 听句选意 */
  meaning: ChoiceQuizTask[];
  /** 听句填空 */
  cloze: ChoiceQuizTask[];
  /** 听对话选回应 */
  reply: ChoiceQuizTask[];
}

/** 1-3 语法 */
export interface GrammarSubQuestData {
  [k: string]: unknown;
  day: number;
  level: ToriLevel;
  idx: 3;
  kind: 'grammar';
  koTitle: string;
  subtitle: string;
  /** 助词改错 */
  fix: ChoiceQuizTask[];
  /** 组句 */
  compose: ComposeQuizTask[];
  /** 规则理解选择 */
  rule: ChoiceQuizTask[];
}

/** 1-4 情景 */
export interface SceneSubQuestData {
  [k: string]: unknown;
  day: number;
  level: ToriLevel;
  idx: 4;
  kind: 'scene';
  koTitle: string;
  subtitle: string;
  tasks: SceneTask[];
}

/** Boss 单题：可能是选择题或组句题 */
export type BossTask =
  | { type: 'choice'; task: ChoiceQuizTask; label: string }
  | { type: 'compose'; task: ComposeQuizTask; label: string };

/** 1-5 Boss 战 */
export interface BossSubQuestData {
  [k: string]: unknown;
  day: number;
  level: ToriLevel;
  idx: 5;
  kind: 'boss';
  koTitle: string;
  subtitle: string;
  /** 入场剧情 */
  intro: string;
  /** 混合题 */
  tasks: BossTask[];
  /** 通关钩子 */
  outroHook: string;
}

/** 所有子关卡 data 的联合类型 */
export type AnySubQuestData =
  | VocabSubQuestData
  | ListenSubQuestData
  | GrammarSubQuestData
  | SceneSubQuestData
  | BossSubQuestData;
