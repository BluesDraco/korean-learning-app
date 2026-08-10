import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 22 · 1-3 문법 탐험 · 语法关
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：해요体三规则 · 缩合 · ㄷ/ㅂ不规则识别
 */
export const day22Grammar: GrammarSubQuestData = {
  day: 22, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '해요体三规则 · 缩合 · ㄷ/ㅂ 不规则', subtitleEn: 'Three rules of 해요 form · Contraction · ㄷ/ㅂ irregular',

  fix: [
    {
      id: 'd22-g3-f1',
      promptKo: '학교에 가아요.',
      promptZh: '"去学校"哪句正确？', promptZhEn: 'Which sentence is correct for "go to school"?',
      choices: [
        { text: '학교에 가아요.', correct: false },
        { text: '학교에 가요.', correct: true },
        { text: '학교에 가해요.', correct: false },
        { text: '학교에 갔어요.', correct: false },
      ],
      explain: '가+아 缩合为 가。ㅏ+ㅏ 合并成一个 ㅏ，不能保留两个', explainEn: '가+아 contracts to 가. ㅏ+ㅏ merges into one ㅏ, can\'t keep two.',
    },
    {
      id: 'd22-g3-f2',
      promptKo: '커피 마시어요.',
      promptZh: '"喝咖啡"哪句正确？', promptZhEn: 'Which sentence is correct for "drink coffee"?',
      choices: [
        { text: '커피 마시어요.', correct: false },
        { text: '커피 마셔요.', correct: true },
        { text: '커피 마셔여요.', correct: false },
        { text: '커피 마시아요.', correct: false },
      ],
      explain: '마시+어 缩合为 마셔（ㅣ+ㅓ=ㅕ）。词干末尾ㅣ和ㅓ融合', explainEn: '마시+어 contracts to 마셔 (ㅣ+ㅓ=ㅕ). The stem-final ㅣ and ㅓ fuse.',
    },
    {
      id: 'd22-g3-f3',
      promptKo: '음악 듣어요.',
      promptZh: '"听音乐"哪句正确？', promptZhEn: 'Which sentence is correct for "listen to music"?',
      choices: [
        { text: '음악 듣어요.', correct: false },
        { text: '음악 들어요.', correct: true },
        { text: '음악 듣아요.', correct: false },
        { text: '음악 들아요.', correct: false },
      ],
      explain: '듣다 ㄷ不规则：ㄷ在元音前变ㄹ → 들 + 어요。词干末元音ㅡ属"其他"→ 어요', explainEn: '듣다 is ㄷ-irregular: ㄷ becomes ㄹ before a vowel → 들 + 어요. The stem-final vowel ㅡ is "other" → 어요.',
    },
    {
      id: 'd22-g3-f4',
      promptKo: '한국어 공부하아요.',
      promptZh: '"学韩语"哪句正确？', promptZhEn: 'Which sentence is correct for "study Korean"?',
      choices: [
        { text: '한국어 공부하아요.', correct: false },
        { text: '한국어 공부해요.', correct: true },
        { text: '한국어 공부하어요.', correct: false },
        { text: '한국어 공부하요.', correct: false },
      ],
      explain: '하다类无条件 해요。不能按 ㅏ 元音规则接 아요', explainEn: '하다-type always becomes 해요. Can\'t apply the ㅏ vowel rule to add 아요.',
    },
    {
      id: 'd22-g3-f5',
      promptKo: '오늘 추워요.',
      promptZh: '哪句最能正确解释"추워요"？', promptZhEn: 'Which sentence best explains "추워요"?',
      choices: [
        { text: '추워요 = 춥다 + 어요，ㅂ 不规则→ 우 + 어 = 워', textEn: '추워요 = 춥다 + 어요, ㅂ-irregular → 우 + 어 = 워', correct: true },
        { text: '추워요 = 추다 的现在时', textEn: '추워요 is the present tense of 추다', correct: false },
        { text: '추워요 = 춥다 的过去时', textEn: '추워요 is the past tense of 춥다', correct: false },
        { text: '추워요 是名词', textEn: '추워요 is a noun', correct: false },
      ],
      explain: '춥다 ㅂ不规则：ㅂ 在元音前变우 → 추우 + 어 = 추워요', explainEn: '춥다 is ㅂ-irregular: ㅂ becomes 우 before a vowel → 추우 + 어 = 추워요',
    },
  ],

  compose: [
    {
      id: 'd22-g3-c1',
      zhHint: '朋友来了。', zhHintEn: 'A friend came.',
      audioKo: '친구가 와요.',
      answer: ['친구가', '와요.'],
      tokens: ['친구가', '와요.', '오아요.', '왔어요.', '갈래요.', '오해요.'],
      explain: '오다 → 와요（ㅗ+ㅏ=ㅘ 缩合）', explainEn: '오다 → 와요 (ㅗ+ㅏ=ㅘ contraction)',
    },
    {
      id: 'd22-g3-c2',
      zhHint: '学韩语。', zhHintEn: 'Study Korean.',
      audioKo: '한국어 공부해요.',
      answer: ['한국어', '공부해요.'],
      tokens: ['한국어', '공부해요.', '공부하아요.', '공부어요.', '배워요.', '공부요.'],
      explain: '공부하다 → 공부해요（하다类规则3）', explainEn: '공부하다 → 공부해요 (하다-type rule 3)',
    },
    {
      id: 'd22-g3-c3',
      zhHint: '看电影。', zhHintEn: 'Watch a movie.',
      audioKo: '영화 봐요.',
      answer: ['영화', '봐요.'],
      tokens: ['영화', '봐요.', '보아요.', '봤어요.', '봐해요.', '보요.'],
      explain: '보다 → 봐요（ㅗ+ㅏ=ㅘ 缩合）', explainEn: '보다 → 봐요 (ㅗ+ㅏ=ㅘ contraction)',
    },
    {
      id: 'd22-g3-c4',
      zhHint: '见朋友。', zhHintEn: 'Meet a friend.',
      audioKo: '친구 만나요.',
      answer: ['친구', '만나요.'],
      tokens: ['친구', '만나요.', '만나아요.', '만났어요.', '만나해요.', '만나어요.'],
      explain: '만나다 → 만나요（ㅏ+ㅏ 合并）', explainEn: '만나다 → 만나요 (ㅏ+ㅏ merge)',
    },
  ],

  rule: [
    {
      id: 'd22-g3-r1',
      promptZh: '해요体的三条规则是？', promptZhEn: 'What are the three rules of the 해요 form?',
      choices: [
        { text: '词干末元音ㅏ/ㅗ→아요；其他元音→어요；하다→해요', textEn: 'Stem-final vowel ㅏ/ㅗ → 아요; other vowels → 어요; 하다 → 해요', correct: true },
        { text: '统一都接요', textEn: 'Always add 요 uniformly', correct: false },
        { text: '有收音接어요，无收音接요', textEn: 'With a final consonant, add 어요; without, add 요', correct: false },
        { text: '看词长度，短的接아요，长的接어요', textEn: 'Depends on word length: short ones take 아요, long ones take 어요', correct: false },
      ],
      explain: '判断步骤：去다得词干 → 看末元音 → 分三类', explainEn: 'Steps: remove 다 to get the stem → check the final vowel → divide into three categories',
    },
    {
      id: 'd22-g3-r2',
      promptZh: '关于 오다 → 와요 的缩合，哪句最准确？', promptZhEn: 'Which statement about the contraction of 오다 → 와요 is most accurate?',
      choices: [
        { text: '오 + 아 → 와（ㅗ+ㅏ 合并为复合元音 ㅘ）', textEn: '오 + 아 → 와 (ㅗ+ㅏ merge into the compound vowel ㅘ)', correct: true },
        { text: '오 + 요 直接拼', textEn: '오 + 요 combine directly', correct: false },
        { text: '오 + 어 → 워', correct: false },
        { text: '오 是하다类，直接变 해', textEn: '오 is a 하다-type, directly becomes 해', correct: false },
      ],
      explain: 'ㅗ+ㅏ=ㅘ 是韩语元音融合的标准现象', explainEn: 'ㅗ+ㅏ=ㅘ is a standard vowel fusion phenomenon in Korean',
    },
    {
      id: 'd22-g3-r3',
      promptZh: '关于 ㄷ 不规则，哪句最准确？', promptZhEn: 'Which statement about the ㄷ irregularity is most accurate?',
      choices: [
        { text: '듣다/걷다 等词，ㄷ在元音前变ㄹ。듣+어요 → 들어요', textEn: 'For words like 듣다/걷다, ㄷ changes to ㄹ before vowels. 듣+어요 → 들어요', correct: true },
        { text: '듣다 无变化，直接 듣어요', textEn: '듣다 has no change, directly 듣어요', correct: false },
        { text: '듣다 变 등어요', textEn: '듣다 changes to 등어요', correct: false },
        { text: 'ㄷ 只在辅音前变化', textEn: 'ㄷ only changes before consonants', correct: false },
      ],
      explain: '只在元音（어/으/아）前触发。듣+고 = 듣고 ✓（고 是辅音不触发）', explainEn: 'Only triggered before vowels (어/으/아). 듣+고 = 듣고 ✓ (고 is a consonant, so not triggered)',
    },
    {
      id: 'd22-g3-r4',
      promptZh: '关于 하다 类动词，哪句最准确？', promptZhEn: 'Which statement about 하다-type verbs is most accurate?',
      choices: [
        { text: '所有 하다 类无条件变 해요。공부하다→공부해요；운동하다→운동해요', textEn: 'All 하다-type verbs unconditionally become 해요. 공부하다→공부해요; 운동하다→운동해요', correct: true },
        { text: '하다 按ㅏ规则 → 하아요', textEn: '하다 follows the ㅏ rule → 하아요', correct: false },
        { text: '하다 按其他规则 → 하어요', textEn: '하다 follows other rules → 하어요', correct: false },
        { text: '하다 只在书面语才变 해요', textEn: '하다 only becomes 해요 in written language', correct: false },
      ],
      explain: '하다 是不规则中的规则：一律 해요，是韩语最常见的构词模式', explainEn: '하다 is the rule within irregulars: always 해요, the most common word-formation pattern in Korean',
    },
  ],
};
