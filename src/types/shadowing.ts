export interface ShadowingToken {
  surface: string;
  baseForm?: string;
  meaning: string;
  pronunciation?: string;
  partOfSpeech?: string;
  usageNote?: string;
  example?: string;
}

export interface ShadowingSegment {
  id: string;
  clipId: string;
  segIndex: number;
  startMs: number;
  endMs: number;
  korean: string;
  chinese: string;
  tokens: ShadowingToken[];
  shadowingTip?: string;
  vocabPills?: string[];
}

export interface ShadowingClip {
  id: string;
  title: string;
  speaker: string;
  description: string;
  sourceType: 'drama' | 'variety' | 'youtube' | 'tedx' | 'vlog' | 'news' | 'kpop';
  youtubeId: string;
  coverUrl: string;
  durationMs: number;
  durationLabel: string;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2';
  tags: string[];
  isPremium: boolean;
  isPublished: boolean;
  sortOrder: number;
  segmentCount?: number;
  segments?: ShadowingSegment[];
  createdAt: number;
  updatedAt: number;
}

export interface ShadowingProgress {
  clipId: string;
  completedSegs: number[];
  lastSegIndex: number;
  status: 'not_started' | 'in_progress' | 'completed';
  recordedCount: number;
  savedWordCount: number;
  completedAt?: number;
  lastStudiedAt: number;
}

export type ShadowingPlayMode = 'free' | 'listen' | 'record' | 'analyze';

export interface ShadowingPlayerState {
  playMode: ShadowingPlayMode;
  activeIdx: number;
  isPlaying: boolean;
  isLooping: boolean;
  speed: 0.75 | 1.0 | 1.25;
  recordState: 'idle' | 'recording' | 'recorded';
  recordedUrl: string | null;
  isPlayingRecording: boolean;
  selectedToken: ShadowingToken | null;
}
