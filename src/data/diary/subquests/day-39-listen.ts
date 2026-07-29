import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 39 · 2-2 귀 트이기 · ~는 것 같아요 推测 */
export const day39Listen: ListenSubQuestData = {
  day: 9, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '教室 · 韩文字母的秘密',

  meaning: [
    { id: 'd39-l2-m1', audioKo: '한글이 진짜 과학적인 것 같아요.',                choices: [{ text: '韩文真的好像很科学呢。',    correct: true }, { text: '韩文一定是科学的。',              correct: false }, { text: '韩文其实不科学。',                  correct: false }, { text: '韩文和科学没关系。',              correct: false }], explain: 'Tori 原句 · 과학적 + 인 것 같아요' },
    { id: 'd39-l2-m2', audioKo: '세종대왕이 한글을 만드셨어요.',                    choices: [{ text: '世宗大王创造了韩文。',      correct: true }, { text: '世宗大王学了韩文。',              correct: false }, { text: '世宗大王在写韩文。',                correct: false }, { text: '世宗大王喜欢韩文。',              correct: false }], explain: '만들다 + 시 + 었어요 = 敬语过去（만드셨어요）' },
    { id: 'd39-l2-m3', audioKo: '세계에서 유일하게 생일이 있는 글자예요.',           choices: [{ text: '世界上唯一有生日的文字。',   correct: true }, { text: '世界上最古老的文字。',              correct: false }, { text: '生日在世界的一种文字。',              correct: false }, { text: '文字里没有生日。',                    correct: false }], explain: '유일하게 = 唯一 · 세계에서 = 在世界上' },
    { id: 'd39-l2-m4', audioKo: '이건 혀가 목구멍을 막는 모양이에요.',              choices: [{ text: '这是舌头堵住喉咙的样子。',   correct: true }, { text: '这是喉咙很痛。',                    correct: false }, { text: '这是嘴巴张开。',                    correct: false }, { text: '这是舌头动一动。',                  correct: false }], explain: 'ㄱ 字母来源 · 혀 + 막다 + 는 모양' },
    { id: 'd39-l2-m5', audioKo: '준호는 KPOP 팬인 것 같아요.',                     choices: [{ text: 'Junho 好像是 KPOP 粉丝。',   correct: true }, { text: 'Junho 是 KPOP 歌手。',              correct: false }, { text: 'Junho 讨厌 KPOP。',                correct: false }, { text: 'Junho 想学 KPOP。',                correct: false }], explain: '名词 팬 + 인 것 같아요 = 推测身份' },
  ],

  cloze: [
    { id: 'd39-l2-c1', audioKo: '비가 오는 것 같아요.',              clozeParts: ['비가 ', ' 것 같아요.'],           choices: [{ text: '오는', correct: true }, { text: '온', correct: false }, { text: '오네', correct: false }, { text: '와요', correct: false }], explain: '오다（动词现在）→ **오는** 것 같아요' },
    { id: 'd39-l2-c2', audioKo: '이 김치가 매운 것 같아요.',          clozeParts: ['이 김치가 ', ' 것 같아요.'],       choices: [{ text: '매운', correct: true }, { text: '매워', correct: false }, { text: '맵는', correct: false }, { text: '매워요', correct: false }], explain: '맵다（形容词） ㅂ 不规则 → **매운** 것 같아요' },
    { id: 'd39-l2-c3', audioKo: '준호는 KPOP 팬인 것 같아요.',       clozeParts: ['준호는 KPOP 팬', ' 것 같아요.'], choices: [{ text: '인',   correct: true }, { text: '은',   correct: false }, { text: '는',    correct: false }, { text: '이',   correct: false }], explain: '名词 팬 + **인 것 같아요**' },
    { id: 'd39-l2-c4', audioKo: '벌써 밥을 먹은 것 같아요.',           clozeParts: ['벌써 밥을 ', ' 것 같아요.'],       choices: [{ text: '먹은', correct: true }, { text: '먹는', correct: false }, { text: '먹었', correct: false }, { text: '먹어', correct: false }], explain: '动词过去 → **~(으)ㄴ 것 같아요**（먹었어요 → 먹은）' },
  ],

  reply: [
    { id: 'd39-l2-r1', audioKo: '한글, 어때요?',                                       promptZh: '火鹤老师问 "韩文怎么样"。你想说"感觉比想象中更美"，最自然的一句？',    choices: [{ text: '생각보다 더 아름다운 것 같아요.',              correct: true }, { text: '한글은 이상해요.',                          correct: false }, { text: '한글을 만들었어요.',                          correct: false }, { text: '얼마예요?',                          correct: false }], explain: '~ㄴ 것 같아요 表柔和推测 · 아름답다 → 아름다운' },
    { id: 'd39-l2-r2', audioKo: '밖에 날씨 어때요?',                                  promptZh: '你看窗外，想推测"好像在下雨"，最自然的一句？',                           choices: [{ text: '비가 오는 것 같아요.',                        correct: true }, { text: '비가 오다요.',                              correct: false }, { text: '비가 온 것 같아요.',                          correct: false }, { text: '비가 왔어요.',                        correct: false }], explain: '动词现在 → 는 것 같아요' },
    { id: 'd39-l2-r3', audioKo: '이 김치 어때요?',                                     promptZh: '朋友问你尝了泡菜怎么样，你想柔和地说"好像很辣"，最自然的一句？',           choices: [{ text: '이 김치가 매운 것 같아요.',                    correct: true }, { text: '이 김치가 맵는 것 같아요.',                  correct: false }, { text: '이 김치가 매워요요.',                         correct: false }, { text: '이 김치가 맵다요.',                          correct: false }], explain: '형용사 맵다 → **매운** 것 같아요（不用 맵는）' },
  ],
};
