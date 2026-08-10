import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 54 · 2-4 상황 속으로 · 讨价还价 */
export const day54Scene: SceneSubQuestData = {
  day: 24, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '동물문 시장 · 从 25000 砍到 20000',

  tasks: [
    { type: 'situation', id: 'd54-sc-s1', scenario: '你想问外套多少钱，最自然的一句？', choices: [{ ko: '저기요, 이 재킷 얼마예요?', zh: '那个，这件外套多少钱？', correct: true }, { ko: '재킷 얼마?', zh: '外套多少钱？', correct: false }, { ko: '재킷 있어요?', zh: '有外套吗？', correct: false }, { ko: '재킷 사면 돼요?', zh: '外套买了行吗？', correct: false }], explain: 'Tori 原句 · 저기요 + 얼마예요' },
    { type: 'situation', id: 'd54-sc-s2', scenario: '你想说"便宜一点吧。我是学生"，最自然的一句？', choices: [{ ko: '조금만 깎아주세요. 학생이에요.', zh: '便宜一点吧。我是学生。', correct: true }, { ko: '조금 깎으세요. 학생이에요.', zh: '便宜一点。我是学生。', correct: false }, { ko: '조금 깎아 드릴게요. 학생이에요.', zh: '我给您便宜一点。我是学生。', correct: false }, { ko: '깎아 있어요. 학생이에요.', zh: '有便宜的。我是学生。', correct: false }], explain: '~아/어 주세요 + 조금만' },
    { type: 'situation', id: 'd54-sc-s3', scenario: '你想说"就 20000 元。真的照顾一下"，最自然的一句？', choices: [{ ko: '20,000원 딱 있어요. 진짜 좀만 봐주세요.', zh: '就 20000。真的照顾一下。', correct: true }, { ko: '20,000원 있어요. 봐 드리세요.', zh: '有 20000 元。请您照顾一下。', correct: false }, { ko: '20,000원만 있어요. 봐주고 있어요.', zh: '只有 20000 元。您在照顾着。', correct: false }, { ko: '20,000원. 봐요.', zh: '20000 元。看。', correct: false }], explain: '봐주다 = 照顾 · ~아/어 주세요' },

    { type: 'dialogue', id: 'd54-sc-d1', lines: [{ speaker: '獾店主', ko: '25,000원이에요.', zh: '25,000 元。' }], blankSpeaker: '토리', choices: [{ ko: '조금만 깎아주세요. 학생이에요.', zh: '便宜一点吧。我是学生。', correct: true }, { ko: '살게요.', zh: '我买。', correct: false }, { ko: '몰라요.', zh: '不知道。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: 'Tori 原句 · 讨价起手式' },
    { type: 'dialogue', id: 'd54-sc-d2', lines: [{ speaker: '獾店主', ko: '얼마 가지고 있어?', zh: '你带了多少？' }], blankSpeaker: '토리', choices: [{ ko: '20,000원 딱 있어요. 진짜 좀만 봐주세요.', zh: '就 20000 元。真的照顾一下。', correct: true }, { ko: '많이 있어요.', zh: '带了很多。', correct: false }, { ko: '없어요.', zh: '没有。', correct: false }, { ko: '몰라요.', zh: '不知道。', correct: false }], explain: '딱 = 刚好 · 봐주다 = 照顾' },
    { type: 'dialogue', id: 'd54-sc-d3', lines: [{ speaker: '獾店主', ko: '에휴, 학생 성공.', zh: '哎，学生赢了。' }], blankSpeaker: '토리', choices: [{ ko: '감사합니다! 잘 입을게요.', zh: '谢谢！我会好好穿的。', correct: true }, { ko: '아, 안 살래요.', zh: '啊，我不买了。', correct: false }, { ko: '더 깎아주세요.', zh: '再便宜点。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: '收下让步 + 承诺形' },

    { type: 'context', id: 'd54-sc-c1', ko: '조금만 깎아주세요.', promptZh: '这句话最适合在什么情境下说？', choices: [{ zh: '**传统市场 / 小店讨价还价** · ~아/어 주세요 请求 · 조금만 = 一点点（软化）', correct: true }, { zh: '连锁店定价商品', correct: false }, { zh: '拒绝店主', correct: false }, { zh: '感叹价格便宜', correct: false }], explain: '传统市场 / 시장 高频 · 大型商场不用' },
    { type: 'context', id: 'd54-sc-c2', ko: '봐주다', promptZh: '这个词在讨价场景中的意思，哪句最准确？', choices: [{ zh: '照顾 / 通融 · 请对方给点面子 · 客气讨价常用', correct: true }, { zh: '看着 · 直译看', correct: false }, { zh: '监督 / 审查', correct: false }, { zh: '试戴 / 试穿', correct: false }], explain: '~아/어 주다 引申 · 语境化含义' },
  ],
};
