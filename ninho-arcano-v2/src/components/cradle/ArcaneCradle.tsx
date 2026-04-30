import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, elementColors } from '@/constants/colors';
import { ElementKey } from '@/types/game';
import { useAnimatedPulse } from '@/hooks/useAnimatedPulse';
import { ArcaneRunes } from './ArcaneRunes';
import { TorchLight } from './TorchLight';

const { width, height } = Dimensions.get('window');
const cradleArt = require('@/assets/images/scenes/cradle_premium.png');

export function ArcaneCradle({ intensity }: { intensity: Record<ElementKey, number> }) {
  const totalIntensity = Object.values(intensity).reduce((sum, value) => sum + value, 0) / 5;
  const pulse = useAnimatedPulse(2500);
  const lightStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 1], [0.22, 0.54]),
    transform: [{ scale: interpolate(pulse.value, [0, 1], [0.92, 1.08]) }]
  }));

  return (
    <View style={styles.scene} pointerEvents="none">
      <ImageBackground source={cradleArt} resizeMode="cover" style={styles.imageBg} imageStyle={styles.image}>
        <LinearGradient colors={['rgba(9,11,18,0.1)', 'rgba(9,11,18,0.16)', 'rgba(9,11,18,0.64)']} style={StyleSheet.absoluteFillObject} />
        <Animated.View style={[styles.centerGlow, lightStyle]} />
        <ArcaneRunes intensity={0.12 + totalIntensity} />
        {(Object.keys(intensity) as ElementKey[]).map((element, index) => (
          <View
            key={element}
            style={[
              styles.elementMist,
              {
                backgroundColor: elementColors[element],
                opacity: intensity[element] * 0.16,
                left: width * (0.1 + index * 0.18)
              }
            ]}
          />
        ))}
        <TorchLight side="left" />
        <TorchLight side="right" />
        <View style={styles.floorFocus} />
        <View style={styles.pedestalLight} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: colors.deep
  },
  imageBg: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  image: {
    opacity: 0.96
  },
  centerGlow: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: height * 0.2,
    width: width * 0.78,
    height: width * 0.78,
    borderRadius: width,
    backgroundColor: 'rgba(255,213,138,0.32)',
    shadowColor: colors.runeLit,
    shadowOpacity: 0.65,
    shadowRadius: 36
  },
  elementMist: {
    position: 'absolute',
    bottom: 134,
    width: 80,
    height: 240,
    borderRadius: 100
  },
  floorFocus: {
    position: 'absolute',
    left: width / 2 - 145,
    bottom: 105,
    width: 290,
    height: 84,
    borderRadius: 160,
    backgroundColor: 'rgba(0,0,0,0.34)'
  },
  pedestalLight: {
    position: 'absolute',
    left: width / 2 - 104,
    bottom: 142,
    width: 208,
    height: 100,
    borderRadius: 120,
    backgroundColor: 'rgba(242,179,91,0.18)'
  }
});
