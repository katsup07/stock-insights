/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      keyframes: {
        'fade-in-out': {
          '0%': { opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { opacity: 0 },
        }
      },
      animation: {
        'fade-in': 'fade-in-out 3s ease-in-out',
      }
    },
  },
  plugins: [],
}
