import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { RitualPanel } from '@/components/ui/RitualPanel';
import { ArcaneButton } from '@/components/ui/ArcaneButton';
import { colors } from '@/constants/colors';
import { elementName } from '@/utils/format';
import { heritagePhrase } from '@/engine/cradleEngine';
import { useGame } from '@/context/GameContext';
import { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'TrueNestReveal'>;

export function TrueNestRevealScreen({ navigation }: Props) {
  const { state } = useGame();
  return (
    <AnimatedBackground variant="dragon">
      <View style={styles.wrap}>
        <Text style={styles.kicker}>NINHO VERDADEIRO</Text>
        <Text style={styles.title}>{state.dragon.nest}</Text>
        <RitualPanel style={styles.panel}>
          <Text style={styles.line}>Linhagem: <Text style={styles.strong}>{state.dragon.lineage}</Text></Text>
          <Text style={styles.line}>Energia primária: <Text style={styles.strong}>{elementName(state.dragon.primaryElement)}</Text></Text>
          <Text style={styles.line}>Energia secundária: <Text style={styles.strong}>{elementName(state.dragon.secondaryElement)}</Text></Text>
          <Text style={styles.line}>Talento inicial: <Text style={styles.strong}>{state.dragon.talent}</Text></Text>
          <Text style={styles.quote}>{heritagePhrase(state.cradle.heritageTraits)}</Text>
        </RitualPanel>
        <ArcaneButton title="Levar ao ninho" onPress={() => navigation.replace('DragonHome')} />
      </View>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    padding: 24
  },
  kicker: {
    color: colors.runeLit,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 4,
    textAlign: 'center'
  },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20
  },
  panel: {
    marginBottom: 22
  },
  line: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 8
  },
  strong: {
    color: colors.text,
    fontWeight: '800'
  },
  quote: {
    color: colors.runeLit,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '700'
  }
});
