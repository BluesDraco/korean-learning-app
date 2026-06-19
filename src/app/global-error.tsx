'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, background: '#fffbf7', fontFamily: 'sans-serif' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: '0 24px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 48 }}>🐰</div>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: '#241917', margin: '0 0 6px' }}>页面出了点问题</h1>
            <p style={{ fontSize: 14, color: '#89756e', margin: 0 }}>请尝试刷新，或返回主页</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={reset}
              style={{
                padding: '10px 20px', borderRadius: 12, background: '#ff7fa8',
                color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer',
              }}
            >
              重试
            </button>
            <a
              href="/daily"
              style={{
                padding: '10px 20px', borderRadius: 12, border: '1px solid #eee0d8',
                background: '#fff', color: '#241917', fontSize: 14, fontWeight: 600,
                textDecoration: 'none', display: 'inline-block',
              }}
            >
              回主页
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
