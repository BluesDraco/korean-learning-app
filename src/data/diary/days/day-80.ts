import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 80 · Haru 아파 · 照顾朋友
 *
 * 剧情：Haru发烧了。Tori第一次照顾别人——买药、煮粥、量体温。用韩语给医生说症状，
 * 想起Day 13自己感冒时Haru带她去药店的日子。角色反转：被照顾→照顾。
 */
export const day80: ToriDay = {
  level: 'advanced',
  day: 20,
  phase: 'mastery',
  title: 'Haru生病 · 照顾朋友',
  subtitle: 'Day 13被照顾的兔子，今天照顾朋友',
  heroImageUrl: '/images/diary/day-80-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '12월 9일 · 월요일 밤',
    weather: '兽尔 · 초겨울 추위',
    toriPose: 'shy',
    diaryText: `12月9日，周一晚上。

Haru 生病了。

回来才两天，就烧到了 38.5 度。釜山、济州两趟旅行连着跑，可能是累倒了。

我推开 302 的门进去——Haru 缩在被子里。

"토리… 미안… 감기 걸린 것 같아…"（兔莉……对不起……我好像感冒了……）

——这次，换我在 Haru 旁边。

Day 13 我感冒的时候，是 Haru 带我去药店。她替我说了那句"콧물이 나요"（我流鼻涕），又轻声说"따뜻한 물 많이 마셔요"（多喝热水）。

——现在轮到我了。

量体温 → 38.5 度。
便利店 → 感冒药、鼻涕药、水、电解质。
电水壶 → 热了点白粥。
加湿器 → 打开。

"하루야, 약 먹자. 그리고 물 많이 마셔야 돼."
（Haru，把药吃了。要多喝水。）

Haru 轻轻笑了。"...너 나 챙겨주는 거야?"（你现在是在照顾我吗？）

"당연하지. Day 13에 네가 나한테 그랬잖아."
（当然。Day 13 你就是这样照顾我的呀。）

没有去医院，我拨了医疗咨询热线，用标准韩语描述症状：

"머리가 아프고 콧물이 나고 열이 나요. 38.5도예요. 감기 같아요. 지금 상비약 먹었어요. 내일 아침에 병원 갈까요?"
（头疼、流鼻涕、发烧。38.5 度。像是感冒。我们已经吃了常备药。明早去医院可以吗？）

那头的护士笑着说："吃好药，好好睡一觉，明天来医院。"

挂了电话，Haru 小声说：

"토리, 고마워. 진짜 컸다."
（兔莉，谢谢你。真的长大了。）

——今天是第三次听到这句话。"长大"的真正意思，原来是这个：能把自己长出的力气，用来照顾另一个人。`,
  },

  words: [
    { id: 'd80-w1', korean: '아프다', hangul: 'a-peu-da', zh: '疼/生病', pos: '形容词', example: { ko: '하루가 아파요.', zh: 'Haru生病了。' }, tip: '으 脱落: 아프다 → 아파요' },
    { id: 'd80-w2', korean: '열', hangul: 'yeol', zh: '发烧', pos: '名词', example: { ko: '열이 38.5도예요.', zh: '烧到38.5度。' }, tip: '한 글자 명사. 열이 나다 = 发烧' },
    { id: 'd80-w3', korean: '증상', hangul: 'jeung-sang', zh: '症状', pos: '名词', example: { ko: '증상을 설명했어요.', zh: '说了症状。' }, tip: '症(증) + 状(상)' },
    { id: 'd80-w4', korean: '체온', hangul: 'che-on', zh: '体温', pos: '名词', example: { ko: '체온을 쟀어요.', zh: '量了体温。' }, tip: '体(체) + 温(온). 체온을 재다 = 量体温' },
    { id: 'd80-w5', korean: '챙기다', hangul: 'chaeng-gi-da', zh: '照顾/关心', pos: '动词', example: { ko: '친구를 챙겨줬어요.', zh: '照顾了朋友。' }, tip: '챙기다 → 챙겨요/챙겨주다' },
    { id: 'd80-w6', korean: '푹 자다', hangul: 'puk ja-da', zh: '好好睡', pos: '表达', example: { ko: '푹 자세요.', zh: '好好睡。' }, tip: '푹 = 深深地. 병상 인사 필수' },
  ],

  dialogue: {
    scene: '302호·Haru 방·전화',
    setting: { time: '周一 21:30', place: '한빛 기숙사 302호', npc: 'Haru / 상담 간호사' },
    lines: [
      { speaker: 'npc', npcName: 'Haru', ko: '토리… 미안… 감기 걸린 것 같아…', hangul: 'to-ri… mi-an… gam-gi geol-lin geot ga-ta…', zh: '兔莉……抱歉……好像感冒了……', practice: 'listen' },
      { speaker: 'tori', ko: '괜찮아, 내가 챙길게. 약 먹고 물 많이 마셔.', hangul: 'gwaen-cha-na, nae-ga chaeng-gil-ge. yak meok-go mul ma-ni ma-syeo', zh: '没事，我照顾你。吃药多喝水。', practice: 'shadow' },
      { speaker: 'tori', ko: '머리가 아프고 콧물이 나고 열이 나요. 38.5도예요.', hangul: 'meo-ri-ga a-peu-go kon-mu-ri na-go yeo-ri na-yo. sam-sip-pal-jjeom-o-do-ye-yo', zh: '头疼、流鼻涕、发烧。38.5度。', practice: 'shadow' },
      { speaker: 'npc', npcName: '상담 간호사', ko: '약 잘 먹고 푹 자고, 내일 병원 오세요.', hangul: 'yak jal meok-go puk ja-go, nae-il byeong-won o-se-yo', zh: '好好吃药、好好睡，明天来医院。', practice: 'listen' },
      { speaker: 'npc', npcName: 'Haru', ko: '토리, 고마워. 진짜 컸다.', hangul: 'to-ri, go-ma-wo. jin-jja keot-da', zh: '兔莉，谢谢。真长大了。', practice: 'listen' },
      { speaker: 'tori', ko: '?', hangul: '', zh: 'Haru说"진짜 컸다". Tori想温柔回应"因为你教过我". 合适的一句？', practice: 'pick',
        choices: [
          { ko: '너한테 배웠어. Day 13에 네가 그랬잖아.', zh: '跟你学的。Day 13你就这样。', correct: true },
          { ko: '난 원래 잘해.', zh: '我本来就行。', correct: false },
          { ko: '너 지금 좀 조용히 해.', zh: '你现在安静点。', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '照顾表达：~아/어 주다 (Day 46 复习) + 병 증상 설명',
    pattern: 'V + **아/어 줄게** (承诺) · **~고 ~고 ~아/어요** (症状病列)',
    whenToUse: 'Day 46 学过 ~아/어 주다 施惠. Day 80 = **자기 施惠자가 됨**. Tori 说 「내가 챙**길게**」= 我照顾你. + 症状 병렬 ~고 ~고 ~아/어요 (Day 13 재활용) = 병원/약국 필수.',
    rules: [
      '**~아/어 줄게 (Day 53)**: 我为你做. 챙길게 / 사줄게 / 데려갈게',
      '**~고 병렬 (Day 42)**: 症状 나열. 머리가 아프고 콧물이 나고 열이 나요',
      '**Day 13 재활용**: 약국 어휘 = 콧물, 감기약, 따뜻한 물',
      '**푹 자다, 잘 챙기다** — 병상 관용 표현',
    ],
    examples: [
      { ko: '내가 챙길게. 걱정 마.', zh: '我照顾你。别担心。', highlight: '챙길게', note: '챙기다 → 챙길게. Tori 오늘 承诺' },
      { ko: '머리가 아프고 콧물이 나고 열이 나요.', zh: '头疼流鼻涕发烧。', highlight: '아프고 ... 나고 ... 나요', note: '~고 病列. 병원 설명 필수' },
      { ko: '약 먹고 물 많이 마셔.', zh: '吃药多喝水。', highlight: '먹고 마셔', note: '~고 순서 + 반말 명령' },
      { ko: '푹 자고 내일 병원 오세요.', zh: '好好睡，明天来医院。', highlight: '푹 자고 ... 오세요', note: '병상 관용 어투' },
    ],
    pitfall:
      '① 症状病列 ~고 ~고 는 Day 42 배운 병렬 문형의 실전 활용. 병원/약국에서 필수. ② Day 46·53 ~아/어 줄게 는 承诺 — 오늘 Tori가 처음으로 자기가 承诺자 됨 (Day 46 은 施惠 받는 입장). ③ 병상 관용어: 푹 자다 / 잘 챙기다 / 따뜻한 물 많이 마시다 = 세트.',
  },

  output: [
    { id: 'd80-o1', kind: 'compose', zhHint: '头疼流鼻涕发烧。', tokens: ['머리가', '아프고', '콧물이', '나고', '열이 나요', '없어요', '아파서'], composeAnswer: ['머리가', '아프고', '콧물이', '나고', '열이 나요'], successMsg: '~고 병렬 症状 설명. Day 13 재현.' },
    { id: 'd80-o2', kind: 'listen-choice', audioKo: '약 잘 먹고 푹 자고, 내일 병원 오세요.', successMsg: '✓ 간호사 병상 관용 인사.', choices: [{ zh: '好好吃药、好好睡，明天来医院。', correct: true }, { zh: '别吃药，明天来医院。', correct: false }, { zh: '好好吃饭，不来医院。', correct: false }, { zh: '不睡，直接来医院。', correct: false }] },
    { id: 'd80-o3', kind: 'zh-to-ko', zhPrompt: '我照顾你。别担心。', successMsg: '"내가 챙길게. 걱정 마." — ~ㄹ게 + ~지 마.', choices: [{ ko: '내가 챙길게. 걱정 마.', correct: true }, { ko: '내가 챙기겠어. 걱정 마세요.', correct: false }, { ko: '내가 챙길래. 걱정 하지 마.', correct: false }, { ko: '내가 챙긴다. 걱정 마.', correct: false }] },
    { id: 'd80-o4', kind: 'particle-error', zhHint: '烧到38.5度。', successMsg: '열 (无收音) + **이** + 38.5도예요.', choices: [{ ko: '열이 38.5도예요.', correct: true }, { ko: '열을 38.5도예요.', correct: false }, { ko: '열은 38.5도이에요.', correct: false }, { ko: '열이 38.5도이에요 나요.', correct: false }] },
    { id: 'd80-o5', kind: 'match-pair', successMsg: '✓ Day 80 全对. Day 13의 역할 반전.', pairs: [{ ko: '아프다', zh: '生病' }, { ko: '열', zh: '发烧' }, { ko: '증상', zh: '症状' }, { ko: '체온', zh: '体温' }, { ko: '챙기다', zh: '照顾' }] },
  ],

  recap: {
    toriPose: 'proud',
    praise: 'Day 13에 받은 것을 Day 80에 돌려줬어요. 컸다는 것 = 남 챙길 수 있다는 것.',
    preview: '明天 Minji랑 사소한 일로 다퉜다. 냉전 3일.',
    stickerId: 'sticker-d80',
    sceneImageUrl: '/images/diary/day-80-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~고 ~고 症状 병렬 어떻게?」「병문안 표현 뭐가 있어?」',
};
