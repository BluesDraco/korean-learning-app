import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 80 · 3-1 단어 마스터 · Haru生病·照顾朋友 · ~아/어 줄게 + 症状并列 */
export const day80Vocab: VocabSubQuestData = {
  day: 20, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '간병·증상 8 个词',

  encounter: [
    { id: 'd80-v1-e1', korean: '아프다',     hangul: 'a-peu-da',       zh: '疼 / 生病',   pos: '形容词', example: { ko: '하루가 아파요.',                zh: 'Haru 生病了。' },      tip: 'Day 80 主题词 · 으 脱落: 아프다 → 아파요',                            tier: 'core' },
    { id: 'd80-v1-e2', korean: '열',         hangul: 'yeol',           zh: '发烧 / 热',   pos: '名词',   example: { ko: '열이 나요.',                    zh: '发烧了。' },            tip: '单音节名词 · 열이 나다 = 发烧',                                        tier: 'core' },
    { id: 'd80-v1-e3', korean: '증상',       hangul: 'jeung-sang',     zh: '症状',        pos: '名词',   example: { ko: '증상을 설명했어요.',            zh: '说明了症状。' },        tip: '症(증) + 状(상)',                                                      tier: 'core' },
    { id: 'd80-v1-e4', korean: '체온',       hangul: 'che-on',         zh: '体温',        pos: '名词',   example: { ko: '체온을 쟀어요.',                zh: '量了体温。' },          tip: '体(체) + 温(온) · 체온을 재다 = 量体温',                              tier: 'core' },
    { id: 'd80-v1-e5', korean: '챙기다',     hangul: 'chaeng-gi-da',   zh: '照顾 / 关心', pos: '动词',   example: { ko: '친구를 챙겨줬어요.',            zh: '照顾了朋友。' },        tip: '챙기다 → 챙겨요 / 챙겨주다 = 为…张罗照料',                            tier: 'core' },
    { id: 'd80-v1-e6', korean: '콧물',       hangul: 'kon-mul',        zh: '鼻涕',        pos: '名词',   example: { ko: '콧물이 나요.',                  zh: '流鼻涕。' },            tip: 'Day 13 学过 · 코(鼻) + 물(水) · 발음 [콘물]',                        tier: 'core' },
    { id: 'd80-v1-e7', korean: '감기약',     hangul: 'gam-gi-yak',     zh: '感冒药',      pos: '名词',   example: { ko: '감기약을 먹었어요.',            zh: '吃了感冒药。' },        tip: '감기(感气=感冒) + 약(药)',                                            tier: 'ext' },
    { id: 'd80-v1-e8', korean: '푹 자다',     hangul: 'puk ja-da',      zh: '好好睡',      pos: '表达',   example: { ko: '푹 자세요.',                    zh: '好好睡。' },            tip: '푹 = 充分地 · 병상 인사 필수',                                        tier: 'ext' },
  ],

  recognize: [
    { id: 'd80-v1-r1', korean: '아프다',     hangul: 'a-peu-da',       choices: [{ zh: '疼 / 生病',   correct: true }, { zh: '健康',    correct: false }, { zh: '累',      correct: false }, { zh: '饿',      correct: false }] },
    { id: 'd80-v1-r2', korean: '열',         hangul: 'yeol',           choices: [{ zh: '发烧 / 热',   correct: true }, { zh: '咳嗽',    correct: false }, { zh: '头',      correct: false }, { zh: '药',      correct: false }] },
    { id: 'd80-v1-r3', korean: '증상',       hangul: 'jeung-sang',     choices: [{ zh: '症状',        correct: true }, { zh: '证据',    correct: false }, { zh: '处方',    correct: false }, { zh: '体检',    correct: false }] },
    { id: 'd80-v1-r4', korean: '체온',       hangul: 'che-on',         choices: [{ zh: '体温',        correct: true }, { zh: '血压',    correct: false }, { zh: '气温',    correct: false }, { zh: '体重',    correct: false }] },
    { id: 'd80-v1-r5', korean: '챙기다',     hangul: 'chaeng-gi-da',   choices: [{ zh: '照顾 / 关心', correct: true }, { zh: '忘记',    correct: false }, { zh: '扔掉',    correct: false }, { zh: '责怪',    correct: false }] },
    { id: 'd80-v1-r6', korean: '콧물',       hangul: 'kon-mul',        choices: [{ zh: '鼻涕',        correct: true }, { zh: '眼泪',    correct: false }, { zh: '汗',      correct: false }, { zh: '口水',    correct: false }] },
  ],

  spell: [
    { id: 'd80-v1-s1', zhHint: '症状',    answer: ['증', '상'], syllables: ['증', '상', '즘', '산'] },
    { id: 'd80-v1-s2', zhHint: '体温',    answer: ['체', '온'], syllables: ['체', '온', '채', '운'] },
    { id: 'd80-v1-s3', zhHint: '感冒药',  answer: ['감', '기', '약'], syllables: ['감', '기', '약', '검', '역'] },
    { id: 'd80-v1-s4', zhHint: '鼻涕',    answer: ['콧', '물'], syllables: ['콧', '물', '콘', '불'] },
  ],

  write: [
    { id: 'd80-v1-w1', korean: '증', hangul: 'jeung',    wordKorean: '증상',       wordZh: '症状' },
    { id: 'd80-v1-w2', korean: '상', hangul: 'sang',     wordKorean: '증상',       wordZh: '症状' },
    { id: 'd80-v1-w3', korean: '체', hangul: 'che',      wordKorean: '체온',       wordZh: '体温' },
    { id: 'd80-v1-w4', korean: '온', hangul: 'on',       wordKorean: '체온',       wordZh: '体温' },
    { id: 'd80-v1-w5', korean: '감', hangul: 'gam',      wordKorean: '감기약',     wordZh: '感冒药' },
    { id: 'd80-v1-w6', korean: '챙', hangul: 'chaeng',   wordKorean: '챙기다',     wordZh: '照顾' },
    { id: 'd80-v1-w7', korean: '콧', hangul: 'kot',      wordKorean: '콧물',       wordZh: '鼻涕' },
    { id: 'd80-v1-w8', korean: '열', hangul: 'yeol',     wordKorean: '열',         wordZh: '发烧' },
  ],

  dictation: [
    { id: 'd80-v1-d1', korean: '머리가 아프고 열이 나요',        hangul: 'meo-ri-ga a-peu-go yeo-ri na-yo',            syllables: ['머', '리', '가', '아', '프', '고', '열', '이', '나', '요'], zh: '头疼、发烧' },
    { id: 'd80-v1-d2', korean: '내가 챙겨줄게',                  hangul: 'nae-ga chaeng-gyeo-jul-ge',                  syllables: ['내', '가', '챙', '겨', '줄', '게'], zh: '我来照顾你' },
    { id: 'd80-v1-d3', korean: '약 먹고 푹 자',                  hangul: 'yak meok-go puk ja',                         syllables: ['약', '먹', '고', '푹', '자'], zh: '吃药好好睡' },
  ],
};
