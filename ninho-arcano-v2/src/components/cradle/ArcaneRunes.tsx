import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';

const glyphs = ['ᚱ', 'ᚨ', 'ᛟ', 'ᛉ', 'ᛗ', 'ᚾ', 'ᛞ', 'ᚲ', 'ᚷ', 'ᛇ'];

export function ArcaneRunes({ intensity = 0.25 }: { intensity?: number }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const items = useMemo(() => glyphs.map((glyph, index) => ({ glyph, rotate: `${index * 23 - 80}deg`, left: 20 + (index % 5) * 62, top: 28 + Math.floor(index / 5) * 190 })), []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 2600, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 2600, useNativeDriver: true })
      ])
    ).start();
  }, [pulse]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {items.map((item, index) => (
        <Animated.Text
          key={`${item.glyph}-${index}`}
          style={[
            styles.rune,
            {
              left: item.left,
              top: item.top,
              transform: [{ rotate: item.rotate }],
              opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.08 + intensity * 0.3, 0.16 + intensity * 0.7] })
            }
          ]}
        >
          {item.glyph}
        </Animated.Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  rune: {
    position: 'absolute',
    color: colors.runeLit,
    fontSize: 28,
    textShadowColor: colors.torch,
    textShadowRadius: 10
  }
});
