import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 67 · 3-4 상황 속으로 · 夜巷等 Haru */
export const day67Scene: SceneSubQuestData = {
  day: 7, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '어두운 골목 · 30분 안에',

  tasks: [
    { type: 'situation', id: 'd67-sc-s1', scenario: '打给 Haru，想说"我迷路了 · 在北区 · 不知道是哪里"，最自然的一句？',                                choices: [{ ko: '나 길 잃었어. 북구인데 어디인지 모르겠어.',           zh: '我迷路了。在北区，不知道是哪里。',   correct: true }, { ko: '나 잘 있어. 걱정 마.',                    zh: '我很好，别担心。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '求助电话开场 · 길 잃다' },
    { type: 'situation', id: 'd67-sc-s2', scenario: 'Haru 让你发照片确认位置，想说"太暗拍不出来"，最自然的一句？',                                          choices: [{ ko: '너무 어두워서 안 찍혀.',                              zh: '太暗了，拍不出来。',                correct: true }, { ko: '싫어, 안 찍어.',                    zh: '不要，不拍。',              correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '~아/어서 + 자동사 안 찍히다' },
    { type: 'situation', id: 'd67-sc-s3', scenario: '想安慰自己"Haru 应该马上到吧"，最自然的一句？',                                                        choices: [{ ko: '하루가 곧 도착할 텐데.',                             zh: 'Haru 应该马上到吧。',              correct: true }, { ko: '하루가 곧 도착하는 텐데.',              zh: '错。',                      correct: false }, { ko: '하루가 곧 도착해서 텐데.',            zh: '错。',                     correct: false }, { ko: '하루가 곧 도착한 텐데.',            zh: '错。',                     correct: false }], explain: 'V + (으)ㄹ 텐데 · 미래 추측' },

    { type: 'dialogue', id: 'd67-sc-d1', lines: [{ speaker: '하루', ko: '어디쯤이야? 사진 하나만 찍어서 보내.',      zh: '你大概在哪？拍张照发我。' }], blankSpeaker: '토리',   choices: [{ ko: '너무 어두워서 안 찍혀.',                                     correct: true, zh: '太暗了，拍不出来。' }, { ko: '얼마예요?',              correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }, { ko: '몰라.',        correct: false, zh: '不知道。' }], explain: '原因 · 자동사 안 찍히다' },
    { type: 'dialogue', id: 'd67-sc-d2', lines: [{ speaker: '하루', ko: '움직이지 마. 지금 위치 켜놔. 30분 안에 도착해.', zh: '别动，打开定位，30 分钟内到。' }], blankSpeaker: '토리', choices: [{ ko: '고마워, 조심해서 와.',                                        correct: true, zh: '谢谢，路上小心。' }, { ko: '싫어, 오지 마.',           correct: false, zh: '不要，别来。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '感谢 + 让对方小心' },
    { type: 'dialogue', id: 'd67-sc-d3', lines: [{ speaker: '하루', ko: '무서워? 목소리 떨려.',                       zh: '害怕吗？声音在抖。' }], blankSpeaker: '토리',                          choices: [{ ko: '괜찮아. 골목이 그렇게 멀지 않을 텐데.',                        correct: true, zh: '还行。巷子应该不远吧。' }, { ko: '진짜 무서워.',        correct: false, zh: '真的很怕。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '自我安慰 + ~(으)ㄹ 텐데' },

    { type: 'context', id: 'd67-sc-c1', ko: '움직이지 마. 지금 위치 켜놔.',       promptZh: 'Haru 这句指令的场景意义，哪句最准确？',                                     choices: [{ zh: '危险场景的救援金句 · **别动 + 开定位** · Haru 承担了导航角色 · Day 7 → Day 67 呼应', correct: true }, { zh: '让你逃跑',                correct: false }, { zh: '让你关手机',              correct: false }, { zh: '和救援无关',                  correct: false }], explain: '救援金句 · Day 7 → 67' },
    { type: 'context', id: 'd67-sc-c2', ko: '곧 도착할 텐데.',                     promptZh: '这句话的语气/情绪，哪句最准确？',                                          choices: [{ zh: '推测 + 自我安慰 · Tori 一个人在暗巷里默念的话 · 语言把恐惧稳住了', correct: true }, { zh: '100% 确定',              correct: false }, { zh: '命令 Haru',              correct: false }, { zh: '生气',                        correct: false }], explain: '~(으)ㄹ 텐데 = 推测 + 关心 / 自安' },
  ],
};
