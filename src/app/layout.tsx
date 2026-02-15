import type { Metadata } from 'next';
import { AuthProvider } from '@/features/auth/useAuth';
import { ToastProvider } from '@/shared/hooks/useToast';
import './globals.css';

export const metadata: Metadata = {
  title: 'DMED - Медицинская информационная система',
  description: 'Медицинская информационная система',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <ToastProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
