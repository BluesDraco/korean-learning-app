'use client';

import Link from 'next/link';
import { ArrowLeft, Pencil, Mic } from 'lucide-react';

export default function ListeningPage() {
  return (
    <div className="py-4 max-w-2xl mx-auto space-y-5 pb-24 md:max-w-3xl">
      {/* Header */}
      <div>
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-2"
        >
          <ArrowLeft size={16} /> 返回工具
        </Link>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">听力练习</h1>
        <p className="text-sm mt-0.5" style={{ color: '#89756e' }}>通过听音训练强化韩语理解力</p>
      </div>

      {/* Mode cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* 听写 */}
        <Link href="/listening/dictation" style={{ display: 'block', textDecoration: 'none' }}>
          <div style={{
            borderRadius: 24, padding: '20px 20px',
            background: '#fffbf7', border: '1.5px solid #eee0d8',
            display: 'flex', alignItems: 'flex-start', gap: 16,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16, flexShrink: 0,
              background: '#fff0f5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Pencil size={22} style={{ color: '#ff7fa8' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#241917' }}>听写练习</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: '#ff7fa8',
                  background: '#fff0f5', border: '1px solid rgba(255,127,168,0.2)',
                  borderRadius: 99, padding: '2px 8px',
                }}>可体验</span>
              </div>
              <p style={{ fontSize: 13, color: '#89756e', margin: 0, lineHeight: 1.5 }}>
                听音频，用韩文打出你听到的内容。精准训练拼写和听辨能力。
              </p>
            </div>
          </div>
        </Link>

        {/* 听说 */}
        <Link href="/listening/speaking" style={{ display: 'block', textDecoration: 'none' }}>
          <div style={{
            borderRadius: 24, padding: '20px 20px',
            background: '#fffbf7', border: '1.5px solid #eee0d8',
            display: 'flex', alignItems: 'flex-start', gap: 16,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16, flexShrink: 0,
              background: '#eaf8f5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Mic size={22} style={{ color: '#3aafa9' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#241917' }}>听说练习</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: '#3aafa9',
                  background: '#eaf8f5', border: '1px solid rgba(58,175,169,0.2)',
                  borderRadius: 99, padding: '2px 8px',
                }}>可体验</span>
              </div>
              <p style={{ fontSize: 13, color: '#89756e', margin: 0, lineHeight: 1.5 }}>
                看中文意思，用韩语说出来。语音识别自动判断准确度。
              </p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}
