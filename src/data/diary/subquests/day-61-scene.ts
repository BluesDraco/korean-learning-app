import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 61 · 3-4 상황 속으로 · 高级班第一天 · 401 号大讲堂 */
export const day61Scene: SceneSubQuestData = {
  day: 1, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '大讲堂 401 · Danielle 完美得不真实',

  tasks: [
    { type: 'situation', id: 'd61-sc-s1', scenario: '火鹤老师问"누가 답할래요?"，你没准备好想争取几秒思考，最自然的一句？',       choices: [{ ko: '조금만 생각할 시간을 주세요.',                   zh: '给我一点思考时间。',        correct: true }, { ko: '저는 안 할래요, 몰라요.',                zh: '我不答，不知道。',    correct: false }, { ko: '얼마예요?',                           zh: '多少钱？',         correct: false }, { ko: '싫어요.',                       zh: '不要。',            correct: false }], explain: '正式请求延时 · 조금만 + N + 주세요' },
    { type: 'situation', id: 'd61-sc-s2', scenario: '想夸 Danielle "发音像母语者"（不带自卑），最自然的一句？',                  choices: [{ ko: '다니엘 씨는 원어민처럼 발음해요.',              zh: 'Danielle 发音像母语者。', correct: true }, { ko: '다니엘 씨는 원어민에서 발음해요.',        zh: 'Danielle 从母语者发音。', correct: false }, { ko: '다니엘 씨는 원어민을 발음해요.',       zh: 'Danielle 发音母语者。', correct: false }, { ko: '다니엘 씨는 원어민이에요.',        zh: 'Danielle 是母语者。',  correct: false }], explain: 'Day 61 主题句 · N + 처럼 + V' },
    { type: 'situation', id: 'd61-sc-s3', scenario: '想对自己说"实力差距太大"（内心 OS），最自然的一句？',                       choices: [{ ko: '실력 차이가 너무 커요.',                        zh: '实力差距太大。',            correct: true }, { ko: '실력 차이는 없어요.',                zh: '实力没差距。',      correct: false }, { ko: '실력 차이가 작아요.',                zh: '实力差距很小。',    correct: false }, { ko: '실력이 얼마예요?',                zh: '实力多少钱？',      correct: false }], explain: 'Tori 内心 · 차이 + 크다' },

    { type: 'dialogue', id: 'd61-sc-d1', lines: [{ speaker: '홍학 선생님', ko: '3분짜리 음성 하나 들어봅시다. 누가 답할래요?', zh: '来听一段 3 分钟音频。谁来答？' }], blankSpeaker: '다니엘', choices: [{ ko: '제가 할게요. 정답은 세 번째 선택지입니다.', zh: '我来答。答案是第三个选项。', correct: true }, { ko: '얼마예요?',                zh: '多少钱？',             correct: false }, { ko: '몰라요.',                     zh: '不知道。',              correct: false }, { ko: '싫어요, 안 할래요.',        zh: '不要，我不做。',    correct: false }], explain: 'Danielle 自信作答 · ~ㅂ니다 正式' },
    { type: 'dialogue', id: 'd61-sc-d2', lines: [{ speaker: '준호',        ko: '다니엘 씨는 진짜 대단하네.',                   zh: 'Danielle 真的很厉害呢。' }], blankSpeaker: '토리',   choices: [{ ko: '네, 원어민처럼 발음해.',                       zh: '嗯，发音像母语者。',            correct: true }, { ko: '아니, 못해.',                    zh: '不，她不行。',        correct: false }, { ko: '얼마예요?',                  zh: '多少钱？',              correct: false }, { ko: '몰라, 저리 가.',            zh: '不知道，走开。',    correct: false }], explain: '~처럼 + V 반말 认同' },
    { type: 'dialogue', id: 'd61-sc-d3', lines: [{ speaker: '홍학 선생님', ko: '토리 씨도 60일 전보다 정말 많이 늘었어요. 각자 속도가 있어요.', zh: '兔莉也比 60 天前进步很多。每个人有自己的节奏。' }], blankSpeaker: '토리', choices: [{ ko: '네, 저도 계속 노력할게요.',                      zh: '好的，我会继续努力。',        correct: true }, { ko: '저는 이제 안 할래요.',           zh: '我不学了。',        correct: false }, { ko: '다니엘 씨가 최고예요.',       zh: 'Danielle 最厉害。',   correct: false }, { ko: '얼마예요?',                zh: '多少钱？',            correct: false }], explain: '正式承诺 · ~ㄹ게요' },

    { type: 'context', id: 'd61-sc-c1', ko: '원어민처럼 발음해요.', promptZh: '这句话的场景意义，哪句最准确？', choices: [{ zh: '夸对方"像母语者一样发音" · 学韩语最想被这句话夸 · N + 처럼 = 比喻', correct: true }, { zh: '骂人不像韩国人',  correct: false }, { zh: '教对方发音',      correct: false }, { zh: '和母语者无关',     correct: false }], explain: 'Day 61 主题句 · 夸奖 / 羡慕' },
    { type: 'context', id: 'd61-sc-c2', ko: '각자 속도가 있어요.', promptZh: '这句话的场景意义，哪句最准确？',        choices: [{ zh: '"每个人有自己的节奏" · 火鹤老师安慰式的成人语 · 消除自卑感的关键句', correct: true }, { zh: '速度都一样',      correct: false }, { zh: '要加快速度',      correct: false }, { zh: '没有节奏',          correct: false }], explain: 'Tori 从自卑走出来的钥匙句' },
  ],
};
