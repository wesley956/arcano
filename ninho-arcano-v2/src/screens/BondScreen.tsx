import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { ArcaneButton } from '@/components/ui/ArcaneButton';
import { RitualPanel } from '@/components/ui/RitualPanel';
import { officialPhrases } from '@/constants/lore';
import { colors } from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Bond'>;

export function BondScreen({ navigation }: Props) {
  const { acceptBond } = useGame();
  const onAccept = () => {
    acceptBond();
    navigation.replace('Cradle');
  };

  return (
    <AnimatedBackground variant="cradle">
      <View style={styles.wrap}>
        <Text style={styles.symbol}>◇</Text>
        <Text style={styles.title}>Aceitar o vínculo</Text>
        <RitualPanel style={styles.panel}>
          <Text style={styles.text}>Este aparelho pode sustentar apenas um Ovo Arcano Primordial.</Text>
          <Text style={styles.text}>Ao aceitar o vínculo, este ovo passará a existir aqui.</Text>
          <Text style={styles.text}>Enquanto ele permanecer neste aparelho, nenhum outro ovo poderá surgir.</Text>
          <Text style={styles.text}>A única forma de liberar este aparelho é realizar a Travessia.</Text>
          <Text style={styles.quote}>{officialPhrases.crossing}</Text>
        </RitualPanel>
        <ArcaneButton title="Aceitar o vínculo" onPress={onAccept} style={styles.button} />
        <ArcaneButton title="Ainda não" variant="ghost" onPress={() => navigation.replace('Intro')} />
      </View>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    padding: 22
  },
  symbol: {
    color: colors.runeLit,
    fontSize: 44,
    textAlign: 'center',
    marginBottom: 6
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 18
  },
  panel: {
    marginBottom: 22
  },
  text: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12
  },
  quote: {
    color: colors.runeLit,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 8
  },
  button: {
    marginBottom: 12
  }
});
