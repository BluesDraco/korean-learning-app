import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 15 · 라면 벽 · 泡面墙
 *
 * 剧情：两周下来，Tori宿舍角落堆了十几个泡面盒，形成了一面"泡面墙"。
 * Haru来串门，盯着泡面墙看了三秒，说了一句让Tori破防的话。
 * Tori下定决心不再只吃泡面，拜托Haru教她做饭。
 *
 * 学习目标：~고 싶어요（想要）/ ~을래요/~ㄹ래요（打算/意愿）
 * 语料层级：해요体 + 반말（Haru亲密语气）
 * 韩语自审：korean skill PASS（자연성/문법/조사 三关）
 */
export const day15: ToriDay = {
  level: 'beginner',
  day: 15,
  phase: 'expansion',
  title: '泡面墙 · 精神稳定物资', titleEn: 'Ramen Wall · Emotional Stability Supplies',
  subtitle: 'Haru戳中痛处，Tori决定学做饭', subtitleEn: 'Haru hits a nerve, Tori decides to learn cooking',
  heroImageUrl: '/images/diary/day-15-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 15일 · 일요일 오후',
    weather: '兽尔 · 晴', weatherEn: 'Seoul · Sunny',
    toriPose: 'shy',
    diaryText: `9月15日，周日下午。

Haru来我宿舍串门。
我正在煮第——不知道第几碗泡面。

她走进来，站在角落那堆泡面盒前，
盯着看了整整三秒。

然后说了一句："토리… 이거 벽이야. 라면 벽."
（兔莉……这是墙。泡面墙。）

我低头看那堆空盒——
确实。是墙。十四个。
每一个都是我的"精神稳定物资"。

但今天，我决定改变。`,
  },

  words: [
    {
      id: 'd15-w1',
      korean: '라면',
      hangul: 'ra-myeon',
      zh: '泡面', zhEn: 'Ramen',
      pos: '名词', posEn: 'Noun',
      example: { ko: '라면을 너무 많이 먹었어요.', zh: '泡面吃太多了。', zhEn: 'I\'ve eaten too much ramen.' },
      tip: '라면 末字"면"有收音 ㄴ → 을 而非 를', tipEn: '라면 ends with "면" which has the final consonant ㄴ → use 을, not 를',
    },
    {
      id: 'd15-w2',
      korean: '벽',
      hangul: 'byeok',
      zh: '墙', zhEn: 'Wall',
      pos: '名词', posEn: 'Noun',
      example: { ko: '라면 상자가 벽이 됐어요.', zh: '泡面箱子变成了一面墙。', zhEn: 'The ramen boxes have become a wall.' },
      tip: '벽 有收音 ㄱ。"벽이"连读时发 [벼기]', tipEn: '벽 has the final consonant ㄱ. "벽이" is pronounced [벼기] when linked.',
    },
    {
      id: 'd15-w3',
      korean: '쌓다',
      hangul: 'ssat-da',
      zh: '堆积', zhEn: 'piled up',
      pos: '动词', posEn: 'Verb',
      example: { ko: '라면 상자가 이렇게 쌓였어요.', zh: '泡面箱子堆成这样了。', zhEn: 'The ramen boxes are piled up like this.' },
      tip: '쌓다 是紧音 ㅆ 开头。쌓였다 = 쌓이다(自动词·堆积起来) + 었다 过去式，不是被动', tipEn: '쌓다 starts with the tense consonant ㅆ. 쌓였다 = 쌓이다 (intransitive verb, to pile up) + 었다 (past tense), not passive.',
    },
    {
      id: 'd15-w4',
      korean: '요리',
      hangul: 'yo-ri',
      zh: '做菜；料理', zhEn: 'cooking; cuisine',
      pos: '名词', posEn: 'Noun',
      example: { ko: '요리 배우고 싶어요.', zh: '想学做菜。', zhEn: 'I want to learn to cook.' },
      tip: '요리하다 = 做菜（动词）。요리 单独用是"料理/菜"', tipEn: '요리하다 = to cook (verb). 요리 alone means \'cuisine/dish\'.',
    },
    {
      id: 'd15-w5',
      korean: '배우다',
      hangul: 'bae-u-da',
      zh: '学习', zhEn: 'to study',
      pos: '动词', posEn: 'Verb',
      example: { ko: '한국 요리를 배우고 싶어요.', zh: '想学韩国料理。', zhEn: 'I want to learn Korean cooking.' },
      tip: '배우다 词干"배우"无收音 → 고 싶어요 直接接', tipEn: 'The stem of 배우다 is \'배우\' with no final consonant → attach 고 싶어요 directly.',
    },
    {
      id: 'd15-w6',
      korean: '건강',
      hangul: 'geon-gang',
      zh: '健康', zhEn: 'health',
      pos: '名词', posEn: 'Noun',
      example: { ko: '건강을 위해서 요리를 배울 거예요.', zh: '为了健康要学做饭。', zhEn: 'I need to learn to cook for my health.' },
      tip: '건강 末字"강"有收音 ㅇ → 을 위해서（为了健康）', tipEn: '건강 ends with \'강\' which has the final consonant ㅇ → 을 위해서 (for health).',
    },
  ],

  dialogue: {
    scene: 'Haru发现泡面墙', sceneEn: 'Haru discovers the ramen wall',
    setting: {
      time: '周日下午', timeEn: 'Sunday afternoon',
      place: '兔莉的宿舍', placeEn: 'Tori\'s dorm room',
      npc: 'Haru（仓鼠·邻居）', npcEn: 'Haru (hamster, neighbor)',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '토리… 이거 다 먹은 거야?',
        hangul: 'to-ri… i-geo da meo-geun geo-ya?',
        zh: '兔莉……这些都吃了？', zhEn: 'Tori... you ate all of these?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '편의점이 가까워서…',
        hangul: 'pyeon-ui-jeom-i ga-kka-wo-seo…',
        zh: '便利店很近所以……', zhEn: 'The convenience store is so close, so...',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '벽이야. 라면 벽.',
        hangul: 'byeo-gi-ya. ra-myeon byeok.',
        zh: '这是墙。泡面墙。', zhEn: 'This is a wall. A ramen wall.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '정신 안정 물자… 이렇게 쌓였네…',
        hangul: 'jeong-sin an-jeong mul-ja… i-reo-ke ssa-yeot-ne…',
        zh: '精神稳定物资……堆成这样了……', zhEn: 'Emotional support supplies... piled up like this...',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '하루야, 요리 가르쳐 줘.',
        hangul: 'ha-ru-ya, yo-ri ga-reu-chyeo jwo.',
        zh: 'Haru，教我做菜吧。', zhEn: 'Haru, teach me to cook.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '좋아. 다음 주부터.',
        hangul: 'jo-a. da-eum ju-bu-teo.',
        zh: '好。从下周开始。', zhEn: 'Okay. Starting next week.',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: 'Tori对着泡面墙下决心，然后抬头对 Haru 说——用「~을래요」表达意愿。', zhEn: 'Tori makes a resolution facing the ramen wall, then looks up at Haru and says—using \'~을래요\' to express intention.',
        practice: 'pick',
        choices: [
          { ko: '라면 그만 먹을래요.', zh: '我不想再吃泡面了。', zhEn: 'I don\'t want to eat ramen anymore.', correct: true },
          { ko: '라면 더 사고 싶어요.', zh: '我想再买泡面。', zhEn: 'I want to buy more ramen.', correct: false },
          { ko: '편의점에 갈래요.', zh: '我要去便利店。', zhEn: 'I\'m going to the convenience store.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '想要 / 打算：~고 싶어요 / ~을래요', titleEn: 'Want / Plan: ~고 싶어요 / ~을래요',
    pattern: 'V词干 + **고 싶어요**（想要）  /  V词干(有收音) + **을래요** · V词干(无收音) + **ㄹ래요**（打算/意愿）', patternEn: 'V-stem + **고 싶어요** (want) / V-stem (with batchim) + **을래요** · V-stem (no batchim) + **ㄹ래요** (plan/intention)',
    whenToUse: '表达自己的愿望或意愿。~고 싶어요 偏"内心想法"（想学、想吃、想去），~을래요/ㄹ래요 偏"当下决定/提议"（我要这个、你要喝什么？）。Day 15 兔莉从"我想学做饭"到"我不再吃泡面了"——两种表达都用上了。', whenToUseEn: 'Express your wishes or intentions. ~고 싶어요 leans toward "inner thoughts" (want to learn, eat, go), while ~을래요/ㄹ래요 leans toward "immediate decision/suggestion" (I\'ll take this, what do you want to drink?). Day 15: Tori goes from "I want to learn cooking" to "I won\'t eat ramen anymore"—both expressions are used.',
    rules: [
      '**~고 싶어요 公式**：动词词干 + 고 싶어요 = 想做___。无论词干有无收音，直接接"고"。例：먹다 → 먹고 싶어요（想吃）；배우다 → 배우고 싶어요（想学）',
      '**~을래요/ㄹ래요 公式**：词干有收音 → 을래요；词干无收音 → ㄹ래요。例：먹다(먹有收音ㄱ) → 먹을래요；가다(가无收音) → 갈래요（词干 가 直接接 ㄹ래요，ㄹ 是词尾的一部分不是插入音）',
      '**语气差异**：고 싶어요 = 表达愿望（"我想……"）；을래요 = 表达决心/提议（"我要……"/"你要……吗？"）。고 싶어요 更柔和，을래요 更果断',
      '**否定形式**：~고 싶지 않아요 = 不想做___。例：라면 먹고 싶지 않아요（不想吃泡面）。을래요 的否定直接用 안 + 动词 + 을래요：안 먹을래요（我不吃了）',
      '**疑问用法**：을래요? 常用于提议，相当于"你要不要___？" 例：뭐 먹을래요?（你想吃什么？）/ 같이 갈래요?（一起去吗？）。고 싶어요? 则是问对方想法："뭐 하고 싶어요?"（想做什么？）',
      '**그만 搭配**：그만 + V을래요 = 不再做___了。그만 먹을래요（不吃了）。그만 是"到此为止"的副词，常搭配 을래요 表示决心',
      '**主语限制**：고 싶어요 只能用于第一人称（我想）或疑问句（你想？）。描述第三人称用 ~고 싶어해요。을래요 同样偏第一/第二人称',
    ],
    examples: [
      { ko: '요리 배우고 싶어요.', zh: '想学做菜。', zhEn: 'I want to learn to cook.', highlight: '고 싶어요', note: '배우다 词干"배우"无收音，直接 + 고 싶어요。最基本的愿望句', noteEn: '배우다 stem "배우" has no batchim, so just add + 고 싶어요. The most basic wish sentence.' },
      { ko: '라면 그만 먹을래요.', zh: '我不想再吃泡面了。', zhEn: 'I don\'t want to eat ramen anymore.', highlight: '을래요', note: '먹다 词干"먹"有收音 ㄱ → 을래요。그만 = 到此为止，表达决心', noteEn: '먹다 stem "먹" has batchim ㄱ → 을래요. 그만 = stop here, expressing determination.' },
      { ko: '건강해지고 싶어요.', zh: '想变健康。', zhEn: 'I want to get healthy.', highlight: '고 싶어요', note: '건강해지다(变健康) 词干"건강해지"无收音 → 고 싶어요。해지다 = 하다形容词的"变得"形式', noteEn: '건강해지다 (get healthy) stem "건강해지" has no batchim → 고 싶어요. 해지다 = the "become" form of 하다 adjectives.' },
      { ko: '뭐 먹을래요?', zh: '你想吃什么？', zhEn: 'What do you want to eat?', highlight: '을래요', note: '을래요? 做疑问 = 提议。这是韩国朋友间最常用的约饭问句', noteEn: '을래요? as a question = suggestion. This is the most common way to ask someone to eat together among Korean friends.' },
      { ko: '같이 요리할래요?', zh: '一起做菜吗？', zhEn: 'Want to cook together?', highlight: 'ㄹ래요', note: '요리하다 词干"요리하"无收音 → ㄹ래요（할래요）。하다 类动词: 하 + ㄹ래요 = 할래요', noteEn: '요리하다 stem "요리하" has no batchim → ㄹ래요 (할래요). 하다 verbs: 하 + ㄹ래요 = 할래요' },
    ],
    pitfall:
      '① 고 싶어요 前面只能接动词，不能接形容词！想说"想漂亮"不能说 예쁘고 싶어요 ❌ → 要用 예뻐지고 싶어요 ✓（想变漂亮）。② 을래요/ㄹ래요 的收音判断看词干最后一个字：먹(ㄱ收音) → 먹을래요；하(无收音) → 할래요。③ 初学者常错写"먹을레요" ❌ → 正确是 먹을래요（래 不是 레）。',
  },

  output: [
    {
      id: 'd15-o1',
      kind: 'compose',
      zhHint: '想学做菜。', zhHintEn: 'I want to learn to cook.',
      tokens: ['요리', '배우고', '싶어요', '먹고', '할래요', '배울래요'],
      composeAnswer: ['요리', '배우고', '싶어요'],
      successMsg: '요리 배우고 싶어요 — 从今天起，Tori不再只靠泡面了。', successMsgEn: '요리 배우고 싶어요 — From today, Tori won\'t just rely on ramen anymore.',
    },
    {
      id: 'd15-o2',
      kind: 'listen-choice',
      audioKo: '라면 그만 먹을래요.',
      successMsg: '✓ 그만 먹을래요 = 不吃了。这是Tori今天最大的决心。', successMsgEn: '✓ 그만 먹을래요 = I won\'t eat it anymore. This is Tori\'s biggest resolve today.',
      choices: [
        { zh: '我不想再吃泡面了。', zhEn: 'I don\'t want to eat ramen anymore.', correct: true },
        { zh: '我想再吃泡面。', zhEn: 'I want to eat ramen again.', correct: false },
        { zh: '请教我做泡面。', zhEn: 'Please teach me how to make ramen.', correct: false },
        { zh: '泡面很好吃。', zhEn: 'Ramen is delicious.', correct: false },
      ],
    },
    {
      id: 'd15-o3',
      kind: 'zh-to-ko',
      zhPrompt: '想学韩国料理。', zhPromptEn: 'I want to learn Korean cooking.',
      successMsg: '"한국 요리를 배우고 싶어요." — 배우다 + 고 싶어요，完美。', successMsgEn: '"한국 요리를 배우고 싶어요." — 배우다 + 고 싶어요, perfect.',
      choices: [
        { ko: '한국 요리를 배우고 싶어요.', correct: true },
        { ko: '한국 요리를 배울래요.', correct: false },
        { ko: '한국 요리가 배우고 싶어요.', correct: false },
        { ko: '한국 요리를 배우고 싶다.', correct: false },
      ],
    },
    {
      id: 'd15-o4',
      kind: 'particle-error',
      zhHint: '我不想再吃泡面了。', zhHintEn: 'I don\'t want to eat ramen anymore.',
      successMsg: '먹(有收音ㄱ) → 을래요；라면(有收音ㄴ) → 그만 먹을래요。', successMsgEn: '먹 (has batchim ㄱ) → 을래요; 라면 (has batchim ㄴ) → 그만 먹을래요.',
      choices: [
        { ko: '라면 그만 먹을래요.', correct: true },
        { ko: '라면 그만 먹ㄹ래요.', correct: false },
        { ko: '라면 그만 먹을레요.', correct: false },
        { ko: '라면 그만 먹래요.', correct: false },
      ],
    },
    {
      id: 'd15-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 15 核心词全对。下周，Haru的厨房课开课！', successMsgEn: '✓ Day 15 core words all correct. Next week, Haru\'s cooking class begins!',
      pairs: [
        { ko: '라면', zh: '泡面', zhEn: 'Ramen' },
        { ko: '벽', zh: '墙', zhEn: 'Wall' },
        { ko: '쌓다', zh: '堆积', zhEn: 'piled up' },
        { ko: '요리', zh: '做菜', zhEn: 'Cooking' },
        { ko: '배우다', zh: '学习', zhEn: 'to study' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '오늘부터 달라질 거예요. 토리, 잘 결심했어요!',
    preview: '宿舍合同快到期了——明天第一次推开中介所的门，试着说出"원룸 찾고 있어요"（我在找一居室）。', previewEn: 'The dorm contract is almost up—tomorrow I\'ll push open the realtor\'s door for the first time and try saying "원룸 찾고 있어요" (I\'m looking for a studio).',
    stickerId: 'sticker-d15',
    sceneImageUrl: '/images/diary/day-15-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「고 싶어요和을래요有什么区别？」「怎么说"我不想再做某事了"？」',
};
