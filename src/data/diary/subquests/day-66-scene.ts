import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 66 · 3-4 상황 속으로 · 狮子超市被拒 */
export const day66Scene: SceneSubQuestData = {
  day: 6, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '곰나라 마트 · "너무 작아서"',

  tasks: [
    { type: 'situation', id: 'd66-sc-s1', scenario: '推门进店，想说"我来应聘兼职"，最自然的一句？',                              choices: [{ ko: '저기요, 아르바이트 지원하러 왔어요.',             zh: '不好意思，我来应聘兼职。',        correct: true }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                            zh: '不知道。',                 correct: false }, { ko: '안녕히 계세요.',                     zh: '再见。',                  correct: false }], explain: '正式打招呼 · ~러 왔어요' },
    { type: 'situation', id: 'd66-sc-s2', scenario: '狮子直接说"太小可能不行"，你想不失礼但守住底线，最自然的一句？',                    choices: [{ ko: '체형은 능력이 아니에요. 이력서를 한 번 봐 주세요.',   zh: '体型不代表能力，请看一下简历。',    correct: true }, { ko: '싫어요, 안 가.',                    zh: '不要，我不去。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                            zh: '不知道。',                 correct: false }], explain: '守底线 · ~아 주세요' },
    { type: 'situation', id: 'd66-sc-s3', scenario: '出门后气得手抖，想跟朋友说"（他）光看外表不看简历"，最自然的一句？',              choices: [{ ko: '겉모습만 보고 이력서는 안 봤어.',                    zh: '光看外表不看简历。',              correct: true }, { ko: '겉모습을만 봐서 이력서 안 봐요.',   zh: '错。',                     correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                              zh: '不知道。',                 correct: false }], explain: 'N + 만 + V + 고' },

    { type: 'dialogue', id: 'd66-sc-d1', lines: [{ speaker: '사자 사장', ko: '너무 작아서 안 될 것 같아요.',                     zh: '太小了，可能不行。' }], blankSpeaker: '토리',                        choices: [{ ko: '체형은 능력이 아니에요. 이력서를 한 번 봐 주세요.',                 correct: true, zh: '体型不代表能力。请看一下简历。' }, { ko: '네, 알겠어요.',      correct: false, zh: '好的知道了。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }], explain: '守底线 · ~아 주세요' },
    { type: 'dialogue', id: 'd66-sc-d2', lines: [{ speaker: '사자 사장', ko: '체력이 필요한 일이라서요.',                        zh: '这份工作需要体力。' }], blankSpeaker: '토리',                        choices: [{ ko: '능력은 체력만이 아니에요.',                                        correct: true, zh: '能力不只在体力。' }, { ko: '싫어요.',            correct: false, zh: '不要。' }, { ko: '얼마예요?',         correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }], explain: '~만이 아니다 = 不只' },
    { type: 'dialogue', id: 'd66-sc-d3', lines: [{ speaker: '준호',       ko: '너 왜 그렇게 화났어?',                              zh: '你为什么这么生气？' }], blankSpeaker: '토리',                        choices: [{ ko: '체형만 보고 아무것도 안 봤어. 그게 편견이야.',                        correct: true, zh: '光看体型什么都不看。那就是偏见。' }, { ko: '몰라.',        correct: false, zh: '不知道。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }], explain: 'N + 만 + V + 고 · 表达愤怒' },

    { type: 'context', id: 'd66-sc-c1', ko: '너무 작아서 안 될 것 같아요.',   promptZh: '狮子这句话的隐藏含义，哪句最准确？',              choices: [{ zh: '"太小了" = 从体型判断能力 · Day 66 主题 = **편견**（偏见）的具体样貌', correct: true }, { zh: '客观陈述事实',        correct: false }, { zh: '关心你的健康',            correct: false }, { zh: '和体型无关',              correct: false }], explain: '偏见化了的拒绝语' },
    { type: 'context', id: 'd66-sc-c2', ko: '체형은 능력이 아니에요.',        promptZh: '这句话的场景意义，哪句最准确？',                       choices: [{ zh: 'Tori 反击的核心句 · "体型 ≠ 能力" · Day 66 → Day 68 走回去直面的种子', correct: true }, { zh: '同意狮子的判断',          correct: false }, { zh: '与偏见无关',              correct: false }, { zh: '在道歉',                    correct: false }], explain: 'Day 66 → 68 反击铺垫' },
  ],
};
