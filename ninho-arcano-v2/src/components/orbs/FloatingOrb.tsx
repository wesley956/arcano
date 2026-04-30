import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { ElementKey, DropTarget } from '@/types/game';
import { elementLabels } from '@/constants/elements';
import { elementColors } from '@/constants/colors';

type Props = {
  id: string;
  element: ElementKey;
  x: number;
  y: number;
  onDrop: (id: string, element: ElementKey, target: DropTarget) => void;
  resolveDropTarget: (absoluteX: number, absoluteY: number) => DropTarget;
};

export function FloatingOrb({ id, element, x, y, onDrop, resolveDropTarget }: Props) {
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handleEnd = (absoluteX: number, absoluteY: number) => {
    const target = resolveDropTarget(absoluteX, absoluteY);
    onDrop(id, element, target);
  };

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withSpring(1.18);
    })
    .onUpdate((event) => {
      tx.value = event.translationX;
      ty.value = event.translationY;
    })
    .onEnd((event) => {
      runOnJS(handleEnd)(event.absoluteX, event.absoluteY);
      tx.value = withSpring(0);
      ty.value = withSpring(0);
      scale.value = withSpring(1);
      opacity.value = withTiming(1, { duration: 260 });
    });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }, { scale: scale.value }],
    opacity: opacity.value
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.orb, { left: x, top: y, borderColor: elementColors[element] }, style]}>
        <Animated.View style={[styles.core, { backgroundColor: elementColors[element] }]} />
        <Text style={styles.label}>{elementLabels[element]}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    width: 76,
    height: 76,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(9,11,18,0.35)'
  },
  core: {
    width: 42,
    height: 42,
    borderRadius: 30,
    opacity: 0.86,
    shadowOpacity: 0.9,
    shadowRadius: 16
  },
  label: {
    position: 'absolute',
    bottom: -18,
    color: '#F8F1E7',
    fontSize: 10,
    fontWeight: '700'
  }
});
