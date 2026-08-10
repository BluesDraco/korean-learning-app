import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 44 · 2-2 귀 트이기 · ~았/었으면 좋겠어요 愿望 */
export const day44Listen: ListenSubQuestData = {
  day: 14, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '兽尔江毯子上的每一句希望',

  meaning: [
    { id: 'd44-l2-m1', audioKo: '이 하루가 영원히 계속됐으면 좋겠어.',   choices: [{ text: '这一天要是能永远持续就好了。',    correct: true }, { text: '这一天永远不会持续。',              correct: false }, { text: '希望明天早点来。',                    correct: false }, { text: '要一直忙下去。',                    correct: false }], explain: 'Tori 原句 · ~았/었으면 좋겠어' },
    { id: 'd44-l2-m2', audioKo: '불가능하지만, 기억은 남아요.',             choices: [{ text: '虽然不可能，但记忆会留下。',      correct: true }, { text: '不可能留下记忆。',                    correct: false }, { text: '要留下所有可能。',                    correct: false }, { text: '记忆没什么用。',                      correct: false }], explain: 'Haru 原句 · ~지만 转折 + 남다' },
    { id: 'd44-l2-m3', audioKo: '이 순간도 이미 기억이 됐어요.',             choices: [{ text: '这一刻已经是记忆了。',            correct: true }, { text: '这个瞬间还在继续。',                    correct: false }, { text: '这一刻会消失。',                        correct: false }, { text: '记忆已经没了。',                        correct: false }], explain: 'Haru 原句 · 시간의 이중성' },
    { id: 'd44-l2-m4', audioKo: '한국어를 잘했으면 좋겠어요.',              choices: [{ text: '要是能说好韩语就好了。',          correct: true }, { text: '韩语已经说得很好。',                    correct: false }, { text: '韩语不想学。',                          correct: false }, { text: '韩语难学不来。',                        correct: false }], explain: '留学生最常表达的愿望' },
    { id: 'd44-l2-m5', audioKo: '내일 비가 안 왔으면 좋겠어요.',            choices: [{ text: '要是明天不下雨就好了。',          correct: true }, { text: '明天肯定会下雨。',                    correct: false }, { text: '明天下雨也没关系。',                    correct: false }, { text: '希望明天下雨。',                        correct: false }], explain: '否定 안 + 왔으면 · 未来愿望用过去形' },
  ],

  cloze: [
    { id: 'd44-l2-c1', audioKo: '계속됐으면 좋겠어요.',        clozeParts: ['계속', ' 좋겠어요.'],         choices: [{ text: '됐으면', correct: true }, { text: '되면', correct: false }, { text: '됐고', correct: false }, { text: '됐으니까', correct: false }], explain: '~았/었으면 + 좋겠어요 = 温柔的愿望' },
    { id: 'd44-l2-c2', audioKo: '한국어를 잘했으면 좋겠어요.',   clozeParts: ['한국어를 ', ' 좋겠어요.'],   choices: [{ text: '잘했으면', correct: true }, { text: '잘하면', correct: false }, { text: '잘해서', correct: false }, { text: '잘하겠', correct: false }], explain: '잘하다 → 잘했 + 으면' },
    { id: 'd44-l2-c3', audioKo: '내일 비가 안 왔으면 좋겠어요.', clozeParts: ['내일 비가 안 ', ' 좋겠어요.'], choices: [{ text: '왔으면', correct: true }, { text: '오면', correct: false }, { text: '오았으면', correct: false }, { text: '온으면', correct: false }], explain: '오다 → 왔 + 으면 · 否定 안 放动词前' },
    { id: 'd44-l2-c4', audioKo: '가족이 건강했으면 좋겠어요.',   clozeParts: ['가족이 ', ' 좋겠어요.'],     choices: [{ text: '건강했으면', correct: true }, { text: '건강하면', correct: false }, { text: '건강해서', correct: false }, { text: '건강했고', correct: false }], explain: '건강하다 → 건강했 + 으면' },
  ],

  reply: [
    { id: 'd44-l2-r1', audioKo: '이 순간도 이미 기억이 됐어요.',            promptZh: 'Haru 说"这一刻已经是记忆了"。你想承诺好好记住，最自然的一句？',    choices: [{ text: '그럼 잘 기억할게요.',                              correct: true }, { text: '그럼 잊어버릴게요.',                       correct: false }, { text: '기억은 필요 없어요.',                    correct: false }, { text: '얼마예요?',                          correct: false }], explain: 'Tori 原句 · 承诺形 ~할게요' },
    { id: 'd44-l2-r2', audioKo: '한국에서 뭐가 제일 바래?',                promptZh: '有人问你在韩国最希望什么。你想说"要是能说好韩语就好了"，最自然的一句？', choices: [{ text: '한국어를 잘했으면 좋겠어.',                        correct: true }, { text: '한국어를 잘하면 됐어.',                    correct: false }, { text: '한국어가 어려워.',                          correct: false }, { text: '한국어가 있어요.',                          correct: false }], explain: '~았/었으면 좋겠어 表愿望' },
    { id: 'd44-l2-r3', audioKo: '내일 비 온대. 어떡해?',                    promptZh: '朋友说明天要下雨。你想温柔地说"要是不下就好了"，最自然的一句？',   choices: [{ text: '비가 안 왔으면 좋겠어.',                            correct: true }, { text: '비가 오지 마.',                              correct: false }, { text: '비가 안 오면 됐어.',                        correct: false }, { text: '얼마예요?',                              correct: false }], explain: '~았/었으면 좋겠어 表未来愿望' },
  ],
};
