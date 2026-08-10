import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 50 · 첫눈 · 词汇子关卡 */
export const day50Vocab: VocabSubQuestData = {
  day: 20, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '初雪的 8 个词', subtitleEn: '8 words for first snow',

  encounter: [
    { id: 'd50-v1-e1', korean: '첫눈',      hangul: 'cheon-nun',    zh: '初雪', zhEn: 'First Snow',        pos: '名词', posEn: 'Noun', example: { ko: '오늘 첫눈이 왔어요.',        zh: '今天下了初雪。', zhEn: 'It snowed for the first time today.' },       tip: '첫(初) + 눈(雪) · 발음 [천눈] · 韩国重视的一天', tipEn: '첫(first) + 눈(snow) · pronounced [천눈] · a day Koreans cherish',                tier: 'core' },
    { id: 'd50-v1-e2', korean: '소원',      hangul: 'so-won',       zh: '愿望', zhEn: 'Wish',        pos: '名词', posEn: 'Noun', example: { ko: '소원을 빌었어요.',            zh: '许了愿。', zhEn: 'Made a wish.' },             tip: '所(소) + 愿(원) · 소원을 빌다', tipEn: '소(wish) + 원(wish) · 소원을 빌다',                                tier: 'core' },
    { id: 'd50-v1-e3', korean: '빌다',      hangul: 'bil-da',       zh: '祈求 / 许', zhEn: 'to pray / to make (a wish)',   pos: '动词', posEn: 'Verb', example: { ko: '소원을 빌어요.',              zh: '许愿。', zhEn: 'Make a wish.' },               tip: 'ㄹ 词干 · 빌다 → 빌어요 / 빌면', tipEn: 'ㄹ stem · 빌다 → 빌어요 / 빌면',                                tier: 'core' },
    { id: 'd50-v1-e4', korean: '이뤄지다',  hangul: 'i-rwo-ji-da',  zh: '实现 / 成真', zhEn: 'come true / be realized', pos: '动词', posEn: 'Verb', example: { ko: '소원이 이뤄져요.',            zh: '愿望实现。', zhEn: 'The wish came true.' },           tip: '이루다(实现) + 어지다(被动) → 自动实现', tipEn: '이루다(realize) + 어지다(passive) → automatically realized',                        tier: 'core' },
    { id: 'd50-v1-e5', korean: '비밀',      hangul: 'bi-mil',       zh: '秘密', zhEn: 'secret',        pos: '名词', posEn: 'Noun', example: { ko: '이건 비밀이야.',              zh: '这是秘密。', zhEn: 'This is a secret.' },           tip: 'Day 34 复习 · 这次是 Tori 自己的秘密', tipEn: 'Day 34 Review · This time, Tori\'s own secret',                          tier: 'core' },
    { id: 'd50-v1-e6', korean: '발자국',    hangul: 'bal-ja-guk',   zh: '脚印', zhEn: 'Footprints',        pos: '名词', posEn: 'Noun', example: { ko: '눈 위에 발자국이 남았어요.',  zh: '雪上留下脚印。', zhEn: 'Left footprints in the snow.' },       tip: '발(脚) + 자국(痕迹) · 韩剧经典意象', tipEn: '발(foot) + 자국(trace) · Classic Korean drama imagery',                            tier: 'core' },
    { id: 'd50-v1-e7', korean: '광장',      hangul: 'gwang-jang',   zh: '广场', zhEn: 'plaza',        pos: '名词', posEn: 'Noun', example: { ko: '광장에 눈이 쌓였어요.',        zh: '广场上积雪了。', zhEn: 'Snow has piled up in the plaza.' },       tip: '广(광) + 场(장)', tipEn: 'wide (광) + place (장)',                                              tier: 'ext' },
    { id: 'd50-v1-e8', korean: '쌓이다',    hangul: 'ssa-i-da',     zh: '堆积 / 积', zhEn: 'pile up / accumulate',   pos: '动词', posEn: 'Verb', example: { ko: '눈이 쌓였어요.',              zh: '雪积了起来。', zhEn: 'The snow piled up.' },         tip: '쌓다 + 이다(被动)', tipEn: '쌓다 + 이다(passive)',                                            tier: 'ext' },
  ],

  recognize: [
    { id: 'd50-v1-r1', korean: '첫눈',      hangul: 'cheon-nun',    choices: [{ zh: '初雪', zhEn: 'First Snow',        correct: true }, { zh: '大雪', zhEn: 'heavy snow',      correct: false }, { zh: '细雨', zhEn: 'drizzle',      correct: false }, { zh: '雪花', zhEn: 'snowflake',      correct: false }] },
    { id: 'd50-v1-r2', korean: '소원',      hangul: 'so-won',       choices: [{ zh: '愿望', zhEn: 'Wish',        correct: true }, { zh: '梦想', zhEn: 'dream',      correct: false }, { zh: '希望', zhEn: 'hope',      correct: false }, { zh: '打算', zhEn: 'plan',      correct: false }] },
    { id: 'd50-v1-r3', korean: '빌다',      hangul: 'bil-da',       choices: [{ zh: '许 / 祈求', zhEn: 'wish / pray',   correct: true }, { zh: '借', zhEn: 'borrow',        correct: false }, { zh: '欠', zhEn: 'owe',        correct: false }, { zh: '还', zhEn: 'return',        correct: false }] },
    { id: 'd50-v1-r4', korean: '이뤄지다',  hangul: 'i-rwo-ji-da',  choices: [{ zh: '实现 / 成真', zhEn: 'come true / be realized', correct: true }, { zh: '消失', zhEn: 'disappear',      correct: false }, { zh: '开始', zhEn: 'start',      correct: false }, { zh: '结束', zhEn: 'End.',      correct: false }] },
    { id: 'd50-v1-r5', korean: '비밀',      hangul: 'bi-mil',       choices: [{ zh: '秘密', zhEn: 'secret',        correct: true }, { zh: '悄悄话', zhEn: 'Whisper',    correct: false }, { zh: '密码', zhEn: 'PIN',      correct: false }, { zh: '亲密', zhEn: 'Close / intimate',      correct: false }] },
    { id: 'd50-v1-r6', korean: '발자국',    hangul: 'bal-ja-guk',   choices: [{ zh: '脚印', zhEn: 'Footprints',        correct: true }, { zh: '足球', zhEn: 'soccer',      correct: false }, { zh: '脚踝', zhEn: 'ankle',      correct: false }, { zh: '鞋印', zhEn: 'footprint',      correct: false }] },
  ],

  spell: [
    { id: 'd50-v1-s1', zhHint: '初雪', zhHintEn: 'First Snow',        answer: ['첫', '눈'], syllables: ['첫', '눈', '천', '눈'] },
    { id: 'd50-v1-s2', zhHint: '愿望', zhHintEn: 'Wish',        answer: ['소', '원'], syllables: ['소', '원', '수', '원'] },
    { id: 'd50-v1-s3', zhHint: '秘密', zhHintEn: 'secret',        answer: ['비', '밀'], syllables: ['비', '밀', '비', '민'] },
    { id: 'd50-v1-s4', zhHint: '广场', zhHintEn: 'plaza',        answer: ['광', '장'], syllables: ['광', '장', '광', '잔'] },
  ],

  write: [
    { id: 'd50-v1-w1', korean: '첫', hangul: 'cheot',      wordKorean: '첫눈',      wordZh: '初雪', wordZhEn: 'First Snow' },
    { id: 'd50-v1-w2', korean: '눈', hangul: 'nun',        wordKorean: '첫눈',      wordZh: '初雪', wordZhEn: 'First Snow' },
    { id: 'd50-v1-w3', korean: '소', hangul: 'so',         wordKorean: '소원',      wordZh: '愿望', wordZhEn: 'Wish' },
    { id: 'd50-v1-w4', korean: '원', hangul: 'won',        wordKorean: '소원',      wordZh: '愿望', wordZhEn: 'Wish' },
    { id: 'd50-v1-w5', korean: '비', hangul: 'bi',         wordKorean: '비밀',      wordZh: '秘密', wordZhEn: 'secret' },
    { id: 'd50-v1-w6', korean: '밀', hangul: 'mil',        wordKorean: '비밀',      wordZh: '秘密', wordZhEn: 'secret' },
    { id: 'd50-v1-w7', korean: '발', hangul: 'bal',        wordKorean: '발자국',    wordZh: '脚印', wordZhEn: 'Footprints' },
    { id: 'd50-v1-w8', korean: '자', hangul: 'ja',         wordKorean: '발자국',    wordZh: '脚印', wordZhEn: 'Footprints' },
  ],

  dictation: [
    { id: 'd50-v1-d1', korean: '첫눈이 왔어요',      hangul: 'cheon-nu-ni wa-sseo-yo',        syllables: ['첫', '눈', '이', '왔', '어', '요'],       zh: '下了初雪', zhEn: 'The first snow fell' },
    { id: 'd50-v1-d2', korean: '소원을 빌면',         hangul: 'so-wo-neul bil-myeon',           syllables: ['소', '원', '을', '빌', '면'],             zh: '许愿的话', zhEn: 'If you make a wish' },
    { id: 'd50-v1-d3', korean: '말하면 안 이뤄진대',   hangul: 'mal-ha-myeon an i-rwo-jin-dae',  syllables: ['말', '하', '면', '안', '이', '뤄', '진', '대'], zh: '说了就不灵了', zhEn: 'It won\'t come true if you say it' },
  ],
};
