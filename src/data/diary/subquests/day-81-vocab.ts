import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 81 · 3-1 단어 마스터 · Minji와 싸움·冷战三天 · ~(이)면 */
export const day81Vocab: VocabSubQuestData = {
  day: 21, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '갈등·화해 8 个词', subtitleEn: '8 words for conflict & reconciliation',

  encounter: [
    { id: 'd81-v1-e1', korean: '싸움',       hangul: 'ssa-um',         zh: '争吵', zhEn: 'argue',        pos: '名词', posEn: 'Noun',   example: { ko: '민지랑 싸움이 났어요.',          zh: '和 Minji 吵架了。', zhEn: 'Had a fight with Minji.' },  tip: 'Day 81 主题词 · 싸우다(动) → 싸움(名) · 싸움이 나다 = 吵起来', tipEn: 'Day 81 keywords · 싸우다 (verb) → 싸움 (noun) · 싸움이 나다 = to start arguing',          tier: 'core' },
    { id: 'd81-v1-e2', korean: '냉전',       hangul: 'naeng-jeon',     zh: '冷战', zhEn: 'cold war',        pos: '名词', posEn: 'Noun',   example: { ko: '삼 일째 냉전이에요.',            zh: '第3天冷战。', zhEn: 'Day 3 of the cold war.' },        tip: '冷(냉) + 战(전)', tipEn: '냉 + 전 (cold war)',                                                      tier: 'core' },
    { id: 'd81-v1-e3', korean: '오해',       hangul: 'o-hae',          zh: '误会', zhEn: 'misunderstanding',        pos: '名词', posEn: 'Noun',   example: { ko: '작은 오해에서 시작됐어요.',      zh: '从小误会开始的。', zhEn: 'It started with a misunderstanding from childhood.' },    tip: '误(오) + 解(해) · 오해하다 = 误会', tipEn: 'mis (오) + understand (해) · 오해하다 = to misunderstand',                                    tier: 'core' },
    { id: 'd81-v1-e4', korean: '어색하다',   hangul: 'eo-sae-ka-da',   zh: '尴尬', zhEn: 'awkward',        pos: '形容词', posEn: 'Adjective.', example: { ko: '반 분위기가 어색해요.',          zh: '班上气氛尴尬。', zhEn: 'The atmosphere in class is awkward.' },      tip: '어색해요 · 자연스럽다의 반대',                                        tier: 'core' },
    { id: 'd81-v1-e5', korean: '자존심',     hangul: 'ja-jon-sim',     zh: '自尊心', zhEn: 'self-esteem',      pos: '名词', posEn: 'Noun',   example: { ko: '자존심보다 우정이 커요.',        zh: '友情比自尊大。', zhEn: 'Friendship is bigger than pride.' },      tip: '自(자) + 尊(존) + 心(심)', tipEn: '자 + 존 + 심 (self-esteem)',                                            tier: 'core' },
    { id: 'd81-v1-e6', korean: '우정',       hangul: 'u-jeong',        zh: '友情', zhEn: 'Friendship',        pos: '名词', posEn: 'Noun',   example: { ko: '우정이 자존심보다 중요해요.',    zh: '友情比自尊重要。', zhEn: 'Friendship matters more than pride.' },    tip: '友(우) + 情(정)', tipEn: '友 (woo) + 情 (jeong)',                                                      tier: 'core' },
    { id: 'd81-v1-e7', korean: '침묵',       hangul: 'chim-muk',       zh: '沉默', zhEn: 'Silence',        pos: '名词', posEn: 'Noun',   example: { ko: '삼 일의 침묵을 깼어요.',        zh: '打破了3天的沉默。', zhEn: 'Broke 3 days of silence.' },  tip: 'Day 60 学过 · 沉(침) + 默(묵) · 침묵을 깨다 = 打破沉默', tipEn: 'Learned on Day 60 · silence (침) + break (묵) · 침묵을 깨다 = to break the silence',              tier: 'ext' },
    { id: 'd81-v1-e8', korean: '화해하다',   hangul: 'hwa-hae-ha-da',  zh: '和好', zhEn: 'to make up',        pos: '动词', posEn: 'Verb',   example: { ko: '먼저 화해하고 싶어요.',          zh: '想先和好。', zhEn: 'Want to make up first.' },          tip: 'Day 49 学过 · 和(화) + 解(해) + 하다', tipEn: 'Learned on Day 49 · harmony (화) + resolve (해) + 하다',                                tier: 'ext' },
  ],

  recognize: [
    { id: 'd81-v1-r1', korean: '싸움',       hangul: 'ssa-um',         choices: [{ zh: '争吵', zhEn: 'argue',        correct: true }, { zh: '和好', zhEn: 'to make up',    correct: false }, { zh: '游戏', zhEn: 'Game',    correct: false }, { zh: '约定', zhEn: 'Promise',    correct: false }] },
    { id: 'd81-v1-r2', korean: '냉전',       hangul: 'naeng-jeon',     choices: [{ zh: '冷战', zhEn: 'cold war',        correct: true }, { zh: '热闹', zhEn: 'lively',    correct: false }, { zh: '战争', zhEn: 'war',    correct: false }, { zh: '和平', zhEn: 'peace',    correct: false }] },
    { id: 'd81-v1-r3', korean: '오해',       hangul: 'o-hae',          choices: [{ zh: '误会', zhEn: 'misunderstanding',        correct: true }, { zh: '理解', zhEn: 'understand',    correct: false }, { zh: '道歉', zhEn: 'to apologize',    correct: false }, { zh: '解释', zhEn: 'explanation',    correct: false }] },
    { id: 'd81-v1-r4', korean: '어색하다',   hangul: 'eo-sae-ka-da',   choices: [{ zh: '尴尬', zhEn: 'awkward',        correct: true }, { zh: '自然', zhEn: 'natural',    correct: false }, { zh: '热闹', zhEn: 'lively',    correct: false }, { zh: '温柔', zhEn: 'gentle',    correct: false }] },
    { id: 'd81-v1-r5', korean: '자존심',     hangul: 'ja-jon-sim',     choices: [{ zh: '自尊心', zhEn: 'self-esteem',      correct: true }, { zh: '好奇心', zhEn: 'curiosity',  correct: false }, { zh: '责任心', zhEn: 'responsibility',  correct: false }, { zh: '同情心', zhEn: 'compassion',  correct: false }] },
    { id: 'd81-v1-r6', korean: '우정',       hangul: 'u-jeong',        choices: [{ zh: '友情', zhEn: 'Friendship',        correct: true }, { zh: '爱情', zhEn: 'love',    correct: false }, { zh: '亲情', zhEn: 'family affection',    correct: false }, { zh: '感情', zhEn: 'feelings',    correct: false }] },
  ],

  spell: [
    { id: 'd81-v1-s1', zhHint: '误会', zhHintEn: 'misunderstanding',    answer: ['오', '해'], syllables: ['오', '해', '어', '회'] },
    { id: 'd81-v1-s2', zhHint: '冷战', zhHintEn: 'cold war',    answer: ['냉', '전'], syllables: ['냉', '전', '냄', '정'] },
    { id: 'd81-v1-s3', zhHint: '自尊心', zhHintEn: 'self-esteem',  answer: ['자', '존', '심'], syllables: ['자', '존', '심', '잔', '손'] },
    { id: 'd81-v1-s4', zhHint: '友情', zhHintEn: 'Friendship',    answer: ['우', '정'], syllables: ['우', '정', '유', '점'] },
  ],

  write: [
    { id: 'd81-v1-w1', korean: '오', hangul: 'o',        wordKorean: '오해',       wordZh: '误会', wordZhEn: 'misunderstanding' },
    { id: 'd81-v1-w2', korean: '해', hangul: 'hae',      wordKorean: '오해',       wordZh: '误会', wordZhEn: 'misunderstanding' },
    { id: 'd81-v1-w3', korean: '냉', hangul: 'naeng',    wordKorean: '냉전',       wordZh: '冷战', wordZhEn: 'cold war' },
    { id: 'd81-v1-w4', korean: '전', hangul: 'jeon',     wordKorean: '냉전',       wordZh: '冷战', wordZhEn: 'cold war' },
    { id: 'd81-v1-w5', korean: '자', hangul: 'ja',       wordKorean: '자존심',     wordZh: '自尊心', wordZhEn: 'self-esteem' },
    { id: 'd81-v1-w6', korean: '우', hangul: 'u',        wordKorean: '우정',       wordZh: '友情', wordZhEn: 'Friendship' },
    { id: 'd81-v1-w7', korean: '침', hangul: 'chim',     wordKorean: '침묵',       wordZh: '沉默', wordZhEn: 'Silence' },
    { id: 'd81-v1-w8', korean: '싸', hangul: 'ssa',      wordKorean: '싸움',       wordZh: '争吵', wordZhEn: 'argue' },
  ],

  dictation: [
    { id: 'd81-v1-d1', korean: '진짜 친구면 먼저 가',          hangul: 'jin-jja chin-gu-myeon meon-jeo ga',          syllables: ['진', '짜', '친', '구', '면', '먼', '저', '가'], zh: '真朋友的话先去', zhEn: 'If you\'re a true friend, go first' },
    { id: 'd81-v1-d2', korean: '자존심보다 우정이 커요',        hangul: 'ja-jon-sim-bo-da u-jeong-i keo-yo',          syllables: ['자', '존', '심', '보', '다', '우', '정', '이', '커', '요'], zh: '友情比自尊大', zhEn: 'Friendship is bigger than pride' },
    { id: 'd81-v1-d3', korean: '삼 일의 침묵을 깼어요',          hangul: 'sam-i-rui chim-mu-geul kkae-sseo-yo',        syllables: ['삼', '일', '의', '침', '묵', '을', '깼', '어', '요'], zh: '打破了3天的沉默', zhEn: 'Broke 3 days of silence' },
  ],
};
