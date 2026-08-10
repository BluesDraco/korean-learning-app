import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 58 · 2-2 귀 트이기 · ~아/어 보니까 尝试后发现 */
export const day58Listen: ListenSubQuestData = {
  day: 28, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '重走 Day 1 的路 · 每一步都是回忆',

  meaning: [
    { id: 'd58-l2-m1', audioKo: '다시 걸어보니까 알겠어요.',              choices: [{ text: '重新走了才明白。',              correct: true }, { text: '再走一遍不知道。',                    correct: false }, { text: '要重新学走路。',                        correct: false }, { text: '走不到了。',                            correct: false }], explain: 'Tori 顿悟 · ~아/어 보니까' },
    { id: 'd58-l2-m2', audioKo: '같은 길인데 다른 느낌이에요.',           choices: [{ text: '同一条路，不同的感觉。',        correct: true }, { text: '不同的路，同一种感觉。',                correct: false }, { text: '两条路都难。',                          correct: false }, { text: '这条路不认识。',                          correct: false }], explain: '~는데 铺垫 · Tori 感慨' },
    { id: 'd58-l2-m3', audioKo: '많이 컸네, 토리 학생.',                  choices: [{ text: '长大很多啊，兔莉。',              correct: true }, { text: '你怎么变小了？',                        correct: false }, { text: '还是那样。',                          correct: false }, { text: '你没长大。',                          correct: false }], explain: '浣熊阿姨 · ~네 感叹' },
    { id: 'd58-l2-m4', audioKo: '기억하러 왔어요.',                       choices: [{ text: '来回忆的。',                    correct: true }, { text: '来学习的。',                            correct: false }, { text: '来找人的。',                          correct: false }, { text: '来还东西的。',                          correct: false }], explain: '~러 오다 = 为～来 · 目的' },
    { id: 'd58-l2-m5', audioKo: 'Day 1의 나한테 "괜찮아, 도착해"라고 말하고 싶어요.', choices: [{ text: '想对 Day 1 的自己说"没事，会到的"。', correct: true }, { text: 'Day 1 的我要出发。',                     correct: false }, { text: '想对未来的自己说话。',                    correct: false }, { text: '不用担心到达。',                          correct: false }], explain: 'Tori 直接引用 · ~라고 하다' },
  ],

  cloze: [
    { id: 'd58-l2-c1', audioKo: '다시 걸어보니까 알겠어요.',       clozeParts: ['다시 걸어', ' 알겠어요.'],           choices: [{ text: '보니까', correct: true }, { text: '으니까', correct: false }, { text: '면',   correct: false }, { text: '어서', correct: false }], explain: '~아/어 **보니까** = 尝试后发现' },
    { id: 'd58-l2-c2', audioKo: '먹어 보니까 진짜 매웠어요.',       clozeParts: ['먹어 ', ' 진짜 매웠어요.'],           choices: [{ text: '보니까', correct: true }, { text: '있으니까', correct: false }, { text: '보면',   correct: false }, { text: '봤어서', correct: false }], explain: '尝试后发现 · ~아/어 보니까' },
    { id: 'd58-l2-c3', audioKo: '와보니까 여기가 진짜 예쁘네요.',   clozeParts: ['', ' 여기가 진짜 예쁘네요.'],       choices: [{ text: '와보니까', correct: true }, { text: '오니까', correct: false }, { text: '오면',   correct: false }, { text: '왔어서', correct: false }], explain: '오다 → 와 · ~아/어 보니까' },
    { id: 'd58-l2-c4', audioKo: '기억하러 왔어요.',                  clozeParts: ['기억하', ' 왔어요.'],                choices: [{ text: '러',   correct: true }, { text: '고',       correct: false }, { text: '면',       correct: false }, { text: '어서',     correct: false }], explain: '~(으)러 오다 = 为～来（目的）' },
  ],

  reply: [
    { id: 'd58-l2-r1', audioKo: '아, 토리 학생! 오늘 뭐 하는 날?',              promptZh: '浣熊阿姨问你今天做什么。你想说"来回忆的"，最自然的一句？',              choices: [{ text: '기억하러 왔어요.',                                    correct: true }, { text: '없어요.',                              correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                  correct: false }], explain: '~(으)러 오다 目的' },
    { id: 'd58-l2-r2', audioKo: '많이 컸네, 토리 학생. Day 1에는 진짜 어렸었지.', promptZh: '浣熊阿姨感叹你长大了。你想说"重走一遍才明白同一条路不同感觉"，最自然的一句？', choices: [{ text: '다시 걸어보니까 알겠어요. 같은 길인데 다른 느낌이에요.', correct: true }, { text: '아직 안 컸어요.',                          correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                  correct: false }], explain: 'Tori 原句 · ~아/어 보니까 + ~는데' },
    { id: 'd58-l2-r3', audioKo: '앞으로도 화이팅!',                              promptZh: '浣熊阿姨鼓励你继续加油。你想温柔应答，最自然的一句？',                    choices: [{ text: '네, 계속 열심히 할게요. 감사합니다.',                    correct: true }, { text: '이제 안 해요.',                          correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어요.',                                  correct: false }], explain: '承诺形 ~ㄹ게요 + 敬语感谢' },
  ],
};
