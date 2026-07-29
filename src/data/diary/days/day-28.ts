import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 28 · 偶像签售会 · 对本命说真心话
 *
 * 剧情：Tori一个人去偶像签售会。排队时手里攥着勇气胡萝卜。
 * 轮到她时偶像问名字——她用28天的韩语说了一段话。
 * 偶像在专辑上写："토리 씨, 용기를 내요."（Tori，鼓起勇气。）
 *
 * 学习目标：签售会实战对话 / 感情表达 / 합쇼체+해요体混用
 * 语料层级：해요体（对偶像礼貌但真诚）
 * 韩语自审：korean skill PASS（자연성/문법/조사 三关）
 */
export const day28: ToriDay = {
  level: 'beginner',
  day: 28,
  phase: 'mastery',
  title: '偶像签售会',
  subtitle: '心跳加速，但她说出了最完美的韩语',
  heroImageUrl: '/images/diary/day-28-hero.jpg',
  estimatedMin: 14,

  opening: {
    date: '9월 28일 · 토요일 오후',
    weather: '兽尔 · 晴朗',
    toriPose: 'shy',
    diaryText: `9月28日，周六下午。

签售会。
一个人来的。Junho说他抢不到号。

排队的时候手心全是汗。
我把勇气胡萝卜从包里掏出来，攥在手里。

前面还有三个人。两个人。一个人。

轮到我了。

偶像抬起头，笑着问：
"이름이 뭐예요?"

我深呼吸——
妈妈，胡萝卜，28天。
所有的练习，都是为了这一刻。

"토리예요. 중국에서 왔어요."

我的声音在抖。但每一个字，都说对了。`,
  },

  words: [
    {
      id: 'd28-w1',
      korean: '사인',
      hangul: 'sa-in',
      zh: '签名',
      pos: '名词',
      example: { ko: '사인 해 주세요!', zh: '请签名！' },
      tip: '英语 sign。사인회 = 签售会；사인을 받다 = 拿到签名',
    },
    {
      id: 'd28-w2',
      korean: '앨범',
      hangul: 'ael-beom',
      zh: '专辑',
      pos: '名词',
      example: { ko: '새 앨범 정말 좋아요.', zh: '新专辑真好。' },
      tip: '英语 album。앨범을 사다 = 买专辑',
    },
    {
      id: 'd28-w3',
      korean: '응원해요',
      hangul: 'eung-won-hae-yo',
      zh: '我支持你',
      pos: '表达',
      example: { ko: '항상 응원해요.', zh: '一直支持你。' },
      tip: '응원하다(应援/支持) + 해요体。对偶像说的标准句',
    },
    {
      id: 'd28-w4',
      korean: '감동',
      hangul: 'gam-dong',
      zh: '感动',
      pos: '名词',
      example: { ko: '진짜 감동이에요.', zh: '真的好感动。' },
      tip: '감(感) + 동(动)。감동받다 = 被感动；감동을 주다 = 给予感动',
    },
    {
      id: 'd28-w5',
      korean: '떨려요',
      hangul: 'tteol-lyeo-yo',
      zh: '紧张（发抖）',
      pos: '动词',
      example: { ko: '심장이 떨려요.', zh: '心脏在发抖（紧张得心慌）。' },
      tip: '떨리다(发抖/紧张) → 떨려요。피동형(被动)：떨다→떨리다',
    },
    {
      id: 'd28-w6',
      korean: '진심',
      hangul: 'jin-sim',
      zh: '真心',
      pos: '名词',
      example: { ko: '진심으로 좋아해요.', zh: '真心喜欢。' },
      tip: '진(真) + 심(心)。진심으로 = 真心地。으로 因为 심 有收音ㅁ',
    },
  ],

  dialogue: {
    scene: '签售会·面对偶像',
    setting: {
      time: '周六下午',
      place: '签售会现场',
      npc: '偶像',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '偶像',
        ko: '이름이 뭐예요?',
        hangul: 'i-reu-mi mwo-ye-yo?',
        zh: '你叫什么名字？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '토리예요. 중국에서 왔어요.',
        hangul: 'to-ri-ye-yo. jung-gu-ge-seo wa-sseo-yo.',
        zh: '我叫Tori。从中国来的。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '偶像',
        ko: '한국어 잘하시네요!',
        hangul: 'han-gu-geo jal-ha-si-ne-yo!',
        zh: '韩语说得好啊！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '아니요, 아직 많이 부족해요. 근데 진짜 좋아해요.',
        hangul: 'a-ni-yo, a-jik ma-ni bu-jo-kae-yo. geun-de jin-jja jo-a-hae-yo.',
        zh: '不，还差很多。但是真的好喜欢。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '떨려… 당근 잡아… 할 수 있어…',
        hangul: 'tteol-lyeo… dang-geun ja-ba… hal su i-sseo…',
        zh: '好紧张……抓住胡萝卜……可以的……',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '응원해요. 건강하세요.',
        hangul: 'eung-won-hae-yo. geon-gang-ha-se-yo.',
        zh: '我支持你。请保重。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '偶像',
        ko: '토리 씨, 용기를 내요.',
        hangul: 'to-ri ssi, yong-gi-reul nae-yo.',
        zh: 'Tori，鼓起勇气。',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: '偶像在专辑上写了话递给Tori。Tori接过专辑，应该怎么说？',
        practice: 'pick',
        choices: [
          { ko: '진짜 감사합니다. 평생 잊지 못할 거예요.', zh: '真的感谢。一辈子不会忘。', correct: true },
          { ko: '앨범 얼마예요?', zh: '专辑多少钱？', correct: false },
          { ko: '다음에 또 올게요.', zh: '下次再来。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '签售会 5 句 · 팬사인회 실전',
    pattern: '자기소개 → 칭찬 응답 → 진심 고백 → 응원 → 감사',
    whenToUse: '韩国签售会（팬사인회）30秒内要跟偶像说完所有想说的话。Day 28 Tori用了5步：自我介绍→谦虚回应→真心表白→应援→感谢。每一步都有对应的固定表达。',
    rules: [
      '**자기소개 自我介绍**："토리예요. 중국에서 왔어요." 简短自我介绍。이름 + 예요/이에요 + 出身',
      '**칭찬 응답 谦虚回应**：偶像夸你韩语好 → "아니요, 아직 많이 부족해요." 韩式谦虚回应。부족하다 = 不够/不足',
      '**진심 고백 真心表白**："진짜 좋아해요." / "진심으로 응원해요." 表达真心喜欢/支持。근데(但是) 转折后说真心话',
      '**응원 支持**："응원해요. 건강하세요." 支持+祝健康。건강하세요 = 해요体命令（请保重）',
      '**감사 感谢**："진짜 감사합니다. 평생 잊지 못할 거예요." 합쇼체最高感谢 + 잊지 못하다(无法忘记)',
      '**건강하세요 用法**：건강하다(健康) + 세요(尊敬命令) = 请保重/保持健康。分别时的祝福语',
      '**평생 잊지 못할 거예요**：평생(一辈子) + 잊다(忘) + 지 못하다(无法·本 Day 首次学，Day 30 会复习) + ㄹ 거예요(将来) = 一辈子不会忘',
    ],
    examples: [
      { ko: '토리예요. 중국에서 왔어요.', zh: '我叫Tori。从中国来的。', highlight: '예요 ... 에서', note: '토리 无收音→예요；중국 有收音ㄱ→에서(从)。30秒自我介绍精华' },
      { ko: '아직 많이 부족해요.', zh: '还差很多。', highlight: '부족해요', note: '부족하다(不足) → 해요。韩式谦虚：被夸时先否认再说真心话' },
      { ko: '진심으로 좋아해요.', zh: '真心喜欢你。', highlight: '진심으로', note: '진심(真心) 有收音ㅁ → 으로（手段/方式）。对偶像表白的最高表达' },
      { ko: '응원해요. 건강하세요.', zh: '支持你。请保重。', highlight: '건강하세요', note: '건강하다 + 세요(尊敬命令)。签售会结束时的标准祝福' },
      { ko: '평생 잊지 못할 거예요.', zh: '一辈子不会忘。', highlight: '잊지 못할', note: '잊다(忘) + 지 못하다(无法) + ㄹ 거예요(将来推测)。最强感动表达' },
    ],
    pitfall:
      '① 부족해요 不是"坏"的意思，是"不够/不足"——韩式谦虚用语，不是自我贬低。② 건강하세요 只对平辈或年长者用（祝福）。对年幼者说 건강해 就行。③ 평생 잊지 못할 거예요 中的 못 不能换成 안：안 잊을 거예요 = 不打算忘（意志）；못 잊을 거예요 = 无法忘（能力）。签售会要用 못（太感动忘不了）。',
  },

  output: [
    {
      id: 'd28-o1',
      kind: 'compose',
      zhHint: '真的感谢。一辈子不会忘。',
      tokens: ['진짜', '감사합니다', '평생', '잊지', '못할', '거예요', '좋아해요'],
      composeAnswer: ['진짜', '감사합니다', '평생', '잊지', '못할', '거예요'],
      successMsg: '진짜 감사합니다. 평생 잊지 못할 거예요. — 偶像看着Tori笑了。',
    },
    {
      id: 'd28-o2',
      kind: 'compose',
      zhHint: '我支持你。请保重。',
      tokens: ['응원해요', '건강하세요', '사랑해요', '감사해요', '안녕하세요'],
      composeAnswer: ['응원해요', '건강하세요'],
      successMsg: '응원해요. 건강하세요. — 签售会最温暖的两句话。',
    },
    {
      id: 'd28-o3',
      kind: 'listen-choice',
      audioKo: '토리 씨, 용기를 내요.',
      successMsg: '✓ 용기를 내다 = 鼓起勇气。偶像写给Tori的话——和Day 1妈妈的胡萝卜呼应。',
      choices: [
        { zh: 'Tori，鼓起勇气。', correct: true },
        { zh: 'Tori，再见。', correct: false },
        { zh: 'Tori，你好。', correct: false },
        { zh: 'Tori，谢谢。', correct: false },
      ],
    },
    {
      id: 'd28-o4',
      kind: 'zh-to-ko',
      zhPrompt: '还差很多。但是真的好喜欢。',
      successMsg: '"아직 많이 부족해요. 근데 진짜 좋아해요." — 谦虚+真心，完美。',
      choices: [
        { ko: '아직 많이 부족해요. 근데 진짜 좋아해요.', correct: true },
        { ko: '잘해요. 근데 좋아해요.', correct: false },
        { ko: '아직 부족해요. 그래서 싫어해요.', correct: false },
        { ko: '많이 부족합니다. 하지만 좋아합니다.', correct: false },
      ],
    },
    {
      id: 'd28-o5',
      kind: 'match-pair',
      successMsg: '✓ 通过！Tori用28天的韩语，对本命说了真心话。',
      pairs: [
        { ko: '사인', zh: '签名' },
        { ko: '앨범', zh: '专辑' },
        { ko: '응원해요', zh: '我支持你' },
        { ko: '감동', zh: '感动' },
        { ko: '진심', zh: '真心' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '🎤 미션 4 클리어! 최애한테 진심을 전했어요. 토리, 정말 대단해요!',
    preview: '还剩两天——Day 29 打开妈妈塞的日记本，用韩语写第一篇。过去时来了。',
    stickerId: 'sticker-d28',
    sceneImageUrl: '/images/diary/day-28-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「签售会30秒怎么安排5句话？」「평생 잊지 못할 거예요怎么拆解？」',
};
