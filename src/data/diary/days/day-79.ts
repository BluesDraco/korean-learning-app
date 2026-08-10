import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 79 · 제주도迷路 · 没有信号
 *
 * 剧情：Tori在제주도走丢，手机没信号。想起Day 7地铁站的恐惧——但这次深呼吸，用韩语
 * 问了路边老奶奶，成功找到回旅馆的路。和Day 7不同了——那时候只会哭，现在会问路。
 */
export const day79: ToriDay = {
  level: 'advanced',
  day: 19,
  phase: 'mastery',
  title: '제주도迷路 · 没有信号', titleEn: 'Lost in Jeju · No signal',
  subtitle: 'Day 7的重现 — 但这次不哭，会问路', subtitleEn: 'A replay of Day 7 — but this time, no crying, I\'ll ask for directions.',
  heroImageUrl: '/images/diary/day-79-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '12월 7일 · 토요일 저녁',
    weather: '제주 · 흐림 · 저녁',
    toriPose: 'shy',
    diaryText: `12月7日，周六傍晚 5 点 30 分。

Junho、Minji、Haru 在 O'sulloc 茶博物馆拍照。我一个人去附近的石墙路散步。

我说："20分钟后见！"

结果石墙路是一座迷宫。左转、右转、又左转……20 分钟变成 30 分钟，又变成 40 分钟。

地图 App：无信号。——通不了。

以前也遇到过这种。——Day 7，地铁末班车，电量 1%。

那次我哭了。——今天呢？

深吸一口气，把胡萝卜笔攥在手心。

石墙路边的长椅上坐着一位年纪很大的奶奶。我走过去：

"저기요, 죄송한데 오설록 티 뮤지엄이 어디예요?"
（不好意思，请问 O'sulloc 茶博物馆在哪里？）

奶奶从头到脚看了我一眼，然后抬手指方向：

"저기 쭉 가서, 큰 나무 지나면, 왼쪽으로 도세요."
（一直往那边走，过了大树，再往左拐。）

——听懂了。标准语加上手势，很清楚。

"감사합니다, 할머니!"（谢谢奶奶！）

十分钟后走到集合点。Haru 满脸担心地跑过来："토리, 전화 왜 안 받아?"（兔莉，电话怎么不接？）

"没有信号。不过我问了一位奶奶，自己走到的。"

Haru 看了我几秒。——和 Day 67 那种眼神完全不一样了。这次是松了一口气的微笑。

Junho 在旁边笑着说："토리, 진짜 컸다."（兔莉真的长大了。）

——这句话，Day 76 才听过一次，今天是第二次。

第二次的这句话，比第一次更让人安静地开心。`,
  },

  words: [
    { id: 'd79-w1', korean: '돌담길', hangul: 'dol-dam-gil', zh: '石墙路', zhEn: 'stone wall road', pos: '名词', posEn: 'Noun', example: { ko: '제주 돌담길이 예뻐요.', zh: '济州石墙路很美。', zhEn: 'Jeju\'s stone wall roads are beautiful.' }, tip: '돌(石) + 담(墙) + 길(路). 제주 상징', tipEn: '돌 (stone) + 담 (wall) + 길 (road). Jeju\'s symbol.' },
    { id: 'd79-w2', korean: '미로', hangul: 'mi-ro', zh: '迷宫', zhEn: 'maze', pos: '名词', posEn: 'Noun', example: { ko: '돌담길이 미로 같아요.', zh: '石墙路像迷宫。', zhEn: 'The stone wall road is like a maze.' }, tip: '迷(미) + 路(로)', tipEn: '迷 (미) + 路 (로)' },
    { id: 'd79-w3', korean: '신호', hangul: 'sin-ho', zh: '信号', zhEn: 'signal', pos: '名词', posEn: 'Noun', example: { ko: '휴대폰 신호가 없어요.', zh: '手机没信号。', zhEn: 'No signal on my phone.' }, tip: '信(신) + 号(호)', tipEn: '信 (신) + 号 (호)' },
    { id: 'd79-w4', korean: '가리키다', hangul: 'ga-ri-ki-da', zh: '指', zhEn: 'point', pos: '动词', posEn: 'Verb', example: { ko: '손으로 방향을 가리켰어요.', zh: '用手指方向。', zhEn: 'Point with your finger.' }, tip: '가리키다 → 가리켰어요' },
    { id: 'd79-w5', korean: '안심', hangul: 'an-sim', zh: '安心', zhEn: 'peace of mind', pos: '名词', posEn: 'Noun', example: { ko: '안심한 미소였어요.', zh: '安心的微笑。', zhEn: 'A relieved smile.' }, tip: '安(안) + 心(심). 안심하다 = 放心', tipEn: '安(안) + 心(심). 안심하다 = to feel relieved' },
    { id: 'd79-w6', korean: '조용히', hangul: 'jo-yong-hi', zh: '安静地', zhEn: 'Quietly', pos: '副词', posEn: 'Adverb', example: { ko: '조용히 기뻐요.', zh: '安静地开心。', zhEn: 'Quietly happy.' }, tip: '조용하다(安静) + 히. 부사', tipEn: '조용하다 (quiet) + 히. Adverb.' },
  ],

  dialogue: {
    scene: '제주 돌담길·할머니 벤치',
    setting: { time: '周六 17:45', timeEn: 'Saturday 17:45', place: '제주 돌담길', npc: '할머니 / Haru / Junho' },
    lines: [
      { speaker: 'tori', isInnerVoice: true, ko: 'Day 7이랑 똑같은 상황. 그런데 오늘은 안 울래.', hangul: 'Day 7-i-rang ttok-ga-teun sang-hwang. geu-reon-de o-neu-reun an ul-lae', zh: '和Day 7一样的情况。但今天不哭。', zhEn: 'Same situation as Day 7. But today, no crying.', practice: 'listen' },
      { speaker: 'tori', ko: '저기요, 죄송한데 오설록 티 뮤지엄이 어디예요?', hangul: 'jeo-gi-yo, joe-song-han-de o-seol-lok ti myu-ji-eo-mi eo-di-ye-yo?', zh: '不好意思，오설록 티 뮤지엄在哪？', zhEn: 'Excuse me, where is Osulloc Tea Museum?', practice: 'shadow' },
      { speaker: 'npc', npcName: '할머니', ko: '저기 쭉 가서, 큰 나무 지나면, 왼쪽으로 도세요.', hangul: 'jeo-gi jjuk ga-seo, keun na-mu ji-na-myeon, oen-jjo-geu-ro do-se-yo', zh: '往那边直走，过大树，左转。', zhEn: 'Go straight that way, past the big tree, then turn left.', practice: 'listen' },
      { speaker: 'tori', ko: '감사합니다, 할머니!', hangul: 'gam-sa-ham-ni-da, hal-meo-ni!', zh: '谢谢，奶奶！', zhEn: 'Thank you, Grandma!', practice: 'shadow' },
      { speaker: 'npc', npcName: 'Haru', ko: '토리, 전화 왜 안 받아? 걱정했잖아.', hangul: 'to-ri, jeon-hwa wae an ba-da? geok-jeong-haet-ja-na', zh: '兔莉，为什么不接电话？担心死了。', zhEn: 'Tori, why aren\'t you answering the phone? I was so worried.', practice: 'listen' },
      { speaker: 'tori', ko: '?', hangul: '', zh: 'Haru担心地问电话. Tori想解释并让Haru放心. 合适的一句？', zhEn: 'Haru asks worriedly on the phone. Tori wants to explain and reassure Haru. Which is the right line?', practice: 'pick',
        choices: [
          { ko: '신호가 없었어. 근데 할머니한테 물어봐서 잘 찾아왔어.', zh: '没信号。但问了奶奶就找到了。', zhEn: 'No signal. But I asked Grandma and found it.', correct: true },
          { ko: '전화 받기 싫었어.', zh: '不想接电话。', zhEn: 'I don\'t want to answer the phone.', correct: false },
          { ko: '길 잃었을 때 울었어. 미안.', zh: '迷路时哭了。抱歉。', zhEn: 'I cried when I got lost. Sorry.', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '曾经/回响：Day 7 → Day 79 (~았/었더라면 잠재적 활용, 문형은 회고)', titleEn: 'Once/echo: Day 7 → Day 79 (~았/었더라면 potential use, pattern is retrospective)',
    pattern: 'V/A + **았/었더라면** (문학적) or **~았/었으면** (Day 44·75)',
    whenToUse: 'Day 79 는 **Day 7의 회귀 회고** 상황. 문형은 새로 배우지 않고 Day 44·75 ~았/었으면 좋겠어 / ~았/었을 텐데 을 재활용. 성장 표현 프레임 완성. 이 날은 **회고+현재 대조** 표현 정리.',
    rules: [
      '**Day 7 → Day 79 대조 프레임**: "그때는 ...었지만, 지금은 ...아요"',
      '**~았/었더라면 (문학체)**: 만약 그때 ~었더라면 = 那时如果...的话',
      '**~았/었으면 (Day 44 복습)**: 지금 원망',
      '**~았/었을 텐데 (Day 75 복습)**: 반사실 상황',
    ],
    examples: [
      { ko: 'Day 7 때는 울었지만, 오늘은 물어봤어요.', zh: 'Day 7时哭了，今天问了。', zhEn: 'Cried on Day 7, asked today.', highlight: '울었지만 ... 물어봤어요', note: '~았/었지만 대조 (Day 60·70 복습)' },
      { ko: '그때 물어봤더라면 안 헤맸을 텐데.', zh: '那时问了就不会迷路的。', zhEn: 'If I had asked then, I wouldn\'t have gotten lost.', highlight: '물어봤더라면 ... 헤맸을 텐데', note: '~았/었더라면 (문학체) + ~았/었을 텐데' },
      { ko: '신호가 있었으면 좋았을 텐데.', zh: '有信号就好了。', zhEn: 'If only I had signal.', highlight: '있었으면 ... 좋았을 텐데', note: 'Day 44·75 종합' },
      { ko: '이제 길 잃어도 안 울어요.', zh: '现在迷路也不哭了。', zhEn: 'Now I don\'t cry even when lost.', highlight: '잃어도 안 울어요', note: '~아/어도 (即使) + 안 + V', noteEn: '~아/어도 (even if) + 안 + V' },
    ],
    pitfall:
      '① **회고+대조 프레임**: 그때(Day 7)는 ~았지만, 오늘은 ~아요. 성장 표현의 왕도. ② ~았/었더라면 은 격식체/문학체. 회화엔 ~았/었으면 더 자주. ③ 반사실 3형태 총정리: ~았/었으면 (Day 44) / ~았/었을 텐데 (Day 75) / ~았/었더라면 (Day 79). 뉘앙스는 유사, 강도 다름.',
  },

  output: [
    { id: 'd79-o1', kind: 'compose', zhHint: 'Day 7时哭了，今天问了。', zhHintEn: 'Cried on Day 7, asked today.', tokens: ['Day 7 때는', '울었지만', '오늘은 물어봤어요', '오늘도 울어요', '어제 울었어요', '지금 안 울어요'], composeAnswer: ['Day 7 때는', '울었지만', '오늘은 물어봤어요'], successMsg: '회고+대조. 성장의 정석 프레임.' },
    { id: 'd79-o2', kind: 'listen-choice', audioKo: '토리, 진짜 컸다.', successMsg: '✓ Day 76에도 들었던 문장. 두 번째.', choices: [{ zh: '兔莉，真的长大了。', zhEn: 'Tori, you\'ve really grown up.', correct: true }, { zh: '兔莉，还小。', zhEn: 'Tori is still young.', correct: false }, { zh: '兔莉，出去。', zhEn: 'Tori, go out.', correct: false }, { zh: '兔莉，等等。', zhEn: 'Tori, wait.', correct: false }] },
    { id: 'd79-o3', kind: 'zh-to-ko', zhPrompt: '有信号就好了。', zhPromptEn: 'If only I had signal.', successMsg: '"신호가 있었으면 좋았을 텐데."', choices: [{ ko: '신호가 있었으면 좋았을 텐데.', correct: true }, { ko: '신호가 있으면 좋을 텐데.', correct: false }, { ko: '신호가 있어서 좋았을 텐데.', correct: false }, { ko: '신호를 있었으면 좋았어요.', correct: false }] },
    { id: 'd79-o4', kind: 'particle-error', zhHint: '用手指方向。', zhHintEn: 'Point with your finger.', successMsg: '손 + **으로** (수단) + 방향을 + 가리키다.', choices: [{ ko: '손으로 방향을 가리켰어요.', correct: true }, { ko: '손이 방향을 가리켰어요.', correct: false }, { ko: '손에 방향을 가리켰어요.', correct: false }, { ko: '손을 방향으로 가리켰어요.', correct: false }] },
    { id: 'd79-o5', kind: 'match-pair', successMsg: '✓ Day 79 全对. Day 7의 회귀, 다른 결말.', successMsgEn: '✓ Day 79 all correct. Day 7 regression, different ending.', pairs: [{ ko: '돌담길', zh: '石墙路', zhEn: 'stone wall road' }, { ko: '미로', zh: '迷宫', zhEn: 'maze' }, { ko: '신호', zh: '信号', zhEn: 'signal' }, { ko: '가리키다', zh: '指', zhEn: 'point' }, { ko: '안심', zh: '安心', zhEn: 'peace of mind' }] },
  ],

  recap: {
    toriPose: 'proud',
    praise: 'Day 7 : 울었다. Day 79 : 물어봤다. 성장의 결정적 순간.',
    preview: '明天 Haru가 아파요. Tori가 처음으로 돌본다.', previewEn: 'Tomorrow Haru is sick. Tori takes care of her for the first time.',
    stickerId: 'sticker-d79',
    sceneImageUrl: '/images/diary/day-79-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~았/었을 텐데 / ~았/었으면 어떻게 다름?」「긴급 상황에 어떻게 도움 요청?」', carrotHintEn: 'Today\'s carrots: 「~았/었을 텐데 / ~았/었으면 how is it different?」「How to ask for help in an emergency?」',
};
