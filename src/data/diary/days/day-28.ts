import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 28 · 过去时 · 韩语日记的开始
 *
 * 剧情：周日上午下了一整天雨。兔莉一个人在宿舍，
 * 翻出妈妈塞给她的日记本——
 * 28 天没动过的牛皮封面，现在沉甸甸的。
 * 她坐到书桌前，第一次试着用韩语写日记。
 * 火鹤老师上周讲过："오늘은 갔어요. 먹었어요. 만났어요. 즐거웠어요."
 * 过去时——韩语真正讲故事的钥匙。
 *
 * 学习目标：~았/었어요 / 过去时三规则 / 写日记的开始
 * 韩语自审：korean skill PASS (과거형 활용 + 일기체)
 */
export const day28: ToriDay = {
  level: 'beginner',
  day: 28,
  phase: 'expression',
  title: '过去时 · 韩语日记的开始',
  subtitle: '日记本翻开第一页',
  isCheckpoint: null,
  estimatedMin: 14,

  opening: {
    date: '10월 1일 일요일 오후',
    weather: '首尔 · 雨',
    toriPose: 'shy',
    diaryText: `10月 1日，周日下午 2 点。

雨从早上一直下到现在。
窗外灰蒙蒙，
玻璃上水珠像在赛跑。

我一个人在宿舍。
Junho 回家见父母，
Minji 在图书馆，
Haru 加班。

我从行李箱底翻出来——
妈妈塞给我的日记本。
牛皮封面，
"여행 일기" (旅行日记) 烫金。
28 天没动过，
现在沉甸甸的。

我坐到书桌前。
打开第一页。
胡萝卜在桌角看着我。

火鹤老师上周讲过：
"동사 + 았/었어요 = 过去时."
（动词 + 았/었어요 = 过去时。）

가다 → **갔어요** (去了)
먹다 → **먹었어요** (吃了)
하다 → **했어요** (做了)
즐겁다 → **즐거웠어요** (开心)

笔尖落在纸上。
我开始写：

"10월 1일 일요일.
오늘은 비가 왔어요.
어제 친구들이랑 삼겹살을 먹었어요.
민지가 한턱 냈어요.
정말 즐거웠어요.

28일 전, 저는 비행기에서 떨었어요.
하지만 지금은—
한국이 좋아요."

我合上日记本，
胡萝卜在桌角点头。

写完一页韩文日记的那一刻，
我突然懂了——
过去时不只是语法，
是把日子留下来的钥匙。`,
  },

  words: [
    {
      id: 'd28-w1',
      korean: '갔어요',
      hangul: 'ga-sseo-yo',
      zh: '去了',
      pos: '动词',
      example: { ko: '학교에 갔어요.', zh: '去学校了。' },
      tip: '가다 → 가 + 았어요 = 갔어요 (缩写)。最高频过去时',
    },
    {
      id: 'd28-w2',
      korean: '먹었어요',
      hangul: 'meo-geo-sseo-yo',
      zh: '吃了',
      pos: '动词',
      example: { ko: '삼겹살을 먹었어요.', zh: '吃了五花肉。' },
      tip: '먹다 → 먹 + 었어요 = 먹었어요。词干元음 ㅓ → 었',
    },
    {
      id: 'd28-w3',
      korean: '했어요',
      hangul: 'hae-sseo-yo',
      zh: '做了',
      pos: '动词',
      example: { ko: '공부했어요.', zh: '学了。' },
      tip: '하다 → 했어요. 万能"过去时하다"。공부했어요/사랑했어요/일했어요',
    },
    {
      id: 'd28-w4',
      korean: '왔어요',
      hangul: 'wa-sseo-yo',
      zh: '来了 / (雨)下了',
      pos: '动词',
      example: { ko: '비가 왔어요.', zh: '下雨了。' },
      tip: '오다 → 오 + 았어요 → 왔어요 (缩写)。下雨用 비가 와요 / 왔어요',
    },
    {
      id: 'd28-w5',
      korean: '즐거웠어요',
      hangul: 'jeul-geo-wo-sseo-yo',
      zh: '愉快了 / 开心',
      pos: '形容词',
      example: { ko: '정말 즐거웠어요.', zh: '真的很开心。' },
      tip: '즐겁다 (ㅂ 不规则) → 즐거웠어요. 日记结尾必备',
    },
    {
      id: 'd28-w6',
      korean: '떨었어요',
      hangul: 'tteo-reo-sseo-yo',
      zh: '颤抖了 / 紧张',
      pos: '动词',
      example: { ko: '비행기에서 떨었어요.', zh: '在飞机上紧张了。' },
      tip: '떨다 → 떨었어요. 描述心情：Day 2 飞机上 兔莉就是这种感觉',
    },
  ],

  dialogue: {
    scene: '兔莉的书桌 · 第一篇韩文日记',
    setting: {
      time: '周日下午 2 点',
      place: '宿舍 301',
      npc: '胡萝卜 (内心独白)',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '오늘은 비가 왔어요.',
        hangul: 'o-neul-eun bi-ga wa-sseo-yo',
        zh: '今天下雨了。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '어제 친구들이랑 삼겹살을 먹었어요.',
        hangul: 'eo-je chin-gu-deul-i-rang sam-gyeop-sal-eul meo-geo-sseo-yo',
        zh: '昨天和朋友们吃了五花肉。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '민지가 한턱 냈어요.',
        hangul: 'min-ji-ga han-teok nae-sseo-yo',
        zh: 'Minji 请了客。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '정말 즐거웠어요.',
        hangul: 'jeong-mal jeul-geo-wo-sseo-yo',
        zh: '真的很开心。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '28 天前在飞机上的感受，用过去时怎么写？',
        practice: 'pick',
        choices: [
          { ko: '저는 비행기에서 떨었어요.', zh: '我在飞机上紧张了。', correct: true },
          { ko: '저는 비행기에서 떨어요.', zh: '我在飞机上紧张。(现在时)', correct: false },
          { ko: '저는 비행기에서 떨릴 거예요.', zh: '我会在飞机上紧张。(未来时)', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '韩语日记的钥匙 · 동사·형용사 + 았/었어요',
    pattern: '동사 어간 + 았 / 었 / 했 + 어요',
    whenToUse: '写日记、讲故事、报告昨天发生的事。今天是关卡 5 (写信) 前最重要的语法。',
    rules: [
      '① 词干末元音 **ㅏ / ㅗ** → **았어요**: 가다 → **갔어요**, 오다 → **왔어요** (缩写)',
      '② 其他元음 → **었어요**: 먹다 → **먹었어요**, 마시다 → **마셨어요**',
      '③ **하다** → **했어요**: 공부하다 → **공부했어요**, 사랑하다 → **사랑했어요**',
      'ㅂ 不规则：즐겁다 → **즐거웠어요** / 어렵다 → **어려웠어요** (ㅂ→우)',
    ],
    examples: [
      { ko: '학교에 갔어요.', zh: '去了学校。', highlight: '갔어요' },
      { ko: '삼겹살을 먹었어요.', zh: '吃了五花肉。', highlight: '먹었어요' },
      { ko: '공부했어요.', zh: '学了。', highlight: '공부했어요' },
      { ko: '정말 즐거웠어요.', zh: '真的很开心。', highlight: '즐거웠어요' },
    ],
    pitfall:
      '韩语过去时和해요体 (Day 22) 的规则**一样**——ㅏ/ㅗ 用 았, 其他用 었, 하다 变 했。只是把「-아/어요」换成「-았/었어요」。掌握了해요体就掌握了过去时。',
  },

  output: [
    {
      id: 'd28-o1',
      kind: 'compose',
      zhHint: '昨天和朋友们吃了五花肉。',
      tokens: ['어제', '친구들이랑', '삼겹살을', '먹었어요', '먹어요', '있어요', '학교에'],
      composeAnswer: ['어제', '친구들이랑', '삼겹살을', '먹었어요'],
      successMsg: '✓ 你的第一行韩文日记落在了牛皮封面笔记本里。',
    },
    {
      id: 'd28-o2',
      kind: 'listen-choice',
      audioKo: '오늘은 비가 왔어요.',
      successMsg: '✓ 「今天下雨了」。「오다」→「왔어요」(오 + 았어요 缩写)。「비가 와요」是现在时。',
      choices: [
        { zh: '今天下雨了。', correct: true },
        { zh: '今天下雨。(现在时)', correct: false },
        { zh: '今天来了。', correct: false },
        { zh: '今天回家了。', correct: false },
      ],
    },
    {
      id: 'd28-o3',
      kind: 'zh-to-ko',
      zhPrompt: '真的很开心。',
      successMsg: '"즐거웠어요" — 「즐겁다」是 ㅂ 不规则：ㅂ→우 + 었어요 = 즐거웠어요。',
      choices: [
        { ko: '정말 즐거웠어요.', correct: true },
        { ko: '정말 즐겁었어요.', correct: false },
        { ko: '정말 즐거워요.', correct: false },
        { ko: '정말 즐겁어요.', correct: false },
      ],
    },
    {
      id: 'd28-o4',
      kind: 'particle-error',
      zhHint: '我学了韩语。',
      successMsg: '「공부하다」→「공부했어요」(하다 → 했어요)。「한국어」(无받침) → 「를」宾语。',
      choices: [
        { ko: '한국어를 공부했어요.', correct: true },
        { ko: '한국어를 공부하였어요.', correct: false },
        { ko: '한국어이 공부했어요.', correct: false },
        { ko: '한국어를 공부어요.', correct: false },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '过去时不只是语法，是把日子留下来的钥匙。今天起，你能用韩语讲故事了。',
    preview: '明天就是关卡 5——给朋友写一封完整的韩文信。我能写出来吗？',
    stickerId: 'sticker-d28',
  },

  carrotHint:
    '今天的胡萝卜：「过去时三规则速查」「ㅂ 不规则形容词」「写日记的常用句」',
};
