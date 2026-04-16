import type { Day } from "../components/BusinessHours";
import { INITIAL_DAYS } from "../components/BusinessHours";
import type { BusinessHoursRequest, DayOfWeek } from "../interfaces/requests/business-hours.request";
import type { BusinessHoursResponse } from "../interfaces/responses/business-hours.response";

// Función para convertir string "HH:mm" a "HH:mm:ss" (LocalTime)
export const toLocalTime = (time: string | null | undefined): string | null => {
  if (!time) return null;
  return `${time}:00`;
};

// Función para convertir Day[] a BusinessHoursRequest[] (para enviar al backend)
export const mapDaysToBusinessHours = (days: Day[]): BusinessHoursRequest[] => {
  const ID_TO_DAY_OF_WEEK: Record<string, DayOfWeek> = {
    monday: "MONDAY",
    tuesday: "TUESDAY",
    wednesday: "WEDNESDAY",
    thursday: "THURSDAY",
    friday: "FRIDAY",
    saturday: "SATURDAY",
    sunday: "SUNDAY",
  };

  return days.map((day) => {
    const morningEnabled = !day.closed && day.shifts.morning.enabled;
    const afternoonEnabled = !day.closed && day.shifts.afternoon.enabled;
    const dayId = day.id.toLowerCase();
    const dayOfWeek = (ID_TO_DAY_OF_WEEK as Record<string, DayOfWeek>)[dayId] ?? "MONDAY";

    return {
      dayOfWeek,
      closed: day.closed,
      openTime: morningEnabled ? toLocalTime(day.shifts.morning.open) : null,
      closeTime: morningEnabled ? toLocalTime(day.shifts.morning.close) : null,
      afternoonOpenTime: afternoonEnabled ? toLocalTime(day.shifts.afternoon.open) : null,
      afternoonCloseTime: afternoonEnabled ? toLocalTime(day.shifts.afternoon.close) : null,
    };
  });
};

// Función para convertir BusinessHoursResponse[] a Day[] (desde el backend)
export const mapBusinessHoursToDay = (hours: BusinessHoursResponse[] = []): Day[] => {
  if (!hours || hours.length === 0) return INITIAL_DAYS;

  const DAY_OF_WEEK_META: Record<DayOfWeek, { id: string; label: string }> = {
    MONDAY: { id: "monday", label: "Lunes" },
    TUESDAY: { id: "tuesday", label: "Martes" },
    WEDNESDAY: { id: "wednesday", label: "Miércoles" },
    THURSDAY: { id: "thursday", label: "Jueves" },
    FRIDAY: { id: "friday", label: "Viernes" },
    SATURDAY: { id: "saturday", label: "Sábado" },
    SUNDAY: { id: "sunday", label: "Domingo" },
  };

  const responseByDay = new Map<DayOfWeek, BusinessHoursResponse>();
  hours.forEach((h) => responseByDay.set(h.dayOfWeek, h));

  // Preserve order and defaults from INITIAL_DAYS, overriding when response exists
  return INITIAL_DAYS.map((d) => {
    const dayOfWeek = (Object.keys(DAY_OF_WEEK_META) as DayOfWeek[]).find(
      (k) => DAY_OF_WEEK_META[k].id === d.id
    );

    if (!dayOfWeek) return d;

    const h = responseByDay.get(dayOfWeek);
    if (!h) return d;

    const morningEnabled = !h.closed && !!h.openTime;
    const afternoonEnabled = !h.closed && !!h.afternoonOpenTime;

    return {
      ...d,
      closed: h.closed,
      shifts: {
        morning: {
          enabled: morningEnabled,
          open: h.openTime ? h.openTime.substring(0, 5) : d.shifts.morning.open,
          close: h.closeTime ? h.closeTime.substring(0, 5) : d.shifts.morning.close,
        },
        afternoon: {
          enabled: afternoonEnabled,
          open: h.afternoonOpenTime ? h.afternoonOpenTime.substring(0, 5) : d.shifts.afternoon.open,
          close: h.afternoonCloseTime ? h.afternoonCloseTime.substring(0, 5) : d.shifts.afternoon.close,
        },
      },
    };
  });
};

// Formatea BusinessHoursResponse[] para que se vea como "Lun: 09:00 - 18:00, Mar: Cerrado, ...", 
// útil para mostrar en el detalle del comercio
export const formatBusinessHours = (hours: BusinessHoursResponse[] = []): string => {
  if (!hours || hours.length === 0) return "";

  const shortDays: Record<string, string> = {
    MONDAY: "Lun",
    TUESDAY: "Mar",
    WEDNESDAY: "Mié",
    THURSDAY: "Jue",
    FRIDAY: "Vie",
    SATURDAY: "Sáb",
    SUNDAY: "Dom",
  };

  return hours
    .map((h) => {
      const day = shortDays[h.dayOfWeek] ?? h.dayOfWeek;
      if (h.closed) return `${day}: Cerrado`;
      const open = h.openTime ? h.openTime.substring(0, 5) : "";
      const close = h.closeTime ? h.closeTime.substring(0, 5) : "";
      if (!open && !close) return `${day}: -`;
      return `${day}: ${open} - ${close}`;
    })
    .join(", ");
};
