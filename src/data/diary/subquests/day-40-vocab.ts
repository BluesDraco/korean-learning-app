import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 40 · 민지네 집 · 词汇子关卡 */
export const day40Vocab: VocabSubQuestData = {
  day: 10, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '第一次去朋友家 · 8 个词',

  encounter: [
    { id: 'd40-v1-e1', korean: '할머니',      hangul: 'hal-meo-ni',      zh: '奶奶',          pos: '名词',   example: { ko: '민지네 할머니가 다정하세요.', zh: '민지奶奶很和蔼。' },   tip: '외할머니 = 外婆 · ~네 할머니 = ~家的奶奶',                      tier: 'core' },
    { id: 'd40-v1-e2', korean: '가족',        hangul: 'ga-jok',          zh: '家人',          pos: '名词',   example: { ko: '가족과 같이 저녁을 먹었어요.', zh: '和家人一起吃了晚饭。' }, tip: '家(가) + 族(족) · 식구 也是家人（更口语）',                       tier: 'core' },
    { id: 'd40-v1-e3', korean: '초대받다',    hangul: 'cho-dae-bat-da',  zh: '受邀',          pos: '动词',   example: { ko: '민지 집에 초대받았어요.',      zh: '被邀请到민지家。' },   tip: '초대 + 받다 = 受邀 · 被动',                                     tier: 'core' },
    { id: 'd40-v1-e4', korean: '다정하다',    hangul: 'da-jeong-ha-da',  zh: '和蔼 / 亲切',   pos: '形容词', example: { ko: '할머니가 정말 다정하세요.',   zh: '奶奶真的很和蔼。' },   tip: '다(多) + 정(情) + 하다 · 夸长辈亲切',                             tier: 'core' },
    { id: 'd40-v1-e5', korean: '반찬',        hangul: 'ban-chan',        zh: '小菜',          pos: '名词',   example: { ko: '반찬이 많아요.',              zh: '小菜好多。' },         tip: '韩式饭桌一定有的配菜 · 김치 / 시금치 / 멸치',                     tier: 'core' },
    { id: 'd40-v1-e6', korean: '많이 먹어요', hangul: 'ma-ni meo-geo-yo', zh: '多吃点',        pos: '表达',   example: { ko: '많이 먹어요, 배부르게.',       zh: '多吃点，吃到饱。' },   tip: '韩国家里第一句待客话 · 等同"多吃点"',                             tier: 'core' },
    { id: 'd40-v1-e7', korean: '잘 먹었습니다', hangul: 'jal meo-geo-sseum-ni-da', zh: '吃好了（饭后致谢）', pos: '表达', example: { ko: '잘 먹었습니다. 정말 맛있었어요.', zh: '吃好了。真的好好吃。' }, tip: '饭前 잘 먹겠습니다 · 饭后 잘 먹었습니다',                          tier: 'ext' },
    { id: 'd40-v1-e8', korean: '어른',        hangul: 'eo-reun',         zh: '长辈 / 大人',   pos: '名词',   example: { ko: '어른한테는 반말 안 해요.',    zh: '对长辈不用반말。' },   tip: '与 어린이(小孩) 相对 · 敬语系统的对象',                          tier: 'ext' },
  ],

  recognize: [
    { id: 'd40-v1-r1', korean: '할머니',    hangul: 'hal-meo-ni',      choices: [{ zh: '奶奶',         correct: true }, { zh: '妈妈',       correct: false }, { zh: '姐姐',        correct: false }, { zh: '阿姨',        correct: false }] },
    { id: 'd40-v1-r2', korean: '가족',      hangul: 'ga-jok',          choices: [{ zh: '家人',         correct: true }, { zh: '朋友',       correct: false }, { zh: '邻居',        correct: false }, { zh: '同学',        correct: false }] },
    { id: 'd40-v1-r3', korean: '초대받다',  hangul: 'cho-dae-bat-da',  choices: [{ zh: '受邀',         correct: true }, { zh: '邀请别人',    correct: false }, { zh: '拒绝',        correct: false }, { zh: '道谢',        correct: false }] },
    { id: 'd40-v1-r4', korean: '다정하다',  hangul: 'da-jeong-ha-da',  choices: [{ zh: '和蔼 / 亲切',  correct: true }, { zh: '严厉',       correct: false }, { zh: '冷漠',        correct: false }, { zh: '陌生',        correct: false }] },
    { id: 'd40-v1-r5', korean: '반찬',      hangul: 'ban-chan',        choices: [{ zh: '小菜',         correct: true }, { zh: '主菜',       correct: false }, { zh: '汤',          correct: false }, { zh: '饭',          correct: false }] },
    { id: 'd40-v1-r6', korean: '어른',      hangul: 'eo-reun',         choices: [{ zh: '长辈 / 大人',  correct: true }, { zh: '小孩',       correct: false }, { zh: '男人',        correct: false }, { zh: '朋友',        correct: false }] },
  ],

  spell: [
    { id: 'd40-v1-s1', zhHint: '奶奶',      answer: ['할', '머', '니'], syllables: ['할', '머', '니', '한', '너'] },
    { id: 'd40-v1-s2', zhHint: '家人',      answer: ['가', '족'], syllables: ['가', '족', '가', '즉'] },
    { id: 'd40-v1-s3', zhHint: '小菜',      answer: ['반', '찬'], syllables: ['반', '찬', '반', '천'] },
    { id: 'd40-v1-s4', zhHint: '和蔼（다정）', answer: ['다', '정'], syllables: ['다', '정', '더', '정'] },
  ],

  write: [
    { id: 'd40-v1-w1', korean: '할', hangul: 'hal',        wordKorean: '할머니',   wordZh: '奶奶' },
    { id: 'd40-v1-w2', korean: '머', hangul: 'meo',        wordKorean: '할머니',   wordZh: '奶奶' },
    { id: 'd40-v1-w3', korean: '가', hangul: 'ga',         wordKorean: '가족',     wordZh: '家人' },
    { id: 'd40-v1-w4', korean: '족', hangul: 'jok',        wordKorean: '가족',     wordZh: '家人' },
    { id: 'd40-v1-w5', korean: '반', hangul: 'ban',        wordKorean: '반찬',     wordZh: '小菜' },
    { id: 'd40-v1-w6', korean: '찬', hangul: 'chan',       wordKorean: '반찬',     wordZh: '小菜' },
    { id: 'd40-v1-w7', korean: '다', hangul: 'da',         wordKorean: '다정하다', wordZh: '和蔼' },
    { id: 'd40-v1-w8', korean: '정', hangul: 'jeong',      wordKorean: '다정하다', wordZh: '和蔼' },
  ],

  dictation: [
    { id: 'd40-v1-d1', korean: '친구구나',           hangul: 'chin-gu-gu-na',              syllables: ['친', '구', '구', '나'],              zh: '原来是朋友啊' },
    { id: 'd40-v1-d2', korean: '많이 먹어요',         hangul: 'ma-ni meo-geo-yo',           syllables: ['많', '이', '먹', '어', '요'],         zh: '多吃点' },
    { id: 'd40-v1-d3', korean: '잘 먹었습니다',       hangul: 'jal meo-geo-sseum-ni-da',    syllables: ['잘', '먹', '었', '습', '니', '다'],   zh: '吃好了' },
  ],
};
