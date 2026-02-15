'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  {
    key: 'appointments',
    icon: 'fa-calendar-check',
    label: 'Приемы',
    submenu: [
      { href: '/', label: 'Активные' },
      { href: '/appointments/completed', label: 'Завершенные' },
      { href: '/appointments/cancelled', label: 'Отмененные' },
      { href: '/appointments/calendar', label: 'Календарь приемов' },
    ],
  },
  {
    key: 'analytics',
    icon: 'fa-chart-line',
    label: 'Аналитика',
    submenu: [
      { href: '/analytics/reports', label: 'Отчеты' },
      { href: '/analytics/statistics', label: 'Статистика' },
    ],
  },
  { key: 'documents', icon: 'fa-file-alt', label: 'Документы', href: '/documents' },
  {
    key: 'patients',
    icon: 'fa-users',
    label: 'Пациенты',
    submenu: [
      { href: '/patients', label: 'Мои пациенты' },
      { href: '/patients/prescriptions', label: 'Рецепты' },
      { href: '/patients/treatment', label: 'Курс лечения' },
    ],
  },
  {
    key: 'patronage',
    icon: 'fa-home',
    label: 'Патронаж',
    submenu: [{ href: '/patronage/visits', label: 'Визиты' }],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>('appointments');

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const isSubmenuActive = (item: (typeof NAV)[0]) =>
    item.submenu?.some((s) => isActive(s.href));

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <Link href="/" className="logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">DMED</span>
        </Link>
        <button
          type="button"
          className="sidebar-toggle"
          id="sidebarToggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          <i className={`fas fa-chevron-${collapsed ? 'right' : 'left'}`} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {NAV.map((item) => (
          <div
            key={item.key}
            className={`nav-item has-submenu ${openKey === item.key || isSubmenuActive(item) ? 'open' : ''}`}
          >
            {item.submenu ? (
              <>
                <div
                  className="nav-link"
                  onClick={() => setOpenKey(openKey === item.key ? null : item.key)}
                  onKeyDown={(e) => e.key === 'Enter' && setOpenKey(openKey === item.key ? null : item.key)}
                  role="button"
                  tabIndex={0}
                >
                  <i className={`fas ${item.icon}`} />
                  <span>{item.label}</span>
                  <i className="fas fa-chevron-down submenu-arrow" />
                </div>
                <div className="submenu">
                  {item.submenu.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className={`submenu-link ${isActive(s.href) ? 'active' : ''}`}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                href={item.href ?? '#'}
                className={`nav-link ${pathname === item.href ? 'active' : ''}`}
              >
                <i className={`fas ${item.icon}`} />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="active-patient-card">
        <div className="patient-status">У вас есть незавершенный осмотр</div>
        <div className="patient-info-card">
          <span className="label">Пациент</span>
          <span className="patient-id" id="currentPatientId">YK0751</span>
        </div>
        <Timer />
        <div className="queue-info">В очереди пациентов: 0</div>
      </div>

      <div className="sidebar-footer">
        <span className="company-name">UZINFOCOM</span>
      </div>
    </aside>
  );
}

function Timer() {
  const [seconds, setSeconds] = useState(34600);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const fmt = (n: number) => n.toString().padStart(2, '0');

  useEffect(() => {
    const id = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="timer">
      <i className="fas fa-clock" />
      <span id="timer">{fmt(h)}ч {fmt(m)} мин {fmt(s)} сек</span>
    </div>
  );
}
