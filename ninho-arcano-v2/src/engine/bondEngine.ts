import { GameState } from '@/types/game';
import { randomId } from '@/utils/random';
import { nowIso } from '@/utils/date';

export function acceptBond(state: GameState): GameState {
  const createdAt = nowIso();
  return {
    ...state,
    bond: {
      accepted: true,
      bondId: randomId('bond'),
      deviceLinked: true,
      createdAt,
      travessiaAvailable: false
    },
    egg: {
      ...state.egg,
      exists: true,
      incubationStartedAt: createdAt
    },
    memories: [
      {
        id: randomId('memory'),
        kind: 'bond',
        text: 'O vínculo foi aceito. O Ovo Arcano Primordial passou a existir neste aparelho.',
        createdAt
      },
      ...state.memories
    ],
    ui: { ...state.ui, lastWhisper: 'Um vínculo não se copia. Um vínculo atravessa.' }
  };
}
