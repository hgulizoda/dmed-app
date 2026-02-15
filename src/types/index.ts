export interface User {
  id: string;
  name: string;
  role: string;
}

export interface Patient {
  id: string;
  cardNumber: string;
  fullName: string;
  dob: string;
  district: string;
  age: string;
  healthGroup: 'I' | 'II' | 'III';
  healthGroupClass?: string;
  riskCvd?: string;
  riskSd?: string;
  oncogemSurvey?: string;
  dUchet?: string;
  hasCheck?: boolean;
  hasHome?: boolean;
}

export interface Appointment {
  queue: string;
  cardNumber: string;
  patientName: string;
  place: string;
  services: string;
  employee: string;
  hasCheck?: boolean;
  hasHome?: boolean;
}

export interface Episode {
  id: string;
  name: string;
  lastVisitDate: string;
  employee: string;
  institution: string;
  diagnosis: string;
}

export interface DiagnosisRow {
  id: string;
  diagnosis: string;
  typeDiagnosis: string;
  diseaseNature: string;
  clinicalDiagnosis: string;
}

export interface TemplateOption {
  id: string;
  name: string;
}

export interface DiagnosisOption {
  id: string;
  name: string;
}

export type ToastType = 'success' | 'error' | 'info';
