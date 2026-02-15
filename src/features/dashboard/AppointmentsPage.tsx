'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchAppointments } from '@/shared/services/appointmentsService';
import { Appointment } from '@/types';
import { useToast } from '@/shared/hooks/useToast';

export function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'paid' | 'unpaid'>('all');
  const { show } = useToast();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    fetchAppointments()
      .then((data) => {
        if (!cancelled) {
          setAppointments(data);
        }
      })
      .catch(() => {
        if (!cancelled) show('Ошибка загрузки приемов', 'error');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [show]);

  return (
    <div className="page active">
      <div className="filters-section">
        <div className="search-filter">
          <i className="fas fa-search" />
          <input
            type="text"
            placeholder="Введите ФИО пациента или номер медкарты"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button type="button" className="btn-filter-toggle">
          <i className="fas fa-sliders-h" />
          <span className="filter-count">2</span>
        </button>
        <button type="button" className="btn-reset">
          Сбросить фильтры
        </button>
        <Link href="/appointments/new" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit' }}>
          Записать платно
        </Link>
        <Link href="/appointments/new" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'white' }}>
          <i className="fas fa-plus" />
          Записать бесплатно
        </Link>
      </div>

      <div className="advanced-filters">
        <div className="filter-row">
          <div className="filter-item date-range">
            <i className="fas fa-calendar" />
            <input type="text" defaultValue="04.02.26" />
            <span>-</span>
            <input type="text" defaultValue="04.02.26" />
          </div>
          <div className="filter-item">
            <select>
              <option>+1</option>
            </select>
          </div>
          <div className="filter-item">
            <select>
              <option>Специала...</option>
            </select>
          </div>
          <div className="filter-item">
            <select>
              <option>+1</option>
            </select>
          </div>
          <div className="filter-item">
            <select>
              <option>Пол</option>
            </select>
          </div>
          <div className="filter-item">
            <select>
              <option>Возраст</option>
            </select>
          </div>
        </div>
        <div className="filter-row">
          <div className="radio-group">
            <label className={`radio-item ${paymentFilter === 'all' ? 'active' : ''}`}>
              <input
                type="radio"
                name="payment"
                checked={paymentFilter === 'all'}
                onChange={() => setPaymentFilter('all')}
              />
              <span className="radio-dot" />
              <span>Все</span>
            </label>
            <label className={`radio-item ${paymentFilter === 'paid' ? 'active' : ''}`}>
              <input
                type="radio"
                name="payment"
                checked={paymentFilter === 'paid'}
                onChange={() => setPaymentFilter('paid')}
              />
              <span className="radio-dot" />
              <span>Оплаченные</span>
            </label>
            <label className={`radio-item ${paymentFilter === 'unpaid' ? 'active' : ''}`}>
              <input
                type="radio"
                name="payment"
                checked={paymentFilter === 'unpaid'}
                onChange={() => setPaymentFilter('unpaid')}
              />
              <span className="radio-dot" />
              <span>Неоплаченные</span>
            </label>
          </div>
          <div className="filter-item">
            <select>
              <option>Причина</option>
            </select>
          </div>
          <div className="filter-item">
            <select>
              <option>Диагно...</option>
            </select>
          </div>
          <div className="filter-item">
            <select>
              <option>Место п...</option>
            </select>
          </div>
          <div className="filter-item">
            <select>
              <option>Статус</option>
            </select>
          </div>
        </div>
      </div>

      <div className="data-table" style={{ position: 'relative' }}>
        {loading && (
          <div className="loading-overlay">
            <span style={{ color: 'var(--text-secondary)' }}>Загрузка...</span>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Очередь</th>
              <th>Медкарта</th>
              <th>Счет</th>
              <th>Пациент</th>
              <th>Место приема</th>
              <th>Услуги</th>
              <th>Сотрудник</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.cardNumber} onClick={() => router.push(`/patients/${apt.cardNumber}`)}>
                <td>{apt.queue}</td>
                <td>
                  <Link href={`/patients/${apt.cardNumber}`} className="link-primary" onClick={(e) => e.stopPropagation()}>
                    {apt.cardNumber}
                  </Link>{' '}
                  <span className="status-dot yellow" />
                </td>
                <td>
                  <span className="link-secondary"><i className="fas fa-link" /> К счету</span>
                </td>
                <td>
                  {apt.patientName}{' '}
                  <span className="patient-icons">
                    {apt.hasCheck && <i className="fas fa-check-circle text-success" />}
                    {apt.hasHome && <i className="fas fa-home" />}
                  </span>
                </td>
                <td>{apt.place}</td>
                <td>{apt.services}</td>
                <td>{apt.employee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="patient-type-legend">
        <div className="legend-item">
          <i className="fas fa-bed" />
          <span>Лежачий пациент</span>
        </div>
        <div className="legend-item">
          <i className="fas fa-home" />
          <span>Амбулаторный</span>
        </div>
        <div className="legend-item">
          <i className="fas fa-house-user" />
          <span>Вызов на дом</span>
        </div>
        <div className="legend-item">
          <i className="fas fa-hospital" />
          <span>Стационарный</span>
        </div>
        <div className="pagination-arrows">
          <button type="button" className="pagination-btn disabled">
            <i className="fas fa-chevron-left" />
          </button>
          <button type="button" className="pagination-btn disabled">
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
}
