import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 76 · 3-4 상황 속으로 · 여행 归来·旅行的意义 */
export const day76Scene: SceneSubQuestData = {
  day: 16, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: 'KTX 창가 · 여행 후기 · 성장의 순간',

  tasks: [
    { type: 'situation', id: 'd76-sc-s1', scenario: 'Haru 问这次旅行怎么样，你想概括"虽短但学得很浓"，哪句最合适？',                                                     choices: [{ ko: '짧았지만 진하게 많이 배웠어.',                zh: '虽短但学得很浓。', correct: true }, { ko: '짧아서 아무것도 못 배웠어.',            zh: '因为短什么都没学到。（语义反）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '~았지만 + 부사 진하게' },
    { type: 'situation', id: 'd76-sc-s2', scenario: 'Haru 夸你"长大了"，你想说这也有 Haru 的功劳，哪句最合适？',                                     choices: [{ ko: '하루가 옆에 있어줘서 그래.',      zh: '因为 Haru 在身边啊。',              correct: true }, { ko: '내가 원래 큰 사람이야.',                  zh: '我本来就大。（跑题）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '~아 줘서 그래 · 感谢对方' },
    { type: 'situation', id: 'd76-sc-s3', scenario: '想跟 Danielle 感慨"虽累但走得很快乐"，哪句最合适？',                                                      choices: [{ ko: '힘들었지만 즐겁게 걸었어요.',      zh: '虽累但走得很快乐。',              correct: true }, { ko: '힘들지만 즐거워서 걸었어요.',      zh: '错——回顾过去+程度副词要用 힘들었지만 즐겁게。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '~았지만 + 부사' },

    { type: 'dialogue', id: 'd76-sc-d1', lines: [{ speaker: '하루',   ko: '토리, 이번 여행 어땠어?',                zh: '兔莉，这次旅行怎么样？' }], blankSpeaker: '토리', choices: [{ ko: '짧았지만 진하게 배웠어. 진짜 좋았어.',            correct: true, zh: '虽短但学得浓，真的很好。' }, { ko: '짧아서 별로였어.',       correct: false, zh: '因为短所以一般。（语义反）' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。（生硬）' }], explain: '~았지만 + 부사 · 旅行后感' },
    { type: 'dialogue', id: 'd76-sc-d2', lines: [{ speaker: '준호',   ko: '어? 벌써 도착? KTX 진짜 빠르네.',              zh: '欸？到了？KTX 真快。' }],   blankSpeaker: '토리', choices: [{ ko: '응, 빠른 건 KTX만이 아니야. 우리 시간도.',            correct: true, zh: '嗯，快的不只是 KTX，还有我们的时间。' }, { ko: '아니, 아직 안 도착했어.',    correct: false, zh: '不，还没到。（语义反）' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }], explain: '呼应 KTX 到站 · 情感收束' },
    { type: 'dialogue', id: 'd76-sc-d3', lines: [{ speaker: '다니엘', ko: '여행에서 뭘 데려왔어요?',                       zh: '旅行带回了什么？' }], blankSpeaker: '토리', choices: [{ ko: '더 큰 자신을 데려왔어요.',        correct: true, zh: '带回了更大的自己。' }, { ko: '싫어요, 저리 가요.',      correct: false, zh: '走开。' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }], explain: '데려오다 · 诗意回答' },

    { type: 'context', id: 'd76-sc-c1', ko: '짧았지만 진하게 배웠어요.',   promptZh: '这句在旅行归来场景的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 76 旅行后记名句 · ~았/었지만 + 程度副词 · "时间虽短，但学得浓厚"——用一个副词说出感受的密度',       correct: true }, { zh: '抱怨旅行太短',          correct: false }, { zh: '命令别人学习',       correct: false }, { zh: '计划下次旅行',                correct: false }], explain: '过去转折 + 程度副词' },
    { type: 'context', id: 'd76-sc-c2', ko: '토리, 많이 컸다.', promptZh: '这句（Haru 说的）在场景的意义，哪句最准确？',                                                                     choices: [{ zh: '"兔莉，长大很多" · Haru 的一句话是这次旅行真正的纪念品 · 认可 Tori 的独立与成长',       correct: true }, { zh: '说 Tori 长胖了',                correct: false }, { zh: '嫌 Tori 太高',                  correct: false }, { zh: '让 Tori 回去',                correct: false }], explain: '크다 → 컸다 · 成长的认可' },
  ],
};
