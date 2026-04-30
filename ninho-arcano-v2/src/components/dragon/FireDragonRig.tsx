import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { LifeStage } from '@/types/game';
import { useAnimatedPulse } from '@/hooks/useAnimatedPulse';

const fireRig = {
  body: require('@/assets/images/dragons/fire/rig/body.png'),
  head: require('@/assets/images/dragons/fire/rig/head.png'),
  leftWing: require('@/assets/images/dragons/fire/rig/wing_left.png'),
  rightWing: require('@/assets/images/dragons/fire/rig/wing_right.png'),
  tail: require('@/assets/images/dragons/fire/rig/tail.png'),
  aura: require('@/assets/images/effects/fire_aura.png')
};

type Props = {
  stage: LifeStage | null;
  onTouch?: () => void;
};

function getStageScale(stage: LifeStage | null) {
  if (stage === 'child_ii') return 1.15;
  if (stage === 'child_i') return 1.05;
  return 0.95;
}

export function FireDragonRig({ stage, onTouch }: Props) {
  const breath = useAnimatedPulse(2200);
  const wing = useAnimatedPulse(1500);
  const tail = useAnimatedPulse(2600);
  const aura = useAnimatedPulse(1800);
  const touchPulse = useAnimatedPulse(920);
  const stageScale = useMemo(() => getStageScale(stage), [stage]);

  const bodyStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(breath.value, [0, 1], [4, -4]) },
      { scale: interpolate(breath.value, [0, 1], [stageScale, stageScale * 1.018]) }
    ]
  }));

  const auraStyle = useAnimatedStyle(() => ({
    opacity: interpolate(aura.value, [0, 1], [0.18, 0.42]),
    transform: [{ scale: interpolate(aura.value, [0, 1], [0.9, 1.05]) }]
  }));

  const headStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(breath.value, [0, 1], [2, -5]) },
      { rotate: `${interpolate(touchPulse.value, [0, 1], [-1.6, 1.4])}deg` },
      { scale: interpolate(breath.value, [0, 1], [1, 1.012]) }
    ]
  }));

  const leftWingStyle = useAnimatedStyle(() => ({
    opacity: 0.96,
    transform: [
      { translateX: interpolate(wing.value, [0, 1], [4, -2]) },
      { translateY: interpolate(wing.value, [0, 1], [2, -4]) },
      { rotate: `${interpolate(wing.value, [0, 1], [-10, -17])}deg` },
      { scale: interpolate(wing.value, [0, 1], [0.86, 0.91]) }
    ]
  }));

  const rightWingStyle = useAnimatedStyle(() => ({
    opacity: 0.96,
    transform: [
      { scaleX: -1 },
      { translateX: interpolate(wing.value, [0, 1], [-4, 2]) },
      { translateY: interpolate(wing.value, [0, 1], [2, -4]) },
      { rotate: `${interpolate(wing.value, [0, 1], [10, 17])}deg` },
      { scale: interpolate(wing.value, [0, 1], [0.86, 0.91]) }
    ]
  }));

  const tailStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(tail.value, [0, 1], [-6, 6]) },
      { translateY: interpolate(tail.value, [0, 1], [2, -2]) },
      { rotate: `${interpolate(tail.value, [0, 1], [-7, 5])}deg` },
      { scale: 0.72 }
    ]
  }));

  return (
    <Pressable onPress={onTouch} style={styles.touchArea}>
      <View style={styles.stage} pointerEvents="none">
        <Animated.Image source={fireRig.aura} resizeMode="contain" style={[styles.aura, auraStyle]} />
        <Animated.Image source={fireRig.tail} resizeMode="contain" style={[styles.tail, tailStyle]} />
        <Animated.Image source={fireRig.leftWing} resizeMode="contain" style={[styles.leftWing, leftWingStyle]} />
        <Animated.Image source={fireRig.rightWing} resizeMode="contain" style={[styles.rightWing, rightWingStyle]} />
        <Animated.View style={[styles.bodyGroup, bodyStyle]}>
          <Image source={fireRig.body} resizeMode="contain" style={styles.body} />
          <Animated.Image source={fireRig.head} resizeMode="contain" style={[styles.head, headStyle]} />
        </Animated.View>
        <View style={styles.floorGlow} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  touchArea: {
    height: 390,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible'
  },
  stage: {
    width: 360,
    height: 370,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible'
  },
  aura: {
    position: 'absolute',
    width: 330,
    height: 330,
    bottom: 18
  },
  leftWing: {
    position: 'absolute',
    width: 185,
    height: 160,
    left: 12,
    top: 110
  },
  rightWing: {
    position: 'absolute',
    width: 185,
    height: 160,
    right: 12,
    top: 110
  },
  tail: {
    position: 'absolute',
    width: 230,
    height: 160,
    right: 18,
    bottom: 64
  },
  bodyGroup: {
    position: 'absolute',
    width: 230,
    height: 270,
    left: 64,
    bottom: 42,
    alignItems: 'center'
  },
  body: {
    position: 'absolute',
    width: 192,
    height: 195,
    bottom: 0
  },
  head: {
    position: 'absolute',
    width: 134,
    height: 190,
    top: -4,
    left: 42
  },
  floorGlow: {
    position: 'absolute',
    bottom: 46,
    width: 205,
    height: 34,
    borderRadius: 120,
    backgroundColor: 'rgba(249,115,22,0.22)',
    shadowColor: '#F97316',
    shadowOpacity: 0.65,
    shadowRadius: 18
  }
});
