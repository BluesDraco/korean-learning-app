'use client';

import { useRouter } from 'next/navigation';

const FEATURED = [
  {
    label: '内容拆解',
    desc: '粘贴韩文文章或句子，生成全文翻译、重点词汇、语法解析。',
    href: '/ai/analyze',
    gradient: 'linear-gradient(135deg, #ffe4ec 0%, #fff4dc 100%)',
  },
  {
    label: '影音跟读',
    desc: '跟着原声逐句模仿，录音对比，提升发音和语调。',
    href: '/shadowing',
    gradient: 'linear-gradient(135deg, #e0f0ff 0%, #f0e8ff 100%)',
  },
];

const TOOL_GRID = [
  { icon: '🔍', label: '查词翻译', desc: '韩语字典', href: '/dictionary', color: '#b49ccf' },
  { icon: '🎤', label: '发音跟读', desc: '对比标准音', href: '/pronunciation', color: '#e47a94' },
  { icon: '✏️', label: '听写练习', desc: '听力训练', href: '/dictation', color: '#e8a87c' },
  { icon: '🔄', label: '闪卡复习', desc: 'SRS 复习', href: '/review', color: '#81b5a1' },
  { icon: '📄', label: '文章拆解', desc: '文章分析', href: '/reading', color: '#b49ccf' },
  { icon: '📖', label: '语法解释', desc: '句型例句', href: '/grammar', color: '#e47a94' },
  { icon: '⌨️', label: '韩文打字', desc: '键盘练习', href: '/typing', color: '#e8a87c' },
  { icon: '✍️', label: '写作练习', desc: '韩语写作', href: '/writing', color: '#81b5a1' },
  { icon: '💬', label: 'AI 场景陪练', desc: '情景对话', href: '/ai/chat', color: '#b49ccf' },
];

export function DesktopToolsPage() {
  const router = useRouter();

  return (
    <div style={{ animation: 'fade-in .18s ease-out' }}>
      {/* Hero */}
      <div className="desktop-hero tools">
        <span className="desktop-label">⚙ 工具</span>
        <h2>把你看到的韩文，变成可以学的内容</h2>
        <p>内容拆解、影音跟读、查词翻译、发音跟读、闪卡复习……全部工具都在这里。</p>
      </div>

      {/* Featured cards */}
      <div className="desktop-grid-2" style={{ marginTop: 16 }}>
        {FEATURED.map((item) => (
          <div
            key={item.href}
            style={{
              borderRadius: 28,
              background: item.gradient,
              padding: '22px 24px',
              boxShadow: '0 8px 24px rgba(92,64,38,0.07)',
              cursor: 'pointer',
              transition: 'transform .15s ease',
            }}
            onClick={() => router.push(item.href)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <p style={{ fontSize: 17, fontWeight: 700, color: '#2f2a26' }}>{item.label}</p>
            <p style={{ fontSize: 13, color: '#8c8177', marginTop: 6, lineHeight: 1.55 }}>{item.desc}</p>
            <button
              style={{
                marginTop: 14,
                background: '#241917',
                color: '#fff',
                border: 'none',
                borderRadius: 999,
                padding: '8px 18px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              打开
            </button>
          </div>
        ))}
      </div>

      {/* All tools grid */}
      <div className="desktop-section" style={{ marginTop: 20 }}>
        <h2>全部工具</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {TOOL_GRID.map((tool) => (
          <div
            key={tool.href}
            className="desktop-card"
            style={{ cursor: 'pointer', transition: 'transform .15s ease' }}
            onClick={() => router.push(tool.href)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              background: `${tool.color}18`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              marginBottom: 10,
            }}>
              {tool.icon}
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#241917' }}>{tool.label}</p>
            <p style={{ fontSize: 12, color: '#89756e', marginTop: 3 }}>{tool.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
