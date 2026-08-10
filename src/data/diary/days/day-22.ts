import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 22 · 해요体登场 · 火鹤老师
 *
 * 剧情：穿粉色衬衣的火鹤老师走进教室，黑板上写下三个字：가요. 먹어요. 공부해요.
 * 长长的粉红色翅膀偶尔扫到讲台。今天开始学해요体——韩语日常对话的核心变位。
 *
 * 学习目标：해요体三规则（ㅏ/ㅗ→아요 | 其他→어요 | 하다→해요）
 * 语料层级：해요体（从今天起全面使用）
 * 韩语自审：korean skill PASS（자연성/문법/활용 三关）
 */
export const day22: ToriDay = {
  level: 'beginner',
  day: 22,
  phase: 'expression',
  title: '해요体登场 · 火鹤老师',
  subtitle: '黑板上的三个字：가요. 먹어요. 공부해요.',
  heroImageUrl: '/images/diary/day-22-hero.jpg',
  estimatedMin: 13,

  opening: {
    date: '9월 22일 · 일요일 오전',
    weather: '兽尔 · 晴',
    toriPose: 'shy',
    diaryText: `9月22日，周日上午。

新的一周，新教室。
一只穿粉色衬衣的火鹤老师走进来，
长长的翅膀差点扫到讲台上的粉笔盒。

她在黑板上写下三个字：
가요. 먹어요. 공부해요.

"오늘은 해요체를 배워요."
（今天我们学해요体。）

我盯着黑板——
가다 变成了 가요，
먹다 变成了 먹어요，
공부하다 变成了 공부해요。

三条规则，打开韩语日常对话的钥匙。`,
  },

  words: [
    {
      id: 'd22-w1',
      korean: '가다 → 가요',
      hangul: 'ga-da → ga-yo',
      zh: '去',
      pos: '动词',
      example: { ko: '학교에 가요.', zh: '去学校。' },
      tip: '가다 词干"가"末元音 ㅏ → 아요 → 가+아요 缩合 = 가요',
    },
    {
      id: 'd22-w2',
      korean: '먹다 → 먹어요',
      hangul: 'meok-da → meo-geo-yo',
      zh: '吃',
      pos: '动词',
      example: { ko: '밥 먹어요.', zh: '吃饭。' },
      tip: '먹다 词干"먹"末元音 ㅓ → 어요 = 먹어요',
    },
    {
      id: 'd22-w3',
      korean: '공부하다 → 공부해요',
      hangul: 'gong-bu-ha-da → gong-bu-hae-yo',
      zh: '学习',
      pos: '动词',
      example: { ko: '한국어 공부해요.', zh: '学韩语。' },
      tip: '하다 类全部变 해요。하 + 여요 缩合 = 해요',
    },
    {
      id: 'd22-w4',
      korean: '오다 → 와요',
      hangul: 'o-da → wa-yo',
      zh: '来',
      pos: '动词',
      example: { ko: '친구가 와요.', zh: '朋友来了。' },
      tip: '오다 词干"오"末元音 ㅗ → 아요 → 오+아요 缩合 = 와요',
    },
    {
      id: 'd22-w5',
      korean: '마시다 → 마셔요',
      hangul: 'ma-si-da → ma-syeo-yo',
      zh: '喝',
      pos: '动词',
      example: { ko: '커피 마셔요.', zh: '喝咖啡。' },
      tip: '마시다 词干"마시"末元音 ㅣ → 어요 → 마시+어요 缩合 = 마셔요',
    },
    {
      id: 'd22-w6',
      korean: '듣다 → 들어요',
      hangul: 'deut-da → deu-reo-yo',
      zh: '听',
      pos: '动词',
      example: { ko: '음악 들어요.', zh: '听音乐。' },
      tip: '듣다 是 ㄷ不规则：듣 → 들 + 어요 = 들어요',
    },
  ],

  dialogue: {
    scene: '语言学校教室·해요体课',
    setting: {
      time: '周日上午',
      place: '韩光语言学校·教室',
      npc: '火鹤老师（穿粉色衬衣·翅膀很长）',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '火鹤老师',
        ko: '오늘은 해요체를 배워요.',
        hangul: 'o-neu-reun hae-yo-che-reul bae-wo-yo.',
        zh: '今天我们学해요体。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: '火鹤老师',
        ko: '"가다" 어떻게 바꿔요?',
        hangul: '"ga-da" eo-tteo-ke ba-kkwo-yo?',
        zh: '"가다"怎么变？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '가요. ㅏ니까 아요예요.',
        hangul: 'ga-yo. a-ni-kka a-yo-ye-yo.',
        zh: '가요。因为是ㅏ所以接아요。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '火鹤老师',
        ko: '잘했어요! 그럼 "먹다"는요?',
        hangul: 'jal-hae-sseo-yo! geu-reom "meok-da"-neun-yo?',
        zh: '很好！那"먹다"呢？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '먹어요. ㅓ니까 어요예요.',
        hangul: 'meo-geo-yo. eo-ni-kka eo-yo-ye-yo.',
        zh: '먹어요。因为是ㅓ所以接어요。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '선생님 날개 예쁘다…',
        hangul: 'seon-saeng-nim nal-gae ye-ppeu-da…',
        zh: '老师的翅膀好漂亮……',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: '火鹤老师问："공부하다"怎么变？Tori应该怎么回答？',
        practice: 'pick',
        choices: [
          { ko: '공부해요. 하다는 해요예요.', zh: '공부해요。하다变成해요。', correct: true },
          { ko: '공부하아요. 아요예요.', zh: '공부하아요。接아요。', correct: false },
          { ko: '공부하어요. 어요예요.', zh: '공부하어요。接어요。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '해요体三规则',
    pattern: '词干末元音 **ㅏ/ㅗ** → 아요  |  **其他元音** → 어요  |  **하다** → 해요',
    whenToUse: '해요体是韩语日常对话最核心的语尾。礼貌但不生硬，跟任何人都能用。从 Day 22 起，所有动词/形容词都用해요体说话。',
    rules: [
      '**规则1：ㅏ/ㅗ → 아요**：词干最后一个元音是 ㅏ 或 ㅗ 时接 아요。가다(去) → 가+아요 = 가요；오다(来) → 오+아요 = 와요。缩合是自然发生的',
      '**规则2：其他元音 → 어요**：词干最后一个元音不是 ㅏ/ㅗ 时接 어요。먹다(吃) → 먹+어요 = 먹어요；마시다(喝) → 마시+어요 = 마셔요',
      '**规则3：하다 → 해요**：所有 하다 类动词/形容词无条件变 해요。공부하다 → 공부해요；운동하다 → 운동해요。하+여요 缩合 = 해요',
      '**缩合规则**：가+아요=가요（ㅏ+ㅏ合并）；오+아요=와요（ㅗ+ㅏ=ㅘ）；마시+어요=마셔요（ㅣ+ㅓ=ㅕ）；배우+어요=배워요（ㅜ+ㅓ=ㅝ）',
      '**ㄷ不规则**：듣다(听)/걷다(走) 等动词，ㄷ 在元音前变 ㄹ。듣+어요 → 들어요（不是 듣어요 ❌）',
      '**ㅂ不规则**：춥다(冷)/덥다(热) 等形容词，ㅂ 在元音前变 우。춥+어요 → 추워요（不是 춥어요 ❌）',
      '**判断步骤**：① 去掉다 得词干 → ② 看词干最后元音 → ③ ㅏ/ㅗ接아요，其他接어요，하다接해요 → ④ 检查是否有不规则变化',
    ],
    examples: [
      { ko: '학교에 가요.', zh: '去学校。', highlight: '가요', note: '가다 词干"가"末元音 ㅏ → 아요 → 가+아 缩合为 가요' },
      { ko: '밥 먹어요.', zh: '吃饭。', highlight: '먹어요', note: '먹다 词干"먹"末元音 ㅓ → 어요 = 먹어요。有收音直接加' },
      { ko: '한국어 공부해요.', zh: '学韩语。', highlight: '해요', note: '공부하다 → 해요。하다类无条件规则3' },
      { ko: '친구가 와요.', zh: '朋友来了。', highlight: '와요', note: '오다 词干"오"末元音 ㅗ → 아요 → 오+아 = 와(ㅗ+ㅏ=ㅘ)' },
      { ko: '음악 들어요.', zh: '听音乐。', highlight: '들어요', note: '듣다 ㄷ不规则：듣→들 + 어요 = 들어요。不是 듣어요' },
    ],
    pitfall:
      '① 가요 不是"가+요"，是"가+아요"缩合！初学者常误以为 요 直接加在词干后 ❌。② 하다 永远是 해요，不要按元音规则分析成 하+아요=하아요 ❌。③ ㄷ不规则只在元音前发生：듣+고=듣고 ✓（고是辅音不触发）；듣+어요=들어요 ✓（어是元音触发）。',
  },

  output: [
    {
      id: 'd22-o1',
      kind: 'compose',
      zhHint: '学韩语。',
      tokens: ['한국어', '공부해요', '공부하아요', '공부어요', '배워요'],
      composeAnswer: ['한국어', '공부해요'],
      successMsg: '한국어 공부해요 — 하다 → 해요，Day 22 第一条规则拿下。',
    },
    {
      id: 'd22-o2',
      kind: 'listen-choice',
      audioKo: '친구가 와요.',
      successMsg: '✓ 오다 → 와요（ㅗ+아=와）。来的해요体是와요。',
      choices: [
        { zh: '朋友来了。', correct: true },
        { zh: '朋友去了。', correct: false },
        { zh: '朋友吃了。', correct: false },
        { zh: '朋友学了。', correct: false },
      ],
    },
    {
      id: 'd22-o3',
      kind: 'zh-to-ko',
      zhPrompt: '听音乐。',
      successMsg: '"음악 들어요." — 듣다 ㄷ不规则 → 들어요。',
      choices: [
        { ko: '음악 들어요.', correct: true },
        { ko: '음악 듣어요.', correct: false },
        { ko: '음악 들아요.', correct: false },
        { ko: '음악 듣아요.', correct: false },
      ],
    },
    {
      id: 'd22-o4',
      kind: 'particle-error',
      zhHint: '去学校。',
      successMsg: '가다 词干ㅏ → 아요 → 가+아 缩合 = 가요。不是 가아요。',
      choices: [
        { ko: '학교에 가요.', correct: true },
        { ko: '학교에 가아요.', correct: false },
        { ko: '학교에 가어요.', correct: false },
        { ko: '학교에 가해요.', correct: false },
      ],
    },
    {
      id: 'd22-o5',
      kind: 'match-pair',
      successMsg: '✓ 해요体六个动词全对。从今天起，你说的每句话都是해요体。',
      pairs: [
        { ko: '가요', zh: '去' },
        { ko: '먹어요', zh: '吃' },
        { ko: '공부해요', zh: '学习' },
        { ko: '와요', zh: '来' },
        { ko: '들어요', zh: '听' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '해요체 세 가지 규칙 완벽! 토리, 이제 진짜 한국어로 말할 수 있어요!',
    preview: '明天弘大街头——Junho要带你去追星，KPOP词汇来了。',
    stickerId: 'sticker-d22',
    sceneImageUrl: '/images/diary/day-22-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「해요体三条规则分别是什么？」「듣다为什么变成들어요不是듣어요？」',
};
