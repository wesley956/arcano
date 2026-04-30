import { ElementKey, Lineage } from '@/types/game';

const baseDescriptions: Record<ElementKey, Pick<Lineage, 'newbornDescription' | 'childIDescription' | 'childIIDescription'>> = {
  wood: {
    newbornDescription: 'Pequeno, musgo-dourado, com chifres lembrando galhos jovens e olhos verdes atentos.',
    childIDescription: 'As marcas orgânicas se alongam pela nuca; as asas ainda brincam com o ar.',
    childIIDescription: 'Seu corpo fica mais alongado, as raízes da escama se tornam evidentes, mas o olhar ainda é jovem.'
  },
  fire: {
    newbornDescription: 'Âmbar e vermelho escuro, com fissuras quentes discretas e respiração morna.',
    childIDescription: 'A cauda brilha como brasa baixa; as asas se abrem com inquietação juvenil.',
    childIIDescription: 'As marcas de calor ficam mais nítidas, o peito ganha força, mas ainda não há majestade adulta.'
  },
  earth: {
    newbornDescription: 'Areia, pedra e cobre, corpo pequeno e robusto, com olhos calmos.',
    childIDescription: 'As escamas engrossam sem perder suavidade; ele pisa como quem escuta a caverna.',
    childIIDescription: 'Mais firme e alongado, chifres definidos e postura de jovem guardião em formação.'
  },
  metal: {
    newbornDescription: 'Prata, grafite e cinza azulado, com linhas simétricas e olhar observador.',
    childIDescription: 'O brilho metálico surge em placas pequenas; suas garras ainda são delicadas.',
    childIIDescription: 'As linhas prateadas se tornam evidentes, elegante e atento, mas ainda adolescente.'
  },
  water: {
    newbornDescription: 'Azul profundo e violeta suave, escamas lisas, olhos fundos e névoa leve.',
    childIDescription: 'Move-se em silêncio, como se nadar e caminhar fossem a mesma coisa.',
    childIIDescription: 'Corpo alongado, asas úmidas de reflexos; consciente, reservado e ainda jovem.'
  }
};

function lineage(id: string, name: string, primary: ElementKey, secondary: ElementKey | undefined, nest: string, talent: string, personality: string[]): Lineage {
  return {
    id,
    name,
    primary,
    secondary,
    nest,
    talent,
    personality,
    ...baseDescriptions[primary]
  };
}

export const lineages: Lineage[] = [
  lineage('wood', 'Dragão das Raízes Vivas', 'wood', undefined, 'Santuário das Raízes', 'Escutar sementes escondidas', ['curioso', 'afetuoso', 'persistente']),
  lineage('fire', 'Dragão das Brasas Vivas', 'fire', undefined, 'Ninho das Brasas', 'Aquecer a coragem adormecida', ['intenso', 'inquieto', 'protetor']),
  lineage('earth', 'Dragão de Pedra Antiga', 'earth', undefined, 'Berço de Pedra', 'Firmar lugares frágeis', ['calmo', 'leal', 'paciente']),
  lineage('metal', 'Dragão de Escama Forjada', 'metal', undefined, 'Forja Silenciosa', 'Encontrar ordem no caos', ['observador', 'preciso', 'reservado']),
  lineage('water', 'Dragão das Águas Profundas', 'water', undefined, 'Gruta das Marés', 'Lembrar vozes submersas', ['sensível', 'sereno', 'misterioso']),
  lineage('wood_fire', 'Dragão da Brasa Verde', 'wood', 'fire', 'Clareira das Brasas Verdes', 'Fazer brotar vida em solo queimado', ['vivo', 'corajoso', 'afetuoso']),
  lineage('fire_earth', 'Dragão Vulcânico Jovem', 'fire', 'earth', 'Coração Vulcânico', 'Guardar calor sob pedra antiga', ['firme', 'impulsivo', 'protetor']),
  lineage('earth_metal', 'Dragão de Ferro Antigo', 'earth', 'metal', 'Forja de Pedra Antiga', 'Resistir sem endurecer o coração', ['leal', 'observador', 'resistente']),
  lineage('metal_water', 'Dragão de Prata Líquida', 'metal', 'water', 'Canal de Prata Líquida', 'Transformar silêncio em direção', ['sereno', 'elegante', 'focado']),
  lineage('water_wood', 'Dragão do Bosque Nebuloso', 'water', 'wood', 'Bosque de Névoa Viva', 'Fazer a memória florescer sem revelar tudo', ['sensível', 'curioso', 'sonhador']),
  lineage('wood_earth', 'Dragão da Raiz de Pedra', 'wood', 'earth', 'Raizal de Pedra', 'Unir crescimento e permanência', ['paciente', 'vivo', 'cuidadoso']),
  lineage('fire_metal', 'Dragão da Forja Rubra', 'fire', 'metal', 'Forja Rubra', 'Lapidar impulsos em propósito', ['intenso', 'preciso', 'orgulhoso']),
  lineage('earth_water', 'Dragão do Pântano Ancestral', 'earth', 'water', 'Pântano Ancestral', 'Ler marcas deixadas na lama antiga', ['calmo', 'profundo', 'protetor']),
  lineage('metal_wood', 'Dragão dos Galhos de Aço', 'metal', 'wood', 'Jardim de Aço Vivo', 'Fazer a forma proteger o crescimento', ['observador', 'persistente', 'gentil']),
  lineage('water_fire', 'Dragão da Névoa Ardente', 'water', 'fire', 'Vapor dos Ninhos Perdidos', 'Unir ternura e chama sem se desfazer', ['misterioso', 'intenso', 'sensível'])
];

export function getLineageByElements(primary: ElementKey, secondary: ElementKey | null): Lineage {
  if (!secondary || primary === secondary) {
    return lineages.find((item) => item.primary === primary && !item.secondary) ?? lineages[0];
  }
  return (
    lineages.find((item) => item.primary === primary && item.secondary === secondary) ||
    lineages.find((item) => item.primary === secondary && item.secondary === primary) ||
    lineages.find((item) => item.primary === primary && !item.secondary) ||
    lineages[0]
  );
}
