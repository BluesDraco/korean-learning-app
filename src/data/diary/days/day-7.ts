import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 7 · 关卡 1 · 入住一周检查 · 浣熊宿管上门
 *
 * 剧情：周日傍晚，门铃响了。门外是浣熊宿管阿姨，怀里抱着一本巡查手册。
 * 「토리 학생, 일주일 잘 지냈죠? 잠깐 들어가도 돼요?」
 * 这是兔莉来首尔后第一次完整应付一段长对话——
 * 自我介绍、回答国籍、确认房间号、礼貌应答、最后郑重道谢。
 * 一周下来学的话能不能撑过去？她攥紧了口袋里的胡萝卜。
 *
 * 学习目标：综合复习 Day 1-6 全部 / 入住完整对话 / 礼貌完整链
 * 韩语自审：korean skill PASS（综合连贯性 + 敬语统一 + 조사）
 */
export const day7: ToriDay = {
  level: 'beginner',
  day: 7,
  phase: 'foundation',
  title: '关卡 1 · 一周入住检查',
  subtitle: '宿管阿姨敲门来了',
  isCheckpoint: 7,
  estimatedMin: 15,

  opening: {
    date: '9月 8일 일요일 저녁',
    weather: '首尔 · 雨',
    toriPose: 'shy',
    diaryText: `9月 8日，周日 17:30。
来首尔的第 7 天。
我刚切完一根妈妈给的胡萝卜准备做泡面，
门铃就响了。

门外是浣熊宿管阿姨，
怀里抱着一本厚厚的入住巡查手册。

"토리 학생, 일주일 잘 지냈죠?"
（兔莉同学，这一周过得还好吧？）
"잠깐 들어가도 돼요?"
（我能进去看一下吗？）

我深呼吸。一周学的话——
名字、国籍、房间号、问候、道谢——
全部要在这一段对话里用上。

我攥紧口袋里的胡萝卜，开门：
"네, 들어오세요."
（请进。）

📦 关卡 1 开始。`,
  },

  words: [
    {
      id: 'd07-w1',
      korean: '들어오세요',
      hangul: 'deu-reo-o-se-yo',
      zh: '请进',
      pos: '表达',
      example: { ko: '네, 들어오세요.', zh: '好的，请进。' },
      tip: '动词「들어오다」(进来) + 「-(으)세요」 礼貌请求。来访客的标准回应',
    },
    {
      id: 'd07-w2',
      korean: '일주일',
      hangul: 'il-ju-il',
      zh: '一周',
      pos: '名词',
      example: { ko: '일주일 됐어요.', zh: '过了一周。' },
      tip: '일(1) + 주일(周)。两周 = 이주일',
    },
    {
      id: 'd07-w3',
      korean: '지냈어요',
      hangul: 'ji-nae-sseo-yo',
      zh: '过得（过去时）',
      pos: '动词',
      example: { ko: '잘 지냈어요.', zh: '过得很好。' },
      tip: '动词「지내다」(过日子)的过去时。「잘 지냈어요?」= 过得好吗？',
    },
    {
      id: 'd07-w4',
      korean: '확인',
      hangul: 'hwa-gin',
      zh: '确认',
      pos: '名词',
      example: { ko: '확인 부탁드려요.', zh: '请确认一下。' },
      tip: '받침 ㄴ → 确认助词用「을」: 확인을',
    },
    {
      id: 'd07-w5',
      korean: '여기',
      hangul: 'yeo-gi',
      zh: '这里',
      pos: '代词',
      example: { ko: '여기는 제 방이에요.', zh: '这里是我的房间。' },
      tip: 'Day 5 学过。配套：거기 / 저기',
    },
    {
      id: 'd07-w6',
      korean: '문제없어요',
      hangul: 'mun-je-eop-seo-yo',
      zh: '没问题',
      pos: '表达',
      example: { ko: '네, 문제없어요.', zh: '是的，没问题。' },
      tip: '문제(问题) + 없어요(没有)。回答检查很好用',
    },
  ],

  dialogue: {
    scene: '宿舍 301 房间 · 入住一周检查',
    setting: {
      time: '周日 傍晚',
      place: '兔莉的宿舍',
      npc: '浣熊宿管',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '浣熊宿管',
        ko: '토리 학생, 일주일 잘 지냈죠?',
        hangul: 'to-ri hak-saeng, il-ju-il jal ji-naet-jyo',
        zh: '兔莉同学，这一周过得还好吧？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 잘 지냈어요. 들어오세요.',
        hangul: 'ne, jal ji-nae-sseo-yo. deu-reo-o-se-yo',
        zh: '是的，过得很好。请进。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '浣熊宿管',
        ko: '여기 301호 맞죠? 토리 학생은 중국 사람이에요?',
        hangul: 'yeo-gi 301-ho mat-jyo? to-ri hak-saeng-eun jung-guk sa-ram-i-e-yo',
        zh: '这里是 301 对吧？兔莉是中国人吗？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 맞아요. 저는 중국 사람이에요.',
        hangul: 'ne, ma-ja-yo. jeo-neun jung-guk sa-ram-i-e-yo',
        zh: '是的，没错。我是中国人。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '宿管阿姨检查完毕，说"확인 끝났어요. 잘 지내요."（检查完了，好好生活。），兔莉应该说什么？',
        practice: 'pick',
        choices: [
          { ko: '정말 감사합니다.', zh: '真的很感谢。', correct: true },
          { ko: '죄송합니다.', zh: '对不起。', correct: false },
          { ko: '여기는 어디예요?', zh: '这里是哪儿？', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '关卡总结 · Week 1 三大句尾',
    pattern: 'N + 입니다 / N + 이에요·예요 / N + 은·는',
    whenToUse: '一周下来你已经能完成完整的自我介绍。这三个核心句尾要分得清。',
    rules: [
      '**입니다** = 最礼貌的"是"。受형식场合用：토리**입니다**',
      '**이에요/예요** = 温暖礼貌的"是"。日常用：받침→이에요，无→예요',
      '**은/는** = 主题助词「至于___」：받침→은，无→는（토리**는** / 이름**은**）',
    ],
    examples: [
      { ko: '저는 토리예요.', zh: '我（话题）是兔莉。', highlight: '예요' },
      { ko: '저는 학생이에요.', zh: '我是学生。', highlight: '이에요' },
      { ko: '토리입니다.', zh: '我是兔莉。（最礼貌）', highlight: '입니다' },
      { ko: '제 이름은 토리예요.', zh: '我的名字是兔莉。', highlight: '은' },
    ],
    pitfall:
      '关卡里宿管阿姨用了「토리 학생은 중국 사람이에요?」— 这是把「토리 학생」作为话题，问「这位学生（你）是中国人吗」。注意是「학생」最后字 ㅇ 받침 → 用「은」。',
  },

  output: [
    {
      id: 'd07-o1',
      kind: 'compose',
      zhHint: '我叫兔莉。（用主题助词）',
      tokens: ['저는', '토리예요', '저는', '토리이에요', '저예요', '문제없어요'],
      composeAnswer: ['저는', '토리예요'],
      successMsg: '✓ 第一题正确。',
    },
    {
      id: 'd07-o2',
      kind: 'compose',
      zhHint: '是的，过得很好。请进。',
      tokens: ['네', '잘', '지냈어요', '들어오세요', '나가세요', '문제없어요'],
      composeAnswer: ['네', '잘', '지냈어요', '들어오세요'],
      successMsg: '✓ 第二题正确——这就是开门那一刻的完整应答。',
    },
    {
      id: 'd07-o3',
      kind: 'listen-choice',
      audioKo: '여기 301호 맞죠?',
      successMsg: '✓ 「这里是 301 号对吧？」「맞죠?」是确认句尾，比直接问更软。',
      choices: [
        { zh: '这里是 301 号对吧？', correct: true },
        { zh: '这里是教室吗？', correct: false },
        { zh: '可以进来吗？', correct: false },
        { zh: '过得好吗？', correct: false },
      ],
    },
    {
      id: 'd07-o4',
      kind: 'zh-to-ko',
      zhPrompt: '是的，没错。我是中国人。',
      successMsg: '"맞아요" 是确认。「저는」(无받침→는)，「사람이에요」(받침 ㅁ→이에요)。两条规则全对。',
      choices: [
        { ko: '네, 맞아요. 저는 중국 사람이에요.', correct: true },
        { ko: '네, 맞아요. 저은 중국 사람이에요.', correct: false },
        { ko: '네, 맞아요. 저는 중국 사람예요.', correct: false },
        { ko: '네, 정말. 저는 중국에 사람이에요.', correct: false },
      ],
    },
    {
      id: 'd07-o5',
      kind: 'match-pair',
      successMsg: '✓ 关卡 1 通关！宿管阿姨在登记册上盖了一个红章 🎉',
      pairs: [
        { ko: '들어오세요', zh: '请进' },
        { ko: '잘 지냈어요', zh: '过得很好' },
        { ko: '맞아요', zh: '对 / 没错' },
        { ko: '문제없어요', zh: '没问题' },
        { ko: '확인', zh: '确认' },
      ],
    },
  ],

  recap: {
    toriPose: 'celebrate',
    praise: '🎉 关卡 1 通关！一周入住检查完整撑过去了。토리, 정말 자랑스러워요!',
    preview: '第二周开始：明天要一个人下楼去 CU 便利店买饭。考拉店员会说什么？',
    stickerId: 'sticker-d07',
  },

  carrotHint:
    '关卡通关庆祝！可以问胡萝卜「韩语日记 Week 1 都学了什么」「Week 2 大概要学什么」「礼貌道谢有几种说法」',
};
