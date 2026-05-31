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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      const res = await fetch('/api/auth/me', { signal: controller.signal });
      clearTimeout(timer);
      const data = await res.json();
      setUser(data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      let data: any;
      try {
        data = await res.json();
      } catch {
        return { error: '服务器响应异常，请稍后重试' };
      }
      if (!res.ok) return { error: data.error || `登录失败 (${res.status})` };
      // Fetch full user profile after login
      await fetchUser();
      return {};
    } catch {
      return { error: '网络错误，请检查网络连接后重试' };
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      let data: any;
      try {
        data = await res.json();
      } catch {
        return { error: '服务器响应异常，请稍后重试' };
      }
      if (!res.ok) return { error: data.error || `注册失败 (${res.status})` };
      // Fetch full user profile after register
      await fetchUser();
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
