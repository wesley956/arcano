import { ElementKey, GameState, HeritageTrait } from '@/types/game';

const traitByElement: Record<ElementKey, HeritageTrait> = {
  wood: 'rootmark',
  fire: 'emberlight',
  earth: 'oldstone',
  metal: 'silverline',
  water: 'mist'
};

export function getHeritageTraits(state: GameState): HeritageTrait[] {
  return (Object.keys(state.cradle.energy) as ElementKey[])
    .filter((key) => state.cradle.energy[key] >= 3)
    .map((key) => traitByElement[key]);
}

export function heritagePhrase(traits: HeritageTrait[]): string {
  if (traits.length === 0) return 'O Berço guardou sua neutralidade antiga.';
  const labels: Record<HeritageTrait, string> = {
    mist: 'névoa fria',
    emberlight: 'luz de brasa',
    rootmark: 'marcas orgânicas',
    oldstone: 'pedra reforçada',
    silverline: 'linhas prateadas'
  };
  return `O Berço levará consigo ${traits.map((trait) => labels[trait]).join(', ')}.`;
}
