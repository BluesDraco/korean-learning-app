import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 77 · 3-3 문법 탐험 · ~을/를 ~에 담다 · 把A装进B */
export const day77Grammar: GrammarSubQuestData = {
  day: 17, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（把A装进B）：N을/를 N에 담다',

  fix: [
    { id: 'd77-g3-f1', promptKo: '흐름이 3일에 담았어요.',       promptZh: '"把流程装进3天"哪句正确？',       choices: [{ text: '흐름이 3일에 담았어요.',          correct: false }, { text: '흐름을 3일에 담았어요.',    correct: true }, { text: '흐름에 3일을 담았어요.',            correct: false }, { text: '흐름을 3일이 담았어요.',                correct: false }], explain: '被装的东西(흐름)用 **을/를**，容器(3일)用 **에**：흐름을 3일에 담다' },
    { id: 'd77-g3-f2', promptKo: '마음을 편지가 담았어요.',       promptZh: '"把心意装进信里"哪句正确？',       choices: [{ text: '마음을 편지가 담았어요.',          correct: false }, { text: '마음을 편지에 담았어요.',    correct: true }, { text: '마음이 편지에 담았어요.',            correct: false }, { text: '마음에 편지를 담았어요.',                correct: false }], explain: '마음(内容)을 + 편지(容器)에 담다 · 편지 用 에 不是 가' },
    { id: 'd77-g3-f3', promptKo: '추억을 여행에 담아요.',         promptZh: '"（已经）把回忆装进了这次旅行"哪句最自然？',   choices: [{ text: '추억을 여행에 담아요.',            correct: false }, { text: '추억을 여행에 담았어요.',    correct: true }, { text: '추억을 여행에 담을래요.',        correct: false }, { text: '추억을 여행에 담겠어요.',              correct: false }], explain: '已发生用过去 **담았어요**（담다 → 담았어요）' },
    { id: 'd77-g3-f4', promptKo: '3일에 담기는 흐름이에요.',      promptZh: '"装进3天里的流程"（定语）哪句正确？',   choices: [{ text: '3일에 담기는 흐름이에요.',         correct: false }, { text: '3일에 담긴 흐름이에요.',      correct: true }, { text: '3일에 담을 흐름이에요.',                correct: false }, { text: '3일에 담는 흐름이에요.',                correct: false }], explain: '被动完成定语用 **담긴**（담기다 + ㄴ）：3일에 담긴 흐름 = 装进3天的流程' },
    { id: 'd77-g3-f5', promptZh: '关于「N을/를 N에 담다」的核心，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**内容(을/를) + 容器(에) + 담다(装)** · 흐름을 3일에 담다 · 可用于具体也可用于抽象(마음/추억/감정)', correct: true }, { text: '内容用 에，容器用 을/를',            correct: false }, { text: '담다 只能装具体物品',        correct: false }, { text: '담다 是"取出"',           correct: false }], explain: '内容 을/를 + 容器 에 + 담다' },
  ],

  compose: [
    { id: 'd77-g3-c1', zhHint: '把流程装进3天。',                  audioKo: '흐름을 3일에 담았어요.',              answer: ['흐름을', '3일에', '담았어요.'],                     tokens: ['흐름을', '3일에', '담았어요.', '흐름이', '3일이', '담아요.'],                                  explain: '내용 을 + 용기 에 + 담다' },
    { id: 'd77-g3-c2', zhHint: '把回忆装进了这次旅行。',            audioKo: '추억을 이 여행에 담았어요.',          answer: ['추억을', '이 여행에', '담았어요.'],                   tokens: ['추억을', '이 여행에', '담았어요.', '추억이', '이 여행이', '담을래요.'],                     explain: '추상 추억 + 에 담다' },
    { id: 'd77-g3-c3', zhHint: '把妈妈的心意装进信里。',            audioKo: '엄마 마음을 편지에 담았어요.',        answer: ['엄마 마음을', '편지에', '담았어요.'],                 tokens: ['엄마 마음을', '편지에', '담았어요.', '엄마 마음이', '편지가', '담았습니다요.'],                 explain: '마음을 + 편지에 담다' },
    { id: 'd77-g3-c4', zhHint: '这是装进3天里的流程。',            audioKo: '3일에 담긴 흐름이에요.',              answer: ['3일에', '담긴', '흐름이에요.'],                      tokens: ['3일에', '담긴', '흐름이에요.', '담기는', '담을', '흐름을'],                 explain: '被动定语 담긴 흐름' },
  ],

  rule: [
    { id: 'd77-g3-r1', promptZh: '关于「~을/를 ~에 담다」的用法，哪句最准确？',                                choices: [{ text: '**把内容(을/를)装进容器(에)** · 흐름을 3일에 담다 = "把流程装进3天"', correct: true }, { text: '表示从容器取出',               correct: false }, { text: '表示比较两者',               correct: false }, { text: '表示时间先后',                    correct: false }], explain: '装进' },
    { id: 'd77-g3-r2', promptZh: '关于「담다」前的助词搭配，哪句最准确？',                                  choices: [{ text: '**内容 + 을/를，容器 + 에** · 마음을 편지에 담다 / 추억을 여행에 담다', correct: true }, { text: '内容 + 에，容器 + 을/를',    correct: false }, { text: '两个都用 을/를',      correct: false }, { text: '两个都用 에',                    correct: false }], explain: '을/를 内容 + 에 容器' },
    { id: 'd77-g3-r3', promptZh: '关于「담다」能装的对象，哪句最准确？',                                    choices: [{ text: '**具体物品和抽象概念都能装** · 물을 컵에 담다（具体）/ 마음을 노래에 담다（抽象）', correct: true }, { text: '只能装液体',            correct: false }, { text: '只能装抽象概念',    correct: false }, { text: '不能装感情',           correct: false }], explain: '具体+抽象皆可' },
    { id: 'd77-g3-r4', promptZh: '关于被动定语「담긴」，哪句最准确？',                              choices: [{ text: '**담기다（被动）+ ㄴ = 담긴** · 3일에 담긴 흐름 = "装进3天的流程"（被装进去的）', correct: true }, { text: '담긴 是将来时',            correct: false }, { text: '담긴 是命令形',        correct: false }, { text: '담긴 表示"取出的"',                      correct: false }], explain: '담기다 + ㄴ · 被动完成定语' },
  ],
};
