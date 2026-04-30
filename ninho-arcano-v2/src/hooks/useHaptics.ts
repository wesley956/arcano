import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import { useGame } from '@/context/GameContext';

export function useHaptics() {
  const { state } = useGame();
  return useCallback((kind: 'light' | 'medium' | 'success' = 'light') => {
    if (!state.settings.hapticsEnabled) return;
    if (kind === 'success') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
    } else {
      Haptics.impactAsync(kind === 'medium' ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
    }
  }, [state.settings.hapticsEnabled]);
}
