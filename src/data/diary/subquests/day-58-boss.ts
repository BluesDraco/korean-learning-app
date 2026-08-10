import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 58 · 2-5 Boss 战 · 🛤 重走第一天的路 */
export const day58Boss: BossSubQuestData = {
  day: 28, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '회귀의 관문',
  subtitle: '🛤 同一条路 · 两种感觉',
  intro: '早上 10 点。仁爪机场行李传送带前，Day 3 的裂缝还在。地铁 2 号线，Day 5 遇见 Haru 的座位空着。宿舍走廊，Day 6 迷路的转角。你重走 Day 1-7 的每一步 —— 但今天你不是那只需要被扶的兔子了。要用 ~아/어 보니까 说清 "试过才知道" 的每一句话。',
  outroHook: '走完最后一步坐在宿舍门口台阶上。妈妈送的胡萝卜笔还挂在包上。日记本翻开：56 일 걸어보니까 알겠어요 —— 같은 길이지만 다른 사람이 걸으면 다른 길이 돼요。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd58-b5-t1', audioKo: '다시 걸어보니까 알겠어요.',                choices: [{ text: '重新走了才明白。',                correct: true }, { text: '再走一遍不知道。',                    correct: false }, { text: '要重新学走路。',                        correct: false }, { text: '走不到了。',                            correct: false }], explain: 'Tori 悟出的一句 · ~아/어 보니까' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd58-b5-t2', audioKo: '같은 길인데 다른 느낌이에요.',             choices: [{ text: '同一条路，不同的感觉。',          correct: true }, { text: '不同的路，同一种感觉。',                correct: false }, { text: '两条路都难。',                          correct: false }, { text: '这条路不认识。',                          correct: false }], explain: '~는데 铺垫 · 感受对比' } },
    { type: 'choice',  label: '经验发现',     task: { id: 'd58-b5-t3', promptZh: '"吃了才发现真的辣"哪句正确？',                                                                                                          choices: [{ text: '먹으니까 진짜 매웠어요.',                    correct: false }, { text: '먹어 보니까 진짜 매웠어요.',       correct: true }, { text: '먹으면 진짜 매워요.',                     correct: false }, { text: '먹었어서 진짜 매웠어요.',                correct: false }], explain: '~아/어 보니까 = 尝试后发现' } },
    { type: 'choice',  label: 'ㄷ 不规则',    task: { id: 'd58-b5-t4', promptZh: '"重走了才明白"哪句正确？',                                                                                                              choices: [{ text: '다시 걷어보니까 알겠어요.',                   correct: false }, { text: '다시 걸어보니까 알겠어요.',       correct: true }, { text: '다시 걷으니까 알겠어요.',                correct: false }, { text: '다시 걷보니까 알겠어요.',                   correct: false }], explain: 'ㄷ 不规则 · 걷다 → 걸어' } },
    { type: 'choice',  label: '认词',         task: { id: 'd58-b5-t5', promptKo: '두렵다', promptHangul: 'du-ryeop-da',                                                                                                    choices: [{ text: '害怕',              correct: true }, { text: '开心',              correct: false }, { text: '悲伤',              correct: false }, { text: '愤怒',                     correct: false }], explain: 'ㅂ 不规则 · 두려워요' } },
    { type: 'compose', label: '组句',         task: { id: 'd58-b5-t6', zhHint: '重新走了才明白。',                                                                                                                        audioKo: '다시 걸어보니까 알겠어요.',                    answer: ['다시', '걸어보니까', '알겠어요.'],                        tokens: ['다시', '걸어보니까', '알겠어요.', '걷으니까', '걸으면', '걸었으니까', '몰라요.'],                          explain: '~아/어 보니까 经验发现' } },
    { type: 'compose', label: '组句',         task: { id: 'd58-b5-t7', zhHint: '想对 Day 1 的自己说"没事，会到的"。',                                                                                                    audioKo: 'Day 1의 나한테 "괜찮아, 도착해"라고 말하고 싶어요.', answer: ['Day 1의', '나한테', '"괜찮아, 도착해"라고', '말하고', '싶어요.'], tokens: ['Day 1의', '나한테', '"괜찮아, 도착해"라고', '말하고', '싶어요.', '한테서', 'Day 1의 나에게', '말해서', '말했어요.'], explain: '~라고 하다 直接引用 + ~고 싶어요' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd58-b5-t8', promptZh: '浣熊阿姨说 "토리 학생 앞으로도 화이팅"。你想温柔应答并承诺继续努力，最自然的一句？',                                                    choices: [{ text: '네, 계속 열심히 할게요. 감사합니다.',      correct: true }, { text: '아니에요, 저 이제 안 해요.',                  correct: false }, { text: '그러세요, 아주머니.',                          correct: false }, { text: '얼마예요?',                              correct: false }], explain: 'Tori 感谢 + 承诺' } },
  ],
};
