import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 73 · 3-2 귀 트이기 · ~자마자 · 자갈치 */
export const day73Listen: ListenSubQuestData = {
  day: 13, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '자갈치 시장 · 활낙지 초도전',

  meaning: [
    { id: 'd73-l2-m1', audioKo: '시장에 도착하자마자 회를 먹었어요.',                          choices: [{ text: '一到市场就吃了生鱼片。',                     correct: true }, { text: '到市场没吃生鱼片。',                    correct: false }, { text: '吃完生鱼片才到市场。',                    correct: false }, { text: '市场没有生鱼片。',                    correct: false }], explain: '~자마자 · 一……就……' },
    { id: 'd73-l2-m2', audioKo: '한 입 먹자마자 매워서 눈물이 났어요.',                          choices: [{ text: '一吃一口就辣得流泪。',                       correct: true }, { text: '不辣。',                              correct: false }, { text: '一吃就想再吃。',                        correct: false }, { text: '完全不流泪。',                        correct: false }], explain: '~자마자 + 매워서' },
    { id: 'd73-l2-m3', audioKo: '낙지가 아직 움직여요.',                                          choices: [{ text: '章鱼还在动。',                                correct: true }, { text: '章鱼死了。',                            correct: false }, { text: '章鱼跑了。',                              correct: false }, { text: '看不见章鱼。',                          correct: false }], explain: '활낙지 名场面' },
    { id: 'd73-l2-m4', audioKo: '삼키기 무서워서 뱉었어요.',                                    choices: [{ text: '不敢吞下就吐了。',                             correct: true }, { text: '一口吞下了。',                          correct: false }, { text: '没有害怕。',                              correct: false }, { text: '没有吃。',                            correct: false }], explain: '~기 무섭다 + 뱉다' },
    { id: 'd73-l2-m5', audioKo: '초장에 찍어 먹으면 조금 나아요.',                              choices: [{ text: '蘸醋辣椒酱吃会好一点。',                    correct: true }, { text: '不能蘸酱。',                            correct: false }, { text: '不好吃。',                                correct: false }, { text: '酱很甜。',                              correct: false }], explain: '~(으)면 + 나아요' },
  ],

  cloze: [
    { id: 'd73-l2-c1', audioKo: '시장에 도착하자마자 회를 먹었어요.',   clozeParts: ['시장에 ', ' 회를 먹었어요.'],       choices: [{ text: '도착하자마자',   correct: true }, { text: '도착하는자마자',    correct: false }, { text: '도착한자마자',    correct: false }, { text: '도착해서자마자', correct: false }], explain: 'V + 자마자 · 词干' },
    { id: 'd73-l2-c2', audioKo: '한 입 먹자마자 매워요.',              clozeParts: ['한 입 ', ' 매워요.'],              choices: [{ text: '먹자마자',   correct: true }, { text: '먹은자마자',      correct: false }, { text: '먹는자마자',    correct: false }, { text: '먹어서자마자', correct: false }], explain: '먹다 → 먹자마자' },
    { id: 'd73-l2-c3', audioKo: '낙지가 아직 움직여요.',                clozeParts: ['낙지가 ', ' 움직여요.'],           choices: [{ text: '아직',         correct: true }, { text: '이미',              correct: false }, { text: '벌써',              correct: false }, { text: '아까',        correct: false }], explain: '아직 = 还' },
    { id: 'd73-l2-c4', audioKo: '초장에 찍어 먹어요.',                  clozeParts: ['초장', ' 찍어 먹어요.'],           choices: [{ text: '에',          correct: true }, { text: '에서',              correct: false }, { text: '을',              correct: false }, { text: '으로',        correct: false }], explain: '~에 찍다 = 蘸' },
  ],

  reply: [
    { id: 'd73-l2-r1', audioKo: '자갈치 어때?',                                                 promptZh: 'Junho 问自갈치怎么样。你想说"一到市场就吃了生鱼片"，最自然的一句？',                    choices: [{ text: '시장에 도착하자마자 회를 먹었어. 진짜 신선해.',                          correct: true }, { text: '시장에 도착해서 안 먹었어.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '반말 + 자마자' },
    { id: 'd73-l2-r2', audioKo: '너 낙지 먹었어?',                                              promptZh: 'Haru 问你吃章鱼没。你想说"不敢吞下就吐了"，最自然的一句？',                            choices: [{ text: '삼키기 무서워서 뱉었어.',                                          correct: true }, { text: '한 입 다 삼켰어.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '~기 무섭다 + 뱉다' },
    { id: 'd73-l2-r3', audioKo: '너무 매울 때는 어떻게 해?',                                    promptZh: '有人问太辣时怎么办。你想说"蘸醋辣椒酱吃会好一点"，最自然的一句？',                       choices: [{ text: '초장에 찍어 먹으면 조금 나아.',                                          correct: true }, { text: '초장은 더 매워.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '~면 + 나아' },
  ],
};
