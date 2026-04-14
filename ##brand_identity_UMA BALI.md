# BRAND IDENTITY IMPLEMENTATION PROMPT
## For AI Coder — React 18 + Tailwind CSS + TypeScript

> **Scope of this prompt:** Implement the complete brand colour token layer,
> typography system, and base component styles for the outdoor furniture
> manufacturer platform. This is the DESIGN SYSTEM foundation — every other
> component in the project must import from these tokens and never hardcode
> colours or font values directly.

---

## 0 — CONTEXT

Platform: Premium outdoor furniture e-commerce + AI space generator  
Stack: React 18 · TypeScript · Tailwind CSS v3 · Vite  
Reference brands analysed: RODA (rodaonline.com) · Talenti (talentispa.com) · Ethimo (ethimo.com)  
Design character: Warm · Tactile · Italian luxury · Editorial · Not minimalist, not maximalist — *refined*

---

## 1 — COLOUR PALETTE

### 1.1 Complete token set

| Token name   | Hex value   | Role                                          |
|------------- |-------------|-----------------------------------------------|
| `linen`      | `#F2EDE4`   | Page backgrounds, primary surfaces            |
| `dune`       | `#E0D8CC`   | Card surfaces, secondary areas                |
| `travertine` | `#C4BCB2`   | Dividers, borders, hairlines                  |
| `stone`      | `#8A8278`   | Secondary text, muted labels                  |
| `espresso`   | `#1E1610`   | Primary text, near-black chrome               |
| `sand`       | `#C8A880`   | Light accents, hover backgrounds, subtle CTA  |
| `teak`       | `#9A7248`   | **Brand primary** — links, CTAs, interactive  |
| `bark`       | `#5C3820`   | Hover states, dark CTAs, pressed states       |
| `sage`       | `#8A9B78`   | Nature accent — category tags, eco badges     |
| `clay`       | `#B86040`   | Highlight — "New" badges, AI generator accent |

### 1.2 Colour application rules

```
Page background        →  linen      (#F2EDE4)
Card / panel surface   →  dune       (#E0D8CC)
Borders & dividers     →  travertine (#C4BCB2)
Primary text           →  espresso   (#1E1610)
Secondary / muted text →  stone      (#8A8278)

Primary CTA button     →  teak bg    (#9A7248)  +  linen text  (#F2EDE4)
CTA hover state        →  bark bg    (#5C3820)  +  linen text  (#F2EDE4)
Subtle / ghost CTA     →  sand bg    (#C8A880)  +  espresso text (#1E1610)

"New" badge            →  clay bg    (#B86040)  +  linen text  (#F2EDE4)
Category / nature tags →  sage bg    (#8A9B78)  +  linen text  (#F2EDE4)
AI Generator accent    →  clay       (#B86040)

Link / interactive     →  teak       (#9A7248)
Link hover             →  bark       (#5C3820)
Focus ring             →  teak       (#9A7248)  2px outline, 2px offset
```

### 1.3 Colour DON'Ts

- **Never** use pure white (`#FFFFFF`) as a background — use `linen` instead
- **Never** use pure black (`#000000`) as text — use `espresso` instead
- **Never** use cool grey — every neutral must come from the palette above
- **Never** use blue, purple, or green for interactive elements — that is `teak`'s role
- **Never** use `clay` or `sage` for primary CTAs — they are accent-only

---

## 2 — TYPOGRAPHY

### 2.1 Typeface stack

| Role      | Font              | Fallback           | Load weights           |
|-----------|-------------------|--------------------|------------------------|
| Display   | Cormorant Garant  | Georgia, serif     | 300, 400, 500 (+ italic 300, 400) |
| Headings  | Jost              | Arial, sans-serif  | 300, 400, 500, 600     |
| Body / UI | DM Sans           | Arial, sans-serif  | 400, 500 (+ italic)    |

### 2.2 Google Fonts import

```css
/* globals.css — top of file */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&display=swap');
```

### 2.3 Type scale

| Role             | Font             | Size (rem) | Weight | Line-height | Tracking     |
|------------------|------------------|-----------|--------|-------------|--------------|
| Hero headline    | Cormorant Garant | 4.5       | 400    | 1.05        | −0.01em      |
| Collection title | Cormorant Garant | 3.0       | 400    | 1.1         | 0            |
| Section H2       | Jost             | 2.0       | 300    | 1.2         | 0            |
| Card title H3    | Jost             | 1.25      | 500    | 1.3         | 0            |
| Nav / UI label   | Jost             | 0.8125    | 500    | 1           | +0.04em      |
| Body text        | DM Sans          | 0.9375    | 400    | 1.75        | 0            |
| Body large       | DM Sans          | 1.0       | 400    | 1.75        | 0            |
| Caption / meta   | DM Sans          | 0.8125    | 400    | 1.5         | 0            |
| Button label     | DM Sans          | 0.8125    | 500    | 1           | +0.02em      |

### 2.4 Typography DON'Ts

- **Never** use Cormorant Garant for body text — display only
- **Never** use DM Sans for hero headlines — that is Cormorant's role
- **Never** use font-weight 700 (bold) — the heaviest weight in this system is 600 (Jost only, sparingly)
- **Never** mix more than two typefaces on a single screen section
- **Never** set body text below 14px (0.875rem)

---

## 3 — FILES TO CREATE

Create the following files exactly as specified:

### 3.1 `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        linen:       '#F2EDE4',
        dune:        '#E0D8CC',
        travertine:  '#C4BCB2',
        stone:       '#8A8278',
        espresso:    '#1E1610',
        sand:        '#C8A880',
        teak:        '#9A7248',
        bark:        '#5C3820',
        sage:        '#8A9B78',
        clay:        '#B86040',
      },
      fontFamily: {
        display: ['Cormorant Garant', 'Georgia', 'serif'],
        heading: ['Jost', 'Arial', 'sans-serif'],
        body:    ['DM Sans', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['4.5rem',    { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'title':   ['3rem',      { lineHeight: '1.1'  }],
        'h2':      ['2rem',      { lineHeight: '1.2'  }],
        'h3':      ['1.25rem',   { lineHeight: '1.3'  }],
        'nav':     ['0.8125rem', { letterSpacing: '0.04em' }],
        'body-lg': ['1rem',      { lineHeight: '1.75' }],
        'body':    ['0.9375rem', { lineHeight: '1.75' }],
        'caption': ['0.8125rem', { lineHeight: '1.5'  }],
        'btn':     ['0.8125rem', { letterSpacing: '0.02em' }],
      },
      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
      },
      borderColor: {
        DEFAULT: '#C4BCB2',  // travertine as default border
      },
      ringColor: {
        DEFAULT: '#9A7248',  // teak as default focus ring
      },
    },
  },
  plugins: [],
};
```

---

### 3.2 `src/styles/globals.css`

```css
/* ── Google Fonts ──────────────────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── CSS Custom Properties ─────────────────────────────────────────────────── */
:root {
  /* Palette */
  --color-linen:       #F2EDE4;
  --color-dune:        #E0D8CC;
  --color-travertine:  #C4BCB2;
  --color-stone:       #8A8278;
  --color-espresso:    #1E1610;
  --color-sand:        #C8A880;
  --color-teak:        #9A7248;
  --color-bark:        #5C3820;
  --color-sage:        #8A9B78;
  --color-clay:        #B86040;

  /* Semantic aliases */
  --color-bg-primary:    var(--color-linen);
  --color-bg-secondary:  var(--color-dune);
  --color-border:        var(--color-travertine);
  --color-text-primary:  var(--color-espresso);
  --color-text-muted:    var(--color-stone);
  --color-brand:         var(--color-teak);
  --color-brand-hover:   var(--color-bark);
  --color-highlight:     var(--color-clay);
  --color-nature:        var(--color-sage);
}

/* ── Base Resets ───────────────────────────────────────────────────────────── */
@layer base {
  html {
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    font-family: 'DM Sans', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-bg-primary);
    min-height: 100vh;
  }

  /* Focus visible — teak ring */
  :focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }

  /* Selection — sand background */
  ::selection {
    background-color: var(--color-sand);
    color: var(--color-espresso);
  }
}

/* ── Component Layer ──────────────────────────────────────────────────────── */
@layer components {

  /* ── Headings ─────────────────────────────────────────────────────────── */
  .heading-display {
    font-family: 'Cormorant Garant', Georgia, serif;
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.01em;
    color: var(--color-text-primary);
  }

  .heading-title {
    font-family: 'Cormorant Garant', Georgia, serif;
    font-size: 3rem;
    font-weight: 400;
    line-height: 1.1;
    color: var(--color-text-primary);
  }

  .heading-h2 {
    font-family: 'Jost', Arial, sans-serif;
    font-size: 2rem;
    font-weight: 300;
    line-height: 1.2;
    color: var(--color-text-primary);
  }

  .heading-h3 {
    font-family: 'Jost', Arial, sans-serif;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.3;
    color: var(--color-text-primary);
  }

  .label-nav {
    font-family: 'Jost', Arial, sans-serif;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--color-text-primary);
  }

  /* ── Body text ────────────────────────────────────────────────────────── */
  .body-text {
    font-family: 'DM Sans', Arial, sans-serif;
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.75;
    color: var(--color-text-primary);
  }

  .body-text-lg {
    font-family: 'DM Sans', Arial, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.75;
    color: var(--color-text-primary);
  }

  .caption {
    font-family: 'DM Sans', Arial, sans-serif;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--color-text-muted);
  }

  /* ── Buttons ──────────────────────────────────────────────────────────── */

  /* Primary CTA — Teak */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.75rem;
    background-color: var(--color-teak);
    color: var(--color-linen);
    font-family: 'DM Sans', Arial, sans-serif;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  .btn-primary:hover  { background-color: var(--color-bark); }
  .btn-primary:active { background-color: var(--color-espresso); }

  /* Ghost CTA — transparent with teak border */
  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.75rem;
    background-color: transparent;
    color: var(--color-teak);
    font-family: 'DM Sans', Arial, sans-serif;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    border: 1px solid var(--color-teak);
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  .btn-ghost:hover {
    background-color: var(--color-teak);
    color: var(--color-linen);
  }

  /* Text-only link button */
  .btn-text {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    background: none;
    border: none;
    padding: 0;
    color: var(--color-teak);
    font-family: 'DM Sans', Arial, sans-serif;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .btn-text:hover { color: var(--color-bark); }

  /* ── Badges / Tags ────────────────────────────────────────────────────── */
  .badge-new {
    display: inline-block;
    padding: 0.2rem 0.625rem;
    background-color: var(--color-clay);
    color: var(--color-linen);
    font-family: 'DM Sans', Arial, sans-serif;
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .badge-category {
    display: inline-block;
    padding: 0.2rem 0.625rem;
    background-color: var(--color-sage);
    color: var(--color-linen);
    font-family: 'DM Sans', Arial, sans-serif;
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.03em;
  }

  .badge-neutral {
    display: inline-block;
    padding: 0.2rem 0.625rem;
    background-color: var(--color-dune);
    color: var(--color-stone);
    font-family: 'DM Sans', Arial, sans-serif;
    font-size: 0.6875rem;
    font-weight: 500;
  }

  /* ── Cards ────────────────────────────────────────────────────────────── */
  .card {
    background-color: var(--color-dune);
    border: 1px solid var(--color-travertine);
  }

  .card-surface {
    background-color: var(--color-linen);
    border: 1px solid var(--color-travertine);
  }

  /* ── Dividers ─────────────────────────────────────────────────────────── */
  .divider {
    border: none;
    border-top: 1px solid var(--color-travertine);
  }

  .divider-teak {
    border: none;
    border-top: 2px solid var(--color-teak);
  }
}
```

---

### 3.3 `src/tokens/colors.ts`

```typescript
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
```

---

### 3.4 `src/tokens/typography.ts`

```typescript
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
```

---

## 4 — USAGE PATTERNS IN COMPONENTS

### 4.1 Product card example (Tailwind classes)

```tsx
// ProductCard.tsx — illustrative class usage
<div className="bg-dune border border-travertine group">

  {/* Image wrapper */}
  <div className="relative overflow-hidden bg-linen aspect-[4/3]">
    <img src={product.primaryImage.url} alt={product.primaryImage.altText}
         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    {product.isNew && <span className="badge-new absolute top-3 left-3">New</span>}
  </div>

  {/* Body */}
  <div className="p-5">
    <span className="caption uppercase tracking-wider">{collectionName}</span>
    <h3 className="heading-h3 mt-1 mb-2">{product.name}</h3>
    <p className="body-text text-stone line-clamp-2">{product.shortDescription}</p>
    <button className="btn-text mt-4">Discover →</button>
  </div>

</div>
```

### 4.2 Primary CTA button

```tsx
// Teak background, linen text
<button className="btn-primary">Request information</button>

// Ghost variant
<button className="btn-ghost">Download catalogue</button>

// Text link variant
<button className="btn-text">View collection →</button>
```

### 4.3 Section headline (homepage hero)

```tsx
<h1 className="heading-display text-hero text-espresso">
  Outdoor living,<br />
  <em>elevated by design.</em>
</h1>
<p className="body-text-lg text-stone mt-6 max-w-xl">
  Italian craftsmanship for gardens, terraces, and poolsides
  that deserve the same consideration as any interior space.
</p>
<button className="btn-primary mt-8">Discover collections</button>
```

### 4.4 Section heading with Jost

```tsx
<h2 className="heading-h2 text-espresso">Featured collections</h2>
<div className="divider-teak w-12 mt-3 mb-8" />
```

---

## 5 — AI GENERATOR SPECIFIC COLOURS

The AI Generator page at `/ai-generator` uses Clay as its accent throughout:

```tsx
// Step progress indicator — active step
<div className="bg-clay text-linen" />

// Generate button — Clay primary
<button className="bg-clay hover:bg-bark text-linen font-body text-btn font-medium
                   py-3 px-8 transition-colors duration-200">
  Generate my space
</button>

// Scene output "Shop the look" strip
<div className="bg-espresso text-linen py-4 px-6">
  <span className="label-nav text-clay uppercase">Products in this scene</span>
</div>
```

---

## 6 — DARK SURFACE PATTERNS

For hero sections with dark (espresso) backgrounds:

```tsx
// Dark hero section
<section className="bg-espresso text-linen">
  <h1 className="heading-display text-hero text-linen">The garden as a room.</h1>
  <p className="body-text text-sand mt-4">     {/* sand reads warm on dark */}
    Discover the 2026 collection.
  </p>
  {/* On dark bg: use sand for secondary text, never stone (too dim) */}
  {/* Designer credit on dark */}
  <span className="caption text-sand">By Christophe Pillet</span>
</section>
```

---

## 7 — DO NOT DO

```
❌  className="bg-white"        →  use bg-linen
❌  className="text-black"      →  use text-espresso
❌  className="text-gray-500"   →  use text-stone
❌  className="border-gray-200" →  use border-travertine
❌  className="bg-blue-500"     →  use bg-teak (for CTAs)
❌  className="text-green-600"  →  use text-sage
❌  style={{ color: '#333' }}   →  use CSS var or Tailwind token
❌  font-bold (weight 700)       →  max is font-semibold (600, Jost only, rarely)
❌  Cormorant Garant for body text
❌  DM Sans for hero headlines
❌  Any colour outside the 10-token palette
```

---

## 8 — CHECKLIST BEFORE COMMITTING

- [ ] `tailwind.config.js` extended with all 10 colour tokens and 3 font families
- [ ] `globals.css` contains Google Fonts import at the very top
- [ ] `globals.css` contains all CSS custom properties in `:root`
- [ ] `globals.css` base layer sets `html` to `bg-linen` / `text-espresso` / `font-body`
- [ ] `src/tokens/colors.ts` and `src/tokens/typography.ts` created
- [ ] No component uses `#FFFFFF`, `#000000`, or any non-palette hex value
- [ ] No component uses Tailwind default grey scale (`gray-*`, `slate-*`, `zinc-*`, `neutral-*`)
- [ ] All `<h1>` elements use `font-display` (Cormorant Garant)
- [ ] All `<h2>`, `<h3>`, nav items use `font-heading` (Jost)
- [ ] All body, caption, button text uses `font-body` (DM Sans)
- [ ] Primary CTA buttons use `btn-primary` class (teak background)
- [ ] "New" badges use `badge-new` class (clay background)
- [ ] Focus states show teak ring (`ring-teak` / `focus-visible:outline-teak`)

---

*Brand Identity System v1.0 — Outdoor Furniture Manufacturer Platform*  
*Reference: rodaonline.com · talentispa.com · ethimo.com*
