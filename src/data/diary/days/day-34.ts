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
  title: 'Haru的秘密 · 为什么帮我', titleEn: 'Haru\'s Secret · Why Did You Help Me',
  subtitle: '"你让我想起一个人"', subtitleEn: '"You remind me of someone"',
  heroImageUrl: '/images/diary/day-34-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 7일 · 월요일 저녁',
    weather: '兽尔 · 阴', weatherEn: 'Soo-ah · Yin',
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
      zh: '以前/往日', zhEn: 'past / former days',
      pos: '名词', posEn: 'Noun',
      example: { ko: '옛날 친구가 생각나요.', zh: '想起以前的朋友。', zhEn: 'Reminds me of a friend from the past.' },
      tip: '옛(旧) + 날(日) = 往日。发音 [옌날]', tipEn: '옛(old) + 날(day) = past days. Pronounced [옌날]',
    },
    {
      id: 'd34-w2',
      korean: '생각나다',
      hangul: 'saeng-gak-na-da',
      zh: '想起/浮现', zhEn: 'to recall / to come to mind',
      pos: '动词', posEn: 'Verb',
      example: { ko: '엄마가 생각나요.', zh: '想起妈妈了。', zhEn: 'I thought of my mom.' },
      tip: '생각(想法) + 나다(出现) = 想起。는 조사 아님, 이/가 필요', tipEn: '생각(thought) + 나다(to appear) = to recall. Note: not 는 particle; use 이/가',
    },
    {
      id: 'd34-w3',
      korean: '나중에',
      hangul: 'na-jung-e',
      zh: '以后/回头再', zhEn: 'later / another time',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '나중에 알려줄게.', zh: '以后再告诉你。', zhEn: 'I\'ll tell you later.' },
      tip: '나중(以后) + 에(时点助词)。承诺"以后再说"的固定用法', tipEn: '나중(later) + 에(time particle). Fixed expression for promising "tell you later"',
    },
    {
      id: 'd34-w4',
      korean: '비밀',
      hangul: 'bi-mil',
      zh: '秘密', zhEn: 'secret',
      pos: '名词', posEn: 'Noun',
      example: { ko: '이건 비밀이에요.', zh: '这是秘密。', zhEn: 'This is a secret.' },
      tip: '汉字词秘(비) + 密(밀)。비밀을 지키다 = 保守秘密', tipEn: 'Sino-Korean word 비(secret) + 밀(dense). 비밀을 지키다 = to keep a secret',
    },
    {
      id: 'd34-w5',
      korean: '닮다',
      hangul: 'dam-da',
      zh: '像/相似', zhEn: 'to resemble / similar',
      pos: '动词', posEn: 'Verb',
      example: { ko: '너 그 친구랑 닮았어.', zh: '你和那个朋友很像。', zhEn: 'You look a lot like that friend.' },
      tip: '收音 ㄻ → 读音 [담따]。~을/를 닮다 = 长得像～', tipEn: 'Final consonant ㄻ → pronounced [담따]. ~을/를 닮다 = to look like ~',
    },
    {
      id: 'd34-w6',
      korean: '알려주다',
      hangul: 'al-lyeo-ju-da',
      zh: '告知/让___知道', zhEn: 'to inform / to let ___ know',
      pos: '动词', posEn: 'Verb',
      example: { ko: '나중에 알려줄게.', zh: '以后再告诉你。', zhEn: 'I\'ll tell you later.' },
      tip: '알다(知道) → 알리다(使动) → 알려주다。使别人知道', tipEn: '알다(to know) → 알리다(causative) → 알려주다. To make someone know',
    },
  ],

  dialogue: {
    scene: '301号房·两杯麦茶', sceneEn: 'Room 301 · Two Glasses of Barley Tea',
    setting: {
      time: '周一夜', timeEn: 'Monday Night',
      place: 'Tori的宿舍·301', placeEn: 'Tori\'s Dorm · 301',
      npc: 'Haru',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '하루야, 하나 물어봐도 돼?',
        hangul: 'ha-ru-ya, ha-na mu-reo-bwa-do dwae?',
        zh: 'Haru，我能问一件事吗？', zhEn: 'Haru, can I ask you something?',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '그날 지하철에서, 왜 나를 도와줬어?',
        hangul: 'geu-nal ji-ha-cheo-re-seo, wae na-reul do-wa-jwo-sseo?',
        zh: '那天地铁里，为什么帮我？', zhEn: 'Why did you help me on the subway that day?',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '…너를 보면 옛날 친구가 생각나.',
        hangul: 'neo-reul bo-myeon yen-nal chin-gu-ga saeng-gak-na',
        zh: '……看到你，会想起以前的一个朋友。', zhEn: '...Seeing you reminds me of a friend from the past.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '옛날 친구? 누구지?',
        hangul: 'yen-nal chin-gu? nu-gu-ji?',
        zh: '以前的朋友？是谁呢？', zhEn: 'A friend from the past? Who is it?',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '나중에 알려줄게. 지금은 아니야.',
        hangul: 'na-jung-e al-lyeo-jul-ge. ji-geu-meun a-ni-ya',
        zh: '以后再告诉你。现在还不是时候。', zhEn: 'I\'ll tell you later. It\'s not the right time yet.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Haru刚说了"以后再告诉你"，Tori不想追问但想让Haru安心。合适的回应是？', zhEn: 'Haru just said "I\'ll tell you later." Tori doesn\'t want to pry but wants to reassure Haru. What\'s the right response?',
        practice: 'pick',
        choices: [
          { ko: '응, 나중에 얘기해 줘.', zh: '嗯，以后再告诉我吧。', zhEn: 'Okay, tell me later then.', correct: true },
          { ko: '지금 말해 줘.', zh: '现在就告诉我。', zhEn: 'Tell me now.', correct: false },
          { ko: '그럼 됐어.', zh: '那算了。', zhEn: 'Forget it.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '想起来了：생각나다', titleEn: 'Remember: 생각나다',
    pattern: 'N + **이/가** + **생각나다** / **생각나요**',
    whenToUse: '「想起某人/某事」的固定表达。Haru说「옛날 친구가 생각나」——不是"我想那个朋友"，而是"那个朋友(自动地)在我脑海里浮现"。生각나다 是自动词，主语用**이/가**（不是을/를），初学者最容易搞混的一个。',
    rules: [
      '**基本公式**：N**이/가** 생각나요 = 想起N。主语用 이/가 因为是"N自己浮现"（自动词）',
      '**过去时 → 생각났어요**：어제 엄마가 생각났어요 = 昨天想起妈妈了',
      '**否定 → 생각이 안 나요**：이름이 생각이 안 나요 = 想不起名字。注意"안"要放在생각和나요中间',
      '**~을/를 记住**：生각나다(想起，自动) vs 生각하다(想，他动)。생각하다 才能用을/를：저는 엄마를 생각해요（我在想妈妈）',
    ],
    examples: [
      { ko: '옛날 친구가 생각나요.', zh: '想起以前的朋友。', zhEn: 'Reminds me of a friend from the past.', highlight: '친구가', note: '친구 无收音 → 이/가 中的 **가**。생각나다 主语必须 이/가', noteEn: '친구 has no final consonant → use **가** from 이/가. The subject of 생각나다 must take 이/가.' },
      { ko: '엄마가 갑자기 생각났어요.', zh: '突然想起妈妈了。', zhEn: 'Suddenly thought of mom.', highlight: '생각났어요', note: '生각나다 → 생각났어요（过去时）。갑자기 = 突然，最常搭配' },
      { ko: '그 사람 이름이 생각이 안 나요.', zh: '想不起那个人的名字。', zhEn: 'Can\'t remember that person\'s name.', highlight: '생각이 안 나요', note: '否定要说 "생각이 안 나요"，不是 "안 생각나요"。母语者习惯', noteEn: 'For negation, say "생각이 안 나요," not "안 생각나요." That\'s the native habit.' },
      { ko: '너를 보면 그 친구가 생각나.', zh: '看到你就会想起那个朋友。', zhEn: 'Seeing you reminds me of that friend.', highlight: '보면 ... 생각나', note: 'Haru的原句。~(으)면(如果) + 생각나(반말)。看到某物→触发回忆的经典搭配', noteEn: 'Haru\'s original sentence. ~(으)면 (if) + 생각나 (casual). Seeing something → triggers a memory, a classic pattern.' },
    ],
    pitfall:
      '① 主语必须 **이/가** 不是 **을/를**：❌ 엄마를 생각나요 → ✅ 엄마가 생각나요。② 否定不说 "안 생각나요"，要说 "생각이 안 나요"（생각和나요之间插入 이 안）。③ 「想念」和「想起」不同——想念用 보고 싶다，想起用 생각나다。想妈妈：엄마가 보고 싶어요（长期）/ 엄마가 생각나요（突然）',
  },

  output: [
    {
      id: 'd34-o1',
      kind: 'compose',
      zhHint: '看到你会想起以前的朋友。', zhHintEn: 'Seeing you reminds me of a friend from the past.',
      tokens: ['너를', '보면', '옛날 친구가', '생각나', '옛날 친구를', '생각해'],
      composeAnswer: ['너를', '보면', '옛날 친구가', '생각나'],
      successMsg: 'Haru的原话。这一句藏着一个人。', successMsgEn: 'Haru\'s exact words. This sentence hides a person.',
    },
    {
      id: 'd34-o2',
      kind: 'listen-choice',
      audioKo: '나중에 알려줄게. 지금은 아니야.',
      successMsg: '✓ 承诺"以后再说"的口语原句。', successMsgEn: '✓ The casual original for promising "I\'ll tell you later."',
      choices: [
        { zh: '以后再告诉你。现在还不是时候。', zhEn: 'I\'ll tell you later. It\'s not the right time yet.', correct: true },
        { zh: '以后不告诉你了。', zhEn: 'I won\'t tell you later.', correct: false },
        { zh: '现在马上告诉你。', zhEn: 'I\'ll tell you right now.', correct: false },
        { zh: '这不是秘密。', zhEn: 'It\'s not a secret.', correct: false },
      ],
    },
    {
      id: 'd34-o3',
      kind: 'zh-to-ko',
      zhPrompt: '想不起那个人的名字。', zhPromptEn: 'Can\'t remember that person\'s name.',
      successMsg: '"그 사람 이름이 생각이 안 나요." — 否定要用 "생각이 안 나요"。', successMsgEn: '"그 사람 이름이 생각이 안 나요." — For negation, use "생각이 안 나요."',
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
      zhHint: '突然想起妈妈了。', zhHintEn: 'Suddenly thought of mom.',
      successMsg: '엄마 无收音 → **가**。생각나다 是自动词，主语用 이/가。', successMsgEn: '엄마 has no final consonant → **가**. 생각나다 is intransitive, so the subject takes 이/가.',
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
      successMsg: '✓ Day 34 核心词全对。나중에——Tori 会等的。', successMsgEn: '✓ Day 34 core words all correct. 나중에 — Tori will wait.',
      pairs: [
        { ko: '옛날', zh: '以前', zhEn: 'before' },
        { ko: '생각나다', zh: '想起', zhEn: 'to recall' },
        { ko: '나중에', zh: '以后', zhEn: 'after' },
        { ko: '비밀', zh: '秘密', zhEn: 'secret' },
        { ko: '닮다', zh: '相像', zhEn: 'to resemble' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '어려운 질문도 했어요. 하루의 비밀은 나중에——지금은 여기까지.',
    preview: '明天，Tori第一次被兽尔本地人问路——她能答上来吗？', previewEn: 'Tomorrow, for the first time, a local in Seoul asks Tori for directions — can she answer?',
    stickerId: 'sticker-d34',
    sceneImageUrl: '/images/diary/day-34-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「생각나다 和 생각하다 有什么区别？」「하루의 옛날 친구는 누구일까?」',
};
