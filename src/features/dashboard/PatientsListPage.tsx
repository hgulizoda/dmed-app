'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchPatients } from '@/shared/services/patientsService';
import { Patient } from '@/types';
import { useToast } from '@/shared/hooks/useToast';

export function PatientsListPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { show } = useToast();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    fetchPatients(search)
      .then((data) => {
        if (!cancelled) setPatients(data);
      })
      .catch(() => {
        if (!cancelled) show('Ошибка загрузки пациентов', 'error');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [search, show]);

  const openProfile = (p: Patient) => {
    router.push(`/patients/${p.cardNumber}`);
  };

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
        </button>
        <button type="button" className="btn-reset">
          Сбросить фильтры
        </button>
        <button type="button" className="btn-excel">
          <i className="fas fa-file-excel" />
          Скачать Excel
        </button>
        <Link href="/patients/add" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'white' }}>
          <i className="fas fa-plus" />
          Добавить пациента
        </Link>
      </div>

      <div className="advanced-filters">
        <div className="filter-row">
          <div className="filter-item">
            <select><option>Возраст</option></select>
          </div>
          <div className="filter-item">
            <select><option>Участок</option></select>
          </div>
          <div className="filter-item">
            <select><option>Д-учет</option></select>
          </div>
          <div className="filter-item">
            <select><option>Группа здор...</option></select>
          </div>
          <div className="filter-item">
            <select><option>Инвалиднос...</option></select>
          </div>
          <div className="filter-item">
            <select><option>Пол</option></select>
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-item">
            <select><option>Вакцинация</option></select>
          </div>
          <div className="filter-item">
            <select><option>Беременнос...</option></select>
          </div>
          <div className="filter-item">
            <select><option>Риск ССЗ</option></select>
          </div>
          <div className="filter-item">
            <select><option>Риск СД</option></select>
          </div>
          <div className="filter-item">
            <select><option>Уровень ...</option></select>
          </div>
          <div className="filter-item">
            <select><option>Онкогем оп...</option></select>
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-item">
            <select><option>Прикреплен...</option></select>
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
              <th>Медкарта</th>
              <th>ФИО пациента</th>
              <th>Участок</th>
              <th>Возраст</th>
              <th>Гр. зд.</th>
              <th>Риск ССЗ</th>
              <th>Риск СД</th>
              <th>Онкогем опрос</th>
              <th>Д-учет</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} onClick={() => openProfile(p)}>
                <td>
                  <Link href={`/patients/${p.cardNumber}`} className="link-primary" onClick={(e) => e.stopPropagation()}>
                    {p.cardNumber}
                  </Link>
                </td>
                <td>{p.fullName}</td>
                <td>{p.district}</td>
                <td>{p.age}</td>
                <td>
                  <span className={`badge ${p.healthGroupClass ?? 'badge-success'}`}>{p.healthGroup}</span>
                </td>
                <td>{p.riskCvd ?? '...'}</td>
                <td>{p.riskSd ?? '...'}</td>
                <td>{p.oncogemSurvey ?? 'Не пройден'}</td>
                <td>{p.dUchet ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
