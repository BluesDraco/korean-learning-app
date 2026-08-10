import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 89 · 졸업 전야 · 天亮
 *
 * 剧情：毕业前夜，四人在宿舍聊天到天亮。Minji "记得吗？机场。你说'我的家太重了'"。
 * Tori说那时候羞死了。Junho记得他说班长时Tori害怕的脸。Haru说——地铁，胡萝卜。
 * 四人笑了，又安静了。天亮了，Tori问"我们……不是分别吧？"
 */
export const day89: ToriDay = {
  level: 'advanced',
  day: 29,
  phase: 'mastery',
  title: '毕业前夜 · 聊天到天亮', titleEn: 'Graduation eve · talking until dawn',
  subtitle: '"우리… 이별은 아니지?"',
  heroImageUrl: '/images/diary/day-89-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '12월 21일 · 토요일 밤 → 22일 새벽',
    weather: '兽尔 · 초겨울 밤 → 맑음', weatherEn: 'Seoul · early winter night → clear',
    toriPose: 'shy',
    diaryText: `12月21日晚 10 点 → 22 日凌晨 6 点。

四个人都聚在 301 房。地上铺了被子，四只炸鸡，两瓶可乐，四杯柚子茶。

Minji 说："얘기 하나씩 하고 자자. 못 자면 밤샘."（每人讲一个故事，讲完再睡。睡不着就通宵。）——结果我们通宵了。

**晚 11 点 · Minji**
"记得吗？Day 3 仁川机场，你说'我的家太重了'。太可爱了，我憋笑憋得快内伤。"
——那天我尴尬到想找地缝。可现在回头想……我也笑出来了。

**凌晨 1 点 · Junho**
"我记得 Day 6 第一节课你看我的那张脸。可能我看着凶吧，你眼睛瞪得那么大——那种'老虎？真的？我要死了？'的表情。"
——是的。那天真的被 Junho 的獠牙吓到。

**凌晨 3 点 · Haru**
Haru 沉默了片刻。然后说：

"지하철. 배터리 1%. 당근이 굴러 나오는 순간."
（地铁。电量 1%。胡萝卜从你包里滚出来的那一刻。）

——四个人都安静了。这个故事，是我们四个的骨架。

**凌晨 5 点 · Tori**
轮到我了。"对我来说最重要的那些瞬间……都在这里。Day 42 火锅发表、Day 68 狮子超市、Day 82 首尔江桥，还有——今天晚上，这个房间。"

**凌晨 6 点**
窗外亮了。Junho 早就趴下睡着。Minji 半梦半醒地又睁开眼。Haru 一边喝柚子茶一边看窗外。

我小声问："...우리, 이별은 아니지?"（……我们，这不是告别吧？）

Haru 看了我一眼，简短地答：

"이별은 없어. 우리 넷은 계속 이어져 있을 거야. 한국어로."
（没有告别。我们四个会一直连着的。——用韩语。）

我笑了。清晨第一缕阳光落在窗玻璃上，闪了一下。`,
  },

  words: [
    { id: 'd89-w1', korean: '전야', hangul: 'jeon-ya', zh: '前夜', zhEn: 'eve', pos: '名词', posEn: 'Noun', example: { ko: '졸업 전야예요.', zh: '毕业前夜。', zhEn: 'The night before graduation.' }, tip: '前(전) + 夜(야)', tipEn: 'Before (전) + Night (야)' },
    { id: 'd89-w2', korean: '밤샘', hangul: 'bam-saem', zh: '通宵', zhEn: 'all-nighter', pos: '名词', posEn: 'Noun', example: { ko: '결국 밤샘했어요.', zh: '结果通宵了。', zhEn: 'We ended up pulling an all-nighter.' }, tip: '밤(夜) + 샘(整个). 밤샘하다 = 熬夜', tipEn: '밤 (night) + 샘 (whole). 밤샘하다 = to stay up all night' },
    { id: 'd89-w3', korean: '뼈대', hangul: 'ppyeo-dae', zh: '骨架/根本', zhEn: 'skeleton/foundation', pos: '名词', posEn: 'Noun', example: { ko: '이 이야기는 우리 넷의 뼈대예요.', zh: '这故事是我们四个的骨架。', zhEn: 'This story is the backbone of the four of us.' }, tip: '뼈(骨) + 대(架). 은유적 표현', tipEn: '뼈(骨) + 대(架). Metaphorical expression.' },
    { id: 'd89-w4', korean: '곯아떨어지다', hangul: 'gol-a-tteo-reo-ji-da', zh: '沉睡/累倒', zhEn: 'deep sleep/collapse from exhaustion', pos: '动词', posEn: 'Verb', example: { ko: 'Junho가 곯아떨어졌어요.', zh: 'Junho累睡着了。', zhEn: 'Junho fell asleep from exhaustion.' }, tip: '피로해 자연스럽게 자는 상황' },
    { id: 'd89-w5', korean: '이별', hangul: 'i-byeol', zh: '离别', zhEn: 'parting', pos: '名词', posEn: 'Noun', example: { ko: '이별은 없어요.', zh: '没有离别。', zhEn: 'No parting.' }, tip: '离(이) + 别(별)', tipEn: 'Leave (이) + Part (별)' },
    { id: 'd89-w6', korean: '이어지다', hangul: 'i-eo-ji-da', zh: '继续/相连', zhEn: 'continue/connected', pos: '动词', posEn: 'Verb', example: { ko: '우리 넷은 계속 이어져 있을 거예요.', zh: '我们四个会一直相连。', zhEn: 'The four of us will always stay connected.' }, tip: '잇다(连) + 어지다(被动). 서로 연결', tipEn: '잇다(连) + 어지다(passive). Connected to each other.' },
  ],

  dialogue: {
    scene: '301호·밤샘 대화·새벽',
    setting: { time: '周六 22:00 → 周日 06:00', timeEn: 'Saturday 22:00 → Sunday 06:00', place: '한빛 기숙사 301호', npc: 'Minji / Junho / Haru' },
    lines: [
      { speaker: 'npc', npcName: 'Minji', ko: '기억나? Day 3 인천공항. 네가 "제 집이 너무 무거워요"라고 했지.', hangul: 'gi-eok-na? Day 3 in-cheon-gong-hang. ne-ga "je ji-bi neo-mu mu-geo-wo-yo"-ra-go haet-ji', zh: '记得吗？Day 3仁川机场。你说"我家太重了"。', zhEn: 'Remember? Day 3 at Incheon Airport. You said, "My home is too heavy."', practice: 'listen' },
      { speaker: 'npc', npcName: 'Junho', ko: '난 Day 6. 네 얼굴이 진짜 겁먹었어. "호랑이? 무서워?" 이런 표정.', hangul: 'nan Day 6. ne eol-gu-ri jin-jja geom-meo-geo-sseo. "ho-rang-i? mu-seo-wo?" i-reon pyo-jeong', zh: '我记得Day 6。你脸真的害怕。"老虎？可怕？"这表情。', practice: 'listen' },
      { speaker: 'npc', npcName: 'Haru', ko: '지하철. 배터리 1%. 당근이 굴러 나오는 순간.', hangul: 'ji-ha-cheol. bae-teo-ri il-peo-sen-teu. dang-geun-i gul-leo na-o-neun sun-gan', zh: '地铁。电量1%。胡萝卜滚出来的瞬间。', zhEn: 'Subway. 1% battery. The moment the carrot rolled out.', practice: 'listen' },
      { speaker: 'tori', ko: '우리, 이별은 아니지?', hangul: 'u-ri, i-byeo-reun a-ni-ji?', zh: '我们，不是离别吧？', zhEn: 'We\'re not parting, right?', practice: 'shadow' },
      { speaker: 'npc', npcName: 'Haru', ko: '이별은 없어. 우리 넷은 계속 이어져 있을 거야. 한국어로.', hangul: 'i-byeo-reun eop-seo. u-ri ne-seun gye-sok i-eo-jyeo i-sseul geo-ya. han-gu-geo-ro', zh: '没有离别。我们四个会一直相连。用韩语。', zhEn: 'No parting. The four of us will always stay connected. In Korean.', practice: 'listen' },
      { speaker: 'tori', ko: '?', hangul: '', zh: 'Haru说"이별은 없어". Tori想温柔答"我知道". 合适的一句？', zhEn: 'Haru said "이별은 없어". Tori wants to gently reply "I know." Which phrase fits?', practice: 'pick',
        choices: [
          { ko: '응. 나도 그렇게 믿어. 계속 한국어로 이어지자.', zh: '嗯。我也这样相信。用韩语继续下去。', zhEn: 'Yeah. I believe that too. Let\'s continue in Korean.', correct: true },
          { ko: '아니야, 이제 안 만날 거야.', zh: '不，以后不见了。', zhEn: 'No, we won\'t see each other anymore.', correct: false },
          { ko: '너 잠 좀 자.', zh: '你睡吧。', zhEn: 'You sleep.', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '不是___吧？：~은/는 아니지? / ~은/는 아니에요?', titleEn: 'It\'s not ___, right?: ~은/는 아니지? / ~은/는 아니에요?',
    pattern: 'N + **은/는 아니지?** (반말) · **은/는 아니에요?** (해요体)', patternEn: 'N + **은/는 아니지?** (반말) · **은/는 아니에요?** (해요체)',
    whenToUse: '「不是___吧？」的부드러운 부정 확인 질문. Tori 问 「이별**은 아니지**?」= 不是离别吧？~은/는 아니지? = 두려운 사실을 부드럽게 확인. 부정을 원하는 상황.', whenToUseEn: '「不是___吧？」is a soft negative confirmation question. Tori asks 「이별**은 아니지**?」= It\'s not a parting, right? ~은/는 아니지? = gently confirming a feared fact. A situation where you hope for a negative answer.',
    rules: [
      '**N + 은/는 아니지? (반말)**: 이별은 아니지 = 不是离别吧',
      '**N + 은/는 아니에요? (해요)**: 오해는 아니에요? = 不是误会吧？',
      '**답변 방식**: 응, 아니야 (是的，不是) / 응, 맞아 (是的，是)',
      '**~잖아 (Day 46 확인)** vs ~아니지 = 확인 vs 부정 확인 다름',
    ],
    examples: [
      { ko: '우리, 이별은 아니지?', zh: '我们不是离别吧？', zhEn: 'We\'re not parting, right?', highlight: '이별은 아니지', note: 'Day 89 Tori 질문. 확신 원하는 부드러움' },
      { ko: '오해는 아니에요?', zh: '不是误会吧？', zhEn: 'It\'s not a misunderstanding, is it?', highlight: '오해는 아니에요', note: 'Day 81 냉전 후 응용 가능' },
      { ko: '너 지금 화난 건 아니지?', zh: '你现在不是生气吧？', zhEn: 'You\'re not angry right now, are you?', highlight: '화난 건 아니지', note: '~ㄴ 것 = 관형+의존명사 (Day 39)' },
      { ko: '거짓말은 아니지?', zh: '不是撒谎吧？', zhEn: 'You\'re not lying, are you?', highlight: '거짓말은 아니지', note: '거짓말 은 + 아니지' },
    ],
    pitfall:
      '① ~은/는 아니지? 는 부드러운 확인. 상대가 "아니야, 그렇지 않아"라고 답하기를 원함. ② 반말 ~아니지? vs 해요 ~아니에요?. ③ 확실한 정답 없을 때 부드럽게 물어봄. 강경 부정은 ~아니잖아 (반말) / ~아니잖아요 (해요).',
  },

  output: [
    { id: 'd89-o1', kind: 'compose', zhHint: '我们不是离别吧？', zhHintEn: 'We\'re not parting, right?', tokens: ['우리', '이별은', '아니지', '이별이야', '이별하자', '아니야'], composeAnswer: ['우리', '이별은', '아니지'], successMsg: 'Tori 새벽 6시의 질문. 확신을 원하는 부드러움.' },
    { id: 'd89-o2', kind: 'listen-choice', audioKo: '이별은 없어. 우리 넷은 계속 이어져 있을 거야.', successMsg: '✓ Haru의 새벽 답. 4명의 유대감 명제.', choices: [{ zh: '没有离别。我们四个会一直相连。', zhEn: 'No goodbyes. The four of us will always stay connected.', correct: true }, { zh: '离别开始了。', zhEn: 'The farewell begins.', correct: false }, { zh: '我们四个都不见了。', zhEn: 'All four of us are gone.', correct: false }, { zh: '不能相连。', zhEn: 'Can\'t connect.', correct: false }] },
    { id: 'd89-o3', kind: 'zh-to-ko', zhPrompt: '你现在不是生气吧？', zhPromptEn: 'You\'re not angry right now, are you?', successMsg: '"너 지금 화난 건 아니지?"', choices: [{ ko: '너 지금 화난 건 아니지?', correct: true }, { ko: '너 지금 화나는 것 아니지?', correct: false }, { ko: '너 지금 화난 것을 아니지?', correct: false }, { ko: '너 지금 화가 나요 아니지?', correct: false }] },
    { id: 'd89-o4', kind: 'particle-error', zhHint: '结果通宵了。', zhHintEn: 'We ended up pulling an all-nighter.', successMsg: '결국 (副词) + **밤샘하다** = 通宵 (동사).', successMsgEn: '결국 (adverb) + **밤샘하다** = to stay up all night (verb).', choices: [{ ko: '결국 밤샘했어요.', correct: true }, { ko: '결국 밤샘 되었어요.', correct: false }, { ko: '결국에서 밤샘 됐어요.', correct: false }, { ko: '결국을 밤샘했어요.', correct: false }] },
    { id: 'd89-o5', kind: 'match-pair', successMsg: '✓ Day 89 全对. 새벽 6시의 대답.', successMsgEn: '✓ Day 89 all correct. The answer at 6 a.m.', pairs: [{ ko: '전야', zh: '前夜', zhEn: 'eve' }, { ko: '밤샘', zh: '通宵', zhEn: 'all-nighter' }, { ko: '뼈대', zh: '骨架', zhEn: 'Skeleton' }, { ko: '이별', zh: '离别', zhEn: 'parting' }, { ko: '이어지다', zh: '相连', zhEn: 'Connected' }] },
  ],

  recap: {
    toriPose: 'shy',
    praise: '밤샘 8시간. 4명의 뼈대 이야기. "이별은 없어" — 새벽의 약속.',
    preview: '明天 마지막 날. 졸업 연설. Tori 연단에.', previewEn: 'Tomorrow is the last day. Graduation speech. Tori at the podium.',
    stickerId: 'sticker-d89',
    sceneImageUrl: '/images/diary/day-89-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~은/는 아니지? 어떻게 부드럽게?」「우정을 어떻게 이어갈까?」', carrotHintEn: 'Today\'s carrots: "~은/는 아니지? How to soften it?" "How do we keep our friendship going?"',
};
