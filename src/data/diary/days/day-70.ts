import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 70 · 토론대회 · "작지만 강하다"
 *
 * 剧情：学校辩论赛。辩题"체형의 차이가 능력의 차이를 결정하는가"。Tori被选为反方主辩，
 * Danielle是正方主辩。两人讲台对辩，Tori赢了。Danielle走过来说"잘했어. 인정할게" ——
 * 这是Tori和Danielle的和解。
 *
 * 学习目标：대비 ~지만 (Day 48·60 심화) / 논박 표현 / 인정 표현
 * 语料层级：해요体 · 논쟁 정식
 */
export const day70: ToriDay = {
  level: 'advanced',
  day: 10,
  phase: 'mastery',
  title: '辩论赛 · "작지만 강하다"', titleEn: 'Debate · "Small but Strong"',
  subtitle: 'Tori vs Danielle — 讲台上的和解', subtitleEn: 'Tori vs Danielle — Reconciliation on Stage',
  heroImageUrl: '/images/diary/day-70-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 28일 · 목요일 오후',
    weather: '兽尔 · 맑음', weatherEn: 'Sua · Clear',
    toriPose: 'proud',
    diaryText: `11月28日，周四下午。

한빛大学辩论赛。辩题："体型的差异是否决定能力的差异？"

正方（支持）：Danielle 代表。反方（反对）：我，兔莉。

Day 69 那场反歧视论坛之后，校方选我做反方代表。——当我看到对手是 Danielle 时，心跳漏了一拍。

上台，我们相对而坐。Danielle 先发言：

"체형은 진화적 결과이며 특정 능력의 지표입니다. 큰 동물은 물리적 능력에서 우위를 가집니다..."
（体型是进化的结果，是特定能力的指标。大型动物在物理能力上具有优势……）

逻辑清晰，发音依旧像母语者。——但今天，我没准备一个"错误答案"。

轮到我了：

"저는 작아요. 60일 전에는 이 크기가 부담이었어요. 하지만 오늘은 다르게 말씀드리겠습니다."
（我很小。六十天前，这个尺寸对我是一种负担。但今天，我想换一种说法。）

"작지만 강하다. 왜냐하면, 능력은 몸의 크기가 아니라 마음의 크기이기 때문입니다."
（小，也可以强。因为能力不是身体的大小，而是内心的大小。）

"토끼는 사자만큼 힘이 세지 않아요. 하지만 토끼는 사자가 못 보는 길을 볼 수 있어요.——사자의 눈높이에서 안 보이는 작은 문틈, 짧은 골목, 낮은 창문."
（兔子力气不如狮子。但兔子看得见狮子看不见的路——狮子视线抵达不了的门缝、短巷、低窗。）

Danielle 的眼神动了一下。

"체형이 결정하는 건 방향이지, 능력이 아닙니다. 각자의 방향으로 각자의 능력을 발휘합니다. 그것이 진짜 다양성입니다."
（体型决定的是方向，不是能力。每种体型都在自己的方向上发挥自己的能力。这才叫真正的多样性。）

发言结束的那一刻，整个会场安静下来。评委宣布：反方胜。

走下台阶的时候，Danielle 迎着我走过来。

"잘했어. 인정할게."（干得好。我认。）

70 天了——这是她第一次和我正面相视地笑。`,
  },

  words: [
    {
      id: 'd70-w1',
      korean: '토론',
      hangul: 'to-ron',
      zh: '辩论/讨论', zhEn: 'Debate/Discussion',
      pos: '名词', posEn: 'Noun',
      example: { ko: '토론대회에서 이겼어요.', zh: '辩论赛赢了。', zhEn: 'Won the debate.' },
      tip: '討(토) + 论(론). 토론하다 = 辩论', tipEn: '討(토) + 論(론). 토론하다 = to debate',
    },
    {
      id: 'd70-w2',
      korean: '결정하다',
      hangul: 'gyeol-jjeong-ha-da',
      zh: '决定', zhEn: 'Decision',
      pos: '动词', posEn: 'Verb',
      example: { ko: '체형이 능력을 결정하지 않아요.', zh: '体型不决定能力。', zhEn: 'Body size doesn\'t determine ability.' },
      tip: '决(결) + 定(정) + 하다', tipEn: '決(결) + 定(정) + 하다',
    },
    {
      id: 'd70-w3',
      korean: '다양성',
      hangul: 'da-yang-seong',
      zh: '多样性', zhEn: 'Diversity',
      pos: '名词', posEn: 'Noun',
      example: { ko: '진짜 다양성이에요.', zh: '是真正的多样性。', zhEn: 'That\'s true diversity.' },
      tip: '多(다) + 样(양) + 性(성). 반차별 담론 핵심어', tipEn: '多(다) + 樣(양) + 性(성). Key term in anti-discrimination discourse',
    },
    {
      id: 'd70-w4',
      korean: '강하다',
      hangul: 'gang-ha-da',
      zh: '强', zhEn: 'Strong',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '작지만 강해요.', zh: '虽小但强。', zhEn: 'Small but strong.' },
      tip: '强(강) + 하다. 반의: 약하다', tipEn: '強(강) + 하다. Antonym: 약하다',
    },
    {
      id: 'd70-w5',
      korean: '인정하다',
      hangul: 'in-jeong-ha-da',
      zh: '承认', zhEn: 'Admit',
      pos: '动词', posEn: 'Verb',
      example: { ko: '잘했어. 인정할게.', zh: '干得好，我承认。', zhEn: 'Good job, I admit it.' },
      tip: '认(인) + 定(정) + 하다. 논쟁의 마무리', tipEn: '認(인) + 定(정) + 하다. Wraps up the argument',
    },
    {
      id: 'd70-w6',
      korean: '눈높이',
      hangul: 'nun-no-pi',
      zh: '视角/视线高度', zhEn: 'Perspective/Line of sight',
      pos: '名词', posEn: 'Noun',
      example: { ko: '사자의 눈높이에서 안 보이는 길이 있어요.', zh: '狮子视角看不到的路。', zhEn: 'A road you can\'t see from a lion\'s perspective.' },
      tip: '눈(眼) + 높이(高度). 관점의 은유', tipEn: '눈(眼) + 높이(高度). Metaphor for perspective',
    },
  ],

  dialogue: {
    scene: '토론대회 무대·Tori vs Danielle',
    setting: {
      time: '周四 14:30', timeEn: 'Thursday 14:30',
      place: '한빛대학교 소강당',
      npc: 'Danielle / 심사위원',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Danielle',
        ko: '체형은 진화적 결과입니다. 특정 능력의 지표입니다.',
        hangul: 'che-hyeong-eun jin-hwa-jeok gyeol-gwa-im-ni-da. teuk-jjeong neung-nyeo-gui ji-pyo-im-ni-da',
        zh: '体型是进化的结果。是特定能力的指标。', zhEn: 'Body size is a result of evolution. It\'s an indicator of specific abilities.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '저는 작아요. 하지만 오늘 다르게 말씀드리겠습니다.',
        hangul: 'jeo-neun ja-ga-yo. ha-ji-man o-neul da-reu-ge mal-sseum-deu-ri-get-seum-ni-da',
        zh: '我小。但今天要换个说法。', zhEn: 'I\'m small. But today, I\'ll say it differently.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '작지만 강하다. 능력은 몸의 크기가 아니라 마음의 크기입니다.',
        hangul: 'jak-ji-man gang-ha-da. neung-nyeo-geun mo-mui keu-gi-ga a-ni-ra ma-eu-mui keu-gi-im-ni-da',
        zh: '虽小但强。能力不是身体大小，是心的大小。', zhEn: 'Small but strong. Ability isn\'t about body size—it\'s about the size of your heart.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '토끼는 사자가 못 보는 길을 볼 수 있어요.',
        hangul: 'to-kki-neun sa-ja-ga mot bo-neun gi-reul bol su i-sseo-yo',
        zh: '兔子能看到狮子看不到的路。', zhEn: 'A rabbit can see paths that a lion cannot.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Danielle',
        ko: '잘했어. 인정할게.',
        hangul: 'jal-hae-sseo. in-jeong-hal-ge',
        zh: '干得好。我承认。', zhEn: 'Well done. I admit it.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Danielle 认输并走过来握手。Tori想友好回应表达"以后一起加油"。合适的一句？', zhEn: 'Danielle concedes and comes over to shake hands. Tori wants to respond warmly and say "let\'s keep working hard together." Which is the right line?',
        practice: 'pick',
        choices: [
          { ko: '고마워. 다니엘도 진짜 잘했어. 같이 배워가자.', zh: '谢谢。Danielle也很棒。以后一起学。', zhEn: 'Thanks. Danielle is great too. Let\'s keep learning together.', correct: true },
          { ko: '내가 이겼으니까 이제 됐어.', zh: '我赢了就够了。', zhEn: 'Winning is enough for me.', correct: false },
          { ko: '너 항상 완벽하잖아. 부러워.', zh: '你总是那么完美，好羡慕。', zhEn: 'You\'re always so perfect, I\'m envious.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '虽然___但是___：~지만 (Day 48·60 심화 · 논쟁 문형)', titleEn: 'Although ___ but ___: ~지만 (Day 48·60 advanced · argument pattern)',
    pattern: 'V/A + **지만** + Result',
    whenToUse: 'Day 48 学过 ~지만 (转折)，Day 60 学过 ~았/었지만 (过去转折). Day 70 = **논쟁/자기 정의** 상황의 ~지만. Tori 说 「**작지만** 강하다」= 虽小但强。~지만 = 韩语最刚需의 논쟁 문형—承认 A 但主张 B.', whenToUseEn: 'Day 48 covered ~지만 (contrast), Day 60 covered ~았/었지만 (past contrast). Day 70 = ~지만 in **argument/self-definition** contexts. Tori says 「**작지만** 강하다」= small but strong. ~지만 = Korean\'s most essential argument pattern—concede A but assert B.',
    rules: [
      '**논쟁 핵심 형식**：A ~지만 B = 承认A的同时主张B',
      '**~지만 vs ~는데**: Day 48. ~지만 = 明确对比. ~는데 = 铺垫柔和',
      '**~지만 + 자기 정의**: 작지만 강하다 = 小但强. Tori 오늘의 명제',
      '**~았/었지만 (Day 60 复习)**: 过去 转折. 힘들었지만 이겼어 = 累但赢了'
    ],
    examples: [
      { ko: '작지만 강하다.', zh: '虽小但强。', zhEn: 'Small but strong.', highlight: '작지만 강하다', note: '작다 → 작지만. Day 70 Tori 명제' },
      { ko: '체형은 작지만 능력은 큽니다.', zh: '体型虽小能力大。', zhEn: 'Small in size, big in ability.', highlight: '작지만 ... 큽니다', note: '주어 대비 + ~지만 = 격식체 논쟁' },
      { ko: '어제는 졌지만 오늘은 이겼어요.', zh: '昨天输了但今天赢了。', zhEn: 'Lost yesterday but won today.', highlight: '졌지만 ... 이겼어요', note: '과거 ~았/었지만 대비. Day 60 복습' },
      { ko: '실수했지만 배웠어요.', zh: '虽然失误但学到了。', zhEn: 'Made mistakes but learned.', highlight: '실수했지만 ... 배웠어요', note: '실수하다 → 실수했지만. 성장 관점' },
    ],
    pitfall:
      '① Day 48 ~지만 vs ~는데 — 이 자체는 ~지만 명확 대립 강조. 논쟁/발표에 필수. ~는데 은 대화체 铺垫. ② **~지만 vs ~아/어도** — ~아/어도 = 假设让步 (即使). 작아도 = 即使小; 작지만 = 虽然小. 사실을 인정할 때 ~지만. ③ 학문/토론에서 ~지만 → 격식체 ~(으)나 도 사용: 작으나 강하다. 하지만 오늘 Tori는 해요体를 유지해 접근성 높임.',
  },

  output: [
    {
      id: 'd70-o1',
      kind: 'compose',
      zhHint: '虽小但强。', zhHintEn: 'Small but strong.',
      tokens: ['작지만', '강하다', '작아서', '강해요', '작지', '강한다'],
      composeAnswer: ['작지만', '강하다'],
      successMsg: 'Tori vs Danielle 의 핵심 명제. ~지만 로 승부.',
    },
    {
      id: 'd70-o2',
      kind: 'listen-choice',
      audioKo: '잘했어. 인정할게.',
      successMsg: '✓ Danielle의 인정. 두 명의 화해.',
      choices: [
        { zh: '干得好。我承认。', zhEn: 'Well done. I admit it.', correct: true },
        { zh: '不错。我不服。', zhEn: 'Not bad. I don\'t accept it.', correct: false },
        { zh: '还行。差不多。', zhEn: 'Okay. About the same.', correct: false },
        { zh: '你输了。承认吧。', zhEn: 'You lost. Admit it.', correct: false },
      ],
    },
    {
      id: 'd70-o3',
      kind: 'zh-to-ko',
      zhPrompt: '虽然失误但学到了。', zhPromptEn: 'Made mistakes but learned.',
      successMsg: '"실수했지만 배웠어요." — 과거 ~았/었지만.',
      choices: [
        { ko: '실수했지만 배웠어요.', correct: true },
        { ko: '실수해지만 배웠어요.', correct: false },
        { ko: '실수하지만 배웠어요.', correct: false },
        { ko: '실수했는데 배웠어요.', correct: false },
      ],
    },
    {
      id: 'd70-o4',
      kind: 'particle-error',
      zhHint: '兔子能看到狮子看不到的路。', zhHintEn: 'A rabbit can see paths that a lion cannot.',
      successMsg: '토끼는 (주제) + 사자가 (주어) + 못 보는 (관형절) + 길을 (목적) + 볼 수 있어요.',
      choices: [
        { ko: '토끼는 사자가 못 보는 길을 볼 수 있어요.', correct: true },
        { ko: '토끼는 사자를 못 보는 길을 볼 수 있어요.', correct: false },
        { ko: '토끼가 사자가 못 보는 길이 볼 수 있어요.', correct: false },
        { ko: '토끼는 사자가 못 보는 길에 볼 수 있어요.', correct: false },
      ],
    },
    {
      id: 'd70-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 70 全对. Danielle 과의 첫 웃음.', successMsgEn: '✓ Day 70 all correct. First laugh with Danielle.',
      pairs: [
        { ko: '토론', zh: '辩论', zhEn: 'Debate' },
        { ko: '결정하다', zh: '决定', zhEn: 'Decision' },
        { ko: '다양성', zh: '多样性', zhEn: 'Diversity' },
        { ko: '강하다', zh: '强', zhEn: 'Strong' },
        { ko: '인정하다', zh: '承认', zhEn: 'Admit' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '토론대회 반대편 승. Danielle과의 화해. 70일 만에.',
    preview: '明天 4명이 고속열차로 부산 여행. 첫 국내 여행!', previewEn: 'Tomorrow, 4 of us take the high-speed train to Busan. First domestic trip!',
    stickerId: 'sticker-d70',
    sceneImageUrl: '/images/diary/day-70-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~지만 논쟁에서 어떻게 강력?」「Danielle이 왜 인정했을까?」', carrotHintEn: 'Today\'s carrots: "How is ~지만 powerful in arguments?" "Why did Danielle concede?"',
};
