import { Food, GameState } from '@/types/game';
import { clamp, randomId } from '@/utils/random';
import { nowIso } from '@/utils/date';

export function feedDragon(state: GameState, food: Food): GameState {
  if (!state.dragon.exists) return state;
  const likes = state.dragon.foodPreferences.includes(food.affinity);
  const bondBonus = likes ? 3 : 1;
  return {
    ...state,
    dragon: {
      ...state.dragon,
      hunger: clamp(state.dragon.hunger + food.hungerRestore),
      health: clamp(state.dragon.health + food.healthGain),
      bond: clamp(state.dragon.bond + food.bondGain + bondBonus),
      mood: 'content'
    },
    memories: [
      {
        id: randomId('memory'),
        kind: 'food',
        text: likes
          ? `Ele aceitou ${food.name} com os olhos brilhando. Algo nessa oferta parecia falar sua língua.`
          : `Ele comeu ${food.name} devagar. Depois encostou a cabeça perto da sua mão.`,
        createdAt: nowIso()
      },
      ...state.memories
    ],
    ui: { ...state.ui, lastWhisper: likes ? 'O alimento combinou com a energia dele.' : 'A vida foi sustentada sem apressar o tempo.' }
  };
}
