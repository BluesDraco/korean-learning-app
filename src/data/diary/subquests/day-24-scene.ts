import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 24 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：四人群聊约定咖啡 · 邀请→附和→敲定→确认全流程
 */
export const day24Scene: SceneSubQuestData = {
  day: 24, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在群聊里完成一次完整约定',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd24-sc-s1',
      scenario: 'Junho 在群里发「내일 카페 갈래?」，你想附和并问在哪见，最自然的一句？',
      choices: [
        { ko: '같이 가자! 어디서 만나?', zh: '一起去！在哪见？', correct: true },
        { ko: '같이 카페에 만나요?', zh: '在咖啡馆见？', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '카페가 뭐야?', zh: '咖啡馆是什么？', correct: false },
      ],
      explain: '반말群聊 → 같이 가자（附和）+ 어디서 만나?（问动作地点）',
    },
    {
      type: 'situation',
      id: 'd24-sc-s2',
      scenario: 'Junho 定「학교 정문 5시」，你想答应，最简短口语的一句？',
      choices: [
        { ko: '알았어! 콜!', zh: '好！成交！', correct: true },
        { ko: '네, 알겠습니다.', zh: '好的，明白了。', correct: false },
        { ko: '싫어.', zh: '不要。', correct: false },
        { ko: '학교가 어디야?', zh: '学校在哪？', correct: false },
      ],
      explain: '朋友间约定敲定 → 알았어 + 콜。「알겠습니다」是합쇼체在这里错语境',
    },
    {
      type: 'situation',
      id: 'd24-sc-s3',
      scenario: 'Haru 私下问你「진짜 올 거지?」，你想强烈肯定+承诺一定去，最有决心的一句？',
      choices: [
        { ko: '당연하지! 꼭 갈게!', zh: '当然了！一定去！', correct: true },
        { ko: '몰라.', zh: '不知道。', correct: false },
        { ko: '아마 갈래.', zh: '大概想去。', correct: false },
        { ko: '싫어.', zh: '不要。', correct: false },
      ],
      explain: '朋友质疑决心 → 당연하지 + 꼭 갈게。꼭（一定）+ 갈게（承诺）双重加强',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd24-sc-d1',
      lines: [
        { speaker: 'Junho', ko: '내일 학교 끝나고 카페 갈래?', zh: '明天放学去咖啡馆吗？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '같이 가자! 어디서 만나?', zh: '一起去！在哪见？', correct: true },
        { ko: '카페가 뭐야?', zh: '咖啡馆是什么？', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
      ],
      explain: '被邀请 → 같이 附和 + 어디서 확인。这套流程比只说 "좋아" 更实用',
    },
    {
      type: 'dialogue',
      id: 'd24-sc-d2',
      lines: [
        { speaker: 'Minji', ko: '새로 생긴 데 있어. 같이 가자!', zh: '有家新开的。一起去吧！' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '좋아! 어디야?', zh: '好啊！在哪？', correct: true },
        { ko: '싫어.', zh: '不要。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '카페가 뭐야?', zh: '咖啡馆是什么？', correct: false },
      ],
      explain: '朋友提议 → 좋아（好啊）+ 어디야?（在哪呢）。반말群聊最短应答',
    },
    {
      type: 'dialogue',
      id: 'd24-sc-d3',
      lines: [
        { speaker: 'Haru', ko: '토리 진짜 올 거지?', zh: '兔莉真的会来吧？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '당연하지! 진짜 갈게!', zh: '当然了！真的去！', correct: true },
        { ko: '몰라.', zh: '不知道。', correct: false },
        { ko: '싫어.', zh: '不要。', correct: false },
        { ko: '카페가 어디야?', zh: '咖啡馆在哪？', correct: false },
      ],
      explain: '당연하지 + 갈게 = 强烈肯定 + 承诺。朋友质疑用这套回击',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd24-sc-c1',
      ko: '같이 가요!',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '想跟对方一起去某个地方时的礼貌邀请或附和', correct: true },
        { zh: '拒绝一起去', correct: false },
        { zh: '感谢对方陪伴', correct: false },
        { zh: '独自出门时告知家人', correct: false },
      ],
      explain: '같이 + 해요体 = 礼貌版邀请。반말场合 = 같이 가자!',
    },
    {
      type: 'context',
      id: 'd24-sc-c2',
      ko: '당연하지!',
      promptZh: '这句话最可能出现在什么关系？',
      choices: [
        { zh: '朋友/同龄人之间的强烈肯定 "那还用说"', correct: true },
        { zh: '对老师的礼貌回应', correct: false },
        { zh: '收到礼物时的道谢', correct: false },
        { zh: '第一次见面时的自我介绍', correct: false },
      ],
      explain: '반말 语尾 지。对长辈要用 당연하죠。语感差别决定场合',
    },
  ],
};
