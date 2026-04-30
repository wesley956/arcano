import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { FoodOffering } from '@/components/dragon/FoodOffering';
import { WhisperText } from '@/components/ui/WhisperText';
import { colors } from '@/constants/colors';
import { officialPhrases } from '@/constants/lore';
import { foods, useGame } from '@/context/GameContext';
import { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Feeding'>;

export function FeedingScreen(_props: Props) {
  const { state, feedDragon } = useGame();
  return (
    <AnimatedBackground variant="dragon">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Cuidados</Text>
        <Text style={styles.subtitle}>O ovo não come. A comida só sustenta a vida depois do nascimento.</Text>
        <WhisperText text={state.ui.lastWhisper ?? officialPhrases.food} />
        <View style={styles.grid}>
          {foods.map((food) => <FoodOffering key={food.id} food={food} onOffer={feedDragon} />)}
        </View>
        <Text style={styles.note}>Toque em uma oferta. Na próxima versão visual, esta tela pode trocar o toque por gesto arrastável até a boca do filhote.</Text>
      </ScrollView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 36
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center'
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20
  },
  note: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.72,
    textAlign: 'center',
    marginTop: 12
  }
});
