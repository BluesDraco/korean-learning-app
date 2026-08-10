import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 84 · 3-1 단어 마스터 · 公开演讲·勇气胡萝卜 · A 아니에요, B이에요 */
export const day84Vocab: VocabSubQuestData = {
  day: 24, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '연설·무대 8 个词', subtitleEn: 'Speech & Stage 8 Words',

  encounter: [
    { id: 'd84-v1-e1', korean: '연설',       hangul: 'yeon-seol',      zh: '演讲', zhEn: 'Speech',        pos: '名词', posEn: 'Noun',   example: { ko: '공개 연설이에요.',              zh: '是公开演讲。', zhEn: 'It\'s a public speech.' },        tip: 'Day 84 主题词 · 演(연) + 说(설) · 연설하다 = 演讲', tipEn: 'Day 84 Theme Word · 演(연) + 说(설) · 연설하다 = to give a speech',                    tier: 'core' },
    { id: 'd84-v1-e2', korean: '원고',       hangul: 'won-go',         zh: '稿子', zhEn: 'script/draft',        pos: '名词', posEn: 'Noun',   example: { ko: '원고 없이 말했어요.',            zh: '不看稿子说了。', zhEn: 'Spoke without looking at the script.' },      tip: '原(원) + 稿(고) · 원고를 내려놓다 = 放下稿子', tipEn: '原(원) + 稿(고) · 원고를 내려놓다 = to put down the script',                        tier: 'core' },
    { id: 'd84-v1-e3', korean: '무대',       hangul: 'mu-dae',         zh: '舞台', zhEn: 'Stage',        pos: '名词', posEn: 'Noun',   example: { ko: '무대에 섰어요.',                zh: '站上了舞台。', zhEn: 'She stepped onto the stage.' },        tip: '舞(무) + 台(대) · 무대에 서다 = 登台', tipEn: '舞(무) + 台(대) · 무대에 서다 = to go on stage',                                tier: 'core' },
    { id: 'd84-v1-e4', korean: '심사위원',   hangul: 'sim-sa-wi-won',  zh: '评委', zhEn: 'Judges',        pos: '名词', posEn: 'Noun',   example: { ko: '심사위원이 다섯 명이었어요.',    zh: '有5位评委。', zhEn: 'There are 5 judges.' },        tip: '审(심) + 查(사) + 委(위) + 员(원)', tipEn: '심 + 사 + 위 + 원 (review committee)',                                    tier: 'core' },
    { id: 'd84-v1-e5', korean: '잊어버리다', hangul: 'i-jeo-beo-ri-da', zh: '忘光 / 忘掉', zhEn: 'To completely forget / to forget', pos: '动词', posEn: 'Verb',   example: { ko: '준비한 문장을 잊어버렸어요.',    zh: '把准备的句子忘了。', zhEn: 'Forgot the prepared sentences.' },  tip: 'Day 63 学过 · 잊다 + 아/어 버리다 = 彻底忘掉', tipEn: 'Learned on Day 63 · 잊다 + 아/어 버리다 = to completely forget',                        tier: 'core' },
    { id: 'd84-v1-e6', korean: '데려오다',   hangul: 'de-ryeo-o-da',   zh: '带来（人）', zhEn: 'To bring (someone)',  pos: '动词', posEn: 'Verb',   example: { ko: '그 작은 게 저를 데려왔어요.',    zh: '那小东西把我带到了这里。', zhEn: 'That little thing brought me here.' }, tip: 'Day 76 学过 · 데리다 + 오다 · 情感表达高潮', tipEn: 'Learned on Day 76 · 데리다 + 오다 · Emotional expression climax',                          tier: 'core' },
    { id: 'd84-v1-e7', korean: '관객',       hangul: 'gwan-gaek',      zh: '观众', zhEn: 'audience',        pos: '名词', posEn: 'Noun',   example: { ko: '관객이 삼백 명이었어요.',        zh: '有300名观众。', zhEn: 'There are 300 audience members.' },      tip: '观(관) + 客(객)', tipEn: 'View (관) + Guest (객)',                                                      tier: 'ext' },
    { id: 'd84-v1-e8', korean: '박수',       hangul: 'bak-su',         zh: '掌声 / 鼓掌', zhEn: 'Applause / Clapping', pos: '名词', posEn: 'Noun',   example: { ko: '박수가 터졌어요.',              zh: '掌声爆发了。', zhEn: 'Applause erupted.' },        tip: '拍(박) + 手(수) · 박수를 치다 = 鼓掌', tipEn: 'Clap (박) + hand (수) · 박수를 치다 = to applaud',                                tier: 'ext' },
  ],

  recognize: [
    { id: 'd84-v1-r1', korean: '연설',       hangul: 'yeon-seol',      choices: [{ zh: '演讲', zhEn: 'Speech',        correct: true }, { zh: '演出', zhEn: 'Performance',    correct: false }, { zh: '演员', zhEn: 'actor',    correct: false }, { zh: '解说', zhEn: 'Commentary',    correct: false }] },
    { id: 'd84-v1-r2', korean: '원고',       hangul: 'won-go',         choices: [{ zh: '稿子', zhEn: 'script/draft',        correct: true }, { zh: '原因', zhEn: 'reason',    correct: false }, { zh: '愿望', zhEn: 'Wish',    correct: false }, { zh: '广告', zhEn: 'advertisement',    correct: false }] },
    { id: 'd84-v1-r3', korean: '무대',       hangul: 'mu-dae',         choices: [{ zh: '舞台', zhEn: 'Stage',        correct: true }, { zh: '后台', zhEn: 'backstage',    correct: false }, { zh: '观众席', zhEn: 'audience seating',  correct: false }, { zh: '座位', zhEn: 'seat',    correct: false }] },
    { id: 'd84-v1-r4', korean: '심사위원',   hangul: 'sim-sa-wi-won',  choices: [{ zh: '评委', zhEn: 'Judges',        correct: true }, { zh: '选手', zhEn: 'Player',    correct: false }, { zh: '主持人', zhEn: 'host',  correct: false }, { zh: '观众', zhEn: 'audience',    correct: false }] },
    { id: 'd84-v1-r5', korean: '잊어버리다', hangul: 'i-jeo-beo-ri-da', choices: [{ zh: '忘光 / 忘掉', zhEn: 'To completely forget / to forget', correct: true }, { zh: '记住', zhEn: 'Remember.',    correct: false }, { zh: '想起', zhEn: 'to recall',    correct: false }, { zh: '丢失', zhEn: 'Lost',    correct: false }] },
    { id: 'd84-v1-r6', korean: '박수',       hangul: 'bak-su',         choices: [{ zh: '掌声 / 鼓掌', zhEn: 'Applause / Clapping', correct: true }, { zh: '握手', zhEn: 'Handshake',    correct: false }, { zh: '挥手', zhEn: 'Wave',    correct: false }, { zh: '拍照', zhEn: 'Take a photo',    correct: false }] },
  ],

  spell: [
    { id: 'd84-v1-s1', zhHint: '演讲', zhHintEn: 'Speech',    answer: ['연', '설'], syllables: ['연', '설', '염', '절'] },
    { id: 'd84-v1-s2', zhHint: '舞台', zhHintEn: 'Stage',    answer: ['무', '대'], syllables: ['무', '대', '모', '테'] },
    { id: 'd84-v1-s3', zhHint: '观众', zhHintEn: 'audience',    answer: ['관', '객'], syllables: ['관', '객', '간', '격'] },
    { id: 'd84-v1-s4', zhHint: '掌声', zhHintEn: 'Applause',    answer: ['박', '수'], syllables: ['박', '수', '밖', '소'] },
  ],

  write: [
    { id: 'd84-v1-w1', korean: '연', hangul: 'yeon',     wordKorean: '연설',       wordZh: '演讲', wordZhEn: 'Speech' },
    { id: 'd84-v1-w2', korean: '설', hangul: 'seol',     wordKorean: '연설',       wordZh: '演讲', wordZhEn: 'Speech' },
    { id: 'd84-v1-w3', korean: '원', hangul: 'won',      wordKorean: '원고',       wordZh: '稿子', wordZhEn: 'script/draft' },
    { id: 'd84-v1-w4', korean: '고', hangul: 'go',       wordKorean: '원고',       wordZh: '稿子', wordZhEn: 'script/draft' },
    { id: 'd84-v1-w5', korean: '무', hangul: 'mu',       wordKorean: '무대',       wordZh: '舞台', wordZhEn: 'Stage' },
    { id: 'd84-v1-w6', korean: '관', hangul: 'gwan',     wordKorean: '관객',       wordZh: '观众', wordZhEn: 'audience' },
    { id: 'd84-v1-w7', korean: '박', hangul: 'bak',      wordKorean: '박수',       wordZh: '掌声', wordZhEn: 'Applause' },
    { id: 'd84-v1-w8', korean: '무', hangul: 'mu',       wordKorean: '무대',       wordZh: '舞台', wordZhEn: 'Stage' },
  ],

  dictation: [
    { id: 'd84-v1-d1', korean: '용기는 큰 게 아니에요',          hangul: 'yong-gi-neun keun ge a-ni-e-yo',             syllables: ['용', '기', '는', '큰', '게', '아', '니', '에', '요'], zh: '勇气不是大的', zhEn: 'Courage isn\'t big' },
    { id: 'd84-v1-d2', korean: '작은 거예요',                    hangul: 'ja-geun geo-ye-yo',                          syllables: ['작', '은', '거', '예', '요'], zh: '是小的', zhEn: 'It\'s small' },
    { id: 'd84-v1-d3', korean: '원고 없이 말했어요',              hangul: 'won-go eop-si mal-hae-sseo-yo',              syllables: ['원', '고', '없', '이', '말', '했', '어', '요'], zh: '不看稿子说了', zhEn: 'Spoke without looking at the script' },
  ],
};
