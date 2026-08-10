import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 75 · 3-3 문법 탐험 · ~았/었을 텐데 · 反事实假设(回顾成长) */
export const day75Grammar: GrammarSubQuestData = {
  day: 15, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（本该…的）：V/A + 았/었을 텐데',

  fix: [
    { id: 'd75-g3-f1', promptKo: '75일 전이었으면 울을 텐데.',       promptZh: '"75天前的话本该在哭的"哪句正确？',       choices: [{ text: '75일 전이었으면 울을 텐데.',        correct: false }, { text: '75일 전이었으면 울었을 텐데.',    correct: true }, { text: '75일 전이었으면 울더라 텐데.',            correct: false }, { text: '75일 전이었으면 울겠 텐데.',                correct: false }], explain: '反事实假设用 **~았/었을 텐데**：울다 → 울었을 텐데（本该哭的，但没哭）' },
    { id: 'd75-g3-f2', promptKo: '혼자 왔으면 헤매을 텐데.',           promptZh: '"一个人来的话本该迷路的"哪句正确？',       choices: [{ text: '혼자 왔으면 헤매을 텐데.',          correct: false }, { text: '혼자 왔으면 헤맸을 텐데.',        correct: true }, { text: '혼자 왔으면 헤매겠 텐데.',                correct: false }, { text: '혼자 왔으면 헤매 텐데.',                    correct: false }], explain: '헤매다 → 헤맸을 텐데（过去词干 + 을 텐데）' },
    { id: 'd75-g3-f3', promptKo: '지도가 됐으면 좋겠을 텐데.',         promptZh: '"地图能用的话本该更好的"哪句最自然？',     choices: [{ text: '지도가 됐으면 좋겠을 텐데.',         correct: false }, { text: '지도가 됐으면 좋았을 텐데.',       correct: true }, { text: '지도가 됐으면 좋을 텐데.',                correct: false }, { text: '지도가 됐으면 좋더라 텐데.',                correct: false }], explain: '반사실 결과用过去 **좋았을 텐데**（本该更好的，但实际 GPS 弱）' },
    { id: 'd75-g3-f4', promptKo: '내일 물어봤을 텐데.',                promptZh: '"明天问的话本该…"——这句错在哪？',        choices: [{ text: '"내일 물어봤을 텐데"错——**~았/었을 텐데 只用于过去与事实相反的假设**，不能配"내일"（未来）', correct: true }, { text: '完全正确',              correct: false }, { text: '내일 不能用',           correct: false }, { text: '~았을 텐데 是未来',           correct: false }], explain: '~았/었을 텐데 = 过去反事实（**只回顾过去** · 未来用 ~(으)면 될 거예요）' },
    { id: 'd75-g3-f5', promptZh: '关于「~았/었을 텐데」的核心含义，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**~았/었을 텐데 = 本该…的 / 与过去事实相反的推测 + 感慨** · 울었을 텐데 = "本该哭的"（现实是没哭 → 笑了）', correct: true }, { text: '真的过去发生了',            correct: false }, { text: '未来的计划',        correct: false }, { text: '命令语气',           correct: false }], explain: '过去反事实推测' },
  ],

  compose: [
    { id: 'd75-g3-c1', zhHint: '75天前的话本该在哭的。',                  audioKo: '75일 전이었으면 울고 있었을 텐데.',    answer: ['75일', '전이었으면', '울고', '있었을', '텐데.'],       tokens: ['75일', '전이었으면', '울고', '있었을', '텐데.', '울어요.', '지금', '웃어요.'],                          explain: 'Day 75 成长名句 · ~았/었을 텐데' },
    { id: 'd75-g3-c2', zhHint: 'Haru来的话本该帮我的。',                  audioKo: '하루가 왔으면 도와줬을 텐데.',          answer: ['하루가', '왔으면', '도와줬을', '텐데.'],              tokens: ['하루가', '왔으면', '도와줬을', '텐데.', '도와줘요.', '안 와요.', '하루를', '하루에'],           explain: '반사실 · Day 67 재활용' },
    { id: 'd75-g3-c3', zhHint: '标准语的话本该更好懂的。',                audioKo: '표준어였으면 더 알아들었을 텐데.',      answer: ['표준어였으면', '더', '알아들었을', '텐데.'],          tokens: ['표준어였으면', '더', '알아들었을', '텐데.', '알아들어요.', '사투리', '표준어를'],                 explain: '반사실 가정 · 조건 + 결과' },
    { id: 'd75-g3-c4', zhHint: '一个人的话本该慌了的。',                  audioKo: '혼자였으면 당황했을 텐데.',            answer: ['혼자였으면', '당황했을', '텐데.'],                    tokens: ['혼자였으면', '당황했을', '텐데.', '당황해요.', '침착해요.', '혼자를', '혼자에'],                 explain: '反事实 · 但这次镇定了' },
  ],

  rule: [
    { id: 'd75-g3-r1', promptZh: '关于「~았/었을 텐데」的用法场景，哪句最准确？',                                choices: [{ text: '**回顾过去 · 与事实相反的推测 + 感慨** · 울었을 텐데 = "本该哭的"（现实没哭）', correct: true }, { text: '想象未来事件',               correct: false }, { text: '直接命令别人',               correct: false }, { text: '陈述真的发生的事',                    correct: false }], explain: '过去反事实' },
    { id: 'd75-g3-r2', promptZh: '关于「~았/었을 텐데 的形态」，哪句最准确？',                                  choices: [{ text: '**过去词干（았/었）+ 을 텐데** · 울었을 텐데 / 헤맸을 텐데 / 도와줬을 텐데', correct: true }, { text: 'V + 을 텐데（无 았/었）',    correct: false }, { text: 'V + 는 텐데',      correct: false }, { text: 'V + 겠 텐데',                    correct: false }], explain: '过去词干 + 을 텐데' },
    { id: 'd75-g3-r3', promptZh: '关于「后半句/前半句搭配」，哪句最准确？',                                    choices: [{ text: '**常与 ~았/었으면 组合**：조건(~았으면) + 결과(~았을 텐데) 都是过去反事实 · 혼자였으면 당황했을 텐데', correct: true }, { text: '前半句用未来时',            correct: false }, { text: '后半句是命令',    correct: false }, { text: '只能单独用',           correct: false }], explain: '반사실 조건 + 결과' },
    { id: 'd75-g3-r4', promptZh: '关于「~았/었을 텐데 vs ~았어요」，哪句最准确？',                              choices: [{ text: '**~았/었을 텐데 = 与事实相反的推测（其实没发生）** · **~았어요 = 真的发生的过去** · 울었을 텐데（本该哭，没哭）vs 울었어요（真哭了）', correct: true }, { text: '两者完全一样',            correct: false }, { text: '~았을 텐데 表将来',        correct: false }, { text: '~았어요 是敬语命令',                      correct: false }], explain: '反事实 vs 事实' },
  ],
};
