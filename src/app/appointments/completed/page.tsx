'use client';

import { AppLayout } from '@/widgets/AppLayout';
import { PlaceholderPage } from '@/shared/components/PlaceholderPage';
import { useAuth } from '@/features/auth/useAuth';

export default function AppointmentsCompletedPage() {
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
      <PlaceholderPage title="Завершенные приемы — раздел в разработке" />
    </AppLayout>
  );
}
