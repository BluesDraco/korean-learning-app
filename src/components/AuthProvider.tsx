'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface User {
  [k: string]: unknown;
  id: string;
  username: string;
  nickname?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  role: string;
  onboardingCompleted?: boolean;
  createdAt?: number;
}

interface AuthContextType {
  [k: string]: unknown;
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ error?: string }>;
  register: (username: string, password: string) => Promise<{ error?: string }>;
  sendEmailCode: (email: string) => Promise<{ error?: string }>;
  registerWithEmail: (email: string, password: string, code: string) => Promise<{ error?: string }>;
  loginWithEmail: (email: string, password: string) => Promise<{ error?: string }>;
  sendPhoneCode: (phone: string) => Promise<{ error?: string }>;
  loginWithPhone: (phone: string, code: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ error: t('auth.not_initialized', 'zh') }),
  register: async () => ({ error: t('auth.not_initialized', 'zh') }),
  sendEmailCode: async () => ({ error: t('auth.not_initialized', 'zh') }),
  registerWithEmail: async () => ({ error: t('auth.not_initialized', 'zh') }),
  loginWithEmail: async () => ({ error: t('auth.not_initialized', 'zh') }),
  sendPhoneCode: async () => ({ error: t('auth.not_initialized', 'zh') }),
  loginWithPhone: async () => ({ error: t('auth.not_initialized', 'zh') }),
  logout: async () => {},
  refreshUser: async () => {},
});

// 6-26 串号事故教训：不再用 localStorage 缓存用户身份。
// 任何"上次登录的用户"信息都必须从 /api/auth/me 实时拿。
// 这里只在挂载时清理可能残留的历史缓存，防止旧版本数据继续生效。
function clearLegacyUserCache() {
  try { localStorage.removeItem('auth_user'); } catch { /* ignore */ }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    // 一次核身份尝试。返回 ok=true 表示服务器给了明确答复（含 401=确实未登录）；
    // ok=false 表示网络/超时/5xx 等「连不上」，不可据此判定登出。
    const attempt = async (): Promise<{ ok: boolean; user: User | null }> => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      try {
        const res = await fetch('/api/auth/me', { signal: controller.signal, cache: 'no-store' });
        if (res.status === 401) return { ok: true, user: null }; // 明确未登录，可信
        if (!res.ok) return { ok: false, user: null };           // 5xx 等，视为暂时失败
        const data = await res.json();
        return { ok: true, user: (data && data.user) || null };
      } catch {
        return { ok: false, user: null };                        // 网络/超时，暂时失败
      } finally {
        clearTimeout(timer);
      }
    };

    try {
      let r = await attempt();
      // 首次因网络/超时失败：慢网下冷加载常见，重试一次再判定，避免把在线用户误判成已登出
      if (!r.ok) {
        await new Promise((res) => setTimeout(res, 600));
        r = await attempt();
      }
      // 只有拿到明确答复才更新用户态；两次都连不上时保持现状，绝不主动清空登录态。
      // （6-26 事故的防串号语义仍在：user 初始为 null、从不读 localStorage 缓存身份，
      //   且真实 401 会照常清空。此处只是不再把「网络抖动」当成「已登出」。）
      if (r.ok) {
        setUser(r.user);
        if (r.user?.id) {
          const uid = r.user.id;
          import('@/lib/migrations/localStorageToCloud').then(m => {
            m.migrateGrammarLessonStates(uid);
            m.migratePhoneticSteps(uid);
            m.migrateGrammarFavorites(uid);
            m.migrateTypingPackProgress(uid);
            m.migrateTypingMastery(uid);
            m.migrateWritingHistory(uid);
            m.migrateAiAnalyzeHistory(uid);
          }).catch(() => { /* non-critical */ });
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    clearLegacyUserCache();
    fetchUser();
  }, [fetchUser]);

  // 邀请归因回填：登录后若 localStorage 存有邀请码，补调 consume 建立 pending 关系。
  // 覆盖「先注册后玩」与「先玩后注册」两种时序。成功后清除，避免重复。
  useEffect(() => {
    if (!user?.id) return;
    let code = '';
    try { code = localStorage.getItem('invite_code') || ''; } catch { /* ignore */ }
    if (!code) return;
    (async () => {
      try {
        const { getDeviceFingerprint } = await import('@/lib/deviceFingerprint');
        const deviceHash = await getDeviceFingerprint();
        const res = await fetch('/api/invite/consume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, deviceHash }),
        });
        if (res.ok) { try { localStorage.removeItem('invite_code'); } catch { /* ignore */ } }
      } catch { /* non-critical */ }
    })();
  }, [user?.id]);

  const login = async (username: string, password: string) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      let res: Response;
      try {
        res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
          signal: controller.signal,
        });
      } catch (e: any) {
        if (e.name === 'AbortError') return { error: t('authp.timeout', lang) };
        throw e;
      } finally {
        clearTimeout(timeout);
      }
      let data: any;
      try {
        data = await res.json();
      } catch {
        return { error: t('authp.badResponse', lang) };
      }
      if (!res.ok) return { error: data.error || t('authp.loginFailed', lang, { status: res.status }) };
      await fetchUser();
      try {
        const { hasGuestData, migrateGuestData } = await import('@/lib/guest-migration');
        if (hasGuestData()) await migrateGuestData();
      } catch { /* non-critical */ }
      return {};
    } catch {
      return { error: t('authp.networkError', lang) };
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      let res: Response;
      try {
        res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
          signal: controller.signal,
        });
      } catch (e: any) {
        if (e.name === 'AbortError') return { error: t('authp.timeout', lang) };
        throw e;
      } finally {
        clearTimeout(timeout);
      }
      let data: any;
      try {
        data = await res.json();
      } catch {
        return { error: t('authp.badResponse', lang) };
      }
      if (!res.ok) return { error: data.error || t('authp.registerFailed', lang, { status: res.status }) };
      await fetchUser();
      try {
        const { hasGuestData, migrateGuestData } = await import('@/lib/guest-migration');
        if (hasGuestData()) await migrateGuestData();
      } catch { /* non-critical */ }
      return {};
    } catch {
      return { error: t('authp.networkError', lang) };
    }
  };

  const sendEmailCode = async (email: string) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      let res: Response;
      try {
        res = await fetch('/api/auth/email/send-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, lang }),
          signal: controller.signal,
        });
      } catch (e: any) {
        if (e.name === 'AbortError') return { error: t('authp.timeout', lang) };
        throw e;
      } finally {
        clearTimeout(timeout);
      }
      let data: any;
      try { data = await res.json(); } catch { return { error: t('authp.badResponse', lang) }; }
      if (!res.ok) return { error: data.error || t('authp.networkError', lang) };
      return {};
    } catch {
      return { error: t('authp.networkError', lang) };
    }
  };

  const registerWithEmail = async (email: string, password: string, code: string) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      let res: Response;
      try {
        res = await fetch('/api/auth/email/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, code }),
          signal: controller.signal,
        });
      } catch (e: any) {
        if (e.name === 'AbortError') return { error: t('authp.timeout', lang) };
        throw e;
      } finally {
        clearTimeout(timeout);
      }
      let data: any;
      try { data = await res.json(); } catch { return { error: t('authp.badResponse', lang) }; }
      if (!res.ok) return { error: data.error || t('authp.registerFailed', lang, { status: res.status }) };
      await fetchUser();
      try {
        const { hasGuestData, migrateGuestData } = await import('@/lib/guest-migration');
        if (hasGuestData()) await migrateGuestData();
      } catch { /* non-critical */ }
      return {};
    } catch {
      return { error: t('authp.networkError', lang) };
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      let res: Response;
      try {
        res = await fetch('/api/auth/email/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          signal: controller.signal,
        });
      } catch (e: any) {
        if (e.name === 'AbortError') return { error: t('authp.timeout', lang) };
        throw e;
      } finally {
        clearTimeout(timeout);
      }
      let data: any;
      try { data = await res.json(); } catch { return { error: t('authp.badResponse', lang) }; }
      if (!res.ok) return { error: data.error || t('authp.loginFailed', lang, { status: res.status }) };
      await fetchUser();
      try {
        const { hasGuestData, migrateGuestData } = await import('@/lib/guest-migration');
        if (hasGuestData()) await migrateGuestData();
      } catch { /* non-critical */ }
      return {};
    } catch {
      return { error: t('authp.networkError', lang) };
    }
  };

  const sendPhoneCode = async (phone: string) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      let res: Response;
      try {
        res = await fetch('/api/auth/phone/send-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone }),
          signal: controller.signal,
        });
      } catch (e: any) {
        if (e.name === 'AbortError') return { error: t('authp.timeout', lang) };
        throw e;
      } finally {
        clearTimeout(timeout);
      }
      let data: any;
      try { data = await res.json(); } catch { return { error: t('authp.badResponse', lang) }; }
      if (!res.ok) return { error: data.error || t('authp.networkError', lang) };
      return {};
    } catch {
      return { error: t('authp.networkError', lang) };
    }
  };

  const loginWithPhone = async (phone: string, code: string) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      let res: Response;
      try {
        res = await fetch('/api/auth/phone/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, code }),
          signal: controller.signal,
        });
      } catch (e: any) {
        if (e.name === 'AbortError') return { error: t('authp.timeout', lang) };
        throw e;
      } finally {
        clearTimeout(timeout);
      }
      let data: any;
      try { data = await res.json(); } catch { return { error: t('authp.badResponse', lang) }; }
      if (!res.ok) return { error: data.error || t('authp.loginFailed', lang, { status: res.status }) };
      await fetchUser();
      try {
        const { hasGuestData, migrateGuestData } = await import('@/lib/guest-migration');
        if (hasGuestData()) await migrateGuestData();
      } catch { /* non-critical */ }
      return {};
    } catch {
      return { error: t('authp.networkError', lang) };
    }
  };

  const logout = async () => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 5000);
      await fetch('/api/auth/logout', { method: 'POST', signal: controller.signal });
      clearTimeout(timer);
    } catch {
      // ignore network errors
    }
    // 清除本地日记进度，避免切账号后串数据
    try {
      const { db } = await import('@/lib/db');
      await Promise.all([db.toriProgress.clear(), db.toriSubQuestProgress.clear()]);
    } catch { /* ignore */ }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, sendEmailCode, registerWithEmail, loginWithEmail, sendPhoneCode, loginWithPhone, logout, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
