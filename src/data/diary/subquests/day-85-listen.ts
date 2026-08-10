import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 85 · 3-2 귀 트이기 · ~(으)ㄹ 때마다 · 카운트다운 */
export const day85Listen: ListenSubQuestData = {
  day: 25, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '고급반 교실 · 한 장씩 뜯을 때마다',

  meaning: [
    { id: 'd85-l2-m1', audioKo: '종이를 뜯을 때마다 시간이 줄어요.',                              choices: [{ text: '每撕一张纸，时间就少一点。',              correct: true }, { text: '撕纸时间就多。',                    correct: false }, { text: '纸撕不动。',                        correct: false }, { text: '时间不会走。',                      correct: false }], explain: '~(으)ㄹ 때마다 · 每当' },
    { id: 'd85-l2-m2', audioKo: '오 일 남았어요.',                                                choices: [{ text: '剩5天。',                                correct: true }, { text: '过了5天。',                        correct: false }, { text: '还有50天。',                        correct: false }, { text: '5天前。',                          correct: false }], explain: '남다 · 剩' },
    { id: 'd85-l2-m3', audioKo: '반이 처음으로 저를 받아줬어요.',                                  choices: [{ text: '班上第一次接纳了我。',                    correct: true }, { text: '班上拒绝了我。',                    correct: false }, { text: '我离开了班。',                      correct: false }, { text: '我接纳了班。',                      correct: false }], explain: '받아주다 · 接纳' },
    { id: 'd85-l2-m4', audioKo: '이 순간을 기억해둘게요.',                                          choices: [{ text: '我会记住这一刻。',                        correct: true }, { text: '我忘了这一刻。',                    correct: false }, { text: '这一刻很无聊。',                    correct: false }, { text: '不想记住。',                        correct: false }], explain: '기억해두다 · 记下来' },
    { id: 'd85-l2-m5', audioKo: '너를 볼 때마다 웃음이 나요.',                                      choices: [{ text: '每次看到你都会笑。',                      correct: true }, { text: '看到你就哭。',                      correct: false }, { text: '很少看到你。',                      correct: false }, { text: '不想看你。',                        correct: false }], explain: '볼 때마다' },
  ],

  cloze: [
    { id: 'd85-l2-c1', audioKo: '종이를 뜯을 때마다 시간이 줄어요.',   clozeParts: ['종이를 ', ' 시간이 줄어요.'],   choices: [{ text: '뜯을 때마다', correct: true }, { text: '뜯 때마다',    correct: false }, { text: '뜯를 때마다',    correct: false }, { text: '뜯으면', correct: false }], explain: '뜯다(有收音) + 을 때마다' },
    { id: 'd85-l2-c2', audioKo: '너를 볼 때마다 웃음이 나요.',   clozeParts: ['너를 ', ' 웃음이 나요.'],   choices: [{ text: '볼 때마다', correct: true }, { text: '보 때마다',  correct: false }, { text: '봄 때마다',    correct: false }, { text: '보을 때마다', correct: false }], explain: '보다(无收音) + ㄹ 때마다' },
    { id: 'd85-l2-c3', audioKo: '이 노래를 들을 때마다 그날이 생각나요.',   clozeParts: ['이 노래를 ', ' 그날이 생각나요.'], choices: [{ text: '들을 때마다',     correct: true }, { text: '듣을 때마다',      correct: false }, { text: '들 때마다',      correct: false }, { text: '듣를 때마다',      correct: false }], explain: '듣다 ㄷ불규칙 → 들을 때마다' },
    { id: 'd85-l2-c4', audioKo: '오 일 남았어요.',          clozeParts: ['오 일 ', '.'],             choices: [{ text: '남았어요', correct: true }, { text: '남겼어요', correct: false }, { text: '남으면', correct: false }, { text: '남을게요', correct: false }], explain: '남다 → 남았어요' },
  ],

  reply: [
    { id: 'd85-l2-r1', audioKo: '오늘 5장 뜯을 사람?',                                          promptZh: 'Danielle 问今天谁撕5。你想说"我撕，想讲Day 42的故事"，最自然的一句？',                choices: [{ text: '제가 뜯을게요. Day 42 이야기 나눌게요.',                                          correct: true }, { text: '싫어요. 안 뜯을래요.',                                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                  correct: false }], explain: '~ㄹ게요 · 主动承担' },
    { id: 'd85-l2-r2', audioKo: '이제 며칠 남았지?',                                    promptZh: '朋友问还剩几天。你想说"剩5天，每撕一张就少一天"，最自然的一句？',                    choices: [{ text: '오 일 남았어. 한 장 뜯을 때마다 하루씩 줄어.',                                          correct: true }, { text: '아직 오십 일 남았어.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '남다 + ~ㄹ 때마다' },
    { id: 'd85-l2-r3', audioKo: '헤어지는 거 아쉽지?',                                        promptZh: '朋友问要分开是不是舍不得。你想说"舍不得，但想把这几天好好记住"，最自然的一句？',                        choices: [{ text: '아쉽지. 근데 남은 며칠 잘 기억해두고 싶어.',                                  correct: true }, { text: '아니, 빨리 끝났으면 좋겠어.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '기억해두다 · 珍惜' },
  ],
};
