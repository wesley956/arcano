import { ElementKey } from '@/types/game';

export const omens: Record<ElementKey, string[]> = {
  wood: [
    'O ovo sonhou com raízes atravessando pedra.',
    'Uma linha verde apareceu na casca e sumiu como respiração.'
  ],
  fire: [
    'Por um instante, o ovo ficou morno como brasa escondida.',
    'As tochas inclinaram a chama na direção da casca.'
  ],
  earth: [
    'A base de pedra pareceu reconhecer o peso do ovo.',
    'Um pó dourado desceu das runas sem tocar o chão.'
  ],
  metal: [
    'Uma marca metálica apareceu e sumiu antes do amanhecer.',
    'O silêncio ficou limpo, quase cortante.'
  ],
  water: [
    'A casca pareceu lembrar o som da chuva.',
    'Uma névoa fina cercou o Berço e depois desapareceu.'
  ]
};
