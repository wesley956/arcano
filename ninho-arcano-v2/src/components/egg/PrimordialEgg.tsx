import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { colors, elementColors } from '@/constants/colors';
import { ElementKey, EggMood } from '@/types/game';
import { useAnimatedPulse } from '@/hooks/useAnimatedPulse';

const eggArt = require('@/assets/images/egg/primordial_egg_premium.png');

type Props = {
  marks: Record<ElementKey, number>;
  crackLevel: number;
  mood: EggMood;
};

export function PrimordialEgg({ marks, crackLevel, mood }: Props) {
  const pulse = useAnimatedPulse(mood === 'near_birth' ? 900 : 2200);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pulse.value, [0, 1], [1, mood === 'near_birth' ? 1.06 : 1.024]) }]
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 1], [0.18, mood === 'near_birth' ? 0.78 : 0.42]),
    transform: [{ scale: interpolate(pulse.value, [0, 1], [0.92, 1.08]) }]
  }));

  return (
    <View style={styles.wrap} pointerEvents="none">
      <Animated.View style={[styles.glow, glowStyle]} />
      <Animated.View style={[styles.eggWrap, animatedStyle]}>
        <Image source={eggArt} resizeMode="contain" style={styles.image} />
        {(Object.keys(marks) as ElementKey[]).map((element, index) => (
          <View
            key={element}
            style={[
              styles.mark,
              {
                backgroundColor: elementColors[element],
                opacity: marks[element] * 0.33,
                transform: [{ rotate: `${-32 + index * 17}deg` }],
                left: 74 + (index % 2) * 42,
                top: 82 + index * 20
              }
            ]}
          />
        ))}
        {crackLevel >= 1 ? <View style={[styles.crack, styles.crackOne]} /> : null}
        {crackLevel >= 2 ? <View style={[styles.crack, styles.crackTwo]} /> : null}
        {crackLevel >= 3 ? <View style={[styles.crack, styles.crackThree]} /> : null}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 148,
    width: 230,
    height: 295,
    alignItems: 'center',
    justifyContent: 'center'
  },
  glow: {
    position: 'absolute',
    width: 218,
    height: 218,
    borderRadius: 160,
    backgroundColor: colors.runeLit,
    shadowColor: colors.runeLit,
    shadowOpacity: 0.6,
    shadowRadius: 24
  },
  eggWrap: {
    width: 218,
    height: 286,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 218,
    height: 286
  },
  mark: {
    position: 'absolute',
    width: 14,
    height: 110,
    borderRadius: 30
  },
  crack: {
    position: 'absolute',
    width: 2,
    backgroundColor: 'rgba(255,245,215,0.74)',
    borderRadius: 4,
    shadowColor: '#FFF0CC',
    shadowOpacity: 0.8,
    shadowRadius: 8
  },
  crackOne: { left: 112, top: 58, height: 52, transform: [{ rotate: '-16deg' }] },
  crackTwo: { left: 128, top: 96, height: 60, transform: [{ rotate: '20deg' }] },
  crackThree: { left: 92, top: 142, height: 64, transform: [{ rotate: '-26deg' }] }
});
