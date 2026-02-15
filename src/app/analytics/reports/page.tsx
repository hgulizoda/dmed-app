'use client';

import { AppLayout } from '@/widgets/AppLayout';
import { PlaceholderPage } from '@/shared/components/PlaceholderPage';
import { useAuth } from '@/features/auth/useAuth';

export default function AnalyticsReportsPage() {
  const { loading } = useAuth();

  if (loading) return null;

  return (
    <AppLayout>
      <PlaceholderPage title="Отчеты — раздел в разработке" />
    </AppLayout>
  );
}
