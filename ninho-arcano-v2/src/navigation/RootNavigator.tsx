import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { IntroScreen } from '@/screens/IntroScreen';
import { BondScreen } from '@/screens/BondScreen';
import { CradleScreen } from '@/screens/CradleScreen';
import { BirthRitualScreen } from '@/screens/BirthRitualScreen';
import { NameDragonScreen } from '@/screens/NameDragonScreen';
import { TrueNestRevealScreen } from '@/screens/TrueNestRevealScreen';
import { DragonHomeScreen } from '@/screens/DragonHomeScreen';
import { FeedingScreen } from '@/screens/FeedingScreen';
import { MemoriesScreen } from '@/screens/MemoriesScreen';
import { DreamsScreen } from '@/screens/DreamsScreen';
import { EchoesScreen } from '@/screens/EchoesScreen';
import { StatusWhisperScreen } from '@/screens/StatusWhisperScreen';
import { TravessiaScreen } from '@/screens/TravessiaScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { OrbsScreen } from '@/screens/OrbsScreen';
import { RitualsScreen } from '@/screens/RitualsScreen';

export type RootStackParamList = {
  Intro: undefined;
  Bond: undefined;
  Cradle: undefined;
  Orbs: undefined;
  Rituals: undefined;
  Memories: undefined;
  Dreams: undefined;
  Echoes: undefined;
  BirthRitual: undefined;
  NameDragon: undefined;
  TrueNestReveal: undefined;
  DragonHome: undefined;
  Feeding: undefined;
  StatusWhisper: undefined;
  Travessia: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { state, loading } = useGame();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.runeLit} size="large" />
        <Text style={styles.loadingText}>O Berço está acordando...</Text>
      </View>
    );
  }

  const initialRouteName: keyof RootStackParamList = !state.ui.hasSeenIntro
    ? 'Intro'
    : !state.bond.accepted
      ? 'Bond'
      : state.dragon.exists
        ? 'DragonHome'
        : 'Cradle';

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: colors.deep }
      }}
    >
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Bond" component={BondScreen} />
      <Stack.Screen name="Cradle" component={CradleScreen} />
      <Stack.Screen name="Orbs" component={OrbsScreen} />
      <Stack.Screen name="Rituals" component={RitualsScreen} />
      <Stack.Screen name="Memories" component={MemoriesScreen} />
      <Stack.Screen name="Dreams" component={DreamsScreen} />
      <Stack.Screen name="Echoes" component={EchoesScreen} />
      <Stack.Screen name="BirthRitual" component={BirthRitualScreen} />
      <Stack.Screen name="NameDragon" component={NameDragonScreen} />
      <Stack.Screen name="TrueNestReveal" component={TrueNestRevealScreen} />
      <Stack.Screen name="DragonHome" component={DragonHomeScreen} />
      <Stack.Screen name="Feeding" component={FeedingScreen} />
      <Stack.Screen name="StatusWhisper" component={StatusWhisperScreen} />
      <Stack.Screen name="Travessia" component={TravessiaScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.deep
  },
  loadingText: {
    color: colors.muted,
    marginTop: 14,
    fontSize: 15
  }
});
