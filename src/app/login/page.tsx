'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="app-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: 'var(--text-secondary)' }}>Перенаправление...</span>
    </div>
  );
}
