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
  title: 'Minji的家 · 水獭家族的饭桌', titleEn: 'Minji\'s home · The otter family\'s dining table',
  subtitle: '"原来是민지喜欢的朋友啊"', subtitleEn: '"Oh, so this is the friend Minji likes"',
  heroImageUrl: '/images/diary/day-40-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 12일 · 토요일 저녁',
    weather: '兽尔 · 秋晴', weatherEn: 'Sooel · Chucheong',
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
      zh: '奶奶', zhEn: 'Grandmother',
      pos: '名词', posEn: 'Noun',
      example: { ko: '민지네 할머니가 다정하세요.', zh: '民智奶奶很和蔼。', zhEn: 'Minji\'s grandmother is very kind.' },
      tip: '외할머니 = 外婆。称呼别人的奶奶加 ~네 할머니 = ~家的奶奶', tipEn: '외할머니 = maternal grandmother. When referring to someone else\'s grandmother, add ~네 할머니 = ~\'s grandmother',
    },
    {
      id: 'd40-w2',
      korean: '가족',
      hangul: 'ga-jok',
      zh: '家人', zhEn: 'Family',
      pos: '名词', posEn: 'Noun',
      example: { ko: '가족과 같이 저녁을 먹었어요.', zh: '和家人一起吃了晚饭。', zhEn: 'Had dinner with the family.' },
      tip: '家(가) + 族(족)。汉字词。식구 也是家人（更口语）', tipEn: '家(가) + 族(족). Sino-Korean word. 식구 also means family (more colloquial)',
    },
    {
      id: 'd40-w3',
      korean: '초대받다',
      hangul: 'cho-dae-bat-da',
      zh: '受邀', zhEn: 'Invited',
      pos: '动词', posEn: 'Verb',
      example: { ko: '민지 집에 초대받았어요.', zh: '被邀请到民智家。', zhEn: 'Invited to Minji\'s house.' },
      tip: '초대(招待) + 받다(接受) = 被邀请。被动', tipEn: '초대 (invite) + 받다 (receive) = to be invited. Passive form.',
    },
    {
      id: 'd40-w4',
      korean: '다정하다',
      hangul: 'da-jeong-ha-da',
      zh: '和蔼/亲切', zhEn: 'Kind / Warm',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '할머니가 정말 다정하세요.', zh: '奶奶真的很和蔼。', zhEn: 'Grandma is really kind.' },
      tip: '다(多) + 정(情) + 하다。夸长辈亲切的一个好词', tipEn: '다 (many) + 정 (affection) + 하다. A good word to praise elders\' warmth.',
    },
    {
      id: 'd40-w5',
      korean: '반찬',
      hangul: 'ban-chan',
      zh: '小菜', zhEn: 'banchan (side dishes)',
      pos: '名词', posEn: 'Noun',
      example: { ko: '반찬이 많아요.', zh: '小菜好多。', zhEn: 'So many side dishes.' },
      tip: '韩式饭桌一定有的配菜。김치、시금치、멸치 全是반찬', tipEn: 'Side dishes always on a Korean table. Kimchi, spinach, and anchovies are all banchan.',
    },
    {
      id: 'd40-w6',
      korean: '많이 먹어요',
      hangul: 'ma-ni meo-geo-yo',
      zh: '多吃点', zhEn: 'Eat more',
      pos: '表达', posEn: 'Expression',
      example: { ko: '많이 먹어요, 배부르게.', zh: '多吃点，吃到饱。', zhEn: 'Eat more, until you\'re full.' },
      tip: '韩国家里第一句待客话。等同于中文的"多吃点"', tipEn: 'The first thing Koreans say to guests at home. Equivalent to "eat up" in Chinese.',
    },
  ],

  dialogue: {
    scene: '민지네 집 · 저녁 식사',
    setting: {
      time: '周六 18:30', timeEn: 'Saturday 18:30',
      place: '民智家的餐桌', placeEn: 'Minji\'s Family Dinner Table',
      npc: 'Minji妈妈 / Minji爸爸 / Minji奶奶', npcEn: 'Minji\'s Mom / Minji\'s Dad / Minji\'s Grandma',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Minji妈妈', npcNameEn: 'Minji\'s Mom',
        ko: '어서 와요, 토리씨! 얘기 많이 들었어요.',
        hangul: 'eo-seo wa-yo, to-ri-ssi! yae-gi ma-ni deu-reo-sseo-yo',
        zh: '欢迎欢迎，兔莉！听说过很多次了。', zhEn: 'Welcome, welcome, Tori! I\'ve heard so much about you.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '안녕하세요. 초대해 주셔서 감사합니다.',
        hangul: 'an-nyeong-ha-se-yo. cho-dae-hae ju-syeo-seo gam-sa-ham-ni-da',
        zh: '您好。谢谢您邀请我。', zhEn: 'Hello. Thank you for inviting me.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Minji爸爸', npcNameEn: 'Minji\'s Dad',
        ko: '많이 먹어요. 학생이 밥 잘 먹어야 공부도 잘해요.',
        hangul: 'ma-ni meo-geo-yo. hak-saeng-i bap jal meo-geo-ya gong-bu-do jal-hae-yo',
        zh: '多吃点。学生要吃得好才能学得好。', zhEn: 'Eat up. A student needs to eat well to study well.',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Minji奶奶', npcNameEn: 'Minji\'s Grandma',
        ko: '아, 우리 민지가 좋아하는 친구구나.',
        hangul: 'a, u-ri min-ji-ga jo-a-ha-neun chin-gu-gu-na',
        zh: '啊，原来是民智喜欢的朋友啊。', zhEn: 'Ah, so you\'re the friend Minji likes.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '"우리 민지"… 우리 할머니도 그렇게 말씀하셨는데.',
        hangul: 'u-ri min-ji… u-ri hal-meo-ni-do geu-reo-ke mal-sseum-ha-syeon-neun-de',
        zh: '"我们民智"……我奶奶也是这样说的。', zhEn: '"Our Minji"... my grandma says that too.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '饭吃完了，Tori想向Minji家人道谢并说饭菜好吃。合适的一句？', zhEn: 'After the meal, Tori wants to thank Minji\'s family and say the food was delicious. Which is the right thing to say?',
        practice: 'pick',
        choices: [
          { ko: '잘 먹었습니다. 정말 맛있었어요.', zh: '吃好了。真的很好吃。', zhEn: 'I ate well. It was really delicious.', correct: true },
          { ko: '많이 먹었어요.', zh: '吃了很多。', zhEn: 'I ate a lot.', correct: false },
          { ko: '집에 갈게요.', zh: '我要回家了。', zhEn: 'I\'m going home.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '原来是___啊：~구나 (반말 감탄)', titleEn: 'So it\'s ___! : ~구나 (informal exclamation)',
    pattern: 'V + **는구나** · A + **구나** · N + **(이)구나**',
    whenToUse: '长辈/朋友"发现新事实时的感叹"。Minji奶奶说 「우리 민지가 좋아하는 친구**구나**」= 原来是民智喜欢的朋友啊。~구나 是반말，长辈对晚辈、朋友之间用；对长辈**不能用**。해요体版本是 ~네요（Day 31 学过），~구나 更亲密。', whenToUseEn: 'Used by elders/friends to express surprise at a new discovery. Minji\'s grandma says 「우리 민지가 좋아하는 친구**구나**」= So you\'re the friend Minji likes. ~구나 is informal, used by elders to younger people or between friends; **cannot** be used with elders. The 해요 form is ~네요 (learned on Day 31), but ~구나 is more intimate.',
    rules: [
      '**动词现在 → ~는구나**：가다 → 가는구나（原来去啊）。먹다 → 먹는구나（原来在吃啊）',
      '**形容词 → ~구나**：예쁘다 → 예쁘구나（原来漂亮啊）。좋다 → 좋구나',
      '**名词 → ~(이)구나**：有收音 → 이구나（학생이구나）；无收音 → 구나（친구구나）',
      '**语境限制**：只在**发现新信息**时用。已知的事说 ~구나 会显得怪。长辈对晚辈、朋友之间、自言自语时最自然'
    ],
    examples: [
      { ko: '우리 민지가 좋아하는 친구구나.', zh: '原来是民智喜欢的朋友啊。', zhEn: 'So you\'re the friend Minji likes.', highlight: '친구구나', note: '친구 无받침 → **구나**（不加이）。Minji奶奶原句' },
      { ko: '아, 매운 걸 잘 먹는구나.', zh: '啊，原来很能吃辣啊。', zhEn: 'Oh, so you can really handle spicy food.', highlight: '먹는구나', note: '먹다(动词现在) → **는구나**。饭桌上发现别人爱吃辣时用', noteEn: '먹다 (verb, present) → **는구나**. Used when you notice someone likes spicy food at the table.' },
      { ko: '한국어 진짜 잘하는구나.', zh: '原来韩语说得真好啊。', zhEn: 'So you speak Korean really well.', highlight: '잘하는구나', note: '잘하다(动词) → **잘하는구나**。夸后辈的经典句', noteEn: '잘하다 (verb) → **잘하는구나**. A classic way to compliment a junior.' },
      { ko: '이 김치 진짜 맵구나.', zh: '这个泡菜真的很辣啊。', zhEn: 'This kimchi is really spicy.', highlight: '맵구나', note: '맵다(形容词) → **맵구나**（不加는）。自言自语的感叹', noteEn: '맵다 (adjective) → **맵구나** (no 는). An exclamation to yourself.' },
    ],
    pitfall:
      '① 반말！**绝对不能对长辈用**：❌ (对老师) 잘하는구나 → ✅ 잘하시네요。② 动词是 **는구나**，形容词是 **구나**，不要混：❌ 예쁘는구나 → ✅ 예쁘구나 / ❌ 먹구나 → ✅ 먹는구나。③ ~구나 和 ~네요 是"发现感叹"双胞胎——~네요 敬语通用，~구나 只在반말/自言自语。Day 31 学的 ~네요 是对朋友和长辈都可以用的安全款。',
  },

  output: [
    {
      id: 'd40-o1',
      kind: 'compose',
      zhHint: '原来是民智喜欢的朋友啊。', zhHintEn: 'So you\'re the friend Minji likes.',
      tokens: ['우리', '민지가', '좋아하는', '친구구나', '친구네요', '친구예요'],
      composeAnswer: ['우리', '민지가', '좋아하는', '친구구나'],
      successMsg: '奶奶的一句。~구나 藏着"我们家人"的口气。', successMsgEn: 'Grandma\'s line. ~구나 carries the tone of "our family."',
    },
    {
      id: 'd40-o2',
      kind: 'listen-choice',
      audioKo: '많이 먹어요. 학생이 밥 잘 먹어야 공부도 잘해요.',
      successMsg: '✓ 韩国父母级家里最经典的一句。', successMsgEn: '✓ The most classic line in Korean parents\' households.',
      choices: [
        { zh: '多吃点。学生要吃得好才能学得好。', zhEn: 'Eat up. A student needs to eat well to study well.', correct: true },
        { zh: '别吃太多。学生要专心学习。', zhEn: 'Don\'t eat too much. Students should focus on studying.', correct: false },
        { zh: '吃饭吧。学生成绩不好。', zhEn: 'Eat. Your grades are bad.', correct: false },
        { zh: '学生不能吃饭。', zhEn: 'Students can\'t eat.', correct: false },
      ],
    },
    {
      id: 'd40-o3',
      kind: 'zh-to-ko',
      zhPrompt: '原来韩语说得真好啊。', zhPromptEn: 'So you speak Korean really well.',
      successMsg: '"한국어 진짜 잘하는구나." — 잘하다(动词) → 는구나。', successMsgEn: '"한국어 진짜 잘하는구나." — 잘하다 (verb) → 는구나.',
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
      zhHint: '这个泡菜真的很辣啊。（自言自语）', zhHintEn: 'This kimchi is really spicy. (talking to oneself)',
      successMsg: '맵다(形容词) → **맵구나**（不接는）。形容词直接接구나。', successMsgEn: '맵다 (adjective) → **맵구나** (no 는). Adjectives directly take 구나.',
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
      successMsg: '✓ Day 40 全对。第一次坐进韩国家的饭桌。', successMsgEn: '✓ Day 40 all correct. First time sitting at a Korean family\'s dinner table.',
      pairs: [
        { ko: '할머니', zh: '奶奶', zhEn: 'Grandmother' },
        { ko: '가족', zh: '家人', zhEn: 'Family' },
        { ko: '초대받다', zh: '受邀', zhEn: 'Invited' },
        { ko: '다정하다', zh: '和蔼', zhEn: 'kind' },
        { ko: '반찬', zh: '小菜', zhEn: 'banchan (side dishes)' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '한국 집에 처음 초대받은 저녁. 우리 할머니 얼굴이 잠깐 겹쳤어요.',
    preview: '明天课上要发表——Tori决定介绍中国火锅文化。', previewEn: 'There\'s a presentation in class tomorrow—Tori decides to introduce Chinese hotpot culture.',
    stickerId: 'sticker-d40',
    sceneImageUrl: '/images/diary/day-40-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~구나 和 ~네요 有什么区别？」「韩国人家里吃饭有什么礼仪？」',
};
