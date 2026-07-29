import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 87 · 3-2 귀 트이기 · ~(으)면서 · 妈妈来接机 */
export const day87Listen: ListenSubQuestData = {
  day: 27, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '인천 공항 · 웃으면서 · 창밖을 보면서',

  meaning: [
    { id: 'd87-l2-m1', audioKo: '엄마가 웃으면서 안았어요.',                                       choices: [{ text: '妈妈笑着抱了我。',                  correct: true }, { text: '妈妈哭着走了。',                      correct: false }, { text: '妈妈没抱我。',                        correct: false }, { text: '妈妈生气了。',                        correct: false }], explain: '웃 + 으면서 · 同时动作' },
    { id: 'd87-l2-m2', audioKo: '창밖을 보면서 설명했어요.',                                       choices: [{ text: '一边看窗外一边解释。',              correct: true }, { text: '没看窗外。',                          correct: false }, { text: '解释完才看。',                        correct: false }, { text: '看完就走了。',                        correct: false }], explain: '보 + 면서 · 一边…一边' },
    { id: 'd87-l2-m3', audioKo: '엄마는 한국어를 모르면서도 웃었어요.',                            choices: [{ text: '妈妈不懂韩语却笑了。',              correct: true }, { text: '妈妈懂韩语所以笑了。',                correct: false }, { text: '妈妈没笑。',                          correct: false }, { text: '妈妈会说韩语。',                      correct: false }], explain: '~(으)면서도 · 明知却' },
    { id: 'd87-l2-m4', audioKo: '엄마 마중을 나갔어요.',                                           choices: [{ text: '去接妈妈了。',                      correct: true }, { text: '去送妈妈了。',                        correct: false }, { text: '在家等妈妈。',                        correct: false }, { text: '和妈妈吵架了。',                      correct: false }], explain: '마중 · 迎接' },
    { id: 'd87-l2-m5', audioKo: '엄마가 제 한국어의 청중이에요.',                                 choices: [{ text: '妈妈是我韩语的听众。',              correct: true }, { text: '妈妈是我的老师。',                    correct: false }, { text: '妈妈听不懂。',                        correct: false }, { text: '妈妈会韩语。',                        correct: false }], explain: '청중 · 听众' },
  ],

  cloze: [
    { id: 'd87-l2-c1', audioKo: '엄마가 웃으면서 안았어요.',   clozeParts: ['엄마가 웃', ' 안았어요.'],           choices: [{ text: '으면서',    correct: true }, { text: '면서',      correct: false }, { text: '으니까',    correct: false }, { text: '어서',      correct: false }], explain: '有收音 · 웃으면서' },
    { id: 'd87-l2-c2', audioKo: '창밖을 보면서 설명했어요.',   clozeParts: ['창밖을 보', ' 설명했어요.'],         choices: [{ text: '면서',      correct: true }, { text: '으면서',    correct: false }, { text: '아서',      correct: false }, { text: '니까',      correct: false }], explain: '无收音 · 보면서' },
    { id: 'd87-l2-c3', audioKo: '엄마는 한국어를 모르면서도 웃었어요.', clozeParts: ['엄마는 한국어를 모르', ' 웃었어요.'], choices: [{ text: '면서도',    correct: true }, { text: '면서',      correct: false }, { text: '니까',      correct: false }, { text: '어서',      correct: false }], explain: '矛盾 · 모르면서도' },
    { id: 'd87-l2-c4', audioKo: '엄마를 맞이했어요.',          clozeParts: ['엄마를 ', '.'],                     choices: [{ text: '맞이했어요',  correct: true }, { text: '맞이해요',  correct: false }, { text: '맞이할래요', correct: false }, { text: '맞이하겠어요', correct: false }], explain: '맞이하다 · 过去' },
  ],

  reply: [
    { id: 'd87-l2-r1', audioKo: '우리 딸! 살 좀 붙었네.',                                             promptZh: '妈妈出关看到你说长肉了。你想笑着回"因为好好吃饭嘛"，最自然的一句？',                choices: [{ text: '밥 잘 먹으니까요. 엄마, 오래 기다렸어요.',                                  correct: true }, { text: '몰라요.',                                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어요.',                                  correct: false }], explain: '~니까 · 원인' },
    { id: 'd87-l2-r2', audioKo: '여기가 어디야?',                                                 promptZh: '坐地铁时妈妈问这是哪。你想一边看窗外一边给她讲解，最自然的一句？',                    choices: [{ text: '엄마, 여기가 인천이에요. 창밖 보면서 얘기해 줄게요.',                        correct: true }, { text: '몰라요.',                                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어요.',                                  correct: false }], explain: '보면서 · 边看边讲' },
    { id: 'd87-l2-r3', audioKo: '엄마 한국말 하나도 못 알아듣는데 괜찮아?',                        promptZh: '妈妈说她一句韩语都听不懂、问你没关系吗。你想说"没关系，你就是我最珍贵的听众"，最自然的一句？',              choices: [{ text: '괜찮아요. 엄마가 제 한국어의 가장 소중한 청중이에요.',                       correct: true }, { text: '그럼 한국어 안 할래요.',                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '청중 · 灵魂回应' },
  ],
};
