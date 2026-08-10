import { useCallback, useRef, useState } from 'react';

export interface GrammarToken {
  text: string;
  role: string;
}

type ErrorKind = 'auth' | 'network' | 'parse' | null;

interface State {
  tokens: GrammarToken[] | null;
  loading: boolean;
  error: ErrorKind;
}

const CACHE_PREFIX = 'radio-gram:';

function cacheKey(ko: string): string {
  // 句子本身即 key（前缀 + 原文），韩语句子长度可控，无需 hash
  return CACHE_PREFIX + ko;
}

function readCache(ko: string): GrammarToken[] | null {
  try {
    const raw = localStorage.getItem(cacheKey(ko));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.tokens) ? parsed.tokens : null;
  } catch {
    return null;
  }
}

function writeCache(ko: string, tokens: GrammarToken[]): void {
  try {
    localStorage.setItem(cacheKey(ko), JSON.stringify({ tokens }));
  } catch {
    // localStorage 满/隐私模式：静默跳过，不影响功能
  }
}

// 逐句语法解析：先查 localStorage，未命中调 /api/ai/grammar-breakdown（DeepSeek）。
export function useGrammarBreakdown() {
  const [state, setState] = useState<State>({ tokens: null, loading: false, error: null });
  const inflight = useRef(false);

  const fetchBreakdown = useCallback(async (ko: string) => {
    if (!ko || inflight.current) return;

    const cached = readCache(ko);
    if (cached) {
      setState({ tokens: cached, loading: false, error: null });
      return;
    }

    inflight.current = true;
    setState({ tokens: null, loading: true, error: null });
    try {
      const res = await fetch('/api/ai/grammar-breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: ko }),
      });
      if (res.status === 401) {
        setState({ tokens: null, loading: false, error: 'auth' });
        return;
      }
      if (!res.ok) {
        setState({ tokens: null, loading: false, error: 'network' });
        return;
      }
      const data = await res.json();
      const tokens: unknown = data?.tokens;
      if (!Array.isArray(tokens)) {
        setState({ tokens: null, loading: false, error: 'parse' });
        return;
      }
      const clean = tokens.filter(
        (t): t is GrammarToken => typeof t?.text === 'string' && typeof t?.role === 'string',
      );
      writeCache(ko, clean);
      setState({ tokens: clean, loading: false, error: null });
    } catch {
      setState({ tokens: null, loading: false, error: 'network' });
    } finally {
      inflight.current = false;
    }
  }, []);

  return { ...state, fetchBreakdown };
}
