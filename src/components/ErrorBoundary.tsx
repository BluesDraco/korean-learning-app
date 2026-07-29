'use client';

import { Component } from 'react';
import { RotateCcw, Bug } from 'lucide-react';
import { getLang, t } from '@/lib/i18n';

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
      const lang = getLang();
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '40px 24px',
          textAlign: 'center',
          background: 'var(--color-surface-1)',
          color: 'var(--color-ink-2, #89756e)',
        }}>
          <Bug size={48} strokeWidth={1.5} style={{ marginBottom: 20, opacity: 0.4 }} />
          <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--color-ink-1, #241917)' }}>
            {t('errboundary.title', lang)}
          </h1>
          <p style={{ fontSize: 13, marginBottom: 24, maxWidth: 320, lineHeight: 1.6 }}>
            {t('errboundary.desc', lang)}
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
            {t('errboundary.refresh', lang)}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
