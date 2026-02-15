'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/widgets/AppLayout';
import { createAppointment } from '@/shared/services/appointmentsService';
import { fetchPatients } from '@/shared/services/patientsService';
import { useToast } from '@/shared/hooks/useToast';
import type { Patient } from '@/types';

const PLACES = ['Клиника', 'Вызов на дом', 'Стационар'];

export default function NewAppointmentPage() {
  const router = useRouter();
  const { show } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState('');
  const [patientOpen, setPatientOpen] = useState(false);
  const patientRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    cardNumber: '',
    patientName: '',
    place: 'Клиника',
  });

  useEffect(() => {
    let cancelled = false;
    fetchPatients(search)
      .then((data) => { if (!cancelled) setPatients(data); })
      .catch(() => { if (!cancelled) setPatients([]); });
    return () => { cancelled = true; };
  }, [search]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (patientRef.current && !patientRef.current.contains(e.target as Node)) setPatientOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const filteredPatients = patients.filter(
    (p) =>
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.cardNumber.toLowerCase().includes(search.toLowerCase())
  );

  const selectPatient = (p: Patient) => {
    setForm({ ...form, cardNumber: p.cardNumber, patientName: p.fullName });
    setSearch(p.fullName);
    setPatientOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cardNumber.trim() || !form.patientName.trim()) {
      show('Выберите пациента', 'error');
      return;
    }
    setSubmitting(true);
    try {
      await createAppointment({
        cardNumber: form.cardNumber,
        patientName: form.patientName,
        place: form.place,
      });
      show('Приём успешно записан', 'success');
      router.push('/');
    } catch {
      show('Ошибка при записи приёма', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="page active">
        <div className="breadcrumb">
          <Link href="/">
            <i className="fas fa-chevron-left" /> Приемы
          </Link>
          <span>/</span>
          <span className="current">Записать приём</span>
        </div>

        <div className="form-card" style={{ maxWidth: 560, marginTop: 24 }}>
          <h2 style={{ marginBottom: 24, fontSize: 20, fontWeight: 600 }}>Записать приём</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: 16 }} ref={patientRef}>
              <label className="required-label">Пациент</label>
              <div className="searchable-select">
                <div className="select-input" onClick={() => setPatientOpen(!patientOpen)}>
                  <i className="fas fa-search" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPatientOpen(true); }}
                    placeholder="ФИО или номер медкарты"
                  />
                </div>
                {patientOpen && (
                  <div className="dropdown-list show">
                    {filteredPatients.length === 0 ? (
                      <div className="dropdown-item" style={{ color: 'var(--text-secondary)' }}>
                        Нет пациентов. <Link href="/patients/add" onClick={(e) => e.stopPropagation()}>Добавить пациента</Link>
                      </div>
                    ) : (
                      filteredPatients.slice(0, 10).map((p) => (
                        <div
                          key={p.id}
                          className="dropdown-item"
                          onClick={() => selectPatient(p)}
                        >
                          <span className="link-primary">{p.cardNumber}</span> — {p.fullName}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label className="required-label">Место приема</label>
              <select
                className="form-select"
                value={form.place}
                onChange={(e) => setForm((prev) => ({ ...prev, place: e.target.value }))}
              >
                {PLACES.map((pl) => (
                  <option key={pl} value={pl}>{pl}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Сохранение...' : 'Записать'}
              </button>
              <Link href="/" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-primary)', textDecoration: 'none' }}>
                Отмена
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
