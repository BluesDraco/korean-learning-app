// Tori 韩语日记 · 30 天养成手册类型定义
// 主角中文名：兔莉（Tori）— 不复用 src/types DiaryEntry（已被用户写日记功能占用）

export type ToriModuleKind = 'opening' | 'words' | 'flashcard' | 'dialogue' | 'grammar' | 'output' | 'recap';
export type ToriOutputKind = 'dictation' | 'record' | 'choice' | 'fill' | 'compose' | 'listen-choice' | 'zh-to-ko' | 'particle-error' | 'match-pair';
export type ToriPhase = 'foundation' | 'expansion' | 'expression' | 'mastery';
export type ToriPaletteHint = 'pink' | 'mint' | 'yellow' | 'cream' | 'gold' | 'peach' | 'purple';
export type ToriLevel = 'beginner' | 'intermediate' | 'advanced';

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
  /** 内心独白，渲染时斜体+灰色气泡 */
  isInnerVoice?: boolean;
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
  examples: Array<{ ko: string; zh: string; highlight?: string; note?: string }>;
  pitfall?: string;
}

/** 输出任务（默写/录音/选择/填空/组词/听力/中韩/助词/连连） */
export interface ToriOutputTask {
  id: string;
  kind: ToriOutputKind;
  prompt?: string;
  zhHint?: string;
  answer?: string;
  /** 选择题通用（listen-choice / zh-to-ko / particle-error） */
  choices?: Array<{ ko?: string; zh?: string; text?: string; correct: boolean }>;
  /** 组词题 · 候选词卡（含 2-3 个干扰词，已打乱） */
  tokens?: string[];
  /** 组词题 · 正确顺序 */
  composeAnswer?: string[];
  /** 听力题 · TTS 朗读源 */
  audioKo?: string;
  /** 中→韩题 / 助词题 · 中文提示 */
  zhPrompt?: string;
  /** 连连看 · 4-5 对韩中词卡 */
  pairs?: Array<{ ko: string; zh: string }>;
  successMsg?: string;
  /** 关卡专用：该题对应的剧情时刻，显示在题目上方（用 \n 分行） */
  sceneContext?: string;
  /** 关卡专用：故事面板左上角的标签，如"广播第三次" */
  examMoment?: string;
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
  /** 9:16 场景图（可选）。无图时走渐变 + emoji 兜底 */
  sceneImageUrl?: string;
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
  level: ToriLevel;
  phase: ToriPhase;
  title: string;
  subtitle: string;
  /** 关卡天（Day 7/14/21/26/29）或最终考试 Day 30，普通天为 null/undefined */
  isCheckpoint?: 7 | 14 | 21 | 26 | 29 | 30 | null;
  /** 关卡专属配置（仅 isCheckpoint 天有） */
  checkpointConfig?: {
    /** 入场卡文本（分行数组），每条换行显示 */
    preludeLines: string[];
    /** CarrotHelper 锁定时显示的提示（显示在按钮旁） */
    carrotLostMsg: string;
    /** 通关后解锁动画的对白 */
    unlockDialogue: { speaker: 'npc'; npcName: string; ko: string; zh: string }[];
  };
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
  /** 形如 {userId}-{level}-{day} */
  id: string;
  userId: string;
  level: ToriLevel;
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
