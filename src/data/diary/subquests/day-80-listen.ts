import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 80 · 3-2 귀 트이기 · ~아/어 줄게 + ~고 · Haru生病照顾 */
export const day80Listen: ListenSubQuestData = {
  day: 20, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '302호 · 내가 챙겨줄게',

  meaning: [
    { id: 'd80-l2-m1', audioKo: '내가 챙겨줄게. 걱정 마.',                                        choices: [{ text: '我来照顾你，别担心。',                    correct: true }, { text: '你照顾我吧。',                      correct: false }, { text: '我不管你。',                        correct: false }, { text: '别照顾我。',                        correct: false }], explain: '~아/어 줄게 · 承诺' },
    { id: 'd80-l2-m2', audioKo: '머리가 아프고 콧물이 나고 열이 나요.',                            choices: [{ text: '头疼、流鼻涕、发烧。',                    correct: true }, { text: '一切都好。',                        correct: false }, { text: '只是有点累。',                      correct: false }, { text: '肚子疼。',                          correct: false }], explain: '~고 症状罗列' },
    { id: 'd80-l2-m3', audioKo: '약 잘 먹고 푹 자고, 내일 병원 오세요.',                            choices: [{ text: '好好吃药、好好睡，明天来医院。',          correct: true }, { text: '别吃药，明天来。',                  correct: false }, { text: '不用来医院。',                      correct: false }, { text: '今晚就来医院。',                    correct: false }], explain: '护士叮嘱 · 병상 관용' },
    { id: 'd80-l2-m4', audioKo: '체온을 쟀어요.',                                                  choices: [{ text: '量了体温。',                            correct: true }, { text: '量了血压。',                        correct: false }, { text: '忘了量。',                          correct: false }, { text: '体温正常。',                        correct: false }], explain: '체온을 재다' },
    { id: 'd80-l2-m5', audioKo: '토리, 고마워. 진짜 컸다.',                                        choices: [{ text: '兔莉，谢谢。真的长大了。',                correct: true }, { text: '兔莉，别管我。',                    correct: false }, { text: '兔莉，你还小。',                    correct: false }, { text: '兔莉，走开。',                      correct: false }], explain: 'Haru 的话 · 第三次"컸다"' },
  ],

  cloze: [
    { id: 'd80-l2-c1', audioKo: '내가 챙겨줄게.',   clozeParts: ['내가 ', '.'],   choices: [{ text: '챙겨줄게', correct: true }, { text: '챙겨줄래',    correct: false }, { text: '챙겨주다',    correct: false }, { text: '챙겨줄까', correct: false }], explain: '~아/어 줄게 · 承诺' },
    { id: 'd80-l2-c2', audioKo: '머리가 아프고 열이 나요.',   clozeParts: ['머리가 ', ' 열이 나요.'],   choices: [{ text: '아프고', correct: true }, { text: '아파고',  correct: false }, { text: '아파서',    correct: false }, { text: '아픈고', correct: false }], explain: '~고 罗列 · 아프고' },
    { id: 'd80-l2-c3', audioKo: '약 먹고 물 많이 마셔.',      clozeParts: ['약 ', ' 물 많이 마셔.'], choices: [{ text: '먹고',     correct: true }, { text: '먹서',      correct: false }, { text: '먹은고',      correct: false }, { text: '먹더라',      correct: false }], explain: '~고 先后' },
    { id: 'd80-l2-c4', audioKo: '체온을 쟀어요.',          clozeParts: ['체온', ' 쟀어요.'],             choices: [{ text: '을', correct: true }, { text: '이', correct: false }, { text: '에', correct: false }, { text: '은', correct: false }], explain: '체온 + 宾格 을' },
  ],

  reply: [
    { id: 'd80-l2-r1', audioKo: '토리… 미안… 감기 걸린 것 같아…',                                          promptZh: 'Haru 抱歉地说好像感冒了。你想说"没事，我照顾你，吃药多喝水"，最自然的一句？',                choices: [{ text: '괜찮아, 내가 챙겨줄게. 약 먹고 물 많이 마셔.',                                          correct: true }, { text: '왜 아파? 나가.',                                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '~아/어 줄게 + ~고 叮嘱' },
    { id: 'd80-l2-r2', audioKo: '어디가 아프세요?',                                    promptZh: '护士问哪里不舒服。你想说"头疼、流鼻涕、发烧"，最自然的一句？',                    choices: [{ text: '머리가 아프고 콧물이 나고 열이 나요.',                                          correct: true }, { text: '아무데도 안 아파요.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                  correct: false }], explain: '~고 症状罗列' },
    { id: 'd80-l2-r3', audioKo: '너 나 챙겨주는 거야?',                                        promptZh: 'Haru 问你现在是在照顾她吗。你想说"当然，Day 13你就这样照顾我的"，最自然的一句？',                        choices: [{ text: '당연하지. Day 13에 네가 나 챙겨줬잖아.',                                  correct: true }, { text: '아니, 그냥 지나가는 길이야.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '~잖아 · 呼应 Day 13' },
  ],
};
