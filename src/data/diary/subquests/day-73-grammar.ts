import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 73 · 3-3 문법 탐험 · ~자마자 · 一……就…… */
export const day73Grammar: GrammarSubQuestData = {
  day: 13, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '一……就……：V + 자마자',

  fix: [
    { id: 'd73-g3-f1', promptKo: '시장에 도착하는자마자 회를 먹었어요.', promptZh: '"一到市场就吃了生鱼片"哪句正确？',       choices: [{ text: '시장에 도착하는자마자 회를 먹었어요.',   correct: false }, { text: '시장에 도착하자마자 회를 먹었어요.', correct: true }, { text: '시장에 도착한자마자 회를 먹었어요.',     correct: false }, { text: '시장에 도착해서자마자 회를 먹었어요.',           correct: false }], explain: 'V 词干 + **자마자**（不加 는/은）· 도착하다 → 도착하자마자' },
    { id: 'd73-g3-f2', promptKo: '낙지를 봤자마자 하루가 소리쳤어요.',   promptZh: '"一看到章鱼 Haru 就叫了"哪句正确？',        choices: [{ text: '낙지를 봤자마자 하루가 소리쳤어요.',      correct: false }, { text: '낙지를 보자마자 하루가 소리쳤어요.',   correct: true }, { text: '낙지를 본자마자 하루가 소리쳤어요.',       correct: false }, { text: '낙지를 봐서자마자 하루가 소리쳤어요.',                 correct: false }], explain: '~자마자 前**永远原形**（不接 았/었）' },
    { id: 'd73-g3-f3', promptKo: '한 입 먹자마자 매워서 눈물이 났어요.', promptZh: '"一吃一口就辣得流泪"哪句正确？',              choices: [{ text: '한 입 먹자마자 매워서 눈물이 났어요.',    correct: true }, { text: '한 입 먹은자마자 매워서 눈물이 났어요.', correct: false }, { text: '한 입 먹는자마자 매워서 눈물이 났어요.', correct: false }, { text: '한 입 먹어서자마자 매워서 눈물이 났어요.',       correct: false }], explain: '먹다 → 먹자마자' },
    { id: 'd73-g3-f4', promptKo: '집에 오자마자 자고 싶어요.',           promptZh: '"一回到家就想睡觉"哪句正确？',                choices: [{ text: '집에 왔자마자 자고 싶어요.',              correct: false }, { text: '집에 오자마자 자고 싶어요.',            correct: true }, { text: '집에 온자마자 자고 싶어요.',                correct: false }, { text: '집에 와서자마자 자고 싶어요.',                        correct: false }], explain: '오다 → 오자마자' },
    { id: 'd73-g3-f5', promptZh: '关于「~자마자 vs ~아/어서」的差别，哪句最准确？',                                                                                                                                                          choices: [{ text: '~자마자 = **紧接、瞬间发生**（一 A 就立刻 B）· ~아/어서 = **顺序或原因**（A 完然后 B）· 语感差在"紧凑度"', correct: true }, { text: '两者完全一样',            correct: false }, { text: '~자마자 是命令',        correct: false }, { text: '~아/어서 只用于过去',       correct: false }], explain: '자마자 强调"立刻"' },
  ],

  compose: [
    { id: 'd73-g3-c1', zhHint: '一到市场就吃了生鱼片。',                  audioKo: '시장에 도착하자마자 회를 먹었어요.',      answer: ['시장에', '도착하자마자', '회를', '먹었어요.'],       tokens: ['시장에', '도착하자마자', '회를', '먹었어요.', '도착하는자마자', '도착한자마자', '도착해서', '먹어요.'], explain: 'V + 자마자' },
    { id: 'd73-g3-c2', zhHint: '一看到章鱼 Haru 就叫了。',                audioKo: '낙지를 보자마자 하루가 소리쳤어요.',      answer: ['낙지를', '보자마자', '하루가', '소리쳤어요.'],       tokens: ['낙지를', '보자마자', '하루가', '소리쳤어요.', '봤자마자', '본자마자', '봐서', '소리쳐요.'],           explain: '보다 → 보자마자' },
    { id: 'd73-g3-c3', zhHint: '一吃一口就辣得流泪。',                     audioKo: '한 입 먹자마자 매워서 눈물이 났어요.',   answer: ['한 입', '먹자마자', '매워서', '눈물이', '났어요.'], tokens: ['한 입', '먹자마자', '매워서', '눈물이', '났어요.', '먹은자마자', '먹는자마자', '먹어서', '나요.'], explain: '먹다 → 먹자마자' },
    { id: 'd73-g3-c4', zhHint: '一回到家就想睡觉。',                       audioKo: '집에 오자마자 자고 싶어요.',              answer: ['집에', '오자마자', '자고 싶어요.'],                    tokens: ['집에', '오자마자', '자고 싶어요.', '왔자마자', '온자마자', '와서', '자요.'],                     explain: '오다 → 오자마자' },
  ],

  rule: [
    { id: 'd73-g3-r1', promptZh: '关于「V + 자마자」的形态，哪句最准确？',                                choices: [{ text: '**动词词干 + 자마자** · 도착하다 → 도착하자마자 · 보다 → 보자마자 · 意思"一……就……"', correct: true }, { text: 'V + 는 자마자',               correct: false }, { text: 'V + 은 자마자',               correct: false }, { text: 'V + 아 자마자',                    correct: false }], explain: '词干直接 + 자마자' },
    { id: 'd73-g3-r2', promptZh: '关于「时态位置」，哪句最准确？',                                       choices: [{ text: '~자마자 前**永远原形**（不接 았/었 / 겠）· 时态放在**句尾**（먹었어요 / 갈 거예요）', correct: true }, { text: '~자마자 前接过去时',           correct: false }, { text: '~자마자 前接未来时',           correct: false }, { text: '句尾必须是命令',                    correct: false }], explain: '看到 → 봐자마자 ✗ / 보자마자 ✓' },
    { id: 'd73-g3-r3', promptZh: '关于「~자마자 vs ~아/어서」的差别，哪句最准确？',                     choices: [{ text: '**자마자 = 瞬间紧接** · **아/어서 = 顺序或原因** · 자마자 更强调"立刻、几乎同时"', correct: true }, { text: '两者完全一样',            correct: false }, { text: '자마자 是敬语',    correct: false }, { text: '아/어서 是命令',           correct: false }], explain: '语感差 · 场景选一个' },
    { id: 'd73-g3-r4', promptZh: '关于「~자마자」的主语规则，哪句最准确？',                              choices: [{ text: '前后**主语可同可不同** · 内가 도착하자마자 하루가 소리쳤어요（不同主语也OK）', correct: true }, { text: '主语必须相同',            correct: false }, { text: '主语必须不同',        correct: false }, { text: '主语只能是第三人称',                      correct: false }], explain: '主语宽松 · 是 자마자 的优势' },
  ],
};
