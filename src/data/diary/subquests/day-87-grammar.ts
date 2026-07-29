import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 87 · 3-3 문법 탐험 · ~(으)면서 · 一边A一边B */
export const day87Grammar: GrammarSubQuestData = {
  day: 27, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（一边A一边B）：V + (으)면서',

  fix: [
    { id: 'd87-g3-f1', promptKo: '엄마가 웃면서 안았어요.',        promptZh: '"妈妈笑着抱了"哪句最自然？',                    choices: [{ text: '엄마가 웃면서 안았어요.',           correct: false }, { text: '엄마가 웃으면서 안았어요.',            correct: true }, { text: '엄마가 웃는면서 안았어요.',                correct: false }, { text: '엄마가 웃을면서 안았어요.',                  correct: false }], explain: '웃다 有收音 → **웃 + 으면서**（收音 + 으면서）' },
    { id: 'd87-g3-f2', promptKo: '창밖을 봐면서 설명했어요.',       promptZh: '"一边看窗外一边解释"哪句最自然？',              choices: [{ text: '창밖을 봐면서 설명했어요.',           correct: false }, { text: '창밖을 보면서 설명했어요.',          correct: true }, { text: '창밖을 보은면서 설명했어요.',                correct: false }, { text: '창밖을 볼면서 설명했어요.',                  correct: false }], explain: '보다 无收音 → **보 + 면서**（无收音直接加 면서）' },
    { id: 'd87-g3-f3', promptKo: '엄마는 한국어를 모르면서 웃었어요.', promptZh: '要表达"妈妈不懂韩语『却』笑了"（矛盾），哪句最自然？',   choices: [{ text: '엄마는 한국어를 모르면서 웃었어요.',    correct: false }, { text: '엄마는 한국어를 모르면서도 웃었어요.', correct: true }, { text: '엄마는 한국어를 모르는면서 웃었어요.',            correct: false }, { text: '엄마는 한국어를 몰면서 웃었어요.',            correct: false }], explain: '矛盾语气要用 **~(으)면서도**（明知却）· 单纯 ~면서 只是同时动作' },
    { id: 'd87-g3-f4', promptKo: '학생가 알바생이에요.',           promptZh: '"既是学生又是兼职"哪句最自然？',              choices: [{ text: '학생가 알바생이에요.',            correct: false }, { text: '학생이면서 알바생이에요.',          correct: true }, { text: '학생면서 알바생이에요.',                correct: false }, { text: '학생을 알바생이에요.',                    correct: false }], explain: '名词 + **이면서** = 既是A又是B（학생 有收音 → 이면서）' },
    { id: 'd87-g3-f5', promptZh: '关于「~(으)면서」的核心含义，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**~(으)면서 = 同一主语同时做两个动作（一边A一边B）** · 웃으면서 안았어요 = 笑着抱 · 前后主语必须相同', correct: true }, { text: '表示先做A再做B',            correct: false }, { text: '表示因为A所以B',        correct: false }, { text: '表示未来打算',           correct: false }], explain: '同时动作 · 主语一致' },
  ],

  compose: [
    { id: 'd87-g3-c1', zhHint: '妈妈笑着抱了。',                    audioKo: '엄마가 웃으면서 안았어요.',           answer: ['엄마가', '웃으면서', '안았어요.'],                     tokens: ['엄마가', '웃으면서', '안았어요.', '웃면서', '웃고', '웃어서'],                          explain: '웃 + 으면서' },
    { id: 'd87-g3-c2', zhHint: '一边看窗外一边解释。',              audioKo: '창밖을 보면서 설명했어요.',           answer: ['창밖을', '보면서', '설명했어요.'],                   tokens: ['창밖을', '보면서', '설명했어요.', '봐면서', '보고', '봐서'],                          explain: '보 + 면서' },
    { id: 'd87-g3-c3', zhHint: '妈妈不懂韩语却笑了。',              audioKo: '엄마는 한국어를 모르면서도 웃었어요.', answer: ['엄마는', '한국어를', '모르면서도', '웃었어요.'],           tokens: ['엄마는', '한국어를', '모르면서도', '웃었어요.', '모르면서', '모르고', '모르지만'],                          explain: '矛盾 · ~(으)면서도' },
    { id: 'd87-g3-c4', zhHint: '一边点头一边听着。',                audioKo: '고개를 끄덕이면서 듣고 있었어요.',    answer: ['고개를', '끄덕이면서', '듣고', '있었어요.'],           tokens: ['고개를', '끄덕이면서', '듣고', '있었어요.', '끄덕이고', '끄덕여서', '끄덕이면'],                          explain: '끄덕이 + 면서' },
  ],

  rule: [
    { id: 'd87-g3-r1', promptZh: '关于「~(으)면서」的用法场景，哪句最准确？',                                choices: [{ text: '**同一主语同时做两个动作** · 웃으면서 안았어요 = 笑着抱 · 창밖을 보면서 설명했어요 = 边看窗外边解释', correct: true }, { text: '先做A再做B',            correct: false }, { text: '因为A所以B',                   correct: false }, { text: '如果A就B',                    correct: false }], explain: '同时动作' },
    { id: 'd87-g3-r2', promptZh: '关于「~(으)면서 的形态」，哪句最准确？',                                  choices: [{ text: '**无收音 + 면서，有收音 + 으면서** · 보다 → 보면서 · 웃다 → 웃으면서', correct: true }, { text: '一律加 으면서',           correct: false }, { text: '一律加 면서',            correct: false }, { text: '要加 았면서',                  correct: false }], explain: '收音判断' },
    { id: 'd87-g3-r3', promptZh: '关于「~(으)면서도」的意思，哪句最准确？',                                    choices: [{ text: '**~(으)면서도 = 明知却 / 尽管…也（矛盾条件）** · 모르면서도 = 不懂却… · 与单纯"同时动作"不同', correct: true }, { text: '和 ~면서 完全一样',            correct: false }, { text: '表示先后顺序',    correct: false }, { text: '表示未来',           correct: false }], explain: '矛盾 · ~면서도' },
    { id: 'd87-g3-r4', promptZh: '关于「N + 이면서」的用法，哪句最准确？',                              choices: [{ text: '**名词也能接 (이)면서 = 既是A又是B** · 학생이면서 알바생 = 又是学生又是兼职', correct: true }, { text: '名词不能接 면서',            correct: false }, { text: '名词接 면서表过去',        correct: false }, { text: '名词接 면서表未来',                      correct: false }], explain: 'N + 이면서' },
  ],
};
