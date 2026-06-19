// KPOP lyrics karaoke + hot posts types
// V2 data model: KpopTrack / KpopLine as primary types

export type KpopLineStatus = 'untouched' | 'practiced' | 'completed';

export interface LocalLyricLine {
  korean: string;
  romanization?: string;
  chinese?: string;
  keywords: { korean: string; meaning: string }[];
  startMs: number;
  endMs: number;
}

// ── V2 Track / Line model ──

export type KpopAssetStatus = 'ready' | 'processing' | 'missing_audio' | 'missing_lyrics';
export type KpopSourceType = 'curated' | 'user_generated';

export interface KpopWord {
  korean: string;
  meaning: string;
}

export interface KpopLine {
  startMs: number;
  endMs: number;
  korean: string;
  pronunciation: string;
  chinese: string;
  section?: string;
  keywords?: KpopWord[];
  expressionNote?: string;
  lineAudioUrl?: string;
  spokenAudioUrl?: string;
}

export interface KpopTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  coverUrl: string;
  audioUrl: string;
  assetStatus: KpopAssetStatus;
  sourceType: KpopSourceType;
  level: 'beginner' | 'intermediate' | 'advanced';
  color: string;
  tags: string[];
  lyrics: KpopLine[];
  importJobId?: string;
  timingOffsetMs?: number;
  timingVerified?: boolean;
  timingSource?: 'manual' | 'auto' | 'verified';
}

export interface KpopImportJob {
  id: string;
  url: string;
  title?: string;
  status: 'queued' | 'analyzing_link' | 'fetching_metadata' | 'matching_lyrics'
    | 'aligning_timestamps' | 'generating_learning_cards' | 'needs_review' | 'ready' | 'failed';
  trackId?: string;
  error?: string;
  createdAt: number;
  updatedAt: number;
}

export interface KpopLyricLineData {
  id: string;
  songId: string;
  lineIndex: number;
  korean: string;
  chinese?: string;
  romanization?: string;
  audioUrl?: string;
  originalAudioUrl?: string;
  startTimeMs?: number;
  endTimeMs?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  section?: 'verse' | 'pre_chorus' | 'chorus' | 'bridge' | 'rap';
  explanation?: {
    summary?: string;
    keywords?: { korean: string; chinese: string }[];
    note?: string;
  };
}

export interface KpopLineRecording {
  id: string;
  userId: string;
  songId: string;
  lineId: string;
  lineIndex: number;
  recordingUrl: string;
  durationMs: number;
  attemptIndex: number;
  createdAt: number;
  userNote?: string;
}

export interface KpopSongProgress {
  userId: string;
  songId: string;
  totalLines: number;
  practicedLines: number;
  completedLines: string[];
  currentLineId?: string;
  lastPracticedAt?: number;
  totalRecordings: number;
  totalPracticeSeconds: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

export type KpopHotPostCategory =
  | 'comeback' | 'stage' | 'fan_comment'
  | 'official' | 'fashion' | 'variety' | 'general';

export interface HotSentenceBreakdown {
  token: string;
  meaning: string;
  note?: string;
}

export interface KpopHotSentence {
  id: string;
  postId: string;
  sortIndex: number;
  korean: string;
  chinese: string;
  breakdown: HotSentenceBreakdown[];
  expressionNote?: string;
  reusableExpression?: string;
  audioUrl?: string;
}

export interface KpopHotPost {
  id: string;
  titleZh: string;
  titleKo?: string;
  summaryZh: string;
  category: KpopHotPostCategory;
  imageUrl?: string;
  sourceUrl: string;
  sourceName: string;
  publishedAt: number;
  fetchedAt: number;
  artists: string[];
  groups: string[];
  tags: string[];
  hotScore: number;
  learningScore: number;
  sentences: KpopHotSentence[];
  isPublished: boolean;
}
