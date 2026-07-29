import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 79 · 3-3 문법 탐험 · 회고+대조 · 그때는 ~았지만 지금은 ~아요 (反事实综合) */
export const day79Grammar: GrammarSubQuestData = {
  day: 19, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（回顾对比·反事实）：그때는 ~았지만 / ~았더라면',

  fix: [
    { id: 'd79-g3-f1', promptKo: 'Day 7 때는 울지만, 오늘은 물어봤어요.',       promptZh: '"Day 7时哭了，但今天问了路"哪句正确？',       choices: [{ text: 'Day 7 때는 울지만, 오늘은 물어봤어요.',          correct: false }, { text: 'Day 7 때는 울었지만, 오늘은 물어봤어요.',    correct: true }, { text: 'Day 7 때는 울더라면, 오늘은 물어봤어요.',            correct: false }, { text: 'Day 7 때는 울면, 오늘은 물어봤어요.',                correct: false }], explain: '回顾过去的对比用 **~았/었지만**：울다 → 울었지만（当时哭了→现在不同）' },
    { id: 'd79-g3-f2', promptKo: '그때 물어봤더라면 안 헤매을 텐데.',       promptZh: '"那时问了的话就不会迷路的"哪句正确？',       choices: [{ text: '그때 물어봤더라면 안 헤매을 텐데.',          correct: false }, { text: '그때 물어봤더라면 안 헤맸을 텐데.',    correct: true }, { text: '그때 물어봤더라면 안 헤매겠 텐데.',            correct: false }, { text: '그때 물어봤더라면 안 헤매 텐데.',                correct: false }], explain: '反事实结果用 **~았/었을 텐데**：헤매다 → 헤맸을 텐데（本该迷路的，但没有）' },
    { id: 'd79-g3-f3', promptKo: '신호가 있으면 좋았을 텐데.',         promptZh: '"（当时）有信号就好了"哪句最自然？',   choices: [{ text: '신호가 있으면 좋았을 텐데.',            correct: false }, { text: '신호가 있었으면 좋았을 텐데.',    correct: true }, { text: '신호가 있어서 좋았을 텐데.',        correct: false }, { text: '신호가 있겠으면 좋았을 텐데.',              correct: false }], explain: '반사실 조건用过去 **있었으면**（있으면=一般条件、있어서=因果，都不对）' },
    { id: 'd79-g3-f4', promptKo: '이제 길 잃어도 안 울어요.',      promptZh: '"现在即使迷路也不哭了"哪句正确？',   choices: [{ text: '이제 길 잃어서 안 울어요.',         correct: false }, { text: '이제 길 잃어도 안 울어요.',      correct: true }, { text: '이제 길 잃으면 안 울어요.',                correct: false }, { text: '이제 길 잃지만 안 울어요.',                correct: false }], explain: '"即使…也…"用 **~아/어도**：잃어도 = 即使迷路（잃어서=因果、잃으면=条件，语义不同）' },
    { id: 'd79-g3-f5', promptZh: '关于反事实三形态「~았/었으면 / ~았/었을 텐데 / ~았/었더라면」，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**三者都表"与过去事实相反的假设"** · ~았으면(좋겠다/좋았을 텐데的条件) · ~았을 텐데(反事实推测结果) · ~았더라면(书面/文学,那时如果…的话) · 强度和语体略不同', correct: true }, { text: '三者表未来计划',            correct: false }, { text: '三者是命令',        correct: false }, { text: '三者完全一样可随意换',           correct: false }], explain: '反事实三形态 · 语义近但语体/强度略不同' },
  ],

  compose: [
    { id: 'd79-g3-c1', zhHint: 'Day 7时哭了，但今天问了路。',                  audioKo: 'Day 7 때는 울었지만, 오늘은 물어봤어요.',              answer: ['Day 7 때는', '울었지만,', '오늘은', '물어봤어요.'],                     tokens: ['Day 7 때는', '울었지만,', '오늘은', '물어봤어요.', '울지만,', '어제는', '물어볼래요.'],                                  explain: '回顾对比 · 그때는 ~았지만 지금은' },
    { id: 'd79-g3-c2', zhHint: '那时问了的话就不会迷路的。',            audioKo: '그때 물어봤더라면 안 헤맸을 텐데.',          answer: ['그때', '물어봤더라면', '안', '헤맸을', '텐데.'],                   tokens: ['그때', '물어봤더라면', '안', '헤맸을', '텐데.', '물어보면', '헤매요.', '헤맬 거예요.'],                     explain: '~았더라면 + ~았을 텐데 · 反事实' },
    { id: 'd79-g3-c3', zhHint: '有信号就好了。',                          audioKo: '신호가 있었으면 좋았을 텐데.',            answer: ['신호가', '있었으면', '좋았을', '텐데.'],                    tokens: ['신호가', '있었으면', '좋았을', '텐데.', '있으면', '신호를', '좋겠어요.'],                     explain: '~았으면 + 좋았을 텐데' },
    { id: 'd79-g3-c4', zhHint: '现在即使迷路也不哭了。',                audioKo: '이제 길 잃어도 안 울어요.',          answer: ['이제', '길', '잃어도', '안', '울어요.'],                  tokens: ['이제', '길', '잃어도', '안', '울어요.', '잃어서', '잃으면', '울었어요.'],                     explain: '~아/어도 + 안 + V · 即使…也' },
  ],

  rule: [
    { id: 'd79-g3-r1', promptZh: '关于「回顾成长的对比框架」，哪句最准确？',                                choices: [{ text: '**"그때는 ~았/었지만, 지금은 ~아요" = 那时…但现在…** · Day 7 때는 울었지만 오늘은 물어봤어요', correct: true }, { text: '两句都用未来时',               correct: false }, { text: '前后必须同一时态',               correct: false }, { text: '只能描述别人',                    correct: false }], explain: '过去对比现在' },
    { id: 'd79-g3-r2', promptZh: '关于「~았/었더라면」，哪句最准确？',                                  choices: [{ text: '**过去词干 + 더라면 = "那时如果…的话"（书面/文学的反事实假设）** · 물어봤더라면 = 那时问了的话', correct: true }, { text: 'V + 더라면 表将来',    correct: false }, { text: '더라면 是命令',      correct: false }, { text: '더라면 表真的发生',                    correct: false }], explain: '过去词干 + 더라면 · 书面反事实' },
    { id: 'd79-g3-r3', promptZh: '关于「~아/어도」，哪句最准确？',                                    choices: [{ text: '**"即使…也…"（让步）** · 길 잃어도 안 울어요 = 即使迷路也不哭', correct: true }, { text: '表因果"因为"',            correct: false }, { text: '表条件"如果"',    correct: false }, { text: '表转折"但是"',           correct: false }], explain: '~아/어도 · 让步' },
    { id: 'd79-g3-r4', promptZh: '关于「반사실 三形态的差别」，哪句最准确？',                              choices: [{ text: '**~았으면(条件·常配좋겠다/좋았을 텐데) · ~았을 텐데(反事实推测结果) · ~았더라면(书面文学) · 都是"与过去相反的假设",语义近**', correct: true }, { text: '三者时态完全不同',            correct: false }, { text: '~았더라면 表将来',        correct: false }, { text: '~았을 텐데 是命令',                      correct: false }], explain: '反事实三形态' },
  ],
};
