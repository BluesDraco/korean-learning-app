import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 34 · Haru의 비밀 · 为什么帮我
 *
 * 剧情：Tori终于问Haru那天地铁里为什么帮她。Haru沉默一下，说"너를 보면 옛날 친구가 생각나"
 * （看到你会想起以前的一个朋友）。Tori问是谁，Haru说"나중에"（以后）。伏笔埋深。
 *
 * 学习目标：생각나다 / 나중에 / ~게 하다 使动固定表达
 * 语料层级：해요体 + 반말（Haru 私人对话切换）
 * 韩语自审：korean skill PASS
 */
export const day34: ToriDay = {
  level: 'intermediate',
  day: 4,
  phase: 'expansion',
  title: 'Haru的秘密 · 为什么帮我',
  subtitle: '"你让我想起一个人"',
  heroImageUrl: '/images/diary/day-34-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 7일 · 월요일 저녁',
    weather: '兽尔 · 阴',
    toriPose: 'shy',
    diaryText: `10月7日，周一晚上。

Haru来我房间还砂锅。
我倒了两杯麦茶，把想问了一个月的问题问出口——

"하루야, 그날 지하철에서, 왜 나를 도와줬어?"
（Haru，那天地铁里，为什么帮我？）

Haru把杯子放下。
沉默了大概三秒。

"…너를 보면 옛날 친구가 생각나."
（……看到你，会想起以前的一个朋友。）

"누구야?"（是谁？）
我小声问。

Haru笑了一下，摇摇头：
"나중에 알려줄게. 지금은 아니야."
（以后再告诉你。现在还不是时候。）

我没再追问。
但"나중에"这个词，
悄悄地在我心里住下来。`,
  },

  words: [
    {
      id: 'd34-w1',
      korean: '옛날',
      hangul: 'yen-nal',
      zh: '以前/往日',
      pos: '名词',
      example: { ko: '옛날 친구가 생각나요.', zh: '想起以前的朋友。' },
      tip: '옛(旧) + 날(日) = 往日。发音 [옌날]',
    },
    {
      id: 'd34-w2',
      korean: '생각나다',
      hangul: 'saeng-gak-na-da',
      zh: '想起/浮现',
      pos: '动词',
      example: { ko: '엄마가 생각나요.', zh: '想起妈妈了。' },
      tip: '생각(想法) + 나다(出现) = 想起。는 조사 아님, 이/가 필요',
    },
    {
      id: 'd34-w3',
      korean: '나중에',
      hangul: 'na-jung-e',
      zh: '以后/回头再',
      pos: '副词',
      example: { ko: '나중에 알려줄게.', zh: '以后再告诉你。' },
      tip: '나중(以后) + 에(时点助词)。承诺"以后再说"的固定用法',
    },
    {
      id: 'd34-w4',
      korean: '비밀',
      hangul: 'bi-mil',
      zh: '秘密',
      pos: '名词',
      example: { ko: '이건 비밀이에요.', zh: '这是秘密。' },
      tip: '汉字词秘(비) + 密(밀)。비밀을 지키다 = 保守秘密',
    },
    {
      id: 'd34-w5',
      korean: '닮다',
      hangul: 'dam-da',
      zh: '像/相似',
      pos: '动词',
      example: { ko: '너 그 친구랑 닮았어.', zh: '你和那个朋友很像。' },
      tip: '收音 ㄻ → 读音 [담따]。~을/를 닮다 = 长得像～',
    },
    {
      id: 'd34-w6',
      korean: '알려주다',
      hangul: 'al-lyeo-ju-da',
      zh: '告知/让___知道',
      pos: '动词',
      example: { ko: '나중에 알려줄게.', zh: '以后再告诉你。' },
      tip: '알다(知道) → 알리다(使动) → 알려주다。使别人知道',
    },
  ],

  dialogue: {
    scene: '301号房·两杯麦茶',
    setting: {
      time: '周一夜',
      place: 'Tori的宿舍·301',
      npc: 'Haru',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '하루야, 하나 물어봐도 돼?',
        hangul: 'ha-ru-ya, ha-na mu-reo-bwa-do dwae?',
        zh: 'Haru，我能问一件事吗？',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '그날 지하철에서, 왜 나를 도와줬어?',
        hangul: 'geu-nal ji-ha-cheo-re-seo, wae na-reul do-wa-jwo-sseo?',
        zh: '那天地铁里，为什么帮我？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '…너를 보면 옛날 친구가 생각나.',
        hangul: 'neo-reul bo-myeon yen-nal chin-gu-ga saeng-gak-na',
        zh: '……看到你，会想起以前的一个朋友。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '옛날 친구? 누구지?',
        hangul: 'yen-nal chin-gu? nu-gu-ji?',
        zh: '以前的朋友？是谁呢？',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '나중에 알려줄게. 지금은 아니야.',
        hangul: 'na-jung-e al-lyeo-jul-ge. ji-geu-meun a-ni-ya',
        zh: '以后再告诉你。现在还不是时候。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Haru刚说了"以后再告诉你"，Tori不想追问但想让Haru安心。合适的回应是？',
        practice: 'pick',
        choices: [
          { ko: '응, 나중에 얘기해 줘.', zh: '嗯，以后再告诉我吧。', correct: true },
          { ko: '지금 말해 줘.', zh: '现在就告诉我。', correct: false },
          { ko: '그럼 됐어.', zh: '那算了。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '想起来了：생각나다',
    pattern: 'N + **이/가** + **생각나다** / **생각나요**',
    whenToUse: '「想起某人/某事」的固定表达。Haru说「옛날 친구가 생각나」——不是"我想那个朋友"，而是"那个朋友(自动地)在我脑海里浮现"。生각나다 是自动词，主语用**이/가**（不是을/를），初学者最容易搞混的一个。',
    rules: [
      '**基本公式**：N**이/가** 생각나요 = 想起N。主语用 이/가 因为是"N自己浮现"（自动词）',
      '**过去时 → 생각났어요**：어제 엄마가 생각났어요 = 昨天想起妈妈了',
      '**否定 → 생각이 안 나요**：이름이 생각이 안 나요 = 想不起名字。注意"안"要放在생각和나요中间',
      '**~을/를 记住**：生각나다(想起，自动) vs 生각하다(想，他动)。생각하다 才能用을/를：저는 엄마를 생각해요（我在想妈妈）',
    ],
    examples: [
      { ko: '옛날 친구가 생각나요.', zh: '想起以前的朋友。', highlight: '친구가', note: '친구 无收音 → 이/가 中的 **가**。생각나다 主语必须 이/가' },
      { ko: '엄마가 갑자기 생각났어요.', zh: '突然想起妈妈了。', highlight: '생각났어요', note: '生각나다 → 생각났어요（过去时）。갑자기 = 突然，最常搭配' },
      { ko: '그 사람 이름이 생각이 안 나요.', zh: '想不起那个人的名字。', highlight: '생각이 안 나요', note: '否定要说 "생각이 안 나요"，不是 "안 생각나요"。母语者习惯' },
      { ko: '너를 보면 그 친구가 생각나.', zh: '看到你就会想起那个朋友。', highlight: '보면 ... 생각나', note: 'Haru的原句。~(으)면(如果) + 생각나(반말)。看到某物→触发回忆的经典搭配' },
    ],
    pitfall:
      '① 主语必须 **이/가** 不是 **을/를**：❌ 엄마를 생각나요 → ✅ 엄마가 생각나요。② 否定不说 "안 생각나요"，要说 "생각이 안 나요"（생각和나요之间插入 이 안）。③ 「想念」和「想起」不同——想念用 보고 싶다，想起用 생각나다。想妈妈：엄마가 보고 싶어요（长期）/ 엄마가 생각나요（突然）',
  },

  output: [
    {
      id: 'd34-o1',
      kind: 'compose',
      zhHint: '看到你会想起以前的朋友。',
      tokens: ['너를', '보면', '옛날 친구가', '생각나', '옛날 친구를', '생각해'],
      composeAnswer: ['너를', '보면', '옛날 친구가', '생각나'],
      successMsg: 'Haru的原话。这一句藏着一个人。',
    },
    {
      id: 'd34-o2',
      kind: 'listen-choice',
      audioKo: '나중에 알려줄게. 지금은 아니야.',
      successMsg: '✓ 承诺"以后再说"的口语原句。',
      choices: [
        { zh: '以后再告诉你。现在还不是时候。', correct: true },
        { zh: '以后不告诉你了。', correct: false },
        { zh: '现在马上告诉你。', correct: false },
        { zh: '这不是秘密。', correct: false },
      ],
    },
    {
      id: 'd34-o3',
      kind: 'zh-to-ko',
      zhPrompt: '想不起那个人的名字。',
      successMsg: '"그 사람 이름이 생각이 안 나요." — 否定要用 "생각이 안 나요"。',
      choices: [
        { ko: '그 사람 이름이 생각이 안 나요.', correct: true },
        { ko: '그 사람 이름이 안 생각나요.', correct: false },
        { ko: '그 사람 이름을 생각이 안 나요.', correct: false },
        { ko: '그 사람 이름은 생각을 안 나요.', correct: false },
      ],
    },
    {
      id: 'd34-o4',
      kind: 'particle-error',
      zhHint: '突然想起妈妈了。',
      successMsg: '엄마 无收音 → **가**。생각나다 是自动词，主语用 이/가。',
      choices: [
        { ko: '엄마가 갑자기 생각났어요.', correct: true },
        { ko: '엄마를 갑자기 생각났어요.', correct: false },
        { ko: '엄마는 갑자기 생각났어요.', correct: false },
        { ko: '엄마에게 갑자기 생각났어요.', correct: false },
      ],
    },
    {
      id: 'd34-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 34 核心词全对。나중에——Tori 会等的。',
      pairs: [
        { ko: '옛날', zh: '以前' },
        { ko: '생각나다', zh: '想起' },
        { ko: '나중에', zh: '以后' },
        { ko: '비밀', zh: '秘密' },
        { ko: '닮다', zh: '相像' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '어려운 질문도 했어요. 하루의 비밀은 나중에——지금은 여기까지.',
    preview: '明天，Tori第一次被兽尔本地人问路——她能答上来吗？',
    stickerId: 'sticker-d34',
    sceneImageUrl: '/images/diary/day-34-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「생각나다 和 생각하다 有什么区别？」「하루의 옛날 친구는 누구일까?」',
};
