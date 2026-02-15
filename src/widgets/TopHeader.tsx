'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/useAuth';

export function TopHeader() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="top-header">
      <div className="header-left">
        <div className="search-box">
          <i className="fas fa-search" />
          <input type="text" placeholder="Поиск..." aria-label="Поиск" />
        </div>
        <button type="button" className="btn-scanner">
          <i className="fas fa-id-card" />
          Med ID сканер
        </button>
      </div>

      <div className="header-center">
        <span className="phone-number">+998 71 202-50-00</span>
        <span className="phone-label">Служба поддержки</span>
      </div>

      <div className="header-right">
        <button type="button" className="header-btn" aria-label="Сообщения">
          <i className="fas fa-paper-plane" />
        </button>
        <button type="button" className="header-btn notification-btn" aria-label="Уведомления">
          <i className="fas fa-bell" />
          <span className="notification-badge" />
        </button>
        <button type="button" className="header-btn">
          <i className="fas fa-graduation-cap" />
          Обучение
        </button>
        <div className="language-selector" role="button" tabIndex={0}>
          <img src="https://flagcdn.com/w20/ru.png" alt="RU" />
          <span>Русский</span>
        </div>
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">{user?.name ?? '—'}</span>
            <span className="user-role">{user?.role ?? '—'}</span>
          </div>
          <button
            type="button"
            className="user-avatar"
            onClick={handleLogout}
            aria-label="Выйти"
            title="Выйти"
          >
            <i className="fas fa-user" />
          </button>
        </div>
      </div>
    </header>
  );
}
