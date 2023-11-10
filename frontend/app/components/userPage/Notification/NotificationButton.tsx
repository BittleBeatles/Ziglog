'use client';
import { ButtonHTMLAttributes } from 'react';
interface NotificationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: 'light' | 'dark';
  label: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export default function NotificationButton({
  theme,
  label,
  onClick,
  isSelected,
  ...rest
}: NotificationButtonProps) {
  return (
    <button
      {...rest}
      className={`${
        THEME_VARIANTS[theme]
      } bg-neutral-300 w-fit h-fit px-5 py-0.5 rounded-full opacity-100 ${
        !isSelected ? 'opacity-30' : 'opacity-100 transition-opacity'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

const THEME_VARIANTS = {
  light: '',
  dark: 'text-white',
};
