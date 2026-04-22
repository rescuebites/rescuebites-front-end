import type { BusinessHoursResponse } from "@/modules/commerce/interfaces/responses/business-hours.response";
import type { DayOfWeek } from "@/modules/commerce/interfaces/requests/business-hours.request";

const JS_DAY_TO_DOW: DayOfWeek[] = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

export function isCommerceCurrentlyClosed(businessHours: BusinessHoursResponse[]): boolean {
  if (!businessHours.length) return false;
  const now = new Date();
  const todayDow = JS_DAY_TO_DOW[now.getDay()];
  const entry = businessHours.find((h) => h.dayOfWeek === todayDow);
  if (!entry) return false;
  if (entry.closed) return true;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const toMin = (t: string | null) => {
    if (!t) return null;
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const morningOpen = toMin(entry.openTime);
  const morningClose = toMin(entry.closeTime);
  const afternoonOpen = toMin(entry.afternoonOpenTime);
  const afternoonClose = toMin(entry.afternoonCloseTime);
  const inMorning = morningOpen !== null && morningClose !== null && currentMinutes >= morningOpen && currentMinutes < morningClose;
  const inAfternoon = afternoonOpen !== null && afternoonClose !== null && currentMinutes >= afternoonOpen && currentMinutes < afternoonClose;
  return !inMorning && !inAfternoon;
}
