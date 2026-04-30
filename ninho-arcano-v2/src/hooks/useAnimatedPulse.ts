import { useEffect } from 'react';
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export function useAnimatedPulse(duration = 2200) {
  const pulse = useSharedValue(0);
  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration, easing: Easing.inOut(Easing.sin) }), -1, true);
  }, [duration, pulse]);
  return pulse;
}
