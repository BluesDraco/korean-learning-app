import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 81 · Minji와 싸움 · 冷战三天
 *
 * 剧情：Tori 와 Minji가 사소한 일로 싸움. 냉전 3일. 전체 반에 어색. Tori 심리 - 화나면서도
 * 그리움. Junho: "진짜 친구면 먼저 가." Tori 3日 생각한 후 먼저 말 걸기로 결심.
 */
export const day81: ToriDay = {
  level: 'advanced',
  day: 21,
  phase: 'mastery',
  title: '和Minji吵架 · 冷战三天',
  subtitle: '"진짜 친구면 먼저 가" — Junho的一句',
  heroImageUrl: '/images/diary/day-81-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '12월 12일 · 목요일 저녁',
    weather: '兽尔 · 첫 눈 예보',
    toriPose: 'shy',
    diaryText: `12月12日，周四晚上。

和 Minji 冷战第三天了。

起因非常小。自习咖啡馆的座位——我先占的位子，Minji 好像没看到就坐了下去。我语气重了一点，她也顶了回来。之后三天，我们谁都没跟谁说话。

教室里的气氛尴尬。Junho 发来 KakaoTalk："你俩到底怎么了？整个班的空气都僵了。" Haru 也发来："토리, 마음 어때?"（兔莉，心里怎么样？）

老实说——是生气。可我也想她。

Day 49 我帮别人和好的时候，说过一句话："친구니까 서로 사과해야 돼."（是朋友就要互相道歉。）——现在，我得把这句话拿来对自己说。

深夜里，我打电话给 Junho："준호야, 어떻게 해야 돼?"

Junho 说："토리, 진짜 친구면 먼저 가."（兔莉，是真朋友的话，你就先去。）

……先去，会不会很丢脸？会不会伤自尊？

我躺在床上盯着天花板。手里攥着那支胡萝卜笔，摸着上面的"용기"两个字。

——自尊心哪有友情大呢。

明天，我先开口。在哪？怎么说？——Day 49 我把两个人带去的教室后排？不，太学校味了。——首尔江边的桥。就那里。风虽然大，但真心不会被风吹走。

明天一早，我要发消息给 Minji：

"민지야, 오늘 수업 끝나고 한강 다리에서 잠깐 볼래?"
（民智，今天下课后去首尔江桥见一面好吗？）

——打破三天沉默的第一句话。`,
  },

  words: [
    { id: 'd81-w1', korean: '싸움', hangul: 'ssa-um', zh: '争吵', pos: '名词', example: { ko: '민지랑 싸움 났어요.', zh: '和Minji吵架了。' }, tip: '싸우다(动) → 싸움(名)' },
    { id: 'd81-w2', korean: '냉전', hangul: 'naeng-jeon', zh: '冷战', pos: '名词', example: { ko: '3일째 냉전이에요.', zh: '第3天冷战。' }, tip: '冷(냉) + 战(전)' },
    { id: 'd81-w3', korean: '오해', hangul: 'o-hae', zh: '误会', pos: '名词', example: { ko: '작은 오해에서 시작됐어요.', zh: '从小误会开始。' }, tip: '误(오) + 解(해). 오해하다 = 误会' },
    { id: 'd81-w4', korean: '어색', hangul: 'eo-saek', zh: '尴尬', pos: '名词', example: { ko: '반 분위기가 어색해요.', zh: '班上气氛尴尬。' }, tip: '어색하다 = 尴尬' },
    { id: 'd81-w5', korean: '자존심', hangul: 'ja-jon-sim', zh: '自尊心', pos: '名词', example: { ko: '자존심보다 우정이 커요.', zh: '友情比自尊大。' }, tip: '自(자) + 尊(존) + 心(심)' },
    { id: 'd81-w6', korean: '침묵', hangul: 'chim-muk', zh: '沉默', pos: '名词', example: { ko: '3일의 침묵을 깰 거예요.', zh: '要打破3天的沉默。' }, tip: 'Day 60 学过. 이 날은 우정 사이의 침묵' },
  ],

  dialogue: {
    scene: '자기 방·Junho 전화',
    setting: { time: '周四 22:00', place: 'Tori 방', npc: 'Junho / Haru (카톡)' },
    lines: [
      { speaker: 'npc', npcName: 'Junho', ko: '토리, 너네 두 명 진짜 왜 그래? 반 분위기 다 죽었어.', hangul: 'to-ri, neo-ne du-myeong jin-jja wae geu-rae? ban bun-wi-gi da ju-geo-sseo', zh: '兔莉，你们俩到底怎么了？班上都被冻僵了。', practice: 'listen' },
      { speaker: 'tori', ko: '작은 오해에서 시작됐어. 근데 이제 어색해서 말도 못 걸어.', hangul: 'ja-geun o-hae-e-seo si-ja-kwaet-sseo. geun-de i-je eo-sae-kae-seo mal-do mot geo-reo', zh: '从小误会开始。现在尴尬到说不出话。', practice: 'shadow' },
      { speaker: 'npc', npcName: 'Junho', ko: '진짜 친구면 먼저 가.', hangul: 'jin-jja chin-gu-myeon meon-jeo ga', zh: '真朋友的话先去。', practice: 'listen' },
      { speaker: 'tori', isInnerVoice: true, ko: '자존심 상해. 근데… 자존심보다 우정이 크지.', hangul: 'ja-jon-sim sang-hae. geun-de… ja-jon-sim-bo-da u-jeong-i keu-ji', zh: '自尊会受伤。但……友情比自尊大。', practice: 'listen' },
      { speaker: 'tori', ko: '내일 내가 먼저 말할게. 한강 다리에서 볼래?', hangul: 'nae-il nae-ga meon-jeo mal-hal-ge. han-gang da-ri-e-seo bol-lae?', zh: '明天我先说。兽尔江大桥见？', practice: 'shadow' },
      { speaker: 'tori', ko: '?', hangul: '', zh: 'Junho 회의적. Tori想坚定说"这次我先去". 合适的一句？', practice: 'pick',
        choices: [
          { ko: '괜찮아, 이번엔 내가 먼저 가는 게 맞아.', zh: '没事，这次我先去是对的。', correct: true },
          { ko: '민지가 먼저 오면 될 것 같아.', zh: 'Minji先来就行。', correct: false },
          { ko: '냉전 계속 갈 거야.', zh: '冷战继续。', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '如果是A就___：~(이)면 (Day 42·50 종합)',
    pattern: 'N + **(이)면** · V/A + **(으)면**',
    whenToUse: 'Day 42·50 学过 ~(으)면 (条件). Day 81 = **정체성/조건 명제**. Junho 说 「진짜 친구**면** 먼저 가」= 真朋友的话先去. N + (이)면 = 명사 조건절. 아이덴티티 기반 명제 표현.',
    rules: [
      '**N (이)면 (Day 42 复习)**: 명사 조건. 有받침 + 이면 / 无收音 + 면',
      '**Day 42·50 ~(으)면 통용 규칙**: 조건 이후 결과',
      '**~면 + 명령/제안 OK**: Day 42 pitfall 재확인 — ~아/어서와 달리 명령 됨',
      '**아이덴티티 명제**: 친구면, 학생이면, 사람이면 = 정체성 기반 조건',
    ],
    examples: [
      { ko: '진짜 친구면 먼저 가.', zh: '真朋友的话先去。', highlight: '친구면', note: '친구(无收音) + 면. Junho 원문' },
      { ko: '학생이면 공부해야 돼.', zh: '学生的话要学习。', highlight: '학생이면', note: '학생(받침 ㅇ) + 이면' },
      { ko: '자존심보다 우정이 크면, 먼저 가는 게 맞아.', zh: '友情比自尊大就先去。', highlight: '크면 ... 맞아', note: '~보다 + ~(으)면 조합' },
      { ko: '오해면 풀면 돼.', zh: '误会的话解开就好。', highlight: '오해면 ... 풀면 돼', note: 'N면 + V면 이중 조건' },
    ],
    pitfall:
      '① Day 42 ~(으)면 은 시간/조건, Day 81 은 **아이덴티티 조건**. 정체성 = ~(이)면. 상황 = ~(으)면. ② 名词 후 받침 판단: 친구(X) + 면 / 학생(O) + 이면. ③ Day 42 pitfall: ~(으)면 뒤 명령/제안 가능. ~아/어서 는 안 됨.',
  },

  output: [
    { id: 'd81-o1', kind: 'compose', zhHint: '真朋友的话先去。', tokens: ['진짜', '친구면', '먼저 가', '먼저 가세요', '친구야', '먼저 안 가'], composeAnswer: ['진짜', '친구면', '먼저 가'], successMsg: 'Junho 원문. 우정의 조건 명제.' },
    { id: 'd81-o2', kind: 'listen-choice', audioKo: '자존심보다 우정이 커요.', successMsg: '✓ Tori의 결론. ~보다 (Day 45) + 우정 vs 자존심.', choices: [{ zh: '友情比自尊大。', correct: true }, { zh: '自尊比友情大。', correct: false }, { zh: '两个一样大。', correct: false }, { zh: '都不重要。', correct: false }] },
    { id: 'd81-o3', kind: 'zh-to-ko', zhPrompt: '误会的话解开就好。', successMsg: '"오해면 풀면 돼."', choices: [{ ko: '오해면 풀면 돼.', correct: true }, { ko: '오해이면 풀면 되요.', correct: false }, { ko: '오해에서 풀면 돼.', correct: false }, { ko: '오해으면 풀면 돼.', correct: false }] },
    { id: 'd81-o4', kind: 'particle-error', zhHint: '要打破3天的沉默。', successMsg: '3일**의** 침묵 (관형) + **을** + 깨다.', choices: [{ ko: '3일의 침묵을 깰 거예요.', correct: true }, { ko: '3일의 침묵이 깰 거예요.', correct: false }, { ko: '3일에 침묵을 깰 거예요.', correct: false }, { ko: '3일 침묵이 깰 거예요.', correct: false }] },
    { id: 'd81-o5', kind: 'match-pair', successMsg: '✓ Day 81 全对. 내일, 침묵을 깨.', pairs: [{ ko: '싸움', zh: '争吵' }, { ko: '냉전', zh: '冷战' }, { ko: '오해', zh: '误会' }, { ko: '자존심', zh: '自尊心' }, { ko: '침묵', zh: '沉默' }] },
  ],

  recap: {
    toriPose: 'shy',
    praise: '3일간 마음 정리. 내일, 내가 먼저 간다는 결정.',
    preview: '明天，兽尔江大桥上，和 Minji 重逢。',
    stickerId: 'sticker-d81',
    sceneImageUrl: '/images/diary/day-81-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「N(이)면 어떻게 사용?」「먼저 화해 어렵지만 어떻게?」',
};
