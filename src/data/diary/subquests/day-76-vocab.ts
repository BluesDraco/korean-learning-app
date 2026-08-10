import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 76 · 3-1 단어 마스터 · 여행 归来·旅行的意义 · ~았/었지만 + 부사 */
export const day76Vocab: VocabSubQuestData = {
  day: 16, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '여행 후기·성장 8 个词',

  encounter: [
    { id: 'd76-v1-e1', korean: '여행',       hangul: 'yeo-haeng',      zh: '旅行',        pos: '名词',   example: { ko: '이번 여행 진짜 좋았어요.',        zh: '这次旅行真好。' },      tip: 'Day 76 主题词 · 旅(여) + 行(행)',                                      tier: 'core' },
    { id: 'd76-v1-e2', korean: '기념품',     hangul: 'gi-nyeom-pum',   zh: '纪念品',      pos: '名词',   example: { ko: '진짜 기념품은 마음속에 있어요.',  zh: '真正的纪念品在心里。' }, tip: '纪(기) + 念(념) + 品(품)',                                            tier: 'core' },
    { id: 'd76-v1-e3', korean: '진하다',     hangul: 'jin-ha-da',      zh: '浓',          pos: '形容词', example: { ko: '짧았지만 진하게 배웠어요.',      zh: '虽短但学得浓。' },      tip: '커피·향·경험 都可用 · 반대 = 연하다',                                  tier: 'core' },
    { id: 'd76-v1-e4', korean: '추억',       hangul: 'chu-eok',        zh: '回忆',        pos: '名词',   example: { ko: '좋은 추억이 많아요.',            zh: '有很多美好回忆。' },    tip: '追(추) + 忆(억) · 기억보다 감정적',                                    tier: 'core' },
    { id: 'd76-v1-e5', korean: '정리하다',   hangul: 'jeong-ni-ha-da', zh: '整理',        pos: '动词',   example: { ko: '감정을 정리하고 있어요.',        zh: '在整理心情。' },        tip: '整(정) + 理(리) + 하다 · 이 날은 감정 정리',                          tier: 'core' },
    { id: 'd76-v1-e6', korean: '데려오다',   hangul: 'de-ryeo-o-da',   zh: '带回（人）',  pos: '动词',   example: { ko: '더 큰 자신을 데려왔어요.',      zh: '带回了更大的自己。' },  tip: '데리다(带) + 오다(来) · 带"人/自己"',                                  tier: 'core' },
    { id: 'd76-v1-e7', korean: '성장하다',   hangul: 'seong-jang-ha-da', zh: '成长',      pos: '动词',   example: { ko: '많이 성장했어요.',              zh: '成长了很多。' },        tip: '成(성) + 长(장) + 하다 · "컸다"的书面说法',                            tier: 'ext' },
    { id: 'd76-v1-e8', korean: '도착하다',   hangul: 'do-cha-ka-da',   zh: '到达',        pos: '动词',   example: { ko: '벌써 서울에 도착했어요.',        zh: '已经到首尔了。' },      tip: '到(도) + 着(착) + 하다 · 到站广播常用',                                tier: 'ext' },
  ],

  recognize: [
    { id: 'd76-v1-r1', korean: '여행',       hangul: 'yeo-haeng',      choices: [{ zh: '旅行',        correct: true }, { zh: '飞行',    correct: false }, { zh: '银行',    correct: false }, { zh: '流行',    correct: false }] },
    { id: 'd76-v1-r2', korean: '기념품',     hangul: 'gi-nyeom-pum',   choices: [{ zh: '纪念品',      correct: true }, { zh: '化妆品',  correct: false }, { zh: '食品',    correct: false }, { zh: '样品',    correct: false }] },
    { id: 'd76-v1-r3', korean: '진하다',     hangul: 'jin-ha-da',      choices: [{ zh: '浓',          correct: true }, { zh: '淡',      correct: false }, { zh: '苦',      correct: false }, { zh: '甜',      correct: false }] },
    { id: 'd76-v1-r4', korean: '추억',       hangul: 'chu-eok',        choices: [{ zh: '回忆',        correct: true }, { zh: '计划',    correct: false }, { zh: '约定',    correct: false }, { zh: '梦想',    correct: false }] },
    { id: 'd76-v1-r5', korean: '데려오다',   hangul: 'de-ryeo-o-da',   choices: [{ zh: '带回（人）',  correct: true }, { zh: '送走',    correct: false }, { zh: '留下',    correct: false }, { zh: '忘记',    correct: false }] },
    { id: 'd76-v1-r6', korean: '성장하다',   hangul: 'seong-jang-ha-da', choices: [{ zh: '成长',      correct: true }, { zh: '缩小',    correct: false }, { zh: '停留',    correct: false }, { zh: '后退',    correct: false }] },
  ],

  spell: [
    { id: 'd76-v1-s1', zhHint: '纪念品',  answer: ['기', '념', '품'], syllables: ['기', '념', '품', '겸', '푼'] },
    { id: 'd76-v1-s2', zhHint: '回忆',    answer: ['추', '억'], syllables: ['추', '억', '초', '학'] },
    { id: 'd76-v1-s3', zhHint: '旅行',    answer: ['여', '행'], syllables: ['여', '행', '야', '향'] },
    { id: 'd76-v1-s4', zhHint: '到达',    answer: ['도', '착'], syllables: ['도', '착', '토', '차'] },
  ],

  write: [
    { id: 'd76-v1-w1', korean: '여', hangul: 'yeo',      wordKorean: '여행',       wordZh: '旅行' },
    { id: 'd76-v1-w2', korean: '행', hangul: 'haeng',    wordKorean: '여행',       wordZh: '旅行' },
    { id: 'd76-v1-w3', korean: '기', hangul: 'gi',       wordKorean: '기념품',     wordZh: '纪念品' },
    { id: 'd76-v1-w4', korean: '념', hangul: 'nyeom',    wordKorean: '기념품',     wordZh: '纪念品' },
    { id: 'd76-v1-w5', korean: '추', hangul: 'chu',      wordKorean: '추억',       wordZh: '回忆' },
    { id: 'd76-v1-w6', korean: '진', hangul: 'jin',      wordKorean: '진하다',     wordZh: '浓' },
    { id: 'd76-v1-w7', korean: '성', hangul: 'seong',    wordKorean: '성장하다',   wordZh: '成长' },
    { id: 'd76-v1-w8', korean: '도', hangul: 'do',       wordKorean: '도착하다',   wordZh: '到达' },
  ],

  dictation: [
    { id: 'd76-v1-d1', korean: '짧았지만 진하게 배웠어요',        hangul: 'jjal-bat-ji-man jin-ha-ge bae-wo-sseo-yo',   syllables: ['짧', '았', '지', '만', '진', '하', '게', '배', '웠', '어', '요'], zh: '虽短但学得浓' },
    { id: 'd76-v1-d2', korean: '많이 성장했어요',                 hangul: 'ma-ni seong-jang-hae-sseo-yo',               syllables: ['많', '이', '성', '장', '했', '어', '요'], zh: '成长了很多' },
    { id: 'd76-v1-d3', korean: '벌써 서울에 도착했어요',          hangul: 'beol-sseo seo-u-re do-cha-kae-sseo-yo',      syllables: ['벌', '써', '서', '울', '에', '도', '착', '했', '어', '요'], zh: '已经到首尔了' },
  ],
};
