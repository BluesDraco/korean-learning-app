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
  subtitle: '签合同现场学到的 8 个词', subtitleEn: '8 words learned at the contract signing.',

  encounter: [
    {
      id: 'd21-v1-e1',
      korean: '계약서',
      hangul: 'gye-yak-seo',
      zh: '合同 / 合同书', zhEn: 'contract / contract document',
      pos: '名词', posEn: 'Noun',
      example: { ko: '계약서 여기 있어요.', zh: '合同在这里。', zhEn: 'The contract is here.' },
      tip: '계약(合同) + 서(文件)。「书」是"文书"的意思。签约时具体指纸质那份', tipEn: '계약 (contract) + 서 (document). 「书」 means "document." When signing, it refers to the paper copy.',
      tier: 'core',
    },
    {
      id: 'd21-v1-e2',
      korean: '사인하다',
      hangul: 'sa-in-ha-da',
      zh: '签名', zhEn: 'Signature',
      pos: '动词', posEn: 'Verb',
      example: { ko: '여기에 사인해 주세요.', zh: '请在这里签名。', zhEn: 'Please sign here.' },
      tip: '英语 sign 的韩式外来语 + 하다。해요体：사인해요。惯用「사인해 주세요」= 请签名', tipEn: 'Korean loanword from English sign + 하다. 해요 form: 사인해요. Common usage 「사인해 주세요」 = please sign.',
      tier: 'core',
    },
    {
      id: 'd21-v1-e3',
      korean: '진짜',
      hangul: 'jin-jja',
      zh: '真的', zhEn: 'really',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '진짜 당근이에요.', zh: '是真的胡萝卜。', zhEn: 'It\'s a real carrot.' },
      tip: '汉字词「真짜」。既作副词（真的），也作形容词（真实的）。정말 = 진짜（口语更常用）', tipEn: 'Sino-Korean word \'진짜\'. Used as both an adverb (really) and an adjective (real). 정말 = 진짜 (more common in speech).',
      tier: 'core',
    },
    {
      id: 'd21-v1-e4',
      korean: '제공',
      hangul: 'je-gong',
      zh: '提供', zhEn: 'Provide',
      pos: '名词', posEn: 'Noun',
      example: { ko: '매주 당근 1개 제공.', zh: '每周提供1根胡萝卜。', zhEn: 'One carrot is provided every week.' },
      tip: '汉字词「提供」。搭配 제공하다 = 提供。合同/服务条款中常见', tipEn: 'Sino-Korean word \'제공\'. Pairs with 제공하다 = to provide. Common in contracts and terms of service.',
      tier: 'core',
    },
    {
      id: 'd21-v1-e5',
      korean: '앞으로',
      hangul: 'a-peu-ro',
      zh: '今后 / 以后', zhEn: 'From now on / Later',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '앞으로 잘 부탁드립니다.', zh: '以后请多关照。', zhEn: 'Please take care of me from now on.' },
      tip: '앞(前) + 으로(方向) = 向前 / 今后。搭配 잘 부탁드립니다 是入职/签约标准句', tipEn: '앞 (front) + 으로 (direction) = forward / from now on. The phrase 잘 부탁드립니다 is standard for starting a job or signing a contract.',
      tier: 'core',
    },
    {
      id: 'd21-v1-e6',
      korean: '도어락',
      hangul: 'do-eo-rak',
      zh: '密码锁', zhEn: 'Keypad lock',
      pos: '名词', posEn: 'Noun',
      example: { ko: '요즘은 도어락이에요.', zh: '现在都是密码锁。', zhEn: 'Everything uses keypad locks now.' },
      tip: '英语外来语 door + lock。韩国公寓普遍不用实体钥匙。密码锁 + 生物识别', tipEn: 'English loanword door + lock. Korean apartments generally don\'t use physical keys. Keypad locks + biometric recognition.',
      tier: 'core',
    },
    {
      id: 'd21-v1-e7',
      korean: '잘',
      hangul: 'jal',
      zh: '好好 / 好', zhEn: 'Well / Good',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '잘 부탁드립니다.', zh: '请多关照。', zhEn: 'Please take care of me.' },
      tip: '固有词。修饰动词。잘 부탁드립니다 / 잘 지내요（过得好）/ 잘 먹었어요（吃好了）都用', tipEn: 'Native Korean word. Modifies verbs. Used in 잘 부탁드립니다 / 잘 지내요 (doing well) / 잘 먹었어요 (ate well).',
      tier: 'ext',
    },
    {
      id: 'd21-v1-e8',
      korean: '부탁드립니다',
      hangul: 'bu-tak-deu-rim-ni-da',
      zh: '拜托您', zhEn: 'Please',
      pos: '表达', posEn: 'Expression',
      example: { ko: '잘 부탁드립니다.', zh: '请多关照。', zhEn: 'Please take care of me.' },
      tip: '부탁하다(拜托) → 부탁드리다(敬语) + 합쇼체。签约/入职/初见的最高礼貌', tipEn: '부탁하다 (to ask) → 부탁드리다 (honorific) + 합쇼체. The highest level of politeness for contracts, starting a job, or first meetings.',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd21-v1-r1',
      korean: '계약서',
      hangul: 'gye-yak-seo',
      choices: [
        { zh: '合同', zhEn: 'contract', correct: true },
        { zh: '发票', zhEn: 'Receipt', correct: false },
        { zh: '收据', zhEn: 'receipt', correct: false },
        { zh: '证件', zhEn: 'ID', correct: false },
      ],
    },
    {
      id: 'd21-v1-r2',
      korean: '사인하다',
      hangul: 'sa-in-ha-da',
      choices: [
        { zh: '签名', zhEn: 'Signature', correct: true },
        { zh: '盖章', zhEn: 'Stamp', correct: false },
        { zh: '打字', zhEn: 'Typing', correct: false },
        { zh: '涂改', zhEn: 'Correction', correct: false },
      ],
    },
    {
      id: 'd21-v1-r3',
      korean: '진짜',
      hangul: 'jin-jja',
      choices: [
        { zh: '真的', zhEn: 'really', correct: true },
        { zh: '假的', zhEn: 'Fake', correct: false },
        { zh: '一样', zhEn: 'Same', correct: false },
        { zh: '不同', zhEn: 'Different', correct: false },
      ],
    },
    {
      id: 'd21-v1-r4',
      korean: '제공',
      hangul: 'je-gong',
      choices: [
        { zh: '提供', zhEn: 'Provide', correct: true },
        { zh: '接受', zhEn: 'Accept', correct: false },
        { zh: '拒绝', zhEn: 'Refuse', correct: false },
        { zh: '要求', zhEn: 'Require', correct: false },
      ],
    },
    {
      id: 'd21-v1-r5',
      korean: '앞으로',
      hangul: 'a-peu-ro',
      choices: [
        { zh: '今后 / 以后', zhEn: 'From now on / Later', correct: true },
        { zh: '以前', zhEn: 'before', correct: false },
        { zh: '现在', zhEn: 'Now', correct: false },
        { zh: '一直', zhEn: 'straight / all the way', correct: false },
      ],
    },
    {
      id: 'd21-v1-r6',
      korean: '도어락',
      hangul: 'do-eo-rak',
      choices: [
        { zh: '密码锁', zhEn: 'Keypad lock', correct: true },
        { zh: '大门', zhEn: 'Front door', correct: false },
        { zh: '钥匙', zhEn: 'Key', correct: false },
        { zh: '门铃', zhEn: 'Doorbell', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd21-v1-s1',
      zhHint: '合同', zhHintEn: 'contract',
      answer: ['계', '약'],
      // 干扰："개"（初声 ㄱ 相同、元音差别）；"악"（元音 ㅏ 相同、初声差别）
      syllables: ['계', '약', '개', '악'],
    },
    {
      id: 'd21-v1-s2',
      zhHint: '钥匙', zhHintEn: 'Key',
      answer: ['열', '쇠'],
      // 干扰："열"（초성 相同）；"세"（元音 ㅔ 相似）
      syllables: ['열', '쇠', '엽', '세'],
    },
    {
      id: 'd21-v1-s3',
      zhHint: '转账', zhHintEn: 'Transfer',
      answer: ['입', '금'],
      // 干扰："입"（초성 ㅇ、元音差别）；"큼"（초성差别）
      syllables: ['입', '금', '잎', '큼'],
    },
    {
      id: 'd21-v1-s4',
      zhHint: '真的', zhHintEn: 'really',
      answer: ['진', '짜'],
      // 干扰："진"（收音 ㄴ 相同）；"차"（초성 ㅊ vs ㅉ）
      syllables: ['진', '짜', '즌', '차'],
    },
  ],

  write: [
    { id: 'd21-v1-w1', korean: '계', hangul: 'gye',   wordKorean: '계약',      wordZh: '合同', wordZhEn: 'contract' },
    { id: 'd21-v1-w2', korean: '기', hangul: 'gi',    wordKorean: '기간',      wordZh: '期间', wordZhEn: 'Period' },
    { id: 'd21-v1-w3', korean: '입', hangul: 'ip',    wordKorean: '입금',      wordZh: '转账', wordZhEn: 'Transfer' },
    { id: 'd21-v1-w4', korean: '맞', hangul: 'mat',   wordKorean: '맞아요',    wordZh: '没错', wordZhEn: 'That\'s right' },
    { id: 'd21-v1-w5', korean: '열', hangul: 'yeol',  wordKorean: '열쇠',      wordZh: '钥匙', wordZhEn: 'Key' },
    { id: 'd21-v1-w6', korean: '사', hangul: 'sa',    wordKorean: '사인하다',  wordZh: '签名', wordZhEn: 'Signature' },
    { id: 'd21-v1-w7', korean: '진', hangul: 'jin',   wordKorean: '진짜',      wordZh: '真的', wordZhEn: 'really' },
    { id: 'd21-v1-w8', korean: '앞', hangul: 'ap',    wordKorean: '앞으로',    wordZh: '今后', wordZhEn: 'From now on' },
  ],

  dictation: [
    { id: 'd21-v1-d1', korean: '맞아요',          hangul: 'ma-ja-yo',              syllables: ['맞', '아', '요'],           zh: '没错', zhEn: 'That\'s right' },
    { id: 'd21-v1-d2', korean: '열쇠 받았어요',   hangul: 'yeol-soe ba-da-sseo-yo', syllables: ['열', '쇠', '받', '았', '어', '요'], zh: '拿到钥匙了', zhEn: 'Got the key' },
    { id: 'd21-v1-d3', korean: '잘 부탁드립니다',  hangul: 'jal bu-tak-deu-rim-ni-da', syllables: ['잘', '부', '탁', '드', '립', '니', '다'], zh: '请多关照', zhEn: 'please take care of me' },
  ],
};
