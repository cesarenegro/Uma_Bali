// Brand colour tokens
// Import this wherever you need to reference colours in JS/TS (e.g. Framer Motion, canvas)
// For CSS/Tailwind use the utility classes directly — do NOT use these in className strings

export const colors = {
  // Foundation neutrals
  linen:       '#F2EDE4',
  dune:        '#E0D8CC',
  travertine:  '#C4BCB2',
  stone:       '#8A8278',
  espresso:    '#1E1610',

  // Brand & accent
  sand:        '#C8A880',
  teak:        '#9A7248',
  bark:        '#5C3820',
  sage:        '#8A9B78',
  clay:        '#B86040',
} as const;

export type ColorToken = keyof typeof colors;

// Semantic mapping
export const semanticColors = {
  bgPrimary:    colors.linen,
  bgSecondary:  colors.dune,
  border:       colors.travertine,
  textPrimary:  colors.espresso,
  textMuted:    colors.stone,
  brand:        colors.teak,
  brandHover:   colors.bark,
  highlight:    colors.clay,
  nature:       colors.sage,
} as const;
