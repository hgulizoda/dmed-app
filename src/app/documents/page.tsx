'use client';

import { AppLayout } from '@/widgets/AppLayout';
import { PlaceholderPage } from '@/shared/components/PlaceholderPage';
import { useAuth } from '@/features/auth/useAuth';

export default function DocumentsPage() {
  const { loading } = useAuth();

  if (loading) return null;

  return (
    <AppLayout>
      <PlaceholderPage title="Документы — раздел в разработке" />
    </AppLayout>
  );
}
