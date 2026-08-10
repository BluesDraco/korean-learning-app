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
  title: '初雪 · 韩国的第一场雪', titleEn: 'First Snow · Korea\'s First Snowfall',
  subtitle: '闭眼许愿——但那是秘密', subtitleEn: 'Close your eyes and make a wish—but it\'s a secret',
  heroImageUrl: '/images/diary/day-50-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 22일 · 화요일 밤',
    weather: '兽尔 · 첫눈', weatherEn: 'Tori · First Snow',
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
      zh: '初雪', zhEn: 'First Snow',
      pos: '名词', posEn: 'Noun',
      example: { ko: '오늘 첫눈이 왔어요.', zh: '今天下了初雪。', zhEn: 'It snowed for the first time today.' },
      tip: '첫(初) + 눈(雪)。발음 [천눈]。韩国人重视的一天', tipEn: 'First (初) + Snow (雪). Pronounced [cheon-nun]. A day Koreans cherish.',
    },
    {
      id: 'd50-w2',
      korean: '소원',
      hangul: 'so-won',
      zh: '愿望', zhEn: 'Wish',
      pos: '名词', posEn: 'Noun',
      example: { ko: '소원을 빌었어요.', zh: '许了愿。', zhEn: 'Made a wish.' },
      tip: '所(소) + 愿(원)。소원을 빌다 = 许愿', tipEn: 'So (所) + Won (愿). Soweon-eul bilda = to make a wish',
    },
    {
      id: 'd50-w3',
      korean: '빌다',
      hangul: 'bil-da',
      zh: '祈求/许（愿）', zhEn: 'To pray / make (a wish)',
      pos: '动词', posEn: 'Verb',
      example: { ko: '소원을 빌어요.', zh: '许愿。', zhEn: 'Make a wish.' },
      tip: 'ㄹ 词干：빌다 → 빌어요 / 빌면', tipEn: 'ㄹ stem: bilda → bireoyo / bilmyeon',
    },
    {
      id: 'd50-w4',
      korean: '이뤄지다',
      hangul: 'i-rwo-ji-da',
      zh: '实现/成真', zhEn: 'Come true',
      pos: '动词', posEn: 'Verb',
      example: { ko: '소원이 이뤄져요.', zh: '愿望实现。', zhEn: 'The wish came true.' },
      tip: '이루다(实现) + ~어지다(被动) → 自动地实现', tipEn: 'Iru-da (to achieve) + ~eo-jida (passive) → happens on its own',
    },
    {
      id: 'd50-w5',
      korean: '비밀',
      hangul: 'bi-mil',
      zh: '秘密', zhEn: 'secret',
      pos: '名词', posEn: 'Noun',
      example: { ko: '이건 비밀이야.', zh: '这是秘密。', zhEn: 'This is a secret.' },
      tip: 'Day 34 学过。这次是Tori自己的秘密', tipEn: 'Learned in Day 34. This time it\'s Tori\'s own secret.',
    },
    {
      id: 'd50-w6',
      korean: '발자국',
      hangul: 'bal-ja-guk',
      zh: '脚印', zhEn: 'Footprints',
      pos: '名词', posEn: 'Noun',
      example: { ko: '눈 위에 발자국이 남았어요.', zh: '雪上留下脚印。', zhEn: 'Left footprints in the snow.' },
      tip: '발(脚) + 자국(痕迹)。初雪 + 脚印 = 韩剧经典意象', tipEn: 'Bal (foot) + jaguk (trace). First snow + footprints = classic K-drama imagery',
    },
  ],

  dialogue: {
    scene: '한빛 학원 앞 광장·첫눈',
    setting: {
      time: '周二晚 18:20', timeEn: 'Tuesday evening 18:20',
      place: '韩光语学院前小广场', placeEn: 'Small plaza in front of Hangwang Language Academy',
      npc: 'Haru',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '토리! 첫눈이야!!',
        hangul: 'to-ri! cheon-nu-ni-ya!!',
        zh: '兔莉！是初雪！！', zhEn: 'Tori! It\'s the first snow!!',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '첫눈… 한국에서 처음이야.',
        hangul: 'cheon-nun… han-gu-ge-seo cheo-eu-mi-ya',
        zh: '初雪……在韩国第一次。', zhEn: 'First snow... my first time in Korea.',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '한국에서는 첫눈이 오면 소원을 빌면 이뤄진대.',
        hangul: 'han-gu-ge-seo-neun cheon-nu-ni o-myeon so-wo-neul bil-myeon i-rwo-jin-dae',
        zh: '韩国有说法——初雪的时候许愿会成真。', zhEn: 'There\'s a saying in Korea—wishes made during the first snow come true.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '진짜? 그럼 나도 하나 빌게.',
        hangul: 'jin-jja? geu-reom na-do ha-na bil-ge',
        zh: '真的？那我也许一个。', zhEn: 'Really? Then I\'ll make one too.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '뭐 빌었어?',
        hangul: 'mwo bi-reo-sseo?',
        zh: '许了什么？', zhEn: 'What did you wish for?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Haru问Tori许了什么愿。Tori不想说出来。合适的回应？', zhEn: 'Haru asks Tori what wish she made. Tori doesn\'t want to say. What\'s the right response?',
        practice: 'pick',
        choices: [
          { ko: '비밀이야. 말하면 안 이뤄진대.', zh: '是秘密。说了就不灵了。', zhEn: 'It\'s a secret. If I say it, it won\'t come true.', correct: true },
          { ko: '나도 몰라.', zh: '我也不知道。', zhEn: 'I don\'t know either.', correct: false },
          { ko: '너 먼저 말해.', zh: '你先说。', zhEn: 'You go first.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '如果___就___：~(으)면（Day 42 深化）', titleEn: 'If ___ then ___: ~(으)면 (Day 42 Deep Dive)',
    pattern: 'V/A + **(으)면** + (S)',
    whenToUse: 'Day 42 学过基础，Day 50 深化 —— ~(으)면 表**假设条件**，还能表**因果推论**、**习惯**。Haru 说 「첫눈이 **오면** 소원을 **빌면** 이뤄진**대**」= 初雪的时候许愿的话就会实现。两个 ~(으)면 环环相扣 = 韩国"传说/规则"最典型的句型。', whenToUseEn: 'Day 42 covered the basics, Day 50 deepens it — ~(으)면 expresses **hypothetical conditions**, but also **causal inference** and **habits**. Haru says 「첫눈이 **오면** 소원을 **빌면** 이뤄진**대**」= If you make a wish when the first snow falls, it comes true. Two ~(으)면 linked together = the most typical pattern for Korean "legends/rules."',
    rules: [
      '**假设条件**：비가 오면 안 가요 = 下雨就不去（Day 42 复习）',
      '**习惯性因果**：주말이면 늦잠을 자요 = 周末就睡懒觉。일반 규칙 표현',
      '**双重 ~(으)면 传说式**：A면 B면 C = "如果A，B就C"。韩国人喜欢用这个结构讲民俗——첫눈이 오면 소원을 빌면 이뤄진다',
      '**~(으)면 안 되다** = 不能：말하면 안 돼 = 不能说。Day 49 学过'
    ],
    examples: [
      { ko: '첫눈이 오면 소원이 이뤄져.', zh: '初雪来临的话愿望会实现。', zhEn: 'If the first snow comes, your wish will come true.', highlight: '오면 ... 이뤄져', note: '오다 无收音 → **오면**。韩国经典传说', noteEn: '오다 no final consonant → **오면**. A classic Korean legend.' },
      { ko: '말하면 안 이뤄진대.', zh: '说了就不灵了。', zhEn: 'If you say it, it won\'t come true.', highlight: '말하면 안', note: '말하다 → 말하**면**。~(으)면 + 안 = 不能', noteEn: '말하다 → 말하**면**. ~(으)면 + 안 = can\'t/must not' },
      { ko: '한국어를 잘하면 좋겠어요.', zh: '韩语要能说好就好了。', zhEn: 'If only I could speak Korean well.', highlight: '잘하면 좋겠어요', note: '~(으)면 좋겠어요 = Day 44 배운 원망 형태의 초급판' },
      { ko: '주말이면 늦잠을 자요.', zh: '一到周末就睡懒觉。', zhEn: 'I sleep in every weekend.', highlight: '주말이면', note: '주말(名词) + **이면** = 习惯性因果。名词加 이면', noteEn: '주말 (noun) + **이면** = habitual cause-and-effect. Nouns take 이면.' },
    ],
    pitfall:
      '① 초급자最容易混：~(으)면 vs ~아/어서。~(으)면 是**假设/条件**，~아/어서 是**已发生的原因**。"下雨了所以没去" = 비가 와서 안 갔어요 (已发生); "下雨的话就不去" = 비가 오면 안 갈 거예요 (假设). ② 名词后必须 **이면**（有받침）/ **면**（无받침）— 不能省略이。③ ~(으)면 后可接命令/建议/意志 → 这是 ~(으)면 相较 ~아/어서 的最大优势。',
  },

  output: [
    {
      id: 'd50-o1',
      kind: 'compose',
      zhHint: '初雪来的时候许愿会实现。', zhHintEn: 'If you make a wish when the first snow falls, it comes true.',
      tokens: ['첫눈이', '오면', '소원을', '빌면', '이뤄져', '이뤄졌어', '오니까'],
      composeAnswer: ['첫눈이', '오면', '소원을', '빌면', '이뤄져'],
      successMsg: '韩国民俗的经典表达。双 (으)면 结构。', successMsgEn: 'A classic Korean folk expression. Double (으)면 structure.',
    },
    {
      id: 'd50-o2',
      kind: 'listen-choice',
      audioKo: '말하면 안 이뤄진대.',
      successMsg: '✓ Tori 的挡箭牌 —— 说了就不灵。', successMsgEn: '✓ Tori\'s excuse — if you say it, it won\'t come true.',
      choices: [
        { zh: '据说说了就不灵了。', zhEn: 'They say if you say it, it won\'t come true.', correct: true },
        { zh: '说了就一定会灵。', zhEn: 'If you say it, it\'s sure to come true.', correct: false },
        { zh: '不许说话。', zhEn: 'No talking.', correct: false },
        { zh: '说了才灵。', zhEn: 'It only comes true if you say it.', correct: false },
      ],
    },
    {
      id: 'd50-o3',
      kind: 'zh-to-ko',
      zhPrompt: '韩语要能说好就好了。', zhPromptEn: 'If only I could speak Korean well.',
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
      zhHint: '一到周末就睡懒觉。', zhHintEn: 'I sleep in every weekend.',
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
      successMsg: '✓ Day 50 全对。광장에 두 개의 발자국——그 옆에 소원 하나씩.', successMsgEn: '✓ Day 50 all correct. Two footprints in the square — one wish beside each.',
      pairs: [
        { ko: '첫눈', zh: '初雪', zhEn: 'First Snow' },
        { ko: '소원', zh: '愿望', zhEn: 'Wish' },
        { ko: '빌다', zh: '许（愿）', zhEn: 'make (a wish)' },
        { ko: '이뤄지다', zh: '实现', zhEn: 'come true' },
        { ko: '발자국', zh: '脚印', zhEn: 'Footprints' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '첫눈이 왔어요. 소원 하나가 눈 속에 놓였어요.',
    preview: '明天，Tori一个人推开생카的门——这一次是真的粉丝。', previewEn: 'Tomorrow, Tori pushes open the door of 생카 alone — this time, a real fan.',
    stickerId: 'sticker-d50',
    sceneImageUrl: '/images/diary/day-50-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~(으)면 和 ~아/어서 什么时候用？」「初雪韩国有什么传统？」',
};
