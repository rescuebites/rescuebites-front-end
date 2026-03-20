export function convertDateToIso(dateString: string): string | null {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateString.match(regex);

  if (!match) return null;

  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
}

// Formatea una fecha ISO como fecha y hora legible en español 

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
