import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 49 · 화해 · 词汇子关卡 */
export const day49Vocab: VocabSubQuestData = {
  day: 19, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '调解真心话的 8 个词', subtitleEn: '8 words for heartfelt mediation',

  encounter: [
    { id: 'd49-v1-e1', korean: '싸우다',      hangul: 'ssa-u-da',      zh: '吵架 / 打架', zhEn: 'argue / fight', pos: '动词', posEn: 'Verb',   example: { ko: '민지랑 준호가 싸웠어요.',   zh: 'Minji 和 Junho 吵架了。', zhEn: 'Minji and Junho argued.' }, tip: '~와/과 싸우다 · 과거 싸웠어요',                                 tier: 'core' },
    { id: 'd49-v1-e2', korean: '사과하다',    hangul: 'sa-gwa-ha-da',  zh: '道歉', zhEn: 'to apologize',        pos: '动词', posEn: 'Verb',   example: { ko: '먼저 사과했어요.',            zh: '先道歉了。', zhEn: 'Apologized first.' },                tip: '사과 = 道歉 / 苹果（同名，注意语境）', tipEn: '사과 = apology / apple (same word, note the context)',                          tier: 'core' },
    { id: 'd49-v1-e3', korean: '화해하다',    hangul: 'hwa-hae-ha-da', zh: '和好', zhEn: 'to make up',        pos: '动词', posEn: 'Verb',   example: { ko: '두 사람이 화해했어요.',      zh: '两人和好了。', zhEn: 'The two made up.' },              tip: '和(화) + 解(해) + 하다', tipEn: '和解 (화해) + 하다',                                       tier: 'core' },
    { id: 'd49-v1-e4', korean: '진심',        hangul: 'jin-sim',       zh: '真心', zhEn: 'Sincere heart',        pos: '名词', posEn: 'Noun',   example: { ko: '진심으로 미안해.',            zh: '真心抱歉。', zhEn: 'I\'m truly sorry.' },                tip: '真(진) + 心(심) · 진심으로 = 真心地', tipEn: '真心 (진심) · 진심으로 = sincerely',                          tier: 'core' },
    { id: 'd49-v1-e5', korean: '슬프다',      hangul: 'seul-peu-da',   zh: '难过 / 悲伤', zhEn: 'sad / sorrowful', pos: '形容词', posEn: 'Adjective.', example: { ko: '너무 슬퍼요.',                zh: '太难过了。', zhEn: 'I\'m so sad.' },                tip: '으 脱落 · 슬프다 → 슬퍼요', tipEn: '으 drop · 슬프다 → 슬퍼요',                                     tier: 'core' },
    { id: 'd49-v1-e6', korean: '서로',        hangul: 'seo-ro',        zh: '互相', zhEn: 'each other',        pos: '副词', posEn: 'Adverb',   example: { ko: '서로 사과하세요.',            zh: '互相道歉吧。', zhEn: 'Let\'s apologize to each other.' },              tip: '서로 돕다 = 互相帮助', tipEn: '서로 돕다 = to help each other',                                          tier: 'core' },
    { id: 'd49-v1-e7', korean: '자랑스럽다',  hangul: 'ja-rang-seu-reop-da', zh: '骄傲 / 值得自豪', zhEn: 'proud / worthy of pride', pos: '形容词', posEn: 'Adjective.', example: { ko: '너희가 진짜 자랑스러워.', zh: '你们真让我骄傲。', zhEn: 'You really make me proud.' },   tip: 'ㅂ 不规则 · 자랑스러워요', tipEn: 'ㅂ irregular · 자랑스러워요',                                     tier: 'ext' },
    { id: 'd49-v1-e8', korean: '먼저',        hangul: 'meon-jeo',      zh: '先 / 首先', zhEn: 'first / firstly',   pos: '副词', posEn: 'Adverb',   example: { ko: '내가 먼저 미안해.',            zh: '我先说对不起。', zhEn: 'I\'ll say sorry first.' },            tip: '반의어 나중에',                                                 tier: 'ext' },
  ],

  recognize: [
    { id: 'd49-v1-r1', korean: '싸우다',      hangul: 'ssa-u-da',      choices: [{ zh: '吵架', zhEn: 'argue',        correct: true }, { zh: '玩', zhEn: 'to play',        correct: false }, { zh: '睡', zhEn: 'to sleep',        correct: false }, { zh: '哭', zhEn: 'Crying',        correct: false }] },
    { id: 'd49-v1-r2', korean: '사과하다',    hangul: 'sa-gwa-ha-da',  choices: [{ zh: '道歉', zhEn: 'to apologize',        correct: true }, { zh: '拒绝', zhEn: 'Refuse',      correct: false }, { zh: '感谢', zhEn: 'Thanks',      correct: false }, { zh: '祝贺', zhEn: 'congratulations',      correct: false }] },
    { id: 'd49-v1-r3', korean: '화해하다',    hangul: 'hwa-hae-ha-da', choices: [{ zh: '和好', zhEn: 'to make up',        correct: true }, { zh: '决裂', zhEn: 'to break off / rupture',      correct: false }, { zh: '联系', zhEn: 'to contact',      correct: false }, { zh: '认识', zhEn: 'know',      correct: false }] },
    { id: 'd49-v1-r4', korean: '진심',        hangul: 'jin-sim',       choices: [{ zh: '真心', zhEn: 'Sincere heart',        correct: true }, { zh: '假意', zhEn: 'pretence / insincerity',      correct: false }, { zh: '好心', zhEn: 'good intentions / kind-hearted',      correct: false }, { zh: '狠心', zhEn: 'heartless / cruel',      correct: false }] },
    { id: 'd49-v1-r5', korean: '슬프다',      hangul: 'seul-peu-da',   choices: [{ zh: '难过', zhEn: 'sad',        correct: true }, { zh: '高兴', zhEn: 'happy / glad',      correct: false }, { zh: '生气', zhEn: 'Angry',      correct: false }, { zh: '害怕', zhEn: 'be scared',      correct: false }] },
    { id: 'd49-v1-r6', korean: '서로',        hangul: 'seo-ro',        choices: [{ zh: '互相', zhEn: 'each other',        correct: true }, { zh: '一起', zhEn: 'together',      correct: false }, { zh: '各自', zhEn: 'each / respective',      correct: false }, { zh: '独自', zhEn: 'Alone',      correct: false }] },
  ],

  spell: [
    { id: 'd49-v1-s1', zhHint: '道歉（사과）', zhHintEn: 'apology (사과)', answer: ['사', '과'], syllables: ['사', '과', '사', '고'] },
    { id: 'd49-v1-s2', zhHint: '和解（화해）', zhHintEn: 'reconciliation (화해)', answer: ['화', '해'], syllables: ['화', '해', '하', '해'] },
    { id: 'd49-v1-s3', zhHint: '真心', zhHintEn: 'Sincere heart',        answer: ['진', '심'], syllables: ['진', '심', '진', '신'] },
    { id: 'd49-v1-s4', zhHint: '互相', zhHintEn: 'each other',        answer: ['서', '로'], syllables: ['서', '로', '세', '로'] },
  ],

  write: [
    { id: 'd49-v1-w1', korean: '싸', hangul: 'ssa',        wordKorean: '싸우다',      wordZh: '吵架', wordZhEn: 'argue' },
    { id: 'd49-v1-w2', korean: '우', hangul: 'u',          wordKorean: '싸우다',      wordZh: '吵架', wordZhEn: 'argue' },
    { id: 'd49-v1-w3', korean: '사', hangul: 'sa',         wordKorean: '사과하다',    wordZh: '道歉', wordZhEn: 'to apologize' },
    { id: 'd49-v1-w4', korean: '과', hangul: 'gwa',        wordKorean: '사과하다',    wordZh: '道歉', wordZhEn: 'to apologize' },
    { id: 'd49-v1-w5', korean: '화', hangul: 'hwa',        wordKorean: '화해하다',    wordZh: '和好', wordZhEn: 'to make up' },
    { id: 'd49-v1-w6', korean: '해', hangul: 'hae',        wordKorean: '화해하다',    wordZh: '和好', wordZhEn: 'to make up' },
    { id: 'd49-v1-w7', korean: '진', hangul: 'jin',        wordKorean: '진심',        wordZh: '真心', wordZhEn: 'Sincere heart' },
    { id: 'd49-v1-w8', korean: '심', hangul: 'sim',        wordKorean: '진심',        wordZh: '真心', wordZhEn: 'Sincere heart' },
  ],

  dictation: [
    { id: 'd49-v1-d1', korean: '사과해야 돼',        hangul: 'sa-gwa-hae-ya dwae',         syllables: ['사', '과', '해', '야', '돼'],           zh: '应该道歉', zhEn: 'should apologize' },
    { id: 'd49-v1-d2', korean: '진심으로 미안해',     hangul: 'jin-si-meu-ro mi-an-hae',    syllables: ['진', '심', '으', '로', '미', '안', '해'], zh: '真心抱歉', zhEn: 'sincerely sorry' },
    { id: 'd49-v1-d3', korean: '너무 슬퍼요',         hangul: 'neo-mu seul-peo-yo',         syllables: ['너', '무', '슬', '퍼', '요'],            zh: '太难过了', zhEn: 'too sad / so upset' },
  ],
};
