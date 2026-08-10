import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 64 · 3-4 상황 속으로 · 打工两周后 */
export const day64Scene: SceneSubQuestData = {
  day: 4, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '곰다방 · 两周后进步',

  tasks: [
    { type: 'situation', id: 'd64-sc-s1', scenario: '想告诉朋友"我变得能一次听完订单了"，最自然的一句？',                       choices: [{ ko: '주문을 다 듣게 됐어.',                         zh: '变得能一次听完订单了。',            correct: true }, { ko: '주문을 다 듣기 됐어.',                zh: '错。',                    correct: false }, { ko: '주문을 다 듣아 됐어.',              zh: '错。',                    correct: false }, { ko: '주문 얼마예요?',                     zh: '订单多少钱？',              correct: false }], explain: 'V + 게 + 되다 · 打工进步' },
    { type: 'situation', id: 'd64-sc-s2', scenario: '碰上方言听不懂，想请客人再慢慢说一遍，最自然的一句？',                     choices: [{ ko: '죄송해요, 다시 한 번만 말씀해 주세요.',        zh: '不好意思，请再慢慢说一遍。',          correct: true }, { ko: '싫어요, 안 들을래요.',             zh: '不要听。',                  correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '打工救命句 · 沿用 Day 63' },
    { type: 'situation', id: 'd64-sc-s3', scenario: '店长夸你进步快，想谦逊说"还差得远但在努力"，最自然的一句？',                  choices: [{ ko: '아직 부족하지만 노력하고 있어요.',              zh: '还差得远，不过在努力。',            correct: true }, { ko: '저는 이미 완벽해요.',                zh: '我已经完美了。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '~지만 + ~고 있어요 · 谦逊表达' },

    { type: 'dialogue', id: 'd64-sc-d1', lines: [{ speaker: '단골 손님', ko: '아이스 아메리카노 톨, 시럽 빼고 얼음 적게요.',              zh: '中杯冰美式，去糖浆，冰少一点。' }], blankSpeaker: '토리', choices: [{ ko: '아이스 아메리카노 톨, 시럽 빼고 얼음 적게요. 확인하겠습니다.', correct: true, zh: '中杯冰美式，去糖浆，冰少。确认一下。' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }, { ko: '얼마예요?',            correct: false, zh: '多少钱？' }, { ko: '싫어요.',            correct: false, zh: '不要。' }], explain: '订单复述 · 熟练后能一次听完' },
    { type: 'dialogue', id: 'd64-sc-d2', lines: [{ speaker: '곰다방 사장',  ko: '진짜 빨리 늘었어. 다른 알바생 3개월 걸린 걸 2주에 했네.', zh: '真的进步快。别人 3 个月的，你 2 周做到了。' }], blankSpeaker: '토리', choices: [{ ko: '아직 부족하지만 노력하고 있어요.',                              correct: true, zh: '还差得远，不过在努力。' }, { ko: '저는 이미 완벽해요.',   correct: false, zh: '我已经完美了。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }], explain: '谦逊回应' },
    { type: 'dialogue', id: 'd64-sc-d3', lines: [{ speaker: '동료 알바생', ko: '주문 다 듣기가 어려워요…',                                  zh: '订单还是听不全……' }], blankSpeaker: '토리', choices: [{ ko: '2주 정도 하면 익숙해지게 될 거예요.',                             correct: true, zh: '两周左右就会熟起来。' }, { ko: '평생 안 될 거예요.',      correct: false, zh: '一辈子都不行。' }, { ko: '얼마예요?',         correct: false, zh: '多少钱？' }, { ko: '몰라요.',        correct: false, zh: '不知道。' }], explain: '~게 되다 未来 · ~ㄹ 거예요' },

    { type: 'context', id: 'd64-sc-c1', ko: '주문을 다 듣게 됐어요.', promptZh: '这句话的场景意义，哪句最准确？',                             choices: [{ zh: '"变得能一次听完订单了" · ~게 되다 = 结果变化 · Day 63 → Day 64 两周进步的具体指标', correct: true }, { zh: '不需要听订单',        correct: false }, { zh: '还是听不懂',            correct: false }, { zh: '订单变简单了',            correct: false }], explain: '~게 되다 · 能力变化' },
    { type: 'context', id: 'd64-sc-c2', ko: '아직 부족하지만 노력하고 있어요.', promptZh: '这句话的场景意义，哪句最准确？',                     choices: [{ zh: '"还差得远，不过在努力" · 韩国职场文化谦逊金句 · Day 33 学过的雏形已长大', correct: true }, { zh: '我已经完美',            correct: false }, { zh: '不想努力',              correct: false }, { zh: '没有差距',                correct: false }], explain: '谦逊表达 · Day 33 → 64 成长' },
  ],
};
