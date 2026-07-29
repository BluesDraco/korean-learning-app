import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 45 · 2-2 귀 트이기 · ~보다 (더) 比较 */
export const day45Listen: ListenSubQuestData = {
  day: 15, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '305 号教室 · 期中考完的每一句',

  meaning: [
    { id: 'd45-l2-m1', audioKo: '저는 30일 전보다 한국어를 더 잘해요.',    choices: [{ text: '我比 30 天前韩语说得更好。',      correct: true }, { text: '我 30 天前韩语说得更好。',              correct: false }, { text: '30 天前不会韩语。',                    correct: false }, { text: '30 天后不会说韩语。',                    correct: false }], explain: 'Tori 试卷原句 · 보다 + 더' },
    { id: 'd45-l2-m2', audioKo: '토리, 진짜 많이 늘었네요.',                 choices: [{ text: '兔莉，真的进步很多呢。',        correct: true }, { text: '兔莉，好好加油。',                  correct: false }, { text: '兔莉，考试很难。',                      correct: false }, { text: '兔莉，没进步。',                        correct: false }], explain: '火鹤老师 · ~네요 感叹' },
    { id: 'd45-l2-m3', audioKo: '85점, 합격이에요.',                         choices: [{ text: '85 分，合格。',                    correct: true }, { text: '85 分，不合格。',                    correct: false }, { text: '85 分，我不满意。',                    correct: false }, { text: '85 分，还差得远。',                    correct: false }], explain: '합격 = 合格 · 점 = 分' },
    { id: 'd45-l2-m4', audioKo: '지금은 다른 사람에게 길을 알려줄 수 있어요.', choices: [{ text: '现在我可以给别人指路。',        correct: true }, { text: '现在没人给我指路。',                  correct: false }, { text: '别人给我指路了。',                      correct: false }, { text: '我不知道路。',                          correct: false }], explain: 'Day 35 复习 · 现在能反过来指路了' },
    { id: 'd45-l2-m5', audioKo: '오늘이 어제보다 더 추워요.',                  choices: [{ text: '今天比昨天更冷。',                correct: true }, { text: '昨天比今天更冷。',                  correct: false }, { text: '今天和昨天一样冷。',                    correct: false }, { text: '今天不冷。',                          correct: false }], explain: '어제 + 보다 + 더 · 天气比较' },
  ],

  cloze: [
    { id: 'd45-l2-c1', audioKo: '30일 전보다 한국어를 더 잘해요.',    clozeParts: ['30일 전', ' 한국어를 더 잘해요.'],   choices: [{ text: '보다', correct: true }, { text: '에서', correct: false }, { text: '까지', correct: false }, { text: '에게', correct: false }], explain: '比较对象 + **보다**' },
    { id: 'd45-l2-c2', audioKo: '오늘이 어제보다 더 추워요.',          clozeParts: ['오늘이 어제보다 ', ' 추워요.'],       choices: [{ text: '더',   correct: true }, { text: '가장', correct: false }, { text: '많이', correct: false }, { text: '너무', correct: false }], explain: '~보다 + **더**(更加) 强调' },
    { id: 'd45-l2-c3', audioKo: '중간고사가 초급 시험보다 어려웠어요.', clozeParts: ['중간고사', ' 초급 시험보다 어려웠어요.'], choices: [{ text: '가',   correct: true }, { text: '보다',   correct: false }, { text: '에서', correct: false }, { text: '까지', correct: false }], explain: '主语 用 이/가 · 比较对象 用 보다' },
    { id: 'd45-l2-c4', audioKo: '커피보다 차가 좋아요.',                clozeParts: ['커피', ' 차가 좋아요.'],             choices: [{ text: '보다', correct: true }, { text: '이',   correct: false }, { text: '을',   correct: false }, { text: '에서', correct: false }], explain: '커피 + **보다** · 更喜欢茶' },
  ],

  reply: [
    { id: 'd45-l2-r1', audioKo: '토리, 진짜 많이 늘었네요.',              promptZh: '火鹤老师夸你进步。你想谦虚道谢并承诺继续努力，最自然的一句？',   choices: [{ text: '감사합니다. 계속 열심히 할게요.',                    correct: true }, { text: '아니에요, 별로 안 늘었어요.',                    correct: false }, { text: '저 원래 잘해요.',                    correct: false }, { text: '얼마예요?',                          correct: false }], explain: '감사합니다 + 承诺形 ~할게요' },
    { id: 'd45-l2-r2', audioKo: '30일 전이랑 지금이랑 뭐가 달라?',       promptZh: '朋友问你 30 天前后有什么不同。你想说"现在能给别人指路了"，最自然的一句？', choices: [{ text: '지금은 다른 사람에게 길을 알려줄 수 있어.',           correct: true }, { text: '지금도 길을 몰라.',                        correct: false }, { text: '전에는 길을 잘 알았어.',                    correct: false }, { text: '얼마예요?',                              correct: false }], explain: 'Day 35 铺垫 · 现在能反过来指路' },
    { id: 'd45-l2-r3', audioKo: '오늘 시험 어땠어?',                      promptZh: '朋友问考试如何。你想说"觉得挺熟悉的"，最自然的一句？',                    choices: [{ text: '생각보다 익숙한 것 같았어.',                          correct: true }, { text: '시험이 안 왔어.',                          correct: false }, { text: '시험이 없어요.',                            correct: false }, { text: '얼마예요?',                          correct: false }], explain: '~보다 + 형용사 · 생각보다 = 比想象中' },
  ],
};
