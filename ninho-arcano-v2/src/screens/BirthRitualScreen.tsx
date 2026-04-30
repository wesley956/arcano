import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { ArcaneCradle } from '@/components/cradle/ArcaneCradle';
import { PrimordialEgg } from '@/components/egg/PrimordialEgg';
import { ArcaneButton } from '@/components/ui/ArcaneButton';
import { colors } from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'BirthRitual'>;
const steps = ['As tochas tremem.', 'As runas do Berço acordam.', 'A casca pulsa como coração antigo.', 'As orbes guardadas se aproximam.', 'A luz pede sua presença.'];

export function BirthRitualScreen({ navigation }: Props) {
  const { state, completeBirth } = useGame();
  const [step, setStep] = useState(0);
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(glow, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.timing(glow, { toValue: 0, duration: 1200, useNativeDriver: true })
    ])).start();
  }, [glow]);

  useEffect(() => {
    if (step >= steps.length - 1) return;
    const timer = setTimeout(() => setStep((current) => current + 1), 1700);
    return () => clearTimeout(timer);
  }, [step]);

  const hatch = () => {
    completeBirth();
    navigation.replace('NameDragon');
  };

  return (
    <AnimatedBackground variant="cradle">
      <ArcaneCradle intensity={state.cradle.visualIntensity} />
      <Animated.View style={[styles.burst, { opacity: glow }]} />
      <PrimordialEgg marks={state.egg.visualMarks} crackLevel={3} mood="near_birth" />
      <View style={styles.centerText}>
        <Text style={styles.title}>Ritual de Nascimento</Text>
        <Text style={styles.step}>{steps[step]}</Text>
      </View>
      <View style={styles.footer}>
        <ArcaneButton title="Tocar e sustentar a luz" onPress={hatch} disabled={step < steps.length - 1} />
      </View>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  burst: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 170,
    width: 300,
    height: 300,
    borderRadius: 170,
    backgroundColor: colors.runeLit
  },
  centerText: {
    position: 'absolute',
    left: 24,
    right: 24,
    top: 76,
    alignItems: 'center'
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center'
  },
  step: {
    color: colors.runeLit,
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
    marginTop: 12
  },
  footer: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 46
  }
});
