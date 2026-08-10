import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 17 · 1-3 문법 탐험 · 语法关
 * 3 段：助词/形态改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：~아/어 주세요（请帮我做）+ 与 ~(으)세요、주다 直接用法的对比
 */
export const day17Grammar: GrammarSubQuestData = {
  day: 17, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '~아/어 주세요 · 请帮我做', subtitleEn: '~아/어 주세요 · Please do (something) for me',

  fix: [
    {
      id: 'd17-g3-f1',
      promptKo: '충전 하아 주세요.',
      promptZh: '"请帮我充值"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "Please charge it for me"?',
      choices: [
        { text: '충전 하아 주세요.', correct: false },
        { text: '충전 해 주세요.', correct: true },
        { text: '충전 하여 주세요.', correct: false },
        { text: '충전 하 주세요.', correct: false },
      ],
      explain: '하다 → 해 주세요（하 + 여 → 해 的固定形变，不是 하아）。所有 하다 类动词都用 해 주세요', explainEn: '하다 → 해 주세요 (하 + 여 → 해 is a fixed contraction, not 하아). All 하다 verbs use 해 주세요',
    },
    {
      id: 'd17-g3-f2',
      promptKo: '사진 찍아 주세요.',
      promptZh: '"请帮我拍照"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "Please take a photo for me"?',
      choices: [
        { text: '사진 찍아 주세요.', correct: false },
        { text: '사진 찍어 주세요.', correct: true },
        { text: '사진 찍으세요.', correct: false },
        { text: '사진 찍고 있어요.', correct: false },
      ],
      explain: '찍다 词干"찍"元音 ㅣ（不是 ㅏ/ㅗ）→ 어 주세요。찍 + 어 = 찍어。「찍아 주세요 ❌」', explainEn: '찍다 stem "찍" has vowel ㅣ (not ㅏ/ㅗ) → 어 주세요. 찍 + 어 = 찍어. "찍아 주세요 ❌"',
    },
    {
      id: 'd17-g3-f3',
      promptKo: '돕아 주세요.',
      promptZh: '"请帮帮我"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "Please help me"?',
      choices: [
        { text: '돕아 주세요.', correct: false },
        { text: '도와주세요.', correct: true },
        { text: '돕어 주세요.', correct: false },
        { text: '돕고 주세요.', correct: false },
      ],
      explain: '돕다 是 ㅂ 不规则 → 돕 + 아 → 도와（不是 돕아）。「도와주세요」是紧急求助的黄金句，写成一个词', explainEn: '돕다 is a ㅂ irregular → 돕 + 아 → 도와 (not 돕아). "도와주세요" is the golden phrase for urgent help, written as one word',
    },
    {
      id: 'd17-g3-f4',
      promptKo: '물 사 주세요.',
      promptZh: '"请给我水"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "Please give me water"?',
      choices: [
        { text: '물 사 주세요.', correct: false },
        { text: '물 주세요.', correct: true },
        { text: '물 사아 주세요.', correct: false },
        { text: '물 줘 주세요.', correct: false },
      ],
      explain: '"给我水"用 주다（给）本身 + 세요 = 주세요，不需要 아/어。「물 사 주세요」= 请帮我买水（사다=买），不是"给"', explainEn: 'For "give me water," use 주다 (to give) itself + 세요 = 주세요, no 아/어 needed. "물 사 주세요" = Please buy me water (사다 = to buy), not "give"',
    },
    {
      id: 'd17-g3-f5',
      promptKo: '앉으세요.',
      promptZh: '"请坐"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "Please sit down"?',
      choices: [
        { text: '앉으세요.', correct: true },
        { text: '앉아 주세요.', correct: false },
        { text: '앉아세요.', correct: false },
        { text: '앉고 있어요.', correct: false },
      ],
      explain: '一般请求用 ~(으)세요。「앉아 주세요」= "请为我坐"（暗示"帮我"），语义不对。请坐直接 앉으세요', explainEn: 'General requests use ~(으)세요. "앉아 주세요" = "Please sit for me" (implying "for my sake"), which is wrong. For "please sit," just say 앉으세요',
    },
  ],

  compose: [
    {
      id: 'd17-g3-c1',
      zhHint: '请帮我充值。', zhHintEn: 'Please recharge it for me.',
      audioKo: '충전 해 주세요.',
      answer: ['충전', '해', '주세요.'],
      tokens: ['충전', '해', '주세요.', '해요.', '하고 있어요.', '했어요.'],
      explain: '충전하다 → 해 주세요。하다 类动词的"帮我做"', explainEn: '충전하다 → 해 주세요. The "do it for me" pattern for 하다 verbs',
    },
    {
      id: 'd17-g3-c2',
      zhHint: '请给我一张 T-money 卡。', zhHintEn: 'Please give me a T-money card.',
      audioKo: '티머니카드 하나 주세요.',
      answer: ['티머니카드', '하나', '주세요.'],
      tokens: ['티머니카드', '하나', '주세요.', '한 장', '일', '있어요.'],
      explain: '「하나 주세요」= 请给我一张/一个。주다 本身，不需要 아/어', explainEn: '"하나 주세요" = Please give me one. 주다 itself, no 아/어 needed',
    },
    {
      id: 'd17-g3-c3',
      zhHint: '请稍等一下。', zhHintEn: 'Please wait a moment.',
      audioKo: '잠깐 기다려 주세요.',
      answer: ['잠깐', '기다려', '주세요.'],
      tokens: ['잠깐', '기다려', '주세요.', '기다리세요.', '기다렸어요.', '기다리고 있어요.'],
      explain: '기다리다 词干 ㅣ → 기다려。「잠깐 기다려 주세요」是等待时的礼貌句', explainEn: '기다리다 stem ㅣ → 기다려. "잠깐 기다려 주세요" is the polite phrase for waiting',
    },
    {
      id: 'd17-g3-c4',
      zhHint: '请帮帮我。（紧急求助）', zhHintEn: 'Please help me. (Urgent request)',
      audioKo: '도와주세요.',
      answer: ['도와주세요.'],
      tokens: ['도와주세요.', '돕아 주세요.', '도와요.', '돕고 있어요.', '도우세요.'],
      explain: '돕다 → 도와주세요（ㅂ 不规则 + 아 주다）。紧急求助黄金句', explainEn: '돕다 → 도와주세요 (ㅂ irregular + 아 주다). The golden phrase for urgent help',
    },
  ],

  rule: [
    {
      id: 'd17-g3-r1',
      promptZh: '关于 ~아/어 주세요，哪句最准确？', promptZhEn: 'Regarding ~아/어 주세요, which statement is most accurate?',
      choices: [
        { text: '词干元音 ㅏ/ㅗ → 아 주세요（찾아 주세요）；其他元音 → 어 주세요（기다려 주세요）；하다 → 해 주세요', textEn: 'Stem vowel ㅏ/ㅗ → 아 주세요 (찾아 주세요); other vowels → 어 주세요 (기다려 주세요); 하다 → 해 주세요', correct: true },
        { text: '所有词都用 아 주세요', textEn: 'All words use 아 주세요', correct: false },
        { text: '所有词都用 어 주세요', textEn: 'All words use 어 주세요', correct: false },
        { text: '按辅音判断——ㄱㄴ 用 아，ㄷㄹ 用 어', textEn: 'Judge by the consonant — ㄱㄴ use 아, ㄷㄹ use 어', correct: false },
      ],
      explain: '选择规则跟 해요体 一样——看词干最后一个元音。아/어 也可以配"주다"变 아/어 주세요', explainEn: 'The rule is the same as the 해요 form — look at the last vowel of the stem. 아/어 can also pair with "주다" to become 아/어 주세요',
    },
    {
      id: 'd17-g3-r2',
      promptZh: '关于「주세요」和「아/어 주세요」的区别，哪句最准确？', promptZhEn: 'Regarding the difference between "주세요" and "아/어 주세요," which statement is most accurate?',
      choices: [
        { text: '주세요 = 请给我（주다=给）；~아/어 주세요 = 请（帮我）做 ~。两者不同', textEn: '주세요 = Please give me (주다 = to give); ~아/어 주세요 = Please do ~ (for me). They\'re different', correct: true },
        { text: '两者完全一样', textEn: 'The two are exactly the same', correct: false },
        { text: '주세요 是过去时，~아/어 주세요 是现在时', textEn: '주세요 is past tense, ~아/어 주세요 is present tense', correct: false },
        { text: '주세요 用于名词，~아/어 주세요 用于形容词', textEn: '주세요 is used with nouns, ~아/어 주세요 is used with adjectives', correct: false },
      ],
      explain: '물 주세요 = 请给我水；물 사 주세요 = 请帮我买水（사다=买 + 아 주세요）', explainEn: '물 주세요 = Please give me water; 물 사 주세요 = Please buy me water (사다 = to buy + 아 주세요)',
    },
    {
      id: 'd17-g3-r3',
      promptZh: '关于「~세요」和「~아/어 주세요」，哪句最准确？', promptZhEn: 'Which is most accurate about \'~세요\' and \'~아/어 주세요\'?',
      choices: [
        { text: '~세요 = 一般请求"请做"（앉으세요）；~아/어 주세요 = 强调"帮我"的请求（사진 찍어 주세요）', textEn: '~세요 = general request \'please do\' (앉으세요); ~아/어 주세요 = emphasizes \'for me\' request (사진 찍어 주세요)', correct: true },
        { text: '两者可互换', textEn: 'The two are interchangeable', correct: false },
        { text: '~세요 是반말，~아/어 주세요 是敬语', textEn: '~세요 is 반말, ~아/어 주세요 is polite', correct: false },
        { text: '~세요 用于陌生人，~아/어 주세요 用于朋友', textEn: '~세요 is for strangers, ~아/어 주세요 is for friends', correct: false },
      ],
      explain: '앉으세요（请坐·一般） vs 사진 찍어 주세요（帮我拍照·请求）。"帮我"语感不同', explainEn: '앉으세요 (please sit, general) vs 사진 찍어 주세요 (take a photo for me, request). The \'for me\' nuance differs',
    },
    {
      id: 'd17-g3-r4',
      promptZh: '关于「돕다」的变形，哪句最准确？', promptZhEn: 'Which is most accurate about the conjugation of \'돕다\'?',
      choices: [
        { text: '돕다 是 ㅂ 不规则动词：돕 + 아 → 도와。「도와주세요」= 请帮帮我', textEn: '돕다 is a ㅂ irregular verb: 돕 + 아 → 도와. \'도와주세요\' = Please help me', correct: true },
        { text: '돕다 是规则动词：돕 + 아 → 돕아 ✓', textEn: '돕다 is a regular verb: 돕 + 아 → 돕아 ✓', correct: false },
        { text: '돕다 只能用 돕고 있어요', textEn: '돕다 can only be used as 돕고 있어요', correct: false },
        { text: '돕다 的敬语是 돕세요', textEn: 'The polite form of 돕다 is 돕세요', correct: false },
      ],
      explain: 'ㅂ 不规则：ㅂ 遇 아/어 → 우/오 + 아/어。돕 + 아 → 도와。「도와주세요」写成一个词，紧急求助必备', explainEn: 'ㅂ irregular: ㅂ before 아/어 → 우/오 + 아/어. 돕 + 아 → 도와. \'도와주세요\' is written as one word, essential for urgent help',
    },
  ],
};
