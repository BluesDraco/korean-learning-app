import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 60 · 2-4 상황 속으로 · 中级毕业典礼 */
export const day60Scene: SceneSubQuestData = {
  day: 30, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '305 호 · 5 分钟自述 · 짐 → 집',

  tasks: [
    { type: 'situation', id: 'd60-sc-s1', scenario: '毕业演讲开场"大家好，我是兔莉"（正式敬语），最自然的一句？', choices: [{ ko: '안녕하세요, 저는 토리예요.', zh: '大家好，我是兔莉。', correct: true }, { ko: '안녕, 나 토리야.', zh: '你好，我是兔莉。', correct: false }, { ko: '토리 나왔어.', zh: '兔莉出场了。', correct: false }, { ko: '나 토리인데.', zh: '我是兔莉。', correct: false }], explain: 'Tori 演讲开场 · 저는 + 名字 + 예요' },
    { type: 'situation', id: 'd60-sc-s2', scenario: '主题句"60 天前带来了行李，现在有了家"，最自然的一句？', choices: [{ ko: '60일 전에 짐을 가져왔지만, 지금은 집이 있어요.', zh: '60 天前带来了行李，现在有了家。', correct: true }, { ko: '60일 전에 짐을 가져오지만 지금은 집이 있어요.', zh: '60 天前带来行李，现在有了家。', correct: false }, { ko: '60일 전에 짐을 가져와서 지금은 집이 있어요.', zh: '因为 60 天前带来了行李，现在有了家。', correct: false }, { ko: '60일 전에 짐을 가져온데 지금은 집이 있어요.', zh: '60 天前带来了行李，现在有了家。', correct: false }], explain: 'Day 60 主题句 · ~았/었지만' },
    { type: 'situation', id: 'd60-sc-s3', scenario: '想说"我的家是这间教室。我的家人在这里"，最自然的一句？', choices: [{ ko: '제 집은 이 교실입니다. 제 가족은 여기에 있어요.', zh: '我的家是这间教室。我的家人在这里。', correct: true }, { ko: '제 집은 이 교실이 있어요. 제 가족은 여기에 있어요.', zh: '我的家有这间教室。我的家人在这里。', correct: false }, { ko: '제 집은 여기서 있어요.', zh: '我的家在这里。', correct: false }, { ko: '제 가족은 없어요.', zh: '我没有家人。', correct: false }], explain: 'Tori 重新定义家' },

    { type: 'dialogue', id: 'd60-sc-d1', lines: [{ speaker: '토리 (연설)', ko: '60일 전에 짐을 가져왔지만, 지금은 집이 있어요.', zh: '60 天前带来了行李，现在有了家。' }], blankSpeaker: '토리 (연설)', choices: [{ ko: '제 집은 이 교실입니다. 제 가족은 여기에 있어요. 감사합니다.', zh: '我的家是这间教室。我的家人在这里。谢谢。', correct: true }, { ko: '집이 없어서 감사합니다.', zh: '因为没有家，谢谢。', correct: false }, { ko: '얼마예요? 감사합니다.', zh: '多少钱？谢谢。', correct: false }, { ko: '집이 어디예요? 감사합니다.', zh: '家在哪？谢谢。', correct: false }], explain: '演讲收尾 · 家 = 教室 + 朋友' },
    { type: 'dialogue', id: 'd60-sc-d2', lines: [{ speaker: '홍학 선생님', ko: '토리 학생, 중급반 졸업. 대학 입학 준비반으로 올라가세요.', zh: '兔莉，中级班毕业。请升到大学入学准备班。' }], blankSpeaker: '토리', choices: [{ ko: '감사합니다. 계속 열심히 하겠습니다.', zh: '谢谢。会继续努力。', correct: true }, { ko: '아니에요, 저 안 갈래요.', zh: '不了，我不去。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라요.', zh: '不知道。', correct: false }], explain: '正式感谢 + ~겠습니다 承诺' },
    { type: 'dialogue', id: 'd60-sc-d3', lines: [{ speaker: '준호', ko: '토리, 진짜 축하해!', zh: '兔莉，真的祝贺！' }], blankSpeaker: '토리', choices: [{ ko: '이 60일, 너희가 내 가족이었어. 진심으로 고마워.', zh: '这 60 天，你们就是我的家人。真心谢谢。', correct: true }, { ko: '이제 다 끝났어. 잘 가.', zh: '现在都结束了，再见。', correct: false }, { ko: '나 대학 안 갈래.', zh: '我不去上大学。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: 'Tori 原句 · 家人重新定义' },

    { type: 'context', id: 'd60-sc-c1', ko: '짐을 가져왔지만 지금은 집이 있어요.', promptZh: '这句话的语言层双关，哪句最准确？', choices: [{ zh: '짐(行李，Day 3 首犯) → 집(家，Day 60 收束) · 差一个收音 · 60 天成长的词语隐喻', correct: true }, { zh: '两个词无关', correct: false }, { zh: '짐 = 未来 · 집 = 过去', correct: false }, { zh: '两个词完全一样', correct: false }], explain: '首尾呼应 · 语言双关' },
    { type: 'context', id: 'd60-sc-c2', ko: '언어 학교 졸업. 근데 이 이야기는 이제 시작이야.', promptZh: 'Tori 内心 OS 的意义，哪句最准确？', choices: [{ zh: '**语言学校**毕业 · 但**兽尔生活**的故事才开始 · 阶段收束 + 未来铺垫', correct: true }, { zh: '完全结束了', correct: false }, { zh: '要回国了', correct: false }, { zh: '不用再学', correct: false }], explain: 'Day 61+ 大学篇铺垫 · 未来延续' },
  ],
};
