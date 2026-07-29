import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 3 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 3 主流程对话 + 机场场景
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 3 题强制辨 짐/집 → 教会用耳朵抓收音差别
 */
export const day3Listen: ListenSubQuestData = {
  day: 3, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '听清 ㅁ 和 ㅂ 的收音差别',

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
    {
      id: 'd03-l2-m1',
      audioKo: '제 짐이 무거워요.',
      choices: [
        { text: '我的家很温暖。', correct: false },
        { text: '我的行李很重。', correct: true },
        { text: '我的包很轻。', correct: false },
        { text: '我的钱包丢了。', correct: false },
      ],
      explain: '짐(行李) + 이(主格) + 무거워요(重)。「짐」的 ㅁ 收音是关键',
    },
    {
      id: 'd03-l2-m2',
      audioKo: '집이 어디예요?',
      choices: [
        { text: '行李在哪里？', correct: false },
        { text: '你叫什么名字？', correct: false },
        { text: '你家在哪里？', correct: true },
        { text: '机场在哪里？', correct: false },
      ],
      explain: '집(家) + 이(主格) + 어디예요(在哪里)。「집」的 ㅂ 收音，跟「짐」只差一个字母',
    },
    {
      id: 'd03-l2-m3',
      audioKo: '저기요, 좀 도와주세요.',
      choices: [
        { text: '请问，帮个忙好吗？', correct: true },
        { text: '请问，这里是哪里？', correct: false },
        { text: '请问，你叫什么？', correct: false },
        { text: '请问，多少钱？', correct: false },
      ],
      explain: '저기요(请问) + 좀(稍微 / 缓和语气) + 도와주세요(请帮我)。留学生保命句',
    },
    {
      id: 'd03-l2-m4',
      audioKo: '정말 감사합니다.',
      choices: [
        { text: '真的很抱歉。', correct: false },
        { text: '真的非常感谢。', correct: true },
        { text: '真的没关系。', correct: false },
        { text: '再见。', correct: false },
      ],
      explain: '정말(真的) + 감사합니다(谢谢)。想更真诚地道谢就加 정말',
    },
    {
      id: 'd03-l2-m5',
      audioKo: '아, 죄송해요. 짐이요.',
      choices: [
        { text: '啊，谢谢。是行李。', correct: false },
        { text: '啊，对不起。是行李。', correct: true },
        { text: '啊，对不起。是家。', correct: false },
        { text: '啊，没关系。是包。', correct: false },
      ],
      explain: '죄송해요(对不起) + 짐이요(是行李的意思)。兔莉说错「집」后改口的关键句',
    },
  ],

  // ─── 听句填空：播完整句 → 挖一词，4 韩文选项 ───
  cloze: [
    {
      id: 'd03-l2-c1',
      audioKo: '제 짐이 무거워요.',
      clozeParts: ['제 ', '이 무거워요.'],
      choices: [
        { text: '짐', correct: true },
        { text: '집', correct: false },
        { text: '잠', correct: false },
        { text: '잡', correct: false },
      ],
      explain: '「짐」的收音是 ㅁ（鼻音，双唇闭合鼻腔震动）。「집」是 ㅂ（双唇闭合但不出气不震动），要听清楚',
    },
    {
      id: 'd03-l2-c2',
      audioKo: '집이 어디예요?',
      clozeParts: ['', '이 어디예요?'],
      choices: [
        { text: '짐', correct: false },
        { text: '집', correct: true },
        { text: '공항', correct: false },
        { text: '가방', correct: false },
      ],
      explain: '「집」ㅂ 收音（闭唇不出气）。ㅂ 双唇碰一下就停，跟 ㅁ 的鼻腔震动不同',
    },
    {
      id: 'd03-l2-c3',
      audioKo: '가방이 가벼워요.',
      clozeParts: ['가방이 ', '.'],
      choices: [
        { text: '무거워요', correct: false },
        { text: '가벼워요', correct: true },
        { text: '괜찮아요', correct: false },
        { text: '미안해요', correct: false },
      ],
      explain: '무겁다↔가볍다 = 重↔轻。都是 ㅂ 不规则变形',
    },
    {
      id: 'd03-l2-c4',
      audioKo: '정말 감사합니다.',
      clozeParts: ['', '감사합니다.'],
      choices: [
        { text: '정말', correct: true },
        { text: '괜찮아요', correct: false },
        { text: '죄송해요', correct: false },
        { text: '언니', correct: false },
      ],
      explain: '정말(真的) 是副词，放在动词/形容词前加强语气',
    },
  ],

  // ─── 听对话选回应：播前一句 → 选正确韩文回应 ───
  reply: [
    {
      id: 'd03-l2-r1',
      audioKo: '짐이 너무 무거워요.',
      promptZh: '兔莉说"行李太重了"，Minji 姐姐最可能回什么？',
      choices: [
        { text: '괜찮아요, 제가 도와줄게요.', correct: true },
        { text: '저는 학생이에요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
        { text: '안녕히 계세요.', correct: false },
      ],
      explain: '「제가 도와줄게요」= 我来帮你。姐姐对小妹的温柔口吻，用해요体最自然',
    },
    {
      id: 'd03-l2-r2',
      audioKo: '아, 죄송해요. 짐이요.',
      promptZh: '兔莉道歉说"是行李"，Minji 想安慰她，最可能说？',
      choices: [
        { text: '아니요, 저는 짐이에요.', correct: false },
        { text: '괜찮아요. 짐이 무거워 보여요.', correct: true },
        { text: '감사합니다. 죄송해요.', correct: false },
        { text: '집이 어디예요?', correct: false },
      ],
      explain: '「괜찮아요」= 没关系。收到对方道歉后的标准回应，比继续追问「집이요?」温柔多了',
    },
    {
      id: 'd03-l2-r3',
      audioKo: '짐 여기에 놓을게요.',
      promptZh: 'Minji 说"行李我放这儿"，兔莉最合适的回应是？',
      choices: [
        { text: '아니요, 괜찮아요.', correct: false },
        { text: '이름이 뭐예요?', correct: false },
        { text: '정말 감사합니다, 언니.', correct: true },
        { text: '저는 중국 사람이에요.', correct: false },
      ],
      explain: '被帮忙后加 언니 + 정말 감사합니다，语气自然又亲近，正对上主流程 Minji 变姐姐的桥段',
    },
  ],
};
