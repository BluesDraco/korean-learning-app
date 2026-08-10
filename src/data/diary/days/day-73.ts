import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 73 · 부산 해산물 시장 · 활낙지
 *
 * 剧情：四人去釜山海鲜市场。Tori第一次看到活章鱼，触手还在动。她鼓起勇气尝一口——
 * 差点呛到。Haru说"천천히 씹어, 삼키지 마"，语气和Day 13教她吃药时一模一样。
 *
 * 学习目标：주의 표현 ~아/어, ~지 마 (Day 65·67 종합) / 해산물 어휘
 * 语料层级：해요体 + 반말 (친구 사이)
 */
export const day73: ToriDay = {
  level: 'advanced',
  day: 13,
  phase: 'mastery',
  title: '釜山海鲜市场 · 活章鱼',
  subtitle: '"천천히 씹어" — Haru的语气和Day 13一模一样',
  heroImageUrl: '/images/diary/day-73-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 30일 · 토요일 오전',
    weather: '부산 · 맑음',
    toriPose: 'shy',
    diaryText: `11月30日，周六上午 10 点。

釜山扎嘎其市场。海腥味浓得几乎能咬。

每个水缸里都装满了活鱼、活蟹、活章鱼、活贝。Junho 说："저 활낙지, 먹어봐야 돼. 부산 대표야."（那种活章鱼你得尝尝，是釜山的代表。）

我站在装章鱼的箱子前。——八条腿，还在缸底晃。

我深吸一口气。

摆摊的阿姨熟练地捞出一条章鱼。刀落下去很有节奏地切成小段，撒上香油。

盘子端上桌——那些切下来的碎块，还在动。

Haru 把筷子递给我，说：

"천천히 씹어. 삼키지 마."（慢慢嚼，别急着咽。）

——Day 13 我感冒去药店那天，Haru 说过一模一样的语气：

"천천히 마셔. 갑자기 삼키면 안 돼."（慢慢喝，不要一口吞下去。）

从那天到今天，60 天过去了。Haru 还是那个用同一种语气照顾我的人。

我夹起一块，送进嘴里。——章鱼的一条腿在舌尖上抖了一下。

我一直嚼，一直嚼——慢慢的。

第一口的味道：香油＋盐。然后——奇怪地，是甜。

"어때?"（怎么样？）Minji 问。

"...맛있어. 진짜."（……好吃。真的。）`,
  },

  words: [
    {
      id: 'd73-w1',
      korean: '해산물',
      hangul: 'hae-san-mul',
      zh: '海鲜',
      pos: '名词',
      example: { ko: '해산물 시장이에요.', zh: '海鲜市场。' },
      tip: '海(해) + 产(산) + 物(물). 자갈치가 부산 대표',
    },
    {
      id: 'd73-w2',
      korean: '낙지',
      hangul: 'nak-ji',
      zh: '章鱼',
      pos: '名词',
      example: { ko: '활낙지를 먹어봤어요.', zh: '尝了活章鱼。' },
      tip: '활낙지 = 活章鱼. 부산 명물',
    },
    {
      id: 'd73-w3',
      korean: '씹다',
      hangul: 'ssip-da',
      zh: '嚼',
      pos: '动词',
      example: { ko: '천천히 씹어요.', zh: '慢慢嚼。' },
      tip: '씹다 → 씹어요. 활낙지 시 필수',
    },
    {
      id: 'd73-w4',
      korean: '삼키다',
      hangul: 'sam-ki-da',
      zh: '吞',
      pos: '动词',
      example: { ko: '삼키지 마.', zh: '别吞。' },
      tip: '삼키다 → 삼켜요. 활낙지 조심 필수 어',
    },
    {
      id: 'd73-w5',
      korean: '수족관',
      hangul: 'su-jok-gwan',
      zh: '水缸/水族箱',
      pos: '名词',
      example: { ko: '수족관에 낙지가 있어요.', zh: '水缸里有章鱼。' },
      tip: '水(수) + 族(족) + 馆(관). 시장 필수',
    },
    {
      id: 'd73-w6',
      korean: '참기름',
      hangul: 'cham-gi-reum',
      zh: '香油',
      pos: '名词',
      example: { ko: '참기름을 뿌렸어요.', zh: '洒了香油。' },
      tip: '참(真) + 기름(油). 한식 대표 조미료',
    },
  ],

  dialogue: {
    scene: '자갈치 시장·활낙지 앞',
    setting: {
      time: '周六 10:30',
      place: '자갈치 해산물 시장',
      npc: 'Junho / Haru / Minji',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '토리, 활낙지 꼭 먹어봐야 돼. 부산 대표야.',
        hangul: 'to-ri, hwal-nak-ji kkok meo-geo-bwa-ya dwae. bu-san dae-pyo-ya',
        zh: '兔莉，一定要试活章鱼。釜山代表。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '아직 움직이고 있는데… 먹을 수 있을까?',
        hangul: 'a-jik um-ji-gi-go in-neun-de… meo-geul su i-sseul-kka?',
        zh: '还在动……我能吃下去吗？',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '천천히 씹어. 삼키지 마.',
        hangul: 'cheon-cheon-hi ssi-beo. sam-ki-ji ma',
        zh: '慢慢嚼。别吞。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: 'Day 13에 약 먹을 때 톤이랑 똑같아. 하루는 60일 지나도 그대로야.',
        hangul: 'Day 13-e yak meo-geul ttae to-ni-rang ttok-ga-ta. ha-ru-neun 60il ji-na-do geu-dae-ro-ya',
        zh: 'Day 13吃药那语气一模一样。Haru过了60天还是原样。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '알았어. 조심할게. 근데 진짜 맛있네.',
        hangul: 'a-ra-sseo. jo-sim-hal-ge. geun-de jin-jja ma-sit-ne',
        zh: '知道了。小心点。但真的好吃。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Junho问"어때?". Tori想说好吃且愿意再吃一次. 合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '맛있어! 한 조각 더 먹어볼래.', zh: '好吃！再尝一块。', correct: true },
          { ko: '아, 도저히 못 먹겠어.', zh: '啊，真的吃不下。', correct: false },
          { ko: '이제 낙지 얘기 안 할래.', zh: '不聊章鱼了。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '慢慢做 + 别___：~아/어 + ~지 마 (Day 65·67 종합)',
    pattern: 'V + **아/어** (반말 命令) · V + **지 마** (반말 禁止)',
    whenToUse: 'Day 65·67 学过 ~지 마세요 / ~지 마 (禁止). Day 73 = **同一 상황에서의 정+반 지시**. Haru 说 「천천히 **씹어**. **삼키지 마**」= 慢慢嚼。别吞。~아/어 (正면 지시) + ~지 마 (反면 지시) 조합 = 韩语 지도/육아/의료/식사 필수 세트.',
    rules: [
      '**반말 명령 ~아/어**：씹다 → 씹어. 마시다 → 마셔. 命令이지만 부드럽고 친근',
      '**반말 금지 ~지 마**：Day 65·67 学过. 삼키지 마 / 움직이지 마',
      '**세트 사용**: ~아/어 + ~지 마 = 정+반 완성. 천천히 씹어, 삼키지 마 = 慢慢嚼, 别吞',
      '**정중 up → ~(으)세요 + ~지 마세요**: 씹으세요. 삼키지 마세요 (敬语)'
    ],
    examples: [
      { ko: '천천히 씹어. 삼키지 마.', zh: '慢慢嚼。别吞。', highlight: '씹어 ... 삼키지 마', note: 'Haru 활낙지 지시. 정+반 세트' },
      { ko: '조심해서 걸어. 넘어지지 마.', zh: '小心走。别摔。', highlight: '걸어 ... 넘어지지 마', note: 'Day 58 넘어지다 + 걷다 조합' },
      { ko: '약 마셔. 뱉지 마.', zh: '喝药。别吐。', highlight: '마셔 ... 뱉지 마', note: 'Day 13 감기약 상황' },
      { ko: '숨 크게 쉬어. 참지 마.', zh: '深呼吸。别憋。', highlight: '숨 쉬어 ... 참지 마', note: '숨 쉬다 + 참다. 응급 상황' },
    ],
    pitfall:
      '① Day 65 ~지 마세요 (敬语), Day 67·73 ~지 마 (반말). 상황과 관계 판단. ② 반말 명령 ~아/어 = 굉장히 흔함. 친구/자녀에게. ③ 세트 사용의 미학: "천천히 마셔, 삼키지 마" — 정+반 지시가 韩语 지도의 근간. ④ 초급자 자주 실수: ~아/어 命令과 ~아/어요 平叙 헷갈림. 문맥 + 톤으로 구분.',
  },

  output: [
    {
      id: 'd73-o1',
      kind: 'compose',
      zhHint: '慢慢嚼。别吞。',
      tokens: ['천천히', '씹어', '삼키지 마', '삼켜', '천천하게', '삼키지 마세요'],
      composeAnswer: ['천천히', '씹어', '삼키지 마'],
      successMsg: 'Haru의 반말 지시 세트. 정+반의 완성.',
    },
    {
      id: 'd73-o2',
      kind: 'listen-choice',
      audioKo: '활낙지 꼭 먹어봐야 돼. 부산 대표야.',
      successMsg: '✓ Junho 원문. ~아/어야 되다 (Day 49) 활용.',
      choices: [
        { zh: '一定要试活章鱼。釜山代表。', correct: true },
        { zh: '活章鱼不能吃。', correct: false },
        { zh: '釜山没有活章鱼。', correct: false },
        { zh: '活章鱼很难做。', correct: false },
      ],
    },
    {
      id: 'd73-o3',
      kind: 'zh-to-ko',
      zhPrompt: '小心走。别摔。',
      successMsg: '"조심해서 걸어. 넘어지지 마." — 정+반 세트.',
      choices: [
        { ko: '조심해서 걸어. 넘어지지 마.', correct: true },
        { ko: '조심하게 걸어. 넘어져 마.', correct: false },
        { ko: '조심해서 걸어. 안 넘어져.', correct: false },
        { ko: '조심 걸어. 넘어지지 않아.', correct: false },
      ],
    },
    {
      id: 'd73-o4',
      kind: 'particle-error',
      zhHint: '洒了香油。',
      successMsg: '참기름 (末字 름 有收音 ㅁ) + **을** + 뿌리다.',
      choices: [
        { ko: '참기름을 뿌렸어요.', correct: true },
        { ko: '참기름이 뿌렸어요.', correct: false },
        { ko: '참기름에 뿌렸어요.', correct: false },
        { ko: '참기름은 뿌렸어요.', correct: false },
      ],
    },
    {
      id: 'd73-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 73 全对. 활낙지 한 조각, 60일의 톤.',
      pairs: [
        { ko: '해산물', zh: '海鲜' },
        { ko: '낙지', zh: '章鱼' },
        { ko: '씹다', zh: '嚼' },
        { ko: '삼키다', zh: '吞' },
        { ko: '수족관', zh: '水缸' },
      ],
    },
  ],

  recap: {
    toriPose: 'happy',
    praise: '활낙지 도전 성공. 하루의 톤은 60일이 지나도 같아요.',
    preview: '明天 부산 사투리 — "그래"가 "가가"로 들리는 이상한 세계.',
    stickerId: 'sticker-d73',
    sceneImageUrl: '/images/diary/day-73-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~아/어 + ~지 마 언제 세트?」「부산 해산물 어떻게 즐길까?」',
};
