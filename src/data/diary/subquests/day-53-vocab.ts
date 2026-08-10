import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 53 · Tori 请客 · 词汇子关卡 */
export const day53Vocab: VocabSubQuestData = {
  day: 23, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '请客的 8 个词', subtitleEn: '8 words for treating someone',

  encounter: [
    { id: 'd53-v1-e1', korean: '치킨',       hangul: 'chi-kin',       zh: '炸鸡', zhEn: 'fried chicken',          pos: '名词', posEn: 'Noun', example: { ko: '치킨 한 마리 주세요.',        zh: '来一只炸鸡。', zhEn: 'One fried chicken, please.' },       tip: 'chicken 外来语 · 반반 = 半半原味+调味', tipEn: 'chicken loanword · 반반 = half-half original+seasoned',                        tier: 'core' },
    { id: 'd53-v1-e2', korean: '한 마리',    hangul: 'han ma-ri',     zh: '一只', zhEn: 'one',          pos: '表达', posEn: 'Expression', example: { ko: '치킨 한 마리 주세요.',        zh: '来一只炸鸡。', zhEn: 'One fried chicken, please.' },       tip: '마리 = 动物量词 · 두 마리 = 两只', tipEn: '마리 = animal counter · 두 마리 = two',                              tier: 'core' },
    { id: 'd53-v1-e3', korean: '한턱 내다',  hangul: 'han-teok nae-da', zh: '请客', zhEn: 'Treat',         pos: '表达', posEn: 'Expression', example: { ko: '오늘은 내가 한턱 낼게.',      zh: '今天我请客。', zhEn: 'I\'m treating today.' },       tip: 'Day 27 复习 · 这次是 Tori 自己说的', tipEn: 'Day 27 review · this time Tori said it herself',                            tier: 'core' },
    { id: 'd53-v1-e4', korean: '결제하다',   hangul: 'gyeol-je-ha-da', zh: '结账', zhEn: 'check, please',         pos: '动词', posEn: 'Verb', example: { ko: '카드로 결제할게요.',            zh: '刷卡结账。', zhEn: 'Pay by card.' },         tip: '카드/현금 결제 · Day 51 复习', tipEn: 'card/cash payment · Day 51 review',                                  tier: 'core' },
    { id: 'd53-v1-e5', korean: '이모',       hangul: 'i-mo',          zh: '阿姨（餐厅）', zhEn: 'auntie (restaurant)',  pos: '名词', posEn: 'Noun', example: { ko: '이모, 여기 물 좀 주세요.',    zh: '阿姨，来点水。', zhEn: 'Auntie, some water, please.' },     tip: '原意姨母 · 餐厅中年女服务员的亲切叫法', tipEn: 'originally means aunt · friendly term for middle-aged female server at restaurants',                          tier: 'core' },
    { id: 'd53-v1-e6', korean: '성장하다',   hangul: 'seong-jang-ha-da', zh: '成长', zhEn: 'growth',       pos: '动词', posEn: 'Verb', example: { ko: '토리 진짜 성장했다.',           zh: '兔莉真的成长了。', zhEn: 'Tori has really grown.' },   tip: 'Minji 说的一句 · 成(성) + 长(장)', tipEn: 'a line from Minji · 성(成) + 장(长)',                              tier: 'core' },
    { id: 'd53-v1-e7', korean: '감튀',       hangul: 'gam-twi',       zh: '薯条', zhEn: 'fries',          pos: '名词', posEn: 'Noun', example: { ko: '감튀 하나 주세요.',              zh: '一份薯条。', zhEn: 'one order of fries.' },         tip: '감자튀김 缩略 · 韩国餐厅常见', tipEn: 'abbreviation of 감자튀김 · common in Korean restaurants',                                  tier: 'ext' },
    { id: 'd53-v1-e8', korean: '반반',       hangul: 'ban-ban',       zh: '半半', zhEn: 'half-half',          pos: '名词', posEn: 'Noun', example: { ko: '반반 한 마리 주세요.',          zh: '来一份半半。', zhEn: 'I\'ll have a half-half.' },       tip: '半原味 + 半调味 · 炸鸡店点单必用', tipEn: 'half original + half seasoned · essential for ordering at fried chicken shops',                              tier: 'ext' },
  ],

  recognize: [
    { id: 'd53-v1-r1', korean: '치킨',       hangul: 'chi-kin',       choices: [{ zh: '炸鸡', zhEn: 'fried chicken',      correct: true }, { zh: '烤鸡', zhEn: 'roast chicken',      correct: false }, { zh: '汉堡', zhEn: 'burger',      correct: false }, { zh: '沙拉', zhEn: 'salad',      correct: false }] },
    { id: 'd53-v1-r2', korean: '한 마리',    hangul: 'han ma-ri',     choices: [{ zh: '一只', zhEn: 'one',      correct: true }, { zh: '一片', zhEn: 'a slice',      correct: false }, { zh: '一份', zhEn: 'one serving',      correct: false }, { zh: '一个', zhEn: 'one',      correct: false }] },
    { id: 'd53-v1-r3', korean: '한턱 내다',  hangul: 'han-teok nae-da', choices: [{ zh: '请客', zhEn: 'Treat',      correct: true }, { zh: 'AA 制', zhEn: 'going Dutch',    correct: false }, { zh: '欠账', zhEn: 'owing someone',      correct: false }, { zh: '打折', zhEn: 'Discount',      correct: false }] },
    { id: 'd53-v1-r4', korean: '결제하다',   hangul: 'gyeol-je-ha-da', choices: [{ zh: '结账', zhEn: 'check, please',      correct: true }, { zh: '存款', zhEn: 'deposit',      correct: false }, { zh: '取款', zhEn: 'withdrawal',      correct: false }, { zh: '汇款', zhEn: 'remittance',      correct: false }] },
    { id: 'd53-v1-r5', korean: '이모',       hangul: 'i-mo',          choices: [{ zh: '阿姨（餐厅）', zhEn: 'auntie (restaurant)', correct: true }, { zh: '奶奶', zhEn: 'Grandmother',      correct: false }, { zh: '妈妈', zhEn: 'Mom',      correct: false }, { zh: '姐姐', zhEn: 'Older sister',      correct: false }] },
    { id: 'd53-v1-r6', korean: '성장하다',   hangul: 'seong-jang-ha-da', choices: [{ zh: '成长', zhEn: 'growth',      correct: true }, { zh: '减肥', zhEn: 'diet',      correct: false }, { zh: '衰老', zhEn: 'aging',      correct: false }, { zh: '生病', zhEn: 'get sick',      correct: false }] },
  ],

  spell: [
    { id: 'd53-v1-s1', zhHint: '炸鸡', zhHintEn: 'fried chicken',       answer: ['치', '킨'], syllables: ['치', '킨', '치', '긴'] },
    { id: 'd53-v1-s2', zhHint: '结账（결제）', zhHintEn: 'checkout (결제)', answer: ['결', '제'], syllables: ['결', '제', '결', '재'] },
    { id: 'd53-v1-s3', zhHint: '阿姨（이모）', zhHintEn: 'aunt (이모)', answer: ['이', '모'], syllables: ['이', '모', '이', '무'] },
    { id: 'd53-v1-s4', zhHint: '成长（성장）', zhHintEn: 'growth (성장)', answer: ['성', '장'], syllables: ['성', '장', '성', '잔'] },
  ],

  write: [
    { id: 'd53-v1-w1', korean: '치', hangul: 'chi',        wordKorean: '치킨',       wordZh: '炸鸡', wordZhEn: 'fried chicken' },
    { id: 'd53-v1-w2', korean: '킨', hangul: 'kin',        wordKorean: '치킨',       wordZh: '炸鸡', wordZhEn: 'fried chicken' },
    { id: 'd53-v1-w3', korean: '결', hangul: 'gyeol',      wordKorean: '결제하다',   wordZh: '结账', wordZhEn: 'check, please' },
    { id: 'd53-v1-w4', korean: '제', hangul: 'je',         wordKorean: '결제하다',   wordZh: '结账', wordZhEn: 'check, please' },
    { id: 'd53-v1-w5', korean: '이', hangul: 'i',          wordKorean: '이모',       wordZh: '阿姨', wordZhEn: 'auntie' },
    { id: 'd53-v1-w6', korean: '모', hangul: 'mo',         wordKorean: '이모',       wordZh: '阿姨', wordZhEn: 'auntie' },
    { id: 'd53-v1-w7', korean: '성', hangul: 'seong',      wordKorean: '성장하다',   wordZh: '成长', wordZhEn: 'growth' },
    { id: 'd53-v1-w8', korean: '장', hangul: 'jang',       wordKorean: '성장하다',   wordZh: '成长', wordZhEn: 'growth' },
  ],

  dictation: [
    { id: 'd53-v1-d1', korean: '내가 살게',                hangul: 'nae-ga sal-ge',                syllables: ['내', '가', '살', '게'],                     zh: '我来买（请）', zhEn: 'I\'ll pay (please)' },
    { id: 'd53-v1-d2', korean: '카드로 결제할게요',        hangul: 'ka-deu-ro gyeol-je-hal-ge-yo', syllables: ['카', '드', '로', '결', '제', '할', '게', '요'], zh: '刷卡结账', zhEn: 'Pay by card' },
    { id: 'd53-v1-d3', korean: '치킨 한 마리 주세요',       hangul: 'chi-kin han ma-ri ju-se-yo',   syllables: ['치', '킨', '한', '마', '리', '주', '세', '요'], zh: '来一只炸鸡', zhEn: 'one fried chicken' },
  ],
};
