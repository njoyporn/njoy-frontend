/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#202225",
        secondary: "#5865f2",
        pink: "#f02cdfd9",
        skyblue: "#3cbbeed9",
        green1: "#4df02c",
        green2: "#11be37",
        gray:{
          900: "#202225",
          800: "#2f3136",
          700: "#36393f",
          600: "#4f545c",
          400: "#d4d7dc",
          300: "#e3e5e8",
          200: "#ebedef",
          100: "#f2f2f5"
        }
      },
      backgroundImage: {
        'main-img': "url('./src/assets/images/background.png')"
      },
      textShadow: {
        sm: '0 1px 2px rgba(32,32,32,.75)',
        DEFAULT: '0 2px 4px rgba(32,32,32,.75)',
        lg: '0 8px 16px rgba(32,32,32,.75)',
      },
    },
  },
  plugins: [],
}
