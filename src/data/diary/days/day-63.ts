import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 63 · 첫 알바 · 翻车
 *
 * 剧情：Tori第一天打工。客人点单太快没听懂，端咖啡时手抖，倒了一半在桌上。
 * 熊店长说没关系，但Tori躲在后台哭了5分钟。不是委屈，是恨自己不够好。
 *
 * 学习目标：실수 표현 / ~아/어 버리다 (Day 63 심화) / 격려 표현
 * 语料层级：해요体 · 실수/사과
 */
export const day63: ToriDay = {
  level: 'advanced',
  day: 3,
  phase: 'mastery',
  title: '打工第一天 · 翻车', titleEn: 'First day at work · messed up',
  subtitle: '不是委屈，是恨自己不够好', subtitleEn: 'It\'s not that I\'m upset; I hate that I\'m not good enough',
  heroImageUrl: '/images/diary/day-63-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 6일 · 수요일 오후',
    weather: '兽尔 · 흐림', weatherEn: 'Seoul · cloudy',
    toriPose: 'shy',
    diaryText: `11月6日，周三下午三点。

第一天上班。系上곰다방的围裙，把额发别到耳后。

第一位客人是狐狸小姐。她一口气报出订单：

"저기요, 아이스 아메리카노 톨 사이즈 한 잔, 시럽 하나 빼고, 얼음 적게."

——她话说完了，我只听懂到"아이스"。

我愣在那里。狐狸小姐没笑，只是慢慢地又说了一遍。

第二位客人。店长把两杯咖啡放到我的托盘上，让我端到 11 号桌。走过去的路上手在抖——一杯歪了，半杯洒在桌面上。

坐在桌边的猫先生笑着说："괜찮아요!"（没事！）背后店长也说："괜찮아, 처음이니까."（没事，第一天嘛。）

——但我不觉得没事。

我躲到后厨哭了五分钟。不是委屈，是气自己不够好。

从围裙口袋里摸出那支胡萝卜笔，用手指摩挲上面的"용기"两个字。深吸一口气，走了出去。

剩下三个小时的班，我没再出错。

下班时店长叫住我：

"토리야, 첫날인데 3시간 다 채웠어. 그거만으로도 잘한 거야."
（兔莉，第一天能撑满三个小时，光是这样就已经很好了。）

回家路上，这句话一直在脑子里转。`,
  },

  words: [
    {
      id: 'd63-w1',
      korean: '실수',
      hangul: 'sil-su',
      zh: '失误', zhEn: 'mistake',
      pos: '名词', posEn: 'Noun',
      example: { ko: '실수를 했어요.', zh: '犯了失误。', zhEn: 'I made a mistake.' },
      tip: '失(실) + 手(수). 실수하다 = 出错', tipEn: '失(실) + 手(수). 실수하다 = to make a mistake',
    },
    {
      id: 'd63-w2',
      korean: '쏟다',
      hangul: 'ssot-da',
      zh: '倒/洒', zhEn: 'to spill/pour',
      pos: '动词', posEn: 'Verb',
      example: { ko: '커피를 쏟았어요.', zh: '洒了咖啡。', zhEn: 'I spilled the coffee.' },
      tip: '쏟다 → 쏟았어요. 액체 관련 상황 자주 씀',
    },
    {
      id: 'd63-w3',
      korean: '트레이',
      hangul: 'teu-re-i',
      zh: '托盘', zhEn: 'tray',
      pos: '名词', posEn: 'Noun',
      example: { ko: '트레이에 컵 두 개를 올렸어요.', zh: '托盘上放了两个杯子。', zhEn: 'There were two cups on the tray.' },
      tip: 'tray 외래어. 카페 필수',
    },
    {
      id: 'd63-w4',
      korean: '서럽다',
      hangul: 'seo-reop-da',
      zh: '委屈', zhEn: 'to feel wronged',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '서러워서 울었어요.', zh: '委屈得哭了。', zhEn: 'I cried because I felt so wronged.' },
      tip: 'ㅂ 불규칙: 서럽다 → 서러워요. 感情词', tipEn: 'ㅂ irregular: 서럽다 → 서러워요. Emotion word',
    },
    {
      id: 'd63-w5',
      korean: '부족하다',
      hangul: 'bu-jo-ka-da',
      zh: '不足/不够', zhEn: 'insufficient/not enough',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '아직 부족해요.', zh: '还不够。', zhEn: 'It\'s still not enough.' },
      tip: '不(부) + 足(족) + 하다. 자기 반성 시 자주 씀', tipEn: '不(부) + 足(족) + 하다. Often used when reflecting on oneself.',
    },
    {
      id: 'd63-w6',
      korean: '숨다',
      hangul: 'sum-da',
      zh: '躲/藏', zhEn: 'hide',
      pos: '动词', posEn: 'Verb',
      example: { ko: '주방 뒤에 숨었어요.', zh: '躲到厨房后面。', zhEn: 'Hide behind the kitchen.' },
      tip: '숨다 → 숨어요. 감정 격할 때 물리적 도피',
    },
  ],

  dialogue: {
    scene: '곰다방·첫 손님·실수',
    setting: {
      time: '周三 15:10', timeEn: 'Wed 15:10',
      place: '곰다방 카페',
      npc: '狐狸손님 / 黑熊사장', npcEn: 'Fox Customer / Black Bear Boss',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '狐狸손님', npcNameEn: 'Fox Customer',
        ko: '아이스 아메리카노 톨 사이즈, 시럽 빼고 얼음 적게요.',
        hangul: 'a-i-seu a-me-ri-ka-no tol sa-i-jeu, si-reop ppae-go eo-reum jeok-ge-yo',
        zh: '冰美式大杯，去糖浆，冰块少一点。', zhEn: 'Large iced Americano, no syrup, less ice.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '너무 빨라… 반밖에 못 알아들었어.',
        hangul: 'neo-mu ppal-la… ban-ba-kke mot a-ra-deu-reo-sseo',
        zh: '太快了……只听懂一半。', zhEn: 'Too fast... I only caught half.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '죄송해요, 다시 한 번만 천천히 말씀해 주세요.',
        hangul: 'joe-song-hae-yo, da-si han beon-man cheon-cheon-hi mal-sseum-hae ju-se-yo',
        zh: '不好意思，请再慢慢说一次。', zhEn: 'Sorry, could you say that again more slowly?',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '커피를 쏟아버렸어요. 진짜 죄송해요.',
        hangul: 'keo-pi-reul sso-da-beo-ryeo-sseo-yo. jin-jja joe-song-hae-yo',
        zh: '我把咖啡洒了。真对不起。', zhEn: 'I spilled the coffee. I\'m really sorry.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '黑熊사장', npcNameEn: 'Black Bear Boss',
        ko: '괜찮아, 처음이니까. 첫날인데 3시간 다 채웠어.',
        hangul: 'gwaen-cha-na, cheo-eu-mi-ni-kka. cheot-na-rin-de sam-si-gan da chae-wo-sseo',
        zh: '没事，第一天嘛。第一天3小时都撑下来了。', zhEn: 'It\'s fine, it\'s your first day. You made it through 3 hours on day one.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '사장이 격려해준 후 Tori想说"我明天会更努力"。合适的一句？', zhEn: 'After the boss encourages her, Tori wants to say "I\'ll work harder tomorrow." Which is the right line?',
        practice: 'pick',
        choices: [
          { ko: '내일부터 더 열심히 할게요.', zh: '明天开始更努力。', zhEn: 'I\'ll work harder starting tomorrow.', correct: true },
          { ko: '내일부터 안 나올게요.', zh: '明天开始不来了。', zhEn: 'I\'m not coming starting tomorrow.', correct: false },
          { ko: '오늘 잘못 뽑으신 것 같아요.', zh: '好像今天选错人了。', zhEn: 'Seems like I picked the wrong person today.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '（不小心）把___做了：~아/어 버리다', titleEn: '(Accidentally) did ___ : ~아/어 버리다',
    pattern: 'V + **아/어 버리다** (해요体: **아/어 버렸어요**)', patternEn: 'V + **아/어 버리다** (해요 form: **아/어 버렸어요**)',
    whenToUse: '「（无意/彻底/遗憾地）把___做了」的完成加强句尾。Tori 说 「커피를 쏟**아버렸어요**」= 我把咖啡洒了。~아/어 버리다 表**动作完成 + 遗憾/彻底**的双重语感——打翻/丢掉/说漏嘴等"后悔"场景必用。', whenToUseEn: 'A completion-emphasizing ending meaning "(unintentionally/completely/regretfully) did ___." Tori says "커피를 쏟**아버렸어요**" = I spilled the coffee. ~아/어 버리다 carries the dual nuance of **action completion + regret/thoroughness**—a must for "regret" situations like spilling, losing, or blurting out.',
    rules: [
      '**기본**：V + 아/어 버리다 = 完全做完了（含遗憾/加强）。쏟아 버리다 / 잊어 버리다 / 잃어 버리다',
      '**과거 → ~아/어 버렸어요**：쏟아 버렸어요 = 洒完了(遗憾). 잊어버렸어요 = 忘光了',
      '**긍정 뉘앙스도 가능**：다 끝내 버렸어요 = 全部完成了(爽快). 뉘앙스는 문맥에 좌우',
      '**~아/어 두다 vs ~아/어 버리다**：두다 = 保留/放着；버리다 = 彻底做完'
    ],
    examples: [
      { ko: '커피를 쏟아 버렸어요.', zh: '把咖啡洒了。', zhEn: 'Spilled the coffee.', highlight: '쏟아 버렸어요', note: '쏟다 → 쏟아 + 버렸어요. Day 63 실수 표현' },
      { ko: '중요한 약속을 잊어 버렸어요.', zh: '把重要的约忘了。', zhEn: 'Forgot an important appointment.', highlight: '잊어 버렸어요', note: '잊다 → 잊어 + 버렸어요. 후회 강한 표현' },
      { ko: '지갑을 잃어 버렸어요.', zh: '把钱包丢了。', zhEn: 'Lost my wallet.', highlight: '잃어 버렸어요', note: '잃다 → 잃어 + 버렸어요. 잃어버리다는 붙여 쓰는 게 관용' },
      { ko: '숙제 다 끝내 버렸어요.', zh: '作业全都做完了。', zhEn: 'Finished all the homework.', highlight: '끝내 버렸어요', note: '긍정 뉘앙스: 다 끝내 = 加强完成감', noteEn: 'Positive nuance: 다 끝내 = emphasizes completion' },
    ],
    pitfall:
      '① **~아/어 버리다** = 完成 + 정서적 색채 (遗憾 or 爽快). 단순 완료는 ~았/었어요. 커피를 쏟았어요 (客观陈述) vs 쏟아 버렸어요 (遗憾感). ② **잃어버리다 / 잊어버리다** 는 붙여 씀이 관용. 사전에도 붙어 있음. ③ ~아/어 놓다 = 保留 (완료 후 상태 유지). ~아/어 버리다 = 완전히 처분. 뉘앙스 반대.',
  },

  output: [
    {
      id: 'd63-o1',
      kind: 'compose',
      zhHint: '我把咖啡洒了。真对不起。', zhHintEn: 'I spilled the coffee. I\'m really sorry.',
      tokens: ['커피를', '쏟아 버렸어요', '진짜 죄송해요', '쏟았어요', '괜찮아요', '너무 죄송해요'],
      composeAnswer: ['커피를', '쏟아 버렸어요', '진짜 죄송해요'],
      successMsg: '~아/어 버렸어요 = 遗憾完成. Tori 첫 알바의 사과.', successMsgEn: '~아/어 버렸어요 = regretful completion. Tori\'s apology on her first part-time job.',
    },
    {
      id: 'd63-o2',
      kind: 'listen-choice',
      audioKo: '괜찮아, 처음이니까. 첫날인데 3시간 다 채웠어.',
      successMsg: '✓ 사장의 격려. ~니까 (이유) + 다 채웠어 (전부 채웠어).',
      choices: [
        { zh: '没事，第一天嘛。第一天3小时都撑下来了。', zhEn: 'It\'s fine, it\'s your first day. You made it through 3 hours on day one.', correct: true },
        { zh: '没事，你已经是老手了。', zhEn: 'It\'s fine, you\'re already a pro.', correct: false },
        { zh: '没事，明天不用来了。', zhEn: 'It\'s okay, you don\'t need to come tomorrow.', correct: false },
        { zh: '没事，3小时不够。', zhEn: 'It\'s okay, 3 hours isn\'t enough.', correct: false },
      ],
    },
    {
      id: 'd63-o3',
      kind: 'zh-to-ko',
      zhPrompt: '把重要的约忘了。', zhPromptEn: 'Forgot an important appointment.',
      successMsg: '"중요한 약속을 잊어 버렸어요." — 잊다 → 잊어 버렸어요.',
      choices: [
        { ko: '중요한 약속을 잊어 버렸어요.', correct: true },
        { ko: '중요한 약속을 잊었어요 버렸어요.', correct: false },
        { ko: '중요한 약속에 잊어 버렸어요.', correct: false },
        { ko: '중요한 약속이 잊어 버렸어요.', correct: false },
      ],
    },
    {
      id: 'd63-o4',
      kind: 'particle-error',
      zhHint: '请再慢慢说一次。', zhHintEn: 'Please say it again slowly.',
      successMsg: '~아/어 주세요 = 请求. 말씀해 주세요 (말씀하다 = 敬语 말하다).', successMsgEn: '~아/어 주세요 = request. 말씀해 주세요 (말씀하다 = honorific of 말하다).',
      choices: [
        { ko: '다시 한 번만 천천히 말씀해 주세요.', correct: true },
        { ko: '다시 한 번만 천천히 말씀 주세요.', correct: false },
        { ko: '다시 한 번만 천천히 말씀 하세요.', correct: false },
        { ko: '다시 한 번만 천천히 말씀되어 주세요.', correct: false },
      ],
    },
    {
      id: 'd63-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 63 全对. 실수해도, 3시간 채웠어요.', successMsgEn: '✓ Day 63 all correct. Even with mistakes, I filled 3 hours.',
      pairs: [
        { ko: '실수', zh: '失误', zhEn: 'mistake' },
        { ko: '쏟다', zh: '洒', zhEn: 'spill' },
        { ko: '트레이', zh: '托盘', zhEn: 'tray' },
        { ko: '서럽다', zh: '委屈', zhEn: 'to feel wronged' },
        { ko: '숨다', zh: '躲', zhEn: 'hide' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '실수했지만 도망 안 갔어요. 3시간 채웠어요. 진짜 첫 걸음.',
    preview: '2주 지나서, 나는 손님 말 다 알아듣게 될까?',
    stickerId: 'sticker-d63',
    sceneImageUrl: '/images/diary/day-63-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~아/어 버렸어요 和 ~았/었어요 有什么区别？」「打工犯错怎么道歉？」', carrotHintEn: 'Today\'s carrot: "What\'s the difference between ~아/어 버렸어요 and ~았/었어요?" "How to apologize for a mistake at work?"',
};
