'use client';

import { getCharDiff, normalizeKorean } from '@/lib/koreanDiff';

interface DiffFeedbackProps {
  userInput: string;
  correct: string;
}

export function DiffFeedback({ userInput, correct }: DiffFeedbackProps) {
  const { userDiff, correctDiff, notes } = getCharDiff(
    userInput.replace(/\s/g, ''),
    correct.replace(/\s/g, '')
  );
  const isCorrect = normalizeKorean(userInput) === normalizeKorean(correct);

  if (isCorrect) {
    return (
      <div style={{ background: '#eaf8f5', borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 22 }}>✓</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#3aafa9' }}>回答正确！</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* 你的答案 */}
      <div style={{ background: '#fff0f0', borderRadius: 14, padding: '12px 16px' }}>
        <p style={{ fontSize: 11, color: '#e04a6a', fontWeight: 700, marginBottom: 8, letterSpacing: '0.05em' }}>你的答案</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {userDiff.length > 0 ? userDiff.map((seg, i) => (
            <span key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 36,
              height: 36,
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 700,
              background: seg.status === 'correct' ? '#eaf8f5' : seg.status === 'wrong' ? '#ffd6de' : '#fff3cd',
              color: seg.status === 'correct' ? '#3aafa9' : seg.status === 'wrong' ? '#e04a6a' : '#b07d00',
              textDecoration: seg.status === 'wrong' ? 'line-through' : 'none',
              border: seg.status === 'extra' ? '1px dashed #e04a6a' : 'none',
            }}>
              {seg.char}
            </span>
          )) : (
            <span style={{ fontSize: 14, color: '#e04a6a', fontStyle: 'italic' }}>（未输入）</span>
          )}
        </div>
      </div>

      {/* 正确答案 */}
      <div style={{ background: '#eaf8f5', borderRadius: 14, padding: '12px 16px' }}>
        <p style={{ fontSize: 11, color: '#3aafa9', fontWeight: 700, marginBottom: 8, letterSpacing: '0.05em' }}>正确答案</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {correctDiff.map((seg, i) => (
            <span key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 36,
              height: 36,
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 700,
              background: seg.status === 'correct' ? '#d0f2ed' : seg.status === 'missing' ? '#fff3cd' : '#ffd6de',
              color: seg.status === 'correct' ? '#3aafa9' : seg.status === 'missing' ? '#b07d00' : '#e04a6a',
              border: seg.status === 'missing' ? '1px dashed #b07d00' : 'none',
            }}>
              {seg.char}
            </span>
          ))}
        </div>
      </div>

      {/* 错误分析 */}
      {notes.length > 0 && (
        <div style={{ background: '#f5ede8', borderRadius: 14, padding: '10px 14px' }}>
          <p style={{ fontSize: 11, color: '#89756e', fontWeight: 700, marginBottom: 6, letterSpacing: '0.05em' }}>错误分析</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {notes.map((note, i) => (
              <p key={i} style={{ fontSize: 13, color: '#5a4640', margin: 0 }}>· {note}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
