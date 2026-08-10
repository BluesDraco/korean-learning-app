import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 3 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词之外的 8 个新词——都围绕机场/初见 Minji 的场景：
 * - core: 가방 / 공항 / 택시 / 가벼워요 / 도와주세요 / 언니（进认词考察）
 * - ext:  정말 / 미안해요（进拼写/听写考察）
 *
 * 教学梯度：spell 4 题直接考 ㅁ/ㅇ/ㄴ 收音辨认（공/곰/항/한）——呼应主流程 짐 vs 집
 * dictation 强制听写 짐 + 집 + 가방 三词，把收音混淆推到"能不能靠耳朵分辨"层面
 *
 * Phase 结构：语遇 8 → 手写 8 → 认词 6 → 拼写 4 → 听写 3
 * 星级：全对 3 星 / 错 1-2 二星 / 错 3-4 一星 / 错 5+ 零星
 */
export const day3Vocab: VocabSubQuestData = {
  day: 3,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '仁爪机场悄悄多学的 8 个词', subtitleEn: '8 words secretly picked up at Incheon Airport',

  // ─────────────────────────────────────────────
  // Phase 1 · 语遇（8 张自动播故事卡）
  // ─────────────────────────────────────────────
  encounter: [
    {
      id: 'd03-v1-e1',
      korean: '가방',
      hangul: 'ga-bang',
      zh: '包 / 行李箱', zhEn: 'bag / suitcase',
      pos: '名词', posEn: 'Noun',
      example: { ko: '제 가방이 무거워요.', zh: '我的包很重。', zhEn: 'My bag is heavy.' },
      tip: '和「짐」都能指"行李"，但「가방」更强调"具体的包/箱子"。收音 ㅇ 用鼻腔发音。', tipEn: 'Both 짐 and 가방 can mean \'luggage,\' but 가방 emphasizes a specific bag or suitcase. The final consonant ㅇ is pronounced through the nose.',
      tier: 'core',
    },
    {
      id: 'd03-v1-e2',
      korean: '공항',
      hangul: 'gong-hang',
      zh: '机场', zhEn: 'airport',
      pos: '名词', posEn: 'Noun',
      example: { ko: '인천 공항에 도착했어요.', zh: '到仁爪机场了。', zhEn: 'We\'ve arrived at Incheon Airport.' },
      tip: '汉字词「空港」。两个字都是 ㅇ 收音，念的时候鼻腔震动感很强。', tipEn: 'It\'s a Sino-Korean word \'空港.\' Both syllables end with ㅇ, so you feel a strong nasal vibration when pronouncing it.',
      tier: 'core',
    },
    {
      id: 'd03-v1-e3',
      korean: '택시',
      hangul: 'taek-si',
      zh: '出租车', zhEn: 'taxi',
      pos: '名词', posEn: 'Noun',
      example: { ko: '택시를 탔어요.', zh: '打了出租车。', zhEn: 'I took a taxi.' },
      tip: '外来语 taxi。ㅌ 是送气音"t"，比中文"特"更用力吐气。韩国机场打车点叫「택시 승강장」。', tipEn: 'It\'s a loanword from \'taxi.\' ㅌ is an aspirated \'t,\' pronounced with more breath than the Chinese \'te.\' The taxi stand at Korean airports is called \'택시 승강장.\'',
      tier: 'core',
    },
    {
      id: 'd03-v1-e4',
      korean: '가벼워요',
      hangul: 'ga-byeo-wo-yo',
      zh: '轻', zhEn: 'light',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '이 가방은 가벼워요.', zh: '这个包很轻。', zhEn: 'This bag is light.' },
      tip: '主流程 「무거워요」(重) 的反义词。原型 가볍다 → 가벼워요（ㅂ 不规则变形）。', tipEn: 'The opposite of \'무거워요\' (heavy). The base form is 가볍다 → 가벼워요 (ㅂ irregular conjugation).',
      tier: 'core',
    },
    {
      id: 'd03-v1-e5',
      korean: '도와주세요',
      hangul: 'do-wa-ju-se-yo',
      zh: '请帮帮我', zhEn: 'Please help me',
      pos: '表达', posEn: 'Expression',
      example: { ko: '저기요, 좀 도와주세요.', zh: '请问，帮个忙好吗？', zhEn: 'Excuse me, could you help me?' },
      tip: '돕다(帮) 词干 돕 + 아/어 变形（ㅂ 不规则）→ 도와，再 + 주세요 = 请帮我。留学生保命句 top 3，兔莉在机场就该说这句。', tipEn: 'The stem 돕 of 돕다 (to help) + 아/어 conjugation (ㅂ irregular) → 도와, then + 주세요 = \'Please help me.\' One of the top 3 survival phrases for international students—Tori should\'ve said this at the airport.',
      tier: 'core',
    },
    {
      id: 'd03-v1-e6',
      korean: '언니',
      hangul: 'eon-ni',
      zh: '姐姐（女生叫的姐姐）', zhEn: 'older sister (what a girl calls an older female)',
      pos: '名词', posEn: 'Noun',
      example: { ko: '민지 언니, 감사합니다.', zh: '敏智姐姐，谢谢。', zhEn: 'Thank you, Minji unnie.' },
      tip: '女生叫比自己大的女性用「언니」。男生叫姐姐用「누나」。Minji 就是兔莉的第一位 언니。', tipEn: 'Girls use \'언니\' for older females. Boys use \'누나\' for older sisters. Minji is Tori\'s first unnie.',
      tier: 'core',
    },
    {
      id: 'd03-v1-e7',
      korean: '정말',
      hangul: 'jeong-mal',
      zh: '真的 / 非常', zhEn: 'really / very',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '정말 감사합니다.', zh: '真的非常感谢。', zhEn: 'Thank you so much.' },
      tip: '「감사합니다」前面加「정말」= 加倍真诚。也可以说「진짜」（更口语）。', tipEn: 'Adding \'정말\' before \'감사합니다\' doubles the sincerity. You can also say \'진짜\' (more colloquial).',
      tier: 'ext',
    },
    {
      id: 'd03-v1-e8',
      korean: '미안해요',
      hangul: 'mi-an-hae-yo',
      zh: '对不起（熟人语气）', zhEn: 'sorry (casual tone for close acquaintances)',
      pos: '表达', posEn: 'Expression',
      example: { ko: '늦어서 미안해요.', zh: '抱歉迟到了。', zhEn: 'Sorry I\'m late.' },
      tip: '和「죄송해요」都是道歉。「죄송해요」对陌生人/长辈，「미안해요」对朋友/熟人。搞混不失礼但会有距离感。', tipEn: 'Both are apologies. \'죄송해요\' is for strangers/elders, \'미안해요\' is for friends/acquaintances. Mixing them up isn\'t rude but can feel distant.',
      tier: 'ext',
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 2 · 手写（8 个音节字，各代表 1 词，可开描红）
  // 覆盖率 ≥20% 及格，不产生错题
  // ─────────────────────────────────────────────
  write: [
    { id: 'd03-v1-w1', korean: '가',  hangul: 'ga',      wordKorean: '가방',       wordZh: '包', wordZhEn: 'bag' },
    { id: 'd03-v1-w2', korean: '공',  hangul: 'gong',    wordKorean: '공항',       wordZh: '机场', wordZhEn: 'airport' },
    { id: 'd03-v1-w3', korean: '택',  hangul: 'taek',    wordKorean: '택시',       wordZh: '出租车', wordZhEn: 'taxi' },
    { id: 'd03-v1-w4', korean: '벼',  hangul: 'byeo',    wordKorean: '가벼워요',   wordZh: '轻', wordZhEn: 'light' },
    { id: 'd03-v1-w5', korean: '도',  hangul: 'do',      wordKorean: '도와주세요', wordZh: '请帮帮我', wordZhEn: 'Please help me' },
    { id: 'd03-v1-w6', korean: '언',  hangul: 'eon',     wordKorean: '언니',       wordZh: '姐姐', wordZhEn: 'Older sister' },
    { id: 'd03-v1-w7', korean: '정',  hangul: 'jeong',   wordKorean: '정말',       wordZh: '真的', wordZhEn: 'really' },
    { id: 'd03-v1-w8', korean: '미',  hangul: 'mi',      wordKorean: '미안해요',   wordZh: '对不起', wordZhEn: 'sorry' },
  ],

  // ─────────────────────────────────────────────
  // Phase 3 · 认词（韩→中 6 题四选一，只考 core 6 词）
  // ─────────────────────────────────────────────
  recognize: [
    {
      id: 'd03-v1-r1',
      korean: '가방',
      hangul: 'ga-bang',
      choices: [
        { zh: '包 / 行李箱', zhEn: 'bag / suitcase', correct: true },
        { zh: '机场', zhEn: 'airport', correct: false },
        { zh: '出租车', zhEn: 'taxi', correct: false },
        { zh: '衣服', zhEn: 'clothes', correct: false },
      ],
    },
    {
      id: 'd03-v1-r2',
      korean: '공항',
      hangul: 'gong-hang',
      choices: [
        { zh: '机场', zhEn: 'airport', correct: true },
        { zh: '车站', zhEn: 'station', correct: false },
        { zh: '公园', zhEn: 'park', correct: false },
        { zh: '学校', zhEn: 'School', correct: false },
      ],
    },
    {
      id: 'd03-v1-r3',
      korean: '택시',
      hangul: 'taek-si',
      choices: [
        { zh: '出租车', zhEn: 'taxi', correct: true },
        { zh: '地铁', zhEn: 'subway', correct: false },
        { zh: '公交车', zhEn: 'bus', correct: false },
        { zh: '飞机', zhEn: 'airplane', correct: false },
      ],
    },
    {
      id: 'd03-v1-r4',
      korean: '가벼워요',
      hangul: 'ga-byeo-wo-yo',
      choices: [
        { zh: '轻', zhEn: 'light', correct: true },
        { zh: '重', zhEn: 'heavy', correct: false },
        { zh: '快', zhEn: 'fast', correct: false },
        { zh: '慢', zhEn: 'slow', correct: false },
      ],
    },
    {
      id: 'd03-v1-r5',
      korean: '도와주세요',
      hangul: 'do-wa-ju-se-yo',
      choices: [
        { zh: '请帮帮我', zhEn: 'Please help me', correct: true },
        { zh: '请给我', zhEn: 'Please give me', correct: false },
        { zh: '请等一下', zhEn: 'Please wait a moment', correct: false },
        { zh: '请稍慢一点', zhEn: 'Please speak a bit slower', correct: false },
      ],
    },
    {
      id: 'd03-v1-r6',
      korean: '언니',
      hangul: 'eon-ni',
      choices: [
        { zh: '姐姐（女生叫的）', zhEn: 'older sister (used by females)', correct: true },
        { zh: '哥哥', zhEn: 'older brother', correct: false },
        { zh: '妹妹', zhEn: 'younger sister', correct: false },
        { zh: '妈妈', zhEn: 'Mom', correct: false },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 4 · 拼写（4 题音节块拼词，非字母级）
  // 干扰音节全部围绕"收音混淆"设计——直接呼应今天主题 ㅁ/ㅂ/ㅇ/ㄴ 辨认
  // ─────────────────────────────────────────────
  spell: [
    {
      id: 'd03-v1-s1',
      zhHint: '包', zhHintEn: 'bag',
      answer: ['가', '방'],
      // 干扰："거"（元音 ㅏ→ㅓ 混）；"밤"（방↔밤，收音 ㅇ→ㅁ 高频混淆，正对今日主题）
      syllables: ['가', '방', '거', '밤'],
    },
    {
      id: 'd03-v1-s2',
      zhHint: '机场', zhHintEn: 'airport',
      answer: ['공', '항'],
      // 干扰："곰"（공↔곰 收音 ㅇ→ㅁ）；"한"（항↔한 收音 ㅇ→ㄴ）——两个都是收音辨认题
      syllables: ['공', '항', '곰', '한'],
    },
    {
      id: 'd03-v1-s3',
      zhHint: '出租车', zhHintEn: 'taxi',
      answer: ['택', '시'],
      // 干扰："텍"（元音 ㅐ→ㅔ 高频混淆）；"새"（初声 ㅅ 相同，元音差别）
      syllables: ['택', '시', '텍', '새'],
    },
    {
      id: 'd03-v1-s4',
      zhHint: '姐姐（女生叫的）', zhHintEn: 'older sister (used by females)',
      answer: ['언', '니'],
      // 干扰："안"（언↔안 元音 ㅓ→ㅏ 混）；"디"（初声 ㄴ→ㄷ 混）
      syllables: ['언', '니', '안', '디'],
    },
  ],

  // ─────────────────────────────────────────────
  // Phase 5 · 听写（3 词，听音频→无描红手写）
  // 特意选 짐/집 强制耳朵辨认 ㅁ/ㅂ 收音——本关教学核心
  // ─────────────────────────────────────────────
  dictation: [
    { id: 'd03-v1-d1', korean: '짐',   hangul: 'jim',      syllables: ['짐'],           zh: '行李', zhEn: 'luggage' },
    { id: 'd03-v1-d2', korean: '집',   hangul: 'jip',      syllables: ['집'],           zh: '家', zhEn: 'house' },
    { id: 'd03-v1-d3', korean: '가방', hangul: 'ga-bang',  syllables: ['가', '방'],     zh: '包', zhEn: 'bag' },
  ],
};
