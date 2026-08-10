import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 53 · 회식 두 번째 · 이번엔 Tori 请客
 *
 * 剧情：Tori终于请客了。四个人去吃炸鸡。她用韩语点单、结账、说请客话——全套无障碍。
 * Day 27说的"下次我请"，今天来了。从被请到请人，中间隔了26天。
 *
 * 学习目标：약속·承诺 ~(으)ㄹ게요 深化 / 회식 어휘
 * 语料层级：해요体 + 반말（朋友间）
 * 韩语自审：korean skill PASS
 */
export const day53: ToriDay = {
  level: 'intermediate',
  day: 23,
  phase: 'expansion',
  title: '聚餐第二轮 · 这次Tori请客',
  subtitle: 'Day 27 说过的"下次我请"，今天兑现了',
  heroImageUrl: '/images/diary/day-53-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 25일 · 금요일 저녁',
    weather: '兽尔 · 秋晴',
    toriPose: 'proud',
    diaryText: `10月25日，周五晚上。

弘爪街拐角的BBQ치킨。
四个人围一桌。

Day 27 Minji 说的那句
"다음에 토리가 사"（下次兔莉请）——
今天来了。

菜单来的时候，我说：

"이모, 반반 한 마리랑 감튀 하나, 콜라 두 잔 주세요."

（阿姨，半半炸鸡一份，薯条一份，可乐两杯。）

服务员大鹦鹉阿姨点头："예, 알겠습니다."

我抬眼看他们三个——
Junho举起杯子笑："와, 이제 프로다."
（哇，现在专业了。）

炸鸡上桌，
所有人扑上去开始撕鸡腿。

结账时，我走到收银台：
"카드로 결제할게요. 앞으로 반씩 나눠서."
（我刷卡，之后大家AA也行——但今天算我请。）

其实我心里已经想好了。
出来外面，Minji拥着我肩膀说：

"토리, 진짜 성장했다."
（兔莉，真的成长了。）

我笑着说：

"응, 다음엔 진짜 너희들이 사."
（嗯，下次真的换你们请。）

Day 27 到 Day 53——26 天。
从被请客到请客，
就是这么久。`,
  },

  words: [
    {
      id: 'd53-w1',
      korean: '치킨',
      hangul: 'chi-kin',
      zh: '炸鸡',
      pos: '名词',
      example: { ko: '치킨 한 마리 주세요.', zh: '来一只炸鸡。' },
      tip: '英语 chicken 外来语。半半 = 반반 (原味+调味各半)',
    },
    {
      id: 'd53-w2',
      korean: '한 마리',
      hangul: 'han ma-ri',
      zh: '一只（动物量词）',
      pos: '表达',
      example: { ko: '치킨 한 마리 주세요.', zh: '来一只炸鸡。' },
      tip: '마리 = 动物计量单位。두 마리 = 两只',
    },
    {
      id: 'd53-w3',
      korean: '한턱 내다',
      hangul: 'han-teok nae-da',
      zh: '请客',
      pos: '表达',
      example: { ko: '오늘은 내가 한턱 낼게.', zh: '今天我请客。' },
      tip: 'Day 27 学过。这次是Tori自己说的',
    },
    {
      id: 'd53-w4',
      korean: '결제하다',
      hangul: 'gyeol-je-ha-da',
      zh: '结账/结算',
      pos: '动词',
      example: { ko: '카드로 결제할게요.', zh: '刷卡结账。' },
      tip: '결제 = 決濟（决济）。카드/현금 결제 = 刷卡/现金结账',
    },
    {
      id: 'd53-w5',
      korean: '이모',
      hangul: 'i-mo',
      zh: '阿姨（餐厅称呼）',
      pos: '名词',
      example: { ko: '이모, 여기 물 좀 주세요.', zh: '阿姨，来点水。' },
      tip: '本义姨母。餐厅对中年女服务员的亲切叫法',
    },
    {
      id: 'd53-w6',
      korean: '성장하다',
      hangul: 'seong-jang-ha-da',
      zh: '成长',
      pos: '动词',
      example: { ko: '토리, 진짜 성장했다.', zh: '兔莉，真的成长了。' },
      tip: '成(성) + 长(장) + 하다。Minji가 오늘 말한 그 한마디',
    },
  ],

  dialogue: {
    scene: 'BBQ치킨·주문·결제',
    setting: {
      time: '周五 19:00',
      place: '弘爪街 BBQ 치킨점',
      npc: '大鹦鹉阿姨 / Minji / Junho',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '이모, 반반 한 마리랑 감튀 하나, 콜라 두 잔 주세요.',
        hangul: 'i-mo, ban-ban han ma-ri-rang gam-twi ha-na, kol-la du jan ju-se-yo',
        zh: '阿姨，半半炸鸡一份、薯条一份、可乐两杯。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '大鹦鹉阿姨',
        ko: '예, 반반 한 마리, 감튀, 콜라 두 잔이요.',
        hangul: 'ye, ban-ban han ma-ri, gam-twi, kol-la du ja-ni-yo',
        zh: '好，半半炸鸡一份、薯条、可乐两杯。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '와, 이제 프로다. 완전 자연스러워.',
        hangul: 'wa, i-je peu-ro-da. wan-jeon ja-yeon-seu-reo-wo',
        zh: '哇，现在专业了。完全自然。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '오늘은 내가 낼게. Day 27에 민지가 사줬으니까.',
        hangul: 'o-neu-reun nae-ga nael-ge. Day 27-e min-ji-ga sa-jwo-sseu-ni-kka',
        zh: '今天我请。Day 27 Minji 请过。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '토리, 진짜 성장했다.',
        hangul: 'to-ri, jin-jja seong-jang-haet-da',
        zh: '兔莉，真的成长了。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Minji说"你真的成长了"。Tori想回应"下次真的换你们请"。合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '응, 다음엔 진짜 너희들이 사.', zh: '嗯，下次真的换你们请。', correct: true },
          { ko: '아니, 아직 성장 안 했어.', zh: '不，还没成长。', correct: false },
          { ko: '내가 계속 살게.', zh: '我一直请下去。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '承诺我来___：~(으)ㄹ게요（深化）',
    pattern: 'V 어간 + **(으)ㄹ게요** (반말: **(으)ㄹ게**)',
    whenToUse: '~(으)ㄹ게요 = "我来___/我会___"的承诺句尾。Day 27 学过（다음에 내가 살게） Day 53 深化——发出"我来做"承诺时用它。**只用主语 = 我**（不能用于第三人称）。请客/主动承担/许诺都是 ~(으)ㄹ게요 的舞台。',
    rules: [
      '**基本公式**：V + (으)ㄹ게요。收音判断：无收音 + **ㄹ게요**（사다→살게요）；有收音 + **을게요**（먹다→먹을게요）',
      '**주어 = 나/저 만**：❌ 준호가 살게요 → ✅ 준호가 살 거예요。~(으)ㄹ게요 只对自己 발화',
      '**반말 → ~(으)ㄹ게**：내가 살게 = 我来买。Tori와 친구들 사이',
      '**같은 뜻 형태 ~(으)ㄹ 거예요 (计划) vs ~(으)ㄹ게요 (承诺)**：내일 갈 거예요 (私 예정) vs 내일 갈게요 (당신에게 약속)'
    ],
    examples: [
      { ko: '오늘은 내가 살게.', zh: '今天我请。', highlight: '내가 살게', note: '사다 → 살게(반말). Tori 请客承诺原句' },
      { ko: '카드로 결제할게요.', zh: '我用卡结账。', highlight: '결제할게요', note: '결제하다 → 결제할게요. 결제 상황 常用' },
      { ko: '내일 꼭 갈게요.', zh: '明天一定去。', highlight: '갈게요', note: '가다 无收音 → **갈게요**. 承诺赴约' },
      { ko: '이건 내가 도와줄게.', zh: '这个我帮你。', highlight: '도와줄게', note: '도와주다 → 도와줄게. 主动承担' },
    ],
    pitfall:
      '① **주어 = 我**：~(으)ㄹ게요 只有主语是 나/저 时用。想说别人要做用 ~(으)ㄹ 거예요 (推测/计划)。② ~(으)ㄹ게요 vs ~(으)ㄹ 거예요 —— 承诺用 ~(으)ㄹ게요（听众为对象），计划用 ~(으)ㄹ 거예요（客观预告）。③ ㄹ 收音特殊：만들다 → 만들**게요**（不重复ㄹ）。④ 반말去掉요即可：살게、갈게、도와줄게。',
  },

  output: [
    {
      id: 'd53-o1',
      kind: 'compose',
      zhHint: '今天我请。',
      tokens: ['오늘은', '내가', '살게', '샀어', '살까', '내가는'],
      composeAnswer: ['오늘은', '내가', '살게'],
      successMsg: 'Day 27 를 갚는 한 문장. ~(으)ㄹ게 承诺.',
    },
    {
      id: 'd53-o2',
      kind: 'listen-choice',
      audioKo: '토리, 진짜 성장했다.',
      successMsg: '✓ Minji 认可 Tori 的一句。과거 감탄.',
      choices: [
        { zh: '兔莉，真的成长了。', correct: true },
        { zh: '兔莉，还没成长。', correct: false },
        { zh: '兔莉，快成长啊。', correct: false },
        { zh: '兔莉，没变。', correct: false },
      ],
    },
    {
      id: 'd53-o3',
      kind: 'zh-to-ko',
      zhPrompt: '这个我帮你。',
      successMsg: '"이건 내가 도와줄게." — 도와주다 → 도와줄게 (반말 승낙).',
      choices: [
        { ko: '이건 내가 도와줄게.', correct: true },
        { ko: '이건 내가 도와줄 거야.', correct: false },
        { ko: '이건 내가 도와줄까?', correct: false },
        { ko: '이건 네가 도와줄게.', correct: false },
      ],
    },
    {
      id: 'd53-o4',
      kind: 'particle-error',
      zhHint: '我用卡结账。',
      successMsg: '결제하다 → **결제할게요**。ㄹ게요 承诺 + 로 (工具助词).',
      choices: [
        { ko: '카드로 결제할게요.', correct: true },
        { ko: '카드로 결제하겠어요.', correct: false },
        { ko: '카드에 결제할게요.', correct: false },
        { ko: '카드로 결제하을게요.', correct: false },
      ],
    },
    {
      id: 'd53-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 53 全对。Day 27 → Day 53. 26天，请客换人。',
      pairs: [
        { ko: '치킨', zh: '炸鸡' },
        { ko: '한턱 내다', zh: '请客' },
        { ko: '결제하다', zh: '结账' },
        { ko: '이모', zh: '阿姨（服务员）' },
        { ko: '성장하다', zh: '成长' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: 'Day 27 → Day 53. 오늘, 처음 한턱 냈어요.',
    preview: '明天Minji带你去동물문市场，学会讨价还价。',
    stickerId: 'sticker-d53',
    sceneImageUrl: '/images/diary/day-53-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~(으)ㄹ게요 和 ~(으)ㄹ 거예요 什么时候用？」「餐厅怎么叫服务员？」',
};
