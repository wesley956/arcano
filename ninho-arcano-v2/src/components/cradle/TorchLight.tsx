import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '@/constants/colors';

export function TorchLight({ side = 'left' }: { side?: 'left' | 'right' }) {
  const flicker = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flicker, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 0.3, duration: 600, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 0.8, duration: 700, useNativeDriver: true })
      ])
    ).start();
  }, [flicker]);

  return (
    <View style={[styles.wrap, side === 'left' ? styles.left : styles.right]}>
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: flicker.interpolate({ inputRange: [0, 1], outputRange: [0.28, 0.72] }),
            transform: [{ scale: flicker.interpolate({ inputRange: [0, 1], outputRange: [0.82, 1.12] }) }]
          }
        ]}
      />
      <View style={styles.stick} />
      <Animated.View
        style={[
          styles.flame,
          {
            opacity: flicker.interpolate({ inputRange: [0, 1], outputRange: [0.72, 1] }),
            transform: [{ scaleY: flicker.interpolate({ inputRange: [0, 1], outputRange: [0.82, 1.18] }) }]
          }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 118,
    alignItems: 'center'
  },
  left: { left: 28 },
  right: { right: 28 },
  glow: {
    position: 'absolute',
    top: -34,
    width: 112,
    height: 112,
    borderRadius: 70,
    backgroundColor: colors.torch
  },
  stick: {
    width: 8,
    height: 54,
    borderRadius: 8,
    backgroundColor: '#4A3120',
    marginTop: 20
  },
  flame: {
    position: 'absolute',
    top: 0,
    width: 22,
    height: 36,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: colors.torch,
    transform: [{ rotate: '45deg' }]
  }
});
