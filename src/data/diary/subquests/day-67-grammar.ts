import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 67 · 3-3 문법 탐험 · ~(으)ㄹ 텐데 · 推测 + 前提 */
export const day67Grammar: GrammarSubQuestData = {
  day: 7, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '应该……吧：~(으)ㄹ 텐데',

  fix: [
    { id: 'd67-g3-f1', promptKo: '곧 도착하는 텐데.',            promptZh: '"她应该马上到吧"哪句正确？',                     choices: [{ text: '곧 도착하는 텐데.',              correct: false }, { text: '곧 도착할 텐데.',                correct: true }, { text: '곧 도착한 텐데.',                        correct: false }, { text: '곧 도착해서 텐데.',                             correct: false }], explain: 'V + **(으)ㄹ** 텐데 · 도착하다 → 도착할' },
    { id: 'd67-g3-f2', promptKo: '벌써 나올 텐데.',                promptZh: '"她应该已经出门了吧"（过去推测）哪句正确？',       choices: [{ text: '벌써 나올 텐데.',                 correct: false }, { text: '벌써 나왔을 텐데.',              correct: true }, { text: '벌써 나오는 텐데.',                     correct: false }, { text: '벌써 나온 텐데.',                              correct: false }], explain: 'V 过去推测 · ~**았/었을** 텐데 = 应该已经 X 了' },
    { id: 'd67-g3-f3', promptKo: '이 시간에 길이 안 좋는 텐데.',   promptZh: '"这么晚路应该不好走吧"哪句正确？',                choices: [{ text: '이 시간에 길이 안 좋는 텐데.',    correct: false }, { text: '이 시간에 길이 안 좋을 텐데.',   correct: true }, { text: '이 시간에 길이 안 좋고 텐데.',        correct: false }, { text: '이 시간에 길이 안 좋아서 텐데.',                correct: false }], explain: 'A + (으)ㄹ 텐데 · 좋다 → 좋을' },
    { id: 'd67-g3-f4', promptKo: '피곤할 텐데 얼른 자.',          promptZh: '"你应该累了吧，快睡"哪句正确？',                   choices: [{ text: '피곤할 텐데 얼른 자.',            correct: true }, { text: '피곤하는 텐데 얼른 자.',        correct: false }, { text: '피곤하은 텐데 얼른 자.',                correct: false }, { text: '피곤해서 텐데 얼른 자.',                       correct: false }], explain: '~(으)ㄹ 텐데 + 后句命令/建议 · 关心用法' },
    { id: 'd67-g3-f5', promptZh: '关于「~(으)ㄹ 텐데」的核心含义，哪句最准确？',                                                                                                                                                                                                              choices: [{ text: '① 推测（应该会 X）② 说话人**站在对方处境上关心**（피곤할 텐데 얼른 자）③ 常带一点"担心 / 顾虑"语感', correct: true }, { text: '完全没有情绪',           correct: false }, { text: '只用于过去',              correct: false }, { text: '只用于命令',                 correct: false }], explain: '~(으)ㄹ 텐데 · 推测 + 关心 双重语义' },
  ],

  compose: [
    { id: 'd67-g3-c1', zhHint: '她应该马上到吧。',            audioKo: '곧 도착할 텐데.',                    answer: ['곧', '도착할 텐데.'],                    tokens: ['곧', '도착할 텐데.', '도착하는', '도착한', '도착했어.', '도착 안 해.'],                              explain: 'V 미래 · ~(으)ㄹ 텐데' },
    { id: 'd67-g3-c2', zhHint: '她应该已经出门了吧。',         audioKo: '벌써 나왔을 텐데.',                   answer: ['벌써', '나왔을 텐데.'],                  tokens: ['벌써', '나왔을 텐데.', '나올', '나오는', '나온', '나갔어.'],                                          explain: 'V 과거 · ~았/었을 텐데' },
    { id: 'd67-g3-c3', zhHint: '这么晚路应该不好走吧。',       audioKo: '이 시간에 길이 안 좋을 텐데.',       answer: ['이 시간에', '길이', '안', '좋을 텐데.'],   tokens: ['이 시간에', '길이', '안', '좋을 텐데.', '좋는', '좋은', '좋아서', '좋아요.'],                        explain: 'A · ~(으)ㄹ 텐데' },
    { id: 'd67-g3-c4', zhHint: '你应该累了吧，快睡。',         audioKo: '피곤할 텐데 얼른 자.',                 answer: ['피곤할 텐데', '얼른', '자.'],             tokens: ['피곤할 텐데', '얼른', '자.', '피곤하는', '피곤해서', '피곤하다', '자세요.'],                          explain: '推测 + 建议 · 관심 사용법' },
  ],

  rule: [
    { id: 'd67-g3-r1', promptZh: '关于「~(으)ㄹ 텐데」的形态，哪句最准确？',                     choices: [{ text: 'V/A 词干 + **(으)ㄹ** 텐데 · 무 받침 ㄹ / 有 받침 을 · 도착하다 → 도착할 텐데 / 좋다 → 좋을 텐데', correct: true }, { text: 'V + 는 텐데',           correct: false }, { text: 'V + 은 텐데',          correct: false }, { text: 'V + 기 텐데',              correct: false }], explain: '(으)ㄹ 텐데 · 未来 / 现在推测' },
    { id: 'd67-g3-r2', promptZh: '关于「过去推测」，哪句最准确？',                                  choices: [{ text: '**~았/었을 텐데** = 应该已经 X 了 · 벌써 나왔을 텐데 = 应该已经出门了吧', correct: true }, { text: '过去用 ~았을 것 같다',       correct: false }, { text: '过去用 ~았는 텐데',        correct: false }, { text: '过去用 ~았기 텐데',            correct: false }], explain: '过去推测 → ~았/었을 텐데' },
    { id: 'd67-g3-r3', promptZh: '关于「~(으)ㄹ 텐데」的语感，哪句最准确？',                        choices: [{ text: '**推测 + 关心 / 顾虑** · 站在对方处境上说话 · 피곤할 텐데 얼른 자 = 你应该累了吧快睡',       correct: true }, { text: '完全客观',              correct: false }, { text: '强烈命令',              correct: false }, { text: '严厉批评',                  correct: false }], explain: '~(으)ㄹ 텐데 = 推测 + 关心' },
    { id: 'd67-g3-r4', promptZh: '关于「~(으)ㄹ 텐데 vs ~(으)ㄹ 것 같다」，哪句最准确？',            choices: [{ text: '两者都表推测 · ~(으)ㄹ 텐데 常带**为对方担心 / 顾虑**的语感，~(으)ㄹ 것 같다 更**中性推测**',   correct: true }, { text: '两者完全一样',            correct: false }, { text: '~(으)ㄹ 텐데 只用于名词',       correct: false }, { text: '~(으)ㄹ 것 같다 只用于命令',       correct: false }], explain: '关心色 vs 中性色' },
  ],
};
