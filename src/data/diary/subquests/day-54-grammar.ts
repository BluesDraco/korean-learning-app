import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 54 · 2-3 문법 탐험 · ~아/어 주세요 请求深化 · vs ~아/어 드릴게요 */
export const day54Grammar: GrammarSubQuestData = {
  day: 24, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '请求 vs 施惠：~아/어 주세요 · ~아/어 드릴게요',

  fix: [
    { id: 'd54-g3-f1', promptKo: '조금 깎으세요.',                          promptZh: '"便宜一点吧"（讨价请求）哪句更自然？',          choices: [{ text: '조금 깎으세요.',                              correct: false }, { text: '조금만 깎아주세요.',                correct: true }, { text: '조금 깎아 드리세요.',                  correct: false }, { text: '조금 깎아 있어요.',                     correct: false }], explain: '请求方"我来做" → 让对方为我做 → ~아/어 **주세요**' },
    { id: 'd54-g3-f2', promptKo: '조금 깎아 드릴게요.',                       promptZh: '~아/어 드릴게요 方向定义，哪句最准确？',        choices: [{ text: '조금 깎아 드릴게요. (对朋友)',                correct: false }, { text: '~아/어 **드리다** = 我给长辈 · 반대 방향 = ~아/어 **받다** X · 请求对方做用 ~아/어 주세요', correct: true }, { text: '~아/어 드리다 = 请对方',                            correct: false }, { text: '~아/어 드리다 = 명령형',                             correct: false }], explain: '드리다 = 我给长辈 · 请求让别人为我做用 주세요' },
    { id: 'd54-g3-f3', promptKo: '진짜 좀만 봐 드리세요.',                    promptZh: '"真的照顾一下"（请求对方照顾我）哪句正确？',    choices: [{ text: '진짜 좀만 봐 드리세요.',                        correct: false }, { text: '진짜 좀만 봐주세요.',                correct: true }, { text: '진짜 좀만 봐 드립니다.',                correct: false }, { text: '진짜 좀만 봐요.',                          correct: false }], explain: '봐주다 = 照顾 · 请对方 → ~아/어 **주세요**' },
    { id: 'd54-g3-f4', promptKo: '한국어 좀 가르쳐 드리세요.',                 promptZh: '"请教我一点韩语"哪句正确？',                    choices: [{ text: '한국어 좀 가르쳐 드리세요.',                    correct: false }, { text: '한국어 좀 가르쳐 주세요.',             correct: true }, { text: '한국어 좀 가르치 주세요.',              correct: false }, { text: '한국어 좀 가르쳐요.',                       correct: false }], explain: 'Day 46 复习 · 请求 → ~아/어 주세요' },
    { id: 'd54-g3-f5', promptKo: '엄마한테 편지를 써 주셨어요.',                 promptZh: '"我给妈妈写了信"（我给长辈）哪句正确？',        choices: [{ text: '엄마한테 편지를 써 주셨어요.',                  correct: false }, { text: '엄마한테 편지를 써 드렸어요.',       correct: true }, { text: '엄마한테 편지를 써 줬어요.',              correct: false }, { text: '엄마한테서 편지를 써 드렸어요.',           correct: false }], explain: '我给长辈 → ~아/어 **드리다**（Day 46 复习）' },
  ],

  compose: [
    { id: 'd54-g3-c1', zhHint: '便宜一点吧。我是学生。',                audioKo: '조금만 깎아주세요. 학생이에요.',              answer: ['조금만', '깎아주세요.', '학생이에요.'],                  tokens: ['조금만', '깎아주세요.', '학생이에요.', '깎으세요.', '깎아 드리세요.', '깎아 있어요.', '학생이니까'],   explain: '讨价起手式 · ~아/어 주세요' },
    { id: 'd54-g3-c2', zhHint: '就 20000 元。真的照顾一下。',           audioKo: '20,000원 딱 있어요. 진짜 좀만 봐주세요.',    answer: ['20,000원', '딱', '있어요.', '진짜', '좀만', '봐주세요.'], tokens: ['20,000원', '딱', '있어요.', '진짜', '좀만', '봐주세요.', '봐 드리세요.', '봐요.', '봐 있어요.'],       explain: '봐주다 = 照顾 · ~아/어 주세요' },
    { id: 'd54-g3-c3', zhHint: '请教我一点韩语。',                      audioKo: '한국어 좀 가르쳐 주세요.',                    answer: ['한국어', '좀', '가르쳐', '주세요.'],                     tokens: ['한국어', '좀', '가르쳐', '주세요.', '가르쳐 드리세요.', '가르쳐요.', '가르치'],                        explain: '请求方向 · 주세요' },
    { id: 'd54-g3-c4', zhHint: '我给妈妈写了信。',                      audioKo: '엄마한테 편지를 써 드렸어요.',                 answer: ['엄마한테', '편지를', '써 드렸어요.'],                    tokens: ['엄마한테', '편지를', '써 드렸어요.', '써 주셨어요.', '써 줬어요.', '써 있어요.', '엄마한테서'],       explain: '我给长辈 → 드리다（Day 46 复习）' },
  ],

  rule: [
    { id: 'd54-g3-r1', promptZh: '关于「~아/어 주세요」的用法，哪句最准确？', choices: [{ text: '请求对方为我做 · 语气比 ~(으)세요 更柔和 · 讨价 / 咨询 / 帮忙 都用', correct: true }, { text: '~아/어 주세요 是命令形',   correct: false }, { text: '~아/어 주세요 是过去时',   correct: false }, { text: '~아/어 주세요 只用于书面语', correct: false }], explain: '깎아주세요 / 가르쳐 주세요 / 봐주세요' },
    { id: 'd54-g3-r2', promptZh: '关于「主어 = 我，주다 vs 드리다」的方向差别，哪句最准确？', choices: [{ text: '我给**长辈** → ~아/어 **드리다** · 我给**朋友** → ~아/어 **주다** · 请对方为我做 → ~아/어 **주세요**（不用 드리세요）', correct: true }, { text: '두 개는 완전히 같아요',           correct: false }, { text: '드리다 = 命令形',           correct: false }, { text: '두 개는 반대 뜻',           correct: false }], explain: 'Day 46 复习 · 讨价场景请对方 → 주세요' },
    { id: 'd54-g3-r3', promptZh: '关于「봐주다」的用法，哪句最准确？',        choices: [{ text: '봐주다 = **照顾 / 通融** · 请对方给点面子 · 讨价 / 求情场景常用', correct: true }, { text: '봐주다 = 看着',       correct: false }, { text: '봐주다 = 监督',       correct: false }, { text: '봐주다 = 试穿',        correct: false }], explain: '~아/어 주다 引申义 · 语境含义' },
    { id: 'd54-g3-r4', promptZh: '关于讨价常用软化词，哪句最准确？',            choices: [{ text: '조금만 / 좀만 = 一点点 · 软化请求 · 讨价必备副词', correct: true }, { text: '조금 = 命令形',       correct: false }, { text: '좀만 是过去时',    correct: false }, { text: '조금만 是敬语',      correct: false }], explain: '让语气不生硬的软化词' },
  ],
};
