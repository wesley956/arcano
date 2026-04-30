import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState } from '@/types/game';
import { DEVICE_BOND_KEY, GAME_STATE_KEY, SETTINGS_KEY } from './storageKeys';

export async function saveGameState(state: GameState): Promise<void> {
  await AsyncStorage.multiSet([
    [GAME_STATE_KEY, JSON.stringify(state)],
    [DEVICE_BOND_KEY, JSON.stringify(state.bond)],
    [SETTINGS_KEY, JSON.stringify(state.settings)]
  ]);
}

export async function loadGameState(): Promise<GameState | null> {
  const raw = await AsyncStorage.getItem(GAME_STATE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
}

export async function clearGameState(): Promise<void> {
  await AsyncStorage.multiRemove([GAME_STATE_KEY, DEVICE_BOND_KEY, SETTINGS_KEY]);
}
