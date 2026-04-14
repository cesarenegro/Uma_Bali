/** @type {import('tailwindcss').Config} */
export default {
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
