// Add romanization to all lyrics in kpopSongs.ts
// Converts: _(t(...), t(...), "한글", "한글", '')
// To:       _(t(...), t(...), "한글", "romanized", '')
const fs = require('fs');
const path = require('path');

const KPOP_FILE = path.join(__dirname, '..', 'src', 'data', 'kpopSongs.ts');

// Korean syllable decomposition-based romanization
function romanizeHangul(ch) {
  const code = ch.charCodeAt(0) - 0xAC00;
  if (code < 0 || code >= 11172) return ch;
  const cho = Math.floor(code / 588);
  const jung = Math.floor((code % 588) / 28);
  const jong = code % 28;
  const CHO = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
  const JUNG = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
  const JONG = ['','g','kk','gs','n','nj','nh','d','l','lg','lm','lb','ls','lt','lp','lh','m','b','bs','s','ss','ng','j','ch','k','t','p','h'];
  return (CHO[cho] || '') + (JUNG[jung] || '') + (JONG[jong] || '');
}

function romanize(text) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (/[가-힣]/.test(ch)) {
      result += romanizeHangul(ch);
    } else {
      result += ch;
    }
  }
  return result;
}

let content = fs.readFileSync(KPOP_FILE, 'utf8');
let count = 0;

// Match: _(t(...), t(...), "korean", "SAME_KOREAN", '')
// Replace the second string with romanized version
content = content.replace(
  /(_\(t\(\d+,[\d.]+\)(?:,\s*t\(\d+,[\d.]+\))?),\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*''\)/g,
  (match, prefix, korean, pron) => {
    if (pron === korean && /[가-힣]/.test(korean)) {
      const rom = romanize(korean);
      count++;
      return `${prefix}, "${korean}", "${rom}", '')`;
    }
    return match;
  }
);

fs.writeFileSync(KPOP_FILE, content, 'utf8');
console.log(`Romanized ${count} lines`);
