import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 37 · 2-5 Boss 战 · 🍲 四个人一锅红油 */
export const day37Boss: BossSubQuestData = {
  day: 7, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '훠궈 관문',
  subtitle: '🍲 妈妈的味道 → 朋友的味道',
  intro: '301 号房，四个座位。电磁炉架在小书桌上，锅里红油翻滚，Junho 的尾巴在抖，Minji 打开手机准备录视频，Haru 认真地把青菜下进锅。今晚要用韩语说清每一句邀约、每一句"太辣了"、每一句"跟米饭一起吃就好"。',
  outroHook: '桌上四个空碗，四张红彤彤的脸。Haru 起身把碗收进厨房，回头："다음 주에 또 할까?" (下周再来一次吗？) 妈妈的味道，已经变成朋友的味道。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd37-b5-t1', audioKo: '오늘 밤에 우리 집에서 훠궈 먹을래?', choices: [{ text: '今晚要来我家吃火锅吗？',          correct: true }, { text: '今晚我要吃火锅。',           correct: false }, { text: '你昨晚吃了火锅吗？',         correct: false }, { text: '明晚来家里吃饭。',              correct: false }], explain: '~을래? 询问对方意愿' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd37-b5-t2', audioKo: '같이 먹으니까 더 맛있어요.',        choices: [{ text: '一起吃更好吃。',                    correct: true }, { text: '一起吃比较累。',               correct: false }, { text: '一个人吃更好吃。',              correct: false }, { text: '不能一起吃。',                    correct: false }], explain: '~(으)니까 因果' } },
    { type: 'choice',  label: '收音判定',     task: { id: 'd37-b5-t3', promptZh: '"要吃什么？"哪句正确？',                                                                                                              choices: [{ text: '뭐 먹ㄹ래요?',                  correct: false }, { text: '뭐 먹을래요?',                correct: true }, { text: '뭐 먹까요?',                     correct: false }, { text: '뭐 먹래요?',                        correct: false }], explain: '먹다 有收音 → **을래요**' } },
    { type: 'choice',  label: '句型区分',     task: { id: 'd37-b5-t4', promptZh: '"我们几点去啊？"哪句正确？',                                                                                                        choices: [{ text: '몇 시에 갈래?',                   correct: false }, { text: '몇 시에 갈까?',                correct: true }, { text: '몇 시에 가을까?',                correct: false }, { text: '몇 시에 갈네?',                     correct: false }], explain: '共同提议 · ~ㄹ까' } },
    { type: 'choice',  label: '认词',         task: { id: 'd37-b5-t5', promptKo: '초대하다', promptHangul: 'cho-dae-ha-da',                                                                                             choices: [{ text: '邀请',                    correct: true }, { text: '道歉',           correct: false }, { text: '拒绝',        correct: false }, { text: '感谢',            correct: false }], explain: '초대 + 하다' } },
    { type: 'compose', label: '组句',         task: { id: 'd37-b5-t6', zhHint: '今晚要来我家吃火锅吗？',                                                                                                              audioKo: '오늘 밤에 우리 집에서 훠궈 먹을래?', answer: ['오늘 밤에', '우리 집에서', '훠궈', '먹을래?'], tokens: ['오늘 밤에', '우리 집에서', '훠궈', '먹을래?', '먹었어?', '먹을까?', '먹어요?'], explain: '邀约核心句 · 询问意愿' } },
    { type: 'compose', label: '组句',         task: { id: 'd37-b5-t7', zhHint: '一起散步吗？',                                                                                                                        audioKo: '같이 산책할까요?',                    answer: ['같이', '산책할까요?'],                    tokens: ['같이', '산책할까요?', '산책하까요?', '산책할래요?', '혼자', '산책해요?'],                             explain: '~할까요 共同提议' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd37-b5-t8', promptZh: 'Junho 满头汗要水牛奶。你想安慰他"和米饭一起吃就好"，最自然的一句？',                                                              choices: [{ text: '밥이랑 같이 먹으면 괜찮아.',      correct: true }, { text: '밥 먹지 마.',                correct: false }, { text: '우유 마시지 마.',             correct: false }, { text: '싫어.',                       correct: false }], explain: '解辣妙招 · ~(으)면' } },
  ],
};
