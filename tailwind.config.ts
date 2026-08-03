import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: '#AD3A5B',
        roseDeep: '#7E2740',
        roseSoft: '#F4DFE4',
        roseSofter: '#FBF1F2',
        ink: '#241B1D',
        inkSoft: '#786B68',
        bgSoft: '#FAF6F4',
        line: '#EBE1DE',
      },
      fontFamily: {
        display: ['"Markazi Text"', 'serif'],
        body: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
