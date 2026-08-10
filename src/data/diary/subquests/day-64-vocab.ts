import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 64 · 3-1 단어 마스터 · 两周后 · 进步显著 */
export const day64Vocab: VocabSubQuestData = {
  day: 4, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '两周后进步的 8 个词',

  encounter: [
    { id: 'd64-v1-e1', korean: '익숙하다',   hangul: 'ik-suk-ha-da',      zh: '熟练 / 熟悉', pos: '形容词', example: { ko: '이제 익숙해요.',                zh: '现在熟练了。' },       tip: 'Day 64 主角形容词 · 익숙해지다 = 变熟练',                            tier: 'core' },
    { id: 'd64-v1-e2', korean: '자연스럽다', hangul: 'ja-yeon-seu-reop-da', zh: '自然',    pos: '形容词', example: { ko: '자연스럽게 말해요.',            zh: '自然地说。' },        tip: 'ㅂ 不规则 → 자연스러워요',                                           tier: 'core' },
    { id: 'd64-v1-e3', korean: '늘다',        hangul: 'neul-da',           zh: '增长 / 进步', pos: '动词', example: { ko: '실력이 늘었어요.',              zh: '实力提升了。' },      tip: 'ㄹ 词干 · 늘어나다 = 增加',                                          tier: 'core' },
    { id: 'd64-v1-e4', korean: '실수',        hangul: 'sil-su',            zh: '失误',    pos: '名词',   example: { ko: '실수 없어요.',                    zh: '没有失误。' },        tip: 'Day 63 学过 · 이 날은 反面 = 无失误',                                 tier: 'core' },
    { id: 'd64-v1-e5', korean: '결제',        hangul: 'gyeol-je',          zh: '结账 / 支付', pos: '名词', example: { ko: '카드 결제요.',                  zh: '刷卡支付。' },        tip: '决(결) + 済(제) · 결제하다 = 支付 · 결제 방식 = 支付方式',           tier: 'core' },
    { id: 'd64-v1-e6', korean: '흐름',        hangul: 'heu-reum',          zh: '流程 / 节奏', pos: '名词', example: { ko: '흐름이 자연스러워요.',          zh: '流程很自然。' },      tip: '흐르다（流）+ ㅁ · 一气呵成的动作串',                                tier: 'core' },
    { id: 'd64-v1-e7', korean: '사투리',     hangul: 'sa-tu-ri',          zh: '方言',    pos: '名词',   example: { ko: '사투리는 아직 어려워요.',        zh: '方言还是难。' },      tip: 'Day 74 재登场 · 부산 사투리 铺垫',                                   tier: 'ext' },
    { id: 'd64-v1-e8', korean: '부족하다',   hangul: 'bu-jok-ha-da',      zh: '不足 / 差得远', pos: '形容词', example: { ko: '아직 부족해요.',             zh: '还差得远。' },        tip: '반의어 = 충분하다 · Day 64 谦逊台词',                                tier: 'ext' },
  ],

  recognize: [
    { id: 'd64-v1-r1', korean: '익숙하다',   hangul: 'ik-suk-ha-da',      choices: [{ zh: '熟练',           correct: true }, { zh: '生疏',           correct: false }, { zh: '疲惫',           correct: false }, { zh: '紧张',           correct: false }] },
    { id: 'd64-v1-r2', korean: '자연스럽다', hangul: 'ja-yeon-seu-reop-da', choices: [{ zh: '自然',         correct: true }, { zh: '刻意',           correct: false }, { zh: '奇怪',           correct: false }, { zh: '安静',           correct: false }] },
    { id: 'd64-v1-r3', korean: '늘다',        hangul: 'neul-da',           choices: [{ zh: '增长 / 进步',   correct: true }, { zh: '减少',           correct: false }, { zh: '暂停',           correct: false }, { zh: '归零',           correct: false }] },
    { id: 'd64-v1-r4', korean: '결제',        hangul: 'gyeol-je',          choices: [{ zh: '结账',          correct: true }, { zh: '预订',           correct: false }, { zh: '退款',           correct: false }, { zh: '打折',           correct: false }] },
    { id: 'd64-v1-r5', korean: '흐름',        hangul: 'heu-reum',          choices: [{ zh: '流程 / 节奏',   correct: true }, { zh: '停顿',           correct: false }, { zh: '声音',           correct: false }, { zh: '味道',           correct: false }] },
    { id: 'd64-v1-r6', korean: '부족하다',   hangul: 'bu-jok-ha-da',      choices: [{ zh: '不足',          correct: true }, { zh: '充足',           correct: false }, { zh: '不错',           correct: false }, { zh: '完美',           correct: false }] },
  ],

  spell: [
    { id: 'd64-v1-s1', zhHint: '熟练',      answer: ['익', '숙'], syllables: ['익', '숙', '읽', '슥'] },
    { id: 'd64-v1-s2', zhHint: '结账',      answer: ['결', '제'], syllables: ['결', '제', '견', '재'] },
    { id: 'd64-v1-s3', zhHint: '流程',      answer: ['흐', '름'], syllables: ['흐', '름', '허', '람'] },
    { id: 'd64-v1-s4', zhHint: '方言',      answer: ['사', '투'], syllables: ['사', '투', '수', '터'] },
  ],

  write: [
    { id: 'd64-v1-w1', korean: '익', hangul: 'ik',        wordKorean: '익숙하다',   wordZh: '熟练' },
    { id: 'd64-v1-w2', korean: '숙', hangul: 'suk',       wordKorean: '익숙하다',   wordZh: '熟练' },
    { id: 'd64-v1-w3', korean: '결', hangul: 'gyeol',     wordKorean: '결제',        wordZh: '结账' },
    { id: 'd64-v1-w4', korean: '제', hangul: 'je',        wordKorean: '결제',        wordZh: '结账' },
    { id: 'd64-v1-w5', korean: '흐', hangul: 'heu',       wordKorean: '흐름',        wordZh: '流程' },
    { id: 'd64-v1-w6', korean: '름', hangul: 'reum',      wordKorean: '흐름',        wordZh: '流程' },
    { id: 'd64-v1-w7', korean: '사', hangul: 'sa',        wordKorean: '사투리',     wordZh: '方言' },
    { id: 'd64-v1-w8', korean: '늘', hangul: 'neul',      wordKorean: '늘다',        wordZh: '增长' },
  ],

  dictation: [
    { id: 'd64-v1-d1', korean: '진짜 빨리 늘었어요',            hangul: 'jin-jja ppal-li neu-reo-sseo-yo',   syllables: ['진', '짜', '빨', '리', '늘', '었', '어', '요'],       zh: '真的进步很快' },
    { id: 'd64-v1-d2', korean: '카드 결제요',                    hangul: 'ka-deu gyeol-je-yo',                 syllables: ['카', '드', '결', '제', '요'],                         zh: '刷卡支付' },
    { id: 'd64-v1-d3', korean: '아직 부족해요',                  hangul: 'a-jik bu-jok-hae-yo',                syllables: ['아', '직', '부', '족', '해', '요'],                   zh: '还差得远' },
  ],
};
