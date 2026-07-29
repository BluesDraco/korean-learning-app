import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 37 · 훠궈 파티 · 请朋友吃火锅
 *
 * 剧情：Tori用妈妈寄的火锅底料请Minji、Junho、Haru来宿舍。三只动物第一次吃中国火锅，
 * 辣到流泪但停不下来。Junho耳朵通红，Haru默默吃了三碗。Tori看着他们——
 * 家的味道，变成了朋友的味道。
 *
 * 学习目标：제안 ~(으)ㄹ까요? / ~(으)ㄹ래요? / 초대 표현
 * 语料层级：해요体 + 반말（朋友间自由切换）
 * 韩语自审：korean skill PASS
 */
export const day37: ToriDay = {
  level: 'intermediate',
  day: 7,
  phase: 'expansion',
  title: '火锅派对 · 请朋友吃火锅',
  subtitle: '妈妈的味道，变成了朋友的味道',
  heroImageUrl: '/images/diary/day-37-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 10일 · 목요일 저녁',
    weather: '兽尔 · 晴',
    toriPose: 'happy',
    diaryText: `10月10日，周四晚上。

301号房，四个座位。
电磁炉架在小书桌上，锅里红油翻滚。

"우와, 이거 진짜 빨갛다!"（哇，好红！）
Junho盯着锅，尾巴在抖——不知道是兴奋还是害怕。

Minji打开手机准备录视频：
"자, 첫 젓가락은 나야."（好，第一筷子是我。）

Haru安静地把青菜下进锅，
认真得像在做一道数学题。

第一口下去——
Junho的耳朵先红了，然后是脸，然后是——

"매워!!! 물!!!"（辣！！！水！！！）

Minji笑到从椅子上滑下去。
Haru默默盛了第二碗米饭。
她一句话不说，吃了三碗。

我看着他们满头大汗还停不下来的样子——
妈妈说过，想家的时候就煮一锅。
但她没说，这锅可以让思念变成，四个人的笑声。`,
  },

  words: [
    {
      id: 'd37-w1',
      korean: '초대하다',
      hangul: 'cho-dae-ha-da',
      zh: '邀请',
      pos: '动词',
      example: { ko: '친구들을 초대했어요.', zh: '邀请了朋友们。' },
      tip: '초대(招待) + 하다。초대(名词请柬) / 초대하다(动词邀请)',
    },
    {
      id: 'd37-w2',
      korean: '맵다',
      hangul: 'maep-da',
      zh: '辣',
      pos: '形容词',
      example: { ko: '이 국이 너무 매워요.', zh: '这个汤太辣了。' },
      tip: 'ㅂ 不规则：맵다 → 매워요。매워 죽겠어 = 辣死了',
    },
    {
      id: 'd37-w3',
      korean: '땀',
      hangul: 'ttam',
      zh: '汗',
      pos: '名词',
      example: { ko: '땀이 나요.', zh: '出汗了。' },
      tip: '땀이 나다 = 出汗。吃辣、运动都用得上',
    },
    {
      id: 'd37-w4',
      korean: '함께',
      hangul: 'ham-kke',
      zh: '一起',
      pos: '副词',
      example: { ko: '함께 먹으니까 더 맛있어요.', zh: '一起吃更好吃。' },
      tip: '和 같이 意思一样，稍微书面/正式一点',
    },
    {
      id: 'd37-w5',
      korean: '냄새',
      hangul: 'naem-sae',
      zh: '气味/味道',
      pos: '名词',
      example: { ko: '고향 냄새가 나요.', zh: '有家乡的味道。' },
      tip: '냄새가 나다 = 有___的味道。좋은 냄새 / 이상한 냄새',
    },
    {
      id: 'd37-w6',
      korean: '전기 냄비',
      hangul: 'jeon-gi naem-bi',
      zh: '电锅（含电磁炉锅具）',
      pos: '名词',
      example: { ko: '전기 냄비로 훠궈를 끓였어요.', zh: '用电锅煮了火锅。' },
      tip: '전기(电) + 냄비(锅)。宿舍必备',
    },
  ],

  dialogue: {
    scene: '301号房·火锅派对',
    setting: {
      time: '周四晚 7:30',
      place: 'Tori的宿舍',
      npc: 'Junho / Minji / Haru',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '오늘 밤에 우리 집에서 훠궈 먹을래?',
        hangul: 'o-neul ba-me u-ri ji-be-seo hwo-gwo meo-geul-lae?',
        zh: '今晚要来我家吃火锅吗？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '진짜? 나 훠궈 처음 먹어!',
        hangul: 'jin-jja? na hwo-gwo cheo-eum meo-geo!',
        zh: '真的？我第一次吃火锅！',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '몇 시에 갈까?',
        hangul: 'myeot si-e gal-kka?',
        zh: '几点去啊？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '7시 반쯤 올래? 재료 다 준비할게.',
        hangul: 'il-gop-si ban-jjeum ol-lae? jae-ryo da jun-bi-hal-ge',
        zh: '7点半来吧？我把材料都准备好。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '매워… 물… 우유 있어?',
        hangul: 'mae-wo… mul… u-yu i-sseo?',
        zh: '辣……水……有牛奶吗？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Junho满头大汗要牛奶。Tori想安慰他"多吃点米饭就好"。合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '밥이랑 같이 먹으면 괜찮아.', zh: '跟米饭一起吃就好了。', correct: true },
          { ko: '밥 먹지 마.', zh: '不要吃饭。', correct: false },
          { ko: '우유 마시지 마.', zh: '不要喝牛奶。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '要不要一起？：~(으)ㄹ래요? / ~(으)ㄹ까요?',
    pattern: 'V 어간 + **(으)ㄹ래요?** 或 **(으)ㄹ까요?**',
    whenToUse: '朋友之间约饭/发出邀请最刚需的两个句尾。**~(으)ㄹ래요?** = "你要不要___?"（询问对方意愿）；**~(으)ㄹ까요?** = "我们要不要___?"（提议一起做）。Tori 请朋友吃火锅一句 "훠궈 먹을래?" 就把 Day 37 打开了。',
    rules: [
      '**~(으)ㄹ래요? 侧重对方意愿**：너 훠궈 먹을래? = 你要吃火锅吗？主语一般是"你/我"',
      '**~(으)ㄹ까요? 侧重共同提议**：같이 갈까요? = 我们一起去吧？隐含 "우리"',
      '**收音规则**：无收音 → **ㄹ래요/ㄹ까요**（가다 → 갈래요/갈까요）；有收音 → **을래요/을까요**（먹다 → 먹을래요/먹을까요）',
      '**반말 → ~(으)ㄹ래? / ~(으)ㄹ까?**：朋友间去掉요。훠궈 먹을래? / 같이 갈까?'
    ],
    examples: [
      { ko: '훠궈 먹을래?', zh: '要吃火锅吗？', highlight: '먹을래', note: '먹다 有받침 ㄱ → **을래**。반말询问对方意愿。今天的开场句' },
      { ko: '몇 시에 갈까?', zh: '几点去啊？', highlight: '갈까', note: '가다 无받침 → **ㄹ까**。共同提议时间，用 (으)ㄹ까 最自然' },
      { ko: '뭐 마실래요?', zh: '你想喝什么？', highlight: '마실래요', note: '마시다 无받침 → **ㄹ래요**。해요体询问客人偏好' },
      { ko: '같이 산책할까요?', zh: '一起散步吗？', highlight: '산책할까요', note: '산책하다 → 산책할까요。~할까요 提议 + 같이 = 邀约标配' },
    ],
    pitfall:
      '① 두 句尾意思相近但语感不同：~(으)ㄹ래요? 强调**对方**意愿，~(으)ㄹ까요? 强调**共同**行动。约饭多用 ~(으)ㄹ래요?，商量方案多用 ~(으)ㄹ까요?。② ~(으)ㄹ까요? 有两个用法：**提议**时隐含 우리（우리 갈까요? = 我们去吧？）；**推测**时第三人称/天气也自然（그 사람 언제 올까요? = 他什么时候来？／내일 비 올까요? = 明天会下雨吗？）。别以为它只能配"你/我们"。③ 收音判断决定用 ~ㄹ / ~을，和 ~(으)면、~(으)로 一样看末字收音。',
  },

  output: [
    {
      id: 'd37-o1',
      kind: 'compose',
      zhHint: '今晚要来我家吃火锅吗？',
      tokens: ['오늘 밤에', '우리 집에서', '훠궈', '먹을래', '먹을까', '먹었어'],
      composeAnswer: ['오늘 밤에', '우리 집에서', '훠궈', '먹을래'],
      successMsg: '반말的邀请。Tori亲口说的一句。',
    },
    {
      id: 'd37-o2',
      kind: 'listen-choice',
      audioKo: '같이 먹으니까 더 맛있어요.',
      successMsg: '✓ 一起吃更好吃——今天的关键句。',
      choices: [
        { zh: '一起吃更好吃。', correct: true },
        { zh: '一起吃比较累。', correct: false },
        { zh: '一个人吃更好吃。', correct: false },
        { zh: '不能一起吃。', correct: false },
      ],
    },
    {
      id: 'd37-o3',
      kind: 'zh-to-ko',
      zhPrompt: '一起散步吧？',
      successMsg: '"같이 산책할까요?" — 共同提议用 ~(으)ㄹ까요。',
      choices: [
        { ko: '같이 산책할까요?', correct: true },
        { ko: '혼자 산책할까요?', correct: false },
        { ko: '같이 산책까요?', correct: false },
        { ko: '같이 산책하까요?', correct: false },
      ],
    },
    {
      id: 'd37-o4',
      kind: 'particle-error',
      zhHint: '要不要吃点什么？',
      successMsg: '먹다 有받침 ㄱ → **을래요**。~ㄹ / ~을 看收音。',
      choices: [
        { ko: '뭐 먹을래요?', correct: true },
        { ko: '뭐 먹ㄹ래요?', correct: false },
        { ko: '뭐 먹까요?', correct: false },
        { ko: '뭐 먹래요?', correct: false },
      ],
    },
    {
      id: 'd37-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 37 全对。四个人围一锅红油——最好吃的味道。',
      pairs: [
        { ko: '초대하다', zh: '邀请' },
        { ko: '맵다', zh: '辣' },
        { ko: '땀', zh: '汗' },
        { ko: '함께', zh: '一起' },
        { ko: '냄새', zh: '味道' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '엄마의 훠궈가 친구들의 저녁이 됐어요. 토리, 오늘 진짜 최고.',
    preview: '明天，Haru要来教Tori做泡菜炒饭——第一次自己做饭。',
    stickerId: 'sticker-d37',
    sceneImageUrl: '/images/diary/day-37-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~(으)ㄹ래요 和 ~(으)ㄹ까요 什么时候用哪个？」「韩国朋友一起吃饭的礼仪？」',
};
