import { User } from '@/types';
import { simulateApi } from './api';

const STORAGE_KEY = 'dmed_user';

const mockUser: User = {
  id: '1',
  name: 'TURAYEVA GULBAXOR KUCHKAROVNA',
  role: 'Центральная многопроф...',
};

export async function login(_email: string, _password: string): Promise<User> {
  await simulateApi(undefined, 600);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
  }
  return mockUser;
}

export async function logout(): Promise<void> {
  await simulateApi(undefined, 300);
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

/** Ensures a user is always available (auto-login with mock user when none stored). */
export function getOrCreateMockUser(): User {
  const existing = getStoredUser();
  if (existing) return existing;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
  }
  return mockUser;
}

export function isAuthenticated(): boolean {
  return getStoredUser() !== null;
}
