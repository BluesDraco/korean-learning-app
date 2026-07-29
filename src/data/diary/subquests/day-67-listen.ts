import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 67 · 3-2 귀 트이기 · ~(으)ㄹ 텐데 · 夜巷等 Haru */
export const day67Listen: ListenSubQuestData = {
  day: 7, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '어두운 골목 · Haru가 온다',

  meaning: [
    { id: 'd67-l2-m1', audioKo: '나 길 잃었어. 북구인데 어디인지 모르겠어.',   choices: [{ text: '我迷路了。在北区，不知道是哪里。',    correct: true }, { text: '我到家了。',                    correct: false }, { text: '不用来找我。',                  correct: false }, { text: '我知道路。',                  correct: false }], explain: 'Tori 电话开场 · 길 잃다' },
    { id: 'd67-l2-m2', audioKo: '움직이지 마. 지금 위치 켜놔.',                    choices: [{ text: '别动，把定位打开。',                    correct: true }, { text: '快跑，别开定位。',              correct: false }, { text: '把手机关了。',                  correct: false }, { text: '换个地方。',                    correct: false }], explain: 'Haru 电话指令 · ~지 마' },
    { id: 'd67-l2-m3', audioKo: '30분 안에 도착해.',                                  choices: [{ text: '30 分钟内到。',                          correct: true }, { text: '30 分钟前到了。',              correct: false }, { text: '30 分钟后出发。',              correct: false }, { text: '30 分钟没到。',                correct: false }], explain: 'Haru 承诺' },
    { id: 'd67-l2-m4', audioKo: '곧 도착할 텐데.',                                    choices: [{ text: '她应该马上到吧。',                      correct: true }, { text: '她已经走了。',                  correct: false }, { text: '她还没出门。',                  correct: false }, { text: '她不会来。',                    correct: false }], explain: 'V + (으)ㄹ 텐데 · 未来推测' },
    { id: 'd67-l2-m5', audioKo: '이 시간에 길이 안 좋을 텐데.',                     choices: [{ text: '这么晚路应该不好走吧。',                 correct: true }, { text: '这么早路好走。',                correct: false }, { text: '路很宽。',                      correct: false }, { text: '路没有问题。',                  correct: false }], explain: 'A + (으)ㄹ 텐데 · 推测 + 关心' },
  ],

  cloze: [
    { id: 'd67-l2-c1', audioKo: '곧 도착할 텐데.',                clozeParts: ['곧 ', ' 텐데.'],                choices: [{ text: '도착할',   correct: true }, { text: '도착하는',    correct: false }, { text: '도착한',    correct: false }, { text: '도착했', correct: false }], explain: 'V + (으)ㄹ 텐데 · 미래' },
    { id: 'd67-l2-c2', audioKo: '벌써 나왔을 텐데.',              clozeParts: ['벌써 ', ' 텐데.'],              choices: [{ text: '나왔을',   correct: true }, { text: '나올',    correct: false }, { text: '나오는',    correct: false }, { text: '나온', correct: false }], explain: 'V 과거 + (으)ㄹ 텐데 · 나왔을 텐데' },
    { id: 'd67-l2-c3', audioKo: '이 시간에 길이 안 좋을 텐데.',    clozeParts: ['이 시간에 길이 안 ', ' 텐데.'], choices: [{ text: '좋을',   correct: true }, { text: '좋은',    correct: false }, { text: '좋는',    correct: false }, { text: '좋고', correct: false }], explain: 'A + (으)ㄹ 텐데' },
    { id: 'd67-l2-c4', audioKo: '지금 나가면 30분 걸릴 텐데.',    clozeParts: ['지금 나가면 30분 ', ' 텐데.'],  choices: [{ text: '걸릴',   correct: true }, { text: '걸리는',    correct: false }, { text: '걸린',    correct: false }, { text: '걸리고', correct: false }], explain: 'V + (으)ㄹ 텐데 · 미래' },
  ],

  reply: [
    { id: 'd67-l2-r1', audioKo: '어디쯤이야? 사진 하나만 찍어서 보내.',                    promptZh: 'Haru 让你发张照片确认位置。你想说"太暗了拍不出来"，最自然的一句？',              choices: [{ text: '너무 어두워서 안 찍혀.',                                       correct: true }, { text: '얼마예요?',                          correct: false }, { text: '싫어.',                                  correct: false }, { text: '몰라.',                                  correct: false }], explain: '原因 + 자동사 안 찍히다' },
    { id: 'd67-l2-r2', audioKo: '움직이지 마. 30분 안에 도착해.',                             promptZh: 'Haru 承诺 30 分钟内到。你想低声说"辛苦了，路小心"，最自然的一句？',              choices: [{ text: '고마워, 조심해서 와.',                                          correct: true }, { text: '싫어, 오지 마.',                    correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '感谢 + 让对方小心' },
    { id: 'd67-l2-r3', audioKo: '무서워? 목소리 떨려.',                                          promptZh: 'Haru 听出你在抖。你想说"我还行 · 巷子应该不远吧？"，最自然的一句？',              choices: [{ text: '괜찮아. 골목이 그렇게 멀지 않을 텐데.',                          correct: true }, { text: '진짜 무서워, 살려줘.',                 correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: '자기 안심 + ~(으)ㄹ 텐데 推测' },
  ],
};
