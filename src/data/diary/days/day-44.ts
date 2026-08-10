import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 44 · 兽尔江野餐 · 四人的毯子
 *
 * 剧情：秋日好天气，四人去兽尔江野餐。铺毯子、紫菜包饭、草莓。Minji躺着看天，
 * Junho追鸽子，Haru看书。Tori感叹"这一天要能永远持续就好了"。
 * Haru说"불가능이지만 기억은 남아요"。
 *
 * 学习目标：희망 ~았/었으면 좋겠어요 / 소풍 어휘
 * 语料层级：해요体 · 감성 표현
 * 韩语自审：korean skill PASS
 */
export const day44: ToriDay = {
  level: 'intermediate',
  day: 14,
  phase: 'expansion',
  title: '兽尔江野餐 · 四人的毯子',
  subtitle: '"如果这一天能永远持续就好了"',
  heroImageUrl: '/images/diary/day-44-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 16일 · 수요일 오후',
    weather: '兽尔 · 秋高气爽',
    toriPose: 'happy',
    diaryText: `10月16日，周三下午。

兽尔江边的草坪，秋天最好的一天。

我们铺了一张格子毯子。
Junho带了紫菜包饭三种口味，
Minji带了一整盒草莓，
Haru带了一壶热柚子茶。

Minji躺在毯子上，翻个身：
"하늘 진짜 예쁘다."（天空真美。）

Junho追一只不肯飞走的鸽子——
鸽子跑，他也跑，
最后两个都停下来对视。

Haru靠在树下看书，
偶尔抬头看看远处。

我拿着一颗草莓，突然说出口：

"이 하루가 영원히 계속됐으면 좋겠어."
（这一天要是能永远持续就好了。）

Haru放下书，轻轻笑：

"불가능하지만, 기억은 남아요.
이 순간도 이미 기억이 됐어요."

（虽然不可能，但记忆会留下。
这一刻已经是记忆了。）

远处两个孩子在放风筝。
风把毯子的边吹起来一角。

我把这一刻记住了。`,
  },

  words: [
    {
      id: 'd44-w1',
      korean: '소풍',
      hangul: 'so-pung',
      zh: '野餐/远足',
      pos: '名词',
      example: { ko: '주말에 소풍을 가요.', zh: '周末去野餐。' },
      tip: '逍(소) + 风(풍)＝逍風。소풍 가다 = 去郊游/野餐',
    },
    {
      id: 'd44-w2',
      korean: '돗자리',
      hangul: 'dot-ja-ri',
      zh: '野餐垫/毯',
      pos: '名词',
      example: { ko: '돗자리를 깔았어요.', zh: '铺了野餐垫。' },
      tip: '韩国野餐必备。돗자리를 깔다 = 铺垫子',
    },
    {
      id: 'd44-w3',
      korean: '하늘',
      hangul: 'ha-neul',
      zh: '天空',
      pos: '名词',
      example: { ko: '하늘이 진짜 예뻐요.', zh: '天空真美。' },
      tip: '하늘 有 ㄹ 받침 → 이/가 中的 이',
    },
    {
      id: 'd44-w4',
      korean: '순간',
      hangul: 'sun-gan',
      zh: '瞬间',
      pos: '名词',
      example: { ko: '이 순간을 기억할게요.', zh: '我会记住这一刻。' },
      tip: '瞬(순) + 间(간)。이 순간 = 这一刻',
    },
    {
      id: 'd44-w5',
      korean: '기억',
      hangul: 'gi-eok',
      zh: '记忆',
      pos: '名词',
      example: { ko: '이 순간도 이미 기억이 됐어요.', zh: '这一刻已经是记忆了。' },
      tip: '记(기) + 忆(억)。기억하다 = 记住 / 기억이 나다 = 想起',
    },
    {
      id: 'd44-w6',
      korean: '영원히',
      hangul: 'yeong-won-hi',
      zh: '永远',
      pos: '副词',
      example: { ko: '영원히 잊지 않을게요.', zh: '永远不会忘记。' },
      tip: '永(영) + 远(원) + 히。감정 표현에 자주 등장',
    },
  ],

  dialogue: {
    scene: '한강 잔디밭·돗자리',
    setting: {
      time: '周三 15:00',
      place: '한강 강변 잔디밭',
      npc: 'Junho / Minji / Haru',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '하늘 진짜 예쁘다. 오늘 잘 왔다.',
        hangul: 'ha-neul jin-jja ye-ppeu-da. o-neul jal wat-da',
        zh: '天空真美。今天来对了。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '와, 저 비둘기 봐! 안 도망가!',
        hangul: 'wa, jeo bi-dul-gi bwa! an do-mang-ga!',
        zh: '哇，看那只鸽子！不跑！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '이 하루가 영원히 계속됐으면 좋겠어.',
        hangul: 'i ha-ru-ga yeong-won-hi gye-sok-dwae-sseu-myeon jo-ke-sseo',
        zh: '这一天要是能永远持续就好了。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '불가능하지만, 기억은 남아요.',
        hangul: 'bul-ga-neung-ha-ji-man, gi-eo-geun na-ma-yo',
        zh: '虽然不可能，但记忆会留下。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '이 순간도 이미 기억이 됐어요.',
        hangul: 'i sun-gan-do i-mi gi-eo-gi dwae-sseo-yo',
        zh: '这一刻已经是记忆了。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '听完Haru的话，Tori想说"那我要好好记住"。合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '그럼 잘 기억할게요.', zh: '那我会好好记住的。', correct: true },
          { ko: '그럼 잊어버릴게요.', zh: '那我会忘记的。', correct: false },
          { ko: '기억은 필요 없어요.', zh: '记忆不需要。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '要是___就好了：~았/었으면 좋겠어요',
    pattern: 'V/A + **았/었으면 좋겠어요**',
    whenToUse: '「要是能___就好了」的愿望句尾。Tori 说 「이 하루가 영원히 계속됐으면 좋겠어」= 要是这一天能永远持续就好了。~았/었으면 是"过去时假设"但表**现在的愿望**——韩语最能表达"温柔期待"的一个句型。',
    rules: [
      '**基本公式**：动词/形容词 + 았/었으면 좋겠어요。变形和过去时一样——阳性(ㅏ/ㅗ) → 았으면；其他 → 었으면；하다 → 했으면',
      '**说白了 = "如果___的话就好了"**：내일 비가 안 왔으면 좋겠어요 = 要是明天不下雨就好了。表说话人希望',
      '**반말 → ~았/었으면 좋겠어**：계속됐으면 좋겠어。朋友之间的自然表达',
      '**未来愿望也用过去形**：잘 됐으면 좋겠어요 = 希望能成功（虽然是未来事，但形态是过去时）'
    ],
    examples: [
      { ko: '이 하루가 영원히 계속됐으면 좋겠어.', zh: '这一天要是能永远持续就好了。', highlight: '계속됐으면 좋겠어', note: '계속되다 → 계속됐 + 으면 좋겠어。~됐 是 되었 的缩略（계속되었으면 → 계속됐으면）。Tori 原句' },
      { ko: '한국어를 잘했으면 좋겠어요.', zh: '要是能说好韩语就好了。', highlight: '잘했으면 좋겠어요', note: '잘하다 → 잘했으면 좋겠어요。留学生最常表达的愿望' },
      { ko: '내일 비가 안 왔으면 좋겠어요.', zh: '要是明天不下雨就好了。', highlight: '안 왔으면 좋겠어요', note: '오다 → 왔으면 좋겠어요。否定 안 放在动词前' },
      { ko: '가족이 건강했으면 좋겠어요.', zh: '要是家人健康就好了。', highlight: '건강했으면 좋겠어요', note: '건강하다 → 건강했으면 좋겠어요。对家人最温柔的期待' },
    ],
    pitfall:
      '① 虽然形态是过去时（았/었），但表达的是**现在的愿望**——这一点最容易被中文母语者搞混。② 和 ~(으)면 좋겠어요（现在形）的区别：~았/었으면 좋겠어요 感觉**更强烈更温柔**，~(으)면 좋겠어요 更中性。日常表达愿望，母语者九成用 ~았/었으면。③ 반말去掉요即可：~았/었으면 좋겠어。',
  },

  output: [
    {
      id: 'd44-o1',
      kind: 'compose',
      zhHint: '这一天要是能永远持续就好了。',
      tokens: ['이 하루가', '영원히', '계속됐으면', '좋겠어', '계속되면', '좋아요'],
      composeAnswer: ['이 하루가', '영원히', '계속됐으면', '좋겠어'],
      successMsg: 'Tori 在毯子上说的一句。~았/었으면 좋겠어，温柔的希望。',
    },
    {
      id: 'd44-o2',
      kind: 'listen-choice',
      audioKo: '이 순간도 이미 기억이 됐어요.',
      successMsg: '✓ Haru 的一句。已经变成记忆了。',
      choices: [
        { zh: '这一刻已经是记忆了。', correct: true },
        { zh: '这个瞬间还在继续。', correct: false },
        { zh: '这一刻会消失。', correct: false },
        { zh: '记忆已经没了。', correct: false },
      ],
    },
    {
      id: 'd44-o3',
      kind: 'zh-to-ko',
      zhPrompt: '要是家人（一直）健康就好了。（更温柔的语气）',
      successMsg: '"가족이 건강했으면 좋겠어요." — 건강하다 → 건강했으면.',
      choices: [
        { ko: '가족이 건강했으면 좋겠어요.', correct: true },
        { ko: '가족이 건강하면 좋겠어요.', correct: false },
        { ko: '가족이 건강해 좋겠어요.', correct: false },
        { ko: '가족을 건강했으면 좋겠어요.', correct: false },
      ],
    },
    {
      id: 'd44-o4',
      kind: 'particle-error',
      zhHint: '要是明天不下雨就好了。（更温柔的语气）',
      successMsg: '오다 → **왔으면 좋겠어요**（과거형 + 으면 좋겠어요）.',
      choices: [
        { ko: '내일 비가 안 왔으면 좋겠어요.', correct: true },
        { ko: '내일 비가 안 오면 좋겠어요.', correct: false },
        { ko: '내일 비가 안 오았으면 좋겠어요.', correct: false },
        { ko: '내일 비를 안 왔으면 좋겠어요.', correct: false },
      ],
    },
    {
      id: 'd44-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 44 全对。这一天，已经是记忆了。',
      pairs: [
        { ko: '소풍', zh: '野餐' },
        { ko: '돗자리', zh: '野餐垫' },
        { ko: '하늘', zh: '天空' },
        { ko: '순간', zh: '瞬间' },
        { ko: '영원히', zh: '永远' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '毯子上的一天。~았/었으면 좋겠어 — 表达温柔期待的一句话。',
    preview: '明天中级月考——Tori这次能不紧张吗？',
    stickerId: 'sticker-d44',
    sceneImageUrl: '/images/diary/day-44-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~았/었으면 좋겠어요 和 ~(으)면 좋겠어요 有什么区别？」「가을 소풍 무엇을 챙길까요?」',
};
