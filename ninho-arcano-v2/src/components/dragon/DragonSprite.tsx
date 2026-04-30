import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { elementColors } from '@/constants/colors';
import { ElementKey, LifeStage } from '@/types/game';
import { useAnimatedPulse } from '@/hooks/useAnimatedPulse';
import { FireDragonRig } from './FireDragonRig';
import { PremiumDragonPortrait } from './PremiumDragonPortrait';

export function DragonSprite({ element, stage, onTouch }: { element: ElementKey | null; stage: LifeStage | null; onTouch?: () => void }) {
  if (element === 'fire') {
    return <FireDragonRig stage={stage} onTouch={onTouch} />;
  }

  if (element) {
    return <PremiumDragonPortrait element={element} stage={stage} onTouch={onTouch} />;
  }

  return <ProceduralDragon element={element} stage={stage} onTouch={onTouch} />;
}

function ProceduralDragon({ element, stage, onTouch }: { element: ElementKey | null; stage: LifeStage | null; onTouch?: () => void }) {
  const color = element ? elementColors[element] : '#C8B8A0';
  const pulse = useAnimatedPulse(2600);
  const size = stage === 'child_ii' ? 1.32 : stage === 'child_i' ? 1.15 : 1;
  const breath = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pulse.value, [0, 1], [size, size * 1.025]) }]
  }));

  return (
    <Pressable onPress={onTouch} style={styles.touchArea}>
      <Animated.View style={[styles.dragon, breath]}>
        <View style={[styles.aura, { backgroundColor: color }]} />
        <View style={[styles.wing, styles.leftWing, { borderRightColor: color }]} />
        <View style={[styles.wing, styles.rightWing, { borderLeftColor: color }]} />
        <LinearGradient colors={[color, '#1F2937']} style={styles.body} />
        <View style={[styles.belly, { backgroundColor: 'rgba(248,241,231,0.22)' }]} />
        <View style={[styles.head, { backgroundColor: color }]}>
          <View style={styles.eyeLeft} />
          <View style={styles.eyeRight} />
          <View style={styles.hornLeft} />
          <View style={styles.hornRight} />
        </View>
        <View style={[styles.tail, { backgroundColor: color }]} />
        <Text style={styles.stageMark}>{stage === 'child_ii' ? 'II' : stage === 'child_i' ? 'I' : '✦'}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  touchArea: {
    height: 310,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dragon: {
    width: 220,
    height: 230,
    alignItems: 'center',
    justifyContent: 'center'
  },
  aura: {
    position: 'absolute',
    width: 210,
    height: 170,
    borderRadius: 120,
    opacity: 0.16
  },
  body: {
    width: 112,
    height: 130,
    borderRadius: 58,
    borderWidth: 1,
    borderColor: 'rgba(248,241,231,0.18)'
  },
  belly: {
    position: 'absolute',
    top: 92,
    width: 54,
    height: 74,
    borderRadius: 36
  },
  head: {
    position: 'absolute',
    top: 32,
    width: 92,
    height: 78,
    borderRadius: 46,
    borderWidth: 1,
    borderColor: 'rgba(248,241,231,0.18)'
  },
  eyeLeft: {
    position: 'absolute',
    left: 26,
    top: 30,
    width: 8,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#0B1020'
  },
  eyeRight: {
    position: 'absolute',
    right: 26,
    top: 30,
    width: 8,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#0B1020'
  },
  hornLeft: {
    position: 'absolute',
    left: 16,
    top: -15,
    width: 12,
    height: 28,
    borderRadius: 12,
    backgroundColor: '#E6D1B1',
    transform: [{ rotate: '-26deg' }]
  },
  hornRight: {
    position: 'absolute',
    right: 16,
    top: -15,
    width: 12,
    height: 28,
    borderRadius: 12,
    backgroundColor: '#E6D1B1',
    transform: [{ rotate: '26deg' }]
  },
  wing: {
    position: 'absolute',
    top: 88,
    width: 0,
    height: 0,
    borderTopWidth: 50,
    borderBottomWidth: 50,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    opacity: 0.62
  },
  leftWing: {
    left: 16,
    borderRightWidth: 78,
    transform: [{ rotate: '-10deg' }]
  },
  rightWing: {
    right: 16,
    borderLeftWidth: 78,
    transform: [{ rotate: '10deg' }]
  },
  tail: {
    position: 'absolute',
    bottom: 24,
    right: 56,
    width: 78,
    height: 18,
    borderRadius: 20,
    transform: [{ rotate: '-24deg' }]
  },
  stageMark: {
    position: 'absolute',
    bottom: 44,
    color: '#F8F1E7',
    fontSize: 16,
    fontWeight: '800'
  }
});
