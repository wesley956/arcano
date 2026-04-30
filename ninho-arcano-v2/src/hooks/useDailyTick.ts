import { useEffect } from 'react';
import { useGame } from '@/context/GameContext';

export function useDailyTick(): void {
  const { state, generateOrbs } = useGame();
  useEffect(() => {
    if (!state.orbs.available.length && state.bond.accepted && !state.dragon.exists) {
      generateOrbs();
    }
  }, [state.orbs.available.length, state.bond.accepted, state.dragon.exists, generateOrbs]);
}
