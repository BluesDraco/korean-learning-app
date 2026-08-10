import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 58 · 처음의 길 · 重走第一天的路
 *
 * 剧情：Tori决定重走一遍Day 1-7的路——机场、地铁、宿舍。每一步都是回忆。
 * 同一条路，走起来完全不同了。56天前害怕，现在感恩。
 *
 * 学习目标：~아/어 보니까 (尝试后发现) / 회고 / 시간 대조
 * 语料层级：해요体
 * 韩语自审：korean skill PASS
 */
export const day58: ToriDay = {
  level: 'intermediate',
  day: 28,
  phase: 'expansion',
  title: '重走第一天的路 · 同一条路，两种感觉',
  subtitle: '"같은 길인데 다른 느낌"',
  heroImageUrl: '/images/diary/day-58-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 30일 · 수요일 오후',
    weather: '兽尔 · 秋阳',
    toriPose: 'shy',
    diaryText: `10月30日，周三下午。

今天没课。
我决定重走 Day 1-7 的路。

**站1 · 인천공항**
出发2号线到底站。
天空一样蓝。
下车口标着"입국장"——
Day 3 我从这里推着爆开三次的行李箱出来。
现在，我只带一个小背包。
站在原地想了一分钟。

**站2 · 弘爪站2호선 승강장**
Day 7 手机1%的地方。
Day 35 帮别人指路的地方。
广播："다음 역은 홍대입구입니다."
我笑了。
——이제 이 목소리도 알아들어 봤어요.

**站3 · 한빛 어학당 앞**
Day 6 第一天上课的地方。
门口的樱花树叶子全掉了。
但门牌上的"어학당"三个字，
比Day 6认识时更亲切。

**站4 · 한빛 宿舍 1층 로비**
Day 4 拿钥匙的地方。
浣熊阿姨在柜台后面翻登记册，
看到我：
"아, 토리 학생! 오늘 뭐 하는 날?"
（啊，兔莉！今天做什么呢？）

我笑："기억하러 왔어요."
（来回忆的。）

同样一条路，
Day 1-7 时是害怕的。
Day 58 时是感恩的。

走完之后，
我坐在宿舍门口的台阶上，
拿出胡萝卜笔——
妈妈送的那根还挂在包上。

在日记本上写：

"56일 걸어보니까 알겠어요.
같은 길이지만 다른 사람이 걸으면 다른 길이 돼요.
지금의 나는 56일 전의 나에게 이렇게 말하고 싶어요:
'괜찮아. 넘어져도 돼. 걷다 보면 도착해.'"`,
  },

  words: [
    {
      id: 'd58-w1',
      korean: '다시',
      hangul: 'da-si',
      zh: '再/重新',
      pos: '副词',
      example: { ko: '다시 걸어봤어요.', zh: '重新走了一遍。' },
      tip: '다시 + V = 再___. 다시 만나요 = 再见',
    },
    {
      id: 'd58-w2',
      korean: '느낌',
      hangul: 'neu-kkim',
      zh: '感觉',
      pos: '名词',
      example: { ko: '같은 길인데 다른 느낌이에요.', zh: '同一条路，不同的感觉。' },
      tip: '느끼다(感受) → 느낌(名词化). 감정 표현 필수어',
    },
    {
      id: 'd58-w3',
      korean: '넘어지다',
      hangul: 'neo-meo-ji-da',
      zh: '摔倒/跌倒',
      pos: '动词',
      example: { ko: '넘어져도 돼.', zh: '摔倒也没关系。' },
      tip: '넘어지다 → 넘어져요. 성장의 은유로도 씀',
    },
    {
      id: 'd58-w4',
      korean: '감사',
      hangul: 'gam-sa',
      zh: '感谢/感恩',
      pos: '名词',
      example: { ko: '감사한 마음이 들었어요.', zh: '心里有感恩的心情。' },
      tip: '感(감) + 谢(사). 감사하다 = 感谢',
    },
    {
      id: 'd58-w5',
      korean: '도착하다',
      hangul: 'do-cha-ka-da',
      zh: '到达',
      pos: '动词',
      example: { ko: '걷다 보면 도착해요.', zh: '走着走着就到了。' },
      tip: '到(도) + 着(착) + 하다. 도착 후 = 到达后',
    },
    {
      id: 'd58-w6',
      korean: '두렵다',
      hangul: 'du-ryeop-da',
      zh: '害怕',
      pos: '形容词',
      example: { ko: 'Day 1에는 다 두려웠어요.', zh: 'Day 1 时什么都害怕。' },
      tip: 'ㅂ 不规则: 두렵다 → 두려워요',
    },
  ],

  dialogue: {
    scene: '한빛 기숙사 로비·浣熊 아주머니',
    setting: {
      time: '周三 15:30',
      place: '한빛宿舍1층 로비',
      npc: '浣熊阿姨',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '浣熊阿姨',
        ko: '아, 토리 학생! 오늘 뭐 하는 날?',
        hangul: 'a, to-ri hak-saeng! o-neul mwo ha-neun nal?',
        zh: '啊，兔莉！今天在做什么呢？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '기억하러 왔어요.',
        hangul: 'gi-eo-ka-reo wa-sseo-yo',
        zh: '来回忆的。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '浣熊阿姨',
        ko: '많이 컸네, 토리 학생. Day 1에는 진짜 어렸었지.',
        hangul: 'ma-ni keon-ne, to-ri hak-saeng. Day 1-e-neun jin-jja eo-ryeo-sseot-ji',
        zh: '长大很多啊，兔莉。Day 1 时真的很稚嫩。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '다시 걸어보니까 알겠어요. 같은 길인데 다른 느낌이에요.',
        hangul: 'da-si geo-reo-bo-ni-kka al-ge-sseo-yo. ga-teun gi-rin-de da-reun neu-kki-mi-e-yo',
        zh: '重走一遍才明白。同一条路，不同的感觉。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: 'Day 1의 나한테 "괜찮아, 도착해"라고 말하고 싶어요.',
        hangul: 'Day 1-ui na-han-te "gwaen-cha-na, do-cha-kae"-ra-go mal-ha-go si-peo-yo',
        zh: '想对Day 1的自己说"没事，会到的"。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '浣熊阿姨说"토리 학생 앞으로도 화이팅해요"。Tori最合适的回应是？',
        practice: 'pick',
        choices: [
          { ko: '네, 계속 열심히 할게요. 감사합니다.', zh: '好，会继续努力的。谢谢。', correct: true },
          { ko: '아니에요, 저 이제 안 해요.', zh: '不了，我不做了。', correct: false },
          { ko: '그러세요, 아주머니.', zh: '您就这么说吧，阿姨。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '试过才发现：~아/어 보니까',
    pattern: 'V + **아/어 보니까** + (发现的事)',
    whenToUse: '「做过___才发现___」的经验发现句尾。Tori 说 「다시 걸어**보니까** 알겠어요」= 重新走了才明白。~아/어 보니까 = ~아/어 보다（Day 43 尝试）+ ~(으)니까（因为/所以）的组合，特指**经验之后的领悟**。回顾/感悟/日记高频。',
    rules: [
      '**기본**：V + 아/어 보니까 = "试了之后发现___"。먹어 보니까 맛있어요 = 吃了才发现好吃',
      '**~니까 vs ~니**：~니까 略正式, ~니 (반말)。해보니 = 试了才发现',
      '**~아/어 보니까 + 결과절**：뒷문장은 발견/느낌 결과. 걸어보니까 알겠어요 = 走了才明白',
      '**~(으)니까 는 命令도 됨** (Day 32 pitfall). 하지만 ~아/어 보니까 는 **발견/感悟** 만 쓴다'
    ],
    examples: [
      { ko: '다시 걸어보니까 알겠어요.', zh: '重新走了才明白。', highlight: '걸어보니까', note: '걷다 → 걸어(ㄷ 불규칙) + 보니까. Tori 오늘 원문' },
      { ko: '먹어 보니까 진짜 매웠어요.', zh: '吃了才发现真的辣。', highlight: '먹어 보니까', note: '먹다 → 먹어 보니까. 尝试后发现' },
      { ko: '와보니까 여기가 진짜 예쁘네요.', zh: '来了才发现这里真美。', highlight: '와보니까', note: '오다 → 와 보니까. 여행/장소 감상' },
      { ko: '해보니까 어렵지 않았어요.', zh: '做了才发现不难。', highlight: '해보니까', note: '하다 → 해보니까. 도전/시도 후 회고' },
    ],
    pitfall:
      '① **~아/어 보니까 = 试过才知道** (경험 후 발견). ~(으)니까 (Day 32) = **일반 이유** (因为)。두 개 다르다: 걸어 보니까 = 走了才发现; 걸으니까 = 因为走。② 결과절엔 **발견/느낌/알게 됨** 을 씀. 명령/제안엔 안 씀. 한국어를 배워보니까 재미있어요 (O) / 배워보니까 열심히 하세요 (X). ③ ~아/어 보다 (Day 43) 의 확장 표현. 두 개 세트로 기억.',
  },

  output: [
    {
      id: 'd58-o1',
      kind: 'compose',
      zhHint: '重新走了才明白。',
      tokens: ['다시', '걸어보니까', '알겠어요', '걸어봐요', '알아요', '걷으니까'],
      composeAnswer: ['다시', '걸어보니까', '알겠어요'],
      successMsg: '~아/어 보니까 = 试后发现. 回顾主题的经典句.',
    },
    {
      id: 'd58-o2',
      kind: 'listen-choice',
      audioKo: '같은 길인데 다른 느낌이에요.',
      successMsg: '✓ Day 58 主题句. ~는데 铺垫 (Day 48 学过).',
      choices: [
        { zh: '同一条路，不同的感觉。', correct: true },
        { zh: '同一条路，走两遍。', correct: false },
        { zh: '不同的路，一样的感觉。', correct: false },
        { zh: '感觉这条路很长。', correct: false },
      ],
    },
    {
      id: 'd58-o3',
      kind: 'zh-to-ko',
      zhPrompt: '来了才发现这里真美。',
      successMsg: '"와보니까 여기가 진짜 예쁘네요." — 오다 → 와 보니까.',
      choices: [
        { ko: '와보니까 여기가 진짜 예쁘네요.', correct: true },
        { ko: '오니까 여기가 진짜 예쁘네요.', correct: false },
        { ko: '와서 여기가 진짜 예쁘네요.', correct: false },
        { ko: '오니까 여기가 진짜 예쁘네.', correct: false },
      ],
    },
    {
      id: 'd58-o4',
      kind: 'particle-error',
      zhHint: '摔倒也没关系。',
      successMsg: '~아/어도 되다 = 也可以. 넘어지다 → 넘어져도.',
      choices: [
        { ko: '넘어져도 돼.', correct: true },
        { ko: '넘어지도 돼.', correct: false },
        { ko: '넘어져만 돼.', correct: false },
        { ko: '넘어지어도 돼.', correct: false },
      ],
    },
    {
      id: 'd58-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 58 全对。처음의 길, 지금의 나.',
      pairs: [
        { ko: '다시', zh: '再/重新' },
        { ko: '느낌', zh: '感觉' },
        { ko: '넘어지다', zh: '摔倒' },
        { ko: '감사', zh: '感恩' },
        { ko: '도착하다', zh: '到达' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '같은 길, 다른 나. 56일 동안 정말 많이 컸어요.',
    preview: '明天中级毕业典礼预演——Tori紧张地改了八遍稿子。',
    stickerId: 'sticker-d58',
    sceneImageUrl: '/images/diary/day-58-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~아/어 보니까 和 ~(으)니까 什么时候用？」「도착하다 和 오다 什么区别？」',
};
