'use client';

// 客户端会员态：一次拉当前档位 + 权益矩阵，供内容墙判断。
// 游客/未登录 → free + 默认矩阵（各 canAccess* 会据此限量）。

import { useEffect, useState } from 'react';
import { mergeMatrix, type Tier, type BenefitMatrix } from '@/lib/membership-benefits';

export interface MembershipState {
  tier: Tier;
  expiry: number | null;
  matrix: BenefitMatrix;
  loading: boolean;
}

export function useMembership(): MembershipState {
  const [state, setState] = useState<MembershipState>({
    tier: 'free',
    expiry: null,
    matrix: mergeMatrix(null),
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/membership/me', { credentials: 'same-origin', cache: 'no-store' });
        if (!res.ok) {
          if (!cancelled) setState((s) => ({ ...s, loading: false }));
          return;
        }
        const d = await res.json();
        if (cancelled) return;
        setState({
          tier: d.tier ?? 'free',
          expiry: typeof d.expiry === 'number' ? d.expiry : null,
          matrix: d.matrix ? mergeMatrix(d.matrix) : mergeMatrix(null),
          loading: false,
        });
      } catch {
        if (!cancelled) setState((s) => ({ ...s, loading: false }));
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return state;
}
