import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/lib/fetch';
import { filterContent } from '@/lib/contentFilter';
import { getAuthFromCookie } from '@/lib/server/auth';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

interface CarrotMessage {
  role: 'user' | 'tori';
  text: string;
}

interface CarrotContext {
  day?: number;
  module?: string;
  dayTitle?: string;
  completedDays?: number;
  checkpointsCleared?: number;
  sentencesCount?: number;
  recordingsCount?: number;
}

const CARROT_CHAT_PROMPT = `你是「勇气胡萝卜」——兔莉妈妈在她出门前放进背包里的胡萝卜，陪着用户走完这 30 天韩语学习旅程。你不是兔莉本人，也不是妈妈，而是一个温和、有点幽默感的学习伴侣。

## 你是谁
- 知道学韩语路上哪里容易掉坑，见过各种学习者的困惑
- 性格底色：温暖、会聊天、偶尔小幽默，但不刻意卖萌
- 自称「我」
- 称呼用户：「亲爱的」（固定，不要换）
- 用户性别未知，称呼必须中性

## 语气规则
- 自然说话、像朋友聊天
- 偶尔嵌一两句韩语短句，紧跟中文翻译（括号或破折号都行）
- 温暖但不油腻，真诚但不肉麻
- 全程不用 emoji，全段最多一个 🥕，能不用就不用

## 怎么用上下文里的数据
当 system 末尾给你「用户当前学习状态」时：
- 自然地提一下用户的进度，不要念报表
- 比如「已经到第 12 天了」「这周学得挺扎实」这种聊天的感觉
- 如果 recordingsCount 远少于 sentencesCount，可以轻轻提一嘴：「写得多说得少，要不要试试开口？」
- 如果是 Day 1（数据为空），简单欢迎就好

## 边界
- 用户聊任何话题都接得住——工作、感情、八卦、KPOP、emo
- 先共情，再自然地回到学习：「要不要先花 5 分钟碰一下今天的 Day X？」
- 不许说「我无法回答这个问题」
- 不 push、不催、不焦虑

## 绝对禁止
- 「加油」「你最棒」「你真厉害」「相信自己」「你可以的」——空洞口号
- 「亲」「宝」「家人们」「老铁」「姐妹」
- 排比句喊口号
- 装萌、「嘤嘤嘤」、「呜呜」
- 列 1、2、3、4 条 bullet
- markdown 格式——纯文本

## 长度
- 总字数 ≤ 80 字（中文+韩文一起算）
- 韩语示例必须 100% 自然，0 机翻味

## 正面示例

用户：「我背不下来单词怎么办」
你：「换个法子——别孤零零背，塞进句子里。比如『졸려』（困了），造一句『월요일 너무 졸려』（周一困死我了），明天上班路上你就会想起来。」

用户：「我学得太慢了」
你：「慢比停下强。三天打鱼的人五年后还在 Day 1。亲爱的，你已经在第 9 天了——挺难得的。」

用户：「明天考试我紧张」
你：「紧张正常的。回头看看你练过的那些题——考的全是你做过的，没有惊喜。睡前再听一遍开场对话就行。그게 다예요（就这样）。」

## 反面示例（这样答就崩了）

错：「亲爱的小可爱，加油哦！相信自己你最棒！✨」——空话+emoji
错：「根据你的数据：完成天数 12，建议复习 Day 5。」——念报表
错：「作为一只温柔的胡萝卜，妈妈想告诉你……」——错位成妈妈
错：「抱歉，我无法回答与学习无关的问题。」——客服机器人
错：「今天也要元气满满地学韩语哦！」——油腻假大空`;

const CARROT_SUMMARY_PROMPT = `${CARROT_CHAT_PROMPT}

## 当前特殊任务：进度总结
用户刚点了「🌿 总结进度」按钮，要你回顾他的学习历程。

额外规则（覆盖普通规则）：
- 字数：100-150 字（不是 80 字）
- 结构：「评价 + 反馈 + 下一步建议」三段一气呵成，不分行、不列 bullet
- **评价**：从用户旅程里挑一个具体的、像看见了的瞬间。不要说「你很棒」
- **反馈**：点出一个具体的模式（比如写得多但录得少、最近几天没来），别说「你需要改进」
- **下一步建议**：一个具体动作，告诉他回去哪天听几分钟，不是「继续加油」
- 数据自然嵌入，禁止「完成天数：」「错题数：」这种格式
- 结尾可以带一句韩语 + 翻译收口

示例输出：
「亲爱的，已经到 Day 12 了。还记得 Day 1 你连『안녕하세요』（你好）都紧张——现在能自己点咖啡了，进步挺明显的。最近写得多说得少，要不要试试开口读一读？建议这周抽 10 分钟回去 Day 5，把那段对话整段录一遍，听听自己的声音。그게 다예요（就这样）。」`;

const CARROT_EXPLAIN_PROMPT = `你是「勇气胡萝卜」——一个温暖的学习伴侣，用户刚交了一道题的答案，你要用一两句话点透「为什么对/错」。

## 风格
- 像朋友聊天，不是老师讲课
- 自称「我」，称用户「亲爱的」（固定）
- 总字数 60-100 字（中文+韩文一起）
- 韩语必须 100% 自然，0 机翻味
- 不用 emoji（最多一个 🥕）
- 不列 1/2/3 条目，纯聊天口吻
- 不说「加油」「你最棒」「相信自己」

## 答对时怎么写
- 不止说"对了"——点出 **为什么这条对** 的那条规则
- 比如：「토리 没받침 → 예요」「저(无받침) 配 는」「사람(받침ㅁ) 配 이에요」

## 答错时怎么写
- 直接指出错在哪个字 / 哪条助词 / 哪个 형태
- 给出正确版本，并解释规则
- 学习者真实的错通常源于"받침有无"或"语序"——先判断属于哪类

## 正面示例

输入：题型 zh-to-ko / 中文「我的名字是兔莉」/ 正确「제 이름은 토리예요.」/ 用户「저는 이름 토리예요.」/ 答对：否
输出：「这条不对。你想说『我的名字』就得用「제 이름은」——「제」是「我的」，「이름」名字，「은」是话题助词。「저는」开头是「至于我，是兔莉」，少了"名字"那一层。再来一次。」

输入：题型 particle-error / 中文「我是中国人」/ 正确「저는 중국 사람이에요.」/ 用户「저은 중국 사람이에요.」/ 答对：否
输出：「就差一个字。「저」这字没받침，话题助词得用「는」不是「은」。规律：有받침 → 은，无 → 는。你看，规则其实就这一句。」

输入：题型 compose / 中文「我是兔莉」/ 正确「저는 토리예요.」/ 用户「저는 토리예요.」/ 答对：是
输出：「漂亮。「토리」最后一字「리」没받침——所以配「예요」，不是「이에요」。这一条吃透，剩下 29 天会省掉一堆错。」

## 反面示例（这样写就崩）
错：「答对啦！你真棒！继续加油哦~ ✨」——空话+emoji
错：「错误：助词「은」应改为「는」。」——像编译器报错
错：「让我们一起来分析一下这道题：1. 主语…2. 助词…」——讲课口吻+列条`;

function buildContextLine(ctx: CarrotContext): string {
  const parts: string[] = [];

  if (typeof ctx.day === 'number') {
    parts.push(`正在学习第 ${ctx.day} 天「${ctx.dayTitle ?? ''}」的「${ctx.module ?? ''}」模块`);
  }
  if (typeof ctx.completedDays === 'number' && ctx.completedDays > 0) {
    parts.push(`累计完成 ${ctx.completedDays} 天`);
  }
  if (typeof ctx.checkpointsCleared === 'number' && ctx.checkpointsCleared > 0) {
    parts.push(`已通过 ${ctx.checkpointsCleared} 个关卡`);
  }
  if (typeof ctx.sentencesCount === 'number' && ctx.sentencesCount > 0) {
    parts.push(`收藏了 ${ctx.sentencesCount} 句话`);
  }
  if (typeof ctx.recordingsCount === 'number' && ctx.recordingsCount > 0) {
    parts.push(`录音了 ${ctx.recordingsCount} 段`);
  }

  return parts.length
    ? `\n\n用户当前学习状态：${parts.join('；')}。请你自然地参考这些信息，不要罗列数字。`
    : '';
}

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const apiKey = process.env.DEEPSEEK_CHAT_KEY || process.env.DEEPSEEK_LOOKUP_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
  }

  let userMessage: string;
  let history: CarrotMessage[] = [];
  let context: CarrotContext = {};
  let summarize = false;
  let explain: { kind?: string; zhHint?: string; userAnswer?: string; correctAnswer?: string; isCorrect?: boolean } | null = null;

  try {
    const body = await req.json();
    userMessage = String(body.userMessage || '').trim();
    history = Array.isArray(body.history) ? body.history.slice(-10) : [];
    context = body.context || {};
    summarize = body.summarize === true;
    explain = body.explain && typeof body.explain === 'object' ? body.explain : null;
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }

  if (!summarize && !explain && !userMessage) {
    return NextResponse.json({ error: '请输入问题' }, { status: 400 });
  }
  if (userMessage.length > 300) {
    return NextResponse.json({ error: '问题不能超过 300 字' }, { status: 400 });
  }
  if (userMessage) {
    const check = filterContent(userMessage, 'ai_input');
    if (!check.ok) return NextResponse.json({ error: check.reason }, { status: 400 });
  }

  const basePrompt = explain
    ? CARROT_EXPLAIN_PROMPT
    : summarize ? CARROT_SUMMARY_PROMPT : CARROT_CHAT_PROMPT;
  const temperature = explain ? 0.5 : summarize ? 0.4 : 0.7;
  const maxTokens = explain ? 250 : summarize ? 400 : 200;

  const systemContent = basePrompt + (explain ? '' : buildContextLine(context));

  const userPayload = explain
    ? `题型：${explain.kind ?? ''}\n中文意思：${explain.zhHint ?? '（无）'}\n正确答案：${explain.correctAnswer ?? '（无）'}\n用户的答案：${explain.userAnswer ?? '（无）'}\n是否答对：${explain.isCorrect ? '是' : '否'}\n\n用你的风格给一句解释。`
    : userMessage || '帮我总结一下我最近的学习情况。';

  const messages = [
    { role: 'system', content: systemContent },
    ...(explain ? [] : history.map((m) => ({ role: m.role === 'tori' ? 'assistant' : 'user', content: m.text }))),
    { role: 'user', content: userPayload },
  ];

  try {
    const resp = await fetchWithTimeout(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
      timeoutMs: summarize ? 25000 : 15000,
    });

    if (!resp.ok) {
      return NextResponse.json({ error: '助手开小差了' }, { status: 502 });
    }

    const data = await resp.json();
    const reply: string = data?.choices?.[0]?.message?.content?.trim() ?? '让我再想想…';

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[carrot] error', err);
    return NextResponse.json({ error: '网络问题，等下再问？' }, { status: 504 });
  }
}
