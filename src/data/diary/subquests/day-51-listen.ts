import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 51 · 2-2 귀 트이기 · 独立 · ~(으)ㄹ 수 있어요 深化 */
export const day51Listen: ListenSubQuestData = {
  day: 21, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '달빛카페 · 一个人的下午',

  meaning: [
    { id: 'd51-l2-m1', audioKo: '오늘 시그니처 음료 하나 주세요.',       choices: [{ text: '来一杯今天的招牌饮品。',        correct: true }, { text: '今天没招牌饮品。',                    correct: false }, { text: '请给我今天的赠品。',                    correct: false }, { text: '请一起点。',                            correct: false }], explain: 'Tori 独立点单 · ~주세요' },
    { id: 'd51-l2-m2', audioKo: '포토카드 랜덤 1장 들어 있어요, 맞죠?',   choices: [{ text: '随机小卡一张对吧？',             correct: true }, { text: '小卡挑一张。',                        correct: false }, { text: '不含小卡。',                            correct: false }, { text: '要买小卡吗？',                          correct: false }], explain: '~죠? 确认询问 · 팬 상용어' },
    { id: 'd51-l2-m3', audioKo: '카드로 결제할게요.',                    choices: [{ text: '我刷卡结账。',                    correct: true }, { text: '现金结账。',                          correct: false }, { text: '不结账了。',                          correct: false }, { text: '请给我一张卡。',                        correct: false }], explain: '~로 = 用 · ~ㄹ게요 承诺 / 意志' },
    { id: 'd51-l2-m4', audioKo: '혼자서 다 할 수 있어요.',                 choices: [{ text: '一个人全能搞定。',               correct: true }, { text: '一个人不太行。',                      correct: false }, { text: '需要别人帮忙。',                      correct: false }, { text: '有人一起做。',                        correct: false }], explain: '혼자서 + ~ㄹ 수 있어요 · 自立表达' },
    { id: 'd51-l2-m5', audioKo: 'Day 23에는 못 했지만, 오늘은 할 수 있어요.', choices: [{ text: 'Day 23 时做不到，今天可以了。', correct: true }, { text: 'Day 23 就能了。',                       correct: false }, { text: '今天做不到。',                          correct: false }, { text: 'Day 23 时最擅长。',                    correct: false }], explain: '~지만 转折 · 成长对比' },
  ],

  cloze: [
    { id: 'd51-l2-c1', audioKo: '혼자서 주문할 수 있어요.',       clozeParts: ['혼자서 주문', ' 수 있어요.'], choices: [{ text: '할',   correct: true }, { text: '하ㄹ',   correct: false }, { text: '하을', correct: false }, { text: '해',   correct: false }], explain: '주문하다 无收音 → ㄹ 수 있어요' },
    { id: 'd51-l2-c2', audioKo: '포카를 뽑을 수 있어요.',         clozeParts: ['포카를 뽑', ' 수 있어요.'],   choices: [{ text: '을',   correct: true }, { text: 'ㄹ',     correct: false }, { text: '아',   correct: false }, { text: '고',   correct: false }], explain: '뽑다 有收音 ㅂ → **을 수 있어요**' },
    { id: 'd51-l2-c3', audioKo: '나 혼자서 다 할 수 있어.',        clozeParts: ['나 ', ' 다 할 수 있어.'],   choices: [{ text: '혼자서', correct: true }, { text: '같이', correct: false }, { text: '함께', correct: false }, { text: '서로', correct: false }], explain: '独立强调 · **혼자서**' },
    { id: 'd51-l2-c4', audioKo: '카드로 결제할게요.',              clozeParts: ['카드', ' 결제할게요.'],       choices: [{ text: '로',   correct: true }, { text: '에서', correct: false }, { text: '을',   correct: false }, { text: '까지', correct: false }], explain: '~로 = 用（手段助词）' },
  ],

  reply: [
    { id: 'd51-l2-r1', audioKo: '오늘 시그니처 음료 뭐 드릴까요?',   promptZh: '店员问要什么。你独立点单，最自然的一句？',                    choices: [{ text: '시그니처 음료 하나 주세요.',                       correct: true }, { text: '몰라요.',                              correct: false }, { text: '얼마예요?',                            correct: false }, { text: '싫어요.',                              correct: false }], explain: 'Tori 独立点单' },
    { id: 'd51-l2-r2', audioKo: '9,500원이에요.',                     promptZh: '店员报价 9500 韩元。你想刷卡结账，最自然的一句？',            choices: [{ text: '카드로 결제할게요.',                                correct: true }, { text: '현금으로 살게요.',                        correct: false }, { text: '싫어요.',                              correct: false }, { text: '몰라요.',                              correct: false }], explain: '~로 + ~ㄹ게요' },
    { id: 'd51-l2-r3', audioKo: '토리, 오늘 카페 잘 갔다 왔어?',      promptZh: '朋友问你今天生咖去得顺利吗。你想说"一个人全搞定了"，最自然的一句？', choices: [{ text: '응, 나 혼자서 다 할 수 있었어.',                    correct: true }, { text: '아니, 아무것도 못 했어.',              correct: false }, { text: '얼마예요?',                            correct: false }, { text: '몰라.',                                correct: false }], explain: '혼자서 + ~ㄹ 수 있었어 = 能独立做到了' },
  ],
};
