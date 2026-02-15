'use client';

import { AppLayout } from '@/widgets/AppLayout';
import { PlaceholderPage } from '@/shared/components/PlaceholderPage';
import { useAuth } from '@/features/auth/useAuth';

export default function PatronageVisitsPage() {
  const { loading } = useAuth();

  if (loading) return null;

  return (
    <AppLayout>
      <PlaceholderPage title="Визиты (патронаж) — раздел в разработке" />
    </AppLayout>
  );
}
