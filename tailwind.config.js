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
        bg: {
          light: '#FFFFFF',
          DEFAULT: '#F5F7F7',
          deep: '#EEF1F1',
          dark: '#0A0C0D',
          darkDeep: '#060708',
          darkSurface: '#121516',
        },
        ink: {
          DEFAULT: '#0E1212',
          light: '#202626',
          deep: '#070A0A',
          white: '#F5F7F7',
        },
        muted: {
          DEFAULT: '#6B7676',
          light: '#8E9999',
          deep: '#4E5757',
          dark: '#93A1A1',
        },
        accent: {
          DEFAULT: '#5E9C93',
          hover: '#528B83',
          soft: '#EAF3F2',
          glow: 'rgba(94, 156, 147, 0.25)',
          dark: '#68B0A6',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8FAFA',
          glass: 'rgba(255, 255, 255, 0.55)',
          glassBorder: 'rgba(255, 255, 255, 0.7)',
          darkGlass: 'rgba(18, 22, 23, 0.65)',
          darkBorder: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'Inter', 'Manrope', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        'card': '24px',
        'pill': '9999px',
        'liquid': '28px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(14, 18, 18, 0.05), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
        'glass-hover': '0 20px 48px -8px rgba(14, 18, 18, 0.08), inset 0 1px 2px 0 rgba(255, 255, 255, 0.9)',
        'liquid': '0 16px 36px -10px rgba(14, 18, 18, 0.08), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(94, 156, 147, 0.15)',
        'liquid-dark': '0 20px 45px -10px rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 2px 0 rgba(94, 156, 147, 0.25)',
        'studio': '0 25px 50px -12px rgba(14, 18, 18, 0.12), 0 12px 24px -8px rgba(14, 18, 18, 0.06), 0 4px 6px -2px rgba(14, 18, 18, 0.03)',
        'studio-dark': '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 12px 24px -8px rgba(0, 0, 0, 0.4)',
        'studio-sm': '0 10px 25px -5px rgba(14, 18, 18, 0.05), 0 8px 10px -6px rgba(14, 18, 18, 0.03)',
        'accent-glow': '0 0 35px rgba(94, 156, 147, 0.35)',
      },
      backdropBlur: {
        'glass': '20px',
        'liquid': '28px',
      },
      transitionTimingFunction: {
        'studio': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 28s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
