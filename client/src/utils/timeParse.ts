export const timeParse = (utcString: string): string => {
  const utcDate = new Date(utcString);

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const parts = formatter.formatToParts(utcDate);

  const getPart = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find(p => p.type === type)?.value || '';

  return `${getPart('day')} ${getPart('month')} ${getPart('year')}, в ${getPart('hour')}:${getPart('minute')}`;
};