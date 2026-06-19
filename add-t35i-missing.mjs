import fs from 'fs';
const path = 'C:/Users/Administrator/Desktop/korean-learning-app/src/data/topik-questions.ts';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/\];\s*$/, '');

const questions = [
  { id:'T35I-R40', topic:'장소', num:40, diff:'easy', tp:'내용 불일치',
    prompt:'[하나 도서관 안내]\n위치: 2층\n이용 시간: 오전 9시 ~ 오후 6시\n휴관일: 매주 일요일\n대출 권수: 1인 5권\n\n맞지 않는 것은?',
    pZh:'[哈娜图书馆指南]\n位置：2层\n使用时间：上午9点~下午6点\n休馆日：每周日\n借阅数量：每人5本\n\n不符합내容的是？',
    opts:['이 층에 있습니다.','일요일에 쉽니다.','책을 다섯 권 빌릴 수 있습니다.','오후 일곱 시까지 이용할 수 있습니다.'], ans:3,
    exp:'오후 6시까지 이용할 수 있습니다. 일곱 시가 아닙니다.', voc:['도서관','대출','휴관','이용'] },
  { id:'T35I-R41', topic:'생활정보', num:41, diff:'easy', tp:'내용 불일치',
    prompt:'[수업 안내]\n한국어 말하기 수업\n시간: 월, 수, 금 오후 2시 ~ 4시\n장소: 302호\n신청: 이번 주 금요일까지\n수업료: 무료\n\n맞지 않는 것은?',
    pZh:'[课程指南]\n韩语口语课\n时间：周一、三、五 下午2点~4点\n地点：302号\n申请：本周五之前\n学费：免费\n\n不符합내容的是？',
    opts:['수업료를 내지 않아도 됩니다.','일주일에 세 번 수업이 있습니다.','삼백이 호에서 수업을 합니다.','화요일 오후에 수업이 있습니다.'], ans:3,
    exp:'수업은 월, 수, 금요일에 있습니다. 화요일에는 수업이 없습니다.', voc:['수업','말하기','수업료','신청'] },
  { id:'T35I-R42', topic:'일상', num:42, diff:'easy', tp:'내용 불일치',
    prompt:'[문자 메시지]\n준호 씨, 저 미나예요.\n오늘 오후에 카페에서 만나기로 했잖아요.\n저 조금 늦을 것 같아요.\n30분만 기다려 줄 수 있어요?\n\n맞지 않는 것은?',
    pZh:'[短信]\n俊浩，我是美娜。\n今天下午说好在咖啡馆见面的。\n我好像要晚一点。\n能等我30分钟吗？\n\n不符합내容的是？',
    opts:['미나 씨가 문자를 보냈습니다.','두 사람은 오늘 만날 겁니다.','만나는 장소는 카페입니다.','미나 씨가 먼저 카페에 도착했습니다.'], ans:3,
    exp:'미나 씨는 늦는다고 했으므로 아직 카페에 도착하지 않았습니다.', voc:['문자','카페','늦다','기다리다'] },
  { id:'T35I-R63', topic:'일상', num:63, diff:'medium', tp:'글의 목적',
    prompt:'[이메일]\n안녕하세요?\n저는 이번에 새로 이사를 했습니다.\n새 집에서 집들이를 하려고 합니다.\n다음 주 토요일 오후 세 시에 오실 수 있으세요?\n주소를 문자로 보내 드릴게요.\n기다리겠습니다.\n\n왜 이 글을 썼습니까?',
    pZh:'为什么写了这封邮件？',
    opts:['이사 소식을 알리려고','집들이에 초대하려고','새 주소를 알려 주려고','이사를 도와달라고'], ans:1,
    exp:'집들이에 와 달라는 초대 이메일입니다.', voc:['이사','집들이','초대','주소'] },
  { id:'T35I-R64', topic:'일상', num:64, diff:'medium', tp:'내용 일치',
    prompt:'[이메일]\n안녕하세요?\n저는 이번에 새로 이사를 했습니다.\n새 집에서 집들이를 하려고 합니다.\n다음 주 토요일 오후 세 시에 오실 수 있으세요?\n주소를 문자로 보내 드릴게요.\n기다리겠습니다.\n\n내용과 같은 것은?',
    pZh:'与内容一致的是？',
    opts:['다음 주 일요일에 집들이를 합니다.','이 사람은 이사를 할 예정입니다.','집들이는 오후 세 시에 시작합니다.','주소는 이메일로 보내 줄 겁니다.'], ans:2,
    exp:'다음 주 토요일 오후 세 시에 집들이를 합니다.', voc:['이사','집들이','주소','토요일'] },
];

let toAdd = '';
for (const q of questions) {
  const vocStr = q.voc.map(v => `'${v}'`).join(',');
  const optsStr = q.opts.map(o => `'${o.replace(/'/g, "\\'")}'`).join(',');
  toAdd += `  { id:'${q.id}', section:'reading', level:'beginner', topic:'${q.topic}', number:${q.num}, type:'multiple-choice', difficulty:'${q.diff}', testPoint:'${q.tp}', prompt:'${q.prompt.replace(/\n/g,'\\n').replace(/'/g,"\\'")}', promptZh:'${q.pZh.replace(/\n/g,'\\n').replace(/'/g,"\\'")}', options:[${optsStr}], correctIdx:${q.ans}, explanation:'${q.exp.replace(/'/g,"\\'")}', vocabulary:[${vocStr}] },\n`;
}

content = content + toAdd + '\n];\n';
fs.writeFileSync(path, content, 'utf8');
console.log('Done, wrote', questions.length, 'questions');
