// Typography tokens
// Use in Framer Motion variants, dynamic style props, or SSR-safe contexts

export const fonts = {
  display: '"Cormorant Garant", Georgia, serif',
  heading: '"Jost", Arial, sans-serif',
  body:    '"DM Sans", Arial, sans-serif',
} as const;

export const fontWeights = {
  light:   300,
  regular: 400,
  medium:  500,
  semibold: 600,
} as const;

export const typeScale = {
  hero:    { size: '4.5rem',    lineHeight: 1.05, letterSpacing: '-0.01em' },
  title:   { size: '3rem',      lineHeight: 1.1  },
  h2:      { size: '2rem',      lineHeight: 1.2  },
  h3:      { size: '1.25rem',   lineHeight: 1.3  },
  nav:     { size: '0.8125rem', letterSpacing: '0.04em' },
  bodyLg:  { size: '1rem',      lineHeight: 1.75 },
  body:    { size: '0.9375rem', lineHeight: 1.75 },
  caption: { size: '0.8125rem', lineHeight: 1.5  },
  btn:     { size: '0.8125rem', letterSpacing: '0.02em' },
} as const;
