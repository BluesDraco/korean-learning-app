import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 17 · 1-1 단어 마스터 · 词汇子关卡
 *
 * T-money 卡场景 8 个新词：
 * - core: 카드 / 현금 / 표 / 안내 / 사진 / 잠깐
 * - ext:  도와주다 / 돕다
 */
export const day17Vocab: VocabSubQuestData = {
  day: 17,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '地铁站售票窗口前学会的 8 个词', subtitleEn: '8 words learned at the subway ticket booth',

  encounter: [
    {
      id: 'd17-v1-e1',
      korean: '카드',
      hangul: 'ka-deu',
      zh: '卡片', zhEn: 'card',
      pos: '名词', posEn: 'Noun',
      example: { ko: '카드로 할게요.', zh: '我用卡付。', zhEn: 'I\'ll pay by card.' },
      tip: '外来词 card。「카드로」= 用卡（로 是"用~"的方式助词）。反义 「현금」= 现金', tipEn: 'Loanword card. \'카드로\' = with a card (로 is the method particle \'with~\'). Opposite \'현금\' = cash',
      tier: 'core',
    },
    {
      id: 'd17-v1-e2',
      korean: '현금',
      hangul: 'hyeon-geum',
      zh: '现金', zhEn: 'cash',
      pos: '名词', posEn: 'Noun',
      example: { ko: '현금이에요, 카드예요?', zh: '现金还是卡？', zhEn: 'Cash or card?' },
      tip: '汉字词「现金」。搭配 「현금으로」= 用现金。「카드/현금」是收银台最常听到的二选一', tipEn: 'Sino-Korean \'cash\'. \'현금으로\' = with cash. \'카드/현금\' is the most common either-or at the register',
      tier: 'core',
    },
    {
      id: 'd17-v1-e3',
      korean: '표',
      hangul: 'pyo',
      zh: '票', zhEn: 'ticket',
      pos: '名词', posEn: 'Noun',
      example: { ko: '지하철 표 사요.', zh: '买地铁票。', zhEn: 'Buy a subway ticket.' },
      tip: '固有词。「티켓」是外来语也常用。「일회용 교통카드」= 一次性交通卡（现在多数地铁站没有纸票）', tipEn: 'Native word. \'티켓\' is a common loanword too. \'일회용 교통카드\' = one-time transit card (most subway stations no longer have paper tickets)',
      tier: 'core',
    },
    {
      id: 'd17-v1-e4',
      korean: '안내',
      hangul: 'an-nae',
      zh: '指引 / 引导', zhEn: 'guidance / direction',
      pos: '名词', posEn: 'Noun',
      example: { ko: '5층 안내를 봐요.', zh: '看5层的指引。', zhEn: 'Check the guidance for the 5th floor.' },
      tip: '汉字词「案内」。搭配 「안내하다」= 引导。地铁站/百货公司常见——안내데스크（问询台/服务台）', tipEn: 'Sino-Korean \'guidance\'. \'안내하다\' = to guide. Common in subway stations/department stores — 안내데스크 (information desk)',
      tier: 'core',
    },
    {
      id: 'd17-v1-e5',
      korean: '사진',
      hangul: 'sa-jin',
      zh: '照片', zhEn: 'photo',
      pos: '名词', posEn: 'Noun',
      example: { ko: '사진 찍어 주세요.', zh: '请帮我拍照。', zhEn: 'Please take a photo for me.' },
      tip: '汉字词「写真」。搭配 「사진을 찍다」= 拍照。旅行必备词', tipEn: 'Sino-Korean \'photo\'. \'사진을 찍다\' = to take a photo. Essential travel word',
      tier: 'core',
    },
    {
      id: 'd17-v1-e6',
      korean: '잠깐',
      hangul: 'jam-kkan',
      zh: '一会儿 / 稍等', zhEn: 'a moment / wait',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '잠깐 기다려 주세요.', zh: '请稍等一下。', zhEn: 'Please wait a moment.' },
      tip: '「잠깐만요」= 等一下（叫住别人）；「잠깐 기다려 주세요」= 请稍等（더 정중）', tipEn: '\'잠깐만요\' = hold on (to stop someone); \'잠깐 기다려 주세요\' = please wait a moment (more polite)',
      tier: 'core',
    },
    {
      id: 'd17-v1-e7',
      korean: '도와주다',
      hangul: 'do-wa-ju-da',
      zh: '帮助', zhEn: 'help',
      pos: '动词', posEn: 'Verb',
      example: { ko: '도와주세요!', zh: '请帮帮我！', zhEn: 'Please help me!' },
      tip: '돕다(帮·ㅂ 不规则) + 아 주다 = 도와주다。「도와주세요」是紧急求助黄金句', tipEn: '돕다 (help·ㅂ irregular) + 아 주다 = 도와주다. \'도와주세요\' is the golden phrase for asking for help',
      tier: 'ext',
    },
    {
      id: 'd17-v1-e8',
      korean: '돕다',
      hangul: 'dop-da',
      zh: '帮 / 帮助（词根）', zhEn: 'help / to help (root)',
      pos: '动词', posEn: 'Verb',
      example: { ko: '친구를 도와요.', zh: '帮助朋友。', zhEn: 'Help a friend.' },
      tip: 'ㅂ 不规则动词。돕 + 아 → 도와（不是 돕아 ❌）。해요体 도와요', tipEn: 'ㅂ irregular verb. 돕 + 아 → 도와 (not 돕아 ❌). 해요 form: 도와요',
      tier: 'ext',
    },
  ],

  write: [
    { id: 'd17-v1-w1', korean: '카',  hangul: 'ka',      wordKorean: '카드',       wordZh: '卡片', wordZhEn: 'card' },
    { id: 'd17-v1-w2', korean: '현',  hangul: 'hyeon',   wordKorean: '현금',       wordZh: '现金', wordZhEn: 'cash' },
    { id: 'd17-v1-w3', korean: '표',  hangul: 'pyo',     wordKorean: '표',         wordZh: '票', wordZhEn: 'ticket' },
    { id: 'd17-v1-w4', korean: '안',  hangul: 'an',      wordKorean: '안내',       wordZh: '指引', wordZhEn: 'guide' },
    { id: 'd17-v1-w5', korean: '사',  hangul: 'sa',      wordKorean: '사진',       wordZh: '照片', wordZhEn: 'photo' },
    { id: 'd17-v1-w6', korean: '잠',  hangul: 'jam',     wordKorean: '잠깐',       wordZh: '稍等', wordZhEn: 'wait a moment' },
    { id: 'd17-v1-w7', korean: '도',  hangul: 'do',      wordKorean: '도와주다',   wordZh: '帮助', wordZhEn: 'help' },
    { id: 'd17-v1-w8', korean: '돕',  hangul: 'dop',     wordKorean: '돕다',       wordZh: '帮', wordZhEn: 'help' },
  ],

  recognize: [
    {
      id: 'd17-v1-r1',
      korean: '카드',
      hangul: 'ka-deu',
      choices: [
        { zh: '卡片', zhEn: 'card', correct: true },
        { zh: '现金', zhEn: 'cash', correct: false },
        { zh: '票', zhEn: 'ticket', correct: false },
        { zh: '照片', zhEn: 'photo', correct: false },
      ],
    },
    {
      id: 'd17-v1-r2',
      korean: '현금',
      hangul: 'hyeon-geum',
      choices: [
        { zh: '现金', zhEn: 'cash', correct: true },
        { zh: '卡片', zhEn: 'card', correct: false },
        { zh: '票', zhEn: 'ticket', correct: false },
        { zh: '存款', zhEn: 'deposit', correct: false },
      ],
    },
    {
      id: 'd17-v1-r3',
      korean: '표',
      hangul: 'pyo',
      choices: [
        { zh: '票', zhEn: 'ticket', correct: true },
        { zh: '收据', zhEn: 'receipt', correct: false },
        { zh: '标志', zhEn: 'sign', correct: false },
        { zh: '袋子', zhEn: 'bag', correct: false },
      ],
    },
    {
      id: 'd17-v1-r4',
      korean: '안내',
      hangul: 'an-nae',
      choices: [
        { zh: '指引 / 引导', zhEn: 'guidance / direction', correct: true },
        { zh: '入口', zhEn: 'entrance', correct: false },
        { zh: '出口', zhEn: 'exit', correct: false },
        { zh: '广告', zhEn: 'advertisement', correct: false },
      ],
    },
    {
      id: 'd17-v1-r5',
      korean: '사진',
      hangul: 'sa-jin',
      choices: [
        { zh: '照片', zhEn: 'photo', correct: true },
        { zh: '画', zhEn: 'drawing', correct: false },
        { zh: '视频', zhEn: 'video', correct: false },
        { zh: '海报', zhEn: 'poster', correct: false },
      ],
    },
    {
      id: 'd17-v1-r6',
      korean: '잠깐',
      hangul: 'jam-kkan',
      choices: [
        { zh: '一会儿 / 稍等', zhEn: 'a moment / wait', correct: true },
        { zh: '很久', zhEn: 'a long time', correct: false },
        { zh: '快点', zhEn: 'hurry up', correct: false },
        { zh: '慢点', zhEn: 'slow down', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd17-v1-s1',
      zhHint: 'T-money 卡', zhHintEn: 'T-money card',
      answer: ['티', '머', '니'],
      // 干扰："디"（초성 ㅌ→ㄷ 送气差别）；"미"（초성 ㅁ 相同、元음 ㅓ→ㅣ 混）
      syllables: ['티', '머', '니', '디', '미'],
    },
    {
      id: 'd17-v1-s2',
      zhHint: '充值', zhHintEn: 'recharge',
      answer: ['충', '전'],
      // 干扰："층"（초성 ㅊ 相同、元음 ㅜ→ㅡ 混）；"전"外加 "성"（받침 ㅇ→ㅇ 相同、元음差别）
      syllables: ['충', '전', '층', '성'],
    },
    {
      id: 'd17-v1-s3',
      zhHint: '一万韩元', zhHintEn: '10,000 won',
      answer: ['만', '원'],
      // 干扰："문"（초성 ㅁ 相同、元음差别）；"완"（초성 ㅇ 相同、元음差别）
      syllables: ['만', '원', '문', '완'],
    },
    {
      id: 'd17-v1-s4',
      zhHint: '好了 / 可以了', zhHintEn: 'done / that\'s it',
      answer: ['됐', '어', '요'],
      // 干扰："뒀"（元음 ㅘ→ㅝ 混）；"에"（元음 ㅓ→ㅔ 混）
      syllables: ['됐', '어', '요', '뒀', '에'],
    },
  ],

  dictation: [
    { id: 'd17-v1-d1', korean: '카드',      hangul: 'ka-deu',           syllables: ['카', '드'],           zh: '卡片', zhEn: 'card' },
    { id: 'd17-v1-d2', korean: '충전 해 주세요', hangul: 'chung-jeon hae ju-se-yo', syllables: ['충', '전', '해', '주', '세', '요'], zh: '请帮我充值', zhEn: 'Please help me top up' },
    { id: 'd17-v1-d3', korean: '도와주세요', hangul: 'do-wa-ju-se-yo',   syllables: ['도', '와', '주', '세', '요'], zh: '请帮帮我', zhEn: 'Please help me' },
  ],
};
