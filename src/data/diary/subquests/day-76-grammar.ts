import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 76 · 3-3 문법 탐험 · ~았/었지만 + 부사 · 虽然…但…(带程度副词) */
export const day76Grammar: GrammarSubQuestData = {
  day: 16, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（虽然…但…）：V/A + 았/었지만 + 부사',

  fix: [
    { id: 'd76-g3-f1', promptKo: '짧지만 진하게 배웠어요.',       promptZh: '"（旅行）虽短但学得浓"——强调"过去已结束"，哪句最自然？',   choices: [{ text: '짧지만 진하게 배웠어요.',          correct: false }, { text: '짧았지만 진하게 배웠어요.',    correct: true }, { text: '짧아지만 진하게 배웠어요.',            correct: false }, { text: '짧겠지만 진하게 배웠어요.',                correct: false }], explain: '回顾已结束的旅行用过去 **짧았지만**（짧다 → 짧았 + 지만）· 짧지만=一般转折，此处强调"当时短"' },
    { id: 'd76-g3-f2', promptKo: '힘들었지만 즐겁하게 걸었어요.',  promptZh: '"虽累但走得快乐"哪句正确？',           choices: [{ text: '힘들었지만 즐겁하게 걸었어요.',    correct: false }, { text: '힘들었지만 즐겁게 걸었어요.',    correct: true }, { text: '힘들었지만 즐거워서 걸었어요.',        correct: false }, { text: '힘들었지만 즐겁이 걸었어요.',              correct: false }], explain: '즐겁다 → 副词 **즐겁게**（不是 즐겁하게/즐겁이）' },
    { id: 'd76-g3-f3', promptKo: '무섭지만 용감하게 나섰어요.',   promptZh: '"（当时）虽怕但勇敢站出来了"——强调过去，哪句最自然？',       choices: [{ text: '무섭지만 용감하게 나섰어요.',      correct: false }, { text: '무서웠지만 용감하게 나섰어요.', correct: true }, { text: '무서웠지만 용감으로 나섰어요.',        correct: false }, { text: '무서었지만 용감하게 나섰어요.',            correct: false }], explain: '무섭다 ㅂ불규칙 → 过去 **무서웠지만**；용감하다 → 副词 용감하게' },
    { id: 'd76-g3-f4', promptKo: '작았지만 크게 성공할 거예요.',   promptZh: '想说"虽然（当时）小，但已经取得了大成功"（已发生），哪句最贴切？',   choices: [{ text: '작았지만 크게 성공했어요.', correct: true }, { text: '작았지만 크게 성공할 거예요.',              correct: false }, { text: '작았지만 크게 성공하세요.',           correct: false }, { text: '작았지만 크게 성공할까요?',           correct: false }], explain: '要表达"已取得成功"用过去 **성공했어요**；성공할 거예요=将会成功、성공하세요=命令、성공할까요=提议，都不符"已发生"的语义' },
    { id: 'd76-g3-f5', promptZh: '关于「~았/었지만 + 부사」的核心，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**~았/었지만 = 回顾过去的转折（虽然…但…）· 后接程度副词（진하게/즐겁게/용감하게）加强感受密度** · 짧았지만 진하게 배웠어요', correct: true }, { text: '表未来计划',            correct: false }, { text: '表命令',        correct: false }, { text: '表条件假设',           correct: false }], explain: '过去转折 + 程度副词' },
  ],

  compose: [
    { id: 'd76-g3-c1', zhHint: '虽短但学得浓。',                  audioKo: '짧았지만 진하게 배웠어요.',            answer: ['짧았지만', '진하게', '배웠어요.'],                     tokens: ['짧았지만', '진하게', '배웠어요.', '짧아서', '진하지만', '배울 거예요.'],                                  explain: '~았지만 + 부사 진하게' },
    { id: 'd76-g3-c2', zhHint: '虽累但走得快乐。',                  audioKo: '힘들었지만 즐겁게 걸었어요.',          answer: ['힘들었지만', '즐겁게', '걸었어요.'],                   tokens: ['힘들었지만', '즐겁게', '걸었어요.', '힘들어서', '즐거워요.', '걸을 거예요.'],                     explain: '힘들었지만 + 즐겁게' },
    { id: 'd76-g3-c3', zhHint: '虽怕但勇敢站出来了。',              audioKo: '무서웠지만 용감하게 나섰어요.',        answer: ['무서웠지만', '용감하게', '나섰어요.'],                 tokens: ['무서웠지만', '용감하게', '나섰어요.', '무서워서', '용감해요.', '나설 거예요.'],                 explain: 'ㅂ불규칙 무서웠지만 + 용감하게' },
    { id: 'd76-g3-c4', zhHint: '虽小但取得了大成功。',              audioKo: '작았지만 크게 성공했어요.',            answer: ['작았지만', '크게', '성공했어요.'],                    tokens: ['작았지만', '크게', '성공했어요.', '작아서', '크지만', '성공할 거예요.'],                 explain: '작았지만 + 크게' },
  ],

  rule: [
    { id: 'd76-g3-r1', promptZh: '关于「~았/었지만」的用法场景，哪句最准确？',                                choices: [{ text: '**回顾过去的转折 · 虽然（过去）…但…** · 짧았지만 진하게 배웠어요 = "虽短但学得浓"', correct: true }, { text: '表未来计划',               correct: false }, { text: '表条件假设',               correct: false }, { text: '表命令',                    correct: false }], explain: '过去转折' },
    { id: 'd76-g3-r2', promptZh: '关于「~았/었지만 的形态」，哪句最准确？',                                  choices: [{ text: '**过去词干（았/었）+ 지만** · 짧았지만 / 힘들었지만 / 무서웠지만（ㅂ불규칙）', correct: true }, { text: 'V + 을지만',           correct: false }, { text: 'V + 는지만',      correct: false }, { text: 'V + 겠지만',                    correct: false }], explain: '过去词干 + 지만' },
    { id: 'd76-g3-r3', promptZh: '关于「后接的程度副词」，哪句最准确？',                                    choices: [{ text: '**~았/었지만 后常接程度副词加强感受**：진하게（浓）/ 즐겁게（快乐地）/ 용감하게（勇敢地）/ 크게（大大地）', correct: true }, { text: '后面只能接名词',            correct: false }, { text: '后面必须是命令',    correct: false }, { text: '不能接副词',           correct: false }], explain: '形容词 → 게 副词' },
    { id: 'd76-g3-r4', promptZh: '关于「~았/었지만 vs ~지만」，哪句最准确？',                              choices: [{ text: '**~았/었지만 = 回顾已结束的过去转折** · **~지만 = 一般/现在转折** · 짧았지만（当时短）vs 짧지만（本来就短）', correct: true }, { text: '两者完全一样',            correct: false }, { text: '~았지만 表将来',        correct: false }, { text: '~지만 是敬语',                      correct: false }], explain: '过去 vs 一般转折' },
  ],
};
