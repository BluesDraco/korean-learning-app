import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 7 · ★关卡 1 · 地铁末班车 · 勇气胡萝卜
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
  title: '★关卡 1 · 地铁末班车',
  subtitle: '手机1%，末班车，听不懂的广播',
  isCheckpoint: 7,
  estimatedMin: 15,

  opening: {
    date: '9月 7日 周六 傍晚',
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
      tip: '동사「떨어지다」(掉落) 的过去시형. 掉东西必备',
    },
    {
      id: 'd07-w5',
      korean: '무서워요',
      hangul: 'mu-seo-wo-yo',
      zh: '害怕',
      pos: '形容词',
      example: { ko: '지하철이 무서워요.', zh: '地铁好可怕。' },
      tip: '형용사「무섭다」의 해요体。心里害怕时用',
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
    title: '紧急求助三句',
    pattern: '**도와주세요!** / **잠깐만요!** / **같이 가요!**',
    whenToUse: '迷路、找不到、害怕——这三句是留学生的保命句式。',
    rules: [
      '**도와주세요** = 请帮帮我。最直接的求助，任何紧急情况通用',
      '**잠깐만요** = 等一下。叫住陌生人、阻止关门、买时间',
      '**같이 가요** = 一起走吧。从 Day 5 学过，危急时也能用',
    ],
    examples: [
      { ko: '도와주세요!', zh: '请帮帮我！', highlight: '도와주세요', note: '도와(帮) + **주세요**，是 Day 2 学的「주세요」的组合应用' },
      { ko: '잠깐만요, 저기요!', zh: '等一下，不好意思！', highlight: '잠깐만요', note: '**잠깐**(片刻) + **만**(只) + **요**（敬语尾）= 只要片刻' },
      { ko: '같이 가요!', zh: '一起走吧！', highlight: '같이 가요', note: '**같이**(一起) + **가요**(走/去)。Day 5 学过，危急时也能用' },
      { ko: '당근이 떨어졌어요.', zh: '胡萝卜掉了。', highlight: '떨어졌어요', note: '**떨어지다** 过去时。이 因为 당근 받침 ㄴ' },
    ],
    pitfall:
      '对陌生人用「도와주세요」是正确的，但对已经是朋友的 Haru，说「고마워」(谢谢，반말) 比说「감사합니다」更自然、更亲近。礼貌程度要和关系匹配。',
  },

  output: [
    {
      id: 'd07-o1',
      kind: 'compose',
      zhHint: '请帮帮我。（关卡综合：用这周学的请求句式）',
      tokens: ['도와주세요', '잠깐만요', '도와요', '주세요', '도와', '부탁드려요'],
      composeAnswer: ['도와주세요'],
      successMsg: '✓ 这一句，Tori 在站台上说出来了。',
    },
    {
      id: 'd07-o2',
      kind: 'compose',
      zhHint: '是的，没错。我是中国人。（Week 1 综合复习）',
      tokens: ['네', '맞아요', '저는', '중국', '사람이에요', '사람예요', '저은'],
      composeAnswer: ['네', '맞아요', '저는', '중국', '사람이에요'],
      successMsg: '✓ Week 1 核心句式全部到位。',
    },
    {
      id: 'd07-o3',
      kind: 'listen-choice',
      audioKo: '같이 가자.',
      successMsg: '✓「一起走吧」——반말형태 가자，Haru 对朋友说的。',
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
      zhPrompt: '那个，请帮帮我。（在陌生人面前开口）',
      successMsg: '저기요 叫住对方，도와주세요 说出请求——两句连用是开口的完整模板。',
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
      successMsg: '✓ 关卡 1 通关！胡萝卜被捡回来了，Haru 陪着一起走 🥕',
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
    praise: '🎉 关卡 1 通关！没赶上末班车，但遇到了最重要的人。토리, 정말 잘했어요!',
    preview: '明天…回到宿舍，房间里只有泡面和一面贴满便利贴的镜子。',
    stickerId: 'sticker-d07',
  },

  carrotHint:
    '关卡通关！可以问胡萝卜「韩语地铁相关词汇」「如何问路」「반말和해요体怎么切换」',
};
