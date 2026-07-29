import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 10 · 学校食堂 · 有什么 / 没什么
 *
 * 剧情：中午 12 点，Junho 拉兔莉去学校식당（食堂）。
 * 排队到她时，袋鼠阿姨看着她问："오늘 뭐 드릴까요?"
 * 兔莉点了 김치찌개 (泡菜汤)，结果袋鼠阿姨笑着摇头："오늘 없어요. 된장찌개 있어요."
 * （今天没有，有大酱汤。）兔莉吃完后香得想哭——又咸又香。
 *
 * 学习目标：있어요 / 없어요 / 食堂用语 / 韩国常见菜名
 * 韩语自审：korean skill PASS
 */
export const day10: ToriDay = {
  level: 'beginner',
  day: 10,
  phase: 'foundation',
  title: '学校食堂 · 有什么 / 没什么',
  subtitle: '没吃到泡菜汤但吃到了人生第一碗大酱汤',
  heroImageUrl: '/images/diary/day-10-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 10일 · 화요일 점심',
    weather: '兽尔 · 晴',
    toriPose: 'happy',
    diaryText: `9月 10日，周二中午 12:10。

Junho 在教室门口等我："토리야, 점심 같이 가자."
他说的"가자"我居然听懂了——一起走。

学校식당排着长长的队，
窗口飘着辣辣香香的味道。
食堂角落的电视里放着 LUMI PAW 的广告——一只白孔雀在广告里微笑。

轮到我了。袋鼠阿姨抬头："오늘 뭐 드릴까요?"
我事先查好了：김치찌개. (泡菜汤)
我紧张地说："김치찌개 있어요?"
（有泡菜汤吗？）

袋鼠阿姨笑着摇头：
"오늘 없어요. 된장찌개 있어요."
（今天没有。有大酱汤。）

我不知道된장是什么，
Junho 偷偷拿手机翻译给我看——大酱。

我点点头："그럼 된장찌개 주세요."
（那请给我大酱汤。）

吃下第一口的时候，
咸、香、烫，
鼻子有点酸。
不是辣的，是想家的那种酸。`,
  },

  words: [
    {
      id: 'd10-w1',
      korean: '있어요',
      hangul: 'i-sseo-yo',
      zh: '有 / 在',
      pos: '动词',
      example: { ko: '시간 있어요?', zh: '有时间吗？' },
      tip: '动词「있다」(有/在) 的礼貌形。万能字之一',
    },
    {
      id: 'd10-w2',
      korean: '없어요',
      hangul: 'eop-seo-yo',
      zh: '没有 / 不在',
      pos: '动词',
      example: { ko: '오늘 없어요.', zh: '今天没有。' },
      tip: '动词「없다」的礼貌形。「있어요」的反义词',
    },
    {
      id: 'd10-w3',
      korean: '김치찌개',
      hangul: 'kim-chi-jji-gae',
      zh: '泡菜汤',
      pos: '名词',
      example: { ko: '김치찌개 주세요.', zh: '请给我泡菜汤。' },
      tip: '韩国国民汤。配米饭神器',
    },
    {
      id: 'd10-w4',
      korean: '된장찌개',
      hangul: 'doen-jang-jji-gae',
      zh: '大酱汤',
      pos: '名词',
      example: { ko: '된장찌개도 맛있어요.', zh: '大酱汤也好吃。' },
      tip: '된장 = 大酱（韩国传统发酵酱）',
    },
    {
      id: 'd10-w5',
      korean: '점심',
      hangul: 'jeom-sim',
      zh: '午饭',
      pos: '名词',
      example: { ko: '점심 같이 먹어요.', zh: '一起吃午饭。' },
      tip: '搭配：아침(早饭) / 점심(午饭) / 저녁(晚饭)',
    },
    {
      id: 'd10-w6',
      korean: '맛있어요',
      hangul: 'ma-si-sseo-yo',
      zh: '好吃',
      pos: '形容词',
      example: { ko: '진짜 맛있어요!', zh: '真的好吃！' },
      tip: '反义词「맛없어요」(不好吃) — 发音 [마덥써요]，맛 的 ㅅ 받침变 ㄷ 音再连到 없。맛있어요 是 [마시써요]，ㅅ 直接滑到 이 前',
    },
  ],

  dialogue: {
    scene: '学校食堂 · 点餐窗口',
    setting: {
      time: '中午 12:10',
      place: '学校食堂',
      npc: '袋鼠阿姨',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '袋鼠阿姨',
        ko: '오늘 뭐 드릴까요?',
        hangul: 'o-neul mwo deu-ril-kka-yo',
        zh: '今天给您什么？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '김치찌개 있어요?',
        hangul: 'kim-chi-jji-gae i-sseo-yo',
        zh: '有泡菜汤吗？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '袋鼠阿姨',
        ko: '오늘 없어요. 된장찌개 있어요.',
        hangul: 'o-neul eop-seo-yo. doen-jang-jji-gae i-sseo-yo',
        zh: '今天没有。有大酱汤。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '그럼 된장찌개 주세요.',
        hangul: 'geu-reom doen-jang-jji-gae ju-se-yo',
        zh: '那请给我大酱汤。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '된장찌개… 오, 진짜 맛있어!',
        hangul: 'doen-jang-jji-gae… o, jin-jja ma-si-sseo!',
        zh: '大酱汤……哦，真好吃！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '阿姨把托盘递过来，兔莉应该说什么？',
        practice: 'pick',
        choices: [
          { ko: '감사합니다. 잘 먹겠습니다.', zh: '谢谢。我会好好吃的。', correct: true },
          { ko: '맛없어요.', zh: '不好吃。', correct: false },
          { ko: '없어요.', zh: '没有。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '있어요 / 없어요 — 韩语万能存在词',
    pattern: 'N + 이/가 + 있어요 (有/在)  /  N + 이/가 + 없어요 (没有/不在)',
    whenToUse: '韩语里"有"和"在"是同一个词——있어요。问"有没有XX"、说"XX在不在"、表达"好吃/有趣"全部用这对反义词。TOPIK 1 级必考，出现频率最高的动词之一。Day 10 兔莉去食堂点泡菜汤，问"有泡菜汤吗"。',
    rules: [
      '**基本含义**：있어요 = 有/在，없어요 = 没有/不在。同一个词表"存在"和"拥有"——韩语不区分这两个概念。돈 있어요 可以是"有钱"也可以是"钱在（这里）"',
      '**主语助词 이/가**：名词后加 이/가 再接 있어요/없어요。有收音 → 이（시간이 있어요），无收音 → 가（친구가 있어요）。口语中常省略助词',
      '**疑问只需升调**：시간 있어요?（有时间吗？）陈述和疑问词形完全一样，只靠句末升调区分。这和 Day 6 学的 이에요? 是同一规则',
      '**过去式**：있었어요（有过/在过）、없었어요（没有过/不在过）。어제 집에 있었어요?（昨天在家吗？）→ 네, 있었어요 / 아니요, 없었어요',
      '**尊待形式**：있으세요?（有吗·敬语）、계세요?（在吗·敬语，用于人）。对长辈/老师："선생님 계세요?"（老师在吗？），不能用 있어요',
      '**맛있다 / 맛없다 固定搭配**：맛(味) + 있다/없다 = 好吃/难吃。맛있어요!（好好吃！）、맛없어요（不好吃）。同理：재미있다（有趣）、재미없다（无聊）',
      '**常见回答模式**：있어요? → 네, 있어요 / 아니요, 없어요。없어요? → 네, 없어요 / 아니요, 있어요。注意 네/아니요 逻辑和中文不同——确认对方说的对不对',
      '**发音重点**：없어요 实际发音 [업써요]。ㅄ 是双收音，只发左边的 ㅂ，右边的 ㅅ 不发音但让后面的 어 变成 [써]（紧音化）。多听多模仿最有效',
    ],
    examples: [
      { ko: '김치찌개 있어요?', zh: '有泡菜汤吗？', highlight: '있어요?', note: '김치찌개 有收音 → (이) 省略。句末升调变疑问，点餐万能句' },
      { ko: '오늘 없어요. 죄송합니다.', zh: '今天没有。对不起。', highlight: '없어요', note: '实际发音 [업써요]。店员常用回答——卖完了的委婉说法' },
      { ko: '시간 있어요?', zh: '有时间吗？', highlight: '있어요?', note: '시간 有收音 ㄴ → 이 있어요。问别人是否有空的最常用句子' },
      { ko: '문제없어요!', zh: '没问题！', highlight: '없어요', note: '문제(问题) + 없어요 = 没问题。回答确认/安慰时的固定搭配' },
      { ko: '진짜 맛있어요!', zh: '真的好好吃！', highlight: '맛있어요', note: '맛(味道) + 있다(有) = 有味道 = 好吃。진짜(真的) 加强语气' },
      { ko: '어제 집에 있었어요?', zh: '昨天在家吗？', highlight: '있었어요', note: '있다 过去式 → 있었어요。있었 是 있 + 었 的过去形。问过去存在/在否' },
    ],
    pitfall:
      '① 人用 계세요 不用 있어요：선생님 있어요? ❌（对老师不礼貌）→ 선생님 계세요? ✅。② 네/아니요 回答逻辑：问"없어요?"（没有吗？）→ 如果确实没有 → 네, 없어요（对，没有）。和中文"对/不对"逻辑相反。③ 맛있어요 四个音节连读：[마시써요]，不是 [맛-이써요]——连音后 ㅅ 滑到 이 前面，变成 시。',
  },

  output: [
    {
      id: 'd10-o1',
      kind: 'compose',
      zhHint: '有泡菜汤吗？',
      tokens: ['김치찌개', '있어요', '?', '없어요', '맛있어요', '된장찌개'],
      composeAnswer: ['김치찌개', '있어요', '?'],
      successMsg: '袋鼠阿姨抬头看你一眼 ✓',
    },
    {
      id: 'd10-o2',
      kind: 'listen-choice',
      audioKo: '오늘 없어요.',
      successMsg: '✓ 「今天没有」。「없어요」实际念 [업써요]——「ㅄ」받침只发 ㅂ。',
      choices: [
        { zh: '今天没有。', correct: true },
        { zh: '今天有。', correct: false },
        { zh: '今天好吃。', correct: false },
        { zh: '今天没问题。', correct: false },
      ],
    },
    {
      id: 'd10-o3',
      kind: 'zh-to-ko',
      zhPrompt: '那，请给我大酱汤。',
      successMsg: '"그럼" = 那（顺承）；点单加「주세요」即可，前面助词省略很自然。',
      choices: [
        { ko: '그럼 된장찌개 주세요.', correct: true },
        { ko: '그래서 된장찌개 주세요.', correct: false },
        { ko: '그럼 김치찌개 주세요.', correct: false },
        { ko: '그럼 된장찌개 있어요.', correct: false },
      ],
    },
    {
      id: 'd10-o4',
      kind: 'particle-error',
      zhHint: '有时间吗？',
      successMsg: '시간 末字「간」有받침 ㄴ → 主语助词「이」。问句升调即可。',
      choices: [
        { ko: '시간 있어요?', correct: true },
        { ko: '시간를 있어요?', correct: false },
        { ko: '시간를 없어요?', correct: false },
        { ko: '시간이 있다?', correct: false },
      ],
    },
    {
      id: 'd10-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 10 核心词全部对上。大酱汤喝完了，碗底居然有一小片胡萝卜。',
      pairs: [
        { ko: '있어요', zh: '有' },
        { ko: '없어요', zh: '没有' },
        { ko: '김치찌개', zh: '泡菜汤' },
        { ko: '점심', zh: '午饭' },
        { ko: '맛있어요', zh: '好吃' },
      ],
    },
  ],

  recap: {
    toriPose: 'happy',
    praise: '问出了"有没有"的句子。今天还学会了「잘 먹었습니다」。',
    preview: '明天 Junho 说带我去다이소买生活用品。"이거 / 그거 / 저거" 要派上用场了。',
    stickerId: 'sticker-d10',
    sceneImageUrl: '/images/diary/day-10-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「있어요和없어요发音区别」「韩国食堂常见菜」「饭后怎么说谢谢」',
};
