'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Patient } from '@/types';
import { useToast } from '@/shared/hooks/useToast';

const TABS = [
  'Текущий осмотр',
  'Маршрутизация',
  'Антропометрия',
  'Скрининги',
  'Диагнозы',
  'Осмотры',
  'Анализы',
  'Документы',
];

export function PatientProfilePage({ patient }: { patient: Patient }) {
  const [activeTab, setActiveTab] = useState(0);
  const { show } = useToast();
  const router = useRouter();

  return (
    <div className="page active">
      <div className="breadcrumb">
        <Link href="/">
          <i className="fas fa-chevron-left" /> Приемы
        </Link>
        <span>/</span>
        <span className="current">{patient.fullName}</span>
      </div>

      <div className="patient-header">
        <div className="patient-card-number">
          <Link href={`/patients/${patient.cardNumber}`} className="link-primary">
            Медкарта - {patient.cardNumber}
          </Link>
          <span className="patient-full-name">{patient.fullName}</span>
        </div>
        <button type="button" className="btn-more" aria-label="Ещё">
          <i className="fas fa-ellipsis-v" />
        </button>
      </div>

      <div className="patient-details-grid">
        <div className="patient-photo">
          <div className="photo-placeholder">
            <i className="fas fa-user" />
          </div>
        </div>
        <div className="patient-info-grid">
          <div className="info-item">
            <label>Дата рождения</label>
            <span>{patient.dob}</span>
          </div>
          <div className="info-item">
            <label>Группа здоровья</label>
            <span>...</span>
          </div>
          <div className="info-item">
            <label>Д-учет</label>
            <span><i className="fas fa-info-circle text-warning" /></span>
          </div>
          <div className="info-item">
            <label>Прикрепленная поликлиника</label>
            <span>Центральная многопрофильная поликлиника при РМО Амударьинского района №23 Tibbiy brigada</span>
          </div>
          <div className="info-item">
            <label>Номер телефона</label>
            <span>...</span>
          </div>
          <div className="info-item">
            <label>Инвалидность</label>
            <span>Нет</span>
          </div>
          <div className="info-item">
            <label>Учет беременности</label>
            <span>Нет</span>
          </div>
          <div className="info-item">
            <label>Группа крови и резус фактор</label>
            <span>..., ...</span>
          </div>
          <div className="info-item">
            <label>Аллергия</label>
            <span>...</span>
          </div>
        </div>
      </div>

      <div className="health-alerts">
        <div className="health-alert">
          <i className="fas fa-exclamation-circle text-warning" />
          <span>Нужно провести оценку предтестовой вероятности ишемической болезни сердца</span>
          <button type="button" className="btn-conduct" onClick={() => show('Проведение оценки (мок)', 'info')}>
            Провести
          </button>
        </div>
        <div className="health-alert">
          <i className="fas fa-exclamation-circle text-warning" />
          <span>Нужно провести опрос по раннему выявлению цереброваскулярной патологии</span>
          <button type="button" className="btn-conduct" onClick={() => show('Проведение опроса (мок)', 'info')}>
            Провести
          </button>
        </div>
      </div>

      <div className="patient-tabs">
        <button type="button" className="tab-scroll-btn left" aria-label="Назад">
          <i className="fas fa-chevron-left" />
        </button>
        <div className="tabs-container">
          {TABS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`tab-btn ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {label}
            </button>
          ))}
        </div>
        <button type="button" className="tab-scroll-btn right" aria-label="Вперёд">
          <i className="fas fa-chevron-right" />
        </button>
      </div>

      {activeTab === 0 && (
        <>
          <div className="examination-info-row">
            <div className="info-row">
              <label>Кто направил</label>
              <span>SOBIROVA SAYYORA BEGMUROD QIZI</span>
            </div>
            <div className="info-row">
              <label>Место приема</label>
              <span>Клиника</span>
            </div>
          </div>
          <div className="examination-info-row">
            <div className="info-row">
              <label>Причина вызова</label>
              <span>-</span>
            </div>
          </div>

          <div className="episode-search-section">
            <div className="search-filter">
              <i className="fas fa-search" />
              <input type="text" placeholder="Поиск по названию эпизода обращения" />
            </div>
            <div className="date-range-filter">
              <i className="fas fa-calendar" />
              <span>Начало</span>
              <span>-</span>
              <span>Конец</span>
            </div>
            <button
              type="button"
              className="btn-primary"
              onClick={() => router.push(`/patients/${patient.cardNumber}/case`)}
            >
              + Новый эпизод
            </button>
          </div>

          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Эпизод обращения</th>
                  <th>Дата последнего приёма</th>
                  <th>Сотрудник</th>
                  <th>Учреждение</th>
                  <th>Диагноз по МКБ</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><i className="fas fa-star-half-alt text-muted" /></td>
                  <td>ko&apos;rik <i className="fas fa-copy text-muted copy-icon" /></td>
                  <td>04.02.2026</td>
                  <td>TURAYEVA GULBAXOR KUCHKAROVNA<div className="doctor-role">(Семейный врач)</div></td>
                  <td>Центральная многопрофильная поликлиника при РМО Амударьинского района</td>
                  <td>-</td>
                  <td>
                    <button
                      type="button"
                      className="btn-continue"
                      onClick={() => router.push(`/patients/${patient.cardNumber}/case`)}
                    >
                      Продолжить
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="action-buttons-bottom">
        <button type="button" className="btn-cancel" onClick={() => show('Приём отменён (мок)', 'info')}>
          Отменить приём
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={() => router.push(`/patients/${patient.cardNumber}/case`)}
        >
          Начать приём
        </button>
      </div>
    </div>
  );
}
