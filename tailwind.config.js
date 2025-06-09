/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff00',
        'space-purple': '#4C1D95',
        'cosmic-cyan': '#22D3EE',
        'nebula-pink': '#EC4899',
      },
    },
  },
  plugins: [],
}