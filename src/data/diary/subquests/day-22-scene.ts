import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 22 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：语言学校教室 · 火鹤老师教해요体 + 日常动作韩语化
 */
export const day22Scene: SceneSubQuestData = {
  day: 22, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '把日常动作全部换成"~요"结尾', subtitleEn: 'Change all daily actions to end with "~요".',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd22-sc-s1',
      scenario: '火鹤老师在黑板写"오다"，问班上"어떻게 바꿔요?（怎么变？）"，最标准的答法？', scenarioEn: 'Flamingo Teacher writes "오다" on the board and asks the class "어떻게 바꿔요? (How does it change?)". What\'s the most standard answer?',
      choices: [
        { ko: '와요. ㅗ+아 → 와예요.', zh: '와요。ㅗ+아 = 와。', correct: true },
        { ko: '오아요. 아요예요.', zh: '오아요。接아요。', zhEn: '오아요. Attach 아요.', correct: false },
        { ko: '오해요. 하다는 해요예요.', zh: '오해요。하다变해요。', zhEn: '오해요. 하다 changes to 해요.', correct: false },
        { ko: '오어요. 어요예요.', zh: '오어요。接어요。', zhEn: '오어요. Attach 어요.', correct: false },
      ],
      explain: 'ㅗ + 아 缩合为 ㅘ = 와。오다 → 와요。老师最爱学生说出缩合规则', explainEn: 'ㅗ + 아 contracts to ㅘ = 와. 오다 → 와요. The teacher loves it when students state the contraction rule.',
    },
    {
      type: 'situation',
      id: 'd22-sc-s2',
      scenario: '朋友刚从图书馆出来，你想问她刚才在做什么，最自然的一句？', scenarioEn: 'Your friend just came out of the library. You want to ask what she was just doing. What\'s the most natural thing to say?',
      choices: [
        { ko: '뭐 했어요?', zh: '刚才做什么了？', zhEn: 'What were you just doing?', correct: true },
        { ko: '뭐 했다요?', zh: '什么做了吗？', zhEn: 'Did you do what?', correct: false },
        { ko: '뭐 하해요?', zh: '什么하해？', zhEn: 'What 하해?', correct: false },
        { ko: '뭐 요?', zh: '什么요？', zhEn: 'What요?', correct: false },
      ],
      explain: '过去时用 았/었어요。하다 → 했어요。日常问朋友最常用', explainEn: 'Use 았/었어요 for past tense. 하다 → 했어요. This is the most common way to ask a friend casually.',
    },
    {
      type: 'situation',
      id: 'd22-sc-s3',
      scenario: '同学问你："오늘 뭐 해요?"，你今天没安排，想在家休息，最自然的一句？', scenarioEn: 'Your classmate asks, "오늘 뭐 해요?" You have no plans today and want to rest at home. What\'s the most natural thing to say?',
      choices: [
        { ko: '오늘은 집에서 쉬어요.', zh: '今天在家休息。', zhEn: 'I\'m resting at home today.', correct: true },
        { ko: '오늘은 집에 쉬어아요.', zh: '(错误变位)', zhEn: '(incorrect conjugation)', correct: false },
        { ko: '오늘 집에서 쉼이에요.', zh: '(错误形态)', zhEn: '(incorrect form)', correct: false },
        { ko: '오늘 집 쉬해요.', zh: '(错误规则)', zhEn: '(incorrect rule)', correct: false },
      ],
      explain: '쉬다 → 쉬어요（ㅟ 不缩合）。에서 表示"在……"的动作地点', explainEn: '쉬다 → 쉬어요 (ㅟ doesn\'t contract). 에서 indicates the location where an action takes place.',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd22-sc-d1',
      lines: [
        { speaker: '홍학 선생님', ko: '오늘은 해요체를 배워요. "먹다"는 어떻게 바꿔요?', zh: '今天我们学해요体。"먹다"怎么变？', zhEn: 'Today we\'re learning the 해요 form. How does "먹다" change?' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '먹어요. ㅓ니까 어요예요.', zh: '먹어요。因为是ㅓ所以接어요。', zhEn: '먹어요. Since the stem ends in ㅓ, you add 어요.', correct: true },
        { ko: '먹아요. 아요예요.', zh: '먹아요。', correct: false },
        { ko: '먹해요. 하다예요.', zh: '먹해요。', correct: false },
        { ko: '먹요.', zh: '먹요。', correct: false },
      ],
      explain: '词干末元音ㅓ → 어요。回答带理由（"ㅓ니까"）更完整', explainEn: 'Stem-final vowel ㅓ → 어요. Answering with a reason ("ㅓ니까") is more complete.',
    },
    {
      id: 'd22-sc-d2',
      type: 'dialogue',
      lines: [
        { speaker: '반 친구', ko: '주말에 뭐 해요?', zh: '周末做什么？', zhEn: 'What are you doing this weekend?' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '친구 만나요. 한국어 공부해요.', zh: '见朋友。学韩语。', zhEn: 'Meeting friends. Studying Korean.', correct: true },
        { ko: '친구 만나아요. 한국어 공부하아요.', zh: '(错误变位)', zhEn: '(incorrect conjugation)', correct: false },
        { ko: '친구 만나해요. 한국어 공부요.', zh: '(错误变位)', zhEn: '(incorrect conjugation)', correct: false },
        { ko: '친구 만나. 한국어 공부.', zh: '(缺요)', zhEn: '(missing 요)', correct: false },
      ],
      explain: '만나다 → 만나요（ㅏ+ㅏ 合并）；공부하다 → 공부해요（하다类）', explainEn: '만나다 → 만나요 (ㅏ+ㅏ merge); 공부하다 → 공부해요 (하다 type).',
    },
    {
      type: 'dialogue',
      id: 'd22-sc-d3',
      lines: [
        { speaker: '홍학 선생님', ko: '"공부하다"는요?', zh: '"공부하다"呢？', zhEn: 'What about "공부하다"?' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '공부해요. 하다는 해요예요.', zh: '공부해요。하다变해요。', zhEn: '공부해요. 하다 changes to 해요.', correct: true },
        { ko: '공부하아요. 아요예요.', zh: '공부하아요。', correct: false },
        { ko: '공부하어요. 어요예요.', zh: '공부하어요。', correct: false },
        { ko: '공부하하요.', zh: '공부하하요。', correct: false },
      ],
      explain: '하다类无条件 해요。这是解释规则3的最简答法', explainEn: '하다 type always becomes 해요. This is the simplest way to explain rule 3.',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd22-sc-c1',
      ko: '해요체를 배워요.',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '在语言学校课堂上，老师或学生描述今天的学习内容', zhEn: 'In a language school class, a teacher or student describes what they\'re learning today.', correct: true },
        { zh: '在餐厅问服务员', zhEn: 'Asking a server at a restaurant.', correct: false },
        { zh: '在便利店结账', zhEn: 'Checking out at a convenience store.', correct: false },
        { zh: '第一次见房东', zhEn: 'First time meeting the landlord', correct: false },
      ],
      explain: '해요체 是韩语学习的专业术语。只在课堂/学习语境出现', explainEn: '해요체 is a technical term in Korean learning. It only appears in classroom/study contexts.',
    },
    {
      type: 'context',
      id: 'd22-sc-c2',
      ko: '음악 들어요.',
      promptZh: '这句话最可能是什么场景？', promptZhEn: 'What is the most likely scenario for this sentence?',
      choices: [
        { zh: '描述自己现在或日常正在做的事', zhEn: 'Describing what you\'re doing now or habitually', correct: true },
        { zh: '请求对方开音乐', zhEn: 'Asking the other person to play music', correct: false },
        { zh: '询问对方喜欢的音乐', zhEn: 'Asking about the other person\'s favorite music', correct: false },
        { zh: '拒绝对方推荐的歌', zhEn: 'Declining a song the other person recommended', correct: false },
      ],
      explain: '해요体现在时可表"现在做"或"日常习惯"。语境决定具体时态感', explainEn: 'The 해요 present tense can express "doing now" or "daily habits." Context determines the specific tense nuance.',
    },
  ],
};
