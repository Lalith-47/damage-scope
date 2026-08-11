/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'var(--color-surface-bg)',
          dim: 'var(--color-surface-bg)',
          bright: '#31394d',
          container: 'var(--color-surface-container)',
          'container-low': '#131b2e',
          'container-high': 'var(--color-surface-container-high)',
          'container-highest': '#2d3449',
          'container-lowest': 'var(--color-surface-container-lowest)',
        },
        primary: {
          DEFAULT: 'var(--color-primary-text)',
          container: '#22d3ee',
          fixed: '#a2eeff',
          dim: '#2fd9f4',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          container: '#00a572',
        },
        on: {
          surface: 'var(--color-on-surface)',
          'surface-variant': 'var(--color-on-surface-variant)',
          primary: '#00363e',
          'primary-container': '#005763',
          secondary: '#003824',
        },
        outline: {
          DEFAULT: '#859397',
          variant: '#3c494c',
        },
        slate: {
          950: '#0b1326',
          900: '#131b2e',
          850: '#171f33',
          800: '#222a3d',
          750: '#2d3449',
          700: '#3c494c',
        },
        brand: {
          amber: '#f97316',
          cyan: '#22d3ee',
          red: '#ef4444',
          emerald: '#4edea3',
          accent: '#22d3ee'
        },
        damage: {
          green: '#4edea3',
          yellow: '#eab308',
          orange: '#f97316',
          red: '#ef4444',
        }
      },
      fontFamily: {
        headline: ['Geist', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Roboto Mono', 'monospace'],
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'radar-sweep': 'radar-sweep 3s linear infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'radar-sweep': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-amber': '0 0 25px -5px rgba(249, 115, 22, 0.4)',
        'glow-red': '0 0 25px -5px rgba(239, 68, 68, 0.4)',
      }
    },
  },
  plugins: [],
}
