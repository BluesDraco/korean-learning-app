import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 75 · 3-4 상황 속으로 · 부산 迷路·独立问路 */
export const day75Scene: SceneSubQuestData = {
  day: 15, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '광복동 골목 · 길 찾기 · 성장의 순간',

  tasks: [
    { type: 'situation', id: 'd75-sc-s1', scenario: '在陌生的巷子里迷路了，想拦住路过的阿姨问路，最合适的开场？',                                                     choices: [{ ko: '저기요, 광복동 지하철역 어디예요?',                zh: '不好意思，光复洞地铁站在哪？', correct: true }, { ko: '광복동 좋아요?',            zh: '光复洞好吗？（答非所问）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '问路 · 어디예요?' },
    { type: 'situation', id: 'd75-sc-s2', scenario: '阿姨用方言回答，你只听懂一半，想请她用标准语再慢慢说一次，最礼貌的一句？',                                     choices: [{ ko: '표준어로 한 번만 더 천천히 부탁드려도 될까요?',      zh: '能用标准语再慢慢说一次吗？',              correct: true }, { ko: '사투리 하지 마세요.',                  zh: '别说方言。（失礼）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '표준어로 + 부탁드려도 될까요? · 委婉请求' },
    { type: 'situation', id: 'd75-sc-s3', scenario: '想跟 Danielle 感慨"一个人的话本该慌了的（但这次镇定了）"，哪句最合适？',                                                      choices: [{ ko: '혼자였으면 당황했을 텐데, 이번엔 침착했어요.',      zh: '一个人的话本该慌的，这次却很镇定。',              correct: true }, { ko: '혼자였으면 당황할 텐데.',      zh: '错——反事实要用 았/었을 텐데。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '~았/었을 텐데 · 过去反事实' },

    { type: 'dialogue', id: 'd75-sc-d1', lines: [{ speaker: '부산 아주머니',   ko: '저짝으로 쭉 가면 오른편에 있어예.',                zh: '往那边直走右边就是。（方言）' }], blankSpeaker: '토리', choices: [{ ko: '죄송한데요, 표준어로 다시 말해 주실 수 있어요?',            correct: true, zh: '不好意思，能用标准语再说一次吗？' }, { ko: '네, 다 알아들었어요.',       correct: false, zh: '错——其实没全懂。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。（生硬）' }], explain: '没听懂方言 → 请用标准语' },
    { type: 'dialogue', id: 'd75-sc-d2', lines: [{ speaker: '준호',   ko: '혼자 안 무서웠어?',              zh: '一个人不害怕吗？' }],   blankSpeaker: '토리', choices: [{ ko: '75일 전이었으면 울었을 텐데, 이젠 스스로 찾았어.',            correct: true, zh: '75天前的话本该哭的，现在自己找到路了。' }, { ko: '몰라, 그냥 왔어.',    correct: false, zh: '不知道。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }], explain: '~았을 텐데 + 스스로 · 成长' },
    { type: 'dialogue', id: 'd75-sc-d3', lines: [{ speaker: '하루', ko: '부산 사투리 어땠어?',                       zh: '釜山方言怎么样？' }], blankSpeaker: '토리', choices: [{ ko: '반은 못 알아들었지만, 표준어로 부탁하니까 됐어.',        correct: true, zh: '一半没懂，但请用标准语说就懂了。' }, { ko: '싫어, 저리 가.',      correct: false, zh: '走开。' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '~지만 + 표준어로 부탁하다' },

    { type: 'context', id: 'd75-sc-c1', ko: '75일 전이었으면 울고 있었을 텐데.',   promptZh: '这句在场景中的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 75 成长名句 · ~았/었을 텐데 = 过去反事实 · "本该哭的，但今天笑了"——Tori 回看自己的成长',       correct: true }, { zh: '现在正在哭',          correct: false }, { zh: '命令别人别哭',       correct: false }, { zh: '预测明天会哭',                correct: false }], explain: '过去反事实 · 成长自觉' },
    { type: 'context', id: 'd75-sc-c2', ko: '두려움을 스스로 극복했어요.', promptZh: '这句在迷路场景的意义，哪句最准确？',                                                                     choices: [{ zh: '"自己克服了恐惧" · 스스로 强调靠自己的意志 · 呼应 Day 7/Day 67 的害怕，这次独自翻过去了',       correct: true }, { zh: '有人帮她克服',                correct: false }, { zh: '还没克服',                  correct: false }, { zh: '不需要克服',                correct: false }], explain: '스스로 + 극복하다 · 独立成长' },
  ],
};
