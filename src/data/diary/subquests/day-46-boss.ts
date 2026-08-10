import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 46 · 2-5 Boss 战 · 🎂 Haru 的生日 */
export const day46Boss: BossSubQuestData = {
  day: 16, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '생일의 관문',
  subtitle: '🎂 302 号门口 · 蜡烛第一次亮起',
  intro: '302 号门外你们三个人蹲在走廊上，Junho 双手护着蛋糕上的火苗，Minji 手机准备录视频。你按了门铃 —— Haru 开门，看到蜡烛，愣了三秒然后眼睛红了。"…이건 처음이야." 那三个字轻轻落下。Day 34 里她说"이 이야기는 나중에", 今晚的第一次好像帮她推开了那扇门一点点。要用韩语说完承诺、施惠、请求的每一句。',
  outroHook: 'Haru 吹灭蜡烛的时候许了一个愿。你没问是什么，她也没说。回房间之前她轻声："고마워, 진짜." 你合上日记本 —— Day 34 那句"이 이야기는 나중에" 好像离今天更近了。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd46-b5-t1', audioKo: '하루야, 생일 축하해!',                  choices: [{ text: 'Haru，生日快乐！',              correct: true }, { text: 'Haru，明天见。',                    correct: false }, { text: 'Haru，谢谢你。',                    correct: false }, { text: 'Haru，请稍等。',                    correct: false }], explain: '반말 生日祝福' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd46-b5-t2', audioKo: '이건 처음이야. 진짜 고마워.',            choices: [{ text: '这是第一次。真的谢谢。',        correct: true }, { text: '这不是第一次。',                    correct: false }, { text: '第一次真的不要。',                    correct: false }, { text: '不用谢谢。',                          correct: false }], explain: 'Haru 原句' } },
    { type: 'choice',  label: '施惠方向',     task: { id: 'd46-b5-t3', promptZh: '"给妈妈买了礼物"（长辈）哪句正确？',                                                                                                    choices: [{ text: '엄마한테 선물을 사줬어요.',              correct: false }, { text: '엄마한테 선물을 사드렸어요.',      correct: true }, { text: '엄마한테 선물을 사주셨어요.',           correct: false }, { text: '엄마한테서 선물을 사드렸어요.',          correct: false }], explain: '我给长辈 → **드리다**' } },
    { type: 'choice',  label: '承诺 vs 请求', task: { id: 'd46-b5-t4', promptZh: '"以后每年陪你"（对朋友的承诺）哪句正确？',                                                                                            choices: [{ text: '앞으로 매년 있을게.',                    correct: false }, { text: '앞으로 매년 있어 줄게.',           correct: true }, { text: '앞으로 매년 있어 드릴게.',            correct: false }, { text: '앞으로 매년 있어 봐요.',                correct: false }], explain: '朋友承诺 → ~아/어 줄게' } },
    { type: 'choice',  label: '认词',         task: { id: 'd46-b5-t5', promptKo: '처음', promptHangul: 'cheo-eum',                                                                                                    choices: [{ text: '第一次',              correct: true }, { text: '最后',              correct: false }, { text: '中间',              correct: false }, { text: '经常',                     correct: false }], explain: 'Haru 原句关键词' } },
    { type: 'compose', label: '组句',         task: { id: 'd46-b5-t6', zhHint: '以后每年都陪你。',                                                                                                                    audioKo: '앞으로 매년 우리가 같이 있어 줄게.',   answer: ['앞으로', '매년', '우리가', '같이', '있어 줄게.'],     tokens: ['앞으로', '매년', '우리가', '같이', '있어 줄게.', '있을게', '있어 드릴게', '있었어'],                explain: 'Tori 承诺' } },
    { type: 'compose', label: '组句',         task: { id: 'd46-b5-t7', zhHint: '请教我一点韩语。',                                                                                                                    audioKo: '한국어 좀 가르쳐 주세요.',              answer: ['한국어', '좀', '가르쳐', '주세요.'],                     tokens: ['한국어', '좀', '가르쳐', '주세요.', '가르쳐 드리세요', '가르쳐요', '가르치', '주셨어요'],           explain: '请求 · ~아/어 주세요' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd46-b5-t8', promptZh: 'Haru 说 "전에는 아무도 안 챙겨줬어"。你想温柔承诺"以后我们每年都为你准备"，最自然的一句？',                                        choices: [{ text: '이제 우리가 매년 챙겨 줄게.',            correct: true }, { text: '나도 안 챙길게.',                          correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어.',                                  correct: false }], explain: '~아/어 줄게 · 承诺替换过去' } },
  ],
};
