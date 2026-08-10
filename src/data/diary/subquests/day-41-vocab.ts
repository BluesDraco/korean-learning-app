import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 41 · 발표 준비 · 词汇子关卡 */
export const day41Vocab: VocabSubQuestData = {
  day: 11, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '发表准备的 8 个词', subtitleEn: '8 words for presentation prep',

  encounter: [
    { id: 'd41-v1-e1', korean: '발표',      hangul: 'bal-pyo',       zh: '发表 / 演讲', zhEn: 'Presentation / speech', pos: '名词', posEn: 'Noun',   example: { ko: '내일 발표가 있어요.',                zh: '明天有发表。', zhEn: 'I have a presentation tomorrow.' },       tip: '发(발) + 表(표) · 발표하다 = 做发表', tipEn: '发(발) + 表(표) · 발표하다 = to give a presentation',                          tier: 'core' },
    { id: 'd41-v1-e2', korean: '준비하다',  hangul: 'jun-bi-ha-da',  zh: '准备', zhEn: 'preparation',        pos: '动词', posEn: 'Verb',   example: { ko: '발표를 준비하고 있어요.',            zh: '正在准备发表。', zhEn: 'I\'m preparing for the presentation.' },     tip: '준비(准备) + 하다', tipEn: '준비 (prepare) + 하다',                                              tier: 'core' },
    { id: 'd41-v1-e3', korean: '소개하다',  hangul: 'so-gae-ha-da',  zh: '介绍', zhEn: 'introduce',        pos: '动词', posEn: 'Verb',   example: { ko: '우리나라를 소개해요.',                zh: '介绍我的国家。', zhEn: 'I\'ll introduce my country.' },     tip: '소개(介绍) + 하다 · 자기소개 = 自我介绍', tipEn: '소개 (introduce) + 하다 · 자기소개 = self-introduction',                        tier: 'core' },
    { id: 'd41-v1-e4', korean: '문화',      hangul: 'mun-hwa',       zh: '文化', zhEn: 'culture',        pos: '名词', posEn: 'Noun',   example: { ko: '중국 훠궈 문화를 발표해요.',         zh: '介绍中国火锅文化。', zhEn: 'Introduce Chinese hotpot culture.' }, tip: '文(문) + 化(화)', tipEn: 'Culture (문) + Culture (화)',                                              tier: 'core' },
    { id: 'd41-v1-e5', korean: '공통점',    hangul: 'gong-tong-jjeom', zh: '共同点', zhEn: 'Common point',      pos: '名词', posEn: 'Noun',   example: { ko: '훠궈와 KPOP의 공통점은 "함께"예요.', zh: '共同点是"一起"。', zhEn: 'The common point is "together."' },   tip: '공통(共同) + 점(点)', tipEn: 'Common + point',                                          tier: 'core' },
    { id: 'd41-v1-e6', korean: '주제',      hangul: 'ju-je',         zh: '主题', zhEn: 'Topic',        pos: '名词', posEn: 'Noun',   example: { ko: '오늘 발표 주제는 훠궈예요.',         zh: '主题是火锅。', zhEn: 'The theme is hotpot.' },       tip: '主(주) + 题(제) · 주제를 정하다 = 定主题', tipEn: '主(주) + 题(제) · 주제를 정하다 = to set a theme',                       tier: 'core' },
    { id: 'd41-v1-e7', korean: '자료',      hangul: 'ja-ryo',        zh: '资料', zhEn: 'Materials',        pos: '名词', posEn: 'Noun',   example: { ko: '자료를 모았어요.',                    zh: '收集了资料。', zhEn: 'Collected materials.' },       tip: '자료 모으다 = 收集 · 자료 찾다 = 查资料', tipEn: '자료 모으다 = to collect · 자료 찾다 = to look up materials',                        tier: 'ext' },
    { id: 'd41-v1-e8', korean: '함께',      hangul: 'ham-kke',       zh: '一起', zhEn: 'together',        pos: '副词', posEn: 'Adverb',   example: { ko: '함께 먹어요.',                        zh: '一起吃。', zhEn: 'Let\'s eat together.' },           tip: '和 같이 相近，稍书面 · 발표 关键词', tipEn: 'Similar to 같이, slightly formal · presentation keywords',                             tier: 'ext' },
  ],

  recognize: [
    { id: 'd41-v1-r1', korean: '발표',      hangul: 'bal-pyo',        choices: [{ zh: '发表', zhEn: 'Presentation',      correct: true }, { zh: '考试', zhEn: 'exam',      correct: false }, { zh: '写作', zhEn: 'Writing',    correct: false }, { zh: '讨论', zhEn: 'Discussion',    correct: false }] },
    { id: 'd41-v1-r2', korean: '준비하다',  hangul: 'jun-bi-ha-da',   choices: [{ zh: '准备', zhEn: 'preparation',      correct: true }, { zh: '结束', zhEn: 'End.',      correct: false }, { zh: '开始', zhEn: 'start',    correct: false }, { zh: '取消', zhEn: 'cancel',    correct: false }] },
    { id: 'd41-v1-r3', korean: '소개하다',  hangul: 'so-gae-ha-da',   choices: [{ zh: '介绍', zhEn: 'introduce',      correct: true }, { zh: '批评', zhEn: 'Criticism',      correct: false }, { zh: '拒绝', zhEn: 'Refuse',    correct: false }, { zh: '同意', zhEn: 'Agreement',    correct: false }] },
    { id: 'd41-v1-r4', korean: '문화',      hangul: 'mun-hwa',        choices: [{ zh: '文化', zhEn: 'culture',      correct: true }, { zh: '文明', zhEn: 'Civilization',      correct: false }, { zh: '语言', zhEn: 'language',    correct: false }, { zh: '历史', zhEn: 'History',    correct: false }] },
    { id: 'd41-v1-r5', korean: '공통점',    hangul: 'gong-tong-jjeom', choices: [{ zh: '共同点', zhEn: 'Common point',    correct: true }, { zh: '不同点', zhEn: 'Differences',    correct: false }, { zh: '重点', zhEn: 'Key point',    correct: false }, { zh: '缺点', zhEn: 'Weakness',    correct: false }] },
    { id: 'd41-v1-r6', korean: '주제',      hangul: 'ju-je',          choices: [{ zh: '主题', zhEn: 'Topic',      correct: true }, { zh: '题目', zhEn: 'Topic',      correct: false }, { zh: '结论', zhEn: 'Conclusion',    correct: false }, { zh: '目录', zhEn: 'Table of contents',    correct: false }] },
  ],

  spell: [
    { id: 'd41-v1-s1', zhHint: '发表', zhHintEn: 'Presentation',   answer: ['발', '표'], syllables: ['발', '표', '반', '포'] },
    { id: 'd41-v1-s2', zhHint: '主题', zhHintEn: 'Topic',   answer: ['주', '제'], syllables: ['주', '제', '주', '재'] },
    { id: 'd41-v1-s3', zhHint: '文化', zhHintEn: 'culture',   answer: ['문', '화'], syllables: ['문', '화', '문', '하'] },
    { id: 'd41-v1-s4', zhHint: '资料', zhHintEn: 'Materials',   answer: ['자', '료'], syllables: ['자', '료', '지', '료'] },
  ],

  write: [
    { id: 'd41-v1-w1', korean: '발', hangul: 'bal',        wordKorean: '발표',      wordZh: '发表', wordZhEn: 'Presentation' },
    { id: 'd41-v1-w2', korean: '표', hangul: 'pyo',        wordKorean: '발표',      wordZh: '发表', wordZhEn: 'Presentation' },
    { id: 'd41-v1-w3', korean: '준', hangul: 'jun',        wordKorean: '준비하다',  wordZh: '准备', wordZhEn: 'preparation' },
    { id: 'd41-v1-w4', korean: '비', hangul: 'bi',         wordKorean: '준비하다',  wordZh: '准备', wordZhEn: 'preparation' },
    { id: 'd41-v1-w5', korean: '문', hangul: 'mun',        wordKorean: '문화',      wordZh: '文化', wordZhEn: 'culture' },
    { id: 'd41-v1-w6', korean: '화', hangul: 'hwa',        wordKorean: '문화',      wordZh: '文化', wordZhEn: 'culture' },
    { id: 'd41-v1-w7', korean: '주', hangul: 'ju',         wordKorean: '주제',      wordZh: '主题', wordZhEn: 'Topic' },
    { id: 'd41-v1-w8', korean: '제', hangul: 'je',         wordKorean: '주제',      wordZh: '主题', wordZhEn: 'Topic' },
  ],

  dictation: [
    { id: 'd41-v1-d1', korean: '소개하기 위해서',    hangul: 'so-gae-ha-gi wi-hae-seo',   syllables: ['소', '개', '하', '기', '위', '해', '서'],   zh: '为了介绍', zhEn: 'To introduce' },
    { id: 'd41-v1-d2', korean: '자료를 찾아요',       hangul: 'ja-ryo-reul cha-ja-yo',     syllables: ['자', '료', '를', '찾', '아', '요'],           zh: '找资料', zhEn: 'Find materials' },
    { id: 'd41-v1-d3', korean: '함께의 맛',            hangul: 'ham-kke-ui mat',            syllables: ['함', '께', '의', '맛'],                       zh: '一起的味道', zhEn: 'The taste of togetherness' },
  ],
};
