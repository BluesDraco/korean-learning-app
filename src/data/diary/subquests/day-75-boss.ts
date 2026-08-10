import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 75 · 3-5 Boss 战 · 🎒 부산 独立问路 · ~았/었을 텐데 */
export const day75Boss: BossSubQuestData = {
  day: 15, level: 'advanced', idx: 5, kind: 'boss',
  koTitle: '홀로서기의 관문',
  subtitle: '🎒 광복동 골목 · 방언 · 스스로 길 찾기',

  intro: '傍晚 6 点。광복동的巷子一条接一条，你迷路了——手机显示"GPS 弱"。Day 67 那次是深夜，你哭了；这次天还亮着。你深呼吸，拦住一位面善的阿姨问路。她用釜山方言回答，你只听懂一半，于是鼓起勇气请她用표준어再说一遍。今天要用 ~았/었을 텐데 把这份成长说出来：75일 전이었으면 울었을 텐데 → 혼자였으면 당황했을 텐데 → 이젠 스스로 길을 찾았어요。',
  outroHook: '走到광복站台阶前，你笑了一下——不是 Haru 来找你，是你自己走到的。明天要坐车回兽尔了，三天两夜的旅行到底给你留下了什么？（Day 76 · 여행의 의미）',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd75-b5-t1', audioKo: '75일 전이었으면 울었을 텐데.',                                            choices: [{ text: '75天前的话本该哭的。',                    correct: true }, { text: '75天前哭了。',                  correct: false }, { text: '现在在哭。',              correct: false }, { text: '不会哭。',              correct: false }], explain: 'Day 75 成长句 · ~았/었을 텐데（本该哭，没哭）' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd75-b5-t2', audioKo: '스스로 길을 찾았어요.',                                        choices: [{ text: '自己找到了路。',                    correct: true }, { text: '有人带路。',                  correct: false }, { text: '还在迷路。',                    correct: false }, { text: '不找路了。',                  correct: false }], explain: '스스로 + 길을 찾다' } },
    { type: 'choice',  label: '~았/었을 텐데', task: { id: 'd75-b5-t3', promptZh: '"一个人的话本该慌的"哪句正确？',                                                                                                                                    choices: [{ text: '혼자였으면 당황할 텐데.',                     correct: false }, { text: '혼자였으면 당황했을 텐데.',        correct: true }, { text: '혼자였으면 당황더라 텐데.',              correct: false }, { text: '혼자였으면 당황겠 텐데.',                 correct: false }], explain: '过去反事实 · ~았/었을 텐데（당황했을 텐데）' } },
    { type: 'choice',  label: '~았/었을 텐데', task: { id: 'd75-b5-t4', promptZh: '"标准语的话本该更好懂的"哪句正确？',                                                                                                                                    choices: [{ text: '표준어였으면 더 알아들을 텐데.',                          correct: false }, { text: '표준어였으면 더 알아들었을 텐데.',    correct: true }, { text: '표준어였으면 더 알아듣겠 텐데.',                    correct: false }, { text: '표준어였으면 더 알아듣더라.',                    correct: false }], explain: '过去反事实 · 알아들었을 텐데' } },
    { type: 'choice',  label: '认词',         task: { id: 'd75-b5-t5', promptKo: '극복하다',    promptHangul: 'geuk-bo-ka-da',                                                                                                                             choices: [{ text: '克服',                    correct: true }, { text: '放弃',                            correct: false }, { text: '逃跑',                            correct: false }, { text: '害怕',                              correct: false }], explain: '克(극) + 服(복) + 하다' } },
    { type: 'compose', label: '组句',         task: { id: 'd75-b5-t6', zhHint: '75天前的话本该在哭的。',                                                                                                                                            audioKo: '75일 전이었으면 울고 있었을 텐데.',                            answer: ['75일', '전이었으면', '울고', '있었을', '텐데.'],   tokens: ['75일', '전이었으면', '울고', '있었을', '텐데.', '울어요.', '지금', '웃어요.'],         explain: 'Day 75 成长名句' } },
    { type: 'compose', label: '组句',         task: { id: 'd75-b5-t7', zhHint: 'Haru来的话本该帮我的。',                                                                                                                                            audioKo: '하루가 왔으면 도와줬을 텐데.',                          answer: ['하루가', '왔으면', '도와줬을', '텐데.'],                              tokens: ['하루가', '왔으면', '도와줬을', '텐데.', '도와줘요.', '안 와요.', '하루를'],           explain: '반사실 · 왔으면 + 도와줬을 텐데' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd75-b5-t8', promptZh: '아주머니 用方言回答，你只听懂一半，最礼貌的回应是？',                                                                                            choices: [{ text: '표준어로 한 번만 더 천천히 부탁드려도 될까요?',       correct: true }, { text: '사투리 하지 마세요.',                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '표준어로 + 委婉请求 부탁드려도 될까요?' } },
  ],
};
