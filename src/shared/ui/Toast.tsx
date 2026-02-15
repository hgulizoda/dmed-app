'use client';

import { useToast } from '@/shared/hooks/useToast';

export function Toast() {
  const { toast } = useToast();
  if (!toast.visible) return null;
  const className = `toast show toast-${toast.type}`;
  return <div className={className} role="status">{toast.message}</div>;
}
