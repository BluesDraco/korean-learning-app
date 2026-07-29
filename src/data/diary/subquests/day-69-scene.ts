import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 69 · 3-4 상황 속으로 · 반차별 논단 */
export const day69Scene: SceneSubQuestData = {
  day: 9, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '학교 대강당 · 100 명 앞에서',

  tasks: [
    { type: 'situation', id: 'd69-sc-s1', scenario: '开场想说"我是一只兔子，60 天前来到韩国"，最自然的一句？',                                choices: [{ ko: '저는 토끼예요. 60일 전에 한국에 왔어요.',           zh: '我是一只兔子。60 天前来到韩国。',   correct: true }, { ko: '저는 어제 왔어요.',                    zh: '我昨天来的。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '演讲开场自介' },
    { type: 'situation', id: 'd69-sc-s2', scenario: '想说"因为偏见我很生气 / 受伤"，最自然的一句？',                                          choices: [{ ko: '편견 때문에 상처받았어요.',                            zh: '因为偏见受伤。',                    correct: true }, { ko: '편견 이유예요, 상처받았어요.',            zh: '错。',                     correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: 'N + 때문에' },
    { type: 'situation', id: 'd69-sc-s3', scenario: '想说"偏见要用语言打破"（Day 69 主题句），最自然的一句？',                                    choices: [{ ko: '편견은 언어로 깨야 해요.',                             zh: '偏见要用语言打破。',                  correct: true }, { ko: '편견은 언어로 깨서 해요.',                zh: '错。',                     correct: false }, { ko: '편견은 언어로 깨기 해요.',                zh: '错。',                     correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }], explain: '~야 하다 · 演讲金句' },

    { type: 'dialogue', id: 'd69-sc-d1', lines: [{ speaker: '사회자',   ko: '다음 발표자, 토리 씨. 마이크 준비됐어요.', zh: '下位发言人，兔莉。麦克风就绪。' }], blankSpeaker: '토리', choices: [{ ko: '네, 감사합니다. 시작하겠습니다.',                              correct: true, zh: '好的，谢谢，我开始。' }, { ko: '싫어요, 안 할래요.',       correct: false, zh: '不要，我不上。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }], explain: '正式接麦 · ~겠습니다' },
    { type: 'dialogue', id: 'd69-sc-d2', lines: [{ speaker: '청중',      ko: '왜 여기 서 계세요?',                        zh: '为什么站在这里？' }], blankSpeaker: '토리', choices: [{ ko: '편견은 언어로 깨야 하기 때문에 여기 서 있어요.',                correct: true, zh: '因为偏见要用语言打破。' }, { ko: '몰라요, 그냥 왔어요.',    correct: false, zh: '不知道，随便。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어요.',           correct: false, zh: '不要。' }], explain: '~기 때문에 · 正式因果' },
    { type: 'dialogue', id: 'd69-sc-d3', lines: [{ speaker: '다니엘',    ko: '오늘 발표, 잘 들었어요.',                     zh: '今天演讲我听得很仔细。' }], blankSpeaker: '토리', choices: [{ ko: '감사합니다. 용기를 냈기 때문에 여기까지 왔어요.',                correct: true, zh: '谢谢。因为拿出了勇气才走到这里。' }, { ko: '싫어요, 저리 가.',       correct: false, zh: '走开。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }], explain: '感谢 + 았/었기 때문에' },

    { type: 'context', id: 'd69-sc-c1', ko: '편견은 언어로 깨야 해요.',   promptZh: '这句话的场景意义，哪句最准确？',                                                              choices: [{ zh: 'Day 69 演讲主题句 · 语言 = 打破偏见的工具 · Day 66 → 68 → 69 情节升华', correct: true }, { zh: '语言创造偏见',          correct: false }, { zh: '语言无用',                    correct: false }, { zh: '和偏见无关',                correct: false }], explain: '主题句 · 语言是武器' },
    { type: 'context', id: 'd69-sc-c2', ko: '토끼도 할 수 있어요.',        promptZh: '这句收束句的场景意义，哪句最准确？',                                                          choices: [{ zh: '"兔子也做得到" · 从"体型"回到"能力" · 100 人起立掌声的种子 · Day 69 情感高潮', correct: true }, { zh: '兔子做不到',                correct: false }, { zh: '只有兔子做得到',            correct: false }, { zh: '和能力无关',                correct: false }], explain: '~도 할 수 있다 · 收束金句' },
  ],
};
