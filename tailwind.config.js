import { colors, typography, spacing, breakpoints, shadows, transitions, borderRadius, zIndex } from './src/styles/theme.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      primary: colors.primary,
      accent: colors.accent,
      success: colors.success,
      warning: colors.warning,
      error: colors.error,
      info: colors.info,
    },
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight,
    fontSize: typography.fontSize,
    lineHeight: typography.lineHeight,
    borderRadius,
    boxShadow: shadows,
    zIndex,
    screens: {
      'xs': breakpoints.xs,
      'sm': breakpoints.sm,
      'md': breakpoints.md,
      'lg': breakpoints.lg,
      'xl': breakpoints.xl,
      '2xl': breakpoints['2xl'],
    },
    extend: {
      spacing,
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
        'max-height': 'max-height',
      },
      transitionDuration: transitions.duration,
      transitionTimingFunction: transitions.timing,
      backgroundImage: {
        'hero-pattern': "url('/src/assets/herobg.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grain': "url('/src/assets/grain.png')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};