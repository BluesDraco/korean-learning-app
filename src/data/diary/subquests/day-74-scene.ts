import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 74 · 3-4 상황 속으로 · 부산 사투리 */
export const day74Scene: SceneSubQuestData = {
  day: 14, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '부산 골목 · 할머니 · 사투리 초체험',

  tasks: [
    { type: 'situation', id: 'd74-sc-s1', scenario: '想跟朋友说"每个地区都有方言"，哪句最合适？',                                                     choices: [{ ko: '지역마다 사투리가 있어요. 부산은 억양이 완전 달라요.',                zh: '每个地区都有方言。釜山语调完全不同。', correct: true }, { ko: '지역에 사투리가 있어요.',            zh: '错——助词误用。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: 'N + 마다' },
    { type: 'situation', id: 'd74-sc-s2', scenario: '奶奶用釜山话问路你只懂一半。你想说"只听懂了一半"，哪句最合适？',                                     choices: [{ ko: '죄송해요, 반쯤만 알아들었어요.',                                      zh: '不好意思，只听懂了一半。',              correct: true }, { ko: '다 알아들었어요.',                  zh: '错——语义反。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '반쯤 + 알아듣다' },
    { type: 'situation', id: 'd74-sc-s3', scenario: '想向 Junho 感叹"每个人发音都稍稍不同"，哪句最合适？',                                              choices: [{ ko: '사람마다 발음이 조금씩 달라요.',                                      zh: '每个人发音都稍稍不同。',              correct: true }, { ko: '사람이 발음이 조금씩 달라요.',      zh: '错——助词误用。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '사람마다 · 每人' },

    { type: 'dialogue', id: 'd74-sc-d1', lines: [{ speaker: '할머니',   ko: '이거 사가~ 마이 무봤나?',                zh: '(釜山方言) 买这个吧 · 尝过很多吗？' }], blankSpeaker: '토리', choices: [{ ko: '어… 죄송해요, 사투리는 반쯤만 알아들어요.',            correct: true, zh: '呃……不好意思，方言只听懂一半。' }, { ko: '싫어요, 안 살래요.',       correct: false, zh: '不要。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？（回避了方言）' }, { ko: '몰라요.',           correct: false, zh: '不知道。（生硬）' }], explain: '诚恳回应 · 반쯤' },
    { type: 'dialogue', id: 'd74-sc-d2', lines: [{ speaker: '준호',    ko: '방금 뭐라셨어?',                          zh: '刚才说什么？' }],   blankSpeaker: '토리', choices: [{ ko: '지역마다 사투리가 진짜 달라. 재밌기도 하고 어렵기도 해.',            correct: true, zh: '每个地区方言都不同。有趣也难。' }, { ko: '몰라, 그냥 왔어.',    correct: false, zh: '不知道。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }], explain: '반말 + N 마다' },
    { type: 'dialogue', id: 'd74-sc-d3', lines: [{ speaker: '하루',    ko: '너 사투리 흉내 낼 수 있어?',              zh: '你能模仿方言吗？' }], blankSpeaker: '토리', choices: [{ ko: '아직은 잘 못해. 근데 단어마다 조금씩 배우고 있어.',        correct: true, zh: '还不太行。不过每个词都在慢慢学。' }, { ko: '싫어, 저리 가.',      correct: false, zh: '走开。' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '단어마다 + 배우고 있다' },

    { type: 'context', id: 'd74-sc-c1', ko: '지역마다 사투리가 있어요.',   promptZh: '这句在场景中的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 74 主题句 · N + 마다 = 每 · 承认差异也接纳差异 · Tori 从"标准语崇拜"走向"多元语言观"的转折',       correct: true }, { zh: '没有方言',          correct: false }, { zh: '所有方言一样',       correct: false }, { zh: '首尔话最重要',                correct: false }], explain: '多元语言观 · Tori 成长' },
    { type: 'context', id: 'd74-sc-c2', ko: '반쯤은 알아들었어요.',        promptZh: '这句在方言场景的意义，哪句最准确？',                                                                     choices: [{ zh: '"听懂了一半" · Tori 的谦逊承认 · 60 天前的 Tori 只会说 "몰라요"，今天已经能量化理解程度',       correct: true }, { zh: '完全没懂',                correct: false }, { zh: '完全听懂',                  correct: false }, { zh: '拒绝听',                correct: false }], explain: 'Tori 韩语量表进化' },
  ],
};
