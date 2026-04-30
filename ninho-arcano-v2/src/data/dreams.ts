import { DreamEntry, ElementKey } from '@/types/game';
import { randomId } from '@/utils/random';
import { nowIso } from '@/utils/date';

const dreamBank: Record<ElementKey, { title: string; text: string }[]> = {
  wood: [
    { title: 'Raiz sob cinzas', text: 'Você viu os ninhos de Vaelun sob um céu partido. Entre as cinzas, uma pequena raiz começou a crescer.' },
    { title: 'Folhas sem vento', text: 'O ovo sonhou com folhas paradas, como se o mundo prendesse a respiração para ouvi-lo nascer.' }
  ],
  fire: [
    { title: 'Brasa escondida', text: 'No sonho, uma brasa atravessava o vazio sem apagar. Ela parecia procurar uma mão que não tivesse medo.' },
    { title: 'Céu vermelho', text: 'Você ouviu asas distantes sobre um céu rubro. Nada queimava. Tudo lembrava.' }
  ],
  earth: [
    { title: 'Pedra que canta', text: 'Uma montanha antiga cantou em silêncio para que os ovos não tremessem durante a Travessia.' },
    { title: 'Peso sagrado', text: 'O Berço pareceu mais pesado, como se guardasse sob ele um pedaço inteiro de Vaelun.' }
  ],
  metal: [
    { title: 'Lâmina sem ferida', text: 'Linhas prateadas desenharam um caminho no escuro. O ovo as seguiu sem medo.' },
    { title: 'Forja calada', text: 'Uma forja apagada ainda lembrava o formato das escamas que um dia ajudou a proteger.' }
  ],
  water: [
    { title: 'Chuva no vazio', text: 'Choveu dentro do sonho, mas nenhuma gota caiu. Todas flutuavam ao redor do ovo.' },
    { title: 'Mar sem margem', text: 'Você viu um mar escuro atravessando estrelas, levando memórias pequenas demais para morrer.' }
  ]
};

export function createDream(element: ElementKey): DreamEntry {
  const item = dreamBank[element][Math.floor(Math.random() * dreamBank[element].length)];
  return { id: randomId('dream'), element, title: item.title, text: item.text, createdAt: nowIso() };
}
