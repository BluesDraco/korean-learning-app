import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 56 · 2-2 귀 트이기 · ~아/어 봤어요 深化 · 짐/집 · N 이 아니라 N */
export const day56Listen: ListenSubQuestData = {
  day: 26, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '走廊上 · 新生的行李箱爆开',

  meaning: [
    { id: 'd56-l2-m1', audioKo: '집이 진짜 너무 무거워요…',                     choices: [{ text: '"家"太重了……',                       correct: true }, { text: '"行李"太重了……',                     correct: false }, { text: '"家里"没人。',                          correct: false }, { text: '"家"太远了。',                          correct: false }], explain: '新生用错 · 집 (家) vs 짐 (行李)' },
    { id: 'd56-l2-m2', audioKo: '"집"이 아니라 "짐"이에요.',                     choices: [{ text: '不是"家"是"行李"。',                  correct: true }, { text: '不是"行李"是"家"。',                    correct: false }, { text: '"家"就是"行李"。',                      correct: false }, { text: '两个都不对。',                          correct: false }], explain: 'Tori 教新生 · N 이 아니라 N' },
    { id: 'd56-l2-m3', audioKo: '받침 하나 차이예요.',                            choices: [{ text: '只是差一个收音。',                    correct: true }, { text: '一个收音都没有。',                      correct: false }, { text: '差好几个收音。',                        correct: false }, { text: '收音不同。',                          correct: false }], explain: 'Tori 教学一句' },
    { id: 'd56-l2-m4', audioKo: '나도 처음에 똑같이 실수해 봤어요.',              choices: [{ text: '我一开始也一样犯过错。',              correct: true }, { text: '我从来没犯错。',                      correct: false }, { text: '你不能犯错。',                          correct: false }, { text: '我第一次犯错。',                      correct: false }], explain: '~아/어 봤어요 经验安慰' },
    { id: 'd56-l2-m5', audioKo: '이제 내가 그 사람이 됐구나.',                    choices: [{ text: '原来现在我成了那个人啊。',            correct: true }, { text: '那个人成了我。',                        correct: false }, { text: '我不再是那个人。',                    correct: false }, { text: '我还没变成那个人。',                    correct: false }], explain: 'Tori 内心 · ~구나 感叹' },
  ],

  cloze: [
    { id: 'd56-l2-c1', audioKo: '"집"이 아니라 "짐"이에요.',      clozeParts: ['"집"이 ', ' "짐"이에요.'],       choices: [{ text: '아니라', correct: true }, { text: '있으면', correct: false }, { text: '라서', correct: false }, { text: '아니고', correct: false }], explain: 'N 이 **아니라** N = 辨析' },
    { id: 'd56-l2-c2', audioKo: '나도 처음에 실수해 봤어요.',       clozeParts: ['나도 처음에 실수해 ', '.'],       choices: [{ text: '봤어요',   correct: true }, { text: '있어요', correct: false }, { text: '있었어요', correct: false }, { text: '봐요',   correct: false }], explain: '~아/어 봤어요 尝试经验 · 过去' },
    { id: 'd56-l2-c3', audioKo: '한국 음식을 먹어 봤어요.',          clozeParts: ['한국 음식을 ', ' 봤어요.'],       choices: [{ text: '먹어',   correct: true }, { text: '먹고', correct: false }, { text: '먹는', correct: false }, { text: '먹었',   correct: false }], explain: 'V + 아/어 봤어요' },
    { id: 'd56-l2-c4', audioKo: '받침 하나 차이예요.',                 clozeParts: ['받침 하나 ', '.'],                choices: [{ text: '차이예요', correct: true }, { text: '차이가', correct: false }, { text: '차이에서', correct: false }, { text: '없어요', correct: false }], explain: 'N + (이)에요 · 차이 → 차이예요' },
  ],

  reply: [
    { id: 'd56-l2-r1', audioKo: '집이 진짜 너무 무거워요…',                promptZh: '新生用错"집"（应说 "짐"）。你想温柔纠错并陪伴，最自然的一句？',           choices: [{ text: '괜찮아요, 같이 정리해요. "집"이 아니라 "짐"이에요.',       correct: true }, { text: '틀렸어. 다시 말해.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어요.',                                correct: false }], explain: 'Tori 温柔纠错' },
    { id: 'd56-l2-r2', audioKo: '진짜 너무 창피해요.',                     promptZh: '新生因为犯错觉得难为情。你想安慰"我一开始也犯过"，最自然的一句？',         choices: [{ text: '괜찮아요. 나도 처음에 똑같이 실수해 봤어요.',              correct: true }, { text: '창피해할 만해요.',                        correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어요.',                                correct: false }], explain: '~아/어 봤어요 经验安慰' },
    { id: 'd56-l2-r3', audioKo: '언니는 한국말 되게 잘하네요.',            promptZh: '新生夸你韩语好。你想温柔谦虚地说"以前也不会"，最自然的一句？',              choices: [{ text: '고마워요. 저도 안녕하세요도 어려웠던 때가 있었어요.',          correct: true }, { text: '고마워요. 저 원래 잘해요.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                    correct: false }], explain: 'Day 55 ~았/었던 复习 · 谦虚回应' },
  ],
};
