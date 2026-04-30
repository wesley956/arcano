import { GameState, LifeStage } from '@/types/game';
import { daysBetween, nowIso } from '@/utils/date';
import { timings } from '@/constants/timings';

export function getEffectiveNow(state: GameState): string {
  const now = new Date();
  now.setDate(now.getDate() + state.time.devOffsetDays);
  return now.toISOString();
}

export function getIncubationDays(state: GameState): number {
  return daysBetween(state.egg.incubationStartedAt, getEffectiveNow(state));
}

export function isIncubationComplete(state: GameState): boolean {
  return getIncubationDays(state) >= state.egg.incubationDaysRequired;
}

export function getDragonAgeYears(state: GameState): number {
  return daysBetween(state.dragon.bornAt, getEffectiveNow(state));
}

export function stageFromAge(age: number): LifeStage {
  if (age < timings.newbornMax) return 'newborn';
  if (age < timings.childIMax) return 'child_i';
  return 'child_ii';
}

export function applyAgeStage(state: GameState): GameState {
  if (!state.dragon.exists || !state.dragon.bornAt) return state;
  const age = getDragonAgeYears(state);
  return {
    ...state,
    dragon: {
      ...state.dragon,
      stage: stageFromAge(age),
      maturity: Math.min(100, Math.floor(age / timings.childIIMax * 100))
    }
  };
}

export function daysSinceLastOpen(state: GameState): number {
  return daysBetween(state.time.lastOpenedAt, nowIso());
}
