import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 75 · 부산 独立 · 用方言问路
 *
 * 剧情：Tori一个人在釜山迷路。用方言+标准语混合问路，居然成功了。釜山大婶慢慢用标准语
 * 说了一遍，Tori听懂。独自，在부산。
 */
export const day75: ToriDay = {
  level: 'advanced',
  day: 15,
  phase: 'mastery',
  title: '釜山迷路 · 用方言问路',
  subtitle: '"오이소" — 大婶慢慢用标准语说了一遍',
  heroImageUrl: '/images/diary/day-75-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 30일 · 토요일 저녁',
    weather: '부산 · 저녁 노을',
    toriPose: 'shy',
    diaryText: `11月30日，同一天，傍晚 6 点。

Junho、Minji、Haru 三个人跑去美容院试新发型。我一个人溜达去光复洞散步。

一个小时后——一条巷子接一条巷子，我迷路了。地图 App 显示"GPS 弱，无法定位"。

——慌。

Day 67 那次是晚上。真的害怕。而现在才傍晚 6 点，天还亮着，路上人也多。——这次，我要不一样。

路过一位看着面善的阿姨，我拦住她：

"저기요, 잠시만요. 광복동 지하철역 어디예요?"（不好意思，请问光复洞地铁站在哪里？）

阿姨用方言回答：

"광복역? 저짝으로 쭉 가면 오른편에 있어예."

——"저짝"、"오른편"、"있어예"。我只听懂一半。方向大概能猜，但不完全确定。

我鼓起勇气再请她一次：

"죄송한데요, 표준어로 한 번만 더 천천히 부탁드려도 될까요?"
（不好意思，能不能用标准语再慢慢说一遍？）

阿姨笑着重新说了一次：

"저쪽으로 쭉 가면 오른쪽에 있어요."（一直往那边走，就在右手边。）

——这次 100% 听懂了。我说了声"감사합니다!"。

十五分钟后走到光复站。这一次，不是 Haru 来找我，是我自己走到的。

站在地铁入口的台阶前，我笑了一下。

——75 天前，我在这种时刻只会哭。今天，我笑了。

釜山的方言，傍晚的落日，陌生的巷子——都陌生过，也都翻过去了。

一个人，在釜山。`,
  },

  words: [
    { id: 'd75-w1', korean: '광복동', hangul: 'gwang-bok-dong', zh: '光复洞（釜山地名）', pos: '名词', example: { ko: '광복동은 부산의 유명한 거리예요.', zh: '光复洞是釜山有名的街。' }, tip: '부산 대표 관광 거리' },
    { id: 'd75-w2', korean: '저짝', hangul: 'jeo-jjak', zh: '那边（釜山方言）', pos: '名词', example: { ko: '저짝으로 가세요.', zh: '往那边走。' }, tip: '표준어 = 저쪽. 부산/경상도 사투리' },
    { id: 'd75-w3', korean: '있어예', hangul: 'i-sseo-ye', zh: '有呢（방언）', pos: '表达', example: { ko: '오른편에 있어예.', zh: '在右边呢。' }, tip: '표준어 = 있어요. ~예 = 경상도 종결어미' },
    { id: 'd75-w4', korean: '극복하다', hangul: 'geuk-bo-ka-da', zh: '克服', pos: '动词', example: { ko: '두려움을 극복했어요.', zh: '克服了恐惧。' }, tip: '克(극) + 服(복) + 하다' },
    { id: 'd75-w5', korean: '스스로', hangul: 'seu-seu-ro', zh: '自己/独自', pos: '副词', example: { ko: '스스로 해결했어요.', zh: '自己解决了。' }, tip: '고유어. 혼자와 유사, 좀 더 강조' },
    { id: 'd75-w6', korean: '지도 앱', hangul: 'ji-do aep', zh: '地图App', pos: '名词', example: { ko: '지도 앱 GPS가 약해요.', zh: '地图App GPS弱。' }, tip: '地(지) + 图(도) + app' },
  ],

  dialogue: {
    scene: '광복동 골목·부산 아주머니',
    setting: { time: '周六 18:00', place: '부산 광복동 골목', npc: '부산 아주머니' },
    lines: [
      { speaker: 'tori', ko: '저기요, 잠시만요. 광복동 지하철역 어디예요?', hangul: 'jeo-gi-yo, jam-si-man-yo. gwang-bok-dong ji-ha-cheol-yeok eo-di-ye-yo?', zh: '你好，请问光复洞地铁站在哪？', practice: 'shadow' },
      { speaker: 'npc', npcName: '부산 아주머니', ko: '광복역? 저짝으로 쭉 가면 오른편에 있어예.', hangul: 'gwang-bo-gyeok? jeo-jja-geu-ro jjuk ga-myeon o-reun-pyeo-ne i-sseo-ye', zh: '光复站？往那边直走右边就是。(方言)', practice: 'listen' },
      { speaker: 'tori', ko: '죄송한데요, 표준어로 한 번만 더 천천히 부탁드려도 될까요?', hangul: 'joe-song-han-de-yo, pyo-jun-eo-ro han beon-man deo cheon-cheon-hi bu-tak-deu-ryeo-do doel-kka-yo?', zh: '不好意思，能用标准语再慢慢说一次吗？', practice: 'shadow' },
      { speaker: 'npc', npcName: '부산 아주머니', ko: '저쪽으로 쭉 가면 오른쪽에 있어요.', hangul: 'jeo-jjo-geu-ro jjuk ga-myeon o-reun-jjo-ge i-sseo-yo', zh: '往那边直走右边就有。', practice: 'listen' },
      { speaker: 'tori', isInnerVoice: true, ko: '75일 전이었으면 울고 있었을 텐데. 이젠 웃어.', hangul: '75il jeon-i-eo-sseu-myeon ul-go i-sseo-sseul ten-de. i-jen u-seo', zh: '75天前的话早哭了。现在笑了。', practice: 'listen' },
      { speaker: 'tori', ko: '?', hangul: '', zh: '아주머니 帮完 Tori 想真诚道谢。合适的一句？', practice: 'pick',
        choices: [
          { ko: '감사합니다! 정말 큰 도움이 됐어요.', zh: '谢谢！真的帮了大忙。', correct: true },
          { ko: '아, 그냥 가세요.', zh: '啊，您走吧。', correct: false },
          { ko: '방언 좀 배워야겠네요.', zh: '看来我得学方言。', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '克服·独立表达：스스로 + ~았/었을 텐데',
    pattern: '**스스로** V · **~았/었을 텐데**',
    whenToUse: '「独自」的强调副词 스스로 + 「本该___的」的假设 ~았/었을 텐데 组合. Tori 说 「75일 전이었으면 울고 있**었을 텐데**」= 75天前的话本该哭的. ~았/었을 텐데 = 反事实假设, 用于回顾自己成长时最有力.',
    rules: [
      '**스스로 = 独自/亲自**：혼자보다 강조. 스스로 해결했어요',
      '**~았/었을 텐데 = 本该___的**：반사실적 가정. 실현되지 않은 과거 상황',
      '**~았/었으면 ~았/었을 텐데** 조합: If 과거 → 지금 결과 (조건+결과 반사실)',
      '**~았/었을 텐데 뒤 문장 생략도 자연**: "울었을 텐데..." = 意犹未尽',
    ],
    examples: [
      { ko: '75일 전이었으면 울고 있었을 텐데.', zh: '75天前的话应该在哭。', highlight: '이었으면 ... 있었을 텐데', note: 'Day 75 성장 표현 명제' },
      { ko: '스스로 해결했어요.', zh: '自己解决了。', highlight: '스스로', note: '스스로 강조 부사' },
      { ko: '하루가 왔으면 도와줬을 텐데.', zh: 'Haru来的话会帮的。', highlight: '왔으면 ... 도와줬을 텐데', note: '반사실 가정. Day 67 재활용' },
      { ko: '그때 더 노력했으면 지금 더 잘했을 텐데.', zh: '那时更努力的话现在会更好。', highlight: '노력했으면 ... 잘했을 텐데', note: '과거 후회 표현' },
    ],
    pitfall:
      '① ~았/었을 텐데 는 **반사실적**. 사실 반대 상황의 가정. 실제 일어난 일엔 못 씀. ② 스스로 vs 혼자: 스스로 = 자립적/자기 의지, 혼자 = 물리적 혼자. 스스로 해결했어요 (독립적으로 해결) vs 혼자 밥 먹었어요 (혼자서 식사). ③ ~았/었을 텐데... 문장 뒷부분 생략 = 아쉬움/후회 뉘앙스.',
  },

  output: [
    { id: 'd75-o1', kind: 'compose', zhHint: '75天前的话应该在哭。', tokens: ['75일', '전이었으면', '울고 있었을 텐데', '울었어요', '지금', '울고 있어요'], composeAnswer: ['75일', '전이었으면', '울고 있었을 텐데'], successMsg: '반사실 假设. 성장 표현.' },
    { id: 'd75-o2', kind: 'listen-choice', audioKo: '저쪽으로 쭉 가면 오른쪽에 있어요.', successMsg: '✓ 표준어 버전. Tori 이해 완료.', choices: [{ zh: '往那边直走右边就有。', correct: true }, { zh: '往这边直走左边就有。', correct: false }, { zh: '往那边直走没有。', correct: false }, { zh: '那边没路。', correct: false }] },
    { id: 'd75-o3', kind: 'zh-to-ko', zhPrompt: '自己解决了。', successMsg: '"스스로 해결했어요." — 스스로 강조.', choices: [{ ko: '스스로 해결했어요.', correct: true }, { ko: '혼자 해결했어요 스스로.', correct: false }, { ko: '스스로가 해결했어요.', correct: false }, { ko: '스스로에 해결했어요.', correct: false }] },
    { id: 'd75-o4', kind: 'particle-error', zhHint: '克服了恐惧。', successMsg: '두려움 + **을** + 극복하다.', choices: [{ ko: '두려움을 극복했어요.', correct: true }, { ko: '두려움이 극복했어요.', correct: false }, { ko: '두려움에 극복했어요.', correct: false }, { ko: '두려움은 극복했어요.', correct: false }] },
    { id: 'd75-o5', kind: 'match-pair', successMsg: '✓ Day 75 全对. 혼자, 부산에서.', pairs: [{ ko: '광복동', zh: '光复洞' }, { ko: '저짝', zh: '那边(方言)' }, { ko: '극복하다', zh: '克服' }, { ko: '스스로', zh: '独自' }, { ko: '지도 앱', zh: '地图App' }] },
  ],

  recap: {
    toriPose: 'proud',
    praise: '방언 사이에서도 길을 찾았어요. Day 67의 두려움이 오늘 웃음이 됐어요.',
    preview: '明天 兽尔로 돌아가는 열차. 여행의 의미가 뭘까?',
    stickerId: 'sticker-d75',
    sceneImageUrl: '/images/diary/day-75-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~았/었을 텐데 언제 자연스러워?」「길 잃었을 때 어떻게 침착?」',
};
