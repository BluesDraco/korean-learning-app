import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 90 · 3-2 귀 트이기 · ~았/었지만 지금은 · 毕业演讲 */
export const day90Listen: ListenSubQuestData = {
  day: 30, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '대강당 · 짐을 가져왔지만 지금은 집이 있어요',

  meaning: [
    { id: 'd90-l2-m1', audioKo: '짐을 가지고 왔지만, 지금은 집이 있어요.',                        choices: [{ text: '虽然带着行李来，但现在有了家。',    correct: true }, { text: '带了家来，现在有行李。',              correct: false }, { text: '既没行李也没家。',                    correct: false }, { text: '行李和家都丢了。',                    correct: false }], explain: 'Day 90 명제 · ~았/었지만 지금은' },
    { id: 'd90-l2-m2', audioKo: '한국어를 몰랐지만, 지금은 말할 수 있어요.',                      choices: [{ text: '当初不懂韩语，现在能说了。',        correct: true }, { text: '现在还不会韩语。',                    correct: false }, { text: '一直都会韩语。',                      correct: false }, { text: '不想学韩语。',                        correct: false }], explain: '몰랐지만 + 지금은' },
    { id: 'd90-l2-m3', audioKo: '90일 전엔 두려웠지만, 지금은 안 두려워요.',                      choices: [{ text: '90天前害怕，现在不怕了。',          correct: true }, { text: '现在更害怕了。',                      correct: false }, { text: '从来没怕过。',                        correct: false }, { text: '一直都害怕。',                        correct: false }], explain: '두려웠지만 + 지금은' },
    { id: 'd90-l2-m4', audioKo: '연단에 올라갔어요.',                                            choices: [{ text: '登上了讲台。',                      correct: true }, { text: '走下讲台。',                          correct: false }, { text: '坐在台下。',                          correct: false }, { text: '没上台。',                            correct: false }], explain: '연단 + 올라가다' },
    { id: 'd90-l2-m5', audioKo: '기립 박수가 나왔어요.',                                          choices: [{ text: '全场起立鼓掌。',                    correct: true }, { text: '没有掌声。',                          correct: false }, { text: '有人退场。',                          correct: false }, { text: '大家在嘘。',                          correct: false }], explain: '기립 박수 · 起立鼓掌' },
  ],

  cloze: [
    { id: 'd90-l2-c1', audioKo: '짐을 가지고 왔지만, 지금은 집이 있어요.', clozeParts: ['짐을 가지고 ', ', 지금은 집이 있어요.'], choices: [{ text: '왔지만',    correct: true }, { text: '오지만',    correct: false }, { text: '올지만',    correct: false }, { text: '왔는지만',  correct: false }], explain: '过去 + 지만 · 오→왔' },
    { id: 'd90-l2-c2', audioKo: '짐을 가지고 왔지만, 지금은 집이 있어요.', clozeParts: ['짐을 가지고 왔지만, 지금은 ', ' 있어요.'], choices: [{ text: '집이',      correct: true }, { text: '짐이',      correct: false }, { text: '집을',      correct: false }, { text: '짐을',      correct: false }], explain: '집(家) · 一字之差' },
    { id: 'd90-l2-c3', audioKo: '한국어를 몰랐지만, 지금은 말할 수 있어요.', clozeParts: ['한국어를 ', ', 지금은 말할 수 있어요.'], choices: [{ text: '몰랐지만',  correct: true }, { text: '모르지만',  correct: false }, { text: '몰라지만',  correct: false }, { text: '몰랐는데', correct: false }], explain: '모르→몰랐 + 지만' },
    { id: 'd90-l2-c4', audioKo: '연단에 올라갔어요.',            clozeParts: ['연단', ' 올라갔어요.'],           choices: [{ text: '에',        correct: true }, { text: '에서',      correct: false }, { text: '을',        correct: false }, { text: '이',        correct: false }], explain: '방향/목적지 · 연단에' },
  ],

  reply: [
    { id: 'd90-l2-r1', audioKo: '90일 소감 한마디 해줄래?',                                        promptZh: '毕业演讲上有人请你说一句90天的感想。你想说出那句灵魂句"虽然当初带着行李来，但现在有了家"，最自然的一句？',                choices: [{ text: '저는 짐을 가지고 왔지만, 지금은 집이 있어요.',                              correct: true }, { text: '몰라요.',                                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '별거 없었어요.',                          correct: false }], explain: '~았지만 지금은 · 灵魂句' },
    { id: 'd90-l2-r2', audioKo: '한국어 이제 좀 늘었어?',                                          promptZh: '有人问你韩语进步了没。你想说"当初一句都不会，现在能说了"，最自然的一句？',                    choices: [{ text: '한국어를 하나도 몰랐지만, 지금은 말할 수 있어요.',                          correct: true }, { text: '아직도 하나도 몰라요.',                   correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '몰랐지만 + 지금은' },
    { id: 'd90-l2-r3', audioKo: '기립 박수 받은 기분이 어때?',                                     promptZh: '全场起立鼓掌后有人问你感受。你想真诚地感谢这90天，最自然的一句？',              choices: [{ text: '이 90일의 모든 순간에 진심으로 감사해요.',                                 correct: true }, { text: '별거 아니에요.',                          correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '순간 + 감사 · 真诚致谢' },
  ],
};
