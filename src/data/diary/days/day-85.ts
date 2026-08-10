import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 85 · 카운트다운 · 매일 한 장씩
 *
 * 剧情：教室贴了倒计时日历。每天撕一张，每撕一张回忆一个故事。Tori看数字5→4→3。
 * 85天过去了，剩5天。
 */
export const day85: ToriDay = {
  level: 'advanced',
  day: 25,
  phase: 'mastery',
  title: '倒计时日历 · 每天撕一张',
  subtitle: '"5→4→3" — 每张纸都藏着一个故事',
  heroImageUrl: '/images/diary/day-85-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '12월 17일 · 화요일 오전',
    weather: '兽尔 · 초겨울 흐림',
    toriPose: 'shy',
    diaryText: `12月17日，周二上午。

高级班教室的后墙上，贴着一份"距离毕业 5 天"的倒计时日历。Junho 做的——A4 纸五张，每天撕一张。

今天还剩 5 张。5 → 4，等着被撕。

Danielle 举手："오늘 5장 뜯을 사람? 오늘의 이야기를 하나 나누고 뜯자."（今天谁来撕这张 5？先讲一个当天的故事，再撕。）

我举了手。

"제가 뜯을게요. 그리고… Day 42 이야기 나눌게요. 훠궈 발표 날. 그날 처음으로 반이 저에게 박수쳐줬어요. 그때 저는——이 반이 진짜 저를 받아준다고 처음 느꼈어요."
（我来撕。我想讲 Day 42 的事——那天火锅发表，全班第一次为我鼓掌。那一刻，我第一次真真切切感觉到，这个班接纳了我。）

我把写着"5"的那张撕下来。5 → 4。

Danielle 说："고마워, 토리. 그 발표 나도 기억해."（谢谢你，兔莉。那次发表我也记得。）

——明天撕"4"的是 Junho。——后天的"3"是 Minji。——"2"是 Haru。——"1"，我们一起。

我坐在教室后排看着那份倒计时，突然意识到——这四张纸每被撕掉一张，我们一起待着的时间也被撕掉一张。

我把胡萝卜笔攥在手心，安静地坐着。

——再过三天，也许就回不去了。——把这一刻记牢一点吧。

Day 44 江边 Haru 说过的那句话浮上心头：

"불가능하지만, 기억은 남아요."（回不去了，但记忆会留下来。）

——今天，这句话我又用身体理解了一次。`,
  },

  words: [
    { id: 'd85-w1', korean: '카운트다운', hangul: 'ka-un-teu-da-un', zh: '倒计时', pos: '名词', example: { ko: '카운트다운 캘린더예요.', zh: '倒计时日历。' }, tip: 'countdown 외래어' },
    { id: 'd85-w2', korean: '뜯다', hangul: 'tteut-da', zh: '撕', pos: '动词', example: { ko: '한 장씩 뜯어요.', zh: '一张一张撕。' }, tip: '뜯다 → 뜯어요' },
    { id: 'd85-w3', korean: '남다', hangul: 'nam-da', zh: '剩', pos: '动词', example: { ko: '5일 남았어요.', zh: '剩5天。' }, tip: '남다 → 남았어요' },
    { id: 'd85-w4', korean: '받아주다', hangul: 'ba-da-ju-da', zh: '接纳', pos: '动词', example: { ko: '반이 저를 받아줬어요.', zh: '班上接纳了我。' }, tip: '받다(接) + 주다(给). 감정적 수용' },
    { id: 'd85-w5', korean: '원래', hangul: 'won-lae', zh: '原来/本来', pos: '副词', example: { ko: '원래대로 안 돌아가요.', zh: '不能回到原样。' }, tip: '原(원) + 来(래). 원래대로 = 恢复原样' },
    { id: 'd85-w6', korean: '기억해두다', hangul: 'gi-eo-kae-du-da', zh: '记住/记下来', pos: '动词', example: { ko: '이 순간을 기억해둘게요.', zh: '记住这个瞬间。' }, tip: '기억하다 + ~아/어 두다 (Day 67 pitfall 재활용)' },
  ],

  dialogue: {
    scene: '고급반 교실·카운트다운 캘린더',
    setting: { time: '周二 09:20', place: '한빛대 고급반', npc: 'Danielle / Junho' },
    lines: [
      { speaker: 'npc', npcName: 'Danielle', ko: '오늘 5장 뜯을 사람? 오늘의 이야기를 하나 나누고 뜯자.', hangul: 'o-neul da-seot-jang tteu-deul sa-ram? o-neul-ui i-ya-gi-reul ha-na na-nu-go tteut-ja', zh: '今天谁撕5？分享一个故事再撕。', practice: 'listen' },
      { speaker: 'tori', ko: '제가 뜯을게요. Day 42 훠궈 발표 이야기 나눌게요.', hangul: 'je-ga tteu-deul-ge-yo. Day 42 hwo-gwo bal-pyo i-ya-gi na-nul-ge-yo', zh: '我撕。分享Day 42火锅发表的故事。', practice: 'shadow' },
      { speaker: 'tori', ko: '그날 반이 처음으로 저에게 박수쳐줬어요. 진짜 받아준 느낌이었어요.', hangul: 'geu-nal ba-ni cheo-eu-meu-ro jeo-e-ge bak-su-chyeo-jwo-sseo-yo. jin-jja ba-da-jun neu-kki-mi-eo-sseo-yo', zh: '那天班上第一次为我鼓掌。真被接纳的感觉。', practice: 'shadow' },
      { speaker: 'npc', npcName: 'Danielle', ko: '고마워, 토리. 그 발표 나도 기억해.', hangul: 'go-ma-wo, to-ri. geu bal-pyo na-do gi-eo-kae', zh: '谢谢，兔莉。那发表我也记得。', practice: 'listen' },
      { speaker: 'tori', isInnerVoice: true, ko: '4장의 종이가 뜯길 때마다, 같이 있는 시간도 뜯긴다.', hangul: 'ne-jang-ui jong-i-ga tteut-gil ttae-ma-da, ga-chi in-neun si-gan-do tteut-gin-da', zh: '每撕一张纸，一起的时间也被撕一张。', practice: 'listen' },
      { speaker: 'tori', ko: '?', hangul: '', zh: 'Tori想让大家把这几天珍惜好. 合适的一句？', practice: 'pick',
        choices: [
          { ko: '남은 5일, 소중하게 기억해두자.', zh: '剩下的5天，好好记住。', correct: true },
          { ko: '이제 지루해. 빨리 끝내자.', zh: '好无聊。快结束吧。', correct: false },
          { ko: '캘린더 그만 뜯자.', zh: '别撕日历了。', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '每当___的时候：~(으)ㄹ 때마다',
    pattern: 'V + **(으)ㄹ 때마다**',
    whenToUse: '「每次___的时候」的循环表达. Tori 说 「종이가 뜯**길 때마다** 시간도 뜯긴다」= 每撕一张纸，时间也撕一张. ~(으)ㄹ 때 + 마다 (每) = 循环/规律 표현. 시간 흐름/감정 반복 상황.',
    rules: [
      '**~(으)ㄹ 때 + 마다 = 每当…时**: 갈 때마다 / 볼 때마다 / 먹을 때마다',
      '**과거 → ~았/었을 때마다**: 갔을 때마다 = 每次去的时候',
      '**~마다 vs ~(으)ㄹ 때마다**: 명사 뒤 마다 (day마다 = 每天) vs V + ~(으)ㄹ 때마다 (V할 때마다 = 每次V)',
    ],
    examples: [
      { ko: '종이가 뜯길 때마다 시간도 뜯긴다.', zh: '每撕一张纸，时间也被撕一张。', highlight: '뜯길 때마다 ... 뜯긴다', note: 'Day 85 시적 문장' },
      { ko: '너를 볼 때마다 웃음이 나요.', zh: '每次看到你都笑。', highlight: '볼 때마다', note: '보다 → 볼 때마다' },
      { ko: '한국에 갈 때마다 뭔가 배워요.', zh: '每次去韩国都学到东西。', highlight: '갈 때마다', note: '가다 → 갈 때마다' },
      { ko: '이 노래를 들을 때마다 Day 25가 생각나요.', zh: '每次听这歌就想起Day 25。', highlight: '들을 때마다', note: '듣다 → 들을 때마다 (ㄷ 불규칙)' },
    ],
    pitfall:
      '① ~(으)ㄹ 때마다 는 규칙적/반복 상황 전용. 1회성 상황엔 못 씀. ② ㄷ/ㅂ 불규칙 동사 접합: 듣다 → 들을 때마다, 돕다 → 도울 때마다. ③ 명사 + 마다 (每): 매일마다 (X, 매일 자체가 每) → 하루마다 (O) / 시간마다 (O).',
  },

  output: [
    { id: 'd85-o1', kind: 'compose', zhHint: '每次看到你都笑。', tokens: ['너를', '볼 때마다', '웃음이 나요', '볼 때', '웃어요', '볼 때에'], composeAnswer: ['너를', '볼 때마다', '웃음이 나요'], successMsg: '~(으)ㄹ 때마다 = 매번의 반복.' },
    { id: 'd85-o2', kind: 'listen-choice', audioKo: '4장의 종이가 뜯길 때마다, 같이 있는 시간도 뜯긴다.', successMsg: '✓ Tori 시적 통찰. 시간과 종이의 은유.', choices: [{ zh: '每撕一张纸，一起的时间也被撕一张。', correct: true }, { zh: '4张纸没撕。', correct: false }, { zh: '每天撕纸时间就多。', correct: false }, { zh: '时间不会走。', correct: false }] },
    { id: 'd85-o3', kind: 'zh-to-ko', zhPrompt: '每次去韩国都学到东西。', successMsg: '"한국에 갈 때마다 뭔가 배워요."', choices: [{ ko: '한국에 갈 때마다 뭔가 배워요.', correct: true }, { ko: '한국에 가면 뭔가 배워요.', correct: false }, { ko: '한국에 갔을 때 뭔가 배워요.', correct: false }, { ko: '한국을 갈 때마다 뭔가 배워요.', correct: false }] },
    { id: 'd85-o4', kind: 'particle-error', zhHint: '剩5天。', successMsg: '5일 (일 有收音 ㄹ) + **이** + 남다.', choices: [{ ko: '5일이 남았어요.', correct: true }, { ko: '5일을 남았어요.', correct: false }, { ko: '5일이 남아요 있어요.', correct: false }, { ko: '5일에 남았어요.', correct: false }] },
    { id: 'd85-o5', kind: 'match-pair', successMsg: '✓ Day 85 全对. 5장의 종이가 남았어요.', pairs: [{ ko: '카운트다운', zh: '倒计时' }, { ko: '뜯다', zh: '撕' }, { ko: '남다', zh: '剩' }, { ko: '받아주다', zh: '接纳' }, { ko: '기억해두다', zh: '记下来' }] },
  ],

  recap: {
    toriPose: 'shy',
    praise: '5장의 종이. 매일 한 장. 매 장 뒤에 이야기가 있어요.',
    preview: '明天 Tori 다시 Day 1-7의 길을 걸어봐요. 이번엔 마지막.',
    stickerId: 'sticker-d85',
    sceneImageUrl: '/images/diary/day-85-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~(으)ㄹ 때마다 어떻게?」「기억을 어떻게 남길까?」',
};
