import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 51 · 生咖独行 · 词汇子关卡 */
export const day51Vocab: VocabSubQuestData = {
  day: 21, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '一个人追星的 8 个词', subtitleEn: '8 words for solo fangirling',

  encounter: [
    { id: 'd51-v1-e1', korean: '시그니처',   hangul: 'si-geu-ni-cheo', zh: '招牌（饮品）', zhEn: 'Signature (drink)',   pos: '名词', posEn: 'Noun', example: { ko: '오늘 시그니처 음료 뭐예요?',    zh: '今天招牌饮品是什么？', zhEn: 'What\'s today\'s signature drink?' }, tip: 'signature 外来语 · 咖啡菜单必备', tipEn: 'signature loanword · essential for coffee menus',                              tier: 'core' },
    { id: 'd51-v1-e2', korean: '포토카드',   hangul: 'po-to-ka-deu',   zh: '小卡', zhEn: 'photocard',           pos: '名词', posEn: 'Noun', example: { ko: '포토카드 랜덤 1장이에요.',      zh: '随机小卡一张。', zhEn: 'One random photocard.' },        tip: 'photo card · 팬덤 상용어 · 简称 포카', tipEn: 'photo card · fandom term · abbreviated as 포카',                          tier: 'core' },
    { id: 'd51-v1-e3', korean: '랜덤',       hangul: 'raen-deom',      zh: '随机', zhEn: 'Random',           pos: '名词', posEn: 'Noun', example: { ko: '랜덤으로 나와요.',                zh: '随机开出。', zhEn: 'Random draw.' },              tip: 'random 外来语 · 韩国粉圈日常', tipEn: 'random loanword · everyday in Korean fan circles',                                  tier: 'core' },
    { id: 'd51-v1-e4', korean: '팬',         hangul: 'paen',           zh: '粉丝', zhEn: 'Fan',           pos: '名词', posEn: 'Noun', example: { ko: '오늘, 나 진짜 팬이었어.',        zh: '今天，我是真正的粉丝。', zhEn: 'Today, I\'m a true fan.' },  tip: 'Day 23 复习 · 这次 Tori 自己承认', tipEn: 'Day 23 review · This time Tori admits it herself',                              tier: 'core' },
    { id: 'd51-v1-e5', korean: '카드',       hangul: 'ka-deu',         zh: '卡（信用/照片）', zhEn: 'card (credit/photo)', pos: '名词', posEn: 'Noun', example: { ko: '카드로 결제할게요.',              zh: '刷卡结账。', zhEn: 'Pay by card.' },              tip: '신용카드 = 信用卡 · 포카 = 포토카드', tipEn: '신용카드 = credit card · 포카 = photo card',                            tier: 'core' },
    { id: 'd51-v1-e6', korean: '뽑다',       hangul: 'ppop-da',        zh: '抽 / 挑', zhEn: 'draw / pick',        pos: '动词', posEn: 'Verb', example: { ko: '오빠 사진을 뽑았어요!',           zh: '抽到了 오빠 的照片！', zhEn: 'Got oppa\'s photo!' },    tip: '카드 뽑다 = 抽到卡 · 随机分配的场景', tipEn: '카드 뽑다 = pulling a card · random distribution scenario',                             tier: 'core' },
    { id: 'd51-v1-e7', korean: '혼자서',     hangul: 'hon-ja-seo',     zh: '独自地', zhEn: 'On one\'s own',         pos: '副词', posEn: 'Adverb', example: { ko: '혼자서 다 했어요.',                 zh: '一个人全做完了。', zhEn: 'Did everything alone.' },        tip: '혼자 + 서 · 强调"以独自方式" · 자립 关键词', tipEn: '혼자 + 서 · emphasizes \'in one\'s own way\' · keyword for independence',                     tier: 'ext' },
    { id: 'd51-v1-e8', korean: '결제하다',   hangul: 'gyeol-je-ha-da', zh: '结账 / 支付', zhEn: 'checkout / payment',     pos: '动词', posEn: 'Verb', example: { ko: '카드로 결제할게요.',              zh: '刷卡结账。', zhEn: 'Pay by card.' },              tip: '결제 = 支付 · 결제하다 · 咖啡厅高频', tipEn: '결제 = payment · 결제하다 · common at cafes',                            tier: 'ext' },
  ],

  recognize: [
    { id: 'd51-v1-r1', korean: '시그니처', hangul: 'si-geu-ni-cheo', choices: [{ zh: '招牌', zhEn: 'signboard',        correct: true }, { zh: '标签', zhEn: 'label',      correct: false }, { zh: '标志', zhEn: 'sign',        correct: false }, { zh: '标价', zhEn: 'price tag',        correct: false }] },
    { id: 'd51-v1-r2', korean: '포토카드', hangul: 'po-to-ka-deu',   choices: [{ zh: '小卡', zhEn: 'photocard',        correct: true }, { zh: '海报', zhEn: 'poster',      correct: false }, { zh: '会员卡', zhEn: 'membership card',      correct: false }, { zh: '照片墙', zhEn: 'Photo Wall',      correct: false }] },
    { id: 'd51-v1-r3', korean: '랜덤',     hangul: 'raen-deom',      choices: [{ zh: '随机', zhEn: 'Random',        correct: true }, { zh: '一定', zhEn: 'for sure',      correct: false }, { zh: '亲选', zhEn: 'Handpicked',        correct: false }, { zh: '限量', zhEn: 'Limited',        correct: false }] },
    { id: 'd51-v1-r4', korean: '팬',       hangul: 'paen',           choices: [{ zh: '粉丝', zhEn: 'Fan',        correct: true }, { zh: '演员', zhEn: 'actor',      correct: false }, { zh: '偶像', zhEn: 'Idol',        correct: false }, { zh: '朋友', zhEn: 'friend',        correct: false }] },
    { id: 'd51-v1-r5', korean: '뽑다',     hangul: 'ppop-da',        choices: [{ zh: '抽 / 挑', zhEn: 'draw / pick',     correct: true }, { zh: '发', zhEn: 'Post',        correct: false }, { zh: '收', zhEn: 'Receive',          correct: false }, { zh: '买', zhEn: 'Buy',          correct: false }] },
    { id: 'd51-v1-r6', korean: '혼자서',   hangul: 'hon-ja-seo',     choices: [{ zh: '独自地', zhEn: 'On one\'s own',      correct: true }, { zh: '一起', zhEn: 'together',      correct: false }, { zh: '各自', zhEn: 'each / respective',        correct: false }, { zh: '总是', zhEn: 'Always',        correct: false }] },
  ],

  spell: [
    { id: 'd51-v1-s1', zhHint: '粉丝', zhHintEn: 'Fan',       answer: ['팬'],       syllables: ['팬', '팬', '판', '팽'] },
    { id: 'd51-v1-s2', zhHint: '独自（혼자）', zhHintEn: 'Alone (혼자)', answer: ['혼', '자'], syllables: ['혼', '자', '홀', '자'] },
    { id: 'd51-v1-s3', zhHint: '抽（뽑아）', zhHintEn: 'Draw (뽑아)',  answer: ['뽑', '아'], syllables: ['뽑', '아', '뽀', '아'] },
    { id: 'd51-v1-s4', zhHint: '结算（결제）', zhHintEn: 'Checkout (결제)', answer: ['결', '제'], syllables: ['결', '제', '결', '재'] },
  ],

  write: [
    { id: 'd51-v1-w1', korean: '팬', hangul: 'paen',       wordKorean: '팬',        wordZh: '粉丝', wordZhEn: 'Fan' },
    { id: 'd51-v1-w2', korean: '카', hangul: 'ka',         wordKorean: '카드',      wordZh: '卡', wordZhEn: 'Card' },
    { id: 'd51-v1-w3', korean: '드', hangul: 'deu',        wordKorean: '카드',      wordZh: '卡', wordZhEn: 'Card' },
    { id: 'd51-v1-w4', korean: '뽑', hangul: 'ppop',       wordKorean: '뽑다',      wordZh: '抽', wordZhEn: 'Draw' },
    { id: 'd51-v1-w5', korean: '혼', hangul: 'hon',        wordKorean: '혼자서',    wordZh: '独自', wordZhEn: 'Alone' },
    { id: 'd51-v1-w6', korean: '자', hangul: 'ja',         wordKorean: '혼자서',    wordZh: '独自', wordZhEn: 'Alone' },
    { id: 'd51-v1-w7', korean: '결', hangul: 'gyeol',      wordKorean: '결제하다',  wordZh: '结账', wordZhEn: 'check, please' },
    { id: 'd51-v1-w8', korean: '제', hangul: 'je',         wordKorean: '결제하다',  wordZh: '结账', wordZhEn: 'check, please' },
  ],

  dictation: [
    { id: 'd51-v1-d1', korean: '혼자서 다 했어요',        hangul: 'hon-ja-seo da hae-sseo-yo',       syllables: ['혼', '자', '서', '다', '했', '어', '요'],   zh: '一个人全做完了', zhEn: 'Did everything alone' },
    { id: 'd51-v1-d2', korean: '카드로 결제할게요',       hangul: 'ka-deu-ro gyeol-je-hal-ge-yo',    syllables: ['카', '드', '로', '결', '제', '할', '게', '요'], zh: '刷卡结账', zhEn: 'Pay by card' },
    { id: 'd51-v1-d3', korean: '포카 랜덤 1장',             hangul: 'po-ka raen-deom han-jang',        syllables: ['포', '카', '랜', '덤', '1', '장'],           zh: '随机小卡一张', zhEn: 'One random photo card' },
  ],
};
