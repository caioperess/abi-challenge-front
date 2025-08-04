export function formatDate(date: Date | string) {
  const parsedDate = typeof date === 'string' ? Date.parse(date) : date;

  return new Intl.DateTimeFormat('pt-BR').format(parsedDate);
}
