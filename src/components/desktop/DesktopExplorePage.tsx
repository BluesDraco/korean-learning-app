'use client';

import { useRouter } from 'next/navigation';

const FEATURED: { label: string; desc: string; href: string; gradient: string; badge: string | null }[] = [];

const INTEREST_GRID = [
  { icon: '📖', label: 'Tori 绘本馆', desc: '韩语绘本故事', href: '/learn/picture-books', color: '#81b5a1' },
  { icon: '💡', label: '韩国小知识', desc: '文化·美食·旅行', href: '/knowledge', color: '#e8a87c' },
  { icon: '📺', label: '韩剧表达', desc: '经典台词学韩语', href: '/korea/drama', color: '#b49ccf' },
];

const FEED = [
  { label: '今日绘本', desc: '토리와 첫 만남', href: '/learn/picture-books' },
  { label: '今日韩剧表达', desc: '《眼泪女王》经典台词', href: '/korea/drama' },
];

export function DesktopExplorePage() {
  const router = useRouter();

  return (
    <div style={{ animation: 'fade-in .18s ease-out' }}>
      {/* Hero */}
      <div className="desktop-hero explore">
        <span className="desktop-label">◉ 探索</span>
        <h2>用喜欢的内容学韩语</h2>
        <p>绘本、韩剧表达、韩国小知识，都可以变成你的学习材料。</p>
      </div>

      {/* Featured 2-col */}
      <div className="desktop-grid-2" style={{ marginTop: 16 }}>
        {FEATURED.map((item) => (
          <div
            key={item.label}
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

      {/* Two columns below */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}>
        {/* Left: 按兴趣探索 */}
        <div>
          <div className="desktop-section">
            <h2>按兴趣探索</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {INTEREST_GRID.map((item) => (
              <div
                key={item.href}
                className="desktop-card"
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, transition: 'transform .15s ease' }}
                onClick={() => router.push(item.href)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: `${item.color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#241917' }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: '#89756e', marginTop: 2 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 今日推荐 */}
        <div>
          <div className="desktop-section">
            <h2>今日推荐</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FEED.map((item) => (
              <div
                key={item.href + item.label}
                className="desktop-card"
                style={{ cursor: 'pointer', transition: 'transform .15s ease' }}
                onClick={() => router.push(item.href)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <p style={{ fontSize: 13, fontWeight: 700, color: '#241917' }}>{item.label}</p>
                <p style={{ fontSize: 12, color: '#89756e', marginTop: 3 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
