import { ElementKey, GameState, MemoryKind } from '@/types/game';
import { elementLabels } from '@/constants/elements';
import { omens } from '@/data/omens';
import { createDream } from '@/data/dreams';
import { createEcho } from '@/data/echoes';
import { pickOne, randomId } from '@/utils/random';
import { nowIso } from '@/utils/date';

export function addMemory(state: GameState, kind: MemoryKind, text: string): GameState {
  return {
    ...state,
    memories: [{ id: randomId('memory'), kind, text, createdAt: nowIso() }, ...state.memories]
  };
}

export function maybeCreateOmenDreamOrEcho(state: GameState, element: ElementKey): GameState {
  const roll = Math.random();
  if (roll < 0.32) {
    const text = pickOne(omens[element]);
    return addMemory({ ...state, ui: { ...state.ui, lastWhisper: text } }, 'omen', text);
  }
  if (roll < 0.48) {
    const dream = createDream(element);
    return {
      ...state,
      dreams: [dream, ...state.dreams],
      memories: [{ id: randomId('memory'), kind: 'dream', text: `Sonho desbloqueado: ${dream.title}.`, createdAt: nowIso() }, ...state.memories],
      ui: { ...state.ui, lastWhisper: `O ovo sonhou com ${elementLabels[element].toLowerCase()}.` }
    };
  }
  if (roll < 0.58) {
    const echo = createEcho(state.echoes.length);
    return {
      ...state,
      echoes: [echo, ...state.echoes],
      memories: [{ id: randomId('memory'), kind: 'echo', text: `Eco de Vaelun ouvido: ${echo.title}.`, createdAt: nowIso() }, ...state.memories],
      ui: { ...state.ui, lastWhisper: 'Um Eco de Vaelun atravessou a caverna.' }
    };
  }
  return state;
}
