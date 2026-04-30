import React, { useMemo } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { ArcaneCradle } from '@/components/cradle/ArcaneCradle';
import { PrimordialEgg } from '@/components/egg/PrimordialEgg';
import { FloatingOrb } from '@/components/orbs/FloatingOrb';
import { WhisperText } from '@/components/ui/WhisperText';
import { ArcaneButton } from '@/components/ui/ArcaneButton';
import { RitualPanel } from '@/components/ui/RitualPanel';
import { colors } from '@/constants/colors';
import { ElementKey, DropTarget } from '@/types/game';
import { useGame } from '@/context/GameContext';
import { getIncubationDays, isIncubationComplete } from '@/engine/ageEngine';
import { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Cradle'>;
const { width, height } = Dimensions.get('window');

export function CradleScreen({ navigation }: Props) {
  const { state, offerOrbToEgg, infuseOrbToCradle, generateOrbs, beginBirthRitual } = useGame();
  const incubationDays = getIncubationDays(state);
  const canBirth = isIncubationComplete(state) || state.settings.devMode;

  const positions = useMemo(() => {
    const base = [
      { x: width * 0.09, y: height * 0.2 },
      { x: width * 0.72, y: height * 0.22 },
      { x: width * 0.13, y: height * 0.55 },
      { x: width * 0.72, y: height * 0.54 },
      { x: width * 0.4, y: height * 0.13 }
    ];
    return base;
  }, []);

  const resolveDropTarget = (absoluteX: number, absoluteY: number): DropTarget => {
    const eggCenterX = width / 2;
    const eggCenterY = height - 280;
    const dx = absoluteX - eggCenterX;
    const dy = absoluteY - eggCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 128) return 'egg';
    if (absoluteY > height * 0.38) return 'cradle';
    return 'none';
  };

  const onDrop = (id: string, element: ElementKey, target: DropTarget) => {
    if (target === 'egg') offerOrbToEgg(id, element);
    if (target === 'cradle') infuseOrbToCradle(id, element);
  };

  const startBirth = () => {
    if (beginBirthRitual()) navigation.navigate('BirthRitual');
  };

  return (
    <AnimatedBackground variant="cradle">
      <ArcaneCradle intensity={state.cradle.visualIntensity} />
      <PrimordialEgg marks={state.egg.visualMarks} crackLevel={state.egg.crackLevel} mood={state.egg.state} />
      {state.orbs.available.map((orb, index) => (
        <FloatingOrb
          key={orb.id}
          id={orb.id}
          element={orb.element}
          x={positions[index % positions.length].x}
          y={positions[index % positions.length].y}
          onDrop={onDrop}
          resolveDropTarget={resolveDropTarget}
        />
      ))}
      <View style={styles.topInfo}>
        <Text style={styles.title}>Berço Arcano</Text>
        <Text style={styles.subtitle}>Incubação: {incubationDays}/{state.egg.incubationDaysRequired} dias reais</Text>
      </View>
      <View style={styles.whisperWrap}>
        <WhisperText text={state.ui.lastWhisper ?? 'O Berço respira em silêncio. As orbes flutuam esperando seu gesto.'} />
      </View>
      <View style={styles.actions}>
        <RitualPanel>
          <View style={styles.navRow}>
            <NavGem label="Memórias" onPress={() => navigation.navigate('Memories')} />
            <NavGem label="Sonhos" onPress={() => navigation.navigate('Dreams')} />
            <NavGem label="Ecos" onPress={() => navigation.navigate('Echoes')} />
            <NavGem label="Travessia" onPress={() => navigation.navigate('Travessia')} />
            <NavGem label="Ajustes" onPress={() => navigation.navigate('Settings')} />
          </View>
          {canBirth ? <ArcaneButton title="Iniciar Ritual de Nascimento" onPress={startBirth} style={styles.birthButton} /> : null}
          {state.orbs.available.length === 0 ? <ArcaneButton title="Chamar novas orbes" variant="ghost" onPress={generateOrbs} style={styles.birthButton} /> : null}
        </RitualPanel>
      </View>
    </AnimatedBackground>
  );
}

function NavGem({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.navGem, pressed && { opacity: 0.65 }] }>
      <Text style={styles.navGemText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topInfo: {
    position: 'absolute',
    top: 52,
    left: 22,
    right: 22,
    alignItems: 'center'
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    textShadowColor: colors.torch,
    textShadowRadius: 16
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4
  },
  whisperWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 196
  },
  actions: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 24
  },
  navRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center'
  },
  navGem: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: 'rgba(255,213,138,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,213,138,0.16)'
  },
  navGemText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800'
  },
  birthButton: {
    marginTop: 14
  }
});
