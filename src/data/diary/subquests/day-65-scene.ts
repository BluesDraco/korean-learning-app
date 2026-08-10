import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 65 · 3-4 상황 속으로 · 北区食肉动物区 */
export const day65Scene: SceneSubQuestData = {
  day: 5, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '북구 3번 출구 · 낯선 밤',

  tasks: [
    { type: 'situation', id: 'd65-sc-s1', scenario: '同学劝你别去，想说"我好奇，只是去看一眼"，最自然的一句？',                    choices: [{ ko: '궁금해서 잠깐 가 볼래.',                       zh: '我好奇，就过去看一眼。',           correct: true }, { ko: '싫어. 절대 안 가.',                zh: '不。绝对不去。',         correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '好奇心 · ~아/어서 + V 볼래' },
    { type: 'situation', id: 'd65-sc-s2', scenario: '发现路灯不亮 / 招牌很大，想说"这里好像危险"，最自然的一句？',                    choices: [{ ko: '여기 위험한 것 같아요.',                        zh: '这里好像危险。',                    correct: true }, { ko: '여기 위험하는 것 같아요.',              zh: '错。',                  correct: false }, { ko: '여기 위험할 것 같아요.',              zh: '这里未来会危险。',        correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }], explain: '形容词 · ~ㄴ 것 같다' },
    { type: 'situation', id: 'd65-sc-s3', scenario: '看到远处走过来大动物，想说"好像有人来"，最自然的一句？',                          choices: [{ ko: '누가 오는 것 같아요.',                          zh: '好像有人来。',                      correct: true }, { ko: '누가 오은 것 같아요.',                zh: '错。',                     correct: false }, { ko: '누가 온 것 같아요.',                zh: '好像已经来了。',           correct: false }, { ko: '누가 올 것 같아요.',                zh: '未来会有人来。',           correct: false }], explain: 'V 현재 + 는 것 같다' },

    { type: 'dialogue', id: 'd65-sc-d1', lines: [{ speaker: '반 친구', ko: '북구에 육식자 구역 있는 거 알지? 가지 마.', zh: '北区有食肉动物区你知道吧？别去。' }], blankSpeaker: '토리',   choices: [{ ko: '궁금해서 잠깐 가 볼래.',                                        correct: true, zh: '我好奇，去看一眼。' }, { ko: '싫어. 절대 안 가.',      correct: false, zh: '绝对不去。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '好奇 · ~해서 + V 볼래' },
    { type: 'dialogue', id: 'd65-sc-d2', lines: [{ speaker: '작은 토끼', ko: '조심해. 여기 우리한테 좋은 데 아니야.', zh: '小心，这里对我们不好。' }], blankSpeaker: '토리', choices: [{ ko: '고마워요, 저도 곧 갈 거예요.',                                    correct: true, zh: '谢谢，我也马上走。' }, { ko: '내가 왜?',          correct: false, zh: '关我什么事？' }, { ko: '싫어요.',           correct: false, zh: '不要。' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }], explain: '低声感谢 + 意愿' },
    { type: 'dialogue', id: 'd65-sc-d3', lines: [{ speaker: '하루', ko: '어디 갔었어? 왜 이렇게 늦어?', zh: '你去哪了？怎么这么晚？' }], blankSpeaker: '토리',                            choices: [{ ko: '북구에 잠깐 갔었어. 좀 낯선 데인 것 같아.',                            correct: true, zh: '去北区看了一下。感觉挺陌生的。' }, { ko: '몰라.',           correct: false, zh: '不知道。' }, { ko: '얼마예요?',    correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }], explain: '过去 · 갔었어 + ~ㄴ 것 같다' },

    { type: 'context', id: 'd65-sc-c1', ko: '여기 우리한테 좋은 데 아니야.', promptZh: '这句话的场景意义，哪句最准确？',                                        choices: [{ zh: '"这里对我们不好" · **우리한테** = 把 Tori 当"自己人" · Day 65 情绪核心：被识别 + 被警告', correct: true }, { zh: '这里很好',              correct: false }, { zh: '要过夜',                correct: false }, { zh: '和自己人无关',              correct: false }], explain: '"우리한테" 是关键 · 归属感/警告' },
    { type: 'context', id: 'd65-sc-c2', ko: '누가 오는 것 같아요.', promptZh: '这句话的语气/推测感，哪句最准确？',                                                choices: [{ zh: '~는 것 같다 = 委婉推测"好像 X" · 不敢肯定 · 陌生环境下的自然表达', correct: true }, { zh: '100% 确定',              correct: false }, { zh: '命令别人来',              correct: false }, { zh: '过去发生',                  correct: false }], explain: '委婉推测 · 韩语高频' },
  ],
};
