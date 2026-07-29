import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 84 · 3-4 상황 속으로 · 公开演讲·勇气胡萝卜 */
export const day84Scene: SceneSubQuestData = {
  day: 24, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '대강당 · 忘词后即兴 · 명제',

  tasks: [
    { type: 'situation', id: 'd84-sc-s1', scenario: '演讲忘词了，想坦诚地承认"不好意思，刚才忘了一下"，哪句最合适？',                                                     choices: [{ ko: '죄송해요. 방금 잠깐 잊었어요.',                zh: '不好意思，刚才忘了一下。', correct: true }, { ko: '죄송해요. 원고가 완벽해요.',            zh: '不好意思，稿子很完美。（不搭）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '坦诚承认' },
    { type: 'situation', id: 'd84-sc-s2', scenario: '举起胡萝卜笔，想说核心那句"勇气不是大的，是小的"，哪句最合适？',                                     choices: [{ ko: '용기는 큰 게 아니에요. 작은 거예요.',      zh: '勇气不是大的，是小的。',              correct: true }, { ko: '용기는 큰 게 아니에요. 작은 것예요.',                  zh: '错——것예요拼写错,应작은 거예요。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: 'N이/가 아니에요 + N거예요' },
    { type: 'situation', id: 'd84-sc-s3', scenario: '想说"这不是狮子的大小，是兔子的大小"，哪句最合适？',                                                      choices: [{ ko: '사자의 크기가 아니에요. 토끼의 크기예요.',      zh: '不是狮子的大小，是兔子的大小。',              correct: true }, { ko: '사자의 크기이 아니에요. 토끼의 크기가예요.',      zh: '错——助词都用错。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '크기가 아니에요 + 크기예요' },

    { type: 'dialogue', id: 'd84-sc-d1', lines: [{ speaker: '심사위원',   ko: '오늘 연설 주제가 뭐였죠?',                zh: '今天演讲主题是什么？' }], blankSpeaker: '토리', choices: [{ ko: '작은 용기의 힘이었어요.',            correct: true, zh: '是"小小勇气的力量"。' }, { ko: '주제가 없었어요.',       correct: false, zh: '没有主题。（跑题）' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。（生硬）' }], explain: '主题回答' },
    { type: 'dialogue', id: 'd84-sc-d2', lines: [{ speaker: '심사위원',   ko: '원고를 왜 내려놓았어요?',              zh: '为什么放下了稿子？' }],   blankSpeaker: '토리', choices: [{ ko: '준비한 문장보다 진심이 더 중요하니까요.',            correct: true, zh: '因为真心比准备好的句子更重要。' }, { ko: '원고가 재미없어서요.',    correct: false, zh: '因为稿子无聊。（不真诚）' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어요.',           correct: false, zh: '不要。' }], explain: '~니까 · 说明理由' },
    { type: 'dialogue', id: 'd84-sc-d3', lines: [{ speaker: 'Junho', ko: '진짜 감동이었어. 어떻게 그렇게 했어?',                       zh: '真的很感动。你怎么做到的？' }], blankSpeaker: '토리', choices: [{ ko: '용기는 큰 게 아니야. 작은 거야.',        correct: true, zh: '勇气不是大的，是小的。' }, { ko: '난 원래 발표 천재야.',      correct: false, zh: '我本来就是演讲天才。（跑题）' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '반말 · N이/가 아니야 + N거야' },

    { type: 'context', id: 'd84-sc-c1', ko: '용기는 큰 게 아니에요. 작은 거예요.',   promptZh: '这句在演讲高潮的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 84 高潮名句 · A不是B,是C · Tori 忘词后放下稿子,用胡萝卜讲出"勇气很小却带她走到这里"——呼应Day1妈妈的两个字',       correct: true }, { zh: '嫌勇气太小',          correct: false }, { zh: '说大的才好',       correct: false }, { zh: '放弃演讲',                correct: false }], explain: 'A 아니에요 + B이에요 · 定义句型' },
    { type: 'context', id: 'd84-sc-c2', ko: '그 작은 게 저를 여기까지 데려왔어요.', promptZh: '这句的意义，哪句最准确？',                                                                     choices: [{ zh: '"那小东西把我带到了这里" · 데려오다 · 一根小胡萝卜(小小的勇气)陪 Tori 走过84天,情感高潮',       correct: true }, { zh: '别人带她来的',                correct: false }, { zh: '她想离开',                  correct: false }, { zh: '胡萝卜没用',                correct: false }], explain: '데려오다 · 情感高潮' },
  ],
};
