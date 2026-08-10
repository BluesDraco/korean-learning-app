import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 4 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词之外的 8 个新词——都围绕宿舍报到场景：
 * - core: 기숙사 / 호 / 옆방 / 새로 / 등록 / 여권（进认词考察）
 * - ext:  잠깐만요 / 알겠어요（进拼写/听写考察）
 *
 * 教学重点：ext 两个词是 Day 4 敬语升级的实用扩展——
 *   잠깐만요（请稍等）和 알겠어요（明白了）都是应答宿管的高频句
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 */
export const day4Vocab: VocabSubQuestData = {
  day: 4,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '한빛宿舍前台悄悄多学的 8 个词', subtitleEn: '8 extra words secretly learned at the Hanbit dorm front desk',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd04-v1-e1',
      korean: '기숙사',
      hangul: 'gi-suk-sa',
      zh: '宿舍', zhEn: 'dormitory',
      pos: '名词', posEn: 'Noun',
      example: { ko: '한빛 기숙사예요.', zh: '是韩光宿舍。', zhEn: 'It\'s Hanbit Dormitory.' },
      tip: '汉字词「寄宿舍」。留学生天天听到的词，比"학교 기숙사"(学校宿舍) 更常单独用。', tipEn: 'Sino-Korean word for \'dormitory.\' A word international students hear daily; used alone more often than 학교 기숙사 (school dorm).',
      tier: 'core',
    },
    {
      id: 'd04-v1-e2',
      korean: '호',
      hangul: 'ho',
      zh: '号（房间号量词）', zhEn: 'Number (counter for room numbers)',
      pos: '名词', posEn: 'Noun',
      example: { ko: '방 번호는 몇 호예요?', zh: '房间号是几号？', zhEn: 'What\'s the room number?' },
      tip: '汉字词「号」。房间号后必加：301호（三百零一号）。用汉字数字读：삼백일호。', tipEn: 'Sino-Korean word for \'number.\' Must follow room numbers: 301호 (room 301). Read with Sino-Korean numerals: 삼백일호.',
      tier: 'core',
    },
    {
      id: 'd04-v1-e3',
      korean: '옆방',
      hangul: 'yeop-bang',
      zh: '隔壁房间', zhEn: 'Next-door room',
      pos: '名词', posEn: 'Noun',
      example: { ko: '옆방에 하루 학생이 있어요.', zh: '隔壁有 Haru 同学。', zhEn: 'Haru is in the room next door.' },
      tip: '옆(旁边) + 방(房间)。宿舍生活高频词——阿姨介绍邻居时的第一个词。', tipEn: '옆 (next to) + 방 (room). A high-frequency word in dorm life—the first word the auntie uses when introducing neighbors.',
      tier: 'core',
    },
    {
      id: 'd04-v1-e4',
      korean: '새로',
      hangul: 'sae-ro',
      zh: '新地 / 刚', zhEn: 'Newly / just',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '새로 온 학생이에요.', zh: '是新来的学生。', zhEn: 'He\'s a newly arrived student.' },
      tip: '副词，放在动词前。「새 학생」是形容词（新学生），「새로 온 학생」是"刚来的学生"，语感更活。', tipEn: 'Adverb, placed before verbs. 새 학생 is an adjective (new student), while 새로 온 학생 means \'a student who just arrived\'—more dynamic in nuance.',
      tier: 'core',
    },
    {
      id: 'd04-v1-e5',
      korean: '등록',
      hangul: 'deung-nok',
      zh: '登记 / 注册', zhEn: 'Register / sign up',
      pos: '名词', posEn: 'Noun',
      example: { ko: '등록해 주세요.', zh: '请登记一下。', zhEn: 'Please register.' },
      tip: '汉字词「登录」。宿舍/学校/银行都用。「등록증」= 登记证 = 外国人登录证（韩国留学生必备）。', tipEn: 'Sino-Korean word for \'log in\'. Used at dorms, schools, banks. \'등록증\' = registration card = Alien Registration Card (essential for international students in Korea).',
      tier: 'core',
    },
    {
      id: 'd04-v1-e6',
      korean: '여권',
      hangul: 'yeo-gwon',
      zh: '护照', zhEn: 'passport',
      pos: '名词', posEn: 'Noun',
      example: { ko: '여권 좀 보여주세요.', zh: '请给我看下护照。', zhEn: 'Please show me your passport.' },
      tip: '汉字词「旅券」。办入住、开银行账号、看病都得掏出来的证件。발음 [여꿘]，끝音略紧。', tipEn: 'Sino-Korean word for \'passport\'. The ID you need for check-ins, bank accounts, and doctor visits. Pronounced [여꿘], with a slightly tense final sound.',
      tier: 'core',
    },
    {
      id: 'd04-v1-e7',
      korean: '잠깐만요',
      hangul: 'jam-kkan-man-yo',
      zh: '请稍等一下', zhEn: 'Please wait a moment.',
      pos: '表达', posEn: 'Expression',
      example: { ko: '잠깐만요, 여권 좀 찾을게요.', zh: '稍等，我找一下护照。', zhEn: 'Just a moment, let me find my passport.' },
      tip: '「잠깐」(一会儿) + 「만」(只) + 「요」(敬语)。找东西/接电话/临时中断都用这句。', tipEn: '\'잠깐\' (a moment) + \'만\' (just) + \'요\' (polite). Use this when looking for something, answering the phone, or pausing briefly.',
      tier: 'ext',
    },
    {
      id: 'd04-v1-e8',
      korean: '알겠어요',
      hangul: 'al-ge-sseo-yo',
      zh: '明白了 / 知道了', zhEn: 'Got it / Understood',
      pos: '表达', posEn: 'Expression',
      example: { ko: '네, 알겠어요.', zh: '好的，我明白了。', zhEn: 'Okay, I understand.' },
      tip: '「알다」(知道) 的未来时敬语 = 我会知道/明白了。回应长辈/店员指示的标准答句。', tipEn: '\'알다\' (to know) in future polite form = I will know / got it. Standard reply to elders or staff instructions.',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字，各代表 1 词）
  // ─────────────────────────────────────────────
  write: [
    { id: 'd04-v1-w1', korean: '기',  hangul: 'gi',      wordKorean: '기숙사',   wordZh: '宿舍', wordZhEn: 'dormitory' },
    { id: 'd04-v1-w2', korean: '호',  hangul: 'ho',      wordKorean: '호',       wordZh: '号', wordZhEn: 'Number' },
    { id: 'd04-v1-w3', korean: '옆',  hangul: 'yeop',    wordKorean: '옆방',     wordZh: '隔壁', wordZhEn: 'Next door' },
    { id: 'd04-v1-w4', korean: '새',  hangul: 'sae',     wordKorean: '새로',     wordZh: '新地', wordZhEn: 'New place' },
    { id: 'd04-v1-w5', korean: '등',  hangul: 'deung',   wordKorean: '등록',     wordZh: '登记', wordZhEn: 'Register' },
    { id: 'd04-v1-w6', korean: '여',  hangul: 'yeo',     wordKorean: '여권',     wordZh: '护照', wordZhEn: 'passport' },
    { id: 'd04-v1-w7', korean: '잠',  hangul: 'jam',     wordKorean: '잠깐만요', wordZh: '请稍等', wordZhEn: 'Please wait a moment' },
    { id: 'd04-v1-w8', korean: '알',  hangul: 'al',      wordKorean: '알겠어요', wordZh: '明白了', wordZhEn: 'Got it' },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd04-v1-r1',
      korean: '기숙사',
      hangul: 'gi-suk-sa',
      choices: [
        { zh: '宿舍', zhEn: 'dormitory', correct: true },
        { zh: '学校', zhEn: 'School', correct: false },
        { zh: '公寓', zhEn: 'Apartment', correct: false },
        { zh: '教室', zhEn: 'Classroom', correct: false },
      ],
    },
    {
      id: 'd04-v1-r2',
      korean: '호',
      hangul: 'ho',
      choices: [
        { zh: '号（房间号）', zhEn: 'Number (room number)', correct: true },
        { zh: '楼', zhEn: 'Floor', correct: false },
        { zh: '室', zhEn: 'Room', correct: false },
        { zh: '栋', zhEn: 'Building', correct: false },
      ],
    },
    {
      id: 'd04-v1-r3',
      korean: '옆방',
      hangul: 'yeop-bang',
      choices: [
        { zh: '隔壁房间', zhEn: 'Next-door room', correct: true },
        { zh: '自己房间', zhEn: 'Own room', correct: false },
        { zh: '楼下房间', zhEn: 'Room downstairs', correct: false },
        { zh: '空房间', zhEn: 'Empty room', correct: false },
      ],
    },
    {
      id: 'd04-v1-r4',
      korean: '새로',
      hangul: 'sae-ro',
      choices: [
        { zh: '新地 / 刚', zhEn: 'Newly / just', correct: true },
        { zh: '再一次', zhEn: 'One more time', correct: false },
        { zh: '慢慢', zhEn: 'Slowly', correct: false },
        { zh: '一直', zhEn: 'straight / all the way', correct: false },
      ],
    },
    {
      id: 'd04-v1-r5',
      korean: '등록',
      hangul: 'deung-nok',
      choices: [
        { zh: '登记 / 登录', zhEn: 'Register / Log in', correct: true },
        { zh: '注销', zhEn: 'Log out', correct: false },
        { zh: '入学', zhEn: 'enrollment', correct: false },
        { zh: '打卡', zhEn: 'Check in', correct: false },
      ],
    },
    {
      id: 'd04-v1-r6',
      korean: '여권',
      hangul: 'yeo-gwon',
      choices: [
        { zh: '护照', zhEn: 'passport', correct: true },
        { zh: '身份证', zhEn: 'ID Card', correct: false },
        { zh: '学生证', zhEn: 'Student ID', correct: false },
        { zh: '钱包', zhEn: 'Wallet', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词，非字母级）
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd04-v1-s1',
      zhHint: '宿舍', zhHintEn: 'dormitory',
      answer: ['기', '숙', '사'],
      // 干扰："구"（元音 ㅣ→ㅜ 混）；"슥"（元音 ㅜ→ㅡ 高频混淆）
      syllables: ['기', '숙', '사', '구', '슥'],
    },
    {
      id: 'd04-v1-s2',
      zhHint: '隔壁房间', zhHintEn: 'Next-door room',
      answer: ['옆', '방'],
      // 干扰："옷"（收音 ㅍ→ㅅ 视觉相近）；"밥"（초성 ㅂ 相同，语义翻车）
      syllables: ['옆', '방', '옷', '밥'],
    },
    {
      id: 'd04-v1-s3',
      zhHint: '护照', zhHintEn: 'passport',
      answer: ['여', '권'],
      // 干扰："야"（元音 ㅕ→ㅑ 常混）；"건"（初声 ㄱ 相同，元音差别）
      syllables: ['여', '권', '야', '건'],
    },
    {
      id: 'd04-v1-s4',
      zhHint: '登记', zhHintEn: 'Register',
      answer: ['등', '록'],
      // 干扰："둥"（元音 ㅡ→ㅜ 高频混淆）；"목"（初声 ㄹ→ㅁ 混）
      syllables: ['등', '록', '둥', '목'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd04-v1-d1', korean: '기숙사',   hangul: 'gi-suk-sa',     syllables: ['기', '숙', '사'],       zh: '宿舍', zhEn: 'dormitory' },
    { id: 'd04-v1-d2', korean: '여권',     hangul: 'yeo-gwon',      syllables: ['여', '권'],             zh: '护照', zhEn: 'passport' },
    { id: 'd04-v1-d3', korean: '알겠어요', hangul: 'al-ge-sseo-yo', syllables: ['알', '겠', '어', '요'], zh: '明白了', zhEn: 'Got it' },
  ],
};
