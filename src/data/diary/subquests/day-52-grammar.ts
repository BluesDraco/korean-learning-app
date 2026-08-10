import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 52 · 2-3 문법 탐험 · ~아/어서 深化 · 因果 vs 动作先后 */
export const day52Grammar: GrammarSubQuestData = {
  day: 22, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '~아/어서 深化：因果 · 动作先后',

  fix: [
    { id: 'd52-g3-f1', promptKo: '숨차니까 말을 못 하겠어.',              promptZh: '"喘不上气说不了话"哪句更自然？',            choices: [{ text: '숨차니까 말을 못 하겠어.',                correct: false }, { text: '숨차서 말을 못 하겠어.',       correct: true }, { text: '숨차 말을 못 하겠어.',                  correct: false }, { text: '숨차고 말을 못 하겠어.',                 correct: false }], explain: '状态 → 结果 · 用 ~아/어서（~니까 更强调判断）' },
    { id: 'd52-g3-f2', promptKo: '펜을 주우고 다시 뛰었어요.',              promptZh: '"捡起笔然后又跑了起来"最自然的一句？',            choices: [{ text: '펜을 주우고 다시 뛰었어요.',                correct: false }, { text: '펜을 주워서 다시 뛰었어요.',   correct: true }, { text: '펜을 주웠어서 다시 뛰었어요.',            correct: false }, { text: '펜을 줍으니까 다시 뛰었어요.',               correct: false }], explain: '동작 순서 → ~아/어서（줍다 ㅂ 不规则 → 주워）' },
    { id: 'd52-g3-f3', promptKo: '뛰어서 늦지 않았어요.',                    promptZh: '"跑了所以没迟到"哪句正确？',                choices: [{ text: '뛰었어서 늦지 않았어요.',                   correct: false }, { text: '뛰어서 늦지 않았어요.',         correct: true }, { text: '뛰고서 늦지 않았어요.',                    correct: false }, { text: '뛰어야 늦지 않았어요.',                    correct: false }], explain: '时态放句尾 · ~아/어서 前不接过去时' },
    { id: 'd52-g3-f4', promptKo: '비가 와서 우산 가져가세요.',              promptZh: '"下雨了请带伞"哪句正确？',                choices: [{ text: '비가 와서 우산 가져가세요.',                 correct: false }, { text: '비가 오니까 우산 가져가세요.',   correct: true }, { text: '비가 오면 우산 가져가세요.',              correct: false }, { text: '비가 오지만 우산 가져가세요.',              correct: false }], explain: '后半句是命令 → 必须用 ~(으)니까（Day 32 pitfall）' },
    { id: 'd52-g3-f5', promptKo: '~아/어서 뒤에 명령이 올 수 있어요.',        promptZh: '关于「~아/어서」后接结构，哪句最准确？',      choices: [{ text: '~아/어서 뒤에 명령이 올 수 있어요.',          correct: false }, { text: '~아/어서 뒤엔 **陈述/感叹/기술**만 · 命令/建议은 ~(으)니까', correct: true }, { text: '~아/어서 뒤엔 명사만 옵니다.',                       correct: false }, { text: '~아/어서 뒤엔 반드시 미래시제.',                        correct: false }], explain: 'Day 32 pitfall 重申 · 后接命令 → ~(으)니까' },
  ],

  compose: [
    { id: 'd52-g3-c1', zhHint: '喘不上气说不了话。',                     audioKo: '숨차서 말을 못 하겠어.',                       answer: ['숨차서', '말을', '못', '하겠어.'],                      tokens: ['숨차서', '말을', '못', '하겠어.', '숨차니까', '말이', '하고', '하겠어요.'],                            explain: '状态 → 结果 · ~아/어서' },
    { id: 'd52-g3-c2', zhHint: '捡起笔然后又跑了起来。',                 audioKo: '펜을 주워서 다시 뛰었어요.',                    answer: ['펜을', '주워서', '다시', '뛰었어요.'],                  tokens: ['펜을', '주워서', '다시', '뛰었어요.', '주우고', '주웠어서', '뛰어서', '펜이'],                          explain: '动作先后 · ~아/어서 · 줍다 → 주워' },
    { id: 'd52-g3-c3', zhHint: '跑了所以没迟到。',                       audioKo: '뛰어서 늦지 않았어요.',                          answer: ['뛰어서', '늦지', '않았어요.'],                          tokens: ['뛰어서', '늦지', '않았어요.', '뛰었어서', '뛰니까', '늦어서', '늦었어요.'],                          explain: '~아/어서 前不接过去时' },
    { id: 'd52-g3-c4', zhHint: '下雨了请带伞。',                         audioKo: '비가 오니까 우산 가져가세요.',                   answer: ['비가', '오니까', '우산', '가져가세요.'],                tokens: ['비가', '오니까', '우산', '가져가세요.', '와서', '오면', '왔으니까', '가져가요.'],                    explain: '命令 → ~(으)니까' },
  ],

  rule: [
    { id: 'd52-g3-r1', promptZh: '关于「~아/어서 因果 vs 动作先后」，哪句最准确？', choices: [{ text: '~아/어서 有两个用法：**因果**（숨차서 말 못 함）+ **동작 순서**（주워서 뛰다）· 语境决定', correct: true }, { text: '~아/어서 只表因果',       correct: false }, { text: '~아/어서 只表动作先后',    correct: false }, { text: '두 개는 완전히 다른 문법', correct: false }], explain: '语境判断 · 一形两义' },
    { id: 'd52-g3-r2', promptZh: '关于「~아/어서 前面时态」的规则，哪句最准确？',   choices: [{ text: '~아/어서 前面**永远原形**（不加았/었）· 时态放**句尾**', correct: true }, { text: '~아/어서 前必须过去时',       correct: false }, { text: '~아/어서 前必须未来时',    correct: false }, { text: '~아/어서 前可任意时态',         correct: false }], explain: '❌ 왔어서 → ✅ 와서 · Day 32 pitfall' },
    { id: 'd52-g3-r3', promptZh: '关于「~아/어서 vs ~(으)니까」的差别，哪句最准确？', choices: [{ text: '~아/어서 后不能接**命令/建议**；~(으)니까 可以 · "비가 오니까 우산 가져가세요"', correct: true }, { text: '两者完全一样',        correct: false }, { text: '~(으)니까 是过去',      correct: false }, { text: '~아/어서 只用于书面语',   correct: false }], explain: '后接命令 → ~(으)니까' },
    { id: 'd52-g3-r4', promptZh: '关于「动作先后 ~아/어서 vs ~고」的差别，哪句最准确？', choices: [{ text: '~아/어서 = **同一主体 + 前后有连贯性**（주워서 뛰었어요）· ~고 = 简单列举', correct: true }, { text: '两者完全一样',       correct: false }, { text: '~아/어서 只用于形容词',   correct: false }, { text: '~고 是过去时',       correct: false }], explain: '주워서 뛰었어요（连贯）vs 밥 먹고 잤어요（列举）' },
  ],
};
