import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      'noto': ['Noto Serif Display', 'serif'],
      'didact': ['Didact Gothic', 'sans-serif'],
    }
  },
  plugins: [],
};

export default config;
