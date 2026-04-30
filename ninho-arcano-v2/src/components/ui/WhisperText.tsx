import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { colors } from '@/constants/colors';

export function WhisperText({ text }: { text: string | null }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const lift = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    opacity.setValue(0);
    lift.setValue(14);
    if (!text) return;
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(lift, { toValue: 0, duration: 700, useNativeDriver: true })
    ]).start();
  }, [text, opacity, lift]);

  if (!text) return null;

  return (
    <Animated.View style={[styles.wrap, { opacity, transform: [{ translateY: lift }] }]}> 
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 22,
    backgroundColor: 'rgba(9,11,18,0.54)',
    borderWidth: 1,
    borderColor: 'rgba(255,213,138,0.18)'
  },
  text: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center'
  }
});
