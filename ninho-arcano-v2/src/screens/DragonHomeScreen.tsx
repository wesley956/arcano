import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { DragonSprite } from '@/components/dragon/DragonSprite';
import { RitualPanel } from '@/components/ui/RitualPanel';
import { WhisperText } from '@/components/ui/WhisperText';
import { colors } from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { getDragonAgeYears } from '@/engine/ageEngine';
import { stageLabel } from '@/utils/format';
import { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'DragonHome'>;

export function DragonHomeScreen({ navigation }: Props) {
  const { state, touchDragon } = useGame();
  const age = getDragonAgeYears(state);
  return (
    <AnimatedBackground variant="dragon">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{state.dragon.name ?? 'Filhote sem nome'}</Text>
        <Text style={styles.subtitle}>{stageLabel(state.dragon.stage)} • {age} anos dracônicos</Text>
        <DragonSprite element={state.dragon.primaryElement} stage={state.dragon.stage} onTouch={touchDragon} />
        <WhisperText text={state.ui.lastWhisper ?? 'Ele respira devagar. O mundo ainda é novo para seus olhos.'} />
        <RitualPanel style={styles.panel}>
          <Text style={styles.line}>Linhagem: <Text style={styles.strong}>{state.dragon.lineage}</Text></Text>
          <Text style={styles.line}>Ninho: <Text style={styles.strong}>{state.dragon.nest}</Text></Text>
          <Text style={styles.line}>Talento: <Text style={styles.strong}>{state.dragon.talent}</Text></Text>
          <Text style={styles.line}>Humor: <Text style={styles.strong}>{state.dragon.mood === 'hungry' ? 'com fome' : state.dragon.mood === 'sleepy' ? 'sonolento' : state.dragon.mood === 'content' ? 'contente' : 'curioso'}</Text></Text>
          <Text style={styles.soft}>A fome, saúde e vínculo existem por dentro. Aqui, eles aparecem como comportamento e presença.</Text>
        </RitualPanel>
        <View style={styles.navGrid}>
          <HomeGem label="Cuidados" onPress={() => navigation.navigate('Feeding')} />
          <HomeGem label="Memórias" onPress={() => navigation.navigate('Memories')} />
          <HomeGem label="Ecos" onPress={() => navigation.navigate('Echoes')} />
          <HomeGem label="Sonhos" onPress={() => navigation.navigate('Dreams')} />
          <HomeGem label="Travessia" onPress={() => navigation.navigate('Travessia')} />
          <HomeGem label="Ajustes" onPress={() => navigation.navigate('Settings')} />
        </View>
      </ScrollView>
    </AnimatedBackground>
  );
}

function HomeGem({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.gem, pressed && { opacity: 0.72 }] }>
      <Text style={styles.gemText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 60,
    paddingBottom: 34,
    paddingHorizontal: 20
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center'
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 4
  },
  panel: {
    marginTop: 18
  },
  line: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 23,
    marginBottom: 7
  },
  strong: {
    color: colors.text,
    fontWeight: '800'
  },
  soft: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    opacity: 0.82
  },
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18
  },
  gem: {
    width: '48%',
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: 'rgba(255,213,138,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,213,138,0.18)',
    alignItems: 'center'
  },
  gemText: {
    color: colors.text,
    fontWeight: '800'
  }
});
