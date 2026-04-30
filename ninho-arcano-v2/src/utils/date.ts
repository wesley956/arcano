const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function nowIso(): string {
  return new Date().toISOString();
}

export function daysBetween(startIso: string | null, endIso: string | null = nowIso()): number {
  if (!startIso || !endIso) return 0;
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  if (Number.isNaN(start) || Number.isNaN(end)) return 0;
  return Math.max(0, Math.floor((end - start) / MS_PER_DAY));
}

export function addDaysIso(iso: string, days: number): string {
  const date = new Date(iso);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export function isDifferentCalendarDay(a: string | null, b: string | null = nowIso()): boolean {
  if (!a || !b) return true;
  const da = new Date(a);
  const db = new Date(b);
  return da.getFullYear() !== db.getFullYear() || da.getMonth() !== db.getMonth() || da.getDate() !== db.getDate();
}
