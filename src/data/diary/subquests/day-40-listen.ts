import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 40 · 2-2 귀 트이기 · ~구나 반말 감탄 */
export const day40Listen: ListenSubQuestData = {
  day: 10, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '민지네 집 · 饭桌上的每一句',

  meaning: [
    { id: 'd40-l2-m1', audioKo: '아, 우리 민지가 좋아하는 친구구나.',                choices: [{ text: '啊，原来是민지喜欢的朋友啊。',     correct: true }, { text: '啊，请交민지这个朋友。',              correct: false }, { text: '啊，我讨厌민지的朋友。',              correct: false }, { text: '啊，민지不喜欢这个朋友。',            correct: false }], explain: '奶奶原句 · 친구 无收音 → 구나' },
    { id: 'd40-l2-m2', audioKo: '많이 먹어요. 학생이 밥 잘 먹어야 공부도 잘해요.',      choices: [{ text: '多吃点。学生要吃得好才能学得好。', correct: true }, { text: '别吃太多。学生要专心学习。',              correct: false }, { text: '吃饭吧。学生成绩不好。',                  correct: false }, { text: '学生不能吃饭。',                          correct: false }], explain: 'Minji 爸爸原句 · ~야 = 才能' },
    { id: 'd40-l2-m3', audioKo: '어서 와요, 토리씨! 얘기 많이 들었어요.',              choices: [{ text: '欢迎，兔莉！听说过很多次了。',     correct: true }, { text: '兔莉，快说话。',                        correct: false }, { text: '兔莉，请等一下。',                        correct: false }, { text: '兔莉，你在说什么？',                        correct: false }], explain: 'Minji 妈妈原句 · 어서 와요 = 快进来' },
    { id: 'd40-l2-m4', audioKo: '한국어 진짜 잘하는구나.',                             choices: [{ text: '原来韩语说得真好啊。',            correct: true }, { text: '请说韩语。',                            correct: false }, { text: '我不会韩语。',                            correct: false }, { text: '韩语很难学。',                            correct: false }], explain: '动词 잘하다 → 잘하는구나（发现感叹）' },
    { id: 'd40-l2-m5', audioKo: '이 김치 진짜 맵구나.',                                choices: [{ text: '这个泡菜真的很辣啊。',            correct: true }, { text: '这个泡菜不辣。',                        correct: false }, { text: '请给我泡菜。',                            correct: false }, { text: '我做不辣的泡菜。',                          correct: false }], explain: '形容词 맵다 → **맵구나**（不接 는）' },
  ],

  cloze: [
    { id: 'd40-l2-c1', audioKo: '우리 민지가 좋아하는 친구구나.',       clozeParts: ['우리 민지가 좋아하는 친구', '.'],       choices: [{ text: '구나', correct: true }, { text: '이구나', correct: false }, { text: '는구나', correct: false }, { text: '이네요', correct: false }], explain: '친구 无收音 → **구나**（不加 이）' },
    { id: 'd40-l2-c2', audioKo: '와, 학생이구나.',                       clozeParts: ['와, 학생', '.'],                         choices: [{ text: '이구나', correct: true }, { text: '구나', correct: false }, { text: '는구나', correct: false }, { text: '네요',   correct: false }], explain: '학생 有收音 ㅇ → **이구나**' },
    { id: 'd40-l2-c3', audioKo: '아, 매운 걸 잘 먹는구나.',                clozeParts: ['아, 매운 걸 잘 ', '.'],                 choices: [{ text: '먹는구나', correct: true }, { text: '먹구나', correct: false }, { text: '먹은구나', correct: false }, { text: '먹네요',   correct: false }], explain: '动词 먹다 → **먹는구나**（动词接 는구나）' },
    { id: 'd40-l2-c4', audioKo: '이 김치 진짜 맵구나.',                    clozeParts: ['이 김치 진짜 ', '.'],                   choices: [{ text: '맵구나', correct: true }, { text: '맵는구나', correct: false }, { text: '매운구나', correct: false }, { text: '매워구나', correct: false }], explain: '形容词 맵다 → **맵구나**（不接 는）' },
  ],

  reply: [
    { id: 'd40-l2-r1', audioKo: '어서 와요, 토리씨! 얘기 많이 들었어요.',            promptZh: 'Minji 妈妈在门口欢迎你。你想道谢，最标准的一句？',          choices: [{ text: '안녕하세요. 초대해 주셔서 감사합니다.',              correct: true }, { text: '어서 와요.',                          correct: false }, { text: '얼마예요?',                       correct: false }, { text: '몰라요.',                         correct: false }], explain: 'Tori 原句 · 감사합니다 敬语致谢' },
    { id: 'd40-l2-r2', audioKo: '많이 먹어요. 학생이 밥 잘 먹어야 공부도 잘해요.',    promptZh: 'Minji 爸爸给你盛饭说 "多吃点"。你想礼貌应答，最自然的一句？', choices: [{ text: '네, 잘 먹겠습니다.',                                   correct: true }, { text: '아니요, 저는 안 먹어요.',                correct: false }, { text: '얼마예요?',                       correct: false }, { text: '몰라요.',                         correct: false }], explain: '饭前 잘 먹겠습니다 = 我要开动了（敬语）' },
    { id: 'd40-l2-r3', audioKo: '아, 우리 민지가 좋아하는 친구구나.',                  promptZh: 'Minji 奶奶温柔地说这句。你想礼貌自我介绍，最自然的一句？',  choices: [{ text: '안녕하세요, 할머니. 토리라고 해요.',                    correct: true }, { text: '얼마예요?',                          correct: false }, { text: '많이 드세요.',                        correct: false }, { text: '싫어요.',                         correct: false }], explain: '~라고 하다 = 叫做～ · 对长辈用敬语' },
  ],
};
