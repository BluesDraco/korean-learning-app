import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 34 · 2-2 귀 트이기 · 생각나다 自动词 + 否定倒置 */
export const day34Listen: ListenSubQuestData = {
  day: 4, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '两杯麦茶之间 · 每一句都要听清',

  meaning: [
    { id: 'd34-l2-m1', audioKo: '너를 보면 옛날 친구가 생각나.',                choices: [{ text: '看到你会想起以前的朋友。',     correct: true }, { text: '看到你会想那朋友。',              correct: false }, { text: '你和以前的朋友很像。',              correct: false }, { text: '你就是那个以前的朋友。',            correct: false }], explain: 'Haru 原句 · 생각나다 自动词 · 主语 친구가' },
    { id: 'd34-l2-m2', audioKo: '나중에 알려줄게. 지금은 아니야.',                 choices: [{ text: '以后再告诉你。现在还不是时候。', correct: true }, { text: '现在不知道，不能告诉你。',        correct: false }, { text: '以后再问我。',                    correct: false }, { text: '现在告诉你也可以。',                correct: false }], explain: '~ㄹ게 = 承诺形 · 나중에 = 以后' },
    { id: 'd34-l2-m3', audioKo: '엄마가 갑자기 생각났어요.',                     choices: [{ text: '突然想起妈妈了。',              correct: true }, { text: '妈妈突然出现了。',                correct: false }, { text: '妈妈突然打来电话。',              correct: false }, { text: '想让妈妈突然回来。',                correct: false }], explain: '갑자기 + 생각나다 = 突然想起 · 触发式' },
    { id: 'd34-l2-m4', audioKo: '그 사람 이름이 생각이 안 나요.',                 choices: [{ text: '想不起那人的名字。',            correct: true }, { text: '那人的名字很难念。',              correct: false }, { text: '那人的名字忘了没关系。',          correct: false }, { text: '那人不想说自己名字。',              correct: false }], explain: '否定倒置 · 생각이 안 나요（不说 안 생각나요）' },
    { id: 'd34-l2-m5', audioKo: '너 그 친구랑 닮았어.',                          choices: [{ text: '你和那朋友很像。',              correct: true }, { text: '你和那朋友熟。',                  correct: false }, { text: '你比那朋友高。',                  correct: false }, { text: '你不像那朋友。',                    correct: false }], explain: '~을/를 닮다 = 长得像 · 랑 = 和' },
  ],

  cloze: [
    { id: 'd34-l2-c1', audioKo: '옛날 친구가 생각나요.',       clozeParts: ['옛날 친구', ' 생각나요.'],  choices: [{ text: '가', correct: true }, { text: '를', correct: false }, { text: '는', correct: false }, { text: '에게', correct: false }], explain: '생각나다 是自动词 → 主语用 **이/가**（친구 无收音 → 가）' },
    { id: 'd34-l2-c2', audioKo: '엄마가 갑자기 생각났어요.',   clozeParts: ['엄마가 갑자기 ', '.'],       choices: [{ text: '생각났어요', correct: true }, { text: '생각했어요', correct: false }, { text: '생각을 했어요', correct: false }, { text: '생각이 있어요', correct: false }], explain: '갑자기 + 생각나다 · 过去 생각났어요' },
    { id: 'd34-l2-c3', audioKo: '이름이 생각이 안 나요.',       clozeParts: ['이름이 ', ' 안 나요.'],       choices: [{ text: '생각이', correct: true }, { text: '생각', correct: false }, { text: '생각을', correct: false }, { text: '생각도', correct: false }], explain: '否定倒置 · **생각이 안 나요**（不是 안 생각나요）' },
    { id: 'd34-l2-c4', audioKo: '나중에 알려줄게.',              clozeParts: ['나중에 ', '.'],              choices: [{ text: '알려줄게', correct: true }, { text: '알려주네', correct: false }, { text: '알려요',   correct: false }, { text: '알려줬어', correct: false }], explain: '承诺形 ~ㄹ게 · 알리다+주다 → 알려주다 → 알려줄게' },
  ],

  reply: [
    { id: 'd34-l2-r1', audioKo: '너를 보면 옛날 친구가 생각나.',            promptZh: 'Haru 说"看到你会想起以前的朋友"。你不想追问但想让她安心，最自然的一句？', choices: [{ text: '응, 나중에 얘기해 줘.',                        correct: true }, { text: '지금 말해 줘.',                       correct: false }, { text: '그럼 됐어.',                    correct: false }, { text: '얼마예요?',                    correct: false }], explain: '不追问 + 表达耐心等待 · 나중에 呼应' },
    { id: 'd34-l2-r2', audioKo: '나중에 알려줄게.',                          promptZh: 'Haru 承诺以后再告诉你。你想尊重她的边界，最合适的一句？',                    choices: [{ text: '괜찮아. 기다릴게.',                          correct: true }, { text: '왜 지금 말 안 해?',                    correct: false }, { text: '싫어. 지금 말해 줘.',              correct: false }, { text: '몰라. 얼마예요?',              correct: false }], explain: '괜찮아 + 기다릴게 = 尊重对方节奏' },
    { id: 'd34-l2-r3', audioKo: '이건 비밀이야.',                             promptZh: 'Haru 说"这是秘密"。你想承诺帮她保守秘密，最标准的一句？',                     choices: [{ text: '알았어. 비밀 지킬게.',                       correct: true }, { text: '싫어. 다 말할 거야.',                 correct: false }, { text: '몰라. 나중에 얘기해.',           correct: false }, { text: '만나서 반가워.',                correct: false }], explain: '알았어 + 비밀 지킬게（保守秘密的承诺）' },
  ],
};
