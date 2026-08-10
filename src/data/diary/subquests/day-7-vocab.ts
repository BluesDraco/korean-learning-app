import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 7 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词之外的 8 个新词——围绕地铁末班车 + 求助场景：
 * - core: 역 / 열차 / 핸드폰 / 우산 / 길 / 고마워（반말首次进考察）
 * - ext:  없어요 / 여기（进拼写/听写考察）
 *
 * 教学重点：고마워 是반말首次亮相——Haru 对 Tori 说 괜찮아，Tori 也可用 고마워 回应
 * 있어요/없어요 是 Day 10 있어요/없어요 语法的先修
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 */
export const day7Vocab: VocabSubQuestData = {
  day: 7,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '雨夜地铁站悄悄多学的 8 个词', subtitleEn: '8 words quietly picked up at a rainy subway station',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd07-v1-e1',
      korean: '역',
      hangul: 'yeok',
      zh: '站 / 车站', zhEn: 'station',
      pos: '名词', posEn: 'Noun',
      example: { ko: '이 역은 어디예요?', zh: '这站是哪儿？', zhEn: 'What station is this?' },
      tip: '汉字词「驿」。地铁/火车站名字后缀——「강남역」= 江南站、「홍대입구역」= 弘大入口站。발음 [역]，ㄱ 收音闭口。', tipEn: 'Sino-Korean word \'yeok\'. Suffix for subway/train station names — \'강남역\' = Gangnam Station, \'홍대입구역\' = Hongdae Entrance Station. Pronounced [yeok], with a ㄱ batchim (closed mouth).',
      tier: 'core',
    },
    {
      id: 'd07-v1-e2',
      korean: '열차',
      hangul: 'yeol-cha',
      zh: '列车', zhEn: 'Train',
      pos: '名词', posEn: 'Noun',
      example: { ko: '마지막 열차예요.', zh: '是末班车。', zhEn: 'It\'s the last train.' },
      tip: '汉字词「列车」。地铁广播用「지하철 열차」，比 기차（火车） 更贴日常。「마지막 열차」= 末班车。', tipEn: 'Sino-Korean word for "train." Subway announcements use "지하철 열차," which feels more everyday than 기차 (train). "마지막 열차" = last train.',
      tier: 'core',
    },
    {
      id: 'd07-v1-e3',
      korean: '핸드폰',
      hangul: 'haen-deu-pon',
      zh: '手机', zhEn: 'phone',
      pos: '名词', posEn: 'Noun',
      example: { ko: '핸드폰 배터리가 1%예요.', zh: '手机电量只剩 1%。', zhEn: 'My phone battery is at 1%.' },
      tip: '外来语 hand phone（韩式英语）。也说 「휴대폰」（携带电话）。年轻人日常更常用 핸드폰。', tipEn: 'Loanword "hand phone" (Konglish). Also said as "휴대폰" (portable phone). Younger people use 핸드폰 more in daily life.',
      tier: 'core',
    },
    {
      id: 'd07-v1-e4',
      korean: '우산',
      hangul: 'u-san',
      zh: '雨伞', zhEn: 'umbrella',
      pos: '名词', posEn: 'Noun',
      example: { ko: '우산 있어요?', zh: '有伞吗？', zhEn: 'Do you have an umbrella?' },
      tip: '汉字词「雨伞」。首尔雨天频繁，随时可能问「우산 있어요?」。발음 [우산]，两个音节都短促。', tipEn: 'Sino-Korean word for "umbrella." Rain is frequent in Seoul, so you might be asked "우산 있어요?" anytime. Pronunciation [우산], both syllables short and clipped.',
      tier: 'core',
    },
    {
      id: 'd07-v1-e5',
      korean: '길',
      hangul: 'gil',
      zh: '路', zhEn: 'Road',
      pos: '名词', posEn: 'Noun',
      example: { ko: '길을 잃었어요.', zh: '我迷路了。', zhEn: 'I\'m lost.' },
      tip: '固有词。「길을 잃다」= 迷路（这句要背下来）。收音 ㄹ 卷舌尖抵上颚。', tipEn: 'Native Korean word. "길을 잃다" = to get lost (memorize this one). The final consonant ㄹ: curl your tongue tip to touch the upper palate.',
      tier: 'core',
    },
    {
      id: 'd07-v1-e6',
      korean: '고마워',
      hangul: 'go-ma-wo',
      zh: '谢了（반말）', zhEn: 'Thanks (반말)',
      pos: '表达', posEn: 'Expression',
      example: { ko: '고마워, 하루야.', zh: '谢了，Haru。', zhEn: 'Thanks, Haru.' },
      tip: '「고마워요」的반말版。对同龄好友用。注意韩国文化里，通常两人熟了、或一方先提议「말 놓자」（不用敬语了）之后才互用반말——不要对刚认识的人直接用반말。', tipEn: 'The 반말 version of "고마워요." Use it with close friends your age. Note that in Korean culture, 반말 is typically used only after two people have gotten close, or one suggests "말 놓자" (let\'s drop formalities) — don\'t use 반말 with someone you just met.',
      tier: 'core',
    },
    {
      id: 'd07-v1-e7',
      korean: '없어요',
      hangul: 'eop-seo-yo',
      zh: '没有 / 不在', zhEn: 'Don\'t have / Not here',
      pos: '动词', posEn: 'Verb',
      example: { ko: '우산이 없어요.', zh: '没有伞。', zhEn: 'I don\'t have an umbrella.' },
      tip: '「없다」的해요体。跟 「있어요」（有）是一对反义词。Day 10 会正式讲 있어요/없어요 语法。', tipEn: 'The 해요 form of "없다." It\'s the opposite of "있어요" (to have). Day 10 will cover 있어요/없어요 grammar properly.',
      tier: 'ext',
    },
    {
      id: 'd07-v1-e8',
      korean: '여기',
      hangul: 'yeo-gi',
      zh: '这里', zhEn: 'here',
      pos: '代词', posEn: 'Pronoun',
      example: { ko: '여기, 당근.', zh: '给你，胡萝卜。', zhEn: 'Here you go, carrot.' },
      tip: 'Haru 递胡萝卜时说 「여기.」= "给你"（省略主语）。配套 거기(那里 · 你那边) / 저기(那里 · 远处)。「저기요」= 叫住陌生人时的"那位"（拦人求助专用）。', tipEn: 'When Haru hands over the carrot, she says "여기." = "Here you go" (subject omitted). Paired with 거기 (there · your side) / 저기 (there · far away). "저기요" = "excuse me" when calling a stranger (for getting help).',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字）
  // ─────────────────────────────────────────────
  write: [
    { id: 'd07-v1-w1', korean: '역',  hangul: 'yeok',    wordKorean: '역',       wordZh: '站', wordZhEn: 'station' },
    { id: 'd07-v1-w2', korean: '열',  hangul: 'yeol',    wordKorean: '열차',     wordZh: '列车', wordZhEn: 'Train' },
    { id: 'd07-v1-w3', korean: '핸',  hangul: 'haen',    wordKorean: '핸드폰',   wordZh: '手机', wordZhEn: 'phone' },
    { id: 'd07-v1-w4', korean: '우',  hangul: 'u',       wordKorean: '우산',     wordZh: '雨伞', wordZhEn: 'umbrella' },
    { id: 'd07-v1-w5', korean: '길',  hangul: 'gil',     wordKorean: '길',       wordZh: '路', wordZhEn: 'Road' },
    { id: 'd07-v1-w6', korean: '고',  hangul: 'go',      wordKorean: '고마워',   wordZh: '谢了', wordZhEn: 'Thanks' },
    { id: 'd07-v1-w7', korean: '없',  hangul: 'eop',     wordKorean: '없어요',   wordZh: '没有', wordZhEn: 'to not have / there isn\'t' },
    { id: 'd07-v1-w8', korean: '여',  hangul: 'yeo',     wordKorean: '여기',     wordZh: '这里', wordZhEn: 'here' },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd07-v1-r1',
      korean: '역',
      hangul: 'yeok',
      choices: [
        { zh: '站 / 车站', zhEn: 'station', correct: true },
        { zh: '入口', zhEn: 'entrance', correct: false },
        { zh: '出口', zhEn: 'exit', correct: false },
        { zh: '座位', zhEn: 'seat', correct: false },
      ],
    },
    {
      id: 'd07-v1-r2',
      korean: '열차',
      hangul: 'yeol-cha',
      choices: [
        { zh: '列车', zhEn: 'Train', correct: true },
        { zh: '公交车', zhEn: 'bus', correct: false },
        { zh: '出租车', zhEn: 'taxi', correct: false },
        { zh: '自行车', zhEn: 'bicycle', correct: false },
      ],
    },
    {
      id: 'd07-v1-r3',
      korean: '핸드폰',
      hangul: 'haen-deu-pon',
      choices: [
        { zh: '手机', zhEn: 'phone', correct: true },
        { zh: '电脑', zhEn: 'computer', correct: false },
        { zh: '耳机', zhEn: 'earphones', correct: false },
        { zh: '充电器', zhEn: 'charger', correct: false },
      ],
    },
    {
      id: 'd07-v1-r4',
      korean: '우산',
      hangul: 'u-san',
      choices: [
        { zh: '雨伞', zhEn: 'umbrella', correct: true },
        { zh: '外套', zhEn: 'Coat', correct: false },
        { zh: '书包', zhEn: 'backpack', correct: false },
        { zh: '帽子', zhEn: 'hat', correct: false },
      ],
    },
    {
      id: 'd07-v1-r5',
      korean: '길',
      hangul: 'gil',
      choices: [
        { zh: '路', zhEn: 'Road', correct: true },
        { zh: '桥', zhEn: 'bridge', correct: false },
        { zh: '门', zhEn: 'door', correct: false },
        { zh: '窗', zhEn: 'window', correct: false },
      ],
    },
    {
      id: 'd07-v1-r6',
      korean: '고마워',
      hangul: 'go-ma-wo',
      choices: [
        { zh: '谢了（对朋友）', zhEn: 'Thanks (to a friend)', correct: true },
        { zh: '对不起（对朋友）', zhEn: 'Sorry (to a friend)', correct: false },
        { zh: '没关系（对朋友）', zhEn: 'It\'s okay (to a friend)', correct: false },
        { zh: '再见（对朋友）', zhEn: 'Bye (to a friend)', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词，非字母级）
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd07-v1-s1',
      zhHint: '列车', zhHintEn: 'Train',
      answer: ['열', '차'],
      // 干扰："영"（收音 ㄹ→ㅇ 混）；"자"（초성 ㅊ→ㅈ 送气差别）
      syllables: ['열', '차', '영', '자'],
    },
    {
      id: 'd07-v1-s2',
      zhHint: '手机', zhHintEn: 'phone',
      answer: ['핸', '드', '폰'],
      // 干扰："헨"（元音 ㅐ→ㅔ 高频混淆）；"본"（초성 ㅍ→ㅂ 送气差别）
      syllables: ['핸', '드', '폰', '헨', '본'],
    },
    {
      id: 'd07-v1-s3',
      zhHint: '雨伞', zhHintEn: 'umbrella',
      answer: ['우', '산'],
      // 干扰："오"（元音 ㅜ→ㅗ 混）；"손"（초성 ㅅ 相同，元音差别）
      syllables: ['우', '산', '오', '손'],
    },
    {
      id: 'd07-v1-s4',
      zhHint: '这里', zhHintEn: 'here',
      answer: ['여', '기'],
      // 干扰："야"（元音 ㅕ→ㅑ 混）；"거"（초성 ㄱ 相同，元音差别，配套 거기那里）
      syllables: ['여', '기', '야', '거'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd07-v1-d1', korean: '역',       hangul: 'yeok',           syllables: ['역'],                   zh: '站', zhEn: 'station' },
    { id: 'd07-v1-d2', korean: '핸드폰',   hangul: 'haen-deu-pon',   syllables: ['핸', '드', '폰'],       zh: '手机', zhEn: 'phone' },
    { id: 'd07-v1-d3', korean: '도와주세요', hangul: 'do-wa-ju-se-yo', syllables: ['도', '와', '주', '세', '요'], zh: '请帮帮我', zhEn: 'Please help me' },
  ],
};
