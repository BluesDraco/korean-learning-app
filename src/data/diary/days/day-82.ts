import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 82 · 兽尔江大桥 · 和好
 *
 * 剧情：Tori在兽尔江大桥上找到Minji。两人坐在桥边说了真心话。Minji说"너 변했어. 예전엔
 * 안 먼저 왔잖아". Tori说"한국에서 용기 내는 법 배웠어". 两人拥抱。风大但暖。
 */
export const day82: ToriDay = {
  level: 'advanced',
  day: 22,
  phase: 'mastery',
  title: '和Minji和好 · 兽尔江大桥', titleEn: 'Made up with Minji · Seoul River Bridge',
  subtitle: '"한국에서 용기 내는 법을 배웠어"',
  heroImageUrl: '/images/diary/day-82-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '12월 13일 · 금요일 저녁',
    weather: '兽尔 · 초겨울 바람 强', weatherEn: 'Seoul · Early winter wind is strong',
    toriPose: 'shy',
    diaryText: `12月13日，周五傍晚 6 点。

兽尔江大桥南端，长椅旁边。Minji 已经先到了。

——是我说了要"先去"，可 Minji 比我还早到。

"...일찍 왔네."（……你来得挺早。）
"...너 부를 것 같아서."（……我猜你会先叫我。）

三天以来的第一句对话。

我们两个都沉默着。风刮得很大。Minji 的额发被吹起。

——我先开口吧。

"민지야, 그때 미안. 내가 세게 말했어. 오해였는데도."
（民智，那天对不起。我说话太重了。虽然是误会。）

Minji 淡淡笑了。"...나도 미안. 내가 자리 뺏은 건 아닌데, 확인 안 해서."
（……我也对不起。我不是故意抢座，但我没先确认。）

风又吹过来，这次换了个方向。

"근데 토리… 너 변했어."（不过兔莉……你变了。）

"…哪里？"

"예전엔 안 먼저 왔잖아. 늘 내가 먼저 갔지."
（以前你不会主动。都是我先来找你的。）

——是的。Day 3 仁川机场，替我抗行李的是 Minji。Day 27 请我第一次会餐的是 Minji。Day 37 参加火锅派对的也是 Minji。

一直都是 Minji 先走那一步。

"한국에서 용기 내는 법 배웠어. 자존심보다 우정이 큰 거."
（在韩国我学会了拿出勇气。——自尊心哪有友情大。）

Minji 看着我。——眼里泛起了泪光。然后她伸开了双臂。

我们在桥上抱在一起。风依然很大，怀里是热的。

"토리, 진짜 컸다."

——今天又是这句话。——但今天的"长大"不一样。——因为，是我先走的那一步。`,
  },

  words: [
    { id: 'd82-w1', korean: '변하다', hangul: 'byeon-ha-da', zh: '变化', zhEn: 'change', pos: '动词', posEn: 'Verb', example: { ko: '너 변했어.', zh: '你变了。', zhEn: 'You\'ve changed.' }, tip: '变(변) + 하다. 사람 변화도 표현', tipEn: '변 (change) + 하다. Also expresses change in a person.' },
    { id: 'd82-w2', korean: '예전', hangul: 'ye-jeon', zh: '以前', zhEn: 'before', pos: '名词', posEn: 'Noun', example: { ko: '예전엔 안 그랬어.', zh: '以前不是这样。', zhEn: 'You weren\'t like this before.' }, tip: '过去 시간 표현. 옛날보다 가까운 과거', tipEn: 'Past tense expression. More recent past than before.' },
    { id: 'd82-w3', korean: '용기', hangul: 'yong-gi', zh: '勇气', zhEn: 'Courage', pos: '名词', posEn: 'Noun', example: { ko: '용기 내는 법을 배웠어요.', zh: '学到了鼓起勇气的方法。', zhEn: 'Learned how to muster up courage.' }, tip: 'Day 1 妈妈의 胡萝卜의 그 두 글자. 82일 만에 진짜 이해', tipEn: 'Day 1 Mom\'s carrot, those two letters. Truly understood after 82 days.' },
    { id: 'd82-w4', korean: '우정', hangul: 'u-jeong', zh: '友情', zhEn: 'Friendship', pos: '名词', posEn: 'Noun', example: { ko: '자존심보다 우정이 커요.', zh: '友情比自尊大。', zhEn: 'Friendship is bigger than pride.' }, tip: '友(우) + 情(정)', tipEn: '友 (woo) + 情 (jeong)' },
    { id: 'd82-w5', korean: '안다', hangul: 'an-da', zh: '拥抱', zhEn: 'Hug', pos: '动词', posEn: 'Verb', example: { ko: '다리 위에서 안았어요.', zh: '在桥上拥抱了。', zhEn: 'We hugged on the bridge.' }, tip: '안다 → 안았어요. 우정/애정 표현' },
    { id: 'd82-w6', korean: '따뜻하다', hangul: 'tta-tteu-ta-da', zh: '温暖', zhEn: 'Warm', pos: '形容词', posEn: 'Adjective.', example: { ko: '바람은 세지만 안은 따뜻해요.', zh: '风大但拥抱温暖。', zhEn: 'The wind is strong, but the hug is warm.' }, tip: '따뜻하다 → 따뜻해요. 감정 표현' },
  ],

  dialogue: {
    scene: '한강 다리 남단·벤치',
    setting: { time: '周五 18:00', timeEn: 'Friday 18:00', place: '한강 다리', npc: 'Minji' },
    lines: [
      { speaker: 'tori', ko: '민지야, 그때 미안. 내가 세게 말했어. 오해였는데도.', hangul: 'min-ji-ya, geu-ttae mi-an. nae-ga se-ge mal-hae-sseo. o-hae-yeon-neun-de-do', zh: 'Minji，那时抱歉。我话太重。明明是误会。', zhEn: 'Minji, sorry about then. I was too harsh. It was clearly a misunderstanding.', practice: 'shadow' },
      { speaker: 'npc', npcName: 'Minji', ko: '나도 미안. 내가 자리 뺏은 건 아닌데, 확인 안 해서.', hangul: 'na-do mi-an. nae-ga ja-ri ppae-seun geon a-nin-de, hwa-gin an hae-seo', zh: '我也抱歉。虽然不是抢座，但没确认。', zhEn: 'I\'m sorry too. It wasn\'t stealing a seat, but I didn\'t check.', practice: 'listen' },
      { speaker: 'npc', npcName: 'Minji', ko: '근데 토리… 너 변했어. 예전엔 안 먼저 왔잖아.', hangul: 'geun-de to-ri… neo byeon-hae-sseo. ye-jeon-en an meon-jeo wat-ja-na', zh: '但兔莉……你变了。以前不会先来。', zhEn: 'But Tori... you\'ve changed. You wouldn\'t have come first before.', practice: 'listen' },
      { speaker: 'tori', ko: '한국에서 용기 내는 법을 배웠어. 자존심보다 우정이 큰 거.', hangul: 'han-gu-ge-seo yong-gi nae-neun beo-beul bae-wo-sseo. ja-jon-sim-bo-da u-jeong-i keun geo', zh: '在韩国学到鼓起勇气的方法。友情比自尊大。', zhEn: 'Learned how to muster courage in Korea. Friendship is bigger than pride.', practice: 'shadow' },
      { speaker: 'tori', isInnerVoice: true, ko: '바람은 세지만, 안은 따뜻해.', hangul: 'ba-ram-eun se-ji-man, a-neun tta-tteu-tae', zh: '风大但拥抱温暖。', zhEn: 'The wind is strong, but the hug is warm.', practice: 'listen' },
      { speaker: 'tori', ko: '?', hangul: '', zh: 'Minji说"진짜 컸다". Tori 想认真回一句关于两人 우정. 合适的一句？', zhEn: 'Minji said "진짜 컸다". Tori wants to reply seriously about their friendship. Which is the right line?', practice: 'pick',
        choices: [
          { ko: '앞으로도 이런 거로 냉전하지 말자. 서로 먼저 가자.', zh: '以后别再为这种事冷战。互相先去。', zhEn: 'Let\'s not give each other the cold shoulder over this anymore. Let\'s reach out first.', correct: true },
          { ko: '이제 안 싸울 것 같아. 너 참아.', zh: '以后不吵了。你忍着。', zhEn: 'No more fighting from now on. You hold it in.', correct: false },
          { ko: '이번엔 내가 컸어. 다음엔 네 차례야.', zh: '这次我长大。下次是你的。', zhEn: 'I grew up this time. Next time it\'s your turn.', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '虽然A但B (감정 대비)：~지만 + 대비 (Day 60·70·78 종합)', titleEn: 'Although A but B (emotional contrast): ~지만 + contrast (Day 60·70·78 combined)',
    pattern: 'N/A + **은/는** + A + **지만** + N/A + **은/는** + A',
    whenToUse: 'Day 60·70·78 学过 ~지만 대비. Day 82 = **감정 대비의 시적 활용**. Tori 说 「바람**은** 세**지만**, 안**은** 따뜻해」= 风大但拥抱温暖. 주제 은/는 + ~지만 + 주제 은/는 = 한국 감성 문학의 정석 프레임.', whenToUseEn: 'Learned ~지만 contrast in Days 60·70·78. Day 82 = **poetic use of emotional contrast**. Tori says 「바람**은** 세**지만**, 안**은** 따뜻해」= The wind is strong, but the embrace is warm. Topic 은/는 + ~지만 + topic 은/는 = the classic frame of Korean emotional literature.',
    rules: [
      '**은/는 + A + ~지만 + 은/는 + A**: 이중 주제 대비',
      '**감정/감각 대비**: 바람 vs 안, 몸 vs 마음, 길 vs 목적지',
      '**시적/서정적 표현**: 일상 대비를 詩化',
      '**Day 60·70·78 진화**: 사실 → 논쟁 → 관찰 → 감성',
    ],
    examples: [
      { ko: '바람은 세지만, 안은 따뜻해.', zh: '风大但拥抱温暖。', zhEn: 'The wind is strong, but the hug is warm.', highlight: '바람은 ... 안은', note: 'Day 82 시적 문장' },
      { ko: '길은 길지만, 마음은 가벼워요.', zh: '路远但心轻。', zhEn: 'The road is long, but the heart is light.', highlight: '길은 ... 마음은', note: '여행 시적 표현' },
      { ko: '몸은 지쳤지만, 기분은 좋아요.', zh: '身累但心情好。', zhEn: 'The body is tired, but the mood is good.', highlight: '몸은 ... 기분은', note: 'Day 76 여행 후 감상 응용' },
      { ko: '말은 짧지만, 진심은 깊어요.', zh: '话短但真心深。', zhEn: 'The words are short, but the sincerity runs deep.', highlight: '말은 ... 진심은', note: 'Day 57 Haru 두 글자 재현' },
    ],
    pitfall:
      '① Day 60·70·78 ~지만 대비의 시적 진화. 주제 은/는 두 번 사용 = 대조 강조. ② 감성/서정 상황에 자연. 논쟁 상황엔 Day 70 프레임이 자연. ③ ~지만 앞뒤 주제 은/는을 명확히 붙임: "바람이 세지만 안이 따뜻해" (X, 이/가 부자연) / "바람은 세지만 안은 따뜻해" (O, 은/는 대조).',
  },

  output: [
    { id: 'd82-o1', kind: 'compose', zhHint: '风大但拥抱温暖。', zhHintEn: 'The wind is strong, but the hug is warm.', tokens: ['바람은', '세지만', '안은 따뜻해', '따뜻하지 않아', '바람이', '차가워'], composeAnswer: ['바람은', '세지만', '안은 따뜻해'], successMsg: 'Day 82 시적 대비. Tori와 Minji의 안음.' },
    { id: 'd82-o2', kind: 'listen-choice', audioKo: '너 변했어. 예전엔 안 먼저 왔잖아.', successMsg: '✓ Minji의 통찰. Tori 성장 확인.', choices: [{ zh: '你变了。以前不会先来。', zhEn: 'You\'ve changed. You never used to come first.', correct: true }, { zh: '你没变。以前也先来。', zhEn: 'You haven\'t changed. You always came first before too.', correct: false }, { zh: '你变差了。', zhEn: 'You\'ve gotten worse.', correct: false }, { zh: '别先来。', zhEn: 'Don\'t come first.', correct: false }] },
    { id: 'd82-o3', kind: 'zh-to-ko', zhPrompt: '身累但心情好。', zhPromptEn: 'The body is tired, but the mood is good.', successMsg: '"몸은 지쳤지만, 기분은 좋아요." — 이중 주제 대비.', choices: [{ ko: '몸은 지쳤지만, 기분은 좋아요.', correct: true }, { ko: '몸을 지쳤지만, 기분에 좋아요.', correct: false }, { ko: '몸은 지쳐서, 기분은 좋아요.', correct: false }, { ko: '몸을 지쳤지만, 기분을 좋아요.', correct: false }] },
    { id: 'd82-o4', kind: 'particle-error', zhHint: '在韩国学到了鼓起勇气的方法。', zhHintEn: 'In Korea, I learned how to muster up courage.', successMsg: '한국 **에서** (동작 장소) + 용기 내는 법 + **을** + 배웠다.', choices: [{ ko: '한국에서 용기 내는 법을 배웠어.', correct: true }, { ko: '한국에 용기 내는 법을 배웠어.', correct: false }, { ko: '한국에서 용기 내는 법이 배웠어.', correct: false }, { ko: '한국에서 용기 내는 법에서 배웠어.', correct: false }] },
    { id: 'd82-o5', kind: 'match-pair', successMsg: '✓ Day 82 全对. 다리 위의 안음.', successMsgEn: '✓ Day 82 all correct. An embrace on the bridge.', pairs: [{ ko: '변하다', zh: '变化', zhEn: 'change' }, { ko: '예전', zh: '以前', zhEn: 'before' }, { ko: '용기', zh: '勇气', zhEn: 'Courage' }, { ko: '우정', zh: '友情', zhEn: 'Friendship' }, { ko: '따뜻하다', zh: '温暖', zhEn: 'Warm' }] },
  ],

  recap: {
    toriPose: 'proud',
    praise: '3일의 침묵, 다리 위 한 순간의 안음으로 끝. Day 1의 "용기"가 오늘 진짜 뜻을 얻었어요.',
    preview: '明天 Haru의 진짜 이야기 — 왜 Day 7 지하철에서 도왔나.', previewEn: 'Tomorrow, Haru\'s real story — why she helped on the subway on Day 7.',
    stickerId: 'sticker-d82',
    sceneImageUrl: '/images/diary/day-82-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「이중 주제 은/는 어떻게 시적?」「먼저 사과 어떻게 자연스럽게?」', carrotHintEn: 'Today\'s carrots: 「How is the double topic 은/는 poetic?」「How to apologize first naturally?」',
};
