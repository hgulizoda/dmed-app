'use client';

import { useToast } from '@/shared/hooks/useToast';

export function AlertBanner() {
  const { show } = useToast();

  return (
    <div className="alert-banner">
      <span>
        МИС DMED будет осуществляться через OneID — Единую систему идентификации пользователей Цифрового правительства. Без регистрации в OneID вы потеряете доступ к системе.
      </span>
      <button
        type="button"
        className="btn-details"
        onClick={() => show('Переход на страницу OneID (мок)', 'info')}
      >
        Подробнее
      </button>
    </div>
  );
}
