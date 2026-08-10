import { koSubs, zhSubs } from './subs';
import type { SubtitleLine } from './tedxTalks';

export interface ShadowingToken {
  surface: string;
  baseForm: string;
  meaning: string;
  partOfSpeech: string;
  note?: string;
}

export interface ShadowingSubtitle {
  id: string;
  index: number;
  startMs: number;
  endMs: number;
  korean: string;
  chinese: string;
  tokens?: ShadowingToken[];
  shadowingTip?: string;
  vocabPills?: string[];
  audioSegmentUrl?: string;
  slowAudioUrl?: string;
}

export interface ShadowingClip {
  id: string;
  title: string;
  speaker: string;
  description: string;
  sourceType: 'drama' | 'variety' | 'youtube' | 'news' | 'vlog' | 'tedx';
  videoUrl: string;
  audioUrl: string;
  coverUrl: string;
  durationMs: number;
  durationLabel: string;
  difficulty: string;
  subtitleCount: number;
  tags: string[];
  timingVerified: boolean;
  subtitles: ShadowingSubtitle[];
}

function buildSubtitles(videoId: string, baseId: string, koLines: SubtitleLine[], zhLines?: SubtitleLine[]): ShadowingSubtitle[] {
  return koLines.map((line, i) => ({
    id: baseId + '-' + String(i + 1).padStart(3, '0'),
    index: i + 1,
    startMs: Math.round(line.s * 1000),
    endMs: Math.round(line.e * 1000),
    korean: line.t,
    chinese: zhLines?.[i]?.t ?? '',
  }));
}

function msLabel(ms: number): string {
  const s = Math.floor(ms / 1000);
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}

interface TedxConfig {
  id: string;
  videoId: string;
  title: string;
  speaker: string;
  description: string;
  durationSec: number;
  difficulty: string;
  tags: string[];
  hasZh: boolean;
}

const tedxConfigs: TedxConfig[] = [
  {
    id: 'clip-ziont-self-love',
    videoId: 'WvX4hDBkFiE',
    title: '자기비하의 끝에서 배운 나를 사랑하는 법',
    speaker: 'Zion.T (자이언티)',
    description: '뮤지션 자이언티가 들려주는 자기혐오와 자기연민, 그리고 마침내 자신을 사랑하게 된 이야기。适合中高级学习者，语速自然，情感丰富。',
    durationSec: 902,
    difficulty: 'B2',
    tags: ['세바시', 'Zion.T', '자기계발'],
    hasZh: true,
  },
  {
    id: 'clip-sign-language',
    videoId: '7euUE1s6GKo',
    title: '듣는 것에서 보는 언어로',
    speaker: '권동호',
    description: '수어 통역사의 시선으로 본 소리의 세계와 보는 언어의 아름다움。适合初级学习者，语速偏慢，发音清晰。',
    durationSec: 1066,
    difficulty: 'A2',
    tags: ['TEDx', '수어', '소통', '언어'],
    hasZh: false,
  },
  {
    id: 'clip-two-types-people',
    videoId: 'ZlIIScTVNnE',
    title: '우리 회사에 반드시 필요한 두 가지 종류의 사람',
    speaker: '최재웅',
    description: '조직문화와 인재에 대한 실용적인 통찰。标准韩语语速，适合中级学习者练习听力。',
    durationSec: 878,
    difficulty: 'B2',
    tags: ['세바시', '조직문화', '비즈니스'],
    hasZh: false,
  },
  {
    id: 'clip-effortless-language',
    videoId: 'dLYgkDRHx7U',
    title: '들으려 애쓰지 않아도 괜찮은 언어',
    speaker: '권륜희',
    description: '언어의 다양한 형태와 듣지 않아도 소통할 수 있는 방법。语速适中，发音清晰，适合中高级学习者。',
    durationSec: 1242,
    difficulty: 'C1',
    tags: ['TEDx', '언어', '소통'],
    hasZh: false,
  },
  {
    id: 'clip-parent-generation',
    videoId: 'olzROOBonec',
    title: '부모와 기성세대가 꼭 들어야 할 이야기',
    speaker: '이원재',
    description: '카이스트 교수가 전하는 교육과 성장에 관한 메시지。演讲风格沉稳，语速适中。',
    durationSec: 1121,
    difficulty: 'B2',
    tags: ['세바시', '교육', '성장'],
    hasZh: false,
  },
];

function buildClips(): ShadowingClip[] {
  return tedxConfigs.map(cfg => {
    const ko = koSubs[cfg.videoId];
    const zh = cfg.hasZh ? zhSubs[cfg.videoId] : undefined;
    const durMs = cfg.durationSec * 1000;
    return {
      id: cfg.id,
      title: cfg.title,
      speaker: cfg.speaker,
      description: cfg.description,
      sourceType: 'tedx',
      videoUrl: '',
      audioUrl: '/audio/tedx/' + cfg.videoId + '.webm',
      coverUrl: 'https://i.ytimg.com/vi/' + cfg.videoId + '/hqdefault.jpg',
      durationMs: durMs,
      durationLabel: msLabel(durMs),
      difficulty: cfg.difficulty,
      subtitleCount: ko.length,
      tags: cfg.tags,
      timingVerified: true,
      subtitles: buildSubtitles(cfg.videoId, 'sub-' + cfg.videoId.toLowerCase(), ko, zh),
    };
  });
}

export const shadowingClips = buildClips();
