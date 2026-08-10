import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 86 · Day 1-7의 길 · "같은 길인데 전부 달라"
 *
 * 剧情：Tori重新走Day 1-7的路线——机场、地铁、宿舍。每一步都是回忆。同一条路，全不同了。
 * 不是路变了，是她变了。（Day 58 深化版）
 */
export const day86: ToriDay = {
  level: 'advanced',
  day: 26,
  phase: 'mastery',
  title: '重走Day 1-7的路 · "길은 그대로, 나만 달라"', titleEn: 'Retrace the path of Day 1-7 · "The road is the same, only I\'ve changed"',
  subtitle: '同一条路，全不同了', subtitleEn: 'Same road, but everything\'s different',
  heroImageUrl: '/images/diary/day-86-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '12월 18일 · 수요일 하루',
    weather: '兽尔 · 초겨울 맑음', weatherEn: 'Seoul · Early winter, clear',
    toriPose: 'proud',
    diaryText: `12月18日，周三，一整天。

Day 58 我走过一次的那条路。今天是第二次，也是最后一次。

**08:00 · 首尔站四号线终点**
Day 3 从仁川机场进城，我第一次坐这条线。Minji 在我旁边，行李箱压得我肩膀生疼。——今天肩膀不疼了。没有行李，一个人。

**09:30 · 弘爪站二号线站台**
Day 7 电量 1%，末班车，我在这里怕过。Day 35 我第一次在这里给别人指路。——今天，我只是站在站台上看着人来人往。
看到一位表情陌生的留学生。我观察了大约五分钟，走过去问了一句："어디 찾으세요?"（您要找哪里？）他说他从俄罗斯来。用带俄语口音的韩语说了一句："고마워요"（谢谢）。

——Day 7 的我 → Day 35 的我 → Day 86 的我。在同一个站台，我看到了三个版本的自己。

**11:30 · 한빛语言学院门口**
Day 6 第一天上课，老虎 Junho 是我唯一认识的脸。Day 60 初级毕业发表。Day 84 公开演讲。——今天我在正门站了一会儿，看了看窗户里。里面坐着新学生，都是陌生的脸。——下个学期，那里面也会有新的兔莉吧。

**14:00 · 한빛宿舍大堂**
Day 4 我第一次拿到房间钥匙。——今天多了一把钥匙：Haru 302 房的备用钥匙。她说："토리, 이제 넌 우리 집이야."（兔莉，从现在起，你就是我们家。）

**17:00 · 葫芦游乐场**
Day 8 我半夜在这里哭过。——今天坐下来，安静地笑了。

我在笔记本上写了一行字：

"길은 그대로. 사람만 달라졌다."（路是原来的路。变的只是人。）`,
  },

  words: [
    { id: 'd86-w1', korean: '노선', hangul: 'no-seon', zh: '路线', zhEn: 'Route', pos: '名词', posEn: 'Noun', example: { ko: '4호선 노선이에요.', zh: '4号线路线。', zhEn: 'Line 4 route.' }, tip: '路(노) + 线(선)', tipEn: 'Road (노) + Line (선)' },
    { id: 'd86-w2', korean: '승강장', hangul: 'seung-gang-jang', zh: '站台', zhEn: 'Platform', pos: '名词', posEn: 'Noun', example: { ko: '승강장에서 봤어요.', zh: '在站台上看到。', zhEn: 'Saw it on the platform.' }, tip: '乘(승) + 降(강) + 场(장)', tipEn: 'Board (승) + Alight (강) + Area (장)' },
    { id: 'd86-w3', korean: '억양', hangul: 'eok-yang', zh: '口音/腔调', zhEn: 'Accent/Tone', pos: '名词', posEn: 'Noun', example: { ko: '러시아 억양이 있어요.', zh: '有俄罗斯口音。', zhEn: 'Has a Russian accent.' }, tip: '抑(억) + 扬(양)', tipEn: 'Suppress (억) + Raise (양)' },
    { id: 'd86-w4', korean: '여벌', hangul: 'yeo-beol', zh: '备用', zhEn: 'Spare', pos: '名词', posEn: 'Noun', example: { ko: '여벌 열쇠예요.', zh: '备用钥匙。', zhEn: 'Spare key.' }, tip: '固有语. 여벌 옷 = 换洗衣', tipEn: 'Native word. 여벌 옷 = change of clothes' },
    { id: 'd86-w5', korean: '그대로', hangul: 'geu-dae-ro', zh: '照旧/原样', zhEn: 'As usual/As is', pos: '副词', posEn: 'Adverb', example: { ko: '길은 그대로예요.', zh: '路照旧。', zhEn: 'The road is the same as always.' }, tip: '그(那) + 대로(照). 未变化', tipEn: '그(那) + 대로(照). Unchanged' },
    { id: 'd86-w6', korean: '달라지다', hangul: 'dal-la-ji-da', zh: '变化', zhEn: 'change', pos: '动词', posEn: 'Verb', example: { ko: '사람만 달라졌어요.', zh: '只是人变了。', zhEn: 'Only the people have changed.' }, tip: '다르다(不同) + 어지다(变得)', tipEn: '다르다(different) + 어지다(become)' },
  ],

  dialogue: {
    scene: '弘爪 승강장·러시아 유학생', sceneEn: 'Hongdae platform · Russian exchange student',
    setting: { time: '周三 09:30', timeEn: 'Wednesday 09:30', place: '弘爪 2호선 승강장', placeEn: 'Hongdae Line 2 platform', npc: '러시아 유학생 / Haru' },
    lines: [
      { speaker: 'tori', isInnerVoice: true, ko: '저 유학생 낯설게 서 있어. Day 7의 나 같아.', hangul: 'jeo yu-hak-saeng nat-seol-ge seo i-sseo. Day 7-ui na ga-ta', zh: '那留学生站得陌生。像Day 7的我。', zhEn: 'That exchange student stands there looking lost. Like me on Day 7.', practice: 'listen' },
      { speaker: 'tori', ko: '저기요, 어디 찾으세요? 도와드릴까요?', hangul: 'jeo-gi-yo, eo-di cha-jeu-se-yo? do-wa-deu-ril-kka-yo?', zh: '你好，找什么？需要帮忙吗？', zhEn: 'Hi, looking for something? Need help?', practice: 'shadow' },
      { speaker: 'npc', npcName: '러시아 유학생', ko: '아, 감사해요. 저는… 한빛 어학당… 어떻게 가요?', hangul: 'a, gam-sa-hae-yo. jeo-neun… han-bit eo-hak-dang… eo-tteo-ke ga-yo?', zh: '啊，谢谢。我……韩光语学堂……怎么走？', zhEn: 'Oh, thanks. I... how do I get to Hangwang Language School?', practice: 'listen' },
      { speaker: 'tori', ko: '2번 출구로 나가서, 왼쪽으로 쭉 가세요. 5분이면 도착해요.', hangul: 'i-beon chul-gu-ro na-ga-seo, oen-jjo-geu-ro jjuk ga-se-yo. o-bu-ni-myeon do-cha-kae-yo', zh: '从2号出口出去，左转直走。5分钟就到。', zhEn: 'Exit through Exit 2, turn left, and go straight. It\'s a 5-minute walk.', practice: 'shadow' },
      { speaker: 'tori', isInnerVoice: true, ko: 'Day 35의 그 문장. 오늘 또 썼다.', hangul: 'Day 35-ui geu mun-jang. o-neul tto sseot-da', zh: 'Day 35的那句。今天又用了。', zhEn: 'That phrase from Day 35. Used it again today.', practice: 'listen' },
      { speaker: 'tori', ko: '?', hangul: '', zh: '러시아 학생 감사하다고 감. Tori想安慰他"我也一开始害怕". 合适的一句？', zhEn: 'The Russian student said thanks. Tori wants to comfort him with "I was scared at first too." Which sentence fits?', practice: 'pick',
        choices: [
          { ko: '괜찮아요. 저도 처음에 그랬어요.', zh: '没事。我一开始也这样。', zhEn: 'It\'s okay. I was like that at first too.', correct: true },
          { ko: '길 모르면 안 돼요.', zh: '不认路可不行。', zhEn: 'Not knowing the way won\'t do.', correct: false },
          { ko: '한국말 못하시죠?', zh: '不会韩语吧？', zhEn: 'You don\'t know Korean, right?', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '路照旧，人变了：~은/는 그대로, ~만 달라졌다', titleEn: 'The road stays, people change: ~은/는 그대로, ~만 달라졌다',
    pattern: 'N + **은/는 그대로** · N + **만 달라졌다**',
    whenToUse: 'Day 86 명제의 시적 프레임：「길**은 그대로**, 사람**만 달라졌다**」= 路照旧，人变了. ~은/는 그대로 (未变) + ~만 (只/唯) + 달라졌다 (变了) = 韩国 시적 표현의 최고 대비. Day 82 이중 주제 프레임의 진화.', whenToUseEn: 'Day 86 poetic frame: 「길**은 그대로**, 사람**만 달라졌다**」= The road stays, people change. ~은/는 그대로 (unchanged) + ~만 (only) + 달라졌다 (changed) = Korea\'s ultimate poetic contrast. Evolution of Day 82\'s dual-subject frame.',
    rules: [
      '**~은/는 그대로**: 未变化 강조. 길은 그대로 = 路照旧',
      '**~만 달라졌다**: 오직 X만 变化. 나만 = 只有我',
      '**대비 프레임**: 变了 vs 未变 이중 대비',
      '**Day 78 ~지만 대비의 시적 진화**',
    ],
    examples: [
      { ko: '길은 그대로, 사람만 달라졌어요.', zh: '路照旧，只有人变了。', zhEn: 'The road stays the same, only the people have changed.', highlight: '길은 그대로 ... 사람만 달라졌어요', note: 'Day 86 명제' },
      { ko: '풍경은 그대로, 마음만 달라졌어요.', zh: '风景照旧，只有心变了。', zhEn: 'The scenery stays the same, only the heart has changed.', highlight: '풍경은 그대로 ... 마음만', note: '여행 회고 응용' },
      { ko: '얼굴은 그대로인데, 눈빛만 달라졌어.', zh: '脸没变，只是眼神变了。', zhEn: 'The face hasn\'t changed, just the look in the eyes.', highlight: '얼굴은 그대로 ... 눈빛만', note: '사람 관찰 응용' },
      { ko: '노래는 같은데, 감정만 달라졌어요.', zh: '歌一样，只有感情变了。', zhEn: 'The song is the same, only the feelings have changed.', highlight: '노래는 ... 감정만', note: 'Day 25/85 노래 회귀' },
    ],
    pitfall:
      '① 그대로 vs 안 변했다: 그대로 = 시적/명제. 안 변했다 = 사실 진술. 시 상황엔 그대로. ② ~만 = 오직. 다른 대상 배제. 나만 (只有我) vs 나도 (我也). ③ Day 82·70·60 ~지만 대비의 진화. 그대로 + 만 = 시간+주체 변화 표현.',
  },

  output: [
    { id: 'd86-o1', kind: 'compose', zhHint: '路照旧，只有人变了。', zhHintEn: 'The road stays the same, only the people have changed.', tokens: ['길은', '그대로', '사람만 달라졌어요', '사람이', '변했어요', '길이 달라졌어요'], composeAnswer: ['길은', '그대로', '사람만 달라졌어요'], successMsg: 'Day 86 명제. 시적 대비의 정석.' },
    { id: 'd86-o2', kind: 'listen-choice', audioKo: '괜찮아요. 저도 처음에 그랬어요.', successMsg: '✓ Tori가 Day 56에도 한 문장. 오늘은 승강장에서.', choices: [{ zh: '没事。我一开始也这样。', zhEn: 'It\'s okay. I was like that at first too.', correct: true }, { zh: '不行。你自己想办法。', zhEn: 'No. Figure it out yourself.', correct: false }, { zh: '你从来没这样过。', zhEn: 'You\'ve never been like this.', correct: false }, { zh: '我不知道怎么办。', zhEn: 'I don\'t know what to do.', correct: false }] },
    { id: 'd86-o3', kind: 'zh-to-ko', zhPrompt: '风景照旧，只有心变了。', zhPromptEn: 'The scenery stays the same, only the heart has changed.', successMsg: '"풍경은 그대로, 마음만 달라졌어요."', choices: [{ ko: '풍경은 그대로, 마음만 달라졌어요.', correct: true }, { ko: '풍경이 그대로, 마음이 달라졌어요.', correct: false }, { ko: '풍경은 안 달라져, 마음이 달라졌어요.', correct: false }, { ko: '풍경도 그대로, 마음도 달라졌어요.', correct: false }] },
    { id: 'd86-o4', kind: 'particle-error', zhHint: '给我一把备用钥匙。', zhHintEn: 'Give me a spare key.', successMsg: '여벌 열쇠 (관형+명사) + **를** + 주세요.', choices: [{ ko: '여벌 열쇠를 주세요.', correct: true }, { ko: '여벌 열쇠가 주세요.', correct: false }, { ko: '여벌 열쇠에 주세요.', correct: false }, { ko: '여벌의 열쇠에서 주세요.', correct: false }] },
    { id: 'd86-o5', kind: 'match-pair', successMsg: '✓ Day 86 全对. 하루의 여벌 열쇠 하나 더.', successMsgEn: '✓ Day 86 all correct. One extra spare key for the day.', pairs: [{ ko: '노선', zh: '路线', zhEn: 'Route' }, { ko: '승강장', zh: '站台', zhEn: 'Platform' }, { ko: '억양', zh: '口音', zhEn: 'accent' }, { ko: '그대로', zh: '照旧', zhEn: 'as usual' }, { ko: '달라지다', zh: '变化', zhEn: 'change' }] },
  ],

  recap: {
    toriPose: 'proud',
    praise: '"길은 그대로, 사람만 달라졌다" — Day 86 명제. 다음 학기 새 토리들에게.',
    preview: '明天妈妈从中国来，参加毕业典礼。', previewEn: 'Mom is coming from China tomorrow for the graduation ceremony.',
    stickerId: 'sticker-d86',
    sceneImageUrl: '/images/diary/day-86-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「그대로 vs 안 변했다 어떻게 다름?」「같은 길을 여러 번 걸으면?」', carrotHintEn: 'Today\'s carrots: \'그대로 vs 안 변했다, how are they different?\' \'What if you walk the same path multiple times?\'',
};
