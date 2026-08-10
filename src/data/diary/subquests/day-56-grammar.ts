import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 56 · 2-3 문법 탐험 · ~아/어 봤어요 深化 · 짐/집 · N + 이 아니라 N */
export const day56Grammar: GrammarSubQuestData = {
  day: 26, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '也曾经这样：~아/어 봤어요 深化 · N 이 아니라 N',

  fix: [
    { id: 'd56-g3-f1', promptKo: '나도 처음에 실수했어요.',                    promptZh: '"我一开始也犯过（有过）这样的错"（用尝试经验强调）哪句最贴切？',    choices: [{ text: '나도 처음에 실수했어요.',                     correct: false }, { text: '나도 처음에 똑같이 실수해 봤어요.',       correct: true }, { text: '나도 처음에 실수하고 있어요.',              correct: false }, { text: '나도 처음에 실수할 거예요.',                 correct: false }], explain: '~아/어 봤어요 强调"我经验过（安慰对方）"· Day 43 深化' },
    { id: 'd56-g3-f2', promptKo: '"집"이 있으면 "짐"이에요.',                   promptZh: '"不是"집"是"짐"（辨析）哪句最自然？',                              choices: [{ text: '"집"이 있으면 "짐"이에요.',                    correct: false }, { text: '"집"이 아니라 "짐"이에요.',                correct: true }, { text: '"집"라서 "짐"이에요.',                       correct: false }, { text: '"집" 아니고 "짐" 있어요.',                    correct: false }], explain: 'N 이 아니라 N = 辨析 · 明确 A 不是 B 是 C' },
    { id: 'd56-g3-f3', promptKo: '한국 음식을 먹었어요.',                       promptZh: '"我尝过韩国料理"（有经验）哪句最贴切？',                            choices: [{ text: '한국 음식을 먹었어요.',                        correct: false }, { text: '한국 음식을 먹어 봤어요.',                correct: true }, { text: '한국 음식을 먹고 있어요.',                    correct: false }, { text: '한국 음식을 먹을 거예요.',                    correct: false }], explain: '~아/어 봤어요 表尝试经验 · vs 单纯过去（Day 43 复习）' },
    { id: 'd56-g3-f4', promptKo: '나도 처음에 실수해 있었어요.',                  promptZh: '"我一开始也犯过错"哪句正确？',                                      choices: [{ text: '나도 처음에 실수해 있었어요.',                  correct: false }, { text: '나도 처음에 실수해 봤어요.',              correct: true }, { text: '나도 처음에 실수하는 있어요.',                correct: false }, { text: '나도 처음에 실수하고 봤어요.',                correct: false }], explain: '~아/어 봤어요（尝试过去）· 不是 있었어요' },
    { id: 'd56-g3-f5', promptKo: '~아/어 봤어요 vs ~았/었어요 的差别?',           promptZh: '关于「~아/어 봤어요 vs ~았/었어요」的差别，哪句最准确？',           choices: [{ text: '두 개는 완전히 같아요.',                         correct: false }, { text: '~아/어 봤어요 = 尝试经验（曾经有过这个体验）· ~았/었어요 = 单纯做了这件事', correct: true }, { text: '~아/어 봤어요 是现在时',                        correct: false }, { text: '~았/었어요 只用于形容词',                        correct: false }], explain: 'Day 43 复习 · 语用差别' },
  ],

  compose: [
    { id: 'd56-g3-c1', zhHint: '我一开始也一样犯过错。',                  audioKo: '나도 처음에 똑같이 실수해 봤어요.',            answer: ['나도', '처음에', '똑같이', '실수해', '봤어요.'],       tokens: ['나도', '처음에', '똑같이', '실수해', '봤어요.', '실수했어요.', '실수하고', '봐요.'],                     explain: 'Tori 原句 · 安慰新生' },
    { id: 'd56-g3-c2', zhHint: '不是"家"是"行李"。',                        audioKo: '"집"이 아니라 "짐"이에요.',                    answer: ['"집"이', '아니라', '"짐"이에요.'],                     tokens: ['"집"이', '아니라', '"짐"이에요.', '있으면', '라서', '아니고', '가 있어요.'],                              explain: '辨析结构 · N 이 아니라 N' },
    { id: 'd56-g3-c3', zhHint: '只是收音差一个字母。',                    audioKo: '받침 하나 차이예요.',                          answer: ['받침', '하나', '차이예요.'],                            tokens: ['받침', '하나', '차이예요.', '차이가', '차이에서', '두 개', '없어요.'],                                    explain: 'Tori 教新生的一句' },
    { id: 'd56-g3-c4', zhHint: '一起收拾吧。',                            audioKo: '괜찮아요, 같이 정리해요.',                     answer: ['괜찮아요,', '같이', '정리해요.'],                        tokens: ['괜찮아요,', '같이', '정리해요.', '혼자', '정리하고', '정리했어요.', '괜찮았어요.'],                        explain: '~아/어요 邀约' },
  ],

  rule: [
    { id: 'd56-g3-r1', promptZh: '关于「~아/어 봤어요」的用法深化，哪句最准确？',   choices: [{ text: 'V + 아/어 봤어요 = 有过___的经验 · 安慰 / 分享经历时用 · 与 ~았/었어요 语用不同', correct: true }, { text: '~아/어 봤어요 是未来时',   correct: false }, { text: '~아/어 봤어요 只用于形容词',   correct: false }, { text: '~아/어 봤어요 是命令形',      correct: false }], explain: 'Day 43 深化 · 强调经验' },
    { id: 'd56-g3-r2', promptZh: '关于「~아/어 봤어요 vs ~았/었어요」的差别，哪句最准确？', choices: [{ text: '~아/어 봤어요 = 尝试 / 经验（有过这个体验）· ~았/었어요 = 单纯做了 · 语用不同', correct: true }, { text: '两者完全一样',      correct: false }, { text: '~아/어 봤어요 是敬语',   correct: false }, { text: '~았/었어요 只用于书面语', correct: false }], explain: '먹어 봤어요 = 尝过 · 먹었어요 = 吃了' },
    { id: 'd56-g3-r3', promptZh: '关于「N 이 아니라 N」的辨析结构，哪句最准确？',   choices: [{ text: 'N 이 아니라 N = 不是 A 是 B · 有收音加 이(집이 아니라) · 无收音加 가(판다가 아니라)', correct: true }, { text: '두 개는 있어야 해요',      correct: false }, { text: '아니라 是过去时',           correct: false }, { text: '아니라 只用于名词句',      correct: false }], explain: '집이 아니라 짐 · 판다가 아니라 곰' },
    { id: 'd56-g3-r4', promptZh: '关于「Day 3 짐/집 vs Day 56」的意义，哪句最准确？', choices: [{ text: 'Day 3 是 Tori 犯错 · Day 56 是 Tori 教别人 · 语言角色反转', correct: true }, { text: '两天完全一样',           correct: false }, { text: 'Day 56 才是学韩语',       correct: false }, { text: 'Day 3 更难',              correct: false }], explain: '成长故事线 · 从学习者到传授者' },
  ],
};
