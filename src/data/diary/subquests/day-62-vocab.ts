import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 62 · 3-1 단어 마스터 · 곰다방 面试 · 诚实是能力 */
export const day62Vocab: VocabSubQuestData = {
  day: 2, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '곰다방 面试的 8 个词', subtitleEn: '8 Words from the 곰다방 Interview',

  encounter: [
    { id: 'd62-v1-e1', korean: '알바',       hangul: 'al-ba',         zh: '兼职 / 打工', zhEn: 'Part-time job', pos: '名词', posEn: 'Noun', example: { ko: '카페에서 알바해요.',              zh: '在咖啡馆打工。', zhEn: 'Working part-time at a café.' },       tip: '아르바이트（外来语 Arbeit）의 缩略 · 알바생 = 兼职生', tipEn: 'Short for 아르바이트 (loanword from Arbeit) · 알바생 = part-timer',                       tier: 'core' },
    { id: 'd62-v1-e2', korean: '카페',       hangul: 'ka-pe',         zh: '咖啡馆', zhEn: 'cafe',    pos: '名词', posEn: 'Noun', example: { ko: '학교 옆 카페예요.',              zh: '学校旁边的咖啡馆。', zhEn: 'A café next to the school.' },   tip: '外来语 café · 다방 = 传统茶馆（곰다방 = 熊咖啡馆）', tipEn: 'Loanword café · 다방 = traditional teahouse (곰다방 = Bear Café)',                            tier: 'core' },
    { id: 'd62-v1-e3', korean: '면접',       hangul: 'myeon-jeop',    zh: '面试', zhEn: 'interview',      pos: '名词', posEn: 'Noun', example: { ko: '오늘 면접 봤어요.',              zh: '今天面试了。', zhEn: 'Had an interview today.' },         tip: '面(면) + 接(접) · 면접 보다 = 参加面试（不是 하다）', tipEn: '面(면) + 接(접) · 면접 보다 = to have an interview (not 하다)',                          tier: 'core' },
    { id: 'd62-v1-e4', korean: '이력서',    hangul: 'i-lyeok-seo',   zh: '简历', zhEn: 'resume',      pos: '名词', posEn: 'Noun', example: { ko: '이력서를 냈어요.',                zh: '交了简历。', zhEn: 'Submitted my resume.' },           tip: '履(이) + 历(력) + 书(서) · 이력서 내다 = 交简历', tipEn: '履(이) + 历(력) + 书(서) · 이력서 내다 = to submit a resume',                              tier: 'core' },
    { id: 'd62-v1-e5', korean: '솔직하다',  hangul: 'sol-jik-ha-da', zh: '诚实 / 坦率', zhEn: 'Honest / Frank', pos: '形容词', posEn: 'Adjective.', example: { ko: '솔직하게 말했어요.',              zh: '坦率地说了。', zhEn: 'Spoke frankly.' },        tip: 'Day 62 主角词 · 솔직히（副词）= 说真的', tipEn: 'Day 62 key word · 솔직히 (adverb) = honestly',                                        tier: 'core' },
    { id: 'd62-v1-e6', korean: '뽑다',       hangul: 'ppop-da',       zh: '选 / 录取', zhEn: 'Select / Hire',  pos: '动词', posEn: 'Verb', example: { ko: '정직한 사람 뽑아요.',             zh: '招诚实的人。', zhEn: 'Hire honest people.' },         tip: 'Day 62 店长台词 · 알바생 뽑다 = 招兼职', tipEn: 'Day 62 manager\'s line · 알바생 뽑다 = to hire part-timers',                                       tier: 'core' },
    { id: 'd62-v1-e7', korean: '완벽하다',  hangul: 'wan-byeok-ha-da', zh: '完美', zhEn: 'Perfect',    pos: '形容词', posEn: 'Adjective.', example: { ko: '완벽한 사람은 없어요.',            zh: '没有完美的人。', zhEn: 'There\'s no perfect person.' },      tip: '完(완) + 璧(벽) + 하다 · 반의어 = 부족하다', tipEn: '完(완) + 璧(벽) + 하다 · antonym = 부족하다',                                   tier: 'ext' },
    { id: 'd62-v1-e8', korean: '정직',       hangul: 'jeong-jik',      zh: '正直 / 诚实', zhEn: 'Honest / Integrity', pos: '名词', posEn: 'Noun', example: { ko: '정직으로 뽑혔어요.',             zh: '因为正直被录取了。', zhEn: 'I got accepted because I\'m honest.' },  tip: '正(정) + 直(직) · 솔직하다 是形容词，정직 是名词', tipEn: '正(정) + 直(직) · 솔직하다 is an adjective, 정직 is a noun',                             tier: 'ext' },
  ],

  recognize: [
    { id: 'd62-v1-r1', korean: '알바',       hangul: 'al-ba',          choices: [{ zh: '兼职', zhEn: 'part-time job',        correct: true }, { zh: '全职', zhEn: 'Full-time',        correct: false }, { zh: '实习', zhEn: 'Internship',        correct: false }, { zh: '志愿', zhEn: 'Volunteer',        correct: false }] },
    { id: 'd62-v1-r2', korean: '카페',       hangul: 'ka-pe',          choices: [{ zh: '咖啡馆', zhEn: 'cafe',      correct: true }, { zh: '餐厅', zhEn: 'Restaurant',        correct: false }, { zh: '便利店', zhEn: 'Convenience store',      correct: false }, { zh: '书店', zhEn: 'Bookstore',        correct: false }] },
    { id: 'd62-v1-r3', korean: '면접',       hangul: 'myeon-jeop',     choices: [{ zh: '面试', zhEn: 'interview',        correct: true }, { zh: '考试', zhEn: 'exam',        correct: false }, { zh: '面谈', zhEn: 'Interview',        correct: false }, { zh: '接待', zhEn: 'Reception',        correct: false }] },
    { id: 'd62-v1-r4', korean: '이력서',    hangul: 'i-lyeok-seo',    choices: [{ zh: '简历', zhEn: 'resume',        correct: true }, { zh: '合同', zhEn: 'contract',        correct: false }, { zh: '证书', zhEn: 'Certificate',        correct: false }, { zh: '推荐信', zhEn: 'Recommendation letter',      correct: false }] },
    { id: 'd62-v1-r5', korean: '솔직하다',  hangul: 'sol-jik-ha-da',  choices: [{ zh: '诚实 / 坦率', zhEn: 'Honest / Frank', correct: true }, { zh: '狡猾', zhEn: 'Sly',        correct: false }, { zh: '内向', zhEn: 'Introverted',        correct: false }, { zh: '开朗', zhEn: 'Cheerful',        correct: false }] },
    { id: 'd62-v1-r6', korean: '뽑다',       hangul: 'ppop-da',        choices: [{ zh: '选 / 录取', zhEn: 'Select / Hire',    correct: true }, { zh: '辞退', zhEn: 'Dismissal',        correct: false }, { zh: '面试', zhEn: 'interview',        correct: false }, { zh: '推荐', zhEn: 'Recommendation',        correct: false }] },
  ],

  spell: [
    { id: 'd62-v1-s1', zhHint: '兼职', zhHintEn: 'part-time job',      answer: ['알', '바'], syllables: ['알', '바', '앙', '파'] },
    { id: 'd62-v1-s2', zhHint: '面试', zhHintEn: 'interview',      answer: ['면', '접'], syllables: ['면', '접', '민', '접'] },
    { id: 'd62-v1-s3', zhHint: '简历', zhHintEn: 'resume',      answer: ['이', '력', '서'], syllables: ['이', '력', '서', '역'] },
    { id: 'd62-v1-s4', zhHint: '正直', zhHintEn: 'Honesty',      answer: ['정', '직'], syllables: ['정', '직', '중', '식'] },
  ],

  write: [
    { id: 'd62-v1-w1', korean: '알', hangul: 'al',           wordKorean: '알바',       wordZh: '兼职', wordZhEn: 'part-time job' },
    { id: 'd62-v1-w2', korean: '바', hangul: 'ba',           wordKorean: '알바',       wordZh: '兼职', wordZhEn: 'part-time job' },
    { id: 'd62-v1-w3', korean: '면', hangul: 'myeon',        wordKorean: '면접',       wordZh: '面试', wordZhEn: 'interview' },
    { id: 'd62-v1-w4', korean: '접', hangul: 'jeop',         wordKorean: '면접',       wordZh: '面试', wordZhEn: 'interview' },
    { id: 'd62-v1-w5', korean: '이', hangul: 'i',            wordKorean: '이력서',     wordZh: '简历', wordZhEn: 'resume' },
    { id: 'd62-v1-w6', korean: '력', hangul: 'lyeok',        wordKorean: '이력서',     wordZh: '简历', wordZhEn: 'resume' },
    { id: 'd62-v1-w7', korean: '솔', hangul: 'sol',          wordKorean: '솔직하다',   wordZh: '诚实', wordZhEn: 'Honesty' },
    { id: 'd62-v1-w8', korean: '뽑', hangul: 'ppop',         wordKorean: '뽑다',       wordZh: '录取', wordZhEn: 'Acceptance' },
  ],

  dictation: [
    { id: 'd62-v1-d1', korean: '면접 보러 왔어요',            hangul: 'myeon-jeop bo-reo wa-sseo-yo',    syllables: ['면', '접', '보', '러', '왔', '어', '요'],        zh: '来面试了', zhEn: 'Came for an interview' },
    { id: 'd62-v1-d2', korean: '이력서를 냈어요',              hangul: 'i-lyeok-seo-reul nae-sseo-yo',   syllables: ['이', '력', '서', '를', '냈', '어', '요'],        zh: '交了简历', zhEn: 'Submitted a resume' },
    { id: 'd62-v1-d3', korean: '솔직하게 말했어요',            hangul: 'sol-jik-ha-ge mal-hae-sseo-yo',  syllables: ['솔', '직', '하', '게', '말', '했', '어', '요'], zh: '坦率地说了', zhEn: 'Spoke frankly' },
  ],
};
