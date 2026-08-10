import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 30 ★最终考 · 初级月考 · 짐/집辨析题笑出声
 *
 * 剧情：韩光语学堂305教室初级月考。试卷上有짐/집辨析题，Tori笑出声——
 * 全考场只有她知道这个梗（Day 3）。考完火鹤老师宣布她通过，升入中级。
 *
 * 学习目标：毕业5段自述 / 30天总复习 / 감정표현
 * 语料层级：해요体 + 합쇼체（正式感谢）
 * 韩语自审：korean skill PASS（자연성/문법/조사 三关）
 */
export const day30: ToriDay = {
  level: 'beginner',
  day: 30,
  phase: 'mastery',
  title: '★最终考 · 初级月考 · 毕业', titleEn: '★Final Exam · Beginner Monthly Test · Graduation',
  subtitle: '从"我的家太重了"到"我带来了行李"', subtitleEn: 'From \'my house is too heavy\' to \'I brought my luggage\'',
  heroImageUrl: '/images/diary/day-30-hero.jpg',
  estimatedMin: 18,

  opening: {
    date: '9월 30일 · 월요일 오전',
    weather: '兽尔 · 秋高气爽', weatherEn: 'Seoul · Crisp autumn air',
    toriPose: 'proud',
    diaryText: `9月30日，周一上午。秋高气爽。

韩光语学堂 305教室。
桌上放着一张试卷，旁边是一支铅笔。

月考。

我翻开第一页——
第三题：다음 중 올바른 것을 고르세요.
① 짐이 무거워요. ② 집이 무거워요.

我笑出声了。

全考场只有我知道——
这是我 Day 3 闹的笑话。
짐（行李）和 집（家），差一个字母，差了整个世界。

那天在机场，我说了"집이 무거워요"（我的家太重了），
Minji 笑了一整个下午。

现在我写下：짐이 무거워요.（行李太重了。）
这一次，是对的。

考完试。火鹤老师站起来：
"토리 학생, 합격. 중급반으로 올라가세요."

30天。我从"안녕하세요"走到了"중급반"。`,
  },

  words: [
    {
      id: 'd30-w1',
      korean: '졸업',
      hangul: 'jo-reop',
      zh: '毕业', zhEn: 'graduation',
      pos: '名词', posEn: 'Noun',
      example: { ko: '초급반 졸업이에요!', zh: '初级班毕业了！', zhEn: 'Graduated from the beginner class!' },
      tip: '졸(卒) + 업(业)。졸업하다 = 毕业', tipEn: '졸 (卒) + 업 (业). 졸업하다 = to graduate',
    },
    {
      id: 'd30-w2',
      korean: '시험',
      hangul: 'si-heom',
      zh: '考试', zhEn: 'exam',
      pos: '名词', posEn: 'Noun',
      example: { ko: '시험을 잘 봤어요.', zh: '考试考好了。', zhEn: 'I did well on the exam.' },
      tip: '시(试) + 험(验)。시험을 보다 = 考试（固定搭配）', tipEn: '시 (试) + 험 (验). 시험을 보다 = to take an exam (fixed expression)',
    },
    {
      id: 'd30-w3',
      korean: '합격',
      hangul: 'hap-gyeok',
      zh: '合格', zhEn: 'pass',
      pos: '名词', posEn: 'Noun',
      example: { ko: '합격했어요!', zh: '合格了！', zhEn: 'I passed!' },
      tip: '합(合) + 격(格)。합격하다 = 合格/通过', tipEn: '합(合) + 격(格). 합격하다 = to pass / to qualify',
    },
    {
      id: 'd30-w4',
      korean: '행복',
      hangul: 'haeng-bok',
      zh: '幸福', zhEn: 'happiness',
      pos: '名词', posEn: 'Noun',
      example: { ko: '정말 행복했어요.', zh: '真的很幸福。', zhEn: 'I\'m really happy.' },
      tip: '행(幸) + 복(福)。행복하다 = 幸福', tipEn: '행(幸) + 복(福). 행복하다 = happiness',
    },
    {
      id: 'd30-w5',
      korean: '실수',
      hangul: 'sil-su',
      zh: '失误', zhEn: 'mistake',
      pos: '名词', posEn: 'Noun',
      example: { ko: '실수도 많았지만 행복했어요.', zh: '虽然失误很多但很幸福。', zhEn: 'Even though I made many mistakes, I was really happy.' },
      tip: '실(失) + 수(手/误)。실수하다 = 犯错', tipEn: '실(失) + 수(手/误). 실수하다 = to make a mistake',
    },
    {
      id: 'd30-w6',
      korean: '중급',
      hangul: 'jung-geup',
      zh: '中级', zhEn: 'intermediate level',
      pos: '名词', posEn: 'Noun',
      example: { ko: '중급반으로 올라가요.', zh: '升到中级班。', zhEn: 'I moved up to the intermediate class.' },
      tip: '중(中) + 급(级)。초급(初级)→중급(中级)→고급(高级)', tipEn: '중(中) + 급(级). 초급(beginner) → 중급(intermediate) → 고급(advanced)',
    },
  ],

  dialogue: {
    scene: '韩光语学堂·月考+毕业', sceneEn: 'Hangwang Language School · Monthly Test + Graduation',
    setting: {
      time: '周一上午', timeEn: 'Monday morning',
      place: '韩光语学堂 305教室', placeEn: 'Hangwang Language School, Room 305',
      npc: '火鹤老师', npcEn: 'Teacher Flamingo',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '火鹤老师', npcNameEn: 'Teacher Flamingo',
        ko: '시험 시작.',
        hangul: 'si-heom si-jak.',
        zh: '考试开始。', zhEn: 'The test begins.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '짐하고 집… 하하하… 삼 일 차가 떠올라…',
        hangul: 'jim-ha-go jip… ha-ha-ha… sam-il-cha-ga tteo-ol-la…',
        zh: '行李和家……哈哈哈……想起第三天了……', zhEn: 'Luggage and home... hahaha... that reminds me of day three...',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: '火鹤老师', npcNameEn: 'Teacher Flamingo',
        ko: '토리 학생, 합격. 중급반으로 올라가세요.',
        hangul: 'to-ri hak-saeng, hap-gyeok. jung-geup-ba-neu-ro ol-la-ga-se-yo.',
        zh: 'Tori同学，合格。升入中级班。', zhEn: 'Tori, you passed. You\'re moving up to the intermediate class.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '정말요? 감사합니다!',
        hangul: 'jeong-mal-yo? gam-sa-ham-ni-da!',
        zh: '真的吗？谢谢！', zhEn: 'Really? Thank you!',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '30일 전에 한국에 왔어요.',
        hangul: 'sam-sip-il jeo-ne han-gu-ge wa-sseo-yo.',
        zh: '30天前来到韩国。', zhEn: 'I came to Korea 30 days ago.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '30일 동안 실수도 많았지만, 정말 행복했어요.',
        hangul: 'sam-sip-il dong-an sil-su-do ma-nat-ji-man, jeong-mal haeng-bo-kae-sseo-yo.',
        zh: '30天犯过很多错，但真的很幸福。', zhEn: 'I made many mistakes over 30 days, but I was truly happy.',
        practice: 'shadow',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: '全班为Tori鼓掌。最后，她想对老师和朋友们说什么？', zhEn: 'The whole class applauds for Tori. Finally, what does she want to say to her teacher and friends?',
        practice: 'pick',
        choices: [
          { ko: '선생님, 친구들 진짜 감사합니다. 앞으로도 잘 살게요.', zh: '老师、朋友们真的感谢。今后也会好好生活。', zhEn: 'Teacher, friends, thank you so much. I\'ll live well from now on.', correct: true },
          { ko: '안녕히 계세요.', zh: '再见。', zhEn: 'Goodbye.', correct: false },
          { ko: '한국어 어려워요.', zh: '韩语好难。', zhEn: 'Korean is so hard.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '毕业自述5段', titleEn: '5-Part Graduation Speech',
    pattern: '인사(问候) → 시작(开始) → 추억(回忆) → 성과(成果) → 끝인사(结束寒暄)', patternEn: '인사(greeting) → 시작(beginning) → 추억(memories) → 성과(achievements) → 끝인사(closing remarks)',
    whenToUse: '韩国学校/公司正式场合的自述/感言结构。Day 30 Tori在全班面前用这5段说了30天的感受。', whenToUseEn: 'The structure for self-introductions/speeches in formal Korean school or company settings. On Day 30, Tori used these 5 parts to share her feelings about the past 30 days in front of the class.',
    rules: [
      '**인사 问候**："안녕하세요. 저는 토리예요." 重新自我介绍，呼应 Day 1',
      '**시작 起点**："30일 전에 한국에 왔어요." 用过去时 ~았/었어요 说起点',
      '**추억 回忆**："실수도 많았지만, 정말 행복했어요." 用 ~지만(但是) 转折表达成长',
      '**성과 成果**："합격했어요. 중급반으로 올라가요." 过去时 + 现在时混用说成果',
      '**끝인사 结束**："감사합니다. 앞으로도 잘 살게요." 感谢 + 承诺。ㄹ게요 = 我会（承诺）',
      '**~지만 用法**：V/A + 지만 = 虽然……但是。실수도 많았지만 행복했어요（虽然失误多但幸福）。转折不需要主语变化',
      '**앞으로도 用法**：앞으로(今后) + 도(也) = 今后也。앞으로도 잘 부탁드립니다（今后也请多关照）',
    ],
    examples: [
      { ko: '30일 전에 한국에 왔어요.', zh: '30天前来到韩国。', zhEn: 'I came to Korea 30 days ago.', highlight: '전에 ... 왔어요', note: '시간 + 전에(之前) + 과거시제。叙述起点的标准句', noteEn: 'Time + 전에 (before) + past tense. Standard sentence for describing a starting point.' },
      { ko: '실수도 많았지만, 행복했어요.', zh: '虽然失误多，但很幸福。', zhEn: 'There were many mistakes, but I was happy.', highlight: '지만', note: '많았다(多·过去) + 지만(但是) + 행복했어요。转折回忆', noteEn: '많았다 (many·past) + 지만 (but) + 행복했어요. A contrasting memory.' },
      { ko: '합격했어요!', zh: '合格了！', zhEn: 'I passed!', highlight: '했어요', note: '합격하다 → 했어요。宣布成果的瞬间', noteEn: '합격하다 → 했어요. The moment of announcing success.' },
      { ko: '앞으로도 잘 살게요.', zh: '今后也会好好生活。', zhEn: 'I\'ll live well from now on.', highlight: '살게요', note: '살다(活/生活) + ㄹ게요(承诺)。살다 ㄹ词干 + 게요 = 살게요', noteEn: '살다 (live) + ㄹ게요 (promise). 살다 ㄹ stem + 게요 = 살게요' },
      { ko: '진짜 감사합니다.', zh: '真的感谢。', zhEn: 'Thank you so much.', highlight: '감사합니다', note: '합쇼체最高正式感谢。毕业/升级时的标准结尾', noteEn: '합쇼체 most formal thanks. Standard ending for graduation/promotion.' },
    ],
    pitfall:
      '① 살게요 不是"死"的意思！살다 = 活/生活。잘 살게요 = 我会好好活着/好好生活。② ~지만 前后主语可以相同：실수도 많았지만(我)행복했어요(我)。不需要加"但是我"。③ 앞으로도 的 도 不能省——"今后也"强调延续性。앞으로 잘 살게요 和 앞으로도 잘 살게요 语气不同。',
  },

  output: [
    {
      id: 'd30-o1',
      kind: 'compose',
      zhHint: '30天犯过很多错，但真的很幸福。', zhHintEn: 'I made many mistakes over 30 days, but I was truly happy.',
      tokens: ['30일', '동안', '실수도', '많았지만', '정말', '행복했어요', '힘들었어요'],
      composeAnswer: ['30일', '동안', '실수도', '많았지만', '정말', '행복했어요'],
      successMsg: '30일 동안 실수도 많았지만, 정말 행복했어요. — 이게 토리의 30일이야.',
    },
    {
      id: 'd30-o2',
      kind: 'compose',
      zhHint: '老师、朋友们真的感谢。今后也会好好生活。', zhHintEn: 'Teacher, friends, thank you so much. I\'ll live well from now on.',
      tokens: ['선생님', '친구들', '진짜', '감사합니다', '앞으로도', '잘', '살게요', '할게요'],
      composeAnswer: ['선생님', '친구들', '진짜', '감사합니다', '앞으로도', '잘', '살게요'],
      successMsg: '완벽한 졸업 인사. 토리, 30일 동안 정말 수고했어!',
    },
    {
      id: 'd30-o3',
      kind: 'listen-choice',
      audioKo: '토리 학생, 합격. 중급반으로 올라가세요.',
      successMsg: '✓ 합격 = 合格；중급반 = 中级班；올라가세요 = 请升上去。毕业了！', successMsgEn: '✓ 합격 = pass; 중급반 = intermediate class; 올라가세요 = please move up. Graduated!',
      choices: [
        { zh: 'Tori同学，合格。升入中级班。', zhEn: 'Tori, you passed. You\'re moving up to the intermediate class.', correct: true },
        { zh: 'Tori同学，不合格。重修。', zhEn: 'Tori, you didn\'t pass. Retake the class.', correct: false },
        { zh: 'Tori同学，考试取消了。', zhEn: 'Tori, the exam is canceled.', correct: false },
        { zh: 'Tori同学，回家吧。', zhEn: 'Tori, go home.', correct: false },
      ],
    },
    {
      id: 'd30-o4',
      kind: 'zh-to-ko',
      zhPrompt: '30天前来到韩国。', zhPromptEn: 'I came to Korea 30 days ago.',
      successMsg: '"30일 전에 한국에 왔어요." — 전에 + 과거시제，叙述起点。', successMsgEn: '"30일 전에 한국에 왔어요." — 전에 + past tense, describing a starting point.',
      choices: [
        { ko: '30일 전에 한국에 왔어요.', correct: true },
        { ko: '30일 전에 한국에 가요.', correct: false },
        { ko: '30일 후에 한국에 왔어요.', correct: false },
        { ko: '30일 동안 한국에 와요.', correct: false },
      ],
    },
    {
      id: 'd30-o5',
      kind: 'match-pair',
      successMsg: '✓ 🎓 Day 30 완료! 토리의 한국어 일기, 30일 완주! 축하해요!',
      pairs: [
        { ko: '졸업', zh: '毕业', zhEn: 'graduation' },
        { ko: '합격', zh: '合格', zhEn: 'pass' },
        { ko: '행복', zh: '幸福', zhEn: 'happiness' },
        { ko: '실수', zh: '失误', zhEn: 'mistake' },
        { ko: '중급', zh: '中级', zhEn: 'intermediate level' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '🎓 30일 완주! 초급반 졸업, 중급반 입학! 토리, 정말 대단해요! 용기를 냈어요!',
    preview: '30天的旅程结束了——但Tori的故事才刚刚开始。중급반에서 만나요!', previewEn: 'The 30-day journey is over—but Tori\'s story is just beginning. See you in the intermediate class!',
    stickerId: 'sticker-d30',
    sceneImageUrl: '/images/diary/day-30-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~지만怎么用？」「잘 살게요是什么意思？」「30天学了哪些语法？」',
};
