import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 77 · 3-2 귀 트이기 · ~을/를 ~에 담다 · 여행 계획 발표 */
export const day77Listen: ListenSubQuestData = {
  day: 17, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '발표 수업 · 흐름을 3일에 담았어요',

  meaning: [
    { id: 'd77-l2-m1', audioKo: '흐름을 3일에 담았어요.',                                        choices: [{ text: '把流程装进了3天。',                      correct: true }, { text: '3天太短了。',                      correct: false }, { text: '流程很乱。',                        correct: false }, { text: '没有流程。',                        correct: false }], explain: '~을/를 ~에 담다' },
    { id: 'd77-l2-m2', audioKo: '속도보다 밀도가 중요합니다.',                                    choices: [{ text: '密度比速度重要。',                        correct: true }, { text: '速度比密度重要。',                  correct: false }, { text: '两个都重要。',                      correct: false }, { text: '都不重要。',                        correct: false }], explain: '~보다 + 밀도' },
    { id: 'd77-l2-m3', audioKo: '토리 씨, 이번 발표 100점입니다.',                                choices: [{ text: '兔莉，本次发表100分。',                  correct: true }, { text: '兔莉，重做发表。',                  correct: false }, { text: '兔莉，发表迟到了。',                correct: false }, { text: '兔莉，没发表。',                    correct: false }], explain: '火鹤老师 · 满分' },
    { id: 'd77-l2-m4', audioKo: '배운 걸 실천했어요.',                                            choices: [{ text: '把学到的实践了。',                        correct: true }, { text: '还没学。',                          correct: false }, { text: '忘了学的。',                        correct: false }, { text: '不想实践。',                        correct: false }], explain: '배운 것을 → 배운 걸 + 실천하다' },
    { id: 'd77-l2-m5', audioKo: '오늘 발표 정말 잘 짜여 있었어.',                                  choices: [{ text: '今天的发表结构真好。',                    correct: true }, { text: '今天发表很乱。',                    correct: false }, { text: '今天没发表。',                      correct: false }, { text: '发表太长了。',                      correct: false }], explain: 'Danielle 的认可 · 잘 짜이다' },
  ],

  cloze: [
    { id: 'd77-l2-c1', audioKo: '흐름을 3일에 담았어요.',      clozeParts: ['흐름', ' 3일에 담았어요.'],   choices: [{ text: '을',       correct: true }, { text: '이',        correct: false }, { text: '에',        correct: false }, { text: '은',      correct: false }], explain: '内容 흐름 + 宾格 을' },
    { id: 'd77-l2-c2', audioKo: '마음을 편지에 담았어요.',      clozeParts: ['마음을 편지', ' 담았어요.'],  choices: [{ text: '에',       correct: true }, { text: '가',        correct: false }, { text: '를',        correct: false }, { text: '은',      correct: false }], explain: '容器 편지 + 에' },
    { id: 'd77-l2-c3', audioKo: '속도보다 밀도가 중요합니다.',  clozeParts: ['속도', ' 밀도가 중요합니다.'], choices: [{ text: '보다',     correct: true }, { text: '처럼',      correct: false }, { text: '마다',      correct: false }, { text: '밖에',    correct: false }], explain: '~보다 · 比较' },
    { id: 'd77-l2-c4', audioKo: '배운 걸 실천했어요.',          clozeParts: ['배운 걸 ', '.'],             choices: [{ text: '실천했어요', correct: true }, { text: '실천핬어요', correct: false }, { text: '실천햇어요', correct: false }, { text: '실천했으요', correct: false }], explain: '실천하다 → 실천했어요' },
  ],

  reply: [
    { id: 'd77-l2-r1', audioKo: '발표 주제가 뭐였어?',                                          promptZh: 'Junho 问你发表主题是什么。你想说"把自然-文化-休息的流程装进了3天"，最自然的一句？',                choices: [{ text: '자연-문화-휴식의 흐름을 3일에 담았어.',                                          correct: true }, { text: '몰라.',                                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어.',                                  correct: false }], explain: '반말 + ~을 ~에 담다' },
    { id: 'd77-l2-r2', audioKo: '몇 점 받았어?',                                                promptZh: '朋友问你得了几分。你想说"100分，第一次满分"，最自然的一句？',                    choices: [{ text: '100점 받았어. 첫 만점이야.',                                          correct: true }, { text: '점수 안 나왔어.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '점수 报告' },
    { id: 'd77-l2-r3', audioKo: '다니엘이 뭐래?',                                              promptZh: 'Minji 问 Danielle 说了什么。你想说"她说结构很好，她也学到了"，最自然的一句？',                        choices: [{ text: '잘 짜여 있었대. 자기도 배웠대.',                                  correct: true }, { text: '아무 말도 안 했어.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '~대 · 间接引用(Danielle 的话)' },
  ],
};
