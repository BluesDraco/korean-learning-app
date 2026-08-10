import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 80 · 3-5 Boss 战 · 🎒 Haru生病·照顾朋友 · ~아/어 줄게 + ~고 */
export const day80Boss: BossSubQuestData = {
  day: 20, level: 'advanced', idx: 5, kind: 'boss',
  koTitle: '간병의 관문',
  subtitle: '🎒 302호 · 첫 간병 · 역할 반전',

  intro: '周一晚上。旅行连着跑,Haru 烧到38.5度。你推开302的门,这次换你守在她旁边——量体温、跑便利店买药、热白粥、开加湿器。你还拨了医疗热线,用标准韩语描述症状。Day 13 感冒时是 Haru 照顾你,今天轮到你了。今天要用 ~아/어 줄게 和 ~고 说出照顾:내가 챙겨줄게 → 머리가 아프고 콧물이 나고 열이 나요 → 약 먹고 물 많이 마셔。',
  outroHook: '挂了电话,Haru 小声说"토리, 고마워. 진짜 컸다"——第三次听到这句。原来"长大"的意思,是能把自己长出的力气用来照顾别人。可第二天,你却因为一件小事和 Minji 吵了起来,冷战开始了。（Day 81 · 민지와 다툼）',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd80-b5-t1', audioKo: '내가 챙겨줄게. 걱정 마.',                                            choices: [{ text: '我来照顾你，别担心。',                    correct: true }, { text: '你照顾我吧。',                  correct: false }, { text: '我不管你。',              correct: false }, { text: '别照顾我。',              correct: false }], explain: 'Day 80 · ~아/어 줄게 承诺' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd80-b5-t2', audioKo: '머리가 아프고 콧물이 나고 열이 나요.',                                        choices: [{ text: '头疼、流鼻涕、发烧。',                    correct: true }, { text: '一切都好。',                  correct: false }, { text: '只是累。',                    correct: false }, { text: '肚子疼。',                  correct: false }], explain: '~고 症状罗列' } },
    { type: 'choice',  label: '~아/어 줄게',  task: { id: 'd80-b5-t3', promptZh: '"我来照顾你"（对朋友承诺）哪句最自然？',                                                                                                                                    choices: [{ text: '내가 챙겨줄래.',                     correct: false }, { text: '내가 챙겨줄게.',        correct: true }, { text: '내가 챙겨주다.',              correct: false }, { text: '내가 챙겨줄까.',                 correct: false }], explain: '主动承诺 · 챙겨줄게' } },
    { type: 'choice',  label: '~고 병렬',      task: { id: 'd80-b5-t4', promptZh: '"头疼又发烧"哪句正确？',                                                                                                                                    choices: [{ text: '머리가 아파고 열이 나요.',                          correct: false }, { text: '머리가 아프고 열이 나요.',    correct: true }, { text: '머리가 아파서 열이 나요.',                    correct: false }, { text: '머리가 아픈고 열이 나요.',                    correct: false }], explain: '~고 并列 · 아프다 → 아프고' } },
    { type: 'choice',  label: '认词',         task: { id: 'd80-b5-t5', promptKo: '체온',    promptHangul: 'che-on',                                                                                                                             choices: [{ text: '体温',                    correct: true }, { text: '血压',                            correct: false }, { text: '气温',                            correct: false }, { text: '体重',                              correct: false }], explain: '体(체) + 温(온)' } },
    { type: 'compose', label: '组句',         task: { id: 'd80-b5-t6', zhHint: '头疼、流鼻涕、发烧。',                                                                                                                                            audioKo: '머리가 아프고 콧물이 나고 열이 나요.',                            answer: ['머리가', '아프고', '콧물이', '나고', '열이', '나요.'],   tokens: ['머리가', '아프고', '콧물이', '나고', '열이', '나요.', '아파고', '아파서'],         explain: '~고 症状罗列' } },
    { type: 'compose', label: '组句',         task: { id: 'd80-b5-t7', zhHint: '我来照顾你，别担心。',                                                                                                                                            audioKo: '내가 챙겨줄게. 걱정 마.',                          answer: ['내가', '챙겨줄게.', '걱정', '마.'],                              tokens: ['내가', '챙겨줄게.', '걱정', '마.', '챙겨줄래.', '챙겨주다.', '해요.'],           explain: '~아/어 줄게 · 承诺' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd80-b5-t8', promptZh: 'Haru 问你现在是在照顾她吗。你想温柔回应"当然，Day 13你就这样照顾我的"，最自然的一句？',                                                                                            choices: [{ text: '당연하지. Day 13에 네가 나 챙겨줬잖아.',       correct: true }, { text: '난 원래 잘해.',                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                correct: false }], explain: '~잖아 · 呼应 Day 13' } },
  ],
};
