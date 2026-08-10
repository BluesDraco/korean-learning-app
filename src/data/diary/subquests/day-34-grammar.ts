import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 34 · 2-3 문법 탐험 · 생각나다 自动词 · 否定倒置 */
export const day34Grammar: GrammarSubQuestData = {
  day: 4, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '생각나다 · 主语 이/가 + 否定倒置',

  fix: [
    { id: 'd34-g3-f1', promptKo: '엄마를 생각나요.',          promptZh: '"想起妈妈"哪句正确？',                    choices: [{ text: '엄마를 생각나요.',            correct: false }, { text: '엄마가 생각나요.',          correct: true }, { text: '엄마는 생각나요.',        correct: false }, { text: '엄마에게 생각나요.',      correct: false }], explain: '생각나다 = 自动词 · 主语必须 **이/가**（不是 을/를）' },
    { id: 'd34-g3-f2', promptKo: '이름이 안 생각나요.',        promptZh: '"想不起名字"哪句正确？',                  choices: [{ text: '이름이 안 생각나요.',         correct: false }, { text: '이름이 생각이 안 나요.',    correct: true }, { text: '이름을 안 생각나요.',      correct: false }, { text: '이름은 생각을 안 나요.',   correct: false }], explain: '否定倒置 · **생각이 안 나요**（母语者习惯）' },
    { id: 'd34-g3-f3', promptKo: '엄마를 갑자기 생각났어요.',   promptZh: '"突然想起妈妈"哪句正确？',                 choices: [{ text: '엄마를 갑자기 생각났어요.',   correct: false }, { text: '엄마가 갑자기 생각났어요.', correct: true }, { text: '엄마는 갑자기 생각났어요.', correct: false }, { text: '엄마에게 갑자기 생각났어요.', correct: false }], explain: '엄마 无收音 → **가** · 생각나다 自动词' },
    { id: 'd34-g3-f4', promptKo: '엄마가 생각해요.',            promptZh: '"想起妈妈（自动）"和"想妈妈（他动）"哪个用词更准确？', choices: [{ text: '想起（触发式）= 엄마를 생각해요.',           correct: false }, { text: '想起（触发式）= 엄마가 생각나요。他动想 = 엄마를 생각해요.', correct: true }, { text: '两者一样，可任意互换',    correct: false }, { text: '생각나다 是他动',            correct: false }], explain: '생각나다（自动词，主动浮现）vs 생각하다（他动词，主动想）' },
    { id: 'd34-g3-f5', promptKo: '엄마가 보고 싶어서 생각나요.',   promptZh: '"想念妈妈"（长期思念）哪句更准确？',        choices: [{ text: '엄마가 보고 싶어서 생각나요.',      correct: false }, { text: '엄마가 보고 싶어요.',        correct: true }, { text: '엄마가 갑자기 생각나요.',       correct: false }, { text: '엄마를 생각나요.',                correct: false }], explain: '长期思念 → **보고 싶다**；触发式想起 → 생각나다 · 두 어휘 구분' },
  ],

  compose: [
    { id: 'd34-g3-c1', zhHint: '看到你会想起以前的朋友。',       audioKo: '너를 보면 옛날 친구가 생각나.',    answer: ['너를', '보면', '옛날 친구가', '생각나.'],   tokens: ['너를', '보면', '옛날 친구가', '생각나.', '옛날 친구를', '생각해.', '생각하네.'], explain: 'Haru 原句 · 친구가 (自动词主语)' },
    { id: 'd34-g3-c2', zhHint: '想不起那人的名字。',              audioKo: '그 사람 이름이 생각이 안 나요.',    answer: ['그', '사람', '이름이', '생각이', '안 나요.'], tokens: ['그', '사람', '이름이', '생각이', '안 나요.', '이름을', '안 생각나요.', '생각이 안 있어요.'], explain: '否定倒置 · **생각이 안 나요**' },
    { id: 'd34-g3-c3', zhHint: '突然想起妈妈了。',                audioKo: '엄마가 갑자기 생각났어요.',        answer: ['엄마가', '갑자기', '생각났어요.'],           tokens: ['엄마가', '갑자기', '생각났어요.', '엄마를', '생각했어요.', '엄마는', '생각이 났어요.'], explain: '엄마 + 가 · 생각나다 过去时' },
    { id: 'd34-g3-c4', zhHint: '以后再告诉你。',                  audioKo: '나중에 알려줄게.',                  answer: ['나중에', '알려줄게.'],                       tokens: ['나중에', '알려줄게.', '알려요.', '알려주네.', '알려줬어.', '지금'], explain: '承诺形 ~ㄹ게 · 반말亲密语' },
  ],

  rule: [
    { id: 'd34-g3-r1', promptZh: '关于「생각나다」的用法，哪句最准确？', choices: [{ text: '自动词 · 主语用 **이/가**（不是 을/를）· "N 自己浮现"', correct: true }, { text: '他动词 · 主语用 을/를',       correct: false }, { text: '意为"想念"',                 correct: false }, { text: '只用于过去时',                 correct: false }], explain: '자동사(자기) · vs 생각하다(他动词)' },
    { id: 'd34-g3-r2', promptZh: '关于「생각나다 vs 생각하다」的差别，哪句最准确？', choices: [{ text: '생각나다 = 自动"想起/浮现"（이/가）；생각하다 = 他动"想"（을/를）', correct: true }, { text: '两者完全一样',           correct: false }, { text: '생각나다 是形容词',           correct: false }, { text: '생각하다 只用于过去时',        correct: false }], explain: '엄마가 생각나요（触发式浮现）· 엄마를 생각해요（主动地想）' },
    { id: 'd34-g3-r3', promptZh: '关于「생각나다」的否定，哪句最准确？', choices: [{ text: '**생각이 안 나요**（否定倒置，母语者习惯）', correct: true }, { text: '**안 생각나요**（母语者不这么说）', correct: false }, { text: '**생각 못 해요**',              correct: false }, { text: '**생각 없어요**',               correct: false }], explain: 'V 안 되는 습관 · 생각 + 이 + 안 + 나다' },
    { id: 'd34-g3-r4', promptZh: '关于「보고 싶다 vs 생각나다」的差别，哪句最准确？', choices: [{ text: '보고 싶다 = 长期思念；생각나다 = 突然/触发式想起', correct: true }, { text: '两者完全一样',           correct: false }, { text: '보고 싶다 是他动词',           correct: false }, { text: '생각나다 是敬语',              correct: false }], explain: '엄마가 보고 싶어요（长期）· 엄마가 생각나요（突然）' },
  ],
};
