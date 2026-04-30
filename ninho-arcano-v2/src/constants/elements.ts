import { ElementKey } from '@/types/game';
import { elementColors } from './colors';

export const elementOrder: ElementKey[] = ['wood', 'fire', 'earth', 'metal', 'water'];

export const elementLabels: Record<ElementKey, string> = {
  wood: 'Madeira',
  fire: 'Fogo',
  earth: 'Terra',
  metal: 'Metal',
  water: 'Água'
};

export const elementPoetry: Record<ElementKey, string> = {
  wood: 'algo vivo procura crescer por dentro da pedra',
  fire: 'uma brasa escondida respira sob a casca',
  earth: 'a caverna se torna mais antiga por um instante',
  metal: 'um brilho limpo corta o silêncio sem ferir',
  water: 'uma névoa fria atravessa as runas apagadas'
};

export const elements = elementOrder.map((key) => ({
  key,
  label: elementLabels[key],
  color: elementColors[key],
  poetry: elementPoetry[key]
}));
