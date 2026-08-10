import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 39 · 한글날 · 词汇子关卡 */
export const day39Vocab: VocabSubQuestData = {
  day: 9, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '韩文日的 8 个词',

  encounter: [
    { id: 'd39-v1-e1', korean: '한글날',      hangul: 'han-geul-lal',    zh: '韩文日',       pos: '名词',   example: { ko: '한글날은 10월 9일이에요.',    zh: '韩文日是 10 月 9 日。' }, tip: '한글 + 날 · 世界唯一有生日的文字',                              tier: 'core' },
    { id: 'd39-v1-e2', korean: '세종대왕',    hangul: 'se-jong-dae-wang', zh: '世宗大王',     pos: '名词',   example: { ko: '세종대왕이 한글을 만드셨어요.', zh: '世宗大王创造了韩文。' }, tip: '朝鲜第四代国王 · 1443 年颁布《训民正音》',                        tier: 'core' },
    { id: 'd39-v1-e3', korean: '만들다',      hangul: 'man-deul-da',     zh: '制作 / 创造',   pos: '动词',   example: { ko: '한글을 만들었어요.',           zh: '创造了韩文。' },       tip: 'ㄹ 词干 · 만들다 → 만든 / 만들어요',                              tier: 'core' },
    { id: 'd39-v1-e4', korean: '과학적',      hangul: 'gwa-hak-jeok',    zh: '科学的',       pos: '形容词', example: { ko: '한글은 과학적이에요.',         zh: '韩文是科学的。' },     tip: '과학 + 적 · 加 이에요/예요 · ~인 것 같아요',                     tier: 'core' },
    { id: 'd39-v1-e5', korean: '글자',        hangul: 'geul-ja',         zh: '字 / 文字',    pos: '名词',   example: { ko: '이 글자는 뭐예요?',            zh: '这个字是什么？' },     tip: '한자 = 汉字 · 한글 = 韩文字母',                                   tier: 'core' },
    { id: 'd39-v1-e6', korean: '특별하다',    hangul: 'teuk-byeol-ha-da', zh: '特别',         pos: '形容词', example: { ko: '오늘은 특별한 날이에요.',      zh: '今天是特别的日子。' }, tip: '特(특) + 别(별) + 하다 · 特别的一件事: 특별한 것',                tier: 'core' },
    { id: 'd39-v1-e7', korean: '아름답다',    hangul: 'a-reum-dap-da',   zh: '美丽',         pos: '形容词', example: { ko: '한글이 아름다워요.',           zh: '韩文很美。' },         tip: 'ㅂ 不规则 · 아름다워요 / 아름다운 것 같아요',                     tier: 'ext' },
    { id: 'd39-v1-e8', korean: '유일하다',    hangul: 'yu-il-ha-da',     zh: '唯一',         pos: '形容词', example: { ko: '세계에서 유일한 글자예요.',    zh: '世上唯一的文字。' },   tip: '唯(유) + 一(일) · 유일한 = 唯一的',                              tier: 'ext' },
  ],

  recognize: [
    { id: 'd39-v1-r1', korean: '한글날',    hangul: 'han-geul-lal',   choices: [{ zh: '韩文日',   correct: true }, { zh: '光复节',    correct: false }, { zh: '春节',       correct: false }, { zh: '国庆节',      correct: false }] },
    { id: 'd39-v1-r2', korean: '세종대왕',  hangul: 'se-jong-dae-wang', choices: [{ zh: '世宗大王', correct: true }, { zh: '李成桂',    correct: false }, { zh: '成宗',        correct: false }, { zh: '太宗',        correct: false }] },
    { id: 'd39-v1-r3', korean: '만들다',    hangul: 'man-deul-da',    choices: [{ zh: '创造',     correct: true }, { zh: '毁掉',      correct: false }, { zh: '学习',        correct: false }, { zh: '发现',        correct: false }] },
    { id: 'd39-v1-r4', korean: '과학적',    hangul: 'gwa-hak-jeok',   choices: [{ zh: '科学的',   correct: true }, { zh: '艺术的',    correct: false }, { zh: '实用的',      correct: false }, { zh: '古老的',      correct: false }] },
    { id: 'd39-v1-r5', korean: '글자',      hangul: 'geul-ja',        choices: [{ zh: '文字',     correct: true }, { zh: '语言',      correct: false }, { zh: '声音',        correct: false }, { zh: '图案',        correct: false }] },
    { id: 'd39-v1-r6', korean: '특별하다',  hangul: 'teuk-byeol-ha-da', choices: [{ zh: '特别',     correct: true }, { zh: '普通',      correct: false }, { zh: '一般',        correct: false }, { zh: '奇怪',        correct: false }] },
  ],

  spell: [
    { id: 'd39-v1-s1', zhHint: '文字',      answer: ['글', '자'], syllables: ['글', '자', '급', '자'] },
    { id: 'd39-v1-s2', zhHint: '科学',      answer: ['과', '학'], syllables: ['과', '학', '가', '한'] },
    { id: 'd39-v1-s3', zhHint: '特别',      answer: ['특', '별'], syllables: ['특', '별', '득', '벌'] },
    { id: 'd39-v1-s4', zhHint: '唯一',      answer: ['유', '일'], syllables: ['유', '일', '유', '인'] },
  ],

  write: [
    { id: 'd39-v1-w1', korean: '한', hangul: 'han',        wordKorean: '한글날',   wordZh: '韩文日' },
    { id: 'd39-v1-w2', korean: '글', hangul: 'geul',       wordKorean: '한글날',   wordZh: '韩文日' },
    { id: 'd39-v1-w3', korean: '세', hangul: 'se',         wordKorean: '세종',     wordZh: '世宗' },
    { id: 'd39-v1-w4', korean: '종', hangul: 'jong',       wordKorean: '세종',     wordZh: '世宗' },
    { id: 'd39-v1-w5', korean: '과', hangul: 'gwa',        wordKorean: '과학적',   wordZh: '科学的' },
    { id: 'd39-v1-w6', korean: '학', hangul: 'hak',        wordKorean: '과학적',   wordZh: '科学的' },
    { id: 'd39-v1-w7', korean: '특', hangul: 'teuk',       wordKorean: '특별하다', wordZh: '特别' },
    { id: 'd39-v1-w8', korean: '별', hangul: 'byeol',      wordKorean: '특별하다', wordZh: '特别' },
  ],

  dictation: [
    { id: 'd39-v1-d1', korean: '과학적인 것 같아요',   hangul: 'gwa-hak-jeo-gin geot ga-ta-yo', syllables: ['과', '학', '적', '인', '것', '같', '아', '요'], zh: '好像很科学' },
    { id: 'd39-v1-d2', korean: '한글을 만들었어요',    hangul: 'han-geu-reul man-deu-reo-sseo-yo', syllables: ['한', '글', '을', '만', '들', '었', '어', '요'], zh: '创造了韩文' },
    { id: 'd39-v1-d3', korean: '특별한 날이에요',       hangul: 'teuk-byeol-han na-ri-e-yo',      syllables: ['특', '별', '한', '날', '이', '에', '요'],       zh: '是特别的日子' },
  ],
};
