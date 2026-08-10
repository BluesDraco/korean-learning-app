import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 73 · 3-1 단어 마스터 · 자갈치 활낙지 */
export const day73Vocab: VocabSubQuestData = {
  day: 13, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '자갈치 시장 8 个词', subtitleEn: '8 words from Jagalchi Market',

  encounter: [
    { id: 'd73-v1-e1', korean: '시장',       hangul: 'si-jang',       zh: '市场', zhEn: 'market',       pos: '名词', posEn: 'Noun',   example: { ko: '자갈치 시장이에요.',              zh: '是自갈치市场。', zhEn: 'It\'s Jagalchi Market.' },        tip: '市(시) + 场(장) · 재래시장 = 传统市场', tipEn: 'Market (시) + field (장) · 재래시장 = traditional market',                                        tier: 'core' },
    { id: 'd73-v1-e2', korean: '낙지',       hangul: 'nak-ji',        zh: '章鱼（小）', zhEn: 'Octopus (small)', pos: '名词', posEn: 'Noun',   example: { ko: '활낙지를 먹어요.',                  zh: '吃活章鱼。', zhEn: 'Eat live octopus.' },            tip: 'Day 73 主题词 · 활낙지 = 活章鱼（未死切段）', tipEn: 'Day 73 keyword · 활낙지 = live octopus (cut while still alive)',                                  tier: 'core' },
    { id: 'd73-v1-e3', korean: '맵다',       hangul: 'maep-da',       zh: '辣', zhEn: 'spicy',         pos: '形容词', posEn: 'Adjective.', example: { ko: '진짜 매워요.',                       zh: '真的很辣。', zhEn: 'It\'s really spicy.' },            tip: 'ㅂ 不规则 → 매워요 · 초장이 매워요', tipEn: 'ㅂ irregular → 매워요 · the chili sauce is spicy',                                          tier: 'core' },
    { id: 'd73-v1-e4', korean: '눈물',       hangul: 'nun-mul',       zh: '眼泪', zhEn: 'Tears',       pos: '名词', posEn: 'Noun',   example: { ko: '눈물이 났어요.',                      zh: '流泪了。', zhEn: 'Tears flowed.' },              tip: '眼(눈) + 水(물) · 눈물이 나다 = 流泪', tipEn: 'Eye (눈) + water (물) · 눈물이 나다 = to shed tears',                                        tier: 'core' },
    { id: 'd73-v1-e5', korean: '초장',       hangul: 'cho-jang',      zh: '醋辣椒酱', zhEn: 'vinegar chili sauce',   pos: '名词', posEn: 'Noun',   example: { ko: '초장에 찍어 먹어요.',                zh: '蘸醋辣椒酱吃。', zhEn: 'Dip in vinegar chili sauce and eat.' },        tip: '醋(초) + 酱(장) · 회 / 낙지 蘸酱', tipEn: 'Vinegar (초) + sauce (장) · dipping sauce for sashimi / octopus',                                            tier: 'core' },
    { id: 'd73-v1-e6', korean: '자마자',     hangul: 'ja-ma-ja',      zh: '一……就……', zhEn: 'As soon as...',   pos: '语法', posEn: 'Grammar',   example: { ko: '먹자마자 매워요.',                    zh: '一吃就辣。', zhEn: 'It\'s spicy as soon as you eat it.' },            tip: 'Day 73 主题词 · V + 자마자', tipEn: 'Day 73 keyword · V + 자마자',                                                  tier: 'core' },
    { id: 'd73-v1-e7', korean: '움직이다',   hangul: 'um-ji-gi-da',   zh: '动 / 蠕动', zhEn: 'Move / squirm',  pos: '动词', posEn: 'Verb',   example: { ko: '낙지가 아직 움직여요.',              zh: '章鱼还在动。', zhEn: 'The octopus is still moving.' },          tip: '활낙지 名场面 · 아직 움직이다', tipEn: 'The iconic live octopus scene · still moving',                                                tier: 'ext' },
    { id: 'd73-v1-e8', korean: '삼키다',      hangul: 'sam-ki-da',     zh: '吞下', zhEn: 'Swallow',        pos: '动词', posEn: 'Verb',   example: { ko: '삼키기 무서워요.',                    zh: '不敢吞下。', zhEn: 'Don\'t dare swallow it.' },            tip: '삼키다 vs 씹다（嚼）· 활낙지 场景', tipEn: 'Swallow vs. chew · live octopus scene',                                            tier: 'ext' },
  ],

  recognize: [
    { id: 'd73-v1-r1', korean: '시장',       hangul: 'si-jang',        choices: [{ zh: '市场', zhEn: 'market',    correct: true }, { zh: '广场', zhEn: 'plaza',       correct: false }, { zh: '商店', zhEn: 'Store',       correct: false }, { zh: '车站', zhEn: 'station',       correct: false }] },
    { id: 'd73-v1-r2', korean: '낙지',       hangul: 'nak-ji',         choices: [{ zh: '章鱼（小）', zhEn: 'Octopus (small)', correct: true }, { zh: '虾', zhEn: 'Shrimp',        correct: false }, { zh: '蟹', zhEn: 'Crab',         correct: false }, { zh: '鱼', zhEn: 'Fish',         correct: false }] },
    { id: 'd73-v1-r3', korean: '맵다',       hangul: 'maep-da',        choices: [{ zh: '辣', zhEn: 'spicy',      correct: true }, { zh: '咸', zhEn: 'salty',         correct: false }, { zh: '苦', zhEn: 'Bitter',         correct: false }, { zh: '甜', zhEn: 'sweet',         correct: false }] },
    { id: 'd73-v1-r4', korean: '눈물',       hangul: 'nun-mul',        choices: [{ zh: '眼泪', zhEn: 'Tears',    correct: true }, { zh: '汗水', zhEn: 'sweat',       correct: false }, { zh: '雨水', zhEn: 'Rainwater',       correct: false }, { zh: '口水', zhEn: 'Saliva',       correct: false }] },
    { id: 'd73-v1-r5', korean: '초장',       hangul: 'cho-jang',       choices: [{ zh: '醋辣椒酱', zhEn: 'vinegar chili sauce', correct: true }, { zh: '酱油', zhEn: 'soy sauce',       correct: false }, { zh: '芝麻油', zhEn: 'sesame oil',     correct: false }, { zh: '大酱', zhEn: 'doenjang (soybean paste)',       correct: false }] },
    { id: 'd73-v1-r6', korean: '움직이다',   hangul: 'um-ji-gi-da',    choices: [{ zh: '动 / 蠕动', zhEn: 'Move / squirm', correct: true }, { zh: '停止', zhEn: 'stop',    correct: false }, { zh: '躺下', zhEn: 'lie down',       correct: false }, { zh: '睡觉', zhEn: 'sleep',       correct: false }] },
  ],

  spell: [
    { id: 'd73-v1-s1', zhHint: '市场', zhHintEn: 'market',    answer: ['시', '장'], syllables: ['시', '장', '시', '잔'] },
    { id: 'd73-v1-s2', zhHint: '章鱼', zhHintEn: 'octopus',    answer: ['낙', '지'], syllables: ['낙', '지', '낚', '치'] },
    { id: 'd73-v1-s3', zhHint: '眼泪', zhHintEn: 'Tears',    answer: ['눈', '물'], syllables: ['눈', '물', '눔', '물'] },
    { id: 'd73-v1-s4', zhHint: '醋辣椒酱', zhHintEn: 'vinegar chili sauce', answer: ['초', '장'], syllables: ['초', '장', '조', '잔'] },
  ],

  write: [
    { id: 'd73-v1-w1', korean: '시', hangul: 'si',        wordKorean: '시장',      wordZh: '市场', wordZhEn: 'market' },
    { id: 'd73-v1-w2', korean: '장', hangul: 'jang',      wordKorean: '시장',      wordZh: '市场', wordZhEn: 'market' },
    { id: 'd73-v1-w3', korean: '낙', hangul: 'nak',       wordKorean: '낙지',      wordZh: '章鱼', wordZhEn: 'octopus' },
    { id: 'd73-v1-w4', korean: '지', hangul: 'ji',        wordKorean: '낙지',      wordZh: '章鱼', wordZhEn: 'octopus' },
    { id: 'd73-v1-w5', korean: '눈', hangul: 'nun',       wordKorean: '눈물',      wordZh: '眼泪', wordZhEn: 'Tears' },
    { id: 'd73-v1-w6', korean: '물', hangul: 'mul',       wordKorean: '눈물',      wordZh: '眼泪', wordZhEn: 'Tears' },
    { id: 'd73-v1-w7', korean: '초', hangul: 'cho',       wordKorean: '초장',      wordZh: '醋辣椒酱', wordZhEn: 'vinegar chili sauce' },
    { id: 'd73-v1-w8', korean: '맵', hangul: 'maep',      wordKorean: '맵다',      wordZh: '辣', wordZhEn: 'spicy' },
  ],

  dictation: [
    { id: 'd73-v1-d1', korean: '시장에 도착하자마자 회를 먹었어요',      hangul: 'si-jang-e do-cha-ka-ja-ma-ja hoe-reul meo-geo-sseo-yo', syllables: ['시', '장', '에', '도', '착', '하', '자', '마', '자', '회', '를', '먹', '었', '어', '요'], zh: '一到市场就吃了生鱼片', zhEn: 'As soon as I got to the market, I ate raw fish.' },
    { id: 'd73-v1-d2', korean: '한 입 먹자마자 매워서 눈물이 났어요',     hangul: 'han ip meok-ja-ma-ja mae-wo-seo nun-mu-ri na-sseo-yo', syllables: ['한', '입', '먹', '자', '마', '자', '매', '워', '서', '눈', '물', '이', '났', '어', '요'], zh: '一吃一口就辣得流泪', zhEn: 'One bite and it\'s so spicy it makes you cry.' },
    { id: 'd73-v1-d3', korean: '낙지가 아직 움직여요',                        hangul: 'nak-ji-ga a-jik um-ji-gyeo-yo',                     syllables: ['낙', '지', '가', '아', '직', '움', '직', '여', '요'],  zh: '章鱼还在动', zhEn: 'The octopus is still moving.' },
  ],
};
