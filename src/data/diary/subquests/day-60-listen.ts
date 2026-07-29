import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 60 · 2-2 귀 트이기 · ~았/었지만 结局体 · 짐 → 집 收束 */
export const day60Listen: ListenSubQuestData = {
  day: 30, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '305 号教室 · 中级毕业 · 5 分钟自述',

  meaning: [
    { id: 'd60-l2-m1', audioKo: '60일 전에 짐을 가져왔지만, 지금은 집이 있어요.', choices: [{ text: '60 天前带来了行李，现在有了家。',    correct: true }, { text: '60 天前没带行李。',                    correct: false }, { text: '60 天后要带行李回来。',                    correct: false }, { text: '现在没有家。',                          correct: false }], explain: 'Day 60 主题句 · 짐 → 집 收束' },
    { id: 'd60-l2-m2', audioKo: '제 집은 이 교실입니다. 제 가족은 여기에 있어요.', choices: [{ text: '我的家是这间教室。我的家人在这里。', correct: true }, { text: '我的家里没有人。',                        correct: false }, { text: '教室外面没家人。',                          correct: false }, { text: '我要搬回家。',                          correct: false }], explain: '重新定义家 · 家 = 教室 + 朋友' },
    { id: 'd60-l2-m3', audioKo: '토리 학생, 중급반 졸업. 대학 입학 준비반으로 올라가세요.', choices: [{ text: '兔莉，中级班毕业。请升到大学入学准备班。', correct: true }, { text: '兔莉，重修中级班。',                    correct: false }, { text: '兔莉，退学。',                          correct: false }, { text: '兔莉，不用去大学。',                    correct: false }], explain: '火鹤老师宣布 · 대학 입학 준비반' },
    { id: 'd60-l2-m4', audioKo: '언어 학교 졸업. 근데 이 이야기는 이제 시작이야.',       choices: [{ text: '语言学校毕业。但这个故事现在才开始。', correct: true }, { text: '语言学校已经关门。',                    correct: false }, { text: '这个故事结束了。',                        correct: false }, { text: '不用再学韩语。',                        correct: false }], explain: 'Tori 内心 · 故事继续' },
    { id: 'd60-l2-m5', audioKo: '처음엔 어려웠지만 지금은 재밌어요.',                   choices: [{ text: '一开始难，但现在有意思。',            correct: true }, { text: '一直很难。',                            correct: false }, { text: '现在还难。',                              correct: false }, { text: '不难过。',                              correct: false }], explain: '~았/었지만 结局体' },
  ],

  cloze: [
    { id: 'd60-l2-c1', audioKo: '짐을 가져왔지만 지금은 집이 있어요.',   clozeParts: ['짐을 ', ' 지금은 집이 있어요.'],   choices: [{ text: '가져왔지만', correct: true }, { text: '가져와서', correct: false }, { text: '가져오지만', correct: false }, { text: '가져오면', correct: false }], explain: '过去 + ~지만 = ~았/었지만' },
    { id: 'd60-l2-c2', audioKo: '처음엔 어려웠지만 지금은 재밌어요.',      clozeParts: ['처음엔 ', ' 지금은 재밌어요.'],     choices: [{ text: '어려웠지만', correct: true }, { text: '어렵지만',   correct: false }, { text: '어려운데', correct: false }, { text: '어려워서', correct: false }], explain: '过去回顾 · ~았/었지만' },
    { id: 'd60-l2-c3', audioKo: '떨렸지만 다 말했어요.',                    clozeParts: ['', ' 다 말했어요.'],               choices: [{ text: '떨렸지만',   correct: true }, { text: '떨리지만',   correct: false }, { text: '떨려서',   correct: false }, { text: '떨리면',   correct: false }], explain: '떨리다 → 떨렸지만' },
    { id: 'd60-l2-c4', audioKo: '한국말이 서툴렀지만 마음은 통했어요.',      clozeParts: ['한국말이 ', ' 마음은 통했어요.'],   choices: [{ text: '서툴렀지만', correct: true }, { text: '서투르지만', correct: false }, { text: '서툴러서', correct: false }, { text: '서툴면',   correct: false }], explain: '서투르다 르 不规则 → 서툴렀지만' },
  ],

  reply: [
    { id: 'd60-l2-r1', audioKo: '토리 학생, 중급반 졸업. 대학 입학 준비반으로 올라가세요.', promptZh: '火鹤老师宣布毕业。你想温柔感谢并承诺继续，最自然的一句？', choices: [{ text: '감사합니다. 계속 열심히 하겠습니다.',                              correct: true }, { text: '아니에요, 저 안 갈래요.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '正式感谢 + ~겠습니다 承诺' },
    { id: 'd60-l2-r2', audioKo: '토리, 진짜 축하해!',                                    promptZh: 'Junho 冲上来祝贺。你想说"这 60 天，你们就是我的家人"，最自然的一句？', choices: [{ text: '이 60일, 너희가 내 가족이었어. 진심으로 고마워.',                    correct: true }, { text: '이제 다 끝났어. 잘 가.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: 'Tori 原句 · 家人重新定义' },
    { id: 'd60-l2-r3', audioKo: '언어 학교 다 끝났어. 이제 뭐 할래?',                     promptZh: '朋友问毕业了打算做什么。你想说"这个故事现在才开始"，最自然的一句？',           choices: [{ text: '이 이야기는 이제 시작이야.',                                    correct: true }, { text: '이제 다 끝났어.',                          correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: 'Tori 内心 · 故事才开始' },
  ],
};
