# V2 Visual Premium — Ninho Arcano

Esta versão melhora a experiência visual do jogo usando arte final dentro do app.

## Melhorias implementadas

1. **Berço Arcano real**
   - A caverna ritualística agora usa uma arte premium em vez de apenas formas procedurais.
   - Continua neutra, bege, sagrada, silenciosa e sem revelar elemento.

2. **Ovo Arcano Primordial real**
   - O ovo agora usa arte premium.
   - As marcas elementais e rachaduras continuam sendo aplicadas por código, por cima da arte.

3. **Dragões por ciclo**
   - Cada elemento possui arte para Recém-nascido, Filhote I e Filhote II.
   - A mudança de fase é visualmente clara.

4. **Dragão de Fogo em camadas**
   - O Fogo foi preparado como o primeiro dragão realmente animável por partes.
   - Camadas separadas: corpo, cabeça, asa esquerda, asa direita, cauda e aura.

5. **Animações aplicadas**
   - Respiração.
   - Oscilação de cabeça.
   - Movimento de asas.
   - Movimento de cauda.
   - Aura pulsante.
   - Brilho elemental no chão.

## Próximo upgrade recomendado

Para deixar todos os dragões no mesmo nível do Fogo, gerar rigs separados para:

- Madeira;
- Terra;
- Metal;
- Água.

Cada rig deve seguir o padrão:

```txt
body.png
head.png
wing_left.png
wing_right.png
tail.png
aura.png
```

Depois disso, o componente `DragonSprite.tsx` pode direcionar cada elemento para seu próprio rig.
