import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 32 · 2-3 문법 탐험 · ~아/어서 因果 · N (이)라서 · vs ~(으)니까 */
export const day32Grammar: GrammarSubQuestData = {
  day: 2, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '因为___：~아/어서 · (이)라서', subtitleEn: 'Because ___ : ~아/어서 · (이)라서',

  fix: [
    {
      id: 'd32-g3-f1',
      promptKo: '연휴어서 학교가 쉬어요.',
      promptZh: '"因为是连休学校休息"哪句正确？', promptZhEn: 'Which is correct for "Because it\'s a long holiday, school is closed"?',
      choices: [
        { text: '연휴어서 학교가 쉬어요.', correct: false },
        { text: '연휴라서 학교가 쉬어요.', correct: true },
        { text: '연휴이라서 학교가 쉬어요.', correct: false },
        { text: '연휴아서 학교가 쉬어요.', correct: false },
      ],
      explain: '연휴 无收音 → 名词句 + **라서**（有收音才用 이라서）', explainEn: '연휴 no final consonant → noun + **라서** (use 이라서 only with a final consonant)',
    },
    {
      id: 'd32-g3-f2',
      promptKo: '엄마가 보고 싶었어서 울었어요.',
      promptZh: '"因为想妈妈所以哭了"哪句正确？', promptZhEn: 'Which is correct for "I cried because I missed my mom"?',
      choices: [
        { text: '엄마가 보고 싶었어서 울었어요.', correct: false },
        { text: '엄마가 보고 싶어서 울었어요.', correct: true },
        { text: '엄마가 보고 싶어서 울겠어요.', correct: false },
        { text: '엄마가 보고 싶어 울고 있어요.', correct: false },
      ],
      explain: '~아/어서 前**不接过去时**（时态放句尾）· 싶다 → 싶어서', explainEn: '~아/어서 is **not preceded by past tense** (tense goes at the end) · 싶다 → 싶어서',
    },
    {
      id: 'd32-g3-f3',
      promptKo: '비가 와서 우산 가져가세요.',
      promptZh: '"因为下雨，请带伞"哪句最自然？', promptZhEn: 'Which sentence is most natural for "Because it\'s raining, please bring an umbrella"?',
      choices: [
        { text: '비가 와서 우산 가져가세요.', correct: false },
        { text: '비가 오니까 우산 가져가세요.', correct: true },
        { text: '비가 와서 우산 가져가요.', correct: false },
        { text: '비가 오라서 우산 가져가세요.', correct: false },
      ],
      explain: '后半句是**命令/建议**时必须用 ~(으)니까，不能用 ~아/어서', explainEn: 'If the second clause is a **command/suggestion**, you must use ~(으)니까, not ~아/어서',
    },
    {
      id: 'd32-g3-f4',
      promptKo: '학생라서 돈이 없어요.',
      promptZh: '"因为是学生所以没钱"哪句正确？', promptZhEn: 'Which is correct for "Because I\'m a student, I have no money"?',
      choices: [
        { text: '학생라서 돈이 없어요.', correct: false },
        { text: '학생이라서 돈이 없어요.', correct: true },
        { text: '학생어서 돈이 없어요.', correct: false },
        { text: '학생아서 돈이 없어요.', correct: false },
      ],
      explain: '학생 有收音 ㅇ → **이라서**（有收音时名词后 + 이 + 라서）', explainEn: '학생 has final consonant ㅇ → **이라서** (with a final consonant, noun + 이 + 라서)',
    },
    {
      id: 'd32-g3-f5',
      promptKo: '늦았어서 죄송해요.',
      promptZh: '"因为迟到不好意思"哪句正确？', promptZhEn: 'Which is correct for "I\'m sorry for being late"?',
      choices: [
        { text: '늦았어서 죄송해요.', correct: false },
        { text: '늦어서 죄송해요.', correct: true },
        { text: '늦아서 죄송해요.', correct: false },
        { text: '늦고 죄송해요.', correct: false },
      ],
      explain: '늦다 元音 ㅡ → **어서**（阴性）· 时态放句尾，前面永远原形', explainEn: '늦다 vowel ㅡ → **어서** (negative) · tense at the end, always dictionary form before',
    },
  ],

  compose: [
    {
      id: 'd32-g3-c1',
      zhHint: '因为想家所以哭了。', zhHintEn: 'I cried because I was homesick.',
      audioKo: '고향이 보고 싶어서 울었어요.',
      answer: ['고향이', '보고 싶어서', '울었어요.'],
      tokens: ['고향이', '보고 싶어서', '울었어요.', '보고 싶으면', '보고 싶었어서', '울어요.'],
      explain: '보고 싶다 → 보고 싶어서 · 后半句是陈述过去可以用 ~어서', explainEn: '보고 싶다 → 보고 싶어서 · if the second clause states the past, ~어서 is fine',
    },
    {
      id: 'd32-g3-c2',
      zhHint: '因为是连休一个人可不行。', zhHintEn: 'Being alone during a long holiday just won\'t do.',
      audioKo: '연휴라서 혼자 있으면 안 돼요.',
      answer: ['연휴라서', '혼자', '있으면', '안 돼요.'],
      tokens: ['연휴라서', '혼자', '있으면', '안 돼요.', '연휴이라서', '연휴어서', '있어도'],
      explain: 'Haru 原句 · 연휴 无收音 → 라서', explainEn: 'Haru\'s original sentence · 연휴 no final consonant → 라서',
    },
    {
      id: 'd32-g3-c3',
      zhHint: '因为松片糕好吃所以吃了三个。', zhHintEn: 'Because the songpyeon was delicious, I ate three.',
      audioKo: '송편이 맛있어서 세 개나 먹었어요.',
      answer: ['송편이', '맛있어서', '세 개나', '먹었어요.'],
      tokens: ['송편이', '맛있어서', '세 개나', '먹었어요.', '맛있었어서', '맛있으니까', '먹어요.'],
      explain: '맛있다 → 맛있어서 · ~어서 前不接过去时', explainEn: '맛있다 → 맛있어서 · ~어서 is not preceded by past tense',
    },
    {
      id: 'd32-g3-c4',
      zhHint: '不好意思迟到了。', zhHintEn: 'Sorry for being late.',
      audioKo: '늦어서 죄송해요.',
      answer: ['늦어서', '죄송해요.'],
      tokens: ['늦어서', '죄송해요.', '늦아서', '늦었어서', '죄송합니다요.', '늦으니까'],
      explain: '道歉固定句 · 늦다 → 늦어서', explainEn: 'Fixed apology phrase · 늦다 → 늦어서',
    },
  ],

  rule: [
    {
      id: 'd32-g3-r1',
      promptZh: '关于「~아/어서」的用法，哪句最准确？', promptZhEn: 'Which statement about ~아/어서 is most accurate?',
      choices: [
        { text: '表因果，直接接词干，前面**不加过去时**；后半句是陈述/感叹/情感', textEn: 'Shows cause/reason, attaches directly to the stem, **no past tense** before it; the second clause is a statement/exclamation/emotion', correct: true },
        { text: '~아/어서 前面必须加过去时', textEn: '~아/어서 must be preceded by past tense', correct: false },
        { text: '~아/어서 后面必须是命令句', textEn: '~아/어서 must be followed by a command', correct: false },
        { text: '~아/어서 只用于形容词', textEn: '~아/어서 is only used with adjectives', correct: false },
      ],
      explain: '❌ 왔어서 → ✅ 와서 · 时态永远放句尾', explainEn: '❌ 왔어서 → ✅ 와서 · tense always goes at the end',
    },
    {
      id: 'd32-g3-r2',
      promptZh: '关于名词后接因果，哪句最准确？', promptZhEn: 'Which statement about cause/reason after nouns is most accurate?',
      choices: [
        { text: '有收音 → **이라서**；无收音 → **라서**（等同 이에요/예요 的规则）', textEn: 'With final consonant → **이라서**; without → **라서** (same rule as 이에요/예요)', correct: true },
        { text: '所有名词一律 + 아/어서', textEn: 'All nouns take + 아/어서', correct: false },
        { text: '所有名词一律 + 라서，无论收音', textEn: 'All nouns take + 라서, regardless of the final consonant', correct: false },
        { text: '所有名词一律 + 이어서', textEn: 'All nouns take + 이어서', correct: false },
      ],
      explain: '학생이라서 / 연휴라서 · 与 이에요/예요 判定完全一致', explainEn: '학생이라서 / 연휴라서 · Same rule as 이에요/예요',
    },
    {
      id: 'd32-g3-r3',
      promptZh: '关于「~아/어서 vs ~(으)니까」的差别，哪句最准确？', promptZhEn: 'Which is most accurate about the difference between ~아/어서 and ~(으)니까?',
      choices: [
        { text: '后半句是命令/建议 → 必须用 ~(으)니까；陈述/情感 → ~아/어서 更自然', textEn: 'If the second clause is a command/suggestion → use ~(으)니까; if it\'s a statement/emotion → ~아/어서 is more natural', correct: true },
        { text: '两者完全一样', textEn: 'The two are exactly the same', correct: false },
        { text: '~(으)니까 是过去时', textEn: '~(으)니까 is past tense', correct: false },
        { text: '~아/어서 是敬语', textEn: '~아/어서 is polite', correct: false },
      ],
      explain: '비가 오니까 우산 가져가세요（O） / 비가 와서 우산 가져가세요（怪）', explainEn: '비가 오니까 우산 가져가세요 (O) / 비가 와서 우산 가져가세요 (awkward)',
    },
    {
      id: 'd32-g3-r4',
      promptZh: '关于阴阳元音判定，哪句最准确？', promptZhEn: 'Which is most accurate about the vowel harmony rule?',
      choices: [
        { text: '阳性元音(ㅏ/ㅗ) → 아서；其他 → 어서；하다 → 해서', textEn: 'Positive vowels (ㅏ/ㅗ) → 아서; others → 어서; 하다 → 해서', correct: true },
        { text: '所有词干一律 + 아서', textEn: 'All stems take + 아서', correct: false },
        { text: '收音 ㅁ 时用 아서', textEn: 'Use 아서 when the final consonant is ㅁ', correct: false },
        { text: '过去时词干用 어서', textEn: 'Past tense stems take 어서', correct: false },
      ],
      explain: '오다 → 와서 / 늦다 → 늦어서 / 하다 → 해서 · 和해요体规则一致', explainEn: '오다 → 와서 / 늦다 → 늦어서 / 하다 → 해서 · Same rule as 해요 form',
    },
  ],
};
