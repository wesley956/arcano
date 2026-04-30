import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { elementColors } from '@/constants/colors';
import { ElementKey, LifeStage } from '@/types/game';
import { useAnimatedPulse } from '@/hooks/useAnimatedPulse';

const dragonPortraits: Record<ElementKey, Record<'newborn' | 'child_i' | 'child_ii', number>> = {
  wood: {
    newborn: require('@/assets/images/dragons/wood/stages/wood_newborn_full.png'),
    child_i: require('@/assets/images/dragons/wood/stages/wood_child_i_full.png'),
    child_ii: require('@/assets/images/dragons/wood/stages/wood_child_ii_full.png')
  },
  fire: {
    newborn: require('@/assets/images/dragons/fire/stages/fire_newborn_full.png'),
    child_i: require('@/assets/images/dragons/fire/stages/fire_child_i_full.png'),
    child_ii: require('@/assets/images/dragons/fire/stages/fire_child_ii_full.png')
  },
  earth: {
    newborn: require('@/assets/images/dragons/earth/stages/earth_newborn_full.png'),
    child_i: require('@/assets/images/dragons/earth/stages/earth_child_i_full.png'),
    child_ii: require('@/assets/images/dragons/earth/stages/earth_child_ii_full.png')
  },
  metal: {
    newborn: require('@/assets/images/dragons/metal/stages/metal_newborn_full.png'),
    child_i: require('@/assets/images/dragons/metal/stages/metal_child_i_full.png'),
    child_ii: require('@/assets/images/dragons/metal/stages/metal_child_ii_full.png')
  },
  water: {
    newborn: require('@/assets/images/dragons/water/stages/water_newborn_full.png'),
    child_i: require('@/assets/images/dragons/water/stages/water_child_i_full.png'),
    child_ii: require('@/assets/images/dragons/water/stages/water_child_ii_full.png')
  }
};

function stageKey(stage: LifeStage | null): 'newborn' | 'child_i' | 'child_ii' {
  if (stage === 'child_ii') return 'child_ii';
  if (stage === 'child_i') return 'child_i';
  return 'newborn';
}

export function PremiumDragonPortrait({ element, stage, onTouch }: { element: ElementKey; stage: LifeStage | null; onTouch?: () => void }) {
  const pulse = useAnimatedPulse(2600);
  const color = elementColors[element];
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(pulse.value, [0, 1], [5, -5]) },
      { scale: interpolate(pulse.value, [0, 1], [1, 1.018]) }
    ]
  }));
  const auraStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 1], [0.13, 0.26]),
    transform: [{ scale: interpolate(pulse.value, [0, 1], [0.92, 1.06]) }]
  }));

  return (
    <Pressable onPress={onTouch} style={styles.touchArea}>
      <View style={styles.wrap} pointerEvents="none">
        <Animated.View style={[styles.aura, { backgroundColor: color }, auraStyle]} />
        <Animated.Image source={dragonPortraits[element][stageKey(stage)]} resizeMode="contain" style={[styles.image, animatedStyle]} />
        <View style={[styles.floorGlow, { backgroundColor: color }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  touchArea: {
    height: 390,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrap: {
    width: 360,
    height: 390,
    alignItems: 'center',
    justifyContent: 'center'
  },
  aura: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 180,
    shadowOpacity: 0.4,
    shadowRadius: 24
  },
  image: {
    width: 350,
    height: 370
  },
  floorGlow: {
    position: 'absolute',
    bottom: 44,
    width: 210,
    height: 34,
    borderRadius: 100,
    opacity: 0.18
  }
});
