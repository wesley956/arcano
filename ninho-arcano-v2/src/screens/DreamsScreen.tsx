import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { RitualPanel } from '@/components/ui/RitualPanel';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors } from '@/constants/colors';
import { elementName, shortDate } from '@/utils/format';
import { useGame } from '@/context/GameContext';

export function DreamsScreen() {
  const { state } = useGame();
  return (
    <AnimatedBackground variant="cosmic">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Sonhos" subtitle="O ovo e o filhote lembram símbolos antes de entender palavras." />
        {state.dreams.length === 0 ? (
          <Text style={styles.empty}>Nenhum sonho emergiu ainda. As orbes podem acordar imagens antigas.</Text>
        ) : state.dreams.map((dream) => (
          <RitualPanel key={dream.id} style={styles.card}>
            <Text style={styles.date}>{shortDate(dream.createdAt)} • {elementName(dream.element)}</Text>
            <Text style={styles.title}>{dream.title}</Text>
            <Text style={styles.text}>{dream.text}</Text>
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
  text: { color: colors.text, fontSize: 15, lineHeight: 23 },
  empty: { color: colors.muted, textAlign: 'center', paddingHorizontal: 24, marginTop: 40, lineHeight: 22 }
});
