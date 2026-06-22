import fs from 'fs';

const files = [
  'src/data/grammar-cards.ts',
  'src/data/grammar-cards-p1.ts',
  'src/data/grammar-cards-p2.ts',
  'src/data/grammar-cards-p3.ts',
  'src/data/grammar-cards-p4.ts',
  'src/data/grammar-cards-p5.ts',
  'src/data/grammar-cards-p6.ts',
  'src/data/grammar-cards-p7.ts',
  'src/data/grammar-cards-p8.ts',
  'src/data/grammar-cards-p9.ts',
  'src/data/grammar-cards-p10.ts',
  'src/data/grammar-cards-p11.ts',
  'src/data/grammar-cards-p12.ts',
  'src/data/grammar-cards-p13.ts',
  'src/data/grammar-cards-p14.ts',
];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');

  // Find all specialQuiz.questions arrays
  // Look for 'questions: [' pattern
  let qPos = 0;
  let totalQuestions = 0;
  let badOptionCount = 0;
  let badAnswerRange = 0;
  let emptyPrompt = 0;
  let emptyExplanation = 0;
  let noPrompt = 0;
  const answerDist = {};

  // Find each question block by searching for { with prompt/options/answer nearby
  let scanPos = 0;
  while (true) {
    const qStart = content.indexOf('{', scanPos);
    if (qStart === -1) break;

    // Check if this looks like a quiz question (has options field nearby)
    const nearby = content.substring(qStart, qStart + 300);
    if (!nearby.includes('options:') && !nearby.includes('answer:')) {
      scanPos = qStart + 1;
      continue;
    }

    // Find the end of this block
    let depth = 1;
    let qEnd = -1;
    for (let i = 0; i < nearby.length; i++) {
      if (nearby[i] === '{') depth++;
      if (nearby[i] === '}') { depth--; if (depth === 0) { qEnd = qStart + i; break; } }
    }
    if (qEnd === -1) { scanPos = qStart + 1; continue; }

    const block = content.substring(qStart, qEnd + 1);

    // Must have options + answer to be a quiz question
    const hasOptions = block.includes('options:');
    const hasAnswer = block.includes('answer:');
    if (!hasOptions && !hasAnswer) { scanPos = qEnd + 1; continue; }

    totalQuestions++;

    // Check options count
    const optMatch = block.match(/options:\s*\[([\s\S]*?)\]/);
    if (optMatch) {
      const opts = optMatch[1].split(',').filter(s => s.trim().length > 0);
      if (opts.length !== 4) badOptionCount++;
    }

    // Check answer range
    const ansMatch = block.match(/answer:\s*(\d+)/);
    if (ansMatch) {
      const ans = parseInt(ansMatch[1]);
      if (ans < 0 || ans > 3) badAnswerRange++;
      answerDist[ans] = (answerDist[ans] || 0) + 1;
    }

    // Check prompt
    const promptMatch = block.match(/prompt:\s*'([^']*)'/);
    if (!promptMatch) {
      noPrompt++;
    } else if (promptMatch[1].trim() === '') {
      emptyPrompt++;
    }

    // Check explanation
    const explMatch = block.match(/explanation:\s*'([^']*)'/);
    if (explMatch && explMatch[1].trim() === '') {
      emptyExplanation++;
    }

    scanPos = qEnd + 1;
  }

  // Print results
  const distStr = Object.entries(answerDist)
    .sort((a, b) => a[0] - b[0])
    .map(([k, v]) => `${k}:${v}`)
    .join(', ');

  const issues = [];
  if (badOptionCount > 0) issues.push(`opt!=4:${badOptionCount}`);
  if (badAnswerRange > 0) issues.push(`ansRange:${badAnswerRange}`);
  if (noPrompt > 0) issues.push(`noPrompt:${noPrompt}`);
  if (emptyPrompt > 0) issues.push(`emptyPrompt:${emptyPrompt}`);
  if (emptyExplanation > 0) issues.push(`emptyExpl:${emptyExplanation}`);

  const status = issues.length === 0 ? '✅' : '❌';
  const issueStr = issues.length > 0 ? ' [' + issues.join(', ') + ']' : '';
  console.log(`${status} ${file.replace('src/data/', '')}: ${totalQuestions}题, 分布[${distStr}]${issueStr}`);
}
