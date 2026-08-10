import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 26 · 1-3 문법 탐험 · 语法关
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：N이/가 필요해요 + 필요 없다 + ㅂ불규칙 귀여워요 + 이것도 주세요
 */
export const day26Grammar: GrammarSubQuestData = {
  day: 26, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握「N 필요해요」+ ㅂ不规则 + 追加购买句', subtitleEn: 'Master 「N 필요해요」+ ㅂ irregular + phrases for adding purchases',

  fix: [
    {
      id: 'd26-g3-f1',
      promptKo: '샴푸를 필요해요.',
      promptZh: '"需要洗发水"哪句正确？', promptZhEn: 'Which sentence is correct for "I need shampoo"?',
      choices: [
        { text: '샴푸를 필요해요.', correct: false },
        { text: '샴푸가 필요해요.', correct: true },
        { text: '샴푸는 필요해요.', correct: false },
        { text: '샴푸에 필요해요.', correct: false },
      ],
      explain: '필요하다 是形容词 → 主语用 이/가。不用宾格 을/를', explainEn: '필요하다 is an adjective → subject uses 이/가. Not the object particle 을/를',
    },
    {
      id: 'd26-g3-f2',
      promptKo: '돈가 필요해요.',
      promptZh: '"需要钱"哪句正确？', promptZhEn: 'Which sentence is correct for "need money"?',
      choices: [
        { text: '돈가 필요해요.', correct: false },
        { text: '돈이 필요해요.', correct: true },
        { text: '돈을 필요해요.', correct: false },
        { text: '돈은 필요해요.', correct: false },
      ],
      explain: '돈 有收音 ㄴ → 이（不是 가）', explainEn: '돈 has the final consonant ㄴ → 이 (not 가)',
    },
    {
      id: 'd26-g3-f3',
      promptKo: '이거 진짜 귀엽어요!',
      promptZh: '"这个真的好可爱"哪句正确？', promptZhEn: 'Which sentence is correct for "This is really cute"?',
      choices: [
        { text: '이거 진짜 귀엽어요!', correct: false },
        { text: '이거 진짜 귀여워요!', correct: true },
        { text: '이거 진짜 귀엽아요!', correct: false },
        { text: '이거 진짜 귀엽여요!', correct: false },
      ],
      explain: 'ㅂ 不规则：ㅂ 在元音前变 우 → 귀여우 + 어 = 귀여워요', explainEn: 'ㅂ irregular: ㅂ becomes 우 before a vowel → 귀여우 + 어 = 귀여워요',
    },
    {
      id: 'd26-g3-f4',
      promptKo: '우산 필요없어요.',
      promptZh: '"不需要雨伞"哪句正确？', promptZhEn: 'Which sentence is correct for "I don\'t need an umbrella"?',
      choices: [
        { text: '우산 필요없어요.', correct: false },
        { text: '우산 필요 없어요.', correct: true },
        { text: '우산은 필요없어요.', correct: false },
        { text: '우산이 필요없어요.', correct: false },
      ],
      explain: '「필요 없다」中间必须有空格（두 단어）· 不是复合词', explainEn: '「필요 없다」 must have a space in between (two words) · Not a compound word',
    },
    {
      id: 'd26-g3-f5',
      promptKo: '이것을 주세요.',
      promptZh: '想追加"这个也要"，最自然的一句？', promptZhEn: 'Want to add "I want this too," what\'s the most natural sentence?',
      choices: [
        { text: '이것을 주세요.', correct: false },
        { text: '이것도 주세요.', correct: true },
        { text: '이것가 주세요.', correct: false },
        { text: '이것은 주세요.', correct: false },
      ],
      explain: '追加时用 도（也）· 이것을 주세요 是"给我这个"意思，语义不同', explainEn: 'Use 도 (also) when adding · 이것을 주세요 means "give me this," different meaning',
    },
  ],

  compose: [
    {
      id: 'd26-g3-c1',
      zhHint: '需要洗发水。还有毛巾。', zhHintEn: 'I need shampoo. And a towel too.',
      audioKo: '샴푸 필요해요. 그리고 수건도요.',
      answer: ['샴푸', '필요해요.', '그리고', '수건도요.'],
      tokens: ['샴푸', '필요해요.', '그리고', '수건도요.', '수건을', '있어요.', '주세요.'],
      explain: '「N 필요해요 + 그리고 + N 도」다이소购物列多物', explainEn: '「N 필요해요 + 그리고 + N 도」List multiple items at Daiso',
    },
    {
      id: 'd26-g3-c2',
      zhHint: '这个多少钱？', zhHintEn: 'How much is this?',
      audioKo: '이거 얼마예요?',
      answer: ['이거', '얼마예요?'],
      tokens: ['이거', '얼마예요?', '이것', '뭐예요?', '있어요?'],
      explain: '이거 = 이것 的口语。问价格必用「얼마예요?」', explainEn: '이거 is the colloquial form of 이것. Always use 「얼마예요?」 to ask prices',
    },
    {
      id: 'd26-g3-c3',
      zhHint: '这个真的好可爱！', zhHintEn: 'This is really cute!',
      audioKo: '이거 진짜 귀여워요!',
      answer: ['이거', '진짜', '귀여워요!'],
      tokens: ['이거', '진짜', '귀여워요!', '귀엽어요.', '귀엽아요.', '멋있어요.'],
      explain: 'ㅂ 不规则 → 귀엽 → 귀여워요', explainEn: 'ㅂ irregular → 귀엽 → 귀여워요',
    },
    {
      id: 'd26-g3-c4',
      zhHint: '这个也要。', zhHintEn: 'I want this too.',
      audioKo: '이것도 주세요.',
      answer: ['이것도', '주세요.'],
      tokens: ['이것도', '주세요.', '이것을', '주지 마세요.', '얼마예요?'],
      explain: '追加商品用「N도 주세요」· 도（也）是关键', explainEn: 'To add items use 「N도 주세요」· 도 (also) is key',
    },
  ],

  rule: [
    {
      id: 'd26-g3-r1',
      promptZh: '关于「N 필요해요」的用法，哪句最准确？', promptZhEn: 'Regarding the usage of 「N 필요해요」, which sentence is most accurate?',
      choices: [
        { text: '필요하다 是形容词 → 名词用主格 이/가。有收音 → 이，无收音 → 가。口语中可省略', textEn: '필요하다 is an adjective → nouns take the subject particle 이/가. With final consonant → 이, without → 가. Can be omitted in speech', correct: true },
        { text: '필요하다 是动词 → 用宾格 을/를', textEn: '필요하다 is a verb → use the object particle 을/를', correct: false },
        { text: '필요하다 前面用 에', textEn: 'Use 에 before 필요하다', correct: false },
        { text: '「필요해요」只能用于第一人称', textEn: '\'필요해요\' can only be used for the first person', correct: false },
      ],
      explain: '샴푸가 필요해요（口语可省 가 → 샴푸 필요해요）· 都对但书面保留', explainEn: '샴푸가 필요해요 (in speech, 가 can be dropped → 샴푸 필요해요) · both are correct, but keep it in writing',
    },
    {
      id: 'd26-g3-r2',
      promptZh: '关于「필요 없다」的用法，哪句最准确？', promptZhEn: 'Which is the most accurate about the usage of 필요 없다?',
      choices: [
        { text: '「필요 없다」= 不需要。两个词分开写（有空格），前面名词也用 이/가', textEn: '\'필요 없다\' = not needed. Written as two separate words (with a space), and the preceding noun also uses 이/가', correct: true },
        { text: '「필요없다」= 复合词，连着写', textEn: '\'필요없다\' = a compound word, written together', correct: false },
        { text: '「필요 없다」前面用 을/를', textEn: '\'필요 없다\' is preceded by 을/를', correct: false },
        { text: '「필요 없다」= 讨厌', textEn: '\'필요 없다\' = dislike', correct: false },
      ],
      explain: '우산 필요 없어요 = 不要雨伞。「필요 없다」是短语，不是复合词', explainEn: '우산 필요 없어요 = I don\'t need an umbrella. 필요 없다 is a phrase, not a compound word',
    },
    {
      id: 'd26-g3-r3',
      promptZh: '关于 ㅂ 不规则 귀엽다 变位，哪句最准确？', promptZhEn: 'Which is the most accurate about the ㅂ irregular conjugation of 귀엽다?',
      choices: [
        { text: 'ㅂ 在元音前变 우 → 귀엽 → 귀여우 + 어 → 귀여워요', textEn: 'ㅂ changes to 우 before a vowel → 귀엽 → 귀여우 + 어 → 귀여워요', correct: true },
        { text: 'ㅂ 消失 → 귀요요', textEn: 'ㅂ disappears → 귀요요', correct: false },
        { text: 'ㅂ 保持 → 귀엽어요', textEn: 'ㅂ stays → 귀엽어요', correct: false },
        { text: 'ㅂ 变 ㅁ → 귀염어요', textEn: 'ㅂ changes to ㅁ → 귀염어요', correct: false },
      ],
      explain: '同类 ㅂ 不规则：춥다 → 추워요；부끄럽다 → 부끄러워요', explainEn: 'Similar ㅂ irregulars: 춥다 → 추워요; 부끄럽다 → 부끄러워요',
    },
    {
      id: 'd26-g3-r4',
      promptZh: '关于「이것도 주세요」的用法，哪句最准确？', promptZhEn: 'Which is the most accurate about the usage of 이것도 주세요?',
      choices: [
        { text: '이것 + 도 = 这个也。「N 도 주세요」= 请把 N 也给我。购物追加时用', textEn: '이것 + 도 = this too. N 도 주세요 = Please give me N as well. Used when adding items while shopping', correct: true },
        { text: '이것을 주세요 意思一样', textEn: '이것을 주세요 means the same', correct: false },
        { text: '도 是主格助词', textEn: '도 is a subject particle', correct: false },
        { text: '도 前面不能加名词', textEn: 'You can\'t put a noun before 도', correct: false },
      ],
      explain: '이것을 주세요 = 请给我这个（首次）；이것도 주세요 = 这个也（追加）', explainEn: '이것을 주세요 = Please give me this (first time); 이것도 주세요 = this too (additional)',
    },
  ],
};
