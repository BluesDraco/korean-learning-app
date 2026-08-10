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
  title: '升入中级班 · 新同学新氛围',
  subtitle: '教室换了一半人，来了一只韩语完美的狐狸',
  heroImageUrl: '/images/diary/day-31-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 1일 · 화요일 아침',
    weather: '兽尔 · 秋高气爽',
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
      zh: '中级班',
      pos: '名词',
      example: { ko: '오늘부터 중급반이에요.', zh: '从今天起是中级班。' },
      tip: '중(中) + 급(级) + 반(班)。汉字词，和中文对应',
    },
    {
      id: 'd31-w2',
      korean: '유창하다',
      hangul: 'yu-chang-ha-da',
      zh: '流利',
      pos: '形容词',
      example: { ko: '다니엘 한국어가 유창해요.', zh: 'Danielle的韩语很流利。' },
      tip: '유창(流畅) + 하다。夸别人语言好最标准的一个词',
    },
    {
      id: 'd31-w3',
      korean: '부럽다',
      hangul: 'bu-reop-da',
      zh: '羡慕',
      pos: '形容词',
      example: { ko: '진짜 부러워요.', zh: '真的很羡慕。' },
      tip: 'ㅂ 不规则：부럽다 → 부러워요（해요体）/ 부럽네요（네요体）',
    },
    {
      id: 'd31-w4',
      korean: '실력',
      hangul: 'sil-lyeok',
      zh: '实力/水平',
      pos: '名词',
      example: { ko: '실력이 대단하네요.', zh: '水平真了不起呢。' },
      tip: '实(실) + 力(력)。学习/工作/运动都可以说 실력',
    },
    {
      id: 'd31-w5',
      korean: '대단하다',
      hangul: 'dae-dan-ha-da',
      zh: '了不起/厉害',
      pos: '形容词',
      example: { ko: '토리 대단하네요!', zh: '兔莉真厉害呢！' },
      tip: '比 잘하다 更强的一个词。带敬佩感',
    },
    {
      id: 'd31-w6',
      korean: '여우',
      hangul: 'yeo-u',
      zh: '狐狸',
      pos: '名词',
      example: { ko: '새로 온 친구는 여우예요.', zh: '新来的朋友是狐狸。' },
      tip: '여우 无收音 → 예요。韩语里 "여우같다" 也用来形容人机灵',
    },
  ],

  dialogue: {
    scene: '중급반 첫날·자기소개',
    setting: {
      time: '周二上午 9:10',
      place: '韩光语学院·中级班教室',
      npc: '火鹤老师 / Danielle / Junho',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '火鹤老师',
        ko: '여러분, 오늘부터 중급반이에요. 새 친구를 소개할게요.',
        hangul: 'yeo-reo-bun, o-neul-bu-teo jung-geup-ban-i-e-yo. sae chin-gu-reul so-gae-hal-ge-yo',
        zh: '大家，从今天起是中级班。给你们介绍新朋友。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Danielle',
        ko: '안녕하세요, 다니엘이에요. 잘 부탁드립니다.',
        hangul: 'an-nyeong-ha-se-yo, da-ni-el-i-e-yo. jal bu-tak-deu-rim-ni-da',
        zh: '你好，我叫Danielle。请多关照。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '와, 발음 진짜 유창하네요.',
        hangul: 'wa, ba-reum jin-jja yu-chang-ha-ne-yo',
        zh: '哇，发音真流利呢。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '외국인인데… 어떻게 저렇게 잘하지?',
        hangul: 'oe-guk-in-in-de… eo-tteo-ke jeo-reo-ke jal-ha-ji?',
        zh: '明明是外国人……怎么说得那么好？',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '토리도 인사해!',
        hangul: 'to-ri-do in-sa-hae!',
        zh: '兔莉也打个招呼吧！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Junho让Tori对新同学Danielle自我介绍。这是第一次见面，Tori应该怎么说？',
        practice: 'pick',
        choices: [
          { ko: '안녕하세요, 저는 토리예요. 만나서 반가워요.', zh: '你好，我是兔莉。很高兴认识你。', correct: true },
          { ko: '야, 나 토리야.', zh: '嘿，我叫兔莉。', correct: false },
          { ko: '다니엘씨, 한국 사람이에요?', zh: 'Danielle，你是韩国人吗？', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '当下的感叹：~네요',
    pattern: 'V/A 어간 + 네요  ·  N(有收音) + 이네요  /  N(无收音) + 네요',
    whenToUse: '韩语里表达"此刻发现/感叹"的最自然句尾。听到Danielle发音，Junho脱口而出「발음 진짜 유창하네요」——不是陈述"你发音好"，而是"哇！(现在才发现) 真流利啊"。~네요 = 现场感受 + 新信息。日常对话/夸人/见面客套都离不开它。',
    rules: [
      '**基本公式**：动词/形容词词干 + **네요** = "___啊/呢"（感叹）。유창하다 → 유창하네요（真流利呢）',
      '**名词也能用**：名词 + **(이)네요**。有收音 → **이네요**（학생이네요 = 是学生啊）；无收音 → **네요**（토리네요 = 是兔莉啊）',
      '**过去时**：~았/었네요 = "原来(过去)___啊"。먹었네요! = 原来吃过啊！',
      '**ㄹ 词干脱落**：살다 → 사네요（原来住这儿啊）；알다 → 아네요（原来知道啊）。ㄹ 见到 ㄴ 就掉',
    ],
    examples: [
      { ko: '발음이 유창하네요!', zh: '发音真流利呢！', highlight: '유창하네요', note: '유창하다 词干"유창하"无收音 → 直接 + 네요。Junho脱口而出的原句' },
      { ko: '실력이 대단하네요.', zh: '水平真了不起呢。', highlight: '대단하네요', note: '대단하다 → 대단하네요。夸别人能力时最自然的说法' },
      { ko: '벌써 중급반이네요.', zh: '已经是中级班了呢。', highlight: '이네요', note: '반 末字有收音 ㄴ → **이네요**。新学期第一天的感叹' },
      { ko: '진짜 부럽네요.', zh: '真羡慕呢。', highlight: '부럽네요', note: '부럽다 → 부럽네요（네요前不发生ㅂ不规则）。해요体是 부러워요，但 ~네요 前保持原样' },
    ],
    pitfall:
      '① ~네요 只在**说话人此刻发现/感受**时用（新信息），不是陈述已知事实。已知的事用 ~아/어요 就够。② 第一次见面夸对方最常用 "한국어 잘하시네요"，如果说成 "한국어 잘해요" 会显得像冷冷的陈述。③ 名词后**有收音一定加이**（학생이네요✓ / 학생네요✗）。④ 不要跟습니다体混用，"유창합니다네요"是错的。',
  },

  output: [
    {
      id: 'd31-o1',
      kind: 'compose',
      zhHint: '发音真流利呢！',
      tokens: ['발음이', '유창하네요', '유창해요', '유창합니다', '유창하다'],
      composeAnswer: ['발음이', '유창하네요'],
      successMsg: '감탄의 ~네요! Junho就是这样说的。',
    },
    {
      id: 'd31-o2',
      kind: 'listen-choice',
      audioKo: '다니엘씨, 한국어가 진짜 유창하네요.',
      successMsg: '✓ 就是这句。第一次见面夸人的经典句。',
      choices: [
        { zh: 'Danielle，你韩语真流利呢。', correct: true },
        { zh: 'Danielle，你会说韩语吗？', correct: false },
        { zh: 'Danielle，请说韩语。', correct: false },
        { zh: 'Danielle，你是学生吗？', correct: false },
      ],
    },
    {
      id: 'd31-o3',
      kind: 'zh-to-ko',
      zhPrompt: '真了不起呢！',
      successMsg: '"정말 대단하네요!" — 대단하다 + 네요，感叹到位。',
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
      zhHint: '（她）是学生啊！',
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
      successMsg: '✓ Day 31 核心词对上。중급반, 시작!',
      pairs: [
        { ko: '중급반', zh: '中级班' },
        { ko: '유창하다', zh: '流利' },
        { ko: '부럽다', zh: '羡慕' },
        { ko: '실력', zh: '实力/水平' },
        { ko: '여우', zh: '狐狸' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '중급반 첫날, 새 친구도 만났어요. 낯설지만 괜찮아요. 토리, 잘했어요!',
    preview: '明天是중추절（中秋节）——朋友都回家了，一个人的宿舍会是什么味道？',
    stickerId: 'sticker-d31',
    sceneImageUrl: '/images/diary/day-31-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~네요和~아/어요有什么区别？」「Danielle 是韩国人吗？」',
};
