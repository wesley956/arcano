import { Food } from '@/types/game';

export const foods: Food[] = [
  { id: 'fruit_roots', name: 'Frutos de Raiz Clara', affinity: 'wood', description: 'frutos macios que parecem lembrar a primeira floresta de Vaelun', hungerRestore: 24, bondGain: 4, healthGain: 2 },
  { id: 'warm_broth', name: 'Caldo Morno de Brasa', affinity: 'fire', description: 'um caldo dourado que aquece sem queimar', hungerRestore: 22, bondGain: 5, healthGain: 1 },
  { id: 'dense_grains', name: 'Grãos de Pedra Doce', affinity: 'earth', description: 'grãos densos, antigos e tranquilos como a caverna', hungerRestore: 28, bondGain: 3, healthGain: 4 },
  { id: 'silver_salts', name: 'Sais de Prata Macia', affinity: 'metal', description: 'cristais nutritivos que brilham só quando tocados', hungerRestore: 20, bondGain: 3, healthGain: 5 },
  { id: 'deep_nectar', name: 'Néctar de Gota Profunda', affinity: 'water', description: 'gotas frias que acalmam a respiração do filhote', hungerRestore: 23, bondGain: 5, healthGain: 3 }
];
