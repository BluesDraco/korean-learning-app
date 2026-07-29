import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 61 · 3-1 단어 마스터 · 高级班第一天 · Danielle 完美得不真实 */
export const day61Vocab: VocabSubQuestData = {
  day: 1, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '高级班第一天的 8 个词',

  encounter: [
    { id: 'd61-v1-e1', korean: '고급반',      hangul: 'go-geup-ban',      zh: '高级班',    pos: '名词',   example: { ko: '오늘부터 고급반이에요.',           zh: '从今天起是高级班。' },       tip: '高(고) + 级(급) + 班(반) · 초급반 → 중급반 → 고급반',                          tier: 'core' },
    { id: 'd61-v1-e2', korean: '원어민',      hangul: 'won-eo-min',       zh: '母语者',    pos: '名词',   example: { ko: '다니엘은 원어민처럼 발음해요.',      zh: 'Danielle 发音像母语者。' },   tip: '原(원) + 语(어) + 民(민) · 学韩语最想变成的对象',                              tier: 'core' },
    { id: 'd61-v1-e3', korean: '자신감',      hangul: 'ja-sin-gam',       zh: '自信',       pos: '名词',   example: { ko: '자신감이 떨어졌어요.',              zh: '自信心低落。' },             tip: '자신(自信) + 感(감) · 자신감이 떨어지다 / 자신감이 생기다',                     tier: 'core' },
    { id: 'd61-v1-e4', korean: '차이',         hangul: 'cha-i',            zh: '差别 / 差距', pos: '名词', example: { ko: '실력 차이가 커요.',                 zh: '实力差距很大。' },           tip: 'Day 56 学过 · 이 날은 实力 差距',                                              tier: 'core' },
    { id: 'd61-v1-e5', korean: '틀리다',      hangul: 'teul-li-da',       zh: '错 / 答错',  pos: '动词',   example: { ko: '문법 하나도 안 틀렸어요.',          zh: '语法一处都没错。' },         tip: '반의어 = 맞다（对）· 시험 / 답변 자주 씀',                                     tier: 'core' },
    { id: 'd61-v1-e6', korean: '실력',         hangul: 'sil-lyeok',        zh: '实力',       pos: '名词',   example: { ko: '실력 차이가 커요.',                 zh: '实力差距大。' },             tip: 'Day 31 · 43 学过 · 이 날은 自己를 낮게 봄',                                    tier: 'core' },
    { id: 'd61-v1-e7', korean: '별',           hangul: 'byeol',            zh: '星星',       pos: '名词',   example: { ko: '눈이 별처럼 빛나요.',              zh: '眼睛像星星一样闪。' },       tip: '무 받침 → 별처럼（比喻高频）· 별빛 = 星光',                                    tier: 'ext' },
    { id: 'd61-v1-e8', korean: '뉴스',         hangul: 'nyu-seu',          zh: '新闻',       pos: '名词',   example: { ko: '어휘가 뉴스 기자 수준이에요.',      zh: '词汇是新闻记者水平。' },     tip: '外来语 news · 뉴스 앵커 / 뉴스 기자',                                          tier: 'ext' },
  ],

  recognize: [
    { id: 'd61-v1-r1', korean: '고급반',   hangul: 'go-geup-ban',      choices: [{ zh: '高级班',      correct: true }, { zh: '中级班',      correct: false }, { zh: '初级班',      correct: false }, { zh: '会话班',      correct: false }] },
    { id: 'd61-v1-r2', korean: '원어민',   hangul: 'won-eo-min',       choices: [{ zh: '母语者',      correct: true }, { zh: '外国人',      correct: false }, { zh: '留学生',      correct: false }, { zh: '语言老师',    correct: false }] },
    { id: 'd61-v1-r3', korean: '자신감',   hangul: 'ja-sin-gam',       choices: [{ zh: '自信',        correct: true }, { zh: '骄傲',        correct: false }, { zh: '努力',        correct: false }, { zh: '灵感',        correct: false }] },
    { id: 'd61-v1-r4', korean: '차이',      hangul: 'cha-i',            choices: [{ zh: '差别 / 差距', correct: true }, { zh: '相同',        correct: false }, { zh: '距离',        correct: false }, { zh: '选择',        correct: false }] },
    { id: 'd61-v1-r5', korean: '틀리다',   hangul: 'teul-li-da',       choices: [{ zh: '错 / 答错',   correct: true }, { zh: '对',          correct: false }, { zh: '掉落',        correct: false }, { zh: '换掉',        correct: false }] },
    { id: 'd61-v1-r6', korean: '실력',      hangul: 'sil-lyeok',        choices: [{ zh: '实力',        correct: true }, { zh: '努力',        correct: false }, { zh: '压力',        correct: false }, { zh: '实话',        correct: false }] },
  ],

  spell: [
    { id: 'd61-v1-s1', zhHint: '高级',      answer: ['고', '급'], syllables: ['고', '급', '거', '금'] },
    { id: 'd61-v1-s2', zhHint: '母语',      answer: ['원', '어'], syllables: ['원', '어', '완', '오'] },
    { id: 'd61-v1-s3', zhHint: '自信',      answer: ['자', '신'], syllables: ['자', '신', '주', '심'] },
    { id: 'd61-v1-s4', zhHint: '实力',      answer: ['실', '력'], syllables: ['실', '력', '신', '역'] },
  ],

  write: [
    { id: 'd61-v1-w1', korean: '고', hangul: 'go',       wordKorean: '고급반', wordZh: '高级班' },
    { id: 'd61-v1-w2', korean: '급', hangul: 'geup',     wordKorean: '고급반', wordZh: '高级班' },
    { id: 'd61-v1-w3', korean: '원', hangul: 'won',      wordKorean: '원어민', wordZh: '母语者' },
    { id: 'd61-v1-w4', korean: '어', hangul: 'eo',       wordKorean: '원어민', wordZh: '母语者' },
    { id: 'd61-v1-w5', korean: '민', hangul: 'min',      wordKorean: '원어민', wordZh: '母语者' },
    { id: 'd61-v1-w6', korean: '자', hangul: 'ja',       wordKorean: '자신감', wordZh: '自信' },
    { id: 'd61-v1-w7', korean: '차', hangul: 'cha',      wordKorean: '차이',   wordZh: '差距' },
    { id: 'd61-v1-w8', korean: '별', hangul: 'byeol',    wordKorean: '별',     wordZh: '星星' },
  ],

  dictation: [
    { id: 'd61-v1-d1', korean: '원어민처럼 발음해요',    hangul: 'won-eo-min-cheo-reom ba-reu-mae-yo', syllables: ['원', '어', '민', '처', '럼', '발', '음', '해', '요'], zh: '发音像母语者' },
    { id: 'd61-v1-d2', korean: '실력 차이가 커요',        hangul: 'sil-lyeok cha-i-ga keo-yo',           syllables: ['실', '력', '차', '이', '가', '커', '요'],           zh: '实力差距很大' },
    { id: 'd61-v1-d3', korean: '눈이 별처럼 빛나요',      hangul: 'nu-ni byeol-cheo-reom bin-na-yo',     syllables: ['눈', '이', '별', '처', '럼', '빛', '나', '요'],     zh: '眼睛像星星一样闪' },
  ],
};
