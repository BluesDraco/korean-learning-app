import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 78 · 3-3 문법 탐험 · ~지만 (现在特性对比) · 虽…但… */
export const day78Grammar: GrammarSubQuestData = {
  day: 18, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（虽…但…·描述特性）：A + 지만',

  fix: [
    { id: 'd78-g3-f1', promptKo: '작아지만 빨라요.',       promptZh: '"（矮马）虽小但快"哪句正确？',       choices: [{ text: '작아지만 빨라요.',          correct: false }, { text: '작지만 빨라요.',    correct: true }, { text: '작는지만 빨라요.',            correct: false }, { text: '작을지만 빨라요.',                correct: false }], explain: '形容词词干直接 + 지만：작다 → 작지만（描述"一直很小"的特性用现在 ~지만，不加 아/는/을）' },
    { id: 'd78-g3-f2', promptKo: '이 귤은 작지만 향이 진한다.',       promptZh: '"这橘子虽小但香浓"哪句正确？',       choices: [{ text: '이 귤은 작지만 향이 진한다.',          correct: false }, { text: '이 귤은 작지만 향이 진해요.',    correct: true }, { text: '이 귤은 작지만 향이 진하요.',            correct: false }, { text: '이 귤은 작지만 향을 진해요.',                correct: false }], explain: '진하다(形容词) → 진해요（不是 진한다/진하요）· 향이 진하다 用 이/가' },
    { id: 'd78-g3-f3', promptKo: '한국은 좁아서 다양해요.',         promptZh: '"韩国虽窄但多样"哪句最自然？',   choices: [{ text: '한국은 좁아서 다양해요.',            correct: false }, { text: '한국은 좁지만 다양해요.',    correct: true }, { text: '한국은 좁고 다양해요.',        correct: false }, { text: '한국은 좁으면 다양해요.',              correct: false }], explain: '"窄"和"多样"是对比关系用 **지만**（~아서=因果、~고=并列、~으면=条件，都不对）' },
    { id: 'd78-g3-f4', promptKo: '작고 향 진한고 달아.',      promptZh: '"小、香浓、又甜"（并列）哪句正确？',   choices: [{ text: '작고 향 진한고 달아.',         correct: false }, { text: '작고 향 진하고 달아.',      correct: true }, { text: '작아고 향 진하고 달아.',                correct: false }, { text: '작지만 향 진하고 달아.',                correct: false }], explain: '并列同类特性用 **~고**：작고 진하고 달아（진하다 → 진하고，非 진한고）' },
    { id: 'd78-g3-f5', promptZh: '关于「~지만 vs ~았/었지만」的差别，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**~지만 = 描述一直的特性/一般对比（작지만 빨라요=一直小却快）** · **~았/었지만 = 回顾过去的转折（짧았지만=当时短）**', correct: true }, { text: '两者完全一样',            correct: false }, { text: '~지만 表未来',        correct: false }, { text: '~지만 是命令',           correct: false }], explain: '现在特性 vs 过去回顾' },
  ],

  compose: [
    { id: 'd78-g3-c1', zhHint: '虽小但快。',                  audioKo: '작지만 빨라요.',              answer: ['작지만', '빨라요.'],                     tokens: ['작지만', '빨라요.', '작아서', '느려요.', '작고', '빠를까요?'],                                  explain: 'A + 지만 · 特性对比' },
    { id: 'd78-g3-c2', zhHint: '这橘子虽小但香浓。',            audioKo: '이 귤은 작지만 향이 진해요.',          answer: ['이 귤은', '작지만', '향이', '진해요.'],                   tokens: ['이 귤은', '작지만', '향이', '진해요.', '작아서', '향을', '진한다.'],                     explain: '작지만 + 향이 진하다' },
    { id: 'd78-g3-c3', zhHint: '小、香浓、又甜。',              audioKo: '작고 향 진하고 달아요.',        answer: ['작고', '향', '진하고', '달아요.'],                 tokens: ['작고', '향', '진하고', '달아요.', '작지만', '진한고', '써요.'],                 explain: '~고 并列同类特性' },
    { id: 'd78-g3-c4', zhHint: '韩国虽窄但多样。',              audioKo: '한국은 좁지만 다양해요.',            answer: ['한국은', '좁지만', '다양해요.'],                    tokens: ['한국은', '좁지만', '다양해요.', '좁아서', '좁고', '단순해요.'],                 explain: '좁지만 + 다양하다' },
  ],

  rule: [
    { id: 'd78-g3-r1', promptZh: '关于「~지만」的用法，哪句最准确？',                                choices: [{ text: '**表对比转折"虽…但…" · 描述一直存在的特性** · 작지만 빠르다 = "虽小但快"', correct: true }, { text: '表因果关系',               correct: false }, { text: '表并列同类',               correct: false }, { text: '表条件假设',                    correct: false }], explain: '对比转折' },
    { id: 'd78-g3-r2', promptZh: '关于「~지만 的形态」，哪句最准确？',                                  choices: [{ text: '**词干直接 + 지만**（不加 아/는/을）· 작지만 / 진하지만 / 좁지만', correct: true }, { text: 'A + 아지만',           correct: false }, { text: 'A + 는지만',      correct: false }, { text: 'A + 을지만',                    correct: false }], explain: '词干 + 지만' },
    { id: 'd78-g3-r3', promptZh: '「对比用 ~지만」vs「并列用 ~고」，哪句最准确？',                                    choices: [{ text: '**对比/相反用 ~지만（작지만 빠르다）· 同类并列用 ~고（작고 진하고 달다）**', correct: true }, { text: '两个可以互换',            correct: false }, { text: '~지만 表并列',    correct: false }, { text: '~고 表转折',           correct: false }], explain: '对比 지만 vs 并列 고' },
    { id: 'd78-g3-r4', promptZh: '关于「~지만 vs ~아/어서」，哪句最准确？',                              choices: [{ text: '**~지만 = 转折（虽…但…）· ~아/어서 = 因果（因为…所以…）** · 작지만 빠르다（对比）vs 작아서 느리다（因果）', correct: true }, { text: '两者完全一样',            correct: false }, { text: '~지만 表原因',        correct: false }, { text: '~아서 表转折',                      correct: false }], explain: '转折 vs 因果' },
  ],
};
