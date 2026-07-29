import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 70 · 3-3 문법 탐험 · ~는 반면(에) / ~(으)ㄴ 반면(에) · 对比 */
export const day70Grammar: GrammarSubQuestData = {
  day: 10, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '一方面……另一方面：~는/(으)ㄴ 반면(에)',

  fix: [
    { id: 'd70-g3-f1', promptKo: '체형은 작는 반면 능력은 커요.',      promptZh: '"体型小，另一方面能力大"哪句正确？',            choices: [{ text: '체형은 작는 반면 능력은 커요.',         correct: false }, { text: '체형은 작은 반면 능력은 커요.',       correct: true }, { text: '체형은 작을 반면 능력은 커요.',       correct: false }, { text: '체형은 작아서 반면 능력은 커요.',           correct: false }], explain: 'A 词干 + **(으)ㄴ 반면** · 작다 → 작은' },
    { id: 'd70-g3-f2', promptKo: '다니엘은 잘한 반면 저는 아직 부족해요.', promptZh: '"Danielle 做得好，我还差"（现在）哪句正确？',   choices: [{ text: '다니엘은 잘한 반면 저는 아직 부족해요.', correct: false }, { text: '다니엘은 잘하는 반면 저는 아직 부족해요.', correct: true }, { text: '다니엘은 잘할 반면 저는 아직 부족해요.',    correct: false }, { text: '다니엘은 잘해서 반면 저는 아직 부족해요.',   correct: false }], explain: 'V 词干 + **는 반면** · 잘하다 → 잘하는' },
    { id: 'd70-g3-f3', promptKo: '발음은 유창하는 반면 경험이 적어요.',   promptZh: '"发音流利，经验少"哪句正确？',                    choices: [{ text: '발음은 유창하는 반면 경험이 적어요.',    correct: false }, { text: '발음은 유창한 반면 경험이 적어요.',    correct: true }, { text: '발음은 유창할 반면 경험이 적어요.',        correct: false }, { text: '발음은 유창해서 반면 경험이 적어요.',        correct: false }], explain: '유창하다 是 A → 유창한 반면（하다 형용사）' },
    { id: 'd70-g3-f4', promptKo: '주장은 강한 반면에 근거가 부족해요.',   promptZh: '"主张强，另一方面根据不足"哪句正确？',           choices: [{ text: '주장은 강한 반면에 근거가 부족해요.',    correct: true }, { text: '주장은 강는 반면에 근거가 부족해요.',   correct: false }, { text: '주장은 강할 반면에 근거가 부족해요.',       correct: false }, { text: '주장은 강해서 반면에 근거가 부족해요.',      correct: false }], explain: '~는 반면(에) 后可加 **에**' },
    { id: 'd70-g3-f5', promptZh: '关于「~는 반면 vs ~지만」的差别，哪句最准确？',                                                                                                                                                          choices: [{ text: '~는 반면 = **对比两个属性**（一方面 A，另一方面 B）· ~지만 = 单纯**转折**（虽然……但……）· Day 70 辩论用 ~는 반면', correct: true }, { text: '两者完全一样',            correct: false }, { text: '~는 반면 是命令',        correct: false }, { text: '~지만 只用于过去',       correct: false }], explain: '~는 반면 更书面 / 对比 · 演讲高频' },
  ],

  compose: [
    { id: 'd70-g3-c1', zhHint: '体型小，另一方面能力很强。',      audioKo: '체형은 작은 반면 능력은 커요.',        answer: ['체형은', '작은 반면', '능력은', '커요.'],           tokens: ['체형은', '작은 반면', '능력은', '커요.', '작는 반면', '작을 반면', '작아서', '컸어요.'],           explain: 'A + (으)ㄴ 반면' },
    { id: 'd70-g3-c2', zhHint: 'Danielle 做得好，我还差。',       audioKo: '다니엘은 잘하는 반면 저는 아직 부족해요.', answer: ['다니엘은', '잘하는 반면', '저는', '아직', '부족해요.'], tokens: ['다니엘은', '잘하는 반면', '저는', '아직', '부족해요.', '잘한 반면', '잘할 반면', '잘해서'],       explain: 'V + 는 반면' },
    { id: 'd70-g3-c3', zhHint: '发音流利，另一方面经验少。',      audioKo: '발음은 유창한 반면 경험이 적어요.',     answer: ['발음은', '유창한 반면', '경험이', '적어요.'],       tokens: ['발음은', '유창한 반면', '경험이', '적어요.', '유창하는 반면', '유창해서', '많아요.', '적었어요.'], explain: '하다 형용사 → 유창한 반면' },
    { id: 'd70-g3-c4', zhHint: '主张强，另一方面根据不足。',      audioKo: '주장은 강한 반면 근거가 부족해요.',     answer: ['주장은', '강한 반면', '근거가', '부족해요.'],       tokens: ['주장은', '강한 반면', '근거가', '부족해요.', '강는 반면', '강할 반면', '충분해요.', '부족했어요.'], explain: '강하다 A → 강한 반면' },
  ],

  rule: [
    { id: 'd70-g3-r1', promptZh: '关于「A + (으)ㄴ 반면」的形态，哪句最准确？',              choices: [{ text: '**形容词词干 + (으)ㄴ 반면** · 작다 → 작은 반면 · 유창하다 → 유창한 반면', correct: true }, { text: 'A + 는 반면',            correct: false }, { text: 'A + 을 반면',            correct: false }, { text: 'A + 아 반면',                 correct: false }], explain: '有받침 + 은, 无받침 + ㄴ' },
    { id: 'd70-g3-r2', promptZh: '关于「V + 는 반면」的形态，哪句最准确？',                  choices: [{ text: '**动词词干 + 는 반면** · 잘하다 → 잘하는 반면 · 是"当下动作"对比', correct: true }, { text: 'V + 은 반면',            correct: false }, { text: 'V + 을 반면',            correct: false }, { text: 'V + 았 반면',                correct: false }], explain: 'V 는 반면 · 现在' },
    { id: 'd70-g3-r3', promptZh: '关于「~는 반면 후에 붙는 조사」，哪句最准确？',            choices: [{ text: '~는 반면 后可加 **에**（~는 반면에）· 意义不变 · Day 70 演讲两种都常见', correct: true }, { text: '반면 后必须加 을',        correct: false }, { text: '반면 后必须加 이',         correct: false }, { text: '반면 后不能加任何조사',       correct: false }], explain: '~는 반면(에) · 括号内可省' },
    { id: 'd70-g3-r4', promptZh: '关于「~는 반면 vs ~지만」的差别，哪句最准确？',            choices: [{ text: '~는 반면 = **两个属性并列对比**（书面 / 演讲）· ~지만 = **单纯转折**（口语常用）', correct: true }, { text: '两者完全一样',            correct: false }, { text: '~는 반면 是命令',        correct: false }, { text: '~지만 是敬语',              correct: false }], explain: '语用差 · 场景选一个' },
  ],
};
