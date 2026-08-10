import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 33 · 편지 · 第一封家书 词汇子关卡 */
export const day33Vocab: VocabSubQuestData = {
  day: 3, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '写家书的 8 个词', subtitleEn: '8 words for writing a letter home',

  encounter: [
    { id: 'd33-v1-e1', korean: '편지',        hangul: 'pyeon-ji',       zh: '信', zhEn: 'Letter',            pos: '名词', posEn: 'Noun', example: { ko: '엄마한테 편지를 썼어요.', zh: '给妈妈写了信。', zhEn: 'Wrote a letter to Mom.' }, tip: '편(便) + 지(纸)。~에게/한테 편지를 쓰다', tipEn: '편(便) + 지(纸). ~에게/한테 편지를 쓰다',           tier: 'core' },
    { id: 'd33-v1-e2', korean: '잘 지내다',   hangul: 'jal ji-nae-da',  zh: '过得好', zhEn: 'Doing well',        pos: '表达', posEn: 'Expression', example: { ko: '엄마, 잘 지내고 있어요.', zh: '妈妈，我过得很好。', zhEn: 'Mom, I\'m doing well.' }, tip: '写信/打电话第一句 · ~고 있어요 表进行', tipEn: 'First line when writing or calling · ~고 있어요 for ongoing action',            tier: 'core' },
    { id: 'd33-v1-e3', korean: '번역기',      hangul: 'beon-yeok-gi',   zh: '翻译器', zhEn: 'Translator',        pos: '名词', posEn: 'Noun', example: { ko: '엄마가 번역기로 읽었어요.', zh: '妈妈用翻译器读了。', zhEn: 'Mom read it with a translator.' }, tip: '번역(翻译) + 기(器)。翻译软件也用这词', tipEn: '번역(translation) + 기(device). Also used for translation apps',           tier: 'core' },
    { id: 'd33-v1-e4', korean: '읽다',        hangul: 'ik-da',          zh: '读', zhEn: 'Read',            pos: '动词', posEn: 'Verb', example: { ko: '편지를 세 번 읽었어요.', zh: '把信读了三遍。', zhEn: 'Read the letter three times.' }, tip: '收音 ㄺ → 读音 [익따]。~을/를 읽다', tipEn: 'Final consonant ㄺ → pronounced [익따]. ~을/를 읽다',              tier: 'core' },
    { id: 'd33-v1-e5', korean: '녹음',        hangul: 'no-geum',        zh: '录音', zhEn: 'Recording',          pos: '名词', posEn: 'Noun', example: { ko: '엄마 녹음을 저장했어요.', zh: '存了妈妈的录音。', zhEn: 'Saved Mom\'s recording.' }, tip: '录(녹) + 音(음)。녹음하다 = 录音（动词）', tipEn: '录(녹) + 音(음). 녹음하다 = to record (verb)',        tier: 'core' },
    { id: 'd33-v1-e6', korean: '건강',        hangul: 'geon-gang',      zh: '健康', zhEn: 'health',          pos: '名词', posEn: 'Noun', example: { ko: '엄마 건강 조심하세요.', zh: '妈妈请注意健康。', zhEn: 'Mom, please take care of your health.' }, tip: '건강 조심하세요 = 给家人的经典关照句', tipEn: '건강 조심하세요 = classic caring phrase for family',            tier: 'core' },
    { id: 'd33-v1-e7', korean: '올림',        hangul: 'ol-lim',         zh: '敬上（信末）', zhEn: 'Respectfully (at end of letter)',  pos: '名词', posEn: 'Noun', example: { ko: '토리 올림.',              zh: '兔莉敬上。', zhEn: 'Respectfully, Tori.' },       tip: '올리다(呈上)的名词化。信末落款专用', tipEn: 'Nominalization of 올리다 (to present). Used only for letter sign-offs',              tier: 'ext' },
    { id: 'd33-v1-e8', korean: '저장하다',    hangul: 'jeo-jang-ha-da', zh: '保存 / 储存', zhEn: 'Save / store',   pos: '动词', posEn: 'Verb', example: { ko: '녹음을 저장했어요.', zh: '把录音存起来了。', zhEn: 'Saved the recording.' }, tip: '저장(储藏) + 하다。사진/파일 저장 常用', tipEn: '저장(store) + 하다. Commonly used for saving photos/files',           tier: 'ext' },
  ],

  recognize: [
    { id: 'd33-v1-r1', korean: '편지',      hangul: 'pyeon-ji',      choices: [{ zh: '信', zhEn: 'Letter',         correct: true }, { zh: '包裹', zhEn: 'package / parcel',        correct: false }, { zh: '账单', zhEn: 'bill',    correct: false }, { zh: '照片', zhEn: 'photo',   correct: false }] },
    { id: 'd33-v1-r2', korean: '잘 지내다', hangul: 'jal ji-nae-da', choices: [{ zh: '过得好', zhEn: 'Doing well',     correct: true }, { zh: '过得糟', zhEn: 'Having a rough time',      correct: false }, { zh: '认识', zhEn: 'know',    correct: false }, { zh: '出发', zhEn: 'Departure',   correct: false }] },
    { id: 'd33-v1-r3', korean: '번역기',    hangul: 'beon-yeok-gi',  choices: [{ zh: '翻译器', zhEn: 'Translator',     correct: true }, { zh: '录音机', zhEn: 'tape recorder',      correct: false }, { zh: '打印机', zhEn: 'printer',  correct: false }, { zh: '计算器', zhEn: 'calculator', correct: false }] },
    { id: 'd33-v1-r4', korean: '읽다',      hangul: 'ik-da',         choices: [{ zh: '读', zhEn: 'Read',         correct: true }, { zh: '写', zhEn: 'write',          correct: false }, { zh: '听', zhEn: 'Listen',      correct: false }, { zh: '看', zhEn: 'to see',     correct: false }] },
    { id: 'd33-v1-r5', korean: '녹음',      hangul: 'no-geum',       choices: [{ zh: '录音', zhEn: 'Recording',       correct: true }, { zh: '录像', zhEn: 'Video recording',        correct: false }, { zh: '直播', zhEn: 'Live broadcast',    correct: false }, { zh: '广播', zhEn: 'Broadcast',   correct: false }] },
    { id: 'd33-v1-r6', korean: '건강',      hangul: 'geon-gang',     choices: [{ zh: '健康', zhEn: 'health',       correct: true }, { zh: '强壮', zhEn: 'Strong',        correct: false }, { zh: '疾病', zhEn: 'Illness',    correct: false }, { zh: '休息', zhEn: 'to rest',   correct: false }] },
  ],

  spell: [
    { id: 'd33-v1-s1', zhHint: '信', zhHintEn: 'Letter',       answer: ['편', '지'], syllables: ['편', '지', '평', '치'] },
    { id: 'd33-v1-s2', zhHint: '翻译', zhHintEn: 'Translate',     answer: ['번', '역'], syllables: ['번', '역', '분', '옥'] },
    { id: 'd33-v1-s3', zhHint: '录音', zhHintEn: 'Recording',     answer: ['녹', '음'], syllables: ['녹', '음', '녹', '읍'] },
    { id: 'd33-v1-s4', zhHint: '健康', zhHintEn: 'health',     answer: ['건', '강'], syllables: ['건', '강', '군', '강'] },
  ],

  write: [
    { id: 'd33-v1-w1', korean: '편', hangul: 'pyeon',  wordKorean: '편지',   wordZh: '信', wordZhEn: 'Letter' },
    { id: 'd33-v1-w2', korean: '지', hangul: 'ji',     wordKorean: '편지',   wordZh: '信', wordZhEn: 'Letter' },
    { id: 'd33-v1-w3', korean: '번', hangul: 'beon',   wordKorean: '번역기', wordZh: '翻译器', wordZhEn: 'Translator' },
    { id: 'd33-v1-w4', korean: '역', hangul: 'yeok',   wordKorean: '번역기', wordZh: '翻译器', wordZhEn: 'Translator' },
    { id: 'd33-v1-w5', korean: '녹', hangul: 'nok',    wordKorean: '녹음',   wordZh: '录音', wordZhEn: 'Recording' },
    { id: 'd33-v1-w6', korean: '음', hangul: 'eum',    wordKorean: '녹음',   wordZh: '录音', wordZhEn: 'Recording' },
    { id: 'd33-v1-w7', korean: '건', hangul: 'geon',   wordKorean: '건강',   wordZh: '健康', wordZhEn: 'health' },
    { id: 'd33-v1-w8', korean: '강', hangul: 'gang',   wordKorean: '건강',   wordZh: '健康', wordZhEn: 'health' },
  ],

  dictation: [
    { id: 'd33-v1-d1', korean: '잘 지내고 있어요',  hangul: 'jal ji-nae-go i-sseo-yo',        syllables: ['잘', '지', '내', '고', '있', '어', '요'],       zh: '过得很好', zhEn: 'Doing well' },
    { id: 'd33-v1-d2', korean: '편지를 썼어요',      hangul: 'pyeon-ji-reul sseo-sseo-yo',     syllables: ['편', '지', '를', '썼', '어', '요'],             zh: '写了信', zhEn: 'wrote a letter' },
    { id: 'd33-v1-d3', korean: '건강 조심하세요',    hangul: 'geon-gang jo-sim-ha-se-yo',       syllables: ['건', '강', '조', '심', '하', '세', '요'],      zh: '请注意健康', zhEn: 'please take care of your health' },
  ],
};
