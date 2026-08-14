/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'joseon': {
          '50': '#faf9f7',
          '100': '#f5f3f0',
          '200': '#ebe7e2',
          '300': '#e0dbd3',
          '400': '#d0c7bb',
          '500': '#c4bba8',
          '600': '#b3a895',
          '700': '#9a8d78',
          '800': '#7d7060',
          '900': '#5f5347',
        }
      }
    },
  },
  plugins: [],
}
