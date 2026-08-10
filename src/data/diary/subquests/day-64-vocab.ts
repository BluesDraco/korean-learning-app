import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 64 · 3-1 단어 마스터 · 两周后 · 进步显著 */
export const day64Vocab: VocabSubQuestData = {
  day: 4, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '两周后进步的 8 个词', subtitleEn: '8 words for progress after two weeks',

  encounter: [
    { id: 'd64-v1-e1', korean: '익숙하다',   hangul: 'ik-suk-ha-da',      zh: '熟练 / 熟悉', zhEn: 'skilled / familiar', pos: '形容词', posEn: 'Adjective.', example: { ko: '이제 익숙해요.',                zh: '现在熟练了。', zhEn: 'I\'m used to it now.' },       tip: 'Day 64 主角形容词 · 익숙해지다 = 变熟练', tipEn: 'Day 64 key adjective · 익숙해지다 = to become familiar',                            tier: 'core' },
    { id: 'd64-v1-e2', korean: '자연스럽다', hangul: 'ja-yeon-seu-reop-da', zh: '自然', zhEn: 'natural',    pos: '形容词', posEn: 'Adjective.', example: { ko: '자연스럽게 말해요.',            zh: '自然地说。', zhEn: 'Say it naturally.' },        tip: 'ㅂ 不规则 → 자연스러워요', tipEn: 'ㅂ irregular → 자연스러워요',                                           tier: 'core' },
    { id: 'd64-v1-e3', korean: '늘다',        hangul: 'neul-da',           zh: '增长 / 进步', zhEn: 'grow / improve', pos: '动词', posEn: 'Verb', example: { ko: '실력이 늘었어요.',              zh: '实力提升了。', zhEn: 'My skills improved.' },      tip: 'ㄹ 词干 · 늘어나다 = 增加', tipEn: 'ㄹ stem · 늘어나다 = to increase',                                          tier: 'core' },
    { id: 'd64-v1-e4', korean: '실수',        hangul: 'sil-su',            zh: '失误', zhEn: 'mistake',    pos: '名词', posEn: 'Noun',   example: { ko: '실수 없어요.',                    zh: '没有失误。', zhEn: 'No mistakes.' },        tip: 'Day 63 学过 · 이 날은 反面 = 无失误', tipEn: 'Learned on Day 63 · 이 날은 opposite = no mistakes',                                 tier: 'core' },
    { id: 'd64-v1-e5', korean: '결제',        hangul: 'gyeol-je',          zh: '结账 / 支付', zhEn: 'checkout / payment', pos: '名词', posEn: 'Noun', example: { ko: '카드 결제요.',                  zh: '刷卡支付。', zhEn: 'Pay by card.' },        tip: '决(결) + 済(제) · 결제하다 = 支付 · 결제 방식 = 支付方式', tipEn: '决(결) + 済(제) · 결제하다 = to pay · 결제 방식 = payment method',           tier: 'core' },
    { id: 'd64-v1-e6', korean: '흐름',        hangul: 'heu-reum',          zh: '流程 / 节奏', zhEn: 'flow / rhythm', pos: '名词', posEn: 'Noun', example: { ko: '흐름이 자연스러워요.',          zh: '流程很自然。', zhEn: 'The flow is natural.' },      tip: '흐르다（流）+ ㅁ · 一气呵成的动作串', tipEn: '흐르다 (flow) + ㅁ · a fluid sequence of actions',                                tier: 'core' },
    { id: 'd64-v1-e7', korean: '사투리',     hangul: 'sa-tu-ri',          zh: '方言', zhEn: 'dialect',    pos: '名词', posEn: 'Noun',   example: { ko: '사투리는 아직 어려워요.',        zh: '方言还是难。', zhEn: 'Dialects are still hard.' },      tip: 'Day 74 재登场 · 부산 사투리 铺垫', tipEn: 'Day 74 재登场 · setting up Busan dialect',                                   tier: 'ext' },
    { id: 'd64-v1-e8', korean: '부족하다',   hangul: 'bu-jok-ha-da',      zh: '不足 / 差得远', zhEn: 'insufficient / far from enough', pos: '形容词', posEn: 'Adjective.', example: { ko: '아직 부족해요.',             zh: '还差得远。', zhEn: 'Still far from enough.' },        tip: '반의어 = 충분하다 · Day 64 谦逊台词', tipEn: 'Antonym = 충분하다 · Day 64 humble line',                                tier: 'ext' },
  ],

  recognize: [
    { id: 'd64-v1-r1', korean: '익숙하다',   hangul: 'ik-suk-ha-da',      choices: [{ zh: '熟练', zhEn: 'skilled',           correct: true }, { zh: '生疏', zhEn: 'unfamiliar',           correct: false }, { zh: '疲惫', zhEn: 'exhausted',           correct: false }, { zh: '紧张', zhEn: 'nervous',           correct: false }] },
    { id: 'd64-v1-r2', korean: '자연스럽다', hangul: 'ja-yeon-seu-reop-da', choices: [{ zh: '自然', zhEn: 'natural',         correct: true }, { zh: '刻意', zhEn: 'deliberate',           correct: false }, { zh: '奇怪', zhEn: 'strange',           correct: false }, { zh: '安静', zhEn: 'Quiet',           correct: false }] },
    { id: 'd64-v1-r3', korean: '늘다',        hangul: 'neul-da',           choices: [{ zh: '增长 / 进步', zhEn: 'grow / improve',   correct: true }, { zh: '减少', zhEn: 'reduce',           correct: false }, { zh: '暂停', zhEn: 'pause',           correct: false }, { zh: '归零', zhEn: 'reset to zero',           correct: false }] },
    { id: 'd64-v1-r4', korean: '결제',        hangul: 'gyeol-je',          choices: [{ zh: '结账', zhEn: 'check, please',          correct: true }, { zh: '预订', zhEn: 'reserve',           correct: false }, { zh: '退款', zhEn: 'refund',           correct: false }, { zh: '打折', zhEn: 'Discount',           correct: false }] },
    { id: 'd64-v1-r5', korean: '흐름',        hangul: 'heu-reum',          choices: [{ zh: '流程 / 节奏', zhEn: 'flow / rhythm',   correct: true }, { zh: '停顿', zhEn: 'pause',           correct: false }, { zh: '声音', zhEn: 'Voice',           correct: false }, { zh: '味道', zhEn: 'taste',           correct: false }] },
    { id: 'd64-v1-r6', korean: '부족하다',   hangul: 'bu-jok-ha-da',      choices: [{ zh: '不足', zhEn: 'insufficient',          correct: true }, { zh: '充足', zhEn: 'sufficient',           correct: false }, { zh: '不错', zhEn: 'not bad',           correct: false }, { zh: '完美', zhEn: 'Perfect',           correct: false }] },
  ],

  spell: [
    { id: 'd64-v1-s1', zhHint: '熟练', zhHintEn: 'skilled',      answer: ['익', '숙'], syllables: ['익', '숙', '읽', '슥'] },
    { id: 'd64-v1-s2', zhHint: '结账', zhHintEn: 'check, please',      answer: ['결', '제'], syllables: ['결', '제', '견', '재'] },
    { id: 'd64-v1-s3', zhHint: '流程', zhHintEn: 'Flow',      answer: ['흐', '름'], syllables: ['흐', '름', '허', '람'] },
    { id: 'd64-v1-s4', zhHint: '方言', zhHintEn: 'dialect',      answer: ['사', '투'], syllables: ['사', '투', '수', '터'] },
  ],

  write: [
    { id: 'd64-v1-w1', korean: '익', hangul: 'ik',        wordKorean: '익숙하다',   wordZh: '熟练', wordZhEn: 'skilled' },
    { id: 'd64-v1-w2', korean: '숙', hangul: 'suk',       wordKorean: '익숙하다',   wordZh: '熟练', wordZhEn: 'skilled' },
    { id: 'd64-v1-w3', korean: '결', hangul: 'gyeol',     wordKorean: '결제',        wordZh: '结账', wordZhEn: 'check, please' },
    { id: 'd64-v1-w4', korean: '제', hangul: 'je',        wordKorean: '결제',        wordZh: '结账', wordZhEn: 'check, please' },
    { id: 'd64-v1-w5', korean: '흐', hangul: 'heu',       wordKorean: '흐름',        wordZh: '流程', wordZhEn: 'Flow' },
    { id: 'd64-v1-w6', korean: '름', hangul: 'reum',      wordKorean: '흐름',        wordZh: '流程', wordZhEn: 'Flow' },
    { id: 'd64-v1-w7', korean: '사', hangul: 'sa',        wordKorean: '사투리',     wordZh: '方言', wordZhEn: 'dialect' },
    { id: 'd64-v1-w8', korean: '늘', hangul: 'neul',      wordKorean: '늘다',        wordZh: '增长', wordZhEn: 'growth' },
  ],

  dictation: [
    { id: 'd64-v1-d1', korean: '진짜 빨리 늘었어요',            hangul: 'jin-jja ppal-li neu-reo-sseo-yo',   syllables: ['진', '짜', '빨', '리', '늘', '었', '어', '요'],       zh: '真的进步很快', zhEn: 'Really improving fast' },
    { id: 'd64-v1-d2', korean: '카드 결제요',                    hangul: 'ka-deu gyeol-je-yo',                 syllables: ['카', '드', '결', '제', '요'],                         zh: '刷卡支付', zhEn: 'Pay by card' },
    { id: 'd64-v1-d3', korean: '아직 부족해요',                  hangul: 'a-jik bu-jok-hae-yo',                syllables: ['아', '직', '부', '족', '해', '요'],                   zh: '还差得远', zhEn: 'Still far from enough' },
  ],
};
