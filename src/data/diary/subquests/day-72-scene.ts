import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 72 · 3-4 상황 속으로 · 해운대 */
export const day72Scene: SceneSubQuestData = {
  day: 12, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '해운대 모래사장 · 갈매기와 파도',

  tasks: [
    { type: 'situation', id: 'd72-sc-s1', scenario: '朋友问要去哪里。想推荐海云台，哪句最合适？',                                                     choices: [{ ko: '해운대 한번 가 볼 만해요. 진짜 풍경이 좋아요.',                        zh: '海云台值得去一次。风景真的很好。',      correct: true }, { ko: '해운대 가지 마세요.',            zh: '别去海云台。',           correct: false }, { ko: '몰라요.',                          zh: '不知道。',                 correct: false }, { ko: '얼마예요?',                       zh: '多少钱？',            correct: false }], explain: '~ㄹ 만하다 · 推荐' },
    { type: 'situation', id: 'd72-sc-s2', scenario: '在海鲜市场想说"这生鱼片真的值得吃"，哪句最合适？',                                              choices: [{ ko: '이 회는 진짜 먹을 만해요.',                                          zh: '这生鱼片真的值得吃。',              correct: true }, { ko: '이 회는 먹은 만해요.',            zh: '错——形态错。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '먹을 만하다' },
    { type: 'situation', id: 'd72-sc-s3', scenario: 'Haru 想拍照。想推荐"是值得拍照的咖啡厅"，哪句最合适？',                                          choices: [{ ko: '사진 찍을 만한 카페예요.',                                            zh: '是值得拍照的咖啡厅。',              correct: true }, { ko: '사진 찍은 만한 카페예요.',        zh: '错——形态错。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '~ㄹ 만한 + N 定语' },

    { type: 'dialogue', id: 'd72-sc-d1', lines: [{ speaker: '준호',    ko: '부산에서 어디가 좋아?',                zh: '釜山哪里好？' }],  blankSpeaker: '토리', choices: [{ ko: '해운대 한번 가 볼 만해. 풍경이 진짜 좋아.',            correct: true, zh: '海云台值得去一次。风景真的很好。' }, { ko: '싫어, 안 갈래.',       correct: false, zh: '不要。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '반말 + ~ㄹ 만하다' },
    { type: 'dialogue', id: 'd72-sc-d2', lines: [{ speaker: '하루',    ko: '갈매기가 진짜 많네!',                    zh: '海鸥真多！' }], blankSpeaker: '토리', choices: [{ ko: '새우깡 한번 던져 볼 만해. 손 위로 낚아채 가.',            correct: true, zh: '值得扔一根虾条看看。海鸥会从手上叼走。' }, { ko: '몰라, 그냥 왔어.',    correct: false, zh: '不知道。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }], explain: '~아/어 볼 만하다' },
    { type: 'dialogue', id: 'd72-sc-d3', lines: [{ speaker: '하루',    ko: '이 카페 어때?',                          zh: '这家咖啡厅怎么样？' }], blankSpeaker: '토리', choices: [{ ko: '사진 찍을 만한 카페야. 창가 자리 좋아.',                correct: true, zh: '是值得拍照的咖啡厅。窗边座位好。' }, { ko: '싫어, 저리 가.',       correct: false, zh: '走开。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '~ㄹ 만한 + N 定语' },

    { type: 'context', id: 'd72-sc-c1', ko: '해운대 한번 가 볼 만해요.',   promptZh: '这句在推荐场景里的意义，哪句最准确？',                                                                choices: [{ zh: 'Day 72 主题句 · ~(으)ㄹ 만하다 = 值得（客观、克制）· "值得试一下"而非"必去" · Tori 温柔推荐',       correct: true }, { zh: '强制去',          correct: false }, { zh: '不推荐',                correct: false }, { zh: '在骂人',                correct: false }], explain: '克制推荐 · Tori 语气' },
    { type: 'context', id: 'd72-sc-c2', ko: '갈매기가 새우깡을 먹어요.',    promptZh: '这句在海云台场景的意义，哪句最准确？',                                                                    choices: [{ zh: '해운대 名场面 · 갈매기 追着새우깡 · Day 72 情感高点 · Tori 第一次觉得韩国的海也可以温柔',       correct: true }, { zh: '海鸥飞走了',                correct: false }, { zh: '和海无关',                  correct: false }, { zh: '海鸥不吃虾条',                correct: false }], explain: '해운대 名场面' },
  ],
};
