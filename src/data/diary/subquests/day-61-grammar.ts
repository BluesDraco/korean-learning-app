import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 61 · 3-3 문법 탐험 · ~처럼 / ~같이 · N + 처럼 · N + 같이 · vs ~같다 */
export const day61Grammar: GrammarSubQuestData = {
  day: 1, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '像___一样：N + 처럼 / N + 같이',

  fix: [
    { id: 'd61-g3-f1', promptKo: '예쁘처럼 웃어요.',              promptZh: '"像漂亮那样笑"哪句正确？',              choices: [{ text: '예쁘처럼 웃어요.',              correct: false }, { text: '예쁜 것처럼 웃어요.',            correct: true }, { text: '예쁘게처럼 웃어요.',              correct: false }, { text: '예쁨처럼 웃어요.',              correct: false }], explain: '~처럼 只接**名词** · 形容词要先名词化：예쁜 것' },
    { id: 'd61-g3-f2', promptKo: '다니엘 씨는 원어민한테 발음해요.', promptZh: '"Danielle 发音像母语者"哪句正确？',       choices: [{ text: '다니엘 씨는 원어민한테 발음해요.', correct: false }, { text: '다니엘 씨는 원어민처럼 발음해요.', correct: true }, { text: '다니엘 씨는 원어민을 발음해요.',    correct: false }, { text: '다니엘 씨는 원어민에서 발음해요.', correct: false }], explain: '比喻用 **처럼**（不是 한테 / 을 / 에서）· Day 61 主题句' },
    { id: 'd61-g3-f3', promptKo: '눈이 별에 빛나요.',              promptZh: '"眼睛像星星一样闪"哪句正确？',            choices: [{ text: '눈이 별에 빛나요.',              correct: false }, { text: '눈이 별처럼 빛나요.',            correct: true }, { text: '눈이 별하고 빛나요.',              correct: false }, { text: '눈이 별에서 빛나요.',            correct: false }], explain: '比喻用 **처럼**（不是 에 / 하고 / 에서）· 별 无 받침 → 별처럼' },
    { id: 'd61-g3-f4', promptKo: '한국 사람같아요.',              promptZh: '"像韩国人一样自然"（副词式修饰动词）哪句正确？', choices: [{ text: '한국 사람같아요, 자연스러워요.', correct: false }, { text: '한국 사람같이 자연스러워요.',   correct: true }, { text: '한국 사람에게 자연스러워요.',      correct: false }, { text: '한국 사람으로 자연스러워요.',    correct: false }], explain: 'N + **같이**（副词，修饰后面的形容词）· ~같다 是形容词，不能直接接后句' },
    { id: 'd61-g3-f5', promptZh: '关于 「~처럼 vs ~같이」 的差别，哪句最准确？',         choices: [{ text: '~처럼 = 更强调"比喻" · ~같이 = 更强调"同样地"（意思相近，语感略差）', correct: true }, { text: '두 개는 완전히 달라요',      correct: false }, { text: '~같이 是敬语',       correct: false }, { text: '~처럼 只用于过去',        correct: false }], explain: '두 개 뜻은 거의 같음 · ~처럼 = 比喻 · ~같이 = 副词式 "如同"' },
  ],

  compose: [
    { id: 'd61-g3-c1', zhHint: 'Danielle 发音像母语者。',      audioKo: '다니엘 씨는 원어민처럼 발음해요.', answer: ['다니엘 씨는', '원어민처럼', '발음해요.'], tokens: ['다니엘 씨는', '원어민처럼', '발음해요.', '원어민한테', '원어민을', '원어민에서', '발음이에요.'], explain: 'N + 처럼 + V · Day 61 主题句' },
    { id: 'd61-g3-c2', zhHint: '眼睛像星星一样闪。',           audioKo: '눈이 별처럼 빛나요.',              answer: ['눈이', '별처럼', '빛나요.'],              tokens: ['눈이', '별처럼', '빛나요.', '별에', '별하고', '별에서', '빛났어요.'],                          explain: 'N + 처럼 + V · 별 无 받침' },
    { id: 'd61-g3-c3', zhHint: '像小孩一样笑了。',              audioKo: '아이처럼 웃었어요.',              answer: ['아이처럼', '웃었어요.'],                   tokens: ['아이처럼', '웃었어요.', '아이한테', '아이에게', '아이는', '웃어요.', '웃을게요.'],                explain: 'N + 처럼 + V 过去 · 관용 비유' },
    { id: 'd61-g3-c4', zhHint: '像韩国人一样自然。',             audioKo: '한국 사람같이 자연스러워요.',      answer: ['한국 사람같이', '자연스러워요.'],          tokens: ['한국 사람같이', '자연스러워요.', '한국 사람처럼', '한국 사람같아요', '한국 사람에게', '자연스러웠어요.'], explain: 'N + 같이（副词，同 ~처럼 意）' },
  ],

  rule: [
    { id: 'd61-g3-r1', promptZh: '关于「~처럼」的用法，哪句最准确？',                        choices: [{ text: 'N + **처럼** = 像 N 一样 · 只接**名词** · 后面接动词 / 形容词', correct: true }, { text: '~처럼 只接动词',       correct: false }, { text: '~처럼 用来表示时间',       correct: false }, { text: '~처럼 是敬语',                correct: false }], explain: '基本用法 · N + 처럼 = 比喻' },
    { id: 'd61-g3-r2', promptZh: '关于「~처럼 vs ~같이」的差别，哪句最准确？',              choices: [{ text: '뜻은 거의 같음 · ~처럼 = 比喻感 · ~같이 = "如同" 副词感 · 서로 바꿔 쓸 수 있음',    correct: true }, { text: '完全不一样',         correct: false }, { text: '~같이 是敬语',         correct: false }, { text: '~처럼 只用于过去',            correct: false }], explain: '两者通用，语感略差' },
    { id: 'd61-g3-r3', promptZh: '关于「~처럼 vs ~같다（形容词）」，哪句最准确？',           choices: [{ text: '~처럼 = **副词式**（后接 V/A）· ~같다 = **形容词**（做谓语）· 원어민처럼 말해요 vs 원어민 같아요', correct: true }, { text: '两个完全一样',       correct: false }, { text: '~같다 是过去',          correct: false }, { text: '~처럼 只用于名词',         correct: false }], explain: '词性差 → 用法差' },
    { id: 'd61-g3-r4', promptZh: '关于「形容词/动词能否直接接 ~처럼」，哪句最准确？',        choices: [{ text: '不能 · 必须先**名词化**（예쁜 것처럼 / 웃는 것처럼）', correct: true }, { text: '可以直接接',            correct: false }, { text: '~처럼 만 用于动词',       correct: false }, { text: '~처럼 是终结语尾',            correct: false }], explain: '~처럼 前接词性限制 · 需名词化' },
  ],
};
