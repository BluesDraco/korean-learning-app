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
  subtitle: '听清 ㅁ 和 ㅂ 的收音差别', subtitleEn: 'Hear the difference between the final consonants ㅁ and ㅂ.',

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
    {
      id: 'd03-l2-m1',
      audioKo: '제 짐이 무거워요.',
      choices: [
        { text: '我的家很温暖。', textEn: 'My home is warm.', correct: false },
        { text: '我的行李很重。', textEn: 'My luggage is heavy.', correct: true },
        { text: '我的包很轻。', textEn: 'My bag is light.', correct: false },
        { text: '我的钱包丢了。', textEn: 'I lost my wallet.', correct: false },
      ],
      explain: '짐(行李) + 이(主格) + 무거워요(重)。「짐」的 ㅁ 收音是关键', explainEn: '짐 (luggage) + 이 (subject marker) + 무거워요 (heavy). The ㅁ batchim in 짐 is key.',
    },
    {
      id: 'd03-l2-m2',
      audioKo: '집이 어디예요?',
      choices: [
        { text: '行李在哪里？', textEn: 'Where is the luggage?', correct: false },
        { text: '你叫什么名字？', textEn: 'What\'s your name?', correct: false },
        { text: '你家在哪里？', textEn: 'Where is your house?', correct: true },
        { text: '机场在哪里？', textEn: 'Where is the airport?', correct: false },
      ],
      explain: '집(家) + 이(主格) + 어디예요(在哪里)。「집」的 ㅂ 收音，跟「짐」只差一个字母', explainEn: '집 (home) + 이 (subject marker) + 어디예요 (where). The ㅂ batchim in 집 differs from 짐 by just one letter.',
    },
    {
      id: 'd03-l2-m3',
      audioKo: '저기요, 좀 도와주세요.',
      choices: [
        { text: '请问，帮个忙好吗？', textEn: 'Excuse me, could you help me?', correct: true },
        { text: '请问，这里是哪里？', textEn: 'Excuse me, where is this?', correct: false },
        { text: '请问，你叫什么？', textEn: 'Excuse me, what\'s your name?', correct: false },
        { text: '请问，多少钱？', textEn: 'Excuse me, how much is it?', correct: false },
      ],
      explain: '저기요(请问) + 좀(稍微 / 缓和语气) + 도와주세요(请帮我)。留学生保命句', explainEn: '저기요 (excuse me) + 좀 (a bit / softens tone) + 도와주세요 (please help me). A lifesaver for international students.',
    },
    {
      id: 'd03-l2-m4',
      audioKo: '정말 감사합니다.',
      choices: [
        { text: '真的很抱歉。', textEn: 'I\'m really sorry.', correct: false },
        { text: '真的非常感谢。', textEn: 'Thank you so much.', correct: true },
        { text: '真的没关系。', textEn: 'It\'s really okay.', correct: false },
        { text: '再见。', textEn: 'Goodbye.', correct: false },
      ],
      explain: '정말(真的) + 감사합니다(谢谢)。想更真诚地道谢就加 정말', explainEn: '정말 (really) + 감사합니다 (thank you). Add 정말 to sound more sincere.',
    },
    {
      id: 'd03-l2-m5',
      audioKo: '아, 죄송해요. 짐이요.',
      choices: [
        { text: '啊，谢谢。是行李。', textEn: 'Ah, thank you. It\'s luggage.', correct: false },
        { text: '啊，对不起。是行李。', textEn: 'Oh, sorry. I meant luggage.', correct: true },
        { text: '啊，对不起。是家。', textEn: 'Ah, sorry. It\'s home.', correct: false },
        { text: '啊，没关系。是包。', textEn: 'Ah, it\'s okay. It\'s a bag.', correct: false },
      ],
      explain: '죄송해요(对不起) + 짐이요(是行李的意思)。兔莉说错「집」后改口的关键句', explainEn: '죄송해요 (sorry) + 짐이요 (it\'s luggage). The key phrase Tori uses to correct herself after saying 집.',
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
      explain: '「짐」的收音是 ㅁ（鼻音，双唇闭合鼻腔震动）。「집」是 ㅂ（双唇闭合但不出气不震动），要听清楚', explainEn: 'The batchim in 짐 is ㅁ (nasal, lips closed with nasal vibration). In 집 it\'s ㅂ (lips closed, no air or vibration). Listen carefully.',
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
      explain: '「집」ㅂ 收音（闭唇不出气）。ㅂ 双唇碰一下就停，跟 ㅁ 的鼻腔震动不同', explainEn: 'The ㅂ batchim in 집 (lips closed, no air). ㅂ is a quick lip touch, unlike the nasal vibration of ㅁ.',
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
      explain: '무겁다↔가볍다 = 重↔轻。都是 ㅂ 不规则变形', explainEn: '무겁다↔가볍다 = heavy↔light. Both are ㅂ irregular conjugations.',
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
      explain: '정말(真的) 是副词，放在动词/形容词前加强语气', explainEn: '정말 (really) is an adverb placed before verbs/adjectives to emphasize.',
    },
  ],

  // ─── 听对话选回应：播前一句 → 选正确韩文回应 ───
  reply: [
    {
      id: 'd03-l2-r1',
      audioKo: '짐이 너무 무거워요.',
      promptZh: '兔莉说"行李太重了"，Minji 姐姐最可能回什么？', promptZhEn: 'Tori says "the luggage is too heavy," what would Minji unnie most likely reply?',
      choices: [
        { text: '괜찮아요, 제가 도와줄게요.', correct: true },
        { text: '저는 학생이에요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
        { text: '안녕히 계세요.', correct: false },
      ],
      explain: '「제가 도와줄게요」= 我来帮你。姐姐对小妹的温柔口吻，用해요体最自然', explainEn: '제가 도와줄게요 = I\'ll help you. A gentle tone from an older sister to a younger one, most natural in 해요 style.',
    },
    {
      id: 'd03-l2-r2',
      audioKo: '아, 죄송해요. 짐이요.',
      promptZh: '兔莉道歉说"是行李"，Minji 想安慰她，最可能说？', promptZhEn: 'Tori apologizes saying "it\'s luggage," Minji wants to comfort her, what would she most likely say?',
      choices: [
        { text: '아니요, 저는 짐이에요.', correct: false },
        { text: '괜찮아요. 짐이 무거워 보여요.', correct: true },
        { text: '감사합니다. 죄송해요.', correct: false },
        { text: '집이 어디예요?', correct: false },
      ],
      explain: '「괜찮아요」= 没关系。收到对方道歉后的标准回应，比继续追问「집이요?」温柔多了', explainEn: '괜찮아요 = It\'s okay. The standard response after an apology, much gentler than asking 집이요? again.',
    },
    {
      id: 'd03-l2-r3',
      audioKo: '짐 여기에 놓을게요.',
      promptZh: 'Minji 说"行李我放这儿"，兔莉最合适的回应是？', promptZhEn: 'Minji says "I\'ll put the luggage here," what\'s the most appropriate response from Tori?',
      choices: [
        { text: '아니요, 괜찮아요.', correct: false },
        { text: '이름이 뭐예요?', correct: false },
        { text: '정말 감사합니다, 언니.', correct: true },
        { text: '저는 중국 사람이에요.', correct: false },
      ],
      explain: '被帮忙后加 언니 + 정말 감사합니다，语气自然又亲近，正对上主流程 Minji 变姐姐的桥段', explainEn: 'After being helped, adding 언니 + 정말 감사합니다 sounds natural and close, fitting the main story where Minji becomes the older sister.',
    },
  ],
};
