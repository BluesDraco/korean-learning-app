import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 39 · 2-5 Boss 战 · 📖 한글날 · 世宗大王的礼物 */
export const day39Boss: BossSubQuestData = {
  day: 9, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '한글의 관문',
  subtitle: '📖 원래 每个字母都是一张脸',
  intro: '教室黑板上贴着一张古画：世宗大王弯着腰在纸上写字。老师指着 ㄱ 说 "이건 혀가 목구멍을 막는 모양이에요"。你愣住 —— 原来这 30 天写的每一个字母，都是一张脸的一部分。今天要用 ~는 것 같아요 柔和地说出你的观察和感受。',
  outroHook: '下课铃响。你走出教室，背包里那本练习册 30 天的每一页字母，突然变得不太一样了。它们不是符号 —— 它们是舌头、嘴唇、牙齿、喉咙的形状。',

  tasks: [
    { type: 'choice',  label: '听句选意',    task: { id: 'd39-b5-t1', audioKo: '한글이 진짜 과학적인 것 같아요.',   choices: [{ text: '韩文真的好像很科学呢。',    correct: true }, { text: '韩文一定是科学的。',            correct: false }, { text: '韩文其实不科学。',              correct: false }, { text: '韩文和科学没关系。',              correct: false }], explain: 'Tori 原句 · 名词/이다 → 인 것 같아요' } },
    { type: 'choice',  label: '听句选意',    task: { id: 'd39-b5-t2', audioKo: '세계에서 유일하게 생일이 있는 글자예요.', choices: [{ text: '世界上唯一有生日的文字。',   correct: true }, { text: '世界上最古老的文字。',            correct: false }, { text: '生日在世界的一种文字。',            correct: false }, { text: '文字里没有生日。',                    correct: false }], explain: '유일하게 = 唯一' } },
    { type: 'choice',  label: '词性接法',    task: { id: 'd39-b5-t3', promptZh: '"好像在下雨"哪句正确？',                                                                                                              choices: [{ text: '비가 오은 것 같아요.',            correct: false }, { text: '비가 오는 것 같아요.',       correct: true }, { text: '비가 온 것 같아요.',            correct: false }, { text: '비가 온다는 것 같아요.',            correct: false }], explain: '动词现在 → 는 것 같아요' } },
    { type: 'choice',  label: '词性接法',    task: { id: 'd39-b5-t4', promptZh: '"Junho 好像是 KPOP 粉丝"哪句正确？',                                                                                                  choices: [{ text: '준호는 팬 것 같아요.',              correct: false }, { text: '준호는 팬인 것 같아요.',      correct: true }, { text: '준호는 팬는 것 같아요.',           correct: false }, { text: '준호는 팬이 것 같아요.',              correct: false }], explain: '名词 + 인 것 같아요' } },
    { type: 'choice',  label: '认词',        task: { id: 'd39-b5-t5', promptKo: '유일하다',  promptHangul: 'yu-il-ha-da',                                                                                              choices: [{ text: '唯一',                    correct: true }, { text: '普通',            correct: false }, { text: '很多',              correct: false }, { text: '相同',                     correct: false }], explain: '唯(유) + 一(일)' } },
    { type: 'compose', label: '组句',        task: { id: 'd39-b5-t6', zhHint: '韩文好像很科学。',                                                                                                                     audioKo: '한글이 진짜 과학적인 것 같아요.',       answer: ['한글이', '진짜', '과학적인', '것 같아요.'],           tokens: ['한글이', '진짜', '과학적인', '것 같아요.', '과학적', '과학적는', '과학적이', '것 있어요.'],  explain: '名词/이다 → 인 것 같아요' } },
    { type: 'compose', label: '组句',        task: { id: 'd39-b5-t7', zhHint: '感觉比想象中更美。',                                                                                                                   audioKo: '생각보다 더 아름다운 것 같아요.',        answer: ['생각보다', '더', '아름다운', '것 같아요.'],           tokens: ['생각보다', '더', '아름다운', '것 같아요.', '아름답는', '아름다워', '아름답다', '것 있어요.'],  explain: '아름답다 ㅂ 不规则 → 아름다운' } },
    { type: 'choice',  label: '情景选回应',  task: { id: 'd39-b5-t8', promptZh: '火鹤老师问 "한글, 어때요?"。你想柔和地说"感觉比想象中更美"，最自然的一句？',                                                        choices: [{ text: '생각보다 더 아름다운 것 같아요.',    correct: true }, { text: '한글은 이상해요.',                    correct: false }, { text: '한글을 만들었어요.',                    correct: false }, { text: '얼마예요?',                          correct: false }], explain: '~ㄴ 것 같아요 表柔和推测' } },
  ],
};
