import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 54 · 2-5 Boss 战 · 💵 동물문 시장 · 讨价还价 */
export const day54Boss: BossSubQuestData = {
  day: 24, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '흥정의 관문',
  subtitle: '💵 从 25000 砍到 20000',
  intro: '동물문 시장 A 동 3 층，一件橘色外套。獾店主报价 25,000。Minji 在旁边挤挤眼睛示意"砍！" 你深吸一口气 —— "조금만 깎아주세요. 학생이에요." 讨价还价的韩语要柔而不僵、诚而不装。今天要用 ~아/어 주세요 + 조금만 + 봐주세요 打完这一仗。',
  outroHook: '獾店主哎一声："학생 성공." 你掏出 20,000 现金递过去，Minji 竖大拇指嘴型说"완벽." 外套穿身上出门 —— 兽尔的味道，又多了一层。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd54-b5-t1', audioKo: '조금만 깎아주세요. 학생이에요.',           choices: [{ text: '便宜一点吧。我是学生。',        correct: true }, { text: '不要砍价。',                          correct: false }, { text: '学生不能买。',                        correct: false }, { text: '价格已经很便宜。',                    correct: false }], explain: 'Tori 讨价起手式' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd54-b5-t2', audioKo: '20,000원 딱 있어요. 진짜 좀만 봐주세요.',   choices: [{ text: '就 20000 元。真的照顾一下。',    correct: true }, { text: '20000 元不够。',                      correct: false }, { text: '20000 元太多了。',                    correct: false }, { text: '不带现金。',                          correct: false }], explain: 'Tori 求情 · 봐주세요' } },
    { type: 'choice',  label: '方向判定',     task: { id: 'd54-b5-t3', promptZh: '"我给妈妈写了信"哪句正确？',                                                                                                              choices: [{ text: '엄마한테 편지를 써 주셨어요.',                  correct: false }, { text: '엄마한테 편지를 써 드렸어요.',       correct: true }, { text: '엄마한테 편지를 써 줬어요.',              correct: false }, { text: '엄마한테서 편지를 써 드렸어요.',           correct: false }], explain: '我给长辈 → 드리다' } },
    { type: 'choice',  label: '请求方向',     task: { id: 'd54-b5-t4', promptZh: '"请教我一点韩语"哪句正确？',                                                                                                              choices: [{ text: '한국어 좀 가르쳐 드리세요.',                    correct: false }, { text: '한국어 좀 가르쳐 주세요.',             correct: true }, { text: '한국어 좀 가르치 주세요.',              correct: false }, { text: '한국어 좀 가르쳐요.',                       correct: false }], explain: '请对方为我做 → 주세요（不是 드리세요）' } },
    { type: 'choice',  label: '认词',         task: { id: 'd54-b5-t5', promptKo: '봐주다', promptHangul: 'bwa-ju-da',                                                                                                     choices: [{ text: '照顾 / 通融',              correct: true }, { text: '看着',              correct: false }, { text: '监督',              correct: false }, { text: '试戴',                     correct: false }], explain: '~아/어 주다 引申' } },
    { type: 'compose', label: '组句',         task: { id: 'd54-b5-t6', zhHint: '便宜一点吧。我是学生。',                                                                                                                  audioKo: '조금만 깎아주세요. 학생이에요.',              answer: ['조금만', '깎아주세요.', '학생이에요.'],                  tokens: ['조금만', '깎아주세요.', '학생이에요.', '깎으세요.', '깎아 드리세요.', '깎아 있어요.', '학생이니까'],   explain: '讨价起手式' } },
    { type: 'compose', label: '组句',         task: { id: 'd54-b5-t7', zhHint: '就 20000 元。真的照顾一下。',                                                                                                              audioKo: '20,000원 딱 있어요. 진짜 좀만 봐주세요.',      answer: ['20,000원', '딱', '있어요.', '진짜', '좀만', '봐주세요.'], tokens: ['20,000원', '딱', '있어요.', '진짜', '좀만', '봐주세요.', '봐 드리세요.', '봐요.', '봐 있어요.'],       explain: '봐주다 = 照顾' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd54-b5-t8', promptZh: '獾店主答应 20000 卖了。你想道谢并承诺"我会好好穿的"，最自然的一句？',                                                                    choices: [{ text: '감사합니다! 잘 입을게요.',                    correct: true }, { text: '아, 안 살래요.',                          correct: false }, { text: '더 깎아주세요.',                          correct: false }, { text: '얼마예요?',                              correct: false }], explain: 'Tori 原句 · 收下让步 + ~ㄹ게요' } },
  ],
};
