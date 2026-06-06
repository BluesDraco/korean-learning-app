'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export function useRequireLoginAction() {
  const { user } = useAuth();
  const router = useRouter();

  const requireLogin = (action: () => void, redirectPath?: string) => {
    if (user) {
      action();
    } else {
      const path = redirectPath || (typeof window !== 'undefined' ? window.location.pathname : '');
      router.push(`/auth/login?redirect=${encodeURIComponent(path)}`);
    }
  };

  return { requireLogin, isLoggedIn: !!user, user };
}
