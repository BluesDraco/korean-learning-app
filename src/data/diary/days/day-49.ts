import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 49 · 화해 · 说真心话
 *
 * 剧情：Minji和Junho因为小组作业吵翻了冷战三天。Tori第一次站出来调解——用韩语说真心话，
 * 把两个人都说哭了。三人在教室里抱成一团。Tori觉得自己终于不只是"被照顾的那个"。
 *
 * 学习目标：당위 ~아/어야 하다 / 화해 표현 / 진심 어휘
 * 语料层级：해요体 + 반말 (진심 대화)
 * 韩语自审：korean skill PASS
 */
export const day49: ToriDay = {
  level: 'intermediate',
  day: 19,
  phase: 'expansion',
  title: '调解矛盾 · 说真心话',
  subtitle: '第一次站出来——韩语说出的一句真心话',
  heroImageUrl: '/images/diary/day-49-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 21일 · 월요일 저녁',
    weather: '兽尔 · 阴',
    toriPose: 'shy',
    diaryText: `10月21日，周一晚上。

Minji和Junho冷战第三天了。
起因是上周小组作业——
两个人对PPT主题吵翻了。

三天里教室气氛尴尬到——
Haru都不敢和他们同时说话。

我今天决定站出来。

放学后我把两个人拦在教室：
"둘 다 조금만 앉아 봐."（两位坐一下。）

Minji翻了个白眼。
Junho手插口袋不看我。

我深呼吸，用韩语说：

"둘 다 나 도와줬잖아.
민지는 나 공항에서 살려줬고,
준호는 반장으로 매일 챙겨줬어.
근데 지금 이렇게 싸우는 거, 나는 너무 슬퍼.
서로 사과해야 돼."

（你们俩都帮过我。
Minji在机场救过我，
Junho作为班长每天照顾我。
但你们现在这样吵，我真的很难过。
你们应该互相道歉。）

Minji先掉眼泪。
然后Junho也红了眼睛。

"미안해."两个人几乎同时说。

然后三个人在教室后排抱成一团。
Haru在门口探头，看到这一幕，
默默拿出手机拍了张照。

回家路上我一直在想——
30天前我连点单都要看词典，
50天后，我用韩语调解了朋友的冷战。

我，
终于不只是"被照顾的那只兔子"了。`,
  },

  words: [
    {
      id: 'd49-w1',
      korean: '싸우다',
      hangul: 'ssa-u-da',
      zh: '吵架/打架',
      pos: '动词',
      example: { ko: '민지랑 준호가 싸웠어요.', zh: 'Minji和Junho吵架了。' },
      tip: '~와/과 싸우다 = 和___吵架。과거: 싸웠어요',
    },
    {
      id: 'd49-w2',
      korean: '사과하다',
      hangul: 'sa-gwa-ha-da',
      zh: '道歉',
      pos: '动词',
      example: { ko: '먼저 사과했어요.', zh: '先道歉了。' },
      tip: '사과(道歉/苹果都是这个词) + 하다。두 뜻 있음 주의',
    },
    {
      id: 'd49-w3',
      korean: '화해하다',
      hangul: 'hwa-hae-ha-da',
      zh: '和好',
      pos: '动词',
      example: { ko: '두 사람이 화해했어요.', zh: '两人和好了。' },
      tip: '和(화) + 解(해) + 하다。汉字词',
    },
    {
      id: 'd49-w4',
      korean: '진심',
      hangul: 'jin-sim',
      zh: '真心',
      pos: '名词',
      example: { ko: '진심으로 미안해.', zh: '真心抱歉。' },
      tip: '真(진) + 心(심)。진심으로 = 真心地',
    },
    {
      id: 'd49-w5',
      korean: '슬프다',
      hangul: 'seul-peu-da',
      zh: '难过/悲伤',
      pos: '形容词',
      example: { ko: '너무 슬퍼요.', zh: '太难过了。' },
      tip: '으 脱落：슬프다 → 슬퍼요',
    },
    {
      id: 'd49-w6',
      korean: '서로',
      hangul: 'seo-ro',
      zh: '互相',
      pos: '副词',
      example: { ko: '서로 사과하세요.', zh: '请互相道歉。' },
      tip: '서로 돕다 = 互相帮助。二人以上时用',
    },
  ],

  dialogue: {
    scene: '교실 뒤편·조정',
    setting: {
      time: '周一 17:30',
      place: '중급반 교실 뒤편',
      npc: 'Minji / Junho',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '둘 다 조금만 앉아 봐. 얘기 좀 하자.',
        hangul: 'dul da jo-geum-man an-ja bwa. yae-gi jom ha-ja',
        zh: '你们俩坐一下。说说话。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '둘 다 나 도와줬잖아. 근데 지금 싸우는 거, 나는 너무 슬퍼.',
        hangul: 'dul da na do-wa-jwot-ja-na. geun-de ji-geum ssa-u-neun geo, na-neun neo-mu seul-peo',
        zh: '你们俩都帮过我。但现在这样吵，我真的很难过。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '친구니까 서로 사과해야 돼.',
        hangul: 'chin-gu-ni-kka seo-ro sa-gwa-hae-ya dwae',
        zh: '既然是朋友就应该互相道歉。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '…나도 잘못했어. 미안해, 준호야.',
        hangul: 'na-do jal-mot-hae-sseo. mi-an-hae, jun-ho-ya',
        zh: '……我也有错。对不起，Junho。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '아니야, 내가 먼저 미안해.',
        hangul: 'a-ni-ya, nae-ga meon-jeo mi-an-hae',
        zh: '不，我先说对不起。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '两人道歉抱在一起。Tori想说"我今天真的以你们为骄傲"。合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '너희 둘이 진짜 자랑스러워.', zh: '你们俩真让我骄傲。', correct: true },
          { ko: '아직 다 끝난 게 아니야.', zh: '还没完呢。', correct: false },
          { ko: '이제 나가.', zh: '现在出去。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '应该___：~아/어야 하다 / 돼요',
    pattern: 'V/A + **아/어야 하다** · **아/어야 돼요** (口语)',
    whenToUse: '「必须/应该做___」的义务/建议句尾。Tori 说 「서로 사과**해야 돼**」= 应该互相道歉。~아/어야 하다 = 应该/必须。日常口语更常用 **~아/어야 돼요**（同义）。劝人、下决心、说规则都必用。',
    rules: [
      '**基本公式**：V/A + 아/어야 하다/돼요。아/어 变形同해요体。먹다→먹**어야** / 자다→자**야** / 하다→**해야**',
      '**하다 vs 돼요**：文语/书面用 **하다**；口语用 **돼요**（더 자연스러움）。두 개 다 맞음',
      '**否定 → 안 ~아/어야 돼요**：싸우지 않아야 돼요 = 不应该吵架。或用 ~(으)면 안 돼요',
      '**과거 → ~아/어야 했어요**：어제 도서관에 가야 했어요 = 昨天本应该去图书馆'
    ],
    examples: [
      { ko: '서로 사과해야 돼.', zh: '应该互相道歉。', highlight: '사과해야 돼', note: '사과하다 → **사과해야 돼**(반말口语)。Tori 的劝解原句' },
      { ko: '학생은 열심히 공부해야 해요.', zh: '学生应该努力学习。', highlight: '공부해야 해요', note: '공부하다 → **공부해야 해요**(하다版)' },
      { ko: '지금 자야 돼요. 내일 시험이에요.', zh: '现在该睡了。明天有考试。', highlight: '자야 돼요', note: '자다 无收音 → **자야 돼요**。자기 다짐' },
      { ko: '한국어를 잘하려면 매일 연습해야 돼요.', zh: '想说好韩语就得每天练。', highlight: '연습해야 돼요', note: '~(으)려면 + ~아/어야 돼요 = 想要__就得__。学习法金句' },
    ],
    pitfall:
      '① **하다 vs 돼요** 都对。书面/正式(하다)、口语(돼요)。混着用没关系但风格要一致。② 否定不是 "~아/어야 하지 않아요" (X)，而是 **"~(으)면 안 돼요"**（不能）或 **"~아/어야만 해요"**（一定要）。③ 반말去掉요即可：해야 돼 / 해야 해。④ **~아/어야 되다**是 **돼**（不是 되），母语者写错也常见。',
  },

  output: [
    {
      id: 'd49-o1',
      kind: 'compose',
      zhHint: '既然是朋友就应该互相道歉。',
      tokens: ['친구니까', '서로', '사과해야', '돼', '사과하고', '사과할래'],
      composeAnswer: ['친구니까', '서로', '사과해야', '돼'],
      successMsg: 'Tori 调解的关键一句。~아/어야 돼 = 应该。',
    },
    {
      id: 'd49-o2',
      kind: 'listen-choice',
      audioKo: '진심으로 미안해.',
      successMsg: '✓ 真心道歉的一句。반말真诚版.',
      choices: [
        { zh: '真心抱歉。', correct: true },
        { zh: '不好意思迟到了。', correct: false },
        { zh: '我不知道。', correct: false },
        { zh: '没事了。', correct: false },
      ],
    },
    {
      id: 'd49-o3',
      kind: 'zh-to-ko',
      zhPrompt: '想说好韩语就得每天练。',
      successMsg: '"한국어를 잘하려면 매일 연습해야 돼요." — ~(으)려면 + ~아/어야 돼요.',
      choices: [
        { ko: '한국어를 잘하려면 매일 연습해야 돼요.', correct: true },
        { ko: '한국어가 잘하려면 매일 연습해야 돼요.', correct: false },
        { ko: '한국어를 잘하면 매일 연습해야 돼요.', correct: false },
        { ko: '한국어를 잘하려면 매일 연습하야 돼요.', correct: false },
      ],
    },
    {
      id: 'd49-o4',
      kind: 'particle-error',
      zhHint: '现在该睡了。',
      successMsg: '자다 无收音 → **자야 돼요**。아 변형이 자연스러움.',
      choices: [
        { ko: '지금 자야 돼요.', correct: true },
        { ko: '지금 자아야 돼요.', correct: false },
        { ko: '지금 잠야 돼요.', correct: false },
        { ko: '지금 자야 되요.', correct: false },
      ],
    },
    {
      id: 'd49-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 49 全对。50天后，你用韩语调解了朋友。',
      pairs: [
        { ko: '싸우다', zh: '吵架' },
        { ko: '사과하다', zh: '道歉' },
        { ko: '화해하다', zh: '和好' },
        { ko: '진심', zh: '真心' },
        { ko: '서로', zh: '互相' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '한국어로 화해를 도왔어요. 이제 도움받는 사람이 아니라, 힘이 되는 사람.',
    preview: '明天兽尔动物城下初雪——初雪许愿会成真？',
    stickerId: 'sticker-d49',
    sceneImageUrl: '/images/diary/day-49-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~아/어야 돼요 和 ~아/어야 해요 有什么区别？」「진심으로 미안해 更真诚吗？」',
};
