// ==========================================================================
// 동물 도시 라디오 — Radio cast data + types
// --------------------------------------------------------------------------
// 内容为第一期正式剧本（韩中对照 + 本期生词）。
// audioUrl 待运营填 TTS 音源；subtitles 时间戳为临时值，接入真实音频后校准。
// ==========================================================================

export type RadioLevel = '초급' | '중급' | '고급';

// 一句字幕：start/end 为秒，驱动播放器实时高亮
// speaker 仅访谈档(fox-interview)使用：host=主持狐狸 / guest=嘉宾，驱动双人左右分栏
export interface Subtitle {
  [k: string]: unknown;
  start: number;
  end: number;
  ko: string;
  zh: string;
  speaker?: 'host' | 'guest';
}

// 本期生词：품사=词性，zh=词义，example/exampleZh=例句对照
export interface RadioVocab {
  [k: string]: unknown;
  ko: string;
  pos: string;
  zh: string;
  example: string;
  exampleZh: string;
}

export interface RadioEpisode {
  [k: string]: unknown;
  id: string;           // {program}-d{day}，如 squirrel-morning-d1
  day: number;          // 电台第 N 期；内容独立于日记剧情，仅发布节奏按日记进度解锁
  program: string;      // 节目基 id：squirrel-morning / animal-news / bear-night / fox-cafe
  title: string;        // 韩语标题
  titleZh: string;      // 中文标题
  host: string;         // 主持动物角色
  hostEmoji: string;
  guests: string[];
  level: RadioLevel;
  duration: string;     // "12:30"
  coverColor: string;   // 节目色 token 名：pink / mint / gold / purple / magenta / rose
  scheduleTime: string; // "07:00"
  category: string;     // 节目分类：아침 인사 / 뉴스 / 이야기 / 토크
  audioUrl: string;     // TTS 音源；骨架阶段留空字符串
  subtitles: Subtitle[];
  vocab: RadioVocab[];
}

// "XX명이 함께 듣는 중" 社交条用的假听众
export interface Listener {
  [k: string]: unknown;
  name: string;
  emoji: string;
  reaction?: string;
}

// ── Episodes ──────────────────────────────────────────────────────────────
// ⚠️ 节目数据（RADIO_EPISODES）已移到 src/lib/server/radioData.ts（仅服务端）。
// 本文件只留类型与纯 helper，可安全进客户端 bundle。

// "XX명이 함께 듣는 중" 社交条用的假听众
export const RADIO_LISTENERS: Listener[] = [
  { name: '토끼', emoji: '🐰', reaction: '💛' },
  { name: '늑대', emoji: '🐺', reaction: '🔥' },
  { name: '곰', emoji: '🐻' },
  { name: '여우', emoji: '🦊', reaction: '👏' },
];

// 一起听人数（假数据）
export const RADIO_LISTENER_COUNT = 23;

// scheduleTime("HH:MM") 换算成当天分钟数（纯函数，输入 RadioCard/RadioEpisode 皆可）
export function scheduleMinutes(ep: { scheduleTime: string }): number {
  const [h, m] = ep.scheduleTime.split(':').map(Number);
  return h * 60 + m;
}

// 实时编成模式：某档是否已到播出时间（nowHm = 当前分钟数）
export function isReleased(ep: { scheduleTime: string }, nowHm: number): boolean {
  return scheduleMinutes(ep) <= nowHm;
}

// 播出时间的韩语公开标签，如 "오전 7시 공개" / "오후 12시 공개"
export function releaseLabel(ep: { scheduleTime: string }): string {
  const [h, m] = ep.scheduleTime.split(':').map(Number);
  const period = h < 12 ? '오전' : '오후';
  const h12 = h <= 12 ? h : h - 12;
  const mm = m > 0 ? ` ${m}분` : '';
  return `${period} ${h12}시${mm} 공개`;
}

// 客户端从元数据列表挑 "正在播放"：按当前钟点选最贴近的一档
export function pickNowPlaying<T extends { scheduleTime: string }>(list: T[], nowHm: number): T {
  let pick = list[0];
  for (const ep of list) {
    if (scheduleMinutes(ep) <= nowHm) pick = ep;
  }
  return pick;
}
