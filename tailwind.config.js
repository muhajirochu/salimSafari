/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Custom breakpoints matching the brief:
    // mobile < 481px, tablet 481–1024px, desktop 1025px+
    screens: {
      sm: '481px',
      md: '768px',
      lg: '1025px',
      xl: '1280px',
    },
    extend: {
      colors: {
        ocean: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          500: '#0891B2',
          600: '#0E7490', // primary brand color
          700: '#155E75',
          800: '#164E63',
          900: '#083344',
        },
        sand: {
          50: '#FDF9F4',
          100: '#F5E6D3', // brand sand
          200: '#EBD3B5',
          300: '#DDBB91',
        },
        coral: {
          400: '#FB923C',
          500: '#F97316', // brand accent
          600: '#EA580C',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1DA851',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(8, 51, 68, 0.12)',
        lift: '0 12px 32px -8px rgba(8, 51, 68, 0.25)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
