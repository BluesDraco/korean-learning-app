'use client';

import { useState, useEffect, useCallback } from 'react';

export function useAdminData<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const sep = endpoint.includes('?') ? '&' : '?';
      const res = await fetch(`${endpoint}${sep}_t=${Date.now()}`, { cache: 'no-store' });
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        setError(json.error || '请求失败');
      }
    } catch {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
