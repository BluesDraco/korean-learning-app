import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 33 · 2-5 Boss 战 · 📮 一封家书 */
export const day33Boss: BossSubQuestData = {
  day: 3, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '편지 관문',
  subtitle: '📮 深夜写给妈妈的信',
  intro: '书桌灯下，抽屉里那本印着小胡萝卜的信纸摊开了。第一笔已经落下——「엄마, 잘 지내고 있어요」。每一句都要说清楚：我过得好，我在学韩语，我认识了朋友，我请妈妈保重身体。信要拍照发过去。你知道妈妈看不懂韩语，但你还是想让她看见你写的每一笔。',
  outroHook: '语音回来了："妈妈用翻译软件看完了。妈妈不懂韩语，但妈妈懂你。" 你把这段语音存进收藏夹，标题打了三个字：「엄마의 목소리」。',

  tasks: [
    { type: 'choice',  label: '听句选意',      task: { id: 'd33-b5-t1', audioKo: '엄마, 저 잘 지내고 있어요.',    choices: [{ text: '妈妈，我过得很好。',     correct: true }, { text: '妈妈，我过得不好。',      correct: false }, { text: '妈妈，我要去了。',    correct: false }, { text: '妈妈，我在等你。',      correct: false }], explain: '写信第一句 · 지내다 + 고 있어요' } },
    { type: 'choice',  label: '听句选意',      task: { id: 'd33-b5-t2', audioKo: '엄마도 건강 조심하세요.',       choices: [{ text: '妈妈也请注意健康。',      correct: true }, { text: '妈妈请多关照。',           correct: false }, { text: '妈妈感冒了吗？',      correct: false }, { text: '妈妈别生病了。',        correct: false }], explain: '给长辈关照的固定句' } },
    { type: 'choice',  label: '敬语形态',      task: { id: 'd33-b5-t3', promptZh: '"妈妈现在在做什么呢？（对长辈）"哪句正确？', choices: [{ text: '엄마는 지금 뭐 하고 있어요?',     correct: false }, { text: '엄마는 지금 뭐 하고 계세요?',   correct: true }, { text: '엄마는 지금 뭐 하고 있으세요?', correct: false }, { text: '엄마는 지금 뭐 하는 계세요?', correct: false }], explain: '进行时敬语 · ~고 계세요' } },
    { type: 'choice',  label: '词性检查',      task: { id: 'd33-b5-t4', promptZh: '"（她）很漂亮"哪句正确？',                    choices: [{ text: '예쁘고 있어요.',              correct: false }, { text: '예뻐요.',                    correct: true }, { text: '예쁘고 계세요.',                 correct: false }, { text: '예쁨 있어요.',                    correct: false }], explain: '~고 있어요 前必须动词' } },
    { type: 'choice',  label: '认词',          task: { id: 'd33-b5-t5', promptKo: '번역기',  promptHangul: 'beon-yeok-gi', choices: [{ text: '翻译器',          correct: true }, { text: '录音机',      correct: false }, { text: '打印机',  correct: false }, { text: '计算器', correct: false }], explain: '번역(翻译) + 기(器)' } },
    { type: 'compose', label: '组句',          task: { id: 'd33-b5-t6', zhHint: '正在给妈妈写信。',                            audioKo: '엄마한테 편지를 쓰고 있어요.', answer: ['엄마한테', '편지를', '쓰고 있어요.'], tokens: ['엄마한테', '편지를', '쓰고 있어요.', '편지가', '엄마에', '쓰네요.', '썼어요.'],       explain: '给人 한테 · 편지 宾语用 를' } },
    { type: 'compose', label: '组句',          task: { id: 'd33-b5-t7', zhHint: '妈妈现在在做什么呢？（敬语）',                audioKo: '엄마는 지금 뭐 하고 계세요?', answer: ['엄마는', '지금', '뭐', '하고 계세요?'], tokens: ['엄마는', '지금', '뭐', '하고 계세요?', '하고 있어요?', '해요?', '하시네요?'],           explain: '~고 계세요 敬语' } },
    { type: 'choice',  label: '情景选回应',    task: { id: 'd33-b5-t8', promptZh: '妈妈电话问 "요즘 어떻게 지내?"。你想报平安，最自然的一句？', choices: [{ text: '엄마, 저 잘 지내고 있어요.',        correct: true }, { text: '엄마, 몰라요.',              correct: false }, { text: '엄마, 얼마예요?',            correct: false }, { text: '엄마, 만나서 반가워요.',     correct: false }], explain: '报平安固定句' } },
  ],
};
