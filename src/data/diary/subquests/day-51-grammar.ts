import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 51 · 2-3 문법 탐험 · ~(으)ㄹ 수 있어요 深化 · 혼자서 · 成长对比 */
export const day51Grammar: GrammarSubQuestData = {
  day: 21, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '一个人也能：혼자서 + ~(으)ㄹ 수 있어요',

  fix: [
    { id: 'd51-g3-f1', promptKo: '나 혼자 다 할수 있어.',                    promptZh: '"一个人全能搞定"哪句正确？',                      choices: [{ text: '나 혼자 다 할수 있어.',                     correct: false }, { text: '나 혼자서 다 할 수 있어.',      correct: true }, { text: '나 혼자서 다 하ㄹ 수 있어.',           correct: false }, { text: '나 혼자로 다 할 수 있어.',                 correct: false }], explain: '수 前必须空格 · 자립强调 → 혼자**서**' },
    { id: 'd51-g3-f2', promptKo: '포카를 뽑ㄹ 수 있어요.',                    promptZh: '"能抽到小卡"哪句正确？',                          choices: [{ text: '포카를 뽑ㄹ 수 있어요.',                    correct: false }, { text: '포카를 뽑을 수 있어요.',        correct: true }, { text: '포카를 뽑수 있어요.',                    correct: false }, { text: '포카를 뽑을수 있어요.',                    correct: false }], explain: '뽑다 有收音 → **을 수 있어요** · Day 38 收音规则' },
    { id: 'd51-g3-f3', promptKo: '현금에서 결제할게요.',                     promptZh: '"刷卡结账"哪句正确？',                            choices: [{ text: '현금에서 결제할게요.',                       correct: false }, { text: '카드로 결제할게요.',            correct: true }, { text: '카드에 결제할게요.',                     correct: false }, { text: '카드까지 결제할게요.',                     correct: false }], explain: '手段助词 ~로 · 카드로 결제하다' },
    { id: 'd51-g3-f4', promptKo: 'Day 23에는 못 했으면, 오늘은 할 수 있어요.', promptZh: '"Day 23 做不到，今天可以了"哪句正确？',           choices: [{ text: 'Day 23에는 못 했으면, 오늘은 할 수 있어요.',   correct: false }, { text: 'Day 23에는 못 했지만, 오늘은 할 수 있어요.', correct: true }, { text: 'Day 23에서 못 했지만, 오늘은 할 수 있어요.', correct: false }, { text: 'Day 23에는 못 했으니까, 오늘은 할 수 있어요.', correct: false }], explain: '成长对比 → ~지만 转折' },
    { id: 'd51-g3-f5', promptKo: '혼자 vs 혼자서 · 자립 강조는?',              promptZh: '关于 혼자 vs 혼자서 的用法，哪句最准确？',        choices: [{ text: '혼자 만 쓸 수 있어요.',                     correct: false }, { text: '자립 강조 = **혼자서** · 일반 상황 = 혼자', correct: true }, { text: '두 개는 완전히 다른 뜻이에요.',        correct: false }, { text: '혼자서 는 과거 시제예요.',                 correct: false }], explain: '~서 强调"以___方式" · 独立完成时用 혼자서' },
  ],

  compose: [
    { id: 'd51-g3-c1', zhHint: '一个人全能搞定。',                     audioKo: '나 혼자서 다 할 수 있어.',                     answer: ['나', '혼자서', '다', '할 수 있어.'],                    tokens: ['나', '혼자서', '다', '할 수 있어.', '혼자', '할수 있어.', '할 수 없어.', '못 해.'],                   explain: '独立自我 · Tori 内心' },
    { id: 'd51-g3-c2', zhHint: '一个人能点单。',                       audioKo: '혼자서 주문할 수 있어요.',                     answer: ['혼자서', '주문할 수 있어요.'],                          tokens: ['혼자서', '주문할 수 있어요.', '혼자', '주문하ㄹ', '주문할수', '주문 못 해요.'],                       explain: '主题句' },
    { id: 'd51-g3-c3', zhHint: '一个人也抽到卡了。',                   audioKo: '혼자서 카드도 뽑았어요.',                     answer: ['혼자서', '카드도', '뽑았어요.'],                        tokens: ['혼자서', '카드도', '뽑았어요.', '혼자', '카드를', '뽑ㄹ', '뽑을', '못 뽑았어요.'],                     explain: '~도 = 也 · 뽑다 有收音' },
    { id: 'd51-g3-c4', zhHint: 'Day 23 时做不到，今天可以了。',        audioKo: 'Day 23에는 못 했지만, 오늘은 할 수 있어요.',   answer: ['Day 23에는', '못 했지만,', '오늘은', '할 수 있어요.'], tokens: ['Day 23에는', '못 했지만,', '오늘은', '할 수 있어요.', '했으면,', '못 하니까,', '할 수 없어요.', 'Day 23에서'], explain: '~지만 转折 · 成长对比' },
  ],

  rule: [
    { id: 'd51-g3-r1', promptZh: '关于「혼자 vs 혼자서」的差别，哪句最准确？', choices: [{ text: '혼자 = 独自（一般）· **혼자서** = 强调"以独自方式"（自立表达）· 意思接近但语感不同', correct: true }, { text: '两者完全一样',       correct: false }, { text: '혼자서 是过去时',    correct: false }, { text: '혼자 是敬语',      correct: false }], explain: '~서 = 强调方式 · 자립 语感' },
    { id: 'd51-g3-r2', promptZh: '关于 ~(으)ㄹ 수 있어요 的复习，哪句最准确？',   choices: [{ text: 'V + (으)ㄹ 수 있어요 = 能___ · 收音判定 ㄹ / 을 · 수 前空格', correct: true }, { text: '수 前不能空格',       correct: false }, { text: '所有词一律 + ㄹ',    correct: false }, { text: '只用于过去时',      correct: false }], explain: 'Day 38 深化' },
    { id: 'd51-g3-r3', promptZh: '关于「~(으)ㄹ 수 있다 vs ~(으)ㄹ 줄 알다」的差别，哪句最准确？', choices: [{ text: '~ㄹ 수 있다 = 能做（一般能力/条件）；~ㄹ 줄 알다 = 会（技能层面）· Day 51 独立主题用 ~ㄹ 수 있다 更合适', correct: true }, { text: '两者完全一样',       correct: false }, { text: '~ㄹ 줄 알다 是过去时',   correct: false }, { text: '~ㄹ 수 있다 只用于书面语', correct: false }], explain: '자전거를 탈 줄 알아요 = 会骑车（技能） · 오늘 자전거 탈 수 있어요 = 今天能骑车（条件允许）' },
    { id: 'd51-g3-r4', promptZh: '关于「成长对比」的常用结构，哪句最准确？',   choices: [{ text: '"过去 못 했지만, 지금은 할 수 있어요" = 转折 + 现在能做 · 记录成长的标准表达', correct: true }, { text: '~지만 是过去时',       correct: false }, { text: '~지만 只用于形容词',    correct: false }, { text: '~ㄹ 수 있어요 是命令形', correct: false }], explain: 'Day 48 学过的 ~지만 复习 · 用于自我成长记录' },
  ],
};
