import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 39 · 한글날 · 词汇子关卡 */
export const day39Vocab: VocabSubQuestData = {
  day: 9, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '韩文日的 8 个词', subtitleEn: '8 words for Hangul Day.',

  encounter: [
    { id: 'd39-v1-e1', korean: '한글날',      hangul: 'han-geul-lal',    zh: '韩文日', zhEn: 'Hangul Day',       pos: '名词', posEn: 'Noun',   example: { ko: '한글날은 10월 9일이에요.',    zh: '韩文日是 10 月 9 日。', zhEn: 'Hangul Day is October 9th.' }, tip: '한글 + 날 · 世界唯一有生日的文字', tipEn: '한글 + 날 · The only script in the world with a birthday.',                              tier: 'core' },
    { id: 'd39-v1-e2', korean: '세종대왕',    hangul: 'se-jong-dae-wang', zh: '世宗大王', zhEn: 'King Sejong the Great',     pos: '名词', posEn: 'Noun',   example: { ko: '세종대왕이 한글을 만드셨어요.', zh: '世宗大王创造了韩文。', zhEn: 'King Sejong the Great created Hangul.' }, tip: '朝鲜第四代国王 · 1443 年颁布《训民正音》', tipEn: 'The fourth king of Joseon · promulgated Hunminjeongeum in 1443.',                        tier: 'core' },
    { id: 'd39-v1-e3', korean: '만들다',      hangul: 'man-deul-da',     zh: '制作 / 创造', zhEn: 'Make / create.',   pos: '动词', posEn: 'Verb',   example: { ko: '한글을 만들었어요.',           zh: '创造了韩文。', zhEn: 'Created Hangul.' },       tip: 'ㄹ 词干 · 만들다 → 만든 / 만들어요', tipEn: 'ㄹ stem · 만들다 → 만든 / 만들어요.',                              tier: 'core' },
    { id: 'd39-v1-e4', korean: '과학적',      hangul: 'gwa-hak-jeok',    zh: '科学的', zhEn: 'scientific',       pos: '形容词', posEn: 'Adjective.', example: { ko: '한글은 과학적이에요.',         zh: '韩文是科学的。', zhEn: 'Hangul is scientific.' },     tip: '과학 + 적 · 加 이에요/예요 · ~인 것 같아요', tipEn: '과학 + 적 · add 이에요/예요 · ~인 것 같아요.',                     tier: 'core' },
    { id: 'd39-v1-e5', korean: '글자',        hangul: 'geul-ja',         zh: '字 / 文字', zhEn: 'Character / script.',    pos: '名词', posEn: 'Noun',   example: { ko: '이 글자는 뭐예요?',            zh: '这个字是什么？', zhEn: 'What is this character?' },     tip: '한자 = 汉字 · 한글 = 韩文字母', tipEn: '한자 = Chinese characters · 한글 = Korean alphabet.',                                   tier: 'core' },
    { id: 'd39-v1-e6', korean: '특별하다',    hangul: 'teuk-byeol-ha-da', zh: '特别', zhEn: 'special',         pos: '形容词', posEn: 'Adjective.', example: { ko: '오늘은 특별한 날이에요.',      zh: '今天是特别的日子。', zhEn: 'Today is a special day.' }, tip: '特(특) + 别(별) + 하다 · 特别的一件事: 특별한 것', tipEn: '特(특) + 别(별) + 하다 · Something special: 특별한 것.',                tier: 'core' },
    { id: 'd39-v1-e7', korean: '아름답다',    hangul: 'a-reum-dap-da',   zh: '美丽', zhEn: 'Beautiful.',         pos: '形容词', posEn: 'Adjective.', example: { ko: '한글이 아름다워요.',           zh: '韩文很美。', zhEn: 'Hangul is beautiful.' },         tip: 'ㅂ 不规则 · 아름다워요 / 아름다운 것 같아요', tipEn: 'ㅂ irregular · 아름다워요 / 아름다운 것 같아요.',                     tier: 'ext' },
    { id: 'd39-v1-e8', korean: '유일하다',    hangul: 'yu-il-ha-da',     zh: '唯一', zhEn: 'only',         pos: '形容词', posEn: 'Adjective.', example: { ko: '세계에서 유일한 글자예요.',    zh: '世上唯一的文字。', zhEn: 'The only script in the world.' },   tip: '唯(유) + 一(일) · 유일한 = 唯一的', tipEn: '唯(유) + 一(일) · 유일한 = the only.',                              tier: 'ext' },
  ],

  recognize: [
    { id: 'd39-v1-r1', korean: '한글날',    hangul: 'han-geul-lal',   choices: [{ zh: '韩文日', zhEn: 'Hangul Day',   correct: true }, { zh: '光复节', zhEn: 'Liberation Day.',    correct: false }, { zh: '春节', zhEn: 'Lunar New Year',       correct: false }, { zh: '国庆节', zhEn: 'National Day',      correct: false }] },
    { id: 'd39-v1-r2', korean: '세종대왕',  hangul: 'se-jong-dae-wang', choices: [{ zh: '世宗大王', zhEn: 'King Sejong the Great', correct: true }, { zh: '李成桂', zhEn: 'Yi Seong-gye',    correct: false }, { zh: '成宗', zhEn: 'Seongjong',        correct: false }, { zh: '太宗', zhEn: 'Taejong',        correct: false }] },
    { id: 'd39-v1-r3', korean: '만들다',    hangul: 'man-deul-da',    choices: [{ zh: '创造', zhEn: 'Create',     correct: true }, { zh: '毁掉', zhEn: 'to destroy',      correct: false }, { zh: '学习', zhEn: 'to study',        correct: false }, { zh: '发现', zhEn: 'to discover',        correct: false }] },
    { id: 'd39-v1-r4', korean: '과학적',    hangul: 'gwa-hak-jeok',   choices: [{ zh: '科学的', zhEn: 'scientific',   correct: true }, { zh: '艺术的', zhEn: 'artistic',    correct: false }, { zh: '实用的', zhEn: 'practical',      correct: false }, { zh: '古老的', zhEn: 'ancient',      correct: false }] },
    { id: 'd39-v1-r5', korean: '글자',      hangul: 'geul-ja',        choices: [{ zh: '文字', zhEn: 'writing system',     correct: true }, { zh: '语言', zhEn: 'language',      correct: false }, { zh: '声音', zhEn: 'Voice',        correct: false }, { zh: '图案', zhEn: 'pattern',        correct: false }] },
    { id: 'd39-v1-r6', korean: '특별하다',  hangul: 'teuk-byeol-ha-da', choices: [{ zh: '特别', zhEn: 'special',     correct: true }, { zh: '普通', zhEn: 'Common',      correct: false }, { zh: '一般', zhEn: 'ordinary',        correct: false }, { zh: '奇怪', zhEn: 'strange',        correct: false }] },
  ],

  spell: [
    { id: 'd39-v1-s1', zhHint: '文字', zhHintEn: 'writing system',      answer: ['글', '자'], syllables: ['글', '자', '급', '자'] },
    { id: 'd39-v1-s2', zhHint: '科学', zhHintEn: 'science',      answer: ['과', '학'], syllables: ['과', '학', '가', '한'] },
    { id: 'd39-v1-s3', zhHint: '特别', zhHintEn: 'special',      answer: ['특', '별'], syllables: ['특', '별', '득', '벌'] },
    { id: 'd39-v1-s4', zhHint: '唯一', zhHintEn: 'only',      answer: ['유', '일'], syllables: ['유', '일', '유', '인'] },
  ],

  write: [
    { id: 'd39-v1-w1', korean: '한', hangul: 'han',        wordKorean: '한글날',   wordZh: '韩文日', wordZhEn: 'Hangul Day' },
    { id: 'd39-v1-w2', korean: '글', hangul: 'geul',       wordKorean: '한글날',   wordZh: '韩文日', wordZhEn: 'Hangul Day' },
    { id: 'd39-v1-w3', korean: '세', hangul: 'se',         wordKorean: '세종',     wordZh: '世宗', wordZhEn: 'Sejong' },
    { id: 'd39-v1-w4', korean: '종', hangul: 'jong',       wordKorean: '세종',     wordZh: '世宗', wordZhEn: 'Sejong' },
    { id: 'd39-v1-w5', korean: '과', hangul: 'gwa',        wordKorean: '과학적',   wordZh: '科学的', wordZhEn: 'scientific' },
    { id: 'd39-v1-w6', korean: '학', hangul: 'hak',        wordKorean: '과학적',   wordZh: '科学的', wordZhEn: 'scientific' },
    { id: 'd39-v1-w7', korean: '특', hangul: 'teuk',       wordKorean: '특별하다', wordZh: '特别', wordZhEn: 'special' },
    { id: 'd39-v1-w8', korean: '별', hangul: 'byeol',      wordKorean: '특별하다', wordZh: '特别', wordZhEn: 'special' },
  ],

  dictation: [
    { id: 'd39-v1-d1', korean: '과학적인 것 같아요',   hangul: 'gwa-hak-jeo-gin geot ga-ta-yo', syllables: ['과', '학', '적', '인', '것', '같', '아', '요'], zh: '好像很科学', zhEn: 'seems very scientific' },
    { id: 'd39-v1-d2', korean: '한글을 만들었어요',    hangul: 'han-geu-reul man-deu-reo-sseo-yo', syllables: ['한', '글', '을', '만', '들', '었', '어', '요'], zh: '创造了韩文', zhEn: 'created Hangul' },
    { id: 'd39-v1-d3', korean: '특별한 날이에요',       hangul: 'teuk-byeol-han na-ri-e-yo',      syllables: ['특', '별', '한', '날', '이', '에', '요'],       zh: '是特别的日子', zhEn: 'is a special day' },
  ],
};
