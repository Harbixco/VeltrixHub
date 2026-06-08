/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1a3ebd',
          'blue-light': '#2d55e0',
          'blue-dark': '#0f2580',
          orange: '#e85d04',
          'orange-light': '#f77f00',
          'orange-dark': '#c44b02',
          navy: '#050f2c',
          'navy-light': '#0a1a45',
        }
      },
      fontFamily: {
        display: ['"Clash Display"', '"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #1a3ebd 0%, #2d55e0 50%, #e85d04 100%)',
        'hero-gradient': 'linear-gradient(135deg, #050f2c 0%, #0a1a45 60%, #1a1a4e 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(26,62,189,0.1) 0%, rgba(232,93,4,0.05) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
