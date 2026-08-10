import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 47 · 2-2 귀 트이기 · ~다고 하다 간접인용 */
export const day47Listen: ListenSubQuestData = {
  day: 17, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '深夜视频 · 妈妈的一句韩语',

  meaning: [
    { id: 'd47-l2-m1', audioKo: '용기 내.',                                     choices: [{ text: '要有勇气。',                       correct: true }, { text: '不要害怕。',                          correct: false }, { text: '振作起来。',                          correct: false }, { text: '别哭了。',                            correct: false }], explain: '妈妈 · Day 1 胡萝卜上的两个字' },
    { id: 'd47-l2-m2', audioKo: '엄마가 그 말을 기억하셨어요.',                 choices: [{ text: '妈妈记住了那句话。',              correct: true }, { text: '妈妈忘了那句话。',                    correct: false }, { text: '妈妈教我那句话。',                    correct: false }, { text: '妈妈不听那句话。',                    correct: false }], explain: '기억하다 → 기억하셨어요（敬语过去）' },
    { id: 'd47-l2-m3', audioKo: '엄마가 발음도 잘하시네요.',                    choices: [{ text: '妈妈发音也不错呢。',              correct: true }, { text: '妈妈发音不好。',                      correct: false }, { text: '妈妈没在练发音。',                    correct: false }, { text: '妈妈发音很快。',                      correct: false }], explain: '~시네요 敬语感叹 · Tori 夸妈妈' },
    { id: 'd47-l2-m4', audioKo: '하루가 기억은 남는다고 했어요.',                choices: [{ text: 'Haru 说记忆会留下。',              correct: true }, { text: 'Haru 说没有记忆。',                    correct: false }, { text: 'Haru 忘记了记忆。',                    correct: false }, { text: 'Haru 让我记住。',                      correct: false }], explain: '간접인용 · 동사 + 는다고' },
    { id: 'd47-l2-m5', audioKo: '엄마가 용기 내라고 하셨어요.',                   choices: [{ text: '妈妈说要有勇气。',                correct: true }, { text: '妈妈说没有勇气。',                    correct: false }, { text: '妈妈没让我说话。',                    correct: false }, { text: '妈妈教我勇气。',                      correct: false }], explain: '명령 인용 · ~(으)라고 하다' },
  ],

  cloze: [
    { id: 'd47-l2-c1', audioKo: '기억은 남는다고 했어요.',    clozeParts: ['기억은 ', ' 했어요.'],       choices: [{ text: '남는다고', correct: true }, { text: '남다고', correct: false }, { text: '남았다고', correct: false }, { text: '남고',   correct: false }], explain: '动词现在有收音 → **는다고**' },
    { id: 'd47-l2-c2', audioKo: '발음이 좋다고 했어요.',        clozeParts: ['발음이 ', ' 했어요.'],         choices: [{ text: '좋다고',   correct: true }, { text: '좋는다고', correct: false }, { text: '좋고',   correct: false }, { text: '좋라고',   correct: false }], explain: '형용사 → **다고**' },
    { id: 'd47-l2-c3', audioKo: '학생이라고 했어요.',           clozeParts: ['', ' 했어요.'],                choices: [{ text: '학생이라고', correct: true }, { text: '학생다고', correct: false }, { text: '학생는다고', correct: false }, { text: '학생라고', correct: false }], explain: '名词有收音 → **이라고 하다**' },
    { id: 'd47-l2-c4', audioKo: '엄마가 용기 내라고 하셨어요.',  clozeParts: ['엄마가 용기 ', ' 하셨어요.'], choices: [{ text: '내라고', correct: true }, { text: '낸다고', correct: false }, { text: '내다고', correct: false }, { text: '내고',   correct: false }], explain: '命令引用 → **~(으)라고 하다**' },
  ],

  reply: [
    { id: 'd47-l2-r1', audioKo: '엄마, 저 지금 너무 보고 싶어요.',              promptZh: '和妈妈视频。妈妈问最近怎么样，你想转述 Haru 上次说的话，最自然的一句？', choices: [{ text: '하루가 기억은 남는다고 했어요.',                    correct: true }, { text: '하루가 기억이 없다고 했어요.',                    correct: false }, { text: '하루가 기억을 잊었어요.',                    correct: false }, { text: '얼마예요?',                              correct: false }], explain: 'Tori 原句 · 间接引用' },
    { id: 'd47-l2-r2', audioKo: '용기 내.',                                     promptZh: '妈妈说了那句韩语。你想夸她"发音也不错呢"，最自然的一句？',                    choices: [{ text: '엄마가 발음도 잘하시네요.',                          correct: true }, { text: '엄마 발음이 이상해요.',                          correct: false }, { text: '엄마도 한국 사람이에요?',                      correct: false }, { text: '얼마예요?',                              correct: false }], explain: '~시네요 敬语感叹 · Tori 原句' },
    { id: 'd47-l2-r3', audioKo: '한국 친구들이 잘해줘?',                        promptZh: '妈妈问朋友对你好不好。你想说"Junho 说我发音好"，最自然的一句？',           choices: [{ text: '준호가 제 발음이 좋다고 했어요.',                    correct: true }, { text: '준호가 제 발음이 좋는다고 했어요.',              correct: false }, { text: '준호가 제 발음이 좋았다고 하다.',                correct: false }, { text: '얼마예요?',                              correct: false }], explain: '형용사 좋다 → 좋다고' },
  ],
};
