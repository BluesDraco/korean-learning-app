import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 58 · 2-3 문법 탐험 · ~아/어 보니까 · ㄷ 不规则 · vs ~(으)니까 */
export const day58Grammar: GrammarSubQuestData = {
  day: 28, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '试过才发现：~아/어 보니까',

  fix: [
    { id: 'd58-g3-f1', promptKo: '다시 걷으니까 알겠어요.',                promptZh: '"重新走了才明白"哪句正确？',                choices: [{ text: '다시 걷으니까 알겠어요.',                  correct: false }, { text: '다시 걸어보니까 알겠어요.',       correct: true }, { text: '다시 걷보니까 알겠어요.',                correct: false }, { text: '다시 걸어니까 알겠어요.',                   correct: false }], explain: 'ㄷ 不规则 · 걷다 → 걸어 + 보니까' },
    { id: 'd58-g3-f2', promptKo: '먹으니까 진짜 매웠어요.',                  promptZh: '"吃了才发现真的辣"哪句最贴切？',            choices: [{ text: '먹으니까 진짜 매웠어요.',                    correct: false }, { text: '먹어 보니까 진짜 매웠어요.',        correct: true }, { text: '먹으면 진짜 매웠어요.',                    correct: false }, { text: '먹었어서 진짜 매웠어요.',                  correct: false }], explain: '~아/어 보니까 = 尝试后发现 · ~(으)니까 只是"因为"' },
    { id: 'd58-g3-f3', promptKo: '해보니까 열심히 하세요.',                  promptZh: '~아/어 보니까 后接结构，哪句最准确？',       choices: [{ text: '해보니까 열심히 하세요.',                    correct: false }, { text: '~아/어 보니까 뒤엔 **발견/느낌**만 · 명령 X', correct: true }, { text: '~아/어 보니까 뒤엔 命令도 가능.',                     correct: false }, { text: '~아/어 보니까 뒤엔 형용사만.',                          correct: false }], explain: '尝试后**发现**（不是建议）· 命令用 ~(으)세요 单独' },
    { id: 'd58-g3-f4', promptKo: '~아/어 보니까 vs ~(으)니까 는 완전히 같아요.', promptZh: '关于「~아/어 보니까 vs ~(으)니까」，哪句最准确？', choices: [{ text: '완전히 같아요.',                            correct: false }, { text: '~아/어 보니까 = **尝试后发现**（经验型）· ~(으)니까 = **一般原因**（无经验含义）', correct: true }, { text: '~(으)니까 是过去时',                                correct: false }, { text: '~아/어 보니까 是命令形',                                correct: false }], explain: '语义差别 · 걸어 보니까 vs 걸으니까' },
    { id: 'd58-g3-f5', promptKo: '오니까 여기가 진짜 예쁘네요.',              promptZh: '"来了才发现这里真美"哪句更贴切？',           choices: [{ text: '오니까 여기가 진짜 예쁘네요.',              correct: false }, { text: '와보니까 여기가 진짜 예쁘네요.',     correct: true }, { text: '왔어서 여기가 진짜 예쁘네요.',                correct: false }, { text: '오면 여기가 진짜 예쁘네요.',                     correct: false }], explain: '오다 → 와 + 보니까 · 尝试后发现（一般 ~(으)니까 缺经验意）' },
  ],

  compose: [
    { id: 'd58-g3-c1', zhHint: '重新走了才明白。',                    audioKo: '다시 걸어보니까 알겠어요.',                    answer: ['다시', '걸어보니까', '알겠어요.'],                        tokens: ['다시', '걸어보니까', '알겠어요.', '걷으니까', '걸으면', '걸었으니까', '몰라요.'],                          explain: 'Tori 原句 · ㄷ 不规则 + ~아/어 보니까' },
    { id: 'd58-g3-c2', zhHint: '吃了才发现真的辣。',                  audioKo: '먹어 보니까 진짜 매웠어요.',                    answer: ['먹어', '보니까', '진짜', '매웠어요.'],                    tokens: ['먹어', '보니까', '진짜', '매웠어요.', '먹으니까', '먹으면', '매워요.', '매웠어서'],                        explain: '~아/어 보니까 尝试发现' },
    { id: 'd58-g3-c3', zhHint: '同一条路，不同的感觉。',              audioKo: '같은 길인데 다른 느낌이에요.',                  answer: ['같은', '길인데', '다른', '느낌이에요.'],                  tokens: ['같은', '길인데', '다른', '느낌이에요.', '같은데', '길이지만', '느낌이 있어요.', '느낌이 아니에요.'],       explain: '~는데 铺垫 + 명사 판단' },
    { id: 'd58-g3-c4', zhHint: '想对 Day 1 的自己说"没事，会到的"。', audioKo: 'Day 1의 나한테 "괜찮아, 도착해"라고 말하고 싶어요.', answer: ['Day 1의', '나한테', '"괜찮아, 도착해"라고', '말하고', '싶어요.'], tokens: ['Day 1의', '나한테', '"괜찮아, 도착해"라고', '말하고', '싶어요.', '한테서', 'Day 1의 나에게', '말해서', '말했어요.'], explain: '~라고 하다 直接引用' },
  ],

  rule: [
    { id: 'd58-g3-r1', promptZh: '关于「~아/어 보니까」的用法，哪句最准确？', choices: [{ text: 'V + 아/어 보니까 = 尝试后**发现** · 结果句是感受 / 认识 / 惊讶', correct: true }, { text: '~아/어 보니까 是过去时',   correct: false }, { text: '~아/어 보니까 后可接命令',   correct: false }, { text: '~아/어 보니까 只用于书面语', correct: false }], explain: 'Day 43 + Day 32 组合 · 试过才知道' },
    { id: 'd58-g3-r2', promptZh: '关于「~아/어 보니까 vs ~(으)니까」的差别，哪句最准确？', choices: [{ text: '~아/어 보니까 = 试过之后发现（**经验**含义）· ~(으)니까 = 一般原因（因为）· 语义有别', correct: true }, { text: '两者完全一样',      correct: false }, { text: '~(으)니까 只用于形容词',   correct: false }, { text: '~아/어 보니까 是命令形', correct: false }], explain: '걸어 보니까 알겠어요（试着走了才知道）vs 걸으니까 다리가 아파요（因为在走腿疼）' },
    { id: 'd58-g3-r3', promptZh: '关于「~아/어 보니까」后接结构，哪句最准确？', choices: [{ text: '结果句接**发现 / 感受 / 认识**（알겠어요 / 예쁘네요）· 不接命令 / 建议', correct: true }, { text: '可以接命令',       correct: false }, { text: '必须接形容词',    correct: false }, { text: '必须接过去时',    correct: false }], explain: '语义限制 · 发现型的结果句' },
    { id: 'd58-g3-r4', promptZh: '关于 ㄷ 不规则 (걷다) 接 ~아/어 보니까，哪句最准确？', choices: [{ text: '걷다 → **걸어** + 보니까 = 걸어보니까（ㄷ → ㄹ + 아/어）', correct: true }, { text: '걷다 → 걷보니까',       correct: false }, { text: '걷다 → 걷으니까',       correct: false }, { text: '걷다 → 걸으니까 보',    correct: false }], explain: 'ㄷ 不规则 · Day 42 + Day 43 复习' },
  ],
};
