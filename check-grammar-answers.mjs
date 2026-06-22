import fs from 'fs';

const files = [
  'grammar-cards.ts', 'grammar-cards-p1.ts', 'grammar-cards-p2.ts',
  'grammar-cards-p3.ts', 'grammar-cards-p4.ts', 'grammar-cards-p5.ts',
  'grammar-cards-p6.ts', 'grammar-cards-p7.ts', 'grammar-cards-p8.ts',
  'grammar-cards-p9.ts', 'grammar-cards-p10.ts', 'grammar-cards-p11.ts',
  'grammar-cards-p12.ts', 'grammar-cards-p13.ts', 'grammar-cards-p14.ts',
];

for (const file of files) {
  const content = fs.readFileSync('src/data/' + file, 'utf8');
  let pos = 0;
  const allQuestions = [];
  let totalQuizBlocks = 0;

  while (true) {
    const sqPos = content.indexOf('specialQuiz: {', pos);
    if (sqPos === -1) break;
    totalQuizBlocks++;

    const sqBlock = content.substring(sqPos, sqPos + 1200);
    const typeMatch = sqBlock.match(/type:\s*'([^']+)'/);
    const quizType = typeMatch ? typeMatch[1] : '?';

    // Find questions array
    const qArrPos = sqBlock.indexOf('questions: [');
    if (qArrPos !== -1) {
      const qsStr = sqBlock.substring(qArrPos + 10);
      let depth = 0, qStart = -1;
      for (let i = 0; i < qsStr.length; i++) {
        if (qsStr[i] === '{') { depth++; if (qStart === -1) qStart = i; }
        if (qsStr[i] === '}') { depth--; if (depth === 0 && qStart !== -1) {
          const q = qsStr.substring(qStart, i + 1);
          const aMatch = q.match(/answer:\s*(\d)/);
          if (aMatch) {
            const hasPrompt = q.includes('prompt:');
            const hasPre = q.includes('pre:');
            // Count options after 'options: ['
            const oMatch = q.match(/options:\s*\[(.*?)\]/);
            const optCount = oMatch ? (oMatch[1].match(/'/g) || []).length / 2 : 0;
            allQuestions.push({ answer: parseInt(aMatch[1]), optCount, hasPrompt, hasPre, quizType });
          }
          qStart = -1;
        }}
      }
    }
    pos = sqPos + 10;
  }

  // Group by quiz type
  const byType = {};
  allQuestions.forEach(q => {
    if (!byType[q.quizType]) byType[q.quizType] = { qs: [], optSet: new Set() };
    byType[q.quizType].qs.push(q);
    byType[q.quizType].optSet.add(q.optCount);
  });

  const parts = [];
  let hasIssues = false;

  for (const [type, data] of Object.entries(byType)) {
    const qs = data.qs;
    const dist = {};
    qs.forEach(q => { dist[q.answer] = (dist[q.answer] || 0) + 1; });
    const distStr = Object.entries(dist).sort((a, b) => a[0] - b[0]).map(([k, v]) => `${k}:${v}`).join(',');

    // Check if all answers are the same value
    const uniqueAnswers = Object.keys(dist).length;
    const allSame = uniqueAnswers === 1;

    // For morph type: check prompt
    const morphNoPrompt = type === 'morph' ? qs.filter(q => !q.hasPrompt).length : 0;

    // For fill type: check hasPre
    const fillNoPre = type === 'fill' ? qs.filter(q => !q.hasPre).length : 0;

    const warnings = [];
    if (allSame && qs.length >= 4) warnings.push('ALL_SAME');
    if (morphNoPrompt > 0) warnings.push(`noPrompt:${morphNoPrompt}`);
    if (fillNoPre > 0) warnings.push(`noPre:${fillNoPre}`);

    const warnStr = warnings.length > 0 ? ` ❌${warnings.join(',')}` : '';
    if (warnStr) hasIssues = true;

    const optsSet = [...data.optSet].sort().join(',');
    parts.push(`${type}(${qs.length}题 分布[${distStr}] opts=${optsSet}${warnStr})`);
  }

  console.log(`${hasIssues ? '❌' : '✅'} ${file}: ${parts.join(', ')}`);
}
