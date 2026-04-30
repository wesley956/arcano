import { GameState } from '@/types/game';
import { clamp, randomId } from '@/utils/random';
import { nowIso } from '@/utils/date';
import { resolveLineage } from './lineageEngine';
import { getHeritageTraits } from './cradleEngine';

export function birthDragon(state: GameState): GameState {
  const lineage = resolveLineage(state);
  const bornAt = nowIso();
  return {
    ...state,
    cradle: {
      ...state.cradle,
      heritageTraits: getHeritageTraits(state)
    },
    dragon: {
      ...state.dragon,
      exists: true,
      id: randomId('dragon'),
      bornAt,
      lineage: lineage.name,
      nest: lineage.nest,
      primaryElement: lineage.primary,
      secondaryElement: lineage.secondary ?? null,
      stage: 'newborn',
      hunger: 72,
      mood: 'curious',
      health: 88,
      bond: 22,
      maturity: 0,
      talent: lineage.talent,
      personality: lineage.personality,
      foodPreferences: [lineage.primary, lineage.secondary ?? lineage.primary]
    },
    memories: [
      {
        id: randomId('memory'),
        kind: 'birth',
        text: `As runas acenderam sem pedir permissão. Da casca quebrada nasceu ${lineage.name}.`,
        createdAt: bornAt
      },
      ...state.memories
    ]
  };
}

export function nameDragon(state: GameState, name: string): GameState {
  return {
    ...state,
    dragon: { ...state.dragon, name: name.trim() },
    memories: [
      {
        id: randomId('memory'),
        kind: 'birth',
        text: `O nome ${name.trim()} atravessou o Berço. O filhote reconheceu o som como casa.`,
        createdAt: nowIso()
      },
      ...state.memories
    ]
  };
}

export function touchDragon(state: GameState): GameState {
  if (!state.dragon.exists) return state;
  return {
    ...state,
    dragon: {
      ...state.dragon,
      bond: clamp(state.dragon.bond + 2),
      mood: state.dragon.hunger < 30 ? 'hungry' : 'content'
    },
    ui: { ...state.ui, lastWhisper: 'Ele se aproximou devagar, como se seu toque fosse uma memória segura.' }
  };
}
