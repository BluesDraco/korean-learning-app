import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 41 · 2-2 귀 트이기 · ~기 위해서 目的 · N + 을/를 위해서 */
export const day41Listen: ListenSubQuestData = {
  day: 11, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '深夜书桌 · 每一个"为了"',

  meaning: [
    { id: 'd41-l2-m1', audioKo: '훠궈 문화를 소개하기 위해서 자료를 찾아요.',    choices: [{ text: '为了介绍火锅文化在找资料。',      correct: true }, { text: '介绍火锅文化时不用资料。',              correct: false }, { text: '收集了火锅文化资料。',              correct: false }, { text: '火锅文化没有资料。',              correct: false }], explain: '소개하다 → 소개하기 위해서 · 목적 + 행동' },
    { id: 'd41-l2-m2', audioKo: '한국어를 배우기 위해서 한국에 왔어요.',            choices: [{ text: '为了学韩语来到韩国。',           correct: true }, { text: '来韩国之后才开始学。',                    correct: false }, { text: '在韩国时学习韩语。',                      correct: false }, { text: '韩国人学韩语。',                          correct: false }], explain: '留学生自我介绍固定句 · 배우기 위해서' },
    { id: 'd41-l2-m3', audioKo: '가족을 위해서 열심히 일해요.',                     choices: [{ text: '为了家人努力工作。',             correct: true }, { text: '家人不让我工作。',                        correct: false }, { text: '和家人一起工作。',                        correct: false }, { text: '为家人做的工作。',                        correct: false }], explain: '名词 + 을/를 위해서' },
    { id: 'd41-l2-m4', audioKo: '오늘 발표 주제는 훠궈예요.',                      choices: [{ text: '今天发表主题是火锅。',           correct: true }, { text: '今天讨论火锅料理。',                      correct: false }, { text: '火锅是今天的重点。',                      correct: false }, { text: '今天没有主题。',                          correct: false }], explain: '주제 = 主题 · 발표 词汇' },
    { id: 'd41-l2-m5', audioKo: '훠궈와 KPOP의 공통점은 "함께"예요.',              choices: [{ text: '火锅和 KPOP 的共同点是"一起"。', correct: true }, { text: '火锅和 KPOP 完全不同。',                  correct: false }, { text: 'KPOP 让火锅更好吃。',                     correct: false }, { text: '火锅不属于 KPOP。',                        correct: false }], explain: '공통점 = 共同点 · 함께 = 一起' },
  ],

  cloze: [
    { id: 'd41-l2-c1', audioKo: '소개하기 위해서 자료를 찾아요.',       clozeParts: ['소개하', ' 위해서 자료를 찾아요.'],   choices: [{ text: '기',   correct: true }, { text: '을',   correct: false }, { text: '는',   correct: false }, { text: '려',   correct: false }], explain: '动词 + **기** 위해서' },
    { id: 'd41-l2-c2', audioKo: '가족을 위해서 일해요.',                  clozeParts: ['가족', ' 위해서 일해요.'],             choices: [{ text: '을',   correct: true }, { text: '기',   correct: false }, { text: '이',   correct: false }, { text: '의',   correct: false }], explain: '名词 + **을/를** 위해서 · 가족 有收音 → 을' },
    { id: 'd41-l2-c3', audioKo: '한국어를 배우기 위해서 왔어요.',          clozeParts: ['한국어를 ', ' 위해서 왔어요.'],       choices: [{ text: '배우기', correct: true }, { text: '배웠기', correct: false }, { text: '배우니', correct: false }, { text: '배워기', correct: false }], explain: '动词原形 배우다 → **배우기** + 위해서' },
    { id: 'd41-l2-c4', audioKo: '건강을 위해서 매일 운동해요.',            clozeParts: ['건강', ' 위해서 매일 운동해요.'],   choices: [{ text: '을',   correct: true }, { text: '이',   correct: false }, { text: '기',   correct: false }, { text: '에',   correct: false }], explain: '건강 有收音 ㅇ → **을 위해서**' },
  ],

  reply: [
    { id: 'd41-l2-r1', audioKo: '발표 준비 잘 돼가?',                    promptZh: 'Junho 问你发表准备如何。你想说找到了共同点，最自然的一句？', choices: [{ text: '응, 훠궈랑 KPOP의 공통점을 찾았어.',            correct: true }, { text: '아니, 준비 안 했어.',                    correct: false }, { text: '얼마예요?',                       correct: false }, { text: '몰라, 저리 가.',                  correct: false }], explain: 'Tori 原句 · 找到共同点的自信' },
    { id: 'd41-l2-r2', audioKo: '왜 한국에 왔어요?',                     promptZh: '有人问你为什么来韩国。你想说"为了学韩语"，最自然的一句？',      choices: [{ text: '한국어를 배우기 위해서 왔어요.',                correct: true }, { text: '한국어를 배웠어서 왔어요.',                correct: false }, { text: '한국어 위해서 왔어요.',                    correct: false }, { text: '한국어를 배우니까 왔어요.',                  correct: false }], explain: '동사 + 기 위해서 · 목적' },
    { id: 'd41-l2-r3', audioKo: '공통점이 뭐야?',                         promptZh: 'Junho 问共同点是什么。你想用一个词概括，最自然的一句？',        choices: [{ text: '"함께"야. 같이 먹고 같이 응원하는 거.',        correct: true }, { text: '아직 몰라.',                              correct: false }, { text: '훠궈가 더 매워.',                          correct: false }, { text: '얼마예요?',                          correct: false }], explain: 'Tori 原句 · 함께 是灵魂词' },
  ],
};
