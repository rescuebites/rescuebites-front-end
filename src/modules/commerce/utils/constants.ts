import type { DayOfWeek } from "../interfaces/requests/business-hours.request";

export const REGISTER_COMMERCE_KEY = "commerce/register-commerce";

export const DAY_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

export const DAY_OF_WEEK_META: Record<DayOfWeek, { id: string; label: string }> = {
  MONDAY: { id: "monday", label: "Lunes" },
  TUESDAY: { id: "tuesday", label: "Martes" },
  WEDNESDAY: { id: "wednesday", label: "Miércoles" },
  THURSDAY: { id: "thursday", label: "Jueves" },
  FRIDAY: { id: "friday", label: "Viernes" },
  SATURDAY: { id: "saturday", label: "Sábado" },
  SUNDAY: { id: "sunday", label: "Domingo" },
};

export const DAY_LABELS: Record<string, string> = Object.fromEntries(
  Object.entries(DAY_OF_WEEK_META).map(([key, val]) => [key, val.label])
);
