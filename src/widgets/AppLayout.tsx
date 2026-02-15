'use client';

import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { AlertBanner } from './AlertBanner';
import { Toast } from '@/shared/ui/Toast';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <TopHeader />
        <AlertBanner />
        <div className="page-content">{children}</div>
      </main>
      <button type="button" className="chat-button" aria-label="Чат">
        <i className="fas fa-comment-dots" />
      </button>
      <Toast />
    </div>
  );
}
