import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 41 · 2-5 Boss 战 · 📝 発表 준비 */
export const day41Boss: BossSubQuestData = {
  day: 11, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '준비의 관문',
  subtitle: '📝 「함께의 맛」发表准备',
  intro: '凌晨两点。窗外雨还在下，桌上一袋妈妈寄来的火锅底料，屏幕上一份 PPT。你翻遍搜索引擎查韩语单词，一遍遍改标题，最后落在四个字："함께의 맛"。明天讲台见 —— 但今晚要先用韩语把"为了"和"共同点"说清楚。',
  outroHook: 'PPT 保存完毕。你合上电脑，把火锅底料塞进包里明天带去教室当道具。躺下之前发消息给 Junho："내일 잘 부탁해." 三秒后他回："화이팅!" 眼皮沉下来的时候你想 —— 好像已经不那么怕上台了。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd41-b5-t1', audioKo: '훠궈 문화를 소개하기 위해서 자료를 찾아요.', choices: [{ text: '为了介绍火锅文化在找资料。',      correct: true }, { text: '介绍火锅文化时不用资料。',              correct: false }, { text: '收集了火锅文化资料。',              correct: false }, { text: '火锅文化没有资料。',              correct: false }], explain: '동사 + 기 위해서' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd41-b5-t2', audioKo: '훠궈와 KPOP의 공통점은 "함께"예요.',      choices: [{ text: '火锅和 KPOP 的共同点是"一起"。', correct: true }, { text: '火锅和 KPOP 完全不同。',                  correct: false }, { text: 'KPOP 让火锅更好吃。',                      correct: false }, { text: '火锅不属于 KPOP。',                        correct: false }], explain: '공통점 = 共同点' } },
    { type: 'choice',  label: '动名词化',      task: { id: 'd41-b5-t3', promptZh: '"为了介绍"哪句正确？',                                                                                                              choices: [{ text: '소개할 위해서',                        correct: false }, { text: '소개하기 위해서',                correct: true }, { text: '소개하는 위해서',                    correct: false }, { text: '소개하고 위해서',                      correct: false }], explain: '动词 + **기** 위해서' } },
    { type: 'choice',  label: '名词助词',      task: { id: 'd41-b5-t4', promptZh: '"为了家人"哪句正确？',                                                                                                              choices: [{ text: '가족기 위해서',                          correct: false }, { text: '가족을 위해서',                  correct: true }, { text: '가족의 위해서',                       correct: false }, { text: '가족 위해서',                          correct: false }], explain: '名词 + **을/를** 위해서' } },
    { type: 'choice',  label: '认词',         task: { id: 'd41-b5-t5', promptKo: '공통점', promptHangul: 'gong-tong-jjeom',                                                                                            choices: [{ text: '共同点',                    correct: true }, { text: '不同点',              correct: false }, { text: '重点',                  correct: false }, { text: '缺点',                     correct: false }], explain: '공통(共同) + 점(点)' } },
    { type: 'compose', label: '组句',         task: { id: 'd41-b5-t6', zhHint: '为了介绍火锅文化在找资料。',                                                                                                          audioKo: '훠궈 문화를 소개하기 위해서 자료를 찾아요.', answer: ['훠궈 문화를', '소개하기 위해서', '자료를', '찾아요.'], tokens: ['훠궈 문화를', '소개하기 위해서', '자료를', '찾아요.', '소개할 위해서', '소개하려고', '찾았어요.'], explain: '동사 + 기 위해서' } },
    { type: 'compose', label: '组句',         task: { id: 'd41-b5-t7', zhHint: '为了健康每天运动。',                                                                                                                audioKo: '건강을 위해서 매일 운동해요.',                answer: ['건강을 위해서', '매일', '운동해요.'],                    tokens: ['건강을 위해서', '매일', '운동해요.', '건강기 위해서', '건강의 위해서', '건강 위해서', '운동했어요.'], explain: '名词 + 을 위해서' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd41-b5-t8', promptZh: 'Junho 问 "공통점이 뭐야?"。你想用一个词概括，最自然的一句？',                                                                    choices: [{ text: '"함께"야. 같이 먹고 같이 응원하는 거.', correct: true }, { text: '아직 몰라.',                     correct: false }, { text: '훠궈가 더 매워.',                    correct: false }, { text: '얼마예요?',                          correct: false }], explain: '함께 是灵魂词' } },
  ],
};
