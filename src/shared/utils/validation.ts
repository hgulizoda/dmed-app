export function required(value: string | undefined | null): boolean {
  return Boolean(value?.trim());
}

export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}

export function maxLength(value: string, max: number): boolean {
  return value.length <= max;
}

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export function validateLogin(email: string, password: string): ValidationResult {
  if (!required(email)) return { valid: false, message: 'Введите email' };
  if (!required(password)) return { valid: false, message: 'Введите пароль' };
  if (!minLength(password, 4)) return { valid: false, message: 'Пароль не менее 4 символов' };
  return { valid: true };
}
