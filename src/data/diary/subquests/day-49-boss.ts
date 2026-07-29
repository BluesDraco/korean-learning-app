import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 49 · 2-5 Boss 战 · 🕊 화해 */
export const day49Boss: BossSubQuestData = {
  day: 19, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '화해의 관문',
  subtitle: '🕊 教室后排 · 用韩语说真心话',
  intro: 'Minji 和 Junho 冷战三天，中级班的气氛压得人喘不过来。放学后你把两个人拉到教室后排。你不是那只只会看词典的兔子了 —— 30 天前你连点单都要翻词典，50 天后你要用韩语调解朋友的冷战。今晚要用 ~아/어야 돼 说完 "既然是朋友就应该互相道歉" 这句话。',
  outroHook: '三个人在教室后排抱成一团。Haru 在门口探头，默默拿出手机拍了张照。回宿舍的路上你想 —— 我，终于不只是"被照顾的那只兔子"了。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd49-b5-t1', audioKo: '친구니까 서로 사과해야 돼.',           choices: [{ text: '既然是朋友就应该互相道歉。',    correct: true }, { text: '朋友不能道歉。',                    correct: false }, { text: '不用道歉。',                          correct: false }, { text: '别当朋友了。',                        correct: false }], explain: 'Tori 调解原句' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd49-b5-t2', audioKo: '진심으로 미안해.',                       choices: [{ text: '真心抱歉。',                       correct: true }, { text: '不好意思迟到了。',                  correct: false }, { text: '我不知道。',                          correct: false }, { text: '没事了。',                            correct: false }], explain: '진심으로 = 真心地' } },
    { type: 'choice',  label: '变位',         task: { id: 'd49-b5-t3', promptZh: '"应该互相道歉"哪句正确？',                                                                                                            choices: [{ text: '서로 사과하야 돼.',                    correct: false }, { text: '서로 사과해야 돼.',                correct: true }, { text: '서로 사과하아 돼.',                     correct: false }, { text: '서로 사과하고 돼.',                     correct: false }], explain: '하다 → **해**야 돼' } },
    { type: 'choice',  label: '拼写',         task: { id: 'd49-b5-t4', promptZh: '"现在该睡了"哪句拼写正确？',                                                                                                          choices: [{ text: '지금 자야 되요.',                     correct: false }, { text: '지금 자야 돼요.',                   correct: true }, { text: '지금 자아야 돼요.',                    correct: false }, { text: '지금 잠야 돼요.',                        correct: false }], explain: '돼요（不是 되요）· 자다 → 자야' } },
    { type: 'choice',  label: '认词',         task: { id: 'd49-b5-t5', promptKo: '자랑스럽다', promptHangul: 'ja-rang-seu-reop-da',                                                                                     choices: [{ text: '骄傲 / 值得自豪',              correct: true }, { text: '难过',              correct: false }, { text: '生气',              correct: false }, { text: '羡慕',                     correct: false }], explain: 'ㅂ 不规则 · 자랑스러워요' } },
    { type: 'compose', label: '组句',         task: { id: 'd49-b5-t6', zhHint: '既然是朋友就应该互相道歉。',                                                                                                          audioKo: '친구니까 서로 사과해야 돼.',                answer: ['친구니까', '서로', '사과해야', '돼.'],                   tokens: ['친구니까', '서로', '사과해야', '돼.', '사과하고', '사과할래', '사과하야', '사과했어'],                     explain: 'Tori 调解原句' } },
    { type: 'compose', label: '组句',         task: { id: 'd49-b5-t7', zhHint: '想说好韩语就得每天练。',                                                                                                                audioKo: '한국어를 잘하려면 매일 연습해야 돼요.',      answer: ['한국어를', '잘하려면', '매일', '연습해야', '돼요.'],   tokens: ['한국어를', '잘하려면', '매일', '연습해야', '돼요.', '잘하면', '연습해서', '연습하야', '한국어가'],           explain: '~려면 + ~아/어야 돼요' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd49-b5-t8', promptZh: 'Minji 和 Junho 抱在一起道歉。你想真心夸他们，最自然的一句？',                                                                        choices: [{ text: '너희 둘이 진짜 자랑스러워.',                correct: true }, { text: '아직 다 끝난 게 아니야.',                  correct: false }, { text: '이제 나가.',                              correct: false }, { text: '얼마예요?',                              correct: false }], explain: 'Tori 原句 · 真心夸奖' } },
  ],
};
