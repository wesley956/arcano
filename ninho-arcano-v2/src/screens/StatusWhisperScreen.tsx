import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { RitualPanel } from '@/components/ui/RitualPanel';
import { colors } from '@/constants/colors';
import { useGame } from '@/context/GameContext';

export function StatusWhisperScreen() {
  const { state } = useGame();
  return (
    <AnimatedBackground variant="dragon">
      <View style={styles.wrap}>
        <RitualPanel>
          <Text style={styles.title}>Sussurro de estado</Text>
          <Text style={styles.text}>{state.ui.lastWhisper ?? 'A vida continua em silêncio. Nem todo cuidado precisa virar número.'}</Text>
        </RitualPanel>
      </View>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { color: colors.runeLit, fontSize: 22, fontWeight: '900', textAlign: 'center', marginBottom: 12 },
  text: { color: colors.text, fontSize: 16, lineHeight: 25, textAlign: 'center' }
});
