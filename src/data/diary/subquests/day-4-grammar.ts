import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 4 · 1-3 语法关 · 입니다 vs 이에요/예요（敬语升级）
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 教学梯度：
 *   fix 揪 입예요/이예요/이입니다 之类真实翻车
 *   → compose 从 자기소개 全程练：합쇼체版 + 해요체版 并行
 *   → rule 抽象 3 条规则：입니다 不看收音 / 이에요/예요 看收音 / 否定 이/가 아니에요
 *
 * 承上（Day 1 이에요/예요）启下（Day 5 은/는 主题助词深化）
 * Day 4 的核心贡献是让学生学会"看场合选敬语层级"，之前只会一档 해요体
 */
export const day4Grammar: GrammarSubQuestData = {
  day: 4, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握「입니다」和「이에요/예요」的敬语差异', subtitleEn: 'Master the politeness difference between 입니다 and 이에요/예요.',

  // ─── 助词改错：给错句 → 选正确写法 ───
  fix: [
    {
      id: 'd04-g3-f1',
      promptKo: '저는 학생예요.',
      promptZh: '"我是学生"（해요体）哪句正确？', promptZhEn: 'Which is correct for "I\'m a student" (해요 style)?',
      choices: [
        { text: '저는 학생예요.', correct: false },
        { text: '저는 학생이에요.', correct: true },
        { text: '저는 학생이예요.', correct: false },
        { text: '저는 학생이입니다.', correct: false },
      ],
      explain: '학생 有收音 ㅇ → 이에요（不是 예요，也不是 이예요）。「이예요」是最常见的错拼', explainEn: '학생 ends in the consonant ㅇ → 이에요 (not 예요, and not 이예요). "이예요" is the most common misspelling.',
    },
    {
      id: 'd04-g3-f2',
      promptKo: '토리이에요.',
      promptZh: '"（我）是兔莉"（해요体）哪句正确？', promptZhEn: 'Which is correct for "(I) am Tori" (해요 style)?',
      choices: [
        { text: '토리이에요.', correct: false },
        { text: '토리예요.', correct: true },
        { text: '토리에요.', correct: false },
        { text: '토리이예요.', correct: false },
      ],
      explain: '토리 末字 리 无收音 → 예요（不是 이에요 也不是 에요）。无收音一律用 예요', explainEn: '토리 ends in 리 without a final consonant → 예요 (not 이에요 or 에요). Always use 예요 after no final consonant.',
    },
    {
      id: 'd04-g3-f3',
      promptKo: '저는 토리이입니다.',
      promptZh: '想最正式地说"我叫兔莉"，哪句正确？', promptZhEn: 'Which is correct for saying "My name is Tori" in the most formal way?',
      choices: [
        { text: '저는 토리이입니다.', correct: false },
        { text: '저는 토리입니다.', correct: true },
        { text: '저는 토리예입니다.', correct: false },
        { text: '저는 토리이에입니다.', correct: false },
      ],
      explain: '입니다 不受收音影响——不管前面名词有没有收音，永远直接接 입니다。「토리이입니다」多加了个이', explainEn: '입니다 is not affected by final consonants—no matter whether the noun before it has a final consonant or not, you always attach 입니다 directly. \'토리이입니다\' adds an extra 이.',
    },
    {
      id: 'd04-g3-f4',
      promptKo: '학생을 아니에요.',
      promptZh: '"不是学生"哪句正确？', promptZhEn: 'Which sentence is correct for "not a student"?',
      choices: [
        { text: '학생을 아니에요.', correct: false },
        { text: '학생를 아니에요.', correct: false },
        { text: '학생이 아니에요.', correct: true },
        { text: '학생는 아니에요.', correct: false },
      ],
      explain: '이다 的否定 = 이/가 아니에요。前面主语用**主格** 이/가，不是宾格 을/를。학생 有收音 → 이 아니에요', explainEn: 'The negative of 이다 is 이/가 아니에요. The subject takes the **nominative** particle 이/가, not the accusative 을/를. 학생 has a final consonant → 이 아니에요.',
    },
    {
      id: 'd04-g3-f5',
      promptKo: '중국 사람입니까.',
      promptZh: '想问"是中国人吗"（最正式），哪句正确？', promptZhEn: 'Which sentence is correct for "Are you Chinese?" (most formal)?',
      choices: [
        { text: '중국 사람입니까.', correct: false },
        { text: '중국 사람입니까?', correct: true },
        { text: '중국 사람입니다?', correct: false },
        { text: '중국 사람이에요까?', correct: false },
      ],
      explain: '합쇼체疑问：입니다 → 입니까? 陈述用 입니다，疑问用 입니까，句尾必带问号', explainEn: '합쇼체 question: 입니다 → 입니까? Use 입니다 for statements, 입니까 for questions, and always end with a question mark.',
    },
  ],

  // ─── 组句：词块拼完整句 ───
  compose: [
    {
      id: 'd04-g3-c1',
      zhHint: '是的，我叫兔莉。（最正式）', zhHintEn: 'Yes, I\'m Tori. (Most formal)',
      audioKo: '네, 토리입니다.',
      answer: ['네,', '토리입니다.'],
      tokens: ['네,', '토리입니다.', '토리예요.', '토리이에요.', '아니요,', '학생입니다.'],
      explain: '对宿管/长辈用 입니다。토리 无收音也直接接 입니다（不看收音）', explainEn: 'Use 입니다 with dorm managers/elders. Even though 토리 has no final consonant, you still attach 입니다 directly (ignore final consonants).',
    },
    {
      id: 'd04-g3-c2',
      zhHint: '我是学生。（温暖礼貌）', zhHintEn: 'I am a student. (warm and polite)',
      audioKo: '저는 학생이에요.',
      answer: ['저는', '학생이에요.'],
      tokens: ['저는', '학생이에요.', '학생입니다.', '학생예요.', '학생이예요.', '토리는'],
      explain: '해요体版本。학생 有收音 ㅇ → 이에요。「학생예요/이예요」都是常见错写', explainEn: '해요체 version. 학생 has final consonant ㅇ → 이에요. \'학생예요/이예요\' are common mistakes.',
    },
    {
      id: 'd04-g3-c3',
      zhHint: '不，我不是学生。（温暖礼貌否定）', zhHintEn: 'No, I\'m not a student. (warm, polite negative)',
      audioKo: '아니요, 저는 학생이 아니에요.',
      answer: ['아니요,', '저는', '학생이', '아니에요.'],
      tokens: ['아니요,', '저는', '학생이', '아니에요.', '학생을', '학생는', '아닙니다.'],
      explain: '이다 否定：主格 이/가 + 아니에요。학생 有收音 → 이 아니에요。「학생을」是宾格，用错了', explainEn: 'Negative of 이다: nominative 이/가 + 아니에요. 학생 has a final consonant → 이 아니에요. \'학생을\' is accusative, so it\'s wrong.',
    },
    {
      id: 'd04-g3-c4',
      zhHint: '房间是 301 号。', zhHintEn: 'The room is number 301.',
      audioKo: '방은 301호예요.',
      answer: ['방은', '301호예요.'],
      tokens: ['방은', '301호예요.', '301호이에요.', '방는', '301호입니다.', '방이'],
      explain: '호 无收音 → 예요。「방은」= 房间（这个话题）——用主题助词 은 引出话题', explainEn: '호 has no final consonant → 예요. \'방은\' = the room (this topic)—use topic particle 은 to introduce the topic.',
    },
  ],

  // ─── 规则理解选择 ───
  rule: [
    {
      id: 'd04-g3-r1',
      promptZh: '关于「입니다」和「이에요/예요」的区别，下面哪句是对的？', promptZhEn: 'Which statement about the difference between \'입니다\' and \'이에요/예요\' is correct?',
      choices: [
        { text: '两个完全一样，随便用。', textEn: 'They\'re exactly the same, use either.', correct: false },
        { text: '입니다 更正式（对长辈/正式场合），이에요/예요 更温暖（日常）。', textEn: '입니다 is more formal (for elders/formal situations), while 이에요/예요 is warmer (everyday).', correct: true },
        { text: '입니다 只用于第一人称，이에요/예요 只用于第三人称。', textEn: '입니다 is only used for first person, and 이에요/예요 only for third person.', correct: false },
        { text: '입니다 只对朋友用，이에요/예요 对陌生人用。', textEn: '입니다 is only used with friends, and 이에요/예요 with strangers.', correct: false },
      ],
      explain: '입니다 = 합쇼체（最正式），이에요/예요 = 해요体（温暖礼貌）。层级不同不是随便用', explainEn: '입니다 = 합쇼체 (most formal), 이에요/예요 = 해요체 (warm, polite). The levels are different, not interchangeable.',
    },
    {
      id: 'd04-g3-r2',
      promptZh: '"토리"（末字无收音）+ 입니다，哪句正确？', promptZhEn: 'Which sentence is correct for "토리" (no final consonant) + 입니다?',
      choices: [
        { text: '토리입니다.', correct: true },
        { text: '토리이입니다.', correct: false },
        { text: '토리예입니다.', correct: false },
        { text: '토리는입니다.', correct: false },
      ],
      explain: '입니다 **不看收音**——名词直接接。토리 + 입니다，不加任何东西', explainEn: '입니다 **ignores final consonants**—attach directly to the noun. 토리 + 입니다, without adding anything.',
    },
    {
      id: 'd04-g3-r3',
      promptZh: '"학생"（末字有收音 ㅇ）+ 해요体，哪句正确？', promptZhEn: 'Which sentence is correct for "학생" (final consonant ㅇ) + 해요체?',
      choices: [
        { text: '학생예요.', correct: false },
        { text: '학생이에요.', correct: true },
        { text: '학생이예요.', correct: false },
        { text: '학생에요.', correct: false },
      ],
      explain: '해요体看收音：有收音 → 이에요，无收音 → 예요。「이예요」和「에요」都是常见错写', explainEn: '해요체 depends on final consonants: with a final consonant → 이에요, without → 예요. \'이예요\' and \'에요\' are common mistakes.',
    },
    {
      id: 'd04-g3-r4',
      promptZh: '"我不是学生"（温暖礼貌），主语后加什么助词？', promptZhEn: 'For "I am not a student" (warm, polite), what particle goes after the subject?',
      choices: [
        { text: '을/를（宾格）', textEn: '을/를 (accusative)', correct: false },
        { text: '은/는（主题）', textEn: '은/는 (topic)', correct: false },
        { text: '이/가（主格）', textEn: '이/가 (nominative)', correct: true },
        { text: '에（位置）', textEn: '에 (location)', correct: false },
      ],
      explain: '이다 的否定固定搭档：X이/가 아니에요。학생이 아니에요（有收音→이），토리가 아니에요（无收音→가）', explainEn: 'The fixed negative pattern for 이다: X이/가 아니에요. 학생이 아니에요 (has final consonant → 이), 토리가 아니에요 (no final consonant → 가)',
    },
  ],
};
