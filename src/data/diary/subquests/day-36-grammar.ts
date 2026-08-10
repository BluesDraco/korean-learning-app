import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 36 · 2-3 문법 탐험 · ~아/어 주셨어요 · 주다 vs 드리다 */
export const day36Grammar: GrammarSubQuestData = {
  day: 6, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '长辈为我做了___：~아/어 주셨어요',

  fix: [
    { id: 'd36-g3-f1', promptKo: '엄마가 소포를 보내줬어요.',              promptZh: '"妈妈给我寄了包裹（对长辈用敬语）"哪句正确？',  choices: [{ text: '엄마가 소포를 보내줬어요.',        correct: false }, { text: '엄마가 소포를 보내주셨어요.',  correct: true }, { text: '엄마가 소포를 보냈어요.',        correct: false }, { text: '엄마가 소포를 보내드렸어요.',    correct: false }], explain: '妈妈是长辈 · 必须加 **시** → 주셨어요' },
    { id: 'd36-g3-f2', promptKo: '엄마한테 소포를 보내주셨어요.',            promptZh: '"我给妈妈寄了包裹"哪句正确？',                  choices: [{ text: '엄마한테 소포를 보내주셨어요.',    correct: false }, { text: '엄마한테 소포를 보내드렸어요.', correct: true }, { text: '엄마한테 소포를 보내줬어요.',    correct: false }, { text: '엄마한테 소포를 보냈어드려요.',  correct: false }], explain: '我给长辈 → **드리다**（보내드리다）· 주다 是别人给我' },
    { id: 'd36-g3-f3', promptKo: '아빠가 카드를 쓰셨어요.',                   promptZh: '"爸爸给我写了卡片（强调"为我"做）"哪句更贴切？', choices: [{ text: '아빠가 카드를 쓰셨어요.',            correct: false }, { text: '아빠가 카드를 써주셨어요.',    correct: true }, { text: '아빠가 카드를 써드렸어요.',        correct: false }, { text: '아빠가 카드를 썼어요.',            correct: false }], explain: '~아/어 주셨어요 强调"为我做"的心意 · 单纯 쓰셨어요 只是"写了"' },
    { id: 'd36-g3-f4', promptKo: '경비실에 소포를 찾았어요.',                 promptZh: '"在值班室拿到了包裹"哪句正确？',                choices: [{ text: '경비실에 소포를 찾았어요.',          correct: false }, { text: '경비실에서 소포를 찾았어요.',  correct: true }, { text: '경비실로 소포를 찾았어요.',        correct: false }, { text: '경비실까지 소포를 찾았어요.',      correct: false }], explain: '动作发生地 → **에서**（에 只表存在位置）' },
    { id: 'd36-g3-f5', promptKo: '엄마가 소포를 보내아 주셨어요.',            promptZh: '"妈妈给我寄了包裹"（敬语过去）哪句正确？',        choices: [{ text: '엄마가 소포를 보내아 주셨어요.',      correct: false }, { text: '엄마가 소포를 보내주셨어요.',   correct: true }, { text: '엄마가 소포를 보낼 주셨어요.',    correct: false }, { text: '엄마가 소포를 보냈아 주셨어요.',   correct: false }], explain: '보내다 元音已ㅐ → **보내** + 주셨어요 · 不重复 아' },
  ],

  compose: [
    { id: 'd36-g3-c1', zhHint: '妈妈给我寄了包裹。',                    audioKo: '엄마가 소포를 보내주셨어요.',            answer: ['엄마가', '소포를', '보내주셨어요.'],           tokens: ['엄마가', '소포를', '보내주셨어요.', '보내줬어요.', '보내드렸어요.', '보냈어요.', '소포에서'], explain: '~아/어 주셨어요 敬语过去时' },
    { id: 'd36-g3-c2', zhHint: '爸爸给我写了卡片。',                    audioKo: '아빠가 카드를 써주셨어요.',              answer: ['아빠가', '카드를', '써주셨어요.'],             tokens: ['아빠가', '카드를', '써주셨어요.', '써줬어요.', '쓰셨어요.', '썼어요.', '카드에서'],               explain: '쓰다 → 써 + 주셨어요 · ㅡ 元音变阴' },
    { id: 'd36-g3-c3', zhHint: '在值班室拿到了包裹。',                  audioKo: '경비실에서 소포를 찾았어요.',            answer: ['경비실에서', '소포를', '찾았어요.'],           tokens: ['경비실에서', '소포를', '찾았어요.', '경비실에', '경비실로', '소포가', '찾아드렸어요.'],           explain: '에서 = 动作发生地 · 소포 宾语 를' },
    { id: 'd36-g3-c4', zhHint: '我给妈妈寄了包裹。',                    audioKo: '엄마한테 소포를 보내드렸어요.',          answer: ['엄마한테', '소포를', '보내드렸어요.'],         tokens: ['엄마한테', '소포를', '보내드렸어요.', '보내주셨어요.', '보내줬어요.', '엄마에게서', '소포가'],   explain: '我给长辈 → **드리다**' },
  ],

  rule: [
    { id: 'd36-g3-r1', promptZh: '关于「~아/어 주셨어요」的用法，哪句最准确？', choices: [{ text: '长辈为我做了___的敬语过去时 · V + 아/어 + 주다 + 시 + 었어요', correct: true }, { text: '~아/어 주셨어요 是未来时',        correct: false }, { text: '~아/어 주셨어요 是命令形',        correct: false }, { text: '~아/어 주셨어요 只用于书面语',      correct: false }], explain: '엄마가 보내주셨어요 = 妈妈(敬)为我寄了' },
    { id: 'd36-g3-r2', promptZh: '关于「주다 vs 드리다」的差别，哪句最准确？',   choices: [{ text: '주다 = 别人给我；드리다 = 我给长辈（尊敬对方的方向不同）', correct: true }, { text: '两者完全一样',                    correct: false }, { text: '드리다 是敬语，주다 是반말',       correct: false }, { text: '주다 用于书面语',                   correct: false }], explain: '엄마가 주셨어요（她给我） · 엄마한테 드렸어요（我给她）' },
    { id: 'd36-g3-r3', promptZh: '关于四层敬语递进，哪句最准确？',                choices: [{ text: '보내요 → 보내줘요 → 보내주세요 → 보내주셨어요 · 层级依次是"我寄 / 为我寄 / 请为我寄 / 长辈为我寄了"', correct: true }, { text: '四个句子意思都一样',          correct: false }, { text: '~요 是最正式',                    correct: false }, { text: '~주셨어요 是过去否定',              correct: false }], explain: '递进敬语 · Tori 写信时用最完整的一层' },
    { id: 'd36-g3-r4', promptZh: '关于阴阳元音「~아 / ~어 주다」，哪句最准确？', choices: [{ text: '阳性元音(ㅏ/ㅗ) → 아 주다；其他 → 어 주다；하다 → 해 주다', correct: true }, { text: '所有词一律 + 아 주다',            correct: false }, { text: '所有词一律 + 어 주다',            correct: false }, { text: '过去时词干用 여 주다',              correct: false }], explain: '보내다 → 보내 주다 / 쓰다 → 써 주다 / 하다 → 해 주다' },
  ],
};
