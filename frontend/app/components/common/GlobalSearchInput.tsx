import { InputHTMLAttributes } from 'react';

interface GlobalSearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
}

export default function GlobalSearchInput({
  theme = 'light',
  ...rest
}: GlobalSearchInputProps) {
  return (
    <input
      {...rest}
      type="text"
      className={`${THEME_VARIANTS[theme]}  w-full h-16 p-2 text-lg rounded `}
    />
  );
}

const THEME_VARIANTS = {
  light: 'bg-white text-black border border-gray-300',
  dark: 'bg-dark-background-layout text-white',
};
