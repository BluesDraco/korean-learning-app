import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 15 · 부동산 · 第一次看房
 *
 * 剧情：宿舍合同明年 2 月到期。兔莉刷 Naver 地图，看到一家「행복부동산」
 * 招牌画着一只戴老花镜的金毛老犬。她推门进去，老犬中介从厚厚的房产册子上抬起头：
 * 「어떤 집 찾으세요?」(找什么样的房子？)
 * 兔莉第一次说出"원룸 찾고 있어요"——
 * 不是"我要"，是"我正在找"。这一句让她突然觉得，
 * 自己开始像个真正的兽尔人了。
 *
 * 学习目标：~고 있어요 (正在...) / 房产词汇 / 楼层表达
 * 韩语自审：korean skill PASS（자연성 + 부동산 실제 표현）
 */
export const day15: ToriDay = {
  level: 'beginner',
  day: 15,
  phase: 'expansion',
  title: '부동산 · 第一次说"我在找房子"',
  subtitle: '老犬中介翻开了厚厚的册子',
  isCheckpoint: null,
  estimatedMin: 13,

  opening: {
    date: '9月 15日 周六 下午',
    weather: '兽尔 · 微风',
    toriPose: 'shy',
    diaryText: `9月 16日，周六下午。

宿舍合同明年 2 月到期。
我以为这件事还很远，
但 Junho 说："토리야, 집은 빨리 봐야 돼."
（兔莉，房子要早点看。）

我打开 Naver 地图。
学校北门拐角，
一家「행복부동산」（幸福房产）的招牌——
画着一只戴老花镜的金毛老犬。

推门进去，铃铛响。
老犬中介从一本厚厚的册子里抬起头，
眼镜滑到鼻尖。

"어서 오세요. 어떤 집 찾으세요?"
（欢迎，您找什么样的房子？）

我深呼吸。
我没说"我要"，
我说了："원룸 찾고 있어요."
（我在找一居室。）

"찾고 있어요"——正在找。
这一句，我练了一整周。
说出口的那一秒，
我突然觉得自己开始像个兽尔人了。`,
  },

  words: [
    {
      id: 'd15-w1',
      korean: '집',
      hangul: 'jip',
      zh: '家 / 房子',
      pos: '名词',
      example: { ko: '집을 찾아요.', zh: '找房子。' },
      tip: 'Day 3 짐 vs 집 翻车那个집。받침 ㅂ → 「을」: 집을',
    },
    {
      id: 'd15-w2',
      korean: '원룸',
      hangul: 'won-rum',
      zh: '一居室',
      pos: '名词',
      example: { ko: '원룸 찾고 있어요.', zh: '我在找一居室。' },
      tip: 'one + room 音译。투룸 = 两居室。韩国留学生最常住的房型',
    },
    {
      id: 'd15-w3',
      korean: '보증금',
      hangul: 'bo-jeung-geum',
      zh: '押金',
      pos: '名词',
      example: { ko: '보증금은 얼마예요?', zh: '押金多少？' },
      tip: '韩国看房第一个要问的数字。一般 500 만 ~ 1000 만 원',
    },
    {
      id: 'd15-w4',
      korean: '월세',
      hangul: 'wol-se',
      zh: '月租',
      pos: '名词',
      example: { ko: '월세 50만 원이에요.', zh: '月租 50 万元。' },
      tip: '월(月) + 세(租)。和「보증금」是一对：押金 + 月租',
    },
    {
      id: 'd15-w5',
      korean: '찾고 있어요',
      hangul: 'chat-go i-sseo-yo',
      zh: '正在找',
      pos: '表达',
      example: { ko: '원룸 찾고 있어요.', zh: '我在找一居室。' },
      tip: '动词「찾다」(找) + 「-고 있어요」(正在)。今天的核心句型',
    },
    {
      id: 'd15-w6',
      korean: '층',
      hangul: 'cheung',
      zh: '楼层',
      pos: '名词',
      example: { ko: '3층이에요.', zh: '是 3 楼。' },
      tip: '받침 ㅇ → 「은」: 층은. 一楼 = 1층 / 顶楼 = 옥탑',
    },
  ],

  dialogue: {
    scene: '행복부동산 接待桌',
    setting: {
      time: '周六下午 3 点',
      place: '学校北门 부동산 (房产中介)',
      npc: '老犬中介',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '老犬中介',
        ko: '어서 오세요. 어떤 집 찾으세요?',
        hangul: 'eo-seo o-se-yo. eo-tteon jip chat-eu-se-yo',
        zh: '欢迎，您找什么样的房子？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '원룸 찾고 있어요. 학교 근처로요.',
        hangul: 'won-rum chat-go i-sseo-yo. hak-gyo geun-cheo-ro-yo',
        zh: '我在找一居室。学校附近的。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '老犬中介',
        ko: '보증금이랑 월세는 얼마까지 가능해요?',
        hangul: 'bo-jeung-geum-i-rang wol-se-neun eol-ma-kka-ji ga-neung-hae-yo',
        zh: '押金和月租最多能到多少？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '보증금은 500만 원, 월세는 50만 원 정도요.',
        hangul: 'bo-jeung-geum-eun o-baek-man won, wol-se-neun o-sip-man won jeong-do-yo',
        zh: '押金 500 万，月租 50 万左右。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '中介推荐了三套房：3 楼一居室 / 1 楼一居室 / 顶楼옥탑방，兔莉想要采光好、走路 5 分钟到学校的，应该选哪个？',
        practice: 'pick',
        choices: [
          { ko: '3층 원룸 보여 주세요.', zh: '请给我看 3 楼的一居室。', correct: true },
          { ko: '1층이 좋아요.', zh: '一楼比较好。', correct: false },
          { ko: '옥탑방으로 할게요.', zh: '我要顶楼。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '正在做某事 · 동사 + 고 있어요',
    pattern: '동사 어간 + 고 있어요',
    whenToUse: '表达"现在正在做某事"。比单纯的现在时多一层"持续中"的感觉。看房说"在找"比"要找"地道得多。',
    rules: [
      '动词去掉**다** + **고 있어요**：찾다 → 찾**고 있어요** (正在找)',
      '动词去掉**다** + **고 있어요**：공부하다 → 공부하**고 있어요** (正在学习)',
      '过去时：**고 있었어요** (当时正在...) : 어제 공부하**고 있었어요**',
      '比简单现在时（찾아요/공부해요）更强调"持续中"。在看房、找工作、谈恋爱这种场景特别常用',
    ],
    examples: [
      { ko: '원룸 찾고 있어요.', zh: '我在找一居室。', highlight: '찾고 있어요', note: '**찾고 있어요** = 찾다(找) + 고 있어요(正在)。比 찾아요 多一层"持续寻找中"的感觉，看房场景更地道' },
      { ko: '한국어 공부하고 있어요.', zh: '我在学韩语。', highlight: '공부하고 있어요', note: '**공부하고 있어요** = 공부하다(学习) + 고 있어요(正在)。하다 动词直接加 고 있어요，无需变形' },
      { ko: '뭐 하고 있어요?', zh: '你在做什么？', highlight: '하고 있어요', note: '**하고 있어요** = 하다(做) + 고 있어요(正在)。뭐 是 무엇 的口语缩写，日常最常用的寒暄问句' },
      { ko: '책 읽고 있어요.', zh: '我在看书。', highlight: '읽고 있어요', note: '**읽고 있어요** = 읽다(读) + 고 있어요(正在)。받침 有无都不影响 고 있어요 的添加，直接接即可' },
    ],
    pitfall:
      '别把「찾아요」(找/要找) 和「찾고 있어요」(正在找) 混了。中介问"어떤 집 찾으세요?"时回「원룸 찾아요」也对，但「찾고 있어요」显得你已经看过几家、有过比较——是更成熟的表达。',
  },

  output: [
    {
      id: 'd15-o1',
      kind: 'compose',
      zhHint: '我在找一居室。',
      tokens: ['원룸', '찾고', '있어요', '투룸', '찾아요', '없어요'],
      composeAnswer: ['원룸', '찾고', '있어요'],
      successMsg: '老犬中介合上册子，从抽屉里又拿出一本：「제가 좋은 거 보여 드릴게요.」(我给您看好的。) ✓',
    },
    {
      id: 'd15-o2',
      kind: 'listen-choice',
      audioKo: '월세는 50만 원 정도예요.',
      successMsg: '✓ 「月租 50 万元左右」。「만 원」是固定说法（不读「일만」）；「정도」= 左右。',
      choices: [
        { zh: '月租 50 万元左右。', correct: true },
        { zh: '押金 50 万元。', correct: false },
        { zh: '月租 5 万元。', correct: false },
        { zh: '月租 500 万元。', correct: false },
      ],
    },
    {
      id: 'd15-o3',
      kind: 'zh-to-ko',
      zhPrompt: '我在学韩语。',
      successMsg: '"공부하고 있어요" — 「공부하다」去 다 + 「고 있어요」= 正在学习。',
      choices: [
        { ko: '한국어 공부하고 있어요.', correct: true },
        { ko: '한국어 공부하다고 있어요.', correct: false },
        { ko: '한국어 공부해고 있어요.', correct: false },
        { ko: '한국어 공부 있어요.', correct: false },
      ],
    },
    {
      id: 'd15-o4',
      kind: 'particle-error',
      zhHint: '押金是 500 万元。',
      successMsg: '「보증금」末字「금」有받침 ㅁ → 主题助词「은」。「만 원」直接读，前不加「일」。',
      choices: [
        { ko: '보증금은 500만 원이에요.', correct: true },
        { ko: '보증금는 500만 원이에요.', correct: false },
        { ko: '보증금은 500일만 원이에요.', correct: false },
        { ko: '보증금이 500만 원예요.', correct: false },
      ],
    },
    {
      id: 'd15-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 15 核心词全部对上。부동산 的资料折了一个角，上面有老犬的名字。',
      pairs: [
        { ko: '집', zh: '家/房子' },
        { ko: '원룸', zh: '一居室' },
        { ko: '보증금', zh: '押金' },
        { ko: '월세', zh: '月租' },
        { ko: '찾고 있어요', zh: '正在找' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '第一次说出"찾고 있어요"。"成年留学生"模式正式开启。',
    preview: '明天要一个人去看房地址。但是…我不认识路。该怎么问路？',
    stickerId: 'sticker-d15',
  },

  carrotHint:
    '今天的胡萝卜：「韩国看房常用句」「보증금/월세差别」「찾아요 vs 찾고 있어요」',
};
