import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { RitualPanel } from '@/components/ui/RitualPanel';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors } from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { shortDate } from '@/utils/format';

export function MemoriesScreen() {
  const { state } = useGame();
  return (
    <AnimatedBackground variant="dragon">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Diário Vivo" subtitle="Memórias poéticas do vínculo, não registros técnicos." />
        {state.memories.length === 0 ? (
          <Text style={styles.empty}>O silêncio ainda não escreveu sua primeira memória.</Text>
        ) : state.memories.map((memory) => (
          <RitualPanel key={memory.id} style={styles.card}>
            <Text style={styles.date}>{shortDate(memory.createdAt)} • {memory.kind}</Text>
            <Text style={styles.text}>{memory.text}</Text>
          </RitualPanel>
        ))}
      </ScrollView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 48,
    paddingBottom: 36
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 12
  },
  date: {
    color: colors.runeLit,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 8
  },
  text: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23
  },
  empty: {
    color: colors.muted,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 40
  }
});
