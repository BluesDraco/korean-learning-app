import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 22 · 한빛어학당 · 老师系统讲解해요体
 *
 * 剧情：周一第一节课，老师走进教室——
 * 一只穿粉色衬衣的火鹤老师，脖子细长，眼神温柔却严格。
 * 黑板上写下三个字：가요. 먹어요. 공부해요.
 * "오늘은 해요体를 배워요. 한국어의 心脏이에요."
 * 兔莉一直在说"이에요/예요"，今天才真正学到——
 * 韩语的所有动词，都要按这个规则变形。
 * 一节课下来，她笔记本第一次写满了三页。
 *
 * 学习目标：해요体三规则 (ㅏ/ㅗ → 아요, 其他 → 어요, 하다 → 해요)
 * 韩语自审：korean skill PASS (학교 강의실 + 동사 활용)
 */
export const day22: ToriDay = {
  day: 22,
  phase: 'expression',
  title: '한빛어학당 · 해요体登场',
  subtitle: '火鹤老师写下：가요. 먹어요. 공부해요.',
  isCheckpoint: null,
  estimatedMin: 14,

  opening: {
    date: '9월 25일 월요일 오전',
    weather: '首尔 · 晴',
    toriPose: 'cheer',
    diaryText: `9월 25日，周一上午 9 点。

第四周第一节课。
教室里 12 个留学生坐成圆圈。
Junho 在我左边，已经在画歌词本。
Minji 给我递了一颗糖。

老师走进来——
一只粉色衬衣的火鹤老师，
脖子细长，眼镜挂在锁骨上。
她笑起来眼角皱皱的，但目光严格。

"오늘은 해요체를 배워요."
（今天我们学해요体。）

她在黑板上写下三个字：
**가요. 먹어요. 공부해요.**

"한국어 동사의 심장이에요."
（这是韩语动词的心脏。）

我一直在说"이에요/예요"，
但那只是名词。
动词要怎么礼貌地说出来？
今天才真正学到。

火鹤老师慢慢讲：
ㅏ/ㅗ → 아요
其他 → 어요
하다 → 해요

"세 가지 규칙. 그것뿐이에요."
（三条规则，仅此而已。）

我在笔记本上画了三个圈。
가다 → 가요
먹다 → 먹어요
공부하다 → 공부해요

下课铃响时，
我笔记本写满了三页。
Junho 看了一眼："토리, 너 미쳤어. 진짜 잘 적었어."
（兔莉你疯了，记得真好。）

我笑了。
原来——韩语的心脏，
也没有那么可怕。`,
  },

  words: [
    {
      id: 'd22-w1',
      korean: '가다',
      hangul: 'ga-da',
      zh: '去',
      pos: '动词',
      example: { ko: '학교에 가요.', zh: '去学校。' },
      tip: '词干末元音 ㅏ → 가요. 最常用动词',
    },
    {
      id: 'd22-w2',
      korean: '먹다',
      hangul: 'meok-da',
      zh: '吃',
      pos: '动词',
      example: { ko: '밥을 먹어요.', zh: '吃饭。' },
      tip: '词干末元音 ㅓ → 먹어요. 그 외 一组',
    },
    {
      id: 'd22-w3',
      korean: '공부하다',
      hangul: 'gong-bu-ha-da',
      zh: '学习',
      pos: '动词',
      example: { ko: '한국어 공부해요.', zh: '我学韩语。' },
      tip: '하다 → 해요. 韩语里 N + 하다 是最大类动词',
    },
    {
      id: 'd22-w4',
      korean: '오다',
      hangul: 'o-da',
      zh: '来',
      pos: '动词',
      example: { ko: '여기 와요.', zh: '过来。' },
      tip: '词干末 ㅗ + 아요 = 오아요 → 缩写 와요. 缩写规则注意',
    },
    {
      id: 'd22-w5',
      korean: '마시다',
      hangul: 'ma-si-da',
      zh: '喝',
      pos: '动词',
      example: { ko: '커피 마셔요.', zh: '喝咖啡。' },
      tip: '词干末 ㅣ + 어요 = 시어요 → 缩写 셔요 / 마셔요. 缩写很常见',
    },
    {
      id: 'd22-w6',
      korean: '듣다',
      hangul: 'deut-da',
      zh: '听',
      pos: '动词',
      example: { ko: '음악 들어요.', zh: '听音乐。' },
      tip: 'ㄷ 不规则：듣다 → 들어요 (ㄷ 변 ㄹ). KPOP 听歌必备',
    },
  ],

  dialogue: {
    scene: '한빛어학당 · 해요体第一课',
    setting: {
      time: '周一上午 9 点',
      place: '한빛어학당 305 教室',
      npc: '火鹤老师',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '火鹤老师',
        ko: '안녕하세요 여러분. 오늘은 해요체를 배워요.',
        hangul: 'an-nyeong-ha-se-yo yeo-reo-bun. o-neul-eun hae-yo-che-reul bae-wo-yo',
        zh: '大家好。今天我们学해요体。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 선생님.',
        hangul: 'ne, seon-saeng-nim',
        zh: '好的，老师。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '火鹤老师',
        ko: '"가다" 어떻게 바꿔요?',
        hangul: 'ga-da eo-tteo-ke ba-kkwo-yo',
        zh: '"가다" 怎么变？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '가요. ㅏ니까 "아요"예요.',
        hangul: 'ga-yo. a-ni-kka a-yo-ye-yo',
        zh: '가요。因为是 ㅏ，所以"아요"。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '老师又问"공부하다 어떻게 바꿔요?"，兔莉应该如何回答？',
        practice: 'pick',
        choices: [
          { ko: '공부해요. 하다는 해요예요.', zh: '공부해요。하다变해요。', correct: true },
          { ko: '공부아요.', zh: '공부아요。', correct: false },
          { ko: '공부어요.', zh: '공부어요。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '韩语动词的心脏 · 해요体三规则',
    pattern: '동사 어간 + 아요 / 어요 / 해요',
    whenToUse: '韩语日常礼貌动词的标配。所有礼貌口语动词都按这三条规则变形。学完今天你能造出 80% 的礼貌句。',
    rules: [
      '① 词干末元音是 **ㅏ / ㅗ** → 加 **아요**: 가다 → **가요**, 보다 → **봐요**',
      '② 其他元音 → 加 **어요**: 먹다 → **먹어요**, 마시다 → **마셔요**',
      '③ **하다** → 永远变 **해요**: 공부하다 → **공부해요**, 사랑하다 → **사랑해요**',
      '缩写常见：오 + 아요 = **와요** / ㅣ + 어요 = **셔요** / 하 + 여요 = **해요**',
    ],
    examples: [
      { ko: '학교에 가요.', zh: '去学校。', highlight: '가요' },
      { ko: '밥을 먹어요.', zh: '吃饭。', highlight: '먹어요' },
      { ko: '한국어 공부해요.', zh: '学韩语。', highlight: '공부해요' },
      { ko: '커피 마셔요.', zh: '喝咖啡。', highlight: '마셔요' },
    ],
    pitfall:
      '不要被「와요 / 봐요 / 해요」的缩写吓到——它们都是「ㅗ+아요」「하+여요」缩写后的样子。死记硬背就会错；理解词干末元音 + 缀的规则，才能万变不离其宗。',
  },

  output: [
    {
      id: 'd22-o1',
      kind: 'fill',
      prompt: '한국어 공부___.',
      zhHint: '我学韩语。',
      answer: '해요',
      successMsg: '火鹤老师在你笔记本上画了一个大大的圆圈。"잘했어요." ✓',
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '韩语的心脏不可怕。从今天起，你能用해요体造出 80% 的礼貌句。',
    preview: '明天放学 Junho 兴奋地拽我去弘大——他喜欢的偶像在某家咖啡馆办生日咖啡店…',
    stickerId: 'sticker-d22',
  },

  carrotHint:
    '今天的胡萝卜：「해요体三规则速查」「가다/오다/하다变形对比」「ㄷ不规则动词举例」',
};
