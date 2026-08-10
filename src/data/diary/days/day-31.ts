import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 31 · 중급반 첫날 · 升入中级班
 *
 * 剧情：Tori走进中级班教室，Junho和Haru还在，Minji升到另一个班。新来了一只狐狸Danielle，
 * 韩语完美得不像外国人。Junho脱口而出"발음 진짜 유창하네요"，Tori心里泛起一丝不安——
 * 同样是外国人，为什么她说得那么好？（伏笔：暂不解释Danielle的背景）
 *
 * 学习目标：감탄 ~네요 / 첫인상 표현 / 새 친구 소개
 * 语料层级：해요体 + ~네요 감탄
 * 韩语自审：korean skill PASS（자연성/문법/발음 三关）
 */
export const day31: ToriDay = {
  level: 'intermediate',
  day: 1,
  phase: 'expansion',
  title: '升入中级班 · 新同学新氛围', titleEn: 'Moving up to intermediate · new classmates, new vibe',
  subtitle: '教室换了一半人，来了一只韩语完美的狐狸', subtitleEn: 'Half the class changed, and a fox with perfect Korean showed up',
  heroImageUrl: '/images/diary/day-31-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 1일 · 화요일 아침',
    weather: '兽尔 · 秋高气爽', weatherEn: 'Seoul · Crisp autumn air',
    toriPose: 'shy',
    diaryText: `10月1日，周二上午。

第一天上中级班。
推开教室门——一半的脸都不认识了。
Minji升到了别的班，只有Junho和Haru还坐在老位置。

火鹤老师拍拍手："오늘부터 여러분은 중급반이에요."
（从今天起，你们是中级班。）

然后她指了指最后一排——
一只毛色雪白的狐狸站起来鞠躬。
"안녕하세요, 다니엘이에요. 잘 부탁드립니다."
（你好，我叫Danielle。请多关照。）

发音之干净，让整个教室都安静了一秒。

Junho凑过来悄悄说："와, 진짜 유창하네요."
（哇，真流利呢。）

我盯着Danielle——
同样是外国人，为什么她说得那么好？
心里泛起一点点，不太好形容的感觉。`,
  },

  words: [
    {
      id: 'd31-w1',
      korean: '중급반',
      hangul: 'jung-geup-ban',
      zh: '中级班', zhEn: 'Intermediate class',
      pos: '名词', posEn: 'Noun',
      example: { ko: '오늘부터 중급반이에요.', zh: '从今天起是中级班。', zhEn: 'Starting today, we\'re the intermediate class.' },
      tip: '중(中) + 급(级) + 반(班)。汉字词，和中文对应', tipEn: '중 (middle) + 급 (level) + 반 (class). Sino-Korean word, matches Chinese.',
    },
    {
      id: 'd31-w2',
      korean: '유창하다',
      hangul: 'yu-chang-ha-da',
      zh: '流利', zhEn: 'Fluent',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '다니엘 한국어가 유창해요.', zh: 'Danielle的韩语很流利。', zhEn: 'Danielle\'s Korean is very fluent.' },
      tip: '유창(流畅) + 하다。夸别人语言好最标准的一个词', tipEn: '유창 (fluent) + 하다. The most standard word to praise someone\'s language skills.',
    },
    {
      id: 'd31-w3',
      korean: '부럽다',
      hangul: 'bu-reop-da',
      zh: '羡慕', zhEn: 'Envious',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '진짜 부러워요.', zh: '真的很羡慕。', zhEn: 'I\'m really envious.' },
      tip: 'ㅂ 不规则：부럽다 → 부러워요（해요体）/ 부럽네요（네요体）', tipEn: 'ㅂ irregular: 부럽다 → 부러워요 (해요 form) / 부럽네요 (네요 form)',
    },
    {
      id: 'd31-w4',
      korean: '실력',
      hangul: 'sil-lyeok',
      zh: '实力/水平', zhEn: 'skill/level',
      pos: '名词', posEn: 'Noun',
      example: { ko: '실력이 대단하네요.', zh: '水平真了不起呢。', zhEn: 'Your level is really impressive.' },
      tip: '实(실) + 力(력)。学习/工作/运动都可以说 실력', tipEn: '실(实) + 력(力). Can be used for studies, work, or sports.',
    },
    {
      id: 'd31-w5',
      korean: '대단하다',
      hangul: 'dae-dan-ha-da',
      zh: '了不起/厉害', zhEn: 'amazing/skilled',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '토리 대단하네요!', zh: '兔莉真厉害呢！', zhEn: 'Tori is really amazing!' },
      tip: '比 잘하다 更强的一个词。带敬佩感', tipEn: 'A stronger word than 잘하다, with a sense of admiration.',
    },
    {
      id: 'd31-w6',
      korean: '여우',
      hangul: 'yeo-u',
      zh: '狐狸', zhEn: 'fox',
      pos: '名词', posEn: 'Noun',
      example: { ko: '새로 온 친구는 여우예요.', zh: '新来的朋友是狐狸。', zhEn: 'The new friend is a fox.' },
      tip: '여우 无收音 → 예요。韩语里 "여우같다" 也用来形容人机灵', tipEn: '여우 has no final consonant → 예요. In Korean, "여우같다" is also used to describe someone clever.',
    },
  ],

  dialogue: {
    scene: '중급반 첫날·자기소개',
    setting: {
      time: '周二上午 9:10', timeEn: 'Tuesday 9:10 AM',
      place: '韩光语学院·中级班教室', placeEn: 'Hangwang Language Institute · Intermediate Class Room',
      npc: '火鹤老师 / Danielle / Junho', npcEn: 'Teacher Hwahak / Danielle / Junho',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '火鹤老师', npcNameEn: 'Teacher Flamingo',
        ko: '여러분, 오늘부터 중급반이에요. 새 친구를 소개할게요.',
        hangul: 'yeo-reo-bun, o-neul-bu-teo jung-geup-ban-i-e-yo. sae chin-gu-reul so-gae-hal-ge-yo',
        zh: '大家，从今天起是中级班。给你们介绍新朋友。', zhEn: 'Everyone, from today we\'re the intermediate class. Let me introduce a new friend.',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Danielle',
        ko: '안녕하세요, 다니엘이에요. 잘 부탁드립니다.',
        hangul: 'an-nyeong-ha-se-yo, da-ni-el-i-e-yo. jal bu-tak-deu-rim-ni-da',
        zh: '你好，我叫Danielle。请多关照。', zhEn: 'Hello, I\'m Danielle. Nice to meet you.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '와, 발음 진짜 유창하네요.',
        hangul: 'wa, ba-reum jin-jja yu-chang-ha-ne-yo',
        zh: '哇，发音真流利呢。', zhEn: 'Wow, your pronunciation is really fluent.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '외국인인데… 어떻게 저렇게 잘하지?',
        hangul: 'oe-guk-in-in-de… eo-tteo-ke jeo-reo-ke jal-ha-ji?',
        zh: '明明是外国人……怎么说得那么好？', zhEn: 'She\'s clearly a foreigner... how is she so good?',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '토리도 인사해!',
        hangul: 'to-ri-do in-sa-hae!',
        zh: '兔莉也打个招呼吧！', zhEn: 'Tori, say hi too!',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Junho让Tori对新同学Danielle自我介绍。这是第一次见面，Tori应该怎么说？', zhEn: 'Junho asks Tori to introduce herself to the new student Danielle. This is their first meeting—what should Tori say?',
        practice: 'pick',
        choices: [
          { ko: '안녕하세요, 저는 토리예요. 만나서 반가워요.', zh: '你好，我是兔莉。很高兴认识你。', zhEn: 'Hello, I\'m Tori. Nice to meet you.', correct: true },
          { ko: '야, 나 토리야.', zh: '嘿，我叫兔莉。', zhEn: 'Hey, I\'m Tori.', correct: false },
          { ko: '다니엘씨, 한국 사람이에요?', zh: 'Danielle，你是韩国人吗？', zhEn: 'Danielle, are you Korean?', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '当下的感叹：~네요', titleEn: 'Exclamation in the moment: ~네요',
    pattern: 'V/A 어간 + 네요  ·  N(有收音) + 이네요  /  N(无收音) + 네요', patternEn: 'V/A stem + 네요 · N (with final consonant) + 이네요 / N (without final consonant) + 네요',
    whenToUse: '韩语里表达"此刻发现/感叹"的最自然句尾。听到Danielle发音，Junho脱口而出「발음 진짜 유창하네요」——不是陈述"你发音好"，而是"哇！(现在才发现) 真流利啊"。~네요 = 现场感受 + 新信息。日常对话/夸人/见面客套都离不开它。', whenToUseEn: 'The most natural sentence ending in Korean for expressing a discovery or exclamation in the moment. When Junho hears Danielle\'s pronunciation, he blurts out 「발음 진짜 유창하네요」—not stating "your pronunciation is good," but "wow! (just realizing now) so fluent!" ~네요 = on-the-spot feeling + new information. Essential for daily conversation, compliments, and greetings.',
    rules: [
      '**基本公式**：动词/形容词词干 + **네요** = "___啊/呢"（感叹）。유창하다 → 유창하네요（真流利呢）',
      '**名词也能用**：名词 + **(이)네요**。有收音 → **이네요**（학생이네요 = 是学生啊）；无收音 → **네요**（토리네요 = 是兔莉啊）',
      '**过去时**：~았/었네요 = "原来(过去)___啊"。먹었네요! = 原来吃过啊！',
      '**ㄹ 词干脱落**：살다 → 사네요（原来住这儿啊）；알다 → 아네요（原来知道啊）。ㄹ 见到 ㄴ 就掉',
    ],
    examples: [
      { ko: '발음이 유창하네요!', zh: '发音真流利呢！', zhEn: 'Your pronunciation is really fluent!', highlight: '유창하네요', note: '유창하다 词干"유창하"无收音 → 直接 + 네요。Junho脱口而出的原句', noteEn: 'The stem of 유창하다, "유창하," has no final consonant → add 네요 directly. This is the sentence Junho blurted out.' },
      { ko: '실력이 대단하네요.', zh: '水平真了不起呢。', zhEn: 'Your level is really impressive.', highlight: '대단하네요', note: '대단하다 → 대단하네요。夸别人能力时最自然的说法', noteEn: '대단하다 → 대단하네요. The most natural way to praise someone\'s ability.' },
      { ko: '벌써 중급반이네요.', zh: '已经是中级班了呢。', zhEn: 'We\'re already in the intermediate class.', highlight: '이네요', note: '반 末字有收音 ㄴ → **이네요**。新学期第一天的感叹', noteEn: '반 ends with the final consonant ㄴ → **이네요**. An exclamation on the first day of the new semester.' },
      { ko: '진짜 부럽네요.', zh: '真羡慕呢。', zhEn: 'I\'m so envious.', highlight: '부럽네요', note: '부럽다 → 부럽네요（네요前不发生ㅂ不规则）。해요体是 부러워요，但 ~네요 前保持原样', noteEn: '부럽다 → 부럽네요 (no ㅂ irregularity before 네요). The 해요 form is 부러워요, but before ~네요 it stays as is.' },
    ],
    pitfall:
      '① ~네요 只在**说话人此刻发现/感受**时用（新信息），不是陈述已知事实。已知的事用 ~아/어요 就够。② 第一次见面夸对方最常用 "한국어 잘하시네요"，如果说成 "한국어 잘해요" 会显得像冷冷的陈述。③ 名词后**有收音一定加이**（학생이네요✓ / 학생네요✗）。④ 不要跟습니다体混用，"유창합니다네요"是错的。',
  },

  output: [
    {
      id: 'd31-o1',
      kind: 'compose',
      zhHint: '发音真流利呢！', zhHintEn: 'Your pronunciation is really fluent!',
      tokens: ['발음이', '유창하네요', '유창해요', '유창합니다', '유창하다'],
      composeAnswer: ['발음이', '유창하네요'],
      successMsg: '감탄의 ~네요! Junho就是这样说的。', successMsgEn: 'The exclamatory ~네요! That\'s how Junho said it.',
    },
    {
      id: 'd31-o2',
      kind: 'listen-choice',
      audioKo: '다니엘씨, 한국어가 진짜 유창하네요.',
      successMsg: '✓ 就是这句。第一次见面夸人的经典句。', successMsgEn: '✓ That\'s the one. The classic compliment for a first meeting.',
      choices: [
        { zh: 'Danielle，你韩语真流利呢。', zhEn: 'Danielle, your Korean is really fluent.', correct: true },
        { zh: 'Danielle，你会说韩语吗？', zhEn: 'Danielle, can you speak Korean?', correct: false },
        { zh: 'Danielle，请说韩语。', zhEn: 'Danielle, please speak Korean.', correct: false },
        { zh: 'Danielle，你是学生吗？', zhEn: 'Danielle, are you a student?', correct: false },
      ],
    },
    {
      id: 'd31-o3',
      kind: 'zh-to-ko',
      zhPrompt: '真了不起呢！', zhPromptEn: 'That\'s amazing!',
      successMsg: '"정말 대단하네요!" — 대단하다 + 네요，感叹到位。', successMsgEn: '"정말 대단하네요!" — 대단하다 + 네요, perfectly expresses admiration.',
      choices: [
        { ko: '정말 대단하네요!', correct: true },
        { ko: '정말 대단하다요!', correct: false },
        { ko: '정말 대단해네요!', correct: false },
        { ko: '대단하네 정말요!', correct: false },
      ],
    },
    {
      id: 'd31-o4',
      kind: 'particle-error',
      zhHint: '（她）是学生啊！', zhHintEn: 'She\'s a student!',
      successMsg: '학생(받침 ㅇ) → **이네요**。有收音一定要有이。',
      choices: [
        { ko: '학생이네요!', correct: true },
        { ko: '학생네요!', correct: false },
        { ko: '학생예네요!', correct: false },
        { ko: '학생이예요네!', correct: false },
      ],
    },
    {
      id: 'd31-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 31 核心词对上。중급반, 시작!', successMsgEn: '✓ Matches Day 31\'s core vocabulary. 중급반, let\'s start!',
      pairs: [
        { ko: '중급반', zh: '中级班', zhEn: 'Intermediate class' },
        { ko: '유창하다', zh: '流利', zhEn: 'Fluent' },
        { ko: '부럽다', zh: '羡慕', zhEn: 'Envious' },
        { ko: '실력', zh: '实力/水平', zhEn: 'skill/level' },
        { ko: '여우', zh: '狐狸', zhEn: 'fox' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '중급반 첫날, 새 친구도 만났어요. 낯설지만 괜찮아요. 토리, 잘했어요!',
    preview: '明天是중추절（中秋节）——朋友都回家了，一个人的宿舍会是什么味道？', previewEn: 'Tomorrow is Chuseok (Mid-Autumn Festival) — all my friends have gone home. What will it feel like alone in the dorm?',
    stickerId: 'sticker-d31',
    sceneImageUrl: '/images/diary/day-31-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~네요和~아/어요有什么区别？」「Danielle 是韩国人吗？」',
};
