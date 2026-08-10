import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 78 · 3-1 단어 마스터 · 제주도·矮马和橘子 · ~지만 + 对比 */
export const day78Vocab: VocabSubQuestData = {
  day: 18, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '제주도·조랑말·귤 8 个词',

  encounter: [
    { id: 'd78-v1-e1', korean: '제주도',     hangul: 'je-ju-do',       zh: '济州岛',      pos: '名词',   example: { ko: '제주도에 처음 왔어요.',          zh: '第一次来济州岛。' },    tip: 'Day 78 场景 · 韩国南部的岛 · 관광지 대표',                            tier: 'core' },
    { id: 'd78-v1-e2', korean: '조랑말',     hangul: 'jo-rang-mal',    zh: '矮马 / 小马', pos: '名词',   example: { ko: '제주 조랑말은 작지만 빨라요.',    zh: '济州矮马虽小但快。' },  tip: '제주도 대표 동물 · 고유어',                                            tier: 'core' },
    { id: 'd78-v1-e3', korean: '귤',         hangul: 'gyul',           zh: '橘子',        pos: '名词',   example: { ko: '제주 귤이 유명해요.',            zh: '济州橘子有名。' },      tip: '单音节名词 · 제주 특산',                                              tier: 'core' },
    { id: 'd78-v1-e4', korean: '껍질',       hangul: 'kkeop-jil',      zh: '皮 / 壳',     pos: '名词',   example: { ko: '귤 껍질을 벗겼어요.',            zh: '剥了橘子皮。' },        tip: '껍질을 벗기다 = 剥皮',                                                tier: 'core' },
    { id: 'd78-v1-e5', korean: '새콤달콤',   hangul: 'sae-kom-dal-kom', zh: '酸酸甜甜',   pos: '副词',   example: { ko: '새콤달콤한 맛이에요.',          zh: '酸酸甜甜的味道。' },    tip: '고유어 음성상징어 · 새콤(酸) + 달콤(甜)',                              tier: 'core' },
    { id: 'd78-v1-e6', korean: '증거',       hangul: 'jeung-geo',      zh: '证据',        pos: '名词',   example: { ko: '살아있는 증거예요.',            zh: '是活的证据。' },        tip: '证(증) + 据(거)',                                                      tier: 'core' },
    { id: 'd78-v1-e7', korean: '목장',       hangul: 'mok-jang',       zh: '牧场',        pos: '名词',   example: { ko: '목장에서 말을 봤어요.',          zh: '在牧场看到了马。' },    tip: '牧(목) + 场(장)',                                                      tier: 'ext' },
    { id: 'd78-v1-e8', korean: '특산',       hangul: 'teuk-san',       zh: '特产',        pos: '名词',   example: { ko: '귤은 제주 특산이에요.',          zh: '橘子是济州特产。' },    tip: '特(특) + 産(산) · 특산품 = 特产品',                                    tier: 'ext' },
  ],

  recognize: [
    { id: 'd78-v1-r1', korean: '제주도',     hangul: 'je-ju-do',       choices: [{ zh: '济州岛',      correct: true }, { zh: '首尔',    correct: false }, { zh: '釜山',    correct: false }, { zh: '江原道',  correct: false }] },
    { id: 'd78-v1-r2', korean: '조랑말',     hangul: 'jo-rang-mal',    choices: [{ zh: '矮马 / 小马', correct: true }, { zh: '骆驼',    correct: false }, { zh: '斑马',    correct: false }, { zh: '驴',      correct: false }] },
    { id: 'd78-v1-r3', korean: '껍질',       hangul: 'kkeop-jil',      choices: [{ zh: '皮 / 壳',     correct: true }, { zh: '核',      correct: false }, { zh: '汁',      correct: false }, { zh: '味道',    correct: false }] },
    { id: 'd78-v1-r4', korean: '새콤달콤',   hangul: 'sae-kom-dal-kom', choices: [{ zh: '酸酸甜甜',   correct: true }, { zh: '又苦又辣',correct: false }, { zh: '又咸又淡',correct: false }, { zh: '又冷又硬',correct: false }] },
    { id: 'd78-v1-r5', korean: '증거',       hangul: 'jeung-geo',      choices: [{ zh: '证据',        correct: true }, { zh: '证件',    correct: false }, { zh: '经验',    correct: false }, { zh: '记录',    correct: false }] },
    { id: 'd78-v1-r6', korean: '목장',       hangul: 'mok-jang',       choices: [{ zh: '牧场',        correct: true }, { zh: '市场',    correct: false }, { zh: '农场',    correct: false }, { zh: '广场',    correct: false }] },
  ],

  spell: [
    { id: 'd78-v1-s1', zhHint: '矮马',    answer: ['조', '랑', '말'], syllables: ['조', '랑', '말', '주', '랄'] },
    { id: 'd78-v1-s2', zhHint: '证据',    answer: ['증', '거'], syllables: ['증', '거', '즘', '가'] },
    { id: 'd78-v1-s3', zhHint: '牧场',    answer: ['목', '장'], syllables: ['목', '장', '몫', '정'] },
    { id: 'd78-v1-s4', zhHint: '特产',    answer: ['특', '산'], syllables: ['특', '산', '득', '살'] },
  ],

  write: [
    { id: 'd78-v1-w1', korean: '조', hangul: 'jo',       wordKorean: '조랑말',     wordZh: '矮马' },
    { id: 'd78-v1-w2', korean: '랑', hangul: 'rang',     wordKorean: '조랑말',     wordZh: '矮马' },
    { id: 'd78-v1-w3', korean: '귤', hangul: 'gyul',     wordKorean: '귤',         wordZh: '橘子' },
    { id: 'd78-v1-w4', korean: '껍', hangul: 'kkeop',    wordKorean: '껍질',       wordZh: '皮' },
    { id: 'd78-v1-w5', korean: '증', hangul: 'jeung',    wordKorean: '증거',       wordZh: '证据' },
    { id: 'd78-v1-w6', korean: '목', hangul: 'mok',      wordKorean: '목장',       wordZh: '牧场' },
    { id: 'd78-v1-w7', korean: '특', hangul: 'teuk',     wordKorean: '특산',       wordZh: '特产' },
    { id: 'd78-v1-w8', korean: '질', hangul: 'jil',      wordKorean: '껍질',       wordZh: '皮' },
  ],

  dictation: [
    { id: 'd78-v1-d1', korean: '조랑말은 작지만 빨라요',        hangul: 'jo-rang-ma-reun jak-ji-man ppal-la-yo',      syllables: ['조', '랑', '말', '은', '작', '지', '만', '빨', '라', '요'], zh: '矮马虽小但快' },
    { id: 'd78-v1-d2', korean: '귤 껍질을 벗겼어요',            hangul: 'gyul kkeop-ji-reul beot-gyeo-sseo-yo',       syllables: ['귤', '껍', '질', '을', '벗', '겼', '어', '요'], zh: '剥了橘子皮' },
    { id: 'd78-v1-d3', korean: '살아있는 증거예요',             hangul: 'sa-ra-in-neun jeung-geo-ye-yo',              syllables: ['살', '아', '있', '는', '증', '거', '예', '요'], zh: '是活的证据' },
  ],
};
