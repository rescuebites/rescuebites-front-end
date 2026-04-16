import type { DayOfWeek } from "../requests/business-hours.request";

export interface BusinessHoursResponse {
  dayOfWeek: DayOfWeek;
  closed: boolean;
  openTime: string;
  closeTime: string;
  afternoonOpenTime: string | null;
  afternoonCloseTime: string | null;
}
