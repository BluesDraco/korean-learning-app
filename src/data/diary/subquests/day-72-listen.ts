import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 72 · 3-2 귀 트이기 · ~(으)ㄹ 만하다 · 해운대 */
export const day72Listen: ListenSubQuestData = {
  day: 12, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '해운대 · 파라솔 · 갈매기',

  meaning: [
    { id: 'd72-l2-m1', audioKo: '해운대는 한번 가 볼 만해요.',                                choices: [{ text: '海云台值得去一次看看。',                     correct: true }, { text: '海云台不值得去。',                    correct: false }, { text: '海云台已经去过了。',                    correct: false }, { text: '海云台在首尔。',                    correct: false }], explain: 'Day 72 主题句 · ~ㄹ 만하다' },
    { id: 'd72-l2-m2', audioKo: '이 회는 진짜 먹을 만해요.',                                    choices: [{ text: '这生鱼片真的值得吃。',                        correct: true }, { text: '这生鱼片不能吃。',                    correct: false }, { text: '生鱼片已经吃完了。',                    correct: false }, { text: '不想吃生鱼片。',                      correct: false }], explain: 'V + ㄹ 만하다 = 值得' },
    { id: 'd72-l2-m3', audioKo: '이 카페는 사진 찍을 만해요.',                                 choices: [{ text: '这家咖啡厅值得拍照。',                        correct: true }, { text: '这家咖啡厅不能拍照。',                correct: false }, { text: '咖啡厅关门了。',                        correct: false }, { text: '这里没有咖啡厅。',                    correct: false }], explain: '해운대 카페 거리' },
    { id: 'd72-l2-m4', audioKo: '파도 소리를 들으니까 마음이 편해져요.',                      choices: [{ text: '听着浪声，心变得平静。',                     correct: true }, { text: '不喜欢浪声。',                        correct: false }, { text: '浪声很吵。',                            correct: false }, { text: '听不见浪声。',                          correct: false }], explain: '~니까 + 편해지다' },
    { id: 'd72-l2-m5', audioKo: '갈매기가 새우깡을 먹어요.',                                  choices: [{ text: '海鸥吃虾条。',                                correct: true }, { text: '海鸥不吃虾条。',                        correct: false }, { text: '海鸥飞走了。',                            correct: false }, { text: '虾条卖完了。',                          correct: false }], explain: '해운대 갈매기 名场面' },
  ],

  cloze: [
    { id: 'd72-l2-c1', audioKo: '해운대는 한번 가 볼 만해요.',        clozeParts: ['해운대는 한번 ', ' 만해요.'],        choices: [{ text: '가 볼',    correct: true }, { text: '가 본',      correct: false }, { text: '가는',      correct: false }, { text: '갔을', correct: false }], explain: 'V + (으)ㄹ 만하다 · 가 보다 → 가 볼' },
    { id: 'd72-l2-c2', audioKo: '이 회는 먹을 만해요.',                clozeParts: ['이 회는 ', ' 만해요.'],              choices: [{ text: '먹을',     correct: true }, { text: '먹은',       correct: false }, { text: '먹는',      correct: false }, { text: '먹어서', correct: false }], explain: '먹다 → 먹을 만하다' },
    { id: 'd72-l2-c3', audioKo: '사진 찍을 만한 카페예요.',            clozeParts: ['사진 ', ' 만한 카페예요.'],           choices: [{ text: '찍을',     correct: true }, { text: '찍은',       correct: false }, { text: '찍는',      correct: false }, { text: '찍어서', correct: false }], explain: '~(으)ㄹ 만한 + N（定语形）' },
    { id: 'd72-l2-c4', audioKo: '갈매기가 새우깡을 먹어요.',           clozeParts: ['갈매기가 새우깡', ' 먹어요.'],         choices: [{ text: '을',       correct: true }, { text: '를',         correct: false }, { text: '이',        correct: false }, { text: '가',   correct: false }], explain: '새우깡 有받침 ㅇ → 을' },
  ],

  reply: [
    { id: 'd72-l2-r1', audioKo: '부산 어디 갈까?',                                              promptZh: 'Junho 问去哪里。你想推荐"海云台值得去一次"，最自然的一句？',                              choices: [{ text: '해운대 한번 가 볼 만해요.',                                          correct: true }, { text: '해운대 가지 마세요.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '~ㄹ 만하다 · 推荐' },
    { id: 'd72-l2-r2', audioKo: '이 회 어때요?',                                                 promptZh: 'Haru 问生鱼片怎么样。你想说"真的值得吃"，最自然的一句？',                              choices: [{ text: '진짜 먹을 만해요.',                                                  correct: true }, { text: '진짜 먹지 마세요.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '먹을 만하다 = 值得吃' },
    { id: 'd72-l2-r3', audioKo: '이 카페 좋아요?',                                              promptZh: '有人问咖啡厅好不好。你想说"是值得拍照的咖啡厅"，最自然的一句？',                        choices: [{ text: '사진 찍을 만한 카페예요.',                                          correct: true }, { text: '사진 찍은 카페예요.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '~ㄹ 만한 + N 定语' },
  ],
};
