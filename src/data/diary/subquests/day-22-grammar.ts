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
  subtitle: '해요体三规则 · 缩合 · ㄷ/ㅂ 不规则',

  fix: [
    {
      id: 'd22-g3-f1',
      promptKo: '학교에 가아요.',
      promptZh: '"去学校"哪句正确？',
      choices: [
        { text: '학교에 가아요.', correct: false },
        { text: '학교에 가요.', correct: true },
        { text: '학교에 가해요.', correct: false },
        { text: '학교에 갔어요.', correct: false },
      ],
      explain: '가+아 缩合为 가。ㅏ+ㅏ 合并成一个 ㅏ，不能保留两个',
    },
    {
      id: 'd22-g3-f2',
      promptKo: '커피 마시어요.',
      promptZh: '"喝咖啡"哪句正确？',
      choices: [
        { text: '커피 마시어요.', correct: false },
        { text: '커피 마셔요.', correct: true },
        { text: '커피 마셔여요.', correct: false },
        { text: '커피 마시아요.', correct: false },
      ],
      explain: '마시+어 缩合为 마셔（ㅣ+ㅓ=ㅕ）。词干末尾ㅣ和ㅓ融合',
    },
    {
      id: 'd22-g3-f3',
      promptKo: '음악 듣어요.',
      promptZh: '"听音乐"哪句正确？',
      choices: [
        { text: '음악 듣어요.', correct: false },
        { text: '음악 들어요.', correct: true },
        { text: '음악 듣아요.', correct: false },
        { text: '음악 들아요.', correct: false },
      ],
      explain: '듣다 ㄷ不规则：ㄷ在元音前变ㄹ → 들 + 어요。词干末元音ㅡ属"其他"→ 어요',
    },
    {
      id: 'd22-g3-f4',
      promptKo: '한국어 공부하아요.',
      promptZh: '"学韩语"哪句正确？',
      choices: [
        { text: '한국어 공부하아요.', correct: false },
        { text: '한국어 공부해요.', correct: true },
        { text: '한국어 공부하어요.', correct: false },
        { text: '한국어 공부하요.', correct: false },
      ],
      explain: '하다类无条件 해요。不能按 ㅏ 元音规则接 아요',
    },
    {
      id: 'd22-g3-f5',
      promptKo: '오늘 추워요.',
      promptZh: '哪句最能正确解释"추워요"？',
      choices: [
        { text: '추워요 = 춥다 + 어요，ㅂ 不规则→ 우 + 어 = 워', correct: true },
        { text: '추워요 = 추다 的现在时', correct: false },
        { text: '추워요 = 춥다 的过去时', correct: false },
        { text: '추워요 是名词', correct: false },
      ],
      explain: '춥다 ㅂ不规则：ㅂ 在元音前变우 → 추우 + 어 = 추워요',
    },
  ],

  compose: [
    {
      id: 'd22-g3-c1',
      zhHint: '朋友来了。',
      audioKo: '친구가 와요.',
      answer: ['친구가', '와요.'],
      tokens: ['친구가', '와요.', '오아요.', '왔어요.', '갈래요.', '오해요.'],
      explain: '오다 → 와요（ㅗ+ㅏ=ㅘ 缩合）',
    },
    {
      id: 'd22-g3-c2',
      zhHint: '学韩语。',
      audioKo: '한국어 공부해요.',
      answer: ['한국어', '공부해요.'],
      tokens: ['한국어', '공부해요.', '공부하아요.', '공부어요.', '배워요.', '공부요.'],
      explain: '공부하다 → 공부해요（하다类规则3）',
    },
    {
      id: 'd22-g3-c3',
      zhHint: '看电影。',
      audioKo: '영화 봐요.',
      answer: ['영화', '봐요.'],
      tokens: ['영화', '봐요.', '보아요.', '봤어요.', '봐해요.', '보요.'],
      explain: '보다 → 봐요（ㅗ+ㅏ=ㅘ 缩合）',
    },
    {
      id: 'd22-g3-c4',
      zhHint: '见朋友。',
      audioKo: '친구 만나요.',
      answer: ['친구', '만나요.'],
      tokens: ['친구', '만나요.', '만나아요.', '만났어요.', '만나해요.', '만나어요.'],
      explain: '만나다 → 만나요（ㅏ+ㅏ 合并）',
    },
  ],

  rule: [
    {
      id: 'd22-g3-r1',
      promptZh: '해요体的三条规则是？',
      choices: [
        { text: '词干末元音ㅏ/ㅗ→아요；其他元音→어요；하다→해요', correct: true },
        { text: '统一都接요', correct: false },
        { text: '有收音接어요，无收音接요', correct: false },
        { text: '看词长度，短的接아요，长的接어요', correct: false },
      ],
      explain: '判断步骤：去다得词干 → 看末元音 → 分三类',
    },
    {
      id: 'd22-g3-r2',
      promptZh: '关于 오다 → 와요 的缩合，哪句最准确？',
      choices: [
        { text: '오 + 아 → 와（ㅗ+ㅏ 合并为复合元音 ㅘ）', correct: true },
        { text: '오 + 요 直接拼', correct: false },
        { text: '오 + 어 → 워', correct: false },
        { text: '오 是하다类，直接变 해', correct: false },
      ],
      explain: 'ㅗ+ㅏ=ㅘ 是韩语元音融合的标准现象',
    },
    {
      id: 'd22-g3-r3',
      promptZh: '关于 ㄷ 不规则，哪句最准确？',
      choices: [
        { text: '듣다/걷다 等词，ㄷ在元音前变ㄹ。듣+어요 → 들어요', correct: true },
        { text: '듣다 无变化，直接 듣어요', correct: false },
        { text: '듣다 变 등어요', correct: false },
        { text: 'ㄷ 只在辅音前变化', correct: false },
      ],
      explain: '只在元音（어/으/아）前触发。듣+고 = 듣고 ✓（고 是辅音不触发）',
    },
    {
      id: 'd22-g3-r4',
      promptZh: '关于 하다 类动词，哪句最准确？',
      choices: [
        { text: '所有 하다 类无条件变 해요。공부하다→공부해요；운동하다→운동해요', correct: true },
        { text: '하다 按ㅏ规则 → 하아요', correct: false },
        { text: '하다 按其他规则 → 하어요', correct: false },
        { text: '하다 只在书面语才变 해요', correct: false },
      ],
      explain: '하다 是不规则中的规则：一律 해요，是韩语最常见的构词模式',
    },
  ],
};
