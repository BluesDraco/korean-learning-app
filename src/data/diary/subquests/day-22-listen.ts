import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 22 · 1-2 귀 트이기 · 听力子关卡
 * 素材：Day 22 主流程「해요体课堂」+ 补充日常动作句
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化해요体三规则识别（选对变位形）
 */
export const day22Listen: ListenSubQuestData = {
  day: 22, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在教室里听清每一个"~요"落地的位置', subtitleEn: 'Listen carefully to where each "~요" lands in the classroom',

  meaning: [
    {
      id: 'd22-l2-m1',
      audioKo: '오늘은 해요체를 배워요.',
      choices: [
        { text: '今天我们学해요体。', textEn: 'Today we\'re learning the 해요体.', correct: true },
        { text: '今天不上课。', textEn: 'No class today.', correct: false },
        { text: '해요体不学了。', textEn: 'We\'re not learning the 해요 form anymore.', correct: false },
        { text: '明天开始学해요体。', textEn: 'Starting tomorrow, we\'ll learn the 해요 form.', correct: false },
      ],
      explain: '배우다 → 배워요（ㅜ+ㅓ=ㅝ 缩合）。老师宣布课题的标准句', explainEn: '배우다 → 배워요 (ㅜ+ㅓ=ㅝ contraction). The standard sentence for a teacher announcing a topic',
    },
    {
      id: 'd22-l2-m2',
      audioKo: '한국어 공부해요.',
      choices: [
        { text: '学韩语。', textEn: 'Study Korean.', correct: true },
        { text: '教韩语。', textEn: 'Teach Korean.', correct: false },
        { text: '看韩语电影。', textEn: 'Watch Korean movies.', correct: false },
        { text: '想学韩语。', textEn: 'Want to learn Korean.', correct: false },
      ],
      explain: '공부하다 → 공부해요（하다 → 해요 规则3）', explainEn: '공부하다 → 공부해요 (하다 → 해요 rule 3)',
    },
    {
      id: 'd22-l2-m3',
      audioKo: '음악 들어요.',
      choices: [
        { text: '听音乐。', textEn: 'Listen to music.', correct: true },
        { text: '在弹音乐。', textEn: 'Playing music.', correct: false },
        { text: '想听音乐。', textEn: 'I want to listen to music.', correct: false },
        { text: '不听音乐。', textEn: 'I don\'t listen to music.', correct: false },
      ],
      explain: '듣다 是 ㄷ不规则：듣 → 들 + 어요 = 들어요', explainEn: '듣다 is a ㄷ-irregular verb: 듣 → 들 + 어요 = 들어요',
    },
    {
      id: 'd22-l2-m4',
      audioKo: '친구가 와요.',
      choices: [
        { text: '朋友来了。', textEn: 'A friend came.', correct: true },
        { text: '朋友走了。', textEn: 'My friend left.', correct: false },
        { text: '朋友在等我。', textEn: 'My friend is waiting for me.', correct: false },
        { text: '朋友睡觉了。', textEn: 'My friend is sleeping.', correct: false },
      ],
      explain: '오다 → 와요（ㅗ+ㅏ=ㅘ 缩合）', explainEn: '오다 → 와요 (ㅗ+ㅏ=ㅘ contraction)',
    },
    {
      id: 'd22-l2-m5',
      audioKo: '커피 마셔요.',
      choices: [
        { text: '喝咖啡。', textEn: 'Drink coffee.', correct: true },
        { text: '买咖啡。', textEn: 'Buy coffee.', correct: false },
        { text: '想喝咖啡。', textEn: 'I want to drink coffee.', correct: false },
        { text: '咖啡凉了。', textEn: 'The coffee got cold.', correct: false },
      ],
      explain: '마시다 → 마셔요（ㅣ+ㅓ=ㅕ 缩合）', explainEn: '마시다 → 마셔요 (ㅣ+ㅓ=ㅕ contraction)',
    },
  ],

  cloze: [
    {
      id: 'd22-l2-c1',
      audioKo: '학교에 가요.',
      clozeParts: ['학교에 ', '.'],
      choices: [
        { text: '가요', correct: true },
        { text: '가아요', correct: false },
        { text: '가어요', correct: false },
        { text: '가해요', correct: false },
      ],
      explain: '가다 词干ㅏ + 아요 → 缩合 = 가요（不是 가아요）', explainEn: '가다 stem ㅏ + 아요 → contraction = 가요 (not 가아요)',
    },
    {
      id: 'd22-l2-c2',
      audioKo: '밥 먹어요.',
      clozeParts: ['밥 ', '.'],
      choices: [
        { text: '먹어요', correct: true },
        { text: '먹아요', correct: false },
        { text: '먹해요', correct: false },
        { text: '먹여요', correct: false },
      ],
      explain: '먹다 词干ㅓ → 어요 = 먹어요', explainEn: '먹다 stem ㅓ → 어요 = 먹어요',
    },
    {
      id: 'd22-l2-c3',
      audioKo: '한국어 공부해요.',
      clozeParts: ['한국어 ', '.'],
      choices: [
        { text: '공부해요', correct: true },
        { text: '공부하아요', correct: false },
        { text: '공부하어요', correct: false },
        { text: '공부하요', correct: false },
      ],
      explain: '하다类无条件 해요。不要按 ㅏ/ㅗ 规则拆', explainEn: '하다 type is always 해요. Don\'t apply the ㅏ/ㅗ rule.',
    },
    {
      id: 'd22-l2-c4',
      audioKo: '음악 들어요.',
      clozeParts: ['음악 ', '.'],
      choices: [
        { text: '들어요', correct: true },
        { text: '듣어요', correct: false },
        { text: '듣아요', correct: false },
        { text: '들아요', correct: false },
      ],
      explain: '듣다 ㄷ不规则：ㄷ在元音前变ㄹ → 들 + 어요 = 들어요', explainEn: '듣다 ㄷ-irregular: ㄷ becomes ㄹ before a vowel → 들 + 어요 = 들어요',
    },
  ],

  reply: [
    {
      id: 'd22-l2-r1',
      audioKo: '"가다" 어떻게 바꿔요?',
      promptZh: '老师问"가다"怎么变，你回答해요体，最标准的一句？', promptZhEn: 'The teacher asks how to conjugate "가다". What\'s the most standard 해요-form answer?',
      choices: [
        { text: '가요. ㅏ니까 아요예요.', correct: true },
        { text: '가아요. 아요예요.', correct: false },
        { text: '가해요. 해요예요.', correct: false },
        { text: '가어요. 어요예요.', correct: false },
      ],
      explain: '词干末元音ㅏ → 아요 → 缩合 = 가요。回答带上理由（"ㅏ니까"）更完整', explainEn: 'Stem ending vowel ㅏ → 아요 → contraction = 가요. Adding the reason ("ㅏ니까") makes the answer more complete.',
    },
    {
      id: 'd22-l2-r2',
      audioKo: '"먹다"는요?',
      promptZh: '老师追问"먹다"呢？，你回答해요体，最标准的一句？', promptZhEn: 'The teacher follows up with "먹다". What\'s the most standard 해요-form answer?',
      choices: [
        { text: '먹어요. ㅓ니까 어요예요.', correct: true },
        { text: '먹아요. 아요예요.', correct: false },
        { text: '먹해요. 해요예요.', correct: false },
        { text: '먹요. 요만 붙여요.', correct: false },
      ],
      explain: '词干末元音ㅓ → 어요。有收音ㄱ直接加어요', explainEn: 'Stem ending vowel ㅓ → 어요. With final consonant ㄱ, just add 어요.',
    },
    {
      id: 'd22-l2-r3',
      audioKo: '"공부하다"는 어떻게 바꿔요?',
      promptZh: '老师问"공부하다"怎么变，最标准的一句？', promptZhEn: 'The teacher asks how to conjugate "공부하다". What\'s the most standard answer?',
      choices: [
        { text: '공부해요. 하다는 해요예요.', correct: true },
        { text: '공부하아요. 아요예요.', correct: false },
        { text: '공부하어요. 어요예요.', correct: false },
        { text: '공부하하요. 하요예요.', correct: false },
      ],
      explain: '하다类无条件 → 해요。不按元音规则分析', explainEn: '하다 type is always → 해요. Don\'t analyze it with vowel rules.',
    },
  ],
};
