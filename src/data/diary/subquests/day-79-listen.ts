import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 79 · 3-2 귀 트이기 · 회고+대조 · 제주 迷路 */
export const day79Listen: ListenSubQuestData = {
  day: 19, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '제주 돌담길 · Day 7과 다른 오늘',

  meaning: [
    { id: 'd79-l2-m1', audioKo: 'Day 7 때는 울었지만, 오늘은 물어봤어요.',                        choices: [{ text: 'Day 7时哭了，但今天问了路。',            correct: true }, { text: 'Day 7和今天都哭了。',              correct: false }, { text: '今天也哭了。',                      correct: false }, { text: '今天没问路。',                      correct: false }], explain: '~았/었지만 · 回顾对比' },
    { id: 'd79-l2-m2', audioKo: '휴대폰 신호가 없어요.',                                          choices: [{ text: '手机没信号。',                          correct: true }, { text: '手机没电了。',                      correct: false }, { text: '手机丢了。',                        correct: false }, { text: '手机响了。',                        correct: false }], explain: '신호가 없다' },
    { id: 'd79-l2-m3', audioKo: '신호가 있었으면 좋았을 텐데.',                                    choices: [{ text: '有信号就好了（可惜没有）。',              correct: true }, { text: '有信号很好。',                      correct: false }, { text: '信号会来的。',                      correct: false }, { text: '不需要信号。',                      correct: false }], explain: '~았으면 + 좋았을 텐데 · 反事实' },
    { id: 'd79-l2-m4', audioKo: '이제 길 잃어도 안 울어요.',                                        choices: [{ text: '现在即使迷路也不哭了。',                  correct: true }, { text: '现在迷路就哭。',                    correct: false }, { text: '再也不迷路了。',                    correct: false }, { text: '现在爱哭了。',                      correct: false }], explain: '~아/어도 + 안 울다' },
    { id: 'd79-l2-m5', audioKo: '토리, 진짜 컸다.',                                                choices: [{ text: '兔莉，真的长大了。',                      correct: true }, { text: '兔莉，还小。',                      correct: false }, { text: '兔莉，出去。',                      correct: false }, { text: '兔莉，等等。',                      correct: false }], explain: 'Junho 的话 · Day 76 后第二次' },
  ],

  cloze: [
    { id: 'd79-l2-c1', audioKo: 'Day 7 때는 울었지만, 오늘은 물어봤어요.',   clozeParts: ['Day 7 때는 ', ', 오늘은 물어봤어요.'],   choices: [{ text: '울었지만', correct: true }, { text: '울지만',    correct: false }, { text: '울어서',    correct: false }, { text: '울더라면', correct: false }], explain: '回顾对比 ~았지만' },
    { id: 'd79-l2-c2', audioKo: '그때 물어봤더라면 안 헤맸을 텐데.',           clozeParts: ['그때 물어봤더라면 안 ', '.'],   choices: [{ text: '헤맸을 텐데', correct: true }, { text: '헤매요',  correct: false }, { text: '헤맬 거예요',    correct: false }, { text: '헤매겠어요', correct: false }], explain: '反事实 ~았을 텐데' },
    { id: 'd79-l2-c3', audioKo: '신호가 있었으면 좋았을 텐데.',      clozeParts: ['신호가 ', ' 좋았을 텐데.'], choices: [{ text: '있었으면',     correct: true }, { text: '있으면',      correct: false }, { text: '있어서',      correct: false }, { text: '있겠으면',      correct: false }], explain: '反事实条件 ~았으면' },
    { id: 'd79-l2-c4', audioKo: '이제 길 잃어도 안 울어요.',          clozeParts: ['이제 길 ', ' 안 울어요.'],             choices: [{ text: '잃어도', correct: true }, { text: '잃어서', correct: false }, { text: '잃으면', correct: false }, { text: '잃지만', correct: false }], explain: '让步 ~아/어도' },
  ],

  reply: [
    { id: 'd79-l2-r1', audioKo: '토리, 전화 왜 안 받아? 걱정했잖아.',                                          promptZh: 'Haru 担心地问你为什么不接电话。你想说"没信号，但问了奶奶自己走到了"，最自然的一句？',                choices: [{ text: '신호가 없었어. 근데 할머니한테 물어봐서 잘 찾아왔어.',                                          correct: true }, { text: '전화 받기 싫었어.',                                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '신호가 없다 + 물어보다 · 让 Haru 放心' },
    { id: 'd79-l2-r2', audioKo: '길 잃었을 때 안 무서웠어?',                                    promptZh: '朋友问你迷路时怕不怕。你想说"Day 7时哭了，但今天问了路"，最自然的一句？',                    choices: [{ text: 'Day 7 때는 울었지만, 오늘은 물어봤어.',                                          correct: true }, { text: '오늘도 울었어.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '~았지만 · 回顾成长' },
    { id: 'd79-l2-r3', audioKo: '이제 혼자서도 잘 다니네.',                                        promptZh: 'Junho 说你现在一个人也能到处走了。你想说"嗯，现在即使迷路也不哭了"，最自然的一句？',                        choices: [{ text: '응, 이제 길 잃어도 안 울어.',                                  correct: true }, { text: '아니, 아직도 매일 울어.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '~아/어도 + 안 울다' },
  ],
};
