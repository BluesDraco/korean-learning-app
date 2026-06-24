import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 24 · 三人群聊 · 约一起去咖啡馆
 *
 * 剧情：晚上 9 点，群聊「토리·민지·하루·준호」突然炸了。
 * Junho: 내일 학교 끝나고 카페 갈래?
 * Minji: 좋아! 새로 생긴 데 있어. 같이 가요!
 * Haru: 콜! 토리도 와!
 * 兔莉看着手机愣了几秒——
 * 这是她第一次被群聊@。她要不要回？怎么回？回什么？
 * 学了 24 天，她终于敢打字了。
 *
 * 学习目标：같이 + ~봐요 / ~ㄹ래요? / 当然지 / 群聊回复
 * 韩语自审：korean skill PASS (자연스러운 친구 채팅체)
 */
export const day24: ToriDay = {
  level: 'beginner',
  day: 24,
  phase: 'expression',
  title: '群聊炸了 · 三个人在等我回',
  subtitle: '第一次被韩国朋友@',
  isCheckpoint: null,
  estimatedMin: 12,

  opening: {
    date: '9월 27일 수요일 저녁',
    weather: '兽尔 · 阴',
    toriPose: 'shy',
    diaryText: `9월 27日，周三晚上 9 点。

我正躺在床上刷手机。
胡萝卜在床头点头。

突然——
群聊「토리·민지·하루·준호」炸了。
KakaoTalk 通知一连串。

**준호 🐯:** 내일 학교 끝나고 카페 갈래?
（明天放学一起去咖啡馆吗？）

**민지 🦦:** 좋아! 새로 생긴 데 있어. 같이 가요!
（好！有家新开的。一起去吧！）

**하루 🐹:** 콜! 토리도 와!
（OK！兔莉也来！）

我看着手机愣了几秒。
这是我第一次被群聊@。

要不要回？
怎么回？
回什么？

我深吸一口气。
胡萝卜在背包里安静地看着我。

我打字——
"같이 가요! 어디서 만나요?"
（一起去！在哪里见面？）

3 秒后。

**준호:** 학교 정문 5시!
（学校正门 5 点！）

**민지:** 우리 토리도 한국어 많이 늘었네 ㅋㅋ
（我们兔莉韩语进步好多哈哈。）

**하루:** 진짜 ㅎㅎ
（真的哈哈。）

我看着屏幕，
脸有点热。
胡萝卜也好像在笑。

24 天了。
我终于敢在韩语群聊里打字了。`,
  },

  words: [
    {
      id: 'd24-w1',
      korean: '같이',
      hangul: 'ga-chi',
      zh: '一起',
      pos: '副词',
      example: { ko: '같이 가요.', zh: '一起去。' },
      tip: '注意发音：같이 → 가치 (구개음화)。和「-아/어 봐요」搭配是邀请最高频组合',
    },
    {
      id: 'd24-w2',
      korean: '갈래?',
      hangul: 'gal-lae',
      zh: '要去吗? (半语)',
      pos: '表达',
      example: { ko: '카페 갈래?', zh: '要去咖啡馆吗？' },
      tip: '动词 + (으)ㄹ래? = 朋友邀请。比 갈래요? 更亲密',
    },
    {
      id: 'd24-w3',
      korean: '콜',
      hangul: 'kol',
      zh: 'OK / 成交',
      pos: '感叹词',
      example: { ko: '콜! 가자!', zh: 'OK！走！' },
      tip: 'call 音译。年轻人口语 / 카톡 (KakaoTalk) 常用',
    },
    {
      id: 'd24-w4',
      korean: '새로 생긴',
      hangul: 'sae-ro saeng-gin',
      zh: '新开的',
      pos: '表达',
      example: { ko: '새로 생긴 카페 있어요.', zh: '有家新开的咖啡馆。' },
      tip: '새로(新地) + 생기다(产生) 过去时定语形 → 新开张的',
    },
    {
      id: 'd24-w5',
      korean: '만나요',
      hangul: 'man-na-yo',
      zh: '见面',
      pos: '动词',
      example: { ko: '어디서 만나요?', zh: '在哪里见？' },
      tip: '만나다 → 만나요. 不变形 (词干 ㅏ + 아 = 缩为 만나)',
    },
    {
      id: 'd24-w6',
      korean: '당연하지',
      hangul: 'dang-yeon-ha-ji',
      zh: '当然了',
      pos: '表达',
      example: { ko: '같이 가? 당연하지!', zh: '一起去？当然了！' },
      tip: '半语 (-지)。朋友间表达"那还用问"。敬语 = 당연하죠',
    },
  ],

  dialogue: {
    scene: 'KakaoTalk 群聊 · 토리·민지·하루·준호',
    setting: {
      time: '周三晚 9 点',
      place: '兔莉的床上 + 群聊',
      npc: 'Junho / Minji / Haru',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '내일 학교 끝나고 카페 갈래?',
        hangul: 'nae-il hak-gyo kkeun-na-go ka-pe gal-lae',
        zh: '明天放学一起去咖啡馆吗？',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '좋아! 새로 생긴 데 있어. 같이 가요!',
        hangul: 'jo-a! sae-ro saeng-gin de i-sseo. ga-chi ga-yo',
        zh: '好！有家新开的。一起去吧！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '같이 가요! 어디서 만나요?',
        hangul: 'ga-chi ga-yo! eo-di-seo man-na-yo',
        zh: '一起去！在哪里见？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '학교 정문 5시!',
        hangul: 'hak-gyo jeong-mun da-seot-si',
        zh: '学校正门 5 点！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Haru 又发"토리도 진짜 올 거지?"(兔莉也真的会来吧?)，兔莉应该如何用朋友间最自然的方式回答？',
        practice: 'pick',
        choices: [
          { ko: '당연하지! 진짜 가요!', zh: '当然了！真的去！', correct: true },
          { ko: '아니요, 안 가요.', zh: '不去。', correct: false },
          { ko: '얼마예요?', zh: '多少钱？', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '邀请朋友 · 같이 + ~아/어요 · ~(으)ㄹ래요?',
    pattern: '同伴 같이 + 动词 해요体 / 同伴 (으)ㄹ래요? (半语 (으)ㄹ래?)',
    whenToUse: '邀请朋友、问对方意愿。比命令式「갑시다」更柔和、像在征求意见。',
    rules: [
      '**같이 + 동사 해요체** = 一起做某事 (建议)：같이 **가요** / 같이 **봐요**',
      '**동사 + (으)ㄹ래요?** = 你要做...吗？(问意愿)：카페 **갈래요?** / 영화 **볼래요?**',
      '朋友间半语：**(으)ㄹ래?** : 갈래? / 볼래? — 长辈/陌生人不能用',
      '回应 "好的!" 用「좋아요 / 그래요 / 당연하지」三档亲密度',
    ],
    examples: [
      { ko: '같이 가요!', zh: '一起去！', highlight: '같이' },
      { ko: '카페 갈래요?', zh: '要去咖啡馆吗？', highlight: '갈래요' },
      { ko: '영화 볼래?', zh: '看电影吗？(朋友)', highlight: '볼래' },
      { ko: '당연하지! 같이 가요!', zh: '当然了！一起去！', highlight: '당연하지' },
    ],
    pitfall:
      '群聊里和朋友别用「가요」「갑시다」开头——太书面。改成「같이 가요!」或「같이 가자!」更自然。年轻人카톡里还会大量用 ㅋㅋ (哈哈) / ㅎㅎ (呵呵) — 模仿即可。',
  },

  output: [
    {
      id: 'd24-o1',
      kind: 'compose',
      zhHint: '一起去！在哪里见？',
      tokens: ['같이', '가요', '!', '어디서', '만나요', '?', '있어요', '갔어요'],
      composeAnswer: ['같이', '가요', '!', '어디서', '만나요', '?'],
      successMsg: 'Junho 秒回："학교 정문 5시!" ✓ 你的第一条群聊消息发出去了。',
    },
    {
      id: 'd24-o2',
      kind: 'listen-choice',
      audioKo: '카페 갈래?',
      successMsg: '✓ 「要去咖啡馆吗？」「-(으)ㄹ래?」是朋友间征求意愿的半语。「갈래요?」是敬语版。',
      choices: [
        { zh: '要去咖啡馆吗？(朋友)', correct: true },
        { zh: '要去咖啡馆吗？(对长辈)', correct: false },
        { zh: '一起去咖啡馆。', correct: false },
        { zh: '咖啡馆在哪里？', correct: false },
      ],
    },
    {
      id: 'd24-o3',
      kind: 'zh-to-ko',
      zhPrompt: '我们看电影吗？(对朋友)',
      successMsg: '"영화 볼래?" — 「보다」(看) 词干末 ㅗ → 「(으)ㄹ래?」直接接「볼래?」。半语对朋友。',
      choices: [
        { ko: '영화 볼래?', correct: true },
        { ko: '영화 본래?', correct: false },
        { ko: '영화 봐요?', correct: false },
        { ko: '영화 보다?', correct: false },
      ],
    },
    {
      id: 'd24-o4',
      kind: 'particle-error',
      zhHint: '在哪里见？',
      successMsg: '「어디」+「서」(在某处)+「만나요」(见面)。「-에서」是动作发生地点助词。',
      choices: [
        { ko: '어디서 만나요?', correct: true },
        { ko: '어디에 만나요?', correct: false },
        { ko: '어디로 만나요?', correct: false },
        { ko: '어디서 만나다?', correct: false },
      ],
    },
  ],

  recap: {
    toriPose: 'happy',
    praise: '24 天，你终于在韩语群聊里打字了。'
      + '让 Minji 说「토리 한국어 많이 늘었네」。',
    preview: '明天 Junho 又给了我新任务——한강公园演唱会要一起喊应援。我能跟上吗？',
    stickerId: 'sticker-d24',
  },

  carrotHint:
    '今天的胡萝卜：「韩国 카톡 群聊 用语」「같이 vs ㄹ래 区别」「당연하지/당연하죠 何时用」',
};
