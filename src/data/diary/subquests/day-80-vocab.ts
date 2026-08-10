import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 80 · 3-1 단어 마스터 · Haru生病·照顾朋友 · ~아/어 줄게 + 症状并列 */
export const day80Vocab: VocabSubQuestData = {
  day: 20, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '간병·증상 8 个词', subtitleEn: 'Caregiving & symptoms: 8 words',

  encounter: [
    { id: 'd80-v1-e1', korean: '아프다',     hangul: 'a-peu-da',       zh: '疼 / 生病', zhEn: 'Pain / Sick',   pos: '形容词', posEn: 'Adjective.', example: { ko: '하루가 아파요.',                zh: 'Haru 生病了。', zhEn: 'Haru is sick.' },      tip: 'Day 80 主题词 · 으 脱落: 아프다 → 아파요', tipEn: 'Day 80 Theme words · 으 drop: 아프다 → 아파요',                            tier: 'core' },
    { id: 'd80-v1-e2', korean: '열',         hangul: 'yeol',           zh: '发烧 / 热', zhEn: 'Fever / heat.',   pos: '名词', posEn: 'Noun',   example: { ko: '열이 나요.',                    zh: '发烧了。', zhEn: 'I have a fever.' },            tip: '单音节名词 · 열이 나다 = 发烧', tipEn: 'Single-syllable noun · 열이 나다 = to have a fever',                                        tier: 'core' },
    { id: 'd80-v1-e3', korean: '증상',       hangul: 'jeung-sang',     zh: '症状', zhEn: 'symptoms',        pos: '名词', posEn: 'Noun',   example: { ko: '증상을 설명했어요.',            zh: '说明了症状。', zhEn: 'Described the symptoms.' },        tip: '症(증) + 状(상)', tipEn: '症 (증) + 状 (상)',                                                      tier: 'core' },
    { id: 'd80-v1-e4', korean: '체온',       hangul: 'che-on',         zh: '体温', zhEn: 'body temperature',        pos: '名词', posEn: 'Noun',   example: { ko: '체온을 쟀어요.',                zh: '量了体温。', zhEn: 'Took the temperature.' },          tip: '体(체) + 温(온) · 체온을 재다 = 量体温', tipEn: 'Body (체) + temperature (온) · 체온을 재다 = to take temperature',                              tier: 'core' },
    { id: 'd80-v1-e5', korean: '챙기다',     hangul: 'chaeng-gi-da',   zh: '照顾 / 关心', zhEn: 'Care / Concern', pos: '动词', posEn: 'Verb',   example: { ko: '친구를 챙겨줬어요.',            zh: '照顾了朋友。', zhEn: 'Took care of a friend.' },        tip: '챙기다 → 챙겨요 / 챙겨주다 = 为…张罗照料', tipEn: '챙기다 → 챙겨요 / 챙겨주다 = to look after someone',                            tier: 'core' },
    { id: 'd80-v1-e6', korean: '콧물',       hangul: 'kon-mul',        zh: '鼻涕', zhEn: 'runny nose',        pos: '名词', posEn: 'Noun',   example: { ko: '콧물이 나요.',                  zh: '流鼻涕。', zhEn: 'I have a runny nose.' },            tip: 'Day 13 学过 · 코(鼻) + 물(水) · 발음 [콘물]', tipEn: 'Learned on Day 13 · 코(nose) + 물(water) · pronounced [콘물]',                        tier: 'core' },
    { id: 'd80-v1-e7', korean: '감기약',     hangul: 'gam-gi-yak',     zh: '感冒药', zhEn: 'Cold medicine',      pos: '名词', posEn: 'Noun',   example: { ko: '감기약을 먹었어요.',            zh: '吃了感冒药。', zhEn: 'Took cold medicine.' },        tip: '감기(感气=感冒) + 약(药)', tipEn: '감기(cold) + 약(medicine)',                                            tier: 'ext' },
    { id: 'd80-v1-e8', korean: '푹 자다',     hangul: 'puk ja-da',      zh: '好好睡', zhEn: 'Sleep well',      pos: '表达', posEn: 'Expression',   example: { ko: '푹 자세요.',                    zh: '好好睡。', zhEn: 'Sleep well.' },            tip: '푹 = 充分地 · 병상 인사 필수', tipEn: '푹 = fully · Essential for sickbed greetings',                                        tier: 'ext' },
  ],

  recognize: [
    { id: 'd80-v1-r1', korean: '아프다',     hangul: 'a-peu-da',       choices: [{ zh: '疼 / 生病', zhEn: 'Pain / Sick',   correct: true }, { zh: '健康', zhEn: 'health',    correct: false }, { zh: '累', zhEn: 'Tired',      correct: false }, { zh: '饿', zhEn: 'hungry',      correct: false }] },
    { id: 'd80-v1-r2', korean: '열',         hangul: 'yeol',           choices: [{ zh: '发烧 / 热', zhEn: 'Fever / heat.',   correct: true }, { zh: '咳嗽', zhEn: 'cough',    correct: false }, { zh: '头', zhEn: 'head',      correct: false }, { zh: '药', zhEn: 'medicine',      correct: false }] },
    { id: 'd80-v1-r3', korean: '증상',       hangul: 'jeung-sang',     choices: [{ zh: '症状', zhEn: 'symptoms',        correct: true }, { zh: '证据', zhEn: 'evidence',    correct: false }, { zh: '处方', zhEn: 'prescription',    correct: false }, { zh: '体检', zhEn: 'Health checkup',    correct: false }] },
    { id: 'd80-v1-r4', korean: '체온',       hangul: 'che-on',         choices: [{ zh: '体温', zhEn: 'body temperature',        correct: true }, { zh: '血压', zhEn: 'blood pressure',    correct: false }, { zh: '气温', zhEn: 'temperature',    correct: false }, { zh: '体重', zhEn: 'weight',    correct: false }] },
    { id: 'd80-v1-r5', korean: '챙기다',     hangul: 'chaeng-gi-da',   choices: [{ zh: '照顾 / 关心', zhEn: 'Care / Concern', correct: true }, { zh: '忘记', zhEn: 'Forget',    correct: false }, { zh: '扔掉', zhEn: 'Throw away',    correct: false }, { zh: '责怪', zhEn: 'Blame',    correct: false }] },
    { id: 'd80-v1-r6', korean: '콧물',       hangul: 'kon-mul',        choices: [{ zh: '鼻涕', zhEn: 'runny nose',        correct: true }, { zh: '眼泪', zhEn: 'Tears',    correct: false }, { zh: '汗', zhEn: 'sweat',      correct: false }, { zh: '口水', zhEn: 'Saliva',    correct: false }] },
  ],

  spell: [
    { id: 'd80-v1-s1', zhHint: '症状', zhHintEn: 'symptoms',    answer: ['증', '상'], syllables: ['증', '상', '즘', '산'] },
    { id: 'd80-v1-s2', zhHint: '体温', zhHintEn: 'body temperature',    answer: ['체', '온'], syllables: ['체', '온', '채', '운'] },
    { id: 'd80-v1-s3', zhHint: '感冒药', zhHintEn: 'Cold medicine',  answer: ['감', '기', '약'], syllables: ['감', '기', '약', '검', '역'] },
    { id: 'd80-v1-s4', zhHint: '鼻涕', zhHintEn: 'runny nose',    answer: ['콧', '물'], syllables: ['콧', '물', '콘', '불'] },
  ],

  write: [
    { id: 'd80-v1-w1', korean: '증', hangul: 'jeung',    wordKorean: '증상',       wordZh: '症状', wordZhEn: 'symptoms' },
    { id: 'd80-v1-w2', korean: '상', hangul: 'sang',     wordKorean: '증상',       wordZh: '症状', wordZhEn: 'symptoms' },
    { id: 'd80-v1-w3', korean: '체', hangul: 'che',      wordKorean: '체온',       wordZh: '体温', wordZhEn: 'body temperature' },
    { id: 'd80-v1-w4', korean: '온', hangul: 'on',       wordKorean: '체온',       wordZh: '体温', wordZhEn: 'body temperature' },
    { id: 'd80-v1-w5', korean: '감', hangul: 'gam',      wordKorean: '감기약',     wordZh: '感冒药', wordZhEn: 'Cold medicine' },
    { id: 'd80-v1-w6', korean: '챙', hangul: 'chaeng',   wordKorean: '챙기다',     wordZh: '照顾', wordZhEn: 'take care of' },
    { id: 'd80-v1-w7', korean: '콧', hangul: 'kot',      wordKorean: '콧물',       wordZh: '鼻涕', wordZhEn: 'runny nose' },
    { id: 'd80-v1-w8', korean: '열', hangul: 'yeol',     wordKorean: '열',         wordZh: '发烧', wordZhEn: 'fever' },
  ],

  dictation: [
    { id: 'd80-v1-d1', korean: '머리가 아프고 열이 나요',        hangul: 'meo-ri-ga a-peu-go yeo-ri na-yo',            syllables: ['머', '리', '가', '아', '프', '고', '열', '이', '나', '요'], zh: '头疼、发烧', zhEn: 'Headache, fever' },
    { id: 'd80-v1-d2', korean: '내가 챙겨줄게',                  hangul: 'nae-ga chaeng-gyeo-jul-ge',                  syllables: ['내', '가', '챙', '겨', '줄', '게'], zh: '我来照顾你', zhEn: 'I\'ll take care of you' },
    { id: 'd80-v1-d3', korean: '약 먹고 푹 자',                  hangul: 'yak meok-go puk ja',                         syllables: ['약', '먹', '고', '푹', '자'], zh: '吃药好好睡', zhEn: 'Take medicine and sleep well' },
  ],
};
