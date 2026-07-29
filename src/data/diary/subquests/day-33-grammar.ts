import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 33 · 2-3 문법 탐험 · ~고 있어요 · ~고 계세요 敬语 */
export const day33Grammar: GrammarSubQuestData = {
  day: 3, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '正在___：~고 있어요 · 敬语 ~고 계세요',

  fix: [
    { id: 'd33-g3-f1', promptKo: '엄마는 지금 뭐 하고 있어요?', promptZh: '"妈妈现在在做什么呢？（对长辈用敬语）"哪句正确？', choices: [{ text: '엄마는 지금 뭐 하고 있어요?',   correct: false }, { text: '엄마는 지금 뭐 하고 계세요?',   correct: true }, { text: '엄마는 지금 뭐 하고 있으세요?', correct: false }, { text: '엄마는 지금 뭐 하는 계세요?', correct: false }], explain: '对长辈问近况 · 있어요 → **계세요**' },
    { id: 'd33-g3-f2', promptKo: '예쁘고 있어요.',              promptZh: '"（她）很漂亮"哪句正确？',                            choices: [{ text: '예쁘고 있어요.',                  correct: false }, { text: '예뻐요.',                        correct: true }, { text: '예쁘고 계세요.',                 correct: false }, { text: '예쁨 있어요.',                    correct: false }], explain: '~고 있어요 前必须**动词**，形容词直接用해요体（예뻐요）' },
    { id: 'd33-g3-f3', promptKo: '학생고 있어요.',              promptZh: '"是学生"哪句正确？',                                   choices: [{ text: '학생고 있어요.',                  correct: false }, { text: '학생이에요.',                    correct: true }, { text: '학생하고 있어요.',                correct: false }, { text: '학생이고 있어요.',                correct: false }], explain: '~고 있어요 前必须动词，名词用 이에요/예요' },
    { id: 'd33-g3-f4', promptKo: '어제 편지를 쓰고 있어요.',      promptZh: '"昨天在写信"（过去进行）哪句正确？',                     choices: [{ text: '어제 편지를 쓰고 있어요.',         correct: false }, { text: '어제 편지를 쓰고 있었어요.',    correct: true }, { text: '어제 편지를 썼고 있어요.',        correct: false }, { text: '어제 편지를 쓰다 있어요.',         correct: false }], explain: '过去进行 · ~고 있었어요' },
    { id: 'd33-g3-f5', promptKo: '엄마한테 편지가 쓰고 있어요.',  promptZh: '"正在给妈妈写信"哪句正确？',                             choices: [{ text: '엄마한테 편지가 쓰고 있어요.',    correct: false }, { text: '엄마한테 편지를 쓰고 있어요.',  correct: true }, { text: '엄마에 편지를 쓰고 있어요.',      correct: false }, { text: '엄마한테서 편지를 쓰고 있어요.',   correct: false }], explain: '给人用 한테 · 편지 是宾语用 를' },
  ],

  compose: [
    { id: 'd33-g3-c1', zhHint: '妈妈，我过得很好。',                audioKo: '엄마, 저 잘 지내고 있어요.',                answer: ['엄마,', '저', '잘', '지내고 있어요.'],              tokens: ['엄마,', '저', '잘', '지내고 있어요.', '지내요.', '지냈어요.', '지내고 계세요.'], explain: '写信第一句 · V + 고 있어요' },
    { id: 'd33-g3-c2', zhHint: '妈妈现在在做什么呢？',              audioKo: '엄마는 지금 뭐 하고 계세요?',                answer: ['엄마는', '지금', '뭐', '하고 계세요?'],              tokens: ['엄마는', '지금', '뭐', '하고 계세요?', '하고 있어요?', '해요?', '하시네요?'],   explain: '对长辈问近况 · 계세요' },
    { id: 'd33-g3-c3', zhHint: '现在正在写信。',                    audioKo: '지금 편지를 쓰고 있어요.',                   answer: ['지금', '편지를', '쓰고 있어요.'],                    tokens: ['지금', '편지를', '쓰고 있어요.', '쓰고 계세요.', '썼어요.', '써요.'],           explain: 'V + 고 있어요' },
    { id: 'd33-g3-c4', zhHint: '妈妈也请注意健康。',                 audioKo: '엄마도 건강 조심하세요.',                    answer: ['엄마도', '건강', '조심하세요.'],                     tokens: ['엄마도', '건강', '조심하세요.', '조심해요.', '조심하시네요.', '조심했어요.'],   explain: '给长辈关照 · ~세요 敬语' },
  ],

  rule: [
    { id: 'd33-g3-r1', promptZh: '关于「~고 있어요」的用法，哪句最准确？',                choices: [{ text: '动词 + 고 있어요 = 正在___。前面必须是动词，形容词/名词不用', correct: true }, { text: '所有词性都能接 고 있어요',    correct: false }, { text: '~고 있어요 表未来意志',         correct: false }, { text: '~고 있어요 是过去式',            correct: false }], explain: 'V + 고 있어요 · 名词/形容词不能用' },
    { id: 'd33-g3-r2', promptZh: '关于「~고 계세요」的用法，哪句最准确？',                choices: [{ text: '对长辈的进行时敬语。있어요 → 계세요（有生命体存在的敬语形）', correct: true }, { text: '~고 계세요 是过去式',           correct: false }, { text: '~고 계세요 只用于书面语',        correct: false }, { text: '~고 계세요 表未来',              correct: false }], explain: '엄마는 뭐 하고 계세요? · 对父母 / 老师 / 长辈都用' },
    { id: 'd33-g3-r3', promptZh: '关于过去进行 ~고 있었어요，哪句最准确？',                 choices: [{ text: '~고 있어요 → 过去 ~고 있었어요。时态放在 있다 上而不是前动词', correct: true }, { text: '过去进行 ~았/었고 있어요',       correct: false }, { text: '过去进行 ~고 있어었어요',        correct: false }, { text: '过去进行 ~고 있으세요',          correct: false }], explain: '~고 있었어요 · 时态永远在 있다 后面' },
    { id: 'd33-g3-r4', promptZh: '关于报近况三件套（잘 지내다 / 살다 / 배우다），哪句最准确？', choices: [{ text: '잘 지내고 있어요 / 살고 있어요 / 배우고 있어요 是写家书的固定三件套', correct: true }, { text: '报近况必须用过去时',              correct: false }, { text: '报近况只用一个动词就够',           correct: false }, { text: '报近况用 ~할 거예요',            correct: false }], explain: '进行时是"持续状态"的表达 · 报平安最自然' },
  ],
};
