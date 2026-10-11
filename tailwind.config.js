/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Page: soft lavender-white behind frosted glass panels
        page: '#eef0f6',
        // Text: deep navy-charcoal
        ink: {
          DEFAULT: '#0e1020',
          soft: '#3a3e52',
          muted: '#646a80',
          faint: '#9aa0b5',
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f6f6fb',
          muted: '#eeeef6',
          line: '#e4e4ee',
        },
        // Violet accent (AA contrast with white text)
        accent: {
          DEFAULT: '#6d4cff',
          hover: '#5b3df0',
          bright: '#8b6dff',
          soft: '#efeaff',
          ring: '#d9cfff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glass: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.9), 0 16px 48px -24px rgba(60, 52, 140, 0.22)',
        card: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.95), 0 8px 24px -14px rgba(60, 52, 140, 0.22)',
        lift: '0 24px 48px -20px rgba(60, 52, 140, 0.32)',
        soft: '0 1px 2px rgba(14, 16, 32, 0.04), 0 6px 20px -8px rgba(14, 16, 32, 0.1)',
        float: '0 4px 12px rgba(14, 16, 32, 0.06), 0 24px 64px -12px rgba(60, 52, 140, 0.25)',
        accent: '0 10px 28px -10px rgba(109, 76, 255, 0.6)',
        dark: '0 10px 24px -10px rgba(14, 16, 32, 0.55)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -8px, 0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
