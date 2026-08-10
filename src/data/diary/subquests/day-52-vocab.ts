import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 52 · 홍와 거리 狂奔 · 词汇子关卡 */
export const day52Vocab: VocabSubQuestData = {
  day: 22, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '狂奔追星的 8 个词', subtitleEn: '8 words for sprinting after your idol',

  encounter: [
    { id: 'd52-v1-e1', korean: '뛰다',        hangul: 'ttwi-da',           zh: '跑 / 跳', zhEn: 'Run / Jump',        pos: '动词', posEn: 'Verb',   example: { ko: '뛰어! 늦겠어!',                     zh: '快跑！要迟到了！', zhEn: 'Run fast! We\'re going to be late!' },     tip: '뛰다 → 뛰어요 · 반말명령 뛰어!',                                tier: 'core' },
    { id: 'd52-v1-e2', korean: '늦다',        hangul: 'neut-da',           zh: '晚 / 迟到', zhEn: 'Late / Arrive late',      pos: '形容词', posEn: 'Adjective.', example: { ko: '늦었어요, 죄송해요.',                zh: '不好意思迟到了。', zhEn: 'Sorry for being late.' },     tip: '늦다 兼形动 · 부사 늦게', tipEn: '늦다: Both adjective and verb · Adverb 늦게',                                       tier: 'core' },
    { id: 'd52-v1-e3', korean: '떨어뜨리다',  hangul: 'tteo-reo-tteu-ri-da', zh: '弄掉', zhEn: 'drop',           pos: '动词', posEn: 'Verb',   example: { ko: '펜을 떨어뜨렸어요.',                 zh: '把笔弄掉了。', zhEn: 'I dropped the pen.' },         tip: '떨어지다(自动·掉) → 떨어뜨리다(他动·弄掉)', tipEn: '떨어지다 (intransitive·fall) → 떨어뜨리다 (transitive·drop)',                     tier: 'core' },
    { id: 'd52-v1-e4', korean: '줍다',        hangul: 'jup-da',            zh: '捡', zhEn: 'pick up',             pos: '动词', posEn: 'Verb',   example: { ko: '펜을 주웠어요.',                     zh: '捡起了笔。', zhEn: 'I picked up the pen.' },           tip: 'ㅂ 不规则 · 줍다 → 주웠어요', tipEn: 'ㅂ irregular · 줍다 → 주웠어요',                                    tier: 'core' },
    { id: 'd52-v1-e5', korean: '숨차다',      hangul: 'sum-cha-da',        zh: '气喘', zhEn: 'out of breath',           pos: '形容词', posEn: 'Adjective.', example: { ko: '숨차서 말을 못 하겠어.',            zh: '喘得说不了话。', zhEn: 'Too out of breath to speak.' },       tip: '숨(气) + 차다(满) = 气喘', tipEn: '숨 (breath) + 차다 (full) = Out of breath',                                     tier: 'core' },
    { id: 'd52-v1-e6', korean: '청춘',        hangul: 'cheong-chun',       zh: '青春', zhEn: 'youth',           pos: '名词', posEn: 'Noun',   example: { ko: '이게 청춘이구나.',                   zh: '原来这就是青春。', zhEn: 'So this is what youth is.' },     tip: '青(청) + 春(춘) · Tori 心里的一句', tipEn: '청 (blue) + 춘 (spring) · A phrase in Tori\'s heart',                              tier: 'core' },
    { id: 'd52-v1-e7', korean: '목도리',      hangul: 'mok-do-ri',         zh: '围巾', zhEn: 'Scarf',           pos: '名词', posEn: 'Noun',   example: { ko: '내 목도리 떨어졌어!',                zh: '我的围巾掉了！', zhEn: 'My scarf fell!' },       tip: '목(脖子) + 도리 · Junho 掉的围巾', tipEn: '목 (neck) + 도리 · The scarf Junho dropped',                              tier: 'ext' },
    { id: 'd52-v1-e8', korean: '거리',        hangul: 'geo-ri',            zh: '街道 / 距离', zhEn: 'Street / Distance',    pos: '名词', posEn: 'Noun',   example: { ko: '홍와 거리를 달렸어요.',              zh: '在弘爪街上跑了。', zhEn: 'Ran on Hongjja Street.' },     tip: '弘爪 거리 = 弘爪街 · 서울 대표 젊음의 거리', tipEn: 'Hongjja 거리 = Hongjja Street · Seoul\'s iconic street of youth',                     tier: 'ext' },
  ],

  recognize: [
    { id: 'd52-v1-r1', korean: '뛰다',        hangul: 'ttwi-da',            choices: [{ zh: '跑', zhEn: 'run',        correct: true }, { zh: '走', zhEn: 'Walk',        correct: false }, { zh: '站', zhEn: 'station',        correct: false }, { zh: '坐', zhEn: 'Sit',        correct: false }] },
    { id: 'd52-v1-r2', korean: '늦다',        hangul: 'neut-da',            choices: [{ zh: '晚 / 迟到', zhEn: 'Late / Arrive late', correct: true }, { zh: '早', zhEn: 'Early',        correct: false }, { zh: '快', zhEn: 'fast',        correct: false }, { zh: '慢', zhEn: 'slow',        correct: false }] },
    { id: 'd52-v1-r3', korean: '떨어뜨리다',  hangul: 'tteo-reo-tteu-ri-da', choices: [{ zh: '弄掉', zhEn: 'drop',      correct: true }, { zh: '捡起', zhEn: 'Pick up',      correct: false }, { zh: '扔', zhEn: 'throw',        correct: false }, { zh: '藏', zhEn: 'hide',        correct: false }] },
    { id: 'd52-v1-r4', korean: '줍다',        hangul: 'jup-da',             choices: [{ zh: '捡', zhEn: 'pick up',        correct: true }, { zh: '给', zhEn: 'To give',        correct: false }, { zh: '收', zhEn: 'Receive',        correct: false }, { zh: '扔', zhEn: 'throw',        correct: false }] },
    { id: 'd52-v1-r5', korean: '숨차다',      hangul: 'sum-cha-da',         choices: [{ zh: '气喘', zhEn: 'out of breath',      correct: true }, { zh: '生气', zhEn: 'Angry',      correct: false }, { zh: '累', zhEn: 'Tired',        correct: false }, { zh: '饿', zhEn: 'hungry',        correct: false }] },
    { id: 'd52-v1-r6', korean: '청춘',        hangul: 'cheong-chun',        choices: [{ zh: '青春', zhEn: 'youth',      correct: true }, { zh: '青年', zhEn: 'Youth',      correct: false }, { zh: '成年', zhEn: 'Adulthood',      correct: false }, { zh: '幼年', zhEn: 'Childhood',      correct: false }] },
  ],

  spell: [
    { id: 'd52-v1-s1', zhHint: '跑（뛰어）', zhHintEn: 'Run (뛰어)',   answer: ['뛰', '어'], syllables: ['뛰', '어', '띠', '어'] },
    { id: 'd52-v1-s2', zhHint: '晚（늦다）', zhHintEn: 'Late (늦다)',   answer: ['늦', '다'], syllables: ['늦', '다', '늘', '다'] },
    { id: 'd52-v1-s3', zhHint: '青春', zhHintEn: 'youth',        answer: ['청', '춘'], syllables: ['청', '춘', '창', '춘'] },
    { id: 'd52-v1-s4', zhHint: '气喘（숨차）', zhHintEn: 'out of breath (숨차)', answer: ['숨', '차'], syllables: ['숨', '차', '숨', '자'] },
  ],

  write: [
    { id: 'd52-v1-w1', korean: '뛰', hangul: 'ttwi',       wordKorean: '뛰다',       wordZh: '跑', wordZhEn: 'run' },
    { id: 'd52-v1-w2', korean: '늦', hangul: 'neut',       wordKorean: '늦다',       wordZh: '迟', wordZhEn: 'late' },
    { id: 'd52-v1-w3', korean: '줍', hangul: 'jup',        wordKorean: '줍다',       wordZh: '捡', wordZhEn: 'pick up' },
    { id: 'd52-v1-w4', korean: '숨', hangul: 'sum',        wordKorean: '숨차다',     wordZh: '气喘', wordZhEn: 'out of breath' },
    { id: 'd52-v1-w5', korean: '차', hangul: 'cha',        wordKorean: '숨차다',     wordZh: '气喘', wordZhEn: 'out of breath' },
    { id: 'd52-v1-w6', korean: '청', hangul: 'cheong',     wordKorean: '청춘',       wordZh: '青春', wordZhEn: 'youth' },
    { id: 'd52-v1-w7', korean: '춘', hangul: 'chun',       wordKorean: '청춘',       wordZh: '青春', wordZhEn: 'youth' },
    { id: 'd52-v1-w8', korean: '목', hangul: 'mok',        wordKorean: '목도리',     wordZh: '围巾', wordZhEn: 'Scarf' },
  ],

  dictation: [
    { id: 'd52-v1-d1', korean: '뛰어! 늦겠어!',       hangul: 'ttwi-eo! neut-ge-sseo!',       syllables: ['뛰', '어', '늦', '겠', '어'],       zh: '快跑！要迟到了！', zhEn: 'Run fast! We\'re going to be late!' },
    { id: 'd52-v1-d2', korean: '숨차서 못 하겠어',    hangul: 'sum-cha-seo mot ha-ge-sseo',   syllables: ['숨', '차', '서', '못', '하', '겠', '어'], zh: '喘得做不了', zhEn: 'too out of breath to do it' },
    { id: 'd52-v1-d3', korean: '이게 청춘이구나',      hangul: 'i-ge cheong-chu-ni-gu-na',     syllables: ['이', '게', '청', '춘', '이', '구', '나'], zh: '原来这就是青春', zhEn: 'So this is youth' },
  ],
};
