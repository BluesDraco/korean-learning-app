import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 83 · Haru의 真相 · "你让我想起一个人"
 *
 * 剧情：Haru终于告诉Tori真相——她为什么在地铁里帮Tori。"너를 보면 옛날 친구가 생각나.
 * 그 친구도 용기라고 쓴 당근을 갖고 있었어." Haru说自己以前也拿过这样的胡萝卜，
 * 但更多的她没说。Tori感觉到背后还有更大的故事，但没追问。她会等。
 */
export const day83: ToriDay = {
  level: 'advanced',
  day: 23,
  phase: 'mastery',
  title: 'Haru的真相 · "너를 보면 옛날 친구가 생각나"', titleEn: 'Haru\'s truth · "When I see you, I think of an old friend"',
  subtitle: '"그 친구도 용기 당근을 갖고 있었어"',
  heroImageUrl: '/images/diary/day-83-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '12월 14일 · 토요일 저녁',
    weather: '兽尔 · 첫 눈 몇 조각', weatherEn: 'Soo-ah · A few flakes of first snow',
    toriPose: 'shy',
    diaryText: `12月14日，周六晚上。

Haru 敲了我的房门。手里端着两杯温热的柚子茶。

"토리, 얘기 좀 해도 돼?"（兔莉，可以聊聊吗？）

——Day 34 之后，这是第一次 Haru 自己开口说"我们聊聊"。

我们在地毯上坐下。窗外第一场雪，一片一片飘着。

"Day 34에 내가 말했지. '너를 보면 옛날 친구가 생각나' 라고. 오늘, 좀 더 말할게."
（Day 34 我说过，"看到你会想起一个老朋友"。——今天，再多说一点。）

我的心跳停了几秒。

"그 친구는… 나랑 같은 기숙사 살던 애야. 5년 전. 그 애도 여기 유학생이었어. 그리고 그 애도 용기라고 쓴 당근 하나를 가방에 넣고 다녔어."
（那个朋友……和我住过同一间宿舍。五年前。她也是留学生。她也在包里装着一根写着"용기"的胡萝卜。）

——我的心一下子跳快了。——那根一模一样的胡萝卜，此刻就在我书桌上。

"...그 친구는 지금 어디에?"（她现在在哪？）我小心翼翼地问。

Haru 望了望窗外。

"...나중에 말해줄게. 오늘 말할 수 있는 건 여기까지야."
（……以后再告诉你。今天能说的到这里。）

——和 Day 34 一样的回答。可这一次，她多走了一步。

我没有追问。

"괜찮아. 기다릴게. 서두르지 않을게."（没关系。我等着。不催你。）

Haru 轻轻笑了。像 Day 57 那封信里"고마워. 나도."的那个笑。

"하지만 하루, 하나만 말해줘. 그 애는 잘 지내?"（不过 Haru，只告诉我一件事——她现在过得好吗？）

Haru 只是轻轻摇了摇头。——没再多说。

我的心跳一直没停下来。这个故事的背后，到底是什么？——那根装着勇气的胡萝卜，五年前的留学生，还有 Haru 没回答的那个结局。

我好像知道点什么，又好像什么都不知道。——不过，今天到这里就够了。

第一场雪贴在了窗上。房间里满是柚子茶的香气。`,
  },

  words: [
    { id: 'd83-w1', korean: '진실', hangul: 'jin-sil', zh: '真相/真实', zhEn: 'truth/reality', pos: '名词', posEn: 'Noun', example: { ko: '진실을 조금 알게 됐어요.', zh: '知道了一点真相。', zhEn: 'I learned a bit of the truth.' }, tip: '真(진) + 实(실)', tipEn: '真(jin) + 实(sil)' },
    { id: 'd83-w2', korean: '유학생', hangul: 'yu-hak-saeng', zh: '留学生', zhEn: 'international student', pos: '名词', posEn: 'Noun', example: { ko: '그 애도 유학생이었어요.', zh: '那孩子也是留学生。', zhEn: 'That kid is also an international student.' }, tip: '留(유) + 学(학) + 生(생)', tipEn: '留(yu) + 学(hak) + 生(saeng)' },
    { id: 'd83-w3', korean: '기숙사', hangul: 'gi-suk-sa', zh: '宿舍', zhEn: 'dormitory', pos: '名词', posEn: 'Noun', example: { ko: '같은 기숙사 살던 애예요.', zh: '同宿舍住过的孩子。', zhEn: 'A kid I lived with in the dorm.' }, tip: '寄(기) + 宿(숙) + 舍(사)', tipEn: '寄(gi) + 宿(suk) + 舍(sa)' },
    { id: 'd83-w4', korean: '밀어붙이다', hangul: 'mi-reo-bu-chi-da', zh: '追问/推逼', zhEn: 'press for an answer/push', pos: '动词', posEn: 'Verb', example: { ko: '안 밀어붙였어요.', zh: '没追问。', zhEn: 'I didn\'t press further.' }, tip: '밀다(推) + 붙이다(贴). 관용 표현', tipEn: 'Push + attach. Idiomatic expression.' },
    { id: 'd83-w5', korean: '조심스럽다', hangul: 'jo-sim-seu-reop-da', zh: '小心翼翼', zhEn: 'Very carefully', pos: '形容词', posEn: 'Adjective.', example: { ko: '조심스럽게 물었어요.', zh: '小心地问了。', zhEn: 'Asked carefully.' }, tip: 'ㅂ 불규칙: 조심스럽다 → 조심스러워요' },
    { id: 'd83-w6', korean: '유자차', hangul: 'yu-ja-cha', zh: '柚子茶', zhEn: 'Yuzu tea', pos: '名词', posEn: 'Noun', example: { ko: '유자차 두 잔이었어요.', zh: '两杯柚子茶。', zhEn: 'Two cups of yuzu tea.' }, tip: '柚(유) + 子(자) + 茶(차). 한국 겨울 인기', tipEn: 'Yuzu (유) + ja (자) + tea (차). Popular in Korean winter.' },
  ],

  dialogue: {
    scene: '301호·유자차·창밖 첫 눈',
    setting: { time: '周六 20:30', timeEn: 'Saturday 20:30', place: 'Tori 방·카펫 위', npc: 'Haru' },
    lines: [
      { speaker: 'npc', npcName: 'Haru', ko: '토리, 얘기 좀 해도 돼?', hangul: 'to-ri, yae-gi jom hae-do dwae?', zh: '兔莉，能说说话吗？', zhEn: 'Tori, can we talk?', practice: 'listen' },
      { speaker: 'npc', npcName: 'Haru', ko: 'Day 34에 말한 그 옛날 친구… 오늘 좀 더 말할게.', hangul: 'Day 34-e mal-han geu yen-nal chin-gu… o-neul jom deo mal-hal-ge', zh: 'Day 34说的那个老朋友……今天再多说一点。', zhEn: 'That old friend from Day 34... Let me say a bit more today.', practice: 'listen' },
      { speaker: 'npc', npcName: 'Haru', ko: '그 친구도 용기라고 쓴 당근을 가방에 넣고 다녔어.', hangul: 'geu chin-gu-do yong-gi-ra-go sseun dang-geu-neul ga-bang-e neo-ko da-nyeo-sseo', zh: '那朋友也带着写着"勇气"的胡萝卜。', zhEn: 'That friend also carried a carrot with "courage" written on it.', practice: 'listen' },
      { speaker: 'tori', ko: '그 친구는 지금 어디에?', hangul: 'geu chin-gu-neun ji-geum eo-di-e?', zh: '那朋友现在在哪？', zhEn: 'Where is that friend now?', practice: 'shadow' },
      { speaker: 'npc', npcName: 'Haru', ko: '나중에 말해줄게. 오늘 말할 수 있는 건 여기까지야.', hangul: 'na-jung-e mal-hae-jul-ge. o-neul mal-hal su in-neun geon yeo-gi-kka-ji-ya', zh: '以后再告诉你。今天能说的到这里。', zhEn: 'I\'ll tell you later. That\'s all I can say for today.', practice: 'listen' },
      { speaker: 'tori', ko: '?', hangul: '', zh: 'Haru说"到这里". Tori 想让Haru安心表达"愿意等". 合适的一句？', zhEn: 'Haru says "that\'s all." Tori wants to reassure Haru by expressing "willing to wait." Which is the right line?', practice: 'pick',
        choices: [
          { ko: '괜찮아, 기다릴게. 서두르지 않을게.', zh: '没事，我等。不催你。', zhEn: 'It\'s okay, I\'ll wait. I won\'t rush you.', correct: true },
          { ko: '지금 말해. 궁금해.', zh: '现在说，我好奇。', zhEn: 'Tell me now, I\'m curious.', correct: false },
          { ko: '그럼 됐어. 안 듣고 싶어.', zh: '算了。不想听。', zhEn: 'Forget it. I don\'t want to hear it.', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '"某时/以后再___"：Day 34·57·83 종합', titleEn: '"Sometime/later ___": A summary of Days 34, 57, 83.',
    pattern: '**나중에** V + **(으)ㄹ게(요)** · **~까지야**',
    whenToUse: 'Day 34 배운 「나중에 알려줄게」 재현. Day 83 은 그 약속의 살짝 진전. 시간+承诺+한계 = 조심스러운 대화의 핵심 프레임. 서로 존중하며 정보 점진 공유.', whenToUseEn: 'Revisiting "I\'ll tell you later" from Day 34. Day 83 is a slight progression of that promise. Time + commitment + limits = the core framework of cautious conversation. Respecting each other while gradually sharing information.',
    rules: [
      '**나중에 ~(으)ㄹ게(요)**: Day 34 承诺 표현',
      '**~까지야 = 到这里/到此为止**: 한계 설정. 오늘 말할 수 있는 건 여기까지야',
      '**~아/어 줄게 (Day 46·53·80)**: 施惠 承诺 재활용',
      '**서두르지 않을게 (Day 57)**: 시간 강요 안 함',
    ],
    examples: [
      { ko: '나중에 말해줄게.', zh: '以后再告诉你。', zhEn: 'I\'ll tell you later.', highlight: '나중에 말해줄게', note: 'Day 34·83 반복 등장. Haru 시그니처 프레임' },
      { ko: '오늘 말할 수 있는 건 여기까지야.', zh: '今天能说的到这里。', zhEn: 'That\'s all I can say for today.', highlight: '여기까지야', note: '~까지야 한계 설정' },
      { ko: '괜찮아, 기다릴게. 서두르지 않을게.', zh: '没事，我等。不催你。', zhEn: 'It\'s okay, I\'ll wait. I won\'t rush you.', highlight: '기다릴게 ... 서두르지 않을게', note: 'Day 57 Tori 편지의 承诺 재현', noteEn: 'Revisiting the promise in Tori\'s letter from Day 57.' },
      { ko: '지금은 여기까지. 나중에 더 말해줄게.', zh: '现在到这里。以后再多说。', zhEn: 'That\'s it for now. I\'ll say more later.', highlight: '여기까지 ... 나중에 더', note: '한계 + 承诺 조합', noteEn: 'Combination of limits + commitment.' },
    ],
    pitfall:
      '① Day 34 → 83 은 같은 언어로 다른 순간을 잇는다. ~까지야 는 대화 한계 표현. 상대 존중 강조. ② 나중에 ~(으)ㄹ게 는 실현되지 않는 承诺 아닌 진심 承诺. 대화 상대와의 신뢰 필수. ③ 이런 상황에서 밀어붙이지 않는 문화 = 한국식 서로 존중.',
  },

  output: [
    { id: 'd83-o1', kind: 'compose', zhHint: '没事，我等。不催你。', zhHintEn: 'It\'s okay, I\'ll wait. I won\'t rush you.', tokens: ['괜찮아', '기다릴게', '서두르지 않을게', '기다려요', '지금 말해', '서두르지 마'], composeAnswer: ['괜찮아', '기다릴게', '서두르지 않을게'], successMsg: 'Day 57 Tori 편지의 承诺 재현.', successMsgEn: 'Revisiting the promise in Tori\'s letter from Day 57.' },
    { id: 'd83-o2', kind: 'listen-choice', audioKo: '그 친구도 용기라고 쓴 당근을 가방에 넣고 다녔어.', successMsg: '✓ Haru의 진상. 5년 전 유학생의 당근.', choices: [{ zh: '那朋友也带着写着"勇气"的胡萝卜。', zhEn: 'That friend also carried a carrot with "courage" written on it.', correct: true }, { zh: '那朋友没有胡萝卜。', zhEn: 'That friend didn\'t have a carrot.', correct: false }, { zh: '那朋友写了勇气的信。', zhEn: 'That friend wrote a letter of courage.', correct: false }, { zh: '那朋友是韩国人。', zhEn: 'That friend is Korean.', correct: false }] },
    { id: 'd83-o3', kind: 'zh-to-ko', zhPrompt: '现在到这里。以后再多说。', zhPromptEn: 'That\'s it for now. I\'ll say more later.', successMsg: '"지금은 여기까지. 나중에 더 말해줄게."', choices: [{ ko: '지금은 여기까지. 나중에 더 말해줄게.', correct: true }, { ko: '지금이 여기까지. 나중에 더 말해요.', correct: false }, { ko: '지금은 여기까지에. 나중에 더 말할게.', correct: false }, { ko: '지금은 여기부터. 나중에 더 말해줘.', correct: false }] },
    { id: 'd83-o4', kind: 'particle-error', zhHint: '把胡萝卜放在包里。', zhHintEn: 'Put the carrot in the bag.', successMsg: '당근 (无收音) + **을** + 가방 + **에** (장소) + 넣다.', choices: [{ ko: '당근을 가방에 넣었어요.', correct: true }, { ko: '당근이 가방에 넣었어요.', correct: false }, { ko: '당근을 가방에서 넣었어요.', correct: false }, { ko: '당근에 가방을 넣었어요.', correct: false }] },
    { id: 'd83-o5', kind: 'match-pair', successMsg: '✓ Day 83 全对. Haru의 문이 조금 열렸어요.', successMsgEn: '✓ Day 83 all correct. Haru\'s door opened a little.', pairs: [{ ko: '진실', zh: '真相', zhEn: 'The truth' }, { ko: '유학생', zh: '留学生', zhEn: 'international student' }, { ko: '기숙사', zh: '宿舍', zhEn: 'dormitory' }, { ko: '조심스럽다', zh: '小心翼翼', zhEn: 'Very carefully' }, { ko: '유자차', zh: '柚子茶', zhEn: 'Yuzu tea' }] },
  ],

  recap: {
    toriPose: 'shy',
    praise: '5년 전 다른 유학생, 다른 당근. Haru의 문이 조금 열렸어요.',
    preview: '明天 학교 공개 연설 대회 — Tori 마지막 대회.', previewEn: 'Tomorrow school public speaking contest — Tori\'s last contest.',
    stickerId: 'sticker-d83',
    sceneImageUrl: '/images/diary/day-83-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~까지야 / 여기까지 어떻게 사용?」「Haru의 옛날 친구는 누구일까?」', carrotHintEn: 'Today\'s carrots: 「~까지야 / 여기까지 how to use?」「Who is Haru\'s old friend?」',
};
