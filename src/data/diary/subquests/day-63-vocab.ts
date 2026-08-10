import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 63 · 3-1 단어 마스터 · 打工第一天 · 洒咖啡 */
export const day63Vocab: VocabSubQuestData = {
  day: 3, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '打工第一天的 8 个词',

  encounter: [
    { id: 'd63-v1-e1', korean: '앞치마',    hangul: 'ap-chi-ma',      zh: '围裙',    pos: '名词',   example: { ko: '앞치마를 입었어요.',           zh: '穿上围裙。' },      tip: '앞(前) + 치마(裙子)· 카페 알바 필수품',                          tier: 'core' },
    { id: 'd63-v1-e2', korean: '주문',       hangul: 'ju-mun',         zh: '订单',    pos: '名词',   example: { ko: '주문 받았어요.',                zh: '接了订单。' },       tip: '注(주) + 文(문) · 주문하다 = 点餐 · 주문 받다 = 接单',            tier: 'core' },
    { id: 'd63-v1-e3', korean: '트레이',    hangul: 'teu-re-i',       zh: '托盘',    pos: '名词',   example: { ko: '트레이가 기울어졌어요.',       zh: '托盘倾斜了。' },     tip: '外来语 tray · 커피 두 잔 트레이에',                                 tier: 'core' },
    { id: 'd63-v1-e4', korean: '쏟다',       hangul: 'ssot-da',        zh: '洒 / 泼',  pos: '动词',   example: { ko: '커피를 쏟아 버렸어요.',         zh: '把咖啡洒了。' },     tip: 'Day 63 主角动词 · ~아/어 버리다 组合',                             tier: 'core' },
    { id: 'd63-v1-e5', korean: '떨리다',    hangul: 'tteol-li-da',    zh: '发抖 / 紧张', pos: '动词', example: { ko: '손이 떨렸어요.',                zh: '手在抖。' },         tip: '떨다 + 이 · 紧张 / 兴奋 都用',                                     tier: 'core' },
    { id: 'd63-v1-e6', korean: '숨다',       hangul: 'sum-da',         zh: '躲藏',    pos: '动词',   example: { ko: '주방 뒤에 숨었어요.',          zh: '躲到后厨。' },       tip: '반의어 = 나오다 · 감정을 숨기다 = 藏起情绪',                     tier: 'core' },
    { id: 'd63-v1-e7', korean: '실수',       hangul: 'sil-su',         zh: '失误',    pos: '名词',   example: { ko: '실수했어요.',                    zh: '出错了。' },         tip: '失(실) + 手(수) · 실수하다 = 犯错 · Day 63 高频',                 tier: 'ext' },
    { id: 'd63-v1-e8', korean: '용기',       hangul: 'yong-gi',        zh: '勇气',    pos: '名词',   example: { ko: '용기를 냈어요.',                zh: '拿出勇气。' },       tip: 'Day 1 起妈妈胡萝卜笔关键词 · 용기를 내다',                       tier: 'ext' },
  ],

  recognize: [
    { id: 'd63-v1-r1', korean: '앞치마',    hangul: 'ap-chi-ma',      choices: [{ zh: '围裙',       correct: true }, { zh: '外套',         correct: false }, { zh: '帽子',         correct: false }, { zh: '手套',         correct: false }] },
    { id: 'd63-v1-r2', korean: '주문',       hangul: 'ju-mun',         choices: [{ zh: '订单',       correct: true }, { zh: '菜单',         correct: false }, { zh: '账单',         correct: false }, { zh: '收据',         correct: false }] },
    { id: 'd63-v1-r3', korean: '쏟다',       hangul: 'ssot-da',        choices: [{ zh: '洒 / 泼',    correct: true }, { zh: '装',           correct: false }, { zh: '倒进',         correct: false }, { zh: '收起',         correct: false }] },
    { id: 'd63-v1-r4', korean: '떨리다',    hangul: 'tteol-li-da',    choices: [{ zh: '发抖 / 紧张', correct: true }, { zh: '生气',         correct: false }, { zh: '安心',         correct: false }, { zh: '睡着',         correct: false }] },
    { id: 'd63-v1-r5', korean: '숨다',       hangul: 'sum-da',         choices: [{ zh: '躲藏',       correct: true }, { zh: '走出',         correct: false }, { zh: '呼吸',         correct: false }, { zh: '睡觉',         correct: false }] },
    { id: 'd63-v1-r6', korean: '실수',       hangul: 'sil-su',         choices: [{ zh: '失误',       correct: true }, { zh: '成功',         correct: false }, { zh: '手感',         correct: false }, { zh: '实力',         correct: false }] },
  ],

  spell: [
    { id: 'd63-v1-s1', zhHint: '围裙',      answer: ['앞', '치', '마'], syllables: ['앞', '치', '마', '지'] },
    { id: 'd63-v1-s2', zhHint: '订单',      answer: ['주', '문'], syllables: ['주', '문', '즈', '만'] },
    { id: 'd63-v1-s3', zhHint: '失误',      answer: ['실', '수'], syllables: ['실', '수', '실', '스'] },
    { id: 'd63-v1-s4', zhHint: '勇气',      answer: ['용', '기'], syllables: ['용', '기', '요', '지'] },
  ],

  write: [
    { id: 'd63-v1-w1', korean: '앞', hangul: 'ap',        wordKorean: '앞치마',   wordZh: '围裙' },
    { id: 'd63-v1-w2', korean: '치', hangul: 'chi',       wordKorean: '앞치마',   wordZh: '围裙' },
    { id: 'd63-v1-w3', korean: '주', hangul: 'ju',        wordKorean: '주문',     wordZh: '订单' },
    { id: 'd63-v1-w4', korean: '문', hangul: 'mun',       wordKorean: '주문',     wordZh: '订单' },
    { id: 'd63-v1-w5', korean: '쏟', hangul: 'ssot',      wordKorean: '쏟다',     wordZh: '洒' },
    { id: 'd63-v1-w6', korean: '숨', hangul: 'sum',       wordKorean: '숨다',     wordZh: '躲藏' },
    { id: 'd63-v1-w7', korean: '실', hangul: 'sil',       wordKorean: '실수',     wordZh: '失误' },
    { id: 'd63-v1-w8', korean: '용', hangul: 'yong',      wordKorean: '용기',     wordZh: '勇气' },
  ],

  dictation: [
    { id: 'd63-v1-d1', korean: '커피를 쏟아 버렸어요',      hangul: 'keo-pi-reul sso-da beo-ryeo-sseo-yo',    syllables: ['커', '피', '를', '쏟', '아', '버', '렸', '어', '요'],       zh: '不小心把咖啡洒了' },
    { id: 'd63-v1-d2', korean: '주방 뒤에 숨었어요',         hangul: 'ju-bang dwi-e sum-eo-sseo-yo',           syllables: ['주', '방', '뒤', '에', '숨', '었', '어', '요'],              zh: '躲到了后厨' },
    { id: 'd63-v1-d3', korean: '용기를 냈어요',                hangul: 'yong-gi-reul nae-sseo-yo',                syllables: ['용', '기', '를', '냈', '어', '요'],                          zh: '拿出了勇气' },
  ],
};
