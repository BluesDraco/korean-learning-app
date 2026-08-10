import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 63 · 3-3 문법 탐험 · ~아/어 버리다 · 完了 / 不小心……掉了 */
export const day63Grammar: GrammarSubQuestData = {
  day: 3, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '不小心……掉了：~아/어 버리다',

  fix: [
    { id: 'd63-g3-f1', promptKo: '커피를 쏟다 버렸어요.',       promptZh: '"把咖啡洒了"哪句正确？',                    choices: [{ text: '커피를 쏟다 버렸어요.',        correct: false }, { text: '커피를 쏟아 버렸어요.',      correct: true }, { text: '커피를 쏟은 버렸어요.',         correct: false }, { text: '커피를 쏟고 버렸어요.',                correct: false }], explain: '어/아 형 + 버리다 · 쏟다 → **쏟아** + 버리다' },
    { id: 'd63-g3-f2', promptKo: '주스를 마시아 버렸어요.',      promptZh: '"把果汁喝光了"哪句正确？',                  choices: [{ text: '주스를 마시아 버렸어요.',       correct: false }, { text: '주스를 마셔 버렸어요.',       correct: true }, { text: '주스를 마시고 버렸어요.',          correct: false }, { text: '주스를 마신 버렸어요.',                correct: false }], explain: '마시 + 어 → **마셔** · 母音缩合' },
    { id: 'd63-g3-f3', promptKo: '숙제를 다 해서 버렸어요.',     promptZh: '"作业都做完了"哪句正确？',                   choices: [{ text: '숙제를 다 해서 버렸어요.',       correct: false }, { text: '숙제를 다 해 버렸어요.',      correct: true }, { text: '숙제를 다 하고 버렸어요.',          correct: false }, { text: '숙제를 다 하아 버렸어요.',              correct: false }], explain: '하다 → **해** + 버리다（不是 해서）· 해 버리다 = 索性做完' },
    { id: 'd63-g3-f4', promptKo: '기차가 떠나 버렸어요.',        promptZh: '"火车（可惜地）开走了"哪句正确？',           choices: [{ text: '기차가 떠나 버렸어요.',          correct: true }, { text: '기차가 떠나고 버렸어요.',      correct: false }, { text: '기차가 떠나서 버렸어요.',           correct: false }, { text: '기차가 떠난 버렸어요.',                 correct: false }], explain: '떠나다 → **떠나** + 버리다（무 받침 어/아 → 아）' },
    { id: 'd63-g3-f5', promptZh: '关于「~아/어 버리다」的语感，哪句最准确？', choices: [{ text: '① 完全 / 彻底 结束 ② 遗憾 / 后悔 ③ 干脆索性 · 说话人有情绪评价',                 correct: true }, { text: '完全没有情绪',       correct: false }, { text: '只用于开心的情况',       correct: false }, { text: '只用于书面语',              correct: false }], explain: '핵심은 情绪化 + 完了感 · Day 63 主题 = 遗憾 / 洒了' },
  ],

  compose: [
    { id: 'd63-g3-c1', zhHint: '把咖啡洒了。',                   audioKo: '커피를 쏟아 버렸어요.',             answer: ['커피를', '쏟아 버렸어요.'],                 tokens: ['커피를', '쏟아 버렸어요.', '쏟다', '쏟은', '쏟고', '커피가', '쏟았어요.'],                              explain: '쏟다 → 쏟아 + 버리다' },
    { id: 'd63-g3-c2', zhHint: '把果汁喝光了。',                  audioKo: '주스를 다 마셔 버렸어요.',           answer: ['주스를', '다', '마셔 버렸어요.'],           tokens: ['주스를', '다', '마셔 버렸어요.', '마시아', '마시고', '마신', '마셨어요.'],                              explain: '마시 + 어 → 마셔' },
    { id: 'd63-g3-c3', zhHint: '把作业都做完了。',                audioKo: '숙제를 다 해 버렸어요.',             answer: ['숙제를', '다', '해 버렸어요.'],             tokens: ['숙제를', '다', '해 버렸어요.', '해서', '하아', '한', '했어요.'],                                          explain: '하다 → 해 + 버리다' },
    { id: 'd63-g3-c4', zhHint: '火车（可惜地）开走了。',           audioKo: '기차가 떠나 버렸어요.',              answer: ['기차가', '떠나 버렸어요.'],                  tokens: ['기차가', '떠나 버렸어요.', '떠나고', '떠나서', '떠난', '떠났어요.'],                                    explain: '떠나 + 버리다 = 遗憾开走' },
  ],

  rule: [
    { id: 'd63-g3-r1', promptZh: '关于「~아/어 버리다」的基本用法，哪句最准确？',       choices: [{ text: 'V 어/아 形 + **버리다** · 表达"（干脆）……掉了" · 带完了 / 情绪评价', correct: true }, { text: 'V 词干 + 버리다',       correct: false }, { text: 'V + 서 버리다',          correct: false }, { text: 'V + 고 버리다',                 correct: false }], explain: '어/아 + 버리다（不是词干直接接）' },
    { id: 'd63-g3-r2', promptZh: '关于「~아/어 버리다」的三种情绪，哪句最准确？',        choices: [{ text: '① 遗憾（쏟아 버렸어요）② 干脆索性（해 버려）③ 完全彻底（잊어 버렸어요）', correct: true }, { text: '只有一种情绪',           correct: false }, { text: '只用于开心',              correct: false }, { text: '只用于命令',                correct: false }], explain: '情绪由上下文决定' },
    { id: 'd63-g3-r3', promptZh: '关于「하다 动词」，哪句最准确？',                       choices: [{ text: '하다 → **해** 버리다 · 하다 = 해요体缩合 · 하아 버리다 (X)',  correct: true }, { text: '하다 → 하아 버리다',       correct: false }, { text: '하다 → 하 버리다',         correct: false }, { text: '하다 → 하고 버리다',         correct: false }], explain: '하다 特殊变形 → 해' },
    { id: 'd63-g3-r4', promptZh: '关于「~아/어 버리다 vs ~았/었어요」，哪句最准确？',    choices: [{ text: '~아/어 버리다 = 有情绪的完了 · ~았/었어요 = 中性过去 · 语感差别',    correct: true }, { text: '两者完全一样',           correct: false }, { text: '~아/어 버리다 是敬语',      correct: false }, { text: '~아/어 버리다 只用于命令',   correct: false }], explain: '情绪化 vs 中性' },
  ],
};
