import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 54 · 讨价还价 · 词汇子关卡 */
export const day54Vocab: VocabSubQuestData = {
  day: 24, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '砍价市场的 8 个词', subtitleEn: '8 words for the bargaining market',

  encounter: [
    { id: 'd54-v1-e1', korean: '시장',      hangul: 'si-jang',       zh: '市场', zhEn: 'market',          pos: '名词', posEn: 'Noun',   example: { ko: '동물문 시장에 갔어요.',       zh: '去了 동물문 市场。', zhEn: 'Went to Dongmulmun Market.' },  tip: '市(시) + 场(장) · 재래시장 = 传统市场', tipEn: 'Market (시) + field (장) · 재래시장 = traditional market',                          tier: 'core' },
    { id: 'd54-v1-e2', korean: '깎다',      hangul: 'kkak-da',       zh: '砍价 / 削', zhEn: 'Bargain / cut down',     pos: '动词', posEn: 'Verb',   example: { ko: '조금 깎아주세요.',             zh: '便宜一点。', zhEn: 'Can you make it cheaper?' },          tip: '发음 [깍따] · 깎아 주다 = 讲价', tipEn: 'Pronunciation [깍따] · 깎아 주다 = bargain',                                 tier: 'core' },
    { id: 'd54-v1-e3', korean: '가격',      hangul: 'ga-gyeok',      zh: '价格', zhEn: 'price',          pos: '名词', posEn: 'Noun',   example: { ko: '가격이 싸요.',                zh: '价格便宜。', zhEn: 'The price is cheap.' },          tip: '价(가) + 格(격) · 정찰가 = 定价', tipEn: 'Price (가) + grade (격) · 정찰가 = fixed price',                                tier: 'core' },
    { id: 'd54-v1-e4', korean: '싸다',      hangul: 'ssa-da',        zh: '便宜', zhEn: 'cheap',          pos: '形容词', posEn: 'Adjective.', example: { ko: '이거 진짜 싸요!',              zh: '这个真便宜！', zhEn: 'This is really cheap!' },        tip: '反义 비싸다 = 贵', tipEn: 'Antonym 비싸다 = expensive',                                              tier: 'core' },
    { id: 'd54-v1-e5', korean: '현금',      hangul: 'hyeon-geum',    zh: '现金', zhEn: 'cash',          pos: '名词', posEn: 'Noun',   example: { ko: '현금으로 낼게요.',             zh: '给现金。', zhEn: 'Pay in cash.' },            tip: '现(현) + 金(금) · 시장 现金常用', tipEn: 'Cash (현) + money (금) · cash is common at the market',                                tier: 'core' },
    { id: 'd54-v1-e6', korean: '봐주다',    hangul: 'bwa-ju-da',     zh: '照顾 / 通融', zhEn: 'Look after / cut some slack',   pos: '动词', posEn: 'Verb',   example: { ko: '진짜 좀만 봐주세요.',           zh: '真的照顾一下。', zhEn: 'Give me a real deal.' },      tip: '~아/어 주다 引申义 · 讨价场景常用', tipEn: '~아/어 주다 extended meaning · common in bargaining',                              tier: 'core' },
    { id: 'd54-v1-e7', korean: '조금만',    hangul: 'jo-geum-man',   zh: '一点点 (软化)', zhEn: 'A little bit (softening)', pos: '副词', posEn: 'Adverb',   example: { ko: '조금만 깎아주세요.',           zh: '便宜一点吧。', zhEn: 'Please make it a bit cheaper.' },        tip: '조금 + 만 · 讨价语气软化必备', tipEn: '조금 + 만 · essential for softening bargaining tone',                                  tier: 'ext' },
    { id: 'd54-v1-e8', korean: '재킷',      hangul: 'jae-kit',       zh: '外套', zhEn: 'Coat',          pos: '名词', posEn: 'Noun',   example: { ko: '이 재킷 얼마예요?',              zh: '这件外套多少钱？', zhEn: 'How much is this coat?' },    tip: 'jacket 外来语（标准写法 재킷）', tipEn: 'jacket loanword (standard form 재킷)',                                                  tier: 'ext' },
  ],

  recognize: [
    { id: 'd54-v1-r1', korean: '시장',   hangul: 'si-jang',    choices: [{ zh: '市场', zhEn: 'market',      correct: true }, { zh: '商场', zhEn: 'Department store',      correct: false }, { zh: '广场', zhEn: 'plaza',        correct: false }, { zh: '会场', zhEn: 'Venue',        correct: false }] },
    { id: 'd54-v1-r2', korean: '깎다',   hangul: 'kkak-da',    choices: [{ zh: '砍价', zhEn: 'Haggling',      correct: true }, { zh: '增价', zhEn: 'price increase',      correct: false }, { zh: '定价', zhEn: 'pricing',        correct: false }, { zh: '看价', zhEn: 'checking the price',        correct: false }] },
    { id: 'd54-v1-r3', korean: '가격',   hangul: 'ga-gyeok',   choices: [{ zh: '价格', zhEn: 'price',      correct: true }, { zh: '数量', zhEn: 'quantity',      correct: false }, { zh: '质量', zhEn: 'quality',        correct: false }, { zh: '产地', zhEn: 'origin',        correct: false }] },
    { id: 'd54-v1-r4', korean: '싸다',   hangul: 'ssa-da',     choices: [{ zh: '便宜', zhEn: 'cheap',      correct: true }, { zh: '贵', zhEn: 'Expensive',        correct: false }, { zh: '包装', zhEn: 'packaging',        correct: false }, { zh: '搭配', zhEn: 'matching',        correct: false }] },
    { id: 'd54-v1-r5', korean: '현금',   hangul: 'hyeon-geum', choices: [{ zh: '现金', zhEn: 'cash',      correct: true }, { zh: '存款', zhEn: 'deposit',      correct: false }, { zh: '账单', zhEn: 'bill',        correct: false }, { zh: '税款', zhEn: 'tax',        correct: false }] },
    { id: 'd54-v1-r6', korean: '봐주다', hangul: 'bwa-ju-da',  choices: [{ zh: '照顾 / 通融', zhEn: 'Look after / cut some slack', correct: true }, { zh: '看着', zhEn: 'watching',      correct: false }, { zh: '试穿', zhEn: 'trying on',        correct: false }, { zh: '监督', zhEn: 'Supervise',        correct: false }] },
  ],

  spell: [
    { id: 'd54-v1-s1', zhHint: '市场', zhHintEn: 'market',      answer: ['시', '장'], syllables: ['시', '장', '신', '장'] },
    { id: 'd54-v1-s2', zhHint: '价格', zhHintEn: 'price',      answer: ['가', '격'], syllables: ['가', '격', '가', '경'] },
    { id: 'd54-v1-s3', zhHint: '便宜（싸다）', zhHintEn: 'cheap (싸다)', answer: ['싸', '다'], syllables: ['싸', '다', '싸', '아'] },
    { id: 'd54-v1-s4', zhHint: '现金', zhHintEn: 'cash',      answer: ['현', '금'], syllables: ['현', '금', '연', '금'] },
  ],

  write: [
    { id: 'd54-v1-w1', korean: '시', hangul: 'si',         wordKorean: '시장',       wordZh: '市场', wordZhEn: 'market' },
    { id: 'd54-v1-w2', korean: '장', hangul: 'jang',       wordKorean: '시장',       wordZh: '市场', wordZhEn: 'market' },
    { id: 'd54-v1-w3', korean: '깎', hangul: 'kkak',       wordKorean: '깎다',       wordZh: '砍价', wordZhEn: 'Haggling' },
    { id: 'd54-v1-w4', korean: '가', hangul: 'ga',         wordKorean: '가격',       wordZh: '价格', wordZhEn: 'price' },
    { id: 'd54-v1-w5', korean: '격', hangul: 'gyeok',      wordKorean: '가격',       wordZh: '价格', wordZhEn: 'price' },
    { id: 'd54-v1-w6', korean: '싸', hangul: 'ssa',        wordKorean: '싸다',       wordZh: '便宜', wordZhEn: 'cheap' },
    { id: 'd54-v1-w7', korean: '현', hangul: 'hyeon',      wordKorean: '현금',       wordZh: '现金', wordZhEn: 'cash' },
    { id: 'd54-v1-w8', korean: '금', hangul: 'geum',       wordKorean: '현금',       wordZh: '现金', wordZhEn: 'cash' },
  ],

  dictation: [
    { id: 'd54-v1-d1', korean: '조금만 깎아주세요',        hangul: 'jo-geum-man kka-kka-ju-se-yo',    syllables: ['조', '금', '만', '깎', '아', '주', '세', '요'], zh: '便宜一点', zhEn: 'a bit cheaper' },
    { id: 'd54-v1-d2', korean: '진짜 좀만 봐주세요',       hangul: 'jin-jja jom-man bwa-ju-se-yo',    syllables: ['진', '짜', '좀', '만', '봐', '주', '세', '요'], zh: '真的照顾一下', zhEn: 'really take care of it' },
    { id: 'd54-v1-d3', korean: '현금으로 낼게요',           hangul: 'hyeon-geu-meu-ro nael-ge-yo',     syllables: ['현', '금', '으', '로', '낼', '게', '요'],       zh: '给现金', zhEn: 'paying in cash' },
  ],
};
