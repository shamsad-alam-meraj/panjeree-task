import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Colors ──────────────────────────────────────────────────────────
      colors: {
        primary: '#4F46E5',
        secondary: '#8B5CF6',
        danger: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
      },

      // ── Typography ──────────────────────────────────────────────────────
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },

      // ── Shadows ─────────────────────────────────────────────────────────
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.10)',
        'button-primary': '0 2px 4px rgba(79,70,229,0.25), 0 6px 16px rgba(79,70,229,0.15)',
        'button-success': '0 2px 4px rgba(16,185,129,0.25), 0 6px 16px rgba(16,185,129,0.15)',
        'glow-primary': '0 0 24px rgba(79,70,229,0.35)',
        'glow-success': '0 0 24px rgba(16,185,129,0.35)',
        'inner-top': 'inset 0 1px 0 rgba(255,255,255,0.12)',
      },

      // ── Keyframes ───────────────────────────────────────────────────────
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-18px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        floatUpDown: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pulseRing: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(239,68,68,0.45)' },
          '50%': { boxShadow: '0 0 0 10px rgba(239,68,68,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        progressFill: {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0%' },
        },
      },

      // ── Animations ──────────────────────────────────────────────────────
      animation: {
        fadeIn: 'fadeIn 0.35s ease-out both',
        slideUp: 'slideUp 0.45s ease-out both',
        slideDown: 'slideDown 0.35s ease-out both',
        slideRight: 'slideRight 0.35s ease-out both',
        scaleIn: 'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
        floatUpDown: 'floatUpDown 5s ease-in-out infinite',
        pulseRing: 'pulseRing 1.4s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },

      // ── Backdrop blur ────────────────────────────────────────────────────
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
