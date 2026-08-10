import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 50 · 2-3 문법 탐험 · ~(으)면 深化 · N + (이)면 · 双 (으)면 传说 */
export const day50Grammar: GrammarSubQuestData = {
  day: 20, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '如果 & 一到___就___：~(으)면 深化',

  fix: [
    { id: 'd50-g3-f1', promptKo: '주말면 늦잠을 자요.',                     promptZh: '"一到周末就睡懒觉"哪句正确？',                    choices: [{ text: '주말면 늦잠을 자요.',                     correct: false }, { text: '주말이면 늦잠을 자요.',            correct: true }, { text: '주말으면 늦잠을 자요.',              correct: false }, { text: '주말은 늦잠을 자요.',                    correct: false }], explain: '주말 有收音 → 名词 + **이면**（不是 으면）' },
    { id: 'd50-g3-f2', promptKo: '소원을 빌으면 이뤄진대.',                  promptZh: '"许愿的话会实现"哪句正确？',                      choices: [{ text: '소원을 빌으면 이뤄진대.',                  correct: false }, { text: '소원을 빌면 이뤄진대.',            correct: true }, { text: '소원을 빌아면 이뤄진대.',            correct: false }, { text: '소원을 빈면 이뤄진대.',                    correct: false }], explain: 'ㄹ 收音特殊 → 빌다 → **빌면**（不加 으）' },
    { id: 'd50-g3-f3', promptKo: '비가 와서 우산 가져가세요.',                promptZh: '"如果下雨请带伞"哪句正确？',                      choices: [{ text: '비가 와서 우산 가져가세요.',                 correct: false }, { text: '비가 오면 우산 가져가세요.',       correct: true }, { text: '비가 오니까 우산 가져가세요.',          correct: false }, { text: '비가 온면 우산 가져가세요.',              correct: false }], explain: '假设 → ~(으)면 后可接命令 · Day 42 复习' },
    { id: 'd50-g3-f4', promptKo: '한국어를 잘하는 좋겠어요.',                promptZh: '"要是能说好韩语就好了"哪句正确？',                choices: [{ text: '한국어를 잘하는 좋겠어요.',                 correct: false }, { text: '한국어를 잘하면 좋겠어요.',        correct: true }, { text: '한국어가 잘하면 좋겠어요.',            correct: false }, { text: '한국어를 잘하면 좋았어요.',                correct: false }], explain: '~(으)면 좋겠어요 = 愿望表达 · Day 44 复习' },
    { id: 'd50-g3-f5', promptKo: '이따 비가 오면 취소돼요.',                  promptZh: '关于「~(으)면」的用法定义，哪句最准确？',        choices: [{ text: '~(으)면 只用于命令句。',                    correct: false }, { text: '~(으)면 = 假设 / 条件 / 习惯性因果 · 后可接命令 / 建议 / 陈述', correct: true }, { text: '~(으)면 表已经发生的原因。',              correct: false }, { text: '~(으)면 只能接形容词。',                     correct: false }], explain: '~(으)면 后接非常灵活' },
  ],

  compose: [
    { id: 'd50-g3-c1', zhHint: '初雪来了许愿会成真。',                    audioKo: '첫눈이 오면 소원을 빌면 이뤄져.',            answer: ['첫눈이', '오면', '소원을', '빌면', '이뤄져.'],           tokens: ['첫눈이', '오면', '소원을', '빌면', '이뤄져.', '와서', '이뤄졌어', '빌었으니까', '오니까'],                    explain: '韩国传说 · 双 (으)면' },
    { id: 'd50-g3-c2', zhHint: '说了就不灵了。',                          audioKo: '말하면 안 이뤄진대.',                          answer: ['말하면', '안', '이뤄진대.'],                             tokens: ['말하면', '안', '이뤄진대.', '이뤄져요.', '이뤄졌어.', '말했으니까', '말할'],                                explain: '~(으)면 + 안 = 不会' },
    { id: 'd50-g3-c3', zhHint: '一到周末就睡懒觉。',                      audioKo: '주말이면 늦잠을 자요.',                        answer: ['주말이면', '늦잠을', '자요.'],                            tokens: ['주말이면', '늦잠을', '자요.', '주말면', '주말이라면', '주말은', '늦잠이'],                                  explain: '名词 + **이면** = 习惯性条件' },
    { id: 'd50-g3-c4', zhHint: '要是能说好韩语就好了。',                  audioKo: '한국어를 잘하면 좋겠어요.',                    answer: ['한국어를', '잘하면', '좋겠어요.'],                        tokens: ['한국어를', '잘하면', '좋겠어요.', '잘하는', '한국어가', '좋아요.', '잘하고'],                                explain: '~(으)면 좋겠어요 愿望' },
  ],

  rule: [
    { id: 'd50-g3-r1', promptZh: '关于「~(으)면」的功能，哪句最准确？',      choices: [{ text: '~(으)면 = 假设 / 条件 / 习惯性因果 / 传说 · 后可接命令 / 建议 / 陈述 · 灵活性最大', correct: true }, { text: '~(으)면 只表过去',       correct: false }, { text: '~(으)면 是敬语',      correct: false }, { text: '~(으)면 是命令形',     correct: false }], explain: 'Day 42 → Day 50 深化 · 多功能连接' },
    { id: 'd50-g3-r2', promptZh: '关于名词后接 (이)면，哪句最准确？',        choices: [{ text: '有收音 → **이면**（주말이면）· 无收音 → **면**（친구면）', correct: true }, { text: '所有名词一律 + 면',     correct: false }, { text: '所有名词一律 + 이면',  correct: false }, { text: '有收音 → 면；无收音 → 이면', correct: false }], explain: '주말이면 / 친구면' },
    { id: 'd50-g3-r3', promptZh: '关于 ㄹ 收音特殊规则，哪句最准确？',       choices: [{ text: 'ㄹ 收音直接 + **면**（不加 으）· 빌다 → 빌면 / 살다 → 살면 / 만들다 → 만들면', correct: true }, { text: 'ㄹ 收音必加 으',       correct: false }, { text: 'ㄹ 收音必脱落',       correct: false }, { text: 'ㄹ 收音不能用 (으)면', correct: false }], explain: 'ㄹ 词干 + (으)면 = ㄹ + 면' },
    { id: 'd50-g3-r4', promptZh: '关于「~(으)면 vs ~아/어서」的区别（深化），哪句最准确？', choices: [{ text: '~(으)면 = 假设 / 条件（未发生 / 假想）· ~아/어서 = 事实原因（已发生）· 后接命令要用 (으)면', correct: true }, { text: '两者完全一样',        correct: false }, { text: '~(으)면 是过去',      correct: false }, { text: '~아/어서 是命令形',    correct: false }], explain: 'Day 42 铺垫深化' },
  ],
};
