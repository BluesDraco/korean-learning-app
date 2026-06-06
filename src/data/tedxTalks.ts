export interface TedxTalk {
  id: string;
  title: string;
  speaker: string;
  event: string;
  description: string;
  videoId: string;
  durationSec: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  hasChineseSub: boolean;
  subtitleCount: number;
}

export interface SubtitleLine {
  s: number;
  e: number;
  t: string;
}

const talks: TedxTalk[] = [
  {
    id: 'ziont-self-love',
    title: '자기비하의 끝에서 배운 나를 사랑하는 법',
    speaker: 'Zion.T (자이언티)',
    event: '세바시 1993회',
    description: '뮤지션 자이언티가 들려주는 자기혐오와 자기연민, 그리고 마침내 자신을 사랑하게 된 이야기',
    videoId: 'WvX4hDBkFiE',
    durationSec: 902,
    level: 'intermediate',
    tags: ['세바시', '뮤지션', '자기계발'],
    hasChineseSub: true,
    subtitleCount: 317,
  },
  {
    id: 'sign-language',
    title: '듣는 것에서 보는 언어로',
    speaker: '권동호',
    event: 'TEDxYonseiUniversity',
    description: '수어 통역사의 시선으로 본 소리의 세계와 보는 언어의 아름다움',
    videoId: '7euUE1s6GKo',
    durationSec: 1066,
    level: 'beginner',
    tags: ['TEDx', '수어', '소통', '언어'],
    hasChineseSub: false,
    subtitleCount: 320,
  },
  {
    id: 'two-types-people',
    title: '우리 회사에 반드시 필요한 두 가지 종류의 사람',
    speaker: '최재웅',
    event: '세바시 1767회',
    description: '조직문화와 인재에 대한 실용적인 통찰',
    videoId: 'ZlIIScTVNnE',
    durationSec: 878,
    level: 'intermediate',
    tags: ['세바시', '조직문화', '비즈니스'],
    hasChineseSub: false,
    subtitleCount: 208,
  },
  {
    id: 'effortless-language',
    title: '들으려 애쓰지 않아도 괜찮은 언어',
    speaker: '권륜희',
    event: 'TEDxWabuHS',
    description: '언어의 다양한 형태와 듣지 않아도 소통할 수 있는 방법',
    videoId: 'dLYgkDRHx7U',
    durationSec: 1242,
    level: 'advanced',
    tags: ['TEDx', '언어', '소통', '사회'],
    hasChineseSub: false,
    subtitleCount: 356,
  },
  {
    id: 'parent-generation',
    title: '부모와 기성세대가 꼭 들어야 할 이야기',
    speaker: '이원재',
    event: '세바시 1844회',
    description: '카이스트 교수가 전하는 교육과 성장에 관한 메시지',
    videoId: 'olzROOBonec',
    durationSec: 1121,
    level: 'intermediate',
    tags: ['세바시', '교육', '성장', '가족'],
    hasChineseSub: false,
    subtitleCount: 353,
  },
];

export { talks };
