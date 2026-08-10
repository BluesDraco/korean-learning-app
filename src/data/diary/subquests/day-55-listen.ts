import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 55 · 2-2 귀 트이기 · ~던 · ~았/었던 回想 */
export const day55Listen: ListenSubQuestData = {
  day: 25, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '书桌前 · 55 天前的自己',

  meaning: [
    { id: 'd55-l2-m1', audioKo: '55일 전에는 안녕하세요도 어려웠던 나였어요.',    choices: [{ text: '55 天前连"你好"都难说出口的我。',   correct: true }, { text: '55 天前会说很多韩语。',              correct: false }, { text: '55 天后要说韩语。',                    correct: false }, { text: '55 天前不认识 안녕하세요。',              correct: false }], explain: 'Tori 原句 · ~았/었던 回想' },
    { id: 'd55-l2-m2', audioKo: '지금은 흥정도 하고, 친구 싸움도 말리는 사람이에요.', choices: [{ text: '现在能讲价、能调解朋友吵架的人。',   correct: true }, { text: '现在只会讲价。',                        correct: false }, { text: '现在爱吵架。',                          correct: false }, { text: '不会讲价了。',                          correct: false }], explain: '~고 并列 · Tori 自我描述' },
    { id: 'd55-l2-m3', audioKo: '자주 갔던 카페가 문 닫았어요.',                    choices: [{ text: '常去的咖啡馆关门了。',                correct: true }, { text: '咖啡馆才刚开。',                        correct: false }, { text: '第一次去咖啡馆。',                      correct: false }, { text: '咖啡馆搬走了。',                        correct: false }], explain: '갔던 = 反复去过（~던 反复经验）' },
    { id: 'd55-l2-m4', audioKo: '많이 배웠고, 앞으로도 많이 배울 거야.',              choices: [{ text: '学了很多，以后也会学很多。',        correct: true }, { text: '不用再学了。',                          correct: false }, { text: '以后不学了。',                          correct: false }, { text: '现在没学好。',                          correct: false }], explain: 'Haru 原句 · ~ㄹ 거야' },
    { id: 'd55-l2-m5', audioKo: '계속 더 열심히 할래요.',                            choices: [{ text: '会继续更努力。',                    correct: true }, { text: '不打算再努力。',                        correct: false }, { text: '停止努力。',                            correct: false }, { text: '努力过了。',                            correct: false }], explain: 'Tori 承诺 · ~(으)ㄹ래요' },
  ],

  cloze: [
    { id: 'd55-l2-c1', audioKo: '안녕하세요도 어려웠던 나였어요.',   clozeParts: ['안녕하세요도 ', ' 나였어요.'],  choices: [{ text: '어려웠던', correct: true }, { text: '어려운',   correct: false }, { text: '어려운데', correct: false }, { text: '어렵다는', correct: false }], explain: '어렵다 → 어려웠 + 던 · 过去回想' },
    { id: 'd55-l2-c2', audioKo: '자주 갔던 카페가 문 닫았어요.',      clozeParts: ['자주 ', ' 카페가 문 닫았어요.'], choices: [{ text: '갔던',     correct: true }, { text: '가는',   correct: false }, { text: '간',       correct: false }, { text: '갈',       correct: false }], explain: '~던 反复经验 · 갔던 카페 = 常去的咖啡馆' },
    { id: 'd55-l2-c3', audioKo: '그때 좋아했던 노래를 다시 들었어요.', clozeParts: ['그때 ', ' 노래를 다시 들었어요.'], choices: [{ text: '좋아했던', correct: true }, { text: '좋아하는', correct: false }, { text: '좋아하고', correct: false }, { text: '좋아하네', correct: false }], explain: '~았/었던 = 完全过去（已经不喜欢了）' },
    { id: 'd55-l2-c4', audioKo: '한국어를 몰랐던 때가 있었어요.',      clozeParts: ['한국어를 ', ' 때가 있었어요.'],  choices: [{ text: '몰랐던',   correct: true }, { text: '모르는', correct: false }, { text: '모르네',   correct: false }, { text: '모른다는', correct: false }], explain: '모르다 → 몰랐 + 던 · 自我成长回顾' },
  ],

  reply: [
    { id: 'd55-l2-r1', audioKo: '토리, 55일 어땠어?',                            promptZh: 'Haru 问你 55 天感觉如何。你想说"以前 안녕하세요都难，现在能讲价了"，最自然的一句？', choices: [{ text: '안녕하세요도 어려웠던 나였는데, 이제 흥정도 해.',                   correct: true }, { text: '55일 몰라.',                              correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어.',                                  correct: false }], explain: '~았/었던 + ~는데 铺垫 · 成长对比' },
    { id: 'd55-l2-r2', audioKo: '많이 배웠고, 앞으로도 많이 배울 거야.',           promptZh: 'Haru 说学了很多以后也会学很多。你想承诺"会继续更努力"，最自然的一句？',              choices: [{ text: '응, 계속 더 열심히 할래.',                                     correct: true }, { text: '이제 그만할래.',                          correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: 'Tori 决心' },
    { id: 'd55-l2-r3', audioKo: '어제 그 카페 갈래?',                              promptZh: '朋友问要不要去咖啡馆。你想说"我常去的那家关门了"，最自然的一句？',                    choices: [{ text: '자주 갔던 카페가 문 닫았어.',                                    correct: true }, { text: '자주 가는 카페가 문 닫았어.',              correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '~던 反复过去 · 갔던 카페' },
  ],
};
