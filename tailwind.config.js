/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'VERDE-ESCURO': '#134645',
        'VERDE-CLARO': '#145C5B',
        'CINZA-ESCURO': '#4B4B4B',
        'CINZA-CLARO': '#767373',
        'CINZA-PRETO': '#2C2C2C',
        'AMARELO-ESCURO': '#C1A816',
        'AMARELO-CLARO': '#DECA58',
        'VERMELHO-ESCURO': '#9B1B1B',
        'VERMELHO-CLARO': '#AE3737',
      },
      backgroundImage: {
        'logo-horizontal': "url('/assets/images/logo_horizontal.png')",
      },
    },
  },
  plugins: [],
}
