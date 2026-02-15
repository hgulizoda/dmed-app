'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AppLayout } from '@/widgets/AppLayout';
import { PatientProfilePage } from '@/features/dashboard/PatientProfilePage';
import { useAuth } from '@/features/auth/useAuth';
import { fetchPatientByCard } from '@/shared/services/patientsService';
import { Patient } from '@/types';

export default function PatientProfileRoute() {
  const params = useParams();
  const cardNumber = params?.cardNumber as string;
  const { loading: authLoading } = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cardNumber) return;
    let cancelled = false;
    fetchPatientByCard(cardNumber)
      .then((p) => {
        if (!cancelled) setPatient(p ?? null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [cardNumber]);

  if (authLoading) {
    return (
      <div className="app-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Загрузка...</span>
      </div>
    );
  }
  if (loading || !patient) {
    return (
      <AppLayout>
        <div className="page-content">
          <div className="loading-overlay" style={{ position: 'relative', minHeight: 200 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Загрузка пациента...</span>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PatientProfilePage patient={patient} />
    </AppLayout>
  );
}
