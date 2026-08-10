import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 46 · 하루의 생일 · 词汇子关卡 */
export const day46Vocab: VocabSubQuestData = {
  day: 16, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: 'Haru 生日的 8 个词',

  encounter: [
    { id: 'd46-v1-e1', korean: '생일',       hangul: 'saeng-il',      zh: '生日',        pos: '名词', example: { ko: '오늘 하루 생일이에요.',       zh: '今天 Haru 生日。' },       tip: '生(생) + 日(일) · 생일 축하해 = 生日快乐',                      tier: 'core' },
    { id: 'd46-v1-e2', korean: '축하하다',   hangul: 'chuk-a-ha-da',  zh: '祝贺',        pos: '动词', example: { ko: '생일 축하해!',                zh: '生日快乐！' },             tip: '祝(축) + 贺(하) + 하다',                                        tier: 'core' },
    { id: 'd46-v1-e3', korean: '케이크',     hangul: 'ke-i-keu',      zh: '蛋糕',        pos: '名词', example: { ko: '딸기 케이크를 샀어요.',       zh: '买了草莓蛋糕。' },         tip: '英语 cake 外来语 · 생일 케이크',                                tier: 'core' },
    { id: 'd46-v1-e4', korean: '선물',       hangul: 'seon-mul',      zh: '礼物',        pos: '名词', example: { ko: '선물을 준비했어요.',           zh: '准备了礼物。' },           tip: '膳(선) + 物(물) · 주다 = 送 / 받다 = 收',                       tier: 'core' },
    { id: 'd46-v1-e5', korean: '촛불',       hangul: 'chot-bul',      zh: '蜡烛',        pos: '名词', example: { ko: '촛불을 껐어요.',              zh: '吹灭了蜡烛。' },           tip: '초(烛) + 불(火) · 촛불을 끄다 = 吹蜡烛',                        tier: 'core' },
    { id: 'd46-v1-e6', korean: '처음',       hangul: 'cheo-eum',      zh: '第一次',      pos: '名词', example: { ko: '이건 처음이야.',              zh: '这是第一次。' },           tip: 'Haru 那句藏着秘密 · Day 34 伏笔延续',                          tier: 'core' },
    { id: 'd46-v1-e7', korean: '켜다',       hangul: 'kyeo-da',       zh: '点亮 / 开',   pos: '动词', example: { ko: '초를 켰어요.',                 zh: '点了蜡烛。' },             tip: '켜다 → 켰어요 · 反义 끄다',                                     tier: 'ext' },
    { id: 'd46-v1-e8', korean: '매년',       hangul: 'mae-nyeon',     zh: '每年',        pos: '副词', example: { ko: '매년 생일을 챙겨줘요.',        zh: '每年为她过生日。' },       tip: '每(매) + 年(년) · 承诺句常用',                                  tier: 'ext' },
  ],

  recognize: [
    { id: 'd46-v1-r1', korean: '생일',      hangul: 'saeng-il',     choices: [{ zh: '生日',      correct: true }, { zh: '纪念日',    correct: false }, { zh: '假期',        correct: false }, { zh: '祭日',        correct: false }] },
    { id: 'd46-v1-r2', korean: '축하하다',  hangul: 'chuk-a-ha-da', choices: [{ zh: '祝贺',      correct: true }, { zh: '道歉',      correct: false }, { zh: '祝愿',        correct: false }, { zh: '欢迎',        correct: false }] },
    { id: 'd46-v1-r3', korean: '케이크',    hangul: 'ke-i-keu',     choices: [{ zh: '蛋糕',      correct: true }, { zh: '饼干',      correct: false }, { zh: '面包',        correct: false }, { zh: '巧克力',      correct: false }] },
    { id: 'd46-v1-r4', korean: '선물',      hangul: 'seon-mul',     choices: [{ zh: '礼物',      correct: true }, { zh: '祝福',      correct: false }, { zh: '祝辞',        correct: false }, { zh: '花束',        correct: false }] },
    { id: 'd46-v1-r5', korean: '촛불',      hangul: 'chot-bul',     choices: [{ zh: '蜡烛',      correct: true }, { zh: '火柴',      correct: false }, { zh: '灯泡',        correct: false }, { zh: '烟花',        correct: false }] },
    { id: 'd46-v1-r6', korean: '처음',      hangul: 'cheo-eum',     choices: [{ zh: '第一次',    correct: true }, { zh: '最后',      correct: false }, { zh: '中间',        correct: false }, { zh: '经常',        correct: false }] },
  ],

  spell: [
    { id: 'd46-v1-s1', zhHint: '生日',        answer: ['생', '일'], syllables: ['생', '일', '샘', '일'] },
    { id: 'd46-v1-s2', zhHint: '祝贺（축하）', answer: ['축', '하'], syllables: ['축', '하', '축', '하'] },
    { id: 'd46-v1-s3', zhHint: '礼物',        answer: ['선', '물'], syllables: ['선', '물', '섬', '물'] },
    { id: 'd46-v1-s4', zhHint: '第一次',      answer: ['처', '음'], syllables: ['처', '음', '체', '음'] },
  ],

  write: [
    { id: 'd46-v1-w1', korean: '생', hangul: 'saeng',      wordKorean: '생일',      wordZh: '生日' },
    { id: 'd46-v1-w2', korean: '일', hangul: 'il',         wordKorean: '생일',      wordZh: '生日' },
    { id: 'd46-v1-w3', korean: '축', hangul: 'chuk',       wordKorean: '축하하다',  wordZh: '祝贺' },
    { id: 'd46-v1-w4', korean: '하', hangul: 'ha',         wordKorean: '축하하다',  wordZh: '祝贺' },
    { id: 'd46-v1-w5', korean: '선', hangul: 'seon',       wordKorean: '선물',      wordZh: '礼物' },
    { id: 'd46-v1-w6', korean: '물', hangul: 'mul',        wordKorean: '선물',      wordZh: '礼物' },
    { id: 'd46-v1-w7', korean: '처', hangul: 'cheo',       wordKorean: '처음',      wordZh: '第一次' },
    { id: 'd46-v1-w8', korean: '음', hangul: 'eum',        wordKorean: '처음',      wordZh: '第一次' },
  ],

  dictation: [
    { id: 'd46-v1-d1', korean: '생일 축하해',    hangul: 'saeng-il chuk-a-hae',        syllables: ['생', '일', '축', '하', '해'],      zh: '生日快乐' },
    { id: 'd46-v1-d2', korean: '이건 처음이야',   hangul: 'i-geon cheo-eu-mi-ya',       syllables: ['이', '건', '처', '음', '이', '야'], zh: '这是第一次' },
    { id: 'd46-v1-d3', korean: '있어 줄게',       hangul: 'i-sseo jul-ge',              syllables: ['있', '어', '줄', '게'],             zh: '会陪你' },
  ],
};
