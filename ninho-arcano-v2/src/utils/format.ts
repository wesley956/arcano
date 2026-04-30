import { ElementKey, LifeStage } from '@/types/game';
import { elementLabels } from '@/constants/elements';

export function elementName(element: ElementKey | null | undefined): string {
  return element ? elementLabels[element] : 'Mistério';
}

export function stageLabel(stage: LifeStage | null): string {
  switch (stage) {
    case 'egg': return 'Ovo Arcano Primordial';
    case 'birth_ritual': return 'Ritual de Nascimento';
    case 'newborn': return 'Recém-nascido';
    case 'child_i': return 'Filhote I';
    case 'child_ii': return 'Filhote II';
    default: return 'Eco inicial';
  }
}

export function shortDate(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(new Date(iso));
}
