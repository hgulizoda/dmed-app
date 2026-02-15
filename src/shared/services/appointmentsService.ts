import { Appointment } from '@/types';
import { simulateApi } from './api';

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    queue: '46--',
    cardNumber: 'KN2438',
    patientName: 'JUMABOYEVA URAL RAXIMOVNA',
    place: 'Клиника',
    services: '...',
    employee: 'TURAYEVA GULBAXOR KUCHKAROVNA',
    hasCheck: true,
    hasHome: true,
  },
];

export async function fetchAppointments(_filters?: Record<string, string>): Promise<Appointment[]> {
  return simulateApi([...MOCK_APPOINTMENTS]);
}

export async function createAppointment(data: {
  cardNumber: string;
  patientName: string;
  place: string;
  services?: string;
  employee?: string;
}): Promise<Appointment> {
  await simulateApi(undefined, 400);
  const queue = String(MOCK_APPOINTMENTS.length + 1).padStart(2, '0') + '--';
  const appointment: Appointment = {
    queue,
    cardNumber: data.cardNumber,
    patientName: data.patientName,
    place: data.place,
    services: data.services ?? '...',
    employee: data.employee ?? 'TURAYEVA GULBAXOR KUCHKAROVNA',
  };
  MOCK_APPOINTMENTS.push(appointment);
  return appointment;
}

export async function cancelAppointment(_id: string): Promise<void> {
  await simulateApi(undefined, 400);
}
