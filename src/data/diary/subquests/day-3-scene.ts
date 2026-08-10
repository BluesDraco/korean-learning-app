import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 3 · 1-4 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖机场求助全流程 + 짐/집 翻车修复 + 道谢升级
 */
export const day3Scene: SceneSubQuestData = {
  day: 3, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在机场出口用出今天学的韩语', subtitleEn: 'Use today\'s Korean at the airport exit.',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd03-sc-s1',
      scenario: '拖着爆炸的行李箱走出机场，实在抬不动了，想让路人帮忙。你应该说？', scenarioEn: 'Dragging a bursting suitcase out of the airport, you can\'t lift it anymore and want a passerby\'s help. What should you say?',
      choices: [
        { ko: '저기요, 좀 도와주세요.', zh: '不好意思，请帮个忙。', zhEn: 'Excuse me, could you help me?', correct: true },
        { ko: '안녕하세요, 저는 학생이에요.', zh: '你好，我是学生。', zhEn: 'Hello, I am a student.', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', zhEn: 'It\'s okay, thank you.', correct: false },
        { ko: '이름이 뭐예요?', zh: '你叫什么名字？', zhEn: 'What\'s your name?', correct: false },
      ],
      explain: '저기요(开场) + 좀(缓和) + 도와주세요(请帮我) = 求助黄金句', explainEn: '저기요 (opening) + 좀 (softener) + 도와주세요 (please help) = the golden phrase for asking for help',
    },
    {
      type: 'situation',
      id: 'd03-sc-s2',
      scenario: '你紧张说错话——本来想说「짐」（行李），却说成了「집」（家）。对方愣了一下。你应该？', scenarioEn: 'You\'re nervous and misspeak—you meant to say 짐 (luggage), but said 집 (home). The other person pauses. What should you do?',
      choices: [
        { ko: '아, 죄송해요. 짐이요.', zh: '啊，对不起。是行李。', zhEn: 'Oh, sorry. I meant luggage.', correct: true },
        { ko: '괜찮아요, 집이에요.', zh: '没关系，就是家。', zhEn: 'It\'s fine, it\'s just home.', correct: false },
        { ko: '아니요, 집이 아니에요.', zh: '不，那不是家。', zhEn: 'No, that\'s not home.', correct: false },
        { ko: '안녕히 가세요.', zh: '再见。', zhEn: 'Goodbye.', correct: false },
      ],
      explain: '说错话立刻 죄송해요 + 改口正确词 + 이요 是自然的救场三件套', explainEn: 'When you misspeak, the natural recovery trio is: 죄송해요 right away + correct word + 이요',
    },
    {
      type: 'situation',
      id: 'd03-sc-s3',
      scenario: 'Minji 姐姐帮你把行李抬上了出租车。你想真诚地道谢，应该说？', scenarioEn: 'Minji unnie helped you load your luggage into the taxi. You want to thank her sincerely. What should you say?',
      choices: [
        { ko: '괜찮아요, 언니.', zh: '没关系，姐姐。', zhEn: 'It\'s okay, unnie.', correct: false },
        { ko: '미안해요, 언니.', zh: '对不起，姐姐。', zhEn: 'I\'m sorry, unnie.', correct: false },
        { ko: '정말 감사합니다, 언니.', zh: '姐姐，真的非常感谢。', zhEn: 'Sister, thank you so much.', correct: true },
        { ko: '안녕하세요, 언니.', zh: '你好，姐姐。', zhEn: 'Hello, unnie.', correct: false },
      ],
      explain: '정말 + 감사합니다 加倍真诚。加称呼 언니 更亲近。「미안해요」是道歉不是道谢', explainEn: '정말 + 감사합니다 doubles the sincerity. Adding the address term 언니 makes it more intimate. 미안해요 is an apology, not a thank-you.',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd03-sc-d1',
      lines: [
        { speaker: '나', ko: '저기요, 제 짐이 너무 무거워요...', zh: '不好意思，我的行李太重了…', zhEn: 'Sorry, my luggage is too heavy...' },
        { speaker: 'Minji', ko: '', zh: '' },
      ],
      blankSpeaker: 'Minji',
      choices: [
        { ko: '괜찮아요, 제가 도와줄게요.', zh: '没关系，我来帮你。', zhEn: 'It\'s okay, I\'ll help you.', correct: true },
        { ko: '저는 학생이에요.', zh: '我是学生。', zhEn: 'I am a student.', correct: false },
        { ko: '안녕히 가세요.', zh: '再见（请慢走）。', zhEn: 'Goodbye (please go safely).', correct: false },
        { ko: '이름이 뭐예요?', zh: '你叫什么名字？', zhEn: 'What\'s your name?', correct: false },
      ],
      explain: '别人求助时最温柔的回应：괜찮아요 + 제가 도와줄게요（我来帮你）', explainEn: 'The gentlest response when someone asks for help: 괜찮아요 + 제가 도와줄게요 (I\'ll help you)',
    },
    {
      type: 'dialogue',
      id: 'd03-sc-d2',
      lines: [
        { speaker: '나', ko: '제 집이 너무 무거워요.', zh: '我的「家」太重了。（说错了）', zhEn: 'My \'home\' is too heavy. (Misspoke)' },
        { speaker: 'Minji', ko: '...집이요?', zh: '…家吗？', zhEn: '...Home?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '아, 죄송해요. 짐이요.', zh: '啊，对不起。是行李。', zhEn: 'Oh, sorry. I meant luggage.', correct: true },
        { ko: '네, 집이에요.', zh: '是，是家。', zhEn: 'Yes, it\'s home.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
        { ko: '저는 중국 사람이에요.', zh: '我是中国人。', zhEn: 'I am Chinese.', correct: false },
      ],
      explain: '主流程剧情的关键救场句。죄송해요 + 改口正确词「짐이요」，Minji 就懂了', explainEn: 'The key recovery line in the main story. 죄송해요 + correct word 짐이요, and Minji will understand.',
    },
    {
      type: 'dialogue',
      id: 'd03-sc-d3',
      lines: [
        { speaker: 'Minji', ko: '짐 여기 놓을게요.', zh: '行李放这儿了。', zhEn: 'I\'ll put the luggage here.' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '정말 감사합니다, 언니.', zh: '姐姐，真的非常感谢。', zhEn: 'Sister, thank you so much.', correct: true },
        { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。', zhEn: 'No need, it\'s fine.', correct: false },
        { ko: '죄송해요, 무거워요.', zh: '对不起，很重。', zhEn: 'Sorry, it\'s heavy.', correct: false },
        { ko: '집이 어디예요?', zh: '你家在哪里？', zhEn: 'Where is your house?', correct: false },
      ],
      explain: '被帮忙后 정말 감사합니다 + 언니。用 아니요 괜찮아요 拒绝会让人觉得"你不领情"', explainEn: 'After being helped, use 정말 감사합니다 + 언니. Saying 아니요 괜찮아요 to refuse would make you seem ungrateful.',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd03-sc-c1',
      ko: '저기요, 좀 도와주세요.',
      promptZh: '这句话最合适的使用场景是？', promptZhEn: 'What\'s the most appropriate situation for this phrase?',
      choices: [
        { zh: '需要陌生人帮忙时（提行李、指路、找东西）', zhEn: 'When you need help from a stranger (carrying luggage, asking directions, finding something)', correct: true },
        { zh: '朋友问你名字时', zhEn: 'When a friend asks your name', correct: false },
        { zh: '收到礼物想道谢时', zhEn: 'When you want to thank someone for a gift', correct: false },
        { zh: '进门时打招呼', zhEn: 'Greeting when entering', correct: false },
      ],
      explain: '저기요 叫陌生人 + 좀 缓和语气 + 도와주세요 请帮我。留学生日常求助神句', explainEn: '저기요 to call a stranger + 좀 to soften the tone + 도와주세요 to ask for help. The go-to phrase for international students\' daily needs.',
    },
    {
      type: 'context',
      id: 'd03-sc-c2',
      ko: '아, 죄송해요. 짐이요.',
      promptZh: '这句话出现在什么场景？', promptZhEn: 'What scenario does this phrase appear in?',
      choices: [
        { zh: '说错话（把"行李"说成"家"）后立刻纠正', zhEn: 'Correcting yourself right after a slip-up (saying "home" instead of "luggage")', correct: true },
        { zh: '进别人家时的问候', zhEn: 'Greeting when entering someone\'s home', correct: false },
        { zh: '收到帮助后道谢', zhEn: 'Thanking someone after receiving help', correct: false },
        { zh: '婉拒别人的好意', zhEn: 'Politely declining someone\'s kindness', correct: false },
      ],
      explain: '「짐이요」= "是行李"的意思。죄송해요 + 改口正确词是韩语说错话的自然救场方式', explainEn: '\'짐이요\' means \'It\'s luggage.\' Saying 죄송해요 and then correcting yourself is a natural way to recover from a slip-up in Korean.',
    },
  ],
};
