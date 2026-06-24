'use client';

import { Component } from 'react';
import { RotateCcw, Bug } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '40px 24px',
          textAlign: 'center',
          background: 'var(--color-bg, #fffbf7)',
          color: 'var(--color-ink-2, #89756e)',
        }}>
          <Bug size={48} strokeWidth={1.5} style={{ marginBottom: 20, opacity: 0.4 }} />
          <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--color-ink-1, #241917)' }}>
            出了点小问题
          </h1>
          <p style={{ fontSize: 13, marginBottom: 24, maxWidth: 320, lineHeight: 1.6 }}>
            页面加载时遇到了意外错误，请尝试刷新页面。
          </p>
          <button
            onClick={() => {
              this.setState({ error: null });
              window.location.reload();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 24px',
              borderRadius: 999,
              border: 'none',
              background: 'var(--color-pink-base, #ff7fa8)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={14} />
            刷新页面
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
