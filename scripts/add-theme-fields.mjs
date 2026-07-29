import { readFileSync, writeFileSync } from 'fs';

const filePath = new URL('../src/data/vocabulary/themes.ts', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

const patches = {
  'theme-cafe':         { difficulty: 'beginner',      previewWords: ['아메리카노', '주세요', '계산', '와이파이'] },
  'theme-restaurant':   { difficulty: 'beginner',      previewWords: ['메뉴', '삼겹살', '포장', '잘 먹겠습니다'] },
  'theme-shopping':     { difficulty: 'beginner',      previewWords: ['얼마예요', '깎아 주세요', '교환', '봉투'] },
  'theme-subway':       { difficulty: 'beginner',      previewWords: ['지하철', '호선', '교통카드', '출구'] },
  'theme-hospital':     { difficulty: 'intermediate',  previewWords: ['아파요', '약국', '증상', '보험증'] },
  'theme-hotel':        { difficulty: 'beginner',      previewWords: ['체크인', '예약', '여권', '체크아웃'] },
  'theme-greetings':    { difficulty: 'beginner',      previewWords: ['안녕하세요', '반갑습니다', '잘 부탁드립니다', '연락할게요'] },
  'theme-emotions':     { difficulty: 'beginner',      previewWords: ['좋아해요', '사랑해요', '보고 싶어요', '기분'] },
  'theme-kpop':         { difficulty: 'intermediate',  previewWords: ['콘서트', '최애', '팬미팅', '응원'] },
  'theme-kdrama':       { difficulty: 'intermediate',  previewWords: ['진짜요', '그만해요', '결혼', '두고봐요'] },
  'theme-beauty':       { difficulty: 'intermediate',  previewWords: ['발림성', '샘플', '피부 타입', '세일'] },
  'theme-travel':       { difficulty: 'beginner',      previewWords: ['서울', '추천해 주세요', '사진', '면세점'] },
  'theme-work':         { difficulty: 'intermediate',  previewWords: ['확인', '수고하셨습니다', '자료', '회의'] },
  'theme-classroom':    { difficulty: 'beginner',      previewWords: ['질문', '설명', '숙제', '천천히'] },
  'theme-interview':    { difficulty: 'advanced',      previewWords: ['자기소개', '지원', '경력', '연봉'] },
  'theme-meeting':      { difficulty: 'advanced',      previewWords: ['회의', '안건', '검토', '정리하자면'] },
  'theme-banking':      { difficulty: 'advanced',      previewWords: ['계좌', '체크카드', '송금', '잔액'] },
  'theme-move':         { difficulty: 'advanced',      previewWords: ['보증금', '월세', '관리비', '계약'] },
  'theme-sports':       { difficulty: 'intermediate',  previewWords: ['헬스장', '스트레칭', '등산', '근육'] },
  'theme-festival':     { difficulty: 'beginner',      previewWords: ['설날', '추석', '생일', '한복'] },
  'theme-social-media': { difficulty: 'intermediate',  previewWords: ['팔로우', '조회수', '댓글', '인스타'] },
  'theme-dating':       { difficulty: 'beginner',      previewWords: ['사귀어 주세요', '데이트', '커플룩', '헤어지다'] },
  'theme-study-abroad': { difficulty: 'intermediate',  previewWords: ['수강 신청', '과제', '중간고사', '졸업'] },
};

let src = readFileSync(filePath, 'utf8');

for (const [id, fields] of Object.entries(patches)) {
  // Find the estimatedMinutes line in the block that contains this id
  // Pattern: find the id, then find the next estimatedMinutes: N, line, replace with new fields + estimatedMinutes
  const idEscaped = id.replace(/[-]/g, '\\-');
  const regex = new RegExp(
    `(id:\\s*'${idEscaped}'[\\s\\S]*?)(\\s+estimatedMinutes:\\s*\\d+,)`,
    'm'
  );

  if (!regex.test(src)) {
    console.error(`NOT FOUND: ${id}`);
    continue;
  }

  const previewStr = JSON.stringify(fields.previewWords);
  src = src.replace(regex, (_, before, estLine) => {
    // Check if already patched
    if (before.includes('difficulty:') || before.includes('previewWords:')) {
      console.log(`SKIP (already patched): ${id}`);
      return before + estLine;
    }
    const indent = estLine.match(/^\s*/)[0];
    return (
      before +
      `${indent}difficulty: '${fields.difficulty}',\n` +
      `${indent}previewWords: ${previewStr},` +
      estLine
    );
  });

  console.log(`PATCHED: ${id}`);
}

writeFileSync(filePath, src, 'utf8');
console.log('\nDone. File written.');
