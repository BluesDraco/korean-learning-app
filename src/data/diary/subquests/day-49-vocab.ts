import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 49 · 화해 · 词汇子关卡 */
export const day49Vocab: VocabSubQuestData = {
  day: 19, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '调解真心话的 8 个词',

  encounter: [
    { id: 'd49-v1-e1', korean: '싸우다',      hangul: 'ssa-u-da',      zh: '吵架 / 打架', pos: '动词',   example: { ko: '민지랑 준호가 싸웠어요.',   zh: 'Minji 和 Junho 吵架了。' }, tip: '~와/과 싸우다 · 과거 싸웠어요',                                 tier: 'core' },
    { id: 'd49-v1-e2', korean: '사과하다',    hangul: 'sa-gwa-ha-da',  zh: '道歉',        pos: '动词',   example: { ko: '먼저 사과했어요.',            zh: '先道歉了。' },                tip: '사과 = 道歉 / 苹果（同名，注意语境）',                          tier: 'core' },
    { id: 'd49-v1-e3', korean: '화해하다',    hangul: 'hwa-hae-ha-da', zh: '和好',        pos: '动词',   example: { ko: '두 사람이 화해했어요.',      zh: '两人和好了。' },              tip: '和(화) + 解(해) + 하다',                                       tier: 'core' },
    { id: 'd49-v1-e4', korean: '진심',        hangul: 'jin-sim',       zh: '真心',        pos: '名词',   example: { ko: '진심으로 미안해.',            zh: '真心抱歉。' },                tip: '真(진) + 心(심) · 진심으로 = 真心地',                          tier: 'core' },
    { id: 'd49-v1-e5', korean: '슬프다',      hangul: 'seul-peu-da',   zh: '难过 / 悲伤', pos: '形容词', example: { ko: '너무 슬퍼요.',                zh: '太难过了。' },                tip: '으 脱落 · 슬프다 → 슬퍼요',                                     tier: 'core' },
    { id: 'd49-v1-e6', korean: '서로',        hangul: 'seo-ro',        zh: '互相',        pos: '副词',   example: { ko: '서로 사과하세요.',            zh: '互相道歉吧。' },              tip: '서로 돕다 = 互相帮助',                                          tier: 'core' },
    { id: 'd49-v1-e7', korean: '자랑스럽다',  hangul: 'ja-rang-seu-reop-da', zh: '骄傲 / 值得自豪', pos: '形容词', example: { ko: '너희가 진짜 자랑스러워.', zh: '你们真让我骄傲。' },   tip: 'ㅂ 不规则 · 자랑스러워요',                                     tier: 'ext' },
    { id: 'd49-v1-e8', korean: '먼저',        hangul: 'meon-jeo',      zh: '先 / 首先',   pos: '副词',   example: { ko: '내가 먼저 미안해.',            zh: '我先说对不起。' },            tip: '반의어 나중에',                                                 tier: 'ext' },
  ],

  recognize: [
    { id: 'd49-v1-r1', korean: '싸우다',      hangul: 'ssa-u-da',      choices: [{ zh: '吵架',        correct: true }, { zh: '玩',        correct: false }, { zh: '睡',        correct: false }, { zh: '哭',        correct: false }] },
    { id: 'd49-v1-r2', korean: '사과하다',    hangul: 'sa-gwa-ha-da',  choices: [{ zh: '道歉',        correct: true }, { zh: '拒绝',      correct: false }, { zh: '感谢',      correct: false }, { zh: '祝贺',      correct: false }] },
    { id: 'd49-v1-r3', korean: '화해하다',    hangul: 'hwa-hae-ha-da', choices: [{ zh: '和好',        correct: true }, { zh: '决裂',      correct: false }, { zh: '联系',      correct: false }, { zh: '认识',      correct: false }] },
    { id: 'd49-v1-r4', korean: '진심',        hangul: 'jin-sim',       choices: [{ zh: '真心',        correct: true }, { zh: '假意',      correct: false }, { zh: '好心',      correct: false }, { zh: '狠心',      correct: false }] },
    { id: 'd49-v1-r5', korean: '슬프다',      hangul: 'seul-peu-da',   choices: [{ zh: '难过',        correct: true }, { zh: '高兴',      correct: false }, { zh: '生气',      correct: false }, { zh: '害怕',      correct: false }] },
    { id: 'd49-v1-r6', korean: '서로',        hangul: 'seo-ro',        choices: [{ zh: '互相',        correct: true }, { zh: '一起',      correct: false }, { zh: '各自',      correct: false }, { zh: '独自',      correct: false }] },
  ],

  spell: [
    { id: 'd49-v1-s1', zhHint: '道歉（사과）', answer: ['사', '과'], syllables: ['사', '과', '사', '고'] },
    { id: 'd49-v1-s2', zhHint: '和解（화해）', answer: ['화', '해'], syllables: ['화', '해', '하', '해'] },
    { id: 'd49-v1-s3', zhHint: '真心',        answer: ['진', '심'], syllables: ['진', '심', '진', '신'] },
    { id: 'd49-v1-s4', zhHint: '互相',        answer: ['서', '로'], syllables: ['서', '로', '세', '로'] },
  ],

  write: [
    { id: 'd49-v1-w1', korean: '싸', hangul: 'ssa',        wordKorean: '싸우다',      wordZh: '吵架' },
    { id: 'd49-v1-w2', korean: '우', hangul: 'u',          wordKorean: '싸우다',      wordZh: '吵架' },
    { id: 'd49-v1-w3', korean: '사', hangul: 'sa',         wordKorean: '사과하다',    wordZh: '道歉' },
    { id: 'd49-v1-w4', korean: '과', hangul: 'gwa',        wordKorean: '사과하다',    wordZh: '道歉' },
    { id: 'd49-v1-w5', korean: '화', hangul: 'hwa',        wordKorean: '화해하다',    wordZh: '和好' },
    { id: 'd49-v1-w6', korean: '해', hangul: 'hae',        wordKorean: '화해하다',    wordZh: '和好' },
    { id: 'd49-v1-w7', korean: '진', hangul: 'jin',        wordKorean: '진심',        wordZh: '真心' },
    { id: 'd49-v1-w8', korean: '심', hangul: 'sim',        wordKorean: '진심',        wordZh: '真心' },
  ],

  dictation: [
    { id: 'd49-v1-d1', korean: '사과해야 돼',        hangul: 'sa-gwa-hae-ya dwae',         syllables: ['사', '과', '해', '야', '돼'],           zh: '应该道歉' },
    { id: 'd49-v1-d2', korean: '진심으로 미안해',     hangul: 'jin-si-meu-ro mi-an-hae',    syllables: ['진', '심', '으', '로', '미', '안', '해'], zh: '真心抱歉' },
    { id: 'd49-v1-d3', korean: '너무 슬퍼요',         hangul: 'neo-mu seul-peo-yo',         syllables: ['너', '무', '슬', '퍼', '요'],            zh: '太难过了' },
  ],
};
