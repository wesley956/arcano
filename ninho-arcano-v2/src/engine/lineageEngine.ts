import { ElementKey, GameState, Lineage } from '@/types/game';
import { weightedTopTwo } from '@/utils/random';
import { getLineageByElements } from '@/data/lineages';

export function resolveDominantElements(state: GameState): [ElementKey, ElementKey | null] {
  const combined = { ...state.egg.energy };
  (Object.keys(state.cradle.energy) as ElementKey[]).forEach((key) => {
    combined[key] += Math.floor(state.cradle.energy[key] * 0.35);
  });
  return weightedTopTwo(combined);
}

export function resolveLineage(state: GameState): Lineage {
  const [primary, secondary] = resolveDominantElements(state);
  return getLineageByElements(primary, secondary);
}
