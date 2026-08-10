import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 58 · 重走第一天的路 · 词汇子关卡 */
export const day58Vocab: VocabSubQuestData = {
  day: 28, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '重走的 8 个词',

  encounter: [
    { id: 'd58-v1-e1', korean: '다시',      hangul: 'da-si',        zh: '再 / 重新',    pos: '副词',   example: { ko: '다시 걸어봤어요.',              zh: '重新走了一遍。' },     tip: '다시 만나요 = 再见',                                            tier: 'core' },
    { id: 'd58-v1-e2', korean: '느낌',      hangul: 'neu-kkim',     zh: '感觉',          pos: '名词',   example: { ko: '같은 길인데 다른 느낌이에요.',  zh: '同一条路，不同的感觉。' }, tip: '느끼다 → 느낌 名词化',                                          tier: 'core' },
    { id: 'd58-v1-e3', korean: '넘어지다',  hangul: 'neo-meo-ji-da', zh: '摔倒',          pos: '动词',   example: { ko: '넘어져도 돼.',                  zh: '摔倒也没关系。' },     tip: '넘어지다 → 넘어져요 · 成长的隐喻',                              tier: 'core' },
    { id: 'd58-v1-e4', korean: '감사',      hangul: 'gam-sa',       zh: '感谢 / 感恩',   pos: '名词',   example: { ko: '감사한 마음이 들었어요.',      zh: '心里有感恩的心情。' }, tip: '感(감) + 谢(사) · 감사하다',                                    tier: 'core' },
    { id: 'd58-v1-e5', korean: '도착하다',  hangul: 'do-cha-ka-da', zh: '到达',          pos: '动词',   example: { ko: '걷다 보면 도착해요.',            zh: '走着走着就到了。' },   tip: '到(도) + 着(착) + 하다',                                        tier: 'core' },
    { id: 'd58-v1-e6', korean: '두렵다',    hangul: 'du-ryeop-da',  zh: '害怕',          pos: '形容词', example: { ko: 'Day 1에는 다 두려웠어요.',      zh: 'Day 1 时什么都害怕。' }, tip: 'ㅂ 不规则 · 두려워요',                                          tier: 'core' },
    { id: 'd58-v1-e7', korean: '기억하다',  hangul: 'gi-eok-a-da',  zh: '记住 / 回忆',    pos: '动词',   example: { ko: '기억하러 왔어요.',                zh: '来回忆的。' },         tip: 'Day 47 复习',                                                    tier: 'ext' },
    { id: 'd58-v1-e8', korean: '길',        hangul: 'gil',          zh: '路',            pos: '名词',   example: { ko: '같은 길인데 다른 느낌.',         zh: '同一条路不同的感觉。' }, tip: '길 = 路 · 인생 길 = 人生之路',                                  tier: 'ext' },
  ],

  recognize: [
    { id: 'd58-v1-r1', korean: '다시',      hangul: 'da-si',        choices: [{ zh: '再',          correct: true }, { zh: '第一次',    correct: false }, { zh: '最后',      correct: false }, { zh: '总是',      correct: false }] },
    { id: 'd58-v1-r2', korean: '느낌',      hangul: 'neu-kkim',     choices: [{ zh: '感觉',        correct: true }, { zh: '味道',      correct: false }, { zh: '样子',      correct: false }, { zh: '气味',      correct: false }] },
    { id: 'd58-v1-r3', korean: '넘어지다',  hangul: 'neo-meo-ji-da', choices: [{ zh: '摔倒',        correct: true }, { zh: '站起',      correct: false }, { zh: '跳',        correct: false }, { zh: '走',        correct: false }] },
    { id: 'd58-v1-r4', korean: '감사',      hangul: 'gam-sa',       choices: [{ zh: '感谢',        correct: true }, { zh: '感冒',      correct: false }, { zh: '感觉',      correct: false }, { zh: '感情',      correct: false }] },
    { id: 'd58-v1-r5', korean: '도착하다',  hangul: 'do-cha-ka-da', choices: [{ zh: '到达',        correct: true }, { zh: '出发',      correct: false }, { zh: '经过',      correct: false }, { zh: '回来',      correct: false }] },
    { id: 'd58-v1-r6', korean: '두렵다',    hangul: 'du-ryeop-da',  choices: [{ zh: '害怕',        correct: true }, { zh: '喜欢',      correct: false }, { zh: '生气',      correct: false }, { zh: '骄傲',      correct: false }] },
  ],

  spell: [
    { id: 'd58-v1-s1', zhHint: '再',        answer: ['다', '시'], syllables: ['다', '시', '더', '시'] },
    { id: 'd58-v1-s2', zhHint: '感觉',      answer: ['느', '낌'], syllables: ['느', '낌', '느', '김'] },
    { id: 'd58-v1-s3', zhHint: '到达',      answer: ['도', '착'], syllables: ['도', '착', '도', '찬'] },
    { id: 'd58-v1-s4', zhHint: '路',        answer: ['길'],       syllables: ['길', '길', '갈', '골'] },
  ],

  write: [
    { id: 'd58-v1-w1', korean: '다', hangul: 'da',         wordKorean: '다시',       wordZh: '再' },
    { id: 'd58-v1-w2', korean: '시', hangul: 'si',         wordKorean: '다시',       wordZh: '再' },
    { id: 'd58-v1-w3', korean: '느', hangul: 'neu',        wordKorean: '느낌',       wordZh: '感觉' },
    { id: 'd58-v1-w4', korean: '낌', hangul: 'kkim',       wordKorean: '느낌',       wordZh: '感觉' },
    { id: 'd58-v1-w5', korean: '감', hangul: 'gam',        wordKorean: '감사',       wordZh: '感谢' },
    { id: 'd58-v1-w6', korean: '사', hangul: 'sa',         wordKorean: '감사',       wordZh: '感谢' },
    { id: 'd58-v1-w7', korean: '도', hangul: 'do',         wordKorean: '도착하다',   wordZh: '到达' },
    { id: 'd58-v1-w8', korean: '길', hangul: 'gil',        wordKorean: '길',         wordZh: '路' },
  ],

  dictation: [
    { id: 'd58-v1-d1', korean: '걸어보니까 알겠어요',        hangul: 'geo-reo-bo-ni-kka al-ge-sseo-yo',       syllables: ['걸', '어', '보', '니', '까', '알', '겠', '어', '요'], zh: '走了才明白' },
    { id: 'd58-v1-d2', korean: '같은 길인데 다른 느낌',        hangul: 'ga-teun gi-rin-de da-reun neu-kkim',     syllables: ['같', '은', '길', '인', '데', '다', '른', '느', '낌'], zh: '同路不同感觉' },
    { id: 'd58-v1-d3', korean: '기억하러 왔어요',             hangul: 'gi-eok-a-reo wa-sseo-yo',                syllables: ['기', '억', '하', '러', '왔', '어', '요'],             zh: '来回忆的' },
  ],
};
