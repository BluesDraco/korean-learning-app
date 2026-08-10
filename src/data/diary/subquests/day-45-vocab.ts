import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 45 · 中级月考 · 词汇子关卡 */
export const day45Vocab: VocabSubQuestData = {
  day: 15, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '考试 & 进步的 8 个词',

  encounter: [
    { id: 'd45-v1-e1', korean: '시험',        hangul: 'si-heom',       zh: '考试',       pos: '名词', example: { ko: '오늘 시험이 있어요.',        zh: '今天有考试。' },       tip: '试(시) + 验(험)',                                              tier: 'core' },
    { id: 'd45-v1-e2', korean: '중간고사',    hangul: 'jung-gan-go-sa', zh: '期中考',     pos: '名词', example: { ko: '중간고사 잘 봤어요.',        zh: '期中考不错。' },       tip: '中间(중간) + 考查(고사) · 기말고사 = 期末考',                    tier: 'core' },
    { id: 'd45-v1-e3', korean: '합격',        hangul: 'hap-gyeok',     zh: '合格 / 及格', pos: '名词', example: { ko: '85점, 합격이에요.',            zh: '85 分，合格。' },     tip: '合(합) + 格(격) · 합격하다 / 불합격 = 不合格',                    tier: 'core' },
    { id: 'd45-v1-e4', korean: '늘다',        hangul: 'neul-da',       zh: '增长 / 进步', pos: '动词', example: { ko: '한국어 실력이 늘었어요.',    zh: '韩语实力进步了。' },   tip: 'ㄹ 词干 · 늘다 → 늘었어요 · 실력이 늘다 固定搭配',                tier: 'core' },
    { id: 'd45-v1-e5', korean: '변화',        hangul: 'byeon-hwa',     zh: '变化',       pos: '名词', example: { ko: '30일 동안 큰 변화가 있었어요.', zh: '30 天里有很大变化。' }, tip: '变(변) + 化(화)',                                              tier: 'core' },
    { id: 'd45-v1-e6', korean: '자신감',      hangul: 'ja-sin-gam',    zh: '自信',       pos: '名词', example: { ko: '자신감이 생겼어요.',          zh: '有了自信。' },         tip: '자신감이 생기다 = 长了自信',                                    tier: 'core' },
    { id: 'd45-v1-e7', korean: '점',          hangul: 'jeom',           zh: '分（分数）', pos: '名词', example: { ko: '85점 받았어요.',              zh: '得了 85 分。' },       tip: '点(점) · 分数量词',                                              tier: 'ext' },
    { id: 'd45-v1-e8', korean: '축하하다',    hangul: 'chu-ka-ha-da',   zh: '祝贺',       pos: '动词', example: { ko: '축하해요.',                    zh: '恭喜。' },             tip: '祝(축) + 贺(하) + 하다 · 生日 / 合格 / 结婚 都能用',              tier: 'ext' },
  ],

  recognize: [
    { id: 'd45-v1-r1', korean: '시험',        hangul: 'si-heom',       choices: [{ zh: '考试',        correct: true }, { zh: '面试',      correct: false }, { zh: '作业',    correct: false }, { zh: '测量',    correct: false }] },
    { id: 'd45-v1-r2', korean: '중간고사',    hangul: 'jung-gan-go-sa', choices: [{ zh: '期中考',      correct: true }, { zh: '期末考',    correct: false }, { zh: '入学考',  correct: false }, { zh: '资格考',  correct: false }] },
    { id: 'd45-v1-r3', korean: '합격',        hangul: 'hap-gyeok',     choices: [{ zh: '合格',        correct: true }, { zh: '不合格',    correct: false }, { zh: '合作',    correct: false }, { zh: '合并',    correct: false }] },
    { id: 'd45-v1-r4', korean: '늘다',        hangul: 'neul-da',       choices: [{ zh: '增长 / 进步', correct: true }, { zh: '减少',      correct: false }, { zh: '开始',    correct: false }, { zh: '结束',    correct: false }] },
    { id: 'd45-v1-r5', korean: '변화',        hangul: 'byeon-hwa',     choices: [{ zh: '变化',        correct: true }, { zh: '结果',      correct: false }, { zh: '过程',    correct: false }, { zh: '习惯',    correct: false }] },
    { id: 'd45-v1-r6', korean: '자신감',      hangul: 'ja-sin-gam',    choices: [{ zh: '自信',        correct: true }, { zh: '骄傲',      correct: false }, { zh: '责任',    correct: false }, { zh: '担心',    correct: false }] },
  ],

  spell: [
    { id: 'd45-v1-s1', zhHint: '考试',        answer: ['시', '험'], syllables: ['시', '험', '시', '헌'] },
    { id: 'd45-v1-s2', zhHint: '合格',        answer: ['합', '격'], syllables: ['합', '격', '핪', '결'] },
    { id: 'd45-v1-s3', zhHint: '变化',        answer: ['변', '화'], syllables: ['변', '화', '변', '하'] },
    { id: 'd45-v1-s4', zhHint: '自信',        answer: ['자', '신'], syllables: ['자', '신', '자', '진'] },
  ],

  write: [
    { id: 'd45-v1-w1', korean: '시', hangul: 'si',         wordKorean: '시험',      wordZh: '考试' },
    { id: 'd45-v1-w2', korean: '험', hangul: 'heom',       wordKorean: '시험',      wordZh: '考试' },
    { id: 'd45-v1-w3', korean: '합', hangul: 'hap',        wordKorean: '합격',      wordZh: '合格' },
    { id: 'd45-v1-w4', korean: '격', hangul: 'gyeok',      wordKorean: '합격',      wordZh: '合格' },
    { id: 'd45-v1-w5', korean: '변', hangul: 'byeon',      wordKorean: '변화',      wordZh: '变化' },
    { id: 'd45-v1-w6', korean: '화', hangul: 'hwa',        wordKorean: '변화',      wordZh: '变化' },
    { id: 'd45-v1-w7', korean: '자', hangul: 'ja',         wordKorean: '자신감',    wordZh: '自信' },
    { id: 'd45-v1-w8', korean: '신', hangul: 'sin',        wordKorean: '자신감',    wordZh: '自信' },
  ],

  dictation: [
    { id: 'd45-v1-d1', korean: '더 잘해요',        hangul: 'deo jal-hae-yo',           syllables: ['더', '잘', '해', '요'],             zh: '更好' },
    { id: 'd45-v1-d2', korean: '많이 늘었어요',     hangul: 'ma-ni neu-reo-sseo-yo',    syllables: ['많', '이', '늘', '었', '어', '요'], zh: '进步了很多' },
    { id: 'd45-v1-d3', korean: '자신감이 생겼어요', hangul: 'ja-sin-ga-mi saeng-gyeo-sseo-yo', syllables: ['자', '신', '감', '이', '생', '겼', '어', '요'], zh: '有了自信' },
  ],
};
