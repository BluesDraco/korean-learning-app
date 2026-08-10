import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 66 · 3-3 문법 탐험 · ~기만 하다 / N + 만 · 光……不…… */
export const day66Grammar: GrammarSubQuestData = {
  day: 6, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '光……不……：~기만 하다 / N + 만',

  fix: [
    { id: 'd66-g3-f1', promptKo: '멍하게만 하고 아무것도 안 해요.',      promptZh: '"光发呆什么也不做"哪句正确？',                     choices: [{ text: '멍하게만 하고 아무것도 안 해요.',           correct: false }, { text: '멍하기만 하고 아무것도 안 해요.', correct: true }, { text: '멍하는 것만 하고 아무것도 안 해요.',    correct: false }, { text: '멍해서만 하고 아무것도 안 해요.',              correct: false }], explain: 'V 词干 + **기만 하다** · 멍하다 → 멍하기만' },
    { id: 'd66-g3-f2', promptKo: '겉모습을 보만 이력서는 안 봐요.',       promptZh: '"光看外表不看简历"哪句正确？',                     choices: [{ text: '겉모습을 보만 이력서는 안 봐요.',             correct: false }, { text: '겉모습만 보고 이력서는 안 봐요.', correct: true }, { text: '겉모습을만 보고 이력서는 안 봐요.',      correct: false }, { text: '겉모습이 봐서 이력서는 안 봐요.',              correct: false }], explain: 'N + **만**（不带宾语助词）+ V + 고 · 光 N 只 V' },
    { id: 'd66-g3-f3', promptKo: '체형를만 봐요.',                        promptZh: '"光看体型"哪句正确？',                              choices: [{ text: '체형를만 봐요.',                              correct: false }, { text: '체형만 봐요.',                    correct: true }, { text: '체형이만 봐요.',                          correct: false }, { text: '체형에만 봐요.',                                correct: false }], explain: 'N + **만**（~만 后不再加 을/를）' },
    { id: 'd66-g3-f4', promptKo: '이력서를 보지 않기만 하고 판단했어요.',  promptZh: '"光是不看简历就下判断了"哪句正确？',              choices: [{ text: '이력서를 보지 않기만 하고 판단했어요.',       correct: true }, { text: '이력서를 안 보만 판단했어요.',    correct: false }, { text: '이력서를 안 보게만 판단했어요.',       correct: false }, { text: '이력서를 안 보서 판단했어요.',                  correct: false }], explain: '~지 않다 → ~지 않기만 하다（否定形 + 기만 하다）' },
    { id: 'd66-g3-f5', promptZh: '关于「N + 만 vs V + 기만 하다」的差别，哪句最准确？',                                                                                                                                                                                              choices: [{ text: 'N + **만** = 只 N（体型、外貌）· V + **기만 하다** = 光是 V（不做别的）· 두 개는 后接하는 词性 다름', correct: true }, { text: '两者完全一样',      correct: false }, { text: 'N + 만 是过去',           correct: false }, { text: 'V + 기만 하다 是命令',          correct: false }], explain: '两者用于不同词性 · 都是"只 X 不 Y"框架' },
  ],

  compose: [
    { id: 'd66-g3-c1', zhHint: '（他）光看外表不看简历。',            audioKo: '겉모습만 보고 이력서는 안 봐요.',       answer: ['겉모습만', '보고', '이력서는', '안', '봐요.'],   tokens: ['겉모습만', '보고', '이력서는', '안', '봐요.', '겉모습을', '봐서', '이력서가', '안 봤어요.'],       explain: 'N + 만 + V + 고' },
    { id: 'd66-g3-c2', zhHint: '光发呆什么都不做。',                    audioKo: '멍하기만 하고 아무것도 안 해요.',        answer: ['멍하기만', '하고', '아무것도', '안', '해요.'],     tokens: ['멍하기만', '하고', '아무것도', '안', '해요.', '멍하게만', '멍해서', '아무거나', '해요.'],           explain: 'V + 기만 하다' },
    { id: 'd66-g3-c3', zhHint: '光看体型，能力不重要吗？',              audioKo: '체형만 보면 능력은 안 중요해요?',        answer: ['체형만', '보면', '능력은', '안', '중요해요?'],     tokens: ['체형만', '보면', '능력은', '안', '중요해요?', '체형를만', '봐서', '능력이', '중요해요.'],         explain: 'N + 만 + 조건 ~면 → 反问' },
    { id: 'd66-g3-c4', zhHint: '光有偏见什么都不看。',                  audioKo: '편견만 있고 아무것도 안 봐요.',           answer: ['편견만', '있고', '아무것도', '안', '봐요.'],       tokens: ['편견만', '있고', '아무것도', '안', '봐요.', '편견이', '있어서', '아무거나', '봐요.'],             explain: 'N + 만 있고 + 否定' },
  ],

  rule: [
    { id: 'd66-g3-r1', promptZh: '关于「N + 만」，哪句最准确？',                              choices: [{ text: 'N + **만** = 只 N · **不再接 을/를 / 이/가**（覆盖宾格 / 主格）· 체형만 봐요 (O) / 체형을만 봐요 (X)',        correct: true }, { text: 'N + 만 = 只用 N · 后可加 을/를', correct: false }, { text: 'N + 만 是命令',        correct: false }, { text: 'N + 만 只用于过去',       correct: false }], explain: '~만 是特殊助词 · 覆盖 을/를' },
    { id: 'd66-g3-r2', promptZh: '关于「V + 기만 하다」，哪句最准确？',                        choices: [{ text: 'V 词干 + **기만 하다** = 光是 V（不做别的）· 常和"아무것도 안 V"配合成对比句', correct: true }, { text: 'V + **게만** 하다',         correct: false }, { text: 'V + **서만** 하다',        correct: false }, { text: 'V + **은** 기만 하다',        correct: false }], explain: 'V 기만 하다 = 光是 V' },
    { id: 'd66-g3-r3', promptZh: '关于两者的语用，哪句最准确？',                              choices: [{ text: '常用来**批评 / 抱怨** "光 X 不 Y" · Day 66 主题 = 光看体型不看能力',         correct: true }, { text: '用来表扬',              correct: false }, { text: '中性描述',              correct: false }, { text: '用于问候',                  correct: false }], explain: '语用 → 表达不满 / 批评' },
    { id: 'd66-g3-r4', promptZh: '关于「否定形 + 기만 하다」，哪句最准确？',                    choices: [{ text: '~**지 않기만 하다** = 光是不 V · 이력서를 보지 않기만 하고 판단했어요',      correct: true }, { text: '~안 V만 하다',            correct: false }, { text: '~못 V만 하다',            correct: false }, { text: '~V 기만 안 하다',              correct: false }], explain: '否定形 → ~지 않기만 하다' },
  ],
};
