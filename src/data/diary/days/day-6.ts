import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 6 · 한빛教室 · Junho 老虎登场
 *
 * 剧情：兔莉第一天上 한빛语言学校的课。教室门一推开，
 * 一只穿着白衬衫的老虎坐在第一排，怀里抱着一个偶像应援手幅。
 * 他举手介绍自己："안녕하세요, 반장 준호예요. KPOP 좋아해요. 잘 부탁드려요."
 * 兔莉以为老虎都很凶，结果他笑起来虎牙圆圆的，
 * 说"중국에서 왔어요?" 然后掏出一张写着汉字的应援棒说他在追的偶像组合是 4 个中国成员。
 * 这一刻兔莉知道她有了第二个朋友。
 *
 * 学习目标：~이에요? 是非疑问 / 喜欢 좋아해요 / 班级日常
 * 韩语自审：korean skill PASS
 */
export const day6: ToriDay = {
  level: 'beginner',
  day: 6,
  phase: 'foundation',
  title: '한빛教室 · Junho 班长',
  subtitle: '虎牙的老虎其实在追 KPOP',
  isCheckpoint: null,
  estimatedMin: 13,

  opening: {
    date: '9月 6일 한빛 어학원 교실',
    weather: '首尔 · 晴',
    toriPose: 'shy',
    diaryText: `9月 6日，한빛어학원 102 教室。

第一节韩语课。
我推开门的瞬间，所有动物都看了过来。

第一排坐着一只老虎。
白衬衫，金色眼睛，怀里抱着一个偶像应援手幅。
他举手站起来：

"안녕하세요, 반장 준호예요. KPOP 좋아해요. 잘 부탁드려요."
（你好，我是班长 Junho。喜欢 KPOP。请多关照。）

我倒抽一口气——老虎都这么凶吗？
结果他笑起来，虎牙圆圆的。
然后他朝我走过来：

"중국에서 왔어요?"（你从中国来吗？）
我点头。
他眼睛亮了，从书包里掏出一张应援棒：
"제가 좋아하는 그룹, 중국 멤버 4명이에요."
（我喜欢的团，4 个中国成员。）

…我有第二个朋友了。`,
  },

  words: [
    {
      id: 'd06-w1',
      korean: '반장',
      hangul: 'ban-jang',
      zh: '班长',
      pos: '名词',
      example: { ko: '저는 반장이에요.', zh: '我是班长。' },
      tip: '받침 ㅇ → 이에요',
    },
    {
      id: 'd06-w2',
      korean: '우리',
      hangul: 'u-ri',
      zh: '我们',
      pos: '代词',
      example: { ko: '우리는 반 친구예요.', zh: '我们是同学。' },
      tip: '韩国人也用「우리」表示"我"(우리 엄마=我妈)，集体感很强',
    },
    {
      id: 'd06-w3',
      korean: '좋아해요',
      hangul: 'jo-a-hae-yo',
      zh: '喜欢',
      pos: '动词',
      example: { ko: 'KPOP 좋아해요.', zh: '喜欢 KPOP。' },
      tip: '动词原形「좋아하다」，前面用「을/를」：KPOP을 좋아해요',
    },
    {
      id: 'd06-w4',
      korean: '잘 부탁드려요',
      hangul: 'jal bu-tak-deu-ryeo-yo',
      zh: '请多关照',
      pos: '表达',
      example: { ko: '신입생 토리예요, 잘 부탁드려요.', zh: '我是新生兔莉，请多关照。' },
      tip: '比「잘 부탁합니다」更柔和，韩国人日常更爱用',
    },
    {
      id: 'd06-w5',
      korean: '멤버',
      hangul: 'mem-beo',
      zh: '成员',
      pos: '名词',
      example: { ko: '그룹 멤버는 4명이에요.', zh: '组合成员有 4 个人。' },
      tip: '英文 member 音译。KPOP 词汇里必背',
    },
    {
      id: 'd06-w6',
      korean: '교실',
      hangul: 'gyo-sil',
      zh: '教室',
      pos: '名词',
      example: { ko: '교실은 2층이에요.', zh: '教室在 2 楼。' },
      tip: '받침 ㄹ → 이에요 / 은',
    },
  ],

  dialogue: {
    scene: '한빛어학원 102 教室 · 第一节课前',
    setting: {
      time: '上午 9 点',
      place: '教室',
      npc: 'Junho 老虎',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '안녕하세요, 반장 준호예요.',
        hangul: 'an-nyeong-ha-se-yo, ban-jang jun-ho-ye-yo',
        zh: '你好，我是班长 Junho。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: 'KPOP 좋아해요. 잘 부탁드려요.',
        hangul: 'KPOP jo-a-hae-yo. jal bu-tak-deu-ryeo-yo',
        zh: '喜欢 KPOP。请多关照。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '안녕하세요, 토리예요. 잘 부탁드려요.',
        hangul: 'an-nyeong-ha-se-yo, to-ri-ye-yo. jal bu-tak-deu-ryeo-yo',
        zh: '你好，我是兔莉。请多关照。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '중국에서 왔어요?',
        hangul: 'jung-guk-e-seo wa-sseo-yo',
        zh: '你从中国来吗？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Junho 问"你是中国人吗"，兔莉应该怎么回答？',
        practice: 'pick',
        choices: [
          { ko: '네, 중국 사람이에요.', zh: '是的，我是中国人。', correct: true },
          { ko: '아니요, 한국 사람이에요.', zh: '不，我是韩国人。', correct: false },
          { ko: '여기는 교실이에요.', zh: '这里是教室。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '是非疑问 · ~이에요? / ~예요?',
    pattern: 'N + 이에요? / 예요? （升调）',
    whenToUse: '问"是 ___ 吗？"。其实就是把陈述句的句尾升调，无需变形。',
    rules: [
      '陈述：학생**이에요**. (我是学生。) → 疑问：학생**이에요?** (你是学生吗？)',
      '陈述：토리**예요**. (是兔莉。) → 疑问：토리**예요?** (是兔莉吗？)',
      '韩文里没有问号字符规定，全靠句末升调。书面用「?」标',
    ],
    examples: [
      { ko: '중국 사람이에요?', zh: '是中国人吗？', highlight: '이에요?' },
      { ko: '학생이에요?', zh: '是学生吗？', highlight: '이에요?' },
      { ko: '반장이에요?', zh: '是班长吗？', highlight: '이에요?' },
      { ko: '토리예요?', zh: '是兔莉吗？', highlight: '예요?' },
    ],
    pitfall:
      '别和「~입니까?」混。「입니까?」最正式（合쇼체疑问），「이에요?」温暖礼貌。Junho 是同学，用「이에요?」最自然。',
  },

  output: [
    {
      id: 'd06-o1',
      kind: 'compose',
      zhHint: '是中国人吗？',
      tokens: ['중국', '사람이에요', '?', '예요', '학생이에요', '한국'],
      composeAnswer: ['중국', '사람이에요', '?'],
      successMsg: 'Junho 听到答案，眼睛瞬间亮了，掏出了 KPOP 应援棒 ✨',
    },
    {
      id: 'd06-o2',
      kind: 'listen-choice',
      audioKo: 'KPOP 좋아해요?',
      successMsg: '✓ 「喜欢 KPOP 吗？」「좋아해요」+ 升调 = 疑问。',
      choices: [
        { zh: '喜欢 KPOP 吗？', correct: true },
        { zh: '听 KPOP 吗？', correct: false },
        { zh: '是 KPOP 团成员吗？', correct: false },
        { zh: '请多关照。', correct: false },
      ],
    },
    {
      id: 'd06-o3',
      kind: 'zh-to-ko',
      zhPrompt: '你好，我是兔莉。请多关照。',
      successMsg: '"잘 부탁드려요" 比「잘 부탁합니다」更柔。「토리」无받침配「예요」。',
      choices: [
        { ko: '안녕하세요, 토리예요. 잘 부탁드려요.', correct: true },
        { ko: '안녕하세요, 토리이에요. 잘 부탁드려요.', correct: false },
        { ko: '안녕하세요, 토리예요. 잘 부탁이에요.', correct: false },
        { ko: '안녕히 가세요, 토리예요. 잘 부탁드려요.', correct: false },
      ],
    },
    {
      id: 'd06-o4',
      kind: 'particle-error',
      zhHint: '我是班长。',
      successMsg: '반장 末字「장」有받침 ㅇ → 이에요。「저는」(无받침) → 主题助词「는」。',
      choices: [
        { ko: '저는 반장이에요.', correct: true },
        { ko: '저는 반장예요.', correct: false },
        { ko: '저은 반장이에요.', correct: false },
        { ko: '저는 반장이예요.', correct: false },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '一周就有了两个朋友。Minji + Haru + Junho。토리, 너무 잘했어요!',
    preview: '明天宿管阿姨要做第一次入住检查。一周下来学的话能撑过去吗？',
    stickerId: 'sticker-d06',
  },

  carrotHint:
    '今天的胡萝卜：「~이에요?和~입니까?有什么区别」「KPOP相关韩语怎么说」「韩语怎么说我喜欢」',
};
