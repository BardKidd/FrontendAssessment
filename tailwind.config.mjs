/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0061FF',
        brandLight: '#EBF2FF',
        main2: '#051F61',
        sub: '#757897',
        sub2: '#667085',
        blackText: '#101828',
        textDark: '#071E24',
        accentOrange: '#F2994A',
        accentPurple: '#BB6BD9',
        accentRed: '#EB5757',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        'figma-drop': '0px 2px 100px rgba(0, 0, 0, 0.1)',
        'figma-card': '0px 2px 30px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
