import type { KoZh, KoZhChoice, ChoiceOption } from '@/types/inline';
// Tori 韩语日记 · 30 天养成手册类型定义
// 主角中文名：兔莉（Tori）— 不复用 src/types DiaryEntry（已被用户写日记功能占用）

export type ToriModuleKind = 'opening' | 'words' | 'flashcard' | 'dialogue' | 'grammar' | 'output' | 'recap';
export type ToriOutputKind = 'dictation' | 'record' | 'choice' | 'fill' | 'compose' | 'listen-choice' | 'zh-to-ko' | 'particle-error' | 'match-pair';
export type ToriPhase = 'foundation' | 'expansion' | 'expression' | 'mastery';
export type ToriPaletteHint = 'pink' | 'mint' | 'yellow' | 'cream' | 'gold' | 'peach' | 'purple';
export type ToriLevel = 'beginner' | 'intermediate' | 'advanced';

/** 日记图片种类：hero=横 16:9 首页大图，scene=竖 9:16 收尾图 */
export type ToriImageKind = 'hero' | 'scene';

/** 词汇卡 */
export interface ToriWord {
  [k: string]: unknown;
  /** 形如 d01-w1 */
  id: string;
  /** 韩文原型 */
  korean: string;
  /** 罗马音 */
  hangul: string;
  /** 中文意思 */
  zh: string;
  /** 词性中文标签 */
  pos: '名词' | '动词' | '形容词' | '副词' | '助词' | '感叹词' | '表达' | '代词';
  /** 例句（与剧情强绑定） */
  example: KoZh;
  /** 可选记忆口诀或文化备注 */
  tip?: string;
  /** 可选预生成音频，缺则走 speak() TTS */
  audio?: string;
}

/** 对话单行 */
export interface ToriDialogueLine {
  [k: string]: unknown;
  speaker: 'tori' | 'you' | 'npc';
  /** 当 speaker === 'npc' 时显示 */
  npcName?: string;
  /** 内心独白，渲染时斜体+灰色气泡 */
  isInnerVoice?: boolean;
  ko: string;
  hangul: string;
  zh: string;
  /** 该行用户要做什么：仅听 / 跟读 / 选答 */
  practice?: 'listen' | 'shadow' | 'pick';
  /** practice === 'pick' 时的选项 */
  choices?: Array<KoZhChoice>;
}

/** 对话场景 */
export interface ToriDialogue {
  [k: string]: unknown;
  scene: string;
  setting: { time: string; place: string; npc?: string };
  lines: ToriDialogueLine[];
}

/** 语法点 */
export interface ToriGrammar {
  [k: string]: unknown;
  title: string;
  pattern: string;
  whenToUse: string;
  rules: string[];
  examples: Array<KoZhHighlight>;
  pitfall?: string;
}

/** 输出任务（默写/录音/选择/填空/组词/听力/中韩/助词/连连） */
export interface ToriOutputTask {
  [k: string]: unknown;
  id: string;
  kind: ToriOutputKind;
  prompt?: string;
  zhHint?: string;
  answer?: string;
  /** 选择题通用（listen-choice / zh-to-ko / particle-error） */
  choices?: Array<ChoiceOption>;
  /** 组词题 · 候选词卡（含 2-3 个干扰词，已打乱） */
  tokens?: string[];
  /** 组词题 · 正确顺序 */
  composeAnswer?: string[];
  /** 听力题 · TTS 朗读源 */
  audioKo?: string;
  /** 中→韩题 / 助词题 · 中文提示 */
  zhPrompt?: string;
  /** 连连看 · 4-5 对韩中词卡 */
  pairs?: Array<KoZh>;
  successMsg?: string;
  /** 已废弃字段，历史数据兼容用 */
  sceneContext?: string;
  /** 已废弃字段，历史数据兼容用 */
  examMoment?: string;
}

/** 日记开场 */
export interface ToriOpening {
  [k: string]: unknown;
  date: string;
  weather?: string;
  /** Tori pose 名称 — 当前阶段仅占位字段，组件不渲染图片 */
  toriPose?: string;
  /** 主日记文案（中文为主 + 韩文点缀） */
  diaryText: string;
  /** 短剧切片视频/音频 URL，可选 */
  shortClipUrl?: string;
}

/** 日记收尾 */
export interface ToriRecap {
  [k: string]: unknown;
  toriPose?: string;
  praise: string;
  preview: string;
  stickerId: string;
  /** 9:16 场景图（可选）。无图时走渐变 + emoji 兜底 */
  sceneImageUrl?: string;
}

/** 贴纸 */
export interface ToriSticker {
  [k: string]: unknown;
  id: string;
  day: number;
  title: string;
  meaning: string;
  paletteHint: ToriPaletteHint;
}

/** 一天的完整内容 */
export interface ToriDay {
  [k: string]: unknown;
  day: number;
  level: ToriLevel;
  phase: ToriPhase;
  title: string;
  subtitle: string;
  /** 日记首页 hero 插图（16:9） */
  heroImageUrl?: string;
  estimatedMin: number;
  opening: ToriOpening;
  words: ToriWord[];
  dialogue: ToriDialogue;
  grammar: ToriGrammar;
  output: ToriOutputTask[];
  recap: ToriRecap;
  /** 勇气胡萝卜的提示词，引导今天的对话方向 */
  carrotHint?: string;
}

/** 每个模块的内部答题/翻卡进度（"小抄本"） */
export interface ToriModuleState {
  [k: string]: unknown;
  flashcard?: {
    phase?: 'review' | 'quiz';
    idx?: number;
    seen?: string[];
    qIdx?: number;
    wrongCount?: number;
  };
  dialogue?: {
    currentIdx?: number;
    picked?: Record<number, number>;
    shadowed?: number[];
  };
  output?: {
    qIdx?: number;
    hearts?: number;
    results?: Array<{ taskId: string; correct: boolean; userText?: string; [k: string]: unknown }>;
  };
  words?: {
    flippedIds?: string[];
  };
}

/** 用户进度（一天一条） */
export interface ToriProgress {
  [k: string]: unknown;
  /** 形如 {userId}-{level}-{day} */
  id: string;
  userId: string;
  level: ToriLevel;
  day: number;
  modulesDone: ToriModuleKind[];
  startedAt: number;
  completedAt?: number;
  output: Array<{ taskId: string; correct: boolean; userText?: string; [k: string]: unknown }>;
  /** 每个模块的内部状态，用于中途恢复。老记录可能没有这个字段。 */
  moduleState?: ToriModuleState;
}

/** 用户获得的贴纸 */
export interface ToriStickerOwned {
  [k: string]: unknown;
  /** 形如 {userId}-{stickerId} */
  id: string;
  userId: string;
  stickerId: string;
  acquiredAt: number;
}

/** 勇气胡萝卜对话单条（仅 localStorage 持久化） */
export interface ToriCarrotMessage {
  [k: string]: unknown;
  role: 'user' | 'tori';
  text: string;
  ts: number;
}
