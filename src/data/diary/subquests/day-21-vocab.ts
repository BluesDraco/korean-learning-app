import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 21 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词（계약/기간/입금/맞아요/열쇠/당근）之外的 8 个新词。
 * - core: 계약서 / 사인하다 / 진짜 / 제공 / 앞으로 / 도어락（进认词考察）
 * - ext:  잘 / 부탁드립니다（进拼写 / 听辨）
 *
 * 场景延展：从合同文件到签字动作到入住准备。
 */
export const day21Vocab: VocabSubQuestData = {
  day: 21,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '签合同现场学到的 8 个词',

  encounter: [
    {
      id: 'd21-v1-e1',
      korean: '계약서',
      hangul: 'gye-yak-seo',
      zh: '合同 / 合同书',
      pos: '名词',
      example: { ko: '계약서 여기 있어요.', zh: '合同在这里。' },
      tip: '계약(合同) + 서(文件)。「书」是"文书"的意思。签约时具体指纸质那份',
      tier: 'core',
    },
    {
      id: 'd21-v1-e2',
      korean: '사인하다',
      hangul: 'sa-in-ha-da',
      zh: '签名',
      pos: '动词',
      example: { ko: '여기에 사인해 주세요.', zh: '请在这里签名。' },
      tip: '英语 sign 的韩式外来语 + 하다。해요体：사인해요。惯用「사인해 주세요」= 请签名',
      tier: 'core',
    },
    {
      id: 'd21-v1-e3',
      korean: '진짜',
      hangul: 'jin-jja',
      zh: '真的',
      pos: '副词',
      example: { ko: '진짜 당근이에요.', zh: '是真的胡萝卜。' },
      tip: '汉字词「真짜」。既作副词（真的），也作形容词（真实的）。정말 = 진짜（口语更常用）',
      tier: 'core',
    },
    {
      id: 'd21-v1-e4',
      korean: '제공',
      hangul: 'je-gong',
      zh: '提供',
      pos: '名词',
      example: { ko: '매주 당근 1개 제공.', zh: '每周提供1根胡萝卜。' },
      tip: '汉字词「提供」。搭配 제공하다 = 提供。合同/服务条款中常见',
      tier: 'core',
    },
    {
      id: 'd21-v1-e5',
      korean: '앞으로',
      hangul: 'a-peu-ro',
      zh: '今后 / 以后',
      pos: '副词',
      example: { ko: '앞으로 잘 부탁드립니다.', zh: '以后请多关照。' },
      tip: '앞(前) + 으로(方向) = 向前 / 今后。搭配 잘 부탁드립니다 是入职/签约标准句',
      tier: 'core',
    },
    {
      id: 'd21-v1-e6',
      korean: '도어락',
      hangul: 'do-eo-rak',
      zh: '密码锁',
      pos: '名词',
      example: { ko: '요즘은 도어락이에요.', zh: '现在都是密码锁。' },
      tip: '英语外来语 door + lock。韩国公寓普遍不用实体钥匙。密码锁 + 生物识别',
      tier: 'core',
    },
    {
      id: 'd21-v1-e7',
      korean: '잘',
      hangul: 'jal',
      zh: '好好 / 好',
      pos: '副词',
      example: { ko: '잘 부탁드립니다.', zh: '请多关照。' },
      tip: '固有词。修饰动词。잘 부탁드립니다 / 잘 지내요（过得好）/ 잘 먹었어요（吃好了）都用',
      tier: 'ext',
    },
    {
      id: 'd21-v1-e8',
      korean: '부탁드립니다',
      hangul: 'bu-tak-deu-rim-ni-da',
      zh: '拜托您',
      pos: '表达',
      example: { ko: '잘 부탁드립니다.', zh: '请多关照。' },
      tip: '부탁하다(拜托) → 부탁드리다(敬语) + 합쇼체。签约/入职/初见的最高礼貌',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd21-v1-r1',
      korean: '계약서',
      hangul: 'gye-yak-seo',
      choices: [
        { zh: '合同', correct: true },
        { zh: '发票', correct: false },
        { zh: '收据', correct: false },
        { zh: '证件', correct: false },
      ],
    },
    {
      id: 'd21-v1-r2',
      korean: '사인하다',
      hangul: 'sa-in-ha-da',
      choices: [
        { zh: '签名', correct: true },
        { zh: '盖章', correct: false },
        { zh: '打字', correct: false },
        { zh: '涂改', correct: false },
      ],
    },
    {
      id: 'd21-v1-r3',
      korean: '진짜',
      hangul: 'jin-jja',
      choices: [
        { zh: '真的', correct: true },
        { zh: '假的', correct: false },
        { zh: '一样', correct: false },
        { zh: '不同', correct: false },
      ],
    },
    {
      id: 'd21-v1-r4',
      korean: '제공',
      hangul: 'je-gong',
      choices: [
        { zh: '提供', correct: true },
        { zh: '接受', correct: false },
        { zh: '拒绝', correct: false },
        { zh: '要求', correct: false },
      ],
    },
    {
      id: 'd21-v1-r5',
      korean: '앞으로',
      hangul: 'a-peu-ro',
      choices: [
        { zh: '今后 / 以后', correct: true },
        { zh: '以前', correct: false },
        { zh: '现在', correct: false },
        { zh: '一直', correct: false },
      ],
    },
    {
      id: 'd21-v1-r6',
      korean: '도어락',
      hangul: 'do-eo-rak',
      choices: [
        { zh: '密码锁', correct: true },
        { zh: '大门', correct: false },
        { zh: '钥匙', correct: false },
        { zh: '门铃', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd21-v1-s1',
      zhHint: '合同',
      answer: ['계', '약'],
      // 干扰："개"（初声 ㄱ 相同、元音差别）；"악"（元音 ㅏ 相同、初声差别）
      syllables: ['계', '약', '개', '악'],
    },
    {
      id: 'd21-v1-s2',
      zhHint: '钥匙',
      answer: ['열', '쇠'],
      // 干扰："열"（초성 相同）；"세"（元音 ㅔ 相似）
      syllables: ['열', '쇠', '엽', '세'],
    },
    {
      id: 'd21-v1-s3',
      zhHint: '转账',
      answer: ['입', '금'],
      // 干扰："입"（초성 ㅇ、元音差别）；"큼"（초성差别）
      syllables: ['입', '금', '잎', '큼'],
    },
    {
      id: 'd21-v1-s4',
      zhHint: '真的',
      answer: ['진', '짜'],
      // 干扰："진"（收音 ㄴ 相同）；"차"（초성 ㅊ vs ㅉ）
      syllables: ['진', '짜', '즌', '차'],
    },
  ],

  write: [
    { id: 'd21-v1-w1', korean: '계', hangul: 'gye',   wordKorean: '계약',      wordZh: '合同' },
    { id: 'd21-v1-w2', korean: '기', hangul: 'gi',    wordKorean: '기간',      wordZh: '期间' },
    { id: 'd21-v1-w3', korean: '입', hangul: 'ip',    wordKorean: '입금',      wordZh: '转账' },
    { id: 'd21-v1-w4', korean: '맞', hangul: 'mat',   wordKorean: '맞아요',    wordZh: '没错' },
    { id: 'd21-v1-w5', korean: '열', hangul: 'yeol',  wordKorean: '열쇠',      wordZh: '钥匙' },
    { id: 'd21-v1-w6', korean: '사', hangul: 'sa',    wordKorean: '사인하다',  wordZh: '签名' },
    { id: 'd21-v1-w7', korean: '진', hangul: 'jin',   wordKorean: '진짜',      wordZh: '真的' },
    { id: 'd21-v1-w8', korean: '앞', hangul: 'ap',    wordKorean: '앞으로',    wordZh: '今后' },
  ],

  dictation: [
    { id: 'd21-v1-d1', korean: '맞아요',          hangul: 'ma-ja-yo',              syllables: ['맞', '아', '요'],           zh: '没错' },
    { id: 'd21-v1-d2', korean: '열쇠 받았어요',   hangul: 'yeol-soe ba-da-sseo-yo', syllables: ['열', '쇠', '받', '았', '어', '요'], zh: '拿到钥匙了' },
    { id: 'd21-v1-d3', korean: '잘 부탁드립니다',  hangul: 'jal bu-tak-deu-rim-ni-da', syllables: ['잘', '부', '탁', '드', '립', '니', '다'], zh: '请多关照' },
  ],
};
