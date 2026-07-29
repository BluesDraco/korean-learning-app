import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 29 · 过去时 · 韩语日记的开始
 *
 * 剧情：Tori翻出妈妈塞进背包的牛皮日记本——28天没动过。
 * 她用韩语写第一篇日记，回顾这一个月。最后一句："저는 용기를 냈어요."
 *
 * 学习目标：过去时 ~았/었어요 三规则 / 日记写作表达
 * 语料层级：해요体 过去时（日记体）
 * 韩语自审：korean skill PASS（자연성/문법/활용 三关）
 */
export const day29: ToriDay = {
  level: 'beginner',
  day: 29,
  phase: 'mastery',
  title: '过去时 · 韩语日记的开始',
  subtitle: '日记本翻开第一页',
  heroImageUrl: '/images/diary/day-29-hero.jpg',
  estimatedMin: 13,

  opening: {
    date: '9월 29일 · 일요일 오후',
    weather: '兽尔 · 小雨',
    toriPose: 'shy',
    diaryText: `9月29日，周日下午。下着小雨。

从背包最里层翻出一个牛皮日记本。
妈妈塞进去的——28天一直没打开过。

封面已经被背包带磨出了痕迹。
沉甸甸的。

我坐在新家的窗前，
打开第一页，拿起那根胡萝卜笔。

第一次，用韩语写日记。

"오늘은 비가 왔어요."
（今天下雨了。）

写完一整页。
最后一句：
"저는 용기를 냈어요."
（我鼓起了勇气。）`,
  },

  words: [
    {
      id: 'd29-w1',
      korean: '갔어요',
      hangul: 'ga-sseo-yo',
      zh: '去了',
      pos: '动词',
      example: { ko: '어제 학교에 갔어요.', zh: '昨天去学校了。' },
      tip: '가다 → 갔어요。가+았어요 缩合 = 갔어요（ㅏ+ㅏ=ㅏ+쌍시옷）',
    },
    {
      id: 'd29-w2',
      korean: '먹었어요',
      hangul: 'meo-geo-sseo-yo',
      zh: '吃了',
      pos: '动词',
      example: { ko: '삼겹살을 먹었어요.', zh: '吃了五花肉。' },
      tip: '먹다 → 먹었어요。먹 末元音ㅓ → 었어요',
    },
    {
      id: 'd29-w3',
      korean: '했어요',
      hangul: 'hae-sseo-yo',
      zh: '做了',
      pos: '动词',
      example: { ko: '공부했어요.', zh: '学习了。' },
      tip: '하다 → 했어요。하+였어요 缩合 = 했어요。所有하다类都这样',
    },
    {
      id: 'd29-w4',
      korean: '왔어요',
      hangul: 'wa-sseo-yo',
      zh: '来了/（雨）下了',
      pos: '动词',
      example: { ko: '비가 왔어요.', zh: '下雨了。' },
      tip: '오다 → 왔어요。오+았어요 → 왔어요（ㅗ+ㅏ=ㅘ+쌍시옷）',
    },
    {
      id: 'd29-w5',
      korean: '즐거웠어요',
      hangul: 'jeul-geo-wo-sseo-yo',
      zh: '愉快（过去）',
      pos: '形容词',
      example: { ko: '정말 즐거웠어요.', zh: '真的很开心。' },
      tip: '즐겁다 ㅂ불규칙 → 즐거우+었어요 = 즐거웠어요',
    },
    {
      id: 'd29-w6',
      korean: '떨었어요',
      hangul: 'tteo-reo-sseo-yo',
      zh: '紧张了（发抖了）',
      pos: '动词',
      example: { ko: '비행기에서 떨었어요.', zh: '在飞机上紧张了。' },
      tip: '떨다 → 떨었어요。떨 末元音ㅓ → 었어요',
    },
  ],

  dialogue: {
    scene: '新家窗前·写日记',
    setting: {
      time: '周日下午',
      place: '兔莉的新家·窗前',
      npc: '（独白·日记体）',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '오늘은 비가 왔어요.',
        hangul: 'o-neu-reun bi-ga wa-sseo-yo.',
        zh: '今天下雨了。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '어제 친구들이랑 삼겹살을 먹었어요.',
        hangul: 'eo-je chin-gu-deu-ri-rang sam-gyeop-sa-reul meo-geo-sseo-yo.',
        zh: '昨天和朋友们吃了五花肉。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '민지가 한턱 냈어요.',
        hangul: 'min-ji-ga han-teok nae-sseo-yo.',
        zh: 'Minji请了客。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '정말 즐거웠어요.',
        hangul: 'jeong-mal jeul-geo-wo-sseo-yo.',
        zh: '真的很开心。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '28일 전 비행기에서 떨었어요. 근데 지금은…',
        hangul: 'i-sip-pal-il jeon bi-haeng-gi-e-seo tteo-reo-sseo-yo. geun-de ji-geu-meun…',
        zh: '28天前在飞机上紧张了。但是现在……',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: 'Tori要写日记的最后一句。28天了，她鼓起了勇气。怎么写？',
        practice: 'pick',
        choices: [
          { ko: '저는 용기를 냈어요.', zh: '我鼓起了勇气。', correct: true },
          { ko: '저는 용기를 내요.', zh: '我鼓起勇气。（现在）', correct: false },
          { ko: '저는 용기가 없어요.', zh: '我没有勇气。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '过去时：~았/었어요',
    pattern: '词干末元音 **ㅏ/ㅗ** → 았어요  |  **其他** → 었어요  |  **하다** → 했어요',
    whenToUse: '讲述已经发生的事。Day 29 Tori写日记——"갔어요(去了)/먹었어요(吃了)/했어요(做了)"。过去时规则和해요体的아/어选择完全一样，只是后面加 ㅆ어요。',
    rules: [
      '**规则1：ㅏ/ㅗ → 았어요**：词干末元音是ㅏ/ㅗ时接 았어요。가다→갔어요（가+았→갔）；오다→왔어요（오+았→왔）',
      '**规则2：其他 → 었어요**：词干末元音不是ㅏ/ㅗ时接 었어요。먹다→먹었어요；마시다→마셨어요（마시+었=마셨）',
      '**规则3：하다 → 했어요**：所有 하다 类无条件变 했어요。공부하다→공부했어요；운동하다→운동했어요',
      '**缩合规则**：和해요体一样。가+았=갔；오+았=왔（ㅗ+ㅏ=ㅘ+ㅆ）；마시+었=마셨（ㅣ+ㅓ=ㅕ+ㅆ）',
      '**ㅂ不规则 过去**：즐겁다→즐거웠어요（ㅂ→우+었=웠）；춥다→추웠어요。ㅂ脱落变우再接었어요',
      '**ㄷ不规则 过去**：듣다→들었어요（ㄷ→ㄹ+었）；걷다→걸었어요',
      '**判断步骤**：① 和 해요体一样判断 아/어 → ② 把"아요/어요"变成"았어요/었어요" → ③ 检查不规则变化。本质就是해요体的 아/어 规则不变，词尾从 요 → ㅆ어요',
    ],
    examples: [
      { ko: '어제 학교에 갔어요.', zh: '昨天去学校了。', highlight: '갔어요', note: '가다 → 가+았어요 = 갔어요。ㅏ+ㅏ 缩合，ㅆ 表过去' },
      { ko: '삼겹살을 먹었어요.', zh: '吃了五花肉。', highlight: '먹었어요', note: '먹다 末元音ㅓ → 었어요 = 먹었어요。有收音直接加' },
      { ko: '한국어 공부했어요.', zh: '学了韩语。', highlight: '했어요', note: '공부하다 → 했어요。하다类全部变했어요，无条件' },
      { ko: '비가 왔어요.', zh: '下雨了。', highlight: '왔어요', note: '오다 → 오+았 = 왔(ㅗ+ㅏ=ㅘ) + 어요 = 왔어요' },
      { ko: '정말 즐거웠어요.', zh: '真的很开心。', highlight: '즐거웠어요', note: '즐겁다 ㅂ불규칙 → 즐거우+었어요 = 즐거웠어요' },
    ],
    pitfall:
      '① 갔어요 不是"가+ㅆ어요"，是"가+았어요"的缩合结果。原理和해요体一样。② 했어요 是하+였어요 缩合，不是하+았어요 ❌。하다类永远走第三条路。③ ㅂ불규칙 过去时：즐겁+었→즐거웠（不是 즐겁었 ❌）。先变ㅂ→우，再接었어요。',
  },

  output: [
    {
      id: 'd29-o1',
      kind: 'compose',
      zhHint: '我鼓起了勇气。',
      tokens: ['저는', '용기를', '냈어요', '내요', '낼게요', '있어요'],
      composeAnswer: ['저는', '용기를', '냈어요'],
      successMsg: '저는 용기를 냈어요. — 日记本最后一行。28天的勇气。',
    },
    {
      id: 'd29-o2',
      kind: 'listen-choice',
      audioKo: '어제 친구들이랑 삼겹살을 먹었어요.',
      successMsg: '✓ 먹다→먹었어요。과거시제 완벽.',
      choices: [
        { zh: '昨天和朋友们吃了五花肉。', correct: true },
        { zh: '明天和朋友去吃五花肉。', correct: false },
        { zh: '现在在吃五花肉。', correct: false },
        { zh: '想吃五花肉。', correct: false },
      ],
    },
    {
      id: 'd29-o3',
      kind: 'zh-to-ko',
      zhPrompt: '学了韩语。',
      successMsg: '"한국어 공부했어요." — 하다→했어요，过去时第三规则。',
      choices: [
        { ko: '한국어 공부했어요.', correct: true },
        { ko: '한국어 공부해요.', correct: false },
        { ko: '한국어 공부았어요.', correct: false },
        { ko: '한국어 공부하었어요.', correct: false },
      ],
    },
    {
      id: 'd29-o4',
      kind: 'particle-error',
      zhHint: '下雨了。',
      successMsg: '오다→왔어요（ㅗ+ㅏ=ㅘ+ㅆ어요）。비가 왔어요。',
      choices: [
        { ko: '비가 왔어요.', correct: true },
        { ko: '비가 오았어요.', correct: false },
        { ko: '비가 왔아요.', correct: false },
        { ko: '비가 오었어요.', correct: false },
      ],
    },
    {
      id: 'd29-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 29 전부 맞았어요! 日记的第一页，写满了过去时。',
      pairs: [
        { ko: '갔어요', zh: '去了' },
        { ko: '먹었어요', zh: '吃了' },
        { ko: '했어요', zh: '做了' },
        { ko: '왔어요', zh: '来了' },
        { ko: '즐거웠어요', zh: '开心（过去）' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '첫 한국어 일기 완성! 토리, 한 달 동안 정말 많이 성장했어요!',
    preview: '明天是最后一天——Day 30 毕业典礼。30天的故事，画上句号。',
    stickerId: 'sticker-d29',
    sceneImageUrl: '/images/diary/day-29-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「过去时三条规则和해요体有什么关系？」「즐겁다为什么变成즐거웠어요？」',
};
