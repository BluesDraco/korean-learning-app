import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 88 · 졸업 사진 · 4명이 학사복
 *
 * 剧情：四人穿学士服拍毕业照。Tori把胡萝卜别在帽子上。Minji问帽子上是什么，
 * Tori说"胡萝卜，勇气"。Haru笑说"漂亮"。四只动物站在一起，阳光很好。
 */
export const day88: ToriDay = {
  level: 'advanced',
  day: 28,
  phase: 'mastery',
  title: '毕业照 · 4명이 학사복',
  subtitle: '"당근이야. 용기라는 뜻이지."',
  heroImageUrl: '/images/diary/day-88-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '12월 20일 · 금요일 오전',
    weather: '兽尔 · 초겨울 맑음',
    toriPose: 'proud',
    diaryText: `12月20日，周五上午 10 点。

한빛大学广场。学士服租赁店那里领了四套。

Junho：黄色流苏，穿在身上刚刚好。
Minji：一身利落的黑色学士服，脖子上挂着相机。
Haru：浅灰色学士服，衬她。
我：袖子有点短——毕竟是兔子尺码，不是狮子尺码。

戴帽子之前——我停了一下。

从包里拿出胡萝卜笔。——今天，这根胡萝卜是我的签名，也是我的勋章。

我把它轻轻插在帽顶、流苏结旁。——像是它本来就该在那儿。

摄影师喊准备。

Minji 转头看我："토리, 모자 위에 뭐야? 당근?"（兔莉，你帽子上那是什么？胡萝卜？）

"嗯，是胡萝卜。意思是'용기'（勇气）。我妈妈在上面写的两个字。"

Junho 笑了。Haru 也温温地笑了。Haru 只说了两个字："예쁘다."（好看。）

——好看。和 Day 26 我在大创第一次买下这支胡萝卜笔的时候一样，和 Day 60 我贴上初级毕业贴纸的时候一样。

摄影师："来，一、二、三——"

四个人笑起来，阳光下学士服闪着光。

——这张照片会挂在墙上。——这四个人以后要再进同一个画框，不容易了。

快门响一下。两下。三下。

——我韩语人生的第一张学士照。——它已经在我心里挂好了。`,
  },

  words: [
    { id: 'd88-w1', korean: '학사복', hangul: 'hak-sa-bok', zh: '学士服', pos: '名词', example: { ko: '학사복을 빌렸어요.', zh: '借了学士服。' }, tip: '学(학) + 士(사) + 服(복)' },
    { id: 'd88-w2', korean: '태셀', hangul: 'tae-sel', zh: '流苏', pos: '名词', example: { ko: '노란색 태셀이에요.', zh: '黄色流苏。' }, tip: 'tassel 외래어' },
    { id: 'd88-w3', korean: '훈장', hangul: 'hun-jang', zh: '勋章', pos: '名词', example: { ko: '이 당근이 저의 훈장이에요.', zh: '这胡萝卜是我的勋章。' }, tip: '勋(훈) + 章(장)' },
    { id: 'd88-w4', korean: '꽂다', hangul: 'kkot-da', zh: '插', pos: '动词', example: { ko: '모자에 당근을 꽂았어요.', zh: '把胡萝卜插在帽子上。' }, tip: '꽂다 → 꽂았어요' },
    { id: 'd88-w5', korean: '반짝이다', hangul: 'ban-jja-gi-da', zh: '闪耀', pos: '动词', example: { ko: '태양 아래 학사복이 반짝였어요.', zh: '太阳下学士服闪耀。' }, tip: '반짝(闪) + 이다. 시적 표현' },
    { id: 'd88-w6', korean: '셔터', hangul: 'syeo-teo', zh: '快门', pos: '名词', example: { ko: '셔터 소리가 세 번 났어요.', zh: '快门声响了三次。' }, tip: 'shutter 외래어' },
  ],

  dialogue: {
    scene: '한빛대 광장·졸업 사진',
    setting: { time: '周五 10:00', place: '한빛대 정문 광장', npc: 'Minji / Haru / Junho / 사진기사' },
    lines: [
      { speaker: 'npc', npcName: 'Minji', ko: '토리, 모자 위에 뭐야? 당근?', hangul: 'to-ri, mo-ja wi-e mwo-ya? dang-geun?', zh: '兔莉，帽子上是什么？胡萝卜？', practice: 'listen' },
      { speaker: 'tori', ko: '응, 당근. 용기라는 뜻이지. 엄마가 여기 두 글자 쓰신 거야.', hangul: 'eung, dang-geun. yong-gi-ra-neun tteu-si-ji. eom-ma-ga yeo-gi du-geul-ja sseu-sin geo-ya', zh: '嗯，胡萝卜。就是勇气的意思。妈妈写的两个字。', practice: 'shadow' },
      { speaker: 'npc', npcName: 'Haru', ko: '예쁘다.', hangul: 'ye-ppeu-da', zh: '漂亮。', practice: 'listen' },
      { speaker: 'npc', npcName: 'Junho', ko: '진짜 특별한 학사모야. 이건 훈장이지.', hangul: 'jin-jja teuk-byeol-han hak-sa-mo-ya. i-geon hun-jang-i-ji', zh: '真特别的学士帽。这就是勋章。', practice: 'listen' },
      { speaker: 'npc', npcName: '사진기사', ko: '자, 하나 둘 셋! 웃으세요!', hangul: 'ja, ha-na dul set! u-seu-se-yo!', zh: '来，一二三！笑！', practice: 'listen' },
      { speaker: 'tori', ko: '?', hangul: '', zh: '셔터 세 번 지나갔다. Tori想跟大家说明"这照片珍贵". 合适的一句？', practice: 'pick',
        choices: [
          { ko: '이 사진, 우리 넷의 한 프레임이니까 진짜 소중해.', zh: '这照片是我们四个的一帧，真珍贵。', correct: true },
          { ko: '다시 찍자. 표정 이상해.', zh: '再拍。表情怪。', correct: false },
          { ko: '사진 필요 없어.', zh: '不需要照片。', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '这就是___的意思：~(이)라는 뜻이지 / ~(이)라는 뜻이에요',
    pattern: 'N + **(이)라는 뜻이지 / 뜻이에요**',
    whenToUse: '「就是___的意思」의 정의/설명 표현. Tori 说 「용기**라는 뜻이지**」= 就是勇气的意思. ~(이)라는 뜻 = 该词/该物的含义 설명. 이야기/설명 필수. Day 74 사투리 상황에서 진화한 표현.',
    rules: [
      '**N + (이)라는 뜻**: 该词的意思. 有받침 + 이라는 / 无받침 + 라는',
      '**~는 뜻이지 (반말) / ~는 뜻이에요 (해요)**: 정의 서술',
      '**~는 뜻이 아니에요**: 부정. 그런 뜻이 아니에요',
      '**~라는 X = 名 X**: ~라는 사람 (叫X的人) / ~라는 노래 (叫X的歌)',
    ],
    examples: [
      { ko: '용기라는 뜻이지.', zh: '就是勇气的意思。', highlight: '용기라는 뜻이지', note: '용기(无收音) + 라는 뜻이지 (반말)' },
      { ko: '이 노래는 "함께"라는 뜻이에요.', zh: '这首歌是"一起"的意思。', highlight: '함께라는 뜻이에요', note: '함께(无收音) + 라는 뜻이에요' },
      { ko: 'Danielle이라는 이름은 프랑스어에서 왔대요.', zh: 'Danielle这名字来自法语。', highlight: 'Danielle이라는 이름', note: '이라는 + 名词 관형절' },
      { ko: '그런 뜻이 아니에요.', zh: '不是那个意思。', highlight: '그런 뜻이 아니에요', note: '부정 응답' },
    ],
    pitfall:
      '① ~라는 vs ~는: ~라는 은 명사에 붙는 이야기 인용 관형절. ~는 은 동사 현재 관형. 헷갈리지 마. ② 有받침 이라는 / 无받침 라는 규칙 엄수. ③ 반말 ~는 뜻이지 / 해요 ~는 뜻이에요. 대상에 따라.',
  },

  output: [
    { id: 'd88-o1', kind: 'compose', zhHint: '就是勇气的意思。', tokens: ['용기라는', '뜻이지', '용기이라는', '뜻이야', '용기의', '뜻이 있어'], composeAnswer: ['용기라는', '뜻이지'], successMsg: 'Tori 오늘 妈妈의 두 글자 정의.' },
    { id: 'd88-o2', kind: 'listen-choice', audioKo: '예쁘다.', successMsg: '✓ Haru의 두 글자 감상. Day 88 절정.', choices: [{ zh: '漂亮。', correct: true }, { zh: '不好看。', correct: false }, { zh: '别拍了。', correct: false }, { zh: '换一个。', correct: false }] },
    { id: 'd88-o3', kind: 'zh-to-ko', zhPrompt: '这首歌是"一起"的意思。', successMsg: '"이 노래는 "함께"라는 뜻이에요."', choices: [{ ko: '이 노래는 "함께"라는 뜻이에요.', correct: true }, { ko: '이 노래는 "함께"의 뜻이에요.', correct: false }, { ko: '이 노래는 "함께"이라는 뜻이에요.', correct: false }, { ko: '이 노래가 "함께"라는 뜻이에요.', correct: false }] },
    { id: 'd88-o4', kind: 'particle-error', zhHint: '把胡萝卜插在帽子上。', successMsg: '모자 **에** (장소) + 당근 + **을** + 꽂다.', choices: [{ ko: '모자에 당근을 꽂았어요.', correct: true }, { ko: '모자에서 당근을 꽂았어요.', correct: false }, { ko: '모자를 당근에 꽂았어요.', correct: false }, { ko: '모자에 당근이 꽂았어요.', correct: false }] },
    { id: 'd88-o5', kind: 'match-pair', successMsg: '✓ Day 88 全对. 4명의 한 프레임.', pairs: [{ ko: '학사복', zh: '学士服' }, { ko: '태셀', zh: '流苏' }, { ko: '훈장', zh: '勋章' }, { ko: '꽂다', zh: '插' }, { ko: '반짝이다', zh: '闪耀' }] },
  ],

  recap: {
    toriPose: 'proud',
    praise: '4명의 학사복. 모자 위 당근. 한 셔터, 한 프레임.',
    preview: '明天 졸업 前夜. 4명이 밤새 얘기해요.',
    stickerId: 'sticker-d88',
    sceneImageUrl: '/images/diary/day-88-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~(이)라는 뜻 어떻게?」「졸업 사진 어떻게 특별하게?」',
};
