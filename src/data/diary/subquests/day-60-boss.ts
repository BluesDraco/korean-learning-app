import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 60 · 2-5 Boss 战 · 🎓 중급 졸업 · 5 분 자기 이야기 */
export const day60Boss: BossSubQuestData = {
  day: 30, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '중급의 관문',
  subtitle: '🎓 305 호 · 从 짐 到 집 · 60 日 收束',
  intro: '周五上午 10 点半。한빛어학당 305 호。中级班毕业典礼。你上台，站在讲桌前 —— Junho / Minji / Haru / Danielle 都在座位上抬头看你。手稿放在桌上，八遍改的痕迹重叠。深吸一口气。5 分钟自述开始 —— 从 Day 1 出发的雨夜，到 Day 30 초급 졸업，到今天。要用 ~았/었지만 说完从 짐 到 집 的收束。',
  outroHook: '"…저는 60일 전에 짐을 가져왔지만, 지금은 집이 있어요. 제 집은 이 교실입니다. 제 가족은 여기에 있어요. 감사합니다." 全场 3 秒沉默，然后掌声。Junho 打头、Minji、Haru、Danielle 一起。언어 학교 졸업 —— 하지만 兽尔의 이야기는 이제 시작이야.',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd60-b5-t1', audioKo: '60일 전에 짐을 가져왔지만, 지금은 집이 있어요.',   choices: [{ text: '60 天前带来了行李，现在有了家。',    correct: true }, { text: '60 天前没带行李。',                    correct: false }, { text: '60 天后要带行李回来。',                    correct: false }, { text: '现在没有家。',                          correct: false }], explain: 'Day 60 主题句 · 짐 → 집' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd60-b5-t2', audioKo: '제 집은 이 교실입니다. 제 가족은 여기에 있어요.',   choices: [{ text: '我的家是这间教室。我的家人在这里。', correct: true }, { text: '我的家里没有人。',                        correct: false }, { text: '教室外面没家人。',                          correct: false }, { text: '我要搬回家。',                          correct: false }], explain: 'Tori 重新定义家' } },
    { type: 'choice',  label: '过去转折',     task: { id: 'd60-b5-t3', promptZh: '"一开始难，但现在有意思"哪句正确？',                                                                                                        choices: [{ text: '처음엔 어렵지만 지금은 재밌어요.',            correct: false }, { text: '처음엔 어려웠지만 지금은 재밌어요.',   correct: true }, { text: '처음엔 어려운데 지금은 재밌어요.',           correct: false }, { text: '처음엔 어려워서 지금은 재밌어요.',              correct: false }], explain: '过去转折 · ~았/었지만' } },
    { type: 'choice',  label: '过去转折',     task: { id: 'd60-b5-t4', promptZh: '"虽然紧张但都说了"哪句正确？',                                                                                                            choices: [{ text: '떨리지만 다 말했어요.',                       correct: false }, { text: '떨렸지만 다 말했어요.',              correct: true }, { text: '떨려서 다 말했어요.',                       correct: false }, { text: '떨리면 다 말했어요.',                          correct: false }], explain: '떨리다 → 떨렸지만' } },
    { type: 'choice',  label: '认词',         task: { id: 'd60-b5-t5', promptKo: '헷갈리다', promptHangul: 'het-gal-li-da',                                                                                                  choices: [{ text: '搞混',              correct: true }, { text: '分辨',              correct: false }, { text: '认清',              correct: false }, { text: '想起',                     correct: false }], explain: 'Day 3 首犯 · Day 56 新生同犯' } },
    { type: 'compose', label: '组句',         task: { id: 'd60-b5-t6', zhHint: '虽然带来了行李，但现在有了家。',                                                                                                          audioKo: '짐을 가져왔지만 지금은 집이 있어요.',            answer: ['짐을', '가져왔지만', '지금은', '집이', '있어요.'],       tokens: ['짐을', '가져왔지만', '지금은', '집이', '있어요.', '가져와서', '가져오지만', '집이에요.', '가져오면'], explain: 'Tori 主题句 · ~았/었지만' } },
    { type: 'compose', label: '组句',         task: { id: 'd60-b5-t7', zhHint: '我的家是这间教室。我的家人在这里。',                                                                                                    audioKo: '제 집은 이 교실입니다. 제 가족은 여기에 있어요.',  answer: ['제', '집은', '이', '교실입니다.', '제', '가족은', '여기에', '있어요.'], tokens: ['제', '집은', '이', '교실입니다.', '제', '가족은', '여기에', '있어요.', '교실이에요.', '가족이', '거기에', '없어요.'], explain: 'Tori 重新定义家' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd60-b5-t8', promptZh: 'Junho 冲上来说 "토리, 진짜 축하해!"。你想说"这 60 天你们就是我的家人"，最自然的一句？',                                                    choices: [{ text: '이 60일, 너희가 내 가족이었어. 진심으로 고마워.',                    correct: true }, { text: '이제 다 끝났어. 잘 가.',                    correct: false }, { text: '나 대학 안 갈래.',                          correct: false }, { text: '얼마예요?',                              correct: false }], explain: 'Tori 原句 · 家人重新定义' } },
  ],
};
