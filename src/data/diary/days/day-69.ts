import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 69 · 반차별 논단 · "토끼도 할 수 있어요"
 *
 * 剧情：Tori在学校反歧视论坛上发言。她讲了在猎食者街区的经历，讲了体型歧视的故事。
 * 最后她说："토끼도 할 수 있어요."（兔子也可以。）全场起立鼓掌。
 * 69天前连안녕하세요都紧张发抖的兔子，现在站在台上让全场起立。
 *
 * 学习目标：공식 발표 표현 / ~도 ~ㄹ 수 있어요 / 감동 어휘
 * 语料层级：해요体 · 발표 정식
 */
export const day69: ToriDay = {
  level: 'advanced',
  day: 9,
  phase: 'mastery',
  title: '反歧视论坛 · "토끼도 할 수 있어요"',
  subtitle: '"兔子也可以" — 全场起立鼓掌',
  heroImageUrl: '/images/diary/day-69-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 26일 · 화요일 오후',
    weather: '兽尔 · 맑음',
    toriPose: 'proud',
    diaryText: `11月26日，周二下午。

学校大礼堂——"反歧视学生论坛"。我报名了，拿到三分钟的发言机会。

台下坐了一百多人。Junho、Minji、Haru、Danielle 都在前排。

轮到我了。我举起麦克风：

"저는 토끼예요. 60일 전에 한국에 왔어요. 그리고 지난 주말에… 육식자 구역에서 이런 일이 있었어요."
（我是一只兔子。六十天前来到韩国。上周末，我在食肉动物区遇到了这样一件事。）

台下瞬间安静下来。

我一个一个说下去——狮子超市那家店，那句"너무 작아서"，我发抖的手，还有第二次走回去把话说清楚的那一刻。

"체형은 중요하지 않아요. 능력이 중요해요. 그리고 무엇보다——편견은, 언어로 깨야 해요."
（体型不重要，能力才重要。而最重要的是——偏见，要用语言去打破。）

我深吸一口气，说出最后一句：

"토끼도 할 수 있어요."（兔子也做得到。）

三秒的寂静。

然后是第一声鼓掌，第二声。——全场站了起来。

Haru 抬手擦眼泪。Junho 咧着嘴使劲鼓掌。Minji 举起了相机。Danielle 慢慢站起来，朝我点了点头。

69 天前连"안녕하세요"都说不出口的一只兔子，今天让 100 个人站了起来。

——与其说是我，不如说是"용기"（勇气）做的事。而那份勇气，是从一根胡萝卜开始的。`,
  },

  words: [
    {
      id: 'd69-w1',
      korean: '차별',
      hangul: 'cha-byeol',
      zh: '歧视',
      pos: '名词',
      example: { ko: '체형 차별에 반대해요.', zh: '反对体型歧视。' },
      tip: 'Day 66 学过. 이 날은 반차별(反歧视)',
    },
    {
      id: 'd69-w2',
      korean: '논단',
      hangul: 'non-dan',
      zh: '论坛',
      pos: '名词',
      example: { ko: '반차별 논단에 참가했어요.', zh: '参加反歧视论坛。' },
      tip: '论(논) + 坛(단). 학교/사회 공공 토론',
    },
    {
      id: 'd69-w3',
      korean: '깨다',
      hangul: 'kkae-da',
      zh: '打破',
      pos: '动词',
      example: { ko: '편견을 깨야 해요.', zh: '要打破偏见。' },
      tip: '깨다 → 깨요. 물건도 깨고, 편견도 깬다',
    },
    {
      id: 'd69-w4',
      korean: '일어서다',
      hangul: 'i-reo-seo-da',
      zh: '起立',
      pos: '动词',
      example: { ko: '모두가 일어섰어요.', zh: '大家都起立了。' },
      tip: '일어나다(起来) + 서다(站). 감동적 순간에',
    },
    {
      id: 'd69-w5',
      korean: '박수',
      hangul: 'bak-su',
      zh: '掌声',
      pos: '名词',
      example: { ko: '전 강당이 박수를 쳤어요.', zh: '全场鼓掌。' },
      tip: 'Day 42 学过. 이 날은 기립 박수',
    },
    {
      id: 'd69-w6',
      korean: '감동',
      hangul: 'gam-dong',
      zh: '感动',
      pos: '名词',
      example: { ko: '감동적인 순간이었어요.', zh: '感动的瞬间。' },
      tip: 'Day 48 学过. 이 날은 발표 후 감동',
    },
  ],

  dialogue: {
    scene: '대강당·반차별 논단·발표',
    setting: {
      time: '周二 15:20',
      place: '한빛대학교 대강당',
      npc: '전 강당 (관객)',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '저는 토끼예요. 60일 전에 한국에 왔어요.',
        hangul: 'jeo-neun to-kki-ye-yo. yuk-si-bil jeo-ne han-gu-ge wa-sseo-yo',
        zh: '我是兔子。60天前来到韩国。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '지난 주말에 육식자 구역에서 체형 차별을 경험했어요.',
        hangul: 'ji-nan ju-ma-re yuk-sik-ja gu-yeo-ge-seo che-hyeong cha-byeo-reul gyeong-heo-mae-sseo-yo',
        zh: '上周末在猎食者街区经历了体型歧视。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '체형은 중요하지 않아요. 능력이 중요해요.',
        hangul: 'che-hyeong-eun jung-yo-ha-ji a-na-yo. neung-nyeo-gi jung-yo-hae-yo',
        zh: '体型不重要。能力才重要。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '편견은 언어로 깨야 해요.',
        hangul: 'pyeon-gyeo-neun eon-eo-ro kkae-ya hae-yo',
        zh: '偏见要用语言打破。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '토끼도 할 수 있어요.',
        hangul: 'to-kki-do hal su i-sseo-yo',
        zh: '兔子也可以。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '发表结束全场起立掌声。Tori想向大家致谢。合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '들어주셔서 진심으로 감사합니다.', zh: '真心感谢您的聆听。', correct: true },
          { ko: '이제 다 끝났어요.', zh: '现在都结束了。', correct: false },
          { ko: '박수 그만 치세요.', zh: '别拍了。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '连___也能___：~도 ~(으)ㄹ 수 있어요',
    pattern: 'N + **도** + V + **(으)ㄹ 수 있어요**',
    whenToUse: '「连___也能___」的**普适+能力**结合句尾。Tori 说 「토끼**도 할 수 있어요**」= 兔子也可以。~도 (也/连) + Day 38 ~(으)ㄹ 수 있어요 = 反歧视/普适宣言的最强组合. 反차별 발표 필수 문형.',
    rules: [
      '**~도 = 也/连**：나도 갈 수 있어요 = 我也能去. 토끼도 할 수 있어요 = 兔子也可以',
      '**~도 ~(으)ㄹ 수 있어요 = 普适 선언**：누구나 할 수 있음을 강조. 편견 반박 시 강력',
      '**부정형 → ~도 못 하다 / ~도 ~ㄹ 수 없다**: 나도 못 해 = 我也不行',
      '**~까지 ~(으)ㄹ 수 있어요 = 더 강함**: 저까지 할 수 있어요 = 连我都能'
    ],
    examples: [
      { ko: '토끼도 할 수 있어요.', zh: '兔子也可以。', highlight: '토끼도 ... 할 수 있어요', note: 'Tori 발표 명언. Day 69 주제 문장' },
      { ko: '작은 사람도 큰 일을 할 수 있어요.', zh: '小的人也能做大事。', highlight: '작은 사람도 ... 할 수 있어요', note: '普适 명제. 크기와 능력 분리' },
      { ko: '저 같은 초보자도 발표할 수 있어요.', zh: '像我这样的初学者也能发表。', highlight: '초보자도 ... 발표할 수 있어요', note: '자기 정체성 + ~도 + 능력 = 격려' },
      { ko: '누구나 노력하면 성공할 수 있어요.', zh: '任何人努力都能成功。', highlight: '누구나 ... 성공할 수 있어요', note: '누구나(누구+나) = 无论谁. ~도의 확장' },
    ],
    pitfall:
      '① **~도 vs ~까지 vs ~마저**: ~도 = 也 (中性), ~까지 = 甚至/连 (强调), ~마저 = 连...都 (悲观强调). 兔子에게 ~도 = 中立한 "也". ② **~도 ~(으)ㄹ 수 있어요** 는 발표/에세이의 강한 무기. 反歧视/자기 격려 시 필수. ③ 부정 형태는 ~도 못 하다 (口语) 또는 ~도 ~ㄹ 수 없다 (书面). ④ 초급자 자주 실수: ~도 뒤에 ~은/는 못 결합. 나도는(X) → 나도(O).',
  },

  output: [
    {
      id: 'd69-o1',
      kind: 'compose',
      zhHint: '兔子也可以。',
      tokens: ['토끼도', '할 수 있어요', '토끼는', '할 수 없어요', '토끼가', '할 수 있어'],
      composeAnswer: ['토끼도', '할 수 있어요'],
      successMsg: '~도 + ~(으)ㄹ 수 있어요. 반차별의 강한 문형.',
    },
    {
      id: 'd69-o2',
      kind: 'listen-choice',
      audioKo: '편견은 언어로 깨야 해요.',
      successMsg: '✓ Tori 발표의 클라이맥스 직전. 언어의 힘.',
      choices: [
        { zh: '偏见要用语言打破。', correct: true },
        { zh: '语言就是偏见。', correct: false },
        { zh: '偏见不能打破。', correct: false },
        { zh: '语言打破了偏见。', correct: false },
      ],
    },
    {
      id: 'd69-o3',
      kind: 'zh-to-ko',
      zhPrompt: '像我这样的初学者也能发表。',
      successMsg: '"저 같은 초보자도 발표할 수 있어요." — ~ 같은 + ~도 + 능력.',
      choices: [
        { ko: '저 같은 초보자도 발표할 수 있어요.', correct: true },
        { ko: '저같이 초보자도 발표할 수 있어요.', correct: false },
        { ko: '저처럼 초보자를 발표할 수 있어요.', correct: false },
        { ko: '저 같은 초보자는 발표할 수 있어요.', correct: false },
      ],
    },
    {
      id: 'd69-o4',
      kind: 'particle-error',
      zhHint: '任何人努力都能成功。',
      successMsg: '누구나 = 任何人. ~(으)면 조건 + ~(으)ㄹ 수 있어요.',
      choices: [
        { ko: '누구나 노력하면 성공할 수 있어요.', correct: true },
        { ko: '누구가 노력하면 성공할 수 있어요.', correct: false },
        { ko: '누구도 노력하면 성공할 수 있어요.', correct: false },
        { ko: '누가 노력하면 성공할 수 있어요.', correct: false },
      ],
    },
    {
      id: 'd69-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 69 全对. 100명이 일어섰어요. 용기의 한 순간.',
      pairs: [
        { ko: '차별', zh: '歧视' },
        { ko: '논단', zh: '论坛' },
        { ko: '깨다', zh: '打破' },
        { ko: '일어서다', zh: '起立' },
        { ko: '감동', zh: '感动' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '"토끼도 할 수 있어요" — 100명이 일어섰어요. 용기의 승리.',
    preview: '明天 학교 토론대회 — 다니엘과의 결전. 주제: "체형이 능력을 결정하는가."',
    stickerId: 'sticker-d69',
    sceneImageUrl: '/images/diary/day-69-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~도 ~(으)ㄹ 수 있어요 어떻게 응용?」「反差别 발표 어떻게 준비?」',
};
