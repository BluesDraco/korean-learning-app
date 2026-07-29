import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 46 · 2-2 귀 트이기 · ~아/어 주다 · 주다 vs 드리다 */
export const day46Listen: ListenSubQuestData = {
  day: 16, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '302 号门口 · 生日惊喜',

  meaning: [
    { id: 'd46-l2-m1', audioKo: '하루야, 생일 축하해!',                     choices: [{ text: 'Haru，生日快乐！',                correct: true }, { text: 'Haru，明天见。',                    correct: false }, { text: 'Haru，谢谢你。',                    correct: false }, { text: 'Haru，请稍等。',                    correct: false }], explain: '生日반말祝福' },
    { id: 'd46-l2-m2', audioKo: '이건 처음이야. 진짜 고마워.',                 choices: [{ text: '这是第一次。真的谢谢。',        correct: true }, { text: '这不是第一次。',                    correct: false }, { text: '第一次真的不要。',                    correct: false }, { text: '不用谢谢。',                          correct: false }], explain: 'Haru 原句 · Day 34 伏笔延续' },
    { id: 'd46-l2-m3', audioKo: '앞으로 매년 우리가 같이 있어 줄게.',           choices: [{ text: '以后每年我们都陪你。',            correct: true }, { text: '以后没时间陪你。',                    correct: false }, { text: '每年只见一次。',                        correct: false }, { text: '一起再不见了。',                        correct: false }], explain: 'Tori 承诺 · ~아/어 줄게' },
    { id: 'd46-l2-m4', audioKo: '작은 선물이야. 우리가 다 같이 준비했어.',      choices: [{ text: '一点小礼物。我们一起准备的。',   correct: true }, { text: '这个礼物很贵。',                        correct: false }, { text: '我一个人买的礼物。',                    correct: false }, { text: '礼物已经不要了。',                      correct: false }], explain: '작은 = 小的 · 我们一起 준비하다' },
    { id: 'd46-l2-m5', audioKo: '한국어 좀 가르쳐 주세요.',                    choices: [{ text: '请教我一点韩语。',                correct: true }, { text: '不要教我韩语。',                      correct: false }, { text: '我教你韩语。',                          correct: false }, { text: '不学韩语了。',                          correct: false }], explain: '~아/어 주세요 请求' },
  ],

  cloze: [
    { id: 'd46-l2-c1', audioKo: '앞으로 매년 같이 있어 줄게.',    clozeParts: ['앞으로 매년 같이 있어 ', '.'],  choices: [{ text: '줄게',   correct: true }, { text: '줬어', correct: false }, { text: '주세요', correct: false }, { text: '있어',   correct: false }], explain: '承诺形 ~아/어 **줄게**' },
    { id: 'd46-l2-c2', audioKo: '생일 케이크를 사줬어요.',         clozeParts: ['생일 케이크를 ', '.'],           choices: [{ text: '사줬어요', correct: true }, { text: '사왔어요', correct: false }, { text: '사드렸어요', correct: false }, { text: '사고 있어요', correct: false }], explain: '사다 → 사 + **줬어요**（过去为对方做）' },
    { id: 'd46-l2-c3', audioKo: '한국어 좀 가르쳐 주세요.',        clozeParts: ['한국어 좀 가르쳐 ', '.'],       choices: [{ text: '주세요',   correct: true }, { text: '드리세요', correct: false }, { text: '있어요',  correct: false }, { text: '줍니다',   correct: false }], explain: '请求 · ~아/어 **주세요**' },
    { id: 'd46-l2-c4', audioKo: '엄마한테 편지를 써드렸어요.',      clozeParts: ['엄마한테 편지를 ', '.'],         choices: [{ text: '써드렸어요', correct: true }, { text: '써줬어요', correct: false }, { text: '써주셨어요', correct: false }, { text: '쓰셨어요', correct: false }], explain: '我给长辈 → **드리다**（对妈妈用 써드리다）' },
  ],

  reply: [
    { id: 'd46-l2-r1', audioKo: '하루야, 생일 축하해!',                    promptZh: '你想再补一句"以后每年都陪你"，最自然的一句？',                   choices: [{ text: '앞으로 매년 우리가 같이 있어 줄게.',                    correct: true }, { text: '앞으로 매년 안 만날 거야.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: 'Tori 原句 · ~아/어 줄게' },
    { id: 'd46-l2-r2', audioKo: '이건 처음이야. 진짜 고마워.',              promptZh: 'Haru 说这是第一次。你想温柔地问她"以前的生日怎么过的"，最自然的一句？', choices: [{ text: '전에는 생일 어떻게 보냈어?',                              correct: true }, { text: '전에는 생일이 없었어?',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어.',                                  correct: false }], explain: '关切追问 · Day 34 伏笔延续' },
    { id: 'd46-l2-r3', audioKo: '고마워, 얘들아. 어떻게 준비했어?',          promptZh: 'Haru 问你们怎么准备的。你想说"三个人偷偷准备的"，最自然的一句？',    choices: [{ text: '우리 셋이 몰래 준비해 줬어.',                          correct: true }, { text: '우리 셋이 몰래 준비 드렸어.',              correct: false }, { text: '우리 셋이 몰래 준비해 드렸어.',              correct: false }, { text: '얼마예요?',                              correct: false }], explain: '朋友之间 · ~아/어 줬어' },
  ],
};
