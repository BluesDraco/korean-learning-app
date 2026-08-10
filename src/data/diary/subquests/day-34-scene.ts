import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 34 · 2-4 상황 속으로 · Haru의 비밀 */
export const day34Scene: SceneSubQuestData = {
  day: 4, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '"나중에" 那三个字之间',

  tasks: [
    { type: 'situation', id: 'd34-sc-s1', scenario: '你想问 Haru "那天地铁里为什么帮我"，반말亲密语最自然的一句？', choices: [{ ko: '그날 지하철에서, 왜 나를 도와줬어?', zh: '那天地铁里，为什么帮我？', correct: true }, { ko: '그날 지하철에서, 왜 저를 도와주셨어요?', zh: '那天在地铁里，您为什么帮我？', correct: false }, { ko: '그날 지하철 어디예요?', zh: '那天地铁在哪？', correct: false }, { ko: '그날 왜 도와주다?', zh: '那天为什么帮忙？', correct: false }], explain: '朋友间반말过去时 · 왜 ~어?' },
    { type: 'situation', id: 'd34-sc-s2', scenario: 'Haru 沉默一会儿说"看到你会想起以前的朋友"。你想不追问但表达耐心等她开口，最合适的一句？', choices: [{ ko: '응, 나중에 얘기해 줘.', zh: '嗯，以后再告诉我吧。', correct: true }, { ko: '지금 말해 줘.', zh: '现在就告诉我。', correct: false }, { ko: '그럼 됐어.', zh: '那算了。', correct: false }, { ko: '몰라, 얼마예요?', zh: '不知道，多少钱？', correct: false }], explain: '나중에 얘기해 줘 = 尊重对方节奏' },
    { type: 'situation', id: 'd34-sc-s3', scenario: '妈妈突然出现在你脑海里，你想跟朋友分享这件事，最自然的一句？', choices: [{ ko: '엄마가 갑자기 생각났어.', zh: '突然想起妈妈了。', correct: true }, { ko: '엄마를 갑자기 생각났어.', zh: '突然想起妈妈了。', correct: false }, { ko: '엄마가 갑자기 생각했어.', zh: '妈妈突然想到了。', correct: false }, { ko: '엄마 없어요.', zh: '没有妈妈。', correct: false }], explain: '생각나다 + 이/가 · 触发式想起' },

    { type: 'dialogue', id: 'd34-sc-d1', lines: [{ speaker: '하루', ko: '너를 보면 옛날 친구가 생각나.', zh: '看到你会想起以前的朋友。' }], blankSpeaker: '토리', choices: [{ ko: '누구야? 궁금한데…', zh: '是谁啊？我好奇……', correct: true }, { ko: '싫어.', zh: '不要。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '만나서 반가워.', zh: '很高兴认识你。', correct: false }], explain: '자연스러운 궁금증 + 반말亲密语' },
    { type: 'dialogue', id: 'd34-sc-d2', lines: [{ speaker: '하루', ko: '나중에 알려줄게. 지금은 아니야.', zh: '以后再告诉你。现在还不是时候。' }], blankSpeaker: '토리', choices: [{ ko: '응, 나중에 얘기해 줘. 기다릴게.', zh: '嗯，以后再告诉我吧。我等你。', correct: true }, { ko: '지금 말해 줘.', zh: '现在告诉我。', correct: false }, { ko: '그럼 됐어.', zh: '那算了。', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: '기다릴게 = 承诺等待 · 好朋友的回应' },
    { type: 'dialogue', id: 'd34-sc-d3', lines: [{ speaker: '하루', ko: '이건 진짜 비밀이야. 아무한테도 말하지 마.', zh: '这是真的秘密。别告诉任何人。' }], blankSpeaker: '토리', choices: [{ ko: '알았어. 비밀 지킬게.', zh: '知道了。会保守秘密。', correct: true }, { ko: '싫어, 다 말할 거야.', zh: '不要，我全说出去。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '만나서 반가워.', zh: '很高兴认识你。', correct: false }], explain: '비밀 지킬게 · 承诺形 ~ㄹ게' },

    { type: 'context', id: 'd34-sc-c1', ko: '엄마가 생각나요.', promptZh: '这句话和 "엄마를 생각해요" 的差别，哪句最准确？', choices: [{ zh: '생각나다 = 触发式浮现（自动词，用이/가）；생각하다 = 主动地想（他动词，用을/를）', correct: true }, { zh: '两者完全一样', correct: false }, { zh: '생각나다 是过去时', correct: false }, { zh: '생각하다 是敬语', correct: false }], explain: '엄마가 생각나요（突然浮现）vs 엄마를 생각해요（主动想）' },
    { type: 'context', id: 'd34-sc-c2', ko: '이름이 생각이 안 나요.', promptZh: '这句话为什么不说 "이름이 안 생각나요"？', choices: [{ zh: '생각나다 的否定习惯是**倒置** → 생각이 안 나요（이름 이 생각이 안 나요）', correct: true }, { zh: '两句意思一样，可任意互换', correct: false }, { zh: '안 생각나요 是敬语', correct: false }, { zh: '생각이 안 나요 是过去时', correct: false }], explain: '母语者习惯 · 否定 안 插入 생각 和 나다 之间' },
  ],
};
