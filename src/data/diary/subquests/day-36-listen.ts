import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 36 · 2-2 귀 트이기 · ~아/어 주셨어요 敬语过去时 */
export const day36Listen: ListenSubQuestData = {
  day: 6, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '打开包裹 · 听清每一份心意',

  meaning: [
    { id: 'd36-l2-m1', audioKo: '엄마가 소포를 보내주셨어요.',                  choices: [{ text: '妈妈给我寄了包裹。（敬语）',     correct: true }, { text: '妈妈收到了包裹。',              correct: false }, { text: '妈妈想寄包裹。',              correct: false }, { text: '妈妈让我寄包裹。',              correct: false }], explain: '보내다 + 주시다 + 었어요 = 敬语过去时' },
    { id: 'd36-l2-m2', audioKo: '엄마가 고춧가루도 보내주셨어요.',              choices: [{ text: '妈妈还给我寄了辣椒粉。',          correct: true }, { text: '妈妈买了辣椒粉。',              correct: false }, { text: '妈妈吃了辣椒粉。',              correct: false }, { text: '妈妈给辣椒粉寄东西。',          correct: false }], explain: '고춧가루도 = 连辣椒粉也 · 주셨어요 敬语' },
    { id: 'd36-l2-m3', audioKo: '경비실에서 소포를 찾았어요.',                  choices: [{ text: '在值班室拿到了包裹。',            correct: true }, { text: '在值班室弄丢了包裹。',            correct: false }, { text: '值班室送来了包裹。',              correct: false }, { text: '找不到值班室。',                 correct: false }], explain: '찾다 = 领取（此语境）· 에서 = 起点/发生地' },
    { id: 'd36-l2-m4', audioKo: '갑자기 눈물이 났어요.',                       choices: [{ text: '突然流眼泪了。',                  correct: true }, { text: '突然感觉难受。',                  correct: false }, { text: '突然不哭了。',                    correct: false }, { text: '眼睛突然疼了。',                  correct: false }], explain: '눈물이 나다 · 主语用 이/가' },
    { id: 'd36-l2-m5', audioKo: '토리, 우는 거야?',                            choices: [{ text: '兔莉，你在哭吗？',                correct: true }, { text: '兔莉，谁在哭？',                  correct: false }, { text: '兔莉，你笑什么？',                correct: false }, { text: '兔莉，你在做什么？',              correct: false }], explain: '~는 거야? 반말疑问 · 现在进行' },
  ],

  cloze: [
    { id: 'd36-l2-c1', audioKo: '엄마가 소포를 보내주셨어요.',       clozeParts: ['엄마가 소포를 ', '.'],           choices: [{ text: '보내주셨어요', correct: true }, { text: '보내줬어요', correct: false }, { text: '보내셨어요', correct: false }, { text: '보내요',       correct: false }], explain: '妈妈是长辈 → **주셨어요**（시 + 었어요）' },
    { id: 'd36-l2-c2', audioKo: '아빠가 카드를 써주셨어요.',          clozeParts: ['아빠가 카드를 ', '.'],           choices: [{ text: '써주셨어요', correct: true }, { text: '써줬어요', correct: false }, { text: '쓰셨어요',   correct: false }, { text: '써요',           correct: false }], explain: '쓰다 → 써 + 주셨어요 · 阴阳元音 ㅡ → 어' },
    { id: 'd36-l2-c3', audioKo: '경비실에서 소포를 찾았어요.',         clozeParts: ['경비실', ' 소포를 찾았어요.'],   choices: [{ text: '에서', correct: true }, { text: '에',   correct: false }, { text: '까지',       correct: false }, { text: '로',           correct: false }], explain: '动作发生地 → **에서**' },
    { id: 'd36-l2-c4', audioKo: '엄마한테 소포를 보내드렸어요.',        clozeParts: ['엄마한테 소포를 ', '.'],         choices: [{ text: '보내드렸어요', correct: true }, { text: '보내주셨어요', correct: false }, { text: '보냈어요',   correct: false }, { text: '보내줬어요',   correct: false }], explain: '我给长辈 → **드리다**（보내드리다 → 보내드렸어요）' },
  ],

  reply: [
    { id: 'd36-l2-r1', audioKo: '토리, 소포 왔어요. 경비실에서 찾아가세요.',       promptZh: '浣熊阿姨通知你有包裹。你想道谢，最自然的一句？',        choices: [{ text: '아, 감사합니다. 지금 갈게요.',              correct: true }, { text: '얼마예요?',                       correct: false }, { text: '몰라요.',                       correct: false }, { text: '싫어요.',                       correct: false }], explain: '감사합니다 + 지금 갈게요（承诺形去取）' },
    { id: 'd36-l2-r2', audioKo: '토리, 우는 거야?',                                  promptZh: 'Haru 敲门问你在哭吗。你想强忍笑说没有，最自然的一句？',   choices: [{ text: '아니야, 웃는 거야.',                       correct: true }, { text: '응, 자고 있어.',                    correct: false }, { text: '싫어, 저리 가.',                    correct: false }, { text: '얼마예요?',                    correct: false }], explain: 'Tori 原句 · 아니야 + 웃는 거야' },
    { id: 'd36-l2-r3', audioKo: '엄마가 뭘 보내주셨어?',                              promptZh: 'Haru 问妈妈寄了什么。你想说"火锅底料和辣椒粉"，最自然的一句？', choices: [{ text: '훠궈 재료랑 고춧가루를 보내주셨어.',        correct: true }, { text: '훠궈 재료를 보냈어요.',            correct: false }, { text: '고춧가루가 없어.',                 correct: false }, { text: '얼마예요?',                    correct: false }], explain: '朋友间반말 · 랑 = 和 · 보내주셨어（对长辈保持敬语）' },
  ],
};
