/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // ── Core palette (unchanged from original) ──
          navy:          '#050f2c',
          'navy-light':  '#0a1a45',
          blue:          '#1a3ebd',
          'blue-light':  '#2d55e0',
          'blue-dark':   '#0f2580',
          orange:        '#e85d04',
          'orange-light':'#f77f00',
          'orange-dark': '#c44b02',

          // ── Semantic design-system tokens (new) ──
          gray:   '#f9fafb',   // Light section background
          border: '#e5e7eb',   // Borders and dividers
          text:   '#4b5563',   // Body / paragraph text
          muted:  '#9ca3af',   // Labels, captions, metadata
        },
      },
      fontFamily: {
        // Clash Display kept as fallback; Plus Jakarta Sans is primary
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['"Plus Jakarta Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      // backgroundImage gradients removed — none were used in any JSX file
      // animation tokens removed — float/pulse-slow/spin-slow not found in JSX
    },
  },
  plugins: [],
}
