import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 64 · 알바 2주 후 · 终于听懂了
 *
 * 剧情：打工两周后，Tori发现能听懂客人说话了。虽然还有偶尔听不懂的时候，但大部分都能应对。
 * 熊店长夸她进步快。Tori说"虽然还不够，但在努力"——这句话她已经可以说得很自然了。
 *
 * 学习目标：성장 표현 / ~게 되다 (变得...) / 겸손 표현
 * 语料层级：해요体
 */
export const day64: ToriDay = {
  level: 'advanced',
  day: 4,
  phase: 'mastery',
  title: '打工成长 · 终于听懂了', titleEn: 'Part-time growth · Finally understood',
  subtitle: '"아직 부족하지만 노력하고 있어요"',
  heroImageUrl: '/images/diary/day-64-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 19일 · 화요일 저녁',
    weather: '兽尔 · 초겨울', weatherEn: 'Seoul · Early winter',
    toriPose: 'proud',
    diaryText: `11月19日，周二晚上。

곰다방打工第二周。

第一周天天出错——听错单、托盘倾斜洒咖啡、连小票打印机怎么开都要喊店长。

现在呢？

"아이스 아메리카노 톨, 시럽 빼고 얼음 적게요."——一次听完，直接输入 POS。
"아메리카노랑 라떼 한 잔씩, 카드 결제요."——从收款到端咖啡，一气呵成。

碰上说方言的客人还是听不懂，但只要一句"죄송해요, 다시 한 번만 말씀해 주세요."（不好意思，请再慢慢说一遍。）就能解决。

下班时店长说：

"토리, 진짜 빨리 늘었어. 다른 알바생 3개월 걸린 걸 2주에 했네."
（兔莉，你真的进步很快。别人三个月才会的，你两周就做到了。）

我笑着摇头：

"아직 부족하지만 노력하고 있어요."
（还差得远，不过在努力。）

这句话，现在能自然地说出来了。Day 33 学的"잘 지내고 있어요"，长成了"열심히 하고 있어요"。

学习就是——把昨天和今天的差距，每天一点点往前推。`,
  },

  words: [
    {
      id: 'd64-w1',
      korean: '주문',
      hangul: 'ju-mun',
      zh: '订单/点单', zhEn: 'order',
      pos: '名词', posEn: 'Noun',
      example: { ko: '주문 받았어요.', zh: '收到订单了。', zhEn: 'Received the order.' },
      tip: '注(주) + 文(문). 주문하다 = 点单 / 주문 넣다 = 下单', tipEn: '注(주) + 文(문). 주문하다 = to order / 주문 넣다 = to place an order',
    },
    {
      id: 'd64-w2',
      korean: '영수증',
      hangul: 'yeong-su-jeung',
      zh: '收据', zhEn: 'receipt',
      pos: '名词', posEn: 'Noun',
      example: { ko: '영수증 드릴까요?', zh: '要收据吗？', zhEn: 'Would you like a receipt?' },
      tip: '领(영) + 收(수) + 证(증). 결제 후 자주 묻는 말', tipEn: '领(영) + 收(수) + 证(증). A common question after payment',
    },
    {
      id: 'd64-w3',
      korean: '사투리',
      hangul: 'sa-tu-ri',
      zh: '方言', zhEn: 'dialect',
      pos: '名词', posEn: 'Noun',
      example: { ko: '사투리 쓰시는 분은 아직 어려워요.', zh: '用方言的人还是难。', zhEn: 'People who use dialect are still hard.' },
      tip: '표준어의 반대. 부산/제주 등 지역별로 다름',
    },
    {
      id: 'd64-w4',
      korean: '자연스럽다',
      hangul: 'ja-yeon-seu-reop-da',
      zh: '自然', zhEn: 'natural',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '이 문장 자연스러워요.', zh: '这句话很自然。', zhEn: 'This sentence is very natural.' },
      tip: 'ㅂ 불규칙: 자연스럽다 → 자연스러워요. 언어 학습 목표',
    },
    {
      id: 'd64-w5',
      korean: '노력하다',
      hangul: 'no-ryeo-ka-da',
      zh: '努力', zhEn: 'effort',
      pos: '动词', posEn: 'Verb',
      example: { ko: '계속 노력하고 있어요.', zh: '一直在努力。', zhEn: 'Keep working hard.' },
      tip: '努(노) + 力(력) + 하다. Day 55 열심히 는 副词, 노력하다 는 动词', tipEn: '努(노) + 力(력) + 하다. Day 55: 열심히 is an adverb, 노력하다 is a verb',
    },
    {
      id: 'd64-w6',
      korean: '흐름',
      hangul: 'heu-reum',
      zh: '流程/流向', zhEn: 'process/flow',
      pos: '名词', posEn: 'Noun',
      example: { ko: '결제 흐름이 자연스러워요.', zh: '结账流程很自然。', zhEn: 'The checkout process is very natural.' },
      tip: '흐르다(流) → 흐름(名词化). 업무 흐름 = 工作流程', tipEn: '흐르다 (to flow) → 흐름 (nominalization). 업무 흐름 = work flow',
    },
  ],

  dialogue: {
    scene: '곰다방·2주 차·퇴근',
    setting: {
      time: '周二 20:30', timeEn: 'Tuesday 20:30',
      place: '곰다방 카페',
      npc: '黑熊사장', npcEn: 'Black Bear Boss',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '黑熊사장', npcNameEn: 'Black Bear Boss',
        ko: '토리, 오늘도 수고했어. 정말 빨리 늘었어.',
        hangul: 'to-ri, o-neul-do su-go-hae-sseo. jeong-mal ppal-li neu-reo-sseo',
        zh: '兔莉，今天辛苦了。真的进步很快。', zhEn: 'Tori, you worked hard today. You\'re really improving fast.',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: '黑熊사장', npcNameEn: 'Black Bear Boss',
        ko: '다른 알바생 3개월 걸린 걸 2주에 했네.',
        hangul: 'da-reun al-ba-saeng sam-gae-wol geol-lin geol i-ju-e haet-ne',
        zh: '别的兼职3个月的东西你2周就做到了。', zhEn: 'What takes other part-timers 3 months, you did in 2 weeks.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '아직 부족하지만 노력하고 있어요.',
        hangul: 'a-jik bu-jo-ka-ji-man no-ryeo-ka-go i-sseo-yo',
        zh: '虽然还不够，但在努力。', zhEn: 'It\'s not enough yet, but I\'m trying.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '黑熊사장', npcNameEn: 'Black Bear Boss',
        ko: '그 자세가 실력을 만드는 거야.',
        hangul: 'geu ja-se-ga sil-lyeo-geul man-deu-neun geo-ya',
        zh: '这种态度就是造就实力的。', zhEn: 'This attitude is what builds real skill.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: 'Day 33의 "잘 지내고 있어요"가 오늘 "노력하고 있어요"로 커졌어.',
        hangul: 'Day 33-ui "잘 지내고 있어요"-ga o-neul "노력하고 있어요"-ro keo-jeo-sseo',
        zh: 'Day 33 的"过得好"变成了今天的"在努力"。', zhEn: 'Day 33\'s "doing well" has become today\'s "trying hard."',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '사장 说"이 자세가 실력을 만들어". Tori 想认真答"我会一直这样"。合适的一句？', zhEn: 'The boss said "이 자세가 실력을 만들어." Tori wants to answer sincerely, "I\'ll keep it up." Which sentence fits?',
        practice: 'pick',
        choices: [
          { ko: '네, 계속 이렇게 배워 나갈게요.', zh: '好的，会一直这样学下去。', zhEn: 'Okay, I\'ll keep learning like this.', correct: true },
          { ko: '아니에요, 저 이미 다 잘해요.', zh: '不，我已经全会了。', zhEn: 'No, I already know everything.', correct: false },
          { ko: '그럼 이제 안 배워도 되나요?', zh: '那现在可以不学了吧？', zhEn: 'Then can I stop studying now?', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '变得会___：~게 되다', titleEn: 'To become able to ___ : ~게 되다',
    pattern: 'V + **게 되다**',
    whenToUse: '「变得能___」的**状态变化**句尾。Tori 说 「주문을 다 알아듣게 됐어요」= 变得能全听懂订单了。~게 되다 强调**从"不能→能"的自然变化**（非主动努力），Day 64 成长主题的核心句。', whenToUseEn: 'A **state change** ending meaning "to become able to ___." Tori says 「주문을 다 알아듣게 됐어요」 = I\'ve become able to understand all the orders. ~게 되다 emphasizes a **natural change from "can\'t → can"** (not active effort), a key sentence for Day 64\'s growth theme.',
    rules: [
      '**기본**：V + 게 되다 = 变得___。알다 → 알게 되다 (变得知道). 못하다 → 못하게 되다 (变得不会)',
      '**과거 → ~게 됐어요**：알게 됐어요 = 变得知道了。 变化의 완료 시점',
      '**~게 되다 vs ~게 하다**: 되다 = 自动/自然变化. 하다 = 使动 (让别人变). 늘게 되다(自动진보) vs 늘게 하다(让人进步)',
      '**감정/능력 결합 자연**：좋아하게 되다 (变得喜欢) / 알게 되다 (变得知道)'
    ],
    examples: [
      { ko: '주문을 다 알아듣게 됐어요.', zh: '变得能全听懂订单了。', zhEn: 'I\'ve become able to understand all the orders.', highlight: '알아듣게 됐어요', note: '알아듣다 → 알아듣게 됐어요. 상태 변화' },
      { ko: '이 문장이 자연스럽게 나오게 됐어요.', zh: '这句话变得自然说出来。', zhEn: 'This sentence has become something I can say naturally.', highlight: '나오게 됐어요', note: '나오다 → 나오게 됐어요. 시간 지남에 따른 변화' },
      { ko: '한국 음식을 좋아하게 됐어요.', zh: '变得喜欢韩国料理了。', zhEn: 'I\'ve come to like Korean food.', highlight: '좋아하게 됐어요', note: '좋아하다 → 좋아하게 됐어요. 취향 변화' },
      { ko: '이제 혼자 할 수 있게 됐어요.', zh: '现在变得能独立做了。', zhEn: 'Now I\'ve become able to do it on my own.', highlight: '할 수 있게 됐어요', note: 'Day 38·51 ~(으)ㄹ 수 있어요 + ~게 되다 = 능력 획득' },
    ],
    pitfall:
      '① **~게 되다** = 자연스러운 变化. 능동적 시도 강조하려면 ~아/어 보다 (Day 43). 시간 지나서 저절로 바뀐 상황 = ~게 되다. ② 형용사엔 잘 안 씀. 예뻐지다 (예쁘다 + 어지다)가 자연. 형용사 상태 변화는 **~아/어지다** 더 자주. ③ **~게 되다 vs ~아/어지다** — 형용사는 ~아/어지다 (좋아지다), 동사는 ~게 되다 (좋아하게 되다).',
  },

  output: [
    {
      id: 'd64-o1',
      kind: 'compose',
      zhHint: '虽然还不够，但在努力。', zhHintEn: 'It\'s not enough yet, but I\'m trying.',
      tokens: ['아직', '부족하지만', '노력하고 있어요', '이제', '완벽해요', '다 됐어요'],
      composeAnswer: ['아직', '부족하지만', '노력하고 있어요'],
      successMsg: '겸손 + 진행 = 성장하는 사람의 표현.',
    },
    {
      id: 'd64-o2',
      kind: 'listen-choice',
      audioKo: '이 자세가 실력을 만드는 거야.',
      successMsg: '✓ 사장 원문. "이 자세가 실력을 만들어" — 태도가 곧 실력.',
      choices: [
        { zh: '这种态度就是造就实力的。', zhEn: 'This attitude is what builds real skill.', correct: true },
        { zh: '姿势不对没有实力。', zhEn: 'Wrong posture means no skill.', correct: false },
        { zh: '实力没有姿势重要。', zhEn: 'Skill isn\'t as important as posture.', correct: false },
        { zh: '这种姿势没用。', zhEn: 'This posture is useless.', correct: false },
      ],
    },
    {
      id: 'd64-o3',
      kind: 'zh-to-ko',
      zhPrompt: '现在变得能独立做了。', zhPromptEn: 'Now I\'ve become able to do it on my own.',
      successMsg: '"이제 혼자 할 수 있게 됐어요." — ~(으)ㄹ 수 있게 되다 = 能力 획득.', successMsgEn: '"이제 혼자 할 수 있게 됐어요." — ~(으)ㄹ 수 있게 되다 = acquiring ability.',
      choices: [
        { ko: '이제 혼자 할 수 있게 됐어요.', correct: true },
        { ko: '이제 혼자 할 수 있어요 됐어요.', correct: false },
        { ko: '이제 혼자 할 수 있어게 됐어요.', correct: false },
        { ko: '이제 혼자 할 수 있어졌어요.', correct: false },
      ],
    },
    {
      id: 'd64-o4',
      kind: 'particle-error',
      zhHint: '变得喜欢韩国料理了。', zhHintEn: 'I\'ve come to like Korean food.',
      successMsg: '좋아하다 → **좋아하게 됐어요** (자동 변화).',
      choices: [
        { ko: '한국 음식을 좋아하게 됐어요.', correct: true },
        { ko: '한국 음식이 좋아하게 됐어요.', correct: false },
        { ko: '한국 음식을 좋아지게 됐어요.', correct: false },
        { ko: '한국 음식을 좋아하고 됐어요.', correct: false },
      ],
    },
    {
      id: 'd64-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 64 全对. 2주 만에 성장했어요.', successMsgEn: '✓ Day 64 all correct. You\'ve grown in just 2 weeks.',
      pairs: [
        { ko: '주문', zh: '订单', zhEn: 'order' },
        { ko: '영수증', zh: '收据', zhEn: 'receipt' },
        { ko: '사투리', zh: '方言', zhEn: 'dialect' },
        { ko: '자연스럽다', zh: '自然', zhEn: 'natural' },
        { ko: '노력하다', zh: '努力', zhEn: 'effort' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '실수하던 나에서 배워가는 나로. "노력하고 있어요" — 이 한 마디, 이제 진심이에요.',
    preview: '明天听说北区有"猎食者街区" — 什么样的地方？', previewEn: 'I heard there\'s a "Predator District" in the north tomorrow — what kind of place is it?',
    stickerId: 'sticker-d64',
    sceneImageUrl: '/images/diary/day-64-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~게 되다 和 ~아/어지다 有什么区别？」「打工怎么才能进步快？」', carrotHintEn: 'Today\'s carrots: "What\'s the difference between ~게 되다 and ~아/어지다?" "How can I improve quickly at my part-time job?"',
};
