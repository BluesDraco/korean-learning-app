import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 58 · 重走第一天的路 · 词汇子关卡 */
export const day58Vocab: VocabSubQuestData = {
  day: 28, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '重走的 8 个词', subtitleEn: '8 words for walking again',

  encounter: [
    { id: 'd58-v1-e1', korean: '다시',      hangul: 'da-si',        zh: '再 / 重新', zhEn: 'again / anew',    pos: '副词', posEn: 'Adverb',   example: { ko: '다시 걸어봤어요.',              zh: '重新走了一遍。', zhEn: 'Walked it all over again.' },     tip: '다시 만나요 = 再见', tipEn: '다시 만나요 = goodbye',                                            tier: 'core' },
    { id: 'd58-v1-e2', korean: '느낌',      hangul: 'neu-kkim',     zh: '感觉', zhEn: 'feeling',          pos: '名词', posEn: 'Noun',   example: { ko: '같은 길인데 다른 느낌이에요.',  zh: '同一条路，不同的感觉。', zhEn: 'Same road, different feeling.' }, tip: '느끼다 → 느낌 名词化', tipEn: '느끼다 → 느낌 Nominalization',                                          tier: 'core' },
    { id: 'd58-v1-e3', korean: '넘어지다',  hangul: 'neo-meo-ji-da', zh: '摔倒', zhEn: 'to fall down',          pos: '动词', posEn: 'Verb',   example: { ko: '넘어져도 돼.',                  zh: '摔倒也没关系。', zhEn: 'It\'s okay to fall.' },     tip: '넘어지다 → 넘어져요 · 成长的隐喻', tipEn: '넘어지다 → 넘어져요 · Metaphor for growth',                              tier: 'core' },
    { id: 'd58-v1-e4', korean: '감사',      hangul: 'gam-sa',       zh: '感谢 / 感恩', zhEn: 'Gratitude / Thankfulness',   pos: '名词', posEn: 'Noun',   example: { ko: '감사한 마음이 들었어요.',      zh: '心里有感恩的心情。', zhEn: 'I feel grateful in my heart.' }, tip: '感(감) + 谢(사) · 감사하다', tipEn: 'feeling (감) + thanks (사) · 감사하다',                                    tier: 'core' },
    { id: 'd58-v1-e5', korean: '도착하다',  hangul: 'do-cha-ka-da', zh: '到达', zhEn: 'arrive',          pos: '动词', posEn: 'Verb',   example: { ko: '걷다 보면 도착해요.',            zh: '走着走着就到了。', zhEn: 'I arrived just by walking.' },   tip: '到(도) + 着(착) + 하다', tipEn: 'arrive (도) + at (착) + 하다',                                        tier: 'core' },
    { id: 'd58-v1-e6', korean: '두렵다',    hangul: 'du-ryeop-da',  zh: '害怕', zhEn: 'be scared',          pos: '形容词', posEn: 'Adjective.', example: { ko: 'Day 1에는 다 두려웠어요.',      zh: 'Day 1 时什么都害怕。', zhEn: 'On Day 1, I was scared of everything.' }, tip: 'ㅂ 不规则 · 두려워요', tipEn: 'ㅂ irregular · 두려워요',                                          tier: 'core' },
    { id: 'd58-v1-e7', korean: '기억하다',  hangul: 'gi-eok-a-da',  zh: '记住 / 回忆', zhEn: 'Remember / Recall',    pos: '动词', posEn: 'Verb',   example: { ko: '기억하러 왔어요.',                zh: '来回忆的。', zhEn: 'I came to reminisce.' },         tip: 'Day 47 复习', tipEn: 'Day 47 Review',                                                    tier: 'ext' },
    { id: 'd58-v1-e8', korean: '길',        hangul: 'gil',          zh: '路', zhEn: 'Road',            pos: '名词', posEn: 'Noun',   example: { ko: '같은 길인데 다른 느낌.',         zh: '同一条路不同的感觉。', zhEn: 'The same road, different feelings.' }, tip: '길 = 路 · 인생 길 = 人生之路', tipEn: '길 = Road · 인생 길 = The road of life',                                  tier: 'ext' },
  ],

  recognize: [
    { id: 'd58-v1-r1', korean: '다시',      hangul: 'da-si',        choices: [{ zh: '再', zhEn: 'Again',          correct: true }, { zh: '第一次', zhEn: 'First time',    correct: false }, { zh: '最后', zhEn: 'last',      correct: false }, { zh: '总是', zhEn: 'Always',      correct: false }] },
    { id: 'd58-v1-r2', korean: '느낌',      hangul: 'neu-kkim',     choices: [{ zh: '感觉', zhEn: 'feeling',        correct: true }, { zh: '味道', zhEn: 'taste',      correct: false }, { zh: '样子', zhEn: 'Appearance',      correct: false }, { zh: '气味', zhEn: 'Smell',      correct: false }] },
    { id: 'd58-v1-r3', korean: '넘어지다',  hangul: 'neo-meo-ji-da', choices: [{ zh: '摔倒', zhEn: 'to fall down',        correct: true }, { zh: '站起', zhEn: 'Stand up',      correct: false }, { zh: '跳', zhEn: 'Jump',        correct: false }, { zh: '走', zhEn: 'Walk',        correct: false }] },
    { id: 'd58-v1-r4', korean: '감사',      hangul: 'gam-sa',       choices: [{ zh: '感谢', zhEn: 'Thanks',        correct: true }, { zh: '感冒', zhEn: 'cold',      correct: false }, { zh: '感觉', zhEn: 'feeling',      correct: false }, { zh: '感情', zhEn: 'feelings',      correct: false }] },
    { id: 'd58-v1-r5', korean: '도착하다',  hangul: 'do-cha-ka-da', choices: [{ zh: '到达', zhEn: 'arrive',        correct: true }, { zh: '出发', zhEn: 'Departure',      correct: false }, { zh: '经过', zhEn: 'Pass by',      correct: false }, { zh: '回来', zhEn: 'Come back',      correct: false }] },
    { id: 'd58-v1-r6', korean: '두렵다',    hangul: 'du-ryeop-da',  choices: [{ zh: '害怕', zhEn: 'be scared',        correct: true }, { zh: '喜欢', zhEn: 'like',      correct: false }, { zh: '生气', zhEn: 'Angry',      correct: false }, { zh: '骄傲', zhEn: 'pride',      correct: false }] },
  ],

  spell: [
    { id: 'd58-v1-s1', zhHint: '再', zhHintEn: 'Again',        answer: ['다', '시'], syllables: ['다', '시', '더', '시'] },
    { id: 'd58-v1-s2', zhHint: '感觉', zhHintEn: 'feeling',      answer: ['느', '낌'], syllables: ['느', '낌', '느', '김'] },
    { id: 'd58-v1-s3', zhHint: '到达', zhHintEn: 'arrive',      answer: ['도', '착'], syllables: ['도', '착', '도', '찬'] },
    { id: 'd58-v1-s4', zhHint: '路', zhHintEn: 'Road',        answer: ['길'],       syllables: ['길', '길', '갈', '골'] },
  ],

  write: [
    { id: 'd58-v1-w1', korean: '다', hangul: 'da',         wordKorean: '다시',       wordZh: '再', wordZhEn: 'Again' },
    { id: 'd58-v1-w2', korean: '시', hangul: 'si',         wordKorean: '다시',       wordZh: '再', wordZhEn: 'Again' },
    { id: 'd58-v1-w3', korean: '느', hangul: 'neu',        wordKorean: '느낌',       wordZh: '感觉', wordZhEn: 'feeling' },
    { id: 'd58-v1-w4', korean: '낌', hangul: 'kkim',       wordKorean: '느낌',       wordZh: '感觉', wordZhEn: 'feeling' },
    { id: 'd58-v1-w5', korean: '감', hangul: 'gam',        wordKorean: '감사',       wordZh: '感谢', wordZhEn: 'Thanks' },
    { id: 'd58-v1-w6', korean: '사', hangul: 'sa',         wordKorean: '감사',       wordZh: '感谢', wordZhEn: 'Thanks' },
    { id: 'd58-v1-w7', korean: '도', hangul: 'do',         wordKorean: '도착하다',   wordZh: '到达', wordZhEn: 'arrive' },
    { id: 'd58-v1-w8', korean: '길', hangul: 'gil',        wordKorean: '길',         wordZh: '路', wordZhEn: 'Road' },
  ],

  dictation: [
    { id: 'd58-v1-d1', korean: '걸어보니까 알겠어요',        hangul: 'geo-reo-bo-ni-kka al-ge-sseo-yo',       syllables: ['걸', '어', '보', '니', '까', '알', '겠', '어', '요'], zh: '走了才明白', zhEn: 'You only understand after walking away' },
    { id: 'd58-v1-d2', korean: '같은 길인데 다른 느낌',        hangul: 'ga-teun gi-rin-de da-reun neu-kkim',     syllables: ['같', '은', '길', '인', '데', '다', '른', '느', '낌'], zh: '同路不同感觉', zhEn: 'Same road, different feelings' },
    { id: 'd58-v1-d3', korean: '기억하러 왔어요',             hangul: 'gi-eok-a-reo wa-sseo-yo',                syllables: ['기', '억', '하', '러', '왔', '어', '요'],             zh: '来回忆的', zhEn: 'For reminiscing' },
  ],
};
