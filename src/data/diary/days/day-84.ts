import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 84 · 공개 연설 · 忘词 → 勇气胡萝卜
 *
 * 剧情：学校公开演讲比赛。Tori代表高级班参加。演讲一半忘词。全场安静。她低头看到口袋里
 * 露出的勇气胡萝卜——上面的"용기"字还在。深呼吸，放下稿子，用自己的话讲完剩下的。
 * "勇气不是大的，是小的，像这根胡萝卜。"全场起立鼓掌。
 */
export const day84: ToriDay = {
  level: 'advanced',
  day: 24,
  phase: 'mastery',
  title: '公开演讲 · 忘词→勇气胡萝卜', titleEn: 'Public speaking · forgetting words → courage carrot',
  subtitle: '"용기는 큰 게 아니에요. 작은 거예요."',
  heroImageUrl: '/images/diary/day-84-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '12월 16일 · 월요일 오후',
    weather: '兽尔 · 눈 예보', weatherEn: 'Seoul · snow forecast',
    toriPose: 'proud',
    diaryText: `12月16日，周一下午。

한빛大学公开演讲比赛。我是高级班代表。5 分钟演讲。

礼堂坐了 300 人，5 位评委，3 台摄像机。——Day 42 的发表、Day 69 的论坛、Day 70 的辩论赛，一切都要在今天汇总。

轮到我：

"안녕하세요. 저는 토리예요. 오늘 주제는 '작은 용기의 힘'입니다."
（大家好，我是兔莉。今天的主题是"小小勇气的力量"。）

开始时一切正常。一分钟后——

准备好的下一句突然想不起来了。——脑袋一片空白。——下一张幻灯片是什么？

3 秒静默。5 秒静默。——300 双眼睛看着我。

呼吸变浅，心跳越来越快。就在那一刻——

口袋下摆里有个东西露了出来。是那支胡萝卜笔。上面写着"용기"两个字。

我深吸一口气，把稿纸放到讲台上。——今天不看稿了。

"...죄송해요. 방금 잠깐 잊었어요. 그런데 오늘 여러분에게 진짜 말하고 싶은 건, 준비한 문장보다 이거예요."
（……对不起，刚才我忘词了。但今天我真正想跟大家说的，比稿子里的更重要。）

我把胡萝卜笔举了起来。

"용기는 큰 게 아니에요. 작은 거예요. 이 당근처럼. 84일 전에 저희 엄마가 이 당근에 '용기' 두 글자를 썼어요. 그 뒤로, 이 당근이 저를 도와줬어요. 지하철에서, 학교에서, 시장에서, 카페에서——그리고 지금, 무대에서."
（勇气不是大的，是小的，就像这根胡萝卜。84 天前我妈妈在它上面写下"용기"两个字。从那天起，这根胡萝卜一直帮着我。在地铁里、教室里、市场里、咖啡馆里——还有现在，这个讲台上。）

"용기는 사자의 크기가 아니에요. 토끼의 손 안에 있는 이 작은 당근의 크기예요. 그런데 그 작은 게 저를 여기까지 데려왔어요."
（勇气不是狮子的大小。是兔子手心里，这根小小胡萝卜的大小。而就是这么小的东西，把我带到了这里。）

短短一秒的静默。——然后是掌声。所有人站起来鼓掌。Junho、Minji、Haru、Danielle 都在前排，眼眶红着。

我走下讲台，把胡萝卜笔重新放回口袋。

——五年前那位留学生，是不是也创造过这样的一个瞬间？——总有一天我会知道的。`,
  },

  words: [
    { id: 'd84-w1', korean: '연설', hangul: 'yeon-seol', zh: '演讲', zhEn: 'Speech', pos: '名词', posEn: 'Noun', example: { ko: '공개 연설이에요.', zh: '公开演讲。', zhEn: 'Public speaking.' }, tip: '演(연) + 说(설)', tipEn: '연 + 설 (speech)' },
    { id: 'd84-w2', korean: '잊어버리다', hangul: 'i-jeo-beo-ri-da', zh: '忘光', zhEn: 'Forget everything', pos: '动词', posEn: 'Verb', example: { ko: '준비한 문장을 잊어버렸어요.', zh: '把准备的句子忘了。', zhEn: 'Forgot the prepared sentences.' }, tip: 'Day 63 学过. ~아/어 버리다 + 잊다', tipEn: 'Learned Day 63. ~아/어 버리다 + 잊다' },
    { id: 'd84-w3', korean: '원고', hangul: 'won-go', zh: '稿子', zhEn: 'script/draft', pos: '名词', posEn: 'Noun', example: { ko: '원고 없이 말했어요.', zh: '不看稿子说了。', zhEn: 'Spoke without looking at the script.' }, tip: 'Day 59 学过. 이 날은 稿을 내려놓음', tipEn: 'Learned Day 59. This day, put down the script.' },
    { id: 'd84-w4', korean: '무대', hangul: 'mu-dae', zh: '舞台', zhEn: 'Stage', pos: '名词', posEn: 'Noun', example: { ko: '무대에 섰어요.', zh: '站上舞台。', zhEn: 'Step onto the stage.' }, tip: '舞(무) + 台(대)', tipEn: '무 + 대 (stage)' },
    { id: 'd84-w5', korean: '심사위원', hangul: 'sim-sa-wi-won', zh: '评委', zhEn: 'Judges', pos: '名词', posEn: 'Noun', example: { ko: '심사위원 5명이었어요.', zh: '5位评委。', zhEn: '5 judges.' }, tip: '审(심) + 查(사) + 委(위) + 员(원)', tipEn: '심 + 사 + 위 + 원 (review committee)' },
    { id: 'd84-w6', korean: '데려오다', hangul: 'de-ryeo-o-da', zh: '带来', zhEn: 'bring', pos: '动词', posEn: 'Verb', example: { ko: '그 작은 게 저를 여기까지 데려왔어요.', zh: '那小的把我带到这里。', zhEn: 'That little one brought me here.' }, tip: 'Day 76 学过. 이 날은 감정 표현 절정', tipEn: 'Learned Day 76. This day, emotional expression climax.' },
  ],

  dialogue: {
    scene: '한빛대 대강당·공개 연설·클라이맥스',
    setting: { time: '周一 15:00', timeEn: 'Monday 15:00', place: '한빛대 대강당', npc: '전 강당 (관객)' },
    lines: [
      { speaker: 'tori', isInnerVoice: true, ko: '준비한 문장이 갑자기 안 나와… 머리가 하얘.', hangul: 'jun-bi-han mun-jang-i gap-ja-gi an na-wa… meo-ri-ga ha-yae', zh: '准备的句子突然出不来……脑子一片空白。', zhEn: 'The sentence I prepared suddenly wouldn\'t come out... My mind went blank.', practice: 'listen' },
      { speaker: 'tori', ko: '죄송해요. 방금 잠깐 잊었어요.', hangul: 'joe-song-hae-yo. bang-geum jam-kkan i-jeo-sseo-yo', zh: '不好意思。刚才忘了一下。', zhEn: 'Sorry. I just blanked for a moment.', practice: 'shadow' },
      { speaker: 'tori', ko: '용기는 큰 게 아니에요. 작은 거예요.', hangul: 'yong-gi-neun keun ge a-ni-e-yo. ja-geun geo-ye-yo', zh: '勇气不是大的。是小的。', zhEn: 'Courage isn\'t big. It\'s small.', practice: 'shadow' },
      { speaker: 'tori', ko: '이 당근처럼요. 토끼의 손 안에 있는 이 작은 당근처럼.', hangul: 'i dang-geun-cheo-reom-yo. to-kki-ui son a-ne in-neun i ja-geun dang-geun-cheo-reom', zh: '像这胡萝卜。像兔子手里的小胡萝卜。', zhEn: 'Like this carrot. Like the small carrot in the rabbit\'s hand.', practice: 'shadow' },
      { speaker: 'tori', ko: '그 작은 게 저를 여기까지 데려왔어요.', hangul: 'geu ja-geun ge jeo-reul yeo-gi-kka-ji de-ryeo-wa-sseo-yo', zh: '那小的把我带到这里。', zhEn: 'That little one brought me here.', practice: 'shadow' },
      { speaker: 'tori', ko: '?', hangul: '', zh: '전 강당 기립 박수. Tori想真诚道谢结束. 合适的一句？', practice: 'pick',
        choices: [
          { ko: '들어주셔서 진심으로 감사합니다.', zh: '真心感谢您的聆听。', zhEn: 'Thank you sincerely for listening.', correct: true },
          { ko: '박수는 필요 없어요.', zh: '不用鼓掌。', zhEn: 'No need to clap.', correct: false },
          { ko: '이제 그만 갈게요.', zh: '现在就走。', zhEn: 'I\'ll leave now.', correct: false },
        ]},
    ],
  },

  grammar: {
    title: 'A不是B，是C：~은/는 ~이/가 아니에요, ~이에요/예요', titleEn: 'A is not B, it\'s C: ~은/는 ~이/가 아니에요, ~이에요/예요',
    pattern: 'N + **은/는** + N + **이/가 아니에요**, N + **이에요/예요**',
    whenToUse: 'Tori 클라이맥스 명제：「용기**는** 큰 **게 아니에요**. 작은 **거예요**」= 勇气不是大的，是小的. A否定+B确认 = 韩语 강한 정의 문형. 발표/명제/명문에서 최고 무기.', whenToUseEn: 'Tori\'s climax statement: \'용기**는** 큰 **게 아니에요**. 작은 **거예요**\' = \'Courage isn\'t big. It\'s small.\' A negation + B confirmation = a strong definitional pattern in Korean. The ultimate weapon in presentations, theses, and famous quotes.',
    rules: [
      '**부정: N + 이/가 아니에요**: 있다/없다 아니고. 사자가 아니에요',
      '**확인: N + 이에요/예요**: Day 1 배운 기본. 토끼예요',
      '**세트 대비**: 은/는 + 아니에요 + 새 N + 이에요/예요',
      '**시적 명제**: 큰 것이 아니에요, 작은 것입니다',
    ],
    examples: [
      { ko: '용기는 큰 게 아니에요. 작은 거예요.', zh: '勇气不是大的。是小的。', zhEn: 'Courage isn\'t big. It\'s small.', highlight: '큰 게 아니에요 ... 작은 거예요', note: 'Day 84 클라이맥스 명제' },
      { ko: '이건 사자의 크기가 아니에요. 토끼의 크기예요.', zh: '这不是狮子的大小。是兔子的大小。', zhEn: 'This isn\'t the size of a lion. It\'s the size of a rabbit.', highlight: '사자의 크기가 아니에요 ... 토끼의 크기예요', note: 'Tori 발표 원문 응용' },
      { ko: '실패는 끝이 아니에요. 시작이에요.', zh: '失败不是终点。是起点。', zhEn: 'Failure isn\'t the end. It\'s the starting point.', highlight: '끝이 아니에요 ... 시작이에요', note: '자기 격려 명제' },
      { ko: '중요한 건 언어가 아니에요. 마음이에요.', zh: '重要的不是语言。是心。', zhEn: 'What matters isn\'t language. It\'s the heart.', highlight: '언어가 아니에요 ... 마음이에요', note: 'Day 48 영화 감상 응용' },
    ],
    pitfall:
      '① **N 이/가 아니에요**: 이/가 는 부정 대상 표시. Day 1 이에요/예요와 대비. ② 명제 대비 프레임: 은/는 (주제) + 이/가 (부정 대상) 조합. ③ 시적 강도가 강함 — 발표/명언 필수. ④ 확인 문장에서 주제 은/는 은 앞 문장의 것으로 유지: "용기는 X 아니에요. (용기는) Y이에요" 두 번째 주제 생략 자연.',
  },

  output: [
    { id: 'd84-o1', kind: 'compose', zhHint: '勇气不是大的。是小的。', zhHintEn: 'Courage isn\'t big. It\'s small.', tokens: ['용기는', '큰 게 아니에요', '작은 거예요', '큰 것이에요', '용기가', '작은 게 아니에요'], composeAnswer: ['용기는', '큰 게 아니에요', '작은 거예요'], successMsg: 'Day 84 명제. 한국어 시적 대비의 정석.' },
    { id: 'd84-o2', kind: 'listen-choice', audioKo: '그 작은 게 저를 여기까지 데려왔어요.', successMsg: '✓ Tori 클라이맥스. "그 작은 게" = 지시어 + 형용사 관형.', choices: [{ zh: '那小的把我带到这里。', zhEn: 'That little one brought me here.', correct: true }, { zh: '那大的带我走。', zhEn: 'That big one takes me away.', correct: false }, { zh: '这里没有小的。', zhEn: 'There\'s no small one here.', correct: false }, { zh: '带我走的不是小的。', zhEn: 'The one taking me away isn\'t the small one.', correct: false }] },
    { id: 'd84-o3', kind: 'zh-to-ko', zhPrompt: '重要的不是语言。是心。', zhPromptEn: 'What matters isn\'t language. It\'s the heart.', successMsg: '"중요한 건 언어가 아니에요. 마음이에요."', choices: [{ ko: '중요한 건 언어가 아니에요. 마음이에요.', correct: true }, { ko: '중요한 건 언어이 아니에요. 마음이에요.', correct: false }, { ko: '중요한 게 언어가 아니에요 마음.', correct: false }, { ko: '중요한 건 언어에 아니에요. 마음이에요.', correct: false }] },
    { id: 'd84-o4', kind: 'particle-error', zhHint: '把稿子放下了。', zhHintEn: 'Put the script down.', successMsg: '원고 (无收音) + **를** + 내려놓다.', successMsgEn: '원고 (no final consonant) + **를** + 내려놓다.', choices: [{ ko: '원고를 내려놓았어요.', correct: true }, { ko: '원고가 내려놓았어요.', correct: false }, { ko: '원고에 내려놓았어요.', correct: false }, { ko: '원고에서 내려놓았어요.', correct: false }] },
    { id: 'd84-o5', kind: 'match-pair', successMsg: '✓ Day 84 全对. 원고 내려놓고, 진심으로 갔어요.', successMsgEn: '✓ Day 84 all correct. Put down the script and went with sincerity.', pairs: [{ ko: '연설', zh: '演讲', zhEn: 'Speech' }, { ko: '원고', zh: '稿子', zhEn: 'script/draft' }, { ko: '무대', zh: '舞台', zhEn: 'Stage' }, { ko: '심사위원', zh: '评委', zhEn: 'Judges' }, { ko: '데려오다', zh: '带来', zhEn: 'bring' }] },
  ],

  recap: {
    toriPose: 'proud',
    praise: '원고 없이 진심으로 말했어요. 300명이 일어섰어요. Day 1 엄마의 두 글자 "용기"의 완성.',
    preview: '明天 카운트다운 캘린더 — 5장 남음. 매일 한 장씩.', previewEn: 'Tomorrow countdown calendar — 5 sheets left. One each day.',
    stickerId: 'sticker-d84',
    sceneImageUrl: '/images/diary/day-84-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「A 아니에요 B이에요 어떻게?」「무대에서 잊었을 때 어떻게?」', carrotHintEn: 'Today\'s carrots: 「A 아니에요 B이에요 어떻게?」「무대에서 잊었을 때 어떻게?」',
};
