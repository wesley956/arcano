import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '@/constants/colors';

export function RitualPanel({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <BlurView intensity={24} tint="dark" style={[styles.panel, style]}>
      <View style={styles.inner}>{children}</View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,213,138,0.18)',
    backgroundColor: colors.glass
  },
  inner: {
    padding: 18
  }
});
