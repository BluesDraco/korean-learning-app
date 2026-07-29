import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 68 · 3-4 상황 속으로 · 走回去直面 */
export const day68Scene: SceneSubQuestData = {
  day: 8, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '곰나라 마트 · 편견에 답하다',

  tasks: [
    { type: 'situation', id: 'd68-sc-s1', scenario: '再次推门进店，想正式说"我是上周末来过的兔莉"，最自然的一句？',                              choices: [{ ko: '안녕하세요. 지난 주말에 왔던 토리예요.',           zh: '您好。我是上周末来过的兔莉。',   correct: true }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                            zh: '不知道。',                 correct: false }, { ko: '싫어요.',                            zh: '不要。',                  correct: false }], explain: '正式自报家门 · 왔던' },
    { type: 'situation', id: 'd68-sc-s2', scenario: '想开场说"有件事想跟您说"，最自然的一句？',                                                        choices: [{ ko: '드릴 말씀이 있어요.',                             zh: '有件事想跟您说。',            correct: true }, { ko: '싫어요, 안 말해요.',                zh: '不要，不说了。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '드리다 敬语连体 · 正式开场' },
    { type: 'situation', id: 'd68-sc-s3', scenario: '想说"体型不代表能力，能力才重要"，最自然的一句？',                                                choices: [{ ko: '체형은 능력이 아니에요. 능력이 중요해요.',           zh: '体型不代表能力，能力才重要。',      correct: true }, { ko: '체형은 능력이었어요.',                zh: '体型曾经是能力。',        correct: false }, { ko: '체형이 중요해요.',                  zh: '体型很重要。',             correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: 'Tori 反击核心' },

    { type: 'dialogue', id: 'd68-sc-d1', lines: [{ speaker: '사자 사장', ko: '무슨 일이세요?',                                zh: '有什么事吗？' }], blankSpeaker: '토리',                       choices: [{ ko: '드릴 말씀이 있어요.',                                              correct: true, zh: '有件事想跟您说。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }, { ko: '싫어요.',           correct: false, zh: '不要。' }], explain: '正式开场' },
    { type: 'dialogue', id: 'd68-sc-d2', lines: [{ speaker: '사자 사장', ko: '...말씀하세요.',                                zh: '……请说。' }], blankSpeaker: '토리',                          choices: [{ ko: '저를 무시하지 마세요. 체형은 능력이 아니에요.',                    correct: true, zh: '请不要轻视我。体型不代表能力。' }, { ko: '싫어요, 안 할래요.', correct: false, zh: '不要。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }], explain: '~지 마세요 + 反击' },
    { type: 'dialogue', id: 'd68-sc-d3', lines: [{ speaker: '사자 사장', ko: '...미안합니다. 편견이었어요. 이력서 한 번 다시 봐도 될까요?', zh: '……对不起。是我有偏见。可以再看一次简历吗？' }], blankSpeaker: '토리', choices: [{ ko: '네, 감사합니다. 잘 부탁드립니다.',                                    correct: true, zh: '好的，谢谢。拜托了。' }, { ko: '싫어요, 이제 안 필요해요.',   correct: false, zh: '不要，不需要了。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }], explain: '接受 + 委托' },

    { type: 'context', id: 'd68-sc-c1', ko: '저를 무시하지 마세요.',        promptZh: '这句话的场景意义，哪句最准确？',                                                         choices: [{ zh: '"请不要轻视我" · Day 66 内心话 → Day 68 说出口 · 语言完成了 Tori 的立场表达', correct: true }, { zh: '在道歉',                correct: false }, { zh: '在退让',                    correct: false }, { zh: '和无视无关',                correct: false }], explain: 'Day 66 → 68 语言成为立场' },
    { type: 'context', id: 'd68-sc-c2', ko: '미안합니다. 편견이었어요.',   promptZh: '这句话的角色/情境意义，哪句最准确？',                                                    choices: [{ zh: '狮子低头承认 · 편견이었어요 = **过去有过偏见** · Day 68 收束点，也是 Day 69 论坛的种子', correct: true }, { zh: '狮子仍然坚持偏见',        correct: false }, { zh: '和偏见无关',                correct: false }, { zh: '在夸 Tori 完美',            correct: false }], explain: '过去时 = 承认曾经有过' },
  ],
};
