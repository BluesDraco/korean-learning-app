import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 11 · 大创 · 这个 / 那个 / 那个远的
 *
 * 剧情：兔莉宿舍漏了——洗发水快没了、毛巾没买、拖鞋偏小。
 * Junho 拍胸："大创 가자! 거기서 다 있어!"
 * 一只温柔的羊店员站在收银台后。Tori 指着远处货架上的洗发水问"저거 얼마예요?"
 * 羊店员笑着说："저거요? 천 원이에요." 一千元！Tori 决定一次买齐生活全套。
 *
 * 学习目标：이거 / 그거 / 저거 综合应用 / 大创 生活词
 * 韩语自审：korean skill PASS
 */
export const day11: ToriDay = {
  level: 'beginner',
  day: 11,
  phase: 'foundation',
  title: '大创 · 这个 / 那个 / 那个远的', titleEn: 'Daiso · This / That / That (over there)',
  subtitle: '所有东西都 1000 元的奇妙世界', subtitleEn: 'The magical world where everything is 1,000 won',
  heroImageUrl: '/images/diary/day-11-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 11일 · 수요일 저녁',
    weather: '兽尔 · 阴', weatherEn: 'Soo-ah · Yin',
    toriPose: 'cheer',
    diaryText: `9月 11日，周三傍晚。

宿舍清单一片狼藉：
샴푸（洗发水）剩半瓶、수건（毛巾）只有飞机上发的那条、
拖鞋偏小到大拇指无处安放……

Junho 拍我肩膀："大创 가자! 거기서 다 있어!"
（去 Daiso！那里啥都有！）

大创 = 韩国的"千元百货"。
店里货架很高，所有标签都是数字 + 원。

我指着远处一排洗发水问："저거 얼마예요?"
羊店员（戴白色围裙！）笑着说："저거요? 천 원이에요."

천 원？！等于 5 块人民币？！
我啊的一声，怀里直接抱了三瓶。

结账时我看到桌上的胡萝卜挂件——
"이것도 주세요!"
羊店员把它递给我，
脸上写着"又一个被胡萝卜俘获的留学生"。`,
  },

  words: [
    {
      id: 'd11-w1',
      korean: '샴푸',
      hangul: 'syam-pu',
      zh: '洗发水', zhEn: 'Shampoo',
      pos: '名词', posEn: 'Noun',
      example: { ko: '샴푸 있어요?', zh: '有洗发水吗？', zhEn: 'Do you have shampoo?' },
      tip: '英文 shampoo 音译。日常用品大多是外来词', tipEn: 'Transliteration of English \'shampoo.\' Most everyday items are loanwords.',
    },
    {
      id: 'd11-w2',
      korean: '수건',
      hangul: 'su-geon',
      zh: '毛巾', zhEn: 'Towel',
      pos: '名词', posEn: 'Noun',
      example: { ko: '수건 두 장 주세요.', zh: '请给我两条毛巾。', zhEn: 'Please give me two towels.' },
      tip: '量词「장」用于扁平的东西：纸、毛巾、卡', tipEn: 'The counter \'jang\' is used for flat things: paper, towels, cards.',
    },
    {
      id: 'd11-w3',
      korean: '슬리퍼',
      hangul: 'seul-li-peo',
      zh: '拖鞋', zhEn: 'Slippers',
      pos: '名词', posEn: 'Noun',
      example: { ko: '슬리퍼 신어요.', zh: '穿拖鞋。', zhEn: 'Wear slippers.' },
      tip: 'slipper 音译。韩国家里、宿舍都必备', tipEn: 'Transliteration of \'slipper.\' Essential in Korean homes and dorms.',
    },
    {
      id: 'd11-w4',
      korean: '이거',
      hangul: 'i-geo',
      zh: '这个', zhEn: 'This',
      pos: '代词', posEn: 'Pronoun',
      example: { ko: '이거 주세요.', zh: '请给我这个。', zhEn: 'Please give me this.' },
      tip: 'Day 9 复习。手边的东西', tipEn: 'Day 9 review. Things at hand.',
    },
    {
      id: 'd11-w5',
      korean: '그거',
      hangul: 'geu-geo',
      zh: '那个（对方那）', zhEn: 'That (by you)',
      pos: '代词', posEn: 'Pronoun',
      example: { ko: '그거 뭐예요?', zh: '那个是什么？', zhEn: 'What is that?' },
      tip: '对方手边或刚提到的', tipEn: 'By the other person or just mentioned.',
    },
    {
      id: 'd11-w6',
      korean: '저거',
      hangul: 'jeo-geo',
      zh: '那个（远处）', zhEn: 'That (over there)',
      pos: '代词', posEn: 'Pronoun',
      example: { ko: '저거 얼마예요?', zh: '那个（远处）多少钱？', zhEn: 'How much is that (over there)?' },
      tip: '远处的、第三方位置的', tipEn: 'Far away, in a third-party position.',
    },
  ],

  dialogue: {
    scene: '大创 收银台前', sceneEn: 'In front of the Daiso checkout counter',
    setting: {
      time: '傍晚 6 点', timeEn: '6 PM in the evening',
      place: 'Daiso 학교 근처점',
      npc: '羊店员 + Junho', npcEn: 'Sheep clerk + Junho',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '저기요, 저거 얼마예요?',
        hangul: 'jeo-gi-yo, jeo-geo eol-ma-ye-yo',
        zh: '不好意思，那个（远处）多少钱？', zhEn: 'Excuse me, how much is that (over there)?',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '羊店员', npcNameEn: 'Sheep clerk',
        ko: '저거요? 천 원이에요.',
        hangul: 'jeo-geo-yo? cheon won-i-e-yo',
        zh: '那个吗？1000 元。', zhEn: 'That one? It\'s 1,000 won.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '와… 그럼 세 개 주세요.',
        hangul: 'wa… geu-reom se gae ju-se-yo',
        zh: '哇…那请给我三个。', zhEn: 'Wow... then I\'ll take three, please.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '이거 봐! 당근 키링!',
        hangul: 'i-geo bwa! dang-geun ki-ring',
        zh: '看！胡萝卜钥匙扣！', zhEn: 'Look! A carrot keychain!',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '兔莉对羊店员说"这个也给我"，应该怎么说？', zhEn: 'How should Tori say "I\'ll take this too" to the sheep clerk?',
        practice: 'pick',
        choices: [
          { ko: '이것도 주세요.', zh: '这个也请给我。', zhEn: 'I\'ll take this too, please.', correct: true },
          { ko: '저거 없어요.', zh: '那个没有。', zhEn: 'We don\'t have that.', correct: false },
          { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '指示代词复习 · 이거 그거 저거 升级应用', titleEn: 'Demonstrative Pronouns Review · 이거 그거 저거 Advanced Usage',
    pattern: '이거(我) / 그거(你) / 저거(远) + 助词(은/는, 도, 을/를) + 动词', patternEn: '이거 (this) / 그거 (that) / 저거 (that over there) + particles (은/는, 도, 을/를) + verb',
    whenToUse: 'Day 9 学了基本三选一，Day 11 升级——加助词、加动词、加句型。从"指东西"升级到"用东西造句"。兔莉在便利店买了胡萝卜笔和日用品，指着各种东西练习完整句子。', whenToUseEn: 'On Day 9 you learned the basic three-way distinction; Day 11 levels up—adding particles, verbs, and sentence patterns. You go from "pointing at things" to "making sentences with things." Tori bought a carrot pen and daily necessities at the convenience store, pointing at various items to practice full sentences.',
    rules: [
      '**이거/그거/저거 + 도 = ___也**：이것도 주세요（这个也请给我）。도 直接粘在 거 后面，代替 이/가 或 을/를。两个东西都要时万能句',
      '**이거/그거/저거 + 은/는 = ___呢**：이거는 얼마예요?（这个呢，多少钱？）加了 은/는 暗示"我在问这个（相比于别的）"。이거 无收音 → 이거는，저거 无收音 → 저거는',
      '**이거/그거/저거 + 을/를 = 把___**：이거를 주세요（请把这个给我，加宾格更标准）。口语常省略 을/를，但书面/正式场合保留',
      '**이거/그거/저거 + 예요/이에요 = 是___ **：이거는 샴푸예요（这个是洗发水）。거 无收音 → 예요。完整的"这个是___"句型 = Day 1 句型 + Day 9 指示词',
      '**이거/그거/저거 + 좋아해요 = 喜欢___ **：이거 좋아해요?（喜欢这个吗？）좋아하다 = 喜欢。좋아요（形容词"好"）vs 좋아해요（动词"喜欢"）不同',
      '**이거/그거/저거 + 있어요? = 有___吗？**：이거 있어요?（有这个吗？）——Day 10 的 있어요 和 Day 9 的指示词首次组合。便利店最实用问句',
      '**이거/그거/저거 + 뭐예요? = ___是什么？**：저거 뭐예요?（远处那个是什么？）뭐 = 什么(무엇 的缩写)。问不认识的东西时用',
      '**三层空间总复习**：이(我)→ 그(你)→ 저(远)。店员手上的东西 = 그거（不是 이거，不是你的手）。刚提到的东西 = 그거。远处橱窗里的 = 저거。상대방 쪽 = 그，멀리 = 저',
    ],
    examples: [
      { ko: '이거 얼마예요?', zh: '这个多少钱？', zhEn: 'How much is this?', highlight: '이거', note: '이거 无收音，얼마예요 直接接。逛街/便利店最常用句', noteEn: '이거 has no final consonant, so 얼마예요 attaches directly. Most common phrase when shopping or at a convenience store.' },
      { ko: '그거 주세요.', zh: '请给我那个。', zhEn: 'Please give me that one.', highlight: '그거', note: '그거 = 对方手上的。店员拿的东西用 그거，不能因为"我想买"就用 이거', noteEn: '그거 = the one the other person is holding. Use 그거 for what the clerk is holding; don\'t use 이거 just because you want to buy it.' },
      { ko: '저거는 뭐예요?', zh: '那个（远处）是什么？', zhEn: 'What is that (over there)?', highlight: '저거는', note: '저거 + 는(主题) + 뭐예요 = 那个呢，是什么。加了 는 表示"我指那个在问"', noteEn: '저거 + 는 (topic) + 뭐예요 = that one, what is it? Adding 는 means "I\'m pointing at that and asking."' },
      { ko: '이것도 주세요.', zh: '这个也请给我。', zhEn: 'I\'ll take this too, please.', highlight: '이것도', note: '도 = 也。两个东西都要时在第一个之后说 이것도', noteEn: '도 = also. When you want both things, say 이것도 after the first one.' },
      { ko: '이거 좋아해요?', zh: '喜欢这个吗？', zhEn: 'Do you like this?', highlight: '좋아해요', note: '좋아하다(喜欢·动词) → 좋아해요。좋아요(好·形容词) 和 좋아해요(喜欢·动词) 不同', noteEn: '좋아하다 (to like · verb) → 좋아해요. 좋아요 (good · adjective) and 좋아해요 (to like · verb) are different.' },
      { ko: '샴푸 이거 있어요?', zh: '洗发水，有这个吗？', zhEn: 'Shampoo, do you have this?', highlight: '있어요?', note: '名词前置 + 이거 있어요 = 有XX这个吗？语序比中文灵活', noteEn: 'Noun first + 이거 있어요 = do you have this XX? Word order is more flexible than Chinese.' },
    ],
    pitfall:
      '① 店员手上的东西 → 그거，不是 이거。이거 只能是你自己手上的。② 이거는(这个呢·话题) 和 이거를(把这个·宾语) 不同——은/는 表话题，을/를 表动作对象。③ 口语中 을/를 常省略，但加了更标准。初学者建议先不加，自然后再加。④ 저거는 있어요? ❌ → 저거 있어요? ✅——指示词 + 存在词不加 은/는，直接接。',
  },

  output: [
    {
      id: 'd11-o1',
      kind: 'compose',
      zhHint: '那个（远处）多少钱？', zhHintEn: 'How much is that (over there)?',
      tokens: ['저거', '얼마예요', '?', '이거', '그거', '있어요'],
      composeAnswer: ['저거', '얼마예요', '?'],
      successMsg: '羊店员指了一下："저거요? 천 원이에요." ✓', successMsgEn: 'The sheep clerk pointed: "저거요? 천 원이에요." ✓',
    },
    {
      id: 'd11-o2',
      kind: 'listen-choice',
      audioKo: '저거 천 원이에요.',
      successMsg: '✓ 「那个 1000 元」。「저거」= 远处的那个；「천 원」= 1000 韩元（约 5 RMB）。', successMsgEn: '✓ "That one is 1,000 won." 저거 = that one over there; 천 원 = 1,000 won (about 5 RMB).',
      choices: [
        { zh: '那个 1000 元。', zhEn: 'That one is 1,000 won.', correct: true },
        { zh: '这个 1000 元。', zhEn: 'This one is 1,000 won.', correct: false },
        { zh: '那个 100 元。', zhEn: 'That one is 100 won.', correct: false },
        { zh: '那个 10000 元。', zhEn: 'That one is 10,000 won.', correct: false },
      ],
    },
    {
      id: 'd11-o3',
      kind: 'zh-to-ko',
      zhPrompt: '请也给我这个。', zhPromptEn: 'Please give me this too.',
      successMsg: '"이것도 주세요" — 「도」= 也，紧贴在「이거」后面。', successMsgEn: '"이것도 주세요" — 「도」 means \'also\', attached right after 「이거」.',
      choices: [
        { ko: '이것도 주세요.', correct: true },
        { ko: '이거를 주세요.', correct: false },
        { ko: '저거도 주세요.', correct: false },
        { ko: '이거가 주세요.', correct: false },
      ],
    },
    {
      id: 'd11-o4',
      kind: 'particle-error',
      zhHint: '请给我三个那个（远处的）。', zhHintEn: 'Please give me three of those (over there).',
      successMsg: '「세 개」是固有数 셋(3) 配量词「개」时变「세」。1=한, 2=두, 3=세, 4=네。', successMsgEn: '「세 개」: the native number 셋(3) becomes 세 when paired with the counter 「개」. 1=한, 2=두, 3=세, 4=네.',
      choices: [
        { ko: '저거 세 개 주세요.', correct: true },
        { ko: '저거 셋 개 주세요.', correct: false },
        { ko: '저거 삼 개 주세요.', correct: false },
        { ko: '저거 세 잔 주세요.', correct: false },
      ],
    },
    {
      id: 'd11-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 11 核心词全部对上。大创 的胡萝卜钥匙扣在书包上晃了一路。', successMsgEn: '✓ Day 11 core words all matched. The carrot keychain from Daiso swung on my backpack the whole way.',
      pairs: [
        { ko: '샴푸', zh: '洗发水', zhEn: 'Shampoo' },
        { ko: '수건', zh: '毛巾', zhEn: 'Towel' },
        { ko: '슬리퍼', zh: '拖鞋', zhEn: 'Slippers' },
        { ko: '이거', zh: '这个', zhEn: 'This' },
        { ko: '저거', zh: '那个(远处)', zhEn: 'that one (over there)' },
      ],
    },
  ],

  recap: {
    toriPose: 'cheer',
    praise: '今天买齐了生活套装 + 一只胡萝卜钥匙扣。토리, 알차게 보냈어요!', praiseEn: 'Today I got the full daily essentials set + a carrot keychain. 토리, 알차게 보냈어요!',
    preview: '明天下午 Minji 要拉我去学校对面的文具店，教我念韩币「만 원」——听说舌头会打结。', previewEn: 'Tomorrow afternoon Minji is dragging me to the stationery store across from school to teach me how to say Korean money \'만 원\' — I heard your tongue gets twisted.',
    stickerId: 'sticker-d11',
    sceneImageUrl: '/images/diary/day-11-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「韩国 Daiso 文化」「指示代词三个区别」「生活用品韩语怎么说」',
};
