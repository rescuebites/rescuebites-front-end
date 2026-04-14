export const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

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

// Formatea una fecha como tiempo relativo en español (ej: "5min atrás", "2h atrás")
export const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMin / 60);

  if (diffMin < 1) return 'Ahora';
  if (diffMin < 60) return `${diffMin}min atrás`;
  if (diffHrs < 24) return `${diffHrs}h atrás`;
  return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short' }).format(date);
};
