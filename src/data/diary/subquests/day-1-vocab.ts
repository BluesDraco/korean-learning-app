import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 1 · 1-1 单어 마스터 · 词汇子关卡
 *
 * 主流程 7 词之外的 8 个新词。分三层：
 * - core: 네 / 아니요 / 엄마 / 당근 / 한국 / 학생（进认词考察）
 * - ext:  친구 / 저기요（进拼写 / 听辨）
 *
 * Phase 结构：语遇 8 → 认词 6 → 拼写 4 → 听辨 3。
 * 星级：全对 3 星 / 错 1-2 二星 / 错 3-4 一星 / 错 5+ 零星（不解锁）。
 */
export const day1Vocab: VocabSubQuestData = {
  day: 1,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '第一天，先记住这 8 个词', subtitleEn: 'Day 1, start by memorizing these 8 words',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd01-v1-e1',
      korean: '네',
      hangul: 'ne',
      zh: '是 / 好的', zhEn: 'Yes / Okay',
      pos: '感叹词', posEn: 'Interjection',
      example: { ko: '네, 알겠어요.', zh: '好的，我知道了。', zhEn: 'Okay, got it.' },
      tip: '发音"内"，短促上扬。韩国人一天要说一百次，明天飞机上兔莉第一个用的就是它。', tipEn: 'Pronounced "ne," short and rising. Koreans say it a hundred times a day—it\'s the first thing Tori will use on the plane tomorrow.',
      tier: 'core',
    },
    {
      id: 'd01-v1-e2',
      korean: '아니요',
      hangul: 'a-ni-yo',
      zh: '不是 / 不', zhEn: 'No / Not',
      pos: '感叹词', posEn: 'Interjection',
      example: { ko: '아니요, 저는 한국 사람이 아니에요.', zh: '不，我不是韩国人。', zhEn: 'No, I\'m not Korean.' },
      tip: '和「네」是一对。发音"啊尼哟"，中间那个"尼"要轻。', tipEn: 'The counterpart to "ne." Pronounced "aniyo," with a light "ni" in the middle.',
      tier: 'core',
    },
    {
      id: 'd01-v1-e3',
      korean: '엄마',
      hangul: 'eom-ma',
      zh: '妈妈', zhEn: 'Mom',
      pos: '名词', posEn: 'Noun',
      example: { ko: '엄마, 저 갈게요.', zh: '妈妈，我出发了。', zhEn: 'Mom, I\'m leaving.' },
      tip: '给胡萝卜的那个人。「엄」的元音 ㅓ 是"张嘴的 e"，口型半开、不圆唇——不要发成 ㅗ 的圆嘴。', tipEn: 'The one who gives the carrot. The vowel ㅓ in "엄" is an "open-mouth e"—lips half-open, not rounded—don\'t pronounce it like the rounded ㅗ.',
      tier: 'emotion',
    },
    {
      id: 'd01-v1-e4',
      korean: '당근',
      hangul: 'dang-geun',
      zh: '胡萝卜', zhEn: 'Carrot',
      pos: '名词', posEn: 'Noun',
      example: { ko: '이 당근에는 용기가 들어 있어요.', zh: '这根胡萝卜里装着勇气。', zhEn: 'This carrot is filled with courage.' },
      tip: '妈妈塞进背包的那根。「근」的收音 ㄴ 要用鼻腔发出来。', tipEn: 'The one Mom stuffed into the backpack. The final consonant ㄴ in "근" should be pronounced through the nose.',
      tier: 'core',
    },
    {
      id: 'd01-v1-e5',
      korean: '한국',
      hangul: 'han-guk',
      zh: '韩国', zhEn: 'Korea',
      pos: '名词', posEn: 'Noun',
      example: { ko: '내일 저는 한국에 가요.', zh: '明天我要去韩国。', zhEn: 'Tomorrow I will go to Korea.' },
      tip: '兔莉要去的地方。「국」的收音 ㄱ 是闭口不出气的"g"，不要发成中文"顾"。', tipEn: 'The place Tori is headed. The final consonant ㄱ in "국" is a closed, unaspirated "g"—don\'t pronounce it like the Chinese "gu."',
      tier: 'core',
    },
    {
      id: 'd01-v1-e6',
      korean: '학생',
      hangul: 'hak-saeng',
      zh: '学生', zhEn: 'Student',
      pos: '名词', posEn: 'Noun',
      example: { ko: '저는 한국어 학생이에요.', zh: '我是韩语学生。', zhEn: 'I am a Korean language student.' },
      tip: '汉字词「学生」。「학」收音 ㄱ + 「생」都是有收音的字，读起来会有点顿挫。', tipEn: 'Sino-Korean word for "student." Both "학" (final ㄱ) and "생" have final consonants, so it sounds a bit staccato.',
      tier: 'core',
    },
    {
      id: 'd01-v1-e7',
      korean: '친구',
      hangul: 'chin-gu',
      zh: '朋友', zhEn: 'friend',
      pos: '名词', posEn: 'Noun',
      example: { ko: '친구를 만나고 싶어요.', zh: '我想见朋友。', zhEn: 'I want to meet a friend.' },
      tip: '发音"亲估"。到了首尔兔莉会认识很多친구——Minji、Junho、Haru。', tipEn: 'Pronounced "chingu." In Seoul, Tori will meet many 친구—Minji, Junho, Haru.',
      tier: 'ext',
    },
    {
      id: 'd01-v1-e8',
      korean: '저기요',
      hangul: 'jeo-gi-yo',
      zh: '请问 / 借光一下', zhEn: 'Excuse me',
      pos: '表达', posEn: 'Expression',
      example: { ko: '저기요, 여기는 어디예요?', zh: '请问，这里是哪里？', zhEn: 'Excuse me, where is this?' },
      tip: '万能开场词。餐厅叫服务员、路上拦人问路、地铁挤过去都用它。比"안녕하세요"更实用。', tipEn: 'The all-purpose opener. Use it to call a waiter, stop someone on the street for directions, or squeeze through the subway. More practical than "안녕하세요."',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // 干扰项：从本关内其他词的中文里挑，制造真实混淆
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd01-v1-r1',
      korean: '네',
      hangul: 'ne',
      choices: [
        { zh: '是 / 好的', zhEn: 'Yes / Okay', correct: true },
        { zh: '不是 / 不', zhEn: 'No / Not', correct: false },
        { zh: '请问', zhEn: 'Excuse me', correct: false },
        { zh: '你好', zhEn: 'Hello', correct: false },
      ],
    },
    {
      id: 'd01-v1-r2',
      korean: '아니요',
      hangul: 'a-ni-yo',
      choices: [
        { zh: '不是 / 不', zhEn: 'No / Not', correct: true },
        { zh: '是 / 好的', zhEn: 'Yes / Okay', correct: false },
        { zh: '不知道', zhEn: 'I don\'t know', correct: false },
        { zh: '再见', zhEn: 'Goodbye', correct: false },
      ],
    },
    {
      id: 'd01-v1-r3',
      korean: '엄마',
      hangul: 'eom-ma',
      choices: [
        { zh: '妈妈', zhEn: 'Mom', correct: true },
        { zh: '朋友', zhEn: 'friend', correct: false },
        { zh: '姐姐', zhEn: 'Older sister', correct: false },
        { zh: '老师', zhEn: 'Teacher', correct: false },
      ],
    },
    {
      id: 'd01-v1-r4',
      korean: '당근',
      hangul: 'dang-geun',
      choices: [
        { zh: '胡萝卜', zhEn: 'Carrot', correct: true },
        { zh: '苹果', zhEn: 'Apple', correct: false },
        { zh: '勇气', zhEn: 'Courage', correct: false },
        { zh: '书', zhEn: 'Book', correct: false },
      ],
    },
    {
      id: 'd01-v1-r5',
      korean: '한국',
      hangul: 'han-guk',
      choices: [
        { zh: '韩国', zhEn: 'Korea', correct: true },
        { zh: '中国', zhEn: 'China', correct: false },
        { zh: '日本', zhEn: 'Japan', correct: false },
        { zh: '首尔', zhEn: 'Seoul', correct: false },
      ],
    },
    {
      id: 'd01-v1-r6',
      korean: '학생',
      hangul: 'hak-saeng',
      choices: [
        { zh: '学生', zhEn: 'Student', correct: true },
        { zh: '老师', zhEn: 'Teacher', correct: false },
        { zh: '朋友', zhEn: 'friend', correct: false },
        { zh: '学校', zhEn: 'School', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 拼写（4 题音节块拼词，非字母级）
  // 干扰音节挑自其他词或韩国常见字，用户认的是"音节整体形状"
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd01-v1-s1',
      zhHint: '胡萝卜', zhHintEn: 'Carrot',
      answer: ['당', '근'],
      // 干扰："닭" 类似形状；"공" 结构接近
      syllables: ['당', '근', '닭', '공'],
    },
    {
      id: 'd01-v1-s2',
      zhHint: '朋友', zhHintEn: 'friend',
      answer: ['친', '구'],
      // 干扰："천" 只差一个字母；"고" 是"고맙다"里熟眼
      syllables: ['친', '구', '천', '고'],
    },
    {
      id: 'd01-v1-s3',
      zhHint: '韩国', zhHintEn: 'Korea',
      answer: ['한', '국'],
      // 干扰："항" 只差收音（ㄴ→ㅇ），高频混淆；"극" 与"국"元音相近（ㅜ→ㅡ）
      syllables: ['한', '국', '항', '극'],
    },
    {
      id: 'd01-v1-s4',
      zhHint: '学生', zhHintEn: 'Student',
      answer: ['학', '생'],
      // 干扰："항" 只差初声（ㅎ→ㅎ 相同）+ 收音（ㄱ→ㅇ）；"성" 与"생"元音相近（ㅐ→ㅓ）
      syllables: ['학', '생', '항', '성'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字，各代表 1 词，可开描红）
  // 覆盖率 ≥20% 及格，不产生错题
  // ─────────────────────────────────────────────
  write: [
    { id: 'd01-v1-w1', korean: '네',  hangul: 'ne',      wordKorean: '네',     wordZh: '是 / 好的', wordZhEn: 'Yes / Okay' },
    { id: 'd01-v1-w2', korean: '아',  hangul: 'a',       wordKorean: '아니요', wordZh: '不是 / 不', wordZhEn: 'No / Not' },
    { id: 'd01-v1-w3', korean: '엄',  hangul: 'eom',     wordKorean: '엄마',   wordZh: '妈妈', wordZhEn: 'Mom' },
    { id: 'd01-v1-w4', korean: '당',  hangul: 'dang',    wordKorean: '당근',   wordZh: '胡萝卜', wordZhEn: 'Carrot' },
    { id: 'd01-v1-w5', korean: '한',  hangul: 'han',     wordKorean: '한국',   wordZh: '韩国', wordZhEn: 'Korea' },
    { id: 'd01-v1-w6', korean: '학',  hangul: 'hak',     wordKorean: '학생',   wordZh: '学生', wordZhEn: 'Student' },
    { id: 'd01-v1-w7', korean: '친',  hangul: 'chin',    wordKorean: '친구',   wordZh: '朋友', wordZhEn: 'friend' },
    { id: 'd01-v1-w8', korean: '저',  hangul: 'jeo',     wordKorean: '저기요', wordZh: '请问', wordZhEn: 'Excuse me' },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // 覆盖率 ≥20% 及格，不产生错题
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd01-v1-d1', korean: '엄마',   hangul: 'eom-ma',    syllables: ['엄', '마'],       zh: '妈妈', zhEn: 'Mom' },
    { id: 'd01-v1-d2', korean: '저기요', hangul: 'jeo-gi-yo', syllables: ['저', '기', '요'], zh: '请问', zhEn: 'Excuse me' },
    { id: 'd01-v1-d3', korean: '당근',   hangul: 'dang-geun', syllables: ['당', '근'],      zh: '胡萝卜', zhEn: 'Carrot' },
  ],
};
