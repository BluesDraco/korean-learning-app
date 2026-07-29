import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 65 · 육식자 구역 · 猎食者街区
 *
 * 剧情：Tori听同学说兽尔北区有"猎食者街区"，住的都是大型动物。她好奇去看看。
 * 走进去发现门都很高、路标看不懂、路灯很暗。一只路过的兔子低声说"조심해"（小心）。
 * 兔子说"这里……对我们不好的地方"。
 *
 * 学习目标：경고 표현 ~지 마세요 (Day 65 深化) / 대형/소형 어휘 / 경계 감정
 * 语料层级：해요体 + 반말（陌生兔子低声说话）
 */
export const day65: ToriDay = {
  level: 'advanced',
  day: 5,
  phase: 'mastery',
  title: '进入猎食者街区',
  subtitle: '"조심해." — 一只陌生兔子的一声警告',
  heroImageUrl: '/images/diary/day-65-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 22일 · 금요일 저녁',
    weather: '兽尔 · 초겨울 흐림',
    toriPose: 'shy',
    diaryText: `11月22日，周五傍晚。

放学时同学随口聊起：

"토리, 북구에 육식자 구역 있는 거 알지? 가지 마."
（兔莉，北区有个"食肉动物区"你知道吧？别去。）

"육식자 구역? 그게 뭔데?"（食肉动物区？那是什么？）

"큰 동물들만 사는 데. 사자, 곰, 호랑이 같은… 소형 동물한테는 별로 안 좋아."
（专门住大型动物的地方。狮子、熊、老虎这些……对小型动物不太好。）

心里冒起一股好奇。"不太好"——到底是什么样的"不太好"？

下班后，我搭四号线一直坐到终点，从北区 3 号出口出来。踏出地面那一刻，空气都变了。

建筑的门都很高。看起来能有两米多。招牌上的字又粗又大。

路标——我看不懂。这好像不是"方向指示"，更像是某种规矩。路灯也不亮。对大型动物的视野或许够，可我这种身高，看什么都黑漆漆的。

对面走来一只和我差不多身高的兔子。擦肩而过时，他压低嗓子对我说了一句：

"조심해. 여기… 우리한테 좋은 데 아니야."
（小心。这地方……对我们来说不是好地方。）

然后加快脚步走开了。

——"우리한테"（对我们）。他把我看作了自己人。

风忽然刮得很大。就在那一瞬间，我第一次觉得这座城市对我来说是陌生的。`,
  },

  words: [
    {
      id: 'd65-w1',
      korean: '조심',
      hangul: 'jo-sim',
      zh: '小心',
      pos: '名词',
      example: { ko: '조심해요, 위험해요.', zh: '小心，危险。' },
      tip: '조심하다 = 小心/注意. 조심해 = 반말 경고',
    },
    {
      id: 'd65-w2',
      korean: '구역',
      hangul: 'gu-yeok',
      zh: '街区/区域',
      pos: '名词',
      example: { ko: '이 구역은 조심해요.', zh: '这个街区要小心。' },
      tip: '区(구) + 域(역). 상업 구역 / 주거 구역',
    },
    {
      id: 'd65-w3',
      korean: '육식',
      hangul: 'yuk-sik',
      zh: '肉食（者）',
      pos: '名词',
      example: { ko: '육식 동물이 사는 곳이에요.', zh: '肉食动物住的地方。' },
      tip: '肉(육) + 食(식). 육식자 = 肉食者. 반대: 초식',
    },
    {
      id: 'd65-w4',
      korean: '어둡다',
      hangul: 'eo-dup-da',
      zh: '暗/黑',
      pos: '形容词',
      example: { ko: '가로등이 어두워요.', zh: '路灯很暗。' },
      tip: 'ㅂ 불규칙: 어둡다 → 어두워요. 반대: 밝다',
    },
    {
      id: 'd65-w5',
      korean: '가로등',
      hangul: 'ga-ro-deung',
      zh: '路灯',
      pos: '名词',
      example: { ko: '가로등이 별로 없어요.', zh: '路灯不太多。' },
      tip: '街(가) + 路(로) + 灯(등). 옛 도시 상징',
    },
    {
      id: 'd65-w6',
      korean: '낯설다',
      hangul: 'nat-seol-da',
      zh: '陌生',
      pos: '形容词',
      example: { ko: '갑자기 낯설게 느껴졌어요.', zh: '突然感到陌生。' },
      tip: 'ㄹ 어간: 낯설다 → 낯설어요. 반대: 익숙하다',
    },
  ],

  dialogue: {
    scene: '북구 3번 출구·이름 모르는 토끼',
    setting: {
      time: '周五 18:45',
      place: '북구 3번 출구 근처 골목',
      npc: '이름 모르는 토끼',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '학교 친구',
        ko: '북구 육식자 구역, 소형 동물한테 좋은 데가 아니야.',
        hangul: 'buk-gu yuk-sik-ja gu-yeok, so-hyeong dong-mu-ran-te jo-eun de-ga a-ni-ya',
        zh: '北区肉食者街区，对小型动物不是好地方。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '"별로 안 좋다"가 정확히 뭘까? 궁금해서 가보고 싶어.',
        hangul: 'byeol-lo an jo-ta-ga jeong-hwa-ki mwol-kka? gung-geum-hae-seo ga-bo-go si-peo',
        zh: '"不好"到底是什么？好奇想去看看。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: '이름 모르는 토끼',
        ko: '조심해. 여기… 우리한테 좋은 데 아니야.',
        hangul: 'jo-sim-hae. yeo-gi… u-ri-han-te jo-eun de a-ni-ya',
        zh: '小心。这里……对我们不好。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '왜요? 뭐가 있어요?',
        hangul: 'wae-yo? mwo-ga i-sseo-yo?',
        zh: '为什么？有什么？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '이름 모르는 토끼',
        ko: '너무 오래 있지 마. 밤에는 특히.',
        hangul: 'neo-mu o-rae it-ji ma. ba-me-neun teuk-i',
        zh: '别待太久。晚上尤其别。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '陌生兔子快步离开了。Tori想向她道谢。合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '알려줘서 고마워요.', zh: '谢谢您告诉我。', correct: true },
          { ko: '무슨 상관이에요?', zh: '关你什么事？', correct: false },
          { ko: '거짓말이에요.', zh: '骗人的吧。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '别做___：~지 마세요 / ~지 마',
    pattern: 'V + **지 마세요** (敬语) · **지 마** (반말)',
    whenToUse: '「别做___」的禁止/劝阻句尾。陌生兔子说 「너무 오래 있**지 마**」= 别待太久。~지 마세요 = 韩语最刚需的"劝阻"表达。警告/关心/朋友劝阻都用它。반말去掉세요 = ~지 마。',
    rules: [
      '**基本公式**：V + 지 마세요 = 请别___。먹다 → 먹지 마세요',
      '**반말 → ~지 마**：울지 마 = 别哭。친구/후배에게',
      '**정중 up → ~지 마시기 바랍니다**：正式禁止（公共场所标语）',
      '**~지 말고 → 别___而是**：여기 있지 말고 빨리 가 = 别待这儿，快走吧'
    ],
    examples: [
      { ko: '너무 오래 있지 마.', zh: '别待太久。', highlight: '있지 마', note: '있다 → 있지 마 (반말 禁止). 낯선 토끼 원문' },
      { ko: '가로등 없는 곳에 가지 마세요.', zh: '别去没路灯的地方。', highlight: '가지 마세요', note: '가다 → 가지 마세요. 敬语 警告' },
      { ko: '울지 마, 괜찮아.', zh: '别哭，没事。', highlight: '울지 마', note: '울다 → 울지 마. 반말 위로' },
      { ko: '여기 있지 말고 빨리 가.', zh: '别待这儿，快走吧。', highlight: '있지 말고', note: '~지 말고 = 别做A而是B. 이유+대안 구조' },
    ],
    pitfall:
      '① **~지 마세요 vs ~지 않아요**: 마세요 = 禁止/劝阻; 않아요 = 陈述不做. 저는 안 먹어요 vs 먹지 마세요 완전 다름. ② **~지 마 (반말)** — 친구/후배/자녀에게. 长辈에게는 절대 ❌. ③ **~지 말고 + 대안**: 사탕 먹지 말고 과일 먹어 = 别吃糖吃水果. ④ ~지 말라고 = 命令 간접引用. 엄마가 늦지 말라고 했어요 = 妈妈说别晚了.',
  },

  output: [
    {
      id: 'd65-o1',
      kind: 'compose',
      zhHint: '别待太久。晚上尤其别。',
      tokens: ['너무 오래', '있지 마', '밤에는 특히', '있어야 해', '가야 해', '자주 있어'],
      composeAnswer: ['너무 오래', '있지 마', '밤에는 특히'],
      successMsg: '경고 반말. 낯선 토끼가 남긴 한 마디.',
    },
    {
      id: 'd65-o2',
      kind: 'listen-choice',
      audioKo: '여기… 우리한테 좋은 데 아니야.',
      successMsg: '✓ 兔子의 한 마디. "우리"—너와 나 같은 종족.',
      choices: [
        { zh: '这里……对我们不好。', correct: true },
        { zh: '这里对我们很好。', correct: false },
        { zh: '这里没我们。', correct: false },
        { zh: '我们要在这里。', correct: false },
      ],
    },
    {
      id: 'd65-o3',
      kind: 'zh-to-ko',
      zhPrompt: '别去没路灯的地方。',
      successMsg: '"가로등 없는 곳에 가지 마세요." — 가다 → 가지 마세요.',
      choices: [
        { ko: '가로등 없는 곳에 가지 마세요.', correct: true },
        { ko: '가로등 없는 곳에 안 가세요.', correct: false },
        { ko: '가로등 없는 곳을 가지 마세요.', correct: false },
        { ko: '가로등 없는 곳에 가지 않아요.', correct: false },
      ],
    },
    {
      id: 'd65-o4',
      kind: 'particle-error',
      zhHint: '别待这儿，快走吧。',
      successMsg: '~지 말고 = 别A而B. 있다 → 있지 말고.',
      choices: [
        { ko: '여기 있지 말고 빨리 가.', correct: true },
        { ko: '여기 있지 않고 빨리 가.', correct: false },
        { ko: '여기 없지 말고 빨리 가.', correct: false },
        { ko: '여기 있지 마고 빨리 가.', correct: false },
      ],
    },
    {
      id: 'd65-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 65 全对. 낯선 골목, 낯선 경고.',
      pairs: [
        { ko: '조심', zh: '小心' },
        { ko: '구역', zh: '街区' },
        { ko: '육식', zh: '肉食' },
        { ko: '어둡다', zh: '暗' },
        { ko: '낯설다', zh: '陌生' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '경고를 받았어요. 하지만 완전히 겁먹지도 않았어요. 관찰하는 눈이 생겼어요.',
    preview: '明天，Tori 진짜로 打工试试 — 그 구역의 한 가게에서。',
    stickerId: 'sticker-d65',
    sceneImageUrl: '/images/diary/day-65-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~지 마세요 和 ~면 안 돼요 有什么区别？」「陌生地方遇警告怎么应对？」',
};
