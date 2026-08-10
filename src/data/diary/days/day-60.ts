import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 60 · 중급반 졸업 · 5분 자기 이야기
 *
 * 剧情：周五上午한빛어학당305教室。中级毕业典礼。Tori上台做5分钟自述。她讲了30-60天的故事——
 * 짐和집，地铁里的胡萝卜，火锅派对，帮新生。最后一句让全场安静一秒："짐을 가져왔지만…
 * 지금은 집이 있어요."（虽然带来了行李……但现在有了家。）
 *
 * 语言学校中级毕业。之后还有大学篇（Day 61+）。
 *
 * 学习目标：대조 ~았/었지만 (결말 표현) / 60일 종합 회고 / 감정 마무리
 * 语料层级：해요体 · 발표 정식체
 * 韩语自审：korean skill PASS
 */
export const day60: ToriDay = {
  level: 'intermediate',
  day: 30,
  phase: 'expansion',
  title: '中级毕业 · 5分钟自述', titleEn: 'Intermediate Graduation · 5-Minute Self-Introduction',
  subtitle: '"虽然带来了行李……但现在有了家"', subtitleEn: '\'I brought luggage... but now I have a home.\'',
  heroImageUrl: '/images/diary/day-60-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 1일 · 금요일 오전',
    weather: '兽尔 · 초겨울 맑음', weatherEn: 'Seoul · Early winter, clear',
    toriPose: 'proud',
    diaryText: `11月1日，周五上午。

한빛 어학당 305 교실。
중급반 졸업 예식。

Day 30 也是305。
Day 60 还是305。
同一间教室，第二次毕业。

火鹤老师叫我的名字。
我走上讲台，深呼吸——

"안녕하세요, 저는 토리예요.

Day 3, 인천공항에서 캐리어를 못 끌었어요.
'짐'을 '집'이라고 말했어요. 민지 씨가 웃지 않고 도와줬어요.

Day 7, 지하철 마지막 열차. 배터리 1%.
당근이 굴러 나갔을 때 하루가 손을 내밀었어요.

Day 32, 추석 밤. 혼자였어요. 하루가 송편을 나눠줬어요.

Day 37, 엄마가 보내주신 훠궈로 세 명의 친구들과 저녁을 먹었어요.

Day 49, 저는 처음으로 친구들의 싸움을 화해시켰어요.

Day 56, 새로 온 신입생이 저처럼 '집'과 '짐'을 헷갈렸어요.
저는 웃으면서 알려줬어요.

Day 58, 처음의 길을 다시 걸어봤어요.
같은 길인데 다른 사람이 됐어요.

그리고 오늘, Day 60.

저는 60일 전에 짐을 가져왔지만…
지금은 집이 있어요.

제 집은 이 교실입니다.
제 가족은 여기에 있어요.

감사합니다."

——전체 침묵. 3초.
그리고 박수.

Junho 打头, Minji, Haru, Danielle 一起.

火鹤老师宣布："토리 학생, 중급반 졸업. 대학 입학 준비반으로 올라가세요."

——언어 학교 졸업.
하지만 兽尔의 이야기는 이제 시작이야.`,
  },

  words: [
    {
      id: 'd60-w1',
      korean: '졸업',
      hangul: 'jo-reop',
      zh: '毕业', zhEn: 'graduation',
      pos: '名词', posEn: 'Noun',
      example: { ko: '언어 학교를 졸업했어요.', zh: '语言学校毕业了。', zhEn: 'Language school graduation.' },
      tip: '毕(졸) + 业(업). 졸업식 = 毕业典礼', tipEn: '毕(졸) + 业(업). 졸업식 = graduation ceremony.',
    },
    {
      id: 'd60-w2',
      korean: '침묵',
      hangul: 'chim-muk',
      zh: '沉默', zhEn: 'Silence',
      pos: '名词', posEn: 'Noun',
      example: { ko: '3초 침묵 후에 박수.', zh: '3秒沉默后掌声。', zhEn: 'Three seconds of silence, then applause.' },
      tip: '沈(침) + 默(묵). 침묵이 흐르다 = 沉默流淌', tipEn: '沈(침) + 默(묵). 침묵이 흐르다 = silence flows.',
    },
    {
      id: 'd60-w3',
      korean: '헷갈리다',
      hangul: 'het-gal-li-da',
      zh: '搞混/混淆', zhEn: 'confuse/mix up',
      pos: '动词', posEn: 'Verb',
      example: { ko: '집이랑 짐을 헷갈렸어요.', zh: '把집和짐搞混了。', zhEn: 'I mixed up 집 and 짐.' },
      tip: 'Day 3 Tori 犯的错. Day 56 新生也犯. 学习者共同的坑', tipEn: 'A mistake Tori made on Day 3. New students make it on Day 56 too. A common pitfall for learners.',
    },
    {
      id: 'd60-w4',
      korean: '입학',
      hangul: 'i-pak',
      zh: '入学', zhEn: 'enrollment',
      pos: '名词', posEn: 'Noun',
      example: { ko: '대학 입학 준비반으로 올라갔어요.', zh: '升到大学入学准备班。', zhEn: 'Move up to the university prep class.' },
      tip: '入(입) + 学(학). 反义: 졸업(毕业)', tipEn: '입 (enter) + 학 (study). Opposite: 졸업 (graduation)',
    },
    {
      id: 'd60-w5',
      korean: '가족',
      hangul: 'ga-jok',
      zh: '家人', zhEn: 'Family',
      pos: '名词', posEn: 'Noun',
      example: { ko: '제 가족은 여기에 있어요.', zh: '我的家人在这里。', zhEn: 'My family is here.' },
      tip: 'Day 40 Minji네 배운 단어. Day 60 Tori 자기 가족 재정의',
    },
    {
      id: 'd60-w6',
      korean: '이야기',
      hangul: 'i-ya-gi',
      zh: '故事', zhEn: 'story',
      pos: '名词', posEn: 'Noun',
      example: { ko: '兽尔의 이야기는 이제 시작이야.', zh: '兽尔的故事现在才开始。', zhEn: 'Tori\'s story is just beginning.' },
      tip: '이야기하다 = 讲故事/说话. 얘기(축약형)', tipEn: '이야기하다 = to tell a story/talk. 얘기 (contracted form)',
    },
  ],

  dialogue: {
    scene: '한빛어학당 305호·중급반 졸업식',
    setting: {
      time: '周五 10:30', timeEn: 'Friday 10:30',
      place: '한빛어학당 305호',
      npc: '火鹤老师 / Junho / Haru', npcEn: 'Teacher Hwahwa / Junho / Haru',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '안녕하세요, 저는 토리예요.',
        hangul: 'an-nyeong-ha-se-yo, jeo-neun to-ri-ye-yo',
        zh: '大家好，我是兔莉。', zhEn: 'Hello everyone, I\'m Tori.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '60일 전에 짐을 가져왔지만, 지금은 집이 있어요.',
        hangul: 'yuk-si-bil jeo-ne ji-meul ga-jyeo-wat-ji-man, ji-geu-meun ji-bi i-sseo-yo',
        zh: '60天前带来了行李，现在有了家。', zhEn: 'I brought my luggage 60 days ago, and now I have a home.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '제 집은 이 교실입니다. 제 가족은 여기에 있어요.',
        hangul: 'je ji-beun i gyo-si-rim-ni-da. je ga-jo-geun yeo-gi-e i-sseo-yo',
        zh: '我的家是这间教室。我的家人在这里。', zhEn: 'My home is this classroom. My family is here.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '火鹤老师', npcNameEn: 'Teacher Flamingo',
        ko: '토리 학생, 중급반 졸업. 대학 입학 준비반으로 올라가세요.',
        hangul: 'to-ri hak-saeng, jung-geup-ban jo-reop. dae-hak i-pak jun-bi-ban-eu-ro ol-la-ga-se-yo',
        zh: '兔莉，中级班毕业。请升到大学入学准备班。', zhEn: 'Tori, you\'ve graduated from the intermediate class. Please move up to the university prep class.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '언어 학교 졸업. 근데 이 이야기는 이제 시작이야.',
        hangul: 'eon-eo hak-gyo jo-reop. geun-de i i-ya-gi-neun i-je si-ja-gi-ya',
        zh: '语言学校毕业。但这个故事现在才开始。', zhEn: 'Graduated from language school. But this story is just beginning.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '典礼结束朋友们围过来。Tori想说"这60天，你们是我的家人"。合适的一句？', zhEn: 'After the ceremony, friends gather around. Tori wants to say, "These 60 days, you\'ve been my family." Which sentence fits?',
        practice: 'pick',
        choices: [
          { ko: '이 60일, 너희가 내 가족이었어. 진심으로 고마워.', zh: '这60天，你们就是我的家人。真心谢谢。', zhEn: 'These 60 days, you\'ve been my family. Thank you from the bottom of my heart.', correct: true },
          { ko: '이제 다 끝났어. 잘 가.', zh: '现在都结束了。再见。', zhEn: 'It\'s all over now. Goodbye.', correct: false },
          { ko: '나 대학 안 갈래.', zh: '我不想上大学了。', zhEn: 'I don\'t want to go to university anymore.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '虽然___但___：~았/었지만（Day 48 深化 + 결말 회고）', titleEn: 'Although ___ but ___: ~았/었지만 (Day 48 deepening + final reflection)',
    pattern: 'V/A + **았/었지만** + Result',
    whenToUse: 'Day 48 学过 ~지만。Day 60 深化——**~았/었지만** 表**过去事实**的转折，是回顾/毕业演讲的核心句型。Tori 说 「짐을 가져왔**지만** 지금은 집이 있어요」= 虽然带来了行李，但现在有了家。~았/었지만 = "曾经/过去___，但现在___"，成长表达的黄金结构。', whenToUseEn: 'Learned ~지만 on Day 48. Day 60 deepens it—**~았/었지만** expresses a **past fact** contrast, the core pattern for reflections and graduation speeches. Tori says, 「짐을 가져왔**지만** 지금은 집이 있어요」= Although I brought luggage, now I have a home. ~았/었지만 = "once/past ___, but now ___", the golden structure for expressing growth.',
    rules: [
      '**기본**：V/A 어간 + 았/었지만 = "虽然过去___了但___"。变形和过去时一样',
      '**~았/었지만 + 지금은**：过去 vs 现在 대조 = 성장 표현의 왕도',
      '**긍정 결말 강조**：~았/었지만 뒤에 긍정문 = 극복/成长',
      '**Day 48 ~지만 (现在) vs Day 60 ~았/었지만 (过去)**：시제 하나 차이지만 뉘앙스 확 달라'
    ],
    examples: [
      { ko: '짐을 가져왔지만 지금은 집이 있어요.', zh: '虽然带来了行李，但现在有了家。', zhEn: 'Although I brought my luggage, now I have a home.', highlight: '가져왔지만 ... 있어요', note: '가져오다 → 가져왔지만. Day 60 主题句. Day 3의 회수', noteEn: '가져오다 → 가져왔지만. Day 60 theme sentence. A callback to Day 3.' },
      { ko: '처음엔 어려웠지만 지금은 재밌어요.', zh: '一开始难，但现在有意思。', zhEn: 'It was hard at first, but now it\'s fun.', highlight: '어려웠지만 ... 재밌어요', note: '어렵다 → 어려웠지만. 학습 회고의 정석' },
      { ko: '떨렸지만 다 말했어요.', zh: '虽然紧张但都说了。', zhEn: 'I was nervous, but I said it all.', highlight: '떨렸지만', note: '떨리다 → 떨렸지만. Day 55 배운 표현 활용' },
      { ko: '한국말이 서툴렀지만 마음은 통했어요.', zh: '虽然韩语生疏但心意相通。', zhEn: 'My Korean is rusty, but our hearts connected.', highlight: '서툴렀지만 ... 통했어요', note: '서투르다 → 서툴렀지만 (르 불규칙). 감동적 회고' },
    ],
    pitfall:
      '① **~지만 (Day 48) vs ~았/었지만 (Day 60)**: 现在형 대조 vs 과거형 대조. 지금은 힘들지만 (现在难但) vs 그때는 힘들었지만 (那时难但). 시제로 뉘앙스 완전히 달라. ② **~았/었지만 + 지금은** 는 회고/成长 표현의 王道. 발표/일기/편지에서 강력. ③ 감정 강조 시 ~았/었**는데** 도 가능 (Day 48). ~았/었지만 = 논리적 대조, ~았/었는데 = 감정 铺垫.',
  },

  output: [
    {
      id: 'd60-o1',
      kind: 'compose',
      zhHint: '虽然带来了行李，但现在有了家。', zhHintEn: 'Although I brought my luggage, now I have a home.',
      tokens: ['짐을', '가져왔지만', '지금은', '집이 있어요', '가져와서', '집이에요'],
      composeAnswer: ['짐을', '가져왔지만', '지금은', '집이 있어요'],
      successMsg: 'Day 60 最重要的一句。짐 → 집. 60天成长收束.', successMsgEn: 'Day 60\'s most important line. 짐 → 집. 60 days of growth, wrapped up.',
    },
    {
      id: 'd60-o2',
      kind: 'listen-choice',
      audioKo: '토리 학생, 중급반 졸업. 대학 입학 준비반으로 올라가세요.',
      successMsg: '✓ 火鹤老师宣布. 中级毕业, 但下一站是大学准备班.', successMsgEn: '✓ Teacher Flamingo announces. Intermediate graduation, but next stop is the university prep class.',
      choices: [
        { zh: '兔莉，中级班毕业。请升到大学入学准备班。', zhEn: 'Tori, you\'ve graduated from the intermediate class. Please move up to the university prep class.', correct: true },
        { zh: '兔莉，中级班没通过。', zhEn: 'Tuli, you didn\'t pass the intermediate class.', correct: false },
        { zh: '兔莉，请离开学校。', zhEn: 'Tuli, please leave the school.', correct: false },
        { zh: '兔莉，明年再来。', zhEn: 'Tuli, come back next year.', correct: false },
      ],
    },
    {
      id: 'd60-o3',
      kind: 'zh-to-ko',
      zhPrompt: '一开始难，但现在有意思。', zhPromptEn: 'It was hard at first, but now it\'s fun.',
      successMsg: '"처음엔 어려웠지만 지금은 재밌어요." — 과거 대조 + 현재 결과.',
      choices: [
        { ko: '처음엔 어려웠지만 지금은 재밌어요.', correct: true },
        { ko: '처음엔 어려운데 지금은 재밌어요.', correct: false },
        { ko: '처음엔 어려워서 지금은 재밌어요.', correct: false },
        { ko: '처음엔 어려웠어서 지금은 재밌어요.', correct: false },
      ],
    },
    {
      id: 'd60-o4',
      kind: 'particle-error',
      zhHint: '虽然紧张但都说了。', zhHintEn: 'I was nervous, but I said it all.',
      successMsg: '떨리다 → **떨렸지만** (과거 + 지만). 시제는 앞절에.',
      choices: [
        { ko: '떨렸지만 다 말했어요.', correct: true },
        { ko: '떨리지만 다 말했어요.', correct: false },
        { ko: '떨렸는데 다 말할 거예요.', correct: false },
        { ko: '떨렸어서 다 말했어요.', correct: false },
      ],
    },
    {
      id: 'd60-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 60 全对. 중급반 졸업. 대학 이야기는 곧 시작.', successMsgEn: '✓ Day 60 all correct. 중급반 졸업. 대학 이야기는 곧 시작.',
      pairs: [
        { ko: '졸업', zh: '毕业', zhEn: 'graduation' },
        { ko: '침묵', zh: '沉默', zhEn: 'Silence' },
        { ko: '헷갈리다', zh: '搞混', zhEn: 'to mix up' },
        { ko: '입학', zh: '入学', zhEn: 'enrollment' },
        { ko: '이야기', zh: '故事', zhEn: 'story' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '중급반 졸업! 60일 이야기 완주. 짐이 집이 됐어요.',
    preview: '언어 학교 졸업 — 하지만 다음 학기, 대학 입학 준비반으로. 兽尔의 이야기는 이제 시작.', previewEn: 'Language school graduation — but next semester, college prep class. The story of Shouer is just beginning.',
    stickerId: 'sticker-d60',
    sceneImageUrl: '/images/diary/day-60-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~았/었지만 和 ~지만 什么时候用？」「짐 vs 집 还有哪些形似字？」',
};
