/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        5.5: '1.375rem',
      },
      
      animation: {
        'spin-slow': 'spin 7s linear infinite',
      },
    },
  },
  plugins: [],
}

