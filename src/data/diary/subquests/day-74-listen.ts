import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 74 · 3-2 귀 트이기 · N + 마다 · 부산 사투리 */
export const day74Listen: ListenSubQuestData = {
  day: 14, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '부산 · 지역마다 사투리 다르다',

  meaning: [
    { id: 'd74-l2-m1', audioKo: '지역마다 사투리가 있어요.',                                    choices: [{ text: '每个地区都有方言。',                          correct: true }, { text: '没有方言。',                            correct: false }, { text: '只有一种方言。',                        correct: false }, { text: '方言消失了。',                          correct: false }], explain: 'N + 마다 · 每' },
    { id: 'd74-l2-m2', audioKo: '부산 사투리는 억양이 달라요.',                                  choices: [{ text: '釜山方言语调不同。',                          correct: true }, { text: '釜山方言和首尔一样。',                  correct: false }, { text: '不知道釜山方言。',                      correct: false }, { text: '釜山没有方言。',                        correct: false }], explain: '억양이 다르다' },
    { id: 'd74-l2-m3', audioKo: '사람마다 발음이 조금씩 달라요.',                                choices: [{ text: '每个人发音都稍稍不同。',                    correct: true }, { text: '所有人发音相同。',                      correct: false }, { text: '没人会发音。',                          correct: false }, { text: '发音只学过一次。',                      correct: false }], explain: 'N + 마다 · 每人' },
    { id: 'd74-l2-m4', audioKo: '단어마다 뜻이 다를 수 있어요.',                                  choices: [{ text: '每个词意思可能都不同。',                    correct: true }, { text: '意思都一样。',                          correct: false }, { text: '词没有意思。',                            correct: false }, { text: '只学过一个词。',                        correct: false }], explain: 'N + 마다 · 每词' },
    { id: 'd74-l2-m5', audioKo: '반쯤은 알아들었어요.',                                            choices: [{ text: '听懂了一半。',                                correct: true }, { text: '完全听懂了。',                          correct: false }, { text: '完全没听懂。',                          correct: false }, { text: '不用听懂。',                            correct: false }], explain: '반쯤 = 一半' },
  ],

  cloze: [
    { id: 'd74-l2-c1', audioKo: '지역마다 사투리가 있어요.',           clozeParts: ['지역', ' 사투리가 있어요.'],         choices: [{ text: '마다',   correct: true }, { text: '동안',    correct: false }, { text: '만',      correct: false }, { text: '에서', correct: false }], explain: 'N + 마다 · 每' },
    { id: 'd74-l2-c2', audioKo: '사람마다 발음이 달라요.',              clozeParts: ['사람', ' 발음이 달라요.'],           choices: [{ text: '마다',   correct: true }, { text: '만',      correct: false }, { text: '동안',    correct: false }, { text: '에',   correct: false }], explain: '사람마다' },
    { id: 'd74-l2-c3', audioKo: '단어마다 뜻이 달라요.',                clozeParts: ['단어', ' 뜻이 달라요.'],             choices: [{ text: '마다',   correct: true }, { text: '동안',    correct: false }, { text: '만',      correct: false }, { text: '으로', correct: false }], explain: '단어마다' },
    { id: 'd74-l2-c4', audioKo: '억양이 진짜 달라요.',                   clozeParts: ['억양이 진짜 ', '.'],                choices: [{ text: '달라요', correct: true }, { text: '다라요',  correct: false }, { text: '다른요',  correct: false }, { text: '다르요', correct: false }], explain: '다르다 르 不规则 → 달라요' },
  ],

  reply: [
    { id: 'd74-l2-r1', audioKo: '부산 사투리 어때?',                                            promptZh: 'Junho 问釜山方言如何。你想说"每个地区都有方言，语调不同"，最自然的一句？',                choices: [{ text: '지역마다 사투리가 있어. 억양이 진짜 달라.',                                  correct: true }, { text: '사투리 몰라.',                          correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어.',                                  correct: false }], explain: 'N + 마다 + 달라' },
    { id: 'd74-l2-r2', audioKo: '다 알아들었어?',                                              promptZh: '朋友问你都听懂了吗。你想说"只听懂了一半"，最自然的一句？',                                choices: [{ text: '반쯤은 알아들었어. 진짜 어렵다.',                                          correct: true }, { text: '다 알아들었어.',                         correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '반쯤 + 어렵다' },
    { id: 'd74-l2-r3', audioKo: '왜 이렇게 달라?',                                              promptZh: '有人问为什么这么不同。你想说"每个词意思可能都不同"，最自然的一句？',                    choices: [{ text: '단어마다 뜻이 다를 수 있어.',                                              correct: true }, { text: '단어는 다 똑같아.',                     correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '단어마다 + ~ㄹ 수 있다' },
  ],
};
