import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/constants/colors';
import { GameProvider } from '@/context/GameContext';
import { RootNavigator } from '@/navigation/RootNavigator';

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.deep,
    card: colors.deep,
    text: colors.text,
    border: 'transparent',
    primary: colors.runeLit
  }
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GameProvider>
          <NavigationContainer theme={theme}>
            <StatusBar style="light" />
            <RootNavigator />
          </NavigationContainer>
        </GameProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
