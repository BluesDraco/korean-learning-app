import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 48 · 韩国电影 · 词汇子关卡 */
export const day48Vocab: VocabSubQuestData = {
  day: 18, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '看电影的 8 个词', subtitleEn: '8 words for watching movies',

  encounter: [
    { id: 'd48-v1-e1', korean: '영화',      hangul: 'yeong-hwa',    zh: '电影', zhEn: 'Movie',      pos: '名词', posEn: 'Noun', example: { ko: '한국 영화를 봤어요.',        zh: '看了韩国电影。', zhEn: 'Watched a Korean movie.' },       tip: '映(영) + 画(화) · 영화관 = 电影院', tipEn: '映(영) + 画(화) · 영화관 = movie theater',                            tier: 'core' },
    { id: 'd48-v1-e2', korean: '대사',      hangul: 'dae-sa',       zh: '台词', zhEn: 'Line (dialogue)',      pos: '名词', posEn: 'Noun', example: { ko: '이 영화 대사가 어려워요.',  zh: '台词很难。', zhEn: 'The lines are hard.' },           tip: '台(대) + 词(사) · 대사가 빠르다', tipEn: '台(대) + 词(사) · lines are fast',                              tier: 'core' },
    { id: 'd48-v1-e3', korean: '이해하다',  hangul: 'i-hae-ha-da',  zh: '理解', zhEn: 'understand',      pos: '动词', posEn: 'Verb', example: { ko: '반은 이해했어요.',            zh: '理解了一半。', zhEn: 'I understood half of it.' },         tip: '理(이) + 解(해) + 하다', tipEn: 'Understand (이) + Understand (해) + 하다',                                        tier: 'core' },
    { id: 'd48-v1-e4', korean: '표정',      hangul: 'pyo-jeong',    zh: '表情', zhEn: 'facial expression',      pos: '名词', posEn: 'Noun', example: { ko: '배우 표정이 진짜였어요.',    zh: '演员表情很真。', zhEn: 'The actor\'s expression was really genuine.' },       tip: '表(표) + 情(정)', tipEn: '표 (surface/expression) + 정 (feeling)',                                              tier: 'core' },
    { id: 'd48-v1-e5', korean: '감동',      hangul: 'gam-dong',     zh: '感动', zhEn: 'Moved',      pos: '名词', posEn: 'Noun', example: { ko: '너무 감동했어요.',            zh: '太感动了。', zhEn: 'It was so touching.' },           tip: '感(감) + 动(동) · 감동적이다 = 感人的', tipEn: '感(감) + 动(동) · 감동적이다 = touching',                          tier: 'core' },
    { id: 'd48-v1-e6', korean: '자막',      hangul: 'ja-mak',       zh: '字幕', zhEn: 'subtitles',      pos: '名词', posEn: 'Noun', example: { ko: '자막이 없어서 힘들었어요.',  zh: '没字幕所以很难。', zhEn: 'It was hard without subtitles.' },     tip: '字(자) + 幕(막)', tipEn: '자 (character) + 막 (curtain)',                                              tier: 'core' },
    { id: 'd48-v1-e7', korean: '느끼다',    hangul: 'neu-kki-da',   zh: '感受', zhEn: 'feel',      pos: '动词', posEn: 'Verb', example: { ko: '감동을 느꼈어요.',            zh: '感受到了感动。', zhEn: 'I felt moved.' },       tip: '느끼다 → 느꼈어요',                                              tier: 'ext' },
    { id: 'd48-v1-e8', korean: '배우',      hangul: 'bae-u',        zh: '演员', zhEn: 'actor',      pos: '名词', posEn: 'Noun', example: { ko: '이 배우 유명해요.',            zh: '这个演员很有名。', zhEn: 'This actor is very famous.' },     tip: '俳(배) + 优(우)', tipEn: '배 (actor) + 우 (excellent)',                                              tier: 'ext' },
  ],

  recognize: [
    { id: 'd48-v1-r1', korean: '영화',     hangul: 'yeong-hwa',    choices: [{ zh: '电影', zhEn: 'Movie',      correct: true }, { zh: '电视', zhEn: 'TV',      correct: false }, { zh: '话剧', zhEn: 'play',        correct: false }, { zh: '综艺', zhEn: 'variety show',        correct: false }] },
    { id: 'd48-v1-r2', korean: '대사',     hangul: 'dae-sa',       choices: [{ zh: '台词', zhEn: 'Line (dialogue)',      correct: true }, { zh: '海报', zhEn: 'poster',      correct: false }, { zh: '插曲', zhEn: 'insert song',        correct: false }, { zh: '剧本', zhEn: 'script',        correct: false }] },
    { id: 'd48-v1-r3', korean: '이해하다', hangul: 'i-hae-ha-da',  choices: [{ zh: '理解', zhEn: 'understand',      correct: true }, { zh: '误会', zhEn: 'misunderstanding',      correct: false }, { zh: '记住', zhEn: 'Remember.',        correct: false }, { zh: '忘记', zhEn: 'Forget',        correct: false }] },
    { id: 'd48-v1-r4', korean: '표정',     hangul: 'pyo-jeong',    choices: [{ zh: '表情', zhEn: 'facial expression',      correct: true }, { zh: '表演', zhEn: 'performance',      correct: false }, { zh: '表面', zhEn: 'surface',        correct: false }, { zh: '表白', zhEn: 'confession',        correct: false }] },
    { id: 'd48-v1-r5', korean: '감동',     hangul: 'gam-dong',     choices: [{ zh: '感动', zhEn: 'Moved',      correct: true }, { zh: '感谢', zhEn: 'Thanks',      correct: false }, { zh: '感情', zhEn: 'feelings',        correct: false }, { zh: '感冒', zhEn: 'cold',        correct: false }] },
    { id: 'd48-v1-r6', korean: '자막',     hangul: 'ja-mak',       choices: [{ zh: '字幕', zhEn: 'subtitles',      correct: true }, { zh: '画面', zhEn: 'scene',      correct: false }, { zh: '海报', zhEn: 'poster',        correct: false }, { zh: '预告', zhEn: 'preview',        correct: false }] },
  ],

  spell: [
    { id: 'd48-v1-s1', zhHint: '电影', zhHintEn: 'Movie',       answer: ['영', '화'], syllables: ['영', '화', '영', '하'] },
    { id: 'd48-v1-s2', zhHint: '台词', zhHintEn: 'Line (dialogue)',       answer: ['대', '사'], syllables: ['대', '사', '데', '사'] },
    { id: 'd48-v1-s3', zhHint: '感动', zhHintEn: 'Moved',       answer: ['감', '동'], syllables: ['감', '동', '감', '둥'] },
    { id: 'd48-v1-s4', zhHint: '字幕', zhHintEn: 'subtitles',       answer: ['자', '막'], syllables: ['자', '막', '자', '만'] },
  ],

  write: [
    { id: 'd48-v1-w1', korean: '영', hangul: 'yeong',      wordKorean: '영화',      wordZh: '电影', wordZhEn: 'Movie' },
    { id: 'd48-v1-w2', korean: '화', hangul: 'hwa',        wordKorean: '영화',      wordZh: '电影', wordZhEn: 'Movie' },
    { id: 'd48-v1-w3', korean: '대', hangul: 'dae',        wordKorean: '대사',      wordZh: '台词', wordZhEn: 'Line (dialogue)' },
    { id: 'd48-v1-w4', korean: '사', hangul: 'sa',         wordKorean: '대사',      wordZh: '台词', wordZhEn: 'Line (dialogue)' },
    { id: 'd48-v1-w5', korean: '감', hangul: 'gam',        wordKorean: '감동',      wordZh: '感动', wordZhEn: 'Moved' },
    { id: 'd48-v1-w6', korean: '동', hangul: 'dong',       wordKorean: '감동',      wordZh: '感动', wordZhEn: 'Moved' },
    { id: 'd48-v1-w7', korean: '자', hangul: 'ja',         wordKorean: '자막',      wordZh: '字幕', wordZhEn: 'subtitles' },
    { id: 'd48-v1-w8', korean: '막', hangul: 'mak',        wordKorean: '자막',      wordZh: '字幕', wordZhEn: 'subtitles' },
  ],

  dictation: [
    { id: 'd48-v1-d1', korean: '이해 못 했지만',    hangul: 'i-hae mot haet-ji-man',    syllables: ['이', '해', '못', '했', '지', '만'],   zh: '虽然没懂', zhEn: 'Even though I didn\'t understand' },
    { id: 'd48-v1-d2', korean: '재미있는데',         hangul: 'jae-mi-in-neun-de',         syllables: ['재', '미', '있', '는', '데'],           zh: '有意思，可是……', zhEn: 'It\'s interesting, but...' },
    { id: 'd48-v1-d3', korean: '마음이 빨라',         hangul: 'ma-eu-mi ppal-la',          syllables: ['마', '음', '이', '빨', '라'],           zh: '心快', zhEn: 'heart racing' },
  ],
};
