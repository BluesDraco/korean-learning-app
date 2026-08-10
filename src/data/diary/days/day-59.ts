import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 59 · 예행연습 · 中级毕业典礼预演
 *
 * 剧情：中级毕业典礼明天举行。Tori紧张地改了八遍稿子。Haru说"Day 30 때도 했잖아"。
 * Tori对着镜子说——할 수 있어. 화이팅.
 *
 * 学习目标：능력 ~(으)ㄹ 수 있어요 다지기 / 격려 표현 / 예행연습 어휘
 * 语料层级：해요体 + 반말 独白
 * 韩语自审：korean skill PASS
 */
export const day59: ToriDay = {
  level: 'intermediate',
  day: 29,
  phase: 'expansion',
  title: '中级毕业典礼预演 · 紧张',
  subtitle: '八遍稿子 · 一句"할 수 있어"',
  heroImageUrl: '/images/diary/day-59-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 31일 · 목요일 저녁',
    weather: '兽尔 · 秋雨',
    toriPose: 'nervous',
    diaryText: `10月31日，周四晚上。

明天，중급반 졸업 예식。
5분 짜리 자기 이야기 발표。

내 원고 8번째 버전이 여기 있다——

**첫 시도**：太正式了，像新闻稿。
**두 번째**：太夸张了，像感谢演说。
**세 번째**：太长了，7分钟。
**네 번째**：太短了，2분30초。
……

第八遍现在还在改。

Haru拿了两杯柚子茶敲门。
她看我盯着屏幕像盯着一只怪物，
坐下来说：

"토리, Day 30에도 이거 다 했잖아. 그때 어땠어?"
（Day 30 也做过啊。那时怎么样？）

我一愣。
"그때는… 그때는 손이 떨렸어. 근데 다 했어."
（那时……那时手抖。但都做到了。）

Haru笑："그럼 오늘 원고 다시 안 봐도 돼. 넌 이미 할 수 있어."
（那今天不用再看稿了。你已经能做到了。）

她走了。
我把手稿放下——
真的没再改。

对着卫生间的镜子，
练了一句：

"저는 토리예요. 이제 정말 여기서 살아요."
（我是兔莉。现在真的住在这里了。）

发音有点小抖，
但我又说了一遍。
然后又说一遍。

第三遍的时候，
镜子里的兔莉，
笑了。

——할 수 있어. 화이팅.`,
  },

  words: [
    {
      id: 'd59-w1',
      korean: '예행연습',
      hangul: 'ye-haeng-yeon-seup',
      zh: '预演/彩排',
      pos: '名词',
      example: { ko: '내일 졸업식 예행연습이에요.', zh: '明天毕业典礼预演。' },
      tip: '예행(预行) + 연습(练习). 演出/演讲前必做',
    },
    {
      id: 'd59-w2',
      korean: '원고',
      hangul: 'won-go',
      zh: '稿子',
      pos: '名词',
      example: { ko: '원고를 여덟 번 고쳤어요.', zh: '改了8遍稿子。' },
      tip: '原(원) + 稿(고). 발표/글 준비의 초안',
    },
    {
      id: 'd59-w3',
      korean: '고치다',
      hangul: 'go-chi-da',
      zh: '修改',
      pos: '动词',
      example: { ko: '원고를 여러 번 고쳤어요.', zh: '稿子改了好几遍。' },
      tip: '고치다 → 고쳤어요. 修改物品也用同一词',
    },
    {
      id: 'd59-w4',
      korean: '화이팅',
      hangul: 'hwa-i-ting',
      zh: '加油',
      pos: '感叹词',
      example: { ko: '토리, 화이팅!', zh: '兔莉，加油！' },
      tip: '英语 fighting 外来. 韩国最日常的加油词',
    },
    {
      id: 'd59-w5',
      korean: '거울',
      hangul: 'geo-ul',
      zh: '镜子',
      pos: '名词',
      example: { ko: '거울 앞에서 연습했어요.', zh: '在镜子前练习了。' },
      tip: '连Day 1兔莉都对镜子练习过',
    },
    {
      id: 'd59-w6',
      korean: '살다',
      hangul: 'sal-da',
      zh: '生活/住',
      pos: '动词',
      example: { ko: '이제 정말 여기서 살아요.', zh: '现在真的住在这里了。' },
      tip: 'ㄹ 词干: 살다 → 살아요 / 살고 있어요',
    },
  ],

  dialogue: {
    scene: 'Tori 방·원고 · 거울 앞',
    setting: {
      time: '周四 21:00',
      place: 'Tori宿舍 · 书桌 → 卫生间镜子',
      npc: 'Haru',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '토리, 원고 몇 번 고쳤어?',
        hangul: 'to-ri, won-go myeot beon go-chyeo-sseo?',
        zh: '兔莉，稿子改了几遍？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '이제 여덟 번… 아직 마음에 안 들어.',
        hangul: 'i-je yeo-deol beon… a-jik ma-eu-me an deu-reo',
        zh: '现在第八遍……还不满意。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: 'Day 30에도 이거 다 했잖아. 넌 이미 할 수 있어.',
        hangul: 'Day 30-e-do i-geo da haet-ja-na. neon i-mi hal su i-sseo',
        zh: 'Day 30 也做过啊。你已经能做到了。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '맞아, 그때도 손 떨렸는데 다 했어.',
        hangul: 'ma-ja, geu-ttae-do son tteol-lyeon-neun-de da hae-sseo',
        zh: '对，那时也手抖但都做到了。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '저는 토리예요. 이제 정말 여기서 살아요.',
        hangul: 'jeo-neun to-ri-ye-yo. i-je jeong-mal yeo-gi-seo sa-ra-yo',
        zh: '我是兔莉。现在真的住在这里了。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '对着镜子练完三遍。Tori想给自己鼓劲。合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '할 수 있어. 화이팅.', zh: '能做到。加油。', correct: true },
          { ko: '이제 그만할래.', zh: '现在放弃吧。', correct: false },
          { ko: '내일 결석해야겠어.', zh: '明天该请假。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '能做到：~(으)ㄹ 수 있어（Day 38·51 综合复习）',
    pattern: 'V + **(으)ㄹ 수 있어(요)** · 반사语 **할 수 있어**',
    whenToUse: 'Day 38 学过 ~(으)ㄹ 수 있어요 = 能。Day 51 独立主题 (혼자서 다 할 수 있어). Day 59 = **自我鼓励** 场景。Haru 说 「넌 이미 할 수 있어」= 你已经能做到了。~(으)ㄹ 수 있어 = 韩国人给自己/别人加油的核心句。发表前、面试前、告白前 都能用。',
    rules: [
      '**能力+自信**：할 수 있어 = "能做到"。반말最短版本。给自己/朋友加油',
      '**~(으)ㄹ 수 있을 거예요 = 会能做到 (未来预测)**：내일 잘할 수 있을 거예요',
      '**已经能 → 이미 ~(으)ㄹ 수 있어요**：이미 = 已经。Haru 오늘 한 말: 넌 이미 할 수 있어',
      '**화이팅**：加油 (외래어). 저 화이팅! / 오늘 화이팅! / 화이팅!'
    ],
    examples: [
      { ko: '할 수 있어. 화이팅.', zh: '能做到。加油。', highlight: '할 수 있어', note: '하다 → 할 수 있어 (반말). 자기 격려의 정석' },
      { ko: '넌 이미 할 수 있어.', zh: '你已经能做到了。', highlight: '이미 할 수 있어', note: 'Haru 오늘의 격려. 이미 + 능력 표현' },
      { ko: '내일도 잘할 수 있을 거예요.', zh: '明天也能做好的。', highlight: '잘할 수 있을 거예요', note: '~(으)ㄹ 수 있을 거예요 = 未来能力의 예측' },
      { ko: '이제 정말 여기서 살아요.', zh: '现在真的住在这里了。', highlight: '살아요', note: '살다 → 살아요 (ㄹ 어간). 정착 표현' },
    ],
    pitfall:
      '① **할 수 있어** vs **할 수 있어요** — 반말 vs 해요体. 자기 독백 시 반말이 자연스러움 (내면 대화). ② **화이팅 vs 파이팅 vs 홧팅** — 외래어 표기 여러 개. 표준은 "파이팅" 이나 실사용은 "화이팅"이 압도적. ③ ~(으)ㄹ 수 있다 는 Day 38 부터 반복 등장. Day 59 는 **자기 확신** 상황에 특화. ④ 격려용 반말 3종 세트: 할 수 있어 / 힘내 / 화이팅.',
  },

  output: [
    {
      id: 'd59-o1',
      kind: 'compose',
      zhHint: '你已经能做到了。',
      tokens: ['넌', '이미', '할 수 있어', '할 거야', '할 수 없어', '이제'],
      composeAnswer: ['넌', '이미', '할 수 있어'],
      successMsg: 'Haru对Tori的一句. 이미 + 할 수 있어 = 认可.',
    },
    {
      id: 'd59-o2',
      kind: 'listen-choice',
      audioKo: '저는 토리예요. 이제 정말 여기서 살아요.',
      successMsg: '✓ Day 59 主题句. Day 1 "저는 토리예요" 의 후속.',
      choices: [
        { zh: '我是兔莉。现在真的住在这里了。', correct: true },
        { zh: '我叫兔莉。以前住这里。', correct: false },
        { zh: '我是兔莉。将来会住这里。', correct: false },
        { zh: '兔莉说她住在这里。', correct: false },
      ],
    },
    {
      id: 'd59-o3',
      kind: 'zh-to-ko',
      zhPrompt: '明天也能做好的。',
      successMsg: '"내일도 잘할 수 있을 거예요." — 미래 능력 예측.',
      choices: [
        { ko: '내일도 잘할 수 있을 거예요.', correct: true },
        { ko: '내일도 잘할 수 있어요.', correct: false },
        { ko: '내일도 잘하고 있을 거예요.', correct: false },
        { ko: '내일도 잘하는 거예요.', correct: false },
      ],
    },
    {
      id: 'd59-o4',
      kind: 'particle-error',
      zhHint: '现在真的住在这里了。',
      successMsg: '살다 ㄹ 어간 → **살아요**（不是 살라요/사라요）。',
      choices: [
        { ko: '이제 정말 여기서 살아요.', correct: true },
        { ko: '이제 정말 여기서 살라요.', correct: false },
        { ko: '이제 정말 여기서 사요.', correct: false },
        { ko: '이제 정말 여기에서 살라요.', correct: false },
      ],
    },
    {
      id: 'd59-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 59 全对。내일, 마지막 한 걸음.',
      pairs: [
        { ko: '예행연습', zh: '预演' },
        { ko: '원고', zh: '稿子' },
        { ko: '고치다', zh: '修改' },
        { ko: '화이팅', zh: '加油' },
        { ko: '거울', zh: '镜子' },
      ],
    },
  ],

  recap: {
    toriPose: 'nervous',
    praise: '원고 여덟 번, 거울 앞 세 번. 내일, 진짜 마지막 준비.',
    preview: '明天，중급반 졸업。5分钟自我讲述——从行李（짐）开始，到家（집）结束。',
    stickerId: 'sticker-d59',
    sceneImageUrl: '/images/diary/day-59-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「할 수 있어 和 할 거야 什么区别？」「화이팅 用起来怎么自然？」',
};
