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
  title: '泡面墙 · 精神稳定物资',
  subtitle: 'Haru戳中痛处，Tori决定学做饭',
  heroImageUrl: '/images/diary/day-15-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 15일 · 일요일 오후',
    weather: '兽尔 · 晴',
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
      zh: '泡面',
      pos: '名词',
      example: { ko: '라면을 너무 많이 먹었어요.', zh: '泡面吃太多了。' },
      tip: '라면 末字"면"有收音 ㄴ → 을 而非 를',
    },
    {
      id: 'd15-w2',
      korean: '벽',
      hangul: 'byeok',
      zh: '墙',
      pos: '名词',
      example: { ko: '라면 상자가 벽이 됐어요.', zh: '泡面箱子变成了一面墙。' },
      tip: '벽 有收音 ㄱ。"벽이"连读时发 [벼기]',
    },
    {
      id: 'd15-w3',
      korean: '쌓다',
      hangul: 'ssat-da',
      zh: '堆积',
      pos: '动词',
      example: { ko: '라면 상자가 이렇게 쌓였어요.', zh: '泡面箱子堆成这样了。' },
      tip: '쌓다 是紧音 ㅆ 开头。쌓였다 = 쌓이다(自动词·堆积起来) + 었다 过去式，不是被动',
    },
    {
      id: 'd15-w4',
      korean: '요리',
      hangul: 'yo-ri',
      zh: '做菜；料理',
      pos: '名词',
      example: { ko: '요리 배우고 싶어요.', zh: '想学做菜。' },
      tip: '요리하다 = 做菜（动词）。요리 单独用是"料理/菜"',
    },
    {
      id: 'd15-w5',
      korean: '배우다',
      hangul: 'bae-u-da',
      zh: '学习',
      pos: '动词',
      example: { ko: '한국 요리를 배우고 싶어요.', zh: '想学韩国料理。' },
      tip: '배우다 词干"배우"无收音 → 고 싶어요 直接接',
    },
    {
      id: 'd15-w6',
      korean: '건강',
      hangul: 'geon-gang',
      zh: '健康',
      pos: '名词',
      example: { ko: '건강을 위해서 요리를 배울 거예요.', zh: '为了健康要学做饭。' },
      tip: '건강 末字"강"有收音 ㅇ → 을 위해서（为了健康）',
    },
  ],

  dialogue: {
    scene: 'Haru发现泡面墙',
    setting: {
      time: '周日下午',
      place: '兔莉的宿舍',
      npc: 'Haru（仓鼠·邻居）',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '토리… 이거 다 먹은 거야?',
        hangul: 'to-ri… i-geo da meo-geun geo-ya?',
        zh: '兔莉……这些都吃了？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '편의점이 가까워서…',
        hangul: 'pyeon-ui-jeom-i ga-kka-wo-seo…',
        zh: '便利店很近所以……',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '벽이야. 라면 벽.',
        hangul: 'byeo-gi-ya. ra-myeon byeok.',
        zh: '这是墙。泡面墙。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '정신 안정 물자… 이렇게 쌓였네…',
        hangul: 'jeong-sin an-jeong mul-ja… i-reo-ke ssa-yeot-ne…',
        zh: '精神稳定物资……堆成这样了……',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '하루야, 요리 가르쳐 줘.',
        hangul: 'ha-ru-ya, yo-ri ga-reu-chyeo jwo.',
        zh: 'Haru，教我做菜吧。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '좋아. 다음 주부터.',
        hangul: 'jo-a. da-eum ju-bu-teo.',
        zh: '好。从下周开始。',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: 'Tori对着泡面墙下决心，然后抬头对 Haru 说——用「~을래요」表达意愿。',
        practice: 'pick',
        choices: [
          { ko: '라면 그만 먹을래요.', zh: '我不想再吃泡面了。', correct: true },
          { ko: '라면 더 사고 싶어요.', zh: '我想再买泡面。', correct: false },
          { ko: '편의점에 갈래요.', zh: '我要去便利店。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '想要 / 打算：~고 싶어요 / ~을래요',
    pattern: 'V词干 + **고 싶어요**（想要）  /  V词干(有收音) + **을래요** · V词干(无收音) + **ㄹ래요**（打算/意愿）',
    whenToUse: '表达自己的愿望或意愿。~고 싶어요 偏"内心想法"（想学、想吃、想去），~을래요/ㄹ래요 偏"当下决定/提议"（我要这个、你要喝什么？）。Day 15 兔莉从"我想学做饭"到"我不再吃泡面了"——两种表达都用上了。',
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
      { ko: '요리 배우고 싶어요.', zh: '想学做菜。', highlight: '고 싶어요', note: '배우다 词干"배우"无收音，直接 + 고 싶어요。最基本的愿望句' },
      { ko: '라면 그만 먹을래요.', zh: '我不想再吃泡面了。', highlight: '을래요', note: '먹다 词干"먹"有收音 ㄱ → 을래요。그만 = 到此为止，表达决心' },
      { ko: '건강해지고 싶어요.', zh: '想变健康。', highlight: '고 싶어요', note: '건강해지다(变健康) 词干"건강해지"无收音 → 고 싶어요。해지다 = 하다形容词的"变得"形式' },
      { ko: '뭐 먹을래요?', zh: '你想吃什么？', highlight: '을래요', note: '을래요? 做疑问 = 提议。这是韩国朋友间最常用的约饭问句' },
      { ko: '같이 요리할래요?', zh: '一起做菜吗？', highlight: 'ㄹ래요', note: '요리하다 词干"요리하"无收音 → ㄹ래요（할래요）。하다 类动词: 하 + ㄹ래요 = 할래요' },
    ],
    pitfall:
      '① 고 싶어요 前面只能接动词，不能接形容词！想说"想漂亮"不能说 예쁘고 싶어요 ❌ → 要用 예뻐지고 싶어요 ✓（想变漂亮）。② 을래요/ㄹ래요 的收音判断看词干最后一个字：먹(ㄱ收音) → 먹을래요；하(无收音) → 할래요。③ 初学者常错写"먹을레요" ❌ → 正确是 먹을래요（래 不是 레）。',
  },

  output: [
    {
      id: 'd15-o1',
      kind: 'compose',
      zhHint: '想学做菜。',
      tokens: ['요리', '배우고', '싶어요', '먹고', '할래요', '배울래요'],
      composeAnswer: ['요리', '배우고', '싶어요'],
      successMsg: '요리 배우고 싶어요 — 从今天起，Tori不再只靠泡面了。',
    },
    {
      id: 'd15-o2',
      kind: 'listen-choice',
      audioKo: '라면 그만 먹을래요.',
      successMsg: '✓ 그만 먹을래요 = 不吃了。这是Tori今天最大的决心。',
      choices: [
        { zh: '我不想再吃泡面了。', correct: true },
        { zh: '我想再吃泡面。', correct: false },
        { zh: '请教我做泡面。', correct: false },
        { zh: '泡面很好吃。', correct: false },
      ],
    },
    {
      id: 'd15-o3',
      kind: 'zh-to-ko',
      zhPrompt: '想学韩国料理。',
      successMsg: '"한국 요리를 배우고 싶어요." — 배우다 + 고 싶어요，完美。',
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
      zhHint: '我不想再吃泡面了。',
      successMsg: '먹(有收音ㄱ) → 을래요；라면(有收音ㄴ) → 그만 먹을래요。',
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
      successMsg: '✓ Day 15 核心词全对。下周，Haru的厨房课开课！',
      pairs: [
        { ko: '라면', zh: '泡面' },
        { ko: '벽', zh: '墙' },
        { ko: '쌓다', zh: '堆积' },
        { ko: '요리', zh: '做菜' },
        { ko: '배우다', zh: '学习' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '오늘부터 달라질 거예요. 토리, 잘 결심했어요!',
    preview: '宿舍合同快到期了——明天第一次推开中介所的门，试着说出"원룸 찾고 있어요"（我在找一居室）。',
    stickerId: 'sticker-d15',
    sceneImageUrl: '/images/diary/day-15-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「고 싶어요和을래요有什么区别？」「怎么说"我不想再做某事了"？」',
};
