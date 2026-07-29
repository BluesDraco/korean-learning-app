import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 57 · 편지 세 통 · 词汇子关卡 */
export const day57Vocab: VocabSubQuestData = {
  day: 27, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '写信的 8 个词',

  encounter: [
    { id: 'd57-v1-e1', korean: '봉투',       hangul: 'bong-tu',       zh: '信封',        pos: '名词', example: { ko: '편지를 봉투에 넣었어요.',      zh: '把信放进信封。' },     tip: '封(봉) + 套(투) · 편지 봉투',                                  tier: 'core' },
    { id: 'd57-v1-e2', korean: '답장',       hangul: 'dap-jang',      zh: '回信',        pos: '名词', example: { ko: '답장 세 통이 왔어요.',           zh: '收到了三封回信。' },   tip: '答(답) + 状(장) · 답장하다',                                    tier: 'core' },
    { id: 'd57-v1-e3', korean: '멈추다',     hangul: 'meom-chu-da',   zh: '停止',        pos: '动词', example: { ko: '멈출 줄 몰라요.',                zh: '停不下来。' },         tip: '멈추다 → 멈춰요 · 멈출 줄 모르다 惯用',                          tier: 'core' },
    { id: 'd57-v1-e4', korean: '늘',         hangul: 'neul',          zh: '总是 / 一直', pos: '副词', example: { ko: '늘 그 자리에 있어줬어.',        zh: '总是在那儿。' },       tip: '항상 = 늘 · 感性表达时 늘 更柔',                                tier: 'core' },
    { id: 'd57-v1-e5', korean: '기다리다',   hangul: 'gi-da-ri-da',   zh: '等',          pos: '动词', example: { ko: '언젠간 기다릴게.',                zh: '总有一天我等。' },     tip: '기다리다 → 기다려요 / 기다릴게 承诺',                            tier: 'core' },
    { id: 'd57-v1-e6', korean: '서두르다',   hangul: 'seo-du-reu-da', zh: '着急 / 催',   pos: '动词', example: { ko: '서두르지 않을게.',                zh: '不催你。' },           tip: '르 不规则 · 서두르다 → 서둘러요',                                tier: 'core' },
    { id: 'd57-v1-e7', korean: '올림',       hangul: 'ol-lim',        zh: '敬上（信末）', pos: '名词', example: { ko: '토리 올림.',                       zh: '兔莉敬上。' },         tip: 'Day 33 复习 · 信末落款',                                        tier: 'ext' },
    { id: 'd57-v1-e8', korean: '~에게',      hangul: 'e-ge',          zh: '给～（平辈）', pos: '助词', example: { ko: '민지에게.',                        zh: '给 Minji。' },         tip: '평등 수신인 · 对长辈用 ~께',                                    tier: 'ext' },
  ],

  recognize: [
    { id: 'd57-v1-r1', korean: '봉투',       hangul: 'bong-tu',       choices: [{ zh: '信封',        correct: true }, { zh: '邮票',      correct: false }, { zh: '书',        correct: false }, { zh: '盒子',      correct: false }] },
    { id: 'd57-v1-r2', korean: '답장',       hangul: 'dap-jang',      choices: [{ zh: '回信',        correct: true }, { zh: '收信',      correct: false }, { zh: '写信',      correct: false }, { zh: '寄信',      correct: false }] },
    { id: 'd57-v1-r3', korean: '멈추다',     hangul: 'meom-chu-da',   choices: [{ zh: '停止',        correct: true }, { zh: '开始',      correct: false }, { zh: '继续',      correct: false }, { zh: '结束',      correct: false }] },
    { id: 'd57-v1-r4', korean: '늘',         hangul: 'neul',          choices: [{ zh: '总是',        correct: true }, { zh: '有时',      correct: false }, { zh: '从未',      correct: false }, { zh: '最近',      correct: false }] },
    { id: 'd57-v1-r5', korean: '기다리다',   hangul: 'gi-da-ri-da',   choices: [{ zh: '等',          correct: true }, { zh: '找',        correct: false }, { zh: '见',        correct: false }, { zh: '追',        correct: false }] },
    { id: 'd57-v1-r6', korean: '서두르다',   hangul: 'seo-du-reu-da', choices: [{ zh: '着急',        correct: true }, { zh: '慢慢',      correct: false }, { zh: '休息',      correct: false }, { zh: '等待',      correct: false }] },
  ],

  spell: [
    { id: 'd57-v1-s1', zhHint: '信封',      answer: ['봉', '투'], syllables: ['봉', '투', '봉', '두'] },
    { id: 'd57-v1-s2', zhHint: '回信',      answer: ['답', '장'], syllables: ['답', '장', '답', '잔'] },
    { id: 'd57-v1-s3', zhHint: '总是（늘）', answer: ['늘'],       syllables: ['늘', '늘', '눌', '들'] },
    { id: 'd57-v1-s4', zhHint: '等（기다）', answer: ['기', '다'], syllables: ['기', '다', '지', '다'] },
  ],

  write: [
    { id: 'd57-v1-w1', korean: '봉', hangul: 'bong',       wordKorean: '봉투',       wordZh: '信封' },
    { id: 'd57-v1-w2', korean: '투', hangul: 'tu',         wordKorean: '봉투',       wordZh: '信封' },
    { id: 'd57-v1-w3', korean: '답', hangul: 'dap',        wordKorean: '답장',       wordZh: '回信' },
    { id: 'd57-v1-w4', korean: '장', hangul: 'jang',       wordKorean: '답장',       wordZh: '回信' },
    { id: 'd57-v1-w5', korean: '늘', hangul: 'neul',       wordKorean: '늘',         wordZh: '总是' },
    { id: 'd57-v1-w6', korean: '기', hangul: 'gi',         wordKorean: '기다리다',   wordZh: '等' },
    { id: 'd57-v1-w7', korean: '다', hangul: 'da',         wordKorean: '기다리다',   wordZh: '等' },
    { id: 'd57-v1-w8', korean: '올', hangul: 'ol',         wordKorean: '올림',       wordZh: '敬上' },
  ],

  dictation: [
    { id: 'd57-v1-d1', korean: '고마워. 나도.',                    hangul: 'go-ma-wo. na-do.',                    syllables: ['고', '마', '워', '나', '도'],                zh: '谢谢。我也是。' },
    { id: 'd57-v1-d2', korean: '서두르지 않을게',                    hangul: 'seo-du-reu-ji a-neul-ge',              syllables: ['서', '두', '르', '지', '않', '을', '게'],     zh: '不催你' },
    { id: 'd57-v1-d3', korean: '언제든 괜찮아',                       hangul: 'eon-je-deun gwaen-cha-na',             syllables: ['언', '제', '든', '괜', '찮', '아'],           zh: '什么时候都行' },
  ],
};
