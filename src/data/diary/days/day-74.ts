import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 74 · 부산 사투리 · "가가?" 가 "그래"?
 *
 * 剧情：Tori发现부산人说话和兽尔不一样——"그래"变成"가가"，"네"变成"오이"。她完全听不懂。
 * 韩语刚听懂，方言又听不懂了——语言这条路，永远有下一段。
 *
 * 学习目标：방언 어휘 · 표준어 대조 / 어리둥절 감정
 * 语料层级：해요体
 */
export const day74: ToriDay = {
  level: 'advanced',
  day: 14,
  phase: 'mastery',
  title: '釜山方言 · "가가?" 가 "그래"?',
  subtitle: '刚听懂标准语，方言又开始了',
  heroImageUrl: '/images/diary/day-74-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 30일 · 토요일 오후',
    weather: '부산 · 맑음',
    toriPose: 'shy',
    diaryText: `11月30日，同一天，下午 3 点。

釜山南浦洞。想在市场里挑几件衣服。

在一家糖饼摊前，我指着东西问："저기요, 이거 얼마예요?"（不好意思，这个多少钱？）

老板回了一句：

"만원이더. 마이 사가라!"

——"…啥？"

我瞪大眼睛，旁边的 Junho 憋着笑帮我翻译："他说是一万韩元，多买点。"

——啊，是方言……

继续往前走。一家小卖部的阿姨招呼客人："오이소~ 오이소~"

Junho："意思就是 '어서 오세요'（欢迎光临）。"

这真的——是完全另一门语言吧？

首尔学了 60 天韩语，来到釜山又变回听不懂的第一天。

Haru 笑着说："괜찮아. 부산 사람들은 표준어로 다시 말해줘. '한 번 더 천천히 말씀해 주세요' 라고 부탁하면 돼."
（没事。釜山人被你请求一下，会用标准语再说一次。你只要说"能不能再慢慢说一遍"。）

——这句话我熟。Day 63 打工第一天用过。

那天下午，我在市场的小巷子里学了几个方言词：

- 오이소 = 어서 오세요（欢迎）
- 마이 사가라 = 많이 사 가세요（多买点）
- 우야노 = 어떻게 해요（怎么办）
- 가가 = 그래 / 그 아이（是啊 / 那孩子）

学韩语这条路——原来永远有下一页。以为 Day 60 初级毕业就到头了，Day 74 又开始了一场叫"方言"的新初级。

不过，挺开心的。`,
  },

  words: [
    {
      id: 'd74-w1',
      korean: '사투리',
      hangul: 'sa-tu-ri',
      zh: '方言',
      pos: '名词',
      example: { ko: '부산 사투리를 처음 들었어요.', zh: '第一次听釜山方言。' },
      tip: 'Day 64 复习. 이 날은 실전',
    },
    {
      id: 'd74-w2',
      korean: '표준어',
      hangul: 'pyo-jun-eo',
      zh: '标准语',
      pos: '名词',
      example: { ko: '표준어로 다시 말씀해 주세요.', zh: '请再用标准语说一遍。' },
      tip: '标(표) + 准(준) + 语(어). 사투리 반의',
    },
    {
      id: 'd74-w3',
      korean: '통역',
      hangul: 'tong-yeok',
      zh: '翻译（口译）',
      pos: '名词',
      example: { ko: '준호가 통역해줬어요.', zh: 'Junho帮翻译了。' },
      tip: '通(통) + 译(역). 통역하다 = 口译',
    },
    {
      id: 'd74-w4',
      korean: '알아듣다',
      hangul: 'a-ra-deut-da',
      zh: '听懂',
      pos: '动词',
      example: { ko: '못 알아들어요.', zh: '听不懂。' },
      tip: 'ㄷ 불규칙: 알아듣다 → 알아들어요',
    },
    {
      id: 'd74-w5',
      korean: '여정',
      hangul: 'yeo-jeong',
      zh: '旅程',
      pos: '名词',
      example: { ko: '한국어 여정에는 다음 페이지가 있어요.', zh: '韩语旅程还有下一页。' },
      tip: '旅(여) + 程(정). 시적 어휘',
    },
    {
      id: 'd74-w6',
      korean: '어리둥절하다',
      hangul: 'eo-ri-dung-jeol-ha-da',
      zh: '茫然/糊涂',
      pos: '形容词',
      example: { ko: '사투리 앞에서 어리둥절했어요.', zh: '在方言前茫然了。' },
      tip: '고유어 감정형용사. "什么鬼？"的感觉',
    },
  ],

  dialogue: {
    scene: '부산 남포동·호떡 아저씨',
    setting: {
      time: '周六 15:30',
      place: '부산 남포동 시장',
      npc: '호떡 아저씨 / 매점 아주머니 / Junho / Haru',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '저기요, 이거 얼마예요?',
        hangul: 'jeo-gi-yo, i-geo eol-ma-ye-yo?',
        zh: '这个多少钱？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '호떡 아저씨',
        ko: '만원이더. 마이 사가라!',
        hangul: 'ma-nwon-i-deo. ma-i sa-ga-ra!',
        zh: '一万元。多买点！(방언)',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '...뭐라고? 못 알아들었어.',
        hangul: 'mwo-ra-go? mot a-ra-deu-reo-sseo',
        zh: '……什么？没听懂。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '"만 원이다, 많이 사 가라" 라는 뜻이야.',
        hangul: 'man won-i-da, ma-ni sa ga-ra ra-neun tteu-si-ya',
        zh: '意思是"一万元、多买点"。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '괜찮아. 부산 사람들은 부탁하면 표준어로 다시 말해줘.',
        hangul: 'gwaen-cha-na. bu-san sa-ram-deu-reun bu-ta-ka-myeon pyo-jun-eo-ro da-si mal-hae-jwo',
        zh: '没事。请求下他们会用标准语再说。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '호떡 아저씨面前不好意思请求. Tori想礼貌用标准语问一次. 合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '죄송해요, 표준어로 한 번 더 말씀해 주실 수 있어요?', zh: '不好意思，能用标准语再说一遍吗？', correct: true },
          { ko: '방언 못 알아들으니까 하지 마세요.', zh: '听不懂方言别说了。', correct: false },
          { ko: '서울 사투리로 답할게요.', zh: '我用兽尔方言回答。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '不能听懂 → 请重说：알아듣다 · ~아/어 주실 수 있어요? 정중 요청',
    pattern: '**못 알아듣다** · **~아/어 주실 수 있어요?**',
    whenToUse: '「听不懂 → 请重说」的礼貌请求组合。Tori 사투리 앞에서 「죄송해요, 표준어로 한 번 더 **말씀해 주실 수 있어요**?」= 抱歉，能用标准语再说一遍吗？~아/어 주실 수 있어요? = 韩语最정중한 요청. 사투리/외국어 상황 필수.',
    rules: [
      '**못 알아듣다**：알아듣다(听懂) 앞에 못. 못 알아들어요 = 听不懂. ㄷ 불규칙',
      '**~아/어 주실 수 있어요?**: 请求의 최정중형. 요청 시 상대에게 부담 최소화',
      '**정중도 순서**: 해 주세요 (Day 54) < 해 주실래요? < 해 주실 수 있어요? < 해 주실 수 있으실까요? (최정중)',
      '**~아/어 주다 (Day 46 재활용)**: 施惠. + 시 (敬语) + ㄹ 수 있어요 (Day 38) + ? (의문)'
    ],
    examples: [
      { ko: '표준어로 한 번 더 말씀해 주실 수 있어요?', zh: '能用标准语再说一遍吗？', highlight: '말씀해 주실 수 있어요', note: '말씀하다(敬语说) + 아/어 주다 + 시 + ㄹ 수 있어요' },
      { ko: '못 알아들었어요.', zh: '没听懂。', highlight: '못 알아들었어요', note: '알아듣다 → 알아들었어요 (ㄷ 불규칙 과거)' },
      { ko: '천천히 말씀해 주실 수 있어요?', zh: '能慢点说吗？', highlight: '천천히 말씀해 주실 수', note: 'Day 63 처음 학습한 문장의 정중판' },
      { ko: '통역해 주실 수 있어요?', zh: '能帮翻译吗？', highlight: '통역해 주실 수', note: '통역하다 → 통역해 주실 수. 방언·외국어 상황' },
    ],
    pitfall:
      '① **정중도 4단계**: ~아/어 주세요 (친근 정중) → ~아/어 주실래요? (부드러운 요청) → ~아/어 주실 수 있어요? (조심스러운 요청) → ~아/어 주실 수 있으실까요? (最정중). 사투리/외국어 요청은 3~4단계가 자연스러움. ② 알아듣다 ㄷ 불규칙: 알아듣다 → 알아들어요/알아들었어요. ③ 못 알아들다 vs 안 알아듣다: 못 = 능력 부족(听不懂), 안 = 의도적 안 들음.',
  },

  output: [
    {
      id: 'd74-o1',
      kind: 'compose',
      zhHint: '抱歉，能用标准语再说一遍吗？',
      tokens: ['죄송해요', '표준어로', '한 번 더 말씀해 주실 수 있어요', '한 번 더 말해', '방언으로', '천천히 하세요'],
      composeAnswer: ['죄송해요', '표준어로', '한 번 더 말씀해 주실 수 있어요'],
      successMsg: '정중 요청의 최고형. 사투리 상황 필수.',
    },
    {
      id: 'd74-o2',
      kind: 'listen-choice',
      audioKo: '만원이더. 마이 사가라!',
      successMsg: '✓ 부산 사투리 원문. 만원이더 = 만 원이다. 마이 사가라 = 많이 사 가라.',
      choices: [
        { zh: '一万元。多买点！(方言)', correct: true },
        { zh: '两万元。别买了。', correct: false },
        { zh: '这个不卖。', correct: false },
        { zh: '再来一次。', correct: false },
      ],
    },
    {
      id: 'd74-o3',
      kind: 'zh-to-ko',
      zhPrompt: '能帮翻译吗？',
      successMsg: '"통역해 주실 수 있어요?" — ~아/어 주실 수 있어요? 최정중.',
      choices: [
        { ko: '통역해 주실 수 있어요?', correct: true },
        { ko: '통역해 주세요.', correct: false },
        { ko: '통역해 줄래요?', correct: false },
        { ko: '통역합니까?', correct: false },
      ],
    },
    {
      id: 'd74-o4',
      kind: 'particle-error',
      zhHint: '没听懂。',
      successMsg: '알아듣다 → **알아들었어요** (ㄷ 불규칙). 못 + 과거.',
      choices: [
        { ko: '못 알아들었어요.', correct: true },
        { ko: '못 알아듣었어요.', correct: false },
        { ko: '못 알아듣아요.', correct: false },
        { ko: '못 알아들으었어요.', correct: false },
      ],
    },
    {
      id: 'd74-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 74 全对. 사투리 4개 배웠어요.',
      pairs: [
        { ko: '사투리', zh: '方言' },
        { ko: '표준어', zh: '标准语' },
        { ko: '통역', zh: '翻译' },
        { ko: '알아듣다', zh: '听懂' },
        { ko: '어리둥절하다', zh: '茫然' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '방언이라는 새 초급. 즐겁게 다시 시작.',
    preview: '明天 Tori 独自 부산에서 迷路하지만—이번엔 방언으로 길을 물어본다.',
    stickerId: 'sticker-d74',
    sceneImageUrl: '/images/diary/day-74-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~아/어 주실 수 있어요? 언제 정중?」「부산 사투리 재밌는 표현?」',
};
