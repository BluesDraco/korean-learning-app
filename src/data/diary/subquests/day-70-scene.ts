import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 70 · 3-4 상황 속으로 · 토론 대회 · Tori vs Danielle */
export const day70Scene: SceneSubQuestData = {
  day: 10, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '대강당 401 · 토론 대회 · 정정당당',

  tasks: [
    { type: 'situation', id: 'd70-sc-s1', scenario: '你是反方一辩，开场要用一句最正式的自介 + 主张。哪句最合适？',                                    choices: [{ ko: '반대편 첫 번째 토론자 토리입니다. 저는 능력이 더 중요하다고 생각합니다.', zh: '反方一辩兔莉。我认为能力更重要。', correct: true }, { ko: '저는 몰라요.',                    zh: '不知道。',             correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '싫어요.',                       zh: '不要。',            correct: false }], explain: '토론 개막 · ~다고 생각합니다' },
    { type: 'situation', id: 'd70-sc-s2', scenario: '你要用一句 ~는 반면 反驳 Danielle。哪句最合适？',                                                choices: [{ ko: '체형은 작은 반면 능력은 커요.',                                        zh: '体型小，另一方面能力大。',        correct: true }, { ko: '체형은 작아서 능력이 없어요.',   zh: '错。',                     correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '~ㄴ 반면 · 反驳金句' },
    { type: 'situation', id: 'd70-sc-s3', scenario: '想说"发音流利，另一方面经验少"（客观地评价 Danielle），哪句最合适？',                            choices: [{ ko: '발음이 유창한 반면 경험이 적어요.',                                    zh: '发音流利，另一方面经验少。',       correct: true }, { ko: '발음이 유창해서 경험이 많아요.', zh: '错。',                     correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '유창한 반면 · A + ㄴ 반면' },

    { type: 'dialogue', id: 'd70-sc-d1', lines: [{ speaker: '사회자',   ko: '반대편 첫 번째 토론자, 시작하세요.', zh: '反方一辩，开始。' }], blankSpeaker: '토리', choices: [{ ko: '네, 시작하겠습니다. 감사합니다.',                              correct: true, zh: '好的，开始。谢谢。' }, { ko: '싫어요, 안 할래요.',       correct: false, zh: '不要。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }], explain: '正式接场 · ~겠습니다' },
    { type: 'dialogue', id: 'd70-sc-d2', lines: [{ speaker: '다니엘',    ko: '체형이 크면 유리해요.',                     zh: '体型大就有利。' }], blankSpeaker: '토리', choices: [{ ko: '체형은 작은 반면 능력은 커요. 실력으로 증명할 수 있어요.',      correct: true, zh: '体型小，另一方面能力强，可以用实力证明。' }, { ko: '몰라요, 그냥 왔어요.',    correct: false, zh: '不知道。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어요.',           correct: false, zh: '不要。' }], explain: '~ㄴ 반면 + 실력으로 증명' },
    { type: 'dialogue', id: 'd70-sc-d3', lines: [{ speaker: '다니엘',    ko: '오늘 토론, 재밌었어요.',                     zh: '今天辩论很有趣。' }], blankSpeaker: '토리', choices: [{ ko: '네, 저도 배웠어요. 다음에도 정정당당하게 해요.',                correct: true, zh: '嗯，我也学到了。下次也堂堂正正地来。' }, { ko: '싫어요, 저리 가.',       correct: false, zh: '走开。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }], explain: '赛后握手 · 정정당당' },

    { type: 'context', id: 'd70-sc-c1', ko: '체형은 작은 반면 능력은 커요.',   promptZh: '这句在辩论中的场景意义，哪句最准确？',                                                                choices: [{ zh: 'Day 70 主题句 · 用 ~ㄴ 반면 对比两个属性 · 反驳"体型至上论" · 无正面否定却站住了立场',      correct: true }, { zh: '能力不重要',          correct: false }, { zh: '体型才重要',                correct: false }, { zh: '和辩论无关',                correct: false }], explain: '主题句 · 对比不否定' },
    { type: 'context', id: 'd70-sc-c2', ko: '실력으로 증명해요.',              promptZh: '这句收束的场景意义，哪句最准确？',                                                                    choices: [{ zh: '"用实力证明" · Day 69 演讲主张 → Day 70 辩论收束 · Tori 的 60 天答卷',                     correct: true }, { zh: '实力不重要',                correct: false }, { zh: '只有实力',                  correct: false }, { zh: '和能力无关',                correct: false }], explain: '实力证明 · 收束句' },
  ],
};
