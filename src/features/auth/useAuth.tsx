'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { getOrCreateMockUser, login as loginApi, logout as logoutApi } from '@/shared/services/authService';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getOrCreateMockUser());
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const u = await loginApi(email, password);
      setUser(u);
      return { success: true };
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  }, []);

  const logout = useCallback(async () => {
    await logoutApi();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
