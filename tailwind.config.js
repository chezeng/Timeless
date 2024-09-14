/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl': '1200px', 
      },
      
      spacing: {
        '1.5': '0.375rem',
        '3.5': '0.875rem',
        '5.5': '1.375rem',
        '21': '5.25rem',
        '29': '7.25rem',
        '30': '7.5rem',
        '65': '16.25rem',
        '70': '17.5rem',
        '18': '4.25rem',
        'xl': '20rem',
        '85': '21.25rem',
        '100': '25rem',
        '110': '27.5rem',
        '120': '30rem',
      },

      keyframes: {
        'border-spin': {
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
      },
      animation: {
        'border-spin': 'border-spin 7s linear infinite',
        'spin-slow': 'spin 7s linear infinite',
      },

    },
  },
  plugins: [],
}

