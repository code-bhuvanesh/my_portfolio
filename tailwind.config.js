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
      '3xl': '1700px',
    },
    extend: {
      colors: {
        /* Liquid Glass palette */
        'xc-bg-deep': '#0a0a0f',
        'xc-bg-base': '#10101a',
        'xc-bg-sidebar': 'rgba(20, 20, 32, 0.8)',
        'xc-bg-panel': 'rgba(255, 255, 255, 0.06)',
        'xc-bg-elevated': 'rgba(255, 255, 255, 0.10)',
        'xc-bg-hover': 'rgba(255, 255, 255, 0.10)',
        'xc-border': 'rgba(255, 255, 255, 0.08)',
        'xc-border-strong': 'rgba(255, 255, 255, 0.14)',
        'xc-text-primary': '#f0f0f5',
        'xc-text-secondary': '#a0a0b0',
        'xc-text-tertiary': '#6a6a7a',
        'xc-text-dimmed': '#4a4a58',
        'xc-blue': '#60b8ff',
        'xc-purple': '#c49cff',
        'xc-green': '#7ee8a8',
        'xc-orange': '#ffb574',
        'xc-pink': '#ff7eb3',
        'xc-cyan': '#6ee7e7',
        'xc-red': '#ff6b6b',
        'xc-yellow': '#ffe066',
        /* Liquid Glass specific */
        'lg-glass': 'rgba(255, 255, 255, 0.06)',
        'lg-glass-hover': 'rgba(255, 255, 255, 0.10)',
        'lg-glass-strong': 'rgba(255, 255, 255, 0.08)',
        'lg-border': 'rgba(255, 255, 255, 0.08)',
        'lg-border-strong': 'rgba(255, 255, 255, 0.14)',
        /* backward-compat aliases */
        'text-primary': '#f0f0f5',
        'text-secondary': '#a0a0b0',
        'text-tertiary': '#6a6a7a',
        'accent': '#60b8ff',
        'accent-soft': 'rgba(96, 184, 255, 0.12)',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.35)',
        'card': '0 16px 48px rgba(0, 0, 0, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        'glass-lg': '0 24px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'glow-blue': '0 0 48px rgba(96, 184, 255, 0.12)',
        'glow-purple': '0 0 48px rgba(196, 156, 255, 0.10)',
      },
      fontFamily: {
        'mono': ['"JetBrains Mono"', '"SF Mono"', '"Fira Code"', '"Cascadia Code"', '"Menlo"', '"Consolas"', 'monospace'],
        'display': ['"Inter"', '"SF Pro Display"', '"Segoe UI"', 'sans-serif'],
      },
      animation: {
        'xc-window-in': 'xc-window-in 460ms cubic-bezier(0.2, 0.85, 0.24, 1) both',
        'xc-window-out': 'xc-window-out 280ms ease both',
        'drift': 'drift 10s ease-in-out infinite alternate',
        'drift-reverse': 'drift 14s ease-in-out infinite alternate-reverse',
        'reveal-up': 'reveal-up 0.85s ease both',
        'reveal-fade': 'reveal-fade 0.6s ease both',
        'icon-breathe': 'icon-breathe 7.4s ease-in-out infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'glass-shimmer': 'glass-shimmer 6s ease-in-out infinite',
      },
      keyframes: {
        'icon-breathe': {
          '0%, 100%': { opacity: 'calc(var(--icon-opacity) * 0.72)' },
          '50%': { opacity: 'calc(var(--icon-opacity) * 0.82)' },
        },
        'drift': {
          'from': { transform: 'translate3d(0, 0, 0) scale(1)' },
          'to': { transform: 'translate3d(2rem, 2.5rem, 0) scale(1.08)' },
        },
        'reveal-up': {
          'from': { opacity: '0', transform: 'translateY(24px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-fade': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'xc-window-in': {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.92)', filter: 'blur(8px)' },
          '60%': { opacity: '1', transform: 'translateY(0) scale(1.01)', filter: 'blur(0)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        },
        'xc-window-out': {
          '0%': { opacity: '1', transform: 'scale(1)', filter: 'blur(0)' },
          '100%': { opacity: '0', transform: 'scale(0.985)', filter: 'blur(8px)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'glass-shimmer': {
          '0%': { transform: 'translateX(-100%) rotate(12deg)' },
          '100%': { transform: 'translateX(200%) rotate(12deg)' },
        },
      },
      backdropBlur: {
        'glass': '24px',
        'glass-lg': '32px',
      },
    },
  },
  plugins: [],
}
