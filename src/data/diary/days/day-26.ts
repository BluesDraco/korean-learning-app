import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 26 · 关卡 4 · 偶像 생일카페 一个人挑战
 *
 * 剧情：周五下午 3 点。Junho 上班实习，Minji 期中考试。
 * 兔莉一个人推开「달빛카페」的玻璃门——
 * 这次不是来排队凑热闹，是真正的粉丝。
 * 队伍里 30 个女生在小声尖叫。
 * 收银台是一只年轻的鹿店员，戴粉色围裙，胸前别着「하루」的应援徽章。
 * 兔莉点单 → 拿小卡 → 即兴对话。综合 Day 11~25 全部套路。
 * 这次不仅要点对，还要听懂偶像专属暗号。
 *
 * 学习目标：综合咖啡馆 + 응원 + KPOP 词汇 / 即兴粉丝对话
 * 韩语自审：korean skill PASS (生카文化 + 즉흥대화)
 */
export const day26: ToriDay = {
  day: 26,
  phase: 'expression',
  title: '🎤 关卡 4 · 一个人去偶像 생카',
  subtitle: '从打招呼到拿小卡，全靠自己',
  isCheckpoint: 26,
  estimatedMin: 16,

  opening: {
    date: '9월 29일 금요일 오후',
    weather: '首尔 · 多云',
    toriPose: 'cheer',
    diaryText: `9월 29日，周五下午 3 点。

Junho 老虎今天实习，
Minji 水獭期中考试，
Haru 仓鼠加班。

我一个人，
站在「달빛카페」门外。

口袋里揣着昨天 Junho 给我的 5000 元——
他说："토리, 너도 한 번 진짜 팬으로 가봐."
（兔莉，你也以真粉的身份去一次。）

队伍里 30 个女生小声尖叫。
我深呼吸。

推开玻璃门，
风铃响。

收银台是一只年轻的鹿店员，
戴粉色围裙，
胸前别着「하루」的应援徽章——
她也是 Haru 哥哥的粉丝。

我攥紧背包里的胡萝卜。

"안녕하세요. 메뉴 하나 추천해 주실 수 있어요?"
（您好。能推荐一杯吗？）

鹿店员眼睛亮了一下：
"하루 오빠 시그니처 음료 어때요? 핑크 라떼."
（하루哥哥的招牌饮料怎么样？粉色拿铁。）

"좋아요. 따뜻한 핑크 라떼 한 잔 주세요."

她点头："5,000원이에요. 한 잔당 사진 카드 한 장이에요."
（5000 元。一杯送一张照片小卡。）

"네, 카드로 할게요."

刷卡的时候，
她突然小声说：
"팬이세요? 처음 오시는 것 같은데."
（您是粉丝吧？看起来是第一次来。）

我笑了：
"네, 친구가 데려와 줬어요. 오늘은 혼자 왔어요."
（是的，朋友带我来过。今天一个人来。）

她递过来咖啡杯 + 一张小卡。
小卡上是 Haru 哥哥的 22 岁生日特典照。

"잘 다녀가세요. 사랑해요!"
（请慢走。我爱你！）

我没忍住，回了一句：
"사랑해요!"

🎤 关卡 4 通关。`,
  },

  words: [
    {
      id: 'd26-w1',
      korean: '시그니처',
      hangul: 'si-geu-ni-cheo',
      zh: '招牌 / 招牌饮料',
      pos: '名词',
      example: { ko: '시그니처 음료 추천해 주세요.', zh: '请推荐招牌饮料。' },
      tip: 'signature 音译。咖啡馆"招牌饮料"高频说法',
    },
    {
      id: 'd26-w2',
      korean: '추천',
      hangul: 'chu-cheon',
      zh: '推荐',
      pos: '名词',
      example: { ko: '추천해 주세요.', zh: '请推荐。' },
      tip: '动词形 추천하다。「추천해 주세요」点单万能句',
    },
    {
      id: 'd26-w3',
      korean: '사진 카드',
      hangul: 'sa-jin ka-deu',
      zh: '小卡 (照片卡)',
      pos: '名词',
      example: { ko: '사진 카드 한 장이에요.', zh: '一张小卡。' },
      tip: '简称 포카 (포토카드)。生카标配赠品。和 응원 文化绑定',
    },
    {
      id: 'd26-w4',
      korean: '한 잔당',
      hangul: 'han jan-dang',
      zh: '每一杯',
      pos: '表达',
      example: { ko: '한 잔당 카드 한 장.', zh: '一杯送一张卡。' },
      tip: '量词 + 당 = 每个~。한 명당 (每人) / 한 개당 (每个)',
    },
    {
      id: 'd26-w5',
      korean: '데려와',
      hangul: 'de-ryeo-wa',
      zh: '带来 (半语)',
      pos: '动词',
      example: { ko: '친구가 데려와 줬어요.', zh: '朋友带我来过。' },
      tip: '데려오다 (带某人来) 半语形。和 데려가다 (带某人去) 是一对',
    },
    {
      id: 'd26-w6',
      korean: '잘 다녀가세요',
      hangul: 'jal da-nyeo-ga-se-yo',
      zh: '请慢走 / 请来玩',
      pos: '表达',
      example: { ko: '안녕히 가세요. 잘 다녀가세요.', zh: '再见。请慢走。' },
      tip: '店员目送顾客离开的礼貌话。比 안녕히 가세요 更亲密',
    },
  ],

  dialogue: {
    scene: '달빛카페 收银台 · 关卡 4 · 一个人挑战',
    setting: {
      time: '周五下午 3 点',
      place: '弘대 입구 · 달빛카페',
      npc: '鹿店员 (粉丝兼职)',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '안녕하세요. 메뉴 하나 추천해 주실 수 있어요?',
        hangul: 'an-nyeong-ha-se-yo. me-nyu ha-na chu-cheon-hae ju-sil su i-sseo-yo',
        zh: '您好。能推荐一杯吗？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '鹿店员',
        ko: '하루 오빠 시그니처 음료 어때요? 핑크 라떼.',
        hangul: 'ha-ru o-ppa si-geu-ni-cheo eum-ryo eo-ttae-yo? ping-keu ra-tte',
        zh: 'Haru 哥哥的招牌饮料怎么样？粉色拿铁。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '좋아요. 따뜻한 핑크 라떼 한 잔 주세요.',
        hangul: 'jo-a-yo. tta-tteu-tan ping-keu ra-tte han jan ju-se-yo',
        zh: '好的。请给我一杯热的粉色拿铁。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '鹿店员',
        ko: '5,000원이에요. 한 잔당 사진 카드 한 장이에요. 팬이세요?',
        hangul: 'o-cheon-won-i-e-yo. han jan-dang sa-jin ka-deu han jang-i-e-yo. paen-i-se-yo',
        zh: '5000 元。一杯送一张小卡。您是粉丝吗？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '鹿店员问"팬이세요?"，兔莉想真诚回答她是新粉丝、第一次自己来，应该选哪句？',
        practice: 'pick',
        choices: [
          { ko: '네. 친구가 데려와 줬어요. 오늘은 혼자 왔어요.', zh: '是的。朋友带我来过。今天一个人来。', correct: true },
          { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。', correct: false },
          { ko: '얼마예요?', zh: '多少钱？', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '关卡 4 总结 · 生카 5 句模板',
    pattern: '점원 + 팬 即兴对话',
    whenToUse: '韩国生日咖啡店、Pop-up Store、签售会都通用。从点单到拿赠品，5 句撑过去。',
    rules: [
      '① 点单求推荐："**추천해 주실 수 있어요?**" / "**시그니처 뭐예요?**"',
      '② 选偶像主题款："**[偶像] 시그니처** + 사이즈 + 정도"',
      '③ 听 한 잔당：店员说"**한 잔당 N 한 장**" → 答 "**네**"',
      '④ 即兴回应："**팬이세요?**" → "네, **친구가 데려와 줬어요**"',
      '⑤ 互相应援："**사랑해요!**" → 店员一定笑回 "**저도요!**"',
    ],
    examples: [
      { ko: '시그니처 음료 추천해 주세요.', zh: '请推荐招牌饮料。' },
      { ko: '한 잔당 카드 한 장이에요.', zh: '一杯一张小卡。' },
      { ko: '친구가 데려와 줬어요.', zh: '朋友带我来过。' },
      { ko: '사랑해요! 저도요!', zh: '我爱你！我也是！' },
    ],
    pitfall:
      '关卡 4 的难点不是点单 — 是**和店员即兴聊一句**。生카店员通常也是粉丝，看到陌生面孔会试探。回一句「친구가 데려와 줬어요」立刻暴露你不是死忠，但她不会嘲笑——反而会更温柔。粉丝之间的善意，是这个关卡的隐藏奖励。',
  },

  output: [
    {
      id: 'd26-o1',
      kind: 'fill',
      prompt: '메뉴 하나 ___ 주실 수 있어요?',
      zhHint: '能推荐一杯吗？',
      answer: '추천해',
      successMsg: '✓ 第一题：推荐求助句过关。',
    },
    {
      id: 'd26-o2',
      kind: 'fill',
      prompt: '따뜻한 핑크 라떼 한 잔 ___.',
      zhHint: '请给我一杯热的粉色拿铁。',
      answer: '주세요',
      successMsg: '✓ 第二题：点单完成。',
    },
    {
      id: 'd26-o3',
      kind: 'fill',
      prompt: '친구가 데려와 ___.',
      zhHint: '朋友带我来过。(过去时礼貌)',
      answer: '줬어요',
      successMsg: '🎉 关卡 4 通关！鹿店员把粉色拿铁 + 一张 Haru 哥哥小卡递给你。"사랑해요!"',
    },
  ],

  recap: {
    toriPose: 'celebrate',
    praise: '🎉 关卡 4 通关！第一次以真粉身份在生咖店应援。토리, 진짜 멋있어요!',
    preview: '明天 Minji 说要请客——四个人聚餐。该轮到我用韩语点菜了。',
    stickerId: 'sticker-d26',
  },

  carrotHint:
    '关卡 4 通关庆祝！可以问胡萝卜「KPOP 생카 文化」「粉丝间 礼貌话」「Week 4 还剩什么」',
};
