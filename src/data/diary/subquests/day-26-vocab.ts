import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 26 · 1-1 단어 마스터 · 词汇子관卡
 *
 * 主流程 6 词（필요하다/사다/귀/볼펜/키링/귀엽다）之外的 8 个新词。
 * - core: 샴푸 / 수건 / 쓰레기봉투 / 계산 / 봉투 / 그리고（进认词考察）
 * - ext:  다른 / 얼마（进拼写 / 听辨）
 *
 * 场景延展：买洗漱用品到结账付款的完整流程。
 */
export const day26Vocab: VocabSubQuestData = {
  day: 26,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '다이소结账前用得上的 8 个词', subtitleEn: '8 useful words before checking out at Daiso',

  encounter: [
    {
      id: 'd26-v1-e1',
      korean: '샴푸',
      hangul: 'syam-pu',
      zh: '洗发水', zhEn: 'Shampoo',
      pos: '名词', posEn: 'Noun',
      example: { ko: '샴푸 어디에 있어요?', zh: '洗发水在哪里？', zhEn: 'Where is the shampoo?' },
      tip: '英语 shampoo 的韩式外来语。搭配「린스」= 护发素、「바디워시」= 沐浴露', tipEn: 'Korean loanword from English \'shampoo\'. Pairs with \'린스\' (conditioner) and \'바디워시\' (body wash)',
      tier: 'core',
    },
    {
      id: 'd26-v1-e2',
      korean: '수건',
      hangul: 'su-geon',
      zh: '毛巾', zhEn: 'Towel',
      pos: '名词', posEn: 'Noun',
      example: { ko: '수건도 필요해요.', zh: '毛巾也需要。', zhEn: 'I need a towel too.' },
      tip: '汉字词「手巾」。搭配「타올」（towel）也用。매일 새 수건 = 每天用新毛巾', tipEn: 'Sino-Korean word for \'hand cloth\'. \'타올\' (towel) is also used. 매일 새 수건 = using a new towel every day',
      tier: 'core',
    },
    {
      id: 'd26-v1-e3',
      korean: '쓰레기봉투',
      hangul: 'sseu-re-gi-bong-tu',
      zh: '垃圾袋', zhEn: 'Trash bag',
      pos: '名词', posEn: 'Noun',
      example: { ko: '쓰레기봉투 있어요?', zh: '有垃圾袋吗？', zhEn: 'Do you have trash bags?' },
      tip: '쓰레기(垃圾) + 봉투(袋子)。韩国垃圾袋是政府指定「종량제 봉투」，超市/다이소 都卖', tipEn: '쓰레기 (trash) + 봉투 (bag). Korean trash bags are government-designated \'종량제 봉투\', sold at supermarkets/Daiso',
      tier: 'core',
    },
    {
      id: 'd26-v1-e4',
      korean: '계산',
      hangul: 'gye-san',
      zh: '结账 / 计算', zhEn: 'Checkout / calculation',
      pos: '名词', posEn: 'Noun',
      example: { ko: '계산해 주세요.', zh: '请结账。', zhEn: 'Please check out.' },
      tip: '汉字词「计算」。搭配 계산하다 = 结账 / 计算。餐厅/便利店最常用', tipEn: 'Sino-Korean word for \'calculation\'. Pairs with 계산하다 = to check out / calculate. Most common at restaurants/convenience stores',
      tier: 'core',
    },
    {
      id: 'd26-v1-e5',
      korean: '봉투',
      hangul: 'bong-tu',
      zh: '袋子', zhEn: 'bag',
      pos: '名词', posEn: 'Noun',
      example: { ko: '봉투 필요하세요?', zh: '需要袋子吗？', zhEn: 'Do you need a bag?' },
      tip: '汉字词「封套」。购物袋，收银员必问「봉투 필요하세요?」。韩国购物袋要另收费', tipEn: 'Sino-Korean word for \'envelope\'. Shopping bag; cashiers always ask \'봉투 필요하세요?\'. Bags cost extra in Korea',
      tier: 'core',
    },
    {
      id: 'd26-v1-e6',
      korean: '그리고',
      hangul: 'geu-ri-go',
      zh: '还有 / 然后', zhEn: 'And / then',
      pos: '连词', posEn: 'Conjunction',
      example: { ko: '샴푸, 그리고 수건도요.', zh: '洗发水，还有毛巾。', zhEn: 'Shampoo, and a towel.' },
      tip: '连接两个句子/名词。列出多个东西时最简单的连接词', tipEn: 'Connects two sentences/nouns. The simplest connector when listing multiple items',
      tier: 'core',
    },
    {
      id: 'd26-v1-e7',
      korean: '다른',
      hangul: 'da-reun',
      zh: '别的 / 其他', zhEn: 'Other / another',
      pos: '冠形词', posEn: 'Determiner',
      example: { ko: '다른 색 있어요?', zh: '有别的颜色吗？', zhEn: 'Do you have this in another color?' },
      tip: '다르다(不同) 的冠形形。「다른 + 名词」= 别的 N。店员常问「다른 건요?」', tipEn: 'The adnominal form of 다르다 (different). 「다른 + noun」= another N. Staff often ask 「다른 건요?」',
      tier: 'ext',
    },
    {
      id: 'd26-v1-e8',
      korean: '얼마',
      hangul: 'eol-ma',
      zh: '多少（钱）', zhEn: 'How much (money)',
      pos: '疑问词', posEn: 'interrogative',
      example: { ko: '이거 얼마예요?', zh: '这个多少钱？', zhEn: 'How much is this?' },
      tip: '问价格必用。搭配 「얼마예요?」= 多少钱？「얼마나?」= 多长时间/多远', tipEn: 'Essential for asking prices. Pair with 「얼마예요?」= How much? 「얼마나?」= How long/far',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd26-v1-r1',
      korean: '샴푸',
      hangul: 'syam-pu',
      choices: [
        { zh: '洗发水', zhEn: 'Shampoo', correct: true },
        { zh: '沐浴露', zhEn: 'Body wash', correct: false },
        { zh: '护发素', zhEn: 'Conditioner', correct: false },
        { zh: '香水', zhEn: 'Perfume', correct: false },
      ],
    },
    {
      id: 'd26-v1-r2',
      korean: '수건',
      hangul: 'su-geon',
      choices: [
        { zh: '毛巾', zhEn: 'Towel', correct: true },
        { zh: '袜子', zhEn: 'Socks', correct: false },
        { zh: '手套', zhEn: 'Gloves', correct: false },
        { zh: '床单', zhEn: 'Bed sheet', correct: false },
      ],
    },
    {
      id: 'd26-v1-r3',
      korean: '쓰레기봉투',
      hangul: 'sseu-re-gi-bong-tu',
      choices: [
        { zh: '垃圾袋', zhEn: 'Trash bag', correct: true },
        { zh: '购物袋', zhEn: 'Shopping bag', correct: false },
        { zh: '快递袋', zhEn: 'Delivery bag', correct: false },
        { zh: '塑料盆', zhEn: 'Plastic basin', correct: false },
      ],
    },
    {
      id: 'd26-v1-r4',
      korean: '계산',
      hangul: 'gye-san',
      choices: [
        { zh: '结账', zhEn: 'check, please', correct: true },
        { zh: '打包', zhEn: 'To pack up', correct: false },
        { zh: '试用', zhEn: 'To try out', correct: false },
        { zh: '退货', zhEn: 'To return (an item)', correct: false },
      ],
    },
    {
      id: 'd26-v1-r5',
      korean: '봉투',
      hangul: 'bong-tu',
      choices: [
        { zh: '袋子', zhEn: 'bag', correct: true },
        { zh: '盒子', zhEn: 'Box', correct: false },
        { zh: '瓶子', zhEn: 'bottle', correct: false },
        { zh: '筐子', zhEn: 'Basket', correct: false },
      ],
    },
    {
      id: 'd26-v1-r6',
      korean: '그리고',
      hangul: 'geu-ri-go',
      choices: [
        { zh: '还有 / 然后', zhEn: 'And / then', correct: true },
        { zh: '但是', zhEn: 'But', correct: false },
        { zh: '因为', zhEn: 'Because', correct: false },
        { zh: '如果', zhEn: 'If', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd26-v1-s1',
      zhHint: '需要', zhHintEn: 'Need',
      answer: ['필', '요'],
      // 干扰："핑"（초성 ㅍ 相同、元音差别）；"오"（元音差别）
      syllables: ['필', '요', '핑', '오'],
    },
    {
      id: 'd26-v1-s2',
      zhHint: '可爱（形容词原形）', zhHintEn: 'Cute (adjective base form)',
      answer: ['귀', '엽', '다'],
      // 干扰："겨"（元음 ㅟ→ㅕ 差别）；"입"（초성/받침 差别）
      syllables: ['귀', '엽', '다', '겨', '입'],
    },
    {
      id: 'd26-v1-s3',
      zhHint: '圆珠笔', zhHintEn: 'Ballpoint pen',
      answer: ['볼', '펜'],
      // 干扰："볼"（同）；"팬"（意思是"粉丝"，声近容易混）；"본"（元음 ㅗ 相同）
      syllables: ['볼', '펜', '팬', '본'],
    },
    {
      id: 'd26-v1-s4',
      zhHint: '钥匙扣', zhHintEn: 'Keychain',
      answer: ['키', '링'],
      // 干扰："기"（초성 ㅋ→ㄱ 差）；"림"（받침 ㅇ→ㅁ 差）
      syllables: ['키', '링', '기', '림'],
    },
  ],

  write: [
    { id: 'd26-v1-w1', korean: '필', hangul: 'pil',       wordKorean: '필요하다',    wordZh: '需要', wordZhEn: 'Need' },
    { id: 'd26-v1-w2', korean: '사', hangul: 'sa',        wordKorean: '사다',        wordZh: '买', wordZhEn: 'Buy' },
    { id: 'd26-v1-w3', korean: '귀', hangul: 'gwi',       wordKorean: '귀엽다',      wordZh: '可爱', wordZhEn: 'Cute' },
    { id: 'd26-v1-w4', korean: '볼', hangul: 'bol',       wordKorean: '볼펜',        wordZh: '圆珠笔', wordZhEn: 'Ballpoint pen' },
    { id: 'd26-v1-w5', korean: '키', hangul: 'ki',        wordKorean: '키링',        wordZh: '钥匙扣', wordZhEn: 'Keychain' },
    { id: 'd26-v1-w6', korean: '샴', hangul: 'syam',      wordKorean: '샴푸',        wordZh: '洗发水', wordZhEn: 'Shampoo' },
    { id: 'd26-v1-w7', korean: '수', hangul: 'su',        wordKorean: '수건',        wordZh: '毛巾', wordZhEn: 'Towel' },
    { id: 'd26-v1-w8', korean: '얼', hangul: 'eol',       wordKorean: '얼마',        wordZh: '多少钱', wordZhEn: 'How much?' },
  ],

  dictation: [
    { id: 'd26-v1-d1', korean: '샴푸 필요해요',    hangul: 'syam-pu pi-ryo-hae-yo',       syllables: ['샴', '푸', '필', '요', '해', '요'],           zh: '需要洗发水', zhEn: 'Need shampoo' },
    { id: 'd26-v1-d2', korean: '이거 얼마예요?',   hangul: 'i-geo eol-ma-ye-yo',          syllables: ['이', '거', '얼', '마', '예', '요'],           zh: '这个多少钱', zhEn: 'How much is this' },
    { id: 'd26-v1-d3', korean: '진짜 귀여워요!',   hangul: 'jin-jja gwi-yeo-wo-yo',       syllables: ['진', '짜', '귀', '여', '워', '요'],           zh: '真的好可爱', zhEn: 'Really cute' },
  ],
};
