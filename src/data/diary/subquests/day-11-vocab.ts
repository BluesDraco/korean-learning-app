import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 11 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词之外的 8 个新词——围绕 다이소场景：
 * - core: 필요해요 / 세 개 / 좋아해요 / 얼마 / 키링 / 사다
 * - ext:  뭐 / 여기
 *
 * 教学重点：
 *   필요해요 是购物场景高频动词，Day 9/13 都会重复
 *   세 개 是固有数量词的核心组合（1-4 与量词的变形）
 *   좋아해요 vs 좋아요 是 Chapter 2 常混淆的点——动词 vs 形容词
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 */
export const day11Vocab: VocabSubQuestData = {
  day: 11,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '다이소 收银台前学会的 8 个词', subtitleEn: '8 words learned at the Daiso checkout counter',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd11-v1-e1',
      korean: '필요해요',
      hangul: 'pi-ryo-hae-yo',
      zh: '需要', zhEn: 'Need',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '수건이 필요해요.', zh: '需要毛巾。', zhEn: 'I need a towel.' },
      tip: '汉字词 「필요(必要) + 하다」→ 필요하다 → 필요해요。韩语里 필요하다 是形容词，需要的东西用 이/가 主格（수건이 필요해요），不是 을/를', tipEn: 'Sino-Korean \'필요 (necessity) + 하다\' → 필요하다 → 필요해요. In Korean, 필요하다 is an adjective; the thing needed takes the subject particle 이/가 (수건이 필요해요), not 을/를',
      tier: 'core',
    },
    {
      id: 'd11-v1-e2',
      korean: '세 개',
      hangul: 'se gae',
      zh: '三个', zhEn: 'three',
      pos: '数量', posEn: 'quantity',
      example: { ko: '수건 세 개 주세요.', zh: '请给我三条毛巾。', zhEn: 'Please give me three towels.' },
      tip: '固有数 「셋(3)」搭量词时变「세」→ 세 개。1-4 都要变形：하나→한、둘→두、셋→세、넷→네', tipEn: 'Native number \'셋 (3)\' becomes \'세\' before a counter → 세 개. 1-4 all change: 하나→한, 둘→두, 셋→세, 넷→네',
      tier: 'core',
    },
    {
      id: 'd11-v1-e3',
      korean: '좋아해요',
      hangul: 'jo-a-hae-yo',
      zh: '喜欢', zhEn: 'like',
      pos: '动词', posEn: 'Verb',
      example: { ko: '당근을 좋아해요.', zh: '喜欢胡萝卜。', zhEn: 'I like carrots.' },
      tip: '좋아하다(喜欢·动词) 的 해요体。**跟 좋아요(好·形容词) 不同**——喜欢用 좋아해요，宾语用 을/를', tipEn: '좋아하다 (to like·verb) in 해요 style. **Different from 좋아요 (good·adjective)** — for liking use 좋아해요, with the object particle 을/를',
      tier: 'core',
    },
    {
      id: 'd11-v1-e4',
      korean: '얼마',
      hangul: 'eol-ma',
      zh: '多少', zhEn: 'how much',
      pos: '疑问词', posEn: 'interrogative',
      example: { ko: '이거 얼마예요?', zh: '这个多少钱？', zhEn: 'How much is this?' },
      tip: '얼마(多少) + 예요(是) = 多少钱。「얼마나」= 多么/多久。价格用 얼마예요，数量用 몇 개', tipEn: '얼마 (how much) + 예요 (is) = how much is it. \'얼마나\' = how much/how long. For price use 얼마예요, for quantity use 몇 개',
      tier: 'core',
    },
    {
      id: 'd11-v1-e5',
      korean: '키링',
      hangul: 'ki-ring',
      zh: '钥匙扣 / 挂饰', zhEn: 'keyring / charm',
      pos: '名词', posEn: 'Noun',
      example: { ko: '당근 키링 예쁘다.', zh: '胡萝卜钥匙扣好可爱。', zhEn: 'The carrot keyring is so cute.' },
      tip: '外来词 keyring。也说 「열쇠고리」（固有词，열쇠 = 钥匙 + 고리 = 环）。年轻人日常用 키링', tipEn: 'Loanword keyring. Also \'열쇠고리\' (native word, 열쇠 = key + 고리 = ring). Young people use 키링 in daily speech',
      tier: 'core',
    },
    {
      id: 'd11-v1-e6',
      korean: '사다',
      hangul: 'sa-da',
      zh: '买', zhEn: 'Buy',
      pos: '动词', posEn: 'Verb',
      example: { ko: '슬리퍼를 사요.', zh: '买拖鞋。', zhEn: 'Buy slippers.' },
      tip: '사다 → 해요体 사요（사 + 아요 音节合并 → 사요）。宾语用 을/를。「사다 vs 팔다」= 买/卖', tipEn: '사다 → 해요 style 사요 (사 + 아요 syllables merge → 사요). Object takes 을/를. \'사다 vs 팔다\' = buy/sell',
      tier: 'core',
    },
    {
      id: 'd11-v1-e7',
      korean: '뭐',
      hangul: 'mwo',
      zh: '什么', zhEn: 'what',
      pos: '疑问词', posEn: 'interrogative',
      example: { ko: '이거 뭐예요?', zh: '这个是什么？', zhEn: 'What is this?' },
      tip: '「무엇」的口语缩写。「뭐예요?」= 是什么？口语常用；「무엇입니까?」正式书面', tipEn: 'Colloquial abbreviation of "무엇." "뭐예요?" = What is it? Common in speech; "무엇입니까?" is formal/written.',
      tier: 'ext',
    },
    {
      id: 'd11-v1-e8',
      korean: '여기',
      hangul: 'yeo-gi',
      zh: '这里', zhEn: 'here',
      pos: '代词', posEn: 'Pronoun',
      example: { ko: '여기 있어요.', zh: '在这里。', zhEn: 'Here it is.' },
      tip: '空间指代三层的"这里"：여기(这里·我附近) / 거기(那里·你附近) / 저기(那里·两人都远)', tipEn: 'Spatial reference has three levels of "here": 여기 (here, near me) / 거기 (there, near you) / 저기 (there, far from both).',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字）
  // ─────────────────────────────────────────────
  write: [
    { id: 'd11-v1-w1', korean: '필',  hangul: 'pil',     wordKorean: '필요해요', wordZh: '需要', wordZhEn: 'Need' },
    { id: 'd11-v1-w2', korean: '세',  hangul: 'se',      wordKorean: '세 개',    wordZh: '三个', wordZhEn: 'three' },
    { id: 'd11-v1-w3', korean: '좋',  hangul: 'jot',     wordKorean: '좋아해요', wordZh: '喜欢', wordZhEn: 'like' },
    { id: 'd11-v1-w4', korean: '얼',  hangul: 'eol',     wordKorean: '얼마',     wordZh: '多少', wordZhEn: 'how much' },
    { id: 'd11-v1-w5', korean: '링',  hangul: 'ring',    wordKorean: '키링',     wordZh: '钥匙扣', wordZhEn: 'Keychain' },
    { id: 'd11-v1-w6', korean: '사',  hangul: 'sa',      wordKorean: '사다',     wordZh: '买', wordZhEn: 'Buy' },
    { id: 'd11-v1-w7', korean: '뭐',  hangul: 'mwo',     wordKorean: '뭐',       wordZh: '什么', wordZhEn: 'what' },
    { id: 'd11-v1-w8', korean: '여',  hangul: 'yeo',     wordKorean: '여기',     wordZh: '这里', wordZhEn: 'here' },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd11-v1-r1',
      korean: '필요해요',
      hangul: 'pi-ryo-hae-yo',
      choices: [
        { zh: '需要', zhEn: 'Need', correct: true },
        { zh: '想要', zhEn: 'To want', correct: false },
        { zh: '有', zhEn: 'to have / there is', correct: false },
        { zh: '没有', zhEn: 'to not have / there isn\'t', correct: false },
      ],
    },
    {
      id: 'd11-v1-r2',
      korean: '세 개',
      hangul: 'se gae',
      choices: [
        { zh: '三个', zhEn: 'three', correct: true },
        { zh: '两个', zhEn: 'Two', correct: false },
        { zh: '四个', zhEn: 'Four', correct: false },
        { zh: '三瓶', zhEn: 'Three bottles', correct: false },
      ],
    },
    {
      id: 'd11-v1-r3',
      korean: '좋아해요',
      hangul: 'jo-a-hae-yo',
      choices: [
        { zh: '喜欢（动词）', zhEn: 'To like (verb)', correct: true },
        { zh: '好（形容词）', zhEn: 'Good (adjective)', correct: false },
        { zh: '讨厌', zhEn: 'To hate', correct: false },
        { zh: '没事', zhEn: 'It\'s nothing', correct: false },
      ],
    },
    {
      id: 'd11-v1-r4',
      korean: '얼마',
      hangul: 'eol-ma',
      choices: [
        { zh: '多少', zhEn: 'how much', correct: true },
        { zh: '什么', zhEn: 'what', correct: false },
        { zh: '哪里', zhEn: 'Where', correct: false },
        { zh: '谁', zhEn: 'Who', correct: false },
      ],
    },
    {
      id: 'd11-v1-r5',
      korean: '키링',
      hangul: 'ki-ring',
      choices: [
        { zh: '钥匙扣 / 挂饰', zhEn: 'keyring / charm', correct: true },
        { zh: '钥匙', zhEn: 'Key', correct: false },
        { zh: '包包', zhEn: 'Bag', correct: false },
        { zh: '手表', zhEn: 'Watch', correct: false },
      ],
    },
    {
      id: 'd11-v1-r6',
      korean: '사다',
      hangul: 'sa-da',
      choices: [
        { zh: '买', zhEn: 'Buy', correct: true },
        { zh: '卖', zhEn: 'To sell', correct: false },
        { zh: '给', zhEn: 'To give', correct: false },
        { zh: '拿', zhEn: 'To take', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词）
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd11-v1-s1',
      zhHint: '洗发水', zhHintEn: 'Shampoo',
      answer: ['샴', '푸'],
      // 干扰："삼"（收音 ㅁ 相同、元音差别）；"부"（초성 ㅍ→ㅂ 送气差别）
      syllables: ['샴', '푸', '삼', '부'],
    },
    {
      id: 'd11-v1-s2',
      zhHint: '毛巾', zhHintEn: 'Towel',
      answer: ['수', '건'],
      // 干扰："소"（元音 ㅜ→ㅗ 混）；"신"（초성 ㄱ→ㅅ 混，收音差别）
      syllables: ['수', '건', '소', '신'],
    },
    {
      id: 'd11-v1-s3',
      zhHint: '钥匙扣', zhHintEn: 'Keychain',
      answer: ['키', '링'],
      // 干扰："기"（초성 ㅋ→ㄱ 送气差别）；"랑"（收音 ㅇ 相同、元音差别）
      syllables: ['키', '링', '기', '랑'],
    },
    {
      id: 'd11-v1-s4',
      zhHint: '拖鞋', zhHintEn: 'Slippers',
      answer: ['슬', '리', '퍼'],
      // 干扰："술"（元音 ㅡ→ㅜ 混）；"프"（元音 ㅓ→ㅡ 混）
      syllables: ['슬', '리', '퍼', '술', '프'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd11-v1-d1', korean: '저거',    hangul: 'jeo-geo',     syllables: ['저', '거'],       zh: '那个（远处）', zhEn: 'That (over there)' },
    { id: 'd11-v1-d2', korean: '천 원',   hangul: 'cheon won',   syllables: ['천', '원'],       zh: '1000 元', zhEn: '1,000 won' },
    { id: 'd11-v1-d3', korean: '이것도',  hangul: 'i-geot-do',   syllables: ['이', '것', '도'], zh: '这个也', zhEn: 'This too' },
  ],
};
