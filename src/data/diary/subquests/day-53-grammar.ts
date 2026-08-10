import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 53 · 2-3 문법 탐험 · ~(으)ㄹ게요 承诺 · vs ~(으)ㄹ 거예요 计划 */
export const day53Grammar: GrammarSubQuestData = {
  day: 23, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '承诺我来___：~(으)ㄹ게요',

  fix: [
    { id: 'd53-g3-f1', promptKo: '준호가 살게요.',                        promptZh: '~(으)ㄹ게요 主语规则，哪句正确？',                       choices: [{ text: '준호가 살게요.',                          correct: false }, { text: '주어는 반드시 **나/저** · ~(으)ㄹ게요 는 자신의 승낙만 표현', correct: true }, { text: '주어가 자유롭게 올 수 있어요.',                       correct: false }, { text: '~(으)ㄹ게요 는 형용사에도 붙어요.',                      correct: false }], explain: '~(으)ㄹ게요 只能主语 = 我 · 别人做用 ~(으)ㄹ 거예요' },
    { id: 'd53-g3-f2', promptKo: '내일 갈 거예요. 꼭 만나요!',              promptZh: '承诺赴约（对听众）哪句最自然？',                         choices: [{ text: '내일 갈 거예요.',                          correct: false }, { text: '내일 꼭 갈게요.',                    correct: true }, { text: '내일 가겠어요.',                       correct: false }, { text: '내일 갈까요?',                         correct: false }], explain: '~(으)ㄹ 거예요 = 客观计划 · ~(으)ㄹ게요 = 对听众承诺' },
    { id: 'd53-g3-f3', promptKo: '만들ㄹ게요.',                            promptZh: 'ㄹ 收音 + ~(으)ㄹ게요 哪句正确？',                       choices: [{ text: '만들ㄹ게요.',                            correct: false }, { text: '만들게요.',                        correct: true }, { text: '만들을게요.',                          correct: false }, { text: '만드을게요.',                            correct: false }], explain: 'ㄹ 收音特殊 → 만들다 → **만들게요**（不重复 ㄹ）' },
    { id: 'd53-g3-f4', promptKo: '먹ㄹ게요.',                              promptZh: '"我来吃"（有收音）哪句正确？',                          choices: [{ text: '먹ㄹ게요.',                              correct: false }, { text: '먹을게요.',                         correct: true }, { text: '먹수 있게요.',                          correct: false }, { text: '먹을수요.',                              correct: false }], explain: '먹다 有收音 → **을게요**' },
    { id: 'd53-g3-f5', promptKo: '~(으)ㄹ게요 vs ~(으)ㄹ 거예요 은 완전히 같아요.', promptZh: '~(으)ㄹ게요 vs ~(으)ㄹ 거예요 的差别，哪句最准确？', choices: [{ text: '두 개는 완전히 같아요.',                   correct: false }, { text: '~(으)ㄹ게요 = 对听众承诺 · ~(으)ㄹ 거예요 = 客观计划', correct: true }, { text: '~(으)ㄹ게요 는 과거시제.',                        correct: false }, { text: '~(으)ㄹ 거예요 는 명령형.',                          correct: false }], explain: '承诺 vs 计划 · 语用差' },
  ],

  compose: [
    { id: 'd53-g3-c1', zhHint: '今天我请。',                              audioKo: '오늘은 내가 살게.',                           answer: ['오늘은', '내가', '살게.'],                                tokens: ['오늘은', '내가', '살게.', '샀어.', '살 거야.', '살까?', '내가는', '너희가'],                              explain: 'Tori 承诺请客 · 반말' },
    { id: 'd53-g3-c2', zhHint: '我刷卡结账。',                            audioKo: '카드로 결제할게요.',                          answer: ['카드로', '결제할게요.'],                                    tokens: ['카드로', '결제할게요.', '카드에서', '결제할 거예요.', '결제했어요.', '결제할까요?'],                     explain: '~로 + ~ㄹ게요' },
    { id: 'd53-g3-c3', zhHint: '明天一定去。（承诺）',                    audioKo: '내일 꼭 갈게요.',                              answer: ['내일', '꼭', '갈게요.'],                                    tokens: ['내일', '꼭', '갈게요.', '갔어요.', '갈 거예요.', '갈까요?', '갈'],                                     explain: '承诺 → ~(으)ㄹ게요' },
    { id: 'd53-g3-c4', zhHint: '这个我帮你。',                            audioKo: '이건 내가 도와줄게.',                          answer: ['이건', '내가', '도와줄게.'],                                tokens: ['이건', '내가', '도와줄게.', '도와줄 거야.', '도와줄까?', '도와줬어.', '네가'],                       explain: '반말 承诺' },
  ],

  rule: [
    { id: 'd53-g3-r1', promptZh: '关于「~(으)ㄹ게요」的主语规则，哪句最准确？',  choices: [{ text: '主语**必须是 나/저** · 说话人对听众的承诺', correct: true }, { text: '主语可以是任何人',   correct: false }, { text: '~(으)ㄹ게요 只用于第三人称',    correct: false }, { text: '~(으)ㄹ게요 是过去时',      correct: false }], explain: '❌ 준호가 살게요 → ✅ 준호가 살 거예요' },
    { id: 'd53-g3-r2', promptZh: '关于「~(으)ㄹ게요 vs ~(으)ㄹ 거예요」，哪句最准确？', choices: [{ text: '~(으)ㄹ게요 = **对听众承诺**（有对方）· ~(으)ㄹ 거예요 = **客观计划/预测**（可以第三人称）', correct: true }, { text: '两者完全一样',       correct: false }, { text: '~(으)ㄹ게요 是过去时',   correct: false }, { text: '~(으)ㄹ 거예요 是命令形', correct: false }], explain: '承诺 vs 计划 · 语用差别' },
    { id: 'd53-g3-r3', promptZh: '关于收音判定，哪句最准确？',                     choices: [{ text: '无收音 → **ㄹ게요**（살게요）· 有收音 → **을게요**（먹을게요）· ㄹ 收音特殊直接 + 게요（만들게요）', correct: true }, { text: '所有词一律 + ㄹ게요',    correct: false }, { text: '所有词一律 + 을게요',    correct: false }, { text: '有收音 → ㄹ；无收音 → 을', correct: false }], explain: 'Day 37 收音规则复习' },
    { id: 'd53-g3-r4', promptZh: '关于반말形态，哪句最准确？',                     choices: [{ text: '~(으)ㄹ게（去掉 요）· 朋友 / 平辈之间 · 살게 / 갈게 / 먹을게', correct: true }, { text: '반말用 ~(으)ㄹ까',       correct: false }, { text: '반말用 ~(으)ㄹ 거야',    correct: false }, { text: '~(으)ㄹ게요 没有반말形',    correct: false }], explain: 'Tori 的 살게 / 도와줄게 都是반말' },
  ],
};
