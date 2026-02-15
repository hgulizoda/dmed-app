'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/widgets/AppLayout';
import { createPatient } from '@/shared/services/patientsService';
import { useToast } from '@/shared/hooks/useToast';
import type { Patient } from '@/types';

const HEALTH_GROUPS: { value: Patient['healthGroup']; label: string }[] = [
  { value: 'I', label: 'I' },
  { value: 'II', label: 'II' },
  { value: 'III', label: 'III' },
];

export default function AddPatientPage() {
  const router = useRouter();
  const { show } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    cardNumber: '',
    fullName: '',
    dob: '',
    district: '',
    age: '',
    healthGroup: 'I' as Patient['healthGroup'],
    dUchet: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cardNumber.trim() || !form.fullName.trim()) {
      show('Заполните номер медкарты и ФИО пациента', 'error');
      return;
    }
    if (!form.dob.trim() || !form.district.trim() || !form.age.trim()) {
      show('Заполните дату рождения, участок и возраст', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const patient = await createPatient({
        cardNumber: form.cardNumber.trim(),
        fullName: form.fullName.trim(),
        dob: form.dob.trim(),
        district: form.district.trim(),
        age: form.age.trim(),
        healthGroup: form.healthGroup,
        healthGroupClass: form.healthGroup === 'I' ? 'badge-success' : form.healthGroup === 'II' ? 'badge-warning' : 'badge-danger',
        riskCvd: '...',
        riskSd: '...',
        oncogemSurvey: 'Не пройден',
        dUchet: form.dUchet.trim() || undefined,
      });
      show('Пациент успешно добавлен', 'success');
      router.push(`/patients/${patient.cardNumber}`);
    } catch {
      show('Ошибка при добавлении пациента', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="page active">
        <div className="breadcrumb">
          <Link href="/patients">
            <i className="fas fa-chevron-left" /> Пациенты
          </Link>
          <span>/</span>
          <span className="current">Добавить пациента</span>
        </div>

        <div className="form-card" style={{ maxWidth: 560, marginTop: 24 }}>
          <h2 style={{ marginBottom: 24, fontSize: 20, fontWeight: 600 }}>Новый пациент</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="required-label">Номер медкарты</label>
              <input
                type="text"
                name="cardNumber"
                className="form-input"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="Например, AB1234"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="required-label">ФИО пациента</label>
              <input
                type="text"
                name="fullName"
                className="form-input"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Фамилия Имя Отчество"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="required-label">Дата рождения</label>
              <input
                type="text"
                name="dob"
                className="form-input"
                value={form.dob}
                onChange={handleChange}
                placeholder="ДД.ММ.ГГГГ"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="required-label">Участок</label>
              <input
                type="text"
                name="district"
                className="form-input"
                value={form.district}
                onChange={handleChange}
                placeholder="Например, №17 Tibbiy brigada"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="required-label">Возраст</label>
              <input
                type="text"
                name="age"
                className="form-input"
                value={form.age}
                onChange={handleChange}
                placeholder="Например, 39 лет"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="required-label">Группа здоровья</label>
              <select
                name="healthGroup"
                className="form-select"
                value={form.healthGroup}
                onChange={handleChange}
              >
                {HEALTH_GROUPS.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label>Д-учет (необязательно)</label>
              <input
                type="text"
                name="dUchet"
                className="form-input"
                value={form.dUchet}
                onChange={handleChange}
                placeholder="Коды МКБ через запятую"
              />
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Сохранение...' : 'Сохранить'}
              </button>
              <Link href="/patients" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-primary)', textDecoration: 'none' }}>
                Отмена
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
