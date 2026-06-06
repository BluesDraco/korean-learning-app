// Kpop tracks — V2 curated content library
// Wraps existing kpopSongs data in the KpopTrack model with explicit audio/cover URLs.

import type { KpopTrack, KpopLine, KpopWord } from '@/types/kpop';
import { kpopSongs } from './kpopSongs';

// Small inline dictionary for auto-generating word breakdowns
const WORD_DICT: Record<string, string> = {
  나: '我', 난: '我', 내: '我的', 넌: '你', 너: '你', 우리: '我们',
  보다: '看', 봐: '看', 봐봐: '看看吧', 보란: '看',
  하늘: '天空', 높이: '高高地', 날: '我/日子',
  자신: '自信', 있게: '有/存在',
  다시: '再次', 올라가: '上去',
  더: '更', 아파: '痛', 할까: '会吗',
  어떻게: '怎么', 생각해: '想',
  지금: '现在', 이: '这', 순간: '瞬间',
  날아가: '飞走', 저: '那',
  끝내: '结束', 했어: '做了',
  친구: '朋友', 입: '嘴',
  약속: '约定', 지키기: '守护',
  말해: '说', 줄래: '给吗',
  알고: '知道', 싶어: '想',
  사랑: '爱', 사랑해: '我爱你',
  마음: '心', 가슴: '胸口/心',
  눈: '眼/雪', 밤: '夜', 별: '星', 꿈: '梦',
  길: '路', 빛: '光', 시간: '时间', 오늘: '今天', 내일: '明天',
  좋아: '好/喜欢', 싫어: '讨厌', 미워: '恨',
  가다: '去', 오다: '来', 있다: '在/有', 없다: '没有',
  주다: '给', 받다: '收到', 만들다: '做',
  크다: '大', 작다: '小', 예쁘다: '漂亮',
  듣다: '听', 말: '话', 노래: '歌', 춤: '舞',
  사람: '人', 남자: '男人', 여자: '女人',
  왜: '为什么', 뭐: '什么', 누가: '谁', 어디: '哪里',
};

function extractKeywords(korean: string): KpopWord[] {
  const words = korean.split(/[\s,.'"!?\-…~]+/).filter(w => /[가-힣]/.test(w));
  const seen = new Set<string>();
  const result: KpopWord[] = [];
  for (const w of words) {
    if (seen.has(w) || w.length < 2) continue;
    seen.add(w);
    const meaning = WORD_DICT[w];
    if (meaning) result.push({ korean: w, meaning });
  }
  return result.slice(0, 5);
}

const COS_BASE = 'https://torikorean-1436752408.cos.ap-hongkong.myqcloud.com';
const AUDIO_PREFIX = 'audio/kpop';

function buildAudioUrl(videoId: string): string {
  return `${COS_BASE}/${AUDIO_PREFIX}/${videoId}.webm`;
}

function buildCoverUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

const LINE_AUDIO_PREFIX = 'audio/kpop/lines';
const SPOKEN_AUDIO_PREFIX = 'audio/kpop/spoken';

function buildLineAudioUrl(videoId: string, lineIndex: number): string {
  return `${COS_BASE}/${LINE_AUDIO_PREFIX}/${videoId}/${lineIndex}.webm`;
}

function buildSpokenAudioUrl(videoId: string, lineIndex: number): string {
  return `${COS_BASE}/${SPOKEN_AUDIO_PREFIX}/${videoId}/${lineIndex}.webm`;
}

function toTrack(song: (typeof kpopSongs)[number]): KpopTrack {
  const grammarNote = song.learning?.grammarPoint
    ? `${song.learning.grammarPoint.name}: ${song.learning.grammarPoint.explanation}`
    : undefined;

  const lines: KpopLine[] = song.lyrics.map((l, i) => ({
    startMs: Math.round((l.start ?? 0) * 1000),
    endMs: Math.round((l.end ?? (l.start ?? 0) + 5) * 1000),
    korean: l.korean ?? '',
    pronunciation: l.pronunciation ?? '',
    chinese: l.chinese ?? '',
    section: (l as any).section,
    keywords: extractKeywords(l.korean ?? ''),
    expressionNote: grammarNote,
    lineAudioUrl: buildLineAudioUrl(song.videoId, i),
    spokenAudioUrl: buildSpokenAudioUrl(song.videoId, i),
  }));

  return {
    id: song.id,
    title: song.title,
    artist: song.artist,
    album: song.album,
    year: song.year,
    coverUrl: buildCoverUrl(song.videoId),
    audioUrl: buildAudioUrl(song.videoId),
    assetStatus: 'ready',
    sourceType: 'curated' as const,
    level: song.level as 'beginner' | 'intermediate',
    color: song.color,
    tags: song.tags,
    lyrics: lines,
  };
}

// ── Public API ──

let _cache: KpopTrack[] | null = null;

export function getAllTracks(): KpopTrack[] {
  if (!_cache) _cache = kpopSongs.map(toTrack);
  return _cache;
}

export function getTrackById(id: string): KpopTrack | undefined {
  return getAllTracks().find((t) => t.id === id);
}

export function getTracksByLevel(level: KpopTrack['level']): KpopTrack[] {
  return getAllTracks().filter((t) => t.level === level);
}

export function searchTracks(q: string): KpopTrack[] {
  const ql = q.toLowerCase();
  return getAllTracks().filter(
    (t) =>
      t.title.toLowerCase().includes(ql) ||
      t.artist.toLowerCase().includes(ql) ||
      t.tags.some((tag) => tag.includes(ql))
  );
}
