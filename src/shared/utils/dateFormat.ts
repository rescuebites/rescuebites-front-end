export function convertDateToIso(dateString: string): string | null {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateString.match(regex);

  if (!match) return null;

  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
}
