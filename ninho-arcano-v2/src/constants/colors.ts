export const colors = {
  deep: '#090B12',
  night: '#0B1020',
  stone: '#B79C76',
  darkStone: '#3A3129',
  torch: '#F2B35B',
  runeDim: '#8B7358',
  runeLit: '#FFD58A',
  text: '#F8F1E7',
  muted: '#C8B8A0',
  wood: '#4ADE80',
  fire: '#F97316',
  earth: '#A16207',
  metal: '#CBD5E1',
  water: '#38BDF8',
  arcane: '#7C3AED',
  danger: '#FB7185',
  veil: 'rgba(9,11,18,0.78)',
  glass: 'rgba(248,241,231,0.08)',
  glassStrong: 'rgba(248,241,231,0.14)'
} as const;

export const elementColors = {
  wood: colors.wood,
  fire: colors.fire,
  earth: colors.earth,
  metal: colors.metal,
  water: colors.water
} as const;
