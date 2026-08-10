// 兔莉的动物城 · 安全韩语短句池
// 动物角色给用户帖子留言时，只能从这里"选句"，不能 AI 自由生成韩语。
// 全部人工审过，语法/조사/词尾/띄어쓰기 100% 正确，是给零基础学习者看的范本。
// 分 4 类：praise 夸奖 / encourage 鼓励 / gentleFix 轻纠错 / topicReact 话题反应。

export interface BlogReply {
  [k: string]: unknown;
  ko: string; // 韩语短句（初级词汇、口语化、朋友圈语气）
  zh: string; // 纯中文释义（不夹韩语）
}

export type BlogReplyCategory = 'praise' | 'encourage' | 'gentleFix' | 'topicReact';

export const BLOG_REPLY_POOL: Record<BlogReplyCategory, BlogReply[]> = {
  // 1. 夸奖 —— 用户写得好时
  praise: [
    { ko: '와, 진짜 잘 썼어요! 👏', zh: '哇，写得真好！', zhEn: 'Wow, that\'s really well written!' },
    { ko: '문장이 정말 자연스러워요! 👍', zh: '句子真的很自然！', zhEn: 'The sentences are really natural!' },
    { ko: '우와, 한국어 실력이 좋네요! ✨', zh: '哇，韩语实力真不错呢！', zhEn: 'Wow, your Korean skills are really impressive!' },
    { ko: '표현이 정말 예뻐요! 😍', zh: '表达真漂亮！', zhEn: 'That\'s a beautiful expression!' },
    { ko: '이 정도면 완벽해요! 💯', zh: '这样就很完美了！', zhEn: 'This is perfect as is!' },
    { ko: '글이 술술 읽혀요! 📖', zh: '文章读起来很顺畅！', zhEn: 'The writing flows really smoothly!' },
    { ko: '오, 단어 선택이 센스 있어요! 👌', zh: '哦，选词很有品味！', zhEn: 'Oh, your word choice is very tasteful!' },
    { ko: '진짜 잘 쓰셨네요! 🥰', zh: '真的写得很好呢！', zhEn: 'You really wrote that well!' },
    { ko: '완전 멋진 글이에요! 🎉', zh: '完全是超棒的一篇！', zhEn: 'That\'s an absolutely amazing piece!' },
    { ko: '읽으면서 감탄했어요! 👏', zh: '读的时候都不禁赞叹了！', zhEn: 'I couldn\'t help but admire it while reading!' },
    { ko: '한 글자 한 글자 정성이 느껴져요! 💛', zh: '一字一句都能感受到用心！', zhEn: 'You can feel the care in every word!' },
    { ko: '벌써 이렇게 잘 쓰다니 놀라워요! 😮', zh: '已经写得这么好，太让人惊讶了！', zhEn: 'It\'s amazing that you already write this well!' },
    { ko: '최고예요! 엄지 척! 👍', zh: '太棒了！给你竖大拇指！', zhEn: 'Awesome! Thumbs up to you!' },
    { ko: '오늘 글 특히 마음에 들어요! 💕', zh: '今天这篇我特别喜欢！', zhEn: 'I especially love today\'s entry!' },
  ],

  // 2. 鼓励 —— 用户刚起步 / 写得短时，暖心不打击
  encourage: [
    { ko: '좋은 시작이에요! 계속 화이팅! 💪', zh: '好的开始！继续加油！', zhEn: 'Great start! Keep it up!' },
    { ko: '첫걸음이 제일 멋져요! 👣', zh: '第一步最帅气了！', zhEn: 'The first step is the coolest!' },
    { ko: '짧아도 충분히 훌륭해요! 🌱', zh: '虽然短，但已经很棒了！', zhEn: 'It\'s short, but already great!' },
    { ko: '이렇게 쓰기 시작한 게 대단해요! 👏', zh: '能这样开始动笔就很了不起！', zhEn: 'Just starting to write like this is impressive!' },
    { ko: '천천히 해도 괜찮아요! 😊', zh: '慢慢来也没关系！', zhEn: 'It\'s okay to take it slow!' },
    { ko: '오늘도 한 문장, 정말 멋져요! ✨', zh: '今天也写了一句，真的很棒！', zhEn: 'You wrote a sentence today too—that\'s really great!' },
    { ko: '조금씩 늘고 있어요! 파이팅! 🔥', zh: '在一点点进步哦！加油！', zhEn: 'You\'re improving bit by bit! Keep going!' },
    { ko: '용기 내서 올린 거 정말 멋져요! 🌟', zh: '鼓起勇气发出来，真的很棒！', zhEn: 'Having the courage to post it is really great!' },
    { ko: '실수해도 괜찮아요, 그게 공부예요! 📚', zh: '犯错也没关系，那就是学习！', zhEn: 'Making mistakes is fine—that\'s how you learn!' },
    { ko: '계속 쓰다 보면 금방 늘어요! 💪', zh: '一直写下去很快就会进步的！', zhEn: 'Keep writing and you\'ll improve in no time!' },
    { ko: '시작이 반이에요! 잘하고 있어요! 👍', zh: '好的开始是成功的一半！你做得很好！', zhEn: 'A good start is half the battle! You\'re doing great!' },
    { ko: '매일 한 줄씩, 그거면 충분해요! 🌈', zh: '每天写一行，那就足够了！', zhEn: 'Writing one line a day is enough!' },
    { ko: '부담 갖지 말고 즐겁게 써요! 😄', zh: '别有压力，开心地写就好！', zhEn: 'No pressure, just write and have fun!' },
    { ko: '오늘의 도전, 응원할게요! 📣', zh: '今天的挑战，我来给你加油！', zhEn: 'I\'m cheering you on for today\'s challenge!' },
  ],

  // 3. 轻纠错 —— 泛化式温柔提示，不指出具体错误
  gentleFix: [
    { ko: '조금만 더 다듬으면 완벽해요! 😊', zh: '再稍微润色一下就完美了！', zhEn: 'A little more polishing and it\'ll be perfect!' },
    { ko: '거의 다 됐어요! 조금만 더! 💪', zh: '就快好了！再加把劲！', zhEn: 'Almost there! Keep it up!' },
    { ko: '소리 내서 한번 읽어 보면 더 자연스러워져요! 🗣️', zh: '出声读一遍会更自然哦！', zhEn: 'Reading it out loud will make it more natural!' },
    { ko: '뜻은 아주 잘 전달돼요! 👍', zh: '意思传达得很清楚！', zhEn: 'Your meaning comes across clearly!' },
    { ko: '조금 더 짧게 써도 예뻐요! ✂️', zh: '写得再短一点也很漂亮！', zhEn: 'Even shorter, it\'s still beautiful!' },
    { ko: '다시 한번 읽어 보면 더 좋아질 거예요! 📖', zh: '再读一遍会变得更好的！', zhEn: 'Reading it again will make it even better!' },
    { ko: '거의 완벽해요! 마지막으로 한 번만 확인해 봐요! 🔍', zh: '几乎完美了！最后再确认一次吧！', zhEn: 'Almost perfect! Do one final check!' },
    { ko: '이 느낌 좋아요! 조금만 손보면 딱이에요! ✨', zh: '这个感觉很好！稍微修整一下就正合适！', zhEn: 'This feels great! A little tweak and it\'s just right!' },
    { ko: '좋은 표현이에요! 다음엔 조금 더 길게 도전해 봐요! 🚀', zh: '很好的表达！下次挑战写得更长一点吧！', zhEn: 'Great expression! Next time, try writing a bit longer!' },
    { ko: '의미가 잘 통해요! 자신감 가져도 돼요! 😄', zh: '意思很通顺！可以更有自信！', zhEn: 'It flows well! You can be more confident!' },
    { ko: '잘하고 있어요! 사전이랑 같이 보면 더 완벽해져요! 📚', zh: '做得很好！配着词典看会更完美！', zhEn: 'Well done! Checking with a dictionary will make it perfect!' },
    { ko: '지금도 충분히 좋아요! 조금씩 고쳐 나가면 돼요! 🌱', zh: '现在已经很好了！一点点改进就行！', zhEn: 'It\'s already good! Just a tiny improvement!' },
    { ko: '문장 하나하나 정성이 보여요! 조금만 더 매끄럽게! 😊', zh: '每句话都看得出用心！再稍微顺一点就好！', zhEn: 'I can see the effort in every sentence! Just smooth it out a bit!' },
  ],

  // 4. 话题反应 —— 像朋友看到帖子的自然反应
  topicReact: [
    { ko: '저도 그거 좋아해요! ㅎㅎ', zh: '我也喜欢那个！哈哈', zhEn: 'I like that too! Haha' },
    { ko: '우와, 재밌겠다! 😆', zh: '哇，好像很有趣！', zhEn: 'Wow, that sounds fun!' },
    { ko: '저도 완전 공감해요! 🙌', zh: '我完全有同感！', zhEn: 'I totally agree!' },
    { ko: '오늘 하루도 고생 많았어요! 🍀', zh: '今天一天也辛苦了！', zhEn: 'Good work today!' },
    { ko: '사진 보니까 저도 가고 싶어요! 📸', zh: '看了照片我也想去了！', zhEn: 'Seeing the photo makes me want to go too!' },
    { ko: '헐, 저만 그런 게 아니었네요! ㅋㅋ', zh: '咦，原来不是只有我这样啊！哈哈', zhEn: 'Oh, so it\'s not just me! Haha' },
    { ko: '저도 오늘 그거 했어요! 신기해요! ✨', zh: '我今天也做了那个！好神奇！', zhEn: 'I did that today too! How amazing!' },
    { ko: '맞아요 맞아요! 진짜 그래요! 👏', zh: '对对对！真的是那样！', zhEn: 'Yes, yes! That\'s exactly it!' },
    { ko: '읽으니까 기분이 좋아졌어요! 😊', zh: '读完心情都变好了！', zhEn: 'Reading it made my mood better!' },
    { ko: '다음 이야기도 궁금해요! 👀', zh: '也很好奇下一篇！', zhEn: 'I\'m also curious about the next one!' },
    { ko: '저도 한번 해 보고 싶어요! 🙆', zh: '我也想试一次！', zhEn: 'I want to try it once too!' },
    { ko: '오, 그거 진짜 맛있죠! 😋', zh: '哦，那个真的很好吃吧！', zhEn: 'Oh, that\'s really delicious, right!' },
    { ko: '하루하루가 알차 보여요! 🌟', zh: '每一天看起来都好充实！', zhEn: 'Every day looks so fulfilling!' },
    { ko: '저랑 취향이 비슷하네요! ㅎㅎ', zh: '跟我口味很像呢！哈哈', zhEn: 'It\'s really similar to my taste! Haha' },
  ],
};
