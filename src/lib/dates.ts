const dateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'UTC',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const compactFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  month: '2-digit',
  day: '2-digit',
});

export function formatDate(value: Date): string {
  return dateFormatter.format(value);
}

export function formatCompactDate(value: Date): string {
  return compactFormatter.format(value).replace('/', '.');
}

export function yearOf(value: Date): string {
  return String(value.getUTCFullYear());
}

export function compareDesc(a: Date, b: Date): number {
  return b.getTime() - a.getTime();
}
