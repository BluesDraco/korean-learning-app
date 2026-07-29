'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import HomePage from './HomePage';

// / 路由分叉：已登录 → /daily ；未登录访客 → SEO 落地页
export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || loading) return;
    if (user) router.replace('/daily');
  }, [mounted, loading, user, router]);

  // SSR / mount 前 / auth 加载中 / 已登录跳转中：不渲染
  if (!mounted || loading || user) return null;

  // 未登录访客：SEO 落地页
  return <HomePage />;
}
