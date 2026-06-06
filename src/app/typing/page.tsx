'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const C = {
  ink: '#241917', muted: '#89756e', line: '#eee0d8', pink: '#ff7fa8',
  pinkSoft: '#fff0f5', mint: '#aee3d8', cream: '#fff8f4', black: '#201815',
  mintBg: '#eaf8f5', mintText: '#4e746d',
  shadow: '0 16px 42px rgba(78,52,46,.10)',
  strong: '0 28px 72px rgba(78,52,46,.18)',
};

// ── Exercise data ──────────────────────────────────────

interface TypingExercise {
  id: string;
  korean: string;
  chinese: string;
  tags: string[];
}

const CATEGORIES = [
  { id: 'syllables', name: '基础音节', desc: '熟悉辅音 + 元音组合' },
  { id: 'words', name: '常用单词', desc: '练习词和空格' },
  { id: 'short-sentences', name: '空格短句', desc: '开始练完整句' },
  { id: 'daily', name: '日常表达', desc: '真实可用表达' },
  { id: 'kpop', name: '韩娱表达', desc: '和 Tori 内容结合' },
] as const;

const EXERCISES: TypingExercise[] = [
  { id: 's1', korean: '가 나 다 라 마', chinese: '基础辅音 + 元音组合', tags: ['基础音节'] },
  { id: 's2', korean: '고 구 기 게 개', chinese: '不同元音的组合', tags: ['基础音节'] },
  { id: 's3', korean: '바 사 아 자 차', chinese: 'ㅂㅅㅇㅈㅊ 系列', tags: ['基础音节'] },
  { id: 's4', korean: '터 포 허 커 머', chinese: 'ㅌㅍㅎㅋㅁ 系列', tags: ['基础音节'] },
  { id: 's5', korean: '까 따 빠 싸 짜', chinese: '紧音练习', tags: ['基础音节'] },
  { id: 'w1', korean: '한국어 공부 친구', chinese: '韩语 学习 朋友', tags: ['常用单词', '学韩语'] },
  { id: 'w2', korean: '오늘 내일 지금', chinese: '今天 明天 现在', tags: ['常用单词', '时间'] },
  { id: 'w3', korean: '노래 가사 무대', chinese: '歌 歌词 舞台', tags: ['常用单词', '韩娱'] },
  { id: 'w4', korean: '사랑 행복 우정', chinese: '爱 幸福 友情', tags: ['常用单词'] },
  { id: 'w5', korean: '커피 음식 물', chinese: '咖啡 食物 水', tags: ['常用单词', '日常'] },
  { id: 'ss1', korean: '저는 한국어를 공부해요.', chinese: '我正在学习韩语。', tags: ['空格短句', '完整句'] },
  { id: 'ss2', korean: '오늘은 날씨가 좋아요.', chinese: '今天天气很好。', tags: ['空格短句', '完整句'] },
  { id: 'ss3', korean: '커피 한 잔 주세요.', chinese: '请给我一杯咖啡。', tags: ['空格短句', '完整句'] },
  { id: 'ss4', korean: '저는 학생입니다.', chinese: '我是学生。', tags: ['空格短句', '完整句'] },
  { id: 'd1', korean: '오늘은 기분이 정말 좋아요.', chinese: '今天心情真的很好。', tags: ['日常表达', '空格练习'] },
  { id: 'd2', korean: '요즘 한국어가 재미있어요.', chinese: '最近觉得韩语很有趣。', tags: ['日常表达'] },
  { id: 'd3', korean: '저는 이 노래를 좋아해요.', chinese: '我喜欢这首歌。', tags: ['日常表达', '韩娱表达'] },
  { id: 'd4', korean: '내일 친구를 만날 거예요.', chinese: '明天要见朋友。', tags: ['日常表达'] },
  { id: 'k1', korean: '이번 무대 진짜 멋있었어요.', chinese: '这次舞台真的太帅了。', tags: ['韩娱表达'] },
  { id: 'k2', korean: '노래가 계속 생각나요.', chinese: '一直想起这首歌。', tags: ['韩娱表达'] },
  { id: 'k3', korean: '가사가 너무 좋아요.', chinese: '歌词太好了。', tags: ['韩娱表达'] },
  { id: 'k4', korean: '다음 콘서트 꼭 갈 거예요.', chinese: '下次演唱会一定要去。', tags: ['韩娱表达'] },
];

// ── Hangul composition (for virtual keyboard) ──────────

const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const JUNG_COMPOUND: Record<string, [string, string]> = {
  'ㅘ': ['ㅗ','ㅏ'], 'ㅙ': ['ㅗ','ㅐ'], 'ㅚ': ['ㅗ','ㅣ'],
  'ㅝ': ['ㅜ','ㅓ'], 'ㅞ': ['ㅜ','ㅔ'], 'ㅟ': ['ㅜ','ㅣ'], 'ㅢ': ['ㅡ','ㅣ'],
};
const JUNG_SPLIT: Record<string, string> = {};
for (const [com, parts] of Object.entries(JUNG_COMPOUND)) {
  JUNG_SPLIT[parts[0] + parts[1]] = com;
}

const JONG_COMPOUND: Record<string, [string, string]> = {
  'ㄳ': ['ㄱ','ㅅ'], 'ㄵ': ['ㄴ','ㅈ'], 'ㄶ': ['ㄴ','ㅎ'],
  'ㄺ': ['ㄹ','ㄱ'], 'ㄻ': ['ㄹ','ㅁ'], 'ㄼ': ['ㄹ','ㅂ'],
  'ㄽ': ['ㄹ','ㅅ'], 'ㄾ': ['ㄹ','ㅌ'], 'ㄿ': ['ㄹ','ㅍ'], 'ㅀ': ['ㄹ','ㅎ'], 'ㅄ': ['ㅂ','ㅅ'],
};

function findCho(s: string): number { return CHO.indexOf(s); }
function findJung(s: string): number { return JUNG.indexOf(s); }
function findJong(s: string): number { return JONG.indexOf(s); }

/** Try to compose jamo at the end of a string into a Hangul syllable. Returns composed string. */
function tryComposeEnd(text: string): string {
  const chars = Array.from(text);
  if (chars.length < 2) return text;

  // Case 1: Compose CHO + JUNG [+ JONG] from the end
  for (let start = Math.max(0, chars.length - 5); start < chars.length; start++) {
    const seq = chars.slice(start);
    if (seq.length < 2) continue;
    const choIdx = findCho(seq[0]);
    if (choIdx === -1) continue;

    let jungIdx = findJung(seq[1]);
    let jungConsumed = 0;

    if (jungIdx === -1) {
      // Try compound medial: ㅗ/ㅜ/ㅡ + another vowel
      if (seq[1] === 'ㅗ' && seq[2] === 'ㅏ') { jungIdx = findJung('ㅘ'); jungConsumed = 1; }
      else if (seq[1] === 'ㅗ' && seq[2] === 'ㅐ') { jungIdx = findJung('ㅙ'); jungConsumed = 1; }
      else if (seq[1] === 'ㅗ' && seq[2] === 'ㅣ') { jungIdx = findJung('ㅚ'); jungConsumed = 1; }
      else if (seq[1] === 'ㅜ' && seq[2] === 'ㅓ') { jungIdx = findJung('ㅝ'); jungConsumed = 1; }
      else if (seq[1] === 'ㅜ' && seq[2] === 'ㅔ') { jungIdx = findJung('ㅞ'); jungConsumed = 1; }
      else if (seq[1] === 'ㅜ' && seq[2] === 'ㅣ') { jungIdx = findJung('ㅟ'); jungConsumed = 1; }
      else if (seq[1] === 'ㅡ' && seq[2] === 'ㅣ') { jungIdx = findJung('ㅢ'); jungConsumed = 1; }
      if (jungIdx === -1) continue;
    }

    let consumed = 2 + jungConsumed;
    let jongIdx = 0;

    // Check for final consonant after medial
    const jongPos = 2 + jungConsumed;
    if (seq.length > jongPos) {
      const j = findJong(seq[jongPos]);
      if (j > 0) {
        jongIdx = j;
        consumed = jongPos + 1;
        // Try compound final: e.g. ㄱ+ㅅ=ㄳ
        if (seq.length > jongPos + 1) {
          const pair = seq[jongPos] + seq[jongPos + 1];
          if (JONG_COMPOUND[pair]) {
            jongIdx = findJong(pair);
            consumed = jongPos + 2;
          }
        }
      }
    }

    const code = 0xAC00 + choIdx * 588 + jungIdx * 28 + jongIdx;
    const before = chars.slice(0, start).join('');
    const after = chars.slice(start + consumed).join('');
    return before + String.fromCharCode(code) + after;
  }

  // Case 2: Last char is a valid jong (받침), attach to preceding syllable
  const lastChar = chars[chars.length - 1];
  const jongIdx = findJong(lastChar);
  if (jongIdx > 0 && chars.length >= 2) {
    const prevChar = chars[chars.length - 2];
    const prevCode = prevChar.charCodeAt(0);
    if (prevCode >= 0xAC00 && prevCode <= 0xD7A3) {
      const rel = prevCode - 0xAC00;
      const prevCho = Math.floor(rel / 588);
      const prevJung = Math.floor((rel % 588) / 28);
      const prevJong = rel % 28;
      if (prevJong === 0) {
        const newCode = 0xAC00 + prevCho * 588 + prevJung * 28 + jongIdx;
        return chars.slice(0, -1).join('') + String.fromCharCode(newCode);
      }
    }
  }

  return text;
}
// ── Keyboard layout ────────────────────────────────────

const COMPOUND_KEYS = ['ㄲ','ㄸ','ㅃ','ㅆ','ㅉ','ㅘ','ㅙ','ㅚ','ㅝ','ㅞ','ㅟ','ㅢ'];

const KEY_ROWS = [
  ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ'],
  ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
  ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ'],
];

// ── Comparison ─────────────────────────────────────────

function compareText(target: string, input: string) {
  const t = target.normalize('NFC');
  const i = input.normalize('NFC');
  let matched = 0;
  let errors = 0;
  const maxLen = Math.min(t.length, i.length);
  for (let pos = 0; pos < maxLen; pos++) {
    if (t[pos] === i[pos]) matched++;
    else errors++;
  }
  // Extra chars in input beyond target length = errors
  if (i.length > t.length) errors += i.length - t.length;
  return { matched, errors, total: t.length, done: matched === t.length && i.length === t.length };
}

function renderComparison(target: string, input: string) {
  const t = target.normalize('NFC');
  const i = input.normalize('NFC');
  const maxLen = Math.max(t.length, i.length);
  const items: { char: string; status: 'correct' | 'wrong' | 'pending' | 'extra' }[] = [];
  for (let pos = 0; pos < maxLen; pos++) {
    if (pos < t.length && pos < i.length) {
      items.push({ char: t[pos], status: t[pos] === i[pos] ? 'correct' : 'wrong' });
    } else if (pos < t.length) {
      items.push({ char: t[pos], status: 'pending' });
    } else {
      items.push({ char: i[pos], status: 'extra' });
    }
  }
  return items;
}

function feedbackText(matched: number, total: number, errors: number): string {
  if (total === 0) return '输入目标文字开始练习。';
  if (matched === total) return '输入完成，全部正确！';
  if (matched > total * 0.7) return '输入稳定，注意剩余字符和空格。';
  if (errors > 0) return '有字符不一致，重点检查空格、받침 和元音组合。';
  return '继续输入，注意词与词之间的空格。';
}

// ── Page ────────────────────────────────────────────────

export default function TypingPage() {
  const router = useRouter();
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showKeymap, setShowKeymap] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768; // mobile default: show keyboard; desktop: hide
  });
  const [keyboardBottom, setKeyboardBottom] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Lift virtual keyboard above system keyboard on mobile
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    function onResize() {
      const offset = window.innerHeight - (vv!.height + vv!.offsetTop);
      setKeyboardBottom(Math.max(0, offset));
    }
    vv.addEventListener('resize', onResize);
    vv.addEventListener('scroll', onResize);
    return () => { vv.removeEventListener('resize', onResize); vv.removeEventListener('scroll', onResize); };
  }, []);

  const currentCategory = CATEGORIES[categoryIdx];
  const categoryExercises = useMemo(
    () => EXERCISES.filter(ex => {
      const catName = currentCategory.name;
      return ex.tags.includes(catName);
    }),
    [categoryIdx]
  );
  const exercise = categoryExercises[exerciseIdx] ?? categoryExercises[0] ?? EXERCISES[0];
  const target = exercise.korean;

  const comparison = useMemo(() => compareText(target, input), [target, input]);
  const displayItems = useMemo(() => renderComparison(target, input), [target, input]);
  const feedback = useMemo(() => feedbackText(comparison.matched, comparison.total, comparison.errors), [comparison]);

  // Timer
  useEffect(() => {
    if (startTime && !finished) {
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTime, finished]);

  // Auto-finish when all matched
  useEffect(() => {
    if (comparison.done && startTime && !finished) {
      setFinished(true);
    }
  }, [comparison.done, startTime, finished]);

  // Scroll input into view on mobile keyboard
  useEffect(() => {
    if (input.length > 0) {
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [input.length]);

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (isComposing) return;
    const val = e.target.value;
    if (!startTime && val.length > 0) setStartTime(Date.now());
    setInput(val);
  }

  function handleCompositionStart() {
    setIsComposing(true);
  }

  function handleCompositionEnd(e: React.CompositionEvent<HTMLTextAreaElement>) {
    setIsComposing(false);
    const val = (e.target as HTMLTextAreaElement).value;
    if (!startTime && val.length > 0) setStartTime(Date.now());
    setInput(val);
  }

  // Virtual keyboard
  function handleJamoClick(jamo: string) {
    if (finished) return;
    if (!startTime) setStartTime(Date.now());
    setInput(prev => {
      const next = tryComposeEnd(prev + jamo);
      return next;
    });
  }

  function handleSpace() {
    if (finished) return;
    if (!startTime) setStartTime(Date.now());
    setInput(prev => prev + ' ');
  }

  function handleBackspace() {
    if (finished) return;
    setInput(prev => prev.slice(0, -1));
  }

  function handleClear() {
    setInput('');
    setStartTime(null);
    setElapsed(0);
    setFinished(false);
  }

  function handleRetry() {
    setInput('');
    setStartTime(null);
    setElapsed(0);
    setFinished(false);
    inputRef.current?.focus();
  }

  function handleNext() {
    if (exerciseIdx + 1 < categoryExercises.length) {
      setExerciseIdx(i => i + 1);
    } else if (categoryIdx + 1 < CATEGORIES.length) {
      setCategoryIdx(i => i + 1);
      setExerciseIdx(0);
    } else {
      setExerciseIdx(0);
    }
    setInput('');
    setStartTime(null);
    setElapsed(0);
    setFinished(false);
  }

  function handlePrev() {
    if (exerciseIdx > 0) {
      setExerciseIdx(i => i - 1);
    } else if (categoryIdx > 0) {
      setCategoryIdx(i => i - 1);
      const prevCat = CATEGORIES[categoryIdx - 1];
      const prevExercises = EXERCISES.filter(ex => ex.tags.includes(prevCat.name));
      setExerciseIdx(prevExercises.length - 1);
    }
    setInput('');
    setStartTime(null);
    setElapsed(0);
    setFinished(false);
  }

  const accuracy = comparison.total > 0 ? Math.round((comparison.matched / comparison.total) * 100) : 0;
  const elapsedSec = Math.floor(elapsed / 1000);
  const elapsedDisplay = `${Math.floor(elapsedSec / 60)}:${String(elapsedSec % 60).padStart(2, '0')}`;
  const exerciseTotal = categoryExercises.length;
  const exerciseNum = exerciseIdx + 1;

  return (
    <div style={{ paddingBottom: 160 }}>
      {/* Keymap modal */}
      {showKeymap && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(36,25,23,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}
          onClick={() => setShowKeymap(false)}
        >
          <div style={{ background: '#fff', borderRadius: 28, padding: 20, maxWidth: 480, width: '100%', boxShadow: '0 20px 60px rgba(36,25,23,.25)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 900, color: C.ink }}>韩文键盘对照表</span>
              <button onClick={() => setShowKeymap(false)} style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid ' + C.line, background: C.cream, cursor: 'pointer', fontSize: 16, color: C.muted }}>✕</button>
            </div>
            {/* Keymap rows */}
            {[
              [['Q','ㅂ'],['W','ㅈ'],['E','ㄷ'],['R','ㄱ'],['T','ㅅ'],['Y','ㅛ'],['U','ㅕ'],['I','ㅑ'],['O','ㅐ'],['P','ㅔ']],
              [['A','ㅁ'],['S','ㄴ'],['D','ㅇ'],['F','ㄹ'],['G','ㅎ'],['H','ㅗ'],['J','ㅓ'],['K','ㅏ'],['L','ㅣ']],
              [['Z','ㅋ'],['X','ㅌ'],['C','ㅊ'],['V','ㅍ'],['B','ㅠ'],['N','ㅜ'],['M','ㅡ']],
            ].map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 6 }}>
                {row.map(([en, ko]) => (
                  <div key={en} style={{ flex: '1 1 0', maxWidth: 42, background: C.cream, border: '1px solid ' + C.line, borderRadius: 10, padding: '6px 2px', textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>{en}</div>
                    <div style={{ fontSize: 16, color: C.ink, fontWeight: 900 }}>{ko}</div>
                  </div>
                ))}
              </div>
            ))}
            <p style={{ fontSize: 11, color: C.muted, textAlign: 'center', marginTop: 12 }}>Shift + 键 = 双字音/双字母（ㄲ ㄸ ㅃ ㅆ ㅉ ㅒ ㅖ）</p>
          </div>
        </div>
      )}

      {/* Back bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <button onClick={() => router.back()} style={{ width: 38, height: 38, borderRadius: 16, background: '#fff', border: '1px solid ' + C.line, fontSize: 20, color: '#4d3933', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>韩文打字</div>
          <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, marginTop: 2 }}>系统输入 + 内嵌键盘</div>
        </div>
        <button onClick={() => setShowKeymap(true)} style={{ height: 30, padding: '0 11px', borderRadius: 999, background: '#fff', color: C.ink, fontSize: 11, fontWeight: 800, border: '1px solid ' + C.line, cursor: 'pointer', flexShrink: 0 }}>键位图</button>
        <div style={{ height: 30, padding: '0 11px', borderRadius: 999, background: C.pinkSoft, color: '#f0799b', fontSize: 11, fontWeight: 800, border: '1px solid rgba(255,127,168,.16)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>练习</div>
      </div>

      {/* Hero */}
      <div style={{
        borderRadius: 32, padding: 20,
        background: 'radial-gradient(circle at 88% 78%, rgba(255,255,255,.58), transparent 24%), linear-gradient(135deg, #201815, #4d3934 46%, #ff8daf 132%)',
        color: '#fff', boxShadow: C.strong, border: '1px solid rgba(255,255,255,.92)',
        marginBottom: 20, overflow: 'hidden', position: 'relative',
      }}>
        <div style={{ height: 34, padding: '0 13px', borderRadius: 999, background: 'rgba(255,255,255,.14)', color: '#fff', fontWeight: 800, fontSize: 12, border: '1px solid rgba(255,255,255,.18)', display: 'inline-flex', alignItems: 'center' }}>
          ⌨️ 韩文打字
        </div>
        <h1 style={{ margin: '14px 0 0', maxWidth: 260, fontSize: 27, lineHeight: 1.1, letterSpacing: '-.8px', fontWeight: 800 }}>
          用短词短句，把韩文打顺
        </h1>
        <p style={{ margin: '10px 0 0', maxWidth: 260, fontSize: 13, lineHeight: 1.55, color: 'rgba(255,255,255,.74)' }}>
          可以用系统输入法直接输入，也可以点下面的内嵌键盘辅助。空格和 받침 都会计入判断。
        </p>
        <div style={{ position: 'absolute', right: -32, bottom: -64, width: 190, height: 190, borderRadius: '50%', background: 'rgba(255,255,255,.10)', pointerEvents: 'none' }} />
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto', paddingBottom: 2 }}>
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => { setCategoryIdx(i); setExerciseIdx(0); handleClear(); }}
            style={{
              height: 34, padding: '0 12px', borderRadius: 999, whiteSpace: 'nowrap',
              background: i === categoryIdx ? C.black : '#fff',
              color: i === categoryIdx ? '#fff' : C.muted,
              border: '1px solid ' + (i === categoryIdx ? C.black : C.line),
              fontSize: 12, fontWeight: 800, cursor: 'pointer',
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Exercise header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: C.muted, fontWeight: 700 }}>
          {exerciseNum} / {exerciseTotal} · {currentCategory.desc}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {exercise.tags.map(tag => (
            <span key={tag} style={{ height: 22, padding: '0 8px', borderRadius: 999, background: C.pinkSoft, color: '#f0799b', fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center' }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Target text card */}
      <div style={{ borderRadius: 30, padding: 18, background: '#fff', border: '1px solid ' + C.line, boxShadow: C.shadow, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, marginBottom: 10 }}>目标文本</div>
        <div style={{ fontSize: 22, lineHeight: 1.55, fontWeight: 800, letterSpacing: '-.35px', color: C.ink, wordBreak: 'keep-all' }}>
          {exercise.korean}
        </div>
        <div style={{ fontSize: 14, color: C.muted, marginTop: 8, fontWeight: 700 }}>
          {exercise.chinese}
        </div>
      </div>

      {/* Comparison display */}
      <div style={{ borderRadius: 30, padding: 16, background: '#fff', border: '1px solid ' + C.line, boxShadow: C.shadow, marginBottom: 14 }}>
        <div style={{ fontSize: 19, lineHeight: 1.7, fontWeight: 800, letterSpacing: '-.2px', wordBreak: 'keep-all', minHeight: 32 }}>
          {displayItems.map((item, i) => (
            <span
              key={i}
              style={{
                color: item.status === 'correct' ? C.mintText :
                       item.status === 'wrong' ? '#e06a6a' :
                       item.status === 'extra' ? '#e06a6a' :
                       C.muted,
                opacity: item.status === 'pending' ? 0.55 : 1,
                textDecoration: item.status === 'extra' ? 'line-through' : 'none',
              }}
            >
              {item.char}
            </span>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div style={{ borderRadius: 30, padding: 16, background: '#fff', border: '1px solid ' + C.line, boxShadow: C.shadow, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: C.muted, fontWeight: 700 }}>
            {showKeyboard ? '内嵌键盘模式 Beta' : '系统输入模式'}
          </span>
          <button
            onClick={() => { const next = !showKeyboard; setShowKeyboard(next); if (next) inputRef.current?.blur(); else inputRef.current?.focus(); }}
            style={{ height: 26, padding: '0 9px', borderRadius: 999, border: '1px solid ' + C.line, background: '#fff', color: C.muted, fontSize: 10, fontWeight: 800, cursor: 'pointer' }}
          >
            {showKeyboard ? '关闭键盘' : '显示键盘'}
          </button>
        </div>
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onFocus={() => setShowKeyboard(false)}
          placeholder="在此输入韩文..."
          rows={2}
          autoFocus
          style={{
            width: '100%', boxSizing: 'border-box', minHeight: 80, borderRadius: 22,
            padding: 14, background: C.cream, border: '1px solid rgba(239,224,217,.92)',
            color: '#6f5c55', fontSize: 18, lineHeight: 1.7, fontWeight: 700,
            outline: 'none', fontFamily: 'inherit', resize: 'none',
          }}
        />
      </div>

      {/* Feedback */}
      <div style={{ borderRadius: 24, padding: 16, background: '#fff', border: '1px solid ' + C.line, boxShadow: C.shadow, marginBottom: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 12 }}>
          <div style={{ borderRadius: 18, padding: 12, background: C.mintBg, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.mintText }}>{accuracy}%</div>
            <div style={{ fontSize: 11, color: C.mintText, fontWeight: 700, marginTop: 2 }}>正确率</div>
          </div>
          <div style={{ borderRadius: 18, padding: 12, background: C.cream, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.ink }}>{elapsedDisplay}</div>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginTop: 2 }}>用时</div>
          </div>
          <div style={{ borderRadius: 18, padding: 12, background: C.pinkSoft, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#e06a6a' }}>{comparison.errors}</div>
            <div style={{ fontSize: 11, color: '#e06a6a', fontWeight: 700, marginTop: 2 }}>错误字符</div>
          </div>
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: C.muted, textAlign: 'center', fontWeight: 700 }}>
          {finished ? '全部完成！' : feedback}
        </div>
      </div>

      {/* Bottom actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        <button onClick={handlePrev} style={{ height: 40, borderRadius: 999, border: '1px solid ' + C.line, background: '#fff', color: '#5a4640', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>上一题</button>
        <button onClick={handleRetry} style={{ height: 40, borderRadius: 999, border: '1px solid ' + C.line, background: '#fff', color: '#5a4640', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>再练一次</button>
        <button onClick={handleNext} style={{ height: 40, borderRadius: 999, border: 'none', background: C.black, color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 22px rgba(32,24,21,.16)' }}>下一题</button>
      </div>

      {/* Inline keyboard */}
      {showKeyboard && (
        <div style={{
          position: 'fixed', left: 0, right: 0, bottom: keyboardBottom, zIndex: 50,
          padding: '10px 14px 16px',
          background: 'rgba(255,255,255,.96)', backdropFilter: 'blur(20px)',
          borderTop: '1px solid ' + C.line,
        }}>
          {/* Row 1 */}
          <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginBottom: 4 }}>
            {KEY_ROWS[0].map(j => (
              <button key={j} onClick={() => handleJamoClick(j)} style={{ flex: '1 1 0', minWidth: 0, maxWidth: 38, height: 38, borderRadius: 10, background: C.cream, border: '1px solid ' + C.line, color: C.ink, fontSize: 14, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{j}</button>
            ))}
          </div>
          {/* Row 2 */}
          <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginBottom: 4, paddingLeft: '4%', paddingRight: '4%' }}>
            {KEY_ROWS[1].map(j => (
              <button key={j} onClick={() => handleJamoClick(j)} style={{ flex: '1 1 0', minWidth: 0, maxWidth: 38, height: 38, borderRadius: 10, background: C.cream, border: '1px solid ' + C.line, color: C.ink, fontSize: 14, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{j}</button>
            ))}
          </div>
          {/* Row 3 */}
          <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginBottom: 6 }}>
            <div style={{ flex: '1.5 1 0' }} />
            {KEY_ROWS[2].map(j => (
              <button key={j} onClick={() => handleJamoClick(j)} style={{ flex: '1 1 0', minWidth: 0, maxWidth: 38, height: 38, borderRadius: 10, background: C.cream, border: '1px solid ' + C.line, color: C.ink, fontSize: 14, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{j}</button>
            ))}
            <div style={{ flex: '1.5 1 0' }} />
          </div>
          {/* Compound jamo row */}
          <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 6 }}>
            {COMPOUND_KEYS.map(j => (
              <button key={j} onClick={() => handleJamoClick(j)} style={{ width: 32, height: 38, borderRadius: 10, background: C.pinkSoft, border: '1px solid rgba(255,127,168,.16)', color: '#f0799b', fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{j}</button>
            ))}
          </div>

          {/* Space / Backspace / Clear row */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
            <button onClick={handleBackspace} style={{ height: 38, padding: '0 14px', borderRadius: 999, background: C.cream, border: '1px solid ' + C.line, color: C.ink, fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>⌫</button>
            <button onClick={handleSpace} style={{ flex: 1, maxWidth: 180, height: 38, borderRadius: 999, background: C.black, color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer', border: 'none' }}>Space</button>
            <button onClick={handleClear} style={{ height: 38, padding: '0 14px', borderRadius: 999, background: C.cream, border: '1px solid ' + C.line, color: C.ink, fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>Clear</button>
          </div>
        </div>
      )}
    </div>
  );
}
