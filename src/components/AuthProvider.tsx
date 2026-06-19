'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  nickname?: string;
  email?: string;
  role: string;
  onboardingCompleted?: boolean;
  createdAt?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ error?: string }>;
  register: (username: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ error: '未初始化' }),
  register: async () => ({ error: '未初始化' }),
  logout: async () => {},
});

function getCachedUser(): User | null {
  try {
    const s = localStorage.getItem('auth_user');
    if (!s) return null;
    return JSON.parse(s) as User;
  } catch { return null; }
}

function setCachedUser(user: User | null) {
  try {
    if (user) localStorage.setItem('auth_user', JSON.stringify(user));
    else localStorage.removeItem('auth_user');
  } catch { /* ignore */ }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    return getCachedUser();
  });
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3000);
      const res = await fetch('/api/auth/me', { signal: controller.signal });
      clearTimeout(timer);
      let data: any;
      try {
        data = await Promise.race([
          res.json(),
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error('json timeout')), 3000)),
        ]);
      } catch {
        // json parse failed — keep cached user, don't change state
        return;
      }
      const freshUser = data.user || null;
      setUser(freshUser);
      setCachedUser(freshUser);
    } catch {
      // Network error — keep cached user, don't clear
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
        if (e.name === 'AbortError') return { error: '请求超时，请检查网络后重试' };
        throw e;
      } finally {
        clearTimeout(timeout);
      }
      let data: any;
      try {
        data = await res.json();
      } catch {
        return { error: '服务器响应异常，请稍后重试' };
      }
      if (!res.ok) return { error: data.error || `登录失败 (${res.status})` };
      await fetchUser();
      try {
        const { hasGuestData, migrateGuestData } = await import('@/lib/guest-migration');
        if (hasGuestData()) await migrateGuestData();
      } catch { /* non-critical */ }
      return {};
    } catch {
      return { error: '网络错误，请检查网络连接后重试' };
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
        if (e.name === 'AbortError') return { error: '请求超时，请检查网络后重试' };
        throw e;
      } finally {
        clearTimeout(timeout);
      }
      let data: any;
      try {
        data = await res.json();
      } catch {
        return { error: '服务器响应异常，请稍后重试' };
      }
      if (!res.ok) return { error: data.error || `注册失败 (${res.status})` };
      await fetchUser();
      try {
        const { hasGuestData, migrateGuestData } = await import('@/lib/guest-migration');
        if (hasGuestData()) await migrateGuestData();
      } catch { /* non-critical */ }
      return {};
    } catch {
      return { error: '网络错误，请检查网络连接后重试' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore network errors on logout
    }
    setUser(null);
    setCachedUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
