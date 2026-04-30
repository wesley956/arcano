export type ElementKey = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

export type LifeStage = 'intro' | 'egg' | 'birth_ritual' | 'newborn' | 'child_i' | 'child_ii';

export type EggMood = 'silent' | 'warm' | 'restless' | 'dreaming' | 'near_birth';
export type DragonMood = 'curious' | 'hungry' | 'sleepy' | 'content' | 'deep_sleep';
export type HeritageTrait = 'mist' | 'emberlight' | 'rootmark' | 'oldstone' | 'silverline';
export type MemoryKind = 'bond' | 'orb_egg' | 'orb_cradle' | 'omen' | 'dream' | 'echo' | 'birth' | 'food' | 'travessia' | 'dev';

export type Orb = {
  id: string;
  element: ElementKey;
  bornAt: string;
};

export type MemoryEntry = {
  id: string;
  kind: MemoryKind;
  text: string;
  createdAt: string;
};

export type DreamEntry = {
  id: string;
  element?: ElementKey;
  title: string;
  text: string;
  createdAt: string;
};

export type EchoEntry = {
  id: string;
  title: string;
  text: string;
  createdAt: string;
};

export type Food = {
  id: string;
  name: string;
  affinity: ElementKey;
  description: string;
  hungerRestore: number;
  bondGain: number;
  healthGain: number;
};

export type Lineage = {
  id: string;
  name: string;
  primary: ElementKey;
  secondary?: ElementKey;
  nest: string;
  talent: string;
  personality: string[];
  newbornDescription: string;
  childIDescription: string;
  childIIDescription: string;
};

export type GameState = {
  version: number;
  ui: {
    hasSeenIntro: boolean;
    lastWhisper: string | null;
  };
  bond: {
    accepted: boolean;
    bondId: string | null;
    deviceLinked: boolean;
    createdAt: string | null;
    travessiaAvailable: boolean;
  };
  time: {
    lastOpenedAt: string | null;
    devOffsetDays: number;
    lastDailyTickAt: string | null;
  };
  egg: {
    exists: boolean;
    incubationStartedAt: string | null;
    incubationDaysRequired: number;
    state: EggMood;
    crackLevel: number;
    visualMarks: Record<ElementKey, number>;
    energy: Record<ElementKey, number>;
    offeredToday: number;
    dailyOfferLimit: number;
  };
  cradle: {
    energy: Record<ElementKey, number>;
    infusedToday: number;
    dailyInfuseLimit: number;
    heritageTraits: HeritageTrait[];
    visualIntensity: Record<ElementKey, number>;
  };
  orbs: {
    available: Orb[];
    lastGeneratedAt: string | null;
  };
  dragon: {
    exists: boolean;
    id: string | null;
    name: string | null;
    bornAt: string | null;
    lineage: string | null;
    nest: string | null;
    primaryElement: ElementKey | null;
    secondaryElement: ElementKey | null;
    stage: LifeStage | null;
    hunger: number;
    mood: DragonMood;
    health: number;
    bond: number;
    maturity: number;
    talent: string | null;
    personality: string[];
    foodPreferences: ElementKey[];
  };
  memories: MemoryEntry[];
  dreams: DreamEntry[];
  echoes: EchoEntry[];
  settings: {
    soundEnabled: boolean;
    hapticsEnabled: boolean;
    reducedMotion: boolean;
    devMode: boolean;
  };
};

export type DropTarget = 'egg' | 'cradle' | 'none';
