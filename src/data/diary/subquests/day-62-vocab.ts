import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 62 · 3-1 단어 마스터 · 곰다방 面试 · 诚实是能力 */
export const day62Vocab: VocabSubQuestData = {
  day: 2, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '곰다방 面试的 8 个词',

  encounter: [
    { id: 'd62-v1-e1', korean: '알바',       hangul: 'al-ba',         zh: '兼职 / 打工', pos: '名词', example: { ko: '카페에서 알바해요.',              zh: '在咖啡馆打工。' },       tip: '아르바이트（外来语 Arbeit）의 缩略 · 알바생 = 兼职生',                       tier: 'core' },
    { id: 'd62-v1-e2', korean: '카페',       hangul: 'ka-pe',         zh: '咖啡馆',    pos: '名词', example: { ko: '학교 옆 카페예요.',              zh: '学校旁边的咖啡馆。' },   tip: '外来语 café · 다방 = 传统茶馆（곰다방 = 熊咖啡馆）',                            tier: 'core' },
    { id: 'd62-v1-e3', korean: '면접',       hangul: 'myeon-jeop',    zh: '面试',      pos: '名词', example: { ko: '오늘 면접 봤어요.',              zh: '今天面试了。' },         tip: '面(면) + 接(접) · 면접 보다 = 参加面试（不是 하다）',                          tier: 'core' },
    { id: 'd62-v1-e4', korean: '이력서',    hangul: 'i-lyeok-seo',   zh: '简历',      pos: '名词', example: { ko: '이력서를 냈어요.',                zh: '交了简历。' },           tip: '履(이) + 历(력) + 书(서) · 이력서 내다 = 交简历',                              tier: 'core' },
    { id: 'd62-v1-e5', korean: '솔직하다',  hangul: 'sol-jik-ha-da', zh: '诚实 / 坦率', pos: '形容词', example: { ko: '솔직하게 말했어요.',              zh: '坦率地说了。' },        tip: 'Day 62 主角词 · 솔직히（副词）= 说真的',                                        tier: 'core' },
    { id: 'd62-v1-e6', korean: '뽑다',       hangul: 'ppop-da',       zh: '选 / 录取',  pos: '动词', example: { ko: '정직한 사람 뽑아요.',             zh: '招诚实的人。' },         tip: 'Day 62 店长台词 · 알바생 뽑다 = 招兼职',                                       tier: 'core' },
    { id: 'd62-v1-e7', korean: '완벽하다',  hangul: 'wan-byeok-ha-da', zh: '完美',    pos: '形容词', example: { ko: '완벽한 사람은 없어요.',            zh: '没有完美的人。' },      tip: '完(완) + 璧(벽) + 하다 · 반의어 = 부족하다',                                   tier: 'ext' },
    { id: 'd62-v1-e8', korean: '정직',       hangul: 'jeong-jik',      zh: '正直 / 诚实', pos: '名词', example: { ko: '정직으로 뽑혔어요.',             zh: '因为正直被录取了。' },  tip: '正(정) + 直(직) · 솔직하다 是形容词，정직 是名词',                             tier: 'ext' },
  ],

  recognize: [
    { id: 'd62-v1-r1', korean: '알바',       hangul: 'al-ba',          choices: [{ zh: '兼职',        correct: true }, { zh: '全职',        correct: false }, { zh: '实习',        correct: false }, { zh: '志愿',        correct: false }] },
    { id: 'd62-v1-r2', korean: '카페',       hangul: 'ka-pe',          choices: [{ zh: '咖啡馆',      correct: true }, { zh: '餐厅',        correct: false }, { zh: '便利店',      correct: false }, { zh: '书店',        correct: false }] },
    { id: 'd62-v1-r3', korean: '면접',       hangul: 'myeon-jeop',     choices: [{ zh: '面试',        correct: true }, { zh: '考试',        correct: false }, { zh: '面谈',        correct: false }, { zh: '接待',        correct: false }] },
    { id: 'd62-v1-r4', korean: '이력서',    hangul: 'i-lyeok-seo',    choices: [{ zh: '简历',        correct: true }, { zh: '合同',        correct: false }, { zh: '证书',        correct: false }, { zh: '推荐信',      correct: false }] },
    { id: 'd62-v1-r5', korean: '솔직하다',  hangul: 'sol-jik-ha-da',  choices: [{ zh: '诚实 / 坦率', correct: true }, { zh: '狡猾',        correct: false }, { zh: '内向',        correct: false }, { zh: '开朗',        correct: false }] },
    { id: 'd62-v1-r6', korean: '뽑다',       hangul: 'ppop-da',        choices: [{ zh: '选 / 录取',    correct: true }, { zh: '辞退',        correct: false }, { zh: '面试',        correct: false }, { zh: '推荐',        correct: false }] },
  ],

  spell: [
    { id: 'd62-v1-s1', zhHint: '兼职',      answer: ['알', '바'], syllables: ['알', '바', '앙', '파'] },
    { id: 'd62-v1-s2', zhHint: '面试',      answer: ['면', '접'], syllables: ['면', '접', '민', '접'] },
    { id: 'd62-v1-s3', zhHint: '简历',      answer: ['이', '력', '서'], syllables: ['이', '력', '서', '역'] },
    { id: 'd62-v1-s4', zhHint: '正直',      answer: ['정', '직'], syllables: ['정', '직', '중', '식'] },
  ],

  write: [
    { id: 'd62-v1-w1', korean: '알', hangul: 'al',           wordKorean: '알바',       wordZh: '兼职' },
    { id: 'd62-v1-w2', korean: '바', hangul: 'ba',           wordKorean: '알바',       wordZh: '兼职' },
    { id: 'd62-v1-w3', korean: '면', hangul: 'myeon',        wordKorean: '면접',       wordZh: '面试' },
    { id: 'd62-v1-w4', korean: '접', hangul: 'jeop',         wordKorean: '면접',       wordZh: '面试' },
    { id: 'd62-v1-w5', korean: '이', hangul: 'i',            wordKorean: '이력서',     wordZh: '简历' },
    { id: 'd62-v1-w6', korean: '력', hangul: 'lyeok',        wordKorean: '이력서',     wordZh: '简历' },
    { id: 'd62-v1-w7', korean: '솔', hangul: 'sol',          wordKorean: '솔직하다',   wordZh: '诚实' },
    { id: 'd62-v1-w8', korean: '뽑', hangul: 'ppop',         wordKorean: '뽑다',       wordZh: '录取' },
  ],

  dictation: [
    { id: 'd62-v1-d1', korean: '면접 보러 왔어요',            hangul: 'myeon-jeop bo-reo wa-sseo-yo',    syllables: ['면', '접', '보', '러', '왔', '어', '요'],        zh: '来面试了' },
    { id: 'd62-v1-d2', korean: '이력서를 냈어요',              hangul: 'i-lyeok-seo-reul nae-sseo-yo',   syllables: ['이', '력', '서', '를', '냈', '어', '요'],        zh: '交了简历' },
    { id: 'd62-v1-d3', korean: '솔직하게 말했어요',            hangul: 'sol-jik-ha-ge mal-hae-sseo-yo',  syllables: ['솔', '직', '하', '게', '말', '했', '어', '요'], zh: '坦率地说了' },
  ],
};
