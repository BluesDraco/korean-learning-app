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
  subtitle: '한빛宿舍前台悄悄多学的 8 个词',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd04-v1-e1',
      korean: '기숙사',
      hangul: 'gi-suk-sa',
      zh: '宿舍',
      pos: '名词',
      example: { ko: '한빛 기숙사예요.', zh: '是韩光宿舍。' },
      tip: '汉字词「寄宿舍」。留学生天天听到的词，比"학교 기숙사"(学校宿舍) 更常单独用。',
      tier: 'core',
    },
    {
      id: 'd04-v1-e2',
      korean: '호',
      hangul: 'ho',
      zh: '号（房间号量词）',
      pos: '名词',
      example: { ko: '방 번호는 몇 호예요?', zh: '房间号是几号？' },
      tip: '汉字词「号」。房间号后必加：301호（三百零一号）。用汉字数字读：삼백일호。',
      tier: 'core',
    },
    {
      id: 'd04-v1-e3',
      korean: '옆방',
      hangul: 'yeop-bang',
      zh: '隔壁房间',
      pos: '名词',
      example: { ko: '옆방에 하루 학생이 있어요.', zh: '隔壁有 Haru 同学。' },
      tip: '옆(旁边) + 방(房间)。宿舍生活高频词——阿姨介绍邻居时的第一个词。',
      tier: 'core',
    },
    {
      id: 'd04-v1-e4',
      korean: '새로',
      hangul: 'sae-ro',
      zh: '新地 / 刚',
      pos: '副词',
      example: { ko: '새로 온 학생이에요.', zh: '是新来的学生。' },
      tip: '副词，放在动词前。「새 학생」是形容词（新学生），「새로 온 학생」是"刚来的学生"，语感更活。',
      tier: 'core',
    },
    {
      id: 'd04-v1-e5',
      korean: '등록',
      hangul: 'deung-nok',
      zh: '登记 / 注册',
      pos: '名词',
      example: { ko: '등록해 주세요.', zh: '请登记一下。' },
      tip: '汉字词「登录」。宿舍/学校/银行都用。「등록증」= 登记证 = 外国人登录证（韩国留学生必备）。',
      tier: 'core',
    },
    {
      id: 'd04-v1-e6',
      korean: '여권',
      hangul: 'yeo-gwon',
      zh: '护照',
      pos: '名词',
      example: { ko: '여권 좀 보여주세요.', zh: '请给我看下护照。' },
      tip: '汉字词「旅券」。办入住、开银行账号、看病都得掏出来的证件。발음 [여꿘]，끝音略紧。',
      tier: 'core',
    },
    {
      id: 'd04-v1-e7',
      korean: '잠깐만요',
      hangul: 'jam-kkan-man-yo',
      zh: '请稍等一下',
      pos: '表达',
      example: { ko: '잠깐만요, 여권 좀 찾을게요.', zh: '稍等，我找一下护照。' },
      tip: '「잠깐」(一会儿) + 「만」(只) + 「요」(敬语)。找东西/接电话/临时中断都用这句。',
      tier: 'ext',
    },
    {
      id: 'd04-v1-e8',
      korean: '알겠어요',
      hangul: 'al-ge-sseo-yo',
      zh: '明白了 / 知道了',
      pos: '表达',
      example: { ko: '네, 알겠어요.', zh: '好的，我明白了。' },
      tip: '「알다」(知道) 的未来时敬语 = 我会知道/明白了。回应长辈/店员指示的标准答句。',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字，各代表 1 词）
  // ─────────────────────────────────────────────
  write: [
    { id: 'd04-v1-w1', korean: '기',  hangul: 'gi',      wordKorean: '기숙사',   wordZh: '宿舍' },
    { id: 'd04-v1-w2', korean: '호',  hangul: 'ho',      wordKorean: '호',       wordZh: '号' },
    { id: 'd04-v1-w3', korean: '옆',  hangul: 'yeop',    wordKorean: '옆방',     wordZh: '隔壁' },
    { id: 'd04-v1-w4', korean: '새',  hangul: 'sae',     wordKorean: '새로',     wordZh: '新地' },
    { id: 'd04-v1-w5', korean: '등',  hangul: 'deung',   wordKorean: '등록',     wordZh: '登记' },
    { id: 'd04-v1-w6', korean: '여',  hangul: 'yeo',     wordKorean: '여권',     wordZh: '护照' },
    { id: 'd04-v1-w7', korean: '잠',  hangul: 'jam',     wordKorean: '잠깐만요', wordZh: '请稍等' },
    { id: 'd04-v1-w8', korean: '알',  hangul: 'al',      wordKorean: '알겠어요', wordZh: '明白了' },
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
        { zh: '宿舍', correct: true },
        { zh: '学校', correct: false },
        { zh: '公寓', correct: false },
        { zh: '教室', correct: false },
      ],
    },
    {
      id: 'd04-v1-r2',
      korean: '호',
      hangul: 'ho',
      choices: [
        { zh: '号（房间号）', correct: true },
        { zh: '楼', correct: false },
        { zh: '室', correct: false },
        { zh: '栋', correct: false },
      ],
    },
    {
      id: 'd04-v1-r3',
      korean: '옆방',
      hangul: 'yeop-bang',
      choices: [
        { zh: '隔壁房间', correct: true },
        { zh: '自己房间', correct: false },
        { zh: '楼下房间', correct: false },
        { zh: '空房间', correct: false },
      ],
    },
    {
      id: 'd04-v1-r4',
      korean: '새로',
      hangul: 'sae-ro',
      choices: [
        { zh: '新地 / 刚', correct: true },
        { zh: '再一次', correct: false },
        { zh: '慢慢', correct: false },
        { zh: '一直', correct: false },
      ],
    },
    {
      id: 'd04-v1-r5',
      korean: '등록',
      hangul: 'deung-nok',
      choices: [
        { zh: '登记 / 登录', correct: true },
        { zh: '注销', correct: false },
        { zh: '入学', correct: false },
        { zh: '打卡', correct: false },
      ],
    },
    {
      id: 'd04-v1-r6',
      korean: '여권',
      hangul: 'yeo-gwon',
      choices: [
        { zh: '护照', correct: true },
        { zh: '身份证', correct: false },
        { zh: '学生证', correct: false },
        { zh: '钱包', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词，非字母级）
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd04-v1-s1',
      zhHint: '宿舍',
      answer: ['기', '숙', '사'],
      // 干扰："구"（元音 ㅣ→ㅜ 混）；"슥"（元音 ㅜ→ㅡ 高频混淆）
      syllables: ['기', '숙', '사', '구', '슥'],
    },
    {
      id: 'd04-v1-s2',
      zhHint: '隔壁房间',
      answer: ['옆', '방'],
      // 干扰："옷"（收音 ㅍ→ㅅ 视觉相近）；"밥"（초성 ㅂ 相同，语义翻车）
      syllables: ['옆', '방', '옷', '밥'],
    },
    {
      id: 'd04-v1-s3',
      zhHint: '护照',
      answer: ['여', '권'],
      // 干扰："야"（元音 ㅕ→ㅑ 常混）；"건"（初声 ㄱ 相同，元音差别）
      syllables: ['여', '권', '야', '건'],
    },
    {
      id: 'd04-v1-s4',
      zhHint: '登记',
      answer: ['등', '록'],
      // 干扰："둥"（元音 ㅡ→ㅜ 高频混淆）；"목"（初声 ㄹ→ㅁ 混）
      syllables: ['등', '록', '둥', '목'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd04-v1-d1', korean: '기숙사',   hangul: 'gi-suk-sa',     syllables: ['기', '숙', '사'],       zh: '宿舍' },
    { id: 'd04-v1-d2', korean: '여권',     hangul: 'yeo-gwon',      syllables: ['여', '권'],             zh: '护照' },
    { id: 'd04-v1-d3', korean: '알겠어요', hangul: 'al-ge-sseo-yo', syllables: ['알', '겠', '어', '요'], zh: '明白了' },
  ],
};
