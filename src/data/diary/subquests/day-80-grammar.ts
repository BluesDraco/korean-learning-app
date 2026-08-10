import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 80 · 3-3 문법 탐험 · ~아/어 줄게 + ~고 병렬 · 我为你做 + 症状罗列 */
export const day80Grammar: GrammarSubQuestData = {
  day: 20, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（我来为你…）：~아/어 줄게 + ~고 症状罗列',

  fix: [
    { id: 'd80-g3-f1', promptKo: '내가 챙겨줄래.',       promptZh: '"我来照顾你"（对朋友承诺）哪句最自然？',       choices: [{ text: '내가 챙겨줄래.',          correct: false }, { text: '내가 챙겨줄게.',    correct: true }, { text: '내가 챙겨주다.',            correct: false }, { text: '내가 챙겨줄까.',                correct: false }], explain: '主动为对方做的承诺用 **~아/어 줄게**：챙겨주다 → 챙겨줄게（줄래=问自己意愿、줄까=提议，不合"我来"的承诺）' },
    { id: 'd80-g3-f2', promptKo: '머리가 아파고 열이 나요.',       promptZh: '"头疼又发烧"哪句正确？',       choices: [{ text: '머리가 아파고 열이 나요.',          correct: false }, { text: '머리가 아프고 열이 나요.',    correct: true }, { text: '머리가 아프서 열이 나요.',            correct: false }, { text: '머리가 아픈고 열이 나요.',                correct: false }], explain: '并列症状用 **~고**：아프다 → 아프고（词干直接接고，不是 아파고/아픈고）' },
    { id: 'd80-g3-f3', promptKo: '콧물이 나고 열이 나고 머리가 아프다.',       promptZh: '"流鼻涕、发烧、头疼"（向护士说,礼貌体）哪句最自然？',   choices: [{ text: '콧물이 나고 열이 나고 머리가 아프다.',            correct: false }, { text: '콧물이 나고 열이 나고 머리가 아파요.',    correct: true }, { text: '콧물이 나고 열이 나고 머리가 아프요.',        correct: false }, { text: '콧물이 나고 열이 나고 머리가 아픈다.',              correct: false }], explain: '中间用 ~고 罗列，最后收尾用해요体 **아파요**（아프다 으脱落 → 아파요；아프요/아픈다 错）' },
    { id: 'd80-g3-f4', promptKo: '약 먹고 물 많이 마셔.',      promptZh: '"吃药、多喝水"（对朋友的반말叮嘱）哪句正确？',   choices: [{ text: '약 먹서 물 많이 마셔.',         correct: false }, { text: '약 먹고 물 많이 마셔.',      correct: true }, { text: '약 먹은고 물 많이 마셔.',                correct: false }, { text: '약 먹고 물 많이 마시다.',                correct: false }], explain: '先后动作用 ~고：먹고 + 마셔（반말命令 마시다 → 마셔）' },
    { id: 'd80-g3-f5', promptZh: '关于「~아/어 줄게」和「~고 罗列」，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**~아/어 줄게 = 我主动为你做(承诺,对平辈/晚辈) · ~고 = 罗列并列的动作或症状** · 내가 챙겨줄게 / 아프고 열이 나고', correct: true }, { text: '~아/어 줄게 表命令别人',            correct: false }, { text: '~고 表因果',        correct: false }, { text: '~아/어 줄게 是敬语',           correct: false }], explain: '施惠承诺 + 并列罗列' },
  ],

  compose: [
    { id: 'd80-g3-c1', zhHint: '我来照顾你，别担心。',                  audioKo: '내가 챙겨줄게. 걱정 마.',              answer: ['내가', '챙겨줄게.', '걱정', '마.'],                     tokens: ['내가', '챙겨줄게.', '걱정', '마.', '챙겨줄래.', '챙겨주다.', '해요.'],                                  explain: '~아/어 줄게 · 承诺' },
    { id: 'd80-g3-c2', zhHint: '头疼、流鼻涕、发烧。',                  audioKo: '머리가 아프고 콧물이 나고 열이 나요.',          answer: ['머리가', '아프고', '콧물이', '나고', '열이', '나요.'],                   tokens: ['머리가', '아프고', '콧물이', '나고', '열이', '나요.', '아파고', '아파서'],                     explain: '~고 症状罗列' },
    { id: 'd80-g3-c3', zhHint: '吃药、多喝水。',                        audioKo: '약 먹고 물 많이 마셔.',        answer: ['약', '먹고', '물', '많이', '마셔.'],                 tokens: ['약', '먹고', '물', '많이', '마셔.', '먹서', '마시다.', '마실게.'],                 explain: '~고 先后 + 반말 마셔' },
    { id: 'd80-g3-c4', zhHint: '好好睡，明天来医院。',                  audioKo: '푹 자고 내일 병원 오세요.',            answer: ['푹', '자고', '내일', '병원', '오세요.'],                  tokens: ['푹', '자고', '내일', '병원', '오세요.', '자서', '자고요', '올게요.'],                 explain: '~고 + 병상 관용 표현' },
  ],

  rule: [
    { id: 'd80-g3-r1', promptZh: '关于「~아/어 줄게」的用法，哪句最准确？',                                choices: [{ text: '**我主动为对方做某事的承诺(对平辈/晚辈)** · 내가 챙겨줄게 = 我来照顾你', correct: true }, { text: '命令对方为我做',               correct: false }, { text: '询问对方意愿',               correct: false }, { text: '陈述过去的事',                    correct: false }], explain: '施惠承诺' },
    { id: 'd80-g3-r2', promptZh: '关于「症状用 ~고 罗列」，哪句最准确？',                                  choices: [{ text: '**词干 + 고 并列多个症状,最后一个收尾** · 머리가 아프고 콧물이 나고 열이 나요', correct: true }, { text: '症状之间用 ~아서',    correct: false }, { text: '症状之间用 ~지만',      correct: false }, { text: '症状之间用 ~으면',                    correct: false }], explain: '~고 并列罗列' },
    { id: 'd80-g3-r3', promptZh: '关于「아프다」的活용，哪句最准确？',                                    choices: [{ text: '**으 脱落**：아프 + 아요 → 아파요；接 고 时不变 → 아프고', correct: true }, { text: '아프다 → 아프요',            correct: false }, { text: '아프다 → 아픈다',    correct: false }, { text: '아프다 → 아파고',           correct: false }], explain: '으 불규칙' },
    { id: 'd80-g3-r4', promptZh: '关于「~아/어 줄게 vs ~아/어 주세요」，哪句最准确？',                              choices: [{ text: '**~아/어 줄게 = 我为你做(说话人主动) · ~아/어 주세요 = 请你为我做(请求对方)** · 챙겨줄게 vs 챙겨주세요', correct: true }, { text: '两者完全一样',            correct: false }, { text: '~아 줄게 是请求',        correct: false }, { text: '~아 주세요 是承诺',                      correct: false }], explain: '我做 vs 请你做' },
  ],
};
