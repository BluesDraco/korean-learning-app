import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 63 · 3-1 단어 마스터 · 打工第一天 · 洒咖啡 */
export const day63Vocab: VocabSubQuestData = {
  day: 3, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '打工第一天的 8 个词', subtitleEn: '8 words from your first day at work',

  encounter: [
    { id: 'd63-v1-e1', korean: '앞치마',    hangul: 'ap-chi-ma',      zh: '围裙', zhEn: 'Apron',    pos: '名词', posEn: 'Noun',   example: { ko: '앞치마를 입었어요.',           zh: '穿上围裙。', zhEn: 'Put on the apron.' },      tip: '앞(前) + 치마(裙子)· 카페 알바 필수품', tipEn: '앞(front) + 치마(skirt) · Essential for a café part-timer',                          tier: 'core' },
    { id: 'd63-v1-e2', korean: '주문',       hangul: 'ju-mun',         zh: '订单', zhEn: 'order',    pos: '名词', posEn: 'Noun',   example: { ko: '주문 받았어요.',                zh: '接了订单。', zhEn: 'Took the order.' },       tip: '注(주) + 文(문) · 주문하다 = 点餐 · 주문 받다 = 接单', tipEn: '注(주) + 文(문) · 주문하다 = to order · 주문 받다 = to take an order',            tier: 'core' },
    { id: 'd63-v1-e3', korean: '트레이',    hangul: 'teu-re-i',       zh: '托盘', zhEn: 'tray',    pos: '名词', posEn: 'Noun',   example: { ko: '트레이가 기울어졌어요.',       zh: '托盘倾斜了。', zhEn: 'The tray tilted.' },     tip: '外来语 tray · 커피 두 잔 트레이에', tipEn: 'Loanword tray · Two cups of coffee on the tray',                                 tier: 'core' },
    { id: 'd63-v1-e4', korean: '쏟다',       hangul: 'ssot-da',        zh: '洒 / 泼', zhEn: 'spill / splash',  pos: '动词', posEn: 'Verb',   example: { ko: '커피를 쏟아 버렸어요.',         zh: '把咖啡洒了。', zhEn: 'Spilled the coffee.' },     tip: 'Day 63 主角动词 · ~아/어 버리다 组合', tipEn: 'Day 63\'s main verb · ~아/어 버리다 combinations',                             tier: 'core' },
    { id: 'd63-v1-e5', korean: '떨리다',    hangul: 'tteol-li-da',    zh: '发抖 / 紧张', zhEn: 'Trembling / Nervous', pos: '动词', posEn: 'Verb', example: { ko: '손이 떨렸어요.',                zh: '手在抖。', zhEn: 'My hands are shaking.' },         tip: '떨다 + 이 · 紧张 / 兴奋 都用', tipEn: '떨다 + 이 · Used for both nervousness and excitement',                                     tier: 'core' },
    { id: 'd63-v1-e6', korean: '숨다',       hangul: 'sum-da',         zh: '躲藏', zhEn: 'Hide',    pos: '动词', posEn: 'Verb',   example: { ko: '주방 뒤에 숨었어요.',          zh: '躲到后厨。', zhEn: 'Hid in the back kitchen.' },       tip: '반의어 = 나오다 · 감정을 숨기다 = 藏起情绪', tipEn: 'Antonym = 나오다 · 감정을 숨기다 = to hide emotions',                     tier: 'core' },
    { id: 'd63-v1-e7', korean: '실수',       hangul: 'sil-su',         zh: '失误', zhEn: 'mistake',    pos: '名词', posEn: 'Noun',   example: { ko: '실수했어요.',                    zh: '出错了。', zhEn: 'Made a mistake.' },         tip: '失(실) + 手(수) · 실수하다 = 犯错 · Day 63 高频', tipEn: '失(실) + 手(수) · 실수하다 = to make a mistake · High-frequency in Day 63',                 tier: 'ext' },
    { id: 'd63-v1-e8', korean: '용기',       hangul: 'yong-gi',        zh: '勇气', zhEn: 'Courage',    pos: '名词', posEn: 'Noun',   example: { ko: '용기를 냈어요.',                zh: '拿出勇气。', zhEn: 'Summon the courage.' },       tip: 'Day 1 起妈妈胡萝卜笔关键词 · 용기를 내다', tipEn: 'A keyword since Day 1\'s mom\'s carrot pen · 용기를 내다',                       tier: 'ext' },
  ],

  recognize: [
    { id: 'd63-v1-r1', korean: '앞치마',    hangul: 'ap-chi-ma',      choices: [{ zh: '围裙', zhEn: 'Apron',       correct: true }, { zh: '外套', zhEn: 'Coat',         correct: false }, { zh: '帽子', zhEn: 'hat',         correct: false }, { zh: '手套', zhEn: 'Gloves',         correct: false }] },
    { id: 'd63-v1-r2', korean: '주문',       hangul: 'ju-mun',         choices: [{ zh: '订单', zhEn: 'order',       correct: true }, { zh: '菜单', zhEn: 'menu',         correct: false }, { zh: '账单', zhEn: 'bill',         correct: false }, { zh: '收据', zhEn: 'receipt',         correct: false }] },
    { id: 'd63-v1-r3', korean: '쏟다',       hangul: 'ssot-da',        choices: [{ zh: '洒 / 泼', zhEn: 'spill / splash',    correct: true }, { zh: '装', zhEn: 'fill',           correct: false }, { zh: '倒进', zhEn: 'pour into',         correct: false }, { zh: '收起', zhEn: 'put away',         correct: false }] },
    { id: 'd63-v1-r4', korean: '떨리다',    hangul: 'tteol-li-da',    choices: [{ zh: '发抖 / 紧张', zhEn: 'Trembling / Nervous', correct: true }, { zh: '生气', zhEn: 'Angry',         correct: false }, { zh: '安心', zhEn: 'peace of mind',         correct: false }, { zh: '睡着', zhEn: 'to fall asleep',         correct: false }] },
    { id: 'd63-v1-r5', korean: '숨다',       hangul: 'sum-da',         choices: [{ zh: '躲藏', zhEn: 'Hide',       correct: true }, { zh: '走出', zhEn: 'to walk out',         correct: false }, { zh: '呼吸', zhEn: 'breathe',         correct: false }, { zh: '睡觉', zhEn: 'sleep',         correct: false }] },
    { id: 'd63-v1-r6', korean: '실수',       hangul: 'sil-su',         choices: [{ zh: '失误', zhEn: 'mistake',       correct: true }, { zh: '成功', zhEn: 'Success',         correct: false }, { zh: '手感', zhEn: 'feel; texture',         correct: false }, { zh: '实力', zhEn: 'skill',         correct: false }] },
  ],

  spell: [
    { id: 'd63-v1-s1', zhHint: '围裙', zhHintEn: 'Apron',      answer: ['앞', '치', '마'], syllables: ['앞', '치', '마', '지'] },
    { id: 'd63-v1-s2', zhHint: '订单', zhHintEn: 'order',      answer: ['주', '문'], syllables: ['주', '문', '즈', '만'] },
    { id: 'd63-v1-s3', zhHint: '失误', zhHintEn: 'mistake',      answer: ['실', '수'], syllables: ['실', '수', '실', '스'] },
    { id: 'd63-v1-s4', zhHint: '勇气', zhHintEn: 'Courage',      answer: ['용', '기'], syllables: ['용', '기', '요', '지'] },
  ],

  write: [
    { id: 'd63-v1-w1', korean: '앞', hangul: 'ap',        wordKorean: '앞치마',   wordZh: '围裙', wordZhEn: 'Apron' },
    { id: 'd63-v1-w2', korean: '치', hangul: 'chi',       wordKorean: '앞치마',   wordZh: '围裙', wordZhEn: 'Apron' },
    { id: 'd63-v1-w3', korean: '주', hangul: 'ju',        wordKorean: '주문',     wordZh: '订单', wordZhEn: 'order' },
    { id: 'd63-v1-w4', korean: '문', hangul: 'mun',       wordKorean: '주문',     wordZh: '订单', wordZhEn: 'order' },
    { id: 'd63-v1-w5', korean: '쏟', hangul: 'ssot',      wordKorean: '쏟다',     wordZh: '洒', wordZhEn: 'spill' },
    { id: 'd63-v1-w6', korean: '숨', hangul: 'sum',       wordKorean: '숨다',     wordZh: '躲藏', wordZhEn: 'Hide' },
    { id: 'd63-v1-w7', korean: '실', hangul: 'sil',       wordKorean: '실수',     wordZh: '失误', wordZhEn: 'mistake' },
    { id: 'd63-v1-w8', korean: '용', hangul: 'yong',      wordKorean: '용기',     wordZh: '勇气', wordZhEn: 'Courage' },
  ],

  dictation: [
    { id: 'd63-v1-d1', korean: '커피를 쏟아 버렸어요',      hangul: 'keo-pi-reul sso-da beo-ryeo-sseo-yo',    syllables: ['커', '피', '를', '쏟', '아', '버', '렸', '어', '요'],       zh: '不小心把咖啡洒了', zhEn: 'accidentally spilled the coffee' },
    { id: 'd63-v1-d2', korean: '주방 뒤에 숨었어요',         hangul: 'ju-bang dwi-e sum-eo-sseo-yo',           syllables: ['주', '방', '뒤', '에', '숨', '었', '어', '요'],              zh: '躲到了后厨', zhEn: 'hid in the back kitchen' },
    { id: 'd63-v1-d3', korean: '용기를 냈어요',                hangul: 'yong-gi-reul nae-sseo-yo',                syllables: ['용', '기', '를', '냈', '어', '요'],                          zh: '拿出了勇气', zhEn: 'gathered courage' },
  ],
};
