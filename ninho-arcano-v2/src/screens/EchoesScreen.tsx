import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { RitualPanel } from '@/components/ui/RitualPanel';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors } from '@/constants/colors';
import { shortDate } from '@/utils/format';
import { useGame } from '@/context/GameContext';

export function EchoesScreen() {
  const { state } = useGame();
  return (
    <AnimatedBackground variant="cosmic">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Ecos de Vaelun" subtitle="Fragmentos do universo que caiu, guardados como vozes pequenas." />
        {state.echoes.map((echo) => (
          <RitualPanel key={echo.id} style={styles.card}>
            <Text style={styles.date}>{shortDate(echo.createdAt)}</Text>
            <Text style={styles.title}>{echo.title}</Text>
            <Text style={styles.text}>{echo.text}</Text>
          </RitualPanel>
        ))}
      </ScrollView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 48, paddingBottom: 36 },
  card: { marginHorizontal: 20, marginBottom: 12 },
  date: { color: colors.runeLit, fontSize: 12, fontWeight: '800', marginBottom: 8 },
  title: { color: colors.text, fontSize: 18, fontWeight: '900', marginBottom: 8 },
  text: { color: colors.text, fontSize: 15, lineHeight: 23 }
});
