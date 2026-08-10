import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 76 · 3-1 단어 마스터 · 여행 归来·旅行的意义 · ~았/었지만 + 부사 */
export const day76Vocab: VocabSubQuestData = {
  day: 16, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '여행 후기·성장 8 个词', subtitleEn: '여행 후기·성장 8 words',

  encounter: [
    { id: 'd76-v1-e1', korean: '여행',       hangul: 'yeo-haeng',      zh: '旅行', zhEn: 'Travel',        pos: '名词', posEn: 'Noun',   example: { ko: '이번 여행 진짜 좋았어요.',        zh: '这次旅行真好。', zhEn: 'This trip was really nice.' },      tip: 'Day 76 主题词 · 旅(여) + 行(행)', tipEn: 'Day 76 theme words · 旅(여) + 行(행)',                                      tier: 'core' },
    { id: 'd76-v1-e2', korean: '기념품',     hangul: 'gi-nyeom-pum',   zh: '纪念品', zhEn: 'Souvenirs',      pos: '名词', posEn: 'Noun',   example: { ko: '진짜 기념품은 마음속에 있어요.',  zh: '真正的纪念品在心里。', zhEn: 'The real souvenir is in your heart.' }, tip: '纪(기) + 念(념) + 品(품)', tipEn: 'Memory (기) + Think (념) + Item (품)',                                            tier: 'core' },
    { id: 'd76-v1-e3', korean: '진하다',     hangul: 'jin-ha-da',      zh: '浓', zhEn: 'Strong',          pos: '形容词', posEn: 'Adjective.', example: { ko: '짧았지만 진하게 배웠어요.',      zh: '虽短但学得浓。', zhEn: 'Short but learned deeply.' },      tip: '커피·향·경험 都可用 · 반대 = 연하다', tipEn: '커피·향·경험 all work · Opposite = 연하다',                                  tier: 'core' },
    { id: 'd76-v1-e4', korean: '추억',       hangul: 'chu-eok',        zh: '回忆', zhEn: 'Memories',        pos: '名词', posEn: 'Noun',   example: { ko: '좋은 추억이 많아요.',            zh: '有很多美好回忆。', zhEn: 'I have many good memories.' },    tip: '追(추) + 忆(억) · 기억보다 감정적', tipEn: '追(추) + 忆(억) · More emotional than 기억',                                    tier: 'core' },
    { id: 'd76-v1-e5', korean: '정리하다',   hangul: 'jeong-ni-ha-da', zh: '整理', zhEn: 'Organize',        pos: '动词', posEn: 'Verb',   example: { ko: '감정을 정리하고 있어요.',        zh: '在整理心情。', zhEn: 'Sorting out my feelings.' },        tip: '整(정) + 理(리) + 하다 · 이 날은 감정 정리', tipEn: '整(정) + 理(리) + 하다 · This day is about emotional closure',                          tier: 'core' },
    { id: 'd76-v1-e6', korean: '데려오다',   hangul: 'de-ryeo-o-da',   zh: '带回（人）', zhEn: 'Bring back (a person)',  pos: '动词', posEn: 'Verb',   example: { ko: '더 큰 자신을 데려왔어요.',      zh: '带回了更大的自己。', zhEn: 'Brought back a bigger self.' },  tip: '데리다(带) + 오다(来) · 带"人/自己"', tipEn: '데리다(带) + 오다(来) · For "people/oneself"',                                  tier: 'core' },
    { id: 'd76-v1-e7', korean: '성장하다',   hangul: 'seong-jang-ha-da', zh: '成长', zhEn: 'growth',      pos: '动词', posEn: 'Verb',   example: { ko: '많이 성장했어요.',              zh: '成长了很多。', zhEn: 'I\'ve grown a lot.' },        tip: '成(성) + 长(장) + 하다 · "컸다"的书面说法', tipEn: '成(성) + 长(장) + 하다 · The formal way to say "컸다"',                            tier: 'ext' },
    { id: 'd76-v1-e8', korean: '도착하다',   hangul: 'do-cha-ka-da',   zh: '到达', zhEn: 'arrive',        pos: '动词', posEn: 'Verb',   example: { ko: '벌써 서울에 도착했어요.',        zh: '已经到首尔了。', zhEn: 'I\'ve already arrived in Seoul.' },      tip: '到(도) + 着(착) + 하다 · 到站广播常用', tipEn: '到(도) + 着(착) + 하다 · Common in arrival announcements',                                tier: 'ext' },
  ],

  recognize: [
    { id: 'd76-v1-r1', korean: '여행',       hangul: 'yeo-haeng',      choices: [{ zh: '旅行', zhEn: 'Travel',        correct: true }, { zh: '飞行', zhEn: 'Flight',    correct: false }, { zh: '银行', zhEn: 'bank',    correct: false }, { zh: '流行', zhEn: 'Trendy',    correct: false }] },
    { id: 'd76-v1-r2', korean: '기념품',     hangul: 'gi-nyeom-pum',   choices: [{ zh: '纪念品', zhEn: 'Souvenirs',      correct: true }, { zh: '化妆品', zhEn: 'Cosmetics',  correct: false }, { zh: '食品', zhEn: 'food',    correct: false }, { zh: '样品', zhEn: 'sample',    correct: false }] },
    { id: 'd76-v1-r3', korean: '진하다',     hangul: 'jin-ha-da',      choices: [{ zh: '浓', zhEn: 'Strong',          correct: true }, { zh: '淡', zhEn: 'Light',      correct: false }, { zh: '苦', zhEn: 'Bitter',      correct: false }, { zh: '甜', zhEn: 'sweet',      correct: false }] },
    { id: 'd76-v1-r4', korean: '추억',       hangul: 'chu-eok',        choices: [{ zh: '回忆', zhEn: 'Memories',        correct: true }, { zh: '计划', zhEn: 'Plan',    correct: false }, { zh: '约定', zhEn: 'Promise',    correct: false }, { zh: '梦想', zhEn: 'dream',    correct: false }] },
    { id: 'd76-v1-r5', korean: '데려오다',   hangul: 'de-ryeo-o-da',   choices: [{ zh: '带回（人）', zhEn: 'Bring back (a person)',  correct: true }, { zh: '送走', zhEn: 'send off',    correct: false }, { zh: '留下', zhEn: 'leave behind',    correct: false }, { zh: '忘记', zhEn: 'Forget',    correct: false }] },
    { id: 'd76-v1-r6', korean: '성장하다',   hangul: 'seong-jang-ha-da', choices: [{ zh: '成长', zhEn: 'growth',      correct: true }, { zh: '缩小', zhEn: 'shrink',    correct: false }, { zh: '停留', zhEn: 'stay',    correct: false }, { zh: '后退', zhEn: 'step back',    correct: false }] },
  ],

  spell: [
    { id: 'd76-v1-s1', zhHint: '纪念品', zhHintEn: 'Souvenirs',  answer: ['기', '념', '품'], syllables: ['기', '념', '품', '겸', '푼'] },
    { id: 'd76-v1-s2', zhHint: '回忆', zhHintEn: 'Memories',    answer: ['추', '억'], syllables: ['추', '억', '초', '학'] },
    { id: 'd76-v1-s3', zhHint: '旅行', zhHintEn: 'Travel',    answer: ['여', '행'], syllables: ['여', '행', '야', '향'] },
    { id: 'd76-v1-s4', zhHint: '到达', zhHintEn: 'arrive',    answer: ['도', '착'], syllables: ['도', '착', '토', '차'] },
  ],

  write: [
    { id: 'd76-v1-w1', korean: '여', hangul: 'yeo',      wordKorean: '여행',       wordZh: '旅行', wordZhEn: 'Travel' },
    { id: 'd76-v1-w2', korean: '행', hangul: 'haeng',    wordKorean: '여행',       wordZh: '旅行', wordZhEn: 'Travel' },
    { id: 'd76-v1-w3', korean: '기', hangul: 'gi',       wordKorean: '기념품',     wordZh: '纪念品', wordZhEn: 'Souvenirs' },
    { id: 'd76-v1-w4', korean: '념', hangul: 'nyeom',    wordKorean: '기념품',     wordZh: '纪念品', wordZhEn: 'Souvenirs' },
    { id: 'd76-v1-w5', korean: '추', hangul: 'chu',      wordKorean: '추억',       wordZh: '回忆', wordZhEn: 'Memories' },
    { id: 'd76-v1-w6', korean: '진', hangul: 'jin',      wordKorean: '진하다',     wordZh: '浓', wordZhEn: 'Strong' },
    { id: 'd76-v1-w7', korean: '성', hangul: 'seong',    wordKorean: '성장하다',   wordZh: '成长', wordZhEn: 'growth' },
    { id: 'd76-v1-w8', korean: '도', hangul: 'do',       wordKorean: '도착하다',   wordZh: '到达', wordZhEn: 'arrive' },
  ],

  dictation: [
    { id: 'd76-v1-d1', korean: '짧았지만 진하게 배웠어요',        hangul: 'jjal-bat-ji-man jin-ha-ge bae-wo-sseo-yo',   syllables: ['짧', '았', '지', '만', '진', '하', '게', '배', '웠', '어', '요'], zh: '虽短但学得浓', zhEn: 'Short but packed with learning' },
    { id: 'd76-v1-d2', korean: '많이 성장했어요',                 hangul: 'ma-ni seong-jang-hae-sseo-yo',               syllables: ['많', '이', '성', '장', '했', '어', '요'], zh: '成长了很多', zhEn: 'Grew a lot' },
    { id: 'd76-v1-d3', korean: '벌써 서울에 도착했어요',          hangul: 'beol-sseo seo-u-re do-cha-kae-sseo-yo',      syllables: ['벌', '써', '서', '울', '에', '도', '착', '했', '어', '요'], zh: '已经到首尔了', zhEn: 'Already in Seoul' },
  ],
};
