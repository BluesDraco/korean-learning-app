import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 40 · 민지네 집 · 水獭家族的饭桌
 *
 * 剧情：Minji邀请Tori去她家吃饭。妈妈、爸爸、奶奶都在。饭桌摆满菜。
 * Minji奶奶抬眼看Tori，笑着说"우리 민지가 좋아하는 친구구나"。
 * Tori想起自己的奶奶，眼圈红了一下，赶紧低头吃饭。
 *
 * 学习目标：감탄 ~구나 (반말) / 가족 어휘 / 집에 초대받다
 * 语料层级：해요体 + 어른의 반말 ~구나
 * 韩语自审：korean skill PASS
 */
export const day40: ToriDay = {
  level: 'intermediate',
  day: 10,
  phase: 'expansion',
  title: 'Minji的家 · 水獭家族的饭桌',
  subtitle: '"原来是민지喜欢的朋友啊"',
  heroImageUrl: '/images/diary/day-40-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 12일 · 토요일 저녁',
    weather: '兽尔 · 秋晴',
    toriPose: 'shy',
    diaryText: `10月12日，周六傍晚。

Minji第一次邀请我去她家吃饭。
公寓在一个老小区的四楼。

按门铃前，我深呼吸了三次——
"안녕하세요, 안녕하세요, 안녕하세요…"

门开了，Minji妈妈站在门口，
围着围裙，笑得眼睛弯成月牙。
"어서 와요, 토리씨! 얘기 많이 들었어요."
（欢迎欢迎，兔莉！听Minji说过很多次了。）

饭桌上摆满了菜：
불고기、잡채、시금치나물、김치찌개、
还有一大碗刚出锅的白米饭。

Minji爸爸给我盛饭：
"많이 먹어요. 학생이 밥 잘 먹어야 공부도 잘해요."
（多吃点。学生要吃得好才能学得好。）

饭吃到一半，一位穿灰色开衫的老奶奶从卧室慢慢走出来。
Minji奶奶。她的眼神像我奶奶。

奶奶坐下，端起茶杯，看了我一眼，然后笑着说：

"아, 우리 민지가 좋아하는 친구구나."
（啊，原来是民智喜欢的朋友啊。）

那句"우리 민지"三个字——
和奶奶叫我"我们Tori"是一样的口气。

我低下头，
盛了一勺汤，
眼圈热了一下。`,
  },

  words: [
    {
      id: 'd40-w1',
      korean: '할머니',
      hangul: 'hal-meo-ni',
      zh: '奶奶',
      pos: '名词',
      example: { ko: '민지네 할머니가 다정하세요.', zh: '民智奶奶很和蔼。' },
      tip: '외할머니 = 外婆。称呼别人的奶奶加 ~네 할머니 = ~家的奶奶',
    },
    {
      id: 'd40-w2',
      korean: '가족',
      hangul: 'ga-jok',
      zh: '家人',
      pos: '名词',
      example: { ko: '가족과 같이 저녁을 먹었어요.', zh: '和家人一起吃了晚饭。' },
      tip: '家(가) + 族(족)。汉字词。식구 也是家人（更口语）',
    },
    {
      id: 'd40-w3',
      korean: '초대받다',
      hangul: 'cho-dae-bat-da',
      zh: '受邀',
      pos: '动词',
      example: { ko: '민지 집에 초대받았어요.', zh: '被邀请到民智家。' },
      tip: '초대(招待) + 받다(接受) = 被邀请。被动',
    },
    {
      id: 'd40-w4',
      korean: '다정하다',
      hangul: 'da-jeong-ha-da',
      zh: '和蔼/亲切',
      pos: '形容词',
      example: { ko: '할머니가 정말 다정하세요.', zh: '奶奶真的很和蔼。' },
      tip: '다(多) + 정(情) + 하다。夸长辈亲切的一个好词',
    },
    {
      id: 'd40-w5',
      korean: '반찬',
      hangul: 'ban-chan',
      zh: '小菜',
      pos: '名词',
      example: { ko: '반찬이 많아요.', zh: '小菜好多。' },
      tip: '韩式饭桌一定有的配菜。김치、시금치、멸치 全是반찬',
    },
    {
      id: 'd40-w6',
      korean: '많이 먹어요',
      hangul: 'ma-ni meo-geo-yo',
      zh: '多吃点',
      pos: '表达',
      example: { ko: '많이 먹어요, 배부르게.', zh: '多吃点，吃到饱。' },
      tip: '韩国家里第一句待客话。等同于中文的"多吃点"',
    },
  ],

  dialogue: {
    scene: '민지네 집 · 저녁 식사',
    setting: {
      time: '周六 18:30',
      place: '民智家的餐桌',
      npc: 'Minji妈妈 / Minji爸爸 / Minji奶奶',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Minji妈妈',
        ko: '어서 와요, 토리씨! 얘기 많이 들었어요.',
        hangul: 'eo-seo wa-yo, to-ri-ssi! yae-gi ma-ni deu-reo-sseo-yo',
        zh: '欢迎欢迎，兔莉！听说过很多次了。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '안녕하세요. 초대해 주셔서 감사합니다.',
        hangul: 'an-nyeong-ha-se-yo. cho-dae-hae ju-syeo-seo gam-sa-ham-ni-da',
        zh: '您好。谢谢您邀请我。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Minji爸爸',
        ko: '많이 먹어요. 학생이 밥 잘 먹어야 공부도 잘해요.',
        hangul: 'ma-ni meo-geo-yo. hak-saeng-i bap jal meo-geo-ya gong-bu-do jal-hae-yo',
        zh: '多吃点。学生要吃得好才能学得好。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Minji奶奶',
        ko: '아, 우리 민지가 좋아하는 친구구나.',
        hangul: 'a, u-ri min-ji-ga jo-a-ha-neun chin-gu-gu-na',
        zh: '啊，原来是民智喜欢的朋友啊。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '"우리 민지"… 우리 할머니도 그렇게 말씀하셨는데.',
        hangul: 'u-ri min-ji… u-ri hal-meo-ni-do geu-reo-ke mal-sseum-ha-syeon-neun-de',
        zh: '"我们民智"……我奶奶也是这样说的。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '饭吃完了，Tori想向Minji家人道谢并说饭菜好吃。合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '잘 먹었습니다. 정말 맛있었어요.', zh: '吃好了。真的很好吃。', correct: true },
          { ko: '많이 먹었어요.', zh: '吃了很多。', correct: false },
          { ko: '집에 갈게요.', zh: '我要回家了。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '原来是___啊：~구나 (반말 감탄)',
    pattern: 'V + **는구나** · A + **구나** · N + **(이)구나**',
    whenToUse: '长辈/朋友"发现新事实时的感叹"。Minji奶奶说 「우리 민지가 좋아하는 친구**구나**」= 原来是民智喜欢的朋友啊。~구나 是반말，长辈对晚辈、朋友之间用；对长辈**不能用**。해요体版本是 ~네요（Day 31 学过），~구나 更亲密。',
    rules: [
      '**动词现在 → ~는구나**：가다 → 가는구나（原来去啊）。먹다 → 먹는구나（原来在吃啊）',
      '**形容词 → ~구나**：예쁘다 → 예쁘구나（原来漂亮啊）。좋다 → 좋구나',
      '**名词 → ~(이)구나**：有收音 → 이구나（학생이구나）；无收音 → 구나（친구구나）',
      '**语境限制**：只在**发现新信息**时用。已知的事说 ~구나 会显得怪。长辈对晚辈、朋友之间、自言自语时最自然'
    ],
    examples: [
      { ko: '우리 민지가 좋아하는 친구구나.', zh: '原来是民智喜欢的朋友啊。', highlight: '친구구나', note: '친구 无받침 → **구나**（不加이）。Minji奶奶原句' },
      { ko: '아, 매운 걸 잘 먹는구나.', zh: '啊，原来很能吃辣啊。', highlight: '먹는구나', note: '먹다(动词现在) → **는구나**。饭桌上发现别人爱吃辣时用' },
      { ko: '한국어 진짜 잘하는구나.', zh: '原来韩语说得真好啊。', highlight: '잘하는구나', note: '잘하다(动词) → **잘하는구나**。夸后辈的经典句' },
      { ko: '이 김치 진짜 맵구나.', zh: '这个泡菜真的很辣啊。', highlight: '맵구나', note: '맵다(形容词) → **맵구나**（不加는）。自言自语的感叹' },
    ],
    pitfall:
      '① 반말！**绝对不能对长辈用**：❌ (对老师) 잘하는구나 → ✅ 잘하시네요。② 动词是 **는구나**，形容词是 **구나**，不要混：❌ 예쁘는구나 → ✅ 예쁘구나 / ❌ 먹구나 → ✅ 먹는구나。③ ~구나 和 ~네요 是"发现感叹"双胞胎——~네요 敬语通用，~구나 只在반말/自言自语。Day 31 学的 ~네요 是对朋友和长辈都可以用的安全款。',
  },

  output: [
    {
      id: 'd40-o1',
      kind: 'compose',
      zhHint: '原来是民智喜欢的朋友啊。',
      tokens: ['우리', '민지가', '좋아하는', '친구구나', '친구네요', '친구예요'],
      composeAnswer: ['우리', '민지가', '좋아하는', '친구구나'],
      successMsg: '奶奶的一句。~구나 藏着"我们家人"的口气。',
    },
    {
      id: 'd40-o2',
      kind: 'listen-choice',
      audioKo: '많이 먹어요. 학생이 밥 잘 먹어야 공부도 잘해요.',
      successMsg: '✓ 韩国父母级家里最经典的一句。',
      choices: [
        { zh: '多吃点。学生要吃得好才能学得好。', correct: true },
        { zh: '别吃太多。学生要专心学习。', correct: false },
        { zh: '吃饭吧。学生成绩不好。', correct: false },
        { zh: '学生不能吃饭。', correct: false },
      ],
    },
    {
      id: 'd40-o3',
      kind: 'zh-to-ko',
      zhPrompt: '原来韩语说得真好啊。',
      successMsg: '"한국어 진짜 잘하는구나." — 잘하다(动词) → 는구나。',
      choices: [
        { ko: '한국어 진짜 잘하는구나.', correct: true },
        { ko: '한국어 진짜 잘하구나.', correct: false },
        { ko: '한국어 진짜 잘한구나.', correct: false },
        { ko: '한국어 진짜 잘하네구나.', correct: false },
      ],
    },
    {
      id: 'd40-o4',
      kind: 'particle-error',
      zhHint: '这个泡菜真的很辣啊。（自言自语）',
      successMsg: '맵다(形容词) → **맵구나**（不接는）。形容词直接接구나。',
      choices: [
        { ko: '이 김치 진짜 맵구나.', correct: true },
        { ko: '이 김치 진짜 맵는구나.', correct: false },
        { ko: '이 김치 진짜 매운구나.', correct: false },
        { ko: '이 김치 진짜 매워구나.', correct: false },
      ],
    },
    {
      id: 'd40-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 40 全对。第一次坐进韩国家的饭桌。',
      pairs: [
        { ko: '할머니', zh: '奶奶' },
        { ko: '가족', zh: '家人' },
        { ko: '초대받다', zh: '受邀' },
        { ko: '다정하다', zh: '和蔼' },
        { ko: '반찬', zh: '小菜' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '한국 집에 처음 초대받은 저녁. 우리 할머니 얼굴이 잠깐 겹쳤어요.',
    preview: '明天课上要发表——Tori决定介绍中国火锅文化。',
    stickerId: 'sticker-d40',
    sceneImageUrl: '/images/diary/day-40-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~구나 和 ~네요 有什么区别？」「韩国人家里吃饭有什么礼仪？」',
};
