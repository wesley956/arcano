import { EchoEntry } from '@/types/game';
import { randomId } from '@/utils/random';
import { nowIso } from '@/utils/date';

const echoes = [
  { title: 'Canto da Travessia', text: 'Os guardiões cantaram para que os ovos não sentissem medo durante a Travessia.' },
  { title: 'Última Escola', text: 'A última escola de Vaelun fechou suas portas sem trancar. Esperava que algum filhote um dia retornasse.' },
  { title: 'Cinco Forças', text: 'Madeira, Fogo, Terra, Metal e Água não eram poderes separados. Eram maneiras diferentes de continuar vivo.' },
  { title: 'Ninho Vazio', text: 'Um ninho vazio não é uma ruína quando ainda guarda calor.' },
  { title: 'Promessa dos Guardiões', text: 'Nenhum ovo foi enviado para ser escolhido. Cada ovo foi enviado para ser acolhido.' }
];

export function createEcho(indexHint = 0): EchoEntry {
  const item = echoes[indexHint % echoes.length];
  return { id: randomId('echo'), title: item.title, text: item.text, createdAt: nowIso() };
}
