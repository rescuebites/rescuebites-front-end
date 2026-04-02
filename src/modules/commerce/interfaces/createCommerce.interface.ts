export type Inputs = {
  // Datos del usuario
  email: string;
  password: string;
  confirmPassword: string;

  // Datos del comercio
  name: string;
  description?: string;
  commerceTypes: string[];
  businessHours: [];
  address: string;
  locality: string;
  phone: string;       
  profilePhoto: File; 
};

export interface BusinessHoursRequest {
  dayOfWeek: DayOfWeek;
  closed: boolean;
  openTime: string | null;        // formato "HH:mm" → "08:00"
  closeTime: string | null;
  afternoonOpenTime: string | null;
  afternoonCloseTime: string | null;
}

export type DayOfWeek =
  | "MONDAY" | "TUESDAY" | "WEDNESDAY"
  | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

export interface CreateCommerceRequest {
  userId: string;
  name?: string;
  description?: string;
  commerceTypes: string[];
  businessHours: BusinessHoursRequest[];
  address: string;
  locality: string;
  phone: string;
}

export interface CreateCommerceParams {
  createCommerceRequest: CreateCommerceRequest;
  profilePicture?: File;
}