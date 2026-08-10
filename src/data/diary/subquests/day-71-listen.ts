import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 71 · 3-2 귀 트이기 · N + 만에 · KTX 부산행 */
export const day71Listen: ListenSubQuestData = {
  day: 11, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: 'KTX · 서울역 → 부산',

  meaning: [
    { id: 'd71-l2-m1', audioKo: '60일 만에 서울을 떠나요.',                                    choices: [{ text: '时隔 60 天离开首尔。',                     correct: true }, { text: '60 天后来首尔。',                    correct: false }, { text: '再过 60 天再走。',                    correct: false }, { text: '在首尔住 60 天。',                    correct: false }], explain: 'N + 만에 · 时隔' },
    { id: 'd71-l2-m2', audioKo: '2시간 만에 부산에 도착해요.',                                choices: [{ text: '2 小时后到达釜山。',                        correct: true }, { text: '2 小时前离开釜山。',                 correct: false }, { text: '再等 2 小时。',                       correct: false }, { text: '2 小时在釜山玩。',                    correct: false }], explain: 'KTX 车速 · N + 만에' },
    { id: 'd71-l2-m3', audioKo: '이 KTX는 부산행이에요. 9시에 출발해요.',                    choices: [{ text: '这趟 KTX 是釜山方向。9 点出发。',         correct: true }, { text: '这趟车不是釜山方向。',                correct: false }, { text: '这趟车 9 点到。',                      correct: false }, { text: '这趟车下午出发。',                    correct: false }], explain: '부산행 = 釜山方向' },
    { id: 'd71-l2-m4', audioKo: '첫 여행이라서 진짜 설레요.',                                  choices: [{ text: '因为是第一次旅行，真的很激动。',            correct: true }, { text: '不是第一次旅行。',                    correct: false }, { text: '不激动。',                            correct: false }, { text: '不想去。',                           correct: false }], explain: '~라서 + 설레다' },
    { id: 'd71-l2-m5', audioKo: '창밖으로 바다가 보여요.',                                     choices: [{ text: '窗外能看见海。',                             correct: true }, { text: '窗外是山。',                          correct: false }, { text: '窗户关着。',                            correct: false }, { text: '没有窗户。',                          correct: false }], explain: '창밖 = 窗外' },
  ],

  cloze: [
    { id: 'd71-l2-c1', audioKo: '60일 만에 서울을 떠나요.',           clozeParts: ['60일 ', ' 서울을 떠나요.'],           choices: [{ text: '만에',   correct: true }, { text: '동안',    correct: false }, { text: '부터',    correct: false }, { text: '까지', correct: false }], explain: 'N + 만에 · 时隔' },
    { id: 'd71-l2-c2', audioKo: '2시간 만에 도착했어요.',              clozeParts: ['2시간 ', ' 도착했어요.'],              choices: [{ text: '만에',   correct: true }, { text: '동안',    correct: false }, { text: '에',      correct: false }, { text: '까지', correct: false }], explain: '만에 = 隔了……才 / 只用了……就' },
    { id: 'd71-l2-c3', audioKo: '이 KTX는 부산행이에요.',              clozeParts: ['이 KTX는 ', '.'],                     choices: [{ text: '부산행이에요', correct: true }, { text: '부산행예요', correct: false }, { text: '부산행이예요', correct: false }, { text: '부산행요', correct: false }], explain: '행 有받침 → 이에요' },
    { id: 'd71-l2-c4', audioKo: '9시에 출발합니다.',                    clozeParts: ['9시에 ', '.'],                        choices: [{ text: '출발합니다', correct: true }, { text: '출발해다', correct: false }, { text: '출발하다', correct: false }, { text: '출발니다', correct: false }], explain: '합쇼체 · 출발합니다' },
  ],

  reply: [
    { id: 'd71-l2-r1', audioKo: '표 예매했어요?',                                                 promptZh: 'Junho 问车票订了没。你想说"时隔 60 天，第一次出首尔"，最自然的一句？',                    choices: [{ text: '네, 60일 만에 첫 여행이에요.',                                      correct: true }, { text: '아니요, 표 없어요.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: 'N + 만에 · 첫 여행' },
    { id: 'd71-l2-r2', audioKo: '몇 시에 도착해요?',                                              promptZh: '有人问你几点到。你想说"2 小时后到达釜山"，最自然的一句？',                              choices: [{ text: '2시간 만에 부산에 도착해요.',                                        correct: true }, { text: '2시간 동안 부산이에요.',                correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: 'N + 만에 + 도착하다' },
    { id: 'd71-l2-r3', audioKo: '기분이 어때요?',                                                 promptZh: '有人问你心情如何。你想说"因为是第一次旅行，真的很激动"，最自然的一句？',                choices: [{ text: '첫 여행이라서 진짜 설레요.',                                        correct: true }, { text: '여행 안 좋아해요.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '~라서 + 설레다' },
  ],
};
