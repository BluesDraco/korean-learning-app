import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 8 · 1-4 상황 속으로 · 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖深夜独处 + 视频妈妈 + 隔墙 Haru 打气
 */
export const day8Scene: SceneSubQuestData = {
  day: 8, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在 301 号房，用一整句韩语告诉妈妈"我过得很好"',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd08-sc-s1',
      scenario: '深夜宿舍 301。你打开手机想给妈妈发消息，最想说的一句韩语是？',
      choices: [
        { ko: '엄마가 보고 싶어요.', zh: '我想妈妈。', correct: true },
        { ko: '엄마는 학생이에요.', zh: '妈妈是学生。（不对题）', correct: false },
        { ko: '엄마 있어요?', zh: '妈妈在吗？（问陌生人的语气，不对妈妈说）', correct: false },
        { ko: '엄마 얼마예요?', zh: '妈妈多少钱？（严重错误）', correct: false },
      ],
      explain: '「엄마가 보고 싶어요」= 我想妈妈。보고 싶다 的思念对象用主格 이/가',
    },
    {
      type: 'situation',
      id: 'd08-sc-s2',
      scenario: '你哭完擦干眼泪，对着镜子想给自己一句鼓励。最贴合"明天还要继续"的반말自励？',
      choices: [
        { ko: '내일도 화이팅. 괜찮아질 거야.', zh: '明天也加油。会好起来的。', correct: true },
        { ko: '내일 안 해요.', zh: '明天不做了。（放弃自己）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（不对题）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
      ],
      explain: '반말自励组合：내일도 화이팅（打气）+ 괜찮아질 거야（会好起来的·반말将来）。对自己说반말，是内心的"哥们你可以的"',
    },
    {
      type: 'situation',
      id: 'd08-sc-s3',
      scenario: 'Haru 隔着墙敲了敲："토리, 자?"（兔莉，睡了吗？）。你还没睡想告诉她"睡不着"，반말最自然的答法？',
      choices: [
        { ko: '아니, 잠이 안 와.', zh: '没，睡不着。（반말对朋友）', correct: true },
        { ko: '네, 잤어요.', zh: '嗯，睡了。（해요体，且矛盾）', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。（不对题）', correct: false },
        { ko: '몰라요.', zh: '不知道。', correct: false },
      ],
      explain: '반말 应对 반말 问句：아니(没·반말)+ 잠이 안 와(睡不着·반말)。「잠이 오다」= 犯困，否定 안 와',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd08-sc-d1',
      lines: [
        { speaker: '엄마', ko: '오늘 어땠어?', zh: '今天怎么样？' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '엄마, 나 잘 지내고 있어.', zh: '妈妈，我过得很好。（반말·对妈妈）', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（对妈妈太生分）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '저는 중국 사람이에요.', zh: '我是中国人。（不对题）', correct: false },
      ],
      explain: '对妈妈用반말显亲近：잘 지내고 있어（过得很好·반말）。留学生对家人视频的经典开头句',
    },
    {
      type: 'dialogue',
      id: 'd08-sc-d2',
      lines: [
        { speaker: 'Haru', ko: '오늘 힘들었지? 잘 자.', zh: '今天很累吧？晚安。' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '응, 좀. 잘 자, 하루야.', zh: '嗯，有点。晚安，Haru。', correct: true },
        { ko: '아니요, 저는 안 힘들어요.', zh: '不，我不累。（对朋友用해요体生分）', correct: false },
        { ko: '보고 싶어요.', zh: '我想你。（Haru 就在门口，说这个奇怪）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', correct: false },
      ],
      explain: '반말对반말：응（嗯）+ 좀（有点·委婉）+ 잘 자, 하루야（晚安 + 呼语 야）。同龄朋友之间的睡前对话',
    },
    {
      type: 'dialogue',
      id: 'd08-sc-d3',
      lines: [
        { speaker: '나', ko: '한국어 너무 어려워요.', zh: '韩语好难。' },
        { speaker: 'Haru', ko: '', zh: '' },
      ],
      blankSpeaker: 'Haru',
      choices: [
        { ko: '괜찮아. 나도 그랬어.', zh: '没事，我以前也是。（반말鼓励）', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '아니요, 저는 학생이에요.', zh: '不，我是学生。', correct: false },
        { ko: '없어요.', zh: '没有。', correct: false },
      ],
      explain: 'Haru 반말安慰：괜찮아(没事·반말) + 나도 그랬어(我以前也那样·반말过去式)。"我以前也是"是同伴分享经验的固定句',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd08-sc-c1',
      ko: '엄마가 보고 싶어요.',
      promptZh: '这句话最合适的使用场景是？',
      choices: [
        { zh: '一个人在外地生活，深夜想念妈妈时', correct: true },
        { zh: '在便利店买东西问价格时', correct: false },
        { zh: '进商店时向店员打招呼', correct: false },
        { zh: '在电梯里对陌生人的寒暄', correct: false },
      ],
      explain: '「보고 싶어요」= 想念（想见）。留学生、异地恋、离家远的人最常用的一句',
    },
    {
      type: 'context',
      id: 'd08-sc-c2',
      ko: '괜찮아질 거예요.',
      promptZh: '关于「괜찮아질 거예요」的用法，哪个描述最准确？',
      choices: [
        { zh: '安慰自己或对方"会好起来的"，鼓励+推测将来', correct: true },
        { zh: '道谢的正式说法', correct: false },
        { zh: '拒绝别人的委婉说法', correct: false },
        { zh: '过去时"以前是没事的"', correct: false },
      ],
      explain: '괜찮다(没事) + 아지다(变得) + ㄹ 거예요(将会·推测)。"会变成没事" = 会好起来。困难时对自己/朋友说的温柔句',
    },
  ],
};
