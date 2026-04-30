# Ninho Arcano — V2 Visual Premium

Projeto Expo + React Native + TypeScript do jogo **Ninho Arcano**, agora com uma camada visual mais forte usando artes finais geradas para o Berço Arcano, Ovo Arcano Primordial e dragões elementais.

> Um universo caiu. Um ovo chegou até você.

Esta versão mantém o princípio central do jogo: **não mostrar sistema, mostrar vida**.

## O que esta V2 acrescenta

- Berço Arcano com arte premium de caverna ritualística.
- Ovo Arcano Primordial com arte premium.
- Dragões com artes completas por elemento e por ciclo:
  - Madeira: recém-nascido, Filhote I e Filhote II.
  - Fogo: recém-nascido, Filhote I e Filhote II.
  - Terra: recém-nascido, Filhote I e Filhote II.
  - Metal: recém-nascido, Filhote I e Filhote II.
  - Água: recém-nascido, Filhote I e Filhote II.
- Dragão de Fogo com rig em camadas:
  - corpo;
  - cabeça;
  - asa esquerda;
  - asa direita;
  - cauda;
  - aura de fogo.
- Animações por código para o Dragão de Fogo:
  - respiração;
  - cabeça viva;
  - asas oscilando;
  - cauda balançando;
  - aura pulsando;
  - brilho de chão.
- Animações de retrato para os outros dragões:
  - respiração;
  - flutuação suave;
  - aura elemental;
  - presença visual por ciclo.

## Stack

- Expo
- React Native
- TypeScript
- React Navigation
- React Native Reanimated
- Gesture Handler
- AsyncStorage
- Expo Linear Gradient
- Expo Blur
- Expo Haptics
- Expo AV

## Como rodar

```bash
npm install
npx expo start
```

## Como gerar APK via EAS

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

## Estrutura visual principal

```txt
src/assets/images/
├── scenes/
│   └── cradle_premium.png
├── egg/
│   └── primordial_egg_premium.png
├── effects/
│   └── fire_aura.png
└── dragons/
    ├── fire/
    │   ├── rig/
    │   │   ├── body.png
    │   │   ├── head.png
    │   │   ├── wing_left.png
    │   │   ├── wing_right.png
    │   │   └── tail.png
    │   └── stages/
    ├── wood/stages/
    ├── earth/stages/
    ├── metal/stages/
    └── water/stages/
```

## Componentes visuais importantes

- `src/components/cradle/ArcaneCradle.tsx`
  - Usa a arte premium do Berço Arcano como cenário principal.

- `src/components/egg/PrimordialEgg.tsx`
  - Usa a arte premium do Ovo Arcano Primordial com brilho, marcas e rachaduras por cima.

- `src/components/dragon/FireDragonRig.tsx`
  - Rig animado do Dragão de Fogo em camadas.

- `src/components/dragon/PremiumDragonPortrait.tsx`
  - Retratos premium por elemento e ciclo para dragões que ainda não têm rig separado.

- `src/components/dragon/DragonSprite.tsx`
  - Decide automaticamente qual visual usar:
    - Fogo: rig animado em camadas.
    - Outros elementos: arte completa animada por código.

## Observação importante sobre animação

As imagens são artes estáticas. A V2 dá vida a elas com animações por código: pulso, respiração, asa, cabeça, cauda, aura, brilho e partículas. Para animações perfeitas de movimento real, o próximo passo é criar spritesheets ou rigs profissionais em Spine/Rive/Lottie.

## Modo Dev

O modo dev permite:

- avançar 1 dia;
- gerar orbes;
- forçar nascimento;
- resetar estado.

Isso facilita testar a incubação, nascimento e ciclos de evolução sem esperar dias reais.

## Critérios preservados

- O jogador não escolhe dragão inicial.
- O jogo começa com o Ovo Arcano Primordial neutro.
- O Berço Arcano é neutro e independente.
- A linhagem só aparece no nascimento.
- O ninho verdadeiro só aparece após o nascimento.
- Comida só aparece depois que o dragão nasce.
- A regra “um aparelho, um ovo” continua como base de lore e sistema.

> Um vínculo não se copia. Um vínculo atravessa.
