import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 7 · 地铁末班车 · 勇气胡萝卜
 *
 * 剧情：Tori 第一次独自坐兽尔爪爪线。手机只剩 1%，找不到回宿舍的站。
 * 末班车即将进站，广播全是听不懂的韩语。她想问路，但一个字都说不出来。
 * 慌忙翻包找勇气胡萝卜时，胡萝卜掉了出来，滚向即将关闭的车厢门。
 * 就在她的勇气快要滚走时，一只仓鼠的手伸进画面，捡起了胡萝卜——Haru。
 * Tori 没赶上那班车，但她遇到了改变整个留学生活的人。
 *
 * 学习目标：综合复习 Day 1-6 / 紧急求助三句 / 勇气发声
 * 语料层级：해요体 + 반말（Haru）
 * 韩语自审：korean skill PASS（자연성/문법/발음 三关）
 */
export const day7: ToriDay = {
  level: 'beginner',
  day: 7,
  phase: 'foundation',
  title: '地铁末班车 · Haru',
  subtitle: '手机1%，末班车，遇见了最重要的人',
  heroImageUrl: '/images/diary/day-07-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 7일 · 토요일 저녁',
    weather: '兽尔 · 雨',
    toriPose: 'shy',
    diaryText: `9月 7日，周六傍晚。

我不知道怎么一个人坐地铁坐到了陌生的站。
手机显示 1%。
站台广播全是我听不懂的韩语。

末班车灯牌亮着，还有三分钟进站。

我想问人，但嘴巴完全打不开——
一整周学的所有话突然全忘了。

我翻包找胡萝卜。
然后它就掉了出来，
咕噜咕噜，滚向正在关闭的车厢门。

我愣在原地。

然后一只仓鼠的手伸进画面，
捡起了胡萝卜，递给我。

"여기. 토리, 괜찮아?"
（给你。Tori，没事吧？）

Haru。

我没赶上那班车。
但那晚我才知道——
有些事，比赶上末班车更重要。`,
  },

  words: [
    {
      id: 'd07-w1',
      korean: '지하철',
      hangul: 'ji-ha-cheol',
      zh: '地铁',
      pos: '名词',
      example: { ko: '지하철 타요.', zh: '坐地铁。' },
      tip: '지하(地下) + 철(铁)。兽尔地铁覆盖全城，留学必备',
    },
    {
      id: 'd07-w2',
      korean: '잠깐만요',
      hangul: 'jam-kkan-man-yo',
      zh: '等一下',
      pos: '表达',
      example: { ko: '잠깐만요, 저기요!', zh: '等一下，不好意思！' },
      tip: '叫住陌生人最快的一句话。「잠깐」= 片刻，「만」= 只',
    },
    {
      id: 'd07-w3',
      korean: '도와주세요',
      hangul: 'do-wa-ju-se-yo',
      zh: '请帮帮我',
      pos: '表达',
      example: { ko: '도와주세요!', zh: '请帮帮我！' },
      tip: '도와(帮) + 주세요(请给我)。紧急求助第一句',
    },
    {
      id: 'd07-w4',
      korean: '떨어졌어요',
      hangul: 'tteo-reo-jyeo-sseo-yo',
      zh: '掉了',
      pos: '动词',
      example: { ko: '당근이 떨어졌어요.', zh: '胡萝卜掉了。' },
      tip: '动词「떨어지다」(掉落) 的过去形。掉东西必备',
    },
    {
      id: 'd07-w5',
      korean: '무서워요',
      hangul: 'mu-seo-wo-yo',
      zh: '害怕',
      pos: '形容词',
      example: { ko: '지하철이 무서워요.', zh: '地铁好可怕。' },
      tip: '形容词「무섭다」的 해요体形。心里害怕时用',
    },
    {
      id: 'd07-w6',
      korean: '괜찮아?',
      hangul: 'gwaen-cha-na',
      zh: '没事吧？（반말）',
      pos: '表达',
      example: { ko: '괜찮아? 도움이 필요해?', zh: '没事吧？需要帮忙吗？' },
      tip: 'Haru 对 Tori 用的반말。同龄朋友之间的温柔版问候',
    },
  ],

  dialogue: {
    scene: '兽尔爪爪线 地铁站台',
    setting: {
      time: '末班车前三分钟',
      place: '兽尔 地铁站台',
      npc: 'Haru 仓鼠',
    },
    lines: [
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '핸드폰 1%… 마지막 열차… 안 들려…',
        hangul: 'haen-deu-pon 1%… ma-ji-mak yeol-cha… an deul-lyeo…',
        zh: '手机1%……末班车……听不懂……',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '저, 저기요… 도와주세요…',
        hangul: 'jeo, jeo-gi-yo… do-wa-ju-se-yo…',
        zh: '那、那个……请帮帮我……',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '아, 당근! 안 돼!',
        hangul: 'a, dang-geun! an dwae!',
        zh: '啊，胡萝卜！不行！',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '여기. 토리, 괜찮아?',
        hangul: 'yeo-gi. to-ri, gwaen-cha-na?',
        zh: '给你。Tori，没事吧？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '하루야?! 어떻게…',
        hangul: 'ha-ru-ya?! eo-tteo-ke…',
        zh: 'Haru？！你怎么……',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '우연히. 같이 가자.',
        hangul: 'u-yeon-hi. ga-chi ga-ja.',
        zh: '偶然路过。一起走吧。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Haru 递来胡萝卜，Tori 心里既感激又有点不好意思——Haru 是朋友，该怎么回应最自然？',
        practice: 'pick',
        choices: [
          { ko: '고마워. 나 좀 무서웠어.', zh: '谢谢。我有点害怕了。（对朋友说真心话）', correct: true },
          { ko: '감사합니다. 죄송합니다.', zh: '谢谢。对不起。（太正式，Haru 是朋友）', correct: false },
          { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。（在这情境下拒绝接受胡萝卜？）', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '紧急求助三句 · 留学生的保命韩语',
    pattern: '**도와주세요** / **잠깐만요** / **같이 가요**',
    whenToUse: 'Chapter 1 收官——Day 7 兔莉在兽尔街头迷路，Haru 找到了她。这三句是留学生第一天必备的生存韩语：求助、叫停、同行。每一句都是前面 6 天语法的组合应用。',
    rules: [
      '**도와주세요 构词**：돕다（帮，动词）→ 도와（ㅂ不规则：돕 → 도오 → 도와）+ 주세요（Day 2 万能句式）= 请帮帮我',
      '**도와주세요 使用场景**：迷路了、东西掉了、被跟踪、手机没电。对任何陌生人说都安全。比"도움!"（救命！）更礼貌',
      '**도와주세요 敬语层级**：도와주세요（해요체 温暖礼貌）→ 도와주십시오（합쇼체 最正式）→ 도와줘（해체/반말 朋友间）',
      '**잠깐만요 构词**：잠깐（一会儿，名词）+ 만（只，助词）+ 요（敬语尾）= 只要一会儿',
      '**잠깐만요 使用场景**：叫住快关的电梯门、阻止别人挂电话、结账时找钱包、拦下快要开走的公交。是"等一下"而非"停"——柔和且礼貌',
      '**잠깐만요 类似表达**：잠시만요（更正式，잠시=暂时 汉字词）≈ 잠깐만요（更口语）。기다려 주세요（请等我）更直接但有命令感',
      '**같이 가요 构词**：같이（一起，副词）+ 가다（去，动词）→ 가요（해요체 礼貌语尾）= 一起去吧',
      '**같이 가요 使用场景**：约人同行、迷路时跟着认识的人走、下课一起去食堂。가다 可替换为其他动词：같이 먹어요（一起吃吧）、같이 공부해요（一起学习吧）',
      '**Chapter 1 知识回顾**：Day 2 주세요 + Day 4 입니다/이에요 + Day 5 은/는 + Day 6 이에요? = 到 Day 7 全部综合运用。도와주세요 里的 주세요 就是 Day 2 学的',
    ],
    examples: [
      { ko: '도와주세요! 길을 잃었어요.', zh: '请帮帮我！我迷路了。', highlight: '도와주세요', note: '돕다 → 도와 + 주세요。길(路) + 을(宾格) + 잃다(丢失) → 잃었어요(过去式)' },
      { ko: '도와주세요! 당근이 없어졌어요.', zh: '请帮帮我！胡萝卜不见了。', highlight: '도와주세요', note: '당근(胡萝卜) + 이(主格) + 없어지다(消失) → 없어졌어요(过去式)。兔莉的胡萝卜丢了' },
      { ko: '잠깐만요, 저기요!', zh: '等一下，那边！', highlight: '잠깐만요', note: '저기요 = 叫陌生人"那位"的万能词。잠깐만요 + 저기요 = 标准拦人组合' },
      { ko: '잠깐만요, 이거 얼마예요?', zh: '等一下，这个多少钱？', highlight: '잠깐만요', note: '买东西叫住老板问价。이거(这个) + 얼마(多少) + 예요(是) = 多少钱' },
      { ko: '같이 가요! 무서워요.', zh: '一起走吧！好害怕。', highlight: '같이 가요', note: '무섭다(害怕) → 무서워요(ㅂ不规则)。Haru 对 Tori 说的温暖邀请' },
      { ko: '같이 밥 먹으러 가요.', zh: '一起去吃饭吧。', highlight: '같이 ... 가요', note: '밥(饭) + 먹다(吃) → 먹으러(为了吃)。같이 [动词]러 가요 = 一起去做___吧' },
    ],
    pitfall:
      '① 도와주세요 ≠ "Help!"——韩语的"救命"最直接的词是"살려주세요!"，但 도와주세요 更常用且礼貌。② 잠깐만요 不能用来让正在说话的人闭嘴——那是"조용히 해 주세요"（请安静）。③ 같이 가요 对第一次见面的陌生人可能让对方觉得太亲近——不熟时用"혹시 길을 아세요?"（你知道路吗）更安全。',
  },

  output: [
    {
      id: 'd07-o1',
      kind: 'compose',
      zhHint: '请帮帮我。',
      tokens: ['도와주세요', '잠깐만요', '도와요', '도우세요', '부탁드려요', '살려요'],
      composeAnswer: ['도와주세요'],
      successMsg: '✓ 这一句，Tori 在站台上说出来了。',
    },
    {
      id: 'd07-o2',
      kind: 'compose',
      zhHint: '是的，没错。我是中国人。',
      tokens: ['네', '맞아요', '저는', '중국 사람이에요', '사람예요', '저은', '중국사람'],
      composeAnswer: ['네', '맞아요', '저는', '중국 사람이에요'],
      successMsg: '✓ Week 1 核心句式到位。',
    },
    {
      id: 'd07-o3',
      kind: 'listen-choice',
      audioKo: '같이 가자.',
      successMsg: '✓「一起走吧」——반말形 가자，Haru 对朋友说的。',
      choices: [
        { zh: '一起走吧。', correct: true },
        { zh: '你从哪里来？', correct: false },
        { zh: '我们去便利店吧。', correct: false },
        { zh: '没事吧？', correct: false },
      ],
    },
    {
      id: 'd07-o4',
      kind: 'zh-to-ko',
      zhPrompt: '那个，请帮帮我。',
      successMsg: '저기요 叫住对方，도와주세요 说出请求。',
      choices: [
        { ko: '저기요, 도와주세요.', correct: true },
        { ko: '잠깐만요, 같이 가요.', correct: false },
        { ko: '도와주세요, 안녕하세요.', correct: false },
        { ko: '저기요, 죄송합니다.', correct: false },
      ],
    },
    {
      id: 'd07-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 7 完成！遇见了 Haru 🥕',
      pairs: [
        { ko: '지하철', zh: '地铁' },
        { ko: '도와주세요', zh: '请帮帮我' },
        { ko: '잠깐만요', zh: '等一下' },
        { ko: '무서워요', zh: '害怕' },
        { ko: '같이 가요', zh: '一起走' },
      ],
    },
  ],

  recap: {
    toriPose: 'celebrate',
    praise: '今天没赶上末班车，但遇到了最重要的人。토리, 정말 잘했어요!',
    preview: '明天…回到宿舍，房间里只有泡面和一面贴满便利贴的镜子。',
    stickerId: 'sticker-d07',
    sceneImageUrl: '/images/diary/day-07-scene.jpg',
  },

  carrotHint: '可以问胡萝卜「韩语地铁相关词汇」「如何问路」「반말和해요体怎么切换」',
};
