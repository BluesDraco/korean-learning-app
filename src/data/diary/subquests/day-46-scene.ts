import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 46 · 2-4 상황 속으로 · Haru의 생일 */
export const day46Scene: SceneSubQuestData = {
  day: 16, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '302 号门口 · 蜡烛点起来了',

  tasks: [
    { type: 'situation', id: 'd46-sc-s1', scenario: 'Haru 开门看到蛋糕，你想说"生日快乐"（반말），最自然的一句？', choices: [{ ko: '하루야, 생일 축하해!', zh: 'Haru，生日快乐！', correct: true }, { ko: '하루야, 생일 축하드립니다.', zh: 'Haru，恭祝您生日快乐。', correct: false }, { ko: '하루야, 생일이 있어.', zh: 'Haru，有生日。', correct: false }, { ko: '하루야, 축하해요.', zh: 'Haru，恭喜。', correct: false }], explain: '朋友间生日祝福반말' },
    { type: 'situation', id: 'd46-sc-s2', scenario: 'Haru 收下礼物红了眼睛，你想承诺"以后每年都陪你"，最自然的一句？', choices: [{ ko: '앞으로 매년 우리가 같이 있어 줄게.', zh: '以后每年都陪你。', correct: true }, { ko: '앞으로 매년 안 만날 거야.', zh: '以后每年都不见面。', correct: false }, { ko: '앞으로 매년 있어야 돼.', zh: '以后每年都得在。', correct: false }, { ko: '앞으로 매년 있어 드릴게.', zh: '以后每年都陪您。', correct: false }], explain: 'Tori 原句 · ~아/어 줄게 朋友承诺' },
    { type: 'situation', id: 'd46-sc-s3', scenario: '你想告诉 Haru"礼物是我们一起买的"（반말），最自然的一句？', choices: [{ ko: '우리가 다 같이 사줬어.', zh: '我们一起买的。', correct: true }, { ko: '우리가 다 같이 사 드렸어.', zh: '我们一起买送给您的。', correct: false }, { ko: '우리가 다 같이 사왔어.', zh: '我们一起买回来的。', correct: false }, { ko: '우리가 다 같이 사요.', zh: '我们一起买。', correct: false }], explain: '~아/어 줬어 朋友间施惠过去' },

    { type: 'dialogue', id: 'd46-sc-d1', lines: [{ speaker: '준호', ko: '자, 초 켰다. 문 열려면 벨 눌러.', zh: '好，蜡烛点了。让她开门就按门铃。' }], blankSpeaker: '토리', choices: [{ ko: '오케이, 하나 둘 셋에 다 같이 외쳐.', zh: '好，123 一起喊。', correct: true }, { ko: '싫어, 나 안 할래.', zh: '不要，我不做。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '몰라.', zh: '不知道。', correct: false }], explain: '协作气氛应答' },
    { type: 'dialogue', id: 'd46-sc-d2', lines: [{ speaker: '하루', ko: '…이건 처음이야. 진짜 고마워.', zh: '……这是第一次。真的谢谢。' }], blankSpeaker: '토리', choices: [{ ko: '앞으로 매년 우리가 같이 있어 줄게.', zh: '以后每年我们都陪你。', correct: true }, { ko: '울지 마, 슬픈 일이 아니야.', zh: '别哭，这不是伤心事。', correct: false }, { ko: '이제 됐어. 그만하자.', zh: '够了，别这样了。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }], explain: 'Tori 原句 · 温柔承诺' },
    { type: 'dialogue', id: 'd46-sc-d3', lines: [{ speaker: '하루', ko: '전에는 아무도 안 챙겨줬어.', zh: '以前没人为我准备。' }], blankSpeaker: '토리', choices: [{ ko: '이제 우리가 매년 챙겨 줄게.', zh: '以后每年我们为你准备。', correct: true }, { ko: '나도 안 챙길게.', zh: '我也不为你准备了。', correct: false }, { ko: '얼마예요?', zh: '多少钱？', correct: false }, { ko: '싫어.', zh: '不要。', correct: false }], explain: '~아/어 줄게 · 承诺替换过去' },

    { type: 'context', id: 'd46-sc-c1', ko: '앞으로 매년 있어 줄게.', promptZh: '这句话的施惠方向，哪句最准确？', choices: [{ zh: '**我**为**对方**做 · 承诺陪伴 · 朋友 / 平辈 → 줄게；对长辈换 드릴게', correct: true }, { zh: '对方为我做', correct: false }, { zh: '~줄게 是过去承诺', correct: false }, { zh: '~줄게 是形容词', correct: false }], explain: '~아/어 줄게 = 我为你做的承诺' },
    { type: 'context', id: 'd46-sc-c2', ko: '주다 vs 드리다', promptZh: '"给妈妈买了礼物"应该用哪个？', choices: [{ zh: '**드리다** · 我给长辈的动作 → 사드렸어요', correct: true }, { zh: '주다 · 我给长辈用 사줬어요', correct: false }, { zh: '两者一样', correct: false }, { zh: '给长辈不用施惠动词', correct: false }], explain: '엄마한테 사드렸어요（O）· 사줬어요（X 失礼）' },
  ],
};
