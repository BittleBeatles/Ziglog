import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        warn: '#E14B32',
        'main-100': '#3D4EFE',
        'main-75': ' #6774FF',
        'main-50': '#96A0FF',
        'main-25': '#CDD1FF',
        'light-background-layout': '#F8F9FA',
        // border용
        'border-grey': '#E5E5E5',
        // text용
        grey: '#888888',
        // 개인정보 수정 input용
        'input-grey': '#D9D9D9',
        // 버튼
        charcol: '#4B4B4B',
        white: '#FFFFFF',
        'dark-background-layout': ' #000000',
        'dark-background-page': '#3A3A3C',
        modal: '#F6F6F6',
        'modal-border': '#BDBDBD',
      },
    },
  },
  plugins: [],
};
export default config;
