import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 19 · 병원 · 第一次挂号看医生
 *
 * 剧情：上次药店买的药只压了三天症状又回来了。这次 Haru 拍板：「약국 말고 병원 가자.」
 * 一只穿白大褂的兔护士在前台问："어디 아프세요? 진료 받으실 거예요?"
 * 兔莉拿出外国人登录证："네, 내과 진료 받고 싶어요."
 * 候诊 30 分钟。诊室里一只小猪医生听她描述完症状："열도 좀 있고, 목도 아프네요."
 * Haru 在外面等。结束时兔莉拿着处方单，第一次完整撑过看病流程。
 *
 * 学习目标：内科症状 / 진료 받다 / 名词 + 도 (也)
 * 韩语自审：korean skill PASS (실제 병원 절차 + 증상 표현)
 */
export const day19: ToriDay = {
  day: 19,
  phase: 'expansion',
  title: '병원 · 第一次去内科',
  subtitle: '兔护士问"어디 아프세요?"',
  isCheckpoint: null,
  estimatedMin: 13,

  opening: {
    date: '9월 20일 수요일 오전',
    weather: '首尔 · 阴',
    toriPose: 'sleepy',
    diaryText: `9월 20일，周三上午 9 点。

上次药店买的药只压了三天。
昨晚开始嗓子又痒，
今天早上一开口——声音像被砂纸磨过。

Haru 敲门：「토리, 약국 말고 병원 가자.」
（兔莉，这次别去药店，去医院吧。）

学校附近的「행복내과」(幸福内科)。
玻璃门一推开，
一只穿白大褂的兔护士抬起头。
她的耳朵竖得直直的，
看到我也是兔子，
表情温柔了一点。

"어떻게 오셨어요?"
（怎么过来的？）
"열도 나고, 목도 아파요."
（也发烧，嗓子也疼。）

她递来一张登记表：
"외국인등록증 주세요. 처음 오시는 거죠?"
（请给我外国人登录证。第一次来吧？）

候诊 30 分钟。
诊室里一只小猪医生戴着圆眼镜，
听诊器贴在我背上：
"숨 크게—"
（深呼吸——）

诊断单上写：감기, 인후염。
（感冒, 咽喉炎。）

走出医院，Haru 在门口举着一杯热柚子茶。
"이제 진짜 한국 사람 다 됐네."
（你现在真成韩国人了。）

我笑了。
胡萝卜在背包里点头。`,
  },

  words: [
    {
      id: 'd19-w1',
      korean: '병원',
      hangul: 'byeong-won',
      zh: '医院',
      pos: '名词',
      example: { ko: '병원 가요.', zh: '去医院。' },
      tip: '比药店专业。韩国分诊：내과(内科) / 이비인후과(耳鼻喉) / 치과(牙科)',
    },
    {
      id: 'd19-w2',
      korean: '내과',
      hangul: 'nae-gwa',
      zh: '内科',
      pos: '名词',
      example: { ko: '내과 진료 받고 싶어요.', zh: '我想看内科。' },
      tip: '感冒发烧第一选项。和「외과」(外科) 对应',
    },
    {
      id: 'd19-w3',
      korean: '열',
      hangul: 'yeol',
      zh: '发烧',
      pos: '名词',
      example: { ko: '열이 나요.', zh: '发烧了。' },
      tip: '搭配：~이 나요 (出现)。和 Day 13 的 콧물 / 기침 一组',
    },
    {
      id: 'd19-w4',
      korean: '목',
      hangul: 'mok',
      zh: '喉咙 / 脖子',
      pos: '名词',
      example: { ko: '목이 아파요.', zh: '嗓子疼。' },
      tip: '搭配：~이 아파요 (...疼)。다리(腿) / 머리(头) 都可以替换',
    },
    {
      id: 'd19-w5',
      korean: '아파요',
      hangul: 'a-pa-yo',
      zh: '疼 / 难受',
      pos: '形容词',
      example: { ko: '머리가 아파요.', zh: '头疼。' },
      tip: '动词「아프다」(疼) 的해요体。"哪里疼" = 어디가 아파요?',
    },
    {
      id: 'd19-w6',
      korean: '진료',
      hangul: 'jin-ryo',
      zh: '诊疗',
      pos: '名词',
      example: { ko: '진료 받으세요.', zh: '请就诊。' },
      tip: '받다(接受) + 진료 = 看病。「진료 받다」是固定搭配',
    },
  ],

  dialogue: {
    scene: '행복내과 接待台',
    setting: {
      time: '周三上午 9 点',
      place: '학교 근처 행복내과',
      npc: '兔护士',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '兔护士',
        ko: '안녕하세요. 어디 아프세요?',
        hangul: 'an-nyeong-ha-se-yo. eo-di a-peu-se-yo',
        zh: '您好。哪里不舒服？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '열도 나고, 목도 아파요.',
        hangul: 'yeol-do na-go, mok-do a-pa-yo',
        zh: '也发烧，嗓子也疼。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '兔护士',
        ko: '처음 오시는 거죠? 외국인등록증 주세요.',
        hangul: 'cheo-eum o-si-neun geo-jyo? oe-gu-gin-deung-nok-jeung ju-se-yo',
        zh: '是第一次来吧？请给我外国人登录证。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 여기 있어요.',
        hangul: 'ne, yeo-gi i-sseo-yo',
        zh: '是的，在这里。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '兔护士说"30분 정도 기다려 주세요."(请等 30 分钟左右)，兔莉应该如何回应？',
        practice: 'pick',
        choices: [
          { ko: '네, 알겠습니다.', zh: '好的，明白了。', correct: true },
          { ko: '얼마예요?', zh: '多少钱？', correct: false },
          { ko: '들어오세요.', zh: '请进。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '也...也... · N + 도 + V',
    pattern: '명사 + 도 (列举 "也")',
    whenToUse: '描述多个症状、多种东西、多件事情时。看病时尤其常用——一次说完所有不舒服。',
    rules: [
      '名词 + **도** = 也...：열**도** (也发烧) / 목**도** (嗓子也)',
      '常和 **-고** 连用列举两件事：열**도** 나**고**, 목**도** 아파요',
      '可以替换助词 은/는/이/가/을/를：「커피를 마셔요」+ 「也」→ 「커피도 마셔요」(原助词消失)',
      '注意是用 **도** 替换助词，不是叠加。错误：커피를도 / 커피도를',
    ],
    examples: [
      { ko: '열도 나고, 목도 아파요.', zh: '也发烧，嗓子也疼。', highlight: '도' },
      { ko: '저도 가요.', zh: '我也去。', highlight: '도' },
      { ko: '커피도 주세요.', zh: '也请给我咖啡。', highlight: '도' },
      { ko: '한국어도 공부하고, 영어도 공부해요.', zh: '也学韩语，也学英语。', highlight: '도' },
    ],
    pitfall:
      '韩语描述多症状用「~도 ~고, ~도 ~」连成一串而不是"and"。看医生说「열이 있어요. 그리고 목이 아파요.」语法对但显得断断续续。地道说法是「열도 나고, 목도 아파요.」一气呵成。',
  },

  output: [
    {
      id: 'd19-o1',
      kind: 'compose',
      zhHint: '也发烧，嗓子也疼。',
      tokens: ['열도', '나고', '목도', '아파요', '열이', '있어요'],
      composeAnswer: ['열도', '나고', '목도', '아파요'],
      successMsg: '兔护士在登记表上"啪"地盖了一个章，递回登录证 ✓',
    },
    {
      id: 'd19-o2',
      kind: 'listen-choice',
      audioKo: '어디 아프세요?',
      successMsg: '✓ 「哪里不舒服？」韩国医院前台标准开场。「어디」(哪里) + 「아프다」(疼) 尊敬形。',
      choices: [
        { zh: '哪里不舒服？', correct: true },
        { zh: '哪里来的？', correct: false },
        { zh: '哪里疼？', correct: false },
        { zh: '是第一次来吗？', correct: false },
      ],
    },
    {
      id: 'd19-o3',
      kind: 'zh-to-ko',
      zhPrompt: '我也去。',
      successMsg: '"저도 가요" — 「도」紧跟主语，替换原本的「는/가」。最简单的"也"用法。',
      choices: [
        { ko: '저도 가요.', correct: true },
        { ko: '저는도 가요.', correct: false },
        { ko: '저가도 가요.', correct: false },
        { ko: '저도는 가요.', correct: false },
      ],
    },
    {
      id: 'd19-o4',
      kind: 'particle-error',
      zhHint: '也请给我咖啡。',
      successMsg: '「도」替换原本宾语助词「를」，不能叠加。「커피를도」「커피도를」都是错的。',
      choices: [
        { ko: '커피도 주세요.', correct: true },
        { ko: '커피를도 주세요.', correct: false },
        { ko: '커피도를 주세요.', correct: false },
        { ko: '커피가도 주세요.', correct: false },
      ],
    },
  ],

  recap: {
    toriPose: 'sleepy',
    praise: '第一次自己挂号、第一次完整描述症状。Haru 在门口举着热柚子茶等你。',
    preview: '明天要回到房地产中介确认细节。海豹房东要见我，谈合同的事…',
    stickerId: 'sticker-d19',
  },

  carrotHint:
    '今天的胡萝卜：「韩国병원挂号流程」「描述症状常用句」「N도 用法」',
};
