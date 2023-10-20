import { InputHTMLAttributes } from 'react';

interface NicknameInputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: 'light' | 'dark';
}

export default function NicknameInput({
  theme = 'light',
  ...rest
}: NicknameInputProps) {
  return (
    <input
      {...rest}
      type="text"
      className={`${THEME_VARIANTS[theme]}  w-72 h-12 p-2 text-base rounded `}
    />
  );
}

const THEME_VARIANTS = {
  light: 'bg-gray-300 text-black border border-gray-300',
  dark: 'bg-dark-background-layout text-white',
};
