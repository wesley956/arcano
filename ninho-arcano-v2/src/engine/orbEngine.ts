import { ElementKey, Orb } from '@/types/game';
import { elementOrder } from '@/constants/elements';
import { randomId } from '@/utils/random';
import { nowIso } from '@/utils/date';

export function generateDailyOrbs(count = 5): Orb[] {
  const shuffled = [...elementOrder].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((element) => ({ id: randomId('orb'), element, bornAt: nowIso() }));
}

export function removeOrb(orbs: Orb[], id: string): Orb[] {
  return orbs.filter((orb) => orb.id !== id);
}

export function elementRecord(initial = 0): Record<ElementKey, number> {
  return { wood: initial, fire: initial, earth: initial, metal: initial, water: initial };
}
