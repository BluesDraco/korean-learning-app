import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 16 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 16 主流程「幸福房产·第一次看房」
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化 ~고 있어요，reply 铺 부동산 问答
 */
export const day16Listen: ListenSubQuestData = {
  day: 16, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在幸福房产听清老犬中介的每一句', subtitleEn: 'Listen carefully to every word from the old dog agent at Happy Realty.',

  meaning: [
    {
      id: 'd16-l2-m1',
      audioKo: '어떤 집 찾으세요?',
      choices: [
        { text: '您找什么样的房子？', textEn: 'What kind of house are you looking for?', correct: true },
        { text: '您在这里找什么？', textEn: 'What are you looking for here?', correct: false },
        { text: '有什么房子吗？', textEn: 'Do you have any apartments?', correct: false },
        { text: '您住哪里？', textEn: 'Where do you live?', correct: false },
      ],
      explain: '어떤(什么样的) + 집(房子) + 찾다 + 세요?（敬语疑问）。中介的开场问句', explainEn: '어떤 (what kind) + 집 (house) + 찾다 (look for) + 세요? (polite question). The agent\'s opening question.',
    },
    {
      id: 'd16-l2-m2',
      audioKo: '원룸 찾고 있어요.',
      choices: [
        { text: '正在找一居室。', textEn: 'I\'m looking for a studio.', correct: true },
        { text: '想找一居室。', textEn: 'Looking for a studio.', correct: false },
        { text: '找到一居室了。', textEn: 'Found a studio.', correct: false },
        { text: '要买一居室。', textEn: 'Want to buy a studio.', correct: false },
      ],
      explain: '원룸 + 찾다 + 고 있어요（进行时）= 正在找一居室', explainEn: '원룸 (studio) + 찾다 (look for) + 고 있어요 (progressive) = currently looking for a studio.',
    },
    {
      id: 'd16-l2-m3',
      audioKo: '보증금은 500만, 월세는 50만 정도요.',
      choices: [
        { text: '押金500万，月租50万左右。', textEn: 'Deposit is 5 million won, and monthly rent is around 500,000 won.', correct: true },
        { text: '押金50万，月租500万左右。', textEn: 'Deposit is 500,000 won, and monthly rent is around 5 million won.', correct: false },
        { text: '房租一共550万。', textEn: 'The total rent is 5.5 million won.', correct: false },
        { text: '存款500万。', textEn: 'Deposit: 5 million won.', correct: false },
      ],
      explain: '보증금 오백만원 + 월세 오십만원。租房核心两个数字', explainEn: '보증금 (deposit) 5 million won + 월세 (monthly rent) 500,000 won. The two key numbers in renting.',
    },
    {
      id: 'd16-l2-m4',
      audioKo: '학교 근처에 괜찮은 데가 있어요.',
      choices: [
        { text: '学校附近有个不错的地方。', textEn: 'There\'s a nice place near the school.', correct: true },
        { text: '学校附近没有好地方。', textEn: 'There\'s no good place near the school.', correct: false },
        { text: '学校附近有很多学生。', textEn: 'There are many students near the school.', correct: false },
        { text: '学校在近处的中介。', textEn: 'The school is at the nearby real estate agency.', correct: false },
      ],
      explain: '학교 근처(学校附近) + 괜찮은 데(不错的地方) + 있어요。中介推荐句', explainEn: '학교 근처 (near school) + 괜찮은 데 (nice place) + 있어요. The agent\'s recommendation phrase.',
    },
    {
      id: 'd16-l2-m5',
      audioKo: '지금 뭐 하고 있어요?',
      choices: [
        { text: '你现在在做什么？', textEn: 'What are you doing right now?', correct: true },
        { text: '你做过什么？', textEn: 'What have you done?', correct: false },
        { text: '想做什么？', textEn: 'What do you want to do?', correct: false },
        { text: '要做什么？', textEn: 'What are you going to do?', correct: false },
      ],
      explain: '지금(现在) + 뭐 + 하다 + 고 있어요?（进行时疑问）', explainEn: '지금 (now) + 뭐 (what) + 하다 (do) + 고 있어요? (progressive question)',
    },
  ],

  cloze: [
    {
      id: 'd16-l2-c1',
      audioKo: '원룸 찾고 있어요.',
      clozeParts: ['원룸 ', '.'],
      choices: [
        { text: '찾고 있어요', correct: true },
        { text: '찾아요', correct: false },
        { text: '찾고 싶어요', correct: false },
        { text: '찾을래요', correct: false },
      ],
      explain: '찾다 + 고 있어요 = 正在找（进行时）', explainEn: '찾다 (look for) + 고 있어요 = currently looking for (progressive).',
    },
    {
      id: 'd16-l2-c2',
      audioKo: '한국어 공부하고 있어요.',
      clozeParts: ['한국어 ', '.'],
      choices: [
        { text: '공부하고 있어요', correct: true },
        { text: '공부해요', correct: false },
        { text: '공부하고 싶어요', correct: false },
        { text: '공부할래요', correct: false },
      ],
      explain: '공부하다 + 고 있어요 = 正在学（进行时）。跟 「공부해요」(一般现在) 语感不同', explainEn: '공부하다 (study) + 고 있어요 = currently studying (progressive). Different nuance from 「공부해요」 (simple present).',
    },
    {
      id: 'd16-l2-c3',
      audioKo: '친구를 기다리고 있어요.',
      clozeParts: ['친구를 ', '.'],
      choices: [
        { text: '기다리고 있어요', correct: true },
        { text: '기다려요', correct: false },
        { text: '기다렸어요', correct: false },
        { text: '기다릴래요', correct: false },
      ],
      explain: '기다리다(无받침) + 고 있어요 = 正在等',
    },
    {
      id: 'd16-l2-c4',
      audioKo: '안경을 쓰고 있어요.',
      clozeParts: ['안경을 ', '.'],
      choices: [
        { text: '쓰고 있어요', correct: true },
        { text: '써요', correct: false },
        { text: '쓸래요', correct: false },
        { text: '썼어요', correct: false },
      ],
      explain: '쓰다(戴) + 고 있어요 表**穿戴状态**（不是动作进行）= 戴着眼镜', explainEn: '쓰다 (wear) + 고 있어요 indicates **wearing state** (not action in progress) = wearing glasses.',
    },
  ],

  reply: [
    {
      id: 'd16-l2-r1',
      audioKo: '어떤 집 찾으세요?',
      promptZh: '中介问"找什么样的房子？"你想说"一居室"，最自然的一句？', promptZhEn: 'The agent asks, "What kind of place are you looking for?" You want to say "a studio." What\'s the most natural response?',
      choices: [
        { text: '원룸 찾고 있어요.', correct: true },
        { text: '원룸 있어요?', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '面对中介开场问题，最自然的回答是**表明自己在找什么**：원룸 + 찾고 있어요', explainEn: 'The most natural answer to the agent\'s opening question is to **state what you\'re looking for**: 원룸 + 찾고 있어요.',
    },
    {
      id: 'd16-l2-r2',
      audioKo: '보증금이랑 월세는 얼마까지 가능해요?',
      promptZh: '中介问"押金和月租最多能出多少？"你想说"押金500万，月租50万"，最自然的一句？', promptZhEn: 'The agent asks, "What\'s the most you can pay for deposit and monthly rent?" You want to say "deposit 5 million, rent 500,000." What\'s the most natural response?',
      choices: [
        { text: '보증금은 500만, 월세는 50만 정도요.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '없어요.', correct: false },
        { text: '아니요, 괜찮아요.', correct: false },
      ],
      explain: '押金和月租分开报，加 정도(左右) 表灵活。「정도요」= 差不多这样', explainEn: 'Report the deposit and monthly rent separately, adding 정도 (about) for flexibility. 「정도요」 = about this much',
    },
    {
      id: 'd16-l2-r3',
      audioKo: '지금 뭐 하고 있어요?',
      promptZh: '朋友打电话问"你现在在做什么？"你正在找房子，应该？', promptZhEn: 'A friend calls and asks, "What are you doing right now?" You\'re looking for a place. What should you say?',
      choices: [
        { text: '집 보고 있어요.', correct: true },
        { text: '집 봤어요.', correct: false },
        { text: '집 보고 싶어요.', correct: false },
        { text: '집 볼래요.', correct: false },
      ],
      explain: '보다 + 고 있어요 = 正在看。跟"找房子"场景搭配。「집 보다」= 看房', explainEn: '보다 + 고 있어요 = currently looking. Pairs with the "house hunting" scene. 「집 보다」 = view a place',
    },
  ],
};
