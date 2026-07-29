import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 46 · 2-3 문법 탐험 · ~아/어 주다 · 주다 vs 드리다 · 承诺/请求 */
export const day46Grammar: GrammarSubQuestData = {
  day: 16, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '为___做：~아/어 주다 · 주다 vs 드리다',

  fix: [
    { id: 'd46-g3-f1', promptKo: '앞으로 매년 있을게.',                    promptZh: '"以后每年陪你"（承诺陪伴对方）哪句更自然？',   choices: [{ text: '앞으로 매년 있을게.',                     correct: false }, { text: '앞으로 매년 있어 줄게.',           correct: true }, { text: '앞으로 매년 있어 드릴게.',            correct: false }, { text: '앞으로 매년 있어 봐요.',                correct: false }], explain: '~아/어 **줄게** = 承诺为对方做 · 朋友之间' },
    { id: 'd46-g3-f2', promptKo: '엄마한테 편지를 써줬어요.',                promptZh: '"给妈妈写了信"（长辈）哪句正确？',              choices: [{ text: '엄마한테 편지를 써줬어요.',              correct: false }, { text: '엄마한테 편지를 써드렸어요.',      correct: true }, { text: '엄마한테 편지를 써졌어요.',            correct: false }, { text: '엄마한테 편지를 써 있어요.',              correct: false }], explain: '我给长辈 → **드리다** · 对妈妈用 써드리다' },
    { id: 'd46-g3-f3', promptKo: '한국어 좀 가르쳐 드리세요.',                promptZh: '"请教我一点韩语"（请求他人为我做）哪句正确？', choices: [{ text: '한국어 좀 가르쳐 드리세요.',            correct: false }, { text: '한국어 좀 가르쳐 주세요.',         correct: true }, { text: '한국어 좀 가르치 주세요.',             correct: false }, { text: '한국어 좀 가르쳐요.',                     correct: false }], explain: '请求对方为我做 → **주세요**（不是 드리세요）' },
    { id: 'd46-g3-f4', promptKo: '노래 부르 줘.',                          promptZh: '"给我唱首歌"（반말请求）哪句正确？',            choices: [{ text: '노래 부르 줘.',                          correct: false }, { text: '노래 불러 줘.',                     correct: true }, { text: '노래 불렀 줘.',                        correct: false }, { text: '노래 부르아 줘.',                          correct: false }], explain: '르 不规则 · 부르다 → 불러 + 줘' },
    { id: 'd46-g3-f5', promptKo: '엄마한테 선물을 사줬어요.',                promptZh: '"给妈妈买了礼物"（长辈）哪句正确？',           choices: [{ text: '엄마한테 선물을 사줬어요.',              correct: false }, { text: '엄마한테 선물을 사드렸어요.',      correct: true }, { text: '엄마한테 선물을 사주셨어요.',           correct: false }, { text: '엄마한테서 선물을 사드렸어요.',          correct: false }], explain: '我给长辈 → **사드리다**' },
  ],

  compose: [
    { id: 'd46-g3-c1', zhHint: '以后每年都陪你。',                    audioKo: '앞으로 매년 우리가 같이 있어 줄게.',    answer: ['앞으로', '매년', '우리가', '같이', '있어 줄게.'],     tokens: ['앞으로', '매년', '우리가', '같이', '있어 줄게.', '있을게', '있어 드릴게', '있었어'],                explain: 'Tori 承诺 · ~아/어 줄게' },
    { id: 'd46-g3-c2', zhHint: '给她买了生日蛋糕。',                  audioKo: '생일 케이크를 사줬어요.',                answer: ['생일 케이크를', '사줬어요.'],                          tokens: ['생일 케이크를', '사줬어요.', '사왔어요.', '사드렸어요.', '사고 있어요.'],                              explain: 'V + 아/어 줬어요 过去时' },
    { id: 'd46-g3-c3', zhHint: '请教我一点韩语。',                    audioKo: '한국어 좀 가르쳐 주세요.',                answer: ['한국어', '좀', '가르쳐', '주세요.'],                    tokens: ['한국어', '좀', '가르쳐', '주세요.', '가르치', '가르쳐 드리세요', '가르쳐요'],                       explain: '请求 · ~아/어 주세요' },
    { id: 'd46-g3-c4', zhHint: '给妈妈写了信。',                      audioKo: '엄마한테 편지를 써드렸어요.',            answer: ['엄마한테', '편지를', '써드렸어요.'],                    tokens: ['엄마한테', '편지를', '써드렸어요.', '써줬어요.', '써 있어요.', '써지셨어요.'],                       explain: '我给长辈 → 드리다' },
  ],

  rule: [
    { id: 'd46-g3-r1', promptZh: '关于「~아/어 주다」的用法，哪句最准确？',    choices: [{ text: 'V + 아/어 + 주다 = 主动为对方做 · 承诺 ~줄게 / 请求 ~주세요', correct: true }, { text: '~아/어 주다 是被动',    correct: false }, { text: '~아/어 주다 是过去时',   correct: false }, { text: '~아/어 주다 只用于名词', correct: false }], explain: '施惠句尾 · 表关心的核心' },
    { id: 'd46-g3-r2', promptZh: '关于「주다 vs 드리다」的差别，哪句最准确？', choices: [{ text: '我给**长辈** → **드리다**；给**朋友 / 平辈** → **주다**', correct: true }, { text: '两者完全一样',      correct: false }, { text: '드리다 是过去时',    correct: false }, { text: '주다 用于书面语',    correct: false }], explain: '엄마한테 사드렸어요（O）/ 사줬어요对妈妈（X 失礼）' },
    { id: 'd46-g3-r3', promptZh: '关于「承诺 vs 请求」，哪句最准确？',           choices: [{ text: '承诺 = ~아/어 줄게（요）· 请求 = ~아/어 주세요 · 二者混用即失礼', correct: true }, { text: '两者可任意互换',      correct: false }, { text: '~줄게 是过去承诺',   correct: false }, { text: '~주세요 是命令',      correct: false }], explain: '해줄게 = 我为你做 · 해주세요 = 请为我做' },
    { id: 'd46-g3-r4', promptZh: '关于阴阳元音判定，哪句最准确？',                choices: [{ text: '阳性(ㅏ/ㅗ) → 아 주다；其他 → 어 주다；하다 → 해 주다', correct: true }, { text: '所有词一律 + 아 주다',       correct: false }, { text: '所有词一律 + 어 주다',    correct: false }, { text: '过去时词干用 여 주다',        correct: false }], explain: '사다 → 사 줘 / 먹다 → 먹어 줘 / 하다 → 해 줘' },
  ],
};
