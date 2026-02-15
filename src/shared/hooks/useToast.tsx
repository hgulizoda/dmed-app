'use client';

import { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import { ToastType } from '@/types';

interface ToastState {
  message: string;
  type: ToastType;
  visible: boolean;
}

interface ToastContextValue {
  show: (message: string, type?: ToastType) => void;
  hide: () => void;
  toast: ToastState;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'info', visible: false });

  const show = useCallback((message: string, type: ToastType = 'info') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  }, []);

  const hide = useCallback(() => {
    setToast((t) => ({ ...t, visible: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ show, hide, toast }}>{children}</ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
