import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 35 · 2-4 상황 속으로 · 被问路 · 角色反转 */
export const day35Scene: SceneSubQuestData = {
  day: 5, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '弘爪站 · 第一次被问路',

  tasks: [
    { type: 'situation', id: 'd35-sc-s1', scenario: '海狸大叔问 "한빛 어학당 어디예요?" 你想给完整指路："从 2 号出口出去，往左一直走"，最标准的一句？', choices: [{ ko: '2번 출구로 나가서, 왼쪽으로 쭉 가세요.', zh: '从 2 号出口出去，往左一直走。', correct: true }, { ko: '2번 출구에서 왼쪽로 가세요.', zh: '从 2 号出口往左走。', correct: false }, { ko: '2번 출구까지 나가면 왼쪽에 가세요.', zh: '出到 2 号出口的话请去左边。', correct: false }, { ko: '2번 출구는 왼쪽예요.', zh: '2 号出口在左边。', correct: false }], explain: '完整方向 · 出口 + 나가서 + 方向 + 으로 + 쭉' },
    { type: 'situation', id: 'd35-sc-s2', scenario: '你想说"从家到学校 5 分钟"，最标准的一句？', choices: [{ ko: '집에서 학교까지 5분이에요.', zh: '从家到学校 5 分钟。', correct: true }, { ko: '집에 학교에 5분이에요.', zh: '家到学校 5 分钟。', correct: false }, { ko: '집로 학교로 5분이에요.', zh: '从家到学校 5 分钟。', correct: false }, { ko: '집에서 학교에서 5분이에요.', zh: '从家从学校 5 分钟。', correct: false }], explain: '에서 ~까지 起终点组合' },
    { type: 'situation', id: 'd35-sc-s3', scenario: '想说"用地铁去 5 分钟"，最标准的一句？', choices: [{ ko: '지하철로 가면 5분이에요.', zh: '用地铁去 5 分钟。', correct: true }, { ko: '지하철으로 가면 5분이에요.', zh: '用地铁去 5 分钟。', correct: false }, { ko: '지하철에서 가면 5분이에요.', zh: '从地铁去 5 分钟。', correct: false }, { ko: '지하철 5분이에요.', zh: '地铁 5 分钟。', correct: false }], explain: '지하철 末字 ㄹ收音 → 用 **로**' },

    { type: 'dialogue', id: 'd35-sc-d1', lines: [{ speaker: '海狸大叔', ko: '한빛 어학당 어디예요?', zh: '语学堂在哪？' }], blankSpeaker: '토리', choices: [{ ko: '2번 출구로 나가서, 왼쪽으로 쭉 가세요.', zh: '从 2 号出口出去，往左一直走。', correct: true }, { ko: '어학당은 예뻐요.', zh: '语学堂很漂亮。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false }], explain: '完整方向表达' },
    { type: 'dialogue', id: 'd35-sc-d2', lines: [{ speaker: '海狸大叔', ko: '고마워요, 학생.', zh: '谢谢，同学。' }], blankSpeaker: '토리', choices: [{ ko: '아니에요. 조심히 가세요.', zh: '不客气。请慢走。', correct: true }, { ko: '고마워요.', zh: '谢谢。（应说不客气）', correct: false }, { ko: '괜찮으세요?', zh: '您还好吗？', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: '아니에요 + 조심히 가세요 = 对陌生长辈标配' },
    { type: 'dialogue', id: 'd35-sc-d3', lines: [{ speaker: '路人', ko: '지하철역 어디예요?', zh: '地铁站在哪？' }], blankSpeaker: '토리', choices: [{ ko: '오른쪽으로 쭉 가면 3분쯤 걸어요.', zh: '往右一直走大概 3 分钟。', correct: true }, { ko: '오른쪽에 3분이에요.', zh: '在右边 3 分钟。', correct: false }, { ko: '몰라요.', zh: '不知道。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: '방향 + 으로 + 쭉 + 거리' },

    { type: 'context', id: 'd35-sc-c1', ko: '왼쪽으로 가세요.', promptZh: '这句话最适合在什么情境下说？', choices: [{ zh: '给别人指路 · 让对方沿某方向前进', correct: true }, { zh: '对方问自己去哪', correct: false }, { zh: '感叹左边的风景', correct: false }, { zh: '禁止对方往左走', correct: false }], explain: '~(으)로 + 가세요 = 指路的核心结构' },
    { type: 'context', id: 'd35-sc-c2', ko: '집에서 학교까지 5분이에요.', promptZh: '这句话的语法结构，哪句最准确？', choices: [{ zh: 'N1에서 N2까지 + 时间/距离 = 从 N1 到 N2 需要多久', correct: true }, { zh: 'N1에 N2에서 + 时间 = 意思一样', correct: false }, { zh: '에서 是位置助词，表存在', correct: false }, { zh: '까지 是原因助词', correct: false }], explain: '起点 에서 + 终点 까지 = 距离/时间表达' },
  ],
};
