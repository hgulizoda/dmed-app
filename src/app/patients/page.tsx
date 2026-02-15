'use client';

import { AppLayout } from '@/widgets/AppLayout';
import { PatientsListPage } from '@/features/dashboard/PatientsListPage';
import { useAuth } from '@/features/auth/useAuth';

export default function PatientsPage() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="app-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Загрузка...</span>
      </div>
    );
  }

  return (
    <AppLayout>
      <PatientsListPage />
    </AppLayout>
  );
}
