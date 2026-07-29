'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/useToast';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export function useRequireLoginAction() {
  const { user } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const { lang } = useLang();

  const requireLogin = useCallback((action: () => void, redirectPath?: string) => {
    if (user) {
      action();
    } else {
      const path = redirectPath || (typeof window !== 'undefined' ? window.location.pathname : '');
      showToast(t('auth.login_required_for_action', lang), 'info');
      setTimeout(() => router.push(`/auth/login?redirect=${encodeURIComponent(path)}`), 600);
    }
  }, [user, router, showToast, lang]);

  return { requireLogin, isLoggedIn: !!user, user };
}
