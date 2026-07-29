import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 73 · 3-1 단어 마스터 · 자갈치 활낙지 */
export const day73Vocab: VocabSubQuestData = {
  day: 13, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '자갈치 시장 8 个词',

  encounter: [
    { id: 'd73-v1-e1', korean: '시장',       hangul: 'si-jang',       zh: '市场',       pos: '名词',   example: { ko: '자갈치 시장이에요.',              zh: '是自갈치市场。' },        tip: '市(시) + 场(장) · 재래시장 = 传统市场',                                        tier: 'core' },
    { id: 'd73-v1-e2', korean: '낙지',       hangul: 'nak-ji',        zh: '章鱼（小）', pos: '名词',   example: { ko: '활낙지를 먹어요.',                  zh: '吃活章鱼。' },            tip: 'Day 73 主题词 · 활낙지 = 活章鱼（未死切段）',                                  tier: 'core' },
    { id: 'd73-v1-e3', korean: '맵다',       hangul: 'maep-da',       zh: '辣',         pos: '形容词', example: { ko: '진짜 매워요.',                       zh: '真的很辣。' },            tip: 'ㅂ 不规则 → 매워요 · 초장이 매워요',                                          tier: 'core' },
    { id: 'd73-v1-e4', korean: '눈물',       hangul: 'nun-mul',       zh: '眼泪',       pos: '名词',   example: { ko: '눈물이 났어요.',                      zh: '流泪了。' },              tip: '眼(눈) + 水(물) · 눈물이 나다 = 流泪',                                        tier: 'core' },
    { id: 'd73-v1-e5', korean: '초장',       hangul: 'cho-jang',      zh: '醋辣椒酱',   pos: '名词',   example: { ko: '초장에 찍어 먹어요.',                zh: '蘸醋辣椒酱吃。' },        tip: '醋(초) + 酱(장) · 회 / 낙지 蘸酱',                                            tier: 'core' },
    { id: 'd73-v1-e6', korean: '자마자',     hangul: 'ja-ma-ja',      zh: '一……就……',   pos: '语法',   example: { ko: '먹자마자 매워요.',                    zh: '一吃就辣。' },            tip: 'Day 73 主题词 · V + 자마자',                                                  tier: 'core' },
    { id: 'd73-v1-e7', korean: '움직이다',   hangul: 'um-ji-gi-da',   zh: '动 / 蠕动',  pos: '动词',   example: { ko: '낙지가 아직 움직여요.',              zh: '章鱼还在动。' },          tip: '활낙지 名场面 · 아직 움직이다',                                                tier: 'ext' },
    { id: 'd73-v1-e8', korean: '삼키다',      hangul: 'sam-ki-da',     zh: '吞下',        pos: '动词',   example: { ko: '삼키기 무서워요.',                    zh: '不敢吞下。' },            tip: '삼키다 vs 씹다（嚼）· 활낙지 场景',                                            tier: 'ext' },
  ],

  recognize: [
    { id: 'd73-v1-r1', korean: '시장',       hangul: 'si-jang',        choices: [{ zh: '市场',    correct: true }, { zh: '广场',       correct: false }, { zh: '商店',       correct: false }, { zh: '车站',       correct: false }] },
    { id: 'd73-v1-r2', korean: '낙지',       hangul: 'nak-ji',         choices: [{ zh: '章鱼（小）', correct: true }, { zh: '虾',        correct: false }, { zh: '蟹',         correct: false }, { zh: '鱼',         correct: false }] },
    { id: 'd73-v1-r3', korean: '맵다',       hangul: 'maep-da',        choices: [{ zh: '辣',      correct: true }, { zh: '咸',         correct: false }, { zh: '苦',         correct: false }, { zh: '甜',         correct: false }] },
    { id: 'd73-v1-r4', korean: '눈물',       hangul: 'nun-mul',        choices: [{ zh: '眼泪',    correct: true }, { zh: '汗水',       correct: false }, { zh: '雨水',       correct: false }, { zh: '口水',       correct: false }] },
    { id: 'd73-v1-r5', korean: '초장',       hangul: 'cho-jang',       choices: [{ zh: '醋辣椒酱', correct: true }, { zh: '酱油',       correct: false }, { zh: '芝麻油',     correct: false }, { zh: '大酱',       correct: false }] },
    { id: 'd73-v1-r6', korean: '움직이다',   hangul: 'um-ji-gi-da',    choices: [{ zh: '动 / 蠕动', correct: true }, { zh: '停止',    correct: false }, { zh: '躺下',       correct: false }, { zh: '睡觉',       correct: false }] },
  ],

  spell: [
    { id: 'd73-v1-s1', zhHint: '市场',    answer: ['시', '장'], syllables: ['시', '장', '시', '잔'] },
    { id: 'd73-v1-s2', zhHint: '章鱼',    answer: ['낙', '지'], syllables: ['낙', '지', '낚', '치'] },
    { id: 'd73-v1-s3', zhHint: '眼泪',    answer: ['눈', '물'], syllables: ['눈', '물', '눔', '물'] },
    { id: 'd73-v1-s4', zhHint: '醋辣椒酱', answer: ['초', '장'], syllables: ['초', '장', '조', '잔'] },
  ],

  write: [
    { id: 'd73-v1-w1', korean: '시', hangul: 'si',        wordKorean: '시장',      wordZh: '市场' },
    { id: 'd73-v1-w2', korean: '장', hangul: 'jang',      wordKorean: '시장',      wordZh: '市场' },
    { id: 'd73-v1-w3', korean: '낙', hangul: 'nak',       wordKorean: '낙지',      wordZh: '章鱼' },
    { id: 'd73-v1-w4', korean: '지', hangul: 'ji',        wordKorean: '낙지',      wordZh: '章鱼' },
    { id: 'd73-v1-w5', korean: '눈', hangul: 'nun',       wordKorean: '눈물',      wordZh: '眼泪' },
    { id: 'd73-v1-w6', korean: '물', hangul: 'mul',       wordKorean: '눈물',      wordZh: '眼泪' },
    { id: 'd73-v1-w7', korean: '초', hangul: 'cho',       wordKorean: '초장',      wordZh: '醋辣椒酱' },
    { id: 'd73-v1-w8', korean: '맵', hangul: 'maep',      wordKorean: '맵다',      wordZh: '辣' },
  ],

  dictation: [
    { id: 'd73-v1-d1', korean: '시장에 도착하자마자 회를 먹었어요',      hangul: 'si-jang-e do-cha-ka-ja-ma-ja hoe-reul meo-geo-sseo-yo', syllables: ['시', '장', '에', '도', '착', '하', '자', '마', '자', '회', '를', '먹', '었', '어', '요'], zh: '一到市场就吃了生鱼片' },
    { id: 'd73-v1-d2', korean: '한 입 먹자마자 매워서 눈물이 났어요',     hangul: 'han ip meok-ja-ma-ja mae-wo-seo nun-mu-ri na-sseo-yo', syllables: ['한', '입', '먹', '자', '마', '자', '매', '워', '서', '눈', '물', '이', '났', '어', '요'], zh: '一吃一口就辣得流泪' },
    { id: 'd73-v1-d3', korean: '낙지가 아직 움직여요',                        hangul: 'nak-ji-ga a-jik um-ji-gyeo-yo',                     syllables: ['낙', '지', '가', '아', '직', '움', '직', '여', '요'],  zh: '章鱼还在动' },
  ],
};
