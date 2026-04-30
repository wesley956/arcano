export function randomId(prefix = 'arc'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function pickOne<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

export function weightedTopTwo<T extends string>(record: Record<T, number>): [T, T | null] {
  const sorted = Object.entries(record).sort((a, b) => Number(b[1]) - Number(a[1])) as [T, number][];
  const first = sorted[0]?.[0];
  const second = sorted[1]?.[1] > 0 ? sorted[1][0] : null;
  return [first, second];
}
