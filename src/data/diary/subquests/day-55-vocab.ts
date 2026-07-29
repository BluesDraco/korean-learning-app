import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 55 · 日记回顾 · 词汇子关卡 */
export const day55Vocab: VocabSubQuestData = {
  day: 25, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '55 天回顾的 8 个词',

  encounter: [
    { id: 'd55-v1-e1', korean: '일기',      hangul: 'il-gi',        zh: '日记',       pos: '名词',   example: { ko: '55일 전 일기를 다시 읽었어요.',  zh: '重读了 55 天前的日记。' }, tip: '日(일) + 记(기) · 일기를 쓰다',                                tier: 'core' },
    { id: 'd55-v1-e2', korean: '떨리다',    hangul: 'tteol-li-da',  zh: '紧张 / 发抖', pos: '动词',   example: { ko: '너무 떨렸어요.',                zh: '太紧张了。' },              tip: '떨다 + 리(自动词后缀) → 떨리다 · 자동사',                                          tier: 'core' },
    { id: 'd55-v1-e3', korean: '흥정',      hangul: 'heung-jeong',  zh: '讲价',       pos: '名词',   example: { ko: '흥정도 잘해요.',                zh: '也会讲价。' },              tip: 'Day 54 学过 · 흥정하다 = 讲价',                                 tier: 'core' },
    { id: 'd55-v1-e4', korean: '말리다',    hangul: 'mal-li-da',    zh: '劝阻 / 调解', pos: '动词',   example: { ko: '싸움을 말렸어요.',              zh: '调解了争吵。' },          tip: 'Day 49 场景动词',                                              tier: 'core' },
    { id: 'd55-v1-e5', korean: '배우다',    hangul: 'bae-u-da',     zh: '学',         pos: '动词',   example: { ko: '아직 배울 게 많아요.',           zh: '还有很多要学。' },        tip: '배우다 → 배워요 · 배울 것 = 要学的',                            tier: 'core' },
    { id: 'd55-v1-e6', korean: '열심히',    hangul: 'yeol-sim-hi',  zh: '努力地',     pos: '副词',   example: { ko: '계속 더 열심히 할래요.',        zh: '会继续更努力。' },        tip: '热(열) + 心(심) + 히 · 副词最刚需',                             tier: 'core' },
    { id: 'd55-v1-e7', korean: '되돌아보다', hangul: 'doe-do-ra-bo-da', zh: '回顾',    pos: '动词',   example: { ko: '55일을 되돌아봤어요.',           zh: '回顾了 55 天。' },        tip: '되돌아 + 보다 · 日记 / 自传 高频',                              tier: 'ext' },
    { id: 'd55-v1-e8', korean: '성장',      hangul: 'seong-jang',   zh: '成长',       pos: '名词',   example: { ko: '그게 성장이야.',                 zh: '这就是成长。' },          tip: 'Day 53 复习 · 성장하다',                                        tier: 'ext' },
  ],

  recognize: [
    { id: 'd55-v1-r1', korean: '일기',       hangul: 'il-gi',        choices: [{ zh: '日记',      correct: true }, { zh: '书',        correct: false }, { zh: '信',        correct: false }, { zh: '照片',      correct: false }] },
    { id: 'd55-v1-r2', korean: '떨리다',     hangul: 'tteol-li-da',  choices: [{ zh: '紧张',      correct: true }, { zh: '开心',      correct: false }, { zh: '兴奋',      correct: false }, { zh: '生气',      correct: false }] },
    { id: 'd55-v1-r3', korean: '흥정',       hangul: 'heung-jeong',  choices: [{ zh: '讲价',      correct: true }, { zh: '定价',      correct: false }, { zh: '促销',      correct: false }, { zh: '砍单',      correct: false }] },
    { id: 'd55-v1-r4', korean: '말리다',     hangul: 'mal-li-da',    choices: [{ zh: '劝阻 / 调解', correct: true }, { zh: '责骂',      correct: false }, { zh: '道歉',      correct: false }, { zh: '祝贺',      correct: false }] },
    { id: 'd55-v1-r5', korean: '배우다',     hangul: 'bae-u-da',     choices: [{ zh: '学',        correct: true }, { zh: '教',        correct: false }, { zh: '想',        correct: false }, { zh: '记',        correct: false }] },
    { id: 'd55-v1-r6', korean: '열심히',     hangul: 'yeol-sim-hi',  choices: [{ zh: '努力地',    correct: true }, { zh: '偶尔地',    correct: false }, { zh: '慢慢地',    correct: false }, { zh: '快快地',    correct: false }] },
  ],

  spell: [
    { id: 'd55-v1-s1', zhHint: '日记',       answer: ['일', '기'], syllables: ['일', '기', '인', '기'] },
    { id: 'd55-v1-s2', zhHint: '讲价',       answer: ['흥', '정'], syllables: ['흥', '정', '흥', '전'] },
    { id: 'd55-v1-s3', zhHint: '成长（성장）', answer: ['성', '장'], syllables: ['성', '장', '성', '잔'] },
    { id: 'd55-v1-s4', zhHint: '努力（열심）', answer: ['열', '심'], syllables: ['열', '심', '연', '심'] },
  ],

  write: [
    { id: 'd55-v1-w1', korean: '일', hangul: 'il',         wordKorean: '일기',       wordZh: '日记' },
    { id: 'd55-v1-w2', korean: '기', hangul: 'gi',         wordKorean: '일기',       wordZh: '日记' },
    { id: 'd55-v1-w3', korean: '떨', hangul: 'tteol',      wordKorean: '떨리다',     wordZh: '紧张' },
    { id: 'd55-v1-w4', korean: '흥', hangul: 'heung',      wordKorean: '흥정',       wordZh: '讲价' },
    { id: 'd55-v1-w5', korean: '정', hangul: 'jeong',      wordKorean: '흥정',       wordZh: '讲价' },
    { id: 'd55-v1-w6', korean: '말', hangul: 'mal',        wordKorean: '말리다',     wordZh: '劝阻' },
    { id: 'd55-v1-w7', korean: '배', hangul: 'bae',        wordKorean: '배우다',     wordZh: '学' },
    { id: 'd55-v1-w8', korean: '열', hangul: 'yeol',       wordKorean: '열심히',     wordZh: '努力' },
  ],

  dictation: [
    { id: 'd55-v1-d1', korean: '어려웠던 나',            hangul: 'eo-ryeo-wot-deon na',        syllables: ['어', '려', '웠', '던', '나'],       zh: '曾经艰难的我' },
    { id: 'd55-v1-d2', korean: '많이 배웠어요',            hangul: 'ma-ni bae-wo-sseo-yo',       syllables: ['많', '이', '배', '웠', '어', '요'],  zh: '学了很多' },
    { id: 'd55-v1-d3', korean: '계속 더 열심히 할래요',    hangul: 'gye-sok deo yeol-sim-hi hal-lae-yo', syllables: ['계', '속', '더', '열', '심', '히', '할', '래', '요'], zh: '会继续更努力' },
  ],
};
