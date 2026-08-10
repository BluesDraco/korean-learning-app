import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 16 · 1-4 상황 속으로 · 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖房产中介问答 · 押金月租报价 · 看房追问
 */
export const day16Scene: SceneSubQuestData = {
  day: 16, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在幸福房产用韩语说清"我在找什么样的房子"', subtitleEn: 'At Happy Realty, clearly say in Korean, "What kind of place I\'m looking for"',

  tasks: [
    {
      type: 'situation',
      id: 'd16-sc-s1',
      scenario: '推门进入房产中介，老犬用敬语问「어떤 집 찾으세요?」（找什么样的房子？）你想说"正在找学校附近的一居室"，最自然的一句？', scenarioEn: 'You walk into the real estate office, and the agent asks politely, 「어떤 집 찾으세요?」 (What kind of place are you looking for?) You want to say, "I\'m looking for a studio near the school." What\'s the most natural response?',
      choices: [
        { ko: '학교 근처 원룸 찾고 있어요.', zh: '正在找学校附近的一居室。', zhEn: 'I\'m looking for a studio near school.', correct: true },
        { ko: '학교 근처 원룸 찾고 싶어요.', zh: '想找学校附近的一居室。（愿望，不是"正在找"）', zhEn: 'I want to find a studio near the school. (A wish, not "currently looking")', correct: false },
        { ko: '학교 근처 원룸 있어요?', zh: '有学校附近的一居室吗？（换成问店员）', zhEn: 'Do you have a studio near the school? (Asking the agent instead)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（不对场景）', zhEn: 'Nice to meet you. (Wrong for the situation)', correct: false },
      ],
      explain: '面对中介的开场问，用 **~고 있어요** 表明"正在找"最专业', explainEn: 'When the agent opens with a question, using **~고 있어요** to show you\'re "currently looking" is the most natural',
    },
    {
      type: 'situation',
      id: 'd16-sc-s2',
      scenario: '中介问「보증금이랑 월세는 얼마까지 가능해요?」（押金和月租最多多少？）你的预算是押金500万、月租50万——最自然的一句？', scenarioEn: 'The agent asks, 「보증금이랑 월세는 얼마까지 가능해요?」 (What\'s the max deposit and monthly rent?) Your budget is a 5 million deposit and 500,000 monthly rent—what\'s the most natural response?',
      choices: [
        { ko: '보증금은 500만, 월세는 50만 정도요.', zh: '押金500万，月租50万左右。', zhEn: 'Deposit is 5 million won, and monthly rent is around 500,000 won.', correct: true },
        { ko: '얼마예요?', zh: '多少钱？（不对题，中介问的是预算）', zhEn: 'How much is it? (Off-topic; the agent asked about your budget)', correct: false },
        { ko: '없어요.', zh: '没有。（不对题）', zhEn: 'No. (Off-topic.)', correct: false },
        { ko: '아니요, 괜찮아요.', zh: '不，没关系。（不对题）', zhEn: 'No, it\'s fine. (Off-topic)', correct: false },
      ],
      explain: '押金和月租分开报，加 정도(左右) 表灵活。「정도요」是 「정도예요」的口语', explainEn: 'Report the deposit and monthly rent separately, adding 정도 (about) for flexibility. 「정도요」 is the colloquial form of 「정도예요」',
    },
    {
      type: 'situation',
      id: 'd16-sc-s3',
      scenario: '中介推荐一间房源，你想看**3楼采光好的**房子。最自然的一句？', scenarioEn: 'The agent recommends a listing, and you want to see a **3rd-floor place with good light**. What\'s the most natural response?',
      choices: [
        { ko: '3층 원룸 보여 주세요.', zh: '请给我看3楼的一居室。', zhEn: 'Please show me a studio on the 3rd floor.', correct: true },
        { ko: '3층 집 사고 싶어요.', zh: '想买3楼的房子。（不是买是租）', zhEn: 'I want to buy a 3rd-floor place. (It\'s renting, not buying)', correct: false },
        { ko: '3층에 살고 있어요.', zh: '我住在3楼。（陈述当前住处不对）', zhEn: 'I live on the 3rd floor. (Stating where you live now is wrong)', correct: false },
        { ko: '3층 얼마예요?', zh: '3楼多少钱？（未说要看，先问价格反常）', zhEn: 'How much is the 3rd floor? (Asking price before saying you want to see it is odd)', correct: false },
      ],
      explain: '「N + 보여 주세요」= 请给我看 N。看房场景固定句', explainEn: '「N + 보여 주세요」 = Please show me N. A fixed phrase for house viewing',
    },

    {
      type: 'dialogue',
      id: 'd16-sc-d1',
      lines: [
        { speaker: '老犬 중개', speakerEn: 'Old dog broker', ko: '어서 오세요. 어떤 집 찾으세요?', zh: '欢迎。找什么样的房子？', zhEn: 'Welcome. What kind of place are you looking for?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '원룸 찾고 있어요. 학교 근처로요.', zh: '正在找一居室。学校附近的。', zhEn: 'I\'m looking for a studio. One near the school.', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（不对场景）', zhEn: 'Nice to meet you. (Wrong for the situation)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（未说要什么就问价格）', zhEn: 'How much is it? (Asking price without saying what you want)', correct: false },
        { ko: '이 당근 키링 예쁘다.', zh: '这个胡萝卜钥匙扣好可爱。（不对题）', zhEn: 'This carrot keychain is so cute. (Off-topic)', correct: false },
      ],
      explain: '中介问 → 客户回答"在找什么"。「~로요」的「로」= 方向助词（学校方向的），加 요 是해요体的礼貌收尾', explainEn: 'Agent asks → customer answers "what they\'re looking for." The 「로」 in 「~로요」 is a direction particle (toward the school), and adding 요 is a polite ending in the 해요 style',
    },
    {
      type: 'dialogue',
      id: 'd16-sc-d2',
      lines: [
        { speaker: '老犬 중개', speakerEn: 'Old dog broker', ko: '보증금이랑 월세는 얼마까지 가능해요?', zh: '押金和月租最多多少？', zhEn: 'What\'s the max deposit and monthly rent?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '보증금은 500만, 월세는 50만 정도요.', zh: '押金500万，月租50万左右。', zhEn: 'Deposit is 5 million won, and monthly rent is around 500,000 won.', correct: true },
        { ko: '아니요, 몰라요.', zh: '不，不知道。（应该报预算）', zhEn: 'No, I don\'t know. (You should state your budget)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（换错题主）', zhEn: 'How much is it? (Wrong subject)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
      ],
      explain: '客户报预算的固定格式：보증금은 ~, 월세는 ~ 정도요', explainEn: 'The standard format for stating your budget: deposit is ~, monthly rent is about ~',
    },
    {
      type: 'dialogue',
      id: 'd16-sc-d3',
      lines: [
        { speaker: '老犬 중개', speakerEn: 'Old dog broker', ko: '음… 학교 근처에 괜찮은 데가 하나 있어요.', zh: '嗯……学校附近有个不错的。', zhEn: 'Hmm... there\'s a nice one near the school.' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '아, 진짜요? 언제 볼 수 있어요?', zh: '啊，真的吗？什么时候能看？', zhEn: 'Oh, really? When can I see it?', correct: true },
        { ko: '없어요.', zh: '没有。（跟中介的话矛盾）', zhEn: 'No. (Contradicts what the agent said)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（应先约看房）', zhEn: 'How much? (Should first schedule a viewing)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
      ],
      explain: '中介推荐房源 → 客户表兴趣 + 约看房时间。「진짜요?」表惊喜，「언제 볼 수 있어요?」是核心追问', explainEn: 'Agent recommends a property → client shows interest + schedules a viewing. \'진짜요?\' expresses surprise, \'언제 볼 수 있어요?\' is the key follow-up question',
    },

    {
      type: 'context',
      id: 'd16-sc-c1',
      ko: '원룸 찾고 있어요.',
      promptZh: '关于「찾고 있어요」，哪个描述最准确？', promptZhEn: 'Which description is most accurate about \'찾고 있어요\'?',
      choices: [
        { zh: '찾다 + 고 있어요 = 正在找（进行时）。表当下持续的动作', zhEn: '찾다 + 고 있어요 = currently looking (progressive). Indicates an ongoing action at the present moment', correct: true },
        { zh: '正确说法是 「찾아 있어요」', zhEn: 'The correct form is \'찾아 있어요\'', correct: false },
        { zh: '正确说法是 「찾고 싶어요」（这是"想找"）', zhEn: 'The correct form is \'찾고 싶어요\' (this means \'want to find\')', correct: false },
        { zh: '正确说法是 「찾을래요」（这是"要找/打算找"）', zhEn: 'The correct form is \'찾을래요\' (this means \'going to find / planning to find\')', correct: false },
      ],
      explain: '~고 있어요 是进行时。찾고 있어요 vs 찾고 싶어요 vs 찾을래요 三者场景不同', explainEn: '~고 있어요 is the progressive tense. 찾고 있어요 vs 찾고 싶어요 vs 찾을래요 are used in different situations',
    },
    {
      type: 'context',
      id: 'd16-sc-c2',
      ko: '보증금 500만, 월세 50만.',
      promptZh: '关于韩国租房的「보증금 + 월세」，哪个描述最准确？', promptZhEn: 'Which description is most accurate about Korea\'s \'보증금 + 월세\' rental system?',
      choices: [
        { zh: '보증금 = 押金（大额一次付），월세 = 月租（每月付）。合同结束时押金退还', zhEn: '보증금 = deposit (large one-time payment), 월세 = monthly rent (paid each month). The deposit is returned when the contract ends', correct: true },
        { zh: '보증금和월세都是每月付的', zhEn: '보증금 and 월세 are both paid monthly', correct: false },
        { zh: '보증금只是中介费', zhEn: '보증금 is just the agent fee', correct: false },
        { zh: '월세是一次性付的', zhEn: '월세 is paid as a one-time payment', correct: false },
      ],
      explain: '韩国租房：보증금（Deposit，如500万~1亿）+ 월세（每月 50~100 万）。보증금 越高月租越低。也有纯"전세"（只押金无月租）', explainEn: 'Korean rentals: 보증금 (deposit, e.g., 5 million to 100 million won) + 월세 (monthly rent of 500,000 to 1 million won). The higher the deposit, the lower the monthly rent. There\'s also pure \'전세\' (deposit only, no monthly rent)',
    },
  ],
};
