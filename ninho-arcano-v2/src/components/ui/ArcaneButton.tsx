import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';

export function ArcaneButton({ title, onPress, variant = 'primary', disabled = false, style }: { title: string; onPress: () => void; variant?: 'primary' | 'ghost' | 'danger'; disabled?: boolean; style?: ViewStyle }) {
  const gradient = variant === 'danger'
    ? ['#7F1D1D', '#BE123C']
    : variant === 'ghost'
      ? ['rgba(248,241,231,0.08)', 'rgba(248,241,231,0.03)']
      : ['#7C3AED', '#F2B35B'];

  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [styles.pressable, style, pressed && styles.pressed, disabled && styles.disabled]}>
      <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 22,
    overflow: 'hidden'
  },
  button: {
    minHeight: 54,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,213,138,0.28)'
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
    textAlign: 'center'
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.9
  },
  disabled: {
    opacity: 0.42
  }
});
