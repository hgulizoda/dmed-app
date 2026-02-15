'use client';

import { AppLayout } from '@/widgets/AppLayout';
import { AppointmentsPage } from '@/features/dashboard/AppointmentsPage';
import { useAuth } from '@/features/auth/useAuth';

export default function Home() {
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
      <AppointmentsPage />
    </AppLayout>
  );
}
