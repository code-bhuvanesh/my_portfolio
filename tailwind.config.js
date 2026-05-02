/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '980px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        /* Material 3 Dark Theme Palette */
        'm3-primary': '#A8C7FA',
        'm3-on-primary': '#062E6F',
        'm3-primary-container': '#1B4895',
        'm3-on-primary-container': '#D3E3FD',
        'm3-primary-fixed-dim': '#A8C7FA',

        'm3-secondary': '#BEC6DC',
        'm3-on-secondary': '#283041',
        'm3-secondary-container': '#3E4759',
        'm3-on-secondary-container': '#DAE2F9',

        'm3-tertiary': '#D6BEE4',
        'm3-on-tertiary': '#3B2948',
        'm3-tertiary-container': '#533F5F',
        'm3-on-tertiary-container': '#F2DAFF',

        'm3-error': '#FFB4AB',

        'm3-surface': '#111318',
        'm3-surface-dim': '#111318',
        'm3-surface-bright': '#37393E',
        'm3-surface-container-lowest': '#0C0E13',
        'm3-surface-container-low': '#191C20',
        'm3-surface-container': '#1D2024',
        'm3-surface-container-high': '#282A2F',
        'm3-surface-container-highest': '#33353A',

        'm3-on-surface': '#E3E2E6',
        'm3-on-surface-variant': '#C4C6D0',
        'm3-outline': '#8E9099',
        'm3-outline-variant': '#44474F',

        'm3-inverse-surface': '#E3E2E6',
        'm3-inverse-on-surface': '#2F3033',

        /* Accent colours for badges */
        'm3-green': '#A8DAB5',
        'm3-green-container': 'rgba(168, 218, 181, 0.12)',
        'm3-orange': '#FFCF9E',
        'm3-orange-container': 'rgba(255, 207, 158, 0.12)',
        'm3-pink': '#FFB1C8',
        'm3-pink-container': 'rgba(255, 177, 200, 0.12)',
        'm3-cyan': '#81D5D5',
        'm3-cyan-container': 'rgba(129, 213, 213, 0.12)',
      },
      fontFamily: {
        'display': ['"Outfit"', '"Roboto"', 'sans-serif'],
        'sans': ['"Roboto"', '"Outfit"', 'system-ui', 'sans-serif'],
        'headline': ['"Outfit"', '"Roboto"', 'sans-serif'],
      },
      borderRadius: {
        'none-m3': '0px',
        'xs-m3': '4px',
        'sm-m3': '8px',
        'md-m3': '12px',
        'lg-m3': '16px',
        'xl-m3': '28px',
        'full-m3': '9999px',
      },
      boxShadow: {
        'm3-1': '0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.3)',
        'm3-2': '0 2px 6px 2px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.3)',
        'm3-3': '0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.3)',
        'm3-4': '0 6px 10px 4px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.3)',
        'm3-5': '0 8px 12px 6px rgba(0, 0, 0, 0.15), 0 4px 4px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'm3-reveal-up': 'm3-reveal-up 500ms cubic-bezier(0.05, 0.7, 0.1, 1) both',
        'm3-fade': 'm3-fade-in 400ms cubic-bezier(0, 0, 0, 1) both',
        'm3-container': 'm3-container-expand 450ms cubic-bezier(0.2, 0, 0, 1) both',
        'm3-float': 'm3-float 6s ease-in-out infinite',
      },
      keyframes: {
        'm3-reveal-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'm3-fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'm3-container-expand': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '60%': { opacity: '1', transform: 'scale(1.01)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'm3-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
