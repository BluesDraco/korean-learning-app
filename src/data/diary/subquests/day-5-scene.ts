import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 5 · 1-4 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖走廊初见 Haru + KPOP 抓包 + 邀请早饭
 */
export const day5Scene: SceneSubQuestData = {
  day: 5, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在走廊里遇见第一个朋友',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd05-sc-s1',
      scenario: '走廊里遇到邻居 Haru，她笑着问「301호 새로 온 학생이에요?」（301 新来的学生吗？）。你想温暖地承认，应该？',
      choices: [
        { ko: '네, 맞아요. 저는 토리예요.', zh: '是的，没错。我叫兔莉。', correct: true },
        { ko: '아니요, 저는 학생이 아니에요.', zh: '不，我不是学生。', correct: false },
        { ko: '만나서 반가워요, 안녕히 가세요.', zh: '很高兴认识你，再见。', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', correct: false },
      ],
      explain: '맞아요 比单说 네 更暖。「저는 토리예요」用主题助词 는 顺势自我介绍',
    },
    {
      type: 'situation',
      id: 'd05-sc-s2',
      scenario: 'Haru 突然说「어제 밤에 KPOP 들었어요?」（昨晚听 KPOP 了吗？）。她显然从隔壁听到了。你想大方承认，应该？',
      choices: [
        { ko: '아니요, 저는 안 들었어요.', zh: '不，我没听。', correct: false },
        { ko: '네, 맞아요. 정말 좋아해요.', zh: '是的，没错。真的很喜欢。', correct: true },
        { ko: '몰라요, 죄송해요.', zh: '不知道，对不起。', correct: false },
        { ko: '아니요, 저는 학생이에요.', zh: '不，我是学生。', correct: false },
      ],
      explain: '被邻居"抓包"共同爱好，承认+补一句「정말 좋아해요」= 秒变朋友。撒谎会显得生分',
    },
    {
      type: 'situation',
      id: 'd05-sc-s3',
      scenario: 'Haru 邀请「같이 아침 먹으러 갈래요?」（一起去吃早饭吗？）你其实不知道食堂在哪，应该？',
      choices: [
        { ko: '아니요, 몰라요. 같이 가요!', zh: '不知道。一起去吧！', correct: true },
        { ko: '네, 알아요. 혼자 갈게요.', zh: '知道。我自己去。', correct: false },
        { ko: '저는 안 먹어요.', zh: '我不吃早饭。', correct: false },
        { ko: '아니요, 저는 학생이 아니에요.', zh: '不，我不是学生。', correct: false },
      ],
      explain: '实话 몰라요 + 「같이 가요」= 我也不认识路，一起走。这是主流程剧情钩子',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd05-sc-d1',
      lines: [
        { speaker: 'Haru', ko: '안녕하세요! 저는 하루예요. 302호.', zh: '你好！我叫 Haru，302 房。' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '안녕하세요, 저는 토리예요. 301호.', zh: '你好，我叫兔莉，301 房。', correct: true },
        { ko: '저는 토리이에요.', zh: '我是兔莉。（拼写错）', correct: false },
        { ko: '아니요, 저는 학생이 아니에요.', zh: '不，我不是学生。', correct: false },
        { ko: '안녕히 계세요.', zh: '再见（请留步）。', correct: false },
      ],
      explain: 'Haru 用 은/는 自我介绍，你也用 는 对称回应。「토리이에요」是拼写错（应该是 토리예요）',
    },
    {
      type: 'dialogue',
      id: 'd05-sc-d2',
      lines: [
        { speaker: 'Haru', ko: '식당 어디 있는지 알아요?', zh: '你知道食堂在哪吗？' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '아니요, 몰라요. 같이 가요!', zh: '不知道。一起去吧！', correct: true },
        { ko: '네, 식당은 없어요.', zh: '是的，没有食堂。', correct: false },
        { ko: '식당이에요.', zh: '是食堂。', correct: false },
        { ko: '저는 밥을 안 먹어요.', zh: '我不吃饭。', correct: false },
      ],
      explain: '不知道就直说 몰라요，加「같이 가요」变成邻居间自然的搭伙',
    },
    {
      type: 'dialogue',
      id: 'd05-sc-d3',
      lines: [
        { speaker: '나', ko: '오늘은 날씨가 좋아요.', zh: '今天天气好。' },
        { speaker: 'Haru', ko: '', zh: '' },
      ],
      blankSpeaker: 'Haru',
      choices: [
        { ko: '네, 정말 좋아요.', zh: '是啊，真的很好。', correct: true },
        { ko: '아니요, 저는 학생이에요.', zh: '不，我是学生。', correct: false },
        { ko: '오늘은 어디예요?', zh: '今天是哪里？', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', correct: false },
      ],
      explain: '对方说天气好，最自然的接话是 네 + 정말 좋아요（真的好）。这是韩国人聊天开场的标准套路',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd05-sc-c1',
      ko: '저는 토리예요.',
      promptZh: '这句话的「는」在语法上起什么作用？',
      choices: [
        { zh: '把"저"（我）设为话题——"说到我，是兔莉"', correct: true },
        { zh: '让"저"变成宾语', correct: false },
        { zh: '表示疑问，让句子变问句', correct: false },
        { zh: '强调这是过去发生的事', correct: false },
      ],
      explain: '은/는 = 主题助词。「저는 토리예요」= "关于我，是兔莉"。用主题助词做自我介绍最自然',
    },
    {
      type: 'context',
      id: 'd05-sc-c2',
      ko: '같이 아침 먹으러 갈래요?',
      promptZh: '这句话最合适的使用场景是？',
      choices: [
        { zh: '邀请朋友/熟人一起去做某事', correct: true },
        { zh: '拒绝别人的邀请', correct: false },
        { zh: '问对方吃饱了没', correct: false },
        { zh: '道歉时表达歉意', correct: false },
      ],
      explain: '~러 갈래요 = 邀请标准句。같이(一起) + 目的 + 갈래요。属于해요体友好邀请',
    },
  ],
};
