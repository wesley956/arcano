import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';

const { width, height } = Dimensions.get('window');

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
};

export function AnimatedBackground({ variant = 'cosmic', children }: { variant?: 'cosmic' | 'cradle' | 'dragon'; children?: React.ReactNode }) {
  const shimmer = useRef(new Animated.Value(0)).current;
  const particles = useMemo<Particle[]>(() => Array.from({ length: 34 }).map((_, index) => ({
    id: index,
    x: Math.random() * width,
    y: Math.random() * height,
    size: 1 + Math.random() * 3,
    opacity: 0.18 + Math.random() * 0.48,
    duration: 5000 + Math.random() * 9000
  })), []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 5000, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 5000, useNativeDriver: true })
      ])
    ).start();
  }, [shimmer]);

  const gradient = variant === 'cradle'
    ? [colors.deep, colors.night, '#19120E']
    : variant === 'dragon'
      ? [colors.deep, '#0B1422', '#111827']
      : [colors.deep, '#070A15', '#120B24'];

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradient} style={StyleSheet.absoluteFill} />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.arcaneGlow,
          {
            opacity: shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.16, 0.42] }),
            transform: [{ scale: shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1.08] }) }]
          }
        ]}
      />
      {particles.map((particle) => (
        <FloatingParticle key={particle.id} particle={particle} />
      ))}
      {children}
    </View>
  );
}

function FloatingParticle({ particle }: { particle: Particle }) {
  const drift = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(drift, { toValue: 1, duration: particle.duration, useNativeDriver: true }),
        Animated.timing(drift, { toValue: 0, duration: particle.duration, useNativeDriver: true })
      ])
    ).start();
  }, [drift, particle.duration]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.particle,
        {
          left: particle.x,
          top: particle.y,
          width: particle.size,
          height: particle.size,
          opacity: particle.opacity,
          transform: [
            { translateY: drift.interpolate({ inputRange: [0, 1], outputRange: [0, -48] }) },
            { translateX: drift.interpolate({ inputRange: [0, 1], outputRange: [0, 18] }) }
          ]
        }
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.deep,
    overflow: 'hidden'
  },
  arcaneGlow: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width,
    backgroundColor: colors.arcane,
    top: height * 0.08,
    left: -width * 0.1
  },
  particle: {
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: colors.runeLit
  }
});
