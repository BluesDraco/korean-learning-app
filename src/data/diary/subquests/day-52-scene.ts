import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 52 · 2-4 상황 속으로 · 弘爪街三人狂奔 */
export const day52Scene: SceneSubQuestData = {
  day: 22, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '弘爪街霓虹灯 · 围巾飞了 · 笔掉了',

  tasks: [
    { type: 'situation', id: 'd52-sc-s1', scenario: '想说"喘得说不了话"（반말），最自然的一句？', choices: [{ ko: '숨차서 말을 못 하겠어.', zh: '喘得说不了话。', correct: true }, { ko: '숨차니까 말을 못 하겠어.', zh: '因为喘所以说不了话。', correct: false }, { ko: '숨차 말을 못 하겠어.', zh: '喘得说不了话。', correct: false }, { ko: '숨차고 말을 못 하겠어.', zh: '又喘又说不了话。', correct: false }], explain: '状态 → 结果 · ~아/어서' },
    { type: 'situation', id: 'd52-sc-s2', scenario: '想说"捡起笔然后又跑了起来"（动作先后），最自然的一句？', choices: [{ ko: '펜을 주워서 다시 뛰었어요.', zh: '捡起笔然后又跑了起来。', correct: true }, { ko: '펜을 주우고 다시 뛰었어요.', zh: '捡起笔，然后又跑了起来。', correct: false }, { ko: '펜을 주웠어서 다시 뛰었어요.', zh: '因为捡起了笔又跑了起来。', correct: false }, { ko: '펜을 줍으니까 다시 뛰었어요.', zh: '因为捡笔又跑了起来。', correct: false }], explain: '动作先后 · ~아/어서' },
    { type: 'situation', id: 'd52-sc-s3', scenario: '雨中提醒朋友"下雨了请带伞"，最自然的一句？', choices: [{ ko: '비가 오니까 우산 가져가세요.', zh: '下雨了请带伞。', correct: true }, { ko: '비가 와서 우산 가져가세요.', zh: '因为下雨了请带伞。', correct: false }, { ko: '비가 오면 우산 가져가세요.', zh: '如果下雨请带伞。', correct: false }, { ko: '비가 오지만 우산 가져가세요.', zh: '虽然下雨请带伞。', correct: false }], explain: '后接命令 → ~(으)니까 · Day 32 pitfall' },

    { type: 'dialogue', id: 'd52-sc-d1', lines: [{ speaker: '준호', ko: '14분 남았어! 뛰어!', zh: '还剩 14 分钟！跑！' }], blankSpeaker: '토리', choices: [{ ko: '알았어! 나도 뛴다!', zh: '好！我也跑！', correct: true }, { ko: '싫어. 안 가.', zh: '不要，我不去。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: '반말命令回应' },
    { type: 'dialogue', id: 'd52-sc-d2', lines: [{ speaker: '준호', ko: '아, 내 목도리! 떨어졌어!', zh: '啊，我围巾！掉了！' }], blankSpeaker: '토리', choices: [{ ko: '준호야, 다음에 사면 돼! 뛰어!', zh: 'Junho，下次买就行！跑！', correct: true }, { ko: '주우러 가!', zh: '去捡回来！', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: 'Tori 原句 · ~(으)면 돼' },
    { type: 'dialogue', id: 'd52-sc-d3', lines: [{ speaker: '하루', ko: '토리, 이거! 당근 펜 떨어뜨렸어.', zh: '兔莉，这个！你弄掉了胡萝卜笔。' }], blankSpeaker: '토리', choices: [{ ko: '고마워! 이따 얘기하자! 뛰어!', zh: '谢谢！等下说！跑！', correct: true }, { ko: '너 가져.', zh: '你拿着。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '싫어.', zh: '不要。', correct: false }], explain: '边跑边道谢 · 반말简短' },

    { type: 'context', id: 'd52-sc-c1', ko: '~아/어서 vs ~(으)니까', promptZh: '两者的关键差别，哪句最准确？', choices: [{ zh: '~아/어서 后**不能接命令/建议**；~(으)니까 可以 · "비가 오니까 우산 가져가세요"', correct: true }, { zh: '两者完全一样', correct: false }, { zh: '~아/어서 是过去时', correct: false }, { zh: '~(으)니까 只用于书面语', correct: false }], explain: 'Day 32 pitfall 重申' },
    { type: 'context', id: 'd52-sc-c2', ko: '주워서 뛰었어요', promptZh: '这句话中 ~아/어서 的功能，哪句最准确？', choices: [{ zh: '**动作先后** · 同一主体 · 前动作为后动作创造前提 · 不是原因', correct: true }, { zh: '因果关系', correct: false }, { zh: '假设条件', correct: false }, { zh: '让步转折', correct: false }], explain: '~아/어서 一形两义 · 语境判断' },
  ],
};
