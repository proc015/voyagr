import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      voyagrBlue: '#038FFF',
      voyagrGrey: '#F5F5F5',
      white: '#FFFFFF',
      voyagrWhite: "#f9f9f7",
      voyagrRed: "#E84323",
      voyagrBlack:"#28292B",
      voyagrLightGrey: "#B0B0B0",
      voyagrBorders: "#E5E5E5",
    },
    extend: {},
    fontFamily: {
      noto: ['Noto Serif Display', 'serif'],
      didact: ['Didact Gothic', 'sans-serif'],
    },
  },
  plugins: [],
};

export default config;
