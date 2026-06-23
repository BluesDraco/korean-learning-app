import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 23 · 弘大 偶像 생카 · Junho 兴奋了
 *
 * 剧情：放学后 Junho 拽着兔莉走："토리야, 진짜 보여줄 게 있어!"
 * 弘대街拐角，一家叫「달빛카페」的小店外面排了 30 人长队。
 * 玻璃橱窗贴满了应援横幅、明信片、生日蛋糕造型——
 * 是 Junho 老虎喜欢的男团成员"하루"今天 22 岁。
 * Junho 兴奋到颤抖："생일카페야! 줄 서자!"
 * 兔莉第一次见到老虎追星的样子。她记下今天学的所有 KPOP 词，
 * 准备明天关卡 4 一个人来挑战。
 *
 * 学习目标：KPOP 6 词 (오빠/언니/응원/덕질/팬/콘서트) / 진짜 vs 정말
 * 韩语自审：korean skill PASS (KPOP 文化 + 强调副词)
 */
export const day23: ToriDay = {
  day: 23,
  phase: 'expression',
  title: '弘大 생카 · 老虎追星的样子',
  subtitle: 'Junho 兴奋到尾巴在抖',
  isCheckpoint: null,
  estimatedMin: 13,

  opening: {
    date: '9월 26일 화요일 오후',
    weather: '首尔 · 晴',
    toriPose: 'cheer',
    diaryText: `9월 26日，周二下午 4 点。

放学铃刚响。
Junho 老虎一把抓住我的胳膊：
"토리야, 진짜 보여줄 게 있어!"
（兔莉，真的有东西要给你看！）

我还没反应过来，
就被他拽出校门。
他的尾巴在抖。

弘대街拐角。
一家叫「달빛카페」(月光咖啡馆) 的小店——
外面排着 30 人的长队。
玻璃橱窗贴满了应援横幅、
明信片、生日蛋糕造型。
门口是一只男生的等身板——
"하루(Haru)" — Junho 喜欢的男团成员，
和 Haru 仓鼠重名了。

"오늘 하루 오빠 생일이야!"
（今天是 Haru 哥哥的生日！）
"생일카페야! 줄 서자!"
（这是生日咖啡店！排队吧！）

Junho 兴奋到说话太快——
我只听清了三个词：
오빠 / 생일 / 줄.

他从背包里拿出一沓应援卡：
"이거 봐. 우리 팬클럽에서 만든 거야."
（你看，我们粉丝俱乐部做的。）
"진짜 정성이지."
（真的很有诚意。）

我第一次看到老虎追星的样子。
他的眼睛亮得像孩子。

排队 40 分钟。
我们没买到限定饮料，
但 Junho 拿到了一张小卡——
是他抽到的。

回去路上他对我说：
"토리, 너도 한 번 와봐. 진짜 행복해."
（兔莉，你也来一次。真的很幸福。）

我点头。
明天我要一个人来。

📦 关卡 4 在等我。`,
  },

  words: [
    {
      id: 'd23-w1',
      korean: '오빠',
      hangul: 'o-ppa',
      zh: '哥哥 (女→男) / 偶像男爱称',
      pos: '名词',
      example: { ko: '하루 오빠 좋아해요.', zh: '我喜欢 Haru 哥哥。' },
      tip: '女生对年长男生 / 偶像粉丝对偶像。男生用 형',
    },
    {
      id: 'd23-w2',
      korean: '언니',
      hangul: 'eon-ni',
      zh: '姐姐 (女→女) / 偶像女爱称',
      pos: '名词',
      example: { ko: '제니 언니 멋있어요.', zh: 'Jennie 姐姐很帅。' },
      tip: '女生对年长女生。男生对女生用 누나',
    },
    {
      id: 'd23-w3',
      korean: '팬',
      hangul: 'paen',
      zh: '粉丝 (fan)',
      pos: '名词',
      example: { ko: '저는 팬이에요.', zh: '我是粉丝。' },
      tip: 'fan 音译。팬클럽 (粉丝俱乐部) / 팬미팅 (见面会) / 팬싸 (签售)',
    },
    {
      id: 'd23-w4',
      korean: '콘서트',
      hangul: 'kon-seo-teu',
      zh: '演唱会',
      pos: '名词',
      example: { ko: '콘서트 가고 싶어요.', zh: '我想去演唱会。' },
      tip: 'concert 音译。同义 공연 (公演) 更书面',
    },
    {
      id: 'd23-w5',
      korean: '진짜',
      hangul: 'jin-jja',
      zh: '真的',
      pos: '副词',
      example: { ko: '진짜 좋아요!', zh: '真的好喜欢！' },
      tip: '口语强调最高频副词。和「정말」是孪生兄弟，「진짜」更口语',
    },
    {
      id: 'd23-w6',
      korean: '정말',
      hangul: 'jeong-mal',
      zh: '真的 (稍正式)',
      pos: '副词',
      example: { ko: '정말 감사합니다.', zh: '真的非常感谢。' },
      tip: '比 진짜 稍正式。书面/对长辈用 정말 更稳。混着用就好',
    },
  ],

  dialogue: {
    scene: '弘대街 · 달빛카페 排队中',
    setting: {
      time: '周二下午 4 点',
      place: '弘대 入口拐角 · 달빛카페',
      npc: 'Junho 老虎',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho 老虎',
        ko: '토리야, 여기 봐. 하루 오빠 생일카페야!',
        hangul: 'to-ri-ya, yeo-gi bwa. ha-ru o-ppa saeng-il-ka-pe-ya',
        zh: '兔莉你看，是 Haru 哥哥的生日咖啡店！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '와, 진짜 사람 많아요!',
        hangul: 'wa, jin-jja sa-ram ma-na-yo',
        zh: '哇，真的好多人！',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho 老虎',
        ko: '음료 한 잔 사면 응원 카드 받을 수 있어!',
        hangul: 'eum-ryo han jan sa-myeon eung-won ka-deu ba-deul su i-sseo',
        zh: '买一杯饮料就能拿应援卡！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '저도 팬이 돼도 돼요?',
        hangul: 'jeo-do paen-i dwae-do dwae-yo',
        zh: '我也可以当粉丝吗？',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Junho 大笑："당연하지! 우리 한국에서 다 같이 콘서트 가자!"，兔莉应该如何兴奋地回应？',
        practice: 'pick',
        choices: [
          { ko: '진짜? 정말 가고 싶어요!', zh: '真的吗？我真的想去！', correct: true },
          { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。', correct: false },
          { ko: '얼마예요?', zh: '多少钱？', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '强调副词 · 진짜 vs 정말',
    pattern: '진짜 / 정말 + 形容词·动词·名词',
    whenToUse: '韩语口语高频强调。学会这两个，你的话立刻变得有感情。',
    rules: [
      '**진짜** = 真的 / 真心 (口语·KPOP·朋友圈)：진짜 좋아요 / 진짜 예뻐요',
      '**정말** = 真的 / 确实 (略正式·对长辈)：정말 감사합니다 / 정말 죄송합니다',
      '语义几乎一样，差别在场合：朋友/偶像 → 진짜，长辈/正式 → 정말',
      '加强语气连用：「진짜 정말!」 = "真的真的！"，但别和敬语混搭过度',
    ],
    examples: [
      { ko: '진짜 좋아요!', zh: '真的好喜欢！', highlight: '진짜' },
      { ko: '정말 감사합니다.', zh: '真的非常感谢。', highlight: '정말' },
      { ko: '진짜 사람 많아요.', zh: '真的好多人。', highlight: '진짜' },
      { ko: '정말 미안해요.', zh: '真的对不起。', highlight: '정말' },
    ],
    pitfall:
      '对火鹤老师说「진짜 어려워요」会显得太随便。换成「정말 어려워요」更得体。但和 Junho 朋友说「정말 좋아요」反而像是装腔。规则：朋友追星 진짜，老师长辈 정말。',
  },

  output: [
    {
      id: 'd23-o1',
      kind: 'fill',
      prompt: '___ 사람 많아요!',
      zhHint: '真的好多人！(对朋友的口语)',
      answer: '진짜',
      successMsg: 'Junho 兴奋地把应援卡塞给你："토리, 너 이제 우리 팬이야!" ✓',
    },
  ],

  recap: {
    toriPose: 'celebrate',
    praise: '老虎追星的样子记下了。生日咖啡店的玻璃门反射着你的笑脸。',
    preview: '明天 Junho 喊我和 Minji、Haru 一起约咖啡馆。三人群聊…我能听懂吗？',
    stickerId: 'sticker-d23',
  },

  carrotHint:
    '今天的胡萝卜：「KPOP 粉丝词汇大全」「진짜 vs 정말 区别」「韩国生日카페文化」',
};
