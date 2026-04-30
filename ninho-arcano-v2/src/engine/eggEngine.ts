import { ElementKey, EggMood, GameState } from '@/types/game';

export function nextEggMood(state: GameState, element: ElementKey): EggMood {
  const total = Object.values(state.egg.energy).reduce((sum, value) => sum + value, 0);
  if (total > 16) return 'near_birth';
  if (element === 'fire') return 'warm';
  if (element === 'water') return 'dreaming';
  if (total > 8) return 'restless';
  return 'silent';
}

export function crackLevelForIncubation(days: number, required: number): number {
  if (days <= 0) return 0;
  return Math.min(3, Math.floor((days / required) * 4));
}

export function visualMarkIntensity(current: number): number {
  return Math.min(1, current + 0.18);
}
