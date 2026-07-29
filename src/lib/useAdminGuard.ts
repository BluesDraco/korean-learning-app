'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

/** 非 admin 用户重定向到指定路径 · 用于练习板块子页面 URL 直连兜底 */
export function useAdminGuard(redirectTo: string = '/practice'): { ready: boolean; isAdmin: boolean } {
  const { user, loading } = useAuth();
  const router = useRouter();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (loading) return;
    if (!isAdmin) router.replace(redirectTo);
  }, [loading, isAdmin, redirectTo, router]);

  return { ready: !loading && isAdmin, isAdmin };
}
