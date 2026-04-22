/**
 * Parsea un string "YYYY-MM-DD" como fecha local (sin conversión UTC).
 * Usar en lugar de `new Date(string)` para evitar el desfase de timezone.
 */
export const parseDateLocal = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

// Formatea una fecha ISO a formato DD/MM/YY
export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

// Formatea "HH:mm:ss" o "HH:mm" a "HH:mm"
export const formatTime = (time: string | null | undefined): string => {
  if (!time) return "";
  return time.length > 5 ? time.slice(0, 5) : time;
};

export const formatDateWithTime = (dateString: string): string => {
  const date = new Date(dateString);
  const dateStr = date.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const timeStr = date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${dateStr} • ${timeStr}`;
};
