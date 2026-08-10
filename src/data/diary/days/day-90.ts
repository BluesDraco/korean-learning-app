import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 90 · 졸업 연설 · "짐을 가져왔지만, 지금은 집이 있어요"
 *
 * 剧情：Tori上讲台，把勇气胡萝卜放在讲台上。看着台下的妈妈、Minji、Junho、Haru、
 * Danielle、火鹤老师深吸一口气。讲90天故事——第1天把"行李"说成"家"，第7天地铁掉胡萝卜，
 * 第56天帮另一个把"行李"说成"家"的新生。
 * 最后："저는 짐을 가지고 왔어요. 근데 지금은 집이 있어요."
 * 全场安静一秒，然后起立鼓掌。勇气……是小的。一根胡萝卜。但那小的……就是全部。
 */
export const day90: ToriDay = {
  level: 'advanced',
  day: 30,
  phase: 'mastery',
  title: '毕业演讲 · "짐을 가져왔지만, 지금은 집이 있어요"', titleEn: 'Graduation speech · "짐을 가져왔지만, 지금은 집이 있어요"',
  subtitle: '90天的最后一句——全场起立', subtitleEn: 'The last line of 90 days—the whole room stands up',
  heroImageUrl: '/images/diary/day-90-hero.jpg',
  estimatedMin: 15,

  opening: {
    date: '12월 22일 · 일요일 오전',
    weather: '兽尔 · 초겨울 맑음 · 마지막 날', weatherEn: 'Seoul · early winter, clear · last day',
    toriPose: 'proud',
    diaryText: `12月22日，周日上午 10 点。

한빛大学大礼堂。毕业演讲。学生代表：兔莉。

礼堂坐了 500 人。前排——妈妈、Minji、Junho、Haru、Danielle、火鹤老师。好几台摄像机。

轮到我。我走上讲台。

从包里拿出那支胡萝卜笔，轻轻立在讲台的麦克风旁。——今天真正的主角，是它上面的两个字："용기"。

深吸一口气，我开口了：

"안녕하세요. 저는 토리예요."（大家好，我是兔莉。）

"**Day 1 · 出发前夜**
在家里，妈妈在这根胡萝卜上写了'용기'两个字。我笑着说'妈你太迷信了'，但那天，我还是把它放进了包里。

**Day 3 · 仁川机场**
行李箱太重，我对第一次见面的 Minji 说了一句'제 집이 너무 무거워요.'——把'집'（家）和'짐'（行李）说反了。Minji 憋着笑替我拎了行李。

**Day 7 · 地铁末班车**
电量 1%，恐惧 100%。就在那一刻，胡萝卜滚了出来，被 Haru 捡起来交回我手里。

**Day 56 · 三楼走廊**
一位新来的留学生，也像我当年一样把'집'和'짐'搞反了。我笑着告诉了她正确的说法。——那天我第一次明白，我也可以成为别人的那个 Haru。

**Day 82 · 首尔江桥**
和 Minji 冷战三天后，是我先走过去的。Minji 说'너 변했어.'（你变了。）我回她：'한국에서 용기 내는 법을 배웠어.'（我在韩国学会了拿出勇气。）

**Day 84 · 公开演讲**
中途忘词。我拿出这根胡萝卜，说了心里话：'용기는 큰 게 아니에요. 작은 거예요. 이 당근처럼.'（勇气不是大的，是小的，就像这根胡萝卜。）

——然后，就是今天，Day 90。

90 天前，我带着一箱行李（짐）来到这里。
现在——"

我停了一下。礼堂里非常安静。妈妈的眼里蓄了泪。

"……지금은 집이 있어요."（现在，我有家了。）

——一秒的静默。——然后是掌声。全场起立。

500 个人全都站起来了。妈妈用手捂着脸哭。Minji 躲在镜头后面憋着笑。Junho 咧着大牙笑。Haru 是那种安静的微笑——像 Day 57 那封信里写的一样。Danielle 认真地鼓掌。

我在讲台上重新握住那根胡萝卜笔。

——勇气……很小。只是一根胡萝卜。——可是这么小的一样东西，就是全部。

走下讲台的时候，我第一次感到一种完整的踏实感。

不是"집"（house），是"家"（心里的家）。

——那个家在这门韩语里。——那个家在这四个人身上。——那个家在这 90 天的故事里。

Day 1 妈妈的那两个字，"용기"。
Day 90 我的回答，"집이 있어요"。

故事到这里结束了。——但生活会继续。

——안녕히 계세요, Day 1~90.
——안녕하세요, Day 91.`,
  },

  words: [
    { id: 'd90-w1', korean: '졸업식', hangul: 'jo-reop-sik', zh: '毕业典礼', zhEn: 'Graduation ceremony', pos: '名词', posEn: 'Noun', example: { ko: '오늘이 졸업식이에요.', zh: '今天是毕业典礼。', zhEn: 'Today is the graduation ceremony.' }, tip: '卒(졸) + 業(업) + 式(식)', tipEn: 'Graduate (졸) + Work (업) + Ceremony (식)' },
    { id: 'd90-w2', korean: '연단', hangul: 'yeon-dan', zh: '讲台', zhEn: 'podium', pos: '名词', posEn: 'Noun', example: { ko: '연단에 올라갔어요.', zh: '登上讲台。', zhEn: 'Step up to the podium.' }, tip: '演(연) + 坛(단)', tipEn: 'Act (연) + Stage (단)' },
    { id: 'd90-w3', korean: '주인공', hangul: 'ju-in-gong', zh: '主人公', zhEn: 'protagonist', pos: '名词', posEn: 'Noun', example: { ko: '오늘의 주인공은 이 두 글자.', zh: '今天的主人公是这两个字。', zhEn: 'Today\'s protagonist is these two characters.' }, tip: '主(주) + 人(인) + 公(공)', tipEn: 'Main (주) + Character (인) + 公 (공)' },
    { id: 'd90-w4', korean: '안정감', hangul: 'an-jeong-gam', zh: '安定感', zhEn: 'Sense of stability', pos: '名词', posEn: 'Noun', example: { ko: '완전한 안정감을 느꼈어요.', zh: '感到完全的安定感。', zhEn: 'Feels a complete sense of stability.' }, tip: '安(안) + 定(정) + 感(감)', tipEn: 'Stable (안) + Settled (정) + Feeling (감)' },
    { id: 'd90-w5', korean: '전부', hangul: 'jeon-bu', zh: '全部', zhEn: 'Everything', pos: '名词', posEn: 'Noun', example: { ko: '그 작은 게 전부예요.', zh: '那小的就是全部。', zhEn: 'That small thing is everything.' }, tip: '全(전) + 部(부)', tipEn: 'All (전) + Part (부)' },
    { id: 'd90-w6', korean: '삶', hangul: 'sam', zh: '生活/人生', zhEn: 'Life', pos: '名词', posEn: 'Noun', example: { ko: '이야기는 끝나지만 삶은 계속돼요.', zh: '故事结束但生活继续。', zhEn: 'The story ends, but life goes on.' }, tip: '한 글자 명사. 살다 → 삶' },
  ],

  dialogue: {
    scene: '한빛대 대강당·졸업 연설·클라이맥스',
    setting: { time: '周日 10:30', timeEn: 'Sunday 10:30', place: '한빛대 대강당', npc: '전 강당 500명 · 妈妈 · 4명 친구', npcEn: 'Whole auditorium 500 people · Mom · 4 friends' },
    lines: [
      { speaker: 'tori', ko: '안녕하세요. 저는 토리예요. 오늘은 90일의 이야기를 나눌게요.', hangul: 'an-nyeong-ha-se-yo. jeo-neun to-ri-ye-yo. o-neu-reun 90il-ui i-ya-gi-reul na-nul-ge-yo', zh: '大家好，我是兔莉。今天分享90天的故事。', zhEn: 'Hi everyone, I\'m Tori. Today I\'m sharing my 90-day story.', practice: 'shadow' },
      { speaker: 'tori', ko: 'Day 1에 엄마가 이 당근에 "용기" 두 글자를 써주셨어요.', hangul: 'Day 1-e eom-ma-ga i dang-geun-e "yong-gi" du-geul-ja-reul sseo-ju-syeo-sseo-yo', zh: 'Day 1妈妈在这胡萝卜上写了"勇气"两个字。', zhEn: 'Day 1: Mom wrote the word "courage" on this carrot.', practice: 'shadow' },
      { speaker: 'tori', ko: 'Day 3에 저는 "제 집이 너무 무거워요"라고 말했어요. 집과 짐을 헷갈렸어요.', hangul: 'Day 3-e jeo-neun "je ji-bi neo-mu mu-geo-wo-yo"-ra-go mal-hae-sseo-yo. jip-gwa ji-meul het-gal-lyeo-sseo-yo', zh: 'Day 3我说"我家太重了"。把집和짐搞混了。', zhEn: 'Day 3: I said "my house is too heavy." I mixed up 집 and 짐.', practice: 'shadow' },
      { speaker: 'tori', ko: '저는 90일 전 이 짐을 가지고 왔어요.', hangul: 'jeo-neun 90il jeon i ji-meul ga-ji-go wa-sseo-yo', zh: '我90天前带来了这行李。', zhEn: 'I brought this luggage 90 days ago.', practice: 'shadow' },
      { speaker: 'tori', ko: '근데 지금은… 집이 있어요.', hangul: 'geun-de ji-geu-meun… ji-bi i-sseo-yo', zh: '但现在……有了家。', zhEn: 'But now... I have a home.', practice: 'shadow' },
      { speaker: 'tori', ko: '?', hangul: '', zh: '기립 박수 후 연단 내려오기 전. Tori想真诚感谢. 合适的最后一句？', practice: 'pick',
        choices: [
          { ko: '이 90일의 家에게 진심으로 감사합니다.', zh: '真心感谢这90天的家。', zhEn: 'I\'m truly grateful for this home of 90 days.', correct: true },
          { ko: '이제 저 갈게요. 안녕히 계세요.', zh: '我走了。再见。', zhEn: 'I\'m leaving. Goodbye.', correct: false },
          { ko: '90일 별거 아니었어요.', zh: '90天没什么。', zhEn: '90 days is nothing.', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '虽然带了行李，但现在有了家：~았/었지만 지금은 (Day 60·70·82 종합)', titleEn: 'I brought luggage, but now I have a home: ~았/었지만 지금은 (Days 60·70·82 combined)',
    pattern: '**~았/었지만 지금은 ~아/어요**',
    whenToUse: 'Day 60 초급 졸업, Day 90 총 졸업의 명제 프레임 완성. Day 60 "짐을 가져왔지만 지금은 집이 있어요"의 재현·확장. 시간 대비 성장 표현의 최고점.',
    rules: [
      '**Day 60 → Day 90 프레임 완성**: 90일 성장의 언어적 결말',
      '**과거 짐 → 현재 집**: 짐(luggage) → 집(home) 발음 하나 차이의 상징',
      '**~았/었지만 (Day 60·70) + 지금은 (Day 82)**: 종합 대비',
      '**개인 서사 클라이맥스 표현**: 발표/자서전/졸업 연설',
    ],
    examples: [
      { ko: '저는 짐을 가지고 왔지만, 지금은 집이 있어요.', zh: '我带来行李，但现在有家。', zhEn: 'I brought luggage, but now I have a home.', highlight: '가지고 왔지만 ... 집이 있어요', note: 'Day 90 명제. 全 시리즈의 핵심 문장', noteEn: 'Day 90 thesis. The core sentence of the entire series.' },
      { ko: '90일 전엔 두려웠지만, 지금은 안 두려워요.', zh: '90天前害怕，现在不怕。', zhEn: '90 days ago I was scared, now I\'m not.', highlight: '두려웠지만 ... 안 두려워요', note: 'Day 65·66·67 회고' },
      { ko: '한국어를 몰랐지만, 지금은 말할 수 있어요.', zh: '不懂韩语但现在能说。', zhEn: 'I didn\'t know Korean, but now I can speak it.', highlight: '몰랐지만 ... 말할 수 있어요', note: '학습 성취' },
      { ko: '외국인이었지만, 지금은 이 도시가 집이에요.', zh: '曾是外国人，现在这城是家。', zhEn: 'Once a foreigner, now this city is home.', highlight: '외국인이었지만 ... 집이에요', note: '정체성 변화' },
    ],
    pitfall:
      '① Day 60 (초급 졸업) → Day 90 (전체 졸업) 반복 프레임. 문학적 원형. ② ~았/었지만 + 지금은 = 성장 서사의 왕도. ③ 90 이후 학습자는 이 프레임으로 자기 이야기를 완성할 수 있음.',
  },

  output: [
    { id: 'd90-o1', kind: 'compose', zhHint: '我带来行李，但现在有家。', zhHintEn: 'I brought luggage, but now I have a home.', tokens: ['저는', '짐을 가지고 왔지만', '지금은 집이 있어요', '집을 가지고 왔어요', '지금은 짐이 있어요', '집이 없어요'], composeAnswer: ['저는', '짐을 가지고 왔지만', '지금은 집이 있어요'], successMsg: 'Day 90 최종 명제. 90일 이야기의 완성.' },
    { id: 'd90-o2', kind: 'listen-choice', audioKo: '용기는 큰 게 아니에요. 작은 거예요.', successMsg: '✓ Day 84 재현. 90일 인생 명제.', choices: [{ zh: '勇气不是大的。是小的。', zhEn: 'Courage isn\'t big. It\'s small.', correct: true }, { zh: '勇气必须大。', zhEn: 'Courage must be big.', correct: false }, { zh: '大的才是勇气。', zhEn: 'Only big is courage.', correct: false }, { zh: '小的不是勇气。', zhEn: 'Small is not courage.', correct: false }] },
    { id: 'd90-o3', kind: 'zh-to-ko', zhPrompt: '不懂韩语但现在能说。', zhPromptEn: 'I didn\'t know Korean, but now I can speak it.', successMsg: '"한국어를 몰랐지만, 지금은 말할 수 있어요."', choices: [{ ko: '한국어를 몰랐지만, 지금은 말할 수 있어요.', correct: true }, { ko: '한국어가 몰랐지만, 지금은 말할 수 있어요.', correct: false }, { ko: '한국어를 몰라지만, 지금은 말할 수 있어요.', correct: false }, { ko: '한국어를 안 알았지만, 지금은 말할 수 있어요.', correct: false }] },
    { id: 'd90-o4', kind: 'particle-error', zhHint: '感到完全的安定感。', zhHintEn: 'Feels a complete sense of stability.', successMsg: '완전한 안정감 (관형+명사) + **을** + 느끼다.', choices: [{ ko: '완전한 안정감을 느꼈어요.', correct: true }, { ko: '완전한 안정감이 느꼈어요.', correct: false }, { ko: '완전한 안정감에 느꼈어요.', correct: false }, { ko: '완전이 안정감을 느꼈어요.', correct: false }] },
    { id: 'd90-o5', kind: 'match-pair', successMsg: '✓ Day 90 全对. 90일의 이야기, 완성.', successMsgEn: '✓ Day 90 all correct. The 90-day story, complete.', pairs: [{ ko: '졸업식', zh: '毕业典礼', zhEn: 'Graduation ceremony' }, { ko: '연단', zh: '讲台', zhEn: 'podium' }, { ko: '주인공', zh: '主人公', zhEn: 'protagonist' }, { ko: '안정감', zh: '安定感', zhEn: 'Sense of stability' }, { ko: '삶', zh: '生活', zhEn: 'Life' }] },
  ],

  recap: {
    toriPose: 'proud',
    praise: '"짐을 가져왔지만, 지금은 집이 있어요." — 90일 이야기의 마지막 한 문장.',
    preview: '이야기는 여기서 끝나요. 하지만, 삶은 계속되네요. 안녕히 계세요, Day 1~90. 안녕하세요, Day 91.',
    stickerId: 'sticker-d90',
    sceneImageUrl: '/images/diary/day-90-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「Day 60과 Day 90의 프레임 어떻게 같고 다름?」「내 90일 이야기는 뭐?」', carrotHintEn: 'Today\'s carrot: 「How are Day 60 and Day 90\'s frames similar and different?」「What is my 90-day story?」',
};
