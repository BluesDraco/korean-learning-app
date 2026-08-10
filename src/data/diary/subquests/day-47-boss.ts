import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 47 · 2-5 Boss 战 · 📞 엄마의 한국어 */
export const day47Boss: BossSubQuestData = {
  day: 17, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '통화의 관문',
  subtitle: '📞 深夜视频 · "용기 내"',
  intro: '晚上 10 点半，屏幕两端 —— 一头是首尔的宿舍，一头是妈妈厨房里那盏暖黄灯。屏幕晃了两下，妈妈的脸出现："闺女，睡了没？" 你摇头。眼泪先掉下来。妈妈笑说别哭 —— 然后她轻轻用韩语说："용기 내." 你愣住。那是 Day 1 你教她的一句，被记住到了 47 天后的今天。今晚要用韩语转述发生过的每一件事。',
  outroHook: '挂电话前妈妈又说了一遍 "용기 내"，然后中文补一句："别忘了闺女你才是那个教妈妈的人。" 你把这段通话存到收藏夹，标题写了一行 —— 「엄마도 나에게서 배웠어」。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd47-b5-t1', audioKo: '용기 내.',                           choices: [{ text: '要有勇气。',              correct: true }, { text: '不要哭。',                    correct: false }, { text: '振作起来。',                  correct: false }, { text: '别哭了。',                    correct: false }], explain: '妈妈那句韩语 · Day 1 铺垫' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd47-b5-t2', audioKo: '엄마가 그 말을 기억하셨어요.',      choices: [{ text: '妈妈记住了那句话。',      correct: true }, { text: '妈妈忘了那句话。',              correct: false }, { text: '妈妈教我那句话。',              correct: false }, { text: '妈妈不听那句话。',              correct: false }], explain: '기억하다 敬语过去' } },
    { type: 'choice',  label: '词性接法',     task: { id: 'd47-b5-t3', promptZh: '"Junho 说发音好"哪句正确？',                                                                                                          choices: [{ text: '준호가 발음이 좋는다고 했어요.',    correct: false }, { text: '준호가 발음이 좋다고 했어요.',    correct: true }, { text: '준호가 발음이 좋았다고 하다.',        correct: false }, { text: '준호가 발음을 좋다고 했어요.',              correct: false }], explain: '형용사 → 다고（不加는）' } },
    { type: 'choice',  label: '命令引用',     task: { id: 'd47-b5-t4', promptZh: '"妈妈说要有勇气"（命令引用）哪句正确？',                                                                                                choices: [{ text: '엄마가 용기 낸다고 하셨어요.',       correct: false }, { text: '엄마가 용기 내라고 하셨어요.',    correct: true }, { text: '엄마가 용기 내다고 하셨어요.',        correct: false }, { text: '엄마가 용기 내고 하셨어요.',              correct: false }], explain: '命令引用 → **~(으)라고 하다**' } },
    { type: 'choice',  label: '认词',         task: { id: 'd47-b5-t5', promptKo: '기억하다', promptHangul: 'gi-eok-a-da',                                                                                                choices: [{ text: '记住',              correct: true }, { text: '忘记',              correct: false }, { text: '记录',              correct: false }, { text: '追忆',                     correct: false }], explain: '记忆(기억) + 하다' } },
    { type: 'compose', label: '组句',         task: { id: 'd47-b5-t6', zhHint: 'Haru 说记忆会留下。',                                                                                                                  audioKo: '하루가 기억은 남는다고 했어요.',      answer: ['하루가', '기억은', '남는다고', '했어요.'],           tokens: ['하루가', '기억은', '남는다고', '했어요.', '남았다고', '남아요', '남는다', '기억이'],                     explain: '动词有收音 → 는다고' } },
    { type: 'compose', label: '组句',         task: { id: 'd47-b5-t7', zhHint: '妈妈说要有勇气。',                                                                                                                    audioKo: '엄마가 용기 내라고 하셨어요.',         answer: ['엄마가', '용기', '내라고', '하셨어요.'],              tokens: ['엄마가', '용기', '내라고', '하셨어요.', '낸다고', '내고', '내다고', '내세요'],                             explain: '命令引用 · ~(으)라고 하다' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd47-b5-t8', promptZh: '妈妈突然用韩语说 "용기 내"。你惊喜又想温柔夸她，最自然的一句？',                                                                    choices: [{ text: '엄마가 발음도 잘하시네요.',            correct: true }, { text: '엄마 발음이 이상해요.',                    correct: false }, { text: '엄마도 한국 사람이에요?',                  correct: false }, { text: '얼마예요?',                              correct: false }], explain: '~시네요 敬语感叹' } },
  ],
};
