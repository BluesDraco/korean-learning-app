import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 71 · 3-4 상황 속으로 · KTX 첫 여행 */
export const day71Scene: SceneSubQuestData = {
  day: 11, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '서울역 → 부산 · KTX 3호차',

  tasks: [
    { type: 'situation', id: 'd71-sc-s1', scenario: '在售票窗口想说"给我一张釜山方向的车票"，哪句最合适？',                                       choices: [{ ko: '부산행 표 한 장 주세요.',                                              zh: '给我一张釜山方向的票。',                correct: true }, { ko: '부산 표 얼마예요?',                zh: '错——只是问价。',           correct: false }, { ko: '몰라요.',                          zh: '不知道。',                 correct: false }, { ko: '싫어요.',                       zh: '不要。',            correct: false }], explain: '地名 + 행 + 表' },
    { type: 'situation', id: 'd71-sc-s2', scenario: '朋友问几点到釜山。想说"2 小时后到达"，哪句最合适？',                                          choices: [{ ko: '2시간 만에 부산에 도착해요.',                                          zh: '2 小时后到达釜山。',              correct: true }, { ko: '2시간 동안 부산에 도착해요.',      zh: '错——语义混。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: 'N + 만에' },
    { type: 'situation', id: 'd71-sc-s3', scenario: '想说"时隔 60 天第一次出首尔"（自我感慨），哪句最合适？',                                       choices: [{ ko: '60일 만에 처음으로 서울을 떠나요.',                                    zh: '时隔 60 天第一次离开首尔。',        correct: true }, { ko: '60일 동안 처음으로 서울에 있어요.', zh: '错——语义反。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '만에 + 처음으로 · Day 71 主题' },

    { type: 'dialogue', id: 'd71-sc-d1', lines: [{ speaker: '역무원',   ko: '어디로 가세요?',                       zh: '去哪里？' }],   blankSpeaker: '토리', choices: [{ ko: '부산행 표 한 장 주세요.',                              correct: true, zh: '给我一张釜山方向的票。' }, { ko: '싫어요, 안 갈래요.',       correct: false, zh: '不要。' }, { ko: '얼마예요? 몰라요.',       correct: false, zh: '多少钱？不知道。' }, { ko: '기차가 뭐예요?',           correct: false, zh: '火车是什么？' }], explain: '窗口买票标准句' },
    { type: 'dialogue', id: 'd71-sc-d2', lines: [{ speaker: '준호',     ko: '언제 도착해?',                          zh: '几点到？' }],   blankSpeaker: '토리', choices: [{ ko: '2시간 만에 부산에 도착해. 진짜 빠르지?',               correct: true, zh: '2 小时后到达釜山。真快吧？' }, { ko: '몰라, 그냥 왔어.',           correct: false, zh: '不知道。' }, { ko: '얼마예요?',              correct: false, zh: '多少钱？' }, { ko: '싫어.',                    correct: false, zh: '不要。' }], explain: '반말 + N 만에' },
    { type: 'dialogue', id: 'd71-sc-d3', lines: [{ speaker: '하루',    ko: '창밖 봐, 바다야!',                       zh: '看窗外，是海！' }], blankSpeaker: '토리', choices: [{ ko: '와, 60일 만에 처음 보는 바다야. 진짜 설레.',            correct: true, zh: '哇，时隔 60 天第一次看到的海。真的很激动。' }, { ko: '싫어, 저리 가.',      correct: false, zh: '走开。' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '만에 + 설레다 · 情绪高点' },

    { type: 'context', id: 'd71-sc-c1', ko: '60일 만에 서울을 떠나요.',   promptZh: '这句在旅行开场中的场景意义，哪句最准确？',                                                              choices: [{ zh: 'Day 71 主题句 · N + 만에 = 时隔 · 60 天首次出首尔 · 情绪 = 期待 + 隐隐不安',       correct: true }, { zh: '60 天里从没离开',          correct: false }, { zh: '要在首尔再待 60 天',       correct: false }, { zh: '和旅行无关',                correct: false }], explain: 'Day 61 → 71 情节升级' },
    { type: 'context', id: 'd71-sc-c2', ko: '창밖으로 바다가 보여요.',    promptZh: '这句在 KTX 场景的意义，哪句最准确？',                                                                     choices: [{ zh: 'KTX 高潮画面 · 60 天里第一次看到韩国的海 · 与 Day 3 "首尔灰蒙蒙的天"呼应 · 情绪转向',       correct: true }, { zh: '窗外一直是海',                correct: false }, { zh: '不喜欢海',                  correct: false }, { zh: '和 KTX 无关',                correct: false }], explain: '视觉转折点' },
  ],
};
