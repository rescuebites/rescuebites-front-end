export type DayOfWeek =
  | "MONDAY" | "TUESDAY" | "WEDNESDAY"
  | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  
export interface BusinessHoursRequest {
  dayOfWeek: DayOfWeek;
  closed: boolean;
  openTime: string | null;        // formato "HH:mm" → "08:00"
  closeTime: string | null;
  afternoonOpenTime: string | null;
  afternoonCloseTime: string | null;
}