import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 76 · 兽尔로 돌아가다 · 여행의 의미
 *
 * 剧情：四人从釜山回来。Haru说"토리, 많이 컸다"。旅行让Tori学到很多。
 */
export const day76: ToriDay = {
  level: 'advanced',
  day: 16,
  phase: 'mastery',
  title: '回兽尔 · 旅行的意义',
  subtitle: '"토리, 많이 컸다"',
  heroImageUrl: '/images/diary/day-76-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '12월 1일 · 일요일 저녁',
    weather: '兽尔 · 초겨울 저녁',
    toriPose: 'happy',
    diaryText: `12月1日，周日晚上。

从釜山回首尔的 KTX。窗外天渐渐黑了，玻璃上映出我们四个人的脸。

Junho 已经睡着，还打着呼。Minji 戴着耳机安静地听音乐。Haru 看了一会窗外，转过头来问我：

"토리, 이번 여행 어땠어?"（兔莉，这次旅行怎么样？）

我想了一会儿。

"…嗯，很短。但学到的东西很浓。海让语言退到了后面，方言是一场新的初级，还有——一个人的时候也可以开口问路。"

Haru 笑了。

"토리, 많이 컸다."（兔莉，长大了不少呢。）

——这句话，是这次旅行真正的纪念品。

两天前那个没地图、没相机、听不懂方言就到了釜山的兔莉；此刻坐在 KTX 窗边、用韩语在心里整理这些情绪的兔莉。——是同一个人，也是不一样的人。

旅行的意义大概不在于去了哪里，而在于用一个比出发时长大了一点的自己回来。

首尔站的到站广播响起。Junho 揉着眼睛醒来："어? 벌써 도착? KTX 진짜 빠르네."（欸？到了？KTX 真的太快了。）

我笑了。——快的不只是 KTX。这四个人之间生长出来的时间，也是。`,
  },

  words: [
    { id: 'd76-w1', korean: '여행', hangul: 'yeo-haeng', zh: '旅行', pos: '名词', example: { ko: '이번 여행 진짜 좋았어요.', zh: '这次旅行真好。' }, tip: '旅(여) + 行(행)' },
    { id: 'd76-w2', korean: '기념품', hangul: 'gi-nyeom-pum', zh: '纪念品', pos: '名词', example: { ko: '진짜 기념품은 마음속에 있어요.', zh: '真正的纪念品在心里。' }, tip: '纪(기) + 念(념) + 品(품)' },
    { id: 'd76-w3', korean: '진하다', hangul: 'jin-ha-da', zh: '浓', pos: '形容词', example: { ko: '짧지만 진하게 배웠어요.', zh: '虽短但学得浓厚。' }, tip: '진하다 = 浓 (커피/향/경험 등)' },
    { id: 'd76-w4', korean: '자라나다', hangul: 'ja-ra-na-da', zh: '成长', pos: '动词', example: { ko: '자라나는 시간이에요.', zh: '成长的时间。' }, tip: '자라다(长) + 나다(出) 강조. 시적 표현' },
    { id: 'd76-w5', korean: '정리하다', hangul: 'jeong-ni-ha-da', zh: '整理', pos: '动词', example: { ko: '감정을 정리하고 있어요.', zh: '在整理感情。' }, tip: 'Day 56 学过. 이 날은 감정 정리' },
    { id: 'd76-w6', korean: '데려오다', hangul: 'de-ryeo-o-da', zh: '带来', pos: '动词', example: { ko: '더 큰 자신을 데려왔어요.', zh: '带来了更大的自己。' }, tip: '데리다(带) + 오다(来)' },
  ],

  dialogue: {
    scene: 'KTX 돌아오는 길',
    setting: { time: '周日 20:00', place: 'KTX 창가', npc: 'Haru / Junho' },
    lines: [
      { speaker: 'npc', npcName: 'Haru', ko: '토리, 이번 여행 어땠어?', hangul: 'to-ri, i-beon yeo-haeng eo-ttae-sseo?', zh: '兔莉，这次旅行怎么样？', practice: 'listen' },
      { speaker: 'tori', ko: '짧았지만 진하게 많이 배웠어.', hangul: 'jjal-ba-ssi-man jin-ha-ge ma-ni bae-wo-sseo', zh: '虽短但学得很浓。', practice: 'shadow' },
      { speaker: 'tori', ko: '혼자여도 물어볼 수 있다는 걸 배웠어.', hangul: 'hon-ja-yeo-do mu-reo-bol su it-da-neun geol bae-wo-sseo', zh: '学到了独自也能问路。', practice: 'shadow' },
      { speaker: 'npc', npcName: 'Haru', ko: '토리, 많이 컸다.', hangul: 'to-ri, ma-ni keot-da', zh: '兔莉，长大很多。', practice: 'listen' },
      { speaker: 'tori', isInnerVoice: true, ko: '그 말이 오늘 여행의 진짜 기념품이야.', hangul: 'geu ma-ri o-neul yeo-haeng-ui jin-jja gi-nyeom-pu-mi-ya', zh: '这话就是今天旅行的真纪念品。', practice: 'listen' },
      { speaker: 'tori', ko: '?', hangul: '', zh: 'Haru说"컸다". Tori想让Haru知道这也有Haru的功劳. 合适的一句？', practice: 'pick',
        choices: [
          { ko: '하루가 옆에 있어줘서 그래.', zh: '因为Haru在身边啊。', correct: true },
          { ko: '내가 원래 큰 사람이야.', zh: '我本来就大。', correct: false },
          { ko: '너무 커서 못 알아봐.', zh: '大到认不出来了。', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '虽然...但...：~았/었지만 + 부사 (Day 60·70 응용)',
    pattern: 'V/A + **았/었지만** + Adv + Result',
    whenToUse: 'Day 60·70 学过 ~았/었지만 (过去转折). Day 76 = **여행 후 감상**에 부사 삽입. Tori 说 「짧**았지만** 진하게 배웠어」= 虽短但学得浓. 부사 하나가 감정의 밀도를 만든다.',
    rules: [
      '**~았/었지만 + 부사 + V**: 대비 + 정도/방식 표현',
      '**진하게, 짧게, 깊이, 넓게** — 부사 정도 표현',
      '**여행 후기 정석 프레임**: 시간 짧았지만 + 정도 부사 + 감정 동사',
    ],
    examples: [
      { ko: '짧았지만 진하게 배웠어요.', zh: '虽短但学得浓。', highlight: '짧았지만 진하게', note: 'Day 76 여행 정리 명제' },
      { ko: '힘들었지만 즐겁게 걸었어요.', zh: '虽累但走得快乐。', highlight: '힘들었지만 즐겁게', note: '대비 + 즐겁게' },
      { ko: '무서웠지만 용감하게 나섰어요.', zh: '虽怕但勇敢站出来。', highlight: '무서웠지만 용감하게', note: 'Day 68·75 회고' },
      { ko: '작았지만 크게 성공했어요.', zh: '虽小但大成功。', highlight: '작았지만 크게', note: 'Day 70 토론 프레임 응용' },
    ],
    pitfall:
      '① Day 60 기본 ~았/었지만, Day 76 은 **부사 강조** 활용. 감정 밀도 형성. ② 부사 위치: ~았/었지만 뒤에 붙임. ③ 여행 감상 필수 문형 — 후기/블로그/발표 자주.',
  },

  output: [
    { id: 'd76-o1', kind: 'compose', zhHint: '虽短但学得浓。', tokens: ['짧았지만', '진하게', '많이 배웠어', '오래 배웠어', '짧아서', '진하지만'], composeAnswer: ['짧았지만', '진하게', '많이 배웠어'], successMsg: '여행 후기의 완성 문형.' },
    { id: 'd76-o2', kind: 'listen-choice', audioKo: '토리, 많이 컸다.', successMsg: '✓ Haru의 한 마디. 여행의 기념품.', choices: [{ zh: '兔莉，长大很多。', correct: true }, { zh: '兔莉，回来了。', correct: false }, { zh: '兔莉，累了。', correct: false }, { zh: '兔莉，走开。', correct: false }] },
    { id: 'd76-o3', kind: 'zh-to-ko', zhPrompt: '虽怕但勇敢站出来。', successMsg: '"무서웠지만 용감하게 나섰어요." — ~았/었지만 + 부사.', choices: [{ ko: '무서웠지만 용감하게 나섰어요.', correct: true }, { ko: '무섭지만 용감하게 나섰어요.', correct: false }, { ko: '무서워서 용감하게 나섰어요.', correct: false }, { ko: '무서웠지만 용감으로 나섰어요.', correct: false }] },
    { id: 'd76-o4', kind: 'particle-error', zhHint: '带来了更大的自己。', successMsg: '더 큰 자신 (관형어) + **을** + 데려오다.', choices: [{ ko: '더 큰 자신을 데려왔어요.', correct: true }, { ko: '더 큰 자신이 데려왔어요.', correct: false }, { ko: '더 큰 자신에 데려왔어요.', correct: false }, { ko: '더 크는 자신을 데려왔어요.', correct: false }] },
    { id: 'd76-o5', kind: 'match-pair', successMsg: '✓ Day 76 全对. 여행의 진짜 기념품.', pairs: [{ ko: '여행', zh: '旅行' }, { ko: '기념품', zh: '纪念品' }, { ko: '진하다', zh: '浓' }, { ko: '정리하다', zh: '整理' }, { ko: '데려오다', zh: '带来' }] },
  ],

  recap: {
    toriPose: 'happy',
    praise: '"토리, 많이 컸다" — 이 한 마디가 오늘의 진짜 기념품.',
    preview: '明天 학교 여행 계획 발표. 이번엔 제주도.',
    stickerId: 'sticker-d76',
    sceneImageUrl: '/images/diary/day-76-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~았/었지만 + 부사 어떻게 응용?」「여행 후기 어떻게 쓸까?」',
};
