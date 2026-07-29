import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 73 · 3-4 상황 속으로 · 자갈치 · 활낙지 */
export const day73Scene: SceneSubQuestData = {
  day: 13, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '자갈치 시장 · 활낙지 · 초장',

  tasks: [
    { type: 'situation', id: 'd73-sc-s1', scenario: '和 Junho / Haru 走进市场想说"一到市场就吃生鱼片"，哪句最合适？',                                choices: [{ ko: '시장에 도착하자마자 회를 먹자.',                                        zh: '一到市场就吃生鱼片吧。',              correct: true }, { ko: '시장에 도착해서 안 먹자.',           zh: '错——语义反。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '~자마자' },
    { type: 'situation', id: 'd73-sc-s2', scenario: '尝了活章鱼想惊呼"一吃一口就辣得流泪"，哪句最合适？',                                              choices: [{ ko: '한 입 먹자마자 매워서 눈물이 났어.',                                      zh: '一吃一口就辣得流泪。',              correct: true }, { ko: '한 입 먹은자마자 매워요.',        zh: '错——形态错。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '먹자마자 + 매워서' },
    { type: 'situation', id: 'd73-sc-s3', scenario: 'Haru 说"낙지가 움직여!" 你想说"不敢吞下"，哪句最合适？',                                              choices: [{ ko: '삼키기 무서워. 아직 움직여.',                                            zh: '不敢吞下。还在动。',              correct: true }, { ko: '싫어, 다 삼켰어.',                  zh: '错——语义反。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '~기 무섭다' },

    { type: 'dialogue', id: 'd73-sc-d1', lines: [{ speaker: '상인',    ko: '활낙지 한 접시 어때요?',                zh: '一盘活章鱼怎么样？' }], blankSpeaker: '토리', choices: [{ ko: '네, 한 접시 주세요. 초장도 부탁드려요.',            correct: true, zh: '好，来一盘。醋辣椒酱也麻烦一下。' }, { ko: '싫어요, 안 먹어요.',       correct: false, zh: '不要。' }, { ko: '얼마예요? 몰라요.',       correct: false, zh: '多少钱？不知道。' }, { ko: '움직여요?',           correct: false, zh: '会动吗？' }], explain: '자갈치 点单' },
    { type: 'dialogue', id: 'd73-sc-d2', lines: [{ speaker: '하루',    ko: '토리, 너 먼저 먹어 봐!',                zh: '兔莉，你先吃！' }],   blankSpeaker: '토리', choices: [{ ko: '한 입 먹자마자 매워서 눈물이 났어.',                    correct: true, zh: '一吃一口就辣得流泪。' }, { ko: '몰라, 그냥 왔어.',    correct: false, zh: '不知道。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }], explain: '~자마자 + 매워서' },
    { type: 'dialogue', id: 'd73-sc-d3', lines: [{ speaker: '준호',    ko: '초장에 찍어 봐, 좀 낫대.',               zh: '蘸醋辣椒酱试试，据说好一点。' }], blankSpeaker: '토리', choices: [{ ko: '어, 초장에 찍으니까 조금 나아. 한 번 더 도전!',        correct: true, zh: '哦，蘸酱后好一点。再试一次！' }, { ko: '싫어, 저리 가.',      correct: false, zh: '走开。' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '~니까 + 도전' },

    { type: 'context', id: 'd73-sc-c1', ko: '시장에 도착하자마자 회를 먹었어요.',   promptZh: '这句在市场场景的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 73 主题句 · ~자마자 · "一到就吃"的紧凑感 · Tori 60 天里第一次主动冲向陌生食物',       correct: true }, { zh: '没有吃',          correct: false }, { zh: '在别处吃',       correct: false }, { zh: '和市场无关',                correct: false }], explain: 'Tori 主动性 · 情节高点' },
    { type: 'context', id: 'd73-sc-c2', ko: '낙지가 아직 움직여요.',                promptZh: '这句在自갈치场景的意义，哪句最准确？',                                                                     choices: [{ zh: '활낙지 名场面 · 章鱼未死、切段后仍蠕动 · Day 73 情感冲击点 · Tori 第一次挑战"活着的食物"',       correct: true }, { zh: '章鱼跑了',                correct: false }, { zh: '和章鱼无关',                  correct: false }, { zh: '章鱼很静',                correct: false }], explain: '活낙지 名场面 · Tori 挑战' },
  ],
};
