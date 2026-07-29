import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 36 · 2-4 상황 속으로 · 火锅底料的包裹 */
export const day36Scene: SceneSubQuestData = {
  day: 6, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '打开箱子的那一刻',

  tasks: [
    { type: 'situation', id: 'd36-sc-s1', scenario: '你想告诉 Haru "妈妈给我寄了包裹"（对妈妈用敬语），最标准的一句？', choices: [{ ko: '엄마가 소포를 보내주셨어.', zh: '妈妈给我寄了包裹。', correct: true }, { ko: '엄마가 소포를 보내줬어.', zh: '妈妈给我寄了包裹。', correct: false }, { ko: '엄마한테 소포를 보내드렸어.', zh: '我给妈妈寄了包裹。', correct: false }, { ko: '엄마가 소포를 보냈네.', zh: '妈妈寄包裹了呢。', correct: false }], explain: '반말对朋友说话 + 妈妈仍是敬语 → 주셨어' },
    { type: 'situation', id: 'd36-sc-s2', scenario: '你要给妈妈寄回礼，想告诉 Junho "我给妈妈寄了包裹"，最标准的一句？', choices: [{ ko: '엄마한테 소포를 보내드렸어.', zh: '我给妈妈寄了包裹。', correct: true }, { ko: '엄마한테 소포를 보내주셨어.', zh: '妈妈给我寄了包裹。', correct: false }, { ko: '엄마가 소포를 보냈어.', zh: '妈妈寄了包裹。', correct: false }, { ko: '엄마한테서 소포를 보냈어.', zh: '从妈妈那里寄了包裹。', correct: false }], explain: '我给长辈 → 드리다 · 보내드렸어' },
    { type: 'situation', id: 'd36-sc-s3', scenario: '浣熊阿姨说你有包裹，你想道谢并说"我现在就去取"，最自然的一句？', choices: [{ ko: '아, 감사합니다. 지금 갈게요.', zh: '啊，谢谢。我现在就去。', correct: true }, { ko: '아니에요.', zh: '不客气。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라요.', zh: '不知道。', correct: false }], explain: '감사합니다 + ~ㄹ게요 承诺去取' },

    { type: 'dialogue', id: 'd36-sc-d1', lines: [{ speaker: '경비실 아주머니', ko: '토리, 소포 왔어요. 경비실에서 찾아가세요.', zh: '兔莉，有你的包裹，请到值班室领。' }], blankSpeaker: '토리', choices: [{ ko: '아, 감사합니다. 지금 갈게요.', zh: '啊，谢谢。现在就去。', correct: true }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라요.', zh: '不知道。', correct: false }, { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false }], explain: '承诺形 ~ㄹ게요' },
    { type: 'dialogue', id: 'd36-sc-d2', lines: [{ speaker: '하루', ko: '토리, 우는 거야?', zh: '兔莉，你在哭吗？' }], blankSpeaker: '토리', choices: [{ ko: '아니야, 웃는 거야.', zh: '没有，我在笑。', correct: true }, { ko: '싫어, 저리 가.', zh: '不要，走开。', correct: false }, { ko: '몰라, 얼마예요?', zh: '不知道，多少钱？', correct: false }, { ko: '만나서 반가워.', zh: '很高兴认识你。', correct: false }], explain: 'Tori 原句 · 强忍情绪的반말回应' },
    { type: 'dialogue', id: 'd36-sc-d3', lines: [{ speaker: '하루', ko: '엄마가 뭘 보내주셨어?', zh: '妈妈给你寄了什么？' }], blankSpeaker: '토리', choices: [{ ko: '훠궈 재료랑 고춧가루를 보내주셨어.', zh: '寄了火锅底料和辣椒粉。', correct: true }, { ko: '훠궈 재료를 보냈어.', zh: '寄了火锅底料。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '고춧가루가 없어.', zh: '没有辣椒粉。', correct: false }], explain: '반말对朋友 + 妈妈保持敬语 주셨어' },

    { type: 'context', id: 'd36-sc-c1', ko: '엄마가 소포를 보내주셨어요.', promptZh: '这句话最适合在什么情境下说？', choices: [{ zh: '向别人转述"长辈为我做了___"这件事', correct: true }, { zh: '拒绝对方好意', correct: false }, { zh: '要求对方寄东西', correct: false }, { zh: '道歉自己迟到', correct: false }], explain: '~아/어 주셨어요 = 强调长辈心意的敬语过去时' },
    { type: 'context', id: 'd36-sc-c2', ko: '엄마한테 돈을 드렸어요.', promptZh: '这句话的语义方向是什么？', choices: [{ zh: '我给妈妈钱（我 → 长辈）', correct: true }, { zh: '妈妈给我钱（长辈 → 我）', correct: false }, { zh: '妈妈让我给别人钱', correct: false }, { zh: '妈妈还没给我钱', correct: false }], explain: '드리다 = 我给长辈 · 与 주다（别人给我）方向相反' },
  ],
};
