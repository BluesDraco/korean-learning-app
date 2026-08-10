import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 5 · 1-3 语法关 · 主题助词 은/는（收束三大助词）
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 教学梯度：
 *   fix 逐条揪 저은/친구은/이름는 之类真实翻车
 *   → compose 从"자기소개→介绍朋友→天气对比"练 은/는 全套用法
 *   → rule 抽象 은/는 vs 이/가 vs 을/를 三级对比（三大助词收束）
 *
 * 承上：Day 1 은/는 首次出现 → Day 2 을/를 → Day 3 이/가
 * Day 5 完成三大助词的最终对比与收束
 */
export const day5Grammar: GrammarSubQuestData = {
  day: 5, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '主题助词 은/는 收束 · 三大助词对比', subtitleEn: 'Topic particles 은/는 wrap-up · comparison of the three major particles.',

  // ─── 助词改错：给错句 → 选正确写法 ───
  fix: [
    {
      id: 'd05-g3-f1',
      promptKo: '저은 토리예요.',
      promptZh: '"我叫兔莉"哪句正确？', promptZhEn: 'Which is correct for "My name is Tori"?',
      choices: [
        { text: '저은 토리예요.', correct: false },
        { text: '저는 토리예요.', correct: true },
        { text: '저가 토리예요.', correct: false },
        { text: '저이 토리예요.', correct: false },
      ],
      explain: '저 无收音 → 主题助词用 는。「저은」是最常见的初学者错误——受"有收音用 은"的规则误导', explainEn: '저 has no final consonant → topic particle is 는. "저은" is the most common beginner error — misled by the rule "use 은 after a final consonant."',
    },
    {
      id: 'd05-g3-f2',
      promptKo: '이름는 뭐예요?',
      promptZh: '"名字是什么"哪句正确？', promptZhEn: 'Which is correct for "What\'s your name"?',
      choices: [
        { text: '이름는 뭐예요?', correct: false },
        { text: '이름은 뭐예요?', correct: true },
        { text: '이름가 뭐예요?', correct: false },
        { text: '이름을 뭐예요?', correct: false },
      ],
      explain: '이름 末字 름 有收音 ㅁ → 은。问名字用主题助词 은 比主格 이 更自然', explainEn: '이름 ends in 름 with final consonant ㅁ → use 은. For asking a name, the topic particle 은 sounds more natural than the subject marker 이.',
    },
    {
      id: 'd05-g3-f3',
      promptKo: '오늘는 날씨가 좋아요.',
      promptZh: '"今天天气好"哪句正确？', promptZhEn: 'Which is correct for "The weather is nice today"?',
      choices: [
        { text: '오늘는 날씨가 좋아요.', correct: false },
        { text: '오늘은 날씨가 좋아요.', correct: true },
        { text: '오늘이 날씨는 좋아요.', correct: false },
        { text: '오늘을 날씨가 좋아요.', correct: false },
      ],
      explain: '오늘 有收音 ㄹ → 은。同句 은/는（主题）+ 이/가（主语）共存：오늘은(话题) 날씨가(主语) 좋아요', explainEn: 'Today has a final consonant ㄹ → use 은. In the same sentence, 은/는 (topic) and 이/가 (subject) coexist: 오늘은 (topic) 날씨가 (subject) 좋아요',
    },
    {
      id: 'd05-g3-f4',
      promptKo: '누구는 왔어요?',
      promptZh: '"谁来了？"哪句正确？', promptZhEn: '"Who came?" Which sentence is correct?',
      choices: [
        { text: '누구는 왔어요?', correct: false },
        { text: '누구은 왔어요?', correct: false },
        { text: '누가 왔어요?', correct: true },
        { text: '누구를 왔어요?', correct: false },
      ],
      explain: '疑问词作主语时用 이/가（不用 은/는）。누구+가 = 누가（缩写）。作宾语时用 을/를，Day 6 会遇到 뭐를 좋아해요?', explainEn: 'When a question word is the subject, use 이/가 (not 은/는). 누구+가 = 누가 (contraction). As an object, use 을/를 — you\'ll see 뭐를 좋아해요? in Day 6.',
    },
    {
      id: 'd05-g3-f5',
      promptKo: '저는 김치를 좋아요.',
      promptZh: '"我喜欢泡菜"哪句正确？', promptZhEn: '"I like kimchi" Which sentence is correct?',
      choices: [
        { text: '저는 김치를 좋아요.', correct: false },
        { text: '저는 김치가 좋아요.', correct: true },
        { text: '저를 김치를 좋아요.', correct: false },
        { text: '저는 김치는 좋아요.', correct: false },
      ],
      explain: '「좋아요」是**形容词**（不是动词），前面用主格 이/가，不用宾格 을/를。中文"喜欢 XX"在韩语里是"XX이/가 좋아요"', explainEn: '좋아요 is an **adjective** (not a verb), so it takes the nominative 이/가, not the accusative 을/를. In Korean, "like XX" is expressed as "XX이/가 좋아요"',
    },
  ],

  // ─── 组句：词块拼完整句 ───
  compose: [
    {
      id: 'd05-g3-c1',
      zhHint: '我叫兔莉。（用主题助词开头）', zhHintEn: 'My name is Tori. (Start with a topic particle)',
      audioKo: '저는 토리예요.',
      answer: ['저는', '토리예요.'],
      tokens: ['저는', '토리예요.', '저은', '저가', '토리이에요.', '맞아요.'],
      explain: '저 无收音 → 는。「저은」是最经典的错拼干扰', explainEn: '저 has no final consonant → use 는. "저은" is the classic misspelling trap.',
    },
    {
      id: 'd05-g3-c2',
      zhHint: '我的朋友是中国人。', zhHintEn: 'My friend is Chinese.',
      audioKo: '제 친구는 중국 사람이에요.',
      answer: ['제', '친구는', '중국', '사람이에요.'],
      tokens: ['제', '친구는', '중국', '사람이에요.', '친구은', '사람예요.'],
      explain: '친구 无收音 → 는。사람 有收音 ㅁ → 이에요。两处收音判断都要对', explainEn: '친구 has no final consonant → use 는. 사람 has final consonant ㅁ → use 이에요. Both final consonant checks must be right.',
    },
    {
      id: 'd05-g3-c3',
      zhHint: '今天天气好。（同句 은/는 + 이/가）', zhHintEn: 'The weather is nice today. (Same sentence with 은/는 + 이/가)',
      audioKo: '오늘은 날씨가 좋아요.',
      answer: ['오늘은', '날씨가', '좋아요.'],
      tokens: ['오늘은', '날씨가', '좋아요.', '오늘는', '날씨는', '오늘이'],
      explain: '오늘 有收音 ㄹ → 은（主题）+ 날씨（主语）→ 가。这种"主题+主语"结构 Day 5 后要熟到肌肉记忆', explainEn: '오늘 has final consonant ㄹ → use 은 (topic) + 날씨 (subject) → 가. After Day 5, this "topic + subject" structure should be muscle memory.',
    },
    {
      id: 'd05-g3-c4',
      zhHint: '一起去吃早饭吗？', zhHintEn: 'Want to go eat breakfast together?',
      audioKo: '같이 아침 먹으러 갈래요?',
      answer: ['같이', '아침', '먹으러', '갈래요?'],
      tokens: ['같이', '아침', '먹으러', '갈래요?', '혼자', '저녁', '갈까요?'],
      explain: '~러 갈래요 = 邀请句式。같이(一起) + 목적어 + 먹으러/보러/사러 + 갈래요', explainEn: '~러 갈래요 = invitation pattern. 같이 (together) + object + 먹으러/보러/사러 + 갈래요',
    },
  ],

  // ─── 规则理解选择 ───
  rule: [
    {
      id: 'd05-g3-r1',
      promptZh: '关于「은/는」（主题）和「이/가」（主格）的区别，哪句是对的？', promptZhEn: 'Regarding the difference between 은/는 (topic) and 이/가 (nominative), which statement is correct?',
      choices: [
        { text: '完全一样，随便用。', textEn: 'They\'re exactly the same, just use either.', correct: false },
        { text: '은/는 = 提话题（说到 X…），이/가 = 谁/什么在做/是（回答"谁"）。', textEn: '은/는 = introduces a topic (speaking of X…), 이/가 = who/what is doing/being (answers "who").', correct: true },
        { text: '은/는 只用于人，이/가 只用于物。', textEn: '은/는 is only for people, 이/가 is only for things.', correct: false },
        { text: '은/는 是宾格，이/가 是主格。', textEn: '은/는 is accusative, 이/가 is nominative.', correct: false },
      ],
      explain: '은/는 挂"话题"上，이/가 挂"具体主语"上。疑问词 누구/뭐 后**只用** 이/가', explainEn: '은/는 attaches to the "topic," 이/가 attaches to the "specific subject." After question words 누구/뭐, **only** 이/가 is used.',
    },
    {
      id: 'd05-g3-r2',
      promptZh: '"오늘"（末字有收音 ㄹ）+ 主题助词，应该？', promptZhEn: '"오늘" (last syllable has final consonant ㄹ) + topic particle, which is correct?',
      choices: [
        { text: '오늘이', correct: false },
        { text: '오늘가', correct: false },
        { text: '오늘은', correct: true },
        { text: '오늘는', correct: false },
      ],
      explain: '有收音 → 은。「오늘은」隐含对比："今天（相比别的天）"', explainEn: 'Has final consonant → use 은. "오늘은" implies contrast: "today (compared to other days)"',
    },
    {
      id: 'd05-g3-r3',
      promptZh: '"我喜欢泡菜"用什么助词？', promptZhEn: '"I like kimchi" — which particle to use?',
      choices: [
        { text: '저는 김치를 좋아요.', correct: false },
        { text: '저는 김치가 좋아요.', correct: true },
        { text: '저를 김치를 좋아요.', correct: false },
        { text: '저가 김치가 좋아요.', correct: false },
      ],
      explain: '「좋아요」是形容词，前面用主格 이/가。中文思维会想加 을/를，是最常见的错。喜欢/讨厌/需要 都属这一类', explainEn: '좋아요 is an adjective, so it takes the nominative 이/가. Chinese thinking tends to add 을/를 — this is the most common mistake. Like/dislike/need all fall into this category.',
    },
    {
      id: 'd05-g3-r4',
      promptZh: '"谁来了？"哪句正确？', promptZhEn: '"Who came?" Which sentence is correct?',
      choices: [
        { text: '누구는 왔어요?', correct: false },
        { text: '누가 왔어요?', correct: true },
        { text: '누구가 왔어요?', correct: false },
        { text: '누구이 왔어요?', correct: false },
      ],
      explain: '疑问词作主语时用 이/가，不能用 은/는。누구+가 = 누가（固定缩写）', explainEn: 'When a question word is the subject, use 이/가, not 은/는. 누구+가 = 누가 (fixed contraction)',
    },
  ],
};
