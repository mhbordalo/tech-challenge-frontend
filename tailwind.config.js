/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-dark': '#134645',
        'green-light': '#145C5B',
        'grey-dark': '#4B4B4B',
        'grey-light': '#767373',
        'black-light': '#2C2C2C',
        'yellow-dark': '#C1A816',
        'yellow-light': '#DECA58',
        'red-dark': '#9B1B1B',
        'red-light': '#AE3737',
      },
      backgroundImage: {
        'logo-horizontal': "url('/assets/images/logo_horizontal.png')",
        'login-page': "url('/assets/images/BackgroundLogin.jpg')",
        'bg-intro': "url('/assets/images/BackgroundIntro.jpg')",
      },
    },
  },
  plugins: [],
}
