import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 24 · 群聊炸了 · 三个人在等我回
 *
 * 剧情：晚上群聊炸了。Junho提议去新咖啡馆，Minji附和，Haru说好。
 * 三人都@了Tori等她回复。第一次被韩国朋友约——这种被需要的感觉真好。
 *
 * 学习目标：邀请与回应（같이/갈래요/당연하지）/ 약속 表达
 * 语料层级：해요体 + 반말（群聊朋友语气混用）
 * 韩语自审：korean skill PASS（자연성/문법/조사 三关）
 */
export const day24: ToriDay = {
  level: 'beginner',
  day: 24,
  phase: 'expression',
  title: '群聊炸了 · 三个人在等我回',
  subtitle: '第一次被韩国朋友@',
  heroImageUrl: '/images/diary/day-24-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 24일 · 화요일 저녁',
    weather: '兽尔 · 夜晚',
    toriPose: 'shy',
    diaryText: `9月24日，周二晚上。

手机震个不停。
群聊里三十几条消息。

Junho：내일 학교 끝나고 카페 갈래?
Minji：좋아! 새로 생긴 데 있어!
Haru：나도 갈래~

然后三个人同时@了我：
"토리는??"

我盯着屏幕笑了。
来韩国快一个月了——
第一次被朋友们等着回复。

我打字：같이 가요!
发送。`,
  },

  words: [
    {
      id: 'd24-w1',
      korean: '같이',
      hangul: 'ga-chi',
      zh: '一起',
      pos: '副词',
      example: { ko: '같이 가요!', zh: '一起去吧！' },
      tip: '같이 发音是 [가치]，不是 [같이]。ㅌ음화 규칙',
    },
    {
      id: 'd24-w2',
      korean: '갈래?',
      hangul: 'gal-lae',
      zh: '要去吗？',
      pos: '表达',
      example: { ko: '카페 갈래?', zh: '去咖啡馆吗？' },
      tip: '가다 + ㄹ래(요)? = 갈래(요)?。Day 15 学过的 을래요 的반말形',
    },
    {
      id: 'd24-w3',
      korean: '콜',
      hangul: 'kol',
      zh: 'OK（俚语）',
      pos: '感叹词',
      example: { ko: '내일 5시? 콜!', zh: '明天5点？OK！' },
      tip: '英语 call 的韩式用法 = "成交/就这么定了"。年轻人群聊常用',
    },
    {
      id: 'd24-w4',
      korean: '새로 생긴',
      hangul: 'sae-ro saeng-gin',
      zh: '新开的',
      pos: '表达',
      example: { ko: '새로 생긴 카페가 있어요.', zh: '有一家新开的咖啡馆。' },
      tip: '새로(新) + 생기다(出现/开) → 생긴(관형형) = 新出现的',
    },
    {
      id: 'd24-w5',
      korean: '만나요',
      hangul: 'man-na-yo',
      zh: '见面',
      pos: '动词',
      example: { ko: '어디서 만나요?', zh: '在哪见？' },
      tip: '만나다(见面) → 만나요(해요体)。만나 末元音 ㅏ → 아요 缩合',
    },
    {
      id: 'd24-w6',
      korean: '당연하지',
      hangul: 'dang-yeon-ha-ji',
      zh: '当然了',
      pos: '表达',
      example: { ko: '갈 거지? 당연하지!', zh: '你会去吧？当然了！' },
      tip: '당연하다(当然) + 지(반말确认语尾)。朋友间表示"那还用说"',
    },
  ],

  dialogue: {
    scene: '群聊·四人约定',
    setting: {
      time: '周二晚上',
      place: '手机群聊',
      npc: 'Junho / Minji / Haru',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '내일 학교 끝나고 카페 갈래?',
        hangul: 'nae-il hak-gyo kkeun-na-go ka-pe gal-lae?',
        zh: '明天放学去咖啡馆吗？',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '좋아! 새로 생긴 데 있어. 같이 가자!',
        hangul: 'jo-a! sae-ro saeng-gin de i-sseo. ga-chi ga-ja!',
        zh: '好！有家新开的。一起去吧！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '같이 가자! 어디서 만나?',
        hangul: 'ga-chi ga-ja! eo-di-seo man-na?',
        zh: '一起去！在哪见？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '학교 정문 5시!',
        hangul: 'hak-gyo jeong-mun da-seot-si!',
        zh: '学校正门5点！',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '토리 진짜 올 거지?',
        hangul: 'to-ri jin-jja ol geo-ji?',
        zh: '兔莉你真的会来吧？',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: 'Haru问Tori真的会来吗，Tori应该怎么肯定回答？',
        practice: 'pick',
        choices: [
          { ko: '당연하지! 진짜 갈게!', zh: '当然了！真的去！', correct: true },
          { ko: '몰라.', zh: '不知道。', correct: false },
          { ko: '카페가 뭐야?', zh: '咖啡馆是什么？', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '邀请与回应：같이 / 갈래요 / 당연하지',
    pattern: '**같이** V요 = 一起做  |  V **ㄹ래요?** = 要不要做？  |  **당연하지!** = 当然了！',
    whenToUse: '韩国朋友约你出去的标准三件套：提议(갈래?)→附和(같이 가요!)→确认(당연하지!)。Day 24 群聊里完美演示了这套流程。',
    rules: [
      '**같이 用法**：같이 + 动词해요体 = 一起做___。같이 가요(一起去) / 같이 먹어요(一起吃) / 같이 공부해요(一起学)。같이 放在动词前面',
      '**갈래(요)? 用法**：가다 + ㄹ래요? = 要去吗？。提议/邀请的语气。반말 = 갈래?；해요체 = 갈래요?。Day 15 学过的 을래요 在这里做疑问',
      '**당연하지 用法**：당연하다(当然) + 지(반말确认)。强烈肯定"那还用说"。해요体 = 당연하죠。比 네 更热情的回应',
      '**콜 用法**：英语 call → "成交/就这么定"。非正式约定时年轻人爱用。"내일 5시? 콜!"（明天5点？成交！）',
      '**어디서 만나요? 用法**：约定时间后紧接确认地点。어디서(在哪里) + 만나요(见面)。서 = 에서 的缩写，表动作发生地点',
      '**끝나고 用法**：끝나다(结束) + 고(然后) = 结束之后。"학교 끝나고"= 放学后。고 连接两个动作的先后顺序',
      '**새로 생긴 用法**：새로(新) + 생기다(出现) → 생긴(관형형·过去) = 新开的/新出现的。修饰后面的名词',
    ],
    examples: [
      { ko: '같이 가요!', zh: '一起去吧！', highlight: '같이', note: '같이 + 가요。最简单的邀请附和句。발음 [가치]' },
      { ko: '카페 갈래요?', zh: '去咖啡馆吗？', highlight: '갈래요', note: '가다 词干"가"无收音 + ㄹ래요? = 갈래요?。邀请提议句' },
      { ko: '당연하지! 꼭 갈게.', zh: '当然了！一定去。', highlight: '당연하지', note: '당연하다 + 지(반말)。꼭 = 一定。朋友间强烈肯定' },
      { ko: '어디서 만나요?', zh: '在哪见？', highlight: '어디서', note: '어디(哪里) + 서(에서缩写·动作地点)。约定必问句' },
      { ko: '새로 생긴 카페가 있어.', zh: '有家新开的咖啡馆。', highlight: '새로 생긴', note: '새로(新) + 생기다→생긴(过去관형형)。修饰 카페' },
    ],
    pitfall:
      '① 같이 发音是 [가치] 不是 [같이]！口盖化规则（구개음화：ㅌ+ㅣ→ㅊ）。② 갈래요 只用于第一/第二人称提议，不能说"그 사람 갈래요"（第三人称）❌。③ 당연하지 是반말！对老师/长辈要用 당연하죠 或 당연히요。',
  },

  output: [
    {
      id: 'd24-o1',
      kind: 'compose',
      zhHint: '一起去吧！在哪见？（해요体·万能礼貌）',
      tokens: ['같이', '가요', '어디서', '만나요', '갈래요', '있어요'],
      composeAnswer: ['같이', '가요', '어디서', '만나요'],
      successMsg: '같이 가요! 어디서 만나요? — 해요体万能礼貌版。对朋友群聊时也可切 반말: 같이 가자! 어디서 만나?',
    },
    {
      id: 'd24-o2',
      kind: 'listen-choice',
      audioKo: '내일 학교 끝나고 카페 갈래?',
      successMsg: '✓ 끝나고 = 结束后；갈래? = 要去吗？。朋友的随意邀请。',
      choices: [
        { zh: '明天放学去咖啡馆吗？', correct: true },
        { zh: '明天学校结束了。', correct: false },
        { zh: '咖啡馆在学校旁边。', correct: false },
        { zh: '明天不去学校。', correct: false },
      ],
    },
    {
      id: 'd24-o3',
      kind: 'zh-to-ko',
      zhPrompt: '当然了！真的去！（对朋友）',
      successMsg: '"당연하지! 진짜 갈게!" — 群聊里 반말 干脆回应朋友。',
      choices: [
        { ko: '당연하지! 진짜 갈게!', correct: true },
        { ko: '당연하지! 진짜 가요!', correct: false },
        { ko: '당연하지! 안 갈게!', correct: false },
        { ko: '네, 알겠습니다.', correct: false },
      ],
    },
    {
      id: 'd24-o4',
      kind: 'particle-error',
      zhHint: '一起去咖啡馆吗？',
      successMsg: '같이 [가치] + 가다→갈래요?（ㄹ래요 提议）。',
      choices: [
        { ko: '같이 카페 갈래요?', correct: true },
        { ko: '같이 카페 갈래요.', correct: false },
        { ko: '같이 카페 가요?', correct: false },
        { ko: '같이 카페 갈게요?', correct: false },
      ],
    },
    {
      id: 'd24-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 24 全对。明天정문 5시，四个人不见不散！',
      pairs: [
        { ko: '같이', zh: '一起' },
        { ko: '갈래?', zh: '要去吗？' },
        { ko: '콜', zh: 'OK/成交' },
        { ko: '만나요', zh: '见面' },
        { ko: '당연하지', zh: '当然了' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '친구들이 기다리고 있었어요! 같이 가요, 토리!',
    preview: '明天四人在汉江边——一起喊应援口号！사랑해! 따라해!',
    stickerId: 'sticker-d24',
    sceneImageUrl: '/images/diary/day-24-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「같이和갈래요怎么搭配用？」「당연하지和네有什么区别？」',
};
