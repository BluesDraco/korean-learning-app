// Tori 韩语日记 · 30 天养成手册类型定义
// 主角中文名：兔莉（Tori）— 不复用 src/types DiaryEntry（已被用户写日记功能占用）

export type ToriModuleKind = 'opening' | 'words' | 'dialogue' | 'grammar' | 'output' | 'recap';
export type ToriOutputKind = 'dictation' | 'record' | 'choice' | 'fill';
export type ToriPhase = 'foundation' | 'expansion' | 'expression' | 'mastery';
export type ToriPaletteHint = 'pink' | 'mint' | 'yellow' | 'cream' | 'gold' | 'peach' | 'purple';

/** 词汇卡 */
export interface ToriWord {
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
  example: { ko: string; zh: string };
  /** 可选记忆口诀或文化备注 */
  tip?: string;
  /** 可选预生成音频，缺则走 speak() TTS */
  audio?: string;
}

/** 对话单行 */
export interface ToriDialogueLine {
  speaker: 'tori' | 'you' | 'npc';
  /** 当 speaker === 'npc' 时显示 */
  npcName?: string;
  ko: string;
  hangul: string;
  zh: string;
  /** 该行用户要做什么：仅听 / 跟读 / 选答 */
  practice?: 'listen' | 'shadow' | 'pick';
  /** practice === 'pick' 时的选项 */
  choices?: Array<{ ko: string; zh: string; correct: boolean }>;
}

/** 对话场景 */
export interface ToriDialogue {
  scene: string;
  setting: { time: string; place: string; npc?: string };
  lines: ToriDialogueLine[];
}

/** 语法点 */
export interface ToriGrammar {
  title: string;
  pattern: string;
  whenToUse: string;
  rules: string[];
  examples: Array<{ ko: string; zh: string; highlight?: string }>;
  pitfall?: string;
}

/** 输出任务（默写/录音/选择/填空） */
export interface ToriOutputTask {
  id: string;
  kind: ToriOutputKind;
  prompt: string;
  zhHint?: string;
  answer?: string;
  choices?: Array<{ text: string; correct: boolean }>;
  successMsg?: string;
}

/** 日记开场 */
export interface ToriOpening {
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
  toriPose?: string;
  praise: string;
  preview: string;
  stickerId: string;
}

/** 贴纸 */
export interface ToriSticker {
  id: string;
  day: number;
  title: string;
  meaning: string;
  paletteHint: ToriPaletteHint;
}

/** 一天的完整内容 */
export interface ToriDay {
  day: number;
  phase: ToriPhase;
  title: string;
  subtitle: string;
  /** 关卡天（Day 7/14/21/26/29）或最终考试 Day 30，普通天为 null/undefined */
  isCheckpoint?: 7 | 14 | 21 | 26 | 29 | 30 | null;
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

/** 用户进度（一天一条） */
export interface ToriProgress {
  /** 形如 {userId}-{day} */
  id: string;
  userId: string;
  day: number;
  modulesDone: ToriModuleKind[];
  startedAt: number;
  completedAt?: number;
  output: Array<{ taskId: string; correct: boolean; userText?: string }>;
}

/** 用户获得的贴纸 */
export interface ToriStickerOwned {
  /** 形如 {userId}-{stickerId} */
  id: string;
  userId: string;
  stickerId: string;
  acquiredAt: number;
}

/** 勇气胡萝卜对话单条（仅 localStorage 持久化） */
export interface ToriCarrotMessage {
  role: 'user' | 'tori';
  text: string;
  ts: number;
}
