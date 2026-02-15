import { Patient } from '@/types';
import { simulateApi } from './api';

const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    cardNumber: 'PX6727',
    fullName: 'XAYRIYEV PARVIZ SAYFILLOYEVICH',
    dob: '12.05.1987',
    district: '№17 Tibbiy brigada',
    age: '39 лет',
    healthGroup: 'III',
    healthGroupClass: 'badge-danger',
    riskCvd: '...',
    riskSd: '...',
    oncogemSurvey: 'Не пройден',
    dUchet: 'Z09.9, E11, I11.9, K21.0',
  },
  {
    id: '2',
    cardNumber: 'FLH1422',
    fullName: 'USMANOVA ZAMIRA SHUTBAYEVNA',
    dob: '03.07.1967',
    district: '№15 Tibbiy brigada',
    age: '59 лет',
    healthGroup: 'I',
    healthGroupClass: 'badge-success',
    riskCvd: '5 %',
    riskSd: '9',
    oncogemSurvey: 'Не пройден',
    dUchet: '',
  },
  {
    id: '3',
    cardNumber: 'CWM9031',
    fullName: 'JUMABAYEV RAJAPBAY XXX',
    dob: '22.11.1958',
    district: '№7 Tibbiy brigada',
    age: '68 лет',
    healthGroup: 'III',
    healthGroupClass: 'badge-danger',
    riskCvd: '...',
    riskSd: '7',
    oncogemSurvey: 'Не пройден',
    dUchet: 'I20-I25, I11',
  },
];

export async function fetchPatients(_query?: string): Promise<Patient[]> {
  return simulateApi([...MOCK_PATIENTS]);
}

export async function fetchPatientByCard(cardNumber: string): Promise<Patient | null> {
  await simulateApi(undefined);
  return MOCK_PATIENTS.find((p) => p.cardNumber === cardNumber) ?? null;
}

export async function createPatient(_data: Omit<Patient, 'id'>): Promise<Patient> {
  await simulateApi(undefined, 500);
  const newPatient: Patient = {
    ..._data,
    id: String(Date.now()),
  };
  MOCK_PATIENTS.push(newPatient);
  return newPatient;
}

export async function updatePatient(id: string, _data: Partial<Patient>): Promise<Patient | null> {
  await simulateApi(undefined, 500);
  const idx = MOCK_PATIENTS.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  MOCK_PATIENTS[idx] = { ...MOCK_PATIENTS[idx], ..._data };
  return MOCK_PATIENTS[idx];
}

export async function deletePatient(id: string): Promise<boolean> {
  await simulateApi(undefined, 400);
  const idx = MOCK_PATIENTS.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  MOCK_PATIENTS.splice(idx, 1);
  return true;
}
