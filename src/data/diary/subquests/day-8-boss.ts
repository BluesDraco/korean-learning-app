import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 8 · 1-5 Boss 战 · ~고 싶어요 综合大考
 * 8 题混合：听句选意×2 + 助词改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 9：早晨 CU 便利店独闯，指示词 이거/그거/저거
 */
export const day8Boss: BossSubQuestData = {
  day: 8, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '独处夜之收官 · 把想念说给自己听', subtitleEn: 'Finale of a night alone · telling my longing to myself',
  intro: '深夜 12 点。手机屏幕暗着，妈妈的语音只有 3 秒。你想说的太多，还没学到那么多韩语——但你已经能说出"엄마가 보고 싶어요"。这一晚的最后一关：把想念说完。', introEn: 'It\'s midnight. The phone screen is dark, and Mom\'s voice message is only 3 seconds long. You have so much to say, but you haven\'t learned that much Korean yet—still, you can already say "엄마가 보고 싶어요." The final challenge of the night: say all that you miss.',
  outroHook: '通过！关灯躺下时，肚子咕的一声——空的。明天早上，你要一个人下楼去 CU。考拉店员在等你。别的不学，先学会指着东西说「이거 주세요」。', outroHookEn: 'Passed! As you turn off the light and lie down, your stomach growls—empty. Tomorrow morning, you\'ll head down to CU alone. The koala clerk is waiting for you. Forget everything else—first, learn to point at something and say "이거 주세요."',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd08-b5-t1',
        audioKo: '엄마가 보고 싶어요.',
        choices: [
          { text: '我看见妈妈了。', textEn: 'I see Mom.', correct: false },
          { text: '我想妈妈。', textEn: 'I miss my mom.', correct: true },
          { text: '妈妈想我。', textEn: 'Mom misses me.', correct: false },
          { text: '妈妈来了。', textEn: 'Mom is here.', correct: false },
        ],
        explain: '보고 싶다 = 想见 = 想念。엄마 무받침 → 가',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd08-b5-t2',
        audioKo: '집에 가고 싶어요.',
        choices: [
          { text: '在家里。', textEn: 'At home.', correct: false },
          { text: '我想回家。', textEn: 'I want to go home.', correct: true },
          { text: '家里有人。', textEn: 'Someone\'s home.', correct: false },
          { text: '家不远。', textEn: 'Home isn\'t far.', correct: false },
        ],
        explain: '집(家) + 에(方向) + 가고 싶어요(想去)。留学生想家的核心句', explainEn: '집 (home) + 에 (direction) + 가고 싶어요 (want to go). The key sentence for a student missing home.',
      },
    },
    {
      type: 'choice',
      label: '助词改错', labelEn: 'Particle error correction',
      task: {
        id: 'd08-b5-t3',
        promptZh: '"我想妈妈"最标准的写法？', promptZhEn: 'What\'s the most standard way to say "I miss Mom"?',
        choices: [
          { text: '엄마를 보고 싶어요.', correct: false },
          { text: '엄마가 보고 싶어요.', correct: true },
          { text: '엄마는 보고 싶어요.', correct: false },
          { text: '엄마에 보고 싶어요.', correct: false },
        ],
        explain: '「보고 싶다」的思念对象用**主格 이/가**，不是宾格 을/를。这是韩语心理动词的特有规则', explainEn: 'The object of longing in "보고 싶다" takes the **subject particle 이/가**, not the object particle 을/를. This is a unique rule for Korean psychological verbs.',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd08-b5-t4',
        promptKo: '힘들어요',
        promptHangul: 'him-deu-reo-yo',
        choices: [
          { text: '开心 / 高兴', textEn: 'Happy / glad', correct: false },
          { text: '累 / 难 / 辛苦', textEn: 'Tired / hard / tough', correct: true },
          { text: '简单 / 容易', textEn: 'Simple / easy', correct: false },
          { text: '有趣 / 好玩', textEn: 'Fun / interesting', correct: false },
        ],
        explain: '힘들다 → 힘들어요。三义合一：身体累、心理苦、事情难。ㄹ 收音在 어요 前保留', explainEn: '힘들다 → 힘들어요. Three meanings in one: physically tired, mentally drained, and things are hard. The ㄹ final consonant is kept before 어요.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd08-b5-t5',
        zhHint: '我想吃泡菜汤。', zhHintEn: 'I want to eat kimchi stew.',
        audioKo: '김치찌개 먹고 싶어요.',
        answer: ['김치찌개', '먹고', '싶어요.'],
        tokens: ['김치찌개', '먹고', '싶어요.', '먹었어요.', '먹어요.', '싶어해요.'],
        explain: '먹다(吃) + 고 싶어요 = 想吃。宾语 김치찌개 后可省略 을——口语常省略', explainEn: '먹다 (to eat) + 고 싶어요 = want to eat. The object 김치찌개 can drop 을—commonly omitted in speech.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd08-b5-t6',
        zhHint: '我想学韩语。', zhHintEn: 'I want to learn Korean.',
        audioKo: '한국어를 공부하고 싶어요.',
        answer: ['한국어를', '공부하고', '싶어요.'],
        tokens: ['한국어를', '공부하고', '싶어요.', '한국어가', '공부했고', '싶어해요.'],
        explain: '공부하다(学习) 词干 공부하 + 고 싶어요。宾语 한국어 用宾格 을/를', explainEn: '공부하다 (to study) stem 공부하 + 고 싶어요. The object 한국어 takes the object particle 을/를.',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应', labelEn: 'Listen to the dialogue and choose a response',
      task: {
        id: 'd08-b5-t7',
        audioKo: '토리야, 잘 자.',
        promptZh: 'Haru 반말说"晚安"关门去了。兔莉也想用반말回她，应该？', promptZhEn: 'Haru said "good night" in 반말 and closed the door. Tori wants to reply in 반말 too—what should she say?',
        choices: [
          { text: '안녕히 주무세요.', correct: false },
          { text: '잘 자, 하루야.', correct: true },
          { text: '만나서 반가워요.', correct: false },
          { text: '감사합니다.', correct: false },
        ],
        explain: '반말对반말：잘 자 + 名字+야。「안녕히 주무세요」对长辈说；同龄朋友用반말', explainEn: '반말 to 반말: 잘 자 + name + 야. "안녕히 주무세요" is for elders; use 반말 with friends your age.',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd08-b5-t8',
        promptZh: '深夜宿舍睡不着，你想给自己一句반말鼓励，最贴合"明天继续加油"的是？', promptZhEn: 'It\'s late at night in the dorm and you can\'t sleep. You want to give yourself a word of encouragement in 반말—which fits "keep it up tomorrow" best?',
        choices: [
          { text: '내일도 화이팅. 괜찮아질 거야.', correct: true },
          { text: '내일 안 해요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '반말自励组合：내일도 화이팅 + 괜찮아질 거야。对自己说반말——是内心那句"哥们你可以的"', explainEn: 'A 반말 self-encouragement combo: 내일도 화이팅 + 괜찮아질 거야. Talking to yourself in 반말—it\'s that inner voice saying, "You\'ve got this, buddy."',
      },
    },
  ],
};
