import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { foods } from '@/data/foods';
import { acceptBond as acceptBondEngine } from '@/engine/bondEngine';
import { birthDragon, nameDragon as nameDragonEngine, touchDragon as touchDragonEngine } from '@/engine/dragonEngine';
import { feedDragon as feedDragonEngine } from '@/engine/foodEngine';
import { applyAgeStage, isIncubationComplete } from '@/engine/ageEngine';
import { getHeritageTraits } from '@/engine/cradleEngine';
import { crackLevelForIncubation, nextEggMood, visualMarkIntensity } from '@/engine/eggEngine';
import { addMemory, maybeCreateOmenDreamOrEcho } from '@/engine/memoryEngine';
import { elementRecord, generateDailyOrbs, removeOrb } from '@/engine/orbEngine';
import { createEcho } from '@/data/echoes';
import { GameState, ElementKey, Food } from '@/types/game';
import { clamp, randomId } from '@/utils/random';
import { isDifferentCalendarDay, nowIso } from '@/utils/date';
import { loadGameState, saveGameState, clearGameState } from '@/storage/gameStorage';
import { timings } from '@/constants/timings';
import { elementLabels, elementPoetry } from '@/constants/elements';

export type GameContextValue = {
  state: GameState;
  loading: boolean;
  finishIntro: () => void;
  acceptBond: () => void;
  offerOrbToEgg: (orbId: string, element: ElementKey) => void;
  infuseOrbToCradle: (orbId: string, element: ElementKey) => void;
  generateOrbs: () => void;
  beginBirthRitual: () => boolean;
  completeBirth: () => void;
  nameDragon: (name: string) => void;
  feedDragon: (food: Food) => void;
  touchDragon: () => void;
  advanceOneDay: () => void;
  forceBirthReady: () => void;
  resetGame: () => Promise<void>;
  setSetting: <K extends keyof GameState['settings']>(key: K, value: GameState['settings'][K]) => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export function createInitialState(): GameState {
  return {
    version: 1,
    ui: { hasSeenIntro: false, lastWhisper: null },
    bond: { accepted: false, bondId: null, deviceLinked: false, createdAt: null, travessiaAvailable: false },
    time: { lastOpenedAt: nowIso(), devOffsetDays: 0, lastDailyTickAt: null },
    egg: {
      exists: false,
      incubationStartedAt: null,
      incubationDaysRequired: timings.incubationDaysRequired,
      state: 'silent',
      crackLevel: 0,
      visualMarks: elementRecord(0),
      energy: elementRecord(0),
      offeredToday: 0,
      dailyOfferLimit: timings.dailyOfferLimit
    },
    cradle: {
      energy: elementRecord(0),
      infusedToday: 0,
      dailyInfuseLimit: timings.dailyInfuseLimit,
      heritageTraits: [],
      visualIntensity: elementRecord(0)
    },
    orbs: { available: generateDailyOrbs(), lastGeneratedAt: nowIso() },
    dragon: {
      exists: false,
      id: null,
      name: null,
      bornAt: null,
      lineage: null,
      nest: null,
      primaryElement: null,
      secondaryElement: null,
      stage: null,
      hunger: 0,
      mood: 'curious',
      health: 100,
      bond: 0,
      maturity: 0,
      talent: null,
      personality: [],
      foodPreferences: []
    },
    memories: [],
    dreams: [],
    echoes: [createEcho(0)],
    settings: { soundEnabled: true, hapticsEnabled: true, reducedMotion: false, devMode: false }
  };
}

function dailyTick(state: GameState): GameState {
  const now = nowIso();
  let next = applyAgeStage(state);
  if (isDifferentCalendarDay(next.time.lastDailyTickAt, now)) {
    next = {
      ...next,
      time: { ...next.time, lastDailyTickAt: now, lastOpenedAt: now },
      egg: { ...next.egg, offeredToday: 0 },
      cradle: { ...next.cradle, infusedToday: 0 },
      orbs: { available: generateDailyOrbs(), lastGeneratedAt: now }
    };
    if (next.dragon.exists) {
      const hunger = clamp(next.dragon.hunger - 10);
      const health = clamp(next.dragon.health - (hunger < 20 ? 4 : 1));
      next = {
        ...next,
        dragon: {
          ...next.dragon,
          hunger,
          health,
          mood: hunger < 20 ? 'hungry' : next.dragon.mood
        }
      };
    }
  }
  return next;
}

function sanitizeLoadedState(state: GameState): GameState {
  return dailyTick({
    ...createInitialState(),
    ...state,
    ui: { ...createInitialState().ui, ...state.ui },
    bond: { ...createInitialState().bond, ...state.bond },
    time: { ...createInitialState().time, ...state.time },
    egg: { ...createInitialState().egg, ...state.egg },
    cradle: { ...createInitialState().cradle, ...state.cradle },
    orbs: { ...createInitialState().orbs, ...state.orbs },
    dragon: { ...createInitialState().dragon, ...state.dragon },
    settings: { ...createInitialState().settings, ...state.settings }
  });
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(createInitialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    loadGameState().then((loaded) => {
      if (!mounted) return;
      setState(loaded ? sanitizeLoadedState(loaded) : createInitialState());
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!loading) {
      saveGameState(state).catch(() => undefined);
    }
  }, [state, loading]);

  const mutate = useCallback((updater: (current: GameState) => GameState) => {
    setState((current) => dailyTick(updater(current)));
  }, []);

  const finishIntro = useCallback(() => {
    mutate((current) => ({ ...current, ui: { ...current.ui, hasSeenIntro: true } }));
  }, [mutate]);

  const acceptBond = useCallback(() => {
    mutate((current) => acceptBondEngine(current));
  }, [mutate]);

  const generateOrbs = useCallback(() => {
    mutate((current) => ({ ...current, orbs: { available: generateDailyOrbs(), lastGeneratedAt: nowIso() } }));
  }, [mutate]);

  const offerOrbToEgg = useCallback((orbId: string, element: ElementKey) => {
    mutate((current) => {
      if (current.egg.offeredToday >= current.egg.dailyOfferLimit) {
        return { ...current, ui: { ...current.ui, lastWhisper: 'O ovo precisa de silêncio para guardar o que já recebeu hoje.' } };
      }
      const energy = current.egg.energy[element] + 1;
      const next: GameState = {
        ...current,
        orbs: { ...current.orbs, available: removeOrb(current.orbs.available, orbId) },
        egg: {
          ...current.egg,
          offeredToday: current.egg.offeredToday + 1,
          energy: { ...current.egg.energy, [element]: energy },
          visualMarks: { ...current.egg.visualMarks, [element]: visualMarkIntensity(current.egg.visualMarks[element]) },
          state: nextEggMood(current, element),
          crackLevel: Math.max(current.egg.crackLevel, crackLevelForIncubation(energy, current.egg.incubationDaysRequired))
        },
        ui: { ...current.ui, lastWhisper: `A orbe de ${elementLabels[element]} tocou a casca; ${elementPoetry[element]}.` }
      };
      return maybeCreateOmenDreamOrEcho(addMemory(next, 'orb_egg', `A orbe de ${elementLabels[element]} foi oferecida ao Ovo Arcano Primordial.`), element);
    });
  }, [mutate]);

  const infuseOrbToCradle = useCallback((orbId: string, element: ElementKey) => {
    mutate((current) => {
      if (current.cradle.infusedToday >= current.cradle.dailyInfuseLimit) {
        return { ...current, ui: { ...current.ui, lastWhisper: 'O Berço guardou energia suficiente por hoje.' } };
      }
      const next: GameState = {
        ...current,
        orbs: { ...current.orbs, available: removeOrb(current.orbs.available, orbId) },
        cradle: {
          ...current.cradle,
          infusedToday: current.cradle.infusedToday + 1,
          energy: { ...current.cradle.energy, [element]: current.cradle.energy[element] + 1 },
          visualIntensity: { ...current.cradle.visualIntensity, [element]: Math.min(1, current.cradle.visualIntensity[element] + 0.16) }
        },
        ui: { ...current.ui, lastWhisper: `A orbe de ${elementLabels[element]} se desfez sobre o Berço. A pedra guardou a marca em silêncio.` }
      };
      return maybeCreateOmenDreamOrEcho(addMemory(next, 'orb_cradle', `A orbe de ${elementLabels[element]} foi infundida no Berço Arcano.`), element);
    });
  }, [mutate]);

  const beginBirthRitual = useCallback(() => {
    if (!isIncubationComplete(state) && !state.settings.devMode) return false;
    mutate((current) => ({ ...current, dragon: { ...current.dragon, stage: 'birth_ritual' }, ui: { ...current.ui, lastWhisper: 'As runas despertaram. O nascimento está próximo.' } }));
    return true;
  }, [state, mutate]);

  const completeBirth = useCallback(() => {
    mutate((current) => birthDragon({ ...current, cradle: { ...current.cradle, heritageTraits: getHeritageTraits(current) } }));
  }, [mutate]);

  const nameDragon = useCallback((name: string) => {
    mutate((current) => nameDragonEngine(current, name));
  }, [mutate]);

  const feedDragon = useCallback((food: Food) => {
    mutate((current) => feedDragonEngine(current, food));
  }, [mutate]);

  const touchDragon = useCallback(() => {
    mutate((current) => touchDragonEngine(current));
  }, [mutate]);

  const advanceOneDay = useCallback(() => {
    mutate((current) => addMemory({ ...current, time: { ...current.time, devOffsetDays: current.time.devOffsetDays + 1, lastDailyTickAt: null } }, 'dev', 'O tempo de teste avançou um dia.'));
  }, [mutate]);

  const forceBirthReady = useCallback(() => {
    mutate((current) => ({ ...current, time: { ...current.time, devOffsetDays: current.time.devOffsetDays + current.egg.incubationDaysRequired + 1 }, ui: { ...current.ui, lastWhisper: 'O modo dev aproximou o nascimento.' } }));
  }, [mutate]);

  const resetGame = useCallback(async () => {
    await clearGameState();
    setState(createInitialState());
  }, []);

  const setSetting = useCallback(<K extends keyof GameState['settings']>(key: K, value: GameState['settings'][K]) => {
    mutate((current) => ({ ...current, settings: { ...current.settings, [key]: value } }));
  }, [mutate]);

  const value = useMemo<GameContextValue>(() => ({
    state,
    loading,
    finishIntro,
    acceptBond,
    offerOrbToEgg,
    infuseOrbToCradle,
    generateOrbs,
    beginBirthRitual,
    completeBirth,
    nameDragon,
    feedDragon,
    touchDragon,
    advanceOneDay,
    forceBirthReady,
    resetGame,
    setSetting
  }), [state, loading, finishIntro, acceptBond, offerOrbToEgg, infuseOrbToCradle, generateOrbs, beginBirthRitual, completeBirth, nameDragon, feedDragon, touchDragon, advanceOneDay, forceBirthReady, resetGame, setSetting]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used inside GameProvider');
  return context;
}

export { foods };
