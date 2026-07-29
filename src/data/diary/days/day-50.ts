import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 50 · 첫눈 · 韩国的初雪
 *
 * 剧情：兽尔动物城下了初雪。Tori第一次在韩国看雪。Haru说韩国有个说法——
 * 初雪许愿会成真。Tori闭眼许了一个愿。Haru问许了什么，Tori说是秘密。
 *
 * 学习目标：조건 ~(으)면 심화 / 첫눈·소원 어휘
 * 语料层级：해요体 + 반말
 * 韩语自审：korean skill PASS
 */
export const day50: ToriDay = {
  level: 'intermediate',
  day: 20,
  phase: 'expansion',
  title: '初雪 · 韩国的第一场雪',
  subtitle: '闭眼许愿——但那是秘密',
  heroImageUrl: '/images/diary/day-50-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 22일 · 화요일 밤',
    weather: '兽尔 · 첫눈',
    toriPose: 'shy',
    diaryText: `10月22日，周二晚上。

放学出教室，
天上飘下第一片雪。

不是冰粒，是雪。
薄薄的一层，白色。

Haru跑过来抓我的手：
"토리! 첫눈이야!!"
（兔莉！是初雪！！）

我第一次在兽尔看雪。
在中国北方虽然也见过雪，
但那是"冬天的雪"。
这是——"我一个人来到韩国50天后的雪"。

Haru把我拉到广场中央：

"한국에서는 첫눈이 오면 소원을 빌면 이뤄진대."
（韩国有个说法，初雪的时候许愿会成真。）

我闭上眼。
风把发梢吹起来一点。

我许了一个愿。
——但那是秘密。

Haru睁开眼看我："뭐 빌었어?"
（许了什么？）

我笑着摇头："비밀이야."
（是秘密。）

Haru也笑了，
然后她说："나도 하나 빌었어. 나도 비밀."
（我也许了一个。也是秘密。）

雪一直下到晚上10点。
广场的地上白了一层，
我们的脚印一大一小，
留在初雪上。`,
  },

  words: [
    {
      id: 'd50-w1',
      korean: '첫눈',
      hangul: 'cheon-nun',
      zh: '初雪',
      pos: '名词',
      example: { ko: '오늘 첫눈이 왔어요.', zh: '今天下了初雪。' },
      tip: '첫(初) + 눈(雪)。발음 [천눈]。韩国人重视的一天',
    },
    {
      id: 'd50-w2',
      korean: '소원',
      hangul: 'so-won',
      zh: '愿望',
      pos: '名词',
      example: { ko: '소원을 빌었어요.', zh: '许了愿。' },
      tip: '所(소) + 愿(원)。소원을 빌다 = 许愿',
    },
    {
      id: 'd50-w3',
      korean: '빌다',
      hangul: 'bil-da',
      zh: '祈求/许（愿）',
      pos: '动词',
      example: { ko: '소원을 빌어요.', zh: '许愿。' },
      tip: 'ㄹ 词干：빌다 → 빌어요 / 빌면',
    },
    {
      id: 'd50-w4',
      korean: '이뤄지다',
      hangul: 'i-rwo-ji-da',
      zh: '实现/成真',
      pos: '动词',
      example: { ko: '소원이 이뤄져요.', zh: '愿望实现。' },
      tip: '이루다(实现) + ~어지다(被动) → 自动地实现',
    },
    {
      id: 'd50-w5',
      korean: '비밀',
      hangul: 'bi-mil',
      zh: '秘密',
      pos: '名词',
      example: { ko: '이건 비밀이야.', zh: '这是秘密。' },
      tip: 'Day 34 学过。这次是Tori自己的秘密',
    },
    {
      id: 'd50-w6',
      korean: '발자국',
      hangul: 'bal-ja-guk',
      zh: '脚印',
      pos: '名词',
      example: { ko: '눈 위에 발자국이 남았어요.', zh: '雪上留下脚印。' },
      tip: '발(脚) + 자국(痕迹)。初雪 + 脚印 = 韩剧经典意象',
    },
  ],

  dialogue: {
    scene: '한빛 학원 앞 광장·첫눈',
    setting: {
      time: '周二晚 18:20',
      place: '韩光语学院前小广场',
      npc: 'Haru',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '토리! 첫눈이야!!',
        hangul: 'to-ri! cheon-nu-ni-ya!!',
        zh: '兔莉！是初雪！！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '첫눈… 한국에서 처음이야.',
        hangul: 'cheon-nun… han-gu-ge-seo cheo-eu-mi-ya',
        zh: '初雪……在韩国第一次。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '한국에서는 첫눈이 오면 소원을 빌면 이뤄진대.',
        hangul: 'han-gu-ge-seo-neun cheon-nu-ni o-myeon so-wo-neul bil-myeon i-rwo-jin-dae',
        zh: '韩国有说法——初雪的时候许愿会成真。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '진짜? 그럼 나도 하나 빌게.',
        hangul: 'jin-jja? geu-reom na-do ha-na bil-ge',
        zh: '真的？那我也许一个。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '뭐 빌었어?',
        hangul: 'mwo bi-reo-sseo?',
        zh: '许了什么？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Haru问Tori许了什么愿。Tori不想说出来。合适的回应？',
        practice: 'pick',
        choices: [
          { ko: '비밀이야. 말하면 안 이뤄진대.', zh: '是秘密。说了就不灵了。', correct: true },
          { ko: '나도 몰라.', zh: '我也不知道。', correct: false },
          { ko: '너 먼저 말해.', zh: '你先说。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '如果___就___：~(으)면（Day 42 深化）',
    pattern: 'V/A + **(으)면** + (S)',
    whenToUse: 'Day 42 学过基础，Day 50 深化 —— ~(으)면 表**假设条件**，还能表**因果推论**、**习惯**。Haru 说 「첫눈이 **오면** 소원을 **빌면** 이뤄진**대**」= 初雪的时候许愿的话就会实现。两个 ~(으)면 环环相扣 = 韩国"传说/规则"最典型的句型。',
    rules: [
      '**假设条件**：비가 오면 안 가요 = 下雨就不去（Day 42 复习）',
      '**习惯性因果**：주말이면 늦잠을 자요 = 周末就睡懒觉。일반 규칙 표현',
      '**双重 ~(으)면 传说式**：A면 B면 C = "如果A，B就C"。韩国人喜欢用这个结构讲民俗——첫눈이 오면 소원을 빌면 이뤄진다',
      '**~(으)면 안 되다** = 不能：말하면 안 돼 = 不能说。Day 49 学过'
    ],
    examples: [
      { ko: '첫눈이 오면 소원이 이뤄져.', zh: '初雪来临的话愿望会实现。', highlight: '오면 ... 이뤄져', note: '오다 无收音 → **오면**。韩国经典传说' },
      { ko: '말하면 안 이뤄진대.', zh: '说了就不灵了。', highlight: '말하면 안', note: '말하다 → 말하**면**。~(으)면 + 안 = 不能' },
      { ko: '한국어를 잘하면 좋겠어요.', zh: '韩语要能说好就好了。', highlight: '잘하면 좋겠어요', note: '~(으)면 좋겠어요 = Day 44 배운 원망 형태의 초급판' },
      { ko: '주말이면 늦잠을 자요.', zh: '一到周末就睡懒觉。', highlight: '주말이면', note: '주말(名词) + **이면** = 习惯性因果。名词加 이면' },
    ],
    pitfall:
      '① 초급자最容易混：~(으)면 vs ~아/어서。~(으)면 是**假设/条件**，~아/어서 是**已发生的原因**。"下雨了所以没去" = 비가 와서 안 갔어요 (已发生); "下雨的话就不去" = 비가 오면 안 갈 거예요 (假设). ② 名词后必须 **이면**（有받침）/ **면**（无받침）— 不能省略이。③ ~(으)면 后可接命令/建议/意志 → 这是 ~(으)면 相较 ~아/어서 的最大优势。',
  },

  output: [
    {
      id: 'd50-o1',
      kind: 'compose',
      zhHint: '初雪来的时候许愿会实现。',
      tokens: ['첫눈이', '오면', '소원을', '빌면', '이뤄져', '이뤄졌어', '오니까'],
      composeAnswer: ['첫눈이', '오면', '소원을', '빌면', '이뤄져'],
      successMsg: '韩国民俗的经典表达。双 (으)면 结构。',
    },
    {
      id: 'd50-o2',
      kind: 'listen-choice',
      audioKo: '말하면 안 이뤄진대.',
      successMsg: '✓ Tori 的挡箭牌 —— 说了就不灵。',
      choices: [
        { zh: '据说说了就不灵了。', correct: true },
        { zh: '说了就一定会灵。', correct: false },
        { zh: '不许说话。', correct: false },
        { zh: '说了才灵。', correct: false },
      ],
    },
    {
      id: 'd50-o3',
      kind: 'zh-to-ko',
      zhPrompt: '韩语要能说好就好了。',
      successMsg: '"한국어를 잘하면 좋겠어요." — ~(으)면 좋겠어요 원망.',
      choices: [
        { ko: '한국어를 잘하면 좋겠어요.', correct: true },
        { ko: '한국어를 잘하는 좋겠어요.', correct: false },
        { ko: '한국어가 잘하면 좋겠어요.', correct: false },
        { ko: '한국어를 잘하면 좋았어요.', correct: false },
      ],
    },
    {
      id: 'd50-o4',
      kind: 'particle-error',
      zhHint: '一到周末就睡懒觉。',
      successMsg: '주말 有 ㄹ 받침 → 이면. 명사+(이)면 = 조건절',
      choices: [
        { ko: '주말이면 늦잠을 자요.', correct: true },
        { ko: '주말면 늦잠을 자요.', correct: false },
        { ko: '주말이라면 늦잠을 자요.', correct: false },
        { ko: '주말은 늦잠을 자요.', correct: false },
      ],
    },
    {
      id: 'd50-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 50 全对。광장에 두 개의 발자국——그 옆에 소원 하나씩.',
      pairs: [
        { ko: '첫눈', zh: '初雪' },
        { ko: '소원', zh: '愿望' },
        { ko: '빌다', zh: '许（愿）' },
        { ko: '이뤄지다', zh: '实现' },
        { ko: '발자국', zh: '脚印' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '첫눈이 왔어요. 소원 하나가 눈 속에 놓였어요.',
    preview: '明天，Tori一个人推开생카的门——这一次是真的粉丝。',
    stickerId: 'sticker-d50',
    sceneImageUrl: '/images/diary/day-50-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~(으)면 和 ~아/어서 什么时候用？」「初雪韩国有什么传统？」',
};
