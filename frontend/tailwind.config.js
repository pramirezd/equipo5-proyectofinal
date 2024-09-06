/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customYellow: 'rgb(254, 216, 60)',
        customBlue: 'rgb(89, 192, 236)'
      }
    },
  },
  plugins: [],
}