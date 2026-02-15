'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';
import { useToast } from '@/shared/hooks/useToast';
import { validateLogin } from '@/shared/utils/validation';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { show } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateLogin(email, password);
    if (!result.valid) {
      show(result.message ?? 'Ошибка валидации', 'error');
      return;
    }
    setLoading(true);
    const { success, error } = await login(email, password);
    setLoading(false);
    if (success) {
      show('Вход выполнен', 'success');
      router.push('/');
      router.refresh();
    } else {
      show(error ?? 'Ошибка входа', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360, margin: '40px auto', padding: 24 }}>
      <div className="form-group" style={{ marginBottom: 16 }}>
        <label className="required-label">Email</label>
        <input
          type="email"
          className="form-select"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          disabled={loading}
        />
      </div>
      <div className="form-group" style={{ marginBottom: 16 }}>
        <label className="required-label">Пароль</label>
        <input
          type="password"
          className="form-select"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
          disabled={loading}
        />
      </div>
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
}
