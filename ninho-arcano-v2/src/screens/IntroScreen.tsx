import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { ArcaneButton } from '@/components/ui/ArcaneButton';
import { introSequence, officialPhrases } from '@/constants/lore';
import { colors } from '@/constants/colors';
import { timings } from '@/constants/timings';
import { useGame } from '@/context/GameContext';
import { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Intro'>;

export function IntroScreen({ navigation }: Props) {
  const { finishIntro } = useGame();
  const [index, setIndex] = useState(0);
  const fade = useRef(new Animated.Value(0)).current;
  const eggTravel = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(eggTravel, { toValue: 1, duration: 8000, useNativeDriver: true }),
        Animated.timing(eggTravel, { toValue: 0, duration: 800, useNativeDriver: true })
      ])
    ).start();
  }, [eggTravel]);

  useEffect(() => {
    fade.setValue(0);
    Animated.sequence([
      Animated.timing(fade, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.delay(timings.introPhraseMs - 1200),
      Animated.timing(fade, { toValue: 0.18, duration: 500, useNativeDriver: true })
    ]).start();

    if (index >= introSequence.length - 1) return;
    const timer = setTimeout(() => setIndex((current) => current + 1), timings.introPhraseMs);
    return () => clearTimeout(timer);
  }, [index, fade]);

  const done = index >= introSequence.length - 1;

  const continueFlow = () => {
    finishIntro();
    navigation.replace('Bond');
  };

  return (
    <AnimatedBackground variant="cosmic">
      <View style={styles.fragmentOne} />
      <View style={styles.fragmentTwo} />
      <View style={styles.fragmentThree} />
      <Animated.View
        style={[
          styles.travelingEgg,
          {
            opacity: eggTravel.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0.05, 0.8, 0.2] }),
            transform: [
              { translateY: eggTravel.interpolate({ inputRange: [0, 1], outputRange: [-180, 180] }) },
              { scale: eggTravel.interpolate({ inputRange: [0, 1], outputRange: [0.28, 1.25] }) }
            ]
          }
        ]}
      />
      <View style={styles.content}>
        <Text style={styles.kicker}>NINHO ARCANO</Text>
        <Animated.Text style={[styles.phrase, { opacity: fade }]}>{introSequence[index]}</Animated.Text>
        {done ? <Text style={styles.subphrase}>{officialPhrases.received}</Text> : null}
      </View>
      {done ? (
        <View style={styles.footer}>
          <ArcaneButton title="Continuar" onPress={continueFlow} />
        </View>
      ) : null}
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 26
  },
  kicker: {
    color: colors.runeLit,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 28
  },
  phrase: {
    color: colors.text,
    fontSize: 27,
    lineHeight: 38,
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: colors.arcane,
    textShadowRadius: 18
  },
  subphrase: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 22
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 46
  },
  travelingEgg: {
    position: 'absolute',
    left: '50%',
    marginLeft: -22,
    top: '46%',
    width: 44,
    height: 62,
    borderRadius: 32,
    backgroundColor: '#E6D1B1',
    shadowColor: colors.runeLit,
    shadowOpacity: 1,
    shadowRadius: 22
  },
  fragmentOne: {
    position: 'absolute',
    top: 110,
    left: 42,
    width: 88,
    height: 18,
    borderRadius: 30,
    backgroundColor: 'rgba(255,213,138,0.18)',
    transform: [{ rotate: '-28deg' }]
  },
  fragmentTwo: {
    position: 'absolute',
    top: 170,
    right: 28,
    width: 120,
    height: 16,
    borderRadius: 30,
    backgroundColor: 'rgba(124,58,237,0.2)',
    transform: [{ rotate: '20deg' }]
  },
  fragmentThree: {
    position: 'absolute',
    bottom: 220,
    left: 80,
    width: 136,
    height: 18,
    borderRadius: 30,
    backgroundColor: 'rgba(56,189,248,0.13)',
    transform: [{ rotate: '11deg' }]
  }
});
